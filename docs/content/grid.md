---
title: Grid
group: Layout
order: 20
lead: The auto grid does the counting, the switcher does the folding, the fixed counts are a last resort.
---

## grid-auto — the workhorse

Say the minimum a column may be; the browser decides how many fit.

```html
<div class="grid-auto" style="--col: 18rem">…cards…</div>
```

:::demo Resize with the 320px toggle — the count adapts, no breakpoints
<div class="grid-auto grid-auto-sm">
  <article class="card"><div class="card__body"><h3 class="card__title">A</h3></div></article>
  <article class="card"><div class="card__body"><h3 class="card__title">B</h3></div></article>
  <article class="card"><div class="card__body"><h3 class="card__title">C</h3></div></article>
  <article class="card"><div class="card__body"><h3 class="card__title">D</h3></div></article>
</div>
:::

The `min(var(--col), 100%)` inside guards the floor: without it an 18rem
minimum overflows a 320px screen.

## switcher — columns or one column, nothing between

:::demo
<div class="switcher">
  <div class="u-bg-sunken u-rounded-lg u-p-4 t-small">Flips at a CONTENT threshold</div>
  <div class="u-bg-sunken u-rounded-lg u-p-4 t-small">so it works inside a sidebar</div>
  <div class="u-bg-sunken u-rounded-lg u-p-4 t-small">without knowing it is in one</div>
</div>
:::

## Fixed counts

`grid-2 / grid-3 / grid-4` exist for when the design genuinely means the
number — a comparison table, a before/after. Reach for `grid-auto` first: a
fixed count is a promise about space you do not control, and it is the class
that forces you into media queries later.

## Gaps

All gaps ride the spacing ladder through `--grid-gap`. A denser deck is
`style="--grid-gap: var(--space-3)"` on the instance — a token, not a value.
