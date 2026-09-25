/* Docs-only: the search dialog, the demo switchers and the replay button.
   Everything else on the page is assets/im.js. */
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

/* Docs-only: a row of buttons that re-dresses a demo.

     <div class="im-btn-group" role="group"
          data-demo-target="#hero" data-demo-target-b="#body">
       <button class="im-btn im-btn-sm" aria-pressed="true"
               data-demo-class="im-posthero im-posthero-wide"
               data-demo-class-b="im-with-rails">Magazine</button>
       …
     </div>

   The button carries the WHOLE class list it wants on each target, so what a
   reader copies out of the page is exactly what produced what they are
   looking at. A second target (-b) lets one press set a whole layout — the
   hero AND the columns under it — which is how a theme would expose it: one
   setting, not two. data-demo-label names an element to print the classes in. */
(() => {
	for (const group of document.querySelectorAll('[data-demo-target]')) {
		const targets = [
			[document.querySelector(group.dataset.demoTarget), 'demoClass', group.dataset.demoLabel],
			[group.dataset.demoTargetB && document.querySelector(group.dataset.demoTargetB), 'demoClassB', group.dataset.demoLabelB],
		].filter(([el]) => el);
		const buttons = [...group.querySelectorAll('[data-demo-class]')];
		if (!targets.length || !buttons.length) continue;

		const pick = (b) => {
			for (const [el, key, label] of targets) {
				const value = b.dataset[key];
				if (value === undefined) continue;
				el.className = value;
				const slot = label && document.querySelector(label);
				if (slot) slot.textContent = value;
			}
			for (const x of buttons) x.setAttribute('aria-pressed', String(x === b));
		};
		for (const b of buttons) b.addEventListener('click', () => pick(b));
		pick(buttons.find((b) => b.getAttribute('aria-pressed') === 'true') || buttons[0]);
	}
})();

/* Docs-only: the ads page reveals its two fixed units on demand, rather than
   letting them sit over every other page's examples. */
(() => {
	for (const b of document.querySelectorAll('[data-demo-ad]')) {
		b.addEventListener('click', () => {
			const ad = document.getElementById(`ad-${b.dataset.demoAd}-demo`);
			if (!ad) return;
			ad.hidden = false;
			// The script reveals these on scroll; here the button stands in.
			requestAnimationFrame(() => ad.setAttribute('data-im-ad-shown', ''));
		});
	}
})();

/* Docs-only: a row of buttons that sets an ATTRIBUTE on a target, rather than
   replacing its class list — for a layout whose switch is a real attribute a
   theme would set from a setting. */
(() => {
	for (const group of document.querySelectorAll('[data-demo-attr]')) {
		const target = document.querySelector(group.dataset.demoAttr);
		const name = group.dataset.demoAttrName;
		const buttons = [...group.querySelectorAll('[data-demo-value]')];
		if (!target || !name || !buttons.length) continue;
		for (const b of buttons) {
			b.addEventListener('click', () => {
				target.setAttribute(name, b.dataset.demoValue);
				for (const x of buttons) x.setAttribute('aria-pressed', String(x === b));
			});
		}
	}
})();

/* Docs only: scale a .frame-preview's iframe to the box. */
(() => {
	const boxes = document.querySelectorAll('.frame-preview');
	if (!boxes.length) return;
	const fit = (b) => b.style.setProperty('--fs', (b.clientWidth / Number(getComputedStyle(b).getPropertyValue('--fw'))).toString());
	const ro = new ResizeObserver((entries) => entries.forEach((e) => fit(e.target)));
	boxes.forEach((b) => { fit(b); ro.observe(b); });
})();
