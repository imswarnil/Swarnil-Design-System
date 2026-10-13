/**
 * Vendor — `npm run vendor`
 *
 * Copies third-party material INTO the repo from its official, openly
 * licensed npm package, so every outside file has a provenance you can point
 * to. Nothing here comes from another theme.
 *
 *   fonts   geist          SIL Open Font License 1.1   → assets/fonts/
 *   hand    @fontsource-variable/caveat   SIL OFL 1.1  → assets/fonts/Caveat-Variable.woff2
 *   icons   lucide-static  ISC                         → partials/icons/<name>.hbs
 *   brands  simple-icons   CC0 1.0                     → partials/icons/brand-<name>.hbs
 *
 * Add an icon: put its Lucide name in ICONS below and run `npm run vendor`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nm = (...p) => path.join(ROOT, 'node_modules', ...p);

const ICONS = [
	'arrow-left', 'arrow-right', 'arrow-up-right', 'book-open', 'briefcase', 'check', 'chevron-down', 'chevron-left',
	'chevron-right', 'clock', 'copy', 'file-text', 'flame', 'grid-2x2', 'hash', 'house', 'info', 'layers', 'layout-grid',
	'link', 'lock', 'log-in', 'mail', 'map-pin', 'menu', 'monitor', 'moon', 'palette', 'panel-left', 'play', 'rss',
	'ruler', 'search', 'settings', 'share-2', 'sparkles', 'square', 'sun', 'tag', 'triangle-alert', 'type', 'user',
	'users', 'video', 'x', 'circle-help', 'component', 'package', 'scale', 'rocket', 'list', 'rows-3', 'text-cursor-input',
	'bell', 'bookmark', 'calendar', 'code', 'download', 'ellipsis', 'external-link', 'eye', 'heart', 'message-circle',
	'navigation', 'panel-top', 'pencil', 'plus', 'share', 'table-of-contents', 'trash-2', 'credit-card',
	'gallery-horizontal', 'move-horizontal', 'star', 'thumbs-up', 'pause', 'volume-2', 'volume-x',
	'zap', 'wand-sparkles', 'image', 'square-dashed', 'mouse-pointer-click', 'chevrons-up-down', 'loader',
	'route', 'git-commit-vertical', 'grid-3x3', 'refresh-cw', 'trending-up', 'trending-down', 'upload',
	'minus', 'images', 'square-play', 'graduation-cap', 'panel-right', 'message-square', 'toggle-left', 'gauge',
	'chart-column', 'square-check', 'list-filter', 'clipboard-list', 'circle-check', 'shield', 'truck', 'folder',
	'quote', 'lightbulb', 'circle-alert', 'circle-x', 'terminal', 'wallet', 'at-sign', 'key-round', 'globe',
	'arrow-up', 'chevron-up', 'compass', 'file-code', 'text-quote', 'library', 'newspaper',
];

// Ghost's social account types → simple-icons slugs.
const BRANDS = { facebook: 'facebook', x: 'x', github: 'github', youtube: 'youtube', instagram: 'instagram', threads: 'threads', bluesky: 'bluesky', mastodon: 'mastodon', tiktok: 'tiktok', linkedin: 'linkedin', whatsapp: 'whatsapp', reddit: 'reddit', telegram: 'telegram', pinterest: 'pinterest' };

/* ---- fonts ---- */
const fontsOut = path.join(ROOT, 'assets/fonts');
const fonts = [
	['geist-sans/Geist-Variable.woff2', 'Geist-Variable.woff2'],
	['geist-mono/GeistMono-Variable.woff2', 'GeistMono-Variable.woff2'],
	['geist-pixel/GeistPixel-Square.woff2', 'GeistPixel-Square.woff2'],
	['geist-pixel/GeistPixel-Grid.woff2', 'GeistPixel-Grid.woff2'],
	['geist-pixel/GeistPixel-Circle.woff2', 'GeistPixel-Circle.woff2'],
	['geist-pixel/GeistPixel-Triangle.woff2', 'GeistPixel-Triangle.woff2'],
	['geist-pixel/GeistPixel-Line.woff2', 'GeistPixel-Line.woff2'],
];
fs.mkdirSync(fontsOut, { recursive: true });
for (const [from, to] of fonts) fs.copyFileSync(nm('geist/dist/fonts', from), path.join(fontsOut, to));
const ofl = ['LICENSE.TXT', 'LICENSE.txt', 'LICENSE', 'OFL.txt'].map((f) => nm('geist', f)).find((f) => fs.existsSync(f));
if (ofl) fs.copyFileSync(ofl, path.join(fontsOut, 'OFL.txt'));
// The hand: Caveat, latin subset of the variable file, with its own OFL beside it.
fs.copyFileSync(nm('@fontsource-variable/caveat/files', 'caveat-latin-wght-normal.woff2'), path.join(fontsOut, 'Caveat-Variable.woff2'));
fs.copyFileSync(nm('@fontsource-variable/caveat', 'LICENSE'), path.join(fontsOut, 'OFL-Caveat.txt'));

