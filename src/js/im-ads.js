/**
 * im-ads.js — optional, ~1.5 KB. The behaviour of the ad blocks.
 *
 *   close      [data-im-ad-close]        takes its .im-ad away
 *   remember   [data-im-ad-key="k"]      …and keeps it away for the session
 *   reveal     .im-ad-sticky/-floating   arrives once the reader has scrolled
 *   popup      [data-im-ad-popup]        an interstitial, after a delay, once
 *   gate       [data-im-ad-remove]       opens the member gate dialog
 *
 * Nothing here loads an advert, talks to an ad network, or sets a cookie: the
 * only thing it stores is "this reader closed that block", in sessionStorage,
 * so a closed ad does not come back on the next page and follow them around.
 *
 * Without this file every block still renders and every link still works; the
 * close button simply does nothing, and the sticky one is visible from the
 * start — which is why .im-ad-sticky is hidden by an ATTRIBUTE this script
 * adds rather than by a class the markup would have to carry.
 */
(() => {
	const $$ = (s, r = document) => [...r.querySelectorAll(s)];

	/* ── remembering, per session ──────────────────────────────────────── */
	const KEY = 'im-ads-closed';
	const closed = () => {
		try {
			return new Set(JSON.parse(sessionStorage.getItem(KEY) || '[]'));
		} catch {
			return new Set();
		}
	};
	const remember = (key) => {
		if (!key) return;
		try {
			const set = closed();
			set.add(key);
			sessionStorage.setItem(KEY, JSON.stringify([...set]));
		} catch {}
	};

	const gone = closed();
	for (const ad of $$('[data-im-ad-key]')) {
		if (gone.has(ad.dataset.imAdKey)) ad.remove();
	}

	/* ── the cross ─────────────────────────────────────────────────────── */
	document.addEventListener('click', (e) => {
		const close = e.target.closest('[data-im-ad-close]');
		if (!close) return;
		const ad = close.closest('.im-ad, .im-affiliate, .im-sponsor') || close.parentElement;
		if (!ad) return;
		remember(ad.dataset.imAdKey);
		// A dialog closes; anything else leaves with the page's own exit.
		if (ad.tagName === 'DIALOG') return ad.close();
		ad.style.transition = 'opacity 200ms, translate 260ms var(--im-ease-in)';
		ad.style.opacity = '0';
		ad.style.translate = '0 0.5rem';
		setTimeout(() => ad.remove(), 220);
	});

	/* ── the ones that arrive later ────────────────────────────────────── */
	/* A scroll listener, not an observer: an IntersectionObserver never fires
	   in a tab that is not being painted, and these are fixed to the window. */
	const late = $$('.im-ad-sticky, .im-ad-floating');
	if (late.length) {
		const after = (el) => Number(el.dataset.imAdAfter) || 400;
		let pending = false;
		const measure = () => {
			pending = false;
			for (const el of late) el.toggleAttribute('data-im-ad-shown', scrollY > after(el));
		};
		addEventListener('scroll', () => pending || ((pending = true), requestAnimationFrame(measure)), { passive: true });
		measure();
	}

	/* ── the interstitial ──────────────────────────────────────────────── */
	/* Once per session, after a delay, and never before the reader has had a
	   moment with the page. `data-im-ad-popup` is the delay in seconds. */
	for (const dialog of $$('dialog[data-im-ad-popup]')) {
		const key = dialog.dataset.imAdKey || dialog.id;
		if (gone.has(key)) continue;
		const wait = (Number(dialog.dataset.imAdPopup) || 8) * 1000;
		setTimeout(() => {
			if (!dialog.isConnected || dialog.open) return;
			dialog.showModal();
			remember(key);
		}, wait);
	}

	/* ── the way out ───────────────────────────────────────────────────── */
	document.addEventListener('click', (e) => {
		const trigger = e.target.closest('[data-im-ad-remove]');
		if (!trigger) return;
		e.preventDefault();
		const gate = document.querySelector(trigger.getAttribute('data-im-ad-remove') || '.im-gate');
		if (!gate) return;
		// An interstitial gets out of the way first: two modals is one too many.
		trigger.closest('dialog')?.close();
		gate.showModal();
	});

	document.addEventListener('click', (e) => {
		const close = e.target.closest('[data-im-gate-close]');
		if (close) close.closest('dialog')?.close();
	});

	/* A press on the sheet around the card closes it, as the lightbox does. */
	for (const dialog of $$('.im-gate, .im-ad-popup')) {
		dialog.addEventListener('click', (e) => {
			if (e.target === dialog) dialog.close();
		});
	}
})();
