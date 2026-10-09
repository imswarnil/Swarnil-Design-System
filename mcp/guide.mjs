/**
 * The guide — what the system LOOKS like, written so that anyone (or any
 * assistant) can make something else in its look: a thumbnail, a video edit,
 * a deck, a poster, an app in another stack. The MCP server serves it; the
 * docs' Install page renders the same STACKS.
 *
 * Every number that is a token is READ from the tokens at call time
 * (scripts/tokens-data.mjs), never typed here, so a brief cannot drift from
 * the system. What is written here is judgement: how the values are used.
 */
import { readTokenData } from '../scripts/tokens-data.mjs';

/* ── setting it up, per stack ─────────────────────────────────────────── */
/* One entry per stack the system runs in. `steps` are prose; `files` are
   { name, lang, code } — the docs show them as tabs, the MCP returns them. */
export const STACKS = [
	{
		key: 'html',
		label: 'HTML',
		summary: 'Any static page. Link the stylesheet, add two scripts, write classes.',
		steps: ['Link the CSS and scripts from the CDN (the docs site serves the current package), or copy package/ into your project and link the same paths.', 'Put the head snippet first in <head>, so the saved theme applies before the first paint.', 'Write markup with im-* classes — every example in the docs has an HTML tab to copy from.'],
		files: [
			{
				name: 'index.html',
				lang: 'html',
				code: `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://design.imswarnil.com/package/js/head.js"></script>
	<link rel="stylesheet" href="https://design.imswarnil.com/package/css/im.min.css">
	<script src="https://design.imswarnil.com/package/js/im.js" defer></script>
	<script src="https://design.imswarnil.com/package/js/im-motion.js" defer></script>
</head>
<body>
	<main class="im-wrap im-stack">
		<h1 data-im-in="line-up">Hello</h1>
		<a class="im-btn im-btn-primary" href="/start">Start</a>
	</main>
</body>
</html>`,
			},
		],
	},
	{
		key: 'react',
		label: 'React',
		summary: 'Vite, Create React App, Remix — any React app. Import the CSS once, render <ImScripts> once.',
		steps: ['Build the package (npm run package) and install the packed copy — not a symlink, or React loads twice.', 'Import the CSS once, at the entry.', 'Render <ImScripts /> once; it loads the behaviour after mount. Elements rendered later are picked up on their own.', 'Use the React primitives where they help, or plain className="im-…" everywhere else — every example has a React tab.'],
		files: [
			{ name: 'terminal', lang: 'bash', code: `cd design.imswarnil.com && npm run package && npm pack ./package\ncd ../my-app && npm install ../design.imswarnil.com/im-design-system-*.tgz` },
			{
				name: 'src/main.jsx',
				lang: 'jsx',
				code: `import 'im-design-system/css';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);`,
			},
			{
				name: 'src/App.jsx',
				lang: 'jsx',
				code: `import { ImScripts, Button, Badge, Card, CardBody, CardTitle, CardText, Wrap, Cols, Col } from 'im-design-system/react';
import { Icon } from 'im-design-system/react/icon';

export default function App() {
	return (
		<Wrap className="im-stack">
			<ImScripts features={['core', 'motion']} />
			<Cols>
				<Col span={8}>
					<Card>
						<CardBody>
							<Badge tone="accent">New</Badge>
							<CardTitle>One system</CardTitle>
							<CardText>Classes, data attributes and a few scripts.</CardText>
						</CardBody>
					</Card>
				</Col>
				<Col span={4}>
					<Button variant="primary">Start <Icon name="arrow-right" /></Button>
				</Col>
			</Cols>
		</Wrap>
	);
}`,
			},
		],
	},
	{
		key: 'next',
		label: 'Next.js',
		summary: 'The App Router. Server components stay server components; only <ImScripts> runs in the browser.',
		steps: ['Install the packed package, as for React.', 'In app/layout, import the CSS, put <ImHead /> in <head> and <ImScripts /> at the end of <body>.', 'Add suppressHydrationWarning to <html>: the head snippet sets data-theme before React hydrates.', 'Client-side navigation needs nothing more — the scripts watch the page for new markup.'],
		files: [
			{
				name: 'app/layout.jsx',
				lang: 'jsx',
				code: `import 'im-design-system/css';
import { ImHead, ImScripts } from 'im-design-system/react';

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<ImHead />
			</head>
			<body>
				{children}
				<ImScripts features={['core', 'motion', 'charts']} />
			</body>
		</html>
	);
}`,
			},
			{
				name: 'app/page.jsx',
				lang: 'jsx',
				code: `import { Button, Logo, Wrap } from 'im-design-system/react';

export default function Page() {
	return (
		<Wrap className="im-stack">
			<Logo size="xl" live />
			<h1 data-im-in="line-up">Built on Im</h1>
			<Button href="/about" variant="primary">About</Button>
		</Wrap>
	);
}`,
			},
		],
	},
	{
		key: 'vue',
		label: 'Vue · Svelte · Astro',
		summary: 'Any framework that renders HTML. Import the CSS, start the scripts in the browser, write classes.',
		steps: ['Import im-design-system/css at the entry (main.js, +layout.svelte, Layout.astro).', 'Call start() from im-design-system/client once the page is in the browser (onMounted, onMount, a <script> in Astro).', 'Copy markup from any example\'s HTML tab; Vue and Svelte take class="" as it is.'],
		files: [
			{
				name: 'main.js (Vue)',
				lang: 'js',
				code: `import 'im-design-system/css';
import { createApp } from 'vue';
import { start } from 'im-design-system/client';
import App from './App.vue';

createApp(App).mount('#app');
start(['core', 'motion']);`,
			},
			{
				name: 'src/layouts/Base.astro',
				lang: 'html',
				code: `---
import 'im-design-system/css';
import { headScript } from 'im-design-system/head';
---
<html lang="en">
	<head><script is:inline set:html={headScript} /></head>
	<body>
		<slot />
		<script>
			import { start } from 'im-design-system/client';
			start(['core', 'motion']);
		</script>
	</body>
</html>`,
			},
		],
	},
	{
		key: 'ghost',
		label: 'Ghost',
		summary: 'A Ghost theme vendors the system — CSS, scripts, fonts and the Handlebars partials — and commits it.',
		steps: ['Copy package/css, js and fonts into the theme\'s assets/, and package/ghost/partials and sections into the theme (the imswarnil theme does this with npm run ds:sync).', 'Set "card_assets": false in the theme\'s package.json and ship im-content.js — Ghost\'s own card CSS is unlayered and would beat every layer.', 'Use the partials: {{> "components/post-card"}}, {{> "shell/topbar"}}. Every example\'s Ghost tab shows the template.'],
		files: [
			{
				name: 'default.hbs',
				lang: 'hbs',
				code: `<!doctype html>
<html lang="{{@site.locale}}" data-im-transition="rise">
<head>
	{{> "shell/head-script"}}
	<link rel="stylesheet" href="{{asset "css/im.min.css"}}">
	{{ghost_head}}
</head>
<body class="{{body_class}}">
	{{> "shell/topbar"}}
	{{{body}}}
	{{ghost_foot}}
	<script src="{{asset "js/im.js"}}" defer></script>
	<script src="{{asset "js/im-motion.js"}}" defer></script>
	<script src="{{asset "js/im-content.js"}}" defer></script>
</body>
</html>`,
			},
		],
	},
	{
		key: 'tokens',
		label: 'Tokens only',
		summary: 'Not a website — a native app, a slide template, a video editor, a design tool. Take the values, not the CSS.',
		steps: ['tokens.json has every token, with `resolved` hex colours for light and dark.', 'css/tokens.css is the custom properties alone, for a stylesheet that wants the palette and type but none of the components.', 'The MCP tool export_tokens writes them as CSS, SCSS, JSON, W3C design tokens or a Tailwind theme.'],
		files: [
			{ name: 'tokens.css', lang: 'css', code: `@import 'im-design-system/tokens.css';\n\n.my-card {\n\tbackground: var(--im-surface);\n\tcolor: var(--im-ink);\n\tborder-radius: var(--im-radius-lg);\n\ttransition: background-color var(--im-duration-fast) var(--im-ease-out);\n}` },
			{ name: 'tokens.json', lang: 'js', code: `import data from 'im-design-system/tokens.json' with { type: 'json' };\n\nconst accent = data.tokens.accent.resolved.light;   // "#f22f46"\nconst ink = data.tokens.ink.resolved;               // { light: "#0a0a0a", dark: "#fff" }` },
		],
	},
];

