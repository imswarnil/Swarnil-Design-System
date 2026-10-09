#!/usr/bin/env node
/**
 * Frames — `npm run frames [name…] [--layers] [--out dir]`
 *
 * Exports every page under /frames/ as a picture at its real size, through
 * the machine's own Chrome (puppeteer-core drives it; nothing is downloaded).
 * Run `npm run build` first: this serves dist/.
 *
 *   exports/frames/<name>.png            the frame, settled (animations run to their end)
 *   exports/frames/<name>.json           with --layers: every text in the frame — what it
 *                                        says, where it is, how big, which face, what colour —
 *                                        so scripts/pixelmator.applescript can rebuild the
 *                                        frame as editable text layers over the picture
 *   exports/frames/<name>.ground.png     with --layers: the frame with its words hidden
 *
 * A name filters: `npm run frames thumb- channel-art` exports those only.
 * A frame that moves (a sting, a cut) is captured at the end of its motion.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const args = process.argv.slice(2);
const layers = args.includes('--layers');
const outIx = args.indexOf('--out');
const OUT = outIx > -1 ? path.resolve(args[outIx + 1]) : path.join(ROOT, 'exports/frames');
const filters = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--out');

if (!fs.existsSync(path.join(DIST, 'frames'))) {
	console.error('  no dist/frames — run `npm run build` first');
	process.exit(1);
}

const CHROME = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium', '/usr/bin/google-chrome', '/usr/bin/chromium'].find((p) => fs.existsSync(p));
if (!CHROME) {
	console.error('  no Chrome found — install Google Chrome, or set CHROME=/path/to/chrome');
	process.exit(1);
}

/* A static server for dist/, on a free port. */
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.txt': 'text/plain' };
const server = http.createServer((req, res) => {
	let p = path.join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
	if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
	if (!fs.existsSync(p)) return void (res.writeHead(404), res.end());
	res.writeHead(200, { 'content-type': MIME[path.extname(p)] || 'application/octet-stream' });
	fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

const { default: puppeteer } = await import('puppeteer-core');
const browser = await puppeteer.launch({ executablePath: process.env.CHROME || CHROME, headless: true, args: ['--hide-scrollbars', '--font-render-hinting=none'] });
const names = fs.readdirSync(path.join(DIST, 'frames')).filter((n) => !filters.length || filters.some((f) => n.includes(f))).sort();
fs.mkdirSync(OUT, { recursive: true });

for (const name of names) {
	const page = await browser.newPage();
	await page.goto(`${base}/frames/${name}/`, { waitUntil: 'networkidle0' });
	const size = await page.evaluate(() => {
		const f = document.querySelector('.im-studio');
		const cs = getComputedStyle(f);
		return { w: Number(cs.getPropertyValue('--im-studio-w')), h: Number(cs.getPropertyValue('--im-studio-h')) };
	});
	await page.setViewport({ width: size.w, height: size.h, deviceScaleFactor: 1 });
	// Let the fonts land and every animation reach its end: the longest
	// frame here runs under six seconds, so finish all of them now.
	await page.evaluate(async () => {
		await document.fonts.ready;
		for (const a of document.getAnimations()) {
			try {
				if (a.effect?.getTiming().iterations === Infinity) a.pause();
				else a.finish();
			} catch {}
		}
	});
	await new Promise((r) => setTimeout(r, 300));
	await page.screenshot({ path: path.join(OUT, `${name}.png`), clip: { x: 0, y: 0, width: size.w, height: size.h } });

	if (layers) {
		// Every piece of text, measured where it finally sits.
		const texts = await page.evaluate(() => {
			const out = [];
			const walk = document.createTreeWalker(document.querySelector('.im-studio'), NodeFilter.SHOW_TEXT);
			let n;
			while ((n = walk.nextNode())) {
				const t = n.textContent.replace(/\s+/g, ' ').trim();
				if (!t) continue;
				const el = n.parentElement;
				if (el.closest('[aria-hidden="true"]') && !el.closest('.im-logo')) continue;
				const r = document.createRange();
				r.selectNodeContents(n);
				const b = r.getBoundingClientRect();
				if (!b.width) continue;
				const cs = getComputedStyle(el);
				out.push({
					text: t,
					x: Math.round(b.left),
					y: Math.round(b.top),
					w: Math.round(b.width),
					h: Math.round(b.height),
					size: Math.round(parseFloat(cs.fontSize) * 10) / 10,
					font: cs.fontFamily.split(',')[0].replace(/"/g, ''),
					weight: cs.fontWeight,
					color: cs.color,
					rotate: cs.rotate === 'none' ? 0 : parseFloat(cs.rotate),
					upper: cs.textTransform === 'uppercase',
					spacing: cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing),
				});
			}
			return out;
		});
		fs.writeFileSync(path.join(OUT, `${name}.json`), JSON.stringify({ name, width: size.w, height: size.h, texts }, null, '\t'));
		// The picture without its words, for the layer under the text.
		await page.addStyleTag({ content: '.im-studio * { color: transparent !important; -webkit-text-stroke: 0 !important; text-shadow: none !important; } .im-studio .im-logo-dot, .im-studio .im-icon { color: inherit !important; }' });
		await page.evaluate(() => { for (const el of document.querySelectorAll('.im-studio .im-logo-dot')) el.style.visibility = 'visible'; });
		await page.screenshot({ path: path.join(OUT, `${name}.ground.png`), clip: { x: 0, y: 0, width: size.w, height: size.h } });
	}
	console.log(`  ${name.padEnd(22)} ${size.w} × ${size.h}${layers ? '  + layers' : ''}`);
	await page.close();
}

await browser.close();
server.close();
console.log(`\n  ${names.length} frame(s) → ${path.relative(ROOT, OUT)}/\n`);
