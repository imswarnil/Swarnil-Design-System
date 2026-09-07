---
title: Carousel
group: Components
order: 64
lead: A scroll-snap rail with page dots, and the marquee — the two things that move sideways, both without a script.
---

:::demo Drag, swipe, or use the dots — each dot is a link to a slide
<div class="carousel">
  <div class="carousel__track">
    <div class="carousel__slide" id="c1-s1"><div class="poster"><div class="poster__label"><span class="poster__eyebrow">Episode 12</span><span class="poster__title">Lighting a two-camera interview</span></div></div></div>
    <div class="carousel__slide" id="c1-s2"><div class="poster"><div class="poster__label"><span class="poster__eyebrow">Episode 11</span><span class="poster__title">The audio chain</span></div></div></div>
    <div class="carousel__slide" id="c1-s3"><div class="poster"><div class="poster__label"><span class="poster__eyebrow">Episode 10</span><span class="poster__title">Why the thumbnail is the product</span></div></div></div>
    <div class="carousel__slide" id="c1-s4"><div class="poster"><div class="poster__label"><span class="poster__eyebrow">Episode 9</span><span class="poster__title">One mic, two people</span></div></div></div>
    <div class="carousel__slide" id="c1-s5"><div class="poster"><div class="poster__label"><span class="poster__eyebrow">Episode 8</span><span class="poster__title">Export settings</span></div></div></div>
  </div>
  <nav class="carousel__nav" aria-label="Slides">
    <a class="carousel__dot" href="#c1-s1" aria-current="true" aria-label="Slide 1"></a>
    <a class="carousel__dot" href="#c1-s2" aria-label="Slide 2"></a>
    <a class="carousel__dot" href="#c1-s3" aria-label="Slide 3"></a>
    <a class="carousel__dot" href="#c1-s4" aria-label="Slide 4"></a>
    <a class="carousel__dot" href="#c1-s5" aria-label="Slide 5"></a>
  </nav>
</div>
:::

The track is a scroll container with `scroll-snap`; the dots are anchor links
to the slides. That is the whole implementation, and it works with a keyboard,
a screen reader and no JavaScript. What a script *would* add — dots that follow
the scroll, autoplay — is left out on purpose. Autoplay is motion nobody asked
for, and a dot that follows the scroll is a nicety the host can add in ten
lines when it has earned it. One honest cost: an anchor jump also scrolls the
page to the slide, because that is what anchors do.

For a plain rail without dots, the layout primitive `.reel` is enough; the
carousel is the reel with navigation.

## One slide per view

`.carousel-full` makes each slide the width of the track. Prev/next arrows are
anchors too, sitting on the rail's edges.

:::demo
<div class="carousel carousel-full">
  <div class="carousel__track">
    <div class="carousel__slide" id="c2-s1"><div class="poster ratio-wide"><div class="poster__label"><span class="poster__eyebrow">Featured</span><span class="poster__title">The studio, rebuilt in a spare room</span></div></div></div>
    <div class="carousel__slide" id="c2-s2"><div class="poster ratio-wide"><div class="poster__label"><span class="poster__eyebrow">Featured</span><span class="poster__title">A year of uploads, by the numbers</span></div></div></div>
    <div class="carousel__slide" id="c2-s3"><div class="poster ratio-wide"><div class="poster__label"><span class="poster__eyebrow">Featured</span><span class="poster__title">The course is live</span></div></div></div>
  </div>
  <a class="carousel__arrow carousel__arrow-prev" href="#c2-s1" aria-label="Previous slide"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-left"/></svg></a>
  <a class="carousel__arrow carousel__arrow-next" href="#c2-s2" aria-label="Next slide"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></a>
  <nav class="carousel__nav" aria-label="Slides">
    <a class="carousel__dot" href="#c2-s1" aria-current="true" aria-label="Slide 1"></a>
    <a class="carousel__dot" href="#c2-s2" aria-label="Slide 2"></a>
    <a class="carousel__dot" href="#c2-s3" aria-label="Slide 3"></a>
  </nav>
</div>
:::

## Peek and centre

`.carousel-peek` leaves the edge of the next slide showing — that edge *is* the
affordance, more honest than an arrow. `.carousel-center` snaps each slide to
the middle instead of the start.

:::demo
<div class="carousel carousel-peek carousel-center">
  <div class="carousel__track">
    <div class="carousel__slide"><div class="card"><div class="card__body"><p class="t-label">Course</p><p class="u-semibold">Lighting for one-person crews</p></div></div></div>
    <div class="carousel__slide"><div class="card"><div class="card__body"><p class="t-label">Course</p><p class="u-semibold">Audio that does not need fixing</p></div></div></div>
    <div class="carousel__slide"><div class="card"><div class="card__body"><p class="t-label">Course</p><p class="u-semibold">Thumbnails people click</p></div></div></div>
    <div class="carousel__slide"><div class="card"><div class="card__body"><p class="t-label">Course</p><p class="u-semibold">Editing to the beat</p></div></div></div>
  </div>
</div>
:::

## The marquee

A looping strip. Duplicate the run and hide the twin from assistive
technology; hovering pauses it. Under reduced motion it becomes a plain
scrollable row — the same content, reachable, standing still — and the twin is
dropped so nothing is read twice. It writes its own reduced-motion rule because
28 seconds is not feedback and the global kill switch only collapses the
feedback durations.

