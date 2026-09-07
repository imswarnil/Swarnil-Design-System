---
title: Overlays
group: Foundation
order: 50
lead: Veils and glass — the colour grade, in CSS, applied to any photograph without touching the file.
---

Every demo on this page is over a **real photograph**, because that is the only
way a veil is legible. A scrim over a flat gradient looks like a slightly
different gradient; a scrim over a picture looks like the thing it is.

## What a veil actually does

Here is the whole idea in one comparison. Same photograph, same caption, one
`<span>` of difference.

:::demo Left: the caption on the photograph. Right: the same caption on a scrim.
<div class="grid-2">
  <div class="poster">
    <img src="/assets/media/coast.jpg" alt="" />
    <span class="poster__label"><span class="poster__eyebrow">No veil</span><span class="poster__title">Can you read this?</span></span>
  </div>
  <div class="poster">
    <img src="/assets/media/coast.jpg" alt="" />
    <span class="veil veil-scrim"></span>
    <span class="poster__label"><span class="poster__eyebrow">veil-scrim</span><span class="poster__title">Now you can.</span></span>
  </div>
</div>
:::

```html
<div class="poster">
  <img src="…" alt="" />
  <span class="veil veil-scrim"></span>   <!-- this line -->
  <span class="poster__label">…</span>
</div>
```

`.veil` is an absolutely-positioned **child** that fills its positioned parent
and lets pointer events through; the variant decides what that layer paints.
Because it is an element and not a pseudo, it never fights
[`.frame`](/frame.html) or [`.pattern`](/pattern.html), and any number of them
stack in source order.

## Scrims — where the darkness is

Six directions. Each darkens one part of the picture so type can sit there, and
the caption in every tile below is placed where that scrim expects it.

Hard-edged gradients, never blurs: a blur costs a compositor layer per image,
and a grid has twenty of them.

:::demo The label in each tile sits where that scrim puts the darkness
<div class="grid-3">
  <div class="poster"><img src="/assets/media/city.jpg" alt="" /><span class="veil veil-scrim"></span><span class="veil-caption t-label">scrim — bottom</span></div>
  <div class="poster"><img src="/assets/media/city.jpg" alt="" /><span class="veil veil-scrim-top"></span><span class="veil-caption veil-caption-top t-label">scrim-top</span></div>
  <div class="poster"><img src="/assets/media/city.jpg" alt="" /><span class="veil veil-scrim-start"></span><span class="veil-caption t-label">scrim-start</span></div>
  <div class="poster"><img src="/assets/media/city.jpg" alt="" /><span class="veil veil-scrim-end"></span><span class="veil-caption t-label" style="text-align: end">scrim-end</span></div>
  <div class="poster"><img src="/assets/media/city.jpg" alt="" /><span class="veil veil-scrim-both"></span><span class="veil-caption veil-caption-centre t-label">scrim-both</span></div>
  <div class="poster"><img src="/assets/media/city.jpg" alt="" /><span class="veil veil-scrim-full"></span><span class="veil-caption veil-caption-centre t-label">scrim-full — the whole frame</span></div>
</div>
:::

Two strengths, on the same scrim. Use `-heavy` when the photograph is busy
where the words go, `-light` when it is already dark there.

:::demo
<div class="grid-3">
  <div class="poster"><img src="/assets/media/road.jpg" alt="" /><span class="veil veil-scrim veil-light"></span><span class="veil-caption t-label">veil-light</span></div>
  <div class="poster"><img src="/assets/media/road.jpg" alt="" /><span class="veil veil-scrim"></span><span class="veil-caption t-label">default</span></div>
  <div class="poster"><img src="/assets/media/road.jpg" alt="" /><span class="veil veil-scrim veil-heavy"></span><span class="veil-caption t-label">veil-heavy</span></div>
</div>
:::

## The lens — four ways to say *camera*

None of these is about legibility. They are about what the picture is
pretending to be.

:::demo Compare each against the untouched frame on the left
<div class="grid-auto grid-auto-sm">
  <div class="poster"><img src="/assets/media/peak.jpg" alt="" /><span class="veil-caption t-label">— none —</span></div>
  <div class="poster"><img src="/assets/media/peak.jpg" alt="" /><span class="veil veil-vignette"></span><span class="veil-caption t-label">vignette</span></div>
  <div class="poster"><img src="/assets/media/peak.jpg" alt="" /><span class="veil veil-letterbox"></span><span class="veil-caption t-label">letterbox</span></div>
  <div class="poster"><img src="/assets/media/peak.jpg" alt="" /><span class="veil veil-spot"></span><span class="veil-caption t-label">spot</span></div>
  <div class="poster"><img src="/assets/media/peak.jpg" alt="" /><span class="veil veil-scan"></span><span class="veil-caption t-label">scan</span></div>
  <div class="poster"><img src="/assets/media/peak.jpg" alt="" /><span class="veil veil-grain"></span><span class="veil-caption t-label">grain</span></div>
</div>
:::

- **vignette** — the edges fall away. The lens, not the scene.
- **letterbox** — black bars top and bottom. The frame is now 2.39:1 whatever
  the file says.
- **spot** — a stage light from above; everything else in shadow.
- **scan** — the tape. Pairs with [`.ix-scan`](/interactions.html) for the
  moving version.
- **grain** — film. The most useful of the five, because it hides the banding
  a gradient leaves on a dark photograph.

## The grade — pulling a stranger's photo into the palette

This is the one that earns the whole file. A creator's page uses photographs
they did not shoot, in colours nobody chose, and these four make them belong.

