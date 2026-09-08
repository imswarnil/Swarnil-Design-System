---
title: Kit
group: Patterns
order: 50
lead: The gear list. A category, a thing, one sentence on why, and a way to go and look at it.
---

"What do you use?" is the most-asked question a maker gets, and the answer is
always the same shape.

Not a table — a table implies you are comparing columns, and nobody is comparing
their own camera to their own microphone. Not a [deck](/deck.html) either: a
deck gives every item equal weight, and a gear list has an order (the camera
matters more than the SD cards).

So it is a list with a picture, and the **role leads**: a reader scanning for
"microphone" is scanning the left column, not the product names.

## The list

:::demo Ruled, so each row is separated without a box
<ul class="kit kit-ruled w-lg">
  <li class="kit__item">
    <span class="kit__shot"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-camera"/></svg></span>
    <div class="kit__body">
      <p class="kit__role">Camera</p>
      <h3 class="kit__name"><a class="kit__link" href="#i">Sony FX3</a></h3>
      <p class="kit__note">Full frame, no fan noise, and it does not overheat halfway through a take.</p>
    </div>
    <span class="kit__meta">₹2,40,000</span>
  </li>
  <li class="kit__item">
    <span class="kit__shot"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-focus"/></svg></span>
    <div class="kit__body">
      <p class="kit__role">Lens</p>
      <h3 class="kit__name"><a class="kit__link" href="#i">Sigma 24-70 f/2.8</a></h3>
      <p class="kit__note">One lens for the whole channel. Carrying four primes up a mountain is a bigger compromise.</p>
    </div>
    <span class="kit__meta">₹98,000</span>
  </li>
  <li class="kit__item">
    <span class="kit__shot"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-mic"/></svg></span>
    <div class="kit__body">
      <p class="kit__role">Audio</p>
      <h3 class="kit__name"><a class="kit__link" href="#i">Shure SM7B</a></h3>
      <p class="kit__note">Forgiving of a bad room, which is what every room I have filmed in has been.</p>
    </div>
    <span class="kit__meta">₹34,000</span>
  </li>
</ul>
:::

The photograph sits on a fixed square plate on a media ground, so a transparent
PNG from a manufacturer and a photograph shot on a desk land at the same size.
That is the whole reason `.kit__shot` exists rather than a bare `<img>`.

The link is stretched from the name, like the card's: the accessible name and
the tab stop stay on the title, and the whole row becomes the hit area.

## Numbered — the order is the argument

A counter, so the markup carries no numerals. An item that supplies a picture
keeps the picture; one mark per plate.

:::demo "The five things, in the order I would buy them again"
<ul class="kit kit-numbered kit-sm w-lg">
  <li class="kit__item"><span class="kit__shot"></span><div class="kit__body"><p class="kit__role">First</p><h3 class="kit__name"><a class="kit__link" href="#i">A microphone</a></h3><p class="kit__note">People forgive a soft picture. Nobody forgives bad sound.</p></div></li>
  <li class="kit__item"><span class="kit__shot"></span><div class="kit__body"><p class="kit__role">Second</p><h3 class="kit__name"><a class="kit__link" href="#i">One light</a></h3><p class="kit__note">Bounced off a wall you already own.</p></div></li>
  <li class="kit__item"><span class="kit__shot"></span><div class="kit__body"><p class="kit__role">Third</p><h3 class="kit__name"><a class="kit__link" href="#i">A tripod that locks</a></h3><p class="kit__note">The cheap one does not, and you will find out mid-take.</p></div></li>
</ul>
:::

## Boxed, and as a grid

:::demo `.kit-cards` with `.kit-grid` — the full "my setup" page
<ul class="kit kit-grid kit-cards">
  <li class="kit__item"><span class="kit__shot"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-clapperboard"/></svg></span><div class="kit__body"><p class="kit__role">Edit</p><h3 class="kit__name"><a class="kit__link" href="#i">DaVinci Resolve</a></h3><p class="kit__note">The grade and the cut are the same conversation.</p></div><span class="kit__meta">Free</span></li>
  <li class="kit__item"><span class="kit__shot"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-headphones"/></svg></span><div class="kit__body"><p class="kit__role">Monitoring</p><h3 class="kit__name"><a class="kit__link" href="#i">Sony MDR-7506</a></h3><p class="kit__note">Unflattering, which is the point.</p></div><span class="kit__meta">₹9,800</span></li>
  <li class="kit__item"><span class="kit__shot"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-terminal"/></svg></span><div class="kit__body"><p class="kit__role">Desk</p><h3 class="kit__name"><a class="kit__link" href="#i">Keychron Q1</a></h3><p class="kit__note">Loud enough to hear in the early videos.</p></div><span class="kit__meta">₹16,500</span></li>
  <li class="kit__item"><span class="kit__shot"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-server"/></svg></span><div class="kit__body"><p class="kit__role">Storage</p><h3 class="kit__name"><a class="kit__link" href="#i">Samsung T7 2TB</a></h3><p class="kit__note">Two of them, and one always lives somewhere else.</p></div><span class="kit__meta">₹18,000</span></li>
</ul>
:::

`.kit-lg` gives a 6rem plate for a page where the photographs are the content.

## Disclosure, in the same voice

The affiliate line goes in the same type as everything else, at the foot of the
list — not in a different-coloured box at the bottom of the page.

> Some links are affiliate links. They cost you nothing and they have never
> decided what goes on this list.

## Classes

| Class | What it does |
| --- | --- |
| `.kit` | the list. `--kit-shot`, `--kit-gap` |
| `.kit__item` | one row |
| `.kit__shot` | the fixed square plate — a photo, an icon, or a counter |
| `.kit__body` | role, name, note |
| `.kit__role` | the category, in the label voice |
| `.kit__name` `.kit__link` | the thing, with the stretched link |
| `.kit__note` | one sentence on why |
| `.kit__meta` | a price or a year, in the data voice |
| `.kit-sm` `.kit-lg` | 3rem / 6rem plates |
| `.kit-ruled` | a hairline between rows |
| `.kit-grid` | as many columns as fit |
| `.kit-cards` | each row on its own surface |
| `.kit-numbered` | counter-numbered plates |
