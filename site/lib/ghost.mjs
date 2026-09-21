/**
 * A small stand-in for Ghost's template runtime.
 *
 * The system's partials are real Ghost partials (partials/, sections/), so
 * the docs render THEM rather than a copy of their markup. Ghost adds ~30
 * helpers to Handlebars; the common ones are re-implemented here from Ghost's
 * public theme documentation, against sample content instead of a database.
 * Fidelity target: a partial renders the HTML Ghost would — not a full Ghost.
 *
 * An unknown helper renders nothing and is reported once, as a build warning.
 */
import fs from 'node:fs';
import path from 'node:path';
import Handlebars from 'handlebars';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const slugify = (s = '') =>
	String(s)
		.toLowerCase()
		.replace(/^#\s*/, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

const plain = (v) => (v instanceof Handlebars.SafeString ? v.toString() : v);

function walk(dir) {
	if (!fs.existsSync(dir)) return [];
	return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
		const p = path.join(dir, e.name);
		return e.isDirectory() ? walk(p) : p.endsWith('.hbs') ? [p] : [];
	});
}

/* ---- dates ---------------------------------------------------------------- */

function formatDate(input, format = 'll') {
	const d = input ? new Date(input) : new Date();
	if (Number.isNaN(d.getTime())) return '';
	if (format === 'll') format = 'MMM D, YYYY';
	const ord = (n) => n + (['th', 'st', 'nd', 'rd'][n % 100 > 10 && n % 100 < 14 ? 0 : n % 10] || 'th');
	const pad = (n) => String(n).padStart(2, '0');
	const map = {
		YYYY: d.getUTCFullYear(),
		YY: String(d.getUTCFullYear()).slice(2),
		MMMM: MONTHS[d.getUTCMonth()],
		MMM: MONTHS[d.getUTCMonth()].slice(0, 3),
		MM: pad(d.getUTCMonth() + 1),
		M: d.getUTCMonth() + 1,
		DD: pad(d.getUTCDate()),
		Do: ord(d.getUTCDate()),
		D: d.getUTCDate(),
		dddd: DAYS[d.getUTCDay()],
		ddd: DAYS[d.getUTCDay()].slice(0, 3),
		HH: pad(d.getUTCHours()),
		mm: pad(d.getUTCMinutes()),
	};
	return format.replace(/\[([^\]]*)\]|YYYY|YY|MMMM|MMM|MM|M|DD|Do|D|dddd|ddd|HH|mm/g, (tok, lit) =>
		lit !== undefined ? lit : map[tok],
	);
}

function timeago(input) {
	const s = (Date.now() - new Date(input).getTime()) / 1000;
	const units = [['year', 31536000], ['month', 2592000], ['day', 86400], ['hour', 3600], ['minute', 60]];
	for (const [name, secs] of units) {
		const n = Math.floor(s / secs);
		if (n >= 1) return `${n} ${name}${n > 1 ? 's' : ''} ago`;
	}
	return 'just now';
}

/* ---- a small NQL: the filter language of {{#get}} ------------------------ */
/*   a+b   AND      a,b   OR      (…)   group      key:-v   NOT
     key:[a,b]   any of      key:true|false|null                          */

function tokenizeFilter(str) {
	const out = [];
	let buf = '';
	let depth = 0;
	let quote = null;
	for (const ch of str) {
		if (quote) {
			buf += ch;
			if (ch === quote) quote = null;
		} else if (ch === "'" || ch === '"') {
			quote = ch;
			buf += ch;
		} else if (ch === '[') {
			depth++;
			buf += ch;
		} else if (ch === ']') {
			depth--;
			buf += ch;
		} else if (depth === 0 && '+,()'.includes(ch)) {
			if (buf.trim()) out.push(buf.trim());
			out.push(ch);
			buf = '';
		} else buf += ch;
	}
	if (buf.trim()) out.push(buf.trim());
	return out;
}

