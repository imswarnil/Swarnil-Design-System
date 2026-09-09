---
title: Ad
group: Components
order: 50
lead: Every paid slot a creator site actually sells — display, native, in-article, rail, floating — each one reserving its height, declaring itself, and fitting on a phone.
---

Every site that pays for itself has these, and almost every one of them is a
hole in the design: an iframe of unknown size that arrives late, shifts the
page, and is indistinguishable from the content around it.

A design system cannot fix the advertising industry. It can fix four things.

**Reserve.** `--ad-h` is set before anything loads, so a slot is the same height
empty, loading and full. That is the whole of the layout-shift problem, solved
by refusing to let the network decide a height.

**Declare.** The label is not optional and not four-pixel grey. A reader who
cannot tell an ad from an article has been misled, and no revenue makes that a
design decision.

**Dismiss.** Every slot can carry a close.

**Fit.** A 728×90 leaderboard on a 390px phone is not a leaderboard, it is a
horizontal scrollbar. Every fixed format below collapses to the nearest shape
that fits.

## The two kinds

| | Formats | The system styles |
| --- | --- | --- |
| **Display** | `ad-leader` `ad-billboard` `ad-rect` `ad-square` `ad-sky` `ad-responsive` `ad-float` | the **box**. Somebody else's creative goes in it |
| **Native** | `ad-multiplex` `ad-sponsored` `ad-affiliate` | the **whole unit**, built from this system's own parts |

Native is the dangerous one. A sponsored unit that looks exactly like a card is
a card that lies — so every native format is required to carry `.ad__label`,
and each is drawn deliberately a half-step apart from the editorial card beside
it: a dashed rule, the brand named in the data voice, the label above. That
distance is not decoration; it is the point.

## The four states

State lives on the element, in one attribute. With **no JavaScript at all** a
slot renders at `idle` and stays there — a labelled, correctly-sized empty box,
which is the right fallback rather than a broken one.

:::demo Four states, same size — watch that the box never moves
<div class="grid-2">
  <aside class="ad ad-rect" data-ad-state="idle">
    <p class="ad__label">Advertisement</p>
    <div class="ad__slot"><p class="ad__note">idle — reserved, nothing requested</p></div>
  </aside>
  <aside class="ad ad-rect" data-ad-state="loading">
    <p class="ad__label">Advertisement</p>
    <div class="ad__slot"><p class="ad__note">loading</p></div>
  </aside>
  <aside class="ad ad-rect" data-ad-state="loaded">
    <p class="ad__label">Sponsored<button class="ad__close" type="button" aria-label="Hide this ad"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button></p>
    <div class="ad__slot"><img src="/assets/media/camera.jpg" alt="An advertisement" /></div>
  </aside>
  <aside class="ad ad-rect" data-ad-state="hidden">
    <p class="ad__label">Advertisement</p>
    <div class="ad__slot"><p class="ad__note">hidden — this one is here in the markup and gone from the page</p></div>
  </aside>
</div>
:::

There are only three boxes above. The fourth is `data-ad-state="hidden"`, in
the markup, collapsed.

| State | What it means |
| --- | --- |
| `idle` | reserved, nothing requested. A dashed empty box — **not** a skeleton, because a skeleton implies something is on its way and at idle nothing is |
| `loading` | the request is out; the slot sweeps |
| `loaded` | the creative is in |
| `hidden` | the reader closed it; the slot collapses |

## Display formats

Named after the sizes that actually get sold, so a slot is chosen by what it
will hold rather than by a number somebody has to look up.

:::demo The two wide banners
<div class="stack">
  <aside class="ad ad-leader" data-ad-state="idle"><p class="ad__label">Advertisement</p><div class="ad__slot"><p class="ad__note">.ad-leader · 728 × 90</p></div></aside>
  <aside class="ad ad-billboard" data-ad-state="idle"><p class="ad__label">Advertisement</p><div class="ad__slot"><p class="ad__note">.ad-billboard · 970 × 250</p></div></aside>
</div>
:::

:::demo The rail formats. Narrow this page to 320px with the toggle above — every one becomes a rectangle.
<div class="cluster cluster-top">
  <aside class="ad ad-rect" data-ad-state="idle" style="inline-size: 19rem"><p class="ad__label">Advertisement</p><div class="ad__slot"><p class="ad__note">.ad-rect · 300 × 250</p></div></aside>
  <aside class="ad ad-square" data-ad-state="idle" style="inline-size: 19rem"><p class="ad__label">Advertisement</p><div class="ad__slot"><p class="ad__note">.ad-square · 300 × 300</p></div></aside>
  <aside class="ad ad-sky" data-ad-state="idle" style="inline-size: 19rem"><p class="ad__label">Advertisement<button class="ad__close" type="button" aria-label="Hide this ad"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button></p><div class="ad__slot"><p class="ad__note">.ad-sky · 300 × 600<br />the skyscraper</p></div></aside>
</div>
:::

