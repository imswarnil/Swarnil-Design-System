#!/usr/bin/env node
/**
 * Im Design System — an MCP server, so an AI assistant can build with the
 * system instead of guessing at it.
 *
 *   npx im-design-system-mcp          (or: node mcp/server.mjs)
 *
 * Tools
 *   list_components            every component: name, file, one line
 *   get_component name         its CSS, its partial (if any), its doc page
 *   list_tokens [group]        the --im-* custom properties
 *   search query               full-text over CSS, partials and docs
 *   get_page path              a docs page's source (e.g. collections/post/card)
 *   rules                      the naming and provenance rules, verbatim
 *
 *   setup stack                how to use it in html · react · next · vue · ghost · tokens
 *   get_example page [format]  a docs example as html · react · ghost, ready to paste
 *   export_tokens format       the tokens as css · scss · json · w3c · tailwind
 *
 *   brand                      the look in one answer: palette (hex, light and dark),
 *                              type, logo, grid, motion in ms and in frames, never-dos
 *   brief kind                 a recipe for making something else in this look:
 *                              thumbnail · video · social · slides · poster · og-image
 *                              · email · web · app
 *   image_prompt shape subject a prompt for an image model that stays in the look
 *
 * Everything is read from this repository at call time — nothing is copied
 * into the server, so it can never describe a component that has changed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { BRIEF_KINDS, STACKS, brand, brief, imagePrompt } from './guide.mjs';
import { readTokenData } from '../scripts/tokens-data.mjs';
import { htmlToJsx } from '../site/lib/jsx.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const at = (...p) => path.join(ROOT, ...p);
const read = (f) => (fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '');
const walk = (d, ok) => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
	const p = path.join(d, e.name);
	return e.isDirectory() ? walk(p, ok) : ok(p) ? [p] : [];
}) : []);

const firstLine = (css) => (css.match(/^\/\*\s*([^\n]*)/) || [])[1]?.replace(/\s*-+\s*$/, '') || '';

// Components live in two folders: the page's and the charts' (viz).
const COMPONENT_DIRS = ['src/components', 'src/viz'];

function components() {
	return COMPONENT_DIRS.flatMap((d) => walk(at(d), (p) => p.endsWith('.css') && !p.endsWith('index.css'))).map((f) => ({
		name: path.basename(f, '.css'),
		file: path.relative(ROOT, f),
		summary: firstLine(read(f)),
	}));
}

function tokens(group) {
	const out = [];
	for (const f of walk(at('src/foundation/tokens'), (p) => p.endsWith('.css'))) {
		if (group && !path.basename(f, '.css').includes(group)) continue;
		for (const m of read(f).matchAll(/(--im-[a-z0-9-]+):\s*([^;]+);/g)) out.push({ name: m[1], value: m[2].trim(), file: path.basename(f) });
	}
	return out;
}

const server = new McpServer({ name: 'im-design-system', version: JSON.parse(read(at('package.json'))).version || '0.0.0' });

server.tool('list_components', 'Every component in the system, with its file and a one-line summary.', {}, async () => ({
	content: [{ type: 'text', text: JSON.stringify(components(), null, 1) }],
}));

server.tool('get_component', 'A component\'s CSS, its Handlebars partial if it has one, and its documentation page.', { name: z.string() }, async ({ name }) => {
	const css = [...COMPONENT_DIRS, 'src/layout'].map((d) => read(at(d, `${name}.css`))).find(Boolean);
	const partial = read(at('partials/components', `${name}.hbs`));
	const docs = walk(at('site/pages'), (p) => p.endsWith('.hbs')).filter((p) => p.includes(`/${name}`) || read(p).includes(`${name}.css`)).map((p) => `--- ${path.relative(ROOT, p)}\n${read(p)}`).join('\n\n');
	if (!css) return { content: [{ type: 'text', text: `No component named "${name}". Try list_components.` }], isError: true };
	return { content: [{ type: 'text', text: `--- CSS\n${css}\n\n--- PARTIAL\n${partial || '(none: this component is markup-only; the CSS comment shows it)'}\n\n--- DOCS\n${docs || '(none)'}` }] };
});

server.tool('list_tokens', 'The --im-* custom properties. Optional group: primitives, semantic, motion, type, code.', { group: z.string().optional() }, async ({ group }) => ({
	content: [{ type: 'text', text: JSON.stringify(tokens(group), null, 1) }],
}));

server.tool('search', 'Full-text search over the CSS, partials, sections and docs.', { query: z.string() }, async ({ query }) => {
	const q = query.toLowerCase();
	const hits = [];
	for (const f of [...walk(at('src'), (p) => /\.(css|js)$/.test(p)), ...walk(at('partials'), (p) => p.endsWith('.hbs')), ...walk(at('sections'), () => true), ...walk(at('site/pages'), (p) => p.endsWith('.hbs'))]) {
		const lines = read(f).split('\n');
		lines.forEach((l, i) => { if (l.toLowerCase().includes(q)) hits.push(`${path.relative(ROOT, f)}:${i + 1}: ${l.trim().slice(0, 160)}`); });
		if (hits.length > 200) break;
	}
	return { content: [{ type: 'text', text: hits.join('\n') || 'nothing' }] };
});

server.tool('get_page', 'A docs page\'s source by its path, e.g. "collections/post/card" or "pages/membership".', { path: z.string() }, async ({ path: p }) => {
	const f = at('site/pages', p.replace(/^\/|\/$/g, ''), 'index.hbs');
	const alt = at('site/pages', `${p.replace(/^\/|\/$/g, '')}.hbs`);
	const src = read(f) || read(alt);
	return src ? { content: [{ type: 'text', text: src }] } : { content: [{ type: 'text', text: `No page at ${p}` }], isError: true };
});

server.tool('rules', 'The naming, layering and provenance rules a theme built on this system must follow.', {}, async () => ({
	content: [{ type: 'text', text: [
		'NAMING: everything the system defines is im-* / --im-*. Tailwind utilities stay unprefixed.',
		'LAYERS: theme, tokens, base, layout, components, effects, utilities (low → high). A component never sets margin; the container does.',
		'STATES: --im-current-* (light fill + heavier label) is "you are here"; --im-hover-bg is "this answers". The dot means new/live/unread, never active.',
		'GHOST: set "card_assets": false in package.json and ship im-content.js. Fixture/context fields must not share a helper name (date, price, code, url…).',
		'PROVENANCE: nothing from a commercial theme; every outside file is openly licensed and listed in PROVENANCE.md. Fonts: Geist, Geist Mono, Geist Pixel, and one hand, Caveat — nothing else.',
		'ANY STACK: the system is classes + data attributes + plain scripts. HTML, React, Next.js, Vue, Svelte, Astro and Ghost all use the same package (npm run package). Call setup for the stack, get_example for markup.',
		'MEDIA: every still that plays wears im-thumb im-thumb-play; members-only wears im-thumb-lock instead.',
		read(at('README.md')),
	].join('\n\n') }],
}));

const text = (t) => ({ content: [{ type: 'text', text: typeof t === 'string' ? t : JSON.stringify(t, null, 1) }] });
const fail = (t) => ({ content: [{ type: 'text', text: t }], isError: true });

/* ── using it ─────────────────────────────────────────────────────────── */
server.tool('setup', `How to install and use the system in a stack: ${STACKS.map((s) => s.key).join(' · ')}. Returns the steps and the files to write.`, { stack: z.enum(STACKS.map((s) => s.key)) }, async ({ stack }) => text(STACKS.find((s) => s.key === stack)));

