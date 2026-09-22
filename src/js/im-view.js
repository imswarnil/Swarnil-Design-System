/**
 * im-view.js — the grid / list / plain switch on a collection.
 *
 *     <div class="im-btn-group" role="group" data-im-view="#feed">
 *       <button type="button" value="grid"  aria-pressed="true">Grid</button>
 *       <button type="button" value="list"  aria-pressed="false">List</button>
 *       <button type="button" value="plain" aria-pressed="false">Plain</button>
 *     </div>
 *     <div class="im-feed" id="feed" data-view="grid"> … </div>
 *
 * The group's data-im-view is a selector for the thing it draws. Pressing a
 * button sets data-view on that element and remembers the choice under the
 * selector, so a reader who prefers lists gets lists on every collection.
 *
 * Nothing here is required for the page to work: the markup is served with a
 * data-view already on it and the CSS does the rest. Without this file the
 * buttons simply do nothing, which is why they are buttons and not links.
 */
(() => {
	const KEY = 'im-view';

	const remembered = () => {
		try {
			return JSON.parse(localStorage.getItem(KEY) || '{}');
		} catch {
			return {}; // private mode, blocked storage, corrupt value — all the same answer
		}
	};

	const remember = (target, value) => {
		try {
			localStorage.setItem(KEY, JSON.stringify({ ...remembered(), [target]: value }));
		} catch {
			/* not being able to remember is not a reason to not switch */
		}
	};

	function apply(group, value, save = true) {
		const target = group.dataset.imView;
		const el = target && document.querySelector(target);
		if (!el) return;
		el.dataset.view = value;
		for (const b of group.querySelectorAll('button[value]')) {
			b.setAttribute('aria-pressed', String(b.value === value));
		}
		if (save) remember(target, value);
	}

	function setup(group) {
		const saved = remembered()[group.dataset.imView];
		if (saved) apply(group, saved, false);
		group.addEventListener('click', (e) => {
			const button = e.target.closest('button[value]');
			if (button && group.contains(button)) apply(group, button.value);
		});
	}

	const run = (root = document) => root.querySelectorAll('[data-im-view]').forEach(setup);
	if (document.readyState === 'loading') addEventListener('DOMContentLoaded', () => run());
	else run();
	window.imView = { run };
})();

/**
 * The two segmented switches that only change an attribute: the auth card's
 * sign in / sign up, and the tier grid's monthly / yearly.
 *
 *     <div class="im-auth-switch" role="tablist" data-im-mode="#auth">
 *       <button value="in" aria-selected="true">Sign in</button>
 *       <button value="up" aria-selected="false">Sign up</button>
 *     </div>
 *
 * Both states are already in the markup and CSS decides which is shown, so a
 * page served with data-mode="up" is correct before any script runs and this
 * file only ever writes one attribute. Nothing can end up half-switched.
 */
(() => {
	function bind(group, attribute) {
		const el = document.querySelector(group.dataset[attribute === 'mode' ? 'imMode' : 'imPeriod']);
		if (!el) return;
		group.addEventListener('click', (e) => {
			const button = e.target.closest('button[value]');
			if (!button || !group.contains(button)) return;
			el.dataset[attribute] = button.value;
			for (const b of group.querySelectorAll('button[value]')) {
				b.setAttribute('aria-selected', String(b.value === button.value));
			}
		});
	}

	const run = () => {
		document.querySelectorAll('[data-im-mode]').forEach((g) => bind(g, 'mode'));
		document.querySelectorAll('[data-im-period]').forEach((g) => bind(g, 'period'));
	};
	if (document.readyState === 'loading') addEventListener('DOMContentLoaded', run);
	else run();
})();

/**
 * im-filter — the tabs and chips on a collection bar, made to work.
 *
 *     <div class="im-collbar-filters" role="group" data-im-filter="#eps">
 *       <button type="button" value="all" aria-current="page">All</button>
 *       <button type="button" value="s1">Season 1</button>
 *     </div>
 *     <div id="eps">
 *       <article data-facet="s1"> … </article>
 *       <article data-facet="s2 extras"> … </article>
 *     </div>
 *
 * An item's `data-facet` is a space-separated list, so a thing can be in two
 * places at once. `value="all"` shows everything.
 *
 * It toggles the `hidden` ATTRIBUTE rather than a class, because hidden is
 * what the accessibility tree reads — a filter that only changes `display`
 * leaves the hidden items in the tab order on some browsers, and a keyboard
 * user then tabs through four episodes that are not on the screen.
 *
 * CSS cannot do this on its own: a selector cannot compare one element's
 * attribute against another's. Without the script every item stays visible,
 * which is the right failure — a filter that hides things it cannot unhide
 * is worse than no filter.
 */
(() => {
	function setup(group) {
		const target = document.querySelector(group.dataset.imFilter);
		if (!target) return;

		const items = () => target.querySelectorAll('[data-facet]');
		const empty = target.querySelector('[data-facet-empty]');

		function apply(value) {
			let shown = 0;
			for (const item of items()) {
				const match = value === 'all' || item.dataset.facet.split(/\s+/).includes(value);
				item.toggleAttribute('hidden', !match);
				if (match) shown += 1;
			}
			if (empty) empty.toggleAttribute('hidden', shown > 0);
			for (const b of group.querySelectorAll('[value]')) {
				const on = b.value === value;
				b.setAttribute('aria-current', on ? 'page' : 'false');
				if (b.hasAttribute('aria-pressed')) b.setAttribute('aria-pressed', String(on));
			}
			target.dataset.filter = value;
		}

		group.addEventListener('click', (e) => {
			const button = e.target.closest('[value]');
			if (!button || !group.contains(button)) return;
			e.preventDefault();
			apply(button.value);
		});

		const chosen = group.querySelector('[aria-current="page"][value]');
		if (chosen && chosen.value !== 'all') apply(chosen.value);
	}

	const run = (root = document) => root.querySelectorAll('[data-im-filter]').forEach(setup);
	if (document.readyState === 'loading') addEventListener('DOMContentLoaded', () => run());
	else run();
	window.imFilter = { run };
})();
