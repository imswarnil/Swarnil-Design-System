---
title: Image
group: Components
order: 50
lead: The poster, the figure, the ratio box and the treatments — a photograph, held at a known size and pulled into the palette.
---

An image on a page has three problems, and they are the same three every time:
it arrives late and shifts the layout, it is the wrong shape, and it was shot
by somebody with a different palette. This page is those three, solved.

## Reserve the box first

A `<img>` with no reserved space is the single largest source of layout shift
on most sites. `.ratio` reserves it before anything downloads, and it is one
class.

:::demo The five named ratios. Nothing here has loaded yet — and nothing moves when it does.
<div class="grid-3">
  <div class="ratio u-bg-sunken u-rounded-lg u-border u-p-3"><span class="t-data">ratio · 16 / 9</span></div>
  <div class="ratio ratio-photo u-bg-sunken u-rounded-lg u-border u-p-3"><span class="t-data">ratio-photo · 4 / 3</span></div>
  <div class="ratio ratio-square u-bg-sunken u-rounded-lg u-border u-p-3"><span class="t-data">ratio-square · 1</span></div>
  <div class="ratio ratio-portrait u-bg-sunken u-rounded-lg u-border u-p-3"><span class="t-data">ratio-portrait · 3 / 4</span></div>
  <div class="ratio ratio-wide u-bg-sunken u-rounded-lg u-border u-p-3"><span class="t-data">ratio-wide · 21 / 9</span></div>
  <div class="ratio ratio-story u-bg-sunken u-rounded-lg u-border u-p-3"><span class="t-data">ratio-story · 9 / 16</span></div>
</div>
:::

Anything inside a `.ratio` — `img`, `video`, `iframe` — is set to fill it with
`object-fit: cover`, so a portrait photograph in a landscape box is cropped
rather than letterboxed. Any other ratio is one custom property:

```html
<div class="ratio" style="--ratio: 2 / 3"> … </div>
```

## The figure

An image **and its caption**, together, because a photograph in an article
almost always needs a sentence saying what you are looking at. The caption is
part of the element, not a paragraph underneath that a rewrite can separate
from its picture.

:::demo
<div class="grid-2">
  <figure class="figure u-m-0">
    <img src="/assets/media/peak.jpg" alt="A ridge line at altitude" />
    <figcaption class="figure__caption">Ladakh, 4,200m. One lens, no tripod.</figcaption>
  </figure>
  <figure class="figure figure-center u-m-0">
    <img src="/assets/media/camera.jpg" alt="The camera on a desk" />
    <figcaption class="figure__caption">`figure-center` centres the caption under a narrower image.</figcaption>
  </figure>
</div>
:::

## The poster

A still with the slate baked in — the thumbnail as it ships. Image, gradient,
label; the eyebrow is a label, the title is display type, the corner holds the
duration or a live badge.

:::demo
<div class="grid-2">
  <div class="poster">
    <div class="poster__corner"><span class="timecode" style="color: var(--pure-white)">24:07</span></div>
    <div class="poster__label">
      <span class="poster__eyebrow">Episode 12</span>
      <span class="poster__title">Lighting a two-camera interview</span>
    </div>
  </div>
  <div class="poster">
    <div class="poster__corner"><span class="badge badge-live">Live</span></div>
    <button class="play play-sm" type="button" aria-label="Watch live"><span class="play__disc"></span></button>
    <div class="poster__label">
      <span class="poster__eyebrow">Now</span>
      <span class="poster__title">Studio Q&amp;A</span>
    </div>
  </div>
</div>
:::

:::demo Square and story posters
<div class="grid-3">
  <div class="poster poster-square"><div class="poster__label"><span class="poster__eyebrow">Short</span><span class="poster__title">The 30-second colour fix</span></div></div>
  <div class="poster poster-story"><div class="poster__label"><span class="poster__eyebrow">Story</span><span class="poster__title">Behind take 47</span></div></div>
</div>
:::

## Treatments

A photograph you did not shoot is in a palette nobody chose. The
[veils](/overlays.html) are the colour grade that fixes it, and the
[interactions](/interactions.html) are what it does when you point at it.

:::demo Grade, grain and scrim, then the hover answers
<div class="grid-3">
  <figure class="figure u-m-0 u-rounded-lg u-overflow-hidden"><img src="/assets/media/coast.jpg" alt="" /><figcaption class="figure__caption">untouched</figcaption></figure>
  <div class="poster veil-mono"><img src="/assets/media/coast.jpg" alt="" /><span class="veil veil-grade"></span><span class="veil veil-scrim"></span><span class="poster__label"><span class="poster__eyebrow">graded</span><span class="poster__title">mono + grade + scrim</span></span></div>
  <figure class="figure u-m-0 ix-zoom u-rounded-lg u-overflow-hidden"><img src="/assets/media/coast.jpg" alt="" /><figcaption class="figure__caption">ix-zoom — point at it</figcaption></figure>
</div>
:::

## While it loads

`.skeleton-media` reserves the same box the picture will fill, so the page does
not move when it arrives. That is the whole job — see
[Article](/content.html) for the rest of the loading set.

:::demo
<div class="grid-3">
  <div class="skeleton skeleton-media skeleton-breathe"></div>
  <div class="skeleton skeleton-media"></div>
  <figure class="figure u-m-0 u-rounded-lg u-overflow-hidden"><img src="/assets/media/city.jpg" alt="" loading="lazy" /></figure>
</div>
:::

Use `loading="lazy"` on anything below the fold and `decoding="async"` on
everything. Neither is a design decision, and both are free.

## Accessibility

- `alt=""` on a decorative image, a real sentence on an informative one. A
  photograph illustrating a caption that already describes it is decorative.
- A `.poster` that is a link takes the accessible name from its `__title`; the
  image inside it should be `alt=""` rather than repeating that name.
- `.ratio` crops with `object-fit: cover`, so never put text inside an image
  that has to survive the crop.
- Never disable zoom on a page whose content is photographs.
