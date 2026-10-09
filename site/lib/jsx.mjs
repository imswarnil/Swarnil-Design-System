/**
 * HTML → JSX, for the React tab beside every example (and for the MCP
 * server). The system's markup is plain HTML with classes and data
 * attributes, so turning it into JSX is a matter of spelling, not of
 * structure: class → className, style="" → style={{}}, void tags closed,
 * comments wrapped, braces in text escaped.
 *
 * A tokenizer over tags, not a parser: it never re-nests anything, so what
 * comes out has exactly the shape of what went in.
 */

const RENAME = {
	class: 'className',
	for: 'htmlFor',
	tabindex: 'tabIndex',
	readonly: 'readOnly',
	maxlength: 'maxLength',
	minlength: 'minLength',
	colspan: 'colSpan',
	rowspan: 'rowSpan',
	autocomplete: 'autoComplete',
	autofocus: 'autoFocus',
	autoplay: 'autoPlay',
	playsinline: 'playsInline',
	crossorigin: 'crossOrigin',
	srcset: 'srcSet',
	datetime: 'dateTime',
	enctype: 'encType',
	contenteditable: 'contentEditable',
	spellcheck: 'spellCheck',
	popovertarget: 'popoverTarget',
	popovertargetaction: 'popoverTargetAction',
	inputmode: 'inputMode',
	novalidate: 'noValidate',
	frameborder: 'frameBorder',
	allowfullscreen: 'allowFullScreen',
	referrerpolicy: 'referrerPolicy',
	fetchpriority: 'fetchPriority',
	'accept-charset': 'acceptCharset',
	'http-equiv': 'httpEquiv',
	'xlink:href': 'xlinkHref',
	'xml:space': 'xmlSpace',
	// An uncontrolled field keeps its markup's starting state.
	value: 'defaultValue',
	checked: 'defaultChecked',
	selected: 'defaultSelected',
};
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
// SVG presentation attributes are hyphenated in markup and camelCase in React.
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const SVG_HYPHEN = /^(stroke|fill|clip|font|text|stop|marker|color|dominant|alignment|shape|image|letter|word|flood|lighting|baseline|glyph|vector|paint|pointer|enable|overline|underline|strikethrough|transform)-/;

// Attribute values arrive entity-encoded (Handlebars escapes `=` as &#x3D;).
const NAMED = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: '\u00a0' };
const decode = (s) => s.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (m, e) => (e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : NAMED[e.toLowerCase()] ?? m));

const TAG = /<!--([\s\S]*?)-->|<(\/?)([a-zA-Z][\w:-]*)((?:\s+[^\s=>/"']+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>"']+))?)*)\s*(\/?)>/g;
const ATTR = /([^\s=>/"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>"']+)))?/g;

function style(css) {
	const pairs = css
		.split(';')
		.map((d) => d.trim())
		.filter(Boolean)
		.map((d) => {
			const i = d.indexOf(':');
			const prop = d.slice(0, i).trim();
			const value = d.slice(i + 1).trim().replace(/'/g, "\\'");
			return `${prop.startsWith('--') ? `'${prop}'` : camel(prop)}: '${value}'`;
		});
	return `{{ ${pairs.join(', ')} }}`;
}

function attrs(source, tag) {
	const out = [];
	for (const m of source.matchAll(ATTR)) {
		const raw = m[1];
		const encoded = m[2] ?? m[3] ?? m[4];
		const value = encoded === undefined ? undefined : decode(encoded);
		const lower = raw.toLowerCase();
		let name = RENAME[lower] || raw;
		if (lower === 'value' && (tag === 'button' || tag === 'option' || tag === 'data' || tag === 'li' || tag === 'meter' || tag === 'progress' || tag === 'param')) name = 'value';
		if (lower === 'selected' && tag === 'option') name = 'selected';
		if (!RENAME[lower] && SVG_HYPHEN.test(lower)) name = camel(lower);
		if (value === undefined) {
			// A bare data-/aria- attribute would become ="true" in React; keep it empty.
			out.push(/^(data|aria)-/.test(lower) ? `${name}=""` : name);
			continue;
		}
		if (lower === 'style') {
			out.push(`style=${style(value)}`);
			continue;
		}
		// An inline handler is code, not a string, in React.
		if (/^on[a-z]+$/.test(lower)) {
			out.push(`${'on' + lower[2].toUpperCase() + lower.slice(3)}={(event) => { ${value} }}`);
			continue;
		}
		// A JSX attribute string has no escapes: anything that needs one is an expression.
		out.push(/["\\\n]/.test(value) ? `${name}={${JSON.stringify(value)}}` : `${name}="${value}"`);
	}
	return out.length ? ` ${out.join(' ')}` : '';
}

// Braces in text are JSX expressions, and a backslash cannot stand alone:
// each is written as a string expression.
const text = (s) => s.replace(/[{}\\]/g, (b) => `{${JSON.stringify(b)}}`);
const RAW = new Set(['script', 'style']);

export function htmlToJsx(html) {
	let out = '';
	let last = 0;
	let top = 0;
	let depth = 0;
	for (const m of html.matchAll(TAG)) {
		if (m.index < last) continue; // inside a script or style already copied whole
		out += text(html.slice(last, m.index));
		last = m.index + m[0].length;
		if (m[1] !== undefined) {
			out += `{/*${m[1].replace(/\*\//g, '* /')}*/}`;
			continue;
		}
		const [, , close, name, attr, self] = m;
		const tag = name.toLowerCase();
		if (close) {
			out += `</${name}>`;
			depth--;
			continue;
		}
		if (depth === 0) top++;
		// A script or a style keeps its contents verbatim, as a string.
		if (RAW.has(tag) && !self) {
			const end = html.toLowerCase().indexOf(`</${tag}>`, last);
			const inner = html.slice(last, end === -1 ? html.length : end);
			last = end === -1 ? html.length : end + tag.length + 3;
			out += `<${name}${attrs(attr, tag)} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(inner)} }} />`;
			continue;
		}
		const shut = self || VOID.has(tag);
		out += `<${name}${attrs(attr, tag)}${shut ? ' />' : '>'}`;
		if (!shut) depth++;
	}
	out += text(html.slice(last));
	out = out.trim();
	// One element, or a fragment round several.
	return top > 1 ? `<>\n${out.replace(/^/gm, '\t')}\n</>` : out;
}
