/* =============================================================================
   THE DEV SERVER — and the three ways the old one went wrong

   `npm run dev` used to end in `python3 -m http.server 8080 --directory site`,
   and that failed in a way that got worse the longer you worked:

       OSError: [Errno 48] Address already in use

   The chain is `zsh -c 'npm run dev'` → npm → `sh -c …` → python. Close the
   window and the shell gets SIGHUP; npm does not forward it, so python is
   re-parented to init and keeps :8080 for as long as the machine is up. The
   next `npm run dev` then dies on a port its own predecessor is still holding.
   Four of those were running on this machine, the oldest five days old.

   So this replaces it, and it fixes the three separate things that were wrong:

     1. IT DIES WITH ITS PARENT. A watchdog checks `process.ppid` every second;
        when the shell that started it goes away the parent becomes init (pid 1)
        and the server exits. This is what actually stops the orphan.

     2. IT RECLAIMS ITS OWN PORT. The pid goes in a lock file. On start, if the
        port is busy AND the lock names a live process, that is this script's
        own ghost and it is killed. If the port is busy and the lock says
        nothing, something else owns it — we do NOT kill a stranger's process,
        we move to the next free port and say so.

     3. IT HANDLES SIGNALS. SIGINT, SIGTERM and SIGHUP all shut the socket and
        remove the lock, so Ctrl-C leaves nothing behind either.

   Usage:  node scripts/serve.mjs [--port 8080] [--dir site] [--open]

   To stop one you are not sitting in front of, see scripts/stop.mjs
   (`npm run stop`) — it reads the same lock file.
   ========================================================================== */

import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { join, extname, normalize, resolve } from 'node:path';

const argv = process.argv.slice(2);
const flag = (name, fallback) => {
	const i = argv.indexOf(`--${name}`);
	return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
};

const ROOT = resolve(flag('dir', 'site'));
const WANTED = Number(process.env.PORT || flag('port', 8080));
const LOCK = resolve('.dev-server.pid');
const MAX_PORT_TRIES = 20;

const TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.txt': 'text/plain; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.avif': 'image/avif',
	'.ico': 'image/x-icon',
	'.mp4': 'video/mp4',
	'.webm': 'video/webm',
	'.woff2': 'font/woff2',
	'.woff': 'font/woff',
	'.map': 'application/json; charset=utf-8',
};

/* ── The lock ───────────────────────────────────────────────────────────────
   Only ever used to recognise OUR OWN previous instance. A port held by
   anything else is somebody else's business. */

function readLock() {
	try {
		const { pid, port } = JSON.parse(readFileSync(LOCK, 'utf8'));
		process.kill(pid, 0);          // throws if the pid is gone
		return { pid, port };
	} catch {
		return null;
	}
}

function clearLock() {
	try { unlinkSync(LOCK); } catch { /* already gone */ }
}

async function reclaim(port) {
	const prev = readLock();
	if (!prev || prev.port !== port) return false;
	process.stdout.write(`  reclaiming :${port} from a previous dev server (pid ${prev.pid})\n`);
	try { process.kill(prev.pid, 'SIGTERM'); } catch { /* raced us to it */ }
	// Give the socket a moment to actually close before rebinding.
	for (let i = 0; i < 20; i++) {
		await new Promise(r => setTimeout(r, 50));
		try { process.kill(prev.pid, 0); } catch { return true; }
	}
	try { process.kill(prev.pid, 'SIGKILL'); } catch { /* gone */ }
	await new Promise(r => setTimeout(r, 100));
	return true;
}

/* ── The server ─────────────────────────────────────────────────────────── */

const server = createServer((req, res) => {
	let path = decodeURIComponent((req.url || '/').split('?')[0]);
	// normalize() collapses `..`, and the prefix check is what stops a request
	// for /../../etc/passwd from escaping the served directory.
	let file = normalize(join(ROOT, path));
	if (!file.startsWith(ROOT)) {
		res.writeHead(403).end('Forbidden');
		return;
	}
	if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
	if (!existsSync(file)) {
		res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
		res.end(`<!doctype html><meta charset=utf-8><title>404</title>
<body style="font:16px/1.6 system-ui;padding:3rem;max-width:40rem">
<h1 style="font-size:1.5rem">404 — ${path}</h1>
<p>Not in <code>${ROOT}</code>. If you expected it, run <code>npm run build</code>.</p>`);
		return;
	}
	res.writeHead(200, {
		'content-type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream',
		// A dev server that caches is a dev server that lies about your last edit.
		'cache-control': 'no-store',
	});
	createReadStream(file).pipe(res);
});

/* ── Binding, with a ghost to clear and a fallback to find ───────────────── */

async function listen(port, triesLeft = MAX_PORT_TRIES) {
	try {
		await new Promise((ok, fail) => {
			server.once('error', fail);
			server.listen(port, () => { server.removeListener('error', fail); ok(); });
		});
		return port;
	} catch (err) {
		if (err.code !== 'EADDRINUSE') throw err;
		if (await reclaim(port)) return listen(port, triesLeft);
		if (triesLeft <= 1) {
			process.stderr.write(`\n  :${port} and the ${MAX_PORT_TRIES} ports after it are all busy.\n`);
			process.exit(1);
		}
		process.stdout.write(`  :${port} is taken by something else — trying :${port + 1}\n`);
		return listen(port + 1, triesLeft - 1);
	}
}

const port = await listen(WANTED);
writeFileSync(LOCK, JSON.stringify({ pid: process.pid, port }));

if (!existsSync(ROOT)) {
	process.stdout.write(`\n  ⚠️  ${ROOT} does not exist yet — run \`npm run build\`.\n`);
}
process.stdout.write(`\n  serving ${ROOT}\n  http://localhost:${port}/\n\n  Ctrl-C to stop\n\n`);

/* ── Shutting down, every way it can happen ─────────────────────────────── */

let closing = false;
function shutdown(why) {
	if (closing) return;
	closing = true;
	clearLock();
	server.close(() => process.exit(0));
	// If a keep-alive socket refuses to drain, do not hang the terminal.
	setTimeout(() => process.exit(0), 500).unref();
	if (why) process.stdout.write(`\n  stopped (${why})\n`);
}

for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.on(sig, () => shutdown(sig));
process.on('exit', clearLock);
process.on('uncaughtException', (e) => { clearLock(); throw e; });

/* THE WATCHDOG — the part that actually fixes the reported bug.

   Closing the window kills the shell, not necessarily this process. When that
   happens the kernel re-parents us to init, so `process.ppid` becomes 1. That
   is the only reliable signal that the thing which started us is gone. */
const startedBy = process.ppid;
setInterval(() => {
	if (process.ppid !== startedBy || process.ppid === 1) shutdown('parent exited');
}, 1000).unref();
