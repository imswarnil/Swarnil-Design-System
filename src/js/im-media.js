/**
 * im-media.js — optional. Pictures and video.
 *
 *   lightbox   [data-im-lightbox]       a gallery (or one link) opens on a plain sheet
 *   video      [data-im-video="ID"]     a poster that becomes a YouTube player when pressed
 *   chapters   [data-im-chapters="#v"]  timestamps that seek that player, and follow it
 *   lazy       .im-lazy > img           marks the picture loaded, so it can sharpen in
 *   drop       .im-drop                 marks a file drop zone while something is over it
 *
 * The lightbox is ONE native <dialog>, built on first use: focus trap and
 * scroll-lock come from the browser, Esc is caught so it can leave the way it
 * arrived. Thumbnails are links to the large image, so with this file missing
 * a click still opens the picture.
 */
(() => {
	const $$ = (s, r = document) => [...r.querySelectorAll(s)];
	const ICON = {
		x: '<path d="M18 6 6 18M6 6l12 12"/>',
		left: '<path d="m15 18-6-6 6-6"/>',
		right: '<path d="m9 18 6-6-6-6"/>',
	};
	const svg = (d) => `<svg class="im-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

	/* ── lightbox ──────────────────────────────────────────────────────── */
	let box = null;
	let set = [];
	let at = 0;

	function build() {
		box = document.createElement('dialog');
		box.className = 'im-lightbox';
		box.setAttribute('aria-label', 'Image viewer');
		box.innerHTML = `
			<div class="im-lightbox-stage">
				<button class="im-lightbox-prev" type="button" aria-label="Previous image">${svg(ICON.left)}</button>
				<figure class="im-lightbox-figure">
					<img alt="">
					<p class="im-lightbox-title">${(document.documentElement.dataset.imLightboxTitle || document.title.split(' — ').pop() || '').replace(/[<>&]/g, '')}</p>
					<button class="im-lightbox-close" type="button" data-close aria-label="Close">${svg(ICON.x)}</button>
				</figure>
				<button class="im-lightbox-next" type="button" aria-label="Next image">${svg(ICON.right)}</button>
			</div>
			<div class="im-lightbox-foot"><p class="im-lightbox-caption" aria-live="polite"></p><span class="im-lightbox-count"></span></div>`;
		document.body.append(box);

		box.querySelector('[data-close]').addEventListener('click', close);
		box.querySelector('.im-lightbox-prev').addEventListener('click', () => show(at - 1));
		box.querySelector('.im-lightbox-next').addEventListener('click', () => show(at + 1));
		// The sheet and the space around the picture close it; the picture does not.
		box.addEventListener('click', (e) => e.target.matches('.im-lightbox, .im-lightbox-stage, .im-lightbox-foot') && close());
		// Esc: close it OURSELVES, so it leaves the way it arrived.
		box.addEventListener('cancel', (e) => (e.preventDefault(), close()));
		box.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') show(at + 1);
			else if (e.key === 'ArrowLeft') show(at - 1);
		});

		// Swipe.
		let x0 = null;
		const stage = box.querySelector('.im-lightbox-stage');
		stage.addEventListener('pointerdown', (e) => (x0 = e.clientX));
		stage.addEventListener('pointerup', (e) => {
			if (x0 === null) return;
			const dx = e.clientX - x0;
			x0 = null;
			if (Math.abs(dx) > 48) show(at + (dx < 0 ? 1 : -1));
		});
	}

	const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

	function open() {
		box.showModal();
		// The entrance lives on the figure, which is not replaced between
		// pictures: take the animation away and give it back to replay it.
		const fig = box.querySelector('.im-lightbox-figure');
		fig.style.animation = 'none';
		void fig.offsetWidth;
		fig.style.animation = '';
	}

	function close() {
		if (box.hasAttribute('data-closing')) return;
		box.setAttribute('data-closing', '');
		// A timer, not animationend: an animation in a tab that is not being
		// painted never ends, and the viewer would be stuck open.
		setTimeout(() => {
			box.removeAttribute('data-closing');
			box.close();
		}, calm() ? 0 : 200);
	}

	function show(i) {
		at = (i + set.length) % set.length;
		const item = set[at];
		const img = box.querySelector('.im-lightbox-figure > img');
		const next = img.cloneNode(); // a fresh node restarts the entrance animation
		next.src = item.src;
		next.alt = item.alt;
		img.replaceWith(next);
		box.querySelector('.im-lightbox-count').textContent = `${String(at + 1).padStart(2, '0')} / ${String(set.length).padStart(2, '0')}`;
		box.querySelector('.im-lightbox-caption').textContent = item.caption;
		box.toggleAttribute('data-single', set.length < 2);
		// Warm the neighbours so the arrows feel instant.
		for (const n of [at + 1, at - 1]) new Image().src = set[(n + set.length) % set.length].src;
	}

	const describe = (link) => {
		const img = link.querySelector('img');
		return {
			src: link.getAttribute('href') || img?.currentSrc || img?.src,
			alt: img?.alt || '',
			caption: link.dataset.caption || link.closest('figure')?.querySelector('figcaption')?.textContent.trim() || img?.alt || '',
		};
	};

	document.addEventListener('click', (e) => {
		const root = e.target.closest('[data-im-lightbox]');
		if (!root || e.metaKey || e.ctrlKey || e.shiftKey) return;
		const link = root.matches('a') ? root : e.target.closest('a[href]');
		if (!link) return;
		e.preventDefault();
		const links = root.matches('a') ? [root] : $$('a[href]', root);
		set = links.map(describe);
		if (!box) build();
		show(links.indexOf(link));
		open();
	});

	/* ── video + chapters ──────────────────────────────────────────────── */
	const seconds = (t) => String(t).split(':').reduce((a, n) => a * 60 + Number(n), 0);
	const players = new Map(); // element → { seek(t), time(): number|null }

	function mount(el, startAt = 0) {
		if (players.has(el)) return players.get(el);
		const native = el.querySelector('video');
		let api;

		if (native) {
			api = { seek: (t) => ((native.currentTime = t), native.play()), time: () => native.currentTime };
			native.controls = true;
			native.play();
		} else {
			const id = el.dataset.imVideo;
			const frame = document.createElement('iframe');
			frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&playsinline=1&enablejsapi=1&start=${Math.floor(startAt)}&origin=${encodeURIComponent(location.origin)}`;
			frame.title = el.dataset.imVideoTitle || 'Video';
			frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
			frame.allowFullscreen = true;
			el.append(frame);

			// YouTube's iframe API speaks postMessage; no script of theirs is loaded.
			let now = startAt;
			const post = (func, args = []) => frame.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
			frame.addEventListener('load', () => frame.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 1 }), '*'));
			addEventListener('message', (e) => {
				if (e.source !== frame.contentWindow) return;
				try {
					const data = JSON.parse(e.data);
					if (data.info && typeof data.info.currentTime === 'number') now = data.info.currentTime;
				} catch {}
			});
			api = { seek: (t) => (post('seekTo', [t, true]), post('playVideo'), (now = t)), time: () => now };
		}

		el.setAttribute('data-im-playing', '');
		players.set(el, api);
		return api;
	}

	document.addEventListener('click', (e) => {
		const play = e.target.closest('.im-video-play');
		if (play) mount(play.closest('.im-video'));
	});

	for (const list of $$('[data-im-chapters]')) {
		const video = document.querySelector(list.dataset.imChapters);
		if (!video) continue;
		const items = $$('[data-t]', list).map((b) => ({ b, t: seconds(b.dataset.t) }));

		list.addEventListener('click', (e) => {
			const b = e.target.closest('[data-t]');
			if (!b) return;
			e.preventDefault();
			const t = seconds(b.dataset.t);
			const api = players.get(video);
			if (api) api.seek(t);
			else mount(video, t);
			mark(t);
			if (video.getBoundingClientRect().top < 0) video.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});

		function mark(t) {
			let current = -1;
			items.forEach((it, i) => {
				if (t >= it.t) current = i;
			});
			items.forEach((it, i) => {
				it.b.setAttribute('aria-current', String(i === current));
				if (i !== current) return;
				const end = items[i + 1]?.t ?? Number(list.dataset.imDuration ? seconds(list.dataset.imDuration) : it.t + 60);
				it.b.style.setProperty('--im-chapter-progress', Math.min(1, Math.max(0, (t - it.t) / (end - it.t))).toFixed(3));
			});
		}

		setInterval(() => {
			const api = players.get(video);
			if (api) mark(api.time());
		}, 500);
	}

	/* ── lazy pictures ─────────────────────────────────────────────────── */
	for (const img of $$('.im-lazy > img')) {
		const done = () => img.setAttribute('data-im-loaded', '');
		if (img.complete && img.naturalWidth) done();
		else img.addEventListener('load', done, { once: true });
		img.addEventListener('error', done, { once: true });
	}

	/* ── file drop ─────────────────────────────────────────────────────── */
	for (const zone of $$('.im-drop')) {
		const input = zone.querySelector('input[type="file"]');
		const name = zone.querySelector('[data-im-drop-name]');
		const over = (on) => zone.toggleAttribute('data-im-over', on);
		zone.addEventListener('dragover', (e) => (e.preventDefault(), over(true)));
		zone.addEventListener('dragleave', () => over(false));
		zone.addEventListener('drop', (e) => {
			e.preventDefault();
			over(false);
			if (input && e.dataTransfer.files.length) {
				input.files = e.dataTransfer.files;
				input.dispatchEvent(new Event('change', { bubbles: true }));
			}
		});
		input?.addEventListener('change', () => {
			if (name) name.textContent = [...input.files].map((f) => f.name).join(', ') || name.dataset.imDropName;
		});
	}
})();
