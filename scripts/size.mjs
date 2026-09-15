/* Gzipped size of every shipped stylesheet. What CI prints, and what the docs
   home page quotes — the number is measured, never claimed. */
import { gzipSync } from 'node:zlib';
import { readFileSync, existsSync } from 'node:fs';

const files = [
	'dist/swarnil-design.min.css',
	'dist/swarnil-broadcast.min.css',
	'site/assets/site.min.css',
];

for (const f of files) {
	if (!existsSync(f)) continue;
	const raw = readFileSync(f);
	const gz = gzipSync(raw).length;
	console.log(
		`${f.padEnd(34)} ${(raw.length / 1024).toFixed(1).padStart(7)} KB  →  ` +
		`${(gz / 1024).toFixed(1).padStart(6)} KB gzipped`
	);
}
