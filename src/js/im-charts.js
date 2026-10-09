/**
 * im-charts.js — optional, ~6 KB. Draws what CSS cannot: a line.
 *
 *   SPARKLINE
 *   <svg class="im-spark" data-im-spark="4,8,6,12,9,14"></svg>
 *   <svg class="im-spark im-spark-wide" data-im-spark="…" data-im-area></svg>
 *
 *   LINE / AREA / STEP — the plot is built inside the element:
 *   <div class="im-chart-line" data-im-labels="Jan,Feb,Mar" data-im-area data-im-step data-im-max="20" data-im-unit="k">
 *     <data value="4,8,6" data-name="Readers"></data>     one <data> per series
 *   </div>
 *   <div class="im-chart-line" data-im-line="Jan:4,Feb:8,Mar:6"></div>   one series, shorthand
 *
 *   SCATTER
 *   <div class="im-chart-scatter" data-im-scatter="4:8,6:12"></div>      or <data value="x:y,x:y" data-name>
 *
 *   LEGEND TOGGLES — a button with data-series="n" in [data-im-legend] flips
 *   aria-pressed and data-im-off-n on the nearest .im-chart; CSS fades the series.
 *
 *   FILTER CHIPS — [data-im-chips] flips aria-pressed on its buttons (what is
 *   filtered is the page's own business).
 *
 * The curve is an SVG stretched to the box with strokes kept at one width.
 * The points are HTML buttons placed by percentage, so they do not stretch,
 * a keyboard reaches them, and their label is the readout. Bars, rankings,
 * donuts, heatmaps and tables are pure CSS (src/viz/).
 */
