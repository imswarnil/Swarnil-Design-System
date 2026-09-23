#!/usr/bin/env node
/**
 * Everything that must be true before this ships. Run after `npm run build`:
 *
 *   npm run check
 *
 *   1. No dead CSS — every im-* class the system defines is put on an element
 *      somewhere, or is a name generated at runtime (scripts/unused-css.mjs).
 *   2. No broken internal links in dist/.
 *   3. Provenance — no reference to the commercial theme this system must
 *      never contain (the audit block in PROVENANCE.md).
 *
 * Exits non-zero on the first failure, so CI stops.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fail = [];
const ok = (m) => console.log(`  ok       ${m}`);

/* ---- 1. dead CSS ---- */
try {
	const out = execFileSync('node', [path.join(ROOT, 'scripts/unused-css.mjs')], { cwd: ROOT, encoding: 'utf8' }).trim();
	if (out) fail.push(`dead CSS: ${out.split('\n').join(' ')}`);
	else ok('every im-* class the system defines is used');
} catch (e) {
	fail.push(`dead CSS: ${(e.stdout || '').trim().split('\n').join(' ')}`);
}

/* ---- 2. broken internal links ---- */
const dist = path.join(ROOT, 'dist');
if (!fs.existsSync(dist)) {
	fail.push('no dist/ — run `npm run build` first');
} else {
	const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
		const p = path.join(d, e.name);
		return e.isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
	});
	const files = walk(dist);
	const have = new Set(files.map((f) => `/${path.relative(dist, f).replace(/index\.html$/, '').split(path.sep).join('/')}`));
	const bad = new Map();
	for (const f of files) {
		for (const m of fs.readFileSync(f, 'utf8').matchAll(/href="(\/[^"#?]*\/)"/g)) {
			const u = m[1];
			if (u.startsWith('/assets')) continue;
			if (!have.has(u)) bad.set(u, (bad.get(u) || 0) + 1);
		}
	}
	if (bad.size) fail.push(`broken links: ${[...bad.entries()].map(([u, n]) => `${u} (${n})`).join(', ')}`);
	else ok(`${files.length} pages, every internal link resolves`);
}

/* ---- 3. provenance ---- */
const forbidden = /priority.?vision|\bpvs\b/i;
const dirs = ['src', 'partials', 'sections', 'site', 'scripts', 'mcp'];
const hits = [];
const scan = (d) => {
	if (!fs.existsSync(d)) return;
	for (const e of fs.readdirSync(d, { withFileTypes: true })) {
		const p = path.join(d, e.name);
		if (e.isDirectory()) scan(p);
		else if (/\.(css|js|mjs|hbs|json|md)$/.test(p) && forbidden.test(fs.readFileSync(p, 'utf8'))) hits.push(p);
	}
};
dirs.forEach((d) => scan(path.join(ROOT, d)));
if (hits.length) fail.push(`provenance: ${hits.join(', ')}`);
else ok('provenance audit is empty');

if (fail.length) {
	console.error(`\n  FAILED\n${fail.map((f) => `  · ${f}`).join('\n')}\n`);
	process.exit(1);
}
console.log('\n  ready to ship\n');
