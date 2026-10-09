/**
 * Package — `npm run package`
 *
 * Builds the system as ONE framework-free package in package/, the same
 * files whatever is consuming them:
 *
 *   css/im.css · im.min.css      the whole system, every layer; fonts load from ../fonts/
 *   css/tokens.css               only the --im-* custom properties, light and dark
 *   fonts/                       Geist, Geist Mono, Geist Pixel, Caveat + their OFL
 *   js/*.js                      the behaviour, as plain scripts — <script defer> or `import`
 *   js/head.js                   the before-first-paint snippet (theme, nav, data-im-js)
 *   client.js                    start(): loads the behaviour in a browser, never on a server
 *   react/                       a thin React layer — <ImHead>, <ImScripts>, a few primitives
 *   icons/*.svg                  every icon the system draws, as a plain SVG file
 *   tokens.json                  the tokens as data, for anything that is not CSS
 *   ghost/                       the Handlebars partials and sections, for a Ghost theme
 *
 * HTML, React, Next.js, Vite, Astro and Ghost all read the same CSS and the
 * same scripts: the system is classes and data attributes, and a framework
 * only has to put them on its elements. Nothing here is generated per
 * framework, so nothing can drift between them.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readTokenData } from './tokens-data.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'package');
const at = (...p) => path.join(ROOT, ...p);
const out = (...p) => path.join(OUT, ...p);
const write = (f, s) => (fs.mkdirSync(path.dirname(f), { recursive: true }), fs.writeFileSync(f, s));
const pkg = JSON.parse(fs.readFileSync(at('package.json'), 'utf8'));

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

/* ── css ──────────────────────────────────────────────────────────────── */
/* The system writes root-absolute font URLs (/assets/fonts/…), which is right
   for the docs site and wrong for a package: here they are relative to the
   stylesheet, so the CSS works from node_modules, a CDN or a subfolder. */