`.ad-tall` is kept as the old name for `.ad-sky`; reach for `.ad-sky`, because
"skyscraper" is what the format is called.

### Responsive — when you do not know the size

No fixed dimensions at all. The slot takes the width it is given and reserves
its height from an **aspect ratio**, which is the only honest way to hold space
for a creative whose size you will not know until it arrives.

:::demo `--ad-ratio` is the knob
<div class="stack">
  <aside class="ad ad-responsive" data-ad-state="idle"><p class="ad__label">Advertisement</p><div class="ad__slot"><p class="ad__note">.ad-responsive · 16 / 5, the default</p></div></aside>
  <aside class="ad ad-responsive" data-ad-state="loaded" style="--ad-ratio: 21 / 9"><p class="ad__label">Sponsored<button class="ad__close" type="button" aria-label="Hide this ad"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button></p><div class="ad__slot"><img src="/assets/media/city.jpg" alt="An advertisement" /></div></aside>
</div>
:::

## Where it goes

### In an article

`.ad-inline` gives the slot air and a rule on both edges, so it is
unmistakably not the next paragraph.

:::demo
<article class="prose">
  <p>The audit took an afternoon and produced one number that made the argument
  on its own: nineteen button styles.</p>
  <aside class="ad ad-inline ad-leader" data-ad-state="loaded">
    <p class="ad__label">Sponsored<button class="ad__close" type="button" aria-label="Hide this ad"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button></p>
    <div class="ad__slot"><img src="/assets/media/code.jpg" alt="An advertisement" /></div>
  </aside>
  <p>The temptation was to pick the nicest one and copy it around. I have done
  that before, and it survives exactly until the next site.</p>
</article>
:::

### In a rail

`.ad-sticky` follows the reader down. The offset is a variable, because only
the page knows how tall its bar is:

```html
<aside class="ad ad-rect ad-sticky" style="--ad-top: 5rem" data-ad-state="idle">
```

The right-hand column of this documentation is exactly that: the table of
contents, then a slot underneath it, both in one sticky block.

### Floating

Pinned to the bottom of the viewport. This is the format most capable of being
a dark pattern, so it ships with the three conditions that stop it being one,
and they are **not optional**:

- it is dismissible — `.ad__close` is required, not decorative;
- it never exceeds a fifth of the viewport, so it cannot bury what it sits on;
- the page must reserve room for it — `padding-block-end` on `<body>` equal to
  `--ad-float-h`, because an anchor unit covering the last paragraph of an
  article is an ad that ate the thing it was funding.

If a page cannot honour the third, it should not use this format. That is a
decision the stylesheet can state but not enforce.

```html
<body style="padding-block-end: 6rem">
  …
  <aside class="ad ad-float" data-ad-state="loaded">
    <p class="ad__label">Advertisement
      <button class="ad__close" type="button" aria-label="Hide this ad">…</button>
    </p>
    <div class="ad__slot">…</div>
  </aside>
</body>
```

## Native formats

### Multiplex — the grid of recommendations

Several small units in one block. The dashed outer rule and one label at the
top say, once, what everything inside is — which is better than six tiny "Ad"
tags nobody reads.

:::demo
<aside class="ad ad-multiplex" data-ad-state="loaded">
  <p class="ad__label">Sponsored links<button class="ad__close" type="button" aria-label="Hide these"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button></p>
  <div class="ad__grid">
    <a class="ad__unit" href="#i"><span class="ad__thumb"><img src="/assets/media/camera.jpg" alt="" /></span><p class="ad__title">The mirrorless body every creator is switching to</p><span class="ad__brand"><span class="dot"></span> lensmarket.io</span></a>
    <a class="ad__unit" href="#i"><span class="ad__thumb"><img src="/assets/media/studio.jpg" alt="" /></span><p class="ad__title">Light a room with one bulb and a bedsheet</p><span class="ad__brand"><span class="dot"></span> setup.tools</span></a>
    <a class="ad__unit" href="#i"><span class="ad__thumb"><img src="/assets/media/code.jpg" alt="" /></span><p class="ad__title">Ship a site without a build step</p><span class="ad__brand"><span class="dot"></span> edge.host</span></a>
    <a class="ad__unit" href="#i"><span class="ad__thumb"><img src="/assets/media/desk.jpg" alt="" /></span><p class="ad__title">The keyboard that survived four years of takes</p><span class="ad__brand"><span class="dot"></span> keys.supply</span></a>
  </div>
</aside>
:::

### Sponsored — one paid story

The shape of an editorial card, held deliberately apart from one.

