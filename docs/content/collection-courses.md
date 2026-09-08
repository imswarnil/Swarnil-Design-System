---
title: Courses
group: Collections
order: 40
lead: The only collection where the reader has a state — how far through they are — and every part of it has to carry that state or contradict it.
---

Video, writing and projects are things you look at. A course is a thing you are
**partway through**, and that single difference drives every decision here.

## The card

Progress is on the card's own bottom edge, so it costs no height and a grid of
six courses tells you at a glance which one you abandoned.

:::demo Three states: in progress, not started, finished
<div class="grid-3 cq-card">
  <article class="card card-video card-hover-frame frame-hover">
    <div class="card__media"><img src="/assets/media/desk.jpg" alt="" /><span class="veil veil-scrim veil-light"></span><span class="card__stamp">3h 40m</span><span class="card__badge"><span class="badge badge-solid">Intermediate</span></span></div>
    <div class="card__body"><p class="card__kicker">Course · 12 lessons</p><h4 class="card__title"><a class="card__link" href="#i">CRM Analytics, from zero</a></h4><p class="card__facts"><span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-users"/></svg> 5,880</span><span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-clock"/></svg> 3h 40m</span></p></div>
    <div class="card__footer"><span class="card__price">₹3,499</span><span class="t-data">33% watched</span></div>
    <span class="card__progress" style="--value: 33%"></span>
  </article>
  <article class="card card-video card-hover-frame frame-hover">
    <div class="card__media"><img src="/assets/media/studio.jpg" alt="" /><span class="veil veil-scrim veil-light"></span><span class="card__stamp">1h 12m</span><span class="card__badge"><span class="badge badge-solid">Beginner</span></span></div>
    <div class="card__body"><p class="card__kicker">Course · 6 lessons</p><h4 class="card__title"><a class="card__link" href="#i">Lighting a talking head</a></h4><p class="card__facts"><span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-users"/></svg> 4,102</span><span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-clock"/></svg> 1h 12m</span></p></div>
    <div class="card__footer"><span class="card__price">₹1,499</span><span class="t-data">not started</span></div>
  </article>
  <article class="card card-video card-hover-frame frame-hover">
    <div class="card__media"><img src="/assets/media/code.jpg" alt="" /><span class="veil veil-scrim veil-light"></span><span class="card__stamp">58m</span><span class="card__badge"><span class="badge badge-success">Finished</span></span></div>
    <div class="card__body"><p class="card__kicker">Course · 5 lessons</p><h4 class="card__title"><a class="card__link" href="#i">Edit faster than you shoot</a></h4><p class="card__facts"><span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-users"/></svg> 3,214</span><span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-clock"/></svg> 58m</span></p></div>
    <div class="card__footer"><span class="card__price">₹999</span><span class="t-data">100%</span></div>
    <span class="card__progress" style="--value: 100%"></span>
  </article>
</div>
:::

## The one fact

**Lessons**, not hours. "Twelve lessons" is a commitment somebody can picture;
"3h 40m" is a number they will compare to an evening and lose. The runtime goes
on the picture as a stamp, where it is available without being the headline.

## The path

A catalogue of six courses in no order is six decisions. The
[track](/curriculum.html) says which one is first, and it is the single most
useful thing a course listing can do.

:::demo `.track` — the catalogue as one path
<ol class="track">
  <li class="track__stop" data-done><span class="track__node"></span><span class="track__title">Light</span><span class="track__meta">6 lessons</span></li>
  <li class="track__stop" data-done><span class="track__node"></span><span class="track__title">Sound</span><span class="track__meta">5 lessons</span></li>
  <li class="track__stop" aria-current="step"><span class="track__node"></span><span class="track__title">Framing</span><span class="track__meta">4 lessons</span></li>
  <li class="track__stop"><span class="track__node"></span><span class="track__title">The edit</span><span class="track__meta">8 lessons</span></li>
  <li class="track__stop"><span class="track__node"></span><span class="track__title">Publish</span><span class="track__meta">9 lessons</span></li>
</ol>
:::

## Filters

**Level**, and **progress**. Level is what a stranger filters by; progress is
what a returning student filters by, and "in progress" is the facet they will
use every single time.

## The detail page

The [curriculum](/curriculum.html) is the page. Everything else — trailer,
outcomes, reviews, instructor — is argument for reading it.

The hierarchy inside it is three steps and they must all be visible: the course
title is display type, a **module** title is base-size semibold, a **lesson**
is small regular. A syllabus where the module and the lesson are the same size
is a syllabus you can only navigate by reading every row.

:::demo Three levels, one component
<section class="curriculum w-lg">
  <header class="curriculum__head">
    <h3 class="curriculum__title">CRM Analytics, from zero</h3>
    <span class="curriculum__meta">12 lessons · 3h 40m</span>
    <progress class="progress progress-thin" value="4" max="12" aria-label="4 of 12 watched"></progress>
  </header>
  <div class="curriculum__modules">
    <details class="curriculum__module" open>
      <summary><span class="curriculum__shot"><img src="/assets/media/code.jpg" alt="" /></span><span class="curriculum__no">01</span><span class="curriculum__module-title">The data model</span><span class="curriculum__count">4 lessons</span></summary>
      <ol class="curriculum__lessons">
        <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">What a dataset actually is</span><span class="lesson__len">08:12</span></a></li>
        <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">Recipes and dataflows</span><span class="lesson__len">14:30</span></a></li>
        <li><a class="lesson" href="#i" aria-current="page"><span class="lesson__tick"></span><span class="lesson__title">Joins, and where they go wrong</span><span class="lesson__len">19:04</span></a></li>
        <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">Security predicates</span><span class="lesson__len">11:48</span></a></li>
      </ol>
    </details>
    <details class="curriculum__module">
      <summary><span class="curriculum__shot"><img src="/assets/media/city.jpg" alt="" /></span><span class="curriculum__no">02</span><span class="curriculum__module-title">Building the dashboard</span><span class="curriculum__count">5 lessons</span></summary>
      <ol class="curriculum__lessons">
        <li><a class="lesson" href="#i"><span class="lesson__tick"></span><span class="lesson__title">The first widget</span><span class="lesson__free">Free</span><span class="lesson__len">09:20</span></a></li>
        <li><a class="lesson" href="#i" data-locked><span class="lesson__tick"></span><span class="lesson__title">Bindings, the readable way</span><span class="lesson__len">22:15</span></a></li>
      </ol>
    </details>
  </div>
</section>
:::

A lesson is legible **at rest**, and the states make it quieter — watched, or
locked. The reverse, which is easy to write by accident, produces a syllabus
that reads as a list of things you cannot have.

## Next

`.pager-course`: quiet, numbered, and the two items share one border so they
read as one control rather than two cards. A lesson's next is never ambiguous,
so it needs no picture to explain itself.

The whole thing: the [catalogue](/templates/courses/index.html), a
[course](/templates/courses/course.html) and the
[lesson player](/templates/courses/lesson.html).
