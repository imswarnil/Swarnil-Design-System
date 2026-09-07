---
title: Card
group: Components
order: 20
lead: One card, every shape — anatomy, media ratios, content types, states, and the compositions that make them.
---

:::demo The default card
<article class="card w-sm">
  <div class="card__media pattern pattern-dot"></div>
  <div class="card__body">
    <p class="card__kicker">Build log · Ep. 47</p>
    <h3 class="card__title"><a class="card__link" href="#i">The frame layer, explained</a></h3>
    <p class="card__excerpt">Corner brackets belong on footage, not on a blog post.</p>
  </div>
</article>
:::

Everything card-shaped in this system is **one component**. A movie poster, a
9:16 reel, a video tile, a stat tile and a project row are not five cards —
they are one anatomy under different ratios and recipes, which is why a token
change restyles all of them at once.

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
| `card__badge` / `-end` / `-bottom` | corner-pinned marker on the media |
| `card__stamp` | duration/timecode on the media — data voice |
| `card__overlay` | scrim strip laid over the media |
| `card__play` | play control over the media |
| `card__kicker` `card__title` `card__excerpt` `card__meta` | the words |
| `card__tags` | wrapping badge row |
| `card__author` (`-name`, `-meta`) | avatar + byline |
| `card__stat` / `card__delta` | the dashboard number and its change |
| `card__arrow` / `card__tick` | the link card's arrow; the lesson's completion mark |
| `card__footer` / `card__actions` / `card__price` | the bottom strip |
| `card__link` / `card__above` | the stretched link — one per card — and what stays clickable over it |

## Media extras

Everything that sits on the picture. `card__overlay` is a hard-edged scrim —
a blur costs a compositor layer per card and a deck has twenty.

:::demo Badge positions, stamp, play, overlay
<div class="cluster cluster-top">
  <article class="card w-sm">
    <div class="card__media pattern pattern-scan">
      <span class="card__badge"><span class="badge badge-solid">New</span></span>
      <span class="card__badge card__badge-end"><span class="badge badge-craft">4K</span></span>
      <span class="card__badge card__badge-bottom"><span class="badge badge-success">Public</span></span>
      <span class="card__stamp">14:22</span>
      <span class="card__play"><svg class="icon icon-solid icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg></span>
    </div>
    <div class="card__body"><p class="card__kicker">Four corners</p><h3 class="card__title"><a class="card__link" href="#i">Every pin at once</a></h3></div>
  </article>
  <article class="card w-sm">
    <div class="card__media pattern pattern-halftone">
      <div class="card__overlay"><span class="badge badge-live">Live</span><span class="timecode">1.2K watching</span></div>
    </div>
    <div class="card__body"><p class="card__kicker">Overlay</p><h3 class="card__title"><a class="card__link" href="#i">The scrim strip</a></h3></div>
  </article>
</div>
:::

## Orientation

Vertical is the default. `card-row` is the horizontal card and `card-row-reverse`
puts the media on the end edge for alternating lists; `card-media-end` keeps the
stack but puts the picture under the words. A container query stacks the row
when **its slot** (not the window) gets narrow — wrap the deck in `.cq-card`
and hit the 320px toggle.

