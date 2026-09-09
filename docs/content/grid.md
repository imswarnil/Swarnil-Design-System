---
title: Grid
group: Layout
order: 50
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

## The numbers

Everything on this page is driven by seven variables, and these are their
defaults. A site is largely defined by which of them it changes — so they are
listed together rather than buried in seven places.

| Variable | Default | On | Changes |
| --- | --- | --- | --- |
| `--col` | `16rem` | `.grid-auto` | the narrowest a column may get before the count drops |
| `--grid-gap` | `--space-5` (1.25rem) | every grid | the gutter between cells |
| `--cluster-gap` | `--space-3` (0.75rem) | `.cluster` | the gap in a wrapping row |
| `--stack-gap` | `--space-4` (1rem) | `.stack` | the rhythm of a column |
| `--switch-at` | `30rem` | `.switcher` | the width below which all children go full-width |
| `--side-width` | `18rem` | `.sidebar` | the side column's ideal width |
| `--side-min` | `55%` | `.sidebar` | the main column's floor before the side wraps below |
| `--reel-item` | `18rem` | `.reel` | one item's width in a scroll strip |
| `--measure` | `--width-lg` (60rem) | `.center` | the page column |
| `--gutter` | `clamp(1rem, 0.6rem + 1.8vw, 2.5rem)` | `.center` | the page's edge padding |
| `--section-pad` | `--space-16` (4rem) | `.section` | the band's vertical rhythm |

Set one on the instance, never in a stylesheet override:

```html
<div class="grid-auto" style="--col: 22rem; --grid-gap: var(--space-8)">
<div class="sidebar"  style="--side-width: 21rem">
<div class="reel"     style="--reel-item: 15rem">
```

## Where the fold actually happens

The two primitives that "respond" do so on **content**, not on a viewport, and
the difference is worth seeing rather than reading.

:::demo `.switcher` — three across, or three stacked. There is nothing in between.
<div class="switcher" style="--switch-at: 22rem">
  <div class="u-p-4 u-bg-sunken u-rounded-lg u-border"><span class="t-data">one</span></div>
  <div class="u-p-4 u-bg-sunken u-rounded-lg u-border"><span class="t-data">two</span></div>
  <div class="u-p-4 u-bg-sunken u-rounded-lg u-border"><span class="t-data">three</span></div>
</div>
:::

Each child asks for `(--switch-at − 100%) × 999`. Above the threshold that is a
big negative number and flex clamps it to an equal share; below it, a huge
positive one, and every child takes a full row. There is no middle state,
because there is no width at which two-and-a-bit columns is the answer.

:::demo `.sidebar` — the side keeps 18rem until the main column would drop under 55%
<div class="sidebar" style="--side-width: 14rem">
  <div class="u-p-4 u-bg-sunken u-rounded-lg u-border"><span class="t-data">side · --side-width</span></div>
  <div class="u-p-4 u-bg-sunken u-rounded-lg u-border"><span class="t-data">main · flex 999, floor at --side-min</span></div>
</div>
:::

`.sidebar-end` puts the fixed column last. Both wrap to stacked on their own,
at whatever width that turns out to be inside whatever container they are in —
which is why a sidebar inside a card behaves correctly without knowing it is
inside a card.

## Gaps are a scale, not a number

Every gap on this page is a space token, so the whole grid re-tunes from one
place and nothing is ever `gap: 14px`.

:::demo The three named steps, on one grid
<div class="stack stack-lg">
  <div class="grid-4" style="--grid-gap: var(--space-2)"><div class="u-p-3 u-bg-sunken u-rounded u-border"><span class="t-data">2</span></div><div class="u-p-3 u-bg-sunken u-rounded u-border"><span class="t-data">2</span></div><div class="u-p-3 u-bg-sunken u-rounded u-border"><span class="t-data">2</span></div><div class="u-p-3 u-bg-sunken u-rounded u-border"><span class="t-data">2</span></div></div>
  <div class="grid-4"><div class="u-p-3 u-bg-sunken u-rounded u-border"><span class="t-data">5 · default</span></div><div class="u-p-3 u-bg-sunken u-rounded u-border"><span class="t-data">5</span></div><div class="u-p-3 u-bg-sunken u-rounded u-border"><span class="t-data">5</span></div><div class="u-p-3 u-bg-sunken u-rounded u-border"><span class="t-data">5</span></div></div>
  <div class="grid-4" style="--grid-gap: var(--space-8)"><div class="u-p-3 u-bg-sunken u-rounded u-border"><span class="t-data">8</span></div><div class="u-p-3 u-bg-sunken u-rounded u-border"><span class="t-data">8</span></div><div class="u-p-3 u-bg-sunken u-rounded u-border"><span class="t-data">8</span></div><div class="u-p-3 u-bg-sunken u-rounded u-border"><span class="t-data">8</span></div></div>
</div>
:::

## The one rule that stops it going wrong

**A grid never sets its own outer margin.** Vertical rhythm belongs to the
`.section` and the `.stack` above it; a grid that carries `margin-block` brings
its spacing opinion into every context it is reused in, and the first time it
is dropped inside a card the card gets a gap nobody asked for.

The same rule is why `.stack` puts space *between* children with the owl
selector and never on the first or last: a stack inside a stack does not
double the edge.

## Choosing

| The question | The answer |
| --- | --- |
| "As many as fit" | `.grid-auto` |
| "Exactly three, always" | `.grid-3` |
| "All in a row, or all stacked" | `.switcher` |
| "A column of things" | `.stack` |
| "A row that wraps" | `.cluster` |
| "Content and a rail" | `.sidebar` |
| "More than fits, scrolled" | `.reel` — or [`.shelf`](/shelf.html) if it needs a title and arrows |

If none of them fits, the answer is still one of them plus a variable — not a
new grid. Nine primitives is the whole layout vocabulary, and every page in
these docs and all twelve [templates](https://bulma.io/documentation/) are built from them.
