/**
 * im-motion.js — optional. The motion that CSS cannot do alone.
 *
 *   reveal      [data-im-reveal="up|down|left|right|scale|blur|fade"]   shows when scrolled into view
 *               [data-im-reveal-group]  on a parent: its reveals are staggered
 *   split       [data-im-split="words|chars"]   wraps each unit so text arrives piece by piece
 *   count       [data-im-count="1200"]          counts up to the number when revealed
 *   scramble    [data-im-scramble]              text resolves out of random characters
 *   scribble    [data-im-scribble="circle|underline|box|strike"]  a hand-drawn mark, drawn in
 *   lens        .im-fx-lens                     feeds the pointer's position to the image lens
 *   toggle      [data-im-toggle]                flips aria-pressed (for im-like and friends)
 *   entrance    [data-im-in="line-up|iris|frame|…"]  one of the 25 entrances, played when scrolled into view
 *   transition  <html data-im-transition="iris">  carries the click point to the next page
 *
 * Everything pointer-driven is skipped on touch-only devices; everything that
 * moves is skipped under prefers-reduced-motion — content is then simply shown.
 * The CSS half is src/motion/ and src/effects/.
 */
(() => {
	const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
	const hover = matchMedia('(hover: hover)').matches;
	const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

	/* ── split ─────────────────────────────────────────────────────────── */
	// The two entrances that move word by word, or letter by letter, split too.
	for (const el of $$('[data-im-in="words"], [data-im-in="chars"]')) el.dataset.imSplit ||= el.dataset.imIn;

	for (const el of $$('[data-im-split]')) {
		const chars = el.dataset.imSplit === 'chars';
		const text = el.textContent;
		el.setAttribute('aria-label', text.trim()); // read once, as a whole
		const units = chars ? [...text] : text.split(/(\s+)/);
		let i = 0;
		el.replaceChildren(
			...units.map((u) => {
				if (/^\s*$/.test(u)) return document.createTextNode(u);
				const span = document.createElement('span');
				span.className = 'im-split-unit';
				span.setAttribute('aria-hidden', 'true');
				span.style.setProperty('--im-i', i++);
				span.textContent = u;
				return span;
			}),
		);
		if (!el.hasAttribute('data-im-reveal') && !el.hasAttribute('data-im-in')) el.setAttribute('data-im-reveal', 'fade');
	}

	/* ── scribble: a hand-drawn mark round or under some words ──────────── */
	/* <span data-im-scribble="circle">important</span>   also: underline · box · strike
	   The path is drawn in when the span (or an ancestor) is revealed. It is an
	   SVG stretched to the text's box, so it wraps any phrase at any size. */
	const SCRIBBLES = {
		circle: 'M9 52C3 28 40 6 104 6s96 20 92 46-46 44-100 42S14 78 10 56c-2-18 22-36 60-42',
		underline: 'M4 12c30-8 58 6 92-2s62-6 100 2',
		box: 'M6 8c60-4 130-2 190 0 2 28 0 56-2 84-62 4-126 2-186-2C4 64 4 34 6 8z',
		strike: 'M2 10c40 6 80-8 120-2s50 4 76-2',
	};
	for (const el of $$('[data-im-scribble]')) {
		const kind = el.dataset.imScribble in SCRIBBLES ? el.dataset.imScribble : 'circle';
		const tall = kind === 'circle' || kind === 'box';
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('viewBox', tall ? '0 0 200 100' : '0 0 200 20');
		svg.setAttribute('preserveAspectRatio', 'none');
		svg.setAttribute('aria-hidden', 'true');
		svg.classList.add('im-scribble-mark', `im-scribble-${kind}`);
		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute('d', SCRIBBLES[kind]);
		path.setAttribute('pathLength', '1');
		svg.append(path);
		el.classList.add('im-scribble');
		el.append(svg);
		if (!el.closest('[data-im-reveal]')) el.setAttribute('data-im-reveal', 'none');
	}

	/* ── count & scramble (run when revealed) ──────────────────────────── */
	function count(el) {
		const to = Number(el.dataset.imCount);
		const decimals = (String(el.dataset.imCount).split('.')[1] || '').length;
		const fmt = new Intl.NumberFormat(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
		if (calm) return void (el.textContent = fmt.format(to));
		const t0 = performance.now();
		const dur = Number(el.dataset.imCountDuration) || 1400;
		const tick = (t) => {
			const p = Math.min(1, (t - t0) / dur);
			el.textContent = fmt.format(to * (1 - (1 - p) ** 4)); // ease-out-quart
			if (p < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	}

	function scramble(el) {
		const final = el.dataset.imScramble || el.textContent;
		el.dataset.imScramble = final;
		if (calm) return;
		const glyphs = '!<>-_\\/[]{}—=+*^?#01';
		let frame = 0;
		const total = final.length * 3 + 12;
		const tick = () => {
			el.textContent = [...final].map((ch, i) => (ch === ' ' || frame > i * 3 + 12 ? ch : glyphs[(Math.random() * glyphs.length) | 0])).join('');
			if (frame++ < total) requestAnimationFrame(tick);
			else el.textContent = final;
		};
		tick();
	}

	/* ── reveal ────────────────────────────────────────────────────────── */
	for (const group of $$('[data-im-reveal-group]')) $$('[data-im-reveal]', group).forEach((el, i) => el.style.setProperty('--im-i', i));

	const onShow = (el) => {
		el.setAttribute('data-im-revealed', '');
		if (el.matches('[data-im-count]')) count(el);
		$$('[data-im-count]', el).forEach(count);
		if (el.matches('[data-im-scramble]')) scramble(el);
	};
	const targets = new Set($$('[data-im-reveal], [data-im-in], [data-im-count]:not([data-im-reveal] *), [data-im-scramble]:not([data-im-reveal] *)'));
	const show = (el) => {
		if (!targets.delete(el)) return; // already shown
		io?.unobserve(el);
		onShow(el);
	};
	const io =
		'IntersectionObserver' in window
			? new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && show(e.target)), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
			: null;
	targets.forEach((t) => io?.observe(t));

	/* A safety net. Content that starts hidden must never DEPEND on one API: an
	   observer is suspended in a tab that is not being painted, and some
	   embedded or pre-rendered contexts never run it. So a plain, throttled
	   geometry check also reveals whatever is already inside the viewport. */
	const sweep = () => {
		for (const el of [...targets]) {
			const r = el.getBoundingClientRect();
			if (r.top < innerHeight * 0.92 && r.bottom > 0 && r.width + r.height > 0) show(el);
		}
	};
	let sweeping = null;
	const queueSweep = () => (sweeping ||= setTimeout(() => ((sweeping = null), sweep()), 160));
	addEventListener('scroll', queueSweep, { passive: true });
	addEventListener('resize', queueSweep, { passive: true });
	setTimeout(sweep, 400);
	// Printing: show everything, wherever it is.
	addEventListener('beforeprint', () => [...targets].forEach(show));

	/* ── page transition: where the iris opens from ─────────────────────── */
	/* The next page is styled by the NEXT document, so the point that was
	   clicked has to travel: remembered on click, applied on pagereveal —
	   which fires before that page's first frame. */
	if (document.documentElement.dataset.imTransition === 'iris') {
		const KEY = 'im-vt-point';
		addEventListener('click', (e) => {
			if (!e.target.closest?.('a[href]')) return;
			try {
				sessionStorage.setItem(KEY, `${((e.clientX / innerWidth) * 100).toFixed(1)}% ${((e.clientY / innerHeight) * 100).toFixed(1)}%`);
			} catch {}
		}, true);
		const apply = () => {
			try {
				const [x, y] = (sessionStorage.getItem(KEY) || '').split(' ');
				if (!y) return;
				document.documentElement.style.setProperty('--im-vt-x', x);
				document.documentElement.style.setProperty('--im-vt-y', y);
				sessionStorage.removeItem(KEY);
			} catch {}
		};
		addEventListener('pagereveal', apply);
		apply();
	}

	/* ── toggle ────────────────────────────────────────────────────────── */
	document.addEventListener('click', (e) => {
		const t = e.target.closest('[data-im-toggle]');
		if (t) t.setAttribute('aria-pressed', String(t.getAttribute('aria-pressed') !== 'true'));
	});

	/* ── lens: the pointer's position, for the image lens effect ────────── */
	if (hover && !calm) {
		for (const el of $$('.im-fx-lens')) {
			el.addEventListener('pointermove', (e) => {
				const r = el.getBoundingClientRect();
				el.style.setProperty('--im-lens-x', `${e.clientX - r.left}px`);
				el.style.setProperty('--im-lens-y', `${e.clientY - r.top}px`);
			});
		}
	}
})();
