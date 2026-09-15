---
title: Page structure
group: Layout
order: 50
lead: main, section, container — the skeleton every page hangs on.
---

Every page in this system is the same four nested things, and knowing which is
which removes most of the decisions:

| | Tag | Class | Its one job |
| --- | --- | --- | --- |
| 1 | `<main>` | *none* | the landmark. One per page, and it takes no styling at all |
| 2 | `<section>` | `.section` | a **band** — full width, owns the vertical rhythm and the ground |
| 3 | `<div>` | `.center` | the **column** — caps the measure and owns the gutter |
| 4 | `<div>` | `.stack` `.cluster` `.grid-*` | the **arrangement** — how the children of that column sit |

Landmarks first: `header`, `main`, `footer` are what a screen-reader user
navigates by, so the skeleton is semantic before it is visual. `<main>` is
deliberately unstyled — the moment a landmark carries padding, a second one on
the page inherits an opinion it never asked for.

The two rules that fall out of the table:

- **A band is never narrow, a column is never full width.** If you find
  yourself writing `max-width` on a `<section>`, the `.center` is missing.
- **A band never arranges its children.** It has exactly one child, the column.
  A `.section` with `display: flex` is doing the column's job and the
  arrangement's job at once, and it will fight both later.

```html
<body>
  <header class="navbar navbar-sticky">…</header>
  <main>
    <section class="section">
      <div class="center"> …content… </div>
    </section>
    <section class="section section-line section-sunken">
      <div class="center center-md"> …narrower content… </div>
    </section>
  </main>
  <footer class="section section-line">…</footer>
</body>
```

## Sections

:::demo Bands with the divider that belongs to the section it opens
<div>
  <section class="section section-tight"><p class="t-label m-0">Hero band</p></section>
  <section class="section section-tight section-line section-sunken"><p class="t-label m-0">Sunken band</p></section>
  <section class="section section-tight section-line"><p class="t-label m-0">Closing band</p></section>
</div>
:::

`--section-pad` is the rhythm knob; `-tight`/`-loose` are its named steps;
`-sunken`/`-inverse` recolour from tokens so dark mode needs nothing extra.

## Row or column — the four arrangements

Inside the column, everything is one of four things. There is no fifth, and
reaching for a raw `display: flex` in a style attribute means one of these was
the answer.

:::demo `.stack` — a column. Space goes BETWEEN children, never at the edges.
<div class="stack p-4 bg-sunken rounded-lg">
  <div class="p-3 bg-surface rounded-md hairline"><span class="t-data">one</span></div>
  <div class="p-3 bg-surface rounded-md hairline"><span class="t-data">two</span></div>
  <div class="p-3 bg-surface rounded-md hairline"><span class="t-data">three</span></div>
</div>
:::

:::demo `.cluster` — a row that wraps by itself, at any width, without being told where
<div class="cluster p-4 bg-sunken rounded-lg">
  <span class="badge">badge</span><span class="badge badge-outline">badge</span>
  <button class="btn btn-outline btn-sm" type="button">a button</button>
  <span class="chip">a chip</span><span class="chip">another</span>
  <button class="btn btn-ghost btn-sm" type="button">and one more</button>
</div>
:::

:::demo `.cluster-between` and `.cluster-end` — the same row, pushed apart or to the end
<div class="stack">
  <div class="cluster cluster-between p-4 bg-sunken rounded-lg"><span class="t-data">title</span><button class="btn btn-ghost btn-sm" type="button">action</button></div>
  <div class="cluster cluster-end p-4 bg-sunken rounded-lg"><button class="btn btn-ghost btn-sm" type="button">Cancel</button><button class="btn btn-primary btn-sm" type="button">Save</button></div>
</div>
:::

