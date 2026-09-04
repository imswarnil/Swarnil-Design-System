---
title: Card
group: Components
order: 20
lead: One card, every shape — anatomy, media ratios, content types, and the compositions that make them.
---

Everything card-shaped in this system is **one component**. A movie poster, a
9:16 reel, a video tile and a project row are not four cards — they are one
anatomy under different ratios and recipes, which is why a token change
restyles all of them at once.

## Anatomy

Every part, in DOM order. Recipes below use subsets; none adds a new part.

:::demo The full anatomy at once
<article class="card w-sm">
  <div class="card__media pattern pattern-dot">
    <span class="card__badge"><span class="badge badge-live">Live</span></span>
    <span class="card__stamp">12:04</span>
  </div>
  <div class="card__body">
    <p class="card__kicker">Build log · Ep. 47</p>
    <h3 class="card__title"><a class="card__link" href="#i">The full anatomy</a></h3>
    <p class="card__excerpt">Media, badge, stamp, kicker, title, excerpt, tags, author, footer.</p>
    <div class="card__tags">
      <span class="badge badge-outline">css</span>
      <span class="badge badge-outline">tokens</span>
    </div>
    <div class="card__author">
      <span class="avatar avatar-sm">S</span>
      <span><span class="card__author-name">Swarnil</span><br /><span class="card__author-meta">2026-02-12</span></span>
    </div>
  </div>
  <div class="card__footer"><span>Take 47</span><span class="timecode">00:12:47</span></div>
</article>
:::

| Part | Job |
| --- | --- |
| `card__media` | the picture; carries the ratio |
| `card__badge` / `card__badge-end` | corner-pinned marker on the media |
| `card__stamp` | duration/timecode on the media — data voice |
| `card__overlay` | scrim strip laid over the media |
| `card__play` | play control over the media |
| `card__kicker` `card__title` `card__excerpt` | the words |
| `card__tags` | wrapping badge row |
| `card__author` (`-name`, `-meta`) | avatar + byline |
| `card__footer` / `card__actions` / `card__price` | the bottom strip |
| `card__link` | the stretched link — one per card |

## Orientation

Vertical is the default. `card-row` is the horizontal card; a container query
stacks it when **its slot** (not the window) gets narrow — wrap the deck in
`.cq-card`.

:::demo Horizontal — media left, words right
<div class="cq-card">
  <article class="card card-row w-lg">
    <div class="card__media pattern pattern-grid"></div>
    <div class="card__body">
      <p class="card__kicker">Course</p>
      <h3 class="card__title"><a class="card__link" href="#i">Handlebars without tears</a></h3>
      <p class="card__excerpt">Lesson 3 of 14 — partials, contexts, and the one gotcha.</p>
    </div>
  </article>
</div>
:::

## Media ratios — one variable

`--card-ratio` feeds the media's `aspect-ratio`. Four named ratios ship; any
other is one custom property on one instance.

:::demo Video 16:9 · Movie 2:3 · Reel 9:16 · Square 1:1
<div class="cluster cluster-top">
  <article class="card card-video w-sm">
    <div class="card__media pattern pattern-scan"><span class="card__stamp">14:22</span><span class="card__play"><svg class="icon icon-solid icon-sm"><use href="/icons/sprite.svg#i-play"/></svg></span></div>
    <div class="card__body"><p class="card__kicker">Video</p><h3 class="card__title"><a class="card__link" href="#i">The 16:9 default</a></h3></div>
  </article>
  <article class="card card-movie w-xs">
    <div class="card__media pattern pattern-halftone"><span class="card__badge-end card__badge"><span class="badge badge-solid">4K</span></span></div>
    <div class="card__body"><p class="card__kicker">Movie</p><h3 class="card__title"><a class="card__link" href="#i">Poster, 2:3</a></h3></div>
  </article>
  <article class="card card-reel">
    <div class="card__media pattern pattern-line"><span class="card__stamp">0:34</span></div>
    <div class="card__body"><p class="card__kicker">Reel</p><h3 class="card__title"><a class="card__link" href="#i">9:16 short</a></h3></div>
  </article>
</div>
:::

## Content types — the recipes

### Post

:::demo
<article class="card w-sm">
  <div class="card__media pattern pattern-dot"></div>
  <div class="card__body">
    <p class="card__kicker">Blog · CSS</p>
    <h3 class="card__title"><a class="card__link" href="#i">Why the cascade needed layers</a></h3>
    <p class="card__excerpt t-clamp-2">Precedence used to be an accident of import order, and every refactor was a rendering risk — which is exactly the fragility layers remove.</p>
    <div class="card__author">
      <span class="avatar avatar-sm">S</span>
      <span><span class="card__author-name">Swarnil</span><br /><span class="card__author-meta">11 min read</span></span>
    </div>
  </div>
</article>
:::

The excerpt wears `t-clamp-2`, so every post card in a deck is the same height
whatever the excerpt's length.

### Project

:::demo
<article class="card w-sm">
  <div class="card__body">
    <div class="cluster cluster-between"><h3 class="card__title"><a class="card__link" href="#i">swarnil-icons</a></h3><span class="badge badge-dot badge-success">Shipping</span></div>
    <p class="card__excerpt">61 icons on a 24 grid, drawn from scratch. MIT.</p>
    <div class="card__tags"><span class="badge badge-outline">svg</span><span class="badge badge-outline">python</span></div>
  </div>
  <div class="card__footer"><span class="cluster cluster-sm"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-star"/></svg> 128</span><span class="card__author-meta">Updated 2026-02-12</span></div>
</article>
:::

### Product

:::demo
<article class="card w-sm">
  <div class="card__media pattern pattern-hatch"></div>
  <div class="card__body">
    <p class="card__kicker">Theme</p>
    <h3 class="card__title"><a class="card__link" href="#i">Swarnil Ghost Theme</a></h3>
    <div class="cluster cluster-between"><span class="card__price">$49</span><span class="badge badge-craft">Pre-order</span></div>
  </div>
  <div class="card__actions"><button class="btn btn-primary btn-sm btn-block" type="button">Buy the theme</button></div>
</article>
:::

`card__price` uses tabular lining figures, so a deck of prices aligns.

## Hover answers and emphasis

Covered in depth above the fold of this page's siblings — the short form: one
hover answer per card (`card-hover-lift` **or** `card-hover-frame frame-hover`,
never both), and emphasis via `card-accent`, `card-raised`, `card-quiet`,
`card-inverse`, `card-bare`, `card-tile`, `card-compact`, `card-roomy`.

:::demo The camcorder hover, one class to toggle
<article class="card card-hover-frame frame-hover w-sm">
  <div class="card__body">
    <p class="card__kicker">Hover, or tab to it</p>
    <h3 class="card__title"><a class="card__link" href="#i">The viewfinder finds it</a></h3>
  </div>
</article>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--card-ratio` | media aspect ratio — the whole shape system |
| `--card-pad` `--card-gap` | body density |
| `--card-radius` `--card-bg` `--card-line` | chrome |
