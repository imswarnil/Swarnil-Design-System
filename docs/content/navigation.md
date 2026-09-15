---
title: Navigation
group: Components
order: 50
lead: Tabs, breadcrumb, pagination, chapters, navlist and pager — every one marks "you are here" with a dot or a 2px rule, never a filled pill.
---

:::demo Tabs
<div class="tabs" role="tablist" aria-label="Episode views">
  <button class="tab" type="button" role="tab" aria-selected="true">Episodes</button>
  <button class="tab" type="button" role="tab" aria-selected="false">Takes</button>
  <button class="tab" type="button" role="tab" aria-selected="false">Gear</button>
  <button class="tab" type="button" role="tab" aria-selected="false" disabled>Transcripts</button>
</div>
:::

A reader learns the house active state once — a dot, semibold, the accent — and then
recognises it in the tabs, the side nav, the navbar and the chapter list without
being taught again. Where a dot has nowhere to sit (under a page number, along the
edge of a segment) the mark becomes a 2px rule in the same colour. State is always
an ARIA attribute, so the visual and the announced state cannot disagree.

## Tabs

`aria-selected` drives a tab panel; a tab that is really a link between pages
takes `aria-current="page"` and gets the same mark.

:::demo Link tabs
<nav class="tabs" aria-label="Course">
  <a class="tab" href="#overview" aria-current="page">Overview</a>
  <a class="tab" href="#syllabus">Syllabus</a>
  <a class="tab" href="#instructor">Instructor</a>
  <a class="tab" href="#reviews">Reviews</a>
</nav>
:::

:::demo Underline — the rule instead of the dot, when the strip sits on a hairline
<div class="tabs tabs-underline" role="tablist" aria-label="Upload views">
  <button class="tab" type="button" role="tab" aria-selected="true">Uploads</button>
  <button class="tab" type="button" role="tab" aria-selected="false">Scheduled</button>
  <button class="tab" type="button" role="tab" aria-selected="false">Drafts</button>
</div>
:::

:::demo Segmented — one bordered track, equal segments, no fill
<div class="tabs tabs-segmented" role="tablist" aria-label="Range" style="max-width: 24rem">
  <button class="tab" type="button" role="tab" aria-selected="false">Day</button>
  <button class="tab" type="button" role="tab" aria-selected="true">Week</button>
  <button class="tab" type="button" role="tab" aria-selected="false">Month</button>
</div>
:::

:::demo With icons and counts
<div class="tabs" role="tablist" aria-label="Library">
  <button class="tab" type="button" role="tab" aria-selected="true">
    <svg class="icon icon-sm tab__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-video"/></svg>
    Videos <span class="tab__count">48</span>
  </button>
  <button class="tab" type="button" role="tab" aria-selected="false">
    <svg class="icon icon-sm tab__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-headphones"/></svg>
    Audio <span class="tab__count">12</span>
  </button>
  <button class="tab" type="button" role="tab" aria-selected="false">
    <svg class="icon icon-sm tab__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-note"/></svg>
    Notes <span class="tab__count">3</span>
  </button>
</div>
:::

:::demo Flush — no hairline, for a strip inside a card or a toolbar
<div class="tabs tabs-flush" role="tablist" aria-label="Sort">
  <button class="tab" type="button" role="tab" aria-selected="true">Newest</button>
  <button class="tab" type="button" role="tab" aria-selected="false">Most viewed</button>
  <button class="tab" type="button" role="tab" aria-selected="false">Longest</button>
</div>
:::

