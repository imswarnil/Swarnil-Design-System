---
title: Curriculum
group: Patterns
order: 50
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

## Lesson kinds, numbers, descriptions

An icon after the tick says video, reading, quiz or download; a number is
data. A lesson with a description wraps (`lesson-tall`).

:::demo
<section class="curriculum" style="max-width: 34rem">
  <div class="curriculum__modules">
    <details class="curriculum__module" open>
      <summary><span class="curriculum__no">03</span><span class="curriculum__module-title">Publishing</span><span class="curriculum__count">4 lessons</span></summary>
      <ol class="curriculum__lessons">
        <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__no">3.1</span><svg class="icon lesson__kind" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg><span class="lesson__title">Export settings for every platform</span><span class="lesson__len">11:02</span></a></li>
        <li><a class="lesson lesson-tall" href="#i" aria-current="page"><span class="lesson__tick"></span><span class="lesson__no">3.2</span><svg class="icon lesson__kind" aria-hidden="true"><use href="/icons/sprite.svg#i-file"/></svg><span class="lesson__title">The thumbnail checklist</span><span class="lesson__len">Reading</span><span class="lesson__desc">Four words, one subject, one accent, and the three-second test — a page to keep open while you build one.</span></a></li>
        <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__no">3.3</span><svg class="icon lesson__kind" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-check"/></svg><span class="lesson__title">Quiz: what ships?</span><span class="lesson__len">8 q</span></a></li>
        <li><a class="lesson" href="#i" data-locked><span class="lesson__tick"></span><span class="lesson__no">3.4</span><svg class="icon lesson__kind" aria-hidden="true"><use href="/icons/sprite.svg#i-download"/></svg><span class="lesson__title">The LUTs and the OBS scene collection</span><span class="lesson__len">ZIP</span></a></li>
      </ol>
    </details>
  </div>
</section>
:::

## Outline, cards, track

Three more shapes of the same syllabus. The outline is a printed contents
page for a landing page; cards put modules side by side; the track is the
whole course as a path, at a glance.

:::demo Outline — no box, a rail
<section class="curriculum curriculum-outline" style="max-width: 34rem">
  <header class="curriculum__head"><h3 class="curriculum__title">Lighting a talking head</h3><span class="curriculum__meta">6 lessons · 1h 12m</span></header>
  <div class="curriculum__modules">
    <details class="curriculum__module" open>
      <summary><span class="curriculum__no">01</span><span class="curriculum__module-title">The key</span><span class="curriculum__count">3 lessons</span></summary>
      <ol class="curriculum__lessons">
        <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">One light, forty-five degrees</span><span class="lesson__len">09:20</span></a></li>
        <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">Bouncing off a wall</span><span class="lesson__len">07:48</span></a></li>
      </ol>
    </details>
    <details class="curriculum__module">
      <summary><span class="curriculum__no">02</span><span class="curriculum__module-title">Fill and rim</span><span class="curriculum__count">3 lessons</span></summary>
      <ol class="curriculum__lessons"><li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">Half the power</span><span class="lesson__len">08:02</span></a></li></ol>
    </details>
  </div>
</section>
:::

:::demo Cards — modules in a grid
<section class="curriculum curriculum-cards">
  <div class="curriculum__modules">
    <details class="curriculum__module" open>
      <summary><span class="curriculum__no">01</span><span class="curriculum__module-title">The data model</span><span class="curriculum__count">4</span></summary>
      <ol class="curriculum__lessons"><li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">What a dataset is</span><span class="lesson__len">08:12</span></a></li><li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">Recipes</span><span class="lesson__len">14:30</span></a></li></ol>
    </details>
    <details class="curriculum__module" open>
      <summary><span class="curriculum__no">02</span><span class="curriculum__module-title">The dashboard</span><span class="curriculum__count">5</span></summary>
      <ol class="curriculum__lessons"><li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">The first widget</span><span class="lesson__len">09:20</span></a></li><li><a class="lesson" href="#i" data-locked><span class="lesson__tick"></span><span class="lesson__title">Bindings</span><span class="lesson__len">22:15</span></a></li></ol>
    </details>
  </div>
</section>
:::

