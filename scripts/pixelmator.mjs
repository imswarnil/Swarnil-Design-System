#!/usr/bin/env node
/**
 * Pixelmator — `npm run pixelmator [name…]`
 *
 * Rebuilds each exported frame as a layered Pixelmator Pro document: the
 * frame's GROUND (the picture with its words transparent) as an image layer,
 * and every run of text as a live text layer in the real face, size, colour,
 * position and tilt — so a thumbnail or the channel art can be retyped and
 * nudged by hand. Needs `npm run frames -- --layers` first, Pixelmator Pro,
 * and the fonts installed (Geist, Geist Mono, Geist Pixel, Caveat — the
 * files are in assets/fonts/).
 *
 *   exports/frames/<name>.json + .ground.png  →  exports/pixelmator/<name>.pxd
 *
 * This script only writes the AppleScript (one per frame, kept beside the
 * .pxd for reading) and runs it with osascript; Pixelmator does the rest.
 * macOS only.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IN = path.join(ROOT, 'exports/frames');
const OUT = path.join(ROOT, 'exports/pixelmator');
const filters = process.argv.slice(2).filter((a) => !a.startsWith('--'));

if (process.platform !== 'darwin') {
	console.error('  Pixelmator Pro is a Mac app; run this on macOS');
	process.exit(1);
}
if (!fs.existsSync(IN)) {
	console.error('  no exports/frames — run `npm run frames -- --layers` first');
	process.exit(1);
}

/* The browser's family and weight → the PostScript name Pixelmator sets. */
function postscript(font, weight) {
	const w = Number(weight) || 400;
	if (/caveat/i.test(font)) return w >= 600 ? 'Caveat-Bold' : w >= 500 ? 'Caveat-Medium' : 'Caveat-Regular';
	if (/pixel/i.test(font)) return 'GeistPixel-Square';
	if (/mono/i.test(font)) return w >= 600 ? 'GeistMono-Bold' : w >= 500 ? 'GeistMono-Medium' : 'GeistMono-Regular';
	if (/devanagari|kohinoor/i.test(font)) return 'KohinoorDevanagari-Semibold';
	// Geist
	return w >= 700 ? 'Geist-Bold' : w >= 600 ? 'Geist-SemiBold' : w >= 500 ? 'Geist-Medium' : 'Geist-Regular';
}

/* rgb(a) → AppleScript's 16-bit colour triple. */
function rgb16(color) {
	const m = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(color) || [];
	return `{${[m[1], m[2], m[3]].map((c) => Math.round((Number(c) || 0) * 257)).join(', ')}}`;
}

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const manifests = fs.readdirSync(IN).filter((f) => f.endsWith('.json') && (!filters.length || filters.some((x) => f.includes(x)))).sort();
fs.mkdirSync(OUT, { recursive: true });

for (const file of manifests) {
	const m = JSON.parse(fs.readFileSync(path.join(IN, file), 'utf8'));
	const ground = path.join(IN, `${m.name}.ground.png`);
	if (!fs.existsSync(ground)) {
		console.warn(`  ${m.name}: no ground — re-run frames with --layers`);
		continue;
	}
	const pxd = path.join(OUT, `${m.name}.pxd`);
	const lines = [
		'tell application id "com.apple.pixelmator"',
		'\tactivate',
		`\tset d to make new document with properties {width:${m.width}, height:${m.height}, resolution:72}`,
		'\ttell d',
		`\t\tset g to make new image layer at beginning of layers with properties {name:"Ground", file:POSIX file "${esc(ground)}"}`,
		'\t\tset position of g to {0, 0}',
		'\t\tset w to make new group layer at beginning of layers with properties {name:"Words"}',
	];
	// Text layers go in from the bottom up so the stacking matches the page.
	for (const t of [...m.texts].reverse()) {
		const text = t.upper ? t.text.toUpperCase() : t.text;
		const name = text.split(' ').slice(0, 4).join(' ').slice(0, 40);
		lines.push(
			`\t\tset L to make new text layer at beginning of layers of w with properties {name:"${esc(name)}", text content:"${esc(text)}"}`,
			`\t\ttry\n\t\t\tset font of text content of L to "${postscript(t.font, t.weight)}"\n\t\ton error\n\t\t\tlog "font not installed: ${postscript(t.font, t.weight)}"\n\t\tend try`,
			`\t\tset size of text content of L to ${t.size}`,
			`\t\tset color of text content of L to ${rgb16(t.color)}`,
			`\t\tset position of L to {${t.x}, ${t.y}}`,
		);
		if (t.rotate) lines.push(`\t\tset rotation of L to ${t.rotate}`);
	}
	lines.push(`\t\tsave it in POSIX file "${esc(pxd)}" as Pixelmator Pro`, '\t\tclose it', '\tend tell', 'end tell');
	const script = `${lines.join('\n')}\n`;
	const scriptPath = path.join(OUT, `${m.name}.applescript`);
	fs.writeFileSync(scriptPath, script);
	try {
		const out = execFileSync('osascript', [scriptPath], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
		const missing = [...(out + '').matchAll(/font not installed: (\S+)/g)].map((x) => x[1]);
		console.log(`  ${m.name.padEnd(22)} ${m.texts.length} text layer(s)${missing.length ? `  ⚠︎ not installed: ${[...new Set(missing)].join(', ')}` : ''}`);
	} catch (e) {
		console.error(`  ${m.name}: ${String(e.stderr || e.message).trim().split('\n')[0]}`);
	}
}

console.log(`\n  → ${path.relative(ROOT, OUT)}/\n`);
