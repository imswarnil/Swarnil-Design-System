---
title: Shelf
group: Components
order: 50
lead: The row you scroll sideways — a titled strip of many items, bleeding past the page column so it is obvious the row continues.
---

There are three horizontal shapes in this system and they are not
interchangeable:

| | What it is | When |
| --- | --- | --- |
| `.reel` | the primitive — a snap strip, no chrome | anything, inside anything |
| [`.carousel`](/carousel.html) | a slideshow — one thing at a time, dots, arrows | a hero, a gallery |
| `.shelf` | a **catalogue row** — a heading and many items, several visible | a listing page |

A shelf is what a catalogue actually uses. Three decisions carry it.

**The row bleeds, the heading does not.** A row that stops at the page column
looks like it ran out of items; a row that runs off the edge is obviously
longer than the screen. `.shelf__track` carries the bleed and re-pads its own
ends, so the first item still lines up with the heading above it.

**The peek is a fraction, not a pixel.** `--shelf-item` is the item width, and
at every viewport a sliver of the next one shows — because the sliver *is* the
affordance.

**Hover raises one item, it does not push the others.** Scaling inside a scroll
container reflows nothing and the row keeps its scroll position.

## The row

:::demo A shelf of episodes. Drag it, or use the arrows.
<section class="shelf">
  <header class="shelf__head">
    <div>
      <p class="eyebrow"><span class="dot dot-sm dot-live"></span> Fresh this week</p>
      <h3 class="shelf__title">Latest episodes</h3>
    </div>
    <div class="shelf__nav">
      <span class="shelf__meta">128 total</span>
      <button class="btn btn-ghost btn-sm btn-icon" type="button" aria-label="Scroll left"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-left"/></svg></button>
      <button class="btn btn-ghost btn-sm btn-icon" type="button" aria-label="Scroll right"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></button>
    </div>
  </header>
  <div class="shelf__track cq-card ix-dim">
    <article class="shelf__item"><article class="card card-video card-hover-frame frame-hover"><div class="card__media"><span class="card__stamp">24:07</span><span class="card__play" aria-hidden="true"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-play"/></svg></span></div><div class="card__body"><p class="card__kicker">Ep. 48</p><h4 class="card__title"><a class="card__link" href="#i">Colour, in one block of tokens</a></h4></div></article></article>
    <article class="shelf__item"><article class="card card-video card-hover-frame frame-hover"><div class="card__media"><span class="card__stamp">18:30</span><span class="card__play" aria-hidden="true"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-play"/></svg></span></div><div class="card__body"><p class="card__kicker">Ep. 47</p><h4 class="card__title"><a class="card__link" href="#i">The frame layer, explained</a></h4></div></article></article>
    <article class="shelf__item"><article class="card card-video card-hover-frame frame-hover"><div class="card__media"><span class="card__stamp">31:12</span><span class="card__play" aria-hidden="true"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-play"/></svg></span></div><div class="card__body"><p class="card__kicker">Ep. 46</p><h4 class="card__title"><a class="card__link" href="#i">Why the thumbnail is the product</a></h4></div></article></article>
    <article class="shelf__item"><article class="card card-video card-hover-frame frame-hover"><div class="card__media"><span class="card__stamp">22:41</span><span class="card__play" aria-hidden="true"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-play"/></svg></span></div><div class="card__body"><p class="card__kicker">Ep. 45</p><h4 class="card__title"><a class="card__link" href="#i">I rebuilt my site in one weekend</a></h4></div></article></article>
    <article class="shelf__item"><article class="card card-video card-hover-frame frame-hover"><div class="card__media"><span class="card__stamp">27:55</span><span class="card__play" aria-hidden="true"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-play"/></svg></span></div><div class="card__body"><p class="card__kicker">Ep. 44</p><h4 class="card__title"><a class="card__link" href="#i">Agents that finish the job</a></h4></div></article></article>
  </div>
</section>
:::

The arrows are a convenience, never the only way through. The track is a real
scroll container, so a trackpad, a touch drag and the keyboard all work with no
JavaScript at all.

## Ranked — the top ten

The numerals come from a CSS counter, so the markup carries no numbers to get
out of order. They are drawn outlined, behind the item, which is what makes
them read as decoration over data rather than a second piece of content.

