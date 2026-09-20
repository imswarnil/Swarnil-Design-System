/* =============================================================================
   Docs site behaviour. Additive only — every feature here degrades to
   something usable with JavaScript off:

     demo tabs   → both panes exist; the code pane is [hidden] and the tab bar
                   is the only thing that stops working, so the preview shows
     copy        → the code is on the page as selectable text
     320px       → a preview at full width, which is the default anyway
     search      → a plain input; the nav is the real navigation
     theme       → resolved by the inline script in <head>, before paint
     TOC         → real anchors that work without scrollspy
   ========================================================================== */
(function () {
	'use strict';

	var $ = function (s, r) { return (r || document).querySelector(s); };
	var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

	/* ── Theme ───────────────────────────────────────────────────────────── */

	function label() {
		var el = $('[data-theme-label]');
		if (el) el.textContent = document.documentElement.dataset.theme === 'dark' ? 'Dark' : 'Light';
	}
	label();

	var themeBtn = $('[data-theme-toggle]');
	if (themeBtn) {
		themeBtn.addEventListener('click', function () {
			var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
			document.documentElement.dataset.theme = next;
			try { localStorage.setItem('sds-theme', next); } catch (e) {}
			label();
		});
	}

	/* ── Demo: preview / code tabs ───────────────────────────────────────── */

	$$('.demo').forEach(function (demo) {
		var tabs = $$('.demo__tab', demo);
		var panes = $$('[data-pane]', demo).filter(function (n) { return !n.classList.contains('demo__tab'); });

		function show(name) {
			tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t.dataset.pane === name)); });
			panes.forEach(function (p) { p.hidden = p.dataset.pane !== name; });
		}

		tabs.forEach(function (tab) {
			tab.addEventListener('click', function () { show(tab.dataset.pane); });
			// Roving arrow keys, which is what a tablist owes a keyboard user.
			tab.addEventListener('keydown', function (e) {
				if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
				e.preventDefault();
				var i = tabs.indexOf(tab);
				var next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
				next.focus();
				show(next.dataset.pane);
			});
		});

		/* 320px — the floor every component has to survive. */
		var narrow = $('[data-narrow]', demo);
		var stage = $('.demo__stage', demo);
		if (narrow && stage) {
			narrow.addEventListener('click', function () {
				var on = narrow.getAttribute('aria-pressed') === 'true';
				narrow.setAttribute('aria-pressed', String(!on));
				if (on) { delete stage.dataset.narrow; } else { stage.dataset.narrow = ''; }
			});
		}
	});

	/* A [data-dialog-open] button opens the dialog that follows it. Three
	   lines of delegation, so no demo carries an inline handler. */
	document.addEventListener('click', function (e) {
		var b = e.target.closest('[data-dialog-open]');
		if (!b) return;
		var d = b.nextElementSibling;
		if (d && d.tagName === 'DIALOG') d.showModal();
	});

	/* ── Toggle ──────────────────────────────────────────────────────────
	   Flips aria-pressed on any [data-toggle] button. That attribute IS the
	   contract — the stylesheet reads it for .btn-toggle's pressed dress and
	   for .btn-burst's spray — so this is the whole implementation of a
	   toggle in the docs, and a real app's own state code replaces it
	   without the CSS knowing. */

	document.addEventListener('click', function (e) {
		var b = e.target.closest('[data-toggle]');
		if (!b) return;
		var on = b.getAttribute('aria-pressed') === 'true';
		b.setAttribute('aria-pressed', String(!on));
		/* Re-running an animation needs the attribute to actually change, and
		   it just did — but a second press within the animation's own life
		   would otherwise be swallowed, so the marks are reset by hand. */
		if (!on) {
			$$('.btn__pop > *', b).forEach(function (m) {
				m.style.animation = 'none';
				void m.offsetWidth;
				m.style.animation = '';
			});
		}
	});

	/* ── Copy ────────────────────────────────────────────────────────────── */

	document.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-copy]');
		if (!btn) return;
		/* Most specific first. A .codeplayer copy button lives INSIDE a .demo
		   when it is being demonstrated, and closest('.demo') would hand back the
		   demo's own source pane instead of the block the reader clicked. */
		var root = btn.closest('.codeplayer') || btn.closest('.cb') || btn.closest('.demo');
		var code = root && root.querySelector('code');
		if (!code) return;
		var done = function () {
			var was = btn.textContent;
			btn.textContent = 'Copied';
			btn.setAttribute('data-copied', '');
			setTimeout(function () { btn.textContent = was; btn.removeAttribute('data-copied'); }, 1400);
		};
		if (navigator.clipboard) {
			navigator.clipboard.writeText(code.textContent).then(done, function () {});
		}
	});

	/* ── Burger ──────────────────────────────────────────────────────────── */

	var burger = $('.bar__burger');
	var side = $('.side');
	if (burger && side) {
		burger.addEventListener('click', function () {
			var open = burger.getAttribute('aria-expanded') === 'true';
			burger.setAttribute('aria-expanded', String(!open));
			if (open) { delete side.dataset.open; } else { side.dataset.open = ''; }
		});
	}

	/* ── Search ──────────────────────────────────────────────────────────── */

	/* Every .search widget on the page wires itself: the bar has one, and the
	   docs sidebar has another. One shared, lazily-fetched index behind both —
	   fetching /search.json twice for the same page would be silly. */
	var index = null;
	var loadIndex = function () {
		if (index) return Promise.resolve(index);
		return fetch('/search.json')
			.then(function (r) { return r.json(); })
			.then(function (j) { index = j; return j; })
			.catch(function () { index = []; return index; });
	};

	var searches = $$('[data-search]').map(function (input) {
		var out = input.closest('.search').querySelector('[data-search-out]');
		if (!out) return null;

		var close = function () { out.hidden = true; out.innerHTML = ''; };

		input.addEventListener('input', function () {
			var q = input.value.trim().toLowerCase();
			if (!q) return close();
			loadIndex().then(function (rows) {
				var hits = rows.filter(function (r) {
					return (r.t + ' ' + r.g + ' ' + (r.d || '')).toLowerCase().indexOf(q) !== -1;
				}).slice(0, 8);
				out.hidden = false;
				out.innerHTML = hits.length
					? hits.map(function (r) {
						return '<a class="search__hit" href="' + r.u + '"><b>' + r.t + '</b><span>' + r.g + '</span></a>';
					}).join('')
					: '<p class="search__empty">Nothing matches &ldquo;' + q.replace(/[<>&]/g, '') + '&rdquo;</p>';
			});
		});

		input.addEventListener('blur', function () { setTimeout(close, 150); });
		return { input: input, close: close };
	}).filter(Boolean);

	if (searches.length) {
		document.addEventListener('keydown', function (e) {
			/* "/" focuses the FIRST search on the page — the one in the bar.
			   Escape closes every open panel, wherever focus happens to be. */
			if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
				e.preventDefault();
				searches[0].input.focus();
			}
			if (e.key === 'Escape') {
				searches.forEach(function (s) { s.close(); s.input.blur(); });
			}
		});
	}

	/* ── Hero background video ───────────────────────────────────────────────
	   The iframe is BUILT HERE rather than sitting in the markup, for three
	   reasons: it stays off the critical path, it never loads at all under
	   prefers-reduced-motion (house rule — motion is honest), and the video id
	   lives in exactly one place, the data attribute on the element. */
	var vbox = $('[data-hero-video]');
	if (vbox && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
		var id = vbox.dataset.heroVideo;
		var params = [
			'autoplay=1', 'mute=1', 'loop=1', 'playlist=' + id, 'controls=0',
			'playsinline=1', 'modestbranding=1', 'rel=0', 'disablekb=1',
			'fs=0', 'iv_load_policy=3'
		].join('&');
		var f = document.createElement('iframe');
		/* -nocookie is the privacy-preserving host; the page sets no cookies
		   until the visitor actually interacts with a YouTube control, and
		   there are no controls. */
		f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?' + params;
		f.title = 'Background footage';
		f.tabIndex = -1;
		f.setAttribute('aria-hidden', 'true');
		f.setAttribute('frameborder', '0');
		f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
		f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
		f.addEventListener('load', function () { vbox.dataset.on = ''; });
		vbox.appendChild(f);
	}
}());

