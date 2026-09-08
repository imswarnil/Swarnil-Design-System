---
title: Motion
group: Foundation
order: 50
lead: Five durations, four curves, honest by contract — and off entirely when the reader asks.
---

Motion here is a budget, not a mood. Feedback lands under 200ms, one property
moves at a time, and the finished state is the resting state — nothing is
unreachable if an animation never runs.

## The tokens

| Token | Value | For |
| --- | --- | --- |
| `--dur-1` | 60ms | a colour change you should not notice |
| `--dur-2` | 120ms | hover, focus |
| `--dur-3` | 200ms | **the feedback ceiling** |
| `--dur-4` | 320ms | something entering the page |
| `--dur-5` | 480ms | a full panel; the slowest thing allowed |

Curves: `--ease-out` (arrivals), `--ease-inout` (loops), `--ease-snap`
(controls), `--ease-overshoot` (rationed).

**The contract:** under `prefers-reduced-motion` every duration token collapses
to 1ms globally — so no component ever writes its own motion query, and none
can forget to.

## Entrances

:::demo Reload this page to catch them again
<div class="cluster">
  <span class="badge badge-accent fx-rise">.fx-rise</span>
  <span class="badge badge-accent fx-fade">.fx-fade</span>
</div>
:::

:::demo .fx-stagger — each child one beat behind the last
<div class="cluster fx-stagger">
  <span class="chip">one</span>
  <span class="chip">two</span>
  <span class="chip">three</span>
  <span class="chip">four</span>
</div>
:::

`both` fill keeps the first frame, so nothing flashes unstyled before the
animation starts.

## Micro-interactions

:::demo
<div class="cluster cluster-lg">
  <button class="btn btn-outline fx-lift" type="button">.fx-lift</button>
  <button class="btn btn-primary fx-press" type="button">.fx-press</button>
  <span class="dot dot-lg dot-accent fx-pulse"></span>
  <span class="spinner"></span>
</div>
:::

`.fx-lift` is guarded behind `(hover: hover)` — touch has no hover to un-lift,
and a stuck lift reads as a broken button. `.fx-press` acknowledges the click
in the finger: scale 0.97, 60ms, done.

## Text animations

:::demo Reload to catch the tracking-in
<div class="stack">
  <p class="t-h3 fx-tracking-in u-m-0">The title card settles</p>
  <p class="t-mono u-m-0 fx-caret">$ npm run build</p>
</div>
:::

`.fx-tracking-in` is the title-card move — letters settle from too-wide into
place, once, on entry. `.fx-caret` appends the terminal cursor for a line that
"was just typed". Both are rationed like the accent: one animated line per
view, or neither reads as special.

## Page transitions

One rule opts the whole site into animated navigation:

```css
@view-transition { navigation: auto; }
```

The browser snapshots the old and new page and cross-fades them — you are
watching it work as you click through these docs. The default is a fast fade
**on purpose**: a fade never claims spatial relationships the pages do not
have, where a slide claims a geography that navigating sideways would
contradict. Browsers without support get an instant navigation — the correct
fallback, not a missing feature.

Under reduced motion the transition is off entirely.

## The keyframe vocabulary

Named once in the foundation, reused everywhere: `fx-rise`, `fx-fade`,
`fx-pulse`, `fx-blink`, `fx-spin`, `skeleton-sweep`, `progress-sweep`. Before
writing a new keyframe, check the idea is not already one of these wearing a
different name — a motion vocabulary only stays a vocabulary while it is
short.

## What is deliberately absent

Parallax, scroll-jacking, bounce-on-everything, attention loops on things that
are not live. The record dot pulses because *live* is the one meaning worth an
infinite loop; a second looping element on the page would compete with it, and
the accent does not share.

## Micro-interactions, side by side

The vocabulary above is abstract until you see two of them next to each other
and notice that one of them is wrong for the job. This is the whole set a page
actually uses, live, at the size it is used.