const TAILWIND = at('node_modules/.bin/tailwindcss');
const relFonts = (f) => fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(/url\("\/assets\/fonts\//g, 'url("../fonts/'));
fs.mkdirSync(out('css'), { recursive: true });
execFileSync(TAILWIND, ['-i', 'src/index.css', '-o', out('css/im.css')], { cwd: ROOT, stdio: 'ignore' });
execFileSync(TAILWIND, ['-i', 'src/index.css', '-o', out('css/im.min.css'), '--minify'], { cwd: ROOT, stdio: 'ignore' });
relFonts(out('css/im.css'));
relFonts(out('css/im.min.css'));

/* tokens.css: the custom properties only, for a project that wants the
   palette, type and motion without a single component. */
const tokenDir = at('src/foundation/tokens');
const tokenFiles = fs.readdirSync(tokenDir).filter((f) => f.endsWith('.css') && f !== 'index.css' && f !== 'tailwind.css');
const tokenCss = tokenFiles.map((f) => `/* ${f} */\n${fs.readFileSync(path.join(tokenDir, f), 'utf8')}`).join('\n');
write(out('css/tokens.css'), `/* Im Design System — tokens only (${pkg.version}). Every --im-* custom property, light and dark. */\n${tokenCss.replace(/@theme\s+static\s*\{/g, ':root {').replace(/^@layer[^\n]*\n/gm, '')}`);

/* ── fonts ────────────────────────────────────────────────────────────── */
fs.cpSync(at('assets/fonts'), out('fonts'), { recursive: true });

/* ── js ───────────────────────────────────────────────────────────────── */
const JS = fs.readdirSync(at('src/js')).filter((f) => f.endsWith('.js'));
fs.mkdirSync(out('js'), { recursive: true });
for (const f of JS) fs.copyFileSync(at('src/js', f), out('js', f));

const head = fs.readFileSync(at('partials/shell/head-script.hbs'), 'utf8').match(/<script>\s*([\s\S]*?)\s*<\/script>/)[1];
write(out('js/head.js'), `/* Run in <head>, before any stylesheet: applies the saved theme, nav and
   player state before first paint, and marks the page as scripted
   (data-im-js), which is what lets scroll reveals start hidden. */
${head}
`);
write(out('js/head.mjs'), `/* The same snippet as a string, for frameworks that inline it (React, Next.js). */\nexport const headScript = ${JSON.stringify(head)};\n`);

/* client.js: the scripts are plain files that act on the document, so they
   must only ever run in a browser. start() imports them there and is a no-op
   on a server; each script guards itself, so start() twice is harmless. */
const FEATURES = Object.fromEntries(JS.map((f) => [f === 'im.js' ? 'core' : f.replace(/^im-|\.js$/g, ''), f]));
write(out('client.js'), `/**
 * start(features?) — load the system's behaviour in the browser.
 *
 *   import { start } from 'im-design-system/client';
 *   start();                          // core + motion
 *   start(['core', 'motion', 'charts', 'media', 'code', 'view', 'content', 'ads']);
 *
 * Safe to call on a server (it does nothing) and safe to call twice. Markup
 * rendered later — a route change, a list that grows — is picked up by the
 * scripts themselves; there is nothing to re-run.
 */
const FEATURES = ${JSON.stringify(FEATURES, null, '\t')};
const loaded = new Map();

export const features = Object.keys(FEATURES);

export function start(list = ['core', 'motion']) {
	if (typeof document === 'undefined') return Promise.resolve();
	return Promise.all(
		list.map((name) => {
			if (!FEATURES[name]) throw new Error(\`im-design-system: no feature "\${name}" (have: \${features.join(', ')})\`);
			if (!loaded.has(name)) loaded.set(name, import(\`./js/\${FEATURES[name]}\`));
			return loaded.get(name);
		}),
	);
}
`);
write(out('client.d.ts'), `export type Feature = ${Object.keys(FEATURES).map((k) => `'${k}'`).join(' | ')};\nexport declare const features: Feature[];\nexport declare function start(list?: Feature[]): Promise<unknown>;\n`);

/* ── icons ────────────────────────────────────────────────────────────── */
const icons = {};
for (const f of fs.readdirSync(at('partials/icons')).filter((f) => f.endsWith('.hbs'))) {
	const name = f.replace(/\.hbs$/, '');
	const svg = fs.readFileSync(at('partials/icons', f), 'utf8').trim();
	write(out('icons', `${name}.svg`), `${svg}\n`);
	icons[name] = svg;
}

/* ── tokens.json ──────────────────────────────────────────────────────── */
const tokens = readTokenData(ROOT);
write(out('tokens.json'), `${JSON.stringify({ version: pkg.version, tokens }, null, '\t')}\n`);

/* ── ghost ────────────────────────────────────────────────────────────── */
fs.cpSync(at('partials'), out('ghost/partials'), { recursive: true });
fs.cpSync(at('sections'), out('ghost/sections'), { recursive: true });

/* ── react ────────────────────────────────────────────────────────────── */
fs.cpSync(at('react'), out('react'), { recursive: true });
write(out('react/icons.js'), `/* Generated from partials/icons — every icon the system draws. */\nexport const icons = ${JSON.stringify(icons)};\n`);

/* ── package.json + readme ────────────────────────────────────────────── */
const manifest = {
	name: 'im-design-system',
	version: pkg.version,
	description: pkg.description,
	license: pkg.license,
	type: 'module',
	sideEffects: ['*.css', './js/*.js'],
	exports: {
		'.': './css/im.css',
		'./css': './css/im.css',
		'./css/min': './css/im.min.css',
		'./tokens.css': './css/tokens.css',
		'./tokens.json': './tokens.json',
		'./client': { types: './client.d.ts', default: './client.js' },
		'./head': './js/head.mjs',
		'./react': { types: './react/index.d.ts', default: './react/index.js' },
		'./react/icon': { types: './react/icon.d.ts', default: './react/icon.js' },
		'./js/*': './js/*',
		'./icons/*': './icons/*',
		'./fonts/*': './fonts/*',
		'./ghost/*': './ghost/*',
		'./package.json': './package.json',
	},
	peerDependencies: { react: '>=18' },
	peerDependenciesMeta: { react: { optional: true } },
};
write(out('package.json'), `${JSON.stringify(manifest, null, '\t')}\n`);
fs.copyFileSync(at('LICENSE'), out('LICENSE'));
fs.copyFileSync(at('react/README.package.md'), out('README.md'));
fs.rmSync(out('react/README.package.md'));

/* The docs site serves the package too, so a plain HTML page can link it:
   https://design.imswarnil.com/package/css/im.min.css. Run after the build. */
if (fs.existsSync(at('dist'))) fs.cpSync(OUT, at('dist/package'), { recursive: true });

const size = (f) => `${(fs.statSync(out(f)).size / 1024).toFixed(0)}KB`;
console.log(`  package  package/ — im.css ${size('css/im.css')} · im.min.css ${size('css/im.min.css')} · ${JS.length} scripts · ${Object.keys(icons).length} icons · ${Object.keys(tokens).length} tokens`);
