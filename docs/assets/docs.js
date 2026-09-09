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
		var tabs = $$('.tab', demo);
		var panes = $$('[data-pane]', demo).filter(function (n) { return !n.classList.contains('tab'); });

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
		var root = btn.closest('.codeplayer') || btn.closest('.codeblock') || btn.closest('.demo');
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

	var burger = $('.navbar__burger');
	var side = $('.shell__side');
	if (burger && side) {
		burger.addEventListener('click', function () {
			var open = burger.getAttribute('aria-expanded') === 'true';
			burger.setAttribute('aria-expanded', String(!open));
			if (open) { delete side.dataset.open; } else { side.dataset.open = ''; }
		});
	}

	/* ── Collapse the side ───────────────────────────────────────────────────
	   Three states in one attribute on <html>: absent is expanded, 'collapsed'
	   is the icon strip, and below 60rem the stylesheet ignores it entirely
	   because a drawer of unlabelled icons is not navigation.

	   The initial value is written by the inline script in <head>, so the
	   width is correct on the first frame. This only toggles it. */

	function setNav(collapsed) {
		if (collapsed) { document.documentElement.dataset.nav = 'collapsed'; }
		else { delete document.documentElement.dataset.nav; }
		try { localStorage.setItem('sds-nav', collapsed ? 'collapsed' : 'open'); } catch (e) {}
		var btn = $('[data-nav-collapse]');
		if (btn) {
			btn.setAttribute('aria-expanded', String(!collapsed));
			btn.setAttribute('aria-label', collapsed ? 'Expand the navigation' : 'Collapse the navigation');
		}
	}

	setNav(document.documentElement.dataset.nav === 'collapsed');

	var collapseBtn = $('[data-nav-collapse]');
	if (collapseBtn) {
		collapseBtn.addEventListener('click', function () {
			setNav(document.documentElement.dataset.nav !== 'collapsed');
		});
	}

	/* Clicking a group icon while collapsed re-opens the side rather than
	   toggling a <details> whose contents nobody can see. preventDefault is on
	   the summary, which is what actually owns the open/close. */
	var sideNav = $('.shell__nav');
	if (sideNav) {
		sideNav.addEventListener('click', function (e) {
			if (document.documentElement.dataset.nav !== 'collapsed') return;
			var sum = e.target.closest('summary');
			if (!sum) return;
			e.preventDefault();
			setNav(false);
			sum.parentElement.open = true;
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
		var out = input.closest('.navbar__search').querySelector('[data-search-out]');
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
						return '<a class="shell__hit" href="' + r.u + '"><b>' + r.t + '</b><span>' + r.g + '</span></a>';
					}).join('')
					: '<p class="shell__empty">Nothing matches &ldquo;' + q.replace(/[<>&]/g, '') + '&rdquo;</p>';
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

	/* ── Scrollspy ───────────────────────────────────────────────────────────
	   Marks the contents entry for the section you are actually reading.

	   The attribute is [aria-current='true'] and nothing else: 45-toc.css
	   already dresses that state (the hairline the list is built from turns
	   accent) and its header says outright that it is "set by whatever is
	   watching the scroll". This is that. No class, no second source of truth,
	   and with this file absent the contents is still a working list of links.

	   WHY NOT `isIntersecting`. The obvious version marks a heading when it
	   enters the viewport, which breaks in both directions: several headings
	   are on screen at once on a short section, and NONE is on screen when you
	   are in the middle of a long one, so the mark flickers and then vanishes.
	   What a reader means by "where am I" is the last heading they scrolled
	   PAST — so the observer only records each heading's position, and the
	   choice is made by walking the list. */

	var tocLinks = $$('.toc__link');
	if (tocLinks.length && 'IntersectionObserver' in window) {
		var heads = tocLinks
			.map(function (a) { return document.getElementById(decodeURIComponent(a.hash.slice(1))); })
			.filter(Boolean);

		var current = null;
		function mark() {
			/* The last heading whose top has passed the reading line — a little
			   below the sticky bar, so a heading counts once it is comfortably
			   on screen rather than the instant it touches the bar. */
			var line = 140;
			var found = heads[0];
			for (var i = 0; i < heads.length; i++) {
				if (heads[i].getBoundingClientRect().top <= line) found = heads[i];
			}
			/* At the very bottom the last section may be too short to ever reach
			   the line, and it would otherwise be unreachable. */
			if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
				found = heads[heads.length - 1];
			}
			if (found === current) return;
			current = found;
			tocLinks.forEach(function (a) {
				var on = decodeURIComponent(a.hash.slice(1)) === found.id;
				if (on) { a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); }
			});
			keepVisible(found && $('.toc__link[aria-current]'), $('.shell__pin > .toc'));
		}

		/* One observer, purely as a cheap "something moved" signal — it fires
		   on the frames that matter instead of on every scroll event. */
		var io = new IntersectionObserver(mark, { rootMargin: '-140px 0px 0px 0px', threshold: [0, 1] });
		heads.forEach(function (h) { io.observe(h); });

		var ticking = false;
		window.addEventListener('scroll', function () {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(function () { ticking = false; mark(); });
		}, { passive: true });

		mark();
	}

	/* Scroll a marked item into view INSIDE its own scrolling column, without
	   moving the page. scrollIntoView() would scroll every ancestor including
	   the document, which on load would jump the reader away from the top of
	   the article they just opened. */
	function keepVisible(el, box) {
		if (!el || !box) return;
		var e = el.getBoundingClientRect();
		var b = box.getBoundingClientRect();
		if (e.top < b.top) { box.scrollTop -= b.top - e.top + 16; }
		else if (e.bottom > b.bottom) { box.scrollTop += e.bottom - b.bottom + 16; }
	}

	/* The current page is the 30th of 75 in a column that shows about a dozen.
	   Opening a docs page with its own entry scrolled out of sight is the nav
	   telling you nothing about where you are. */
	keepVisible($('.navlist__link[aria-current="page"]'), $('.shell__side'));

	/* [data-more] means "this box is cut off below", and the stylesheet fades
	   its last few pixels when it is set. A contents list clipped dead through
	   the middle of a word reads as a bug; the same list fading out reads as a
	   list that continues. The attribute is removed at the end of the scroll,
	   so the final item is never dimmed for no reason. */
	$$('.shell__side, .shell__pin > .toc').forEach(function (box) {
		var update = function () {
			var more = box.scrollTop + box.clientHeight < box.scrollHeight - 2;
			if (more) { box.dataset.more = ''; } else { delete box.dataset.more; }
		};
		box.addEventListener('scroll', update, { passive: true });
		new ResizeObserver(update).observe(box);
		update();
	});

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
