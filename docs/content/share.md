---
title: Share
group: Patterns
order: 50
lead: The row of quiet actions under an article, and the sticky rail beside it.
---

:::demo The share row
<div class="share" style="max-width:44rem">
  <span class="share__label">Share</span>
  <button class="btn btn-outline btn-sm" type="button"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-link"/></svg> Copy link</button>
  <button class="btn btn-ghost btn-sm" type="button"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-mail"/></svg> Email</button>
  <button class="btn btn-ghost btn-sm" type="button"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-message"/></svg> Message</button>
  <button class="btn btn-ghost btn-sm" type="button"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-bookmark"/></svg> Save</button>
  <span class="share__count">128 shares</span>
</div>
:::

Never a wall of brand colours. The brands' colours are not this page's
accent, and a row of four saturated logos under a quiet article is the loudest
thing on the page for no reason. The buttons are the system's buttons; the
label is a label; the count is data.

## Share variants

:::demo Centred, and flush without its rules
<div class="stack" style="max-width:44rem">
  <div class="share share-center">
    <span class="share__label">Share</span>
    <button class="btn btn-outline btn-sm btn-pill" type="button">Copy link</button>
    <button class="btn btn-ghost btn-sm btn-pill" type="button">Email</button>
  </div>
  <div class="share share-flush">
    <span class="share__label">Share this episode</span>
    <button class="btn btn-icon btn-ghost btn-sm" type="button" aria-label="Copy link"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-link"/></svg></button>
    <button class="btn btn-icon btn-ghost btn-sm" type="button" aria-label="Email"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-mail"/></svg></button>
    <button class="btn btn-icon btn-ghost btn-sm" type="button" aria-label="Share"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-share"/></svg></button>
  </div>
</div>
:::

## The rail

The sticky sidebar beside a reading column. It sticks under the nav, scrolls
itself when it is taller than the viewport, and unsticks entirely under 64rem
so a phone never gets a frozen column. Each `.rail__block` is a titled box;
exactly one may be `.rail__block-accent` — the ask.

:::demo
<aside class="rail" style="max-width:19rem">
  <div class="rail__block">
    <div class="rail__title"><svg class="icon icon-xs" aria-hidden="true"><use href="/icons/sprite.svg#i-menu"/></svg> On this page</div>
    <nav class="stack stack-sm" aria-label="Contents">
      <a class="t-small" href="#i" aria-current="location">The setup</a>
      <a class="t-small" href="#i">The first take</a>
      <a class="t-small" href="#i">What went wrong</a>
    </nav>
  </div>
  <div class="rail__block rail__block-accent">
    <div class="rail__title"><svg class="icon icon-xs" aria-hidden="true"><use href="/icons/sprite.svg#i-mail"/></svg> Every Friday</div>
    <p class="t-small">One episode, one thing I learned, no sponsor reads.</p>
    <form class="stack stack-sm" action="#i" style="margin-block-start: var(--space-3)">
      <input class="input input-sm" type="email" placeholder="you@studio.tv" aria-label="Email">
      <button class="btn btn-primary btn-sm btn-block" type="submit">Subscribe</button>
    </form>
  </div>
  <div class="rail__block rail__block-flush">
    <div class="rail__title">More in this series</div>
    <nav class="stack stack-sm" aria-label="Series">
      <a class="t-small" href="#i">Ep. 10 — Mono is a signal</a>
      <a class="t-small" href="#i">Ep. 11 — The frame layer</a>
    </nav>
  </div>
</aside>
:::

The rail is the last child of a `.sidebar-end` layout. `--rail-top` is the
sticky offset — set it to your navbar's height plus a gap.

```html
<div class="sidebar sidebar-end">
  <article class="prose">…</article>
  <aside class="rail" style="--rail-top: 4.5rem">…</aside>
</div>
```

## Properties

| Variable | Does |
| --- | --- |
| `--share-gap` | Gap between actions |
| `--rail-gap` | Gap between rail blocks |
| `--rail-top` | Sticky offset from the top of the viewport |

## Accessibility

- Icon-only share buttons carry `aria-label`; the label span is not their name.
- The count is text, not a badge — a screen reader reads *128 shares* in place.
- The rail is an `<aside>`; its navigations carry `aria-label` so two lists of
  links are not announced identically.
- Sticky is a media query, so a small screen scrolls the rail with the page.
