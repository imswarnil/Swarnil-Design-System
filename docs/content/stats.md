---
title: Stats
group: Sections
order: 20
lead: Numbers with receipts — display numerals over label captions, each carrying the accent rule.
---

The content rule outranks the CSS: **never print a number the build cannot
back.** A stats band is a list of promises, and the homepage's own band is
generated from measurements so CI knows when one drifts.

## Default

:::demo
<div class="stats">
  <div class="stats__item"><span class="t-stat">15.7</span><span class="stats__label">KB gzipped — the whole system</span></div>
  <div class="stats__item"><span class="t-stat">97</span><span class="stats__label">Tones across 8 ramps</span></div>
  <div class="stats__item"><span class="t-stat">61</span><span class="stats__label">Icons drawn from scratch</span></div>
  <div class="stats__item"><span class="t-stat">0</span><span class="stats__label">Dependencies</span></div>
</div>
:::

## Quiet and row

:::demo Quiet — hairline instead of accent, for a page that already has a loud band
<div class="stats stats-quiet">
  <div class="stats__item"><span class="t-stat">28</span><span class="stats__label">Doc pages</span></div>
  <div class="stats__item"><span class="t-stat">9</span><span class="stats__label">Nav groups</span></div>
</div>
:::

:::demo Row — the slim strip for a header band
<div class="stats stats-row">
  <div class="stats__item"><span class="t-stat">128</span><span class="stats__label">stars</span></div>
  <div class="stats__item"><span class="t-stat">14</span><span class="stats__label">releases</span></div>
  <div class="stats__item"><span class="t-stat">61</span><span class="stats__label">icons</span></div>
</div>
:::

`t-stat` sets tabular lining figures, so a live-updating number never makes
its neighbours jump.

## The value, and what moved it

`stats__value` wraps the numeral so a prefix, a counting span and a unit sit
on one baseline. `stats__delta` is the change, in the data voice, coloured by
`data-trend`. The count-up is the `fx-count` effect — reload to see it.

:::demo
<div class="stats">
  <div class="stats__item">
    <svg class="icon stats__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-users"/></svg>
    <span class="stats__value"><span class="fx-count" style="--fx-target: 42" aria-hidden="true"></span><span class="u-sr-only">42</span><span class="stats__unit">k</span></span>
    <span class="stats__label">Subscribers</span>
    <span class="stats__delta" data-trend="up"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-up"/></svg> 12% this month</span>
  </div>
  <div class="stats__item">
    <svg class="icon stats__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-clock"/></svg>
    <span class="stats__value"><span class="fx-count" style="--fx-target: 6" aria-hidden="true"></span><span class="u-sr-only">6</span><span class="stats__unit">min</span></span>
    <span class="stats__label">Average watch time</span>
    <span class="stats__delta" data-trend="down"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-down"/></svg> 0:40</span>
  </div>
  <div class="stats__item">
    <span class="stats__value">$<span class="fx-count" style="--fx-target: 1200" aria-hidden="true"></span><span class="u-sr-only">1200</span></span>
    <span class="stats__label">Course revenue</span>
    <span class="stats__note">last 30 days</span>
  </div>
</div>
:::

## Dresses

:::demo Cards — each number in its own surface, the rule on the top edge
<div class="stats stats-cards">
  <div class="stats__item"><span class="stats__value">128</span><span class="stats__label">Episodes</span></div>
  <div class="stats__item"><span class="stats__value">23</span><span class="stats__label">Countries filmed</span></div>
  <div class="stats__item"><span class="stats__value">6</span><span class="stats__label">Courses</span></div>
</div>
:::

:::demo Centred and large — for a hero band; divided — hairlines between
<div class="stack stack-lg">
  <div class="stats stats-center stats-lg">
    <div class="stats__item"><span class="stats__value">97</span><span class="stats__label">Tones across 8 ramps</span></div>
    <div class="stats__item"><span class="stats__value">0</span><span class="stats__label">Dependencies</span></div>
  </div>
  <div class="stats stats-divided stats-sm">
    <div class="stats__item"><span class="stats__value">128</span><span class="stats__label">Episodes</span></div>
    <div class="stats__item"><span class="stats__value">41</span><span class="stats__label">Podcasts</span></div>
    <div class="stats__item"><span class="stats__value">6</span><span class="stats__label">Courses</span></div>
  </div>
</div>
:::

:::demo Inverse — the dark band
<div class="stats stats-inverse">
  <div class="stats__item"><span class="stats__value">42<span class="stats__unit">k</span></span><span class="stats__label">Subscribers</span></div>
  <div class="stats__item"><span class="stats__value">1.2<span class="stats__unit">M</span></span><span class="stats__label">Views this year</span></div>
  <div class="stats__item"><span class="stats__value">4.9</span><span class="stats__label">Course rating</span></div>
</div>
:::
