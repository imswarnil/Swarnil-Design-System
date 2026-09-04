---
title: Motion
group: Foundation
order: 45
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
