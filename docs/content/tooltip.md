---
title: Tooltip
group: Components
order: 50
lead: Labels on hover — four placements, a rich hover card, and the touch rule that governs all of it.
---

A tooltip is for a **label** on an icon-only control, never for content. The
trigger still needs `aria-label` — the tooltip is the sighted mouse user's copy
of it, not the accessible name. CSS only; a hover label does not deserve
JavaScript.

## Placements

:::demo Top is the default; below, start and end cover the edges
<div class="cluster cluster-lg u-p-6">
  <button class="btn btn-outline btn-icon" type="button" aria-label="Search" data-tip="Search"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-search"/></svg></button>
  <button class="btn btn-outline btn-icon" type="button" aria-label="Settings" data-tip-below data-tip="Settings"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-settings"/></svg></button>
  <button class="btn btn-outline btn-icon" type="button" aria-label="Record" data-tip-end data-tip="Record"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-record"/></svg></button>
  <button class="btn btn-outline btn-icon" type="button" aria-label="Archive" data-tip-start data-tip="Archive"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-archive"/></svg></button>
</div>
:::

Pick by geography: a control against the top bar tips **below**; a control at
the end of a row tips **start**, so the label never leaves the screen.

## The rich hover card

When a label is not enough — a definition, a person, a preview — `.tip-anchor`
holds a real element, so it can carry markup, and `:focus-within` keeps it open
while a keyboard user reads it.

:::demo Hover the term
<p class="u-m-0">The whole system is
  <span class="tip-anchor"><a href="#i" class="t-accent">token-first</a>
    <span class="tipcard"><b>Token-first</b> — every value is a variable off a ladder. Change three and the whole site rebrands: site, player, thumbnails.</span>
  </span>
  by construction.</p>
:::

The rich card must still be a **copy** of information available elsewhere —
hover-only content excludes touch entirely.

## The touch rule

On coarse pointers every tooltip hides: there is no hover, and a long-press
already means something else. Nothing is lost, because the `aria-label` and the
page keep the real information. If hiding it loses something, that something
was content, and content belongs on the page.