:::demo
<div class="marquee">
  <div class="marquee__run">
    <span class="chip">Sony FX3</span><span class="chip">Sennheiser MKE 600</span><span class="chip">Aputure 300d</span><span class="chip">DaVinci Resolve</span><span class="chip">Ghost</span><span class="chip">Cloudflare</span>
  </div>
  <div class="marquee__run" aria-hidden="true">
    <span class="chip">Sony FX3</span><span class="chip">Sennheiser MKE 600</span><span class="chip">Aputure 300d</span><span class="chip">DaVinci Resolve</span><span class="chip">Ghost</span><span class="chip">Cloudflare</span>
  </div>
</div>
:::

:::demo Reverse and fast; slow
<div class="stack">
  <div class="marquee marquee-reverse marquee-fast">
    <div class="marquee__run"><span class="t-label">Episodes</span><span class="t-label">Live</span><span class="t-label">Podcast</span><span class="t-label">Courses</span><span class="t-label">Newsletter</span><span class="t-label">Shorts</span></div>
    <div class="marquee__run" aria-hidden="true"><span class="t-label">Episodes</span><span class="t-label">Live</span><span class="t-label">Podcast</span><span class="t-label">Courses</span><span class="t-label">Newsletter</span><span class="t-label">Shorts</span></div>
  </div>
  <div class="marquee marquee-slow">
    <div class="marquee__run"><span class="t-label">Episodes</span><span class="t-label">Live</span><span class="t-label">Podcast</span><span class="t-label">Courses</span><span class="t-label">Newsletter</span><span class="t-label">Shorts</span></div>
    <div class="marquee__run" aria-hidden="true"><span class="t-label">Episodes</span><span class="t-label">Live</span><span class="t-label">Podcast</span><span class="t-label">Courses</span><span class="t-label">Newsletter</span><span class="t-label">Shorts</span></div>
  </div>
</div>
:::

:::demo Vertical — a ticker of recent viewers
<div class="marquee marquee-vertical w-sm">
  <div class="marquee__run"><span>Priya joined from Pune</span><span>Marco subscribed</span><span>Aisha shared episode 12</span><span>Tomas left a comment</span><span>Lena bought the course</span></div>
  <div class="marquee__run" aria-hidden="true"><span>Priya joined from Pune</span><span>Marco subscribed</span><span>Aisha shared episode 12</span><span>Tomas left a comment</span><span>Lena bought the course</span></div>
</div>
:::

:::demo Logos — grey until touched
<div class="marquee marquee-logos marquee-slow">
  <div class="marquee__run"><span class="t-h3">YouTube</span><span class="t-h3">Ghost</span><span class="t-h3">Cloudflare</span><span class="t-h3">Salesforce</span><span class="t-h3">DaVinci</span><span class="t-h3">OBS</span></div>
  <div class="marquee__run" aria-hidden="true"><span class="t-h3">YouTube</span><span class="t-h3">Ghost</span><span class="t-h3">Cloudflare</span><span class="t-h3">Salesforce</span><span class="t-h3">DaVinci</span><span class="t-h3">OBS</span></div>
</div>
:::

:::demo Band — the one place a marquee may wear the accent; inverse, on ink
<div class="stack stack-sm">
  <div class="marquee marquee-band marquee-fast">
    <div class="marquee__run"><span>New episode every Thursday</span><span class="marquee__sep">◆</span><span>Course 3 is live</span><span class="marquee__sep">◆</span><span>Ladakh, on film</span><span class="marquee__sep">◆</span></div>
    <div class="marquee__run" aria-hidden="true"><span>New episode every Thursday</span><span class="marquee__sep">◆</span><span>Course 3 is live</span><span class="marquee__sep">◆</span><span>Ladakh, on film</span><span class="marquee__sep">◆</span></div>
  </div>
  <div class="marquee marquee-band marquee-inverse marquee-flush">
    <div class="marquee__run"><span>Videos</span><span class="marquee__sep">·</span><span>Code</span><span class="marquee__sep">·</span><span>Courses</span><span class="marquee__sep">·</span><span>Travel</span><span class="marquee__sep">·</span><span>Film</span><span class="marquee__sep">·</span></div>
    <div class="marquee__run" aria-hidden="true"><span>Videos</span><span class="marquee__sep">·</span><span>Code</span><span class="marquee__sep">·</span><span>Courses</span><span class="marquee__sep">·</span><span>Travel</span><span class="marquee__sep">·</span><span>Film</span><span class="marquee__sep">·</span></div>
  </div>
</div>
:::

:::demo Large — display type running, one word per item
<div class="marquee marquee-lg marquee-slow">
  <div class="marquee__run"><span>Make</span><span class="t-accent">·</span><span>Film</span><span class="t-accent">·</span><span>Write</span><span class="t-accent">·</span><span>Teach</span><span class="t-accent">·</span><span>Ship</span><span class="t-accent">·</span></div>
  <div class="marquee__run" aria-hidden="true"><span>Make</span><span class="t-accent">·</span><span>Film</span><span class="t-accent">·</span><span>Write</span><span class="t-accent">·</span><span>Teach</span><span class="t-accent">·</span><span>Ship</span><span class="t-accent">·</span></div>
</div>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--carousel-slide` | flex-basis of a slide |
| `--carousel-gap` | gap between slides |
| `--marquee-gap` | gap between items and between the two runs |
| `--marquee-dur` | one full loop |
| `--marquee-h` | height of a vertical marquee |

## Accessibility

- Every dot and arrow is an `<a>` with an `aria-label`; the current dot is
  `aria-current="true"`.
- The track is a scroll container and reachable by keyboard; the slides need
  `id`s for the anchors.
- The second `.marquee__run` is `aria-hidden="true"` — it exists for the loop,
  not the reader.
- Never autoplay a carousel. A marquee is the one thing here that moves on its
  own, and it stops on hover, on focus, and under reduced motion.
