---
title: Curriculum
group: Patterns
order: 32
lead: The course syllabus — modules that collapse on the platform, lessons that know which one you are in — and the episode list beside a player.
---

:::demo A course, two modules, one lesson current
<section class="curriculum" style="max-width:34rem">
  <header class="curriculum__head">
    <h3 class="curriculum__title">CRM Analytics, from zero</h3>
    <span class="curriculum__meta">12 lessons · 3h 40m</span>
    <progress class="progress progress-thin" value="4" max="12" aria-label="4 of 12 lessons watched"></progress>
  </header>
  <div class="curriculum__modules">
    <details class="curriculum__module" open>
      <summary><span class="curriculum__no">01</span><span class="curriculum__module-title">The data model</span><span class="curriculum__count">4 lessons</span></summary>
      <ol class="curriculum__lessons">
        <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">What a dataset is</span><span class="lesson__len">08:12</span></a></li>
        <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">Recipes and dataflows</span><span class="lesson__len">14:30</span></a></li>
        <li><a class="lesson" href="#i" aria-current="page"><span class="lesson__tick"></span><span class="lesson__title">Joins, and where they go wrong</span><span class="lesson__len">19:04</span></a></li>
        <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">Security predicates</span><span class="lesson__len">11:48</span></a></li>
      </ol>
    </details>
    <details class="curriculum__module">
      <summary><span class="curriculum__no">02</span><span class="curriculum__module-title">Building the dashboard</span><span class="curriculum__count">5 lessons</span></summary>
      <ol class="curriculum__lessons">
        <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">The first widget</span><span class="lesson__len">09:20</span><span class="lesson__free">Free</span></a></li>
        <li><a class="lesson" href="#i" data-locked><span class="lesson__tick"></span><span class="lesson__title">Bindings</span><span class="lesson__len">22:15</span></a></li>
      </ol>
    </details>
  </div>
</section>
:::

Each module is a `<details>`, so collapsing is the platform's job and
find-in-page opens the module that holds the match. Each lesson is a row with a
tick — an empty ring, filled when `[data-done]`, ringed with the accent when
`[aria-current]`. The current lesson is never a filled pill.

## Lesson states

:::demo Done, current, locked, free — on one flush list
<section class="curriculum curriculum-flush" style="max-width:30rem">
  <ol class="curriculum__lessons">
    <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">Watched</span><span class="lesson__len">06:41</span></a></li>
    <li><a class="lesson" href="#i" aria-current="page"><span class="lesson__tick"></span><span class="lesson__title">Playing now</span><span class="lesson__len">12:08</span></a></li>
    <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">Not yet</span><span class="lesson__len">10:55</span><span class="lesson__free">Free</span></a></li>
    <li><a class="lesson" href="#i" data-locked><span class="lesson__tick"></span><span class="lesson__title">Members only</span><span class="lesson__len">18:30</span><svg class="icon icon-xs" aria-hidden="true"><use href="/icons/sprite.svg#i-user"/></svg></a></li>
  </ol>
</section>
:::

`.curriculum-flush` drops the box for a syllabus already inside a card or a
rail. The length is a timecode, so it takes the data voice; FREE is a label,
so it takes the label voice.

## Beside a player

`.curriculum-scroll` pins the head and lets the modules scroll, so the syllabus
can sit beside a player without growing past it.

:::demo
<section class="curriculum curriculum-scroll" style="max-width:24rem; --curriculum-max: 16rem">
  <header class="curriculum__head">
    <h3 class="curriculum__title">Playlist</h3>
    <span class="curriculum__meta">2 of 6</span>
  </header>
  <div class="curriculum__modules">
    <details class="curriculum__module" open>
      <summary><span class="curriculum__no">01</span><span class="curriculum__module-title">Setup</span><span class="curriculum__count">3</span></summary>
      <ol class="curriculum__lessons">
        <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">Lights</span><span class="lesson__len">05:00</span></a></li>
        <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">Camera</span><span class="lesson__len">07:12</span></a></li>
        <li><a class="lesson" href="#i" aria-current="page"><span class="lesson__tick"></span><span class="lesson__title">Audio</span><span class="lesson__len">09:45</span></a></li>
      </ol>
    </details>
    <details class="curriculum__module" open>
      <summary><span class="curriculum__no">02</span><span class="curriculum__module-title">Recording</span><span class="curriculum__count">3</span></summary>
      <ol class="curriculum__lessons">
        <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">The first take</span><span class="lesson__len">11:20</span></a></li>
        <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">Pickups</span><span class="lesson__len">04:33</span></a></li>
        <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">Wrap</span><span class="lesson__len">02:10</span></a></li>
      </ol>
    </details>
  </div>
</section>
:::

## The episode list

`.episodes` is the same container wearing series clothes: a head with a count,
and a list that scrolls itself. It **arranges** rows and does not draw them —
drop the Media layer's `.episode` rows in; here the rows are lessons, which
work too.

:::demo
<section class="episodes" style="max-width:24rem; --episodes-max: 15rem">
  <header class="episodes__head">
    <h3 class="episodes__title">Season 2</h3>
    <span class="episodes__count">3 of 8</span>
  </header>
  <ol class="episodes__list">
    <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">Ep. 9 — The colour rebuild</span><span class="lesson__len">24:10</span></a></li>
    <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">Ep. 10 — Mono is a signal</span><span class="lesson__len">18:52</span></a></li>
    <li><a class="lesson" href="#i" aria-current="page"><span class="lesson__tick"></span><span class="lesson__title">Ep. 11 — The frame layer</span><span class="lesson__len">21:07</span></a></li>
    <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">Ep. 12 — Shipping the docs</span><span class="lesson__len">26:44</span></a></li>
    <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">Ep. 13 — Q&amp;A</span><span class="lesson__len">33:15</span></a></li>
  </ol>
</section>
:::

:::demo Flush — inside a card or a rail that already has an edge
<section class="episodes episodes-flush" style="max-width:24rem">
  <header class="episodes__head">
    <h3 class="episodes__title">Up next</h3>
    <span class="episodes__count">2</span>
  </header>
  <ol class="episodes__list">
    <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">Ep. 12 — Shipping the docs</span><span class="lesson__len">26:44</span></a></li>
    <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">Ep. 13 — Q&amp;A</span><span class="lesson__len">33:15</span></a></li>
  </ol>
</section>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--curriculum-pad` | Inline padding of the head, module rows and lessons |
| `--curriculum-radius` | Corner radius of the box |
| `--curriculum-max` | Height cap for `.curriculum-scroll` |
| `--lesson-tick` | Tick diameter |
| `--episodes-max` | Height cap for the episode list |
| `--episodes-pad` | Padding around the list |

## Accessibility

- Modules are `<details>`; the summary is the keyboard target and needs no ARIA.
- The current lesson carries `aria-current="page"` (or `"true"` beside a
  player) — the ring is styled from that attribute.
- `[data-done]` and `[data-locked]` are visual; the progress element and the
  lesson copy carry the fact for a screen reader.
- `<progress>` needs an `aria-label` or a visible label.
- The scrolling list keeps `overscroll-behavior: contain` so a wheel at the
  end does not scroll the page.