:::demo Vertical — the dot, or the rule standing along the start edge
<div class="cluster" style="--cluster-gap: var(--space-10); align-items: flex-start">
  <div class="tabs tabs-vertical" role="tablist" aria-label="Settings" style="min-width: 12rem">
    <button class="tab" type="button" role="tab" aria-selected="true">Channel</button>
    <button class="tab" type="button" role="tab" aria-selected="false">Uploads</button>
    <button class="tab" type="button" role="tab" aria-selected="false">Monetisation</button>
  </div>
  <div class="tabs tabs-vertical tabs-underline" role="tablist" aria-label="Settings" style="min-width: 12rem">
    <button class="tab" type="button" role="tab" aria-selected="false">Channel</button>
    <button class="tab" type="button" role="tab" aria-selected="true">Uploads</button>
    <button class="tab" type="button" role="tab" aria-selected="false">Monetisation</button>
  </div>
</div>
:::

The stylesheet does not move `aria-selected` between tabs — that is one line of
script per tablist, and the panel that shows is yours to wire with `aria-controls`.

## Breadcrumb

An `<ol>` inside a `<nav>`; the leaf is unlinked and carries `aria-current="page"`.

:::demo
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li><a href="#home">Home</a></li>
    <li><a href="#courses">Courses</a></li>
    <li><a href="#course">Lighting a talking head</a></li>
    <li aria-current="page">Lesson 3</li>
  </ol>
</nav>
:::

:::demo With icons and the chevron separator
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb breadcrumb-chevron">
    <li><a href="#home"><svg class="icon icon-sm breadcrumb__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-camera"/></svg> Studio</a></li>
    <li><a href="#folder"><svg class="icon icon-sm breadcrumb__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-folder"/></svg> Season 2</a></li>
    <li aria-current="page"><svg class="icon icon-sm breadcrumb__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-file"/></svg> Episode 7 — colour grade</li>
  </ol>
</nav>
:::

:::demo Truncated — long titles get a budget and an ellipsis
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb breadcrumb-truncate" style="--crumb-max: 10rem">
    <li><a href="#home">Home</a></li>
    <li><a href="#series">The over-produced answer to a simple question</a></li>
    <li aria-current="page">Part 4: why the second camera was a mistake</li>
  </ol>
</nav>
:::

:::demo Collapsed — press 320px: the root, an ellipsis, and the last two survive
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb breadcrumb-collapse">
    <li><a href="#home">Home</a></li>
    <li class="breadcrumb__more" aria-hidden="true">…</li>
    <li><a href="#courses">Courses</a></li>
    <li><a href="#course">Lighting a talking head</a></li>
    <li><a href="#module">Module 2</a></li>
    <li aria-current="page">Lesson 3</li>
  </ol>
</nav>
:::

The breadcrumb is its own query container, so the collapse works in a card or a
sidebar as well as across a page, without a media query.

## Pagination

Numbered pages for an archive. The current page is semibold, accent, with the rule
beneath the number — a dot has nowhere to sit inside a square.

:::demo
<nav class="pagination" aria-label="Pages">
  <a class="pagination__link" href="#p1" aria-label="Previous page"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-left"/></svg></a>
  <div class="pagination__pages">
    <a class="pagination__link" href="#p1">1</a>
    <a class="pagination__link" href="#p2" aria-current="page">2</a>
    <a class="pagination__link" href="#p3">3</a>
    <span class="pagination__gap" aria-hidden="true">…</span>
    <a class="pagination__link" href="#p12">12</a>
  </div>
  <a class="pagination__link" href="#p3" aria-label="Next page"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></a>
</nav>
:::

:::demo With first and last, on the first page — the ends that cannot move are aria-disabled
<nav class="pagination" aria-label="Pages">
  <span class="pagination__link" aria-disabled="true" aria-label="First page"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-left"/></svg><svg class="icon icon-sm" aria-hidden="true" style="margin-inline-start: calc(var(--space-2) * -1)"><use href="/icons/sprite.svg#i-chevron-left"/></svg></span>
  <span class="pagination__link" aria-disabled="true" aria-label="Previous page"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-left"/></svg></span>
  <div class="pagination__pages">
    <a class="pagination__link" href="#p1" aria-current="page">1</a>
    <a class="pagination__link" href="#p2">2</a>
    <a class="pagination__link" href="#p3">3</a>
    <a class="pagination__link" href="#p4">4</a>
    <span class="pagination__gap" aria-hidden="true">…</span>
    <a class="pagination__link" href="#p36">36</a>
  </div>
  <a class="pagination__link" href="#p2" aria-label="Next page"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></a>
  <a class="pagination__link" href="#p36" aria-label="Last page"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg><svg class="icon icon-sm" aria-hidden="true" style="margin-inline-start: calc(var(--space-2) * -1)"><use href="/icons/sprite.svg#i-chevron-right"/></svg></a>
