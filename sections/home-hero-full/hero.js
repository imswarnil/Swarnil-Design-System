/**
 * Home hero, full — the section's two moving parts. Markup: hero.hbs and
 * parts/*.hbs; styles: hero.css, in the same order. No dependencies.
 *
 * 1. The background loop. CSS hides it under prefers-reduced-motion, but a
 *    hidden <video> still decodes frames, so stop it here as well. Autoplay
 *    can also be refused outright (a data-saver setting, iOS low-power); the
 *    play() promise is caught so the console stays clean — the CSS mesh is
 *    underneath either way, so there is nothing to fall back to.
 * 2. The player. The picture becomes the film in place: the frame's
 *    rectangle is tweened between its two layouts, the YouTube iframe is
 *    built once it lands and destroyed on close, and the one control
 *    glides to the frame's corner and back.
 */

const reduced = matchMedia('(prefers-reduced-motion: reduce)');

// ── 1. The background loop ────────────────────────────────────────────────

for (const loop of document.querySelectorAll('[data-hero-loop]')) {
	const sync = () => {
		if (reduced.matches) {
			loop.pause();
			loop.removeAttribute('autoplay');
		} else {
			loop.play?.().catch(() => {});
		}
	};

	sync();
	reduced.addEventListener('change', sync);
}

// ── 2. The picture, which is also the player ──────────────────────────────

/*
	No dialog. One button in the column on the frame's right border turns
	the picture into a 16:9 screen in place — the CSS does the shape and the
	size — and turns it back. The embed is built on play and destroyed on close, so a
	cold homepage carries none of the player.

	One control rather than a play button and a separate cross: the state
	class drives which icon and which word it shows, so there is no second
	button to keep in step and focus never lands on one that disappeared.
*/

/* Below this width of HERO — not of viewport — the frame goes portrait and
   the portrait cut plays. It is the same 640 the phone branch of hero.css
   uses; the two are a pair. */
const PORTRAIT_UNDER = 640;

/* How long the frame takes to change shape. hero.css's stage fade and the
   moment the player is built are both timed off this; change it here and
   the two `--film-tween` reads in the CSS follow. */
const TWEEN_MS = 620;
const TWEEN_EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

/* The frame cannot be transitioned in CSS: pressing play switches its
   `position` from static to absolute and its width from a length to `auto`
   with an aspect-ratio, and neither of those interpolates. So the RECTANGLE
   is animated instead — left, top, width, height, in the mount's own
   coordinates — with the Web Animations API. Animating the box rather than
   a scale transform means the picture and the player re-lay out on every
   frame: nothing stretches, `object-fit: cover` keeps doing its job, and
   the corners stay round. */
const rectIn = (el, parent) => {
	const a = el.getBoundingClientRect();
	const b = parent.getBoundingClientRect();
	return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height };
};

const tween = (el, from, to) =>
	el.animate(
		[
			{
				left: `${from.x}px`,
				top: `${from.y}px`,
				width: `${from.w}px`,
				height: `${from.h}px`,
			},
			{
				left: `${to.x}px`,
				top: `${to.y}px`,
				width: `${to.w}px`,
				height: `${to.h}px`,
			},
		],
		{ duration: TWEEN_MS, easing: TWEEN_EASE, fill: 'both' },
	);