**Hover something once and the rule becomes obvious:** feedback is under
200ms, an entrance is under 400ms, and anything ambient is over 6 seconds.
There is nothing in between, because the middle is where motion stops reading
as either response or atmosphere and starts reading as lag.

:::demo Feedback — under 200ms, one property, on a control
<div class="cluster cluster-lg">
  <button class="btn btn-primary" type="button">Press me — scale 0.98</button>
  <button class="btn btn-outline btn-fill" type="button">Fill</button>
  <button class="btn btn-secondary btn-lift" type="button">Lift</button>
  <button class="btn btn-primary btn-ring" type="button">Ring</button>
  <a class="btn btn-ghost ix-arrow" href="#i">Arrow <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg></a>
  <a class="ix-underline" href="#i">Underline</a>
</div>
:::

:::demo Attention on a surface — still feedback, but the object is bigger, so it may take longer
<div class="grid-3 cq-card">
  <article class="card card-hover-lift"><div class="card__media"><img src="/assets/media/desk.jpg" alt="" /></div><div class="card__body"><h4 class="card__title">Lift</h4><p class="card__excerpt">Rest to hover is one rung of elevation.</p></div></article>
  <article class="card card-hover-zoom"><div class="card__media"><img src="/assets/media/city.jpg" alt="" /></div><div class="card__body"><h4 class="card__title">Zoom</h4><p class="card__excerpt">Only the picture moves; the box stays put.</p></div></article>
  <article class="card card-hover-frame frame-hover"><div class="card__media"><img src="/assets/media/road.jpg" alt="" /></div><div class="card__body"><h4 class="card__title">Frame</h4><p class="card__excerpt">The brackets ARE the feedback, so nothing lifts.</p></div></article>
</div>
:::

:::demo On footage — the scan, the shine, the reveal, the grade
<div class="grid-2">
  <figure class="figure u-m-0 ix-scan u-rounded-lg"><img src="/assets/media/studio.jpg" alt="" /><figcaption class="figure__caption">ix-scan</figcaption></figure>
  <figure class="figure u-m-0 ix-shine u-rounded-lg"><img src="/assets/media/coast.jpg" alt="" /><figcaption class="figure__caption">ix-shine</figcaption></figure>
  <figure class="figure u-m-0 ix-color u-rounded-lg"><img src="/assets/media/peak.jpg" alt="" /><figcaption class="figure__caption">ix-color — grey until touched</figcaption></figure>
  <div class="ix-reveal u-rounded-lg u-overflow-hidden"><img src="/assets/media/night.jpg" alt="" style="display:block;width:100%" /><div class="ix-reveal__hidden u-p-4" style="background: var(--bg-scrim); color: var(--pure-white)"><span class="t-small">ix-reveal — the caption arrives on hover</span></div></div>
</div>
:::

:::demo Ambient — over six seconds, and off under reduced motion
<div class="grid-3">
  <div class="bg-ink bg-scanlines u-p-6 u-rounded-lg"><span class="t-data">bg-scanlines</span></div>
  <div class="bg-sunken bg-beams u-p-6 u-rounded-lg u-border"><span class="t-data">bg-beams</span></div>
  <div class="u-p-6 u-rounded-lg u-border u-text-center"><span class="fx-float u-iblock"><svg class="icon icon-xl" aria-hidden="true"><use href="/icons/sprite.svg#i-camera"/></svg></span><br /><span class="t-data">fx-float</span></div>
</div>
:::

:::demo The two that are neither — a state that is genuinely working, and one that is genuinely live
<div class="cluster cluster-lg">
  <button class="btn btn-primary" type="button" aria-busy="true">Uploading</button>
  <span class="spinner"></span>
  <span class="badge badge-live">Live</span>
  <span class="avatar avatar-live">S</span>
  <span class="dot dot-live"></span>
  <div class="buffer" style="inline-size: 10rem"><span></span></div>
</div>
:::

A pulse means **something is happening now**. Anything that pulses when nothing
is happening has spent the only signal the page had for when something is.