</nav>
:::

:::demo Compact — a readout between two arrows, for a player or a gallery
<nav class="pagination pagination-sm" aria-label="Takes">
  <button class="pagination__link" type="button" aria-label="Previous take"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-left"/></svg></button>
  <span class="pagination__status">Take <b>4</b> / 11</span>
  <button class="pagination__link" type="button" aria-label="Next take"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></button>
</nav>
:::

:::demo Between — the arrows carry labels and go to the edges
<nav class="pagination pagination-between" aria-label="Pages">
  <a class="pagination__link" href="#newer"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-left"/></svg> Newer</a>
  <div class="pagination__pages">
    <a class="pagination__link" href="#p4">4</a>
    <a class="pagination__link" href="#p5" aria-current="page">5</a>
    <a class="pagination__link" href="#p6">6</a>
  </div>
  <a class="pagination__link" href="#older">Older <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg></a>
</nav>
:::

## Chapters — table of contents

A hairline rail beside long-form content; the current heading lays a 2px accent rule
over it. Nested lists drop their own rail and indent, so one rule runs the full height
and the h3s read as parts of the h2 above them.

:::demo
<nav class="chapters" aria-label="On this page" style="max-width: 16rem">
  <span class="chapters__title">On this page</span>
  <ol class="chapters__list">
    <li><a class="chapters__link" href="#framing">Framing</a></li>
    <li>
      <a class="chapters__link" href="#lighting" aria-current="true">Lighting</a>
      <ol class="chapters__list">
        <li><a class="chapters__link" href="#key">The key light</a></li>
        <li><a class="chapters__link" href="#fill">Fill and rim</a></li>
      </ol>
    </li>
    <li><a class="chapters__link" href="#audio">Audio</a></li>
    <li><a class="chapters__link" href="#export">Export settings</a></li>
  </ol>
</nav>
:::

:::demo Sticky, in a sidebar layout — scroll the demo and the rail stays
<div class="sidebar sidebar-end" style="--side-width: 14rem; max-height: 18rem; overflow: auto; padding-block: var(--space-2)">
  <div class="prose">
    <h3 id="ch-framing">Framing</h3>
    <p>Put the eyes on the upper third and leave the headroom you would leave in a photograph. A talking head that sits dead centre reads like a passport.</p>
    <h3 id="ch-lighting">Lighting</h3>
    <p>One key at forty-five degrees, one fill at half its power, and a rim to lift the shoulders off the background. Three lights, and every one of them earns its place.</p>
    <p>Bounce the key off a wall if the softbox is too big for the room. A wall is a softbox that costs nothing.</p>
    <h3 id="ch-audio">Audio</h3>
    <p>Viewers forgive a soft picture and never forgive a hard room. Treat the wall behind the camera before you buy a second microphone.</p>
    <h3 id="ch-export">Export settings</h3>
    <p>1080p at a high bitrate beats 4K at a low one, every time it is watched on a phone.</p>
  </div>
  <nav class="chapters chapters-sticky" aria-label="On this page" style="--chapters-top: var(--space-2)">
    <span class="chapters__title">Chapters</span>
    <ol class="chapters__list">
      <li><a class="chapters__link" href="#ch-framing">Framing</a></li>
      <li><a class="chapters__link" href="#ch-lighting" aria-current="location">Lighting</a></li>
      <li><a class="chapters__link" href="#ch-audio">Audio</a></li>
      <li><a class="chapters__link" href="#ch-export">Export settings</a></li>
    </ol>
  </nav>
