---
title: Frames
group: Foundation
order: 50
lead: Containers that say what a thing is before you read it.
---

A window says **app**. A terminal says **command**. A viewfinder says **footage**.
The reader knows what they are looking at before reading a word — that is the
argument, and it is why these are used to mean, not to decorate.

## Corner brackets

:::demo Two corners, or four
<div class="cluster cluster-lg">
  <div class="box frame"></div>
  <div class="box frame frame-signal">
    <span class="frame__tr"></span><span class="frame__bl"></span>
  </div>
</div>
:::

`.frame` paints two corners on its own pseudo-elements. Two corner spans add the other
two, which have to be real spans because an element only has two pseudo-elements.

## Sizes and colours

:::demo
<div class="cluster cluster-lg">
  <div class="box frame frame-sm frame-ink"></div>
  <div class="box frame"></div>
  <div class="box frame frame-lg frame-signal"></div>
</div>
:::

Craft amber is the default: a static frame is construction, not urgency. The
accent is for things that respond to you.

## The frame as an interaction

`.frame-hover` is the viewfinder as behaviour — the brackets are absent, then
close in on the thing you point at. The camera finding focus.

:::demo Hover the box, or tab to the button
<div class="cluster cluster-lg">
  <div class="box box-lg box-label frame frame-hover frame-signal">
    <span class="frame__tr"></span><span class="frame__bl"></span>
    Point at me
  </div>
  <button class="btn btn-outline frame frame-sm frame-hover">Tab to me</button>
</div>
:::

Four decisions are inside that:

- **`translate`, not `transform`** — `transform` is one property holding a list, so animating it overwrites any rotate or scale already there. `translate` is its own property, so a tilted card keeps its tilt.
- **`:focus-visible` and `:focus-within`** — the first covers a button being tabbed to, the second a card whose real tab stop is the link inside it. Both are required, because the brackets are the *only* feedback.
- **A touch fallback** — `@media (hover: none)` shows them outright. On a phone a hover-only affordance is invisible, then sticks after a tap.
- **Reduced motion keeps the reveal, drops the travel** — the user asked not to be moved, not to be uninformed.

## Frame types

:::demo Blink — the REC brackets. Dashed — the crop proposal.
<div class="cluster cluster-lg">
  <div class="box frame frame-signal frame-blink"><span class="frame__tr"></span><span class="frame__bl"></span></div>
  <div class="box frame frame-dashed"><span class="frame__tr"></span><span class="frame__bl"></span></div>
  <div class="box frame frame-ink"><span class="frame__tr"></span><span class="frame__bl"></span></div>
</div>
:::

`.frame-blink` pulses like a record indicator: something is being captured
**right now**. Reserve it for genuinely live things — a blinking frame on
static content is a false alarm, and false alarms train readers to ignore true
ones. `.frame-dashed` reads as *proposed, not committed* — a marquee before the
crop lands. Under reduced motion the blink stops; the geometry stays.

## Composition warning

`.frame` and `.pattern` both paint on `::before`, and an element has exactly one.
They cannot share an element — put the pattern on a child or a parent.

This is not a theoretical caution. Both selectors are one class deep, so
specificity ties and **source order alone decides the winner**. Renumbering a
file has silently swapped which one rendered.

:::demo Pattern on a child, brackets on the parent
<div class="box box-lg frame u-relative">
  <span class="frame__tr"></span><span class="frame__bl"></span>
  <div class="pattern pattern-hatch u-absolute u-inset-0"></div>
</div>
:::

## The viewfinder

:::demo
<div class="vf ratio ratio-photo u-border u-rounded-lg w-md">
  <span class="vf__tc">TAKE 47 · 00:12:47</span>
  <span class="vf__rec">REC</span>
  <span class="vf__dims">1280 × 720 · 16:9</span>
</div>
:::

Everything in that frame is data, so all of it is mono. That is the mono voice
doing its actual job.

## Window chrome

:::demo
<div class="stack stack-lg">
  <div class="win win-color w-md">
    <div class="win__bar"><span class="win__dots"><span></span><span></span><span></span></span><span class="win__title">Preview</span></div>
    <div class="win__body t-small t-muted">A window says: this is an app.</div>
  </div>
  <div class="win w-md">
    <div class="win__bar"><span class="win__dots"><span></span><span></span><span></span></span></div>
    <div class="win-term__body"><span class="win-term__prompt">npm install @imswarnil/swarnil-design</span><span class="win-term__cursor"></span></div>
  </div>
</div>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--frame-size` | Bracket arm length |
| `--frame-inset` | Distance from the edge |
| `--frame-weight` | Stroke width |
| `--frame-color` | Bracket colour |
| `--frame-travel` | How far the brackets travel on hover |
