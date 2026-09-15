/* =============================================================================
   STOPPING THE DEV SERVER — the other half of scripts/serve.mjs

   serve.mjs can reclaim its own port on the way UP. This is the way DOWN, for
   the times you are not at the terminal that owns it: a backgrounded run, a
   window you already closed, an editor task with no Ctrl-C to press.

   It follows the same rule serve.mjs does, and for the same reason:

     WE KILL OUR OWN, NOT A STRANGER'S. The pid in .dev-server.pid is ours, so
     it gets SIGTERM and then SIGKILL if it ignores that. A port held by a
     process we never started is somebody else's work — we name it and stop,
     unless you say --force, which is you taking responsibility for it.

   Exit 0 means the port is free, including when nothing was running. Stopping
   a thing that is already stopped is not an error.

   Usage:  node scripts/stop.mjs [--port 8080] [--force]

             (no flags)  stop the server named in the lock file
             --port N    also free port N, whoever the lock says
             --force     kill whatever is listening, lock or no lock
   ========================================================================== */

import { createServer } from 'node:net';
import { execFileSync } from 'node:child_process';
import { readFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';

const argv = process.argv.slice(2);
const has = (name) => argv.includes(`--${name}`);
const flag = (name, fallback) => {
	const i = argv.indexOf(`--${name}`);
	return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
};

const LOCK = resolve('.dev-server.pid');
const FORCE = has('force');
const explicitPort = flag('port', null) ?? (process.env.PORT || null);
const say = (s) => process.stdout.write(`${s}\n`);

const alive = (pid) => { try { process.kill(pid, 0); return true; } catch { return false; } };

/* ── The lock ───────────────────────────────────────────────────────────── */

function readLock() {
	try {
		const { pid, port } = JSON.parse(readFileSync(LOCK, 'utf8'));
		return alive(pid) ? { pid, port } : { pid, port, stale: true };
	} catch {
		return null;
	}
}

function clearLock() {
	try { unlinkSync(LOCK); } catch { /* already gone */ }
}

/* ── Killing, politely first ────────────────────────────────────────────── */

async function stop(pid, label) {
	if (!alive(pid)) return true;
	say(`  stopping ${label} (pid ${pid})`);
	try { process.kill(pid, 'SIGTERM'); } catch { return true; }
	// The same 1s budget serve.mjs gives its own ghost before it stops asking.
	for (let i = 0; i < 20; i++) {
		await new Promise(r => setTimeout(r, 50));
		if (!alive(pid)) return true;
	}
	say(`  pid ${pid} ignored SIGTERM — SIGKILL`);
	try { process.kill(pid, 'SIGKILL'); } catch { /* raced us */ }
	await new Promise(r => setTimeout(r, 100));
	return !alive(pid);
}

/* ── Is the port actually free? ──────────────────────────────────────────
   Binding it is the only answer that is not a guess: lsof can be missing,
   restricted, or simply describing a socket that has since closed.

   Bind it the way serve.mjs does — every interface, no host argument. A probe
   pinned to 127.0.0.1 reports "free" while a wildcard IPv6 listener still owns
   the port, which is exactly the lie this script exists to stop telling. */

function portFree(port) {
	return new Promise((done) => {
		const probe = createServer();
		probe.once('error', () => done(false));
		probe.listen(port, () => probe.close(() => done(true)));
	});
}

// Only ever used to NAME the holder, or to find it when --force is given.
function listeners(port) {
	try {
		return execFileSync('lsof', ['-ti', `tcp:${port}`, '-sTCP:LISTEN'], { encoding: 'utf8' })
			.split('\n').map(Number).filter(pid => pid && pid !== process.pid);
	} catch {
		return [];               // no lsof, or nothing listening
	}
}

function describe(pid) {
	try {
		return execFileSync('ps', ['-o', 'command=', '-p', String(pid)], { encoding: 'utf8' }).trim();
	} catch {
		return '(unknown)';
	}
}

/* ── The run ────────────────────────────────────────────────────────────── */

const lock = readLock();
let stoppedSomething = false;

if (lock?.stale) {
	say(`  lock named pid ${lock.pid}, which is gone — clearing it`);
	clearLock();
} else if (lock) {
	if (await stop(lock.pid, `the dev server on :${lock.port}`)) stoppedSomething = true;
	clearLock();
} else if (!explicitPort && !FORCE) {
	say('  no dev server lock — nothing of ours is running');
}

// The port to account for: the one you asked about, else the one we just freed.
const port = Number(explicitPort ?? lock?.port ?? 8080);

if (await portFree(port)) {
	say(stoppedSomething ? `  :${port} is free\n` : `  :${port} was already free\n`);
	process.exit(0);
}

/* Still busy. Either a stranger owns it, or you have asked us to stop caring
   about the difference. */

const holders = listeners(port);

if (!FORCE) {
	say(`\n  :${port} is still held by something we did not start:`);
	for (const pid of holders) say(`    pid ${pid}  ${describe(pid)}`);
	if (!holders.length) say('    (could not identify it — lsof found nothing)');
	say(`\n  Run \`npm run stop -- --port ${port} --force\` to kill it anyway.\n`);
	process.exit(1);
}

for (const pid of holders) await stop(pid, `the process on :${port} — ${describe(pid)}`);

if (await portFree(port)) {
	say(`  :${port} is free\n`);
	process.exit(0);
}

say(`\n  :${port} is still busy after --force. Nothing left to try from here.\n`);
process.exit(1);
