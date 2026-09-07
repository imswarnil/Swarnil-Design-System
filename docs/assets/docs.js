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
