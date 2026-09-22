/**
 * im-code.js — syntax highlighting and a copy button for code blocks.
 *
 * Written for this system; no dependency. It is a TOKENISER, not a parser:
 * one regular expression per language, alternatives tried left to right at
 * each position, so tokens can never overlap. Eight roles, coloured by the
 * --im-code-* tokens (src/foundation/tokens/code.css):
 *
 *     comment  string  keyword  number  function  tag  attr  variable  punct
 *
 * It upgrades every <pre><code class="language-xxx"> — which is exactly what
 * Ghost's editor emits for a code card — into:
 *
 *     <figure class="im-code">
 *       <figcaption class="im-code-bar"> language · [Copy] </figcaption>
 *       <pre><code>…<span class="im-tok-keyword">const</span>…</code></pre>
 *     </figure>
 *
 * Languages: markup (html, xml, svg, hbs/handlebars), css (scss), js (ts, jsx,
 * tsx, mjs), json, bash (sh, shell, zsh), yaml, plus a generic fallback for
 * anything else (comments, strings, numbers). Unknown input is never broken:
 * whatever no rule matches is emitted as plain, escaped text.
 */
(() => {
	const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

	/** rules: [role, source] pairs. Order is precedence. A role may be a function (match) => html. */
	function grammar(rules) {
		const re = new RegExp(rules.map(([, src]) => `(${src})`).join('|'), 'gmu');
		const groups = [];
		let n = 1;
		for (const [role, src] of rules) {
			groups.push([n, role]);
			n += 1 + new RegExp(`${src}|`).exec('').length - 1; // skip this rule's inner groups
		}
		return (code) => {
			let out = '';
			let last = 0;
			for (const m of code.matchAll(re)) {
				if (m.index > last) out += esc(code.slice(last, m.index));
				const [, role] = groups.find(([i]) => m[i] !== undefined);
				out += typeof role === 'function' ? role(m[0]) : `<span class="im-tok-${role}">${esc(m[0])}</span>`;
				last = m.index + m[0].length;
			}
			return out + esc(code.slice(last));
		};
	}

	const STR = `"(?:\\\\.|[^"\\\\\\n])*"|'(?:\\\\.|[^'\\\\\\n])*'`;
	const NUM = `\\b(?:0x[\\da-fA-F]+|\\d[\\d_]*(?:\\.\\d+)?(?:e[+-]?\\d+)?)\\b`;

	const js = grammar([
		['comment', `\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/`],
		['string', `${STR}|\`(?:\\\\.|[^\`\\\\])*\``],
		['keyword', `\\b(?:as|async|await|break|case|catch|class|const|continue|default|delete|do|else|export|extends|finally|for|from|function|if|import|in|instanceof|interface|let|new|of|return|static|super|switch|this|throw|try|type|typeof|var|void|while|yield)\\b`],
		['number', `${NUM}|\\b(?:true|false|null|undefined|NaN)\\b`],
		['function', `[A-Za-z_$][\\w$]*(?=\\s*\\()`],
		['variable', `\\b[A-Z][\\w$]*\\b`],
		['punct', `[{}()\\[\\];,.]|=>|[=!<>+\\-*/%&|?:]+`],
	]);

	const css = grammar([
		['comment', `\\/\\*[\\s\\S]*?\\*\\/`],
		['string', STR],
		['keyword', `@[\\w-]+|!important`],
		['variable', `--[\\w-]+|\\$[\\w-]+`],
		['function', `[\\w-]+(?=\\()`],
		['number', `#[\\da-fA-F]{3,8}\\b|-?\\b\\d*\\.?\\d+(?:%|[a-z]+)?\\b`],
		['attr', `[\\w-]+(?=\\s*:)`],
		['tag', `[.#][\\w-]+|::?[\\w-]+|&`],
		['punct', `[{}();:,>+~]`],
	]);

	const json = grammar([
		['attr', `"(?:\\\\.|[^"\\\\])*"(?=\\s*:)`],
		['string', `"(?:\\\\.|[^"\\\\])*"`],
		['number', `-?${NUM}|\\b(?:true|false|null)\\b`],
		['punct', `[{}\\[\\],:]`],
	]);

	const bash = grammar([
		['comment', `(?:^|(?<=\\s))#[^\\n]*`],
		['string', STR],
		['variable', `\\$\\{[^}]*\\}|\\$[\\w@#?*!-]+`],
		['keyword', `\\b(?:if|then|else|elif|fi|for|in|do|done|while|case|esac|function|return|export|local|sudo)\\b`],
		['function', `(?:^|(?<=[|;&]\\s*|\\$\\())\\s*[\\w./-]+`],
		['attr', `(?<=\\s)--?[\\w-]+`],
		['number', NUM],
		['punct', `[|&;<>]+`],
	]);

	const yaml = grammar([
		['comment', `#[^\\n]*`],
		['attr', `^[ \\t-]*[\\w.-]+(?=\\s*:)`],
		['string', STR],
		['number', `${NUM}|\\b(?:true|false|null|yes|no)\\b`],
		['punct', `[:\\-\\[\\]{},|>]`],
	]);

	const generic = grammar([
		['comment', `\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/|(?:^|(?<=\\s))#[^\\n]*`],
		['string', STR],
		['number', NUM],
	]);

	/* Inside a tag: its name, attribute names, attribute values. */
	const tagInner = grammar([
		['string', STR],
		['tag', `^<\\/?[\\w:-]+|\\/?>$`],
		['attr', `[\\w:@.-]+(?==)|(?<=\\s)[\\w:-]+(?=[\\s>/])`],
		['punct', `=`],
	]);

	/* Inside a Handlebars mustache: {{#if x}} {{> "partial" a=b}} */
	const hbsInner = grammar([
		['string', STR],
		['punct', `^\\{{2,4}[~!]?|[~]?\\}{2,4}$`],
		['keyword', `(?<=^\\{{2,4}~?)[#/^>*]+\\s*[\\w./@-]+|\\b(?:else|as|this)\\b`],
		['attr', `[\\w-]+(?==)`],
		['variable', `@[\\w.]+`],
		['number', `${NUM}|\\b(?:true|false|null)\\b`],
		['function', `(?<=\\()[\\w-]+`],
	]);

	const markup = grammar([
		['comment', `<!--[\\s\\S]*?-->|\\{\\{!--[\\s\\S]*?--\\}\\}|\\{\\{![\\s\\S]*?\\}\\}`],
		[(m) => hbsInner(m), `\\{{2,4}[\\s\\S]*?\\}{2,4}`],
		[(m) => `<span class="im-tok-keyword">${esc(m)}</span>`, `<!DOCTYPE[^>]*>`],
		[
			(m) => {
				// <style> / <script> bodies are highlighted in their own language.
				const parts = /^(<(style|script)\b[^>]*>)([\s\S]*?)(<\/\2>)$/i.exec(m);
				return tagInner(parts[1]) + (parts[2].toLowerCase() === 'style' ? css : js)(parts[3]) + tagInner(parts[4]);
			},
			`<(?:style|script)\\b[^>]*>[\\s\\S]*?<\\/(?:style|script)>`,
		],
		[(m) => tagInner(m), `<\\/?[\\w:-]+(?:"[^"]*"|'[^']*'|\\{\\{[\\s\\S]*?\\}\\}|[^>"'])*>`],
		['number', `&[\\w#]+;`],
	]);

	const LANGS = { markup, html: markup, xml: markup, svg: markup, hbs: markup, handlebars: markup, css, scss: css, js, javascript: js, mjs: js, ts: js, typescript: js, jsx: js, tsx: js, json, bash, sh: bash, shell: bash, zsh: bash, yaml, yml: yaml };
	const NAMES = { markup: 'HTML', html: 'HTML', xml: 'XML', svg: 'SVG', hbs: 'Handlebars', handlebars: 'Handlebars', css: 'CSS', scss: 'SCSS', js: 'JavaScript', javascript: 'JavaScript', mjs: 'JavaScript', ts: 'TypeScript', typescript: 'TypeScript', jsx: 'JSX', tsx: 'TSX', json: 'JSON', bash: 'Shell', sh: 'Shell', shell: 'Shell', zsh: 'Shell', yaml: 'YAML', yml: 'YAML', text: 'Text' };

	const COPY = '<svg class="im-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

	function enhance(code) {
		const pre = code.parentElement;
		if (!pre || pre.tagName !== 'PRE' || pre.closest('.im-code')) return;
		const lang = (/\blang(?:uage)?-([\w-]+)/.exec(code.className) || [])[1]?.toLowerCase() || 'text';
		const source = code.textContent.replace(/\n$/, '');
		code.innerHTML = (LANGS[lang] || generic)(source);

		// Something that already IS a window — the snippet editor — gets the
		// colours and nothing else. Wrapping it would give it a second title
		// bar and a copy button it deliberately does not have.
		if (pre.closest('.im-editor') || pre.hasAttribute('data-im-bare')) return;

		const figure = document.createElement('figure');
		figure.className = pre.classList.contains('im-code-light') ? 'im-code im-code-light' : 'im-code';
		pre.classList.remove('im-code-light');
		figure.dataset.imCopySource = '';
		const bar = document.createElement('figcaption');
		bar.className = 'im-code-bar';
		bar.innerHTML = `<span class="im-code-lang">${esc(NAMES[lang] || lang)}</span><button class="im-code-copy" type="button" data-im-copy="" aria-label="Copy code">${COPY}<span data-im-copy-label>Copy</span></button>`;
		pre.replaceWith(figure);
		figure.append(bar, pre);
	}

	const run = (root = document) => root.querySelectorAll('pre > code').forEach(enhance);
	window.imCode = { highlight: run, languages: Object.keys(LANGS) };
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => run());
	else run();
})();