:::demo `.grid-auto` — as many columns as fit. The browser decides the count; you only say the minimum.
<div class="grid-auto p-4 bg-sunken rounded-lg" style="--col: 9rem">
  <div class="p-4 bg-surface rounded-md hairline"><span class="t-data">1</span></div>
  <div class="p-4 bg-surface rounded-md hairline"><span class="t-data">2</span></div>
  <div class="p-4 bg-surface rounded-md hairline"><span class="t-data">3</span></div>
  <div class="p-4 bg-surface rounded-md hairline"><span class="t-data">4</span></div>
  <div class="p-4 bg-surface rounded-md hairline"><span class="t-data">5</span></div>
</div>
:::

:::demo `.sidebar` — a fixed-ish column beside a flexible one. It wraps on CONTENT, not on a breakpoint.
<div class="sidebar p-4 bg-sunken rounded-lg" style="--side-width: 12rem">
  <div class="p-4 bg-surface rounded-md hairline"><span class="t-data">side · 12rem</span></div>
  <div class="p-4 bg-surface rounded-md hairline"><span class="t-data">main · takes the rest, and pushes the side below when it would drop under 55%</span></div>
</div>
:::

**Why none of them is a media query.** A `.cluster` wraps when it runs out of
room — at any width, inside any container, without being told where that
happens. A media query has to be told, and then told again every time the
design changes. That is the whole argument for describing the *relationship*
between elements rather than the size of the screen, and it is why this system
has ten layout classes instead of five breakpoints.

The one exception is deliberate: a `.section` flipping from two columns to one
is **page topology**, not component behaviour, and topology is allowed a media
query. Everything inside the column is not.

## Nesting them

An arrangement inside an arrangement is normal and expected — a `.stack` of
`.cluster`s is most of every page ever built here.

:::demo A real section, in full: band → column → stack → cluster → grid
<section class="section section-tight section-sunken rounded-lg">
  <div class="center center-md stack stack-lg">
    <header class="sec">
      <div class="sec__text"><span class="sec__eyebrow">The four layers</span><h3 class="sec__title">Band, column, arrangement, content</h3></div>
      <div class="sec__actions"><a class="btn btn-ghost btn-sm" href="#i">All of them</a></div>
    </header>
    <div class="grid-3 cq-card">
      <article class="card card-quiet"><div class="card__body"><h4 class="card__title">Band</h4><p class="card__excerpt">Full width, owns the rhythm.</p></div></article>
      <article class="card card-quiet"><div class="card__body"><h4 class="card__title">Column</h4><p class="card__excerpt">Caps the measure, owns the gutter.</p></div></article>
      <article class="card card-quiet"><div class="card__body"><h4 class="card__title">Arrangement</h4><p class="card__excerpt">Says how the children sit.</p></div></article>
    </div>
    <div class="cluster cluster-between">
      <span class="t-fine t-muted">Four classes, and the page has a skeleton.</span>
      <button class="btn btn-outline btn-sm" type="button">Copy the markup</button>
    </div>
  </div>
</section>
:::

## Containers

`.center` caps the measure and owns the gutter. Pick the width by content, not
by habit — prose wants `center-prose` (66ch), a dashboard wants `center-xl`, and
a page of **collections** — a video wall, a project grid, a shelf of courses —
wants `center-2xl`. A page of sentences never does.

:::demo
<div class="stack">
  <div class="center center-sm hairline rounded-md p-3"><span class="t-data">center-sm · 30rem</span></div>
  <div class="center center-md hairline rounded-md p-3"><span class="t-data">center-md · 45rem</span></div>
  <div class="center hairline rounded-md p-3"><span class="t-data">center · 60rem</span></div>
  <div class="center center-xl hairline rounded-md p-3"><span class="t-data">center-xl · 75rem</span></div>
  <div class="center center-2xl hairline rounded-md p-3"><span class="t-data">center-2xl · 90rem</span></div>
</div>
:::

`.bleed` breaks one child back to full viewport width — for a media band inside
a prose column — without closing the container.

## The one rule

Vertical rhythm belongs to **sections and stacks**, never to components. A card
that carries its own outer margin cannot be reused, because it brings its
spacing opinion with it. Components fill the box they are given; the layout
decides the boxes.