:::demo Track — the course as a path; scrolls sideways when it must
<ol class="track">
  <li class="track__stop" data-done><span class="track__node"></span><span class="track__title">Setup</span><span class="track__meta">3 lessons · 24m</span></li>
  <li class="track__stop" data-done><span class="track__node"></span><span class="track__title">The data model</span><span class="track__meta">4 lessons · 52m</span></li>
  <li class="track__stop" aria-current="step"><span class="track__node"></span><span class="track__title">The dashboard</span><span class="track__meta">5 lessons · 1h 10m</span></li>
  <li class="track__stop"><span class="track__node"></span><span class="track__title">Security</span><span class="track__meta">2 lessons · 30m</span></li>
  <li class="track__stop"><span class="track__node"></span><span class="track__title">Ship it</span><span class="track__meta">1 lesson · 18m</span></li>
</ol>
:::

## The classroom

The page a lesson is watched on: the player and the lesson's words on the
stage, the syllabus beside them, scrolling on its own. Below 60rem the side
drops under the stage.

:::demo
<div class="classroom" style="--classroom-side: 18rem">
  <div class="classroom__stage">
    <div class="player player-bar-open">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%233f5f7c'/%3E%3Cstop offset='1' stop-color='%2312202a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" />
      <span class="player__frame" aria-hidden="true"></span>
      <div class="player__bar"><button class="player__btn" type="button" aria-label="Play"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg></button><span class="player__time">04:12</span><div class="player__rail" role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax="1144" aria-valuenow="252" tabindex="0"><div class="player__buffered" style="--value: 61%"></div><div class="player__played" style="--value: 22%"></div></div><span class="player__time">19:04</span></div>
    </div>
    <div class="classroom__head">
      <div><p class="eyebrow u-mb-2">Module 1 · Lesson 3</p><h3 class="classroom__title">Joins, and where they go wrong</h3></div>
      <div class="classroom__nav"><button class="button is-outlined is-small" type="button">Previous</button><button class="button is-primary is-small" type="button">Mark done, next</button></div>
    </div>
    <p class="t-body u-m-0">A join is a promise about cardinality. Most broken dashboards are a promise nobody checked.</p>
  </div>
  <aside class="classroom__side">
    <section class="curriculum curriculum-scroll" style="--curriculum-max: 22rem">
      <header class="curriculum__head"><h3 class="curriculum__title">CRM Analytics</h3><span class="curriculum__meta">4 / 12</span><progress class="progress progress-thin" value="4" max="12" aria-label="4 of 12 lessons"></progress></header>
      <div class="curriculum__modules">
        <details class="curriculum__module" open>
          <summary><span class="curriculum__no">01</span><span class="curriculum__module-title">The data model</span><span class="curriculum__count">4</span></summary>
          <ol class="curriculum__lessons">
            <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">What a dataset is</span><span class="lesson__len">08:12</span></a></li>
            <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">Recipes and dataflows</span><span class="lesson__len">14:30</span></a></li>
            <li><a class="lesson" href="#i" aria-current="page"><span class="lesson__tick"></span><span class="lesson__title">Joins, and where they go wrong</span><span class="lesson__len">19:04</span></a></li>
            <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">Security predicates</span><span class="lesson__len">11:48</span></a></li>
          </ol>
        </details>
        <details class="curriculum__module">
          <summary><span class="curriculum__no">02</span><span class="curriculum__module-title">The dashboard</span><span class="curriculum__count">5</span></summary>
          <ol class="curriculum__lessons"><li><a class="lesson" href="#i" data-locked><span class="lesson__tick"></span><span class="lesson__title">The first widget</span><span class="lesson__len">09:20</span></a></li></ol>
        </details>
      </div>
    </section>
  </aside>
</div>
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

## A still per module

A syllabus of twelve identical rows is hard to hold in the head. One small frame
per **module** gives each section something to be remembered by.

Per module, never per lesson: twelve pictures is a contact sheet, not a
syllabus. Below 34rem the stills drop out entirely.

