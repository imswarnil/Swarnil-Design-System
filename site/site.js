/* Docs-only: the style switch and the search dialog. Everything else on the
   page is assets/im.js. */
(() => {
	const root = document.documentElement;
	const sync = () => document.querySelectorAll('[data-style]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.style === root.dataset.imStyle)));
	document.addEventListener('click', (e) => {
		const b = e.target.closest('[data-style]');
		if (!b) return;
		root.dataset.imStyle = b.dataset.style;
		try {
			localStorage.setItem('im-style', b.dataset.style);
		} catch {}
		sync();
	});
	sync();
})();

(() => {
	const dialog = document.getElementById('search');
	if (!dialog) return;
	const input = dialog.querySelector('input');
	const list = dialog.querySelector('.search-results');
	const index = JSON.parse(document.getElementById('search-index').textContent || '[]');
	let active = 0;

	function render() {
		const q = input.value.trim().toLowerCase();
		const hits = index.filter((i) => !q || i.t.toLowerCase().includes(q));
		active = 0;
		list.replaceChildren(
			...hits.map((hit, i) => {
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.href = hit.u;
				a.textContent = hit.t;
				a.setAttribute('aria-selected', String(i === 0));
				li.append(a);
				return li;
			}),
		);
	}

	function move(step) {
		const links = [...list.querySelectorAll('a')];
		if (!links.length) return;
		active = (active + step + links.length) % links.length;
		links.forEach((a, i) => a.setAttribute('aria-selected', String(i === active)));
		links[active].scrollIntoView({ block: 'nearest' });
	}

	function open() {
		if (dialog.open) return;
		dialog.showModal();
		input.value = '';
		render();
		input.focus();
	}

	document.addEventListener('click', (e) => e.target.closest('[data-search-open]') && open());
	input.addEventListener('input', render);
	dialog.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowDown') (e.preventDefault(), move(1));
		else if (e.key === 'ArrowUp') (e.preventDefault(), move(-1));
		else if (e.key === 'Enter') (e.preventDefault(), list.querySelector('a[aria-selected="true"]')?.click());
	});
	addEventListener('keydown', (e) => {
		const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
		if ((e.key === '/' && !typing) || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) (e.preventDefault(), open());
	});
})();

/* Docs-only: the page-transition picker on Motion → Page transitions. */
(() => {
	const root = document.documentElement;
	const sync = () => document.querySelectorAll('[data-transition]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.transition === root.dataset.imTransition)));
	document.addEventListener('click', (e) => {
		const b = e.target.closest('[data-transition]');
		if (!b) return;
		root.dataset.imTransition = b.dataset.transition;
		try {
			localStorage.setItem('im-transition', b.dataset.transition);
		} catch {}
		sync();
	});
	sync();
})();

/* Docs-only: a Replay button on any [data-replay] demo — re-runs its CSS
   animations by detaching and re-attaching them. */
(() => {
	for (const demo of document.querySelectorAll('[data-replay]')) {
		const stage = demo.closest('.example-stage');
		if (!stage) continue;
		stage.style.position = 'relative';
		const b = document.createElement('button');
		b.type = 'button';
		b.className = 'im-btn im-btn-sm replay';
		b.textContent = 'Replay';
		b.addEventListener('click', () => {
			const els = [demo, ...demo.querySelectorAll('*')];
			// Entrances play off data-im-revealed: take it away and give it back.
			const ins = els.filter((el) => el.hasAttribute('data-im-in'));
			for (const el of ins) el.removeAttribute('data-im-revealed');
			for (const el of els) el.style.animation = 'none';
			void demo.offsetWidth;
			for (const el of els) el.style.animation = '';
			requestAnimationFrame(() => requestAnimationFrame(() => ins.forEach((el) => el.setAttribute('data-im-revealed', ''))));
		});
		stage.append(b);
	}
})();