</div>
:::

`aria-current="true"` and `aria-current="location"` both take the rule. Which link
is current as the reader scrolls is a scrollspy's job — an `IntersectionObserver`
that sets the attribute — and the stylesheet does not care who sets it.

## Navlist

The side navigation: a column of links with the dot hanging in the gutter, so the
label column stays aligned whichever item is current.

:::demo
<nav class="navlist" aria-label="Docs" style="max-width: 16rem; padding-inline-start: var(--space-3)">
  <span class="navlist__label">Foundation</span>
  <a class="navlist__link" href="#colour">Colour</a>
  <a class="navlist__link" href="#type" aria-current="page">Typography</a>
  <a class="navlist__link" href="#space">Spacing</a>
  <span class="navlist__label">Components</span>
  <a class="navlist__link" href="#button">Button</a>
  <a class="navlist__link" href="#card">Card</a>
</nav>
:::

:::demo With icons and counts, in a sidebar
<div class="sidebar" style="--side-width: 14rem">
  <nav class="navlist" aria-label="Library" style="padding-inline-start: var(--space-3)">
    <a class="navlist__link" href="#uploads" aria-current="page">
      <svg class="icon icon-sm navlist__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-upload"/></svg>
      Uploads <span class="navlist__count">48</span>
    </a>
    <a class="navlist__link" href="#drafts">
      <svg class="icon icon-sm navlist__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-edit"/></svg>
      Drafts <span class="navlist__count">3</span>
    </a>
    <a class="navlist__link" href="#archive">
      <svg class="icon icon-sm navlist__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-archive"/></svg>
      Archive <span class="navlist__count">212</span>
    </a>
  </nav>
  <div class="card">
    <div class="card__body">
      <span class="card__kicker">Uploads · 48</span>
      <h3 class="card__title">Everything published this season</h3>
    </div>
  </div>
</div>
:::

`.sidebar` is the layout primitive; the navlist has no opinion about
where it sits. Inside an accordion it becomes a collapsible group — see
[Accordion](/accordion.html).

## Pager

Previous and next with titles, for a sequence — a course, a series, the docs. It is
a grid that stacks below 14rem per item.

:::demo
<nav class="pager" aria-label="Lessons">
  <a class="pager__item" href="#prev">
    <span class="pager__dir"><svg class="icon icon-xs" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-left"/></svg> Previous</span>
    <span class="pager__title">The ink ladder</span>
    <span class="pager__meta">Lesson 2 · 08:14</span>
  </a>
  <a class="pager__item pager__item-next" href="#next">
    <span class="pager__dir">Next <svg class="icon icon-xs" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg></span>
    <span class="pager__title">Spacing is a ladder too</span>
    <span class="pager__meta">Lesson 4 · 11:02</span>
  </a>
</nav>
:::

:::demo A first lesson has only a next — it still sits at the end
<nav class="pager" aria-label="Lessons">
  <a class="pager__item pager__item-next" href="#next">
    <span class="pager__dir">Next <svg class="icon icon-xs" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg></span>
    <span class="pager__title">Lighting a talking head</span>
  </a>
</nav>
:::

## Section header

A band's opening line: eyebrow, title, an optional lead, and the one action a band
is allowed. Bottom-aligned, so the title's baseline and the action's sit together
whatever the eyebrow does above.

:::demo
<header class="sec" style="margin-block-end: 0">
  <div class="sec__text">
    <span class="sec__eyebrow"><span class="dot dot-sm dot-live"></span> Fresh this week</span>
    <h2 class="sec__title">Most recent episodes</h2>
  </div>
  <div class="sec__actions">
    <a class="sec__more" href="#all">View all <svg class="icon icon-xs" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg></a>
  </div>
</header>
:::

