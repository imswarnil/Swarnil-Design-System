---
title: Card
group: Components
order: 20
lead: One card. The variants change its shape and its hover answer, never its parts.
---

:::demo
<article class="card w-sm">
  <div class="card__body">
    <p class="card__meta">Build log · 12 Feb</p>
    <h3 class="card__title"><a class="card__link" href="#i">Rebuilding the docs engine</a></h3>
    <p class="card__excerpt">Six thousand lines of HTML inside Python strings, and what replaced them.</p>
  </div>
</article>
:::

The whole card is clickable, but the `<a>` stays on the title so the accessible
name and the tab stop are right — its `::after` covers the card. One stretched
link per card; a second one is unreachable by keyboard.

## Hover answers

A card gets exactly one hover answer. Two is a card that cannot decide what it is.

:::demo Lift on the left, brackets on the right
<div class="cluster cluster-top">
  <article class="card card-hover-lift w-xs">
    <div class="card__body">
      <p class="card__meta">.card-hover-lift</p>
      <h3 class="card__title"><a class="card__link" href="#i">It lifts</a></h3>
    </div>
  </article>
  <article class="card card-hover-frame frame frame-4 frame-hover w-xs">
    <span class="frame__tr"></span><span class="frame__bl"></span>
    <div class="card__body">
      <p class="card__meta">.card-hover-frame</p>
      <h3 class="card__title"><a class="card__link" href="#i">It brackets</a></h3>
    </div>
  </article>
</div>
:::

`.card-hover-frame` turns the lift off — the brackets *are* the feedback. The
brackets themselves come from the foundation by composition, which keeps the
variant at three declarations instead of duplicating forty:

```html
<article class="card card-hover-frame frame frame-4 frame-hover">
  <span class="frame__tr"></span><span class="frame__bl"></span>
  …
</article>
```

## Shape

:::demo
<div class="cluster cluster-top">
  <article class="card card-compact w-xs">
    <div class="card__body"><p class="card__meta">Compact</p>
    <h3 class="card__title"><a class="card__link" href="#i">Dense rails</a></h3></div>
  </article>
  <article class="card card-bare w-xs">
    <div class="card__body"><p class="card__meta">Bare</p>
    <h3 class="card__title"><a class="card__link" href="#i">No chrome at all</a></h3></div>
  </article>
  <article class="card card-quiet w-xs">
    <div class="card__body"><p class="card__meta">Quiet</p>
    <h3 class="card__title"><a class="card__link" href="#i">A softer edge</a></h3></div>
  </article>
</div>
:::

## Emphasis

:::demo
<div class="cluster cluster-top">
  <article class="card card-accent w-xs">
    <div class="card__body"><p class="card__meta">Accent</p>
    <h3 class="card__title">The edge carries it</h3></div>
  </article>
  <article class="card card-raised w-xs">
    <div class="card__body"><p class="card__meta">Raised</p>
    <h3 class="card__title">Depth, not a border</h3></div>
  </article>
  <article class="card card-inverse w-xs">
    <div class="card__body"><p class="card__meta">Inverse</p>
    <h3 class="card__title">Ink and paper flip</h3></div>
  </article>
</div>
:::

`.card-raised` uses `--elevation-2`, which resolves to a shadow in light and a
lighter surface with a translucent hairline in dark. The card asks for depth and
never for a shadow.

## Responsive

`.card-row` collapses to stacked using a **container query**, not a media query.
A card in a 300px sidebar and a card in a 300px grid slot are the same card and
must look identical — only a container query can express that. Put `.cq-card` on
the ancestor whose width matters.

## Properties

| Variable | Does |
| --- | --- |
| `--card-pad` | Body padding |
| `--card-radius` | Corner radius |
| `--card-bg` | Surface |
| `--card-line` | Border colour |
| `--card-gap` | Gap between body parts |