:::demo Row, reversed row, media-end
<div class="cq-card stack">
  <article class="card card-row">
    <div class="card__media pattern pattern-grid"></div>
    <div class="card__body">
      <p class="card__kicker">Course</p>
      <h3 class="card__title"><a class="card__link" href="#i">Handlebars without tears</a></h3>
      <p class="card__excerpt">Lesson 3 of 14 — partials, contexts, and the one gotcha.</p>
    </div>
  </article>
  <article class="card card-row card-row-reverse">
    <div class="card__media pattern pattern-line"></div>
    <div class="card__body">
      <p class="card__kicker">Course</p>
      <h3 class="card__title"><a class="card__link" href="#i">Routes and the members model</a></h3>
      <p class="card__excerpt">Lesson 4 of 14 — the media swaps sides, nothing else changes.</p>
    </div>
  </article>
  <article class="card card-media-end w-sm">
    <div class="card__media pattern pattern-hatch"></div>
    <div class="card__body">
      <p class="card__kicker">Caption first</p>
      <h3 class="card__title"><a class="card__link" href="#i">Words, then the picture</a></h3>
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
    <div class="card__media pattern pattern-scan"><span class="card__stamp">14:22</span><span class="card__play"><svg class="icon icon-solid icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg></span></div>
    <div class="card__body"><p class="card__kicker">Video</p><h3 class="card__title"><a class="card__link" href="#i">The 16:9 default</a></h3></div>
  </article>
  <article class="card card-movie w-xs">
    <div class="card__media pattern pattern-halftone"><span class="card__badge card__badge-end"><span class="badge badge-solid">4K</span></span></div>
    <div class="card__body"><p class="card__kicker">Movie</p><h3 class="card__title"><a class="card__link" href="#i">Poster, 2:3</a></h3></div>
  </article>
  <article class="card card-reel">
    <div class="card__media pattern pattern-line"><span class="card__stamp">0:34</span></div>
    <div class="card__body"><p class="card__kicker">Reel</p><h3 class="card__title"><a class="card__link" href="#i">9:16 short</a></h3></div>
  </article>
  <article class="card card-square w-xs">
    <div class="card__media pattern pattern-checker pattern-faint"></div>
    <div class="card__body"><p class="card__kicker">Square</p><h3 class="card__title"><a class="card__link" href="#i">Cover, 1:1</a></h3></div>
  </article>
</div>
:::

```html
<article class="card" style="--card-ratio: 21 / 9">   <!-- any other ratio -->
```

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
  <div class="card__footer"><span class="cluster cluster-sm"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-star"/></svg> 128</span><span class="card__author-meta">Updated 2026-02-12</span></div>
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
  <div class="card__actions"><button class="btn btn-primary btn-sm btn-block card__above" type="button">Buy the theme</button></div>
</article>
:::

`card__price` uses tabular lining figures, so a deck of prices aligns. The
button wears `card__above` so it stays clickable over the stretched link.

### Stat

The dashboard tile: a number in the display face, its label, and the change
since last time. The direction lives in `data-trend`, so the colour and the
markup cannot disagree.

:::demo
<div class="grid-auto grid-auto-sm">
  <article class="card card-stat">
    <div class="card__body">
      <p class="card__meta">Watch time</p>
      <span class="card__stat">1,284h</span>
      <span class="card__delta" data-trend="up"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-up"/></svg>+12% this month</span>
    </div>
  </article>
  <article class="card card-stat">
    <div class="card__body">
      <p class="card__meta">Subscribers</p>
      <span class="card__stat">48,210</span>
      <span class="card__delta" data-trend="down"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-down"/></svg>−0.4%</span>
    </div>
  </article>
  <article class="card card-stat">
    <div class="card__body">
      <p class="card__meta">Episodes</p>
      <span class="card__stat">47</span>
      <span class="card__delta">No change</span>
    </div>
  </article>
</div>
:::

### Link

A row that goes somewhere — a docs index, a settings list. The arrow parks at
the end and travels on hover, and the whole card is the link.

:::demo
<div class="stack stack-sm w-lg">
  <article class="card card-link">
    <div class="card__body">
      <svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-file"/></svg>
      <div><h3 class="card__title"><a class="card__link" href="#i">Getting started</a></h3><p class="card__excerpt">Install, the one import, and your first component.</p></div>
      <svg class="icon card__arrow" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg>
    </div>
  </article>
  <article class="card card-link">
    <div class="card__body">
      <svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-settings"/></svg>
      <div><h3 class="card__title"><a class="card__link" href="#i">Theming</a></h3><p class="card__excerpt">Three variables and the whole thing rebrands.</p></div>
      <svg class="icon card__arrow" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg>
    </div>
  </article>
</div>
:::

### Lesson — with states

The course list. `aria-current` is the lesson you are on (a 2px rule, never a
fill), `data-done` fills the tick and quietens the title.