function parseFilter(str) {
	const toks = tokenizeFilter(str);
	let i = 0;
	const unary = () => {
		if (toks[i] === '(') {
			i++;
			const e = or();
			i++; // ')'
			return e;
		}
		return { term: toks[i++] };
	};
	const and = () => {
		const parts = [unary()];
		while (toks[i] === '+') {
			i++;
			parts.push(unary());
		}
		return parts.length > 1 ? { and: parts } : parts[0];
	};
	const or = () => {
		const parts = [and()];
		while (toks[i] === ',') {
			i++;
			parts.push(and());
		}
		return parts.length > 1 ? { or: parts } : parts[0];
	};
	return or();
}

function fieldValues(item, key) {
	switch (key) {
		case 'tag':
		case 'tags':
		case 'tags.slug':
			return (item.tags || []).map((t) => t.slug);
		case 'primary_tag':
		case 'primary_tag.slug':
			return item.primary_tag ? [item.primary_tag.slug] : [];
		case 'author':
		case 'authors':
		case 'authors.slug':
			return (item.authors || []).map((a) => a.slug);
		case 'primary_author':
			return item.primary_author ? [item.primary_author.slug] : [];
		default: {
			const v = key.split('.').reduce((o, k) => (o == null ? o : o[k]), item);
			return [v];
		}
	}
}