:::demo `.curriculum__shot` in the summary
<section class="curriculum w-lg">
  <header class="curriculum__head">
    <h3 class="curriculum__title">CRM Analytics, from zero</h3>
    <span class="curriculum__meta">12 lessons · 3h 40m</span>
    <progress class="progress progress-thin" value="4" max="12" aria-label="4 of 12 lessons watched"></progress>
  </header>
  <div class="curriculum__modules">
    <details class="curriculum__module" open>
      <summary><span class="curriculum__shot pattern pattern-grid"></span><span class="curriculum__no">01</span><span class="curriculum__module-title">The data model</span><span class="curriculum__count">4 lessons</span></summary>
      <ol class="curriculum__lessons">
        <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">What a dataset actually is</span><span class="lesson__len">08:12</span></a></li>
        <li><a class="lesson" href="#i" aria-current="page"><span class="lesson__tick"></span><span class="lesson__title">Joins, and where they go wrong</span><span class="lesson__len">19:04</span></a></li>
      </ol>
    </details>
    <details class="curriculum__module">
      <summary><span class="curriculum__shot pattern pattern-halftone"></span><span class="curriculum__no">02</span><span class="curriculum__module-title">Building the dashboard</span><span class="curriculum__count">5 lessons</span></summary>
      <ol class="curriculum__lessons">
        <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">The first widget</span><span class="lesson__free">Free</span><span class="lesson__len">09:20</span></a></li>
        <li><a class="lesson" href="#i" data-locked><span class="lesson__tick"></span><span class="lesson__title">Bindings, the readable way</span><span class="lesson__len">22:15</span></a></li>
      </ol>
    </details>
  </div>
</section>
:::

## The player, finished

The classroom is the lesson page: the stage on one side, the syllabus on the
other. Three parts complete it.

`.classroom__tabs` are the **lesson's** tabs — overview, transcript, resources —
so they sit under the player rather than at the top of the document.
`.classroom__foot` pins previous-and-next under the stage, because moving on is
the single most common thing a reader wants after watching, and making them
scroll back up to the syllabus for it is the commonest mistake in the shape.

:::demo `.classroom__tabs`, `.classroom__foot` and `.classroom__meta`
<div class="classroom" style="--classroom-side: 15rem">
  <div class="classroom__stage">
    <div class="ratio ratio-wide u-rounded-lg u-overflow-hidden pattern pattern-scan u-border"></div>
    <header class="classroom__head">
      <div>
        <p class="classroom__meta">Module 01 · Lesson 3 of 12</p>
        <h3 class="classroom__title">Joins, and where they go wrong</h3>
      </div>
      <div class="classroom__nav">
        <button class="button is-ghost is-small" type="button" aria-label="Previous lesson"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-left"/></svg></button>
        <button class="button is-ghost is-small" type="button" aria-label="Next lesson"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></button>
      </div>
    </header>
    <div class="tabs classroom__tabs" role="tablist" aria-label="Lesson">
      <button class="tab" type="button" role="tab" aria-selected="true">Notes</button>
      <button class="tab" type="button" role="tab" aria-selected="false">Resources <span class="tag is-small">4</span></button>
      <button class="tab" type="button" role="tab" aria-selected="false">Transcript</button>
    </div>
    <p class="t-small t-muted">A join is not a technique, it is a claim about the world: that one row over here corresponds to one row over there.</p>
    <footer class="classroom__foot">
      <button class="button is-ghost is-small" type="button">Previous lesson</button>
      <button class="button is-primary is-small" type="button">Mark complete and continue</button>
    </footer>
  </div>
  <aside class="classroom__side">
    <section class="curriculum curriculum-scroll">
      <header class="curriculum__head"><h3 class="curriculum__title">Syllabus</h3><span class="curriculum__meta">12 lessons</span></header>
      <div class="curriculum__modules">
        <details class="curriculum__module" open>
          <summary><span class="curriculum__no">01</span><span class="curriculum__module-title">The data model</span><span class="curriculum__count">4</span></summary>
          <ol class="curriculum__lessons">
            <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">What a dataset is</span><span class="lesson__len">08:12</span></a></li>
            <li><a class="lesson" href="#i" aria-current="page"><span class="lesson__tick"></span><span class="lesson__title">Joins</span><span class="lesson__len">19:04</span></a></li>
          </ol>
        </details>
      </div>
    </section>
  </aside>
</div>
:::

`.classroom-side-start` moves the syllabus to the start edge — for a course
whose lessons are short and numerous, where the list *is* the navigation.
`.classroom-wide` gives the side column 26rem.

| Class | What it does |
| --- | --- |
| `.curriculum__shot` | a 16:9 still on a module's summary |
| `.classroom__tabs` | the lesson's own tabs, under the player |
| `.classroom__foot` | previous and next, pinned under the stage |
| `.classroom__meta` | where you are in the course, in the data voice |
| `.classroom-side-start` | syllabus on the start edge |
| `.classroom-wide` | a 26rem side column |