:::demo With a lead and a ruled bottom
<header class="sec sec-rule" style="margin-block-end: 0">
  <div class="sec__text">
    <span class="sec__eyebrow">Courses</span>
    <h2 class="sec__title">Learn the camera before the software</h2>
    <p class="sec__lead">Four courses, filmed in the order the skills are actually needed — light, sound, framing, then the edit.</p>
  </div>
  <div class="sec__actions">
    <a class="btn btn-outline btn-sm" href="#browse">Browse courses</a>
  </div>
</header>
:::

:::demo Centred
<header class="sec sec-center" style="margin-block-end: 0">
  <div class="sec__text">
    <span class="sec__eyebrow">Viewers</span>
    <h2 class="sec__title">What people say after lesson three</h2>
    <p class="sec__lead">Unedited, and picked by the count of times each was quoted back to me.</p>
  </div>
</header>
:::

## Page header

The top of a collection index. A hero states; a page head just labels — eyebrow,
display title, one lead, then the meta slate in the data voice and the actions.

:::demo
<header class="page-head" style="padding-block-start: 0">
  <span class="page-head__eyebrow"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-camera"/></svg> Collection · Videos</span>
  <h1 class="page-head__title">Everything I've filmed, framed.</h1>
  <p class="page-head__lead">Tutorials, build vlogs and the occasional over-produced answer to a simple question.</p>
  <div class="page-head__meta">
    <span><b>48</b> videos</span>
    <span>Updated 2026-08-30</span>
    <span><a href="#feed">RSS</a></span>
  </div>
  <div class="page-head__actions">
    <a class="btn btn-primary" href="#latest"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg> Watch the latest</a>
    <a class="btn btn-ghost" href="#subscribe">Subscribe</a>
  </div>
</header>
:::

:::demo Compact — a child page (a tag, a lesson index) breathes less
<header class="page-head page-head-sm" style="padding-block-start: 0">
  <span class="page-head__eyebrow">Tag</span>
  <h1 class="page-head__title">Lighting</h1>
  <p class="page-head__lead">Eleven videos on making one lamp look like three.</p>
  <div class="page-head__meta"><span><b>11</b> videos</span><span>Since 2024</span></div>
</header>
:::

:::demo Split — copy left, a block of standing facts right
<header class="page-head page-head-split" style="padding-block-start: 0">
  <div class="page-head__main">
    <span class="page-head__eyebrow">Profile</span>
    <h1 class="page-head__title">Swarnil Singhai</h1>
    <p class="page-head__lead">Salesforce engineer by day, camera operator by the light that is left.</p>
    <div class="page-head__actions">
      <a class="btn btn-primary btn-sm" href="#hire">Work with me</a>
      <a class="btn btn-quiet btn-sm" href="#cv">Download CV</a>
    </div>
  </div>
  <aside class="page-head__aside">
    <dl class="page-head__facts">
      <div class="page-head__fact">
        <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-focus"/></svg>
        <div><dt>Based in</dt><dd>Budapest, Hungary</dd></div>
      </div>
      <div class="page-head__fact">
        <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-clock"/></svg>
        <div><dt>Availability</dt><dd>From October</dd></div>
      </div>
      <div class="page-head__fact">
        <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-mail"/></svg>
        <div><dt>Contact</dt><dd>hello@imswarnil.com</dd></div>
      </div>
    </dl>
  </aside>
</header>
:::

:::demo Centred and flush — no rule beneath, for a head that sits straight on a grid
<header class="page-head page-head-center page-head-flush" style="padding-block-start: 0">
  <span class="page-head__eyebrow">Series</span>
  <h1 class="page-head__title">The desk build, in twelve parts</h1>
  <p class="page-head__lead">A standing desk from a single sheet of ply, filmed one cut at a time.</p>
  <div class="page-head__meta"><span><b>12</b> episodes</span><span>2h 41m</span></div>
</header>
:::

## Chapters, continued

