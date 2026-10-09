/**
 * The tokens as DATA — read from src/foundation/tokens at call time, for
 * anything that is not a stylesheet: the package's tokens.json, the MCP
 * server's brand and briefs. One reader, so they can never disagree.
 *
 *   readTokenData(root) → { name: { light, dark?, resolved: { light, dark? } } }
 *
 * `light` / `dark` are the values as written; `resolved` follows var() to the
 * end and turns oklch() into #rrggbb, so a video editor gets a colour.
 */
import fs from 'node:fs';
import path from 'node:path';

export function readTokenData(root) {
	const tokenDir = path.join(root, 'src/foundation/tokens');
	const tokenFiles = fs.readdirSync(tokenDir).filter((f) => f.endsWith('.css') && f !== 'index.css' && f !== 'tailwind.css');
	const tokens = {};
	for (const f of tokenFiles) {
		const css = fs.readFileSync(path.join(tokenDir, f), 'utf8');
		const darkAt = css.search(/\[data-theme="dark"\]/);
		for (const m of css.matchAll(/(--im-[\w-]+)\s*:\s*([^;]+);/g)) {
			const name = m[1].slice(5);
			const value = m[2].replace(/\s+/g, ' ').trim();
			const inDark = darkAt !== -1 && m.index > darkAt;
			tokens[name] ||= {};
			tokens[name][inDark ? 'dark' : 'light'] ??= value;
		}
	}
	// `value` is the token as written; `resolved` follows var() to the end, so a
	// tool that is not a browser gets a colour and not a reference.
	const resolve = (v, theme, depth = 0) =>
		depth > 12 || typeof v !== 'string'
			? v
			: v.replace(/var\(--im-([\w-]+)(?:,\s*([^)]+))?\)/g, (_, name, fallback) => {
					const t = tokens[name];
					const next = t ? (theme === 'dark' ? (t.dark ?? t.light) : t.light) : fallback;
					return next === undefined ? _ : resolve(next, theme, depth + 1);
				});
	// A var() that is not ours (Ghost's --ghost-accent-color) resolves to its fallback.
	const outside = (v) => (typeof v === 'string' ? v.replace(/var\(--(?!im-)[\w-]+,\s*([^)]+)\)/g, '$1') : v);
	// oklch() → #rrggbb, for an editor or a renderer that has never heard of OKLCH.
	const hex = (v) =>
		typeof v !== 'string'
			? v
			: v.replace(/oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*\)/g, (_, L, C, H) => {
					const l = L / 100, a = C * Math.cos((H * Math.PI) / 180), b = C * Math.sin((H * Math.PI) / 180);
					const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
					const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
					const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
					const lin = [4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_, -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_, -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_];
					const gamma = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055);
					return `#${lin.map((x) => Math.round(Math.min(1, Math.max(0, gamma(x))) * 255).toString(16).padStart(2, '0')).join('')}`;
				});
	const final = (v, theme) => hex(outside(resolve(v, theme)));
	for (const t of Object.values(tokens)) {
		t.resolved = { light: final(t.light, 'light') };
		if (t.dark !== undefined) t.resolved.dark = final(t.dark, 'dark');
	}
	return tokens;
}
