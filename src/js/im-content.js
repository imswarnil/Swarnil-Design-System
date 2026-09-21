/**
 * im-content.js — optional, ~2 KB. The behaviour of the editor's cards inside
 * .im-content, for a theme that has turned Ghost's own card assets off
 * ("card_assets": false) so that it can style the cards itself.
 *
 *   gallery   each picture takes its share of the row from its proportions
 *   toggle    .kg-toggle-card opens and closes, and says so to assistive tech
 *   audio     the editor's player markup, wired to its <audio>
 *   video     the big play button, then the browser's own controls
 *   tables    wrapped in .im-table-scroll so a wide one scrolls in its own box
 *   zoom      <section class="im-content" data-im-zoom> turns each picture into
 *             an .im-zoom-link — a frame mark in the corner, the lightbox
 *             (im-media.js) on a click
 *
 * Nothing here is needed to READ a post: without it, galleries are even
 * columns, toggles are open, audio and video fall back to native controls.
 */
(() => {
	const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
	const clock = (s) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00');
	const fill = (range) => range.style.setProperty('--_v', `${((range.value - (range.min || 0)) / ((range.max || 100) - (range.min || 0))) * 100}%`);

	/* ── gallery ───────────────────────────────────────────────────────── */
	for (const img of $$('.kg-gallery-image img')) {
		const w = Number(img.getAttribute('width'));
		const h = Number(img.getAttribute('height'));
		if (w && h) img.parentElement.style.flex = `${(w / h).toFixed(4)} 1 0%`;
	}

	/* ── toggle ────────────────────────────────────────────────────────── */
	for (const card of $$('.kg-toggle-card')) {
		const heading = card.querySelector('.kg-toggle-heading');
		const button = card.querySelector('.kg-toggle-card-icon');
		if (!heading) continue;
		const set = (open) => {
			card.dataset.kgToggleState = open ? 'open' : 'close';
			button?.setAttribute('aria-expanded', String(open));
		};
		set(card.dataset.kgToggleState === 'open');
		heading.addEventListener('click', () => set(card.dataset.kgToggleState !== 'open'));
	}

	/* ── audio & video players ─────────────────────────────────────────── */
	const RATES = [1, 1.5, 2, 0.75];

	function wire(card, kind) {
		const media = card.querySelector(kind);
		if (!media) return;
		const q = (name) => card.querySelector(`.kg-${kind}-${name}`);
		const [play, pause, now, total, seek, rate, unmute, mute, volume] = ['play-icon', 'pause-icon', 'current-time', 'duration', 'seek-slider', 'playback-rate', 'unmute-icon', 'mute-icon', 'volume-slider'].map(q);
		const hide = `kg-${kind}-hide`;
		const sync = () => {
			play?.classList.toggle(hide, !media.paused);
			pause?.classList.toggle(hide, media.paused);
			unmute?.classList.toggle(hide, media.muted);
			mute?.classList.toggle(hide, !media.muted);
		};

		play?.addEventListener('click', () => media.play());
		pause?.addEventListener('click', () => media.pause());
		unmute?.addEventListener('click', () => ((media.muted = true), sync()));
		mute?.addEventListener('click', () => ((media.muted = false), sync()));
		rate?.addEventListener('click', () => {
			const next = RATES[(RATES.indexOf(media.playbackRate) + 1) % RATES.length];
			media.playbackRate = next;
			rate.textContent = `${next}×`;
		});
		for (const type of ['play', 'pause', 'ended']) media.addEventListener(type, sync);

		const ready = () => {
			if (total) total.textContent = clock(media.duration);
			if (seek) seek.max = Math.floor(media.duration) || 100;
		};
		media.addEventListener('loadedmetadata', ready);
		if (media.readyState > 0) ready();
		media.addEventListener('timeupdate', () => {
			if (now) now.textContent = clock(media.currentTime);
			if (seek) ((seek.value = Math.floor(media.currentTime)), fill(seek));
		});
		seek?.addEventListener('input', () => ((media.currentTime = seek.value), fill(seek)));
		volume?.addEventListener('input', () => ((media.volume = volume.value / 100), fill(volume)));
		for (const r of [seek, volume]) if (r) fill(r);
		sync();
	}

	for (const card of $$('.kg-audio-card')) wire(card, 'audio');

	// Video: the editor's poster and big button start it; from then on the
	// browser's own controls are better than any we would draw.
	for (const card of $$('.kg-video-card')) {
		const video = card.querySelector('video');
		const overlay = card.querySelector('.kg-video-overlay');
		if (!video) continue;
		if (video.loop && video.autoplay) continue; // a looping clip: no controls at all
		if (!overlay) {
			video.controls = true;
			continue;
		}
		overlay.addEventListener('click', () => {
			overlay.classList.add('kg-video-hide');
			video.controls = true;
			video.play();
		});
	}

	/* ── tables ────────────────────────────────────────────────────────── */
	for (const table of $$('.im-content > table')) {
		const wrap = document.createElement('div');
		wrap.className = 'im-table-scroll';
		wrap.tabIndex = 0; // a scrolling region must be reachable by keyboard
		table.replaceWith(wrap);
		wrap.append(table);
		table.style.display = 'table';
	}

	/* ── zoom: pictures open in the lightbox ───────────────────────────── */
	for (const root of $$('.im-content[data-im-zoom]')) {
		for (const fig of $$('.kg-image-card, .kg-gallery-card', root)) {
			const caption = fig.querySelector('figcaption')?.textContent.trim() || '';
			const imgs = $$('img', fig).filter((img) => !img.closest('a'));
			if (!imgs.length) continue;
			for (const img of imgs) {
				const a = document.createElement('a');
				a.href = img.currentSrc || img.src;
				a.dataset.caption = caption || img.alt;
				// .im-zoom-link draws the frame mark in the corner — the same
				// one a gallery tile and a carousel slide carry.
				a.className = 'im-zoom-link';
				img.replaceWith(a);
				a.append(img);
			}
			fig.setAttribute('data-im-lightbox', '');
		}
	}
})();