:::demo Same photograph, four grades
<div class="grid-auto grid-auto-sm">
  <div class="poster"><img src="/assets/media/night.jpg" alt="" /><span class="veil-caption t-label">— none —</span></div>
  <div class="poster"><img src="/assets/media/night.jpg" alt="" /><span class="veil veil-grade"></span><span class="veil-caption t-label">grade</span></div>
  <div class="poster"><img src="/assets/media/night.jpg" alt="" /><span class="veil veil-tint"></span><span class="veil-caption t-label">tint</span></div>
  <div class="poster"><img src="/assets/media/night.jpg" alt="" /><span class="veil veil-craft"></span><span class="veil-caption t-label">craft</span></div>
  <div class="poster"><img src="/assets/media/night.jpg" alt="" /><span class="veil veil-ink"></span><span class="veil-caption t-label">ink</span></div>
  <div class="poster veil-mono"><img src="/assets/media/night.jpg" alt="" /><span class="veil-caption t-label">mono*</span></div>
</div>
:::

`veil-mono` is the odd one out: it is a **filter on the parent**, not a layer,
because desaturation has to happen to the pixels rather than over them. That is
why it goes on the `.poster` and not on a `<span>` inside it.

:::demo The travel strip, graded — mono, then the accent grade over it
<div class="reel" style="--reel-item: 14rem">
  <a class="poster poster-square veil-mono" href="#i"><img src="/assets/media/coast.jpg" alt="" /><span class="veil veil-grade"></span><span class="veil veil-scrim"></span><span class="poster__label"><span class="poster__eyebrow">Lisbon</span><span class="poster__title">The tram episode</span></span></a>
  <a class="poster poster-square veil-mono" href="#i"><img src="/assets/media/peak.jpg" alt="" /><span class="veil veil-grade"></span><span class="veil veil-scrim"></span><span class="poster__label"><span class="poster__eyebrow">Ladakh</span><span class="poster__title">On film</span></span></a>
  <a class="poster poster-square veil-mono" href="#i"><img src="/assets/media/city.jpg" alt="" /><span class="veil veil-grade"></span><span class="veil veil-scrim"></span><span class="poster__label"><span class="poster__eyebrow">Kyoto</span><span class="poster__title">Eleven mornings</span></span></a>
  <a class="poster poster-square veil-mono" href="#i"><img src="/assets/media/road.jpg" alt="" /><span class="veil veil-grade"></span><span class="veil veil-scrim"></span><span class="poster__label"><span class="poster__eyebrow">Hampi</span><span class="poster__title">Boulders</span></span></a>
</div>
:::

Four photographs by four strangers, and they now look like one trip. That is
the entire argument for a grade.

## Stacking

Veils are elements, so they compose in **source order** — later ones paint on
top. The order that matters is: grade first, then texture, then scrim last, so
the scrim is darkening the graded picture rather than being graded itself.

:::demo One veil, two veils, three
<div class="grid-3">
  <div class="poster"><img src="/assets/media/studio.jpg" alt="" /><span class="veil veil-grade"></span><span class="veil-caption t-label">grade</span></div>
  <div class="poster"><img src="/assets/media/studio.jpg" alt="" /><span class="veil veil-grade"></span><span class="veil veil-grain"></span><span class="veil-caption t-label">grade + grain</span></div>
  <div class="poster"><img src="/assets/media/studio.jpg" alt="" /><span class="veil veil-grade"></span><span class="veil veil-grain"></span><span class="veil veil-scrim"></span><span class="veil-caption t-label">grade + grain + scrim</span></div>
</div>
:::

```html
<div class="poster">
  <img src="…" alt="" />
  <span class="veil veil-grade"></span>   <!-- 1 · colour -->
  <span class="veil veil-grain"></span>   <!-- 2 · texture -->
  <span class="veil veil-scrim"></span>   <!-- 3 · legibility -->
  <span class="poster__label">…</span>
</div>
```

## Glass — the panel that sits on footage

A veil grades the picture. Glass is a **surface** that floats *over* it, and it
only makes sense over something with detail — glass on a flat colour is a
slightly different flat colour, which is why the demo below is over a
photograph and not over a swatch.

:::demo Four dresses, over the same frame
<div class="poster" style="--ratio: 21 / 9">
  <img src="/assets/media/desk.jpg" alt="" />
  <div class="cluster cluster-center u-p-6" style="position: absolute; inset: 0; align-content: center">
    <span class="glass u-p-4 u-rounded-lg">glass</span>
    <span class="glass glass-dark u-p-4 u-rounded-lg">glass-dark</span>
    <span class="glass glass-light u-p-4 u-rounded-lg">glass-light</span>
    <span class="glass glass-flat u-p-4 u-rounded-lg">glass-flat</span>
    <span class="glass glass-pill glass-sm">glass-pill</span>
  </div>
</div>
:::

`glass-flat` drops the blur, and it is the one to reach for in a **list**: a
blur is a compositor layer, and twenty of them on one page is a scroll that
stutters on a phone. `glass-sm` is the smaller padding; `glass-pill` rounds it
fully, for a tag over a thumbnail.

## The rules

- A veil is a **child**, so it never competes for a pseudo-element. `.frame`
  needs both of its; `.pattern` needs one. A veil needs neither.
- The parent must be positioned. `.poster`, `.card__media` and `.player`
  already are; a bare `<div>` needs `u-relative`.
- Veils are `pointer-events: none`, so a link under one still works.
- `veil-mono` is a filter on the parent, not a layer.
- Everything here is built from tokens, so a veil follows a theme change and a
  re-accent without being touched.
