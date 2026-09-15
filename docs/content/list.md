---
title: List
group: Components
order: 50
lead: Stacked rows on one surface. Only the interactive rows respond, and the current one gets a rule, never a fill.
---

:::demo
<ul class="list w-lg">
  <li><a class="list__item" href="#i" aria-current="true"><span class="list__lead"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-video"/></svg></span><span class="list__body"><span class="list__title">Episodes</span></span><span class="list__end"><span class="list__meta">128</span></span></a></li>
  <li><a class="list__item" href="#i"><span class="list__lead"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-live"/></svg></span><span class="list__body"><span class="list__title">Live</span></span><span class="list__end"><span class="list__meta">3</span></span></a></li>
  <li><a class="list__item" href="#i"><span class="list__lead"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-headphones"/></svg></span><span class="list__body"><span class="list__title">Podcast</span></span><span class="list__end"><span class="list__meta">41</span></span></a></li>
  <li><a class="list__item" href="#i"><span class="list__lead"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-folder"/></svg></span><span class="list__body"><span class="list__title">Courses</span></span><span class="list__end"><span class="list__meta">6</span></span></a></li>
</ul>
:::

A row is a link, a button, a label or a plain element, and the tag decides the
behaviour: only `a`, `button` and `label` rows get a hover wash, so a static row
never pretends to be clickable. The current row carries a 2px rule on its
inline edge — the house active state — and its count is data, so it takes the
data voice.

## Parts

Lead sits before the text (an icon, an avatar, a checkbox), body holds a title
and an optional description, end sits after and is pushed to the far edge.

:::demo
<ul class="list w-lg">
  <li><a class="list__item" href="#i"><span class="list__lead"><span class="avatar avatar-sm">P</span></span><span class="list__body"><span class="list__title">Priya Nair</span><span class="list__desc">Left a comment on take 47</span></span><span class="list__end"><span class="list__meta">2m</span><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></span></a></li>
  <li><a class="list__item" href="#i"><span class="list__lead"><span class="avatar avatar-sm">M</span></span><span class="list__body"><span class="list__title">Marco Ruiz</span><span class="list__desc">Subscribed to the course</span></span><span class="list__end"><span class="list__meta">1h</span><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></span></a></li>
  <li><a class="list__item" href="#i"><span class="list__lead"><span class="avatar avatar-sm">A</span></span><span class="list__body"><span class="list__title">Aisha Bello</span><span class="list__desc">Shared episode 12</span></span><span class="list__end"><span class="badge badge-accent">New</span></span></a></li>
</ul>
:::

## Heads

A label row opens a run of items. It is a label, so it takes the label voice.

:::demo
<div class="list w-lg">
  <div class="list__head">Today</div>
  <a class="list__item" href="#i"><span class="list__body"><span class="list__title">Upload finished · Episode 12</span></span><span class="list__end"><span class="list__meta">09:14</span></span></a>
  <a class="list__item" href="#i"><span class="list__body"><span class="list__title">Thumbnail approved</span></span><span class="list__end"><span class="list__meta">08:02</span></span></a>
  <div class="list__head">Yesterday</div>
  <a class="list__item" href="#i"><span class="list__body"><span class="list__title">Take 47 rendered</span></span><span class="list__end"><span class="list__meta">17:40</span></span></a>
</div>
:::

## States

`aria-current` marks the row you are on; `aria-disabled` (or `disabled` on a
button) greys one out; `data-done` strikes a finished item in a checklist.
None of them is a class.

:::demo
<ul class="list w-lg">
  <li><button class="list__item" type="button" aria-current="true"><span class="list__body"><span class="list__title">Record the intro</span></span></button></li>
  <li><button class="list__item" type="button" data-done><span class="list__lead"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-check"/></svg></span><span class="list__body"><span class="list__title">Write the shot list</span></span></button></li>
  <li><button class="list__item" type="button" disabled><span class="list__body"><span class="list__title">Publish</span><span class="list__desc">Needs a thumbnail first</span></span></button></li>
  <li><label class="list__item"><input type="checkbox" /> <span class="list__body"><span class="list__title">Order the second lav mic</span></span></label></li>
</ul>
:::

## Sizes and flush

:::demo Small, large, and flush inside a card
<div class="grid-3">
  <ul class="list list-sm">
    <li><a class="list__item" href="#i">Colour</a></li>
    <li><a class="list__item" href="#i" aria-current="true">Typography</a></li>
    <li><a class="list__item" href="#i">Spacing</a></li>
  </ul>
  <ul class="list list-lg">
    <li><a class="list__item" href="#i">Colour</a></li>
    <li><a class="list__item" href="#i">Typography</a></li>
  </ul>
  <div class="card"><div class="card__body">
    <ul class="list list-flush">
      <li><a class="list__item" href="#i">Colour</a></li>
      <li><a class="list__item" href="#i" aria-current="true">Typography</a></li>
      <li><a class="list__item" href="#i">Spacing</a></li>
    </ul>
  </div></div>
</div>
:::

## Numbered

The counter is data — light, tabular, leading zero — so a list of ten lines up.

:::demo
<ol class="list list-numbered w-lg">
  <li><a class="list__item" href="#i"><span class="list__body"><span class="list__title">Setting up the room</span></span><span class="list__end"><span class="list__meta">04:10</span></span></a></li>
  <li><a class="list__item" href="#i"><span class="list__body"><span class="list__title">Key, fill, and the window</span></span><span class="list__end"><span class="list__meta">09:32</span></span></a></li>
  <li><a class="list__item" href="#i"><span class="list__body"><span class="list__title">Grading the two cameras to match</span></span><span class="list__end"><span class="list__meta">12:05</span></span></a></li>
</ol>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--list-pad` | padding of every row |
| `--list-gap` | gap between lead, body and end |

## Accessibility

- Use a real `<ul>`/`<ol>` with `<li>` when the rows are a list; the `.list`
  class works on a `<div>` for a mixed run of heads and rows.
- Interactive rows are `<a>` or `<button>` — not a `<div>` with a handler.
- State is `aria-current`, `aria-disabled`/`disabled` and `data-done`. A
  disabled row also carries `pointer-events: none`, so mark it in the markup.
- A `.list__end` icon is decoration: `aria-hidden="true"`.
