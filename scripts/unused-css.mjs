// Lists every im-* class the CSS defines that nothing in partials/, sections/,
// site/ or src/js/ ever puts on an element. A class only ever mentioned in
// docs prose is "unused" here on purpose: prose describing a class nobody can
// see is the thing this script exists to find.
import fs from 'node:fs';
import path from 'node:path';

const walk = (d, ok) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
	const p = path.join(d, e.name);
	return e.isDirectory() ? walk(p, ok) : ok(p) ? [p] : [];
});
const read = (f) => fs.readFileSync(f, 'utf8');

const defined = new Set();
for (const f of walk('src', (p) => p.endsWith('.css'))) {
	const css = read(f).replace(/\/\*[\s\S]*?\*\//g, '');
	for (const m of css.matchAll(/\.(im-[a-z0-9-]+)/g)) defined.add(m[1]);
	for (const m of css.matchAll(/@utility\s+(im-[a-z0-9-]+)/g)) defined.add(m[1]);
}

const used = new Set();
const files = [
	...walk('partials', (p) => p.endsWith('.hbs')),
	...walk('sections', (p) => p.endsWith('.hbs') || p.endsWith('.js')),
	...walk('site', (p) => /\.(hbs|mjs|js|css)$/.test(p) && !p.includes('/lib/')),
	...walk('src/js', (p) => p.endsWith('.js')),
];
for (const f of files) {
	let t = read(f);
	// docs prose: ignore what is inside <code>…</code> and the prose tables
	if (f.startsWith('site/pages')) t = t.replace(/<code>[\s\S]*?<\/code>/g, '');
	for (const m of t.matchAll(/\bim-[a-z0-9-]+/g)) used.add(m[0]);
}
// a class written as `im-post-card-{{layout}}` in a partial covers its variants
const prefixes = [...used].filter((u) => u.endsWith('-'));

// Names that are correct to define and never write in this repository:
// entrances are named by data-im-in="…", and a few families are complete
// sets a theme picks from (one art colour per collection, every ad size,
// every video shape). Anything else this script prints is really dead.
const generated = [
	/^im-in-/,                 // entrances, chosen by name at runtime
	/^im-art-/,                // one per collection; a theme picks
	/^im-ad-(billboard|portrait)$/,
	/^im-(video|videobg)-(bleed|square|vertical)$/,
	/^im-mediabg-(full|parallax)$/,
	/^im-bg-fade-b$/,
	/^im-(radio|support)-accent$/,
];
const unused = [...defined]
	.filter((c) => !used.has(c) && !prefixes.some((p) => c.startsWith(p)))
	.filter((c) => !generated.some((re) => re.test(c)))
	.sort();
console.log(unused.join('\n'));
console.error(`${defined.size} defined · ${unused.length} unused`);
if (unused.length) process.exitCode = 1; // anything this prints is dead: delete it or use it
