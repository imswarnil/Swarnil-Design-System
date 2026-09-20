---
title: Log
group: Patterns
order: 50
lead: Three lists that record what happened, in order — the build log, the release note, and the itinerary.
---

:::demo The build log — start, numbered middles, ship
<ol class="buildlog" style="max-width:26rem">
  <li class="buildlog__step" data-kind="start" data-done><span class="buildlog__node"></span><a class="buildlog__link" href="#i">Kick-off — scope and sketches<span class="buildlog__date">Day 1 · Jun 02</span></a></li>
  <li class="buildlog__step" data-done><span class="buildlog__node">2</span><a class="buildlog__link" href="#i">Foundation tokens land<span class="buildlog__date">Day 4 · Jun 05</span></a></li>
  <li class="buildlog__step" aria-current="step"><span class="buildlog__node">3</span><a class="buildlog__link" href="#i">Components pass<span class="buildlog__date">Day 9 · Jun 10</span></a></li>
  <li class="buildlog__step" data-kind="ship"><span class="buildlog__node"></span><a class="buildlog__link" href="#i">Ship v1<span class="buildlog__date">Day 14 · target</span></a></li>
</ol>
:::

Each is the [timeline](/timeline.html) idea wearing its collection's clothes:
the build log is a project, the release is a version, the itinerary is a trip.
They share one rule — the rail stops short of the first and last node, so a
finished sequence never says *there is more* — and one state model:
`[data-done]` behind you, `[aria-current]` you are here.

## Release notes

A version, a date, and what changed. Versions are data, tabular, so a column
of them lines up; the newest release carries `aria-current` and takes the
accent.

:::demo
<div style="max-width:44rem">
  <article class="release" aria-current="true">
    <div class="release__meta">
      <span class="release__ver">v2.1.0 <span class="badge badge-live">Latest</span></span>
      <span class="release__date">2026-08-30</span>
    </div>
    <div class="release__body">
      <h3 class="release__title">The data voice</h3>
      <p>Timecodes, counts and dimensions leave monospace for Geist with tabular figures. Mono is code only, and CI now fails on anything else.</p>
    </div>
  </article>
  <article class="release">
    <div class="release__meta">
      <span class="release__ver">v2.0.0</span>
      <span class="release__date">2026-08-12</span>
    </div>
    <div class="release__body">
      <h3 class="release__title">Layers</h3>
      <p>Every rule lives in a declared cascade layer. Consumer overrides win with zero specificity fights.</p>
      <p>Breaking: <code class="code">--shadow-*</code> is now <code class="code">--elevation-*</code>.</p>
    </div>
  </article>
  <article class="release">
    <div class="release__meta">
      <span class="release__ver">v1.9.2</span>
      <span class="release__date">2026-07-28</span>
    </div>
    <div class="release__body"><p>Fixes the dialog centring on Safari.</p></div>
  </article>
</div>
:::

## Itinerary

The trip, day by day. The node is the day chip, and every entry can carry a
strip of stops.

:::demo
<ol class="itinerary" style="max-width:30rem">
  <li class="itinerary__day" data-done>
    <span class="itinerary__chip"><b class="itinerary__num">1</b><span class="itinerary__unit">day</span></span>
    <h4 class="itinerary__title">Land in Tbilisi, walk the old town</h4>
    <p class="itinerary__note">Sulphur baths before the jet lag wins. Shot the intro on the funicular.</p>
    <div class="itinerary__stops"><span class="badge">Abanotubani</span><span class="badge">Funicular</span></div>
  </li>
  <li class="itinerary__day" aria-current="date">
    <span class="itinerary__chip"><b class="itinerary__num">2</b><span class="itinerary__unit">day</span></span>
    <h4 class="itinerary__title">Kazbegi day trip</h4>
    <p class="itinerary__note">Gergeti Trinity on foot, weather permitting. Drone up only if the wind drops.</p>
    <div class="itinerary__stops"><span class="badge">Ananuri</span><span class="badge">Stepantsminda</span><span class="badge badge-craft">Drone</span></div>
  </li>
  <li class="itinerary__day">
    <span class="itinerary__chip"><b class="itinerary__num">3</b><span class="itinerary__unit">day</span></span>
    <h4 class="itinerary__title">Wine country, slow train back</h4>
    <div class="itinerary__stops"><span class="badge">Sighnaghi</span><span class="badge">Telavi</span></div>
  </li>
</ol>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--buildlog-node` | Node diameter; the rail and the step indent follow it |
| `--buildlog-gap` | Vertical padding of a step |
| `--release-col` | Width of the version column above 48rem |
| `--itinerary-chip` | Day chip size; the rail and the indent follow it |

## Accessibility

- All three are `<ol>`; the order is the content.
- `aria-current="step"` on the current build step, `aria-current="date"` on
  today's itinerary day, `aria-current="true"` on the latest release — the
  accent is styled from those attributes.
- `[data-done]` is visual only; the date already says it is in the past.
- A build-log step is one link with the date inside it, so the accessible
  name reads *Components pass, Day 9 · Jun 10*.
- The itinerary chip's *day* is real text, not generated.
