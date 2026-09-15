---
title: Timestamps
group: Components
order: 50
lead: A list of moments in a video — in a description, a comment, a transcript, or a sentence. The timecode is data, and it always aligns.
---

Not the same object as [`.chapters`](/navigation.html), and the difference is
worth stating because the two look alike and behave completely differently.

| | What it is |
| --- | --- |
| `.chapters` | the video's **own** structure — authored, complete, ordered, and the player knows about it |
| `.timestamps` | a **list of moments**. It may be partial, it may be somebody else's, and nothing guarantees it covers the runtime |

That is why this one is built to sit anywhere, and why the timecode carries the
link rather than the row being the link. A timecode inside a sentence is the
commonest form of this on the internet, and a component that cannot do it has
missed the point.

## The list

:::demo
<div class="w-lg">
  <p class="timestamps__head">Timestamps <span class="timestamps__count">7</span></p>
  <ol class="timestamps">
    <li><a class="ts" href="#t=0" data-done><span class="ts__time">0:00</span><span class="ts__label">Cold open — the bug that started it</span></a></li>
    <li><a class="ts" href="#t=72" data-done><span class="ts__time">1:12</span><span class="ts__label">Why "primary blue" is not a token</span></a></li>
    <li><a class="ts" href="#t=260" aria-current="true"><span class="ts__time">4:20</span><span class="ts__label">Building the eight ramps</span></a></li>
    <li><a class="ts" href="#t=587"><span class="ts__time">9:47</span><span class="ts__label">light-dark() and the two-branch trap</span></a></li>
    <li><a class="ts" href="#t=790"><span class="ts__time">13:10</span><span class="ts__label">Dark mode is not an inversion</span></a></li>
    <li><a class="ts" href="#t=1082"><span class="ts__time">18:02</span><span class="ts__label">Contrast, measured rather than eyeballed</span></a></li>
    <li><a class="ts" href="#t=1351"><span class="ts__time">22:31</span><span class="ts__label">What I would do differently</span></a></li>
  </ol>
</div>
:::

**The timecode is data, always.** Tabular figures, the data voice, and a fixed
width in `ch` so a column of them aligns whether the video is four minutes or
four hours. That alignment is the entire reason to reach for a component here
rather than a list of links.

`.timestamps-long` widens the column for anything over an hour, so `1:04:20`
does not push its label out of line.

:::demo A long one, numbered and ruled, with notes
<div class="w-lg">
  <ol class="timestamps timestamps-long timestamps-numbered timestamps-ruled">
    <li><a class="ts" href="#t=0"><span class="ts__time">0:00:00</span><span class="ts__label">Introduction</span><span class="ts__note">4 min</span></a></li>
    <li><a class="ts" href="#t=254"><span class="ts__time">0:04:14</span><span class="ts__label">Setting up the org</span><span class="ts__note">18 min</span></a></li>
    <li><a class="ts" href="#t=1340" aria-current="true"><span class="ts__time">0:22:20</span><span class="ts__label">The first dataflow</span><span class="ts__note">31 min</span></a></li>
    <li><a class="ts" href="#t=3200"><span class="ts__time">0:53:20</span><span class="ts__label">Joins, and where they go wrong</span><span class="ts__note">26 min</span></a></li>
    <li><a class="ts" href="#t=4760"><span class="ts__time">1:19:20</span><span class="ts__label">Handing it over</span><span class="ts__note">12 min</span></a></li>
  </ol>
</div>
:::

## With stills

For a list being **browsed** rather than read.

:::demo Boxed, with a still per moment
<div class="w-lg">
  <div class="timestamps timestamps-boxed">
    <p class="timestamps__head">Jump to <span class="timestamps__count">4</span></p>
    <a class="ts" href="#t=0"><span class="ts__thumb"><img src="/assets/media/studio.jpg" alt="" /></span><span class="ts__time">0:00</span><span class="ts__label">The problem with three lights</span></a>
    <a class="ts" href="#t=9" aria-current="true"><span class="ts__thumb"><img src="/assets/media/desk.jpg" alt="" /></span><span class="ts__time">0:09</span><span class="ts__label">Where the key actually goes</span></a>
    <a class="ts" href="#t=30"><span class="ts__thumb"><img src="/assets/media/camera.jpg" alt="" /></span><span class="ts__time">0:30</span><span class="ts__label">Bounce it off the wall</span></a>
    <a class="ts" href="#t=41"><span class="ts__thumb"><img src="/assets/media/night.jpg" alt="" /></span><span class="ts__time">0:41</span><span class="ts__label">The result, ungraded</span></a>
  </div>
</div>
:::

:::demo Sideways — a scrolling row of moments, for under a player
<div class="timestamps timestamps-h">
  <a class="ts" href="#t=0"><span class="ts__thumb"><img src="/assets/media/coast.jpg" alt="" /></span><span class="ts__time">0:00</span><span class="ts__label">Cold open</span></a>
  <a class="ts" href="#t=72"><span class="ts__thumb"><img src="/assets/media/road.jpg" alt="" /></span><span class="ts__time">1:12</span><span class="ts__label">The setup</span></a>
  <a class="ts" href="#t=260" aria-current="true"><span class="ts__thumb"><img src="/assets/media/peak.jpg" alt="" /></span><span class="ts__time">4:20</span><span class="ts__label">The ramps</span></a>
  <a class="ts" href="#t=587"><span class="ts__thumb"><img src="/assets/media/city.jpg" alt="" /></span><span class="ts__time">9:47</span><span class="ts__label">Two branches</span></a>
  <a class="ts" href="#t=790"><span class="ts__thumb"><img src="/assets/media/night.jpg" alt="" /></span><span class="ts__time">13:10</span><span class="ts__label">Dark mode</span></a>
</div>
:::

## In a sentence

The commonest timestamp on the internet is a timecode inside running text — a
comment saying "the bit at 9:47". That is
[`.timecode-link`](/badge.html), and it needs no list at all.

:::demo
<div class="stack">
  <article class="prose">
    <p>The <a class="timecode timecode-link timecode-sm" href="#t=790">13:10</a>
    bit finally made dark mode click for me — though the correction at
    <a class="timecode timecode-link timecode-sm" href="#t=1082">18:02</a> is
    the one I keep sending people.</p>
  </article>
  <div class="cluster cluster-sm">
    <span class="timecode">00:24:07</span>
    <span class="timecode timecode-sm">4:20</span>
    <span class="timecode timecode-lg">01:19:04</span>
    <span class="timecode timecode-live">LIVE</span>
    <a class="timecode timecode-link" href="#i" aria-current="true">09:47</a>
  </div>
</div>
:::

## States

| Attribute | Means |
| --- | --- |
| `aria-current="true"` | playing now — the accent, never a fill |
| `data-done` | watched — quieter, and still a link |

A list of twenty filled rows is a list with no current one, which is why the
current moment takes colour and weight rather than a background.

## Accessibility

- The row is the link, so the tap target is the whole row rather than a
  four-character timecode.
- Give the list a heading, or the `<ol>` an `aria-label` — "timestamps" on its
  own is not enough when a page has two.
- `aria-current="true"` on the playing moment, set by whatever is watching the
  player. Without it the list is still correct, just not self-aware.
- Timecodes are `tabular-nums`, so a screen magnifier user tracking down the
  column does not lose their place between rows.