/* =============================================================================
   THE COMPONENT INDEX — filter and order

   Progressive, like everything else on this site: with JavaScript off the
   index still renders every card in A–Z order, which is the useful default.
   This adds the name filter, the group chips and the order switch.

   Nothing here fetches or re-renders. The cards are in the markup; this only
   sets `hidden` on the ones that do not match and re-orders the rest, so the
   list can never disagree with the build that produced it.
   ========================================================================== */

(() => {
	const index = document.querySelector('[data-index]');
	if (!index) return;

	const grid = index.querySelector('[data-index-grid]');
	const search = index.querySelector('[data-index-search]');
	const count = index.querySelector('[data-index-count]');
	const empty = index.querySelector('[data-index-empty]');
	const cards = [...grid.querySelectorAll('.xcard')];

	let order = 'az';
	let group = 'all';

	/* The A–Z order inserts a letter heading before each new initial. They are
	   created once and re-used, because creating them per keystroke would make
	   the filter re-flow the whole grid on every character. */
	const letters = new Map();

	const letterHead = (ch) => {
		if (!letters.has(ch)) {
			const h = document.createElement('p');
			h.className = 'xindex__letter';
			h.setAttribute('aria-hidden', 'true');
			h.textContent = ch;
			letters.set(ch, h);
		}
		return letters.get(ch);
	};

	const apply = () => {
		const q = (search?.value || '').trim().toLowerCase();
		let shown = 0;

		letters.forEach((h) => h.remove());

		const visible = cards.filter((card) => {
			const okName = !q || card.dataset.name.includes(q);
			const okGroup = group === 'all' || card.dataset.group === group;
			const on = okName && okGroup;
			card.hidden = !on;
			if (on) shown += 1;
			return on;
		});

		if (order === 'az') {
			visible.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
			let last = null;
			visible.forEach((card) => {
				if (card.dataset.letter !== last) {
					last = card.dataset.letter;
					grid.append(letterHead(last));
				}
				grid.append(card);
			});
		} else {
			/* By group, then by name inside it — the sidebar's order, so the
			   two ways of finding a component agree with each other. */
			visible.sort((a, b) =>
				a.dataset.group.localeCompare(b.dataset.group) ||
				a.dataset.name.localeCompare(b.dataset.name));
			visible.forEach((card) => grid.append(card));
		}

		/* Hidden cards go to the end, out of the way of the sort above. */
		cards.filter((c) => c.hidden).forEach((c) => grid.append(c));

		if (count) count.textContent = `${shown} component${shown === 1 ? '' : 's'}`;
		if (empty) empty.hidden = shown !== 0;
	};

	search?.addEventListener('input', apply);

	index.querySelectorAll('[data-index-sort]').forEach((btn) => {
		btn.addEventListener('click', () => {
			order = btn.dataset.indexSort;
			index.querySelectorAll('[data-index-sort]')
				.forEach((b) => b.classList.toggle('is-on', b === btn));
			apply();
		});
	});

	index.querySelectorAll('[data-index-group]').forEach((btn) => {
		btn.addEventListener('click', () => {
			group = btn.dataset.indexGroup;
			index.querySelectorAll('[data-index-group]')
				.forEach((b) => b.classList.toggle('is-on', b === btn));
			apply();
		});
	});

	/* "/" focuses the docs search; the index gets its own, so a reader already
	   on this page filters rather than jumping to the site search. */
	addEventListener('keydown', (e) => {
		if (e.key !== '/' || e.metaKey || e.ctrlKey) return;
		if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
		e.preventDefault();
		search?.focus();
	});

	apply();
})();

