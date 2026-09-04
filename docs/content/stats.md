---
title: Stats
group: Sections
order: 20
lead: Numbers with receipts — display numerals over label captions, each carrying the accent rule.
---

The content rule outranks the CSS: **never print a number the build cannot
back.** A stats band is a list of promises, and the homepage's own band is
generated from measurements so CI knows when one drifts.

## Default

:::demo
<div class="stats">
  <div class="stats__item"><span class="t-stat">15.7</span><span class="stats__label">KB gzipped — the whole system</span></div>
  <div class="stats__item"><span class="t-stat">97</span><span class="stats__label">Tones across 8 ramps</span></div>
  <div class="stats__item"><span class="t-stat">61</span><span class="stats__label">Icons drawn from scratch</span></div>
  <div class="stats__item"><span class="t-stat">0</span><span class="stats__label">Dependencies</span></div>
</div>
:::

## Quiet and row

:::demo Quiet — hairline instead of accent, for a page that already has a loud band
<div class="stats stats-quiet">
  <div class="stats__item"><span class="t-stat">28</span><span class="stats__label">Doc pages</span></div>
  <div class="stats__item"><span class="t-stat">9</span><span class="stats__label">Nav groups</span></div>
</div>
:::

:::demo Row — the slim strip for a header band
<div class="stats stats-row">
  <div class="stats__item"><span class="t-stat">128</span><span class="stats__label">stars</span></div>
  <div class="stats__item"><span class="t-stat">14</span><span class="stats__label">releases</span></div>
  <div class="stats__item"><span class="t-stat">61</span><span class="stats__label">icons</span></div>
</div>
:::

`t-stat` sets tabular lining figures, so a live-updating number never makes
its neighbours jump.
