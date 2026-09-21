/**
 * im-charts.js — optional, ~1 KB. Draws the two charts CSS cannot:
 *
 *   <svg class="im-spark" data-im-spark="4,8,6,12,9,14"></svg>              a sparkline
 *   <svg class="im-spark im-spark-wide" data-im-spark="…" data-im-area></svg>   with a filled area
 *
 * Values are scaled to the SVG's own box, so size it with CSS. The last point
 * gets a dot. Bars, rankings, rings and donuts are pure CSS (components/stats.css).
 */
(() => {
	const NS = 'http://www.w3.org/2000/svg';
	const el = (name, attrs) => {
		const n = document.createElementNS(NS, name);
		for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
		return n;
	};

	for (const svg of document.querySelectorAll('svg[data-im-spark]')) {
		const values = svg.dataset.imSpark.split(',').map(Number).filter((n) => !Number.isNaN(n));
		if (values.length < 2) continue;
		const W = 100;
		const H = 40;
		const pad = 3;
		const min = Math.min(...values);
		const max = Math.max(...values);
		const x = (i) => (i / (values.length - 1)) * W;
		const y = (v) => H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
		const pts = values.map((v, i) => `${x(i).toFixed(2)},${y(v).toFixed(2)}`);

		svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
		svg.setAttribute('preserveAspectRatio', 'none');
		svg.setAttribute('role', 'img');
		if (!svg.hasAttribute('aria-label')) svg.setAttribute('aria-label', `Trend: ${values[0]} to ${values.at(-1)}`);
		svg.replaceChildren();
		if (svg.hasAttribute('data-im-area')) svg.append(el('polygon', { class: 'im-spark-area', points: `0,${H} ${pts.join(' ')} ${W},${H}` }));
		svg.append(el('polyline', { class: 'im-spark-line', points: pts.join(' ') }));
		// A circle would stretch with preserveAspectRatio="none"; a zero-length
		// round-capped line with a non-scaling stroke stays a true dot.
		const [lx, ly] = pts.at(-1).split(',');
		svg.append(el('line', { class: 'im-spark-line', x1: lx, y1: ly, x2: lx, y2: ly, 'stroke-width': 5 }));
	}
})();
