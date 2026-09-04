---
title: Page structure
group: Layout
order: 10
lead: main, section, container — the skeleton every page hangs on.
---

A page is a `<main>` of `<section>` bands, each holding a `.center` column.
Landmarks first: `header`, `main`, `footer` are what a screen-reader user
navigates by, so the skeleton is semantic before it is visual.

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
  <section class="section section-tight"><p class="t-label u-m-0">Hero band</p></section>
  <section class="section section-tight section-line section-sunken"><p class="t-label u-m-0">Sunken band</p></section>
  <section class="section section-tight section-line"><p class="t-label u-m-0">Closing band</p></section>
</div>
:::

`--section-pad` is the rhythm knob; `-tight`/`-loose` are its named steps;
`-sunken`/`-inverse` recolour from tokens so dark mode needs nothing extra.

## Containers

`.center` caps the measure and owns the gutter. Pick the width by content, not
by habit — prose wants `center-prose` (66ch), a dashboard wants `center-xl`.

:::demo
<div class="stack">
  <div class="center center-sm u-border u-rounded u-p-3"><span class="t-data">center-sm · 30rem</span></div>
  <div class="center center-md u-border u-rounded u-p-3"><span class="t-data">center-md · 45rem</span></div>
  <div class="center u-border u-rounded u-p-3"><span class="t-data">center · 60rem</span></div>
</div>
:::

`.bleed` breaks one child back to full viewport width — for a media band inside
a prose column — without closing the container.

## The one rule

Vertical rhythm belongs to **sections and stacks**, never to components. A card
that carries its own outer margin cannot be reused, because it brings its
spacing opinion with it. Components fill the box they are given; the layout
decides the boxes.