/* ---- icons ---- */
const iconsOut = path.join(ROOT, 'partials/icons');
fs.rmSync(iconsOut, { recursive: true, force: true });
fs.mkdirSync(iconsOut, { recursive: true });

const missing = [];
for (const name of ICONS) {
	const file = nm('lucide-static/icons', `${name}.svg`);
	if (!fs.existsSync(file)) {
		missing.push(name);
		continue;
	}
	const svg = fs
		.readFileSync(file, 'utf8')
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/\s*class="[^"]*"/, '')
		.replace(/\s+width="24"\s+height="24"/, '')
		.replace('<svg', `<svg class="im-icon" width="24" height="24" aria-hidden="true" focusable="false"`)
		.replace(/\s*\n\s*/g, ' ')
		.replace(/>\s+</g, '><')
		.replace(/\s+\/>/g, '/>')
		.trim();
	fs.writeFileSync(path.join(iconsOut, `${name}.hbs`), `${svg}\n`);
}

/* Brands Simple Icons no longer carries (a trademark asked them to) are
   DRAWN HERE, in the same filled 24px style: a rounded tile with the
   letters knocked out of it. Original drawings, not traced. */
const DRAWN = {
	// LinkedIn: the tile, the dot and stem of an i, and an n with its arch.
	linkedin: 'M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3.3 4.2a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM5.9 10.3v8h2.8v-8H5.9Zm4.6 0v8h2.8v-4.2c0-1.1.5-1.9 1.6-1.9s1.4.8 1.4 1.9v4.2h2.8v-4.9c0-2.3-1.2-3.4-2.9-3.4-1.3 0-2.2.6-2.7 1.4h-.1l-.1-1.1h-2.8Z',
};

const si = await import('simple-icons');
for (const [type, slug] of Object.entries(BRANDS)) {
	const key = `si${slug[0].toUpperCase()}${slug.slice(1)}`;
	const icon = si[key];
	const d = icon?.path || DRAWN[slug];
	const body = d
		? `<svg class="im-icon im-icon-brand" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"${icon ? '' : ' fill-rule="evenodd"'} aria-hidden="true" focusable="false"><path d="${d}"/></svg>`
		: fs.readFileSync(path.join(iconsOut, 'link.hbs'), 'utf8').trim(); // brand nobody draws: a neutral link
	if (!d) missing.push(`brand:${type} (fell back to "link")`);
	fs.writeFileSync(path.join(iconsOut, `brand-${type}.hbs`), `${body}\n`);
}

fs.writeFileSync(
	path.join(iconsOut, 'README.md'),
	`# Icons — generated by scripts/vendor.mjs, do not edit by hand

- Line icons: **Lucide** (lucide-static ${JSON.parse(fs.readFileSync(nm('lucide-static/package.json'))).version}) — ISC licence. https://lucide.dev
- \`brand-*\`: **Simple Icons** (${JSON.parse(fs.readFileSync(nm('simple-icons/package.json'))).version}) — CC0 1.0. https://simpleicons.org
  Brand marks remain trademarks of their owners; use them only to link to that service.

Use: \`{{> "icons/search"}}\`. Sized by \`.im-icon\` (1em × 1em by default) and coloured by \`currentColor\`.
`,
);

console.log(`  fonts   ${fonts.length + 1} files → assets/fonts/${ofl ? ' (+ OFL.txt, OFL-Caveat.txt)' : ''}`);
console.log(`  icons   ${ICONS.length - missing.filter((m) => !m.startsWith('brand')).length} Lucide + ${Object.keys(BRANDS).length} brand → partials/icons/`);
if (missing.length) console.warn(`  ⚠︎ missing: ${missing.join(', ')}`);