:::demo Numbered, and boxed with a reading-progress fill on the rail
<div class="grid-2">
  <nav class="chapters chapters-numbered" aria-label="On this page">
    <span class="chapters__title">On this page</span>
    <ol class="chapters__list">
      <li><a class="chapters__link" href="#i">Framing</a></li>
      <li><a class="chapters__link" href="#i" aria-current="true">Lighting</a></li>
      <li><a class="chapters__link" href="#i">Audio</a></li>
      <li><a class="chapters__link" href="#i">Export</a></li>
    </ol>
  </nav>
  <nav class="chapters chapters-boxed chapters-progress" aria-label="On this page" style="--progress: 45%">
    <span class="chapters__title">Reading <span class="chapters__count">45%</span></span>
    <ol class="chapters__list">
      <li><a class="chapters__link" href="#i">Framing</a></li>
      <li><a class="chapters__link" href="#i" aria-current="location">Lighting</a></li>
      <li><a class="chapters__link" href="#i">Audio</a></li>
      <li><a class="chapters__link" href="#i">Export</a></li>
    </ol>
  </nav>
</div>
:::

`--progress` is set by the host from scroll position; the fill is the rail's
own accent, growing downward.

:::demo Horizontal — a scrolling row of pills for a phone or a page with no rail
<nav class="chapters chapters-h" aria-label="On this page">
  <ol class="chapters__list">
    <li><a class="chapters__link" href="#i">Framing</a></li>
    <li><a class="chapters__link" href="#i" aria-current="true">Lighting</a></li>
    <li><a class="chapters__link" href="#i">Audio</a></li>
    <li><a class="chapters__link" href="#i">Export settings</a></li>
    <li><a class="chapters__link" href="#i">Thumbnails</a></li>
    <li><a class="chapters__link" href="#i">Publishing</a></li>
  </ol>
</nav>
:::

:::demo Timed — a video's chapters, timecode and title in two aligned columns
<nav class="chapters chapters-timed" aria-label="Chapters" style="max-width: 20rem">
  <span class="chapters__title">Chapters <span class="chapters__count">6</span></span>
  <ol class="chapters__list">
    <li><a class="chapters__link" href="#t=0"><span class="chapters__time">00:00</span>Intro</a></li>
    <li><a class="chapters__link" href="#t=134" aria-current="true"><span class="chapters__time">02:14</span>The key light</a></li>
    <li><a class="chapters__link" href="#t=587"><span class="chapters__time">09:47</span>Fill and rim</a></li>
    <li><a class="chapters__link" href="#t=901"><span class="chapters__time">15:01</span>Bouncing off a wall</a></li>
    <li><a class="chapters__link" href="#t=1208"><span class="chapters__time">20:08</span>Grading two cameras to match</a></li>
    <li><a class="chapters__link" href="#t=1390"><span class="chapters__time">23:10</span>Outro</a></li>
  </ol>
