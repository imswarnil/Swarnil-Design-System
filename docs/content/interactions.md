---
title: Interactions
group: Foundation
order: 50
lead: Every hover and focus answer in the system, previewed side by side — one property each, under 200ms, and never left stuck on a touch screen.
---

An [effect](/effects.html) happens because the page decided it should. An
**interaction** happens because a person pointed at something, and it is over
the moment they point somewhere else. That difference is why these live in
their own file, and it sets every rule on this page.

- **One property each.** Two properties is a transition; three is a cartoon.
- **Under 200ms.** Feedback slower than that reads as lag, not as response.
- **Guarded** by `(hover: hover) and (pointer: fine)`. A touch screen has no
  hover and no way to *un*-hover, so it gets the resting state and nothing
  else. A stuck hover is worse than no hover.
- **Focus gets the same answer** wherever it can, so a keyboard user is never
  told less than a mouse user.

One per element. An element that lifts *and* glows *and* shines has not decided
what it is.

## The whole set

Point at every one of them. This is the entire vocabulary — there is no
twenty-first.

:::demo On a surface
<div class="grid-3 cq-card">
  <article class="card ix-raise"><div class="card__body"><p class="card__kicker">ix-raise</p><p class="card__excerpt">Steps toward you; the shadow follows.</p></div></article>
  <article class="card ix-glow"><div class="card__body"><p class="card__kicker">ix-glow</p><p class="card__excerpt">The accent ring lights up at the edge.</p></div></article>
  <article class="card ix-tilt"><div class="card__body"><p class="card__kicker">ix-tilt</p><p class="card__excerpt">A degree and a half — a poster picked up.</p></div></article>
</div>
:::

:::demo On text and links
<div class="stack">
  <p class="t-lead u-m-0">A row of <a class="ix-underline" href="#i">ix-underline</a>, an <a class="ix-arrow" href="#i">ix-arrow <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg></a>, and a <a class="ix-color" href="#i">ix-color</a> that is grey until touched.</p>
  <div class="cluster">
    <a class="button is-outlined ix-underline" href="#i">ix-underline</a>
    <a class="button is-ghost ix-arrow" href="#i">ix-arrow <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg></a>
    <button class="button is-link ix-glow" type="button">ix-glow</button>
    <button class="button is-outlined ix-scan" type="button">ix-scan</button>
  </div>
</div>
:::

:::demo On footage — where most of them belong
<div class="grid-3">
  <figure class="figure u-m-0 ix-zoom u-rounded-lg u-overflow-hidden"><img src="/assets/media/road.jpg" alt="" /><figcaption class="figure__caption">ix-zoom — only the picture moves</figcaption></figure>
  <figure class="figure u-m-0 ix-shine u-rounded-lg u-overflow-hidden"><img src="/assets/media/coast.jpg" alt="" /><figcaption class="figure__caption">ix-shine — a light passes across</figcaption></figure>
  <figure class="figure u-m-0 ix-scan u-rounded-lg u-overflow-hidden"><img src="/assets/media/studio.jpg" alt="" /><figcaption class="figure__caption">ix-scan — the tape head passes over</figcaption></figure>
  <figure class="figure u-m-0 ix-color u-rounded-lg u-overflow-hidden"><img src="/assets/media/peak.jpg" alt="" /><figcaption class="figure__caption">ix-color — grey until touched</figcaption></figure>
  <figure class="figure u-m-0 ix-scan ix-scan-light u-rounded-lg u-overflow-hidden"><img src="/assets/media/night.jpg" alt="" /><figcaption class="figure__caption">ix-scan-light — over dark footage</figcaption></figure>
  <div class="ix-reveal u-rounded-lg u-overflow-hidden" style="position: relative">
    <img src="/assets/media/city.jpg" alt="" style="display: block; width: 100%" />
    <div class="ix-reveal__hidden glass glass-dark u-p-3 cluster cluster-sm">
      <button class="button is-small is-primary" type="button">Play</button>
      <button class="button is-small is-ghost" type="button">Save</button>
    </div>
  </div>
</div>
:::

:::demo On a group — the siblings step back when one is chosen
<div class="grid-4 ix-dim">
  <figure class="figure u-m-0 u-rounded-lg u-overflow-hidden"><img src="/assets/media/desk.jpg" alt="" /></figure>
  <figure class="figure u-m-0 u-rounded-lg u-overflow-hidden"><img src="/assets/media/camera.jpg" alt="" /></figure>
  <figure class="figure u-m-0 u-rounded-lg u-overflow-hidden"><img src="/assets/media/studio.jpg" alt="" /></figure>
  <figure class="figure u-m-0 u-rounded-lg u-overflow-hidden"><img src="/assets/media/code.jpg" alt="" /></figure>
</div>
:::

## The set, named

| Class | The answer | Best on |
| --- | --- | --- |
| `.ix-underline` | an underline draws in from the start edge | a link in running text |
| `.ix-arrow` | the icon travels one step | a link that goes somewhere |
| `.ix-raise` | the whole thing steps toward you | a card |
| `.ix-glow` | the accent ring lights the edge | a card on a dark band |
| `.ix-tilt` | a degree and a half of rotation | a poster, a photograph |
| `.ix-zoom` | only the media scales; the box stays put | any picture |
| `.ix-shine` | a light passes across | a dark tile, a button |
| `.ix-scan` | scanlines, and one band sweeps down | footage, and the house's own button |
| `.ix-scan-light` | the same, in the accent, brighter lines | over dark footage |
| `.ix-color` | grey until touched | a logo wall, a poster grid |
| `.ix-reveal` | a hidden row slides up from the bottom | a thumbnail with actions |
| `.ix-dim` | the siblings step back | a grid, on the **parent** |

`.ix-dim` is the only one that goes on the container rather than the item.

## Why the guard

```css
@media (hover: hover) and (pointer: fine) { … }
```

Without it, a touch device fires `:hover` on tap and then has no way to clear
it — so a card stays lifted, a tile stays zoomed, and the reader is left
holding a state they cannot release. Everything on this page is inside that
guard, which is why every one of these is safe to use on a page that will also
be read on a phone.

The exceptions are deliberate and few: `.ix-reveal` also answers
`:focus-within`, so the hidden row is reachable by keyboard on any device, and
`.ix-scan` answers `:focus-visible` for the same reason.

## Under reduced motion

An interaction is a response to a deliberate act, so most of these survive —
what goes is the part that **moves**, not the part that answers. Colour and
opacity stay; travel, scale and rotation do not.

That is a different rule from [effects](/effects.html), where the whole thing
is switched off. The difference is consent: the reader asked for this one.
