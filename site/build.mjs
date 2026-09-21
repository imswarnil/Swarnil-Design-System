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
		// Sample content for the blocks under a post and beside it. None of it
		// is real; it is here so the docs can show a full page rather than an
		// empty frame, and so a change to those components breaks this build.
		comments: [
			{
				name: 'Mara Lindqvist', when: '3 days ago', likes: 12, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
				text: 'Drove this in April on your advice and the east-to-west tip alone was worth it. The bus drivers fold their mirrors in without slowing down, which I am still thinking about.',
				replies: [
					{ name: fixtures.author.name, badge: 'Author', mine: true, when: '3 days ago', likes: 4, avatar: fixtures.author.profile_image, text: 'The mirrors are the single most impressive thing on that road. Glad it held up.' },
				],
			},
			{ name: 'Tobias Reinhardt', when: '6 days ago', likes: 3, text: 'Parking in Positano at ten euro an hour is optimistic in August — we paid fifteen. Worth saying out loud for anyone going this summer.' },
			{ name: 'Ines Duarte', when: '2 weeks ago', likes: 1, text: 'The SITA bus is the answer and nobody wants to hear it.' },
		],
		series: [
			{ title: 'The road itself', url: '/collections/post/article/', state: 'done', part: '01' },
			{ title: 'Where to stop', url: '/collections/post/article/', state: 'done', part: '02' },
			{ title: 'What it costs', state: 'current', part: '03' },
			{ title: 'The way back', url: '/collections/post/article/', state: 'upcoming', part: '04' },
		],
		products: [
			{ name: 'Fujifilm X100VI', note: 'Every picture on this site', url: '#' },
			{ name: 'iA Writer', note: 'Drafts, before they are posts', url: '#' },
			{ name: 'Ghost', note: 'What this runs on', url: '#' },
			{ name: 'Figma', note: 'Where the design system starts', url: '#' },
		],
		projects: [
			{ name: 'im-design-system', owner: 'imswarnil', text: 'A Tailwind 4 design system for Ghost themes: tokens, layout, components and ready-made sections.', lang: 'CSS', langColor: '#563d7c', stars: '1.2k', forks: '84', updated: '3 days ago', topics: ['design-system', 'tailwindcss', 'ghost', 'css'], visibility: 'Public', image: fixtures.posts[0].feature_image, demo_url: '#', code_url: '#', url: '/collections/project/page/' },
			{ name: 'ghost-swarnil-theme', owner: 'imswarnil', text: 'The theme this site runs on. One install, somebody else\u2019s Ghost, and the rules that keep the two from destroying each other.', lang: 'Handlebars', langColor: '#f7931e', stars: '486', forks: '31', updated: '1 week ago', topics: ['ghost-theme', 'handlebars'], visibility: 'Public', image: fixtures.posts[1].feature_image, demo_url: '#', code_url: '#', url: '/collections/project/page/' },
			{ name: 'links', owner: 'imswarnil', text: 'A link page on Cloudflare Workers that fetches GitHub, Ghost and YouTube per request.', lang: 'TypeScript', langColor: '#3178c6', stars: '212', forks: '18', updated: '2 weeks ago', topics: ['nextjs', 'cloudflare'], visibility: 'Public', image: fixtures.posts[2].feature_image, demo_url: '#', code_url: '#', url: '/collections/project/page/' },
			{ name: 'field-notes', owner: 'imswarnil', text: 'Ten years of notebooks, scanned, tagged and searchable. Archived \u2014 read only.', lang: 'Python', langColor: '#3572a5', stars: '97', forks: '6', updated: '8 months ago', topics: ['archive', 'ocr'], visibility: 'Archived', image: fixtures.posts[3].feature_image, demo_url: '#', code_url: '#', url: '/collections/project/page/' },
			{ name: 'swarnil-icons', owner: 'imswarnil', text: 'The icon set, drawn on a 24px grid and shipped as partials rather than as a font.', lang: 'SVG', langColor: '#ff9e0f', stars: '340', forks: '22', updated: '5 days ago', topics: ['icons', 'svg'], visibility: 'Public', image: fixtures.posts[4].feature_image, demo_url: '#', code_url: '#', url: '/collections/project/page/' },
			{ name: 'no-ai-content', owner: 'imswarnil', text: 'A badge, a manifesto and a verifier for pages written by a person.', lang: 'JavaScript', langColor: '#f1e05a', stars: '1.9k', forks: '140', updated: 'yesterday', topics: ['manifesto', 'web'], visibility: 'Public', image: fixtures.posts[5].feature_image, demo_url: '#', code_url: '#', url: '/collections/project/page/' },
		],
		log: [
			{ when: 'March 2026', title: 'Rebuilt the token layer', text: 'Primitives and semantics split into two files. A component now names what a value is FOR and never what it is, which is what made dark mode a change to one file instead of forty.', state: 'done', tag: 'v0.4', shot: fixtures.posts[2].feature_image },
			{ when: 'June 2026', title: 'Forty components, one hover', text: 'Every card, row, tile and chip answers the same way: it fills. Three competing ideas — a border sharpening, a picture growing, a shadow lifting — were removed in an afternoon and nothing was lost.', state: 'done', tag: 'v0.5' },
			{ when: 'September 2026', title: 'Collections: post, project, video', text: 'The three page-shapes every site is made of, each one a collection, a card and a page, built from components that already existed. Nothing new was invented to make them.', state: 'current', tag: 'v0.7', shot: fixtures.posts[4].feature_image },
			{ when: 'Next', title: 'Ship it', text: 'A licence, a landing page, and a price.', state: 'upcoming' },
		],
		videos: [
			{ title: 'Driving the Amalfi Coast — the whole road in 8 minutes', time: '8:12', views: '412k', when: '3 days ago', watched: 40, thumb: fixtures.posts[0].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'I rebuilt my site on a design system I wrote myself', time: '18:47', views: '128k', when: '2 weeks ago', thumb: fixtures.posts[1].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'Why your Ghost theme fights you (and how to stop it)', time: '12:04', views: '96k', when: '1 month ago', watched: 100, thumb: fixtures.posts[2].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'Four years of consulting, in one honest list', time: '23:31', views: '210k', when: '2 months ago', thumb: fixtures.posts[3].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'The real cost of moving to Europe — every number', time: '15:58', views: '1.1M', when: '4 months ago', thumb: fixtures.posts[4].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'Building the comment wall live', time: 'LIVE', live: true, views: '2.4k watching', when: 'started 40 minutes ago', thumb: fixtures.posts[5].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'Every lens I own, ranked by how often I actually use it', time: '9:22', views: '74k', when: '5 months ago', thumb: fixtures.posts[0].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'A whole blog, from empty folder to deployed, in one sitting', time: '41:06', views: '303k', when: '7 months ago', thumb: fixtures.posts[1].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
		],
		issues: [
			{ n: '042', date: '18 Sep 2026', title: 'The one where I deleted the theme', text: 'Why the site moved off a paid theme, what it cost, and the two-line audit that proves nothing came with it.', read: '62%', words: '1,240' },
			{ n: '041', date: '11 Sep 2026', title: 'Forty components and one hover', text: 'Three competing interactions removed in an afternoon, and nothing was lost.', read: '58%', words: '980' },
			{ n: '040', date: '4 Sep 2026', title: 'What a design system is actually for', text: 'Not consistency. Not speed. The ability to change your mind later.', read: '64%', words: '1,510' },
			{ n: '039', date: '28 Aug 2026', title: 'Every number from the move', text: 'Rent, tax, the deposit nobody mentions, and the month it took to get a bank account.', read: '71%', words: '2,300' },
		],
		archive: [
			{ year: '2026', posts: 34, share: '100%' },
			{ year: '2025', posts: 28, share: '82%' },
			{ year: '2024', posts: 19, share: '56%' },
			{ year: '2023', posts: 11, share: '32%' },
		],
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
	// Notes for the page-frame tokens on the Shell and Space pages.
	hbs.registerHelper('frame_note', (name) => ({
		'--im-bar-height': 'Top bar. Also the offset for anything sticky, and for anchor scrolling.',
		'--im-nav-width': 'Side nav, open.',
		'--im-nav-rail': 'Side nav, as an icon rail.',
		'--im-gutter': 'The page\'s side padding. Fluid.',
		'--im-section-gap': 'Between blocks of a page. Fluid.',
		'--im-flow': 'Between blocks of prose; the default stack gap.',
	})[name] || '');

	const layouts = Object.fromEntries(walk(path.join(SITE, 'layouts'), (f) => f.endsWith('.hbs')).map((f) => [path.basename(f, '.hbs'), fs.readFileSync(f, 'utf8')]));
	// A nav item may carry `children` — one more level of the tree. Everything
	// that has a url is a page: prev/next and the search index read the leaves.
	const leaves = (items) => items.flatMap((i) => i.children || [i]);
	const flat = navigation.flatMap((g) => leaves(g.items));
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
				open: leaves(g.items).some((i) => i.url === url) || (url === '/' && gi <= 2),
				items: g.items.map((i) => {
					if (!i.children) return { ...i, current: i.url === url };
					const children = i.children.map((c) => ({ ...c, current: c.url === url }));
					return { ...i, children, open: children.some((c) => c.current) };
				}),
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
		// `shell:` in the frontmatter picks a different outer document — a demo
		// page meant to be loaded in an iframe uses the bare one.
		const html = ghost.render(layouts[meta.shell] || layouts.shell, {}, { ...root, body: inner });
		const out = path.join(DIST, url, 'index.html');
		fs.mkdirSync(path.dirname(out), { recursive: true });
		fs.writeFileSync(out, html);
		count++;
	}

	/* -- assets: laid out exactly as a Ghost theme's assets/ would be -- */
	fs.cpSync(path.join(ROOT, 'assets/fonts'), path.join(DIST, 'assets/fonts'), { recursive: true });
	fs.cpSync(path.join(ROOT, 'assets/brand'), path.join(DIST, 'assets/brand'), { recursive: true });
	// The brand mark is also the favicon, at the root where a browser looks for it.
	fs.copyFileSync(path.join(ROOT, 'assets/brand/mark.svg'), path.join(DIST, 'favicon.svg'));
	fs.copyFileSync(path.join(SRC, 'js/im.js'), path.join(DIST, 'assets/im.js'));
	fs.copyFileSync(path.join(SRC, 'js/im-code.js'), path.join(DIST, 'assets/im-code.js'));
	for (const f of ['im-motion.js', 'im-media.js', 'im-charts.js', 'im-content.js', 'im-ads.js']) fs.copyFileSync(path.join(SRC, 'js', f), path.join(DIST, 'assets', f));
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
