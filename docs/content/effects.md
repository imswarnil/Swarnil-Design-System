---
title: Effects & interactions
group: Elements
order: 60
lead: Transitions, hover answers, entrances, scroll-driven reveals and the few ambient moves a creator's page is allowed — three registers, kept apart.
---

[Motion](/motion.html) owns the vocabulary: durations, curves, the base
keyframes and the first `fx-*` sentences. This page is the rest of the
language, in three registers that must not be confused.

| Prefix | Register | Rule |
| --- | --- | --- |
| `tr-*` | **transition** — how a change will feel | adds nothing visible on its own |
| `ix-*` | **interaction** — the hover or focus answer | one property, under 200ms, guarded by `(hover: hover)` |
| `fx-*` | **effect** — an entrance, a reveal, an ambient move | `both`, so the resting state is the finished state |

Everything is off under `prefers-reduced-motion`. Entrances collapse to the
1ms token; the ambient ones are told explicitly, because a slow loop cannot
lean on a token that collapses.

## Transitions

Named bundles of the properties that may move, so a component says *which*
instead of reaching for `all`. Toggle the theme to see `tr-colors` at work on
the first box.

:::demo
<div class="cluster">
  <span class="tr-colors u-p-3 u-border u-rounded bg-surface">tr-colors</span>
  <span class="tr-transform u-p-3 u-border u-rounded ix-raise">tr-transform</span>
  <span class="tr-shadow u-p-3 u-border u-rounded">tr-shadow</span>
  <span class="tr-opacity u-p-3 u-border u-rounded">tr-opacity</span>
  <span class="tr-size u-p-3 u-border u-rounded">tr-size</span>
  <span class="tr-all u-p-3 u-border u-rounded">tr-all</span>
  <span class="tr-colors tr-fast u-p-3 u-border u-rounded">tr-fast</span>
  <span class="tr-colors tr-slow u-p-3 u-border u-rounded">tr-slow</span>
</div>
:::

## Interactions

Hover the cards. Each answers with one property.

:::demo Raise, glow, tilt
<div class="grid-3">
  <article class="card ix-raise"><div class="card__body"><p class="card__kicker">ix-raise</p><p class="card__excerpt">Steps toward you; the shadow follows.</p></div></article>
  <article class="card ix-glow"><div class="card__body"><p class="card__kicker">ix-glow</p><p class="card__excerpt">The accent ring lights up at the edge.</p></div></article>
  <article class="card ix-tilt"><div class="card__body"><p class="card__kicker">ix-tilt</p><p class="card__excerpt">A degree and a half — a poster picked up.</p></div></article>
</div>
:::

:::demo Zoom, shine, reveal — for media
<div class="grid-3">
  <div class="poster ix-zoom"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23555'/%3E%3Cstop offset='1' stop-color='%23111'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3Ccircle cx='11' cy='4' r='2.2' fill='%23888'/%3E%3C/svg%3E" alt="" /><div class="poster__label"><span class="poster__eyebrow">ix-zoom</span></div></div>
  <div class="poster ix-shine bg-ink"><div class="poster__label"><span class="poster__eyebrow">ix-shine</span></div></div>
  <div class="poster ix-reveal bg-ink">
    <div class="poster__label"><span class="poster__eyebrow">ix-reveal</span><span class="poster__title">Hover for the actions</span></div>
    <div class="ix-reveal__hidden glass glass-dark u-p-3 cluster cluster-sm" style="border-radius: 0">
      <button class="btn btn-sm btn-primary" type="button">Play</button>
      <button class="btn btn-sm btn-ghost" type="button">Save</button>
    </div>
  </div>
</div>
:::

:::demo Underline, arrow, dim, colour
<div class="stack">
  <p class="u-m-0"><a class="ix-underline" href="#i">The underline draws itself in from the start</a> · <a class="ix-arrow btn btn-link" href="#i">Read the post <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg></a></p>
  <div class="cluster ix-dim">
    <span class="badge badge-outline">Hover one</span><span class="badge badge-outline">and the</span><span class="badge badge-outline">others</span><span class="badge badge-outline">step back</span>
  </div>
  <div class="cluster">
    <span class="ix-color avatar avatar-lg" style="background: var(--accent); color: var(--fg-on-accent)">A</span>
    <span class="ix-color avatar avatar-lg" style="background: var(--craft); color: var(--fg-on-accent)">B</span>
    <span class="ix-color avatar avatar-lg" style="background: var(--info-solid); color: var(--fg-on-accent)">C</span>
  </div>
</div>
:::

`ix-shine` uses `::after`, so it cannot share an element with `.frame` or
`[data-loading]` — put it on the media child. `ix-reveal` also opens on
`:focus-within`, so a keyboard user reaches the hidden row.

## Entrances

Reload the page to see them arrive. `both` holds the first frame before any
delay and the last frame after, so nothing flashes and nothing snaps back.