function testTerm(item, term) {
	const m = /^([\w.]+):(.*)$/s.exec(term || '');
	if (!m) return true;
	let [, key, raw] = m;
	let negate = false;
	if (raw.startsWith('-')) {
		negate = true;
		raw = raw.slice(1);
	}
	if (/^[<>]/.test(raw)) return true; // date/number comparisons: not modelled
	const wanted = (raw.startsWith('[') ? raw.slice(1, -1).split(',') : [raw]).map((v) => {
		v = v.trim().replace(/^['"]|['"]$/g, '');
		return v === 'true' ? true : v === 'false' ? false : v === 'null' ? null : v;
	});
	const have = fieldValues(item, key);
	const hit = have.some((h) => wanted.some((w) => (typeof w === 'boolean' || w === null ? (h ?? null) === w || Boolean(h) === w : String(h) === String(w))));
	return negate ? !hit : hit;
}

function testFilter(item, node) {
	if (!node) return true;
	if (node.and) return node.and.every((n) => testFilter(item, n));
	if (node.or) return node.or.some((n) => testFilter(item, n));
	return testTerm(item, node.term);
}

function sortBy(items, order) {
	if (!order) return items;
	const [field, dir = 'asc'] = String(order).trim().split(/\s+/);
	const sign = dir.toLowerCase() === 'desc' ? -1 : 1;
	const get = (o) => field.split('.').reduce((v, k) => (v == null ? v : v[k]), o);
	return [...items].sort((a, b) => {
		const x = get(a);
		const y = get(b);
		if (x === y) return 0;
		return (x > y ? 1 : -1) * sign;
	});
}

/* ---- the environment ------------------------------------------------------ */

export function createGhost({ fixtures, site, partialDirs = [], custom = {}, locale = {}, postsPerPage = 12 }) {
	const hbs = Handlebars.create();
	const warned = new Set();
	const warn = (msg) => {
		if (!warned.has(msg)) {
			warned.add(msg);
			console.warn(`  ⚠︎ ${msg}`);
		}
	};

	/* Partials — registered under the names Ghost would give them. */
	const partials = new Map();
	for (const { dir, prefix = '' } of partialDirs) {
		for (const file of walk(dir)) {
			const name = prefix + path.relative(dir, file).replace(/\.hbs$/, '').split(path.sep).join('/');
			const source = fs.readFileSync(file, 'utf8');
			partials.set(name, { name, file, source });
			hbs.registerPartial(name, source);
		}
	}

	const compile = (source) => hbs.compile(source, { preventIndent: true });
	const safe = (s) => new Handlebars.SafeString(s);
	const root = (options) => options.data.root || {};
	const blocks = (options) => (options.data.root.__blocks ||= {});

	/* -- logic --------------------------------------------------------------- */

	hbs.registerHelper('match', function (...args) {
		const options = args.pop();
		let result;
		if (args.length === 1) result = Boolean(plain(args[0]));
		else {
			let [a, op, b] = args.map(plain);
			if (args.length === 2) {
				b = op;
				op = '=';
			}
			// biome-ignore format: a lookup table reads better on one line each
			switch (op) {
				case '=': result = a === b; break;
				case '!=': result = a !== b; break;
				case '>': result = Number(a) > Number(b); break;
				case '<': result = Number(a) < Number(b); break;
				case '>=': result = Number(a) >= Number(b); break;
				case '<=': result = Number(a) <= Number(b); break;
				case '~': result = String(a ?? '').includes(b); break;
				case '~^': result = String(a ?? '').startsWith(b); break;
				case '~$': result = String(a ?? '').endsWith(b); break;
				default: result = false;
			}
		}
		if (!options.fn) return result;
		return result ? options.fn(this) : options.inverse(this);
	});

	hbs.registerHelper('foreach', function (items, options) {
		if (!options) return '';
		if (typeof items === 'function') items = items.call(this);
		let list = Array.isArray(items) ? items.map((v, i) => [i, v]) : items && typeof items === 'object' ? Object.entries(items) : [];
		const { limit, from = 1, to } = options.hash;
		const start = Number(from) - 1;
		let end = to ? Number(to) : list.length;
		if (limit) end = Math.min(end, start + Number(limit));
		list = list.slice(start, end);
		if (!list.length) return options.inverse(this);
		const columns = Number(options.hash.columns) || 0;
		return list
			.map(([key, value], index) => {
				const data = Handlebars.createFrame(options.data);
				Object.assign(data, {
					key,
					index,
					number: index + 1,
					first: index === 0,
					last: index === list.length - 1,
					even: index % 2 === 1,
					odd: index % 2 === 0,
					rowStart: columns ? index % columns === 0 : false,
					rowEnd: columns ? index % columns === columns - 1 : false,
				});
				return options.fn(value, { data, blockParams: [value, key] });
			})
			.join('');
	});

	hbs.registerHelper('has', function (options) {
		const h = options.hash;
		const list = (v) => String(v).split(',').map((s) => s.trim().toLowerCase());
		const checks = [];
		if (h.tag !== undefined) {
			const names = (this.tags || []).map((t) => t.name.toLowerCase());
			checks.push(list(h.tag).some((t) => names.includes(t)));
		}
		if (h.author !== undefined) {
			const names = (this.authors || []).map((a) => a.name.toLowerCase());
			checks.push(list(h.author).some((a) => names.includes(a)));
		}
		if (h.slug !== undefined) checks.push(list(h.slug).includes(String(this.slug ?? '').toLowerCase()));
		if (h.id !== undefined) checks.push(list(h.id).includes(String(this.id ?? '').toLowerCase()));
		if (h.visibility !== undefined) checks.push(list(h.visibility).includes(String(this.visibility ?? '').toLowerCase()));
		if (h.number !== undefined) checks.push(list(h.number).includes(String(options.data.number)));
		if (h.index !== undefined) checks.push(list(h.index).includes(String(options.data.index)));
		if (h.any !== undefined) checks.push(list(h.any).some((k) => Boolean(this[k])));
		if (h.all !== undefined) checks.push(list(h.all).every((k) => Boolean(this[k])));
		const ok = checks.length > 0 && checks.some(Boolean);
		return ok ? options.fn(this) : options.inverse(this);
	});

	hbs.registerHelper('is', function (contexts, options) {
		const current = root(options).context || [];
		const ok = String(contexts).split(',').some((c) => current.includes(c.trim()));
		return ok ? options.fn(this) : options.inverse(this);
	});

	/* -- data ---------------------------------------------------------------- */

	hbs.registerHelper('get', function (resource, options) {
		const h = options.hash;
		const source = { posts: fixtures.posts, pages: fixtures.pages, tags: fixtures.tags, authors: fixtures.authors, tiers: [], newsletters: [] }[resource];
		if (!source) {
			warn(`{{#get "${resource}"}} is not modelled — rendered as empty`);
			return options.inverse(this);
		}
		let filter = h.filter ? String(plain(h.filter)) : '';
		// Ghost resolves {{path}} inside a filter against the current context.
		filter = filter.replace(/\{\{\s*([\w.@]+)\s*\}\}/g, (_, p) => {
			const v = p.split('.').reduce((o, k) => (o == null ? o : o[k]), this);
			return v ?? '';
		});
		if (resource === 'tags' && !/visibility/.test(filter)) filter = filter ? `(${filter})+visibility:public` : 'visibility:public';

		let items = source.filter((item) => testFilter(item, filter ? parseFilter(filter) : null));
		items = sortBy(items, h.order || (resource === 'posts' ? null : null));

		const total = items.length;
		const limit = h.limit === 'all' ? total : Number(plain(h.limit)) || 15;
		const page = Number(h.page) || 1;
		items = items.slice((page - 1) * limit, page * limit);

		const pages = Math.max(1, Math.ceil(total / limit));
		const result = {
			[resource]: items,
			meta: { pagination: { page, limit, pages, total, next: page < pages ? page + 1 : null, prev: page > 1 ? page - 1 : null } },
		};
		if (!items.length) return options.inverse(this);
		return options.fn(result, { data: options.data, blockParams: [items, result.meta] });
	});

	for (const dir of ['prev_post', 'next_post']) {
		hbs.registerHelper(dir, function (options) {
			const i = fixtures.posts.findIndex((p) => p.id === this.id);
			const other = i === -1 ? null : fixtures.posts[dir === 'prev_post' ? i + 1 : i - 1];
			return other ? options.fn(other) : options.inverse(this);
		});
	}

	hbs.registerHelper('social_accounts', function (subject, options) {
		if (!options) {
			options = subject;
			subject = this;
		}
		const nets = {
			facebook: ['Facebook', (v) => `https://www.facebook.com/${v}`],
			twitter: ['X', (v) => `https://x.com/${String(v).replace(/^@/, '')}`],
			linkedin: ['LinkedIn', (v) => `https://www.linkedin.com/in/${v}`],
			github: ['GitHub', (v) => `https://github.com/${v}`],
			youtube: ['YouTube', (v) => `https://www.youtube.com/${v}`],
			instagram: ['Instagram', (v) => `https://www.instagram.com/${v}`],
			threads: ['Threads', (v) => `https://www.threads.net/${v}`],
			bluesky: ['Bluesky', (v) => `https://bsky.app/profile/${v}`],
			mastodon: ['Mastodon', (v) => v],
			tiktok: ['TikTok', (v) => `https://www.tiktok.com/${v}`],
		};
		const out = Object.entries(nets)
			.filter(([type]) => subject?.[type])
			.map(([type, [name, href]]) => options.fn({ type: type === 'twitter' ? 'x' : type, name, href: href(subject[type]) }));
		return out.length ? out.join('') : options.inverse(this);
	});

	/* -- output -------------------------------------------------------------- */

	hbs.registerHelper('t', (key, options) => {
		let text = locale[key] || key;
		for (const [k, v] of Object.entries(options?.hash || {})) text = text.replaceAll(`{${k}}`, plain(v));
		return text;
	});

	hbs.registerHelper('asset', (file) => safe(`/assets/${String(file).replace(/^\/?assets\//, '')}`));
	hbs.registerHelper('img_url', (src) => (src ? safe(String(plain(src))) : ''));
	hbs.registerHelper('concat', (...args) => {
		const options = args.pop();
		return args.map((a) => plain(a) ?? '').join(options.hash.separator || '');
	});
	hbs.registerHelper('encode', (v) => encodeURIComponent(plain(v) ?? ''));

	hbs.registerHelper('date', function (...args) {
		const options = args.pop();
		const value = args.length ? args[0] : this.published_at;
		if (options.hash.timeago) return timeago(value);
		return formatDate(value, options.hash.format);
	});

	hbs.registerHelper('reading_time', function (options) {
		const n = this.reading_time || 1;
		const { minute = '1 min read', minutes = '% min read' } = options.hash;
		return n <= 1 ? minute : String(minutes).replace('%', n);
	});

	hbs.registerHelper('excerpt', function (options) {
		const text = this.custom_excerpt || this.excerpt || this.plaintext || '';
		if (options.hash.words) return text.split(/\s+/).slice(0, Number(options.hash.words)).join(' ');
		return text.slice(0, Number(options.hash.characters) || 180);
	});

	hbs.registerHelper('plural', (n, options) => {
		const { empty = '', singular = '%', plural = '%' } = options.hash;
		const count = Number(n) || 0;
		return String(count === 0 ? empty : count === 1 ? singular : plural).replace('%', count);
	});

	hbs.registerHelper('url', function (options) {
		const url = this.url || '/';
		return options.hash.absolute ? site.url.replace(/\/$/, '') + url : url;
	});

	hbs.registerHelper('content', function () {
		return safe(this.html || '');
	});

	hbs.registerHelper('tiers', () => 'Members');
	hbs.registerHelper('price', (v) => (v == null ? '' : `$${v}`));

	hbs.registerHelper('link_class', (options) => {
		const { for: target, activeClass = 'nav-current', class: cls = '' } = options.hash;
		const here = root(options).relativeUrl || '/';
		return safe(`${cls}${plain(target) === here ? ` ${String(activeClass).trim()}` : ''}`);
	});

	hbs.registerHelper('post_class', function () {
		const tags = (this.tags || []).map((t) => `tag-${t.slug}`);
		return ['post', ...tags, this.featured ? 'featured' : '', this.feature_image ? '' : 'no-image'].filter(Boolean).join(' ');
	});

	hbs.registerHelper('body_class', (options) => root(options).body_class || '');
	hbs.registerHelper('meta_title', (options) => root(options).meta_title || site.title);
	hbs.registerHelper('ghost_head', () => safe(`<style>:root{--ghost-accent-color:${site.accent_color}}</style>`));
	hbs.registerHelper('ghost_foot', () => '');

	/* Ghost renders the theme's partials/navigation.hbs; hash options join its context. */
	hbs.registerHelper('navigation', (options) => {
		const h = options.hash;
		const here = root(options).relativeUrl || '/';
		const source = h.items || (h.type === 'secondary' ? site.secondary_navigation : site.navigation) || [];
		const navigation = source.map((item) => ({
			...item,
			slug: item.icon || slugify(item.label),
			current: item.url === here,
		}));
		return safe(hbs.partials.navigation ? compile(partials.get('navigation').source)({ ...h, navigation, isSecondary: h.type === 'secondary' }, { data: options.data }) : '');
	});

	hbs.registerHelper('pagination', function (options) {
		if (!this.pagination || !partials.has('pagination')) return '';
		return safe(compile(partials.get('pagination').source)({ ...this.pagination, ...options.hash }, { data: options.data }));
	});

	/* express-hbs layout blocks. */
	hbs.registerHelper('contentFor', function (name, options) {
		const store = blocks(options);
		(store[name] ||= []).push(options.fn(this));
		return '';
	});
	hbs.registerHelper('block', (name, options) => {
		const held = blocks(options)[name];
		return held ? safe(held.join('\n')) : '';
	});

	hbs.registerHelper('helperMissing', function (...args) {
		const options = args.pop();
		if (args.length || Object.keys(options.hash || {}).length) warn(`helper {{${options.name}}} is not modelled — rendered as empty`);
		return '';
	});

	/* -- rendering ----------------------------------------------------------- */

	function render(source, context = {}, rootData = {}) {
		const data = {
			site,
			custom: { ...custom, ...(rootData.custom || {}) },
			member: rootData.member ?? null,
			config: { posts_per_page: postsPerPage },
			page: {},
		};
		return compile(source)({ ...rootData, ...context }, { data });
	}

	return { hbs, render, compile, partials, custom, slugify, warnings: warned };
}