:::demo Current, done, and not yet
<div class="stack stack-sm w-lg">
  <article class="card card-link card-compact" data-done>
    <div class="card__body">
      <span class="card__tick"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-check"/></svg></span>
      <div><h3 class="card__title"><a class="card__link" href="#i">1 · Install the theme</a></h3></div>
      <span class="card__author-meta">04:12</span>
    </div>
  </article>
  <article class="card card-link card-compact" aria-current="true">
    <div class="card__body">
      <span class="card__tick"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-check"/></svg></span>
      <div><h3 class="card__title"><a class="card__link" href="#i">2 · Routes and collections</a></h3></div>
      <span class="card__author-meta">11:40</span>
    </div>
  </article>
  <article class="card card-link card-compact">
    <div class="card__body">
      <span class="card__tick"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-check"/></svg></span>
      <div><h3 class="card__title"><a class="card__link" href="#i">3 · Handlebars without tears</a></h3></div>
      <span class="card__author-meta">09:03</span>
    </div>
  </article>
</div>
:::

## Selected

A card you can pick — a plan, a template, a thumbnail in a picker — carries
`aria-selected`. The accent line plus the focus ring's geometry, so selection
and focus read as the same idea.

:::demo Two options, one selected
<div class="grid-auto grid-auto-sm" role="listbox" aria-label="Thumbnail">
  <article class="card card-hover-lift" role="option" aria-selected="true" tabindex="0">
    <div class="card__media pattern pattern-scan"></div>
    <div class="card__body"><p class="card__meta">Frame at 00:12</p></div>
  </article>
  <article class="card card-hover-lift" role="option" aria-selected="false" tabindex="0">
    <div class="card__media pattern pattern-grid"></div>
    <div class="card__body"><p class="card__meta">Frame at 04:31</p></div>
  </article>
</div>
:::

## Footers and meta

The footer pins to the bottom with `margin-block-start: auto`, so cards of
different text lengths in one deck still line their footers up — that is most
of what makes a deck look tidy. `card__footer-plain` drops the rule;
`card__actions` is the footer for buttons.

:::demo Footer, plain footer, actions, meta
<div class="grid-auto grid-auto-sm">
  <article class="card">
    <div class="card__body"><p class="card__meta">Ep. 45 · 24 min</p><h3 class="card__title"><a class="card__link" href="#i">Ruled footer</a></h3></div>
    <div class="card__footer"><span>3 takes</span><span class="timecode">00:24:10</span></div>
  </article>
  <article class="card">
    <div class="card__body"><p class="card__meta">Ep. 46 · 18 min</p><h3 class="card__title"><a class="card__link" href="#i">Plain footer</a></h3></div>
    <div class="card__footer card__footer-plain"><span class="badge badge-dot badge-success">Published</span><span class="timecode">00:18:02</span></div>
  </article>
  <article class="card">
    <div class="card__body"><p class="card__meta">Ep. 47 · draft</p><h3 class="card__title">Actions</h3><p class="card__excerpt">Buttons wear their own strip.</p></div>
    <div class="card__actions"><button class="btn btn-primary btn-sm" type="button">Publish</button><button class="btn btn-ghost btn-sm" type="button">Preview</button></div>
  </article>
</div>
:::

## Hover answers

One hover answer per card: `card-hover-lift` **or** `card-hover-frame frame-hover`,
never both. A card that lifts and brackets is a card that cannot decide what
it is.

:::demo Lift, and the camcorder frame — one class to toggle each
<div class="cluster cluster-top">
  <article class="card card-hover-lift w-sm">
    <div class="card__media pattern pattern-dot"></div>
    <div class="card__body">
      <p class="card__kicker">Lift</p>
      <h3 class="card__title"><a class="card__link" href="#i">Rises three pixels</a></h3>
    </div>
  </article>
  <article class="card card-hover-frame frame-hover w-sm">
    <div class="card__body">
      <p class="card__kicker">Hover, or tab to it</p>
      <h3 class="card__title"><a class="card__link" href="#i">The viewfinder finds it</a></h3>
      <p class="card__excerpt">Brackets close in; nothing lifts.</p>
    </div>
  </article>
</div>
:::

## Emphasis

