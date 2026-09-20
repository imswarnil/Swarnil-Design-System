/* =============================================================================
   INTRO — the picture that is also the player

   Pressing play does not open anything. The frame widens from a square to
   16/9 WHERE IT STANDS, the still fades out under it, and the film plays
   inside the rectangle the picture was in. The control travels to the corner
   and becomes the way back.

   ── NOTHING IS FETCHED UNTIL PLAY ─────────────────────────────────────────
   The <iframe> is BUILT on press and DESTROYED on close. A cold page carries
   none of the player — no script from a video host, no cookie, no frame
   decoding in the background — which is most of what a hero costs when the
   embed is in the markup from the start.

   ── THE SHAPE CHANGE IS CSS, NOT JAVASCRIPT ───────────────────────────────
   `aspect-ratio` cannot be transitioned, so the frame would jump. The ratio
   is a REGISTERED custom property (`--intro-ratio`, see 0-config), which the
   browser can interpolate — so this file sets one attribute and the tween,
   the re-flow of the words beside it and the shadow deepening are all CSS.

   Set `data-video` on the section to a YouTube id. No id, no play button.
   ========================================================================== */

(function () {
	'use strict';

	var intros = document.querySelectorAll('.intro[data-video]');

	Array.prototype.forEach.call(intros, function (intro) {
		var id = intro.dataset.video;
		var toggle = intro.querySelector('.intro__play');
		var stage = intro.querySelector('.intro__stage');

		if (!id || !toggle || !stage) {
			if (toggle) toggle.remove();
			return;
		}

		var WATCH = toggle.dataset.labelWatch || 'Watch video';
		var CLOSE = toggle.dataset.labelClose || 'Close video';

		function open() {
			var frame = document.createElement('iframe');
			frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id)
				+ '?autoplay=1&rel=0&modestbranding=1';
			frame.title = WATCH;
			frame.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
			frame.allowFullscreen = true;
			stage.replaceChildren(frame);

			intro.dataset.playing = '';
			toggle.setAttribute('aria-label', CLOSE);
			toggle.setAttribute('data-tip', CLOSE);
			toggle.setAttribute('aria-pressed', 'true');
		}

		function close() {
			/* Emptied, not hidden: a hidden iframe keeps playing, keeps its
			   connection open and keeps decoding. */
			stage.replaceChildren();

			delete intro.dataset.playing;
			toggle.setAttribute('aria-label', WATCH);
			toggle.setAttribute('data-tip', WATCH);
			toggle.setAttribute('aria-pressed', 'false');
		}

		toggle.setAttribute('aria-pressed', 'false');
		toggle.addEventListener('click', function () {
			if ('playing' in intro.dataset) { close(); } else { open(); }
		});

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && 'playing' in intro.dataset) {
				close();
				toggle.focus();
			}
		});
	});

	/* The background loop. A hidden <video> still decodes frames, so it is
	   stopped rather than hidden when the reader has asked for less motion —
	   the CSS mesh underneath is the fallback and it is a still image. */
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
		Array.prototype.forEach.call(document.querySelectorAll('.intro__loop'), function (v) {
			v.removeAttribute('autoplay');
			v.pause();
		});
	}
}());
