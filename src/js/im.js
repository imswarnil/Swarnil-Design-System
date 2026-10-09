/**
 * im.js — the Im Design System's behaviour. No dependencies, ~3 KB, progressive: every
 * feature is opted into with a data attribute and does nothing without one.
 *
 *   theme     [data-theme-toggle]            light ⇄ dark  ([data-theme-set] picks one)
 *   nav       [data-nav-toggle]              side nav ↔ icon rail
 *   player    [data-im-player-toggle]        the player's side: collapse, or fold open on a phone
 *   guides    [data-im-guides-toggle]        the twelve columns drawn on the page, remembered
 *   drawer    [data-drawer-open="#id"]       opens a <dialog class="drawer">
 *   menu      <div class="im-menu" popover>  positioned under its button
 *   mega      <div class="im-mega" popover>  the same, centred and wide
 *   bar       [data-im-stick]                sets data-im-stuck once the page moves
 *   stars     [data-im-stars="owner/repo"]   fills in a GitHub star count, or does not
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
	/* Two themes, light and dark. There is no third "follow the system" state
	   to store: someone who has never chosen is shown what their system asks
	   for and keeps following it, and the first press settles it for good. */
	const dark = matchMedia('(prefers-color-scheme: dark)');
	const THEMES = ['light', 'dark'];
	const LABEL = { light: 'Light', dark: 'Dark' };
	const stored = () => (THEMES.includes(store.get('theme')) ? store.get('theme') : null);
	const theme = () => stored() || (dark.matches ? 'dark' : 'light');

	function applyTheme() {
		const t = theme();
		root.dataset.theme = t;
		for (const el of document.querySelectorAll('[data-theme-label]')) el.textContent = LABEL[t];
		for (const el of document.querySelectorAll('input[data-theme-set]')) el.checked = el.dataset.themeSet === t;
	}

	// Only while nothing has been chosen does the system's setting still count.
	dark.addEventListener('change', () => stored() || applyTheme());

	document.addEventListener('click', (e) => {
		if (!e.target.closest('[data-theme-toggle]')) return;
		store.set('theme', theme() === 'dark' ? 'light' : 'dark');
		applyTheme();
	});

	// [data-theme-set="dark"] picks one outright — the two-option switcher.
	document.addEventListener('change', (e) => {
		const v = e.target.closest?.('[data-theme-set]')?.dataset.themeSet;
		if (!THEMES.includes(v)) return;
		store.set('theme', v);
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

	/* ── guides: the columns drawn on the page (on unless turned off) ─── */
	function applyGuides() {
		for (const b of document.querySelectorAll('[data-im-guides-toggle]')) b.setAttribute('aria-pressed', String(root.dataset.imGuides !== 'off'));
	}
	document.addEventListener('click', (e) => {
		if (!e.target.closest('[data-im-guides-toggle]')) return;
		root.dataset.imGuides = root.dataset.imGuides === 'off' ? 'on' : 'off';
		store.set('guides', root.dataset.imGuides);
		applyGuides();
	});
	applyGuides();

	/* ── player: the lessons side ─────────────────────────────────────── */
	/* Wide: collapse or restore the side, remembered like the nav. Narrow: the
	   side folds under the video and the same toggle opens it there — not
	   remembered, so a phone always arrives on the lesson. */
	const wide = matchMedia('(width >= 64rem)');
	function applyPlayer() {
		const off = root.dataset.playerSide === 'off';
		for (const p of document.querySelectorAll('.im-player')) {
			const open = wide.matches ? !off : p.dataset.lessons === 'open';
			for (const b of p.querySelectorAll('[data-im-player-toggle]')) b.setAttribute('aria-expanded', String(open));
		}
	}
	document.addEventListener('click', (e) => {
		const p = e.target.closest('[data-im-player-toggle]')?.closest('.im-player');
		if (!p) return;
		if (wide.matches) {
			root.dataset.playerSide = root.dataset.playerSide === 'off' ? 'on' : 'off';
			store.set('player-side', root.dataset.playerSide);
		} else if (p.dataset.lessons === 'open') delete p.dataset.lessons;
		else p.dataset.lessons = 'open';
		applyPlayer();
	});
	wide.addEventListener('change', applyPlayer);
	applyPlayer();

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

	/* ── menus and mega menus ──────────────────────────────────────────── */
	/* data-align: "end" (default) right edges line up · "start" left edges ·
	   "center" centred on the VIEWPORT, which is what a wide mega menu wants —
	   a 58rem panel hung off a 6rem link would otherwise run off the screen. */
	const POPOVERS = '.im-menu[popover], .im-mega[popover]';
	const OPEN_POPOVERS = '.im-menu:popover-open, .im-mega:popover-open';

	function place(menu) {
		const btn = document.querySelector(`[popovertarget="${menu.id}"]`);
		if (!btn) return;
		const b = btn.getBoundingClientRect();
		const w = menu.offsetWidth;
		const h = menu.offsetHeight;
		const gap = 8;
		const align = menu.dataset.align;
		const wanted = align === 'center' ? (innerWidth - w) / 2 : align === 'start' ? b.left : b.right - w;
		const left = Math.min(Math.max(gap, wanted), Math.max(gap, innerWidth - w - gap));
		const below = b.bottom + gap + h <= innerHeight;
		menu.style.left = `${left}px`;
		menu.style.top = `${below ? b.bottom + gap : Math.max(gap, b.top - gap - h)}px`;
		// Which side it ended up on, so it can arrive FROM the button rather
		// than always from above it.
		menu.dataset.side = below ? 'bottom' : 'top';
	}

	for (const menu of document.querySelectorAll(POPOVERS)) {
		menu.addEventListener('toggle', (e) => {
			const open = e.newState === 'open';
			document.querySelector(`[popovertarget="${menu.id}"]`)?.setAttribute('aria-expanded', String(open));
			if (open) place(menu);
		});
	}
	addEventListener('resize', () => document.querySelectorAll(OPEN_POPOVERS).forEach(place));
	addEventListener('scroll', () => document.querySelectorAll(OPEN_POPOVERS).forEach((m) => m.hidePopover()), { passive: true });

	/* ── a bar that knows the page has moved ───────────────────────────── */
	/* [data-im-stick] gets data-im-stuck once the page is scrolled past
	   data-im-stick (a number of pixels, default 8). That is all: what it
	   LOOKS like belongs to CSS — .im-topbar-float turns into an island.
	   A scroll listener, not an observer: an IntersectionObserver never fires
	   in a tab that is not being painted, and this decides how the bar looks. */
	const sticky = [...document.querySelectorAll('[data-im-stick]')];
	if (sticky.length) {
		let pending = false;
		const measure = () => {
			pending = false;
			for (const el of sticky) el.toggleAttribute('data-im-stuck', scrollY > (Number(el.dataset.imStick) || 8));
		};
		addEventListener('scroll', () => pending || ((pending = true), requestAnimationFrame(measure)), { passive: true });
		measure();
	}

	/* ── GitHub star count ─────────────────────────────────────────────── */
	/* Opt-in, and only ever additive: [data-im-stars="owner/repo"] asks
	   GitHub's public API once and writes the number into [data-im-star-count].
	   No key, no third-party script, nothing that can identify a reader — and
	   if the call fails or is rate-limited, whatever the markup already said
	   simply stands. */
	for (const el of document.querySelectorAll('[data-im-stars]')) {
		const slot = el.querySelector('[data-im-star-count]') || el;
		fetch(`https://api.github.com/repos/${el.dataset.imStars}`, { headers: { Accept: 'application/vnd.github+json' } })
			.then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
			.then(({ stargazers_count: n }) => {
				if (typeof n !== 'number') return;
				slot.textContent = n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n);
			})
			.catch(() => {});
	}

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
		// A heading inside a <dialog> belongs to that dialog, not to the page:
		// a member gate's title is not a place the reader can be scrolled to.
		const heads = scope ? [...scope.querySelectorAll('h2[id], h3[id]')].filter((h) => !h.closest('[data-toc-skip], dialog')) : [];
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