:::demo The editorial card on the left, the sponsored unit on the right. They should not be confusable.
<div class="grid-2 cq-card">
  <article class="card card-hover-lift">
    <div class="card__media"><img src="/assets/media/coast.jpg" alt="" /></div>
    <div class="card__body"><p class="card__kicker">Travel</p><h4 class="card__title"><a class="card__link" href="#i">Eleven mornings in Kyoto</a></h4><p class="card__excerpt">One lens, no tripod, and the discipline of being outside before the city wakes.</p></div>
  </article>
  <aside class="ad ad-sponsored" data-ad-state="loaded">
    <p class="ad__label">Sponsored<button class="ad__close" type="button" aria-label="Hide this ad"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button></p>
    <a class="ad__unit" href="#i">
      <span class="ad__thumb"><img src="/assets/media/night.jpg" alt="" /></span>
      <span class="ad__body">
        <span class="ad__title">How three creators cut their edit time in half</span>
        <span class="ad__brand"><span class="dot dot-accent"></span> Presented by Resolve</span>
      </span>
    </a>
  </aside>
</div>
:::

Three things do the separating: the dashed edge, the label above, and the brand
named in the data voice. Remove any one of them and this is a card that lies.

### Affiliate — the thing, with a price

The disclosure sits **inside** the unit rather than at the foot of the page,
because the reader deciding whether to click is the reader who needs it.

:::demo
<aside class="ad ad-affiliate" data-ad-state="loaded">
  <p class="ad__label">Affiliate</p>
  <div class="stack stack-sm">
    <a class="ad__unit" href="#i">
      <span class="ad__thumb"><img src="/assets/media/camera.jpg" alt="" /></span>
      <span class="ad__body">
        <span class="ad__title">Sony FX3 — full frame, no fan noise</span>
        <span class="ad__brand"><span class="dot"></span> lensmarket.io · in stock</span>
        <span class="ad__price">₹2,40,000</span>
      </span>
      <span class="ad__cta"><span class="button is-primary is-small">View</span></span>
    </a>
    <a class="ad__unit" href="#i">
      <span class="ad__thumb"><img src="/assets/media/studio.jpg" alt="" /></span>
      <span class="ad__body">
        <span class="ad__title">Aputure 120d II</span>
        <span class="ad__brand"><span class="dot"></span> setup.tools</span>
        <span class="ad__price">₹52,000</span>
      </span>
      <span class="ad__cta"><span class="button is-outlined is-small">View</span></span>
    </a>
    <p class="ad__disclosure">These are affiliate links. They cost you nothing and they have never decided what goes on this list.</p>
  </div>
</aside>
:::

## On a phone

A fixed format that does not fit is not a fixed format. Each collapses to the
nearest shape that **does**, rather than overflowing the page or disappearing
from it — a slot that vanishes on a phone is revenue the design threw away, and
one that overflows is a page the reader can scroll sideways by accident.

| Format | ≥ 64rem | < 64rem | < 48rem |
| --- | --- | --- | --- |
| `.ad-billboard` | 970 × 250 | 300 × 250 | 300 × 250 |
| `.ad-leader` | 728 × 90 | 728 × 90 | 300 × 250 |
| `.ad-sky` | 300 × 600 | 300 × 600 | 300 × 250 |
| `.ad-responsive` | 16 / 5 | 16 / 5 | 4 / 3 |
| `.ad-multiplex` | 11rem columns | 11rem | 9rem columns |
| `.ad-sponsored` | row, 11rem still | row, 9rem still | stacked |
| `.ad-affiliate` | row | row | wrapped, 4rem shot |

Use the **320px toggle** on any demo above to watch it happen — that is what
the toggle is for.

## The parent

A slot fills the inline size it is given and reserves its own block size. So
the parent decides the width, and it must not be narrower than the format:

- `.ad-leader` and `.ad-billboard` want a full page column;
- `.ad-rect`, `.ad-square` and `.ad-sky` want a rail, or a grid cell;
- `.ad-responsive` wants anything, which is the point of it.

`--ad-max` caps a fluid slot so a leaderboard in a 1400px band does not stretch
to 1400px. It is already set per format; override it when your inventory is a
different size.

```html
<div class="rail">
  <aside class="ad ad-rect ad-sticky" style="--ad-top: 5rem">…</aside>
</div>
```

## Wiring it

Nothing here needs a script to be correct, and everything is driven by one
attribute, so a script is four lines when you do want one:

```js
document.querySelectorAll('.ad[data-ad-state="idle"]').forEach(function (el) {
  el.dataset.adState = 'loading';
  requestCreative(el).then(function () { el.dataset.adState = 'loaded'; });
});
```

Close is the same shape — set `hidden` and the CSS does the rest. Store the
choice if you like; the component has no opinion about that, and a component
with an opinion about somebody's `localStorage` is doing two jobs.

## What it will not do

There is **no interstitial** and **no auto-refresh**, and there will not be.
The first covers content the reader asked for; the second bills an impression
the reader never saw. A design system that ships them is lending its authority
to a dark pattern, which is something a stylesheet is perfectly capable of
refusing to do.

The floating unit above is the line: it is the one format in this family that
*could* be a dark pattern, so it ships with its conditions attached rather than
being left out. A format you refuse to provide gets built badly by somebody in
a hurry; a format you provide with rules gets built with the rules.

Printing drops every slot — an ad on paper is ink somebody paid for twice.