:::demo `.shelf-ranked` with `.shelf-tall` — the shorts row
<section class="shelf shelf-ranked shelf-tall">
  <header class="shelf__head">
    <h3 class="shelf__title">Shorts, ranked</h3>
    <span class="shelf__meta">9:16 · 64 total</span>
  </header>
  <div class="shelf__track cq-card">
    <article class="shelf__item"><article class="card card-story card-tile card-hover-zoom"><div class="card__media"><span class="card__stamp">00:48</span></div><div class="card__body"><h4 class="card__title"><a class="card__link" href="#i">The one light setup</a></h4></div></article></article>
    <article class="shelf__item"><article class="card card-story card-tile card-hover-zoom"><div class="card__media"><span class="card__stamp">00:36</span></div><div class="card__body"><h4 class="card__title"><a class="card__link" href="#i">Stop centring everything</a></h4></div></article></article>
    <article class="shelf__item"><article class="card card-story card-tile card-hover-zoom"><div class="card__media"><span class="card__stamp">01:02</span></div><div class="card__body"><h4 class="card__title"><a class="card__link" href="#i">Why your audio sounds thin</a></h4></div></article></article>
    <article class="shelf__item"><article class="card card-story card-tile card-hover-zoom"><div class="card__media"><span class="card__stamp">00:29</span></div><div class="card__body"><h4 class="card__title"><a class="card__link" href="#i">Cheap tripod, good shot</a></h4></div></article></article>
    <article class="shelf__item"><article class="card card-story card-tile card-hover-zoom"><div class="card__media"><span class="card__stamp">00:54</span></div><div class="card__body"><h4 class="card__title"><a class="card__link" href="#i">Read the histogram</a></h4></div></article></article>
  </div>
</section>
:::

## Sizes and shapes

:::demo `.shelf-sm` with `.shelf-flat` — no lift, for logos and chips
<section class="shelf shelf-sm shelf-flat shelf-inset">
  <header class="shelf__head"><h3 class="shelf__title">Series</h3></header>
  <div class="shelf__track cq-card">
    <article class="shelf__item"><article class="card card-quiet card-compact"><div class="card__body"><p class="card__kicker">Craft</p><h4 class="card__title">Build a design system</h4></div></article></article>
    <article class="shelf__item"><article class="card card-quiet card-compact"><div class="card__body"><p class="card__kicker">Code</p><h4 class="card__title">Ship it on a weekend</h4></div></article></article>
    <article class="shelf__item"><article class="card card-quiet card-compact"><div class="card__body"><p class="card__kicker">Travel</p><h4 class="card__title">Out of hand, S2</h4></div></article></article>
    <article class="shelf__item"><article class="card card-quiet card-compact"><div class="card__body"><p class="card__kicker">AI</p><h4 class="card__title">Agents, honestly</h4></div></article></article>
  </div>
</section>
:::

:::demo `.shelf-poster` and `.shelf-lg`
<div class="stack stack-xl">
  <section class="shelf shelf-poster shelf-inset">
    <header class="shelf__head"><h3 class="shelf__title">The poster wall</h3><span class="shelf__meta">2:3</span></header>
    <div class="shelf__track cq-card">
      <article class="shelf__item"><article class="card card-movie card-tile"><div class="card__media"></div><div class="card__body"><h4 class="card__title">Out of hand, S2</h4></div></article></article>
      <article class="shelf__item"><article class="card card-movie card-tile"><div class="card__media"></div><div class="card__body"><h4 class="card__title">Ladakh, on film</h4></div></article></article>
      <article class="shelf__item"><article class="card card-movie card-tile"><div class="card__media"></div><div class="card__body"><h4 class="card__title">Eleven mornings</h4></div></article></article>
    </div>
  </section>
  <section class="shelf shelf-lg shelf-inset">
    <header class="shelf__head"><h3 class="shelf__title">Long form</h3></header>
    <div class="shelf__track cq-card">
      <article class="shelf__item"><article class="card card-video"><div class="card__media"><span class="card__stamp">41:03</span></div><div class="card__body"><h4 class="card__title">Salesforce, explained to a designer</h4></div></article></article>
      <article class="shelf__item"><article class="card card-video"><div class="card__media"><span class="card__stamp">28:16</span></div><div class="card__body"><h4 class="card__title">An agent ran my inbox for a week</h4></div></article></article>
    </div>
  </section>
</div>
:::

## Classes

| Class | What it does |
| --- | --- |
| `.shelf` | the row: heading, track, and the two variables below |
| `.shelf__head` | title on one side, meta and arrows on the other |
| `.shelf__title` | the row's name |
| `.shelf__meta` | a count, in the data voice |
| `.shelf__nav` | the arrow buttons — a convenience over a real scroll container |
| `.shelf__track` | the scrolling strip; carries the page bleed |
| `.shelf__item` | one slot, `--shelf-item` wide, snapping at its start edge |
| `.shelf-ranked` | counter-numbered items, the numeral drawn outlined behind |
| `.shelf-sm` `.shelf-lg` | 13rem / 22rem items |
| `.shelf-tall` | 12rem — a row of 9:16 shorts |
| `.shelf-poster` | 14rem — the 2:3 wall |
| `.shelf-flat` | no hover lift, for logos and chips |
| `.shelf-inset` | keeps the row inside its column instead of bleeding |

Two knobs, on the instance:

```html
<section class="shelf" style="--shelf-item: 26rem; --shelf-gap: var(--space-6)">
```

Under `prefers-reduced-motion` the smooth scroll and the hover lift are both
off — the row still scrolls, it just stops animating about it.