// The docs build renders every example to HTML; this reads it back, so what
// it returns is exactly what the docs show. Needs `npm run build` once.
server.tool('get_example', 'The examples on a docs page, as html (rendered), react (JSX) or ghost (the Handlebars source). page is a docs path like "components/button" or "collections/post/card". index picks one; without it, all.', { page: z.string(), format: z.enum(['html', 'react', 'ghost']).default('html'), index: z.number().int().min(0).optional() }, async ({ page, format, index }) => {
	const clean = page.replace(/^\/|\/$/g, '');
	const html = read(at('dist', clean, 'index.html'));
	if (!html) return fail(`No built page at /${clean}/ — run \`npm run build\` first, or check the path (get_page lists sources).`);
	const un = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
	// Each example's code lives in tab panels named ex<N>-html | -react | -ghost.
	const panels = new Map();
	for (const m of html.matchAll(/id="(ex\d+)-(html|react|ghost)"[^>]*><pre class="example-code"><code class="language-[\w-]+">([\s\S]*?)<\/code>/g)) {
		if (!panels.has(m[1])) panels.set(m[1], {});
		panels.get(m[1])[m[2]] = un(m[3]);
	}
	// An example written in plain HTML has no Ghost tab: its Handlebars IS the HTML.
	const list = [...panels.values()].map((p) => p[format] ?? p.html);
	if (!list.length) return fail(`/${clean}/ has no examples.`);
	if (index !== undefined) return list[index] ? text(list[index]) : fail(`/${clean}/ has ${list.length} examples (0–${list.length - 1}).`);
	return text(list.map((c, i) => `--- example ${i}\n${c}`).join('\n\n'));
});