</nav>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--tabs-gap` | Gap between tabs (segmented sets it to 0) |
| `--tab-pad` | Inline padding of a tab; the underline spans between them |
| `--crumb-max` | Width budget per crumb under `.breadcrumb-truncate` |
| `--pagination-h` | Height and minimum width of a page link (`-sm` sets 2rem) |
| `--pagination-gap` | Gap between the page numbers |
| `--chapters-indent` | Indent of a chapter link from the rail; nested links take twice |
| `--chapters-top` | Sticky offset for `.chapters-sticky` |
| `--sec-gap` | Space between a section header and the band it opens |
| `--page-head-pad` | Block padding of the page head (`-sm` is the compact pair) |

Retheme one instance without touching the system:

```css
.lesson-tabs { --tab-pad: var(--space-3); }
.archive .pagination { --pagination-h: 3rem; }
```

## Accessibility

- A tablist is `role="tablist"` with `role="tab"` children; `aria-selected` is the state and `aria-controls` names the panel. Link tabs use `aria-current="page"`.
- A disabled tab is `disabled`, never a class.
- The breadcrumb is an `<ol>` inside `<nav aria-label="Breadcrumb">`; the leaf is unlinked and carries `aria-current="page"`. The ellipsis crumb is `aria-hidden`.
- Pagination is a `<nav>` with a label; the current page carries `aria-current="page"`, icon-only arrows carry `aria-label`, and an arrow that cannot move is `aria-disabled="true"`.
- Chapters and navlist are `<nav>`s with labels; the current entry carries `aria-current="true"`, `"location"` or `"page"`.
- Section and page headers are `<header>` elements with a real `<h1>` or `<h2>`; the eyebrow is a `<span>`, not a heading.
- The one motion here — the arrow nudging on hover — is a single transform under 200ms and collapses to 1ms under `prefers-reduced-motion`.

## Three kinds of "next"

The plain pager is two links. A course, a series and a project all need those
same two links to carry one more thing each — and it is not the same thing. A
lesson needs its **number**, an episode needs its **still**, a project needs its
**mark**. So: three dresses, one component, shared parts.

:::demo `.pager-course` — quiet, numbered, and the two share one border so they read as one control
<nav class="pager pager-course" aria-label="Lessons">
  <a class="pager__item" href="#i">
    <span class="pager__dir"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-left"/></svg> Previous</span>
    <span class="pager__no">Lesson 02</span>
    <span class="pager__title">Recipes and dataflows</span>
    <span class="pager__meta">14:30</span>
  </a>
  <a class="pager__item pager__item-next" href="#i">
    <span class="pager__dir">Next <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></span>
    <span class="pager__no">Lesson 04</span>
    <span class="pager__title">Security predicates</span>
    <span class="pager__meta">11:47</span>
  </a>
</nav>
:::

:::demo `.pager-media` — the still leads on previous and follows on next, so the two mirror each other across the gap
<nav class="pager pager-media" aria-label="Episodes">
  <a class="pager__item" href="#i">
    <span class="pager__thumb"><img src="/assets/media/studio.jpg" alt="" /></span>
    <span class="pager__body">
      <span class="pager__dir"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-left"/></svg> Previous</span>
      <span class="pager__title">The frame layer, explained</span>
      <span class="pager__meta">Episode 47 · 18:30</span>
    </span>
  </a>
  <a class="pager__item pager__item-next" href="#i">
    <span class="pager__thumb"><img src="/assets/media/city.jpg" alt="" /></span>
    <span class="pager__body">
      <span class="pager__dir">Next <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></span>
      <span class="pager__title">Why the thumbnail is the product</span>
      <span class="pager__meta">Episode 46 · 31:12</span>
    </span>
  </a>
</nav>
:::

:::demo `.pager-series` — for a web series, where "next" is an instalment rather than a page
<nav class="pager pager-series" aria-label="Episodes">
  <a class="pager__item" href="#i">
    <span class="pager__thumb"><img src="/assets/media/coast.jpg" alt="" /></span>
    <span class="pager__body">
      <span class="pager__no">S02E03</span>
      <span class="pager__title">The tram episode</span>
      <span class="pager__meta">Lisbon · 22:40</span>
    </span>
  </a>
  <a class="pager__item pager__item-next" href="#i">
    <span class="pager__thumb"><img src="/assets/media/peak.jpg" alt="" /></span>
    <span class="pager__body">
      <span class="pager__no">S02E05</span>
      <span class="pager__title">Four thousand metres</span>
      <span class="pager__meta">Ladakh · 26:12</span>
    </span>
  </a>
</nav>
:::

| Part | Used by |
| --- | --- |
| `.pager__thumb` | media, series — a fixed-width still, so both items are the same size whatever their titles run to |
| `.pager__no` | course, series — the lesson number or `S02E04`, in the data voice |
| `.pager__body` | media, series — the column beside the still |

Below 40rem the mirroring stops (a reversed row on a phone is a row with the
picture in the wrong place) and the course dress goes back to two separate
boxes, because a shared border across a stacked pair is a border in the middle
of nothing.
