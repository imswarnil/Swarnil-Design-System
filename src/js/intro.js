/* =============================================================================
   INTRO — the picture that is also the player

   Ported from content/themes/aspect/assets/hero/hero.js.

   ── WHY THE RECTANGLE IS ANIMATED, NOT THE ASPECT RATIO ───────────────────
   The first attempt tweened `--intro-ratio` through a registered property and
   it was wrong, for the reason Aspect's own comment gives: pressing play
   changes the frame's `position` from static to absolute and its width from a
   length to `auto`, and NEITHER OF THOSE INTERPOLATES. The shape appeared to
   move while the box underneath it jumped.

   So the RECTANGLE is animated instead — left, top, width, height, measured
   in the mount's own coordinates, with the Web Animations API. Animating the
   box rather than a `scale` transform means the picture and the player
   re-lay out on every frame: nothing stretches, `object-fit: cover` keeps
   doing its job, and the corners stay round.

       1. measure where the frame is now          (rectIn)
       2. put it in its end state, measure again  (rectIn)
       3. animate between the two                 (tween)

   ── THE CONTROL KEEPS ITS SLOT ────────────────────────────────────────────
   Playing, the button is TRANSLATED to the frame's corner. It is not moved
   in the DOM and its slot in the column stays open, so the accounts beneath
   it do not shift. Measured from wherever the slot actually is, and again on
   resize.

   ── NOTHING IS FETCHED UNTIL PLAY ─────────────────────────────────────────
   The <iframe> is built on press and destroyed on close. A cold page carries
   no player: no script from a video host, no cookie, no background decoding.
   ========================================================================== */

(function () {
	'use strict';

	var TWEEN_MS = 620;
	var TWEEN_EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
	var PORTRAIT_UNDER = 640;

	/* A child's box in its parent's coordinates. */
	function rectIn(el, parent) {
		var a = el.getBoundingClientRect();
		var b = parent.getBoundingClientRect();
		return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height };
	}

	function tween(el, from, to) {
		return el.animate([
			{ left: from.x + 'px', top: from.y + 'px', width: from.w + 'px', height: from.h + 'px' },
			{ left: to.x + 'px', top: to.y + 'px', width: to.w + 'px', height: to.h + 'px' },
		], { duration: TWEEN_MS, easing: TWEEN_EASE, fill: 'both' });
	}

	var intros = document.querySelectorAll('.intro[data-video]');

	Array.prototype.forEach.call(intros, function (intro) {
		var wide = intro.dataset.video;
		var tall = intro.dataset.videoPortrait;
		var mount = intro.querySelector('.intro__mount');
		var frame = intro.querySelector('.intro__frame');
		var stage = intro.querySelector('.intro__stage');
		var toggle = intro.querySelector('.intro__play');

		if (!wide || !mount || !frame || !stage || !toggle) {
			if (toggle) toggle.remove();
			return;
		}

		var WATCH = toggle.dataset.labelWatch || 'Watch video';
		var CLOSE = toggle.dataset.labelClose || 'Close video';
		var playing = false;
		var running = null;

		function say(text) {
			toggle.setAttribute('aria-label', text);
			toggle.setAttribute('data-tip', text);
		}

		/* Translated to the frame's corner, never moved. Measured from the
		   slot it is actually in, so it lands right whatever the column has
		   done above it. */
		function toCorner() {
			toggle.style.translate = '';
			var t = toggle.getBoundingClientRect();
			var m = frame.getBoundingClientRect();
			var dx = m.right - (t.left + t.width / 2);
			var dy = m.top - (t.top + t.height / 2);
			toggle.style.translate = Math.round(dx) + 'px ' + Math.round(dy) + 'px';
		}

		function toSlot() { toggle.style.translate = ''; }

		/* Chosen at press time, not at load: the section is a container, so a
		   collapsing sidebar can change which cut is right with no reload. */
		function pick() {
			return (intro.clientWidth <= PORTRAIT_UNDER && tall) || wide;
		}

		function build() {
			if (!playing || stage.querySelector('iframe')) return;
			var f = document.createElement('iframe');
			/* controls=0 hides YouTube's bar and its end-screen grid — the
			   frame's own Close is the one control. rel=0 and
			   iv_load_policy=3 keep related videos and annotations out. */
			f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(pick())
				+ '?autoplay=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1';
			f.title = WATCH;
			f.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
			f.allowFullscreen = true;
			stage.replaceChildren(f);
		}

		function shift(open) {
			if (running) running.cancel();

			var from = rectIn(frame, mount);
			if (open) { intro.dataset.playing = ''; } else { delete intro.dataset.playing; }

			/* Read AFTER the attribute lands, so this is the end state. */
			frame.style.transition = 'none';
			var to = rectIn(frame, mount);

			var anim = tween(frame, from, to);
			running = anim;

			/* THE FILL HAS TO BE RELEASED, and this is the whole subtlety of
			   the technique. `fill: both` keeps the animation's own `left`
			   and `width` applied after it ends — and those BEAT the CSS end
			   state, so the frame freezes at the pixels the tween gave it,
			   `inset-inline-start` stops being `auto`, and the box is
			   over-constrained for good. A window resize then moves nothing.

			   So the animation is cancelled the moment it lands and CSS takes
			   the box back. `finished` rather than `onfinish` because a
			   cancel elsewhere rejects it, and the timeout is a backstop for
			   the case where the promise never settles — a tab backgrounded
			   mid-tween never fires it at all. */
			var release = function () {
				if (running !== anim) return;
				anim.cancel();
				running = null;
				frame.style.transition = '';
			};

			anim.finished.then(release).catch(function () {});
			setTimeout(release, TWEEN_MS + 80);
		}

		toggle.setAttribute('aria-pressed', 'false');

		toggle.addEventListener('click', function () {
			playing = !playing;
			shift(playing);
			toggle.setAttribute('aria-pressed', String(playing));
			say(playing ? CLOSE : WATCH);

			if (playing) {
				/* Built as the shape settles, not before: a player that
				   appears at the start of the tween is a black rectangle
				   growing, which is the thing the tween exists to avoid. */
				setTimeout(build, TWEEN_MS * 0.5);
				setTimeout(toCorner, TWEEN_MS);
			} else {
				/* Emptied, not hidden: a hidden iframe keeps playing, keeps
				   its connection open and keeps decoding. */
				stage.replaceChildren();
				toSlot();
			}
		});

		addEventListener('resize', function () { if (playing) toCorner(); });

		document.addEventListener('keydown', function (e) {
			if (e.key !== 'Escape' || !playing) return;
			toggle.click();
			toggle.focus();
		});
	});

	/* The background loop. A hidden <video> still decodes frames, so it is
	   stopped rather than hidden when the reader has asked for less motion. */
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
		Array.prototype.forEach.call(document.querySelectorAll('.intro__loop'), function (v) {
			v.removeAttribute('autoplay');
			if (v.pause) v.pause();
		});
	}
}());