for (const stage of document.querySelectorAll('[data-stage]')) {
	const wide = stage.dataset.stageVideo;
	const tall = stage.dataset.stageVideoPortrait;
	const slot = stage.querySelector('[data-stage-slot]');
	const still = stage.querySelector('.im-hero__still');
	const toggle = stage.querySelector('[data-stage-toggle]');

	// No video id, no button: it would do nothing.
	if (!wide || !slot || !still || !toggle) {
		toggle?.remove();
		continue;
	}

	const WATCH = toggle.dataset.labelWatch || 'Watch video';
	const CLOSE = toggle.dataset.labelClose || 'Close video';

	/* The words live in the aria-label and the native tooltip, and both follow
	   the state. */
	const say = (text) => {
		toggle.setAttribute('aria-label', text);
		toggle.setAttribute('title', text);
	};

	/* The control keeps its slot in the column and is only TRANSLATED to the
	   frame's top corner, so the accounts under it never move. The offset is
	   measured from wherever the slot is: at desktop the mount is fixed, so
	   it is set the moment play is pressed; on a phone the frame stays in
	   flow and the column re-centres as the frame changes shape, so it is
	   set once the shape has settled. And again on resize either way. */
	const toCorner = () => {
		toggle.style.translate = '';
		const t = toggle.getBoundingClientRect();
		const m = stage.getBoundingClientRect();
		const dx = m.right - (t.left + t.width / 2);
		const dy = m.top - (t.top + t.height / 2);
		toggle.style.translate = `${Math.round(dx)}px ${Math.round(dy)}px`;
	};
	const toSlot = () => {
		toggle.style.translate = '';
	};
	window.addEventListener('resize', () => {
		if (playing) toCorner();
	});
	let playing = false;
	let running = null;

	const hero = stage.closest('.im-hero');
	const narrow = () =>
		(hero?.clientWidth ?? window.innerWidth) <= PORTRAIT_UNDER;

	/* Chosen at press time, not at load: the hero is inside a container
	   query, so a collapsing sidebar or a rotated phone can change which cut
	   is right without the page reloading. */
	const pick = () => (narrow() && tall) || wide;

	/* On a phone the frame stays in flow and only changes shape, which CSS
	   can transition on its own (aspect-ratio interpolates). The rectangle
	   tween is for the floating state, where the frame leaves flow. */
	const floats = () => getComputedStyle(still).position === 'absolute';

	const build = () => {
		if (!playing || slot.querySelector('iframe')) return;
		const frame = document.createElement('iframe');
		/* controls=0 hides YouTube's bar, the "more videos" strip and the
		   end-screen grid — the frame's own Close is the one control. rel=0
		   and iv_load_policy=3 keep related videos and annotations out. */
		frame.src =
			`https://www.youtube-nocookie.com/embed/${encodeURIComponent(pick())}` +
			'?autoplay=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3' +
			'&playsinline=1&disablekb=1&fs=0';
		frame.title = 'Video';
		frame.allow = 'autoplay; encrypted-media';
		slot.replaceChildren(frame);
	};

	const open = () => {
		playing = true;
		running?.cancel();

		const from = rectIn(still, stage);
		stage.classList.add('is-playing');
		toggle.setAttribute('aria-pressed', 'true');
		say(CLOSE);

		if (floats() && !reduced.matches) {
			// Force the new layout, read where the frame ends up, then play the
			// move from where it was.
			void still.offsetWidth;
			const to = rectIn(still, stage);
			running = tween(still, from, to);
			/* The corner is the MOUNT's corner and the mount does not move
			   during the tween — only the still does — so the glide can start
			   now, alongside the frame, rather than after it. (It also stops
			   depending on `finish`, which a hidden tab never dispatches.) */
			toCorner();
			running.onfinish = () => {
				running?.cancel();
				running = null;
				build();
			};
		} else {
			// CSS transitions the shape; the player lands as it settles.
			setTimeout(() => {
				build();
				toCorner();
			}, TWEEN_MS);
			if (narrow()) {
				still.scrollIntoView({
					block: 'start',
					behavior: reduced.matches ? 'auto' : 'smooth',
				});
			}
		}
	};

	const close = () => {
		playing = false;
		running?.cancel();
		toggle.setAttribute('aria-pressed', 'false');
		say(WATCH);
		toSlot();

		if (floats() && !reduced.matches) {
			/* The class stays on while the frame travels back — it is what
			   keeps the frame absolute, and the tween needs that. At rest the
			   frame fills the mount exactly, so the last animated frame is the
			   rest layout and dropping the class afterwards changes nothing
			   visible. */
			const from = rectIn(still, stage);
			const to = { x: 0, y: 0, w: stage.clientWidth, h: stage.clientHeight };
			stage.classList.add('is-closing');
			running = tween(still, from, to);
			/* `finish` is never dispatched in a tab that is not being painted
			   (hidden, backgrounded), and the embed would go on playing with
			   sound. So the same clean-up also runs on a timer; whichever comes
			   first wins and the other finds nothing left to do. */
			const settle = () => {
				if (playing || !stage.classList.contains('is-closing')) return;
				stage.classList.remove('is-playing', 'is-closing');
				running?.cancel();
				running = null;
				slot.replaceChildren();
			};
			running.onfinish = settle;
			setTimeout(settle, TWEEN_MS + 120);
		} else {
			stage.classList.remove('is-playing');
			setTimeout(() => {
				if (!playing) slot.replaceChildren();
			}, TWEEN_MS);
		}
	};

	toggle.setAttribute('aria-pressed', 'false');
	toggle.addEventListener('click', () => (playing ? close() : open()));

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && playing) close();
	});
}