(() => {
	const NS = 'http://www.w3.org/2000/svg';
	const el = (name, attrs = {}, ns) => {
		const n = ns ? document.createElementNS(NS, name) : document.createElement(name);
		for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
		return n;
	};
	const nums = (s) => String(s || '').split(',').map((v) => Number(v.trim())).filter((n) => !Number.isNaN(n));
	const fmt = new Intl.NumberFormat();

	/* ── sparkline ───────────────────────────────────────────────────────── */
	for (const svg of document.querySelectorAll('svg[data-im-spark]')) {
		const values = nums(svg.dataset.imSpark);
		if (values.length < 2) continue;
		const W = 100, H = 40, pad = 3;
		const min = Math.min(...values), max = Math.max(...values);
		const x = (i) => (i / (values.length - 1)) * W;
		const y = (v) => H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
		const pts = values.map((v, i) => `${x(i).toFixed(2)},${y(v).toFixed(2)}`);
		svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
		svg.setAttribute('preserveAspectRatio', 'none');
		svg.setAttribute('role', 'img');
		if (!svg.hasAttribute('aria-label')) svg.setAttribute('aria-label', `Trend: ${values[0]} to ${values.at(-1)}`);
		svg.replaceChildren();
		if (svg.hasAttribute('data-im-area')) svg.append(el('polygon', { class: 'im-spark-area', points: `0,${H} ${pts.join(' ')} ${W},${H}` }, 1));
		svg.append(el('polyline', { class: 'im-spark-line', points: pts.join(' ') }, 1));
		// A circle would stretch with preserveAspectRatio="none"; a zero-length
		// round-capped line with a non-scaling stroke stays a true dot.
		const [lx, ly] = pts.at(-1).split(',');
		svg.append(el('line', { class: 'im-spark-line', x1: lx, y1: ly, x2: lx, y2: ly, 'stroke-width': 5 }, 1));
	}

	/* ── the plot: y ticks, the area, x labels ──────────────────────────── */
	// Nice round ticks: the top of the axis is the smallest 1-2-5 step above the max.
	const niceMax = (max, rows) => {
		if (max <= 0) return rows;
		const raw = max / rows;
		const mag = 10 ** Math.floor(Math.log10(raw));
		const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw);
		return step * rows;
	};
	const short = (n) => (Math.abs(n) >= 1e6 ? `${+(n / 1e6).toFixed(1)}M` : Math.abs(n) >= 1e3 ? `${+(n / 1e3).toFixed(1)}k` : `${+n.toFixed(2)}`);

	function plot(host) {
		const rows = Number(host.dataset.imRows) || 4;
		let y = host.querySelector('[data-im-y]');
		let area = host.querySelector('[data-im-area-box]');
		let x = host.querySelector('[data-im-x]');
		if (!area) {
			for (const d of host.querySelectorAll(':scope > :not(data)')) d.remove();
			const p = el('div', { class: `im-chart-plot${host.hasAttribute('data-im-bare') ? ' im-chart-plot-bare' : ''}` });
			p.style.setProperty('--im-chart-rows', rows);
			if (!host.hasAttribute('data-im-bare')) p.append((y = el('div', { class: 'im-chart-y', 'aria-hidden': 'true' })));
			p.append((area = el('div', { class: 'im-chart-area' })));
			p.append((x = el('div', { class: 'im-chart-x', 'aria-hidden': 'true' })));
			host.append(p);
		}
		return { rows, y, area, x };
	}

	/* ── line / area / step ─────────────────────────────────────────────── */
	for (const host of document.querySelectorAll('.im-chart-line')) {
		let labels = (host.dataset.imLabels || '').split(',').map((s) => s.trim()).filter(Boolean);
		let series = [...host.querySelectorAll('data')].map((d, i) => ({ name: d.dataset.name || `Series ${i + 1}`, values: nums(d.value) }));
		if (!series.length && host.dataset.imLine) {
			const pairs = host.dataset.imLine.split(',').map((p) => p.split(':').map((s) => s.trim()));
			labels = pairs.map((p) => p[0]);
			series = [{ name: host.dataset.imName || 'Value', values: pairs.map((p) => Number(p[1])) }];
		}
		series = series.filter((s) => s.values.length > 1);
		if (!series.length) continue;
		const unit = host.dataset.imUnit || '';
		const { rows, y, area, x } = plot(host);
		const n = Math.max(...series.map((s) => s.values.length));
		const max = Number(host.dataset.imMax) || niceMax(Math.max(...series.flatMap((s) => s.values)), rows);
		const min = Number(host.dataset.imMin) || 0;
		const step = host.hasAttribute('data-im-step');
		const W = 100, H = 100;
		const px = (i) => (i / (n - 1)) * W;
		const py = (v) => H - ((v - min) / (max - min || 1)) * H;

		if (y) {
			y.replaceChildren(...Array.from({ length: rows + 1 }, (_, i) => Object.assign(el('span'), { textContent: short(max - ((max - min) / rows) * i) + unit })));
		}
		if (x) {
			x.replaceChildren(...labels.map((l) => Object.assign(el('span'), { textContent: l })));
		}
		for (const old of area.querySelectorAll('.im-chart-svg, .im-chart-point')) old.remove();
		const svg = el('svg', { class: 'im-chart-svg', viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none', 'aria-hidden': 'true' }, 1);
		area.prepend(svg);
		const said = [];
		series.forEach((s, si) => {
			const k = si + 1;
			let d = '';
			s.values.forEach((v, i) => {
				const X = px(i).toFixed(2), Y = py(v).toFixed(2);
				if (i === 0) d += `M${X} ${Y}`;
				else if (step) d += `H${X}V${Y}`;
				else d += `L${X} ${Y}`;
			});
			if (host.hasAttribute('data-im-area')) {
				svg.append(el('path', { class: 'im-chart-fill', 'data-series': k, d: `${d}V${H}H0Z` }, 1));
			}
			svg.append(el('path', { class: 'im-chart-path', 'data-series': k, d }, 1));
			s.values.forEach((v, i) => {
				const b = el('button', { type: 'button', class: 'im-chart-point', 'data-series': k, 'data-label': `${labels[i] ? labels[i] + ' · ' : ''}${s.name}: ${fmt.format(v)}${unit}`, 'aria-label': `${s.name}, ${labels[i] || i + 1}: ${fmt.format(v)}${unit}` });
				b.style.setProperty('--x', `${px(i).toFixed(2)}%`);
				b.style.setProperty('--y', `${py(v).toFixed(2)}%`);
				b.style.setProperty('--n', i);
				area.append(b);
			});
			said.push(`${s.name} ${s.values.map((v, i) => `${labels[i] || i + 1} ${fmt.format(v)}${unit}`).join(', ')}`);
		});
		host.setAttribute('role', 'img');
		if (!host.hasAttribute('aria-label')) host.setAttribute('aria-label', said.join('; '));
	}

	/* ── scatter ────────────────────────────────────────────────────────── */
	for (const host of document.querySelectorAll('.im-chart-scatter')) {
		const parse = (s) => String(s || '').split(',').map((p) => p.split(':').map(Number)).filter((p) => p.length === 2 && !p.some(Number.isNaN));
		let series = [...host.querySelectorAll('data')].map((d, i) => ({ name: d.dataset.name || `Series ${i + 1}`, points: parse(d.value) }));
		if (!series.length && host.dataset.imScatter) series = [{ name: host.dataset.imName || 'Points', points: parse(host.dataset.imScatter) }];
		series = series.filter((s) => s.points.length);
		if (!series.length) continue;
		const { rows, y, area, x } = plot(host);
		const all = series.flatMap((s) => s.points);
		const maxX = Number(host.dataset.imMaxX) || niceMax(Math.max(...all.map((p) => p[0])), 4);
		const maxY = Number(host.dataset.imMax) || niceMax(Math.max(...all.map((p) => p[1])), rows);
		if (y) y.replaceChildren(...Array.from({ length: rows + 1 }, (_, i) => Object.assign(el('span'), { textContent: short(maxY - (maxY / rows) * i) })));
		if (x) x.replaceChildren(...Array.from({ length: 5 }, (_, i) => Object.assign(el('span'), { textContent: short((maxX / 4) * i) })));
		for (const old of area.querySelectorAll('.im-chart-point')) old.remove();
		area.classList.add('im-chart-area-axis');
		let i = 0;
		series.forEach((s, si) => {
			for (const [X, Y] of s.points) {
				const b = el('button', { type: 'button', class: 'im-chart-point', 'data-series': si + 1, 'data-label': `${s.name}: ${fmt.format(X)}, ${fmt.format(Y)}`, 'aria-label': `${s.name}: ${fmt.format(X)} by ${fmt.format(Y)}` });
				b.style.setProperty('--x', `${((X / maxX) * 100).toFixed(2)}%`);
				b.style.setProperty('--y', `${(100 - (Y / maxY) * 100).toFixed(2)}%`);
				b.style.setProperty('--n', i++);
				area.append(b);
			}
		});
		host.setAttribute('role', 'img');
		if (!host.hasAttribute('aria-label')) host.setAttribute('aria-label', series.map((s) => `${s.name}: ${s.points.length} points`).join('; '));
	}

	/* ── legend toggles & filter chips ──────────────────────────────────── */
	document.addEventListener('click', (e) => {
		const t = e.target.closest('[data-im-legend] [data-series], [data-im-chips] button');
		if (!t) return;
		const on = t.getAttribute('aria-pressed') !== 'true';
		t.setAttribute('aria-pressed', String(on));
		const chart = t.closest('.im-chart, .im-dash-panel');
		if (chart && t.dataset.series) chart.toggleAttribute(`data-im-off-${t.dataset.series}`, !on);
	});

	/* ── a period switcher: an im-btn-group whose buttons press one at a time ── */
	document.addEventListener('click', (e) => {
		const b = e.target.closest('[data-im-period] .im-btn');
		if (!b) return;
		for (const x of b.parentElement.querySelectorAll('.im-btn')) x.setAttribute('aria-pressed', String(x === b));
	});
})();