/* =============================================================================
   CONTENTS SCROLL-SPY — which heading you are actually in

   The contents list is rendered by build.py with no active state, so until now
   it was a list of links that never said where you were. This marks one — and
   only one — with `aria-current`, the same attribute the sidebar and the
   navbar use, so the styling cannot disagree with the accessibility tree.

   ── THREE THINGS THIS DELIBERATELY DOES NOT DO ────────────────────────────

   NO IntersectionObserver. An observer answers "did a heading just cross a
   line", which is the wrong question. The right one is "which heading did I
   most recently pass", and that has an answer at every scroll position —
   including the two an observer gets wrong: at the top of a page nothing has
   crossed yet, and a short final section may never reach the line at all, so
   it could never be marked.

   NO requestAnimationFrame. rAF is SUSPENDED in a background tab, so a spy
   built on it stops marking whenever the page is not frontmost and then works
   the instant you look at it — the worst kind of bug to chase.

   NO CACHED OFFSETS. Measuring once and re-measuring on resize sounds cheaper
   and is a source of silent staleness: a demo that reflows, a font that swaps,
   an image that loads, an accordion that opens — every one of them moves the
   headings and none of them fires `resize`. Reading the rects live costs one
   layout read per scroll over a list that is never longer than a page's
   headings, and it cannot go stale.
   ========================================================================== */

(() => {
	const toc = document.querySelector('.toc');
	if (!toc) return;

	const links = [...toc.querySelectorAll('.toc__link')];
	if (links.length < 2) return;

	const items = links
		.map((link) => ({ link, el: document.getElementById(link.getAttribute('href').slice(1)) }))
		.filter((t) => t.el);
	if (items.length < 2) return;

	let current = null;

	const mark = () => {
		/* The reading line: a quarter down the viewport. A heading becomes
		   "the one you are in" when it passes this, not when it leaves. */
		const line = innerHeight * 0.25;

		/* At the very bottom the last heading wins outright — its section may
		   be two lines long and never reach the line on any screen.

		   `scrollY > 0` guards the FIRST call, which runs before the page has
		   finished laying out: for a moment `scrollHeight` is barely taller
		   than the viewport, "at the end" is true, and the list opens marking
		   the last heading on a page you have not scrolled. You cannot be at
		   the end of a document you have not moved in. */
		const atEnd = scrollY > 0
			&& innerHeight + scrollY >= document.documentElement.scrollHeight - 2;

		let found = items[0];
		if (atEnd) {
			found = items[items.length - 1];
		} else {
			for (const item of items) {
				if (item.el.getBoundingClientRect().top <= line) found = item;
			}
		}

		if (found.link === current) return;
		if (current) current.removeAttribute('aria-current');
		found.link.setAttribute('aria-current', 'true');
		current = found.link;

		/* Keep the marked item visible when the list scrolls inside its own
		   pinned box. `nearest` so it never jumps a list already showing it. */
		found.link.scrollIntoView({ block: 'nearest' });
	};

	mark();
	addEventListener('scroll', mark, { passive: true });
	addEventListener('resize', mark);
})();
