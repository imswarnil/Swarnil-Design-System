/**
 * im.js — the Im Design System's behaviour. No dependencies, ~3 KB, progressive: every
 * feature is opted into with a data attribute and does nothing without one.
 *
 *   theme     [data-theme-toggle]            cycles light → dark → system
 *   nav       [data-nav-toggle]              side nav ↔ icon rail
 *   drawer    [data-drawer-open="#id"]       opens a <dialog class="drawer">
 *   menu      <div class="im-menu" popover>  positioned under its button
 *   copy      [data-im-copy="text"]          copies text (or the page URL) and confirms
 *   share     [data-im-share]                opens the OS share sheet where there is one
 *   toc       <nav data-toc="#article">      built from h2/h3, scroll-spied
 *   carousel  [data-im-carousel]             arrows, counter, progress, dots, autoplay
 *   preview   <video data-im-preview>        plays while its tile is hovered / focused
 *   marquee   [data-im-marquee]              clones the group so the loop has no seam
 *   tabs · curriculum panel · range fill · dialogs
 *
 * The first two also need the inline snippet in partials/shell/head-script.hbs
 * so the saved state applies before first paint.
 */
(() => {
	const root = document.documentElement;
	const store = {
		get: (k) => {
			try {
				return localStorage.getItem(k);
			} catch {
				return null;
			}
		},
		set: (k, v) => {
			try {
				localStorage.setItem(k, v);
			} catch {
				/* private mode: the choice simply lasts for this page */
			}
		},
	};

	/* ── theme ─────────────────────────────────────────────────────────── */
	const dark = matchMedia('(prefers-color-scheme: dark)');
	const ORDER = ['light', 'dark', 'system'];
	const LABEL = { light: 'Light', dark: 'Dark', system: 'System' };
	const choice = () => (ORDER.includes(store.get('theme')) ? store.get('theme') : 'system');

	function applyTheme() {
		const c = choice();
		root.dataset.theme = c === 'system' ? (dark.matches ? 'dark' : 'light') : c;
		root.dataset.themeChoice = c;
		for (const el of document.querySelectorAll('[data-theme-label]')) el.textContent = LABEL[c];
		for (const el of document.querySelectorAll('input[data-theme-set]')) el.checked = el.dataset.themeSet === c;
	}

	dark.addEventListener('change', applyTheme);
	document.addEventListener('click', (e) => {
		const t = e.target.closest('[data-theme-toggle]');
		if (!t) return;
		store.set('theme', ORDER[(ORDER.indexOf(choice()) + 1) % ORDER.length]);
		// [data-theme-set="dark"] picks one outright — for a switcher with three options.
	document.addEventListener('change', (e) => {
		const v = e.target.closest?.('[data-theme-set]')?.dataset.themeSet;
		if (!ORDER.includes(v)) return;
		store.set('theme', v);
		applyTheme();
	});
	applyTheme();
	});
	applyTheme();

	/* ── side nav: open ↔ rail ─────────────────────────────────────────── */
	function applyNav() {
		const rail = root.dataset.nav === 'rail';
		for (const b of document.querySelectorAll('[data-nav-toggle]')) b.setAttribute('aria-expanded', String(!rail));
	}
	document.addEventListener('click', (e) => {
		if (!e.target.closest('[data-nav-toggle]')) return;
		root.dataset.nav = root.dataset.nav === 'rail' ? 'open' : 'rail';
		store.set('nav', root.dataset.nav);
		applyNav();
	});
	applyNav();

	// As a rail a tree shows only its icon, so its children are out of reach:
	// pressing it opens the nav instead, with that tree open.
	document.addEventListener('click', (e) => {
		const summary = e.target.closest('.im-sidenav .im-navtree > summary');
		if (!summary || root.dataset.nav !== 'rail' || !matchMedia('(width >= 64rem)').matches) return;
		e.preventDefault();
		summary.parentElement.open = true;
		root.dataset.nav = 'open';
		store.set('nav', 'open');
		applyNav();
	});

	/* ── drawer ────────────────────────────────────────────────────────── */
	document.addEventListener('click', (e) => {
		// data-im-dialog-open is the same thing under a truer name for a modal.
		const opener = e.target.closest('[data-drawer-open], [data-im-dialog-open]');
		if (opener) return document.querySelector(opener.dataset.drawerOpen || opener.dataset.imDialogOpen)?.showModal();

		const dialog = e.target.closest('dialog');
		if (!dialog) return;
		// A click on the dialog element itself is a click on its backdrop.
		if (e.target === dialog || e.target.closest('[data-drawer-close], [data-im-dialog-close]')) dialog.close();
	});

	/* ── menus ─────────────────────────────────────────────────────────── */
	function place(menu) {
		const btn = document.querySelector(`[popovertarget="${menu.id}"]`);
		if (!btn) return;
		const b = btn.getBoundingClientRect();
		const w = menu.offsetWidth;
		const h = menu.offsetHeight;
		const gap = 8;
		const left = Math.min(Math.max(gap, menu.dataset.align === 'start' ? b.left : b.right - w), innerWidth - w - gap);
		const below = b.bottom + gap + h <= innerHeight;
		menu.style.left = `${left}px`;
		menu.style.top = `${below ? b.bottom + gap : Math.max(gap, b.top - gap - h)}px`;
	}
	for (const menu of document.querySelectorAll('.im-menu[popover]')) {
		menu.addEventListener('toggle', (e) => {
			const open = e.newState === 'open';
			document.querySelector(`[popovertarget="${menu.id}"]`)?.setAttribute('aria-expanded', String(open));
			if (open) place(menu);
		});
	}
	addEventListener('resize', () => document.querySelectorAll('.im-menu:popover-open').forEach(place));
	addEventListener('scroll', () => document.querySelectorAll('.im-menu:popover-open').forEach((m) => m.hidePopover()), { passive: true });

	/* ── copy ──────────────────────────────────────────────────────────── */
	/* data-im-copy="text" copies that text; an empty value copies the page URL.
	   The button says so for a moment through data-im-copied (style it), and a
	   [data-im-copy-label] inside it has its text swapped. */
	document.addEventListener('click', async (e) => {
		const btn = e.target.closest('[data-im-copy]');
		if (!btn) return;
		const text = btn.dataset.imCopy || btn.closest('[data-im-copy-source]')?.querySelector('code')?.textContent || location.href;
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			const ta = Object.assign(document.createElement('textarea'), { value: text });
			document.body.append(ta);
			ta.select();
			document.execCommand('copy');
			ta.remove();
		}
		const label = btn.querySelector('[data-im-copy-label]');
		const was = label?.textContent;
		btn.dataset.imCopied = 'true';
		if (label) label.textContent = btn.dataset.imCopiedLabel || 'Copied';
		setTimeout(() => {
			delete btn.dataset.imCopied;
			if (label) label.textContent = was;
		}, 1600);
	});

	/* ── native share ──────────────────────────────────────────────────── */
	for (const btn of document.querySelectorAll('[data-im-share]')) {
		if (!navigator.share) {
			btn.hidden = true;
			continue;
		}
		btn.addEventListener('click', () => {
			navigator.share({ title: btn.dataset.imShareTitle || document.title, url: btn.dataset.imShare || location.href }).catch(() => {});
		});
	}

	/* ── carousel ──────────────────────────────────────────────────────── */
	/* The track scrolls and snaps on its own. This only adds the controls, and
	   everything it needs is optional: leave a control out of the markup and
	   that feature is simply off.
	     [data-im-carousel-prev] / -next     arrow buttons
	     [data-im-carousel-count]            "03 / 10"
	     .im-carousel-progress               a bar: position, and how much shows
	     [data-im-carousel-dots]             one dot per page, built here
	     data-im-carousel-autoplay="5000"    ms per step; pauses on hover, focus,
	                                         a hidden tab, and reduced motion   */
	const calm = matchMedia('(prefers-reduced-motion: reduce)');
	const pad = (n) => String(n).padStart(2, '0');

	for (const el of document.querySelectorAll('[data-im-carousel]')) {
		const track = el.querySelector('.im-carousel-track');
		if (!track) continue;
		const slides = [...track.children];
		const prev = el.querySelector('[data-im-carousel-prev]');
		const next = el.querySelector('[data-im-carousel-next]');
		const count = el.querySelector('[data-im-carousel-count]');
		const dotsBox = el.querySelector('[data-im-carousel-dots]');
		let dots = [];

		// One "page" is however many whole slides fit; never less than one.
		const step = () => (slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth);
		const perPage = () => Math.max(1, Math.floor((track.clientWidth + 1) / step()));
		const max = () => track.scrollWidth - track.clientWidth;
		const go = (dir) => {
			const atEnd = track.scrollLeft >= max() - 2;
			const atStart = track.scrollLeft <= 2;
			if (dir > 0 && atEnd) return track.scrollTo({ left: 0 });
			if (dir < 0 && atStart) return track.scrollTo({ left: max() });
			track.scrollBy({ left: dir * step() * perPage() });
		};

		const buildDots = () => {
			if (!dotsBox) return;
			const pages = Math.max(1, Math.ceil((slides.length - perPage()) / perPage()) + 1);
			if (pages === dots.length) return;
			dots = Array.from({ length: pages }, (_, i) => {
				const b = document.createElement('button');
				b.type = 'button';
				b.setAttribute('aria-label', `Go to page ${i + 1}`);
				b.addEventListener('click', () => track.scrollTo({ left: Math.min(max(), i * step() * perPage()) }));
				return b;
			});
			dotsBox.replaceChildren(...dots);
		};

		let ticking = false;
		const update = () => {
			ticking = false;
			const m = max();
			el.toggleAttribute('data-im-carousel-static', m <= 2);
			const x = track.scrollLeft;
			const index = Math.min(slides.length - 1, Math.round(x / step()));
			if (prev) prev.disabled = x <= 2 && !el.dataset.imCarouselAutoplay;
			if (next) next.disabled = x >= m - 2 && !el.dataset.imCarouselAutoplay;
			if (count) count.textContent = `${pad(Math.min(slides.length, index + perPage()))} / ${pad(slides.length)}`;
			el.style.setProperty('--im-carousel-progress', m > 0 ? (x / m).toFixed(4) : 0);
			el.style.setProperty('--im-carousel-visible', Math.min(1, track.clientWidth / track.scrollWidth).toFixed(4));
			buildDots();
			const page = x >= m - 2 ? dots.length - 1 : Math.round(index / perPage());
			dots.forEach((d, i) => d.setAttribute('aria-current', String(i === page)));
		};
		const queue = () => ticking || ((ticking = true), requestAnimationFrame(update));

		prev?.addEventListener('click', () => go(-1));
		next?.addEventListener('click', () => go(1));
		track.addEventListener('scroll', queue, { passive: true });
		track.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') (e.preventDefault(), go(1));
			else if (e.key === 'ArrowLeft') (e.preventDefault(), go(-1));
		});
		new ResizeObserver(queue).observe(track);
		update();

		const every = Number(el.dataset.imCarouselAutoplay);
		if (every > 0) {
			let timer = null;
			const stop = () => (clearInterval(timer), (timer = null));
			const start = () => {
				if (timer || calm.matches || document.hidden || el.matches(':hover, :focus-within')) return;
				timer = setInterval(() => go(1), every);
			};
			for (const ev of ['pointerenter', 'focusin']) el.addEventListener(ev, stop);
			for (const ev of ['pointerleave', 'focusout']) el.addEventListener(ev, start);
			document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
			calm.addEventListener('change', () => (calm.matches ? stop() : start()));
			start();
		}
	}

	/* ── video preview ─────────────────────────────────────────────────── */
	/* A tile's <video data-im-preview preload="none"> plays while the tile is
	   hovered or focused and rewinds when it is left. Nothing is fetched until
	   then. Off for reduced motion, and on devices with no hover at all. */
	if (matchMedia('(hover: hover)').matches) {
		for (const video of document.querySelectorAll('video[data-im-preview]')) {
			const host = video.closest('.im-tile') || video.parentElement;
			video.muted = true;
			const play = () => {
				if (calm.matches) return;
				video.play().then(() => host.setAttribute('data-im-playing', ''), () => {});
			};
			const halt = () => {
				host.removeAttribute('data-im-playing');
				video.pause();
				video.currentTime = 0;
			};
			host.addEventListener('pointerenter', play);
			host.addEventListener('focusin', play);
			host.addEventListener('pointerleave', halt);
			host.addEventListener('focusout', halt);
		}
	}

	/* ── marquee ───────────────────────────────────────────────────────── */
	for (const el of document.querySelectorAll('[data-im-marquee]')) {
		const group = el.querySelector('.im-marquee-group');
		if (!group || el.querySelectorAll('.im-marquee-group').length > 1) continue;
		const clone = group.cloneNode(true);
		clone.setAttribute('aria-hidden', 'true');
		// The copy must not be reachable: no tab stops, no duplicate ids.
		for (const n of clone.querySelectorAll('a, button, input, [tabindex]')) n.setAttribute('tabindex', '-1');
		for (const n of clone.querySelectorAll('[id]')) n.removeAttribute('id');
		el.append(clone);
		el.setAttribute('data-im-ready', '');
	}

	/* ── curriculum panel (below lg) ───────────────────────────────────── */
	const curriculum = (panel, open) => {
		panel.toggleAttribute('data-im-open', open);
		const openers = [...document.querySelectorAll('[data-im-curriculum-open]')].filter((b) => document.querySelector(b.dataset.imCurriculumOpen) === panel);
		for (const b of openers) b.setAttribute('aria-expanded', String(open));
		// Focus goes into the panel, and back to the button that opened it.
		(open ? panel.querySelector('[data-im-curriculum-close]') : openers[0])?.focus();
	};
	for (const b of document.querySelectorAll('[data-im-curriculum-open]')) b.setAttribute('aria-expanded', 'false');
	document.addEventListener('click', (e) => {
		const opener = e.target.closest('[data-im-curriculum-open]');
		if (opener) {
			const panel = document.querySelector(opener.dataset.imCurriculumOpen);
			if (panel) curriculum(panel, true);
			return;
		}
		const open = document.querySelector('.im-curriculum[data-im-open]');
		if (open && (e.target.closest('[data-im-curriculum-close]') || !e.target.closest('.im-curriculum'))) curriculum(open, false);
	});
	document.addEventListener('keydown', (e) => {
		const open = e.key === 'Escape' && document.querySelector('.im-curriculum[data-im-open]');
		if (open) curriculum(open, false);
	});

	/* ── range: keep the filled track in step with the value ───────────── */
	const fill = (r) => r.style.setProperty('--im-value', ((r.value - (r.min || 0)) / ((r.max || 100) - (r.min || 0))).toFixed(4));
	for (const r of document.querySelectorAll('.im-range')) fill(r);
	document.addEventListener('input', (e) => e.target.matches?.('.im-range') && fill(e.target));

	/* ── tabs ──────────────────────────────────────────────────────────── */
	/* [data-im-tabs] with role="tab" buttons that name their panel in
	   aria-controls. Arrow keys move between tabs, as the ARIA pattern asks. */
	for (const root of document.querySelectorAll('[data-im-tabs]')) {
		const tabs = [...root.querySelectorAll('[role="tab"]')];
		const select = (tab, focus) => {
			for (const t of tabs) {
				const on = t === tab;
				t.setAttribute('aria-selected', String(on));
				t.tabIndex = on ? 0 : -1;
				const panel = document.getElementById(t.getAttribute('aria-controls'));
				if (panel) panel.hidden = !on;
			}
			if (focus) tab.focus();
		};
		tabs.forEach((tab, i) => {
			tab.addEventListener('click', () => select(tab));
			tab.addEventListener('keydown', (e) => {
				const to = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
				if (to === undefined) return;
				e.preventDefault();
				select(tabs[(to + tabs.length) % tabs.length], true);
			});
		});
		select(tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0]);
	}

	/* ── table of contents ─────────────────────────────────────────────── */
	for (const toc of document.querySelectorAll('[data-toc]')) {
		const scope = document.querySelector(toc.dataset.toc);
		const heads = scope ? [...scope.querySelectorAll('h2[id], h3[id]')].filter((h) => !h.closest('[data-toc-skip]')) : [];
		if (heads.length < 2) continue;

		const list = document.createElement('div');
		list.className = 'im-toc-list';
		const links = heads.map((h) => {
			const a = document.createElement('a');
			a.className = 'im-toc-link';
			a.href = `#${h.id}`;
			a.dataset.depth = h.tagName[1];
			a.textContent = h.dataset.tocLabel || h.textContent;
			list.append(a);
			return a;
		});

		const title = document.createElement('p');
		title.className = 'im-toc-title';
		title.textContent = toc.dataset.tocTitle || 'On this page';
		toc.replaceChildren(title, list);

		// The current heading is the last one above a line a little under the bar.
		let ticking = false;
		const spy = () => {
			ticking = false;
			const line = (parseFloat(getComputedStyle(root).scrollPaddingTop) || 80) + 8;
			let current = 0;
			heads.forEach((h, i) => {
				if (h.getBoundingClientRect().top <= line) current = i;
			});
			if (innerHeight + scrollY >= document.body.scrollHeight - 4) current = heads.length - 1;
			links.forEach((a, i) => a.setAttribute('aria-current', String(i === current)));
		};
		addEventListener('scroll', () => ticking || ((ticking = true), requestAnimationFrame(spy)), { passive: true });
		spy();
	}
})();
