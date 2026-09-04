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

	/* ── Copy ────────────────────────────────────────────────────────────── */

	document.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-copy]');
		if (!btn) return;
		var root = btn.closest('.demo') || btn.closest('.cb');
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

	/* ── TOC scrollspy ───────────────────────────────────────────────────── */

	var links = $$('.toc__link');
	if (links.length) {
		var byId = {};
		links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
		var heads = Object.keys(byId).map(function (id) { return document.getElementById(id); }).filter(Boolean);

		var spy = new IntersectionObserver(function (entries) {
			entries.forEach(function (en) {
				if (!en.isIntersecting) return;
				links.forEach(function (a) { a.removeAttribute('aria-current'); });
				var a = byId[en.target.id];
				if (a) a.setAttribute('aria-current', 'true');
			});
		}, { rootMargin: '-72px 0px -70% 0px', threshold: 0 });

		heads.forEach(function (h) { spy.observe(h); });
	}

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

	var input = $('[data-search]');
	var out = $('[data-search-out]');
	if (input && out) {
		var index = null;

		var load = function () {
			if (index) return Promise.resolve(index);
			return fetch('/search.json')
				.then(function (r) { return r.json(); })
				.then(function (j) { index = j; return j; })
				.catch(function () { index = []; return index; });
		};

		var close = function () { out.hidden = true; out.innerHTML = ''; };

		input.addEventListener('input', function () {
			var q = input.value.trim().toLowerCase();
			if (!q) return close();
			load().then(function (rows) {
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

		document.addEventListener('keydown', function (e) {
			if (e.key === '/' && document.activeElement !== input
				&& !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
				e.preventDefault();
				input.focus();
			}
			if (e.key === 'Escape') { close(); input.blur(); }
		});
	}
}());
