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

	/* ── The TOC timeline ────────────────────────────────────────────────
	   Three jobs, one scroll listener:

	     progress   how far through the page you are        (the fill)
	     current    which chapter you are in                (the active dot)
	     played     which chapters you have already passed  (the dim dots)

	   Progress is measured against the ARTICLE, not the document. A long
	   footer would otherwise mean the bar never fills — you would finish
	   reading with the playhead at 80% and it would look broken rather than
	   accurate.

	   Where the browser supports scroll-driven animations the fill is animated
	   off the main thread and this listener only handles the counter and the
	   dots, so a slow frame can never make the bar lag the page.
	*/

	var toc = $('.toc');
	if (toc) {
		var links = $$('[data-toc-link]', toc);
		var time = $('[data-toc-time]', toc);
		var list = $('.toc__list', toc);
		var article = $('.doc') || document.body;

		var heads = links.map(function (a) {
			return document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
		});

		var ticking = false;

		// The page as a tape: total running time is the read estimate
		// (200 wpm — the standard figure), elapsed is progress through the
		// article. mm:ss both sides, tabular figures in the CSS so the digits
		// do not jitter. At the end the readout says what a deck would say.
		var words = (article.textContent.match(/\S+/g) || []).length;
		var totalSec = Math.max(60, Math.round(words / 200 * 60));

		var mmss = function (s) {
			s = Math.max(0, Math.round(s));
			var m = Math.floor(s / 60), r = s % 60;
			return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
		};

		// Where each chapter's DOT sits inside the list, in pixels. This is what
		// the fill interpolates between, so the playhead is always in the
		// chapter the list says you are in.
		//
		// Measured with getBoundingClientRect, NOT offsetTop. offsetTop is
		// relative to the nearest POSITIONED ancestor, and .toc__link is
		// position:relative — so `node.offsetTop - list.offsetTop` measured the
		// node against its own row and came out negative. Rects are absolute
		// and account for the TOC's own scroll, which offsetTop does not.
		function nodeOffset(i) {
			var node = $('.toc__node', links[i]);
			if (!node) return 0;
			var n = node.getBoundingClientRect();
			var l = list.getBoundingClientRect();
			return (n.top - l.top) + n.height / 2;
		}

		function update() {
			// The chapter you are in is the LAST heading above the fold line.
			// A line rather than a box is what stops two chapters being current
			// at once on a page of short sections.
			var line = window.scrollY + window.innerHeight * 0.25;
			var current = -1;
			heads.forEach(function (h, i) {
				if (h && h.offsetTop <= line) current = i;
			});

			links.forEach(function (a, i) {
				if (i < current) { a.dataset.played = ''; } else { delete a.dataset.played; }
				if (i === current) { a.setAttribute('aria-current', 'true'); }
				else { a.removeAttribute('aria-current'); }
			});

			var fill = 0;
			if (current >= 0) {
				var here = nodeOffset(current);
				var next = current + 1 < links.length ? nodeOffset(current + 1) : list.offsetHeight;

				// How far through THIS chapter we are, 0…1.
				var hTop = heads[current] ? heads[current].offsetTop : 0;
				var hEnd = heads[current + 1]
					? heads[current + 1].offsetTop
					: article.offsetTop + article.offsetHeight;
				var span = hEnd - hTop;
				var frac = span > 0 ? (line - hTop) / span : 1;
				frac = Math.min(1, Math.max(0, frac));

				fill = here + (next - here) * frac;
			}

			toc.style.setProperty('--toc-fill', Math.round(fill) + 'px');

			if (time) {
				var travel = Math.max(1, article.offsetHeight - window.innerHeight);
				var prog = Math.min(1, Math.max(0, (window.scrollY - article.offsetTop) / travel));
				if (prog >= 0.995) {
					time.textContent = 'PLAYED · ' + mmss(totalSec);
					time.dataset.done = '';
				} else {
					time.textContent = mmss(prog * totalSec) + ' / ' + mmss(totalSec);
					delete time.dataset.done;
				}
			}
			ticking = false;
		}

		update();

		window.addEventListener('scroll', function () {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(update);
		}, { passive: true });

		window.addEventListener('resize', update, { passive: true });
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
