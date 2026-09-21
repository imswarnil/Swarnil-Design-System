/**
 * Preview server — `npm run dev`
 *
 * Builds, serves dist/ on http://localhost:4700, and rebuilds + reloads the
 * browser when anything under src/, partials/, sections/ or site/ changes. `--no-watch` serves the last build as-is.
 */
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { promisify } from 'node:util';
import { DIST, PARTIALS, PORT, ROOT, SECTIONS, SITE, SRC } from './lib/paths.mjs';

// Every build runs in a FRESH process. Importing build.mjs here would cache it
// (and everything in site/lib/) for the life of the server, so an edit to the
// build itself would silently never take effect.
const run = promisify(execFile);
const build = async ({ quiet = false } = {}) => {
	const { stdout, stderr } = await run(process.execPath, [path.join(SITE, 'build.mjs'), ...(quiet ? ['--quiet'] : [])], { cwd: ROOT });
	if (stdout.trim()) console.log(stdout.replace(/\n+$/, ''));
	if (stderr.trim()) console.warn(stderr.replace(/\n+$/, ''));
};

const WATCH = !process.argv.includes('--no-watch');
const TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.json': 'application/json',
	'.map': 'application/json',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.woff2': 'font/woff2',
	'.mp4': 'video/mp4',
	'.ico': 'image/x-icon',
};

const clients = new Set();
const RELOAD = `<script>new EventSource('/__reload').onmessage=()=>location.reload()</script>`;

const server = http.createServer((req, res) => {
	const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);

	if (url === '/__reload') {
		res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
		res.write('retry: 500\n\n');
		clients.add(res);
		req.on('close', () => clients.delete(res));
		return;
	}

	let file = path.join(DIST, url);
	if (!file.startsWith(DIST)) return res.writeHead(403).end();
	if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
	if (!fs.existsSync(file)) {
		const notFound = path.join(DIST, '404/index.html');
		res.writeHead(404, { 'Content-Type': TYPES['.html'] });
		return res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : 'Not found');
	}

	const type = TYPES[path.extname(file)] || 'application/octet-stream';
	res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
	if (WATCH && type.startsWith('text/html')) {
		return res.end(fs.readFileSync(file, 'utf8').replace('</body>', `${RELOAD}</body>`));
	}
	fs.createReadStream(file).pipe(res);
});

async function rebuild(reason) {
	const started = Date.now();
	try {
		await build({ quiet: true });
		console.log(`  ↻ ${reason} — rebuilt in ${Date.now() - started}ms`);
		for (const c of clients) c.write('data: reload\n\n');
	} catch (err) {
		console.error(`  ✖ build failed (${reason})\n${err.stack || err.message || err}`);
	}
}

await build();

server.on('error', (err) => {
	if (err.code === 'EADDRINUSE') {
		console.error(`\n  Port ${PORT} is in use. Find it:  lsof -nP -iTCP:${PORT} -sTCP:LISTEN\n  or pick another:            PORT=4701 npm run dev\n`);
		process.exit(1);
	}
	throw err;
});

server.listen(PORT, () => {
	console.log(`\n  Preview  →  http://localhost:${PORT}/\n`);
	if (!WATCH) return;

	let timer = null;
	let pending = null;
	const queue = (what) => {
		pending = what;
		clearTimeout(timer);
		timer = setTimeout(() => rebuild(pending), 120);
	};
	const watch = (dir, label) => {
		if (!fs.existsSync(dir)) return;
		fs.watch(dir, { recursive: true }, (_, name) => {
			if (!name || name.includes('.generated') || name.endsWith('.generated.css') || name.startsWith('.')) return;
			queue(`${label}/${name}`);
		});
	};
	watch(SRC, 'src');
	watch(SITE, 'site');
	watch(PARTIALS, 'partials');
	watch(SECTIONS, 'sections');
	console.log('  watching src/, partials/, sections/ and site/ for changes…\n');
});
