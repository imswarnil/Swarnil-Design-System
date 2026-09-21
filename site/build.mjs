/**
 * Build — `npm run build`
 *
 *   css      Tailwind: src/index.css → dist/assets/im.css
 *                      site/site.css → dist/assets/docs.css   (docs chrome only)
 *   pages    render site/pages/**.hbs through the Ghost shim
 *   assets   fonts, im.js, and each section's css / js / media
 *
 * dist/ is a plain static site. dist/assets/im.css + im.js are the deliverable.
 */
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import Handlebars from 'handlebars';
import { loadFixtures } from './lib/fixtures.mjs';
import { createGhost } from './lib/ghost.mjs';
import { DIST, PARTIALS, PORT, ROOT, SECTIONS, SITE, SRC } from './lib/paths.mjs';
import { readTokens } from './lib/tokens.mjs';
import { NAME, navigation, site as siteConfig } from './site.config.mjs';

const run = promisify(execFile);
const TAILWIND = path.join(ROOT, 'node_modules/.bin/tailwindcss');
/** A good-enough guess at a snippet's language, for the highlighter. */
function guessLang(code) {
	if (/^\s*(npm |cd |node |git |cp |#!|\$ )/m.test(code)) return 'bash';
	if (/\{\{|<\/?[a-z][\w-]*[\s>]/i.test(code)) return 'hbs';
	if (/^\s*(import |export |const |let |function |\/\*\*)/m.test(code)) return 'js';
	if (/[\w-]+\s*:\s*[^;\n]+;|^\s*[.@:\[][\w-]/m.test(code)) return 'css';
	return 'text';
}

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function dedent(text) {
	const lines = text.replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
	const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^[\t ]*/)[0].length));
	return lines.map((l) => l.slice(Number.isFinite(indent) ? indent : 0)).join('\n');
}

function walk(dir, test = () => true) {
	if (!fs.existsSync(dir)) return [];
	return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
		const p = path.join(dir, e.name);
		return e.isDirectory() ? walk(p, test) : test(p) ? [p] : [];
	});
}

/** `--- key: value ---` at the top of a page. Flat strings only. */
function frontmatter(source) {
	const m = /^---\n([\s\S]*?)\n---\n?/.exec(source);
	if (!m) return { meta: {}, body: source };
	const meta = {};
	for (const line of m[1].split('\n')) {
		const i = line.indexOf(':');
		if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
	}
	return { meta, body: source.slice(m[0].length) };
}

