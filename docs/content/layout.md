---
title: Layout
group: Foundation
order: 30
lead: Sections, containers, rows and grids — a page composed from primitives that describe relationships, not screen sizes.
---

The idea is old and good: describe the **relationship** between elements, not
the size of the screen. A `.cluster` wraps when it runs out of room — at any
width, in any container, without being told where that happens. A media query
has to be told, and told again every time the design changes.

## The page formula

Every page is the same sandwich: **sections** for vertical rhythm, a **center**
for the column, primitives inside.

```html
<section class="section section-line">
  <div class="center">
    <div class="grid-auto"> …cards… </div>
  </div>
</section>
```

:::demo A miniature page — two sections, dividers and all
<div>
  <section class="section section-tight">
    <p class="t-label u-m-0">Section one</p>
    <p class="t-small u-m-0">Rhythm outside, content inside.</p>
  </section>
  <section class="section section-tight section-line">
    <p class="t-label u-m-0">Section two</p>
    <p class="t-small u-m-0">The divider belongs to the section it opens.</p>
  </section>
</div>
:::

`section-tight` / `section-loose` scale the band; `section-sunken` and
`section-inverse` recolour it from tokens.

## Containers

`.center` is the column: max-width, auto margins, and a gutter so text never
touches a phone edge. `.bleed` breaks one child back out to full width.

:::demo
<div class="center center-sm u-border u-rounded-lg u-p-4">
  <p class="t-small u-m-0">A .center-sm column inside the demo.</p>
</div>
:::

Sizes: `center-sm` `center-md` (default `lg`) `center-xl` `center-prose`.

## Rows — cluster and switcher

:::demo .cluster — a wrapping row; hit 320px above and watch it wrap
<div class="cluster">
  <button class="btn btn-primary" type="button">Record</button>
  <button class="btn btn-outline" type="button">Preview</button>
  <span class="badge badge-live">Live</span>
  <span class="chip">salesforce <span class="chip__count">12</span></span>
</div>
:::

:::demo .switcher — columns until each would be too narrow, then one column
<div class="switcher u-border u-rounded-lg u-p-4">
  <div class="u-bg-sunken u-rounded u-p-3 t-small">One</div>
  <div class="u-bg-sunken u-rounded u-p-3 t-small">Two</div>
  <div class="u-bg-sunken u-rounded u-p-3 t-small">Three</div>
</div>
:::

The switcher flips at a **content** threshold (`--switch-at`), not a viewport
width — which is why it behaves inside a sidebar without knowing it is in one.

## Grids

:::demo .grid-auto — the workhorse. Set the minimum; the browser counts.
<div class="grid-auto grid-auto-sm">
  <div class="u-bg-sunken u-rounded u-p-3 t-small">A</div>
  <div class="u-bg-sunken u-rounded u-p-3 t-small">B</div>
  <div class="u-bg-sunken u-rounded u-p-3 t-small">C</div>
  <div class="u-bg-sunken u-rounded u-p-3 t-small">D</div>
</div>
:::

Fixed counts exist for when the design genuinely means three: `grid-2`,
`grid-3`, `grid-4`. Prefer `grid-auto` — a fixed count is a promise about
space you don't control.

## Stacks and sidebars

:::demo .stack — vertical rhythm via the owl; nothing leaks at the edges
<div class="stack stack-sm u-border u-rounded-lg u-p-4 w-sm">
  <p class="t-small u-m-0">Space lands between children,</p>
  <p class="t-small u-m-0">never above the first</p>
  <p class="t-small u-m-0">or below the last.</p>
</div>
:::

:::demo .sidebar — a fixed-ish column beside a fluid one; wraps by itself
<div class="sidebar u-border u-rounded-lg u-p-4">
  <nav class="navlist"><a class="navlist__link" href="#i" aria-current="page">Colour</a><a class="navlist__link" href="#i">Type</a></nav>
  <p class="t-small u-m-0">The main column takes the rest, and the pair stacks when this column would drop under 55% — no breakpoint.</p>
</div>
:::

## The reel and ratios

:::demo .reel — scroll-snap, no JavaScript
<div class="reel">
  <div class="ratio ratio-photo u-bg-sunken u-rounded-lg"></div>
  <div class="ratio ratio-photo u-bg-sunken u-rounded-lg"></div>
  <div class="ratio ratio-photo u-bg-sunken u-rounded-lg"></div>
  <div class="ratio ratio-photo u-bg-sunken u-rounded-lg"></div>
</div>
:::

`.ratio` reserves space before media loads — which is most of what layout shift
is. `ratio-square` `ratio-photo` `ratio-portrait` `ratio-wide` `ratio-story`.

## Your own values

Every primitive exposes its knobs, so one instance can differ without a new
class — the only inline style this system endorses is **setting a token**:

```html
<div class="grid-auto" style="--col: 22rem; --grid-gap: var(--space-8)">
<div class="section" style="--section-pad: var(--space-24)">
```

| Primitive | Knobs |
| --- | --- |
| `.section` | `--section-pad` |
| `.center` | `--measure` |
| `.stack` | `--stack-gap` |
| `.cluster` | `--cluster-gap` `--cluster-align` `--cluster-justify` |
| `.grid-auto` | `--col` `--grid-gap` |
| `.switcher` | `--switch-at` |
| `.sidebar` | `--side-width` `--side-min` |
| `.reel` | `--reel-item` |
| `.ratio` | `--ratio` |

## Container queries

`.cq`, `.cq-card`, `.cq-deck`, `.cq-shell` name a container; components inside
ask **it** how wide they are. A card in a 300px sidebar and a card in a 300px
grid slot are the same card — only a container query can say that.
