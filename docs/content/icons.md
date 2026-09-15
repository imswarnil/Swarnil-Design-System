---
title: Icons
group: Foundation
order: 50
lead: Swarnil Icons in this system — sizes, weights, alignment, and the one-request sprite.
---

The icon set is its own project — [icons.imswarnil.com](https://icons.imswarnil.com),
61 icons on a 24 grid, drawn from scratch, MIT. This page is how the *system*
consumes it.

## The sprite

One request for the whole set, then `<use>` per icon:

```html
<svg class="icon"><use href="/icons/sprite.svg#i-camera"/></svg>
```

:::demo
<div class="cluster cluster-lg">
  <svg class="icon"><use href="/icons/sprite.svg#i-camera"/></svg>
  <svg class="icon"><use href="/icons/sprite.svg#i-play"/></svg>
  <svg class="icon"><use href="/icons/sprite.svg#i-capture"/></svg>
  <svg class="icon"><use href="/icons/sprite.svg#i-record"/></svg>
  <svg class="icon"><use href="/icons/sprite.svg#i-file"/></svg>
  <svg class="icon"><use href="/icons/sprite.svg#i-heart"/></svg>
</div>
:::

## Sizes

Sized in `rem`, so icons scale with the text they sit beside — not with the
viewport.

:::demo
<div class="cluster cluster-lg">
  <svg class="icon icon-xs"><use href="/icons/sprite.svg#i-camera"/></svg>
  <svg class="icon icon-sm"><use href="/icons/sprite.svg#i-camera"/></svg>
  <svg class="icon"><use href="/icons/sprite.svg#i-camera"/></svg>
  <svg class="icon icon-lg"><use href="/icons/sprite.svg#i-camera"/></svg>
  <svg class="icon icon-xl"><use href="/icons/sprite.svg#i-camera"/></svg>
</div>
:::

## Colour and alignment

Icons inherit `currentColor` — colour the text, the icon follows. Beside text,
`.icon-inline` drops the icon `0.125em` so it sits on the baseline's optical
centre instead of floating:

:::demo
<p class="m-0">Recorded <svg class="icon icon-sm icon-inline"><use href="/icons/sprite.svg#i-record"/></svg> live from <span class="t-accent"><svg class="icon icon-sm icon-inline"><use href="/icons/sprite.svg#i-camera"/></svg> the studio</span>.</p>
:::

## Solid, for active states

Stroked is the default voice; `.icon-solid` fills — the pair makes a natural
rest/active toggle:

:::demo
<div class="cluster">
  <button class="btn btn-quiet btn-icon" type="button" aria-label="Save"><svg class="icon"><use href="/icons/sprite.svg#i-heart"/></svg></button>
  <button class="btn btn-quiet btn-icon" type="button" aria-label="Saved" aria-pressed="true"><svg class="icon icon-solid t-accent"><use href="/icons/sprite.svg#i-heart"/></svg></button>
</div>
:::

## When an icon is missing

Do not inline a one-off path — an icon inlined in markup is one nobody else
can find and nothing validates. Add it to the set (one line in
`scripts/author.py`, then `validate.py` holds it to STYLE.md) and consume it
from the sprite. That is how `box`, `activity` and `aperture` got here.