:::demo
<div class="grid-auto grid-auto-sm">
  <div class="fx-blur-in u-p-4 u-border u-rounded t-label">blur-in</div>
  <div class="fx-scale-in u-p-4 u-border u-rounded t-label">scale-in</div>
  <div class="fx-pop u-p-4 u-border u-rounded t-label">pop</div>
  <div class="fx-slide-start u-p-4 u-border u-rounded t-label">slide-start</div>
  <div class="fx-slide-end u-p-4 u-border u-rounded t-label">slide-end</div>
  <div class="fx-drop u-p-4 u-border u-rounded t-label">drop</div>
  <div class="fx-wipe u-p-4 u-border u-rounded t-label bg-accent">wipe</div>
</div>
:::

:::demo Choreography — delays by hand, or a slow stagger for a list
<div class="grid-2">
  <div class="stack stack-sm">
    <p class="fx-rise u-m-0 t-h3">Rolling…</p>
    <p class="fx-rise fx-delay-1 u-m-0 t-muted">one beat</p>
    <p class="fx-rise fx-delay-2 u-m-0 t-muted">two</p>
    <p class="fx-rise fx-delay-3 u-m-0 t-muted">three</p>
    <p class="fx-rise fx-delay-4 u-m-0 t-muted">four</p>
    <p class="fx-rise fx-delay-5 u-m-0 t-muted">five</p>
  </div>
  <ul class="list fx-stagger-slow">
    <li class="list__item">Camera</li>
    <li class="list__item">Lights</li>
    <li class="list__item">Sound</li>
    <li class="list__item">Action</li>
  </ul>
</div>
:::

## Typed

The title card that was just typed. Set `--chars` to the length; the caret
sits on the last letter.

:::demo
<p class="t-h2 u-m-0"><span class="fx-type" style="--chars: 22">Rolling in five, four…</span></p>
:::

## Scroll-driven

`animation-timeline: view()` ties the reveal to the element's own position in
the scrollport — no IntersectionObserver, no script. Scroll this page slowly
and the boxes arrive as they enter. Browsers without support get the resting
state, which is the right fallback.

:::demo
<div class="grid-auto grid-auto-sm">
  <div class="fx-scroll-rise u-p-4 u-border u-rounded t-label">scroll-rise</div>
  <div class="fx-scroll-fade u-p-4 u-border u-rounded t-label">scroll-fade</div>
  <div class="fx-scroll-scale u-p-4 u-border u-rounded t-label">scroll-scale</div>
  <div class="fx-scroll-wipe u-p-4 u-border u-rounded t-label bg-accent">scroll-wipe</div>
</div>
:::

:::demo Parallax — the picture drifts more slowly than the page
<div class="fx-parallax ratio ratio-wide u-rounded-lg u-overflow-hidden" style="--parallax: 8%">
  <div class="bg-aurora pattern pattern-grid" style="height: 130%; margin-top: -15%"></div>
</div>
:::

`fx-scroll-progress` is a page progress bar: a fixed 2px rule whose width is
the scroll position. Drop one element in the page and it works.

```html
<div class="fx-scroll-progress" aria-hidden="true"></div>
```

<div class="fx-scroll-progress" aria-hidden="true"></div>

## Ambient

The allowance is narrow — slow, one property, gone under reduced motion, and
only on a hero, a poster or a scene. Never on a control.

:::demo Float, shimmer, beacon
<div class="cluster cluster-lg">
  <span class="fx-float u-p-4 u-border u-rounded-lg u-shadow-2 t-label">float</span>
  <span class="fx-shimmer t-h1">Shimmer</span>
  <span class="fx-beacon dot dot-lg dot-accent"></span>
</div>
:::

:::demo Ken Burns, scan, glitch
<div class="grid-3">
  <div class="poster fx-kenburns"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23222'/%3E%3Ccircle cx='5' cy='5' r='3' fill='%23555'/%3E%3Crect x='9' y='2' width='6' height='5' fill='%23444'/%3E%3C/svg%3E" alt="" /></div>
  <div class="poster fx-scan bg-ink"><div class="poster__label"><span class="poster__eyebrow">fx-scan</span></div></div>
  <div class="poster bg-ink" style="display: grid; place-items: center"><span class="fx-glitch t-h2" data-text="GLITCH" style="color: var(--pure-white)">GLITCH</span></div>
</div>
:::

## Counting up

A registered integer animates and a CSS counter prints it, so a stat counts
from zero without a script. The real number is in the markup for assistive
tech; the `::after` is what animates.

:::demo
<div class="stats">
  <div class="stats__item"><span class="t-stat fx-count" style="--fx-target: 128" aria-label="128"></span><span class="stats__label">Episodes</span></div>
  <div class="stats__item"><span class="t-stat fx-count" style="--fx-target: 42" aria-label="42"></span><span class="stats__label">Countries</span></div>
  <div class="stats__item"><span class="t-stat fx-count" style="--fx-target: 9" aria-label="9"></span><span class="stats__label">Years</span></div>
</div>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--chars` | on `fx-type`: the number of characters to type |
| `--type-dur` | on `fx-type`: how long the line takes |
| `--parallax` | on `fx-parallax`: how far the child drifts |
| `--fx-target` | on `fx-count`: the number to count to |