:::demo Accent, raised, quiet, sunken, inverse, bare
<div class="grid-auto grid-auto-sm">
  <article class="card card-accent"><div class="card__body"><p class="card__kicker">Accent</p><h3 class="card__title"><a class="card__link" href="#i">The editor's pick</a></h3><p class="card__excerpt">One per deck.</p></div></article>
  <article class="card card-raised"><div class="card__body"><p class="card__kicker">Raised</p><h3 class="card__title"><a class="card__link" href="#i">Elevation, no line</a></h3><p class="card__excerpt">Lifts in dark, drops in light.</p></div></article>
  <article class="card card-quiet"><div class="card__body"><p class="card__kicker">Quiet</p><h3 class="card__title"><a class="card__link" href="#i">Subtle line, no fill</a></h3><p class="card__excerpt">For a sunken band.</p></div></article>
  <article class="card card-sunken"><div class="card__body"><p class="card__kicker">Sunken</p><h3 class="card__title"><a class="card__link" href="#i">A well, not a card</a></h3><p class="card__excerpt">Sits below the page.</p></div></article>
  <article class="card card-inverse"><div class="card__body"><p class="card__kicker">Inverse</p><h3 class="card__title"><a class="card__link" href="#i">Ink and paper flipped</a></h3><p class="card__excerpt">For the cinematic deck.</p></div><div class="card__footer"><span>Ep. 47</span><span class="card__meta">24 min</span></div></article>
  <article class="card card-bare"><div class="card__body"><p class="card__kicker">Bare</p><h3 class="card__title"><a class="card__link" href="#i">No chrome at all</a></h3><p class="card__excerpt">For a list that already has rules.</p></div></article>
</div>
:::

## Tile — media behind the words

:::demo
<div class="cluster cluster-top">
  <article class="card card-tile w-xs">
    <div class="card__media pattern pattern-halftone pattern-strong"></div>
    <div class="card__body"><p class="card__kicker">Series</p><h3 class="card__title"><a class="card__link" href="#i">Night shift</a></h3><p class="card__meta">6 episodes</p></div>
  </article>
  <article class="card card-tile w-xs">
    <div class="card__media pattern pattern-scan pattern-strong"></div>
    <div class="card__body"><p class="card__kicker">Series</p><h3 class="card__title"><a class="card__link" href="#i">The rebuild</a></h3><p class="card__meta">12 episodes</p></div>
  </article>
</div>
:::

## Density

:::demo Compact, default, roomy, flush
<div class="grid-auto grid-auto-sm">
  <article class="card card-compact"><div class="card__body"><p class="card__kicker">Compact</p><h3 class="card__title"><a class="card__link" href="#i">Changelog entry</a></h3><p class="card__excerpt">Tight padding, base-size title.</p></div></article>
  <article class="card"><div class="card__body"><p class="card__kicker">Default</p><h3 class="card__title"><a class="card__link" href="#i">The resting density</a></h3><p class="card__excerpt">Space-5 all round.</p></div></article>
  <article class="card card-roomy"><div class="card__body"><p class="card__kicker">Roomy</p><h3 class="card__title"><a class="card__link" href="#i">A feature panel</a></h3><p class="card__excerpt">Space-8, for a card that is a section.</p></div></article>
  <article class="card card-flush"><div class="card__body"><div class="pattern pattern-grid ratio ratio-photo"></div></div></article>
</div>
:::

`card-flush` removes the body padding so a chart, a map or a table can meet the
card's edge.

## Properties

| Variable | Does |
| --- | --- |
| `--card-ratio` | media aspect ratio — the whole shape system |
| `--card-pad` `--card-gap` | body density |
| `--card-radius` `--card-bg` `--card-line` | chrome |
| `--frame-size` `--frame-inset` `--frame-color` | inherited from the frame layer; `card-hover-frame` presets them for a card |

## Accessibility

- One `card__link` per card. The `<a>` stays on the title so the accessible
  name and the tab stop are right; a second stretched link is unreachable by
  keyboard.
- Anything that must stay clickable over the stretched link wears `card__above`.
- State is an attribute: `aria-current="true"`, `aria-selected="true"` (with
  `role="option"` inside a `role="listbox"`), `data-done`.
- The hover frame answers `:focus-within`, so a keyboard user gets the same
  affordance as a mouse.
- A `card__play` inside a stretched-link card is decorative; the link is the
  control.