export async function build({ quiet = false } = {}) {
	const log = quiet ? () => {} : (m) => console.log(m);
	const started = Date.now();

	/* -- css -- */
	fs.mkdirSync(path.join(DIST, 'assets'), { recursive: true });
	const minify = process.env.NODE_ENV === 'production' ? ['--minify'] : [];
	await run(TAILWIND, ['-i', 'src/index.css', '-o', 'dist/assets/im.css', ...minify], { cwd: ROOT });
	await run(TAILWIND, ['-i', 'site/site.css', '-o', 'dist/assets/docs.css', ...minify], { cwd: ROOT });
	const kb = (f) => `${(fs.statSync(path.join(DIST, f)).size / 1024).toFixed(0)}KB`;
	log(`  css      assets/im.css ${kb('assets/im.css')} · assets/docs.css ${kb('assets/docs.css')}`);

	/* -- data -- */
	const fixtures = loadFixtures();
	const site = { ...siteConfig, url: process.env.SITE_URL || `http://localhost:${PORT}/` }; // CI sets SITE_URL to the public address
	const ghost = createGhost({
		fixtures,
		site,
		partialDirs: [{ dir: PARTIALS }, { dir: SECTIONS, prefix: 'sections/' }, { dir: path.join(SITE, 'partials'), prefix: 'docs/' }],
	});
	const { hbs } = ghost;
	const tokens = readTokens();

	const icons = [...ghost.partials.keys()].filter((n) => n.startsWith('icons/')).map((n) => n.slice(6));
	const sections = fs
		.readdirSync(SECTIONS, { withFileTypes: true })
		.filter((e) => e.isDirectory())
		.map((e) => {
			const files = walk(path.join(SECTIONS, e.name)).map((f) => path.relative(path.join(SECTIONS, e.name), f)).sort();
			return { slug: e.name, url: `/sections/${e.name}/`, files, fileCount: files.length };
		});

	const demo = {
		post: fixtures.posts[0],
		three: fixtures.posts.slice(0, 3),
		four: fixtures.posts.slice(0, 4),
		six: fixtures.posts.slice(0, 6),
		ten: fixtures.posts.slice(0, 10),
		video: '/assets/sections/home-hero-full/media/hero-loop.mp4',
		noImage: { ...fixtures.posts[1], feature_image: null, featured: false },
		locked: { ...fixtures.posts[2], access: false },
		author: fixtures.author,
		tags: fixtures.tags,
	};

	/* -- docs helpers -- */
	const examples = [];
	hbs.registerHelper('example', function (options) {
		const h = options.hash;
		const cls = ['example-stage', h.center ? 'example-center' : '', h.flush ? 'example-flush' : '', h.surface ? 'example-surface' : '', h.spill ? 'example-spill' : ''].filter(Boolean).join(' ');
		const code = h.code === false ? '' : `<pre class="example-code"><code class="language-hbs">${escapeHtml(examples[h.__i] ?? '')}</code></pre>`;
		const title = h.title ? `<figcaption class="example-title">${escapeHtml(h.title)}</figcaption>` : '';
		return new Handlebars.SafeString(`<!--x--><figure class="example" data-toc-skip>${title}<div class="${cls}"${h.style ? ` style="${escapeHtml(h.style)}"` : ''}>${options.fn(this)}</div>${code}</figure><!--/x-->`);
	});
	// {{{{code}}}} … {{{{/code}}}} — a raw block: the inside is never compiled.
	hbs.registerHelper('code', (...args) => {
		const options = args.pop();
		const source = dedent(options.fn());
		const lang = typeof args[0] === 'string' ? args[0] : guessLang(source);
		return new Handlebars.SafeString(`<pre><code class="language-${lang}">${escapeHtml(source)}</code></pre>`);
	});
	hbs.registerHelper('icon', (name) => new Handlebars.SafeString(ghost.partials.get(`icons/${name}`)?.source.trim() || ''));
	hbs.registerHelper('eq', (a, b) => a === b);
	hbs.registerHelper('frame_note', (name) => ({
		'--im-bar-height': 'Top bar. Also the offset for anything sticky, and for anchor scrolling.',
		'--im-nav-width': 'Side nav, open.',
		'--im-nav-rail': 'Side nav, as an icon rail.',
		'--im-gutter': 'The page\'s side padding. Fluid.',
		'--im-section-gap': 'Between blocks of a page. Fluid.',
		'--im-flow': 'Between blocks of prose; the default stack gap.',
	})[name] || '');

	const layouts = Object.fromEntries(walk(path.join(SITE, 'layouts'), (f) => f.endsWith('.hbs')).map((f) => [path.basename(f, '.hbs'), fs.readFileSync(f, 'utf8')]));
	const flat = navigation.flatMap((g) => g.items);
	const searchIndex = JSON.stringify(flat.map((n) => ({ t: n.label, u: n.url }))).replace(/</g, '\\u003c');

	let count = 0;
	const pagesDir = path.join(SITE, 'pages');
	for (const file of walk(pagesDir, (f) => f.endsWith('.hbs'))) {
		const rel = path.relative(pagesDir, file).replace(/\.hbs$/, '').split(path.sep).join('/');
		const url = rel === 'index' ? '/' : `/${rel.replace(/\/index$/, '')}/`;
		const { meta, body } = frontmatter(fs.readFileSync(file, 'utf8'));
		const layout = meta.layout || 'doc';

		examples.length = 0;
		const prepared = body.replace(/\{\{#example([^}]*)\}\}([\s\S]*?)\{\{\/example\}\}/g, (_, args, inner) => {
			examples.push(dedent(inner));
			return `{{#example __i=${examples.length - 1}${args}}}${inner}{{/example}}`;
		});

		const here = flat.findIndex((n) => n.url === url);
		const root = {
			relativeUrl: url,
			context: layout === 'home' ? ['home', 'index'] : ['page'],
			meta_title: url === "/" ? NAME : `${meta.title} — ${NAME}`,
			__blocks: {},
			page: { ...meta, url },
			name: NAME,
			// A section starts open if it holds this page; on the home page, the first two do.
			nav: navigation.map((g, gi) => ({
				...g,
				open: g.items.some((i) => i.url === url) || (url === '/' && gi <= 2),
				items: g.items.map((i) => ({ ...i, current: i.url === url })),
			})),
			prev: here > 0 ? flat[here - 1] : null,
			next: here > -1 && here < flat.length - 1 ? flat[here + 1] : null,
			tokens,
			demo,
			icons,
			sections,
			fixtures,
			search_index: searchIndex,
		};

		let content = ghost.render(prepared, {}, root);

		// h2/h3 get an id from their text, for the table of contents.
		const seen = new Set();
		content = content.replace(/<(h[23])((?:\s[^>]*)?)>([\s\S]*?)<\/\1>/g, (whole, tag, attrs, inner) => {
			if (/\sid=/.test(attrs)) return whole;
			let id = ghost.slugify(inner.replace(/<[^>]+>/g, '')) || 'section';
			while (seen.has(id)) id += '-2';
			seen.add(id);
			return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
		});

		// In a doc, prose and examples alternate as siblings: .prose styles
		// (list markers, measure) must never reach into a component preview.
		if (layout === 'doc') {
			content = content
				.split(/<!--x-->|<!--\/x-->/)
				.map((part, i) => (i % 2 ? part : part.trim() ? `<div class="im-prose">${part}</div>` : ''))
				.join('\n');
		} else content = content.replace(/<!--\/?x-->/g, '');

		// `doc_body`, not `content`: {{content}} is a Ghost helper and would win.
		const inner = ghost.render(layouts[layout], {}, { ...root, doc_body: content });
		const html = ghost.render(layouts.shell, {}, { ...root, body: inner });
		const out = path.join(DIST, url, 'index.html');
		fs.mkdirSync(path.dirname(out), { recursive: true });
		fs.writeFileSync(out, html);
		count++;
	}

	/* -- assets: laid out exactly as a Ghost theme's assets/ would be -- */
	fs.cpSync(path.join(ROOT, 'assets/fonts'), path.join(DIST, 'assets/fonts'), { recursive: true });
	fs.copyFileSync(path.join(SRC, 'js/im.js'), path.join(DIST, 'assets/im.js'));
	fs.copyFileSync(path.join(SRC, 'js/im-code.js'), path.join(DIST, 'assets/im-code.js'));
	for (const f of ['im-motion.js', 'im-media.js', 'im-charts.js', 'im-content.js']) fs.copyFileSync(path.join(SRC, 'js', f), path.join(DIST, 'assets', f));
	fs.copyFileSync(path.join(SITE, 'site.js'), path.join(DIST, 'assets/docs.js'));
	for (const s of sections) {
		fs.cpSync(path.join(SECTIONS, s.slug), path.join(DIST, 'assets/sections', s.slug), {
			recursive: true,
			filter: (src) => !/\.(hbs|md)$/.test(src) && !src.endsWith('.DS_Store'),
		});
	}

	// Hosting: GitHub Pages serves dist/ at the custom domain. The domain lives here only.
	const HOST = 'design.imswarnil.com';
	fs.writeFileSync(path.join(DIST, 'CNAME'), `${HOST}\n`);
	fs.writeFileSync(path.join(DIST, '.nojekyll'), '');
	fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n`);
	log(`  pages    ${count} · ${sections.length} section(s) · ${icons.length} icons · ${tokens.count} tokens`);
	if (ghost.warnings.size === 0) log('  helpers  every Ghost helper the partials use is modelled');
	log(`  done     ${Date.now() - started}ms`);
}

// fileURLToPath, not string comparison: this folder's name has spaces in it.
if (fileURLToPath(import.meta.url) === process.argv[1]) {
	const quiet = process.argv.includes('--quiet');
	if (!quiet) console.log(`\n  ${NAME} — build\n`);
	build({ quiet }).catch((err) => {
		console.error(err.stack || err);
		process.exit(1);
	});
}
