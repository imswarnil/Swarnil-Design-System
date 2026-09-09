---
title: Twelve-column grid
group: Layout
order: 50
lead: The Bootstrap-shaped grid — container, row, twelve columns, six breakpoints — as an opt-in second bundle, next to the intrinsic primitives rather than instead of them.
---

**This system's default is the other tradition.** The primitives on
[Grid](/grid.html) and [Page structure](https://bulma.io/documentation/columns/basics/) describe the
*relationship* between elements: a `.cluster` wraps when it runs out of room, a
`.switcher` flips at a content threshold, a `.sidebar` folds when the main
column would get too narrow. None of them is told a screen width, which is why
none of them has to be told again when the design changes.

That is the better default and it stays the default. This page is the other
thing — twelve columns, six breakpoints, the layout stated explicitly per size
— and it exists for three honest reasons:

- porting a page from Bootstrap or Bulma should be a **rename, not a redesign**;
- some layouts genuinely *are* a fixed twelve-column composition, and expressing
  those intrinsically is a fight you lose slowly;
- a system that refuses the thing everybody already knows is a system people
  work around rather than with.

It ships as its **own bundle**, so the core stays intrinsic and stays small.

```html
<link rel="stylesheet" href=".../dist/swarnil-framework.min.css">
```
```css
@import "@imswarnil/swarnil-design/framework";
```

The framework bundle *contains* the main bundle — you do not load both.

## The breakpoints

Six tiers, mobile-first, from the system's own `--bp-*` tokens. Every one is
`min-width`, so `d-none d-md-block` reads "hidden, then block from 768px" and a
later tier overrides an earlier one.

| Tier | From | |
| --- | --- | --- |
| *(none)* | `0` | all sizes |
| `sm` | `30rem` | 480px · phone landscape |
| `md` | `48rem` | 768px · tablet |
| `lg` | `64rem` | 1024px · laptop |
| `xl` | `80rem` | 1280px · desktop |
| `2xl` | `96rem` | 1536px · wide |

A media query cannot read a custom property, so those numbers are **literal**
in the framework files. They are the only literal breakpoints in the system and
they have to stay in step with `03-space.css` by hand — that is the entire
maintenance cost of having a fixed-step grid at all, and it is worth knowing
before you choose one.

## Container

Same job as [`.center`](https://bulma.io/documentation/columns/basics/) with the API you already have in your
fingers: a fixed max-width per breakpoint, and a fluid escape hatch.

:::demo Each step widens at its own breakpoint and then holds
<div class="stack stack-sm">
  <div class="container u-bg-sunken u-border u-rounded u-p-3"><span class="t-data">.container — steps at every tier</span></div>
  <div class="container-md u-bg-sunken u-border u-rounded u-p-3"><span class="t-data">.container-md — fluid until 768px</span></div>
  <div class="container-fluid u-bg-sunken u-border u-rounded u-p-3"><span class="t-data">.container-fluid — never caps</span></div>
</div>
:::

`.container-flush` drops the gutter for a container nested inside another;
`.container-tight` halves it.

## Row and columns

`.row` is the twelve-column track. Its negative margins cancel the columns'
padding, so the first and last column line up with the container's edge.

:::demo The twelve, and some of the fractions
<div class="stack stack-sm">
  <div class="row"><div class="col-12"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">12</span></div></div></div>
  <div class="row"><div class="col-6"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">6</span></div></div><div class="col-6"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">6</span></div></div></div>
  <div class="row"><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">4</span></div></div><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">4</span></div></div><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">4</span></div></div></div>
  <div class="row"><div class="col-3"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">3</span></div></div><div class="col-3"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">3</span></div></div><div class="col-3"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">3</span></div></div><div class="col-3"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">3</span></div></div></div>
  <div class="row"><div class="col-8"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">8</span></div></div><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">4</span></div></div></div>
</div>
:::

:::demo `.col` fills what is left; `.col-auto` takes only what it needs
<div class="stack stack-sm">
  <div class="row"><div class="col"><div class="u-bg-sunken u-border u-rounded u-p-3"><span class="t-data">.col</span></div></div><div class="col"><div class="u-bg-sunken u-border u-rounded u-p-3"><span class="t-data">.col</span></div></div><div class="col"><div class="u-bg-sunken u-border u-rounded u-p-3"><span class="t-data">.col</span></div></div></div>
  <div class="row"><div class="col-auto"><div class="u-bg-sunken u-border u-rounded u-p-3"><span class="t-data">auto</span></div></div><div class="col"><div class="u-bg-sunken u-border u-rounded u-p-3"><span class="t-data">.col takes the rest</span></div></div></div>
</div>
:::

## Responsive columns

The point of the whole thing: a different span per tier.

:::demo Full width on a phone, half on a tablet, a third on a laptop. Use the 320px toggle.
<div class="row">
  <div class="col-12 col-md-6 col-lg-4"><div class="u-bg-sunken u-border u-rounded u-p-4"><span class="t-data">col-12 · col-md-6 · col-lg-4</span></div></div>
  <div class="col-12 col-md-6 col-lg-4"><div class="u-bg-sunken u-border u-rounded u-p-4"><span class="t-data">col-12 · col-md-6 · col-lg-4</span></div></div>
  <div class="col-12 col-md-12 col-lg-4"><div class="u-bg-sunken u-border u-rounded u-p-4"><span class="t-data">col-12 · col-md-12 · col-lg-4</span></div></div>
</div>
:::

Every tier has the full set: `.col-{tier}-1` … `-12`, `.col-{tier}`,
`.col-{tier}-auto`, `.offset-{tier}-0` … `-11`, and
`.order-{tier}-first|last|0…5`.

:::demo Offsets and order
<div class="stack stack-sm">
  <div class="row"><div class="col-4 offset-4"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">col-4 offset-4</span></div></div></div>
  <div class="row"><div class="col-3 offset-3"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">offset-3</span></div></div><div class="col-3 offset-3"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">offset-3</span></div></div></div>
  <div class="row">
    <div class="col-4 order-last"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">first in markup, order-last</span></div></div>
    <div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">second</span></div></div>
    <div class="col-4 order-first"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">third, order-first</span></div></div>
  </div>
</div>
:::

Reordering is visual only. The DOM order is what a screen reader and the tab
key follow, so a layout that only makes sense reordered is a layout with two
different meanings — write the markup in the order it should be read.

## Gutters

`--gutter-x` and `--gutter-y`, with the six named steps every framework has.
They are space tokens, so the grid re-tunes from one place.

:::demo `.g-0`, the default, and `.g-5`
<div class="stack stack-sm">
  <div class="row g-0"><div class="col-4"><div class="u-bg-sunken u-border u-p-3 u-text-center"><span class="t-data">g-0</span></div></div><div class="col-4"><div class="u-bg-sunken u-border u-p-3 u-text-center"><span class="t-data">g-0</span></div></div><div class="col-4"><div class="u-bg-sunken u-border u-p-3 u-text-center"><span class="t-data">g-0</span></div></div></div>
  <div class="row"><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">default</span></div></div><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">default</span></div></div><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">default</span></div></div></div>
  <div class="row g-5"><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">g-5</span></div></div><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">g-5</span></div></div><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">g-5</span></div></div></div>
</div>
:::

`.gx-*` and `.gy-*` set one axis. `.gy-*` is the one people forget and then
miss: it is the row gap when columns wrap.

:::demo `.gx-0` with `.gy-4` — columns flush, rows spaced
<div class="row row-cols-3 gx-0 gy-4">
  <div><div class="u-bg-sunken u-border u-p-3 u-text-center"><span class="t-data">1</span></div></div>
  <div><div class="u-bg-sunken u-border u-p-3 u-text-center"><span class="t-data">2</span></div></div>
  <div><div class="u-bg-sunken u-border u-p-3 u-text-center"><span class="t-data">3</span></div></div>
  <div><div class="u-bg-sunken u-border u-p-3 u-text-center"><span class="t-data">4</span></div></div>
  <div><div class="u-bg-sunken u-border u-p-3 u-text-center"><span class="t-data">5</span></div></div>
  <div><div class="u-bg-sunken u-border u-p-3 u-text-center"><span class="t-data">6</span></div></div>
</div>
:::

## Rows without counting

`.row-cols-3` means "three per row" and is usually what somebody reaching for
`.col-4` actually meant. It survives a changed item count; the span does not.

:::demo
<div class="row row-cols-4 gy-3">
  <div><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">1</span></div></div>
  <div><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">2</span></div></div>
  <div><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">3</span></div></div>
  <div><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">4</span></div></div>
  <div><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">5</span></div></div>
  <div><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">6</span></div></div>
</div>
:::

`.row-cols-*` is responsive too, and `row-cols-1 row-cols-md-2 row-cols-lg-3`
is the commonest card grid there is — with no column classes at all.

## Spacing helpers

`p` and `m`, in logical properties, across nine steps and six breakpoints. The
scale is the system's own space tokens rather than a new set of numbers.

| | All | Inline | Block | Start | End |
| --- | --- | --- | --- | --- | --- |
| padding | `p-4` | `px-4` | `py-4` | `pt-4` `ps-4` | `pb-4` `pe-4` |
| margin | `m-4` | `mx-4` | `my-4` | `mt-4` `ms-4` | `mb-4` `me-4` |
| gap | `gap-4` | `gap-x-4` | `gap-y-4` | | |

`ps`/`pe` rather than `pl`/`pr`, because the whole system is written in logical
properties and a right-to-left page should not need a second stylesheet.
`mx-auto`, `ms-auto` and `me-auto` are there for the usual centring and
pushing.

**Steps 6, 7 and 8 are fluid** — they are the clamped tokens, so a helper that
sets big spacing gets smaller on a phone without a breakpoint. That is the most
useful thing in the file, and the reason the scale is not linear: the small
steps are exact because they sit *inside* components, and the large ones flex
because they sit *between* them.

| Step | Value | |
| --- | --- | --- |
| `0` | `0` | |
| `1` `2` `3` | 4px · 8px · 12px | exact |
| `4` `5` | 16px · 24px | exact |
| `6` `7` `8` | 28→40px · 36→52px · 44→68px | **fluid** |

:::demo Padding tightens on a phone and opens up on a desktop — no breakpoint written
<div class="stack stack-sm">
  <div class="p-3 u-bg-sunken u-rounded-lg u-border"><span class="t-data">p-3 · exact 12px everywhere</span></div>
  <div class="p-6 u-bg-sunken u-rounded-lg u-border"><span class="t-data">p-6 · fluid, 28px → 40px</span></div>
  <div class="p-8 u-bg-sunken u-rounded-lg u-border"><span class="t-data">p-8 · fluid, 44px → 68px</span></div>
</div>
:::

:::demo Per-tier, and the gap helpers on a flex row
<div class="stack stack-sm">
  <div class="p-2 p-md-5 u-bg-sunken u-rounded-lg u-border"><span class="t-data">p-2 p-md-5 — tight on a phone, roomy from 768px</span></div>
  <div class="d-flex f-col f-md-row gap-2 gap-md-4 p-3 u-bg-sunken u-rounded-lg u-border">
    <span class="badge">gap-2</span><span class="badge">gap-md-4</span><span class="badge">stacked below 768px</span>
  </div>
  <div class="d-flex j-between a-center px-4 py-3 u-bg-sunken u-rounded-lg u-border">
    <span class="t-data">px-4 py-3</span>
    <button class="button is-outlined is-small ms-auto" type="button">ms-auto</button>
  </div>
  <div class="mx-auto p-3 u-bg-sunken u-rounded-lg u-border" style="max-width: 18rem"><span class="t-data">mx-auto</span></div>
</div>
:::

:::demo Every side, on one row — so the four inline/block pairs are visible at once
<div class="stack stack-sm">
  <div class="u-bg-sunken u-rounded-lg u-border"><div class="pt-6 pb-2 ps-4 pe-4"><span class="t-data">pt-6 pb-2 ps-4 pe-4</span></div></div>
  <div class="u-bg-sunken u-rounded-lg u-border"><div class="p-4"><span class="t-data">p-4 — all four sides</span></div></div>
  <div class="d-flex gap-2">
    <div class="u-bg-sunken u-rounded u-border p-3 m-0"><span class="t-data">m-0</span></div>
    <div class="u-bg-sunken u-rounded u-border p-3 mt-4"><span class="t-data">mt-4</span></div>
    <div class="u-bg-sunken u-rounded u-border p-3 mb-4"><span class="t-data">mb-4</span></div>
    <div class="u-bg-sunken u-rounded u-border p-3 ms-4"><span class="t-data">ms-4</span></div>
    <div class="u-bg-sunken u-rounded u-border p-3 me-4 my-2"><span class="t-data">me-4 my-2</span></div>
  </div>
</div>
:::

The core bundle has `u-p-*` and `u-mt-*` without breakpoints, and those stay —
the intrinsic primitives are supposed to remove most of the need for spacing
helpers. These are for when they do not.

## Alignment

Named for the axis rather than the flex property, because "align the row's
items to the bottom" is the sentence you are thinking.

:::demo
<div class="stack stack-sm">
  <div class="row row-middle" style="min-height: 6rem"><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-2"><span class="t-data">row-middle</span></div></div><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-5"><span class="t-data">taller</span></div></div><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-2"><span class="t-data">short</span></div></div></div>
  <div class="row row-between"><div class="col-3"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">row-between</span></div></div><div class="col-3"><div class="u-bg-sunken u-border u-rounded u-p-3 u-text-center"><span class="t-data">·</span></div></div></div>
  <div class="row"><div class="col-4 col-bottom"><div class="u-bg-sunken u-border u-rounded u-p-2"><span class="t-data">col-bottom</span></div></div><div class="col-4"><div class="u-bg-sunken u-border u-rounded u-p-6"><span class="t-data">tall</span></div></div></div>
</div>
:::

`.col-break` forces everything after it onto a new line, without a wrapper.

## Responsive utilities

The other half of a framework: short names, six tiers, mobile-first.

| Prefix | Sets | Example |
| --- | --- | --- |
| `d-*` | `display` | `d-none d-md-flex` |
| `f-*` | flex direction, wrap, grow | `f-col f-md-row` |
| `j-*` | `justify-content` | `j-between` |
| `a-*` | `align-items` | `a-center` |
| `text-*` | `text-align` | `text-center text-md-left` |

:::demo Stacked on a phone, a row from 768px — and the badge only appears there
<div class="d-flex f-col f-md-row a-md-center j-md-between g-3 u-p-4 u-bg-sunken u-rounded-lg" style="gap: var(--space-3)">
  <div>
    <p class="t-h4 u-m-0">Colour, in one block of tokens</p>
    <p class="t-small t-muted u-m-0">Episode 48 · 24:07</p>
  </div>
  <span class="badge is-primary d-none d-md-iflex">Visible from md</span>
  <button class="button is-primary is-small" type="button">Watch</button>
</div>
:::

:::demo `text-*` — centred on a phone, left-aligned from 768px
<div class="row gy-3">
  <div class="col-12 col-md-4"><div class="u-bg-sunken u-border u-rounded u-p-4 text-center text-md-left"><p class="t-h5 u-m-0">Centred, then left</p><p class="t-small t-muted u-m-0">text-center text-md-left</p></div></div>
  <div class="col-12 col-md-4"><div class="u-bg-sunken u-border u-rounded u-p-4 text-center"><p class="t-h5 u-m-0">Always centred</p><p class="t-small t-muted u-m-0">text-center</p></div></div>
  <div class="col-12 col-md-4"><div class="u-bg-sunken u-border u-rounded u-p-4 text-center text-lg-right"><p class="t-h5 u-m-0">Right from lg</p><p class="t-small t-muted u-m-0">text-center text-lg-right</p></div></div>
</div>
:::

A flex child cannot be `inline`: CSS blockifies it. So a badge inside a
`d-flex` row wants `d-md-iflex`, not `d-md-inline` — the utility applies either
way, the browser just changes the answer. That is the platform, not the
framework.

The text utilities are `text-*`, **not** `t-*`, because
[typography](/typography.html) already owns `t-*` for the type scale. Two
families sharing a prefix is a collision waiting for whoever adds `.t-center`
to the type scale in a year.

## Which grid should I use?

| If you are… | Use |
| --- | --- |
| designing a page from scratch | [`.grid-auto`, `.switcher`, `.sidebar`](/grid.html) |
| porting from Bootstrap or Bulma | `.row` / `.col-*` |
| laying out cards that should reflow | `.grid-auto` — the browser counts, not you |
| composing a fixed twelve-column page | `.row` / `.col-*` |
| hiding something below a breakpoint | `d-none d-md-block` |
| making two things sit side by side until they cannot | `.switcher` |

Mixing them is fine and common: a `.container` holding a `.row` of `.col-6`s,
each containing a `.stack`. The layers do not fight, because the framework
lives in the same `components` and `utilities` layers as everything else and
was written second.

## What this bundle does not add

No JavaScript, no Sass, no mixins, and no new tokens. The grid is 700 lines of
plain CSS reading the same space and breakpoint tokens as the rest of the
system — so re-tinting, re-spacing or re-typing the system moves the grid with
it, and there is still no build step required to *use* any of this.
