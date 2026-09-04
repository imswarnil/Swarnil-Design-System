---
title: Deck
group: Patterns
order: 10
lead: A grid that knows its children are cards — density, the feature slot, and level footers.
---

`.grid-auto` arranges boxes; `.deck` arranges **cards**. It sets card-sized
column floors, and because cards pin their footers with `margin-block-start:
auto`, a deck's bottom edges stay level whatever the text lengths do.

## Default and density

:::demo
<div class="deck">
  <article class="card"><div class="card__body"><p class="card__kicker">Ep. 45</p><h3 class="card__title"><a class="card__link" href="#i">The colour rebuild</a></h3></div></article>
  <article class="card"><div class="card__body"><p class="card__kicker">Ep. 46</p><h3 class="card__title"><a class="card__link" href="#i">Mono is a signal</a></h3></div></article>
  <article class="card"><div class="card__body"><p class="card__kicker">Ep. 47</p><h3 class="card__title"><a class="card__link" href="#i">The frame layer</a></h3></div></article>
</div>
:::

`deck-dense` drops the floor to 13rem for poster walls; `deck-wide` raises it
to 22rem for editorial rows.

## The feature slot

The one editorial move a plain grid cannot make: the lead story spans two
tracks, and collapses back to one where two do not exist.

:::demo
<div class="deck deck-feature">
  <article class="card card-accent"><div class="card__media pattern pattern-scan"></div><div class="card__body"><p class="card__kicker">Featured</p><h3 class="card__title"><a class="card__link" href="#i">The lead story spans two</a></h3></div></article>
  <article class="card"><div class="card__body"><h3 class="card__title"><a class="card__link" href="#i">Second</a></h3></div></article>
  <article class="card"><div class="card__body"><h3 class="card__title"><a class="card__link" href="#i">Third</a></h3></div></article>
</div>
:::

## With content types

A deck of `card-movie` is a poster wall; a deck of `card-reel` is a shorts
shelf — the pattern does not care, because the ratio lives on the card.

| Knob | Does |
| --- | --- |
| `--deck-col` | column floor |
| `--deck-gap` | gutter |
