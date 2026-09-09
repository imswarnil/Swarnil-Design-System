/* =============================================================================
   watch.mjs — the development loop

       npm run watch      http://localhost:8080, rebuilds on save

   Dependency-free on purpose: node's own fs.watch and http, nothing installed.
   The design system has no runtime and no framework, and its own dev server
   should not be the one thing in the repo that needs a toolchain.

   HOW IT WORKS, AND WHY IT IS FAST
   It runs with SDS_DEV=1, so the generated pages link /src/index.css — the
   source tree, copied into site/ — rather than the compiled bundle. That means
   a change to a CSS file needs no PostCSS run at all: the file is copied and
   the browser reads it. Only the page generator re-runs, and that is ~250ms for
   77 pages. `npm run build` is what produces the one minified sheet the
   production site actually ships.

   Watches src/ (the system), docs/ (content, templates, chrome) and templates/
   (the twelve page templates). A change to anything else is not a change to the
   site.
   ========================================================================== */
import { spawnSync } from 'node:child_process';
import { createReadStream, existsSync, statSync, watch } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = join(ROOT, 'site');
const PORT = Number(process.env.PORT) || 8080;
const WATCHED = ['src', 'docs', 'templates'];

const TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.woff2': 'font/woff2',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.mp4': 'video/mp4',
	'.xml': 'application/xml; charset=utf-8',
};

function build(why) {
	const t = Date.now();
	const r = spawnSync('python3', [join(ROOT, 'docs', 'build.py')], {
		cwd: ROOT,
		env: { ...process.env, SDS_DEV: '1' },
		encoding: 'utf8',
	});
	if (r.status !== 0) {
		// A traceback is the useful output, so it is printed whole and the
		// watcher stays up — the previous site/ is still on disk and still served.
		process.stdout.write(`\x1b[31m✗ ${why}\x1b[0m\n${r.stderr || r.stdout}`);
		return;
	}
	process.stdout.write(`\x1b[2m${new Date().toTimeString().slice(0, 8)}\x1b[0m  ${why} → ${Date.now() - t}ms\n`);
}

/* One rebuild per burst. An editor writing a file fires several events, and a
   "save all" fires one per file; without this every one of them is a build. */
let pending = null;
function schedule(why) {
	clearTimeout(pending);
	pending = setTimeout(() => build(why), 120);
}

build('first build');

for (const dir of WATCHED) {
	const path = join(ROOT, dir);
	if (!existsSync(path)) continue;
	watch(path, { recursive: true }, (_event, file) => {
		if (!file || file.includes('/.') || file.endsWith('~')) return;
		schedule(`${dir}/${file}`);
	});
}

createServer((req, res) => {
	const url = decodeURIComponent(req.url.split('?')[0]);
	// normalize() collapses ../ before it is joined, so a request cannot climb
	// out of site/.
	let file = join(OUT, normalize(url));
	if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
	// Pretty URLs: /button → /button.html, the way Pages serves it.
	if (!existsSync(file) && existsSync(`${file}.html`)) file += '.html';
	if (!file.startsWith(OUT) || !existsSync(file)) {
		res.writeHead(404, { 'content-type': 'text/plain' });
		return res.end('404');
	}
	res.writeHead(200, {
		'content-type': TYPES[extname(file)] || 'application/octet-stream',
		// Never cache in dev. The build stamps ?v= on everything it links, but
		// a hard-reloaded page that fetched a stale sub-resource is the single
		// most confusing thing a watcher can do.
		'cache-control': 'no-store',
	});
	createReadStream(file).pipe(res);
}).listen(PORT, () => {
	process.stdout.write(`\n  Swarnil Design System — dev\n  http://localhost:${PORT}\n  watching ${WATCHED.join(', ')}\n\n`);
});