server.tool('to_react', 'Convert a piece of the system\'s HTML into React JSX (class → className, style → object, void tags closed).', { html: z.string() }, async ({ html }) => text(htmlToJsx(html)));

server.tool('export_tokens', 'Every token, resolved to real values (hex colours, ms, beziers), in a format another tool can read: css, scss, json, w3c (Design Tokens Community Group), tailwind (a theme.extend object).', { format: z.enum(['css', 'scss', 'json', 'w3c', 'tailwind']), theme: z.enum(['light', 'dark']).default('light') }, async ({ format, theme }) => {
	const t = readTokenData(ROOT);
	const value = (k) => t[k].resolved[theme] ?? t[k].resolved.light;
	const keys = Object.keys(t).sort();
	if (format === 'css') return text(`:root {\n${keys.map((k) => `\t--im-${k}: ${value(k)};`).join('\n')}\n}`);
	if (format === 'scss') return text(keys.map((k) => `$im-${k}: ${value(k)};`).join('\n'));
	if (format === 'json') return text(Object.fromEntries(keys.map((k) => [k, value(k)])));
	const kind = (k, v) => (/^#|rgb|oklch|color-mix/.test(v) ? 'color' : /ms$/.test(v) ? 'duration' : /^cubic-bezier/.test(v) ? 'cubicBezier' : /font-/.test(k) ? 'fontFamily' : /rem$|px$|em$/.test(v) ? 'dimension' : 'other');
	if (format === 'w3c') return text(Object.fromEntries(keys.map((k) => [k, { $value: value(k), $type: kind(k, value(k)) }])));
	const pick = (re) => Object.fromEntries(keys.filter((k) => re.test(k)).map((k) => [k.replace(re, ''), `var(--im-${k})`]));
	return text({ theme: { extend: { colors: Object.fromEntries(keys.filter((k) => kind(k, value(k)) === 'color').map((k) => [k, `var(--im-${k})`])), fontFamily: pick(/^font-/), borderRadius: pick(/^radius-/), transitionDuration: pick(/^duration-/), transitionTimingFunction: pick(/^ease-/) } }, note: 'Import im-design-system/tokens.css (or the full im.css) so the variables exist.' });
});

/* ── making something else in this look ───────────────────────────────── */
server.tool('brand', 'The look in one answer — palette (hex, light and dark), the four faces and their roles, the logo, the twelve-column grid, motion in ms and in frames at 30/60 fps, voice, and what it never does. Start here for anything that is not a web page.', {}, async () => text(brand(ROOT)));

server.tool('brief', `A step-by-step recipe for making something in this look: ${BRIEF_KINDS.join(' · ')}. Canvas sizes, grid, type, colour, motion timings, composition and a checklist — every value read from the tokens.`, { kind: z.enum(BRIEF_KINDS) }, async ({ kind }) => text(brief(ROOT, kind)));

server.tool('image_prompt', 'A prompt for an image model (thumbnail art, covers, banners) that stays inside the look — the context block, the shape, and what to reject. Shapes: thumbnail · short · cover · mark · course · product · portrait · pattern · banner.', { shape: z.string().default('thumbnail'), subject: z.string().default('[the subject]') }, async ({ shape, subject }) => {
	const p = imagePrompt(ROOT, shape, subject);
	return p ? text(p) : fail(`No shape "${shape}". Have: ${imagePrompt(ROOT).shapes.join(', ')}`);
});

await server.connect(new StdioServerTransport());
