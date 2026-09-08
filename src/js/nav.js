/* =============================================================================
   nav.js — optional, additive, never required

   The navbar works with this file absent. Everything here adds polish that CSS
   alone cannot express, and every feature degrades to something usable:

     burger    → the drawer is a popover, so the button's popovertarget opens
                 it natively. This only mirrors the state onto aria-expanded so
                 the burger can animate.
     scrolled  → the bar stays in its at-top style. Legible, just not glassy.
     direction → hide-on-scroll simply never hides.

   Dropdowns and the drawer need NO JavaScript at all: they are popovers, so
   Escape, click-outside, focus return and top-layer rendering come from the
   platform (PRINCIPLES #4).

       import '@imswarnil/swarnil-design/nav';
   or  <script src="/src/js/nav.js" defer></script>
   ========================================================================== */
(function () {
	'use strict';

	/* ── Burger → aria-expanded ──────────────────────────────────────────────
	   The popover opens itself. We only reflect its state onto the button,
	   because CSS animates the burger from [aria-expanded] and because a
	   screen reader should be told the control is expanded. */

	document.querySelectorAll('[popovertarget]').forEach(function (btn) {
		var panel = document.getElementById(btn.getAttribute('popovertarget'));
		if (!panel || typeof panel.addEventListener !== 'function') return;

		panel.addEventListener('toggle', function (e) {
			btn.setAttribute('aria-expanded', String(e.newState === 'open'));
		});
	});

	/* ── Scroll state ────────────────────────────────────────────────────────
	   Two attributes, written from one listener, throttled to a frame.

	   data-scrolled  the bar has left the top of the page
	   data-dir       the last MEANINGFUL scroll direction

	   The 6px threshold matters: without it, momentum scrolling and trackpad
	   jitter flip the direction constantly and a hide-on-scroll bar flickers.
	   Below 80px nothing hides at all, so the bar cannot vanish while you are
	   still looking at the top of the page. */

	var bars = document.querySelectorAll('.navbar-hide-on-scroll, .navbar-transparent, .navbar-blur, [data-nav-scroll]');
	if (!bars.length) return;

	var last = window.scrollY;
	var ticking = false;
	var THRESHOLD = 6;
	var FLOOR = 80;

	function update() {
		var y = window.scrollY;
		var delta = y - last;

		bars.forEach(function (bar) {
			if (y > 4) { bar.dataset.scrolled = ''; } else { delete bar.dataset.scrolled; }

			if (Math.abs(delta) > THRESHOLD) {
				bar.dataset.dir = (delta > 0 && y > FLOOR) ? 'down' : 'up';
			}
		});

		if (Math.abs(delta) > THRESHOLD) last = y;
		ticking = false;
	}

	update();

	window.addEventListener('scroll', function () {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(update);
	}, { passive: true });
}());
