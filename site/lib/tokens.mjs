/** Read the system's own token files, so the docs tables cannot drift from them. */
import fs from 'node:fs';
import path from 'node:path';
import { SRC } from './paths.mjs';

function block(css, from) {
	const open = css.indexOf('{', from);
	let depth = 0;
	for (let i = open; i < css.length; i++) {
		if (css[i] === '{') depth++;
		else if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i);
	}
	return '';
}

const declarations = (body) => [...body.matchAll(/(--im-[\w-]+)\s*:\s*([^;]+);/g)].map((m) => ({ name: m[1], value: m[2].replace(/\s+/g, ' ').trim() }));
const short = (v) => v.replace(/^var\(--im-([\w-]+)\)$/, '$1');

export function readTokens() {
	const dir = path.join(SRC, 'foundation/tokens');
	const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8');
	const prim = declarations(block(read('primitives.css'), 0));
	const sem = read('semantic.css');
	const code = read('code.css');

	const withDark = (css) => {
		const dark = new Map(declarations(block(css, css.indexOf(':root[data-theme="dark"]'))).map((d) => [d.name, d.value]));
		return declarations(block(css, css.indexOf(':root {'))).map((t) => ({
			...t,
			key: t.name.replace('--im-', ''),
			light: short(t.value),
			dark: dark.has(t.name) ? short(dark.get(t.name)) : null,
		}));
	};
	const semantic = withDark(sem);
	const is = (re) => (t) => re.test(t.name);
	const keyed = (list, prefix) => list.map((t) => ({ ...t, key: t.name.replace(prefix, '') }));

	return {
		surfaces: semantic.filter(is(/^--im-(canvas|surface|line|scrim)/)),
		text: semantic.filter(is(/^--im-(ink|body|muted|faint)$/)),
		accent: semantic.filter(is(/^--im-(accent|on-accent)$/)),
		status: semantic.filter(is(/^--im-(success|warning|danger|info)$/)),
		tints: semantic.filter(is(/-tint$/)),
		frame: semantic.filter(is(/^--im-(bar-height|nav-width|nav-rail|gutter|section-gap|flow)$/)),
		code: withDark(code),
		grays: keyed(prim.filter(is(/^--im-gray-/)), '--im-'),
		fonts: keyed(prim.filter(is(/^--im-font-/)), '--im-font-'),
		textSizes: prim.filter(is(/^--im-text-/)).map((t) => {
			const key = t.name.replace('--im-text-', '');
			return { ...t, key, leading: prim.find((p) => p.name === `--im-leading-${key}`)?.value || '' };
		}),
		weights: keyed(prim.filter(is(/^--im-weight-/)), '--im-weight-'),
		radius: keyed(prim.filter(is(/^--im-radius-/)), '--im-radius-'),
		widths: keyed(prim.filter(is(/^--im-width-/)), '--im-width-'),
		count: prim.length + semantic.length + declarations(block(code, code.indexOf(':root {'))).length,
	};
}
