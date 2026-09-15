---
title: Effects
group: Foundation
order: 50
lead: Transitions, entrances, scroll-driven reveals, drawn marks and the few ambient moves a creator's page is allowed. Things the page decides to do.
---

[Motion](/motion.html) owns the vocabulary: durations, curves and the base
keyframes. This page is what the page decides to **do** with them.

The distinction that splits this page from
[Interactions](/interactions.html) is worth stating once, because getting it
wrong is how a design system ends up with forty animation classes:

- an **effect** happens because the page decided it should — it arrives, it
  reveals, it loops. Nobody asked for it.
- an **interaction** happens because a person pointed at something, and it is
  over the moment they point somewhere else.

They live in separate files for the same reason. Two registers here:

| Prefix | Register | Rule |
| --- | --- | --- |
| `tr-*` | **transition** — how a change will feel | adds nothing visible on its own |
| `fx-*` | **effect** — an entrance, a reveal, a drawn mark, an ambient loop | `both`, so the resting state is the finished state |

Everything is off under `prefers-reduced-motion`. Entrances collapse to the
1ms token; the ambient ones are told explicitly, because a slow loop cannot
lean on a token that collapses.

## Transitions

Named bundles of the properties that may move, so a component says *which*
instead of reaching for `all`. Toggle the theme to see `tr-colors` at work on
the first box.

:::demo
<div class="cluster">
  <span class="tr-colors p-3 hairline rounded-md bg-surface">tr-colors</span>
  <span class="tr-transform p-3 hairline rounded-md ix-raise">tr-transform</span>
  <span class="tr-shadow p-3 hairline rounded-md">tr-shadow</span>
  <span class="tr-opacity p-3 hairline rounded-md">tr-opacity</span>
  <span class="tr-size p-3 hairline rounded-md">tr-size</span>
  <span class="tr-all p-3 hairline rounded-md">tr-all</span>
  <span class="tr-colors tr-fast p-3 hairline rounded-md">tr-fast</span>
  <span class="tr-colors tr-slow p-3 hairline rounded-md">tr-slow</span>
</div>
:::

## Entrances

Reload the page to see them arrive. `both` holds the first frame before any
delay and the last frame after, so nothing flashes and nothing snaps back.

:::demo
<div class="grid-auto grid-auto-sm">
  <div class="fx-blur-in p-4 hairline rounded-md t-label">blur-in</div>
  <div class="fx-scale-in p-4 hairline rounded-md t-label">scale-in</div>
  <div class="fx-pop p-4 hairline rounded-md t-label">pop</div>
  <div class="fx-slide-start p-4 hairline rounded-md t-label">slide-start</div>
  <div class="fx-slide-end p-4 hairline rounded-md t-label">slide-end</div>
  <div class="fx-drop p-4 hairline rounded-md t-label">drop</div>
  <div class="fx-wipe p-4 hairline rounded-md t-label bg-accent">wipe</div>
</div>
:::

:::demo Choreography — delays by hand, or a slow stagger for a list
<div class="grid-2">
  <div class="stack stack-sm">
    <p class="fx-rise m-0 t-h3">Rolling…</p>
    <p class="fx-rise fx-delay-1 m-0 t-muted">one beat</p>
    <p class="fx-rise fx-delay-2 m-0 t-muted">two</p>
    <p class="fx-rise fx-delay-3 m-0 t-muted">three</p>
    <p class="fx-rise fx-delay-4 m-0 t-muted">four</p>
    <p class="fx-rise fx-delay-5 m-0 t-muted">five</p>
  </div>
  <ul class="list fx-stagger-slow">
    <li class="list__item">Camera</li>
    <li class="list__item">Lights</li>
    <li class="list__item">Sound</li>
    <li class="list__item">Action</li>
  </ul>
</div>
:::

### Three more arrivals

Each covers something the first six do not. `fx-flip-in` is the only entrance
with perspective, so it reads as an **object** turning rather than a layer
fading. `fx-unfold` opens from the middle outward, for a band that should feel
like it was always there and is being revealed. `fx-settle` starts slightly too
large and comes to rest — the opposite of `scale-in`, and the right one when
the element is already the subject: it does not approach, it focuses.

:::demo Reload the page to run them
<div class="grid-3 cq-card">
  <article class="card fx-flip-in"><div class="card__media"><img src="/assets/media/desk.jpg" alt="" /></div><div class="card__body"><p class="card__kicker">fx-flip-in</p><p class="card__excerpt">Turns on the X axis — face-down to face-up.</p></div></article>
  <article class="card fx-unfold"><div class="card__media"><img src="/assets/media/city.jpg" alt="" /></div><div class="card__body"><p class="card__kicker">fx-unfold</p><p class="card__excerpt">Opens from the middle outward.</p></div></article>
  <article class="card fx-settle"><div class="card__media"><img src="/assets/media/coast.jpg" alt="" /></div><div class="card__body"><p class="card__kicker">fx-settle</p><p class="card__excerpt">Starts too large and comes to rest.</p></div></article>
</div>
:::

## Typed

The title card that was just typed. Set `--chars` to the length; the caret
sits on the last letter.

:::demo
<p class="t-h2 m-0"><span class="fx-type" style="--chars: 22">Rolling in five, four…</span></p>
:::

## Scroll-driven

`animation-timeline: view()` ties the reveal to the element's own position in
the scrollport — no IntersectionObserver, no script. Scroll this page slowly
and the boxes arrive as they enter. Browsers without support get the resting
state, which is the right fallback.

:::demo
<div class="grid-auto grid-auto-sm">
  <div class="fx-scroll-rise p-4 hairline rounded-md t-label">scroll-rise</div>
  <div class="fx-scroll-fade p-4 hairline rounded-md t-label">scroll-fade</div>
  <div class="fx-scroll-scale p-4 hairline rounded-md t-label">scroll-scale</div>
  <div class="fx-scroll-wipe p-4 hairline rounded-md t-label bg-accent">scroll-wipe</div>
</div>
:::

:::demo Parallax — the picture drifts more slowly than the page
<div class="fx-parallax ratio ratio-wide rounded-lg overflow-hidden" style="--parallax: 8%">
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
  <span class="fx-float p-4 hairline rounded-lg shadow-2 t-label">float</span>
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

### Three more loops

Same budget as the rest: slow, one property, gone under reduced motion.

`fx-breathe` is a scale that never resolves — for a thing that is **waiting**,
the way a record light waits. Never put it on a control: something interactive
that breathes reads as something that is loading. `fx-swing` hinges at the top,
for a hanging sign or a badge on a ribbon. `fx-drift` is a slow horizontal
wander for a background object that should not feel placed.

:::demo
<div class="grid-3 text-center">
  <div class="p-(--space-8) rounded-lg hairline"><span class="badge badge-live fx-breathe">Waiting</span><p class="t-fine t-muted mt-4 m-0">fx-breathe</p></div>
  <div class="p-(--space-8) rounded-lg hairline"><span class="fx-swing inline-block"><svg class="icon icon-xl" aria-hidden="true"><use href="/icons/sprite.svg#i-clapperboard"/></svg></span><p class="t-fine t-muted mt-4 m-0">fx-swing</p></div>
  <div class="p-(--space-8) rounded-lg hairline overflow-hidden"><span class="fx-drift inline-block"><svg class="icon icon-xl" aria-hidden="true"><use href="/icons/sprite.svg#i-plane"/></svg></span><p class="t-fine t-muted mt-4 m-0">fx-drift</p></div>
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
