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

	// A topic is a tag with a face: an icon and a colour. Ghost has neither, so
	// a theme keeps the lookup — by slug, in one place — and falls back to a
	// generic mark for a tag nobody has decided about yet.
	const TOPIC_FACE = {
		craft: { mark: 'component', color: '#ff5a1f', text: 'How things are built, and why they are built that way.' },
		'moving-to-europe': { mark: 'route', color: '#3178c6', text: 'Paperwork, money and the parts nobody warns you about.' },
		salesforce: { mark: 'zap', color: '#4ac26b', text: 'Eight years of it. The good parts and the expensive ones.' },
		career: { mark: 'briefcase', color: '#a855f7', text: 'Work, and what it is actually worth.' },
		travel: { mark: 'map-pin', color: '#f59e0b', text: 'Roads, itineraries and what each day cost.' },
	};
	const topics = fixtures.tags.map((t) => ({
		...t,
		...(TOPIC_FACE[t.slug] || { mark: 'tag', color: '#8b8b8b', text: `Everything filed under ${t.name}.` }),
	}));

	const demo = {
		topics,
		post: fixtures.posts[0],
		three: fixtures.posts.slice(0, 3),
		four: fixtures.posts.slice(0, 4),
		six: fixtures.posts.slice(0, 6),
		ten: fixtures.posts.slice(0, 10),
		video: '/assets/sections/home-hero-full/media/hero-loop.mp4',
		// Plain image URLs. {{lookup demo.six @index}} hands back a POST, not a
		// picture, and an object used as a src prints "[object Object]".
		shots: fixtures.posts.slice(0, 6).map((p) => p.feature_image),
		noImage: { ...fixtures.posts[1], feature_image: null, featured: false },
		locked: { ...fixtures.posts[2], access: false },
		// A feed with mixed access, for showing the locked / free marks.
		mixed: fixtures.posts.slice(0, 6).map((p, i) => ({
			...p,
			access: i !== 1 && i !== 4,
			free_label: i === 0 || i === 3,
		})),
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
			{ name: 'im-design-system', owner: 'imswarnil', text: 'A Tailwind 4 design system for Ghost themes: tokens, layout, components and ready-made sections.', lang: 'CSS', langColor: '#563d7c', stars: '1.2k', forks: '84', updated: '3 days ago', topics: ['design-system', 'tailwindcss', 'ghost', 'css'], visibility: 'Public', image: fixtures.posts[0].feature_image, demo_url: '#', code_url: '#', state: 'live', state_label: 'Live', stack: [{name:'CSS',icon:'palette',why:'Tailwind 4, one layer order'},{name:'Tailwind',icon:'layers',why:'Utilities, never @apply'},{name:'Handlebars',icon:'code',why:'Ghost speaks it natively'},{name:'Node',icon:'terminal',why:'The docs build, 500ms'}], took: '9 months', since: 'Jan 2026', commits: '1,204', url: '/collections/project/page/' },
			{ name: 'ghost-swarnil-theme', owner: 'imswarnil', text: 'The theme this site runs on. One install, somebody else\u2019s Ghost, and the rules that keep the two from destroying each other.', lang: 'Handlebars', langColor: '#f7931e', stars: '486', forks: '31', updated: '1 week ago', topics: ['ghost-theme', 'handlebars'], visibility: 'Public', image: fixtures.posts[1].feature_image, demo_url: '#', code_url: '#', state: 'live', state_label: 'Live', stack: [{name:'Handlebars',icon:'code'},{name:'Ghost',icon:'rocket'},{name:'CSS',icon:'palette'}], took: '4 months', since: 'May 2026', commits: '486', url: '/collections/project/page/' },
			{ name: 'links', owner: 'imswarnil', text: 'A link page on Cloudflare Workers that fetches GitHub, Ghost and YouTube per request.', lang: 'TypeScript', langColor: '#3178c6', stars: '212', forks: '18', updated: '2 weeks ago', topics: ['nextjs', 'cloudflare'], visibility: 'Public', image: fixtures.posts[2].feature_image, demo_url: '#', code_url: '#', state: 'building', state_label: 'Building', stack: [{name:'TypeScript',icon:'file-code'},{name:'Next.js',icon:'layers'},{name:'Cloudflare',icon:'globe'},{name:'Neon',icon:'layers'}], took: '6 weeks', since: 'Aug 2026', commits: '212', url: '/collections/project/page/' },
			{ name: 'field-notes', owner: 'imswarnil', text: 'Ten years of notebooks, scanned, tagged and searchable. Archived \u2014 read only.', lang: 'Python', langColor: '#3572a5', stars: '97', forks: '6', updated: '8 months ago', topics: ['archive', 'ocr'], visibility: 'Archived', image: fixtures.posts[3].feature_image, demo_url: '#', code_url: '#', state: 'archived', state_label: 'Archived', stack: [{name:'Python',icon:'terminal'},{name:'OCR',icon:'eye'}], took: '1 year', since: '2024', commits: '97', url: '/collections/project/page/' },
			{ name: 'swarnil-icons', owner: 'imswarnil', text: 'The icon set, drawn on a 24px grid and shipped as partials rather than as a font.', lang: 'SVG', langColor: '#ff9e0f', stars: '340', forks: '22', updated: '5 days ago', topics: ['icons', 'svg'], visibility: 'Public', image: fixtures.posts[4].feature_image, demo_url: '#', code_url: '#', state: 'live', state_label: 'Live', stack: [{name:'SVG',icon:'image'},{name:'Node',icon:'terminal'}], took: '3 months', since: 'Mar 2026', commits: '340', url: '/collections/project/page/' },
			{ name: 'no-ai-content', owner: 'imswarnil', text: 'A badge, a manifesto and a verifier for pages written by a person.', lang: 'JavaScript', langColor: '#f1e05a', stars: '1.9k', forks: '140', updated: 'yesterday', topics: ['manifesto', 'web'], visibility: 'Public', image: fixtures.posts[5].feature_image, demo_url: '#', code_url: '#', state: 'live', state_label: 'Live', stack: [{name:'JavaScript',icon:'file-code'},{name:'Vercel',icon:'globe'}], took: '2 weeks', since: 'Jun 2026', commits: '190', url: '/collections/project/page/' },
		],
		log: [
			{ when: 'March 2026', title: 'Rebuilt the token layer', text: 'Primitives and semantics split into two files. A component now names what a value is FOR and never what it is, which is what made dark mode a change to one file instead of forty.', state: 'done', tag: 'v0.4', shot: fixtures.posts[2].feature_image },
			{ when: 'June 2026', title: 'Forty components, one hover', text: 'Every card, row, tile and chip answers the same way: it fills. Three competing ideas — a border sharpening, a picture growing, a shadow lifting — were removed in an afternoon and nothing was lost.', state: 'done', tag: 'v0.5' },
			{ when: 'September 2026', title: 'Collections: post, project, video', text: 'The three page-shapes every site is made of, each one a collection, a card and a page, built from components that already existed. Nothing new was invented to make them.', state: 'current', tag: 'v0.7', shot: fixtures.posts[4].feature_image },
			{ when: 'Next', title: 'Ship it', text: 'A licence, a landing page, and a price.', state: 'upcoming' },
		],
		videos: [
			{ title: 'Driving the Amalfi Coast — the whole road in 8 minutes', time: '8:12', views: '412k', when: '3 days ago', thumb: fixtures.posts[0].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'I rebuilt my site on a design system I wrote myself', time: '18:47', views: '128k', when: '2 weeks ago', thumb: fixtures.posts[1].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'Why your Ghost theme fights you (and how to stop it)', time: '12:04', views: '96k', when: '1 month ago', thumb: fixtures.posts[2].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'Four years of consulting, in one honest list', time: '23:31', views: '210k', when: '2 months ago', thumb: fixtures.posts[3].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'The real cost of moving to Europe — every number', time: '15:58', views: '1.1M', when: '4 months ago', thumb: fixtures.posts[4].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'Building the comment wall live', time: 'LIVE', live: true, views: '2.4k watching', when: 'started 40 minutes ago', thumb: fixtures.posts[5].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'Every lens I own, ranked by how often I actually use it', time: '9:22', views: '74k', when: '5 months ago', thumb: fixtures.posts[0].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
			{ title: 'A whole blog, from empty folder to deployed, in one sitting', time: '41:06', views: '303k', when: '7 months ago', thumb: fixtures.posts[1].feature_image, channel: fixtures.author.name, avatar: fixtures.author.profile_image },
		],
		lessons: [
			{ n: '01', title: 'What a token is for', time: '7:12', state: 'done', kind: 'video', shot: 0, text: 'The difference between a value and a decision, and why only one of them belongs in a component.' },
			{ n: '02', title: 'Primitives and semantics', time: '11:40', state: 'done', kind: 'video', shot: 1, text: 'Two layers, and the rule that decides which one a new variable belongs in.' },
			{ n: '03', title: 'Dark mode for free', time: '14:05', state: 'current', kind: 'video', shot: 2, text: 'If the semantic layer is right this is one file. If it is not, it is forty.' },
			{ n: '04', title: 'The page shell', time: '9 min read', kind: 'article', shot: 3, text: 'Top bar, side nav, content. Written rather than filmed, because it is mostly markup.' },
			{ n: '05', title: 'The top bar and the side nav', time: '12:02', kind: 'video', shot: 4, locked: true, text: 'Sticky, floating, and the scroll listener that is not an observer.' },
			{ n: '06', title: 'Components that read tokens', time: '15:38', kind: 'video', shot: 5, locked: true, text: 'One button, every state, and no hard-coded colour anywhere in it.' },
			{ n: '07', title: 'Shipping it into Ghost', time: '11 min read', kind: 'article', shot: 0, locked: true, text: 'card_assets: false, the partials, and the gscan run that has to pass.' },
		],
		sections: [
			{ name: 'The token layer', n: '1', when: 'Updated Sep 2026', time: '33 min', text: 'Where every decision in the system is written down, and the two kinds of variable that make dark mode a one-file change.', from: 1, to: 3 },
			{ name: 'The page and its chrome', n: '2', when: 'Updated Sep 2026', time: '21 min', text: 'The shell, the bar and the navigation — the parts that are the same on every page and must therefore be right.', from: 4, to: 5 },
			{ name: 'Into a real theme', n: '3', when: 'New', time: '27 min', text: 'Components, Ghost\u2019s own card CSS, and the validation run that decides whether any of this ships.', from: 6, to: 7 },
		],
		testimonials: [
			{ by: 'Mara Lindqvist', role: 'Design lead, Nordvik', rating: '5', text: 'I have watched four of these and this is the only one where the instructor shows the thing failing first. The dark-mode lesson paid for the whole course.' },
			{ by: 'Tomas Reuter', role: 'Freelance, Berlin', rating: '5', text: 'Shipped a client theme in a fortnight using nothing but the token lesson and the shell lesson. Everything else was a bonus.' },
			{ by: 'Priya Raman', role: 'Front-end, Chennai', rating: '4', text: 'Excellent, and denser than it looks. Do not try to watch it at 2x — I did, and rewatched two lessons properly.' },
		],
		issues: [
			{ n: '042', day: '18', month: 'Sep', year: '2026', sent: '18 Sep 2026', title: 'The one where I deleted the theme', text: 'Why the site moved off a paid theme, what it cost, and the two-line audit that proves nothing came with it.', read: '62%', words: '1,240' },
			{ n: '041', day: '11', month: 'Sep', year: '2026', sent: '11 Sep 2026', title: 'Forty components and one hover', text: 'Three competing interactions removed in an afternoon, and nothing was lost.', read: '58%', words: '980' },
			{ n: '040', day: '4', month: 'Sep', year: '2026', sent: '4 Sep 2026', title: 'What a design system is actually for', text: 'Not consistency. Not speed. The ability to change your mind later.', read: '64%', words: '1,510' },
			{ n: '039', day: '28', month: 'Aug', year: '2026', sent: '28 Aug 2026', title: 'Every number from the move', text: 'Rent, tax, the deposit nobody mentions, and the month it took to get a bank account.', read: '71%', words: '2,300' },
		],
		shop: [
			{ name: 'Im Design System', rating: '4.9', reviews: '41', text: 'Tokens, a page shell, forty components and ready-made sections for Ghost themes.', cost: '$149', was: '$199', kind: 'Design system', badge: 'New' },
			{ name: 'Signal — a Ghost theme', rating: '4.7', reviews: '28', text: 'The theme this site runs on. Built on the system, and it comes with it.', cost: '$89', kind: 'Ghost theme' },
			{ name: 'The icon set', rating: '5.0', reviews: '12', text: '340 icons on a 24px grid, shipped as partials rather than as a font.', cost: '$29', kind: 'Icons' },
			{ name: 'Field Notes templates', rating: '4.4', reviews: '63', text: 'Six newsletter layouts that survive Outlook. Because somebody has to.', cost: 'Free', free: true, kind: 'Templates' },
		],
		uses: [
			{ name: 'Fujifilm X100VI', by: 'Fujifilm · compact camera', text: 'Every picture on this site since March. Small enough to be in a pocket, good enough not to want the other one.', cost: '\u20ac1,599', was: '\u20ac1,799', group: 'Camera', bought: 'March 2026', verdict: 'Keeping' },
			{ name: 'Roterfaden Taschenbegleiter', by: 'Roterfaden \u00b7 notebook cover', text: 'Four years old, four countries, still closes properly.', cost: '\u20ac139', group: 'Carried', bought: '2022', verdict: 'Keeping' },
			{ name: 'Herman Miller Aeron', by: 'Herman Miller \u00b7 chair', text: 'Bought used, twelve years old, will outlive me. The only piece of furniture worth this much.', cost: '\u20ac620', group: 'Desk', bought: '2023', verdict: 'Keeping' },
			{ name: 'iA Writer', by: 'Information Architects \u00b7 app', text: 'Drafts, before they are posts. The one app I have never replaced.', cost: '\u20ac29', group: 'Software', bought: '2019', verdict: 'Keeping' },
			{ name: 'Wooden Camera monitor cage', by: 'Wooden Camera \u00b7 rig', text: 'Holds the recorder and the mic without a single arm that needs tightening twice.', cost: '\u20ac210', group: 'Camera', bought: 'June 2026', verdict: 'Keeping' },
			{ name: 'Keychron Q1', by: 'Keychron \u00b7 keyboard', text: 'Third one. The first two died the way keyboards on a desk with coffee on it die.', cost: '\u20ac185', group: 'Desk', bought: 'August 2026', verdict: 'Keeping' },
			{ name: 'Rode Wireless ME', by: 'Rode \u00b7 microphone', text: 'Two transmitters, no receiver to lose, and it has never dropped a take.', cost: '\u20ac249', group: 'Camera', bought: 'January 2026', verdict: 'Keeping' },
			{ name: 'A standing desk', by: 'Unnamed \u00b7 furniture', text: 'Two years, four uses. Removed from this page and from the room.', cost: '\u20ac540', group: 'Desk', bought: '2024', verdict: 'Gone' },
		],
		usegroups: [
			{ name: 'On the desk', mark: 'monitor', text: 'Where most of the hours go. Two of these are on their third replacement.', tag: 'Desk' },
			{ name: 'For making video', mark: 'video', text: 'Everything that goes in the bag for a shoot, and nothing that does not.', tag: 'Camera' },
			{ name: 'Carried every day', mark: 'briefcase', text: 'Four things. If it is not in this group it is not worth carrying.', tag: 'Carried' },
			{ name: 'Software I pay for', mark: 'component', text: 'Bought once where possible. Subscriptions get reviewed every January.', tag: 'Software' },
		],
		snippets: [
			{ name: 'Fluid type without a media query', file: 'fluid-type.css', lang: 'CSS', lang_class: 'css', langColor: '#563d7c', lines: '1\n2', text: 'One clamp, one line, every size between — and it keeps working at a window size nobody wrote a breakpoint for.', snippet: 'font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);\nline-height: 1.5;' },
			{ name: 'A grid with no breakpoints', file: 'auto-grid.css', lang: 'CSS', lang_class: 'css', langColor: '#563d7c', lines: '1\n2', text: 'As many columns as fit, and never one too narrow to read. The min() is what stops it overflowing a phone.', snippet: 'grid-template-columns:\n\trepeat(auto-fill, minmax(min(16rem, 100%), 1fr));' },
			{ name: 'Throttle a scroll listener properly', file: 'on-scroll.js', lang: 'JavaScript', lang_class: 'js', langColor: '#f1e05a', lines: '1\n2\n3\n4', text: 'One frame, one measurement. An IntersectionObserver would be tidier and never fires in a tab that is not being painted.', snippet: 'let pending = false;\naddEventListener(\'scroll\', () =>\n\tpending || ((pending = true), requestAnimationFrame(measure)),\n{ passive: true });' },
			{ name: 'Related posts, without the one you are on', file: 'related.hbs', lang: 'Handlebars', lang_class: 'hbs', langColor: '#f7931e', lines: '1\n2\n3', text: 'The Ghost query everybody writes wrong the first time: the filter has to exclude the current id, or the post recommends itself.', snippet: '{{#get "posts" filter="tags:[{{primary_tag.slug}}]+id:-{{id}}" limit="3"}}\n\t{{#foreach posts}}…{{/foreach}}\n{{/get}}' },
			{ name: 'Centre a dialog without fighting its animation', file: 'dialog.css', lang: 'CSS', lang_class: 'css', langColor: '#563d7c', lines: '1\n2\n3', text: 'A translate centres it and then the open animation has to undo the translate. Margin does not move, so it does not fight.', snippet: 'dialog {\n\tinset: 0;\n\tmargin: auto;\n}' },
			{ name: 'Tile a one-pixel rule that Chrome keeps', file: 'ticks.css', lang: 'CSS', lang_class: 'css', langColor: '#563d7c', lines: '1\n2\n3', text: 'A repeating-linear-gradient drops stretches of 1px ticks over a long run. Tiling one tick does not.', snippet: 'background-image: linear-gradient(90deg, currentColor 1px, transparent 0);\nbackground-size: 0.5rem 100%;\nbackground-repeat: repeat-x;' },
		],
		prompts: [
			{ name: 'Rewrite without the adjectives', model: 'Any model', tokens: '~120 tokens', text: 'For a draft that reads like a brochure. It is the one I run on everything before I publish it.', body: 'Rewrite the text below. Remove every adjective that is not doing work, every sentence that restates the one before it, and every phrase that could be said by any company about any product.\n\nKeep the facts, the numbers and the voice. Return only the rewritten text.', reply: 'The road is forty kilometres and takes two hours. It was cut into the cliff in the 1840s and has not been widened since. Buses fold their mirrors in to pass each other.\n\nWe drove it east to west, which puts you on the sea side. Four days, five towns, \u20ac479.' },
			{ name: 'Find what is missing', model: 'Reasoning models', tokens: '~90 tokens', text: 'The review that catches the thing nobody wrote down. Better than any "review this" prompt I have tried.', body: 'Read the document below and list only what is MISSING: decisions implied but never stated, terms used but never defined, and steps that assume knowledge the reader has not been given.\n\nDo not summarise. Do not praise. A numbered list, shortest first.', reply: '1. "The rail" is used nine times and never defined.\n2. Step 3 assumes the reader has already run the build once.\n3. No statement of what happens when the API returns nothing.\n4. The decision to drop the second theme is implied by the diagram and never written down.' },
			{ name: 'Explain this code to its future author', model: 'Any model', tokens: '~70 tokens', text: 'Comments that say why, not what. The second paragraph is what makes it work.', body: 'Write the comment that belongs above this function. Explain WHY it is written this way and what breaks if it is changed \u2014 not what the lines do, which is already there.\n\nOne short paragraph. No preamble.', reply: 'Sized from both constraints at once because the clip has to fit a short laptop window and a narrow phone with the same rule. A height in vh with overflow hidden would hide the overflow rather than prevent it, and the controls would end up off the bottom of the screen.' },
			{ name: 'Turn a decision into a paragraph', model: 'Any model', tokens: '~80 tokens', text: 'For a changelog entry that a reader six months from now can act on.', body: 'I made this decision: [DECISION]. The reason was: [REASON].\n\nWrite one paragraph that states what changed, why, and what somebody should do differently because of it. No bullet points. Do not restate the decision as its own justification.', reply: 'The style scope is gone. Two skins meant every component was tuned twice and tested once, and the second one existed because it was interesting rather than because anybody asked for it. Anything that needs to look different now does it with a modifier class on the component itself.' },
		],
		reviews: [
			{ by: 'A theme developer', when: '3 weeks ago', rating: '5', text: 'The documentation is the product. I have bought four design systems and this is the first one where I did not have to read the CSS to find out what a component does.', verified: true },
			{ by: 'A Ghost agency', when: 'last month', rating: '5', text: 'Shipped two client themes on it. The card_assets: false note alone saved a day — nobody else warns you that Ghost\u2019s own card CSS is unlayered.', verified: true },
			{ by: 'A designer', when: '2 months ago', rating: '4', text: 'Excellent, with one gripe: I wanted a second skin and there deliberately is not one. Having read the reasoning I think they are right, but I still wanted it.', verified: true },
		],
		trips: [
			{ title: 'The Amalfi Coast, slowly', country: 'Italy', when: 'November 2025', days: '6', km: '410', route: ['Naples', 'Sorrento', 'Positano', 'Amalfi', 'Ravello'], text: 'Forty kilometres of road that takes two hours, and five days of not being in a hurry about it.', state: 'done' },
			{ title: 'Split to Hvar, by sail', country: 'Croatia', when: 'June 2024', days: '6', km: '180', route: ['Split', 'Brač', 'Hvar', 'Vis'], text: 'No engine, two people who could not sail, and one very patient skipper.', state: 'done' },
			{ title: 'The High Tatras, on foot', country: 'Slovakia', when: 'September 2023', days: '4', km: '62', route: ['Poprad', 'Štrbské Pleso', 'Gerlach', 'Tatranská Lomnica'], text: 'Four days, one night above the cloud layer, and more weather than the forecast promised.', state: 'done' },
			{ title: 'Tromsø, for the lights', country: 'Norway', when: 'February 2027', days: '5', km: '—', route: ['Oslo', 'Tromsø', 'Sommarøy'], text: 'Booked. Three nights of standing in a field being cold and hopeful.', state: 'upcoming' },
		],
		itinerary: [
			{ day: '1', legs: ['Naples', 'Sorrento'], title: 'Getting out of Naples', text: 'The Circumvesuviana takes an hour and is the single least pleasant part of the whole trip. Do it early and get it over with.', sleep: 'Sorrento', cost: '\u20ac64', km: '52', hours: '2h 10' },
			{ day: '2', legs: ['Sorrento'], title: 'Doing nothing, on purpose', text: 'A day of walking the cliff path and eating too much. The town is the least interesting thing on this coast and the best place to be based on it.', sleep: 'Sorrento', cost: '\u20ac41', km: '9', hours: '0h 40' },
			{ day: '3', legs: ['Sorrento', 'Positano'], title: 'The road', text: 'Two hours for forty kilometres, east to west, sea side. Buses fold their mirrors in to pass. Worth every minute.', sleep: 'Positano', cost: '\u20ac118', km: '41', hours: '2h 05', state: 'current', cta: 'The car we hired' },
			{ day: '4', legs: ['Positano', 'Amalfi'], title: 'Parking, and other lies', text: 'Ten euro an hour is the published price and fifteen is the actual one in August. Take the SITA bus.', sleep: 'Amalfi', cost: '\u20ac96', km: '17', hours: '1h 15', cta: 'The bus timetable' },
			{ day: '5', legs: ['Amalfi', 'Ravello'], title: 'Up the hill', text: 'Three hundred and forty metres above the sea and worth the climb for the view alone.', sleep: 'Ravello', cost: '\u20ac72', km: '7', hours: '0h 50' },
			{ day: '6', legs: ['Ravello', 'Naples'], title: 'The way back', text: 'West to east this time, on the cliff side, which is a completely different drive.', sleep: '\u2014', cost: '\u20ac88', km: '68', hours: '2h 30' },
		],
		experience: [
			{ title: 'Diving the Blue Hole', where: 'Dahab, Egypt', when: 'March 2026', figure: '30', unit: 'm', text: 'Eight minutes at thirty metres in water so clear the bottom looks close enough to touch, and is not. The most frightened I have been while perfectly safe.', kind: 'Diving' },
			{ title: 'First jump', where: 'Skydive Hungary', when: 'August 2025', figure: '4,000', unit: 'm', text: 'Forty seconds of freefall and a very long walk back to the hangar deciding whether to do it again. I did.', kind: 'Jumping' },
			{ title: 'Budapest marathon, first one', where: 'Budapest', when: 'October 2024', figure: '42.2', unit: 'km', text: 'Four hours eleven. The wall is real, it is at thirty-two kilometres, and it is not a metaphor.', kind: 'Running' },
			{ title: 'Sailing the Adriatic, no engine', where: 'Split → Hvar', when: 'June 2024', figure: '6', unit: 'days', text: 'Learned to read wind on water the hard way, which is the only way. Twice we went backwards.', kind: 'Sailing' },
			{ title: 'A night on Gerlach', where: 'High Tatras, Slovakia', when: 'September 2023', figure: '2,655', unit: 'm', text: 'Slept above the cloud layer. Woke at five to find the whole of Slovakia underneath it.', kind: 'Climbing' },
			{ title: 'Ice swimming, Lake Balaton', where: 'Balatonfüred', when: 'January 2023', figure: '2', unit: '°C', text: 'Ninety seconds. The cold is not the hard part; the breathing is.', kind: 'Swimming' },
		],
		wishlist: [
			{ title: 'Dive the Blue Hole', note: 'Dahab, Egypt \u2014 the one everybody warns you about', when: 'March 2026', state: 'done', group: 'Water', shot: 0, text: 'Eight minutes at thirty metres in water so clear the bottom looks close enough to touch, and is not. The most frightened I have been while perfectly safe.' },
			{ title: 'Swim between two continents', note: 'The Bosphorus, once a year, one morning only', when: 'Booked \u00b7 Jul 2027', state: 'booked', group: 'Water' },
			{ title: 'Learn to freedive to 20m', note: 'On one breath, which is the whole problem', when: 'Someday', group: 'Water' },
			{ title: 'See the northern lights', note: 'Troms\u00f8, February, and three nights of patience', when: 'Booked \u00b7 Feb 2027', state: 'booked', group: 'Cold' },
			{ title: 'Sleep on a glacier', note: 'Vatnaj\u00f6kull, if the guide says the ice is behaving', when: 'Someday', group: 'Cold' },
			{ title: 'Ice swim in the sea', note: 'Done the lake. The sea is a different argument.', when: 'Someday', group: 'Cold' },
			{ title: 'Jump out of a plane', note: 'Once, to find out. Then decide about twice.', when: 'August 2025', state: 'done', group: 'Air', shot: 1, text: 'Forty seconds of freefall and a very long walk back to the hangar deciding whether to do it again. I did, three weeks later.' },
			{ title: 'Run a marathon under four hours', note: 'The four is the point, not the marathon', when: 'April 2026', state: 'done', group: 'Ground', shot: 2, text: 'Three hours fifty-one. Eleven months of getting up at six, and I would not describe any of it as enjoyable until the last kilometre.' },
			{ title: 'Drive the whole Amalfi Coast', note: 'Slowly, and in the off season', when: 'November 2025', state: 'done', group: 'Ground', shot: 3, text: 'Six days, four towns, one road that takes two hours to drive forty kilometres. The one on this list I have already repeated.' },
			{ title: 'Walk a long-distance path end to end', note: 'The GR20, if the knees agree', when: 'Someday', group: 'Ground' },
			{ title: 'Learn to sail well enough to be useless-not-dangerous', note: 'Currently useless AND dangerous', when: 'Someday', group: 'Water' },
			{ title: 'Publish a thing somebody pays for', note: 'A theme, a system, anything with a price on it', when: 'September 2026', state: 'done', group: 'Work', shot: 4, text: 'Nine months, two rewrites, and one licence clause that turned out to be the whole architecture. It is in the shop.' },
		],
		episodes: [
			{ season: 's1', n: '01', title: 'Leaving Sorrento', time: '8:12', when: '4 Sep', state: 'done', text: 'Why this road exists, who cut it, and what it was for.' },
			{ season: 's1', n: '02', title: 'The first tunnel', time: '11:40', when: '11 Sep', state: 'done', text: 'Forty kilometres, two hours, and the bit where the bus folds its mirrors in.' },
			{ season: 's1', n: '03', title: 'Positano, and the parking', time: '14:05', when: '18 Sep', state: 'current', text: 'What it costs in August, and where to leave the car instead.' },
			{ season: 's1', n: '04', title: 'Amalfi, and the way back', time: '\u2014', when: 'Next Thursday', state: 'upcoming', text: 'East to west, on the sea side, with nothing left to prove.' },
			{ season: 's2', n: '01', title: 'The high road', time: '9:58', when: '2 Oct', state: 'upcoming', text: 'Ravello, three hundred metres up, and the drive nobody films.' },
			{ season: 's2', n: '02', title: 'Out of season', time: '\u2014', when: '9 Oct', state: 'upcoming', text: 'The same road in February, with the whole thing to ourselves.' },
			{ season: 'extra', n: '\u2014', title: 'Everything it cost', time: '4:30', when: '25 Sep', state: 'done', text: 'Four days, two people, one car. Every number, with the receipts.' },
		],
		seriesall: [
			{ name: 'The Amalfi Road', parts: '4', state: 'Running', text: 'Forty kilometres, two hours, and nobody in a hurry.', when: 'Since September 2026' },
			{ name: 'Building this design system', parts: '7', state: 'Finished', text: 'From an empty folder to a thing somebody would buy. Including the two rewrites.', when: '2026' },
			{ name: 'A year of consulting', parts: '5', state: 'Finished', text: 'What eight years of it actually taught me, and what it cost to learn.', when: '2025' },
			{ name: 'Moving to Europe', parts: '12', state: 'Finished', text: 'Paperwork, money, and the parts nobody warns you about.', when: '2024' },
		],
		stream: [
			{ month: 'September 2026', items: [
				{ kind: 'release', mark: 'rocket', label: 'Shipped a release', when: '21 Sep', title: 'Im Design System v0.6 — one look, nine collections', text: 'The style scope is gone. Two looks was one look too many: everything is one component styled once now, and the page is quieter for it.', url: '/collections/project/page/', links: ['Changelog', 'Repo'] },
				{ kind: 'video', mark: 'video', label: 'Published a video', when: '18 Sep', title: 'Driving the Amalfi Coast — the whole road in 8 minutes', text: 'Four days of footage, eight minutes of road, one lens.', url: '/collections/video/page/', image: 1 },
				{ kind: 'post', mark: 'pencil', label: 'Wrote a post', when: '14 Sep', title: 'Four hours on a pseudo-element', text: 'A registered custom property read by a ::before must inherit. It does not, by default. Nothing about that is in any tutorial.', url: '/collections/post/article/' },
				{ kind: 'product', mark: 'package', label: 'Bought something', when: '11 Sep', title: 'Fujifilm X100VI', text: 'Replaced the body I have carried for three years. Every picture on this site since is from it.', url: '/collections/uses/page/' },
			] },
			{ month: 'August 2026', items: [
				{ kind: 'trip', mark: 'map-pin', label: 'Went somewhere', when: '28 Aug', title: 'Back from the coast', text: 'Six days, four towns, and one road that takes two hours to drive forty kilometres.', url: '/collections/travel/trip/', image: 3 },
				{ kind: 'issue', mark: 'mail', label: 'Sent an issue', when: '22 Aug', title: 'Field Notes #24 — what the rebuild cost', text: 'Every hour, every decision I would take back, and the two that paid for the rest.', url: '/collections/newsletter/issue/' },
				{ kind: 'project', mark: 'folder', label: 'Started a project', when: '14 Aug', title: 'links — a link page on Workers', text: 'Fetches GitHub, Ghost and YouTube per request. No build step, no data scripts.', url: '/collections/project/page/' },
				{ kind: 'note', mark: 'message-square', label: 'Noted', when: '9 Aug', title: 'The dot is not a state', text: 'A dot beside a nav link means a notification everywhere else on the web. Changed it to a fill and a bolder label.' },
			] },
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
			// The whole tree, for /pages/sitemap/. It is the SAME array the side
			// nav is built from, so the sitemap cannot drift out of date — adding
			// a page adds a row there, and there is nothing to remember.
			sitemap: navigation.map((g) => ({
				...g,
				count: leaves(g.items).length,
			})),
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
	for (const f of ['im-motion.js', 'im-media.js', 'im-charts.js', 'im-content.js', 'im-ads.js', 'im-view.js']) fs.copyFileSync(path.join(SRC, 'js', f), path.join(DIST, 'assets', f));
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

	// A fixture field whose name is also a helper is invisible: `{{price}}` in a
	// product's context calls the HELPER, which prints `$[object Object]`, and
	// `{{code}}` calls a block helper with no block, which throws. Both have
	// happened. Name the collisions rather than finding them in the output.
	// These helpers READ the field they are named for out of the current
	// context, so a fixture carrying one is not a clash — it is how they work.
	const readsItsOwnField = new Set(['excerpt', 'reading_time', 'url', 'content']);
	const helperNames = new Set(Object.keys(hbs.helpers).filter((n) => !readsItsOwnField.has(n)));
	const clashes = new Map();
	const walkFixture = (value, trail) => {
		if (Array.isArray(value)) return value.forEach((v) => walkFixture(v, trail));
		if (!value || typeof value !== 'object') return;
		for (const key of Object.keys(value)) {
			if (helperNames.has(key)) clashes.set(key, `${trail}.${key}`);
		}
	};
	for (const [key, value] of Object.entries(demo)) walkFixture(value, `demo.${key}`);
	if (clashes.size) {
		log(`  CLASH    fixture field(s) shadowed by a Ghost helper: ${[...clashes.values()].join(', ')}`);
		log('           rename the field — the helper wins and prints nonsense');
	}
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
