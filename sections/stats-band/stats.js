/**
 * Stats band — builds the bar row.
 *
 *   <div class="im-bars" data-im-statband-bars="4,6,5,9" data-labels="Q1,Q2,Q3,Q4" data-on="4"></div>
 *
 * Values are scaled to the tallest. The bars are made when the row first comes
 * into view, so they are seen growing. Count-up and sparklines are the
 * system's own (im-motion.js, im-charts.js) and need nothing from here.
 */
(() => {
	const build = (row) => {
		if (row.childElementCount) return;
		const values = row.dataset.imStatbandBars.split(',').map(Number).filter((n) => !Number.isNaN(n));
		const labels = (row.dataset.labels || '').split(',').map((s) => s.trim());
		const max = Math.max(...values, 0) || 1;
		const on = Number(row.dataset.on) || values.length;
		values.forEach((v, i) => {
			const bar = document.createElement('i');
			bar.style.setProperty('--v', (v / max).toFixed(4));
			bar.style.setProperty('--i', i);
			if (labels[i]) bar.dataset.label = labels[i];
			if (i + 1 === on) bar.dataset.on = '';
			bar.title = `${labels[i] ? labels[i] + ': ' : ''}${v}`;
			row.append(bar);
		});
	};

	const rows = document.querySelectorAll('[data-im-statband-bars]');
	if (!('IntersectionObserver' in window)) return rows.forEach(build);
	const io = new IntersectionObserver((entries) => {
		for (const e of entries) if (e.isIntersecting) { build(e.target); io.unobserve(e.target); }
	}, { rootMargin: '0px 0px -10% 0px' });
	rows.forEach((row) => io.observe(row));
	// An unpainted or printing page never intersects; do not leave the row empty.
	addEventListener('beforeprint', () => rows.forEach(build));
	setTimeout(() => rows.forEach((row) => { const r = row.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) build(row); }), 1200);
})();
