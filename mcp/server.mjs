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
 * Everything is read from this repository at call time — nothing is copied
 * into the server, so it can never describe a component that has changed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const at = (...p) => path.join(ROOT, ...p);
const read = (f) => (fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '');
const walk = (d, ok) => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
	const p = path.join(d, e.name);
	return e.isDirectory() ? walk(p, ok) : ok(p) ? [p] : [];
}) : []);

const firstLine = (css) => (css.match(/^\/\*\s*([^\n]*)/) || [])[1]?.replace(/\s*-+\s*$/, '') || '';

function components() {
	return walk(at('src/components'), (p) => p.endsWith('.css') && !p.endsWith('index.css')).map((f) => ({
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
	const css = read(at('src/components', `${name}.css`)) || read(at('src/layout', `${name}.css`));
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
		'PROVENANCE: nothing from a commercial theme; every outside file is openly licensed and listed in PROVENANCE.md. Fonts: Geist, Geist Mono, Geist Pixel only.',
		'MEDIA: every still that plays wears im-thumb im-thumb-play; members-only wears im-thumb-lock instead.',
		read(at('README.md')),
	].join('\n\n') }],
}));

await server.connect(new StdioServerTransport());