/* ── the brand ────────────────────────────────────────────────────────── */
const v = (t, name, theme = 'light') => t[name]?.resolved?.[theme] ?? t[name]?.resolved?.light;
// A hairline is a translucent grey on screen; a flat file needs the colour it
// makes on the ground: `color-mix(in oklab, #737373 24%, transparent)` → mixed into the canvas.
const flatten = (value, ground) => {
	const m = /color-mix\(in oklab, (#[\da-f]{6}) (\d+)%, transparent\)/i.exec(value || '');
	if (!m) return value;
	const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
	const g = rgb(ground.length === 4 ? `#${[...ground.slice(1)].map((c) => c + c).join('')}` : ground);
	const a = rgb(m[1]);
	const p = Number(m[2]) / 100;
	return `#${a.map((c, i) => Math.round(c * p + g[i] * (1 - p)).toString(16).padStart(2, '0')).join('')}`;
};
const ms = (s) => Number(String(s).replace('ms', ''));
const frames = (d, fps) => Math.round((ms(d) / 1000) * fps);

export function brand(root) {
	const t = readTokenData(root);
	const light = { canvas: v(t, 'canvas'), surface: v(t, 'surface'), ink: v(t, 'ink'), body: v(t, 'body'), muted: v(t, 'muted'), hairline: flatten(v(t, 'line'), v(t, 'canvas')) };
	const dark = { canvas: v(t, 'canvas', 'dark'), surface: v(t, 'surface', 'dark'), ink: v(t, 'ink', 'dark'), body: v(t, 'body', 'dark'), muted: v(t, 'muted', 'dark'), hairline: flatten(v(t, 'line', 'dark'), v(t, 'canvas', 'dark')) };
	const durations = Object.fromEntries(['instant', 'fast', 'base', 'slow', 'long'].map((k) => [k, ms(v(t, `duration-${k}`))]));
	const eases = Object.fromEntries(['out', 'in', 'in-out', 'spring', 'glide'].map((k) => [k, v(t, `ease-${k}`)]));
	return {
		name: 'Im Design System — the look of imswarnil.com',
		in_one_line: 'Near-monochrome and editorial: one neutral ramp, Geist, hairlines instead of boxes, and ONE red accent used on exactly one thing — usually the recording-light dot.',
		accent: { hex: v(t, 'accent'), on_accent: v(t, 'on-accent'), rule: 'One element per view, never a fill behind running text, never a gradient. The accent is a light that is on, not a colour scheme.' },
		light,
		dark,
		neutrals: Object.fromEntries(['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((k) => [k, v(t, `gray-${k}`)])),
		status: { success: v(t, 'success'), warning: v(t, 'warning'), danger: v(t, 'danger'), info: v(t, 'info'), note: 'Status colours are for meaning only (an error, a success) — never decoration, never in a thumbnail.' },
		type: {
			faces: [
				{ family: 'Geist', role: 'everything: headings, body, UI. Tight tracking on headings (-0.02em to -0.035em), left aligned.', file: 'fonts/Geist-Variable.woff2' },
				{ family: 'Geist Mono', role: 'labels, numbers in tables, code, small caps captions (uppercase, +0.04em to +0.12em tracking).', file: 'fonts/GeistMono-Variable.woff2' },
				{ family: 'Geist Pixel', role: 'one number, a year, a level, a countdown — the signature face, used sparingly.', file: 'fonts/GeistPixel-Square.woff2' },
				{ family: 'Caveat', role: 'the hand: ONE note of one to three words per view ("say hi!", "day 12"), slightly tilted. Never a sentence.', file: 'fonts/Caveat-Variable.woff2' },
			],
			scale: Object.fromEntries(['xs', 'sm', 'base', 'lg', 'h3', 'h2', 'h1', 'display'].map((k) => [k, v(t, `text-${k}`)])),
			tracking: { tight: v(t, 'tracking-tight'), tighter: v(t, 'tracking-tighter'), wide: v(t, 'tracking-wide') },
			rule: 'Nothing else is ever loaded. One weight change per block (400 body, 600 headings). Real words, short.',
		},
		logo: {
			what: 'The letters, and a dot at the top right of the last one — the recording light. The square (the brand) is the FIRST letter and the dot, centred on a tile as one group.',
			wordmark: '"Swarnil" in Geist SemiBold, ink colour, with an accent dot the size of a full stop at the top right of the final letter, not touching it.',
			mark: 'An ink square (corner radius 26% of its side) with a white "S" and the red dot, the pair centred together.',
			rules: ['Live text, never redrawn or traced — except the favicon.', 'Never stretch, outline in another colour, add a shadow or put it on a busy picture without a plate.', 'The dot is a marker (new / live / on air), never a "you are here" state.'],
		},
		grid: {
			columns: 12,
			rule: 'Every layout is measured in twelve columns. A rail is 3–4 columns, a hero measure 7, a centred measure an EVEN number (6, 8, 10, 12). N-up grids only where N divides the columns (2, 3, 4, 6).',
			golden: 'φ (1.618) only INSIDE a block that already has its columns, or on a fixed canvas with none — 7 and 5 across the page, never 7.42.',
			drawn: 'On the site the grid is drawn: one very light hairline down the middle of each gutter. A canvas can do the same as a texture — at most.',
		},
		shape: { radii: Object.fromEntries(['sm', 'md', 'lg', 'xl', '2xl', 'full'].map((k) => [k, v(t, `radius-${k}`)])), buttons: 'Pills (radius full).', boxes: 'Hairlines (1px of the hairline colour) instead of boxes and shadows; a card with no border fills on hover with the next surface.' },
		motion: {
			durations_ms: durations,
			eases,
			at_30fps: Object.fromEntries(Object.entries(durations).map(([k, d]) => [k, frames(d, 30)])),
			at_60fps: Object.fromEntries(Object.entries(durations).map(([k, d]) => [k, frames(d, 60)])),
			rule: 'Arrive fast, land soft: ease-out in, ease-in out, glide for things that travel. About 1rem (or 2–4% of a canvas) of travel. Felt, not watched.',
			signature_cuts: { dot: 'The accent dot swells from a point until it fills the frame; the next shot opens inside it.', columns: 'Twelve vertical slats open left to right, one after another — the grid, wiping.' },
		},
		voice: 'Plain, first person, specific numbers. "I rebuilt my site on a design system I wrote" — not "Unlock your potential". Titles are short and lower-key; one word may carry the accent.',
		never: ['gradients', 'glows', 'glass / frosted panels', '3D or bevels', 'drop shadows on type', 'lens flare, bokeh', 'stock people', 'more than one accent colour', 'centred subject with even margins', 'emoji as decoration', 'arrows and circled faces on thumbnails', 'fonts other than Geist, Geist Mono, Geist Pixel, Caveat'],
	};
}

/* ── briefs: how to make X in this look ───────────────────────────────── */
/* Each brief is a recipe a person or an assistant can follow without the
   site in front of them: canvas, grid, type, colour, motion, a checklist. */
const BRIEFS = {
	thumbnail: (b) => ({
		title: 'YouTube thumbnail (and a Short cover)',
		canvas: ['1280 × 720 (16:9), safe from the bottom-right 160 × 90 — the timestamp sits there', 'Short / Reel cover: 1080 × 1920 (9:16), keep the bottom 25% quiet for the caption'],
		grid: 'Twelve columns with a 5% outer margin. The picture takes 7 columns, the words 5 — or the reverse. Never centred.',
		type: `Two to four words, Geist SemiBold, tracking ${b.type.tracking.tighter}, set BIG: the cap height about 14–18% of the canvas height. One word may be in the accent ${b.accent.hex}. A number can be Geist Pixel. One optional note in Caveat ("day 12").`,
		colour: `Ground ${b.light.canvas} or ${b.dark.canvas}; ink ${b.light.ink} / ${b.dark.ink}; the accent ${b.accent.hex} on ONE thing — a word, the dot, or one shape. Photographs natural light, muted, not teal-and-orange.`,
		composition: ['One subject, in a third, looking into the frame', 'A face, if any, large and cropped — not a cut-out with a stroke', 'The dot at the top right of the last word of the title, as in the logo', 'A thin hairline or the twelve-column texture is allowed, at 6–10% opacity'],
		series: 'Every thumbnail of a series shares the same side for the words, the same size, and changes only the picture and the accent word.',
		checklist: ['Readable at 168 × 94 (the sidebar size)?', 'Only one red thing?', 'Words in Geist, no outline or drop shadow?', 'Not centred?', 'Could it be any channel\'s? If yes, redo it.'],
	}),
	video: (b) => ({
		title: 'A video edit — titles, lower thirds, cuts, captions, grade',
		canvas: ['1920 × 1080 (16:9) or 3840 × 2160; 1080 × 1920 for vertical', 'Title-safe 90%, action-safe 95%'],
		timing: {
			note: 'The site\'s motion tokens, in frames, so the film and the website move the same way.',
			in: `a title arrives in ${b.motion.durations_ms.slow}ms (${b.motion.at_30fps.slow}f @30, ${b.motion.at_60fps.slow}f @60), curve ${b.motion.eases.out}`,
			out: `leaves in ~${Math.round(b.motion.durations_ms.slow * 0.7)}ms, curve ${b.motion.eases.in}`,
			cut: `a transition takes ~700ms; the signature cuts (dot, columns) up to ~1.1s, curve ${b.motion.eases.glide}`,
			stagger: 'lines of a title arrive 70–110ms apart; letters 30–45ms',
			hold: 'a lower third holds 4–6 s; a full-screen title 2–3 s',
		},
		titles: ['Line-up: each line rises through a slot (mask from below), ease-out', 'Type: wiped on in steps, for code or a URL, in Geist Mono', 'Pixel: arrives in Geist Pixel and resolves into Geist — for a number or a chapter', 'Boxed / tape: the words on an ink strip or the accent strip, one strip per line', 'Roll: one slot, three words rolling up, the last one stays'],
		lower_third: `A ${b.light.canvas} or ${b.dark.canvas} plate with a 1px hairline, name in Geist SemiBold, role in Geist Mono uppercase ${b.type.tracking.wide}, the red dot before the name. Left aligned on column 1, bottom margin 8%. Wipes in left→right, out by fading down.`,
		transitions: { dot: b.motion.signature_cuts.dot, columns: b.motion.signature_cuts.columns, ordinary: 'cut (most of the time), fade, wipe, iris, push, zoom-blur — pick two for the whole film' },
		captions: `Geist Medium, ${b.light.canvas} on a ${b.dark.canvas} 80% plate, radius 6–8px, two lines max, 42 characters a line, bottom-centre 10% up. Highlight the spoken word in the accent only if the edit is a Short.`,
		grade: 'Natural, slightly desaturated, lifted blacks no further than #0a0a0a, no teal-and-orange, no heavy vignette. Skin first.',
		sound: 'One tick or a soft "pop" on the dot appearing; nothing on every cut.',
		end_screen: 'Last 10–20 s: the canvas colour, the logo (square) top-left, two video slots on the right 7 columns, a subscribe circle; the dot pulses (scale 1 → 1.06, 3.2 s).',
		checklist: ['Every move ease-out in, ease-in out?', 'At most two kinds of transition?', 'One red thing per frame?', 'Titles left aligned on the grid, not centred?', 'Reduced chrome: no lens flares, light leaks or glitch presets'],
	}),
	social: (b) => ({
		title: 'Instagram / LinkedIn / X — posts, carousels, stories',
		canvas: ['Post 1080 × 1350 (4:5)', 'Carousel slides 1080 × 1350, the first is the cover', 'Story / Reel cover 1080 × 1920 (keep top 250px and bottom 340px clear)', 'LinkedIn / X image 1200 × 627'],
		grid: 'Twelve columns, 64px outer margin on 1080. Text block 8–10 columns, left aligned, starting on column 1.',
		type: `Cover: one statement, Geist SemiBold, ${b.type.tracking.tighter}, 88–120px. Slides: a Geist Mono index ("02 / 07") top-left, a 56–64px heading, 32–36px body max 30 words.`,
		colour: `Alternate ${b.light.canvas} and ${b.dark.canvas} slides at most once per carousel; the accent ${b.accent.hex} on one word or the dot per slide.`,
		carousel: ['Cover: the claim + the dot', 'One idea per slide', 'Last slide: the square logo, the handle in Geist Mono, one call to action'],
		highlights: 'Highlight covers: the ink square tile, one Lucide icon in white, 2px stroke — the same set as the site\'s icons.',
		checklist: ['One idea per slide?', 'Same margins on every slide?', 'Index in Geist Mono?', 'Nothing centred except the logo tile?'],
	}),
	slides: (b) => ({
		title: 'A slide deck (Keynote, Google Slides, PowerPoint, HTML)',
		canvas: ['1920 × 1080', 'Margins 96px; twelve columns with 24px gutters'],
		type: `Title 72–96px Geist SemiBold ${b.type.tracking.tighter}; body 32–40px Geist Regular ${b.light.body}; labels Geist Mono 20px uppercase. Fallback when Geist cannot be embedded: Inter — never Arial.`,
		master_slides: ['Title: the claim on 7 columns, a picture or a mark on 5', 'Section: the section number in Geist Pixel, huge, the name beside it', 'Statement: one sentence, 10 columns, the key word in the accent', 'Numbers: up to three stat tiles on 4 columns each', 'Chart: hairline axes, series colours from the accent outward, no 3D, no gridlines darker than the hairline', 'End: the square logo, a URL in Geist Mono'],
		colour: `Light ground ${b.light.canvas} for reading rooms; dark ${b.dark.canvas} for stages. Accent ${b.accent.hex} on one thing per slide.`,
		motion: `Build-ins: fade-up 1rem in ${b.motion.durations_ms.slow}ms; between slides: none or a 300ms dissolve. Magic Move for the one moment that deserves it.`,
		checklist: ['One idea per slide?', 'Left aligned?', 'No bullet slide longer than four lines?'],
	}),
	poster: (b) => ({
		title: 'Poster, flyer, print',
		canvas: ['A-series (A3 297 × 420 mm, A4 210 × 297 mm), 3mm bleed', 'Twelve columns, margins 1/16 of the short side'],
		type: 'Headline 7 columns, Geist Bold, as large as it will go; information in Geist Mono at the foot. The hand (Caveat) once, as a note in the margin.',
		colour: `Print the neutrals as rich black / paper; the accent as a spot colour near ${b.accent.hex} (Pantone 192-ish — proof it). Never a tint of the accent behind text.`,
		pattern: 'Line patterns (grid, rings, hatch, the golden rectangle) as a mark faded to one edge — never as wallpaper.',
		checklist: ['Headline readable at 3 m?', 'One red thing?', 'Bleed and safe margins?'],
	}),
	'og-image': (b) => ({
		title: 'Open-graph / link preview image',
		canvas: ['1200 × 630; keep everything inside 1100 × 530 — some apps crop'],
		layout: `Left 7 columns: the title in two lines, Geist SemiBold, ink on ${b.light.canvas}, tight tracking, the red dot at the top right of the last word. Right 5: a muted photograph or an abstract mark. A hairline under the title. The square logo bottom-left at 48px.`,
		checklist: ['Readable at 300px wide?', 'Title under ~60 characters?'],
	}),
	email: (b) => ({
		title: 'Email / newsletter',
		canvas: ['600px wide, single column, 32px padding'],
		type: 'Web-safe stack after Geist (most clients fall back): -apple-system, Segoe UI, Helvetica, Arial. Headings 28px / 1.2, body 17px / 1.6.',
		colour: `Background ${b.light.canvas}, text ${b.light.body}, headings ${b.light.ink}, links in the accent ${b.accent.hex} underlined, hairlines ${b.light.hairline}.`,
		notes: ['The date is the thumbnail — no placeholder art.', 'One button, a pill, ink background, white text.', 'Inline every style; no web fonts required to read it.'],
	}),
	web: (b) => ({
		title: 'A website or app in another stack',
		do: ['Use the package — install it and follow setup for your stack (HTML, React, Next.js, Vue/Svelte/Astro, Ghost).', 'Copy markup from the docs\' HTML or React tab instead of re-creating a component.', 'Lay pages out in .im-wrap / .im-cols with data-span, not your own grid.', 'Theme with the semantic tokens (--im-canvas, --im-ink, --im-accent…), never raw hex.'],
		if_you_cannot_use_the_css: `Recreate from tokens.json: neutral ramp, ${b.accent.hex} accent, Geist, radius ${b.shape.radii.lg} for cards and full for buttons, 1px hairlines, motion ${b.motion.durations_ms.fast}/${b.motion.durations_ms.base}/${b.motion.durations_ms.slow}ms with ease-out ${b.motion.eases.out}.`,
		states: 'Two states only: "you are here" = a light fill + a bolder label; hover = fill one surface deeper. Nothing scales, no coloured borders on focus except the ring.',
	}),
	app: (b) => ({
		title: 'A native app (iOS, Android, desktop)',
		do: [`Colours from tokens.json (resolved light/dark): canvas ${b.light.canvas}/${b.dark.canvas}, ink ${b.light.ink}/${b.dark.ink}, accent ${b.accent.hex}.`, 'Geist and Geist Mono bundled (OFL); system font only as a fallback.', 'Platform navigation patterns win — keep the look (neutrals, one accent, hairlines), not the web layout.', `Animations: ${b.motion.durations_ms.fast}–${b.motion.durations_ms.slow}ms, ease-out in; respect Reduce Motion.`],
	}),
};

export const BRIEF_KINDS = Object.keys(BRIEFS);

export function brief(root, kind) {
	const b = brand(root);
	const make = BRIEFS[kind];
	if (!make) return null;
	return { kind, ...make(b), always: { accent: b.accent, never: b.never } };
}

/* ── prompts for an image model ───────────────────────────────────────── */
export function imagePrompt(root, shape = 'thumbnail', subject = '[the subject]') {
	const b = brand(root);
	const context = `Visual system: editorial, Swiss-influenced, near-monochrome. Ground: off-white ${b.neutrals['50']} (or near-black ${b.dark.canvas} when asked). Ink: ${b.light.ink}. One accent: red ${b.accent.hex}, on exactly one element, never a fill behind text. Hairline rules (1px, light grey) instead of boxes or shadows. Composition on a grid with a clear margin; the subject sits in a third, never centred. Natural light, muted, slightly desaturated. No gradients, glows, glass, bevels, drop shadows, lens flare, bokeh, stock people. Flat, printed, calm. No text, no logos, no watermarks — the type is set afterwards.`;
	const SHAPES = {
		thumbnail: `16:9. ${subject}, photographic, with one strong shape the eye lands on. Space on one side (5 of 12 columns) for a two-word title. Nothing centred. No arrows, no circled faces.`,
		short: `9:16. ${subject}, vertical, subject in the upper two-thirds. The bottom third quiet — flat colour, sky, shadow — for the caption.`,
		cover: `16:10. ${subject}. One clear subject in the left or right third; quiet sky or ground on the other side.`,
		mark: `16:10. An abstract mark for ${subject}: one filled shape in the accent, two or three hairlines, one solid near-black shape, on the off-white ground, all in the left third. Flat vector, no perspective. Large empty area on the right.`,
		course: `16:9. A course about ${subject}. Left two-thirds: an abstract diagram of the idea in hairlines with ONE element in the accent. Right third empty for the title.`,
		product: `16:10. ${subject} as a flat editorial still life on the off-white ground, soft light from the upper left, one soft contact shadow only.`,
		portrait: `1:1. A head-and-shoulders portrait, natural window light from one side, plain mid-grey background, muted.`,
		pattern: `3:2. An abstract line pattern only — isometric grid, concentric rings, vertical rules or diagonal hatch — thin lines on the off-white ground, fading out to the left. No objects, no symbols.`,
		banner: `2560 × 1440 with the 1546 × 423 safe band in the middle. Off-white ground; a hairline grid fading to the left; one red dot. Nothing else.`,
	};
	if (!SHAPES[shape]) return null;
	return {
		shape,
		prompt: `${context}\n\n${SHAPES[shape]}`,
		reject_if: ['more than one accent colour, or the accent is a gradient', 'a drop shadow, glow or glass panel', 'any text, especially misspelled', 'the subject centred with even margins', 'it could be any company\'s header'],
		shapes: Object.keys(SHAPES),
	};
}
