---
title: Video
group: Collections
order: 20
lead: Two card shapes, because a channel makes two shapes of thing — 16:9 and 9:16 — and pretending otherwise is what makes a shorts wall look broken.
---

The only collection with **two** card shapes, and that is the whole of its
difficulty. Everything else follows from it.

## The cards

:::demo `.card-video` — 16:9, a duration stamp, a play mark
<div class="grid-3 cq-card">
  <article class="card card-video">
    <div class="card__media"><img src="/assets/media/studio.jpg" alt="" /><span class="veil veil-scrim veil-light"></span><span class="card__stamp">24:07</span><span class="card__play" aria-hidden="true"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-play"/></svg></span></div>
    <div class="card__body"><p class="card__kicker">Ep. 48 · Craft</p><h4 class="card__title"><a class="card__link" href="#i">Colour, in one block of tokens</a></h4><p class="card__facts"><span>18k views · 3 days ago</span></p></div>
  </article>
  <article class="card card-video">
    <div class="card__media"><img src="/assets/media/city.jpg" alt="" /><span class="veil veil-scrim veil-light"></span><span class="card__stamp">18:30</span><span class="card__play" aria-hidden="true"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-play"/></svg></span></div>
    <div class="card__body"><p class="card__kicker">Ep. 47 · Craft</p><h4 class="card__title"><a class="card__link" href="#i">The frame layer, explained</a></h4><p class="card__facts"><span>31k views · 1 week ago</span></p></div>
  </article>
  <article class="card card-video">
    <div class="card__media"><img src="/assets/media/night.jpg" alt="" /><span class="veil veil-scrim veil-light"></span><span class="card__stamp">31:12</span><span class="card__play" aria-hidden="true"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-play"/></svg></span></div>
    <div class="card__body"><p class="card__kicker">Ep. 46 · Business</p><h4 class="card__title"><a class="card__link" href="#i">Why the thumbnail is the product</a></h4><p class="card__facts"><span>92k views · 2 weeks ago</span></p></div>
  </article>
</div>
:::

:::demo `.card-story` — 9:16, the title on the picture, no separate body
<div class="results results-sm cq-card">
  <article class="card card-story card-tile card-hover-zoom"><div class="card__media"><img src="/assets/media/portrait.jpg" alt="" /><span class="veil veil-scrim veil-heavy"></span><span class="card__stamp">0:48</span></div><div class="card__body"><h4 class="card__title"><a class="card__link" href="#i">The one light setup</a></h4></div></article>
  <article class="card card-story card-tile card-hover-zoom"><div class="card__media"><img src="/assets/media/peak.jpg" alt="" /><span class="veil veil-scrim veil-heavy"></span><span class="card__stamp">0:36</span></div><div class="card__body"><h4 class="card__title"><a class="card__link" href="#i">Stop centring everything</a></h4></div></article>
  <article class="card card-story card-tile card-hover-zoom"><div class="card__media"><img src="/assets/media/coast.jpg" alt="" /><span class="veil veil-scrim veil-heavy"></span><span class="card__stamp">1:02</span></div><div class="card__body"><h4 class="card__title"><a class="card__link" href="#i">Why your audio sounds thin</a></h4></div></article>
  <article class="card card-story card-tile card-hover-zoom"><div class="card__media"><img src="/assets/media/road.jpg" alt="" /><span class="veil veil-scrim veil-heavy"></span><span class="card__stamp">0:29</span></div><div class="card__body"><h4 class="card__title"><a class="card__link" href="#i">Cheap tripod, good shot</a></h4></div></article>
</div>
:::

The vertical card puts the title **on** the picture rather than under it,
because a 9:16 thumbnail is already tall and a body underneath makes a column
that will not fit four across on anything.

`.card-reel` is the same 9:16 with a width cap, for a loose row. `.card-story`
has no cap, because in a grid the grid decides.

## The one fact

**Duration.** It goes on the picture as `.card__stamp`, bottom-right on a
16:9 and top-right on a tile — the tile's bottom belongs to the words.

Views and age are a second line in `.card__facts`, and they are optional: a
channel that does not want to show view counts loses nothing structural by
dropping them.

## The row

A channel front page is rows, not a grid — and the row shape is
[`.shelf`](/shelf.html), which is the one component built specifically for
"many items, several visible, obviously more".

:::demo Latest, and the ranked shorts row
<div class="stack stack-xl">
  <section class="shelf shelf-inset">
    <header class="shelf__head"><h3 class="shelf__title">Latest uploads</h3><span class="shelf__meta">128 total</span></header>
    <div class="shelf__track cq-card ix-dim">
      <article class="shelf__item"><article class="card card-video"><div class="card__media"><img src="/assets/media/studio.jpg" alt="" /><span class="card__stamp">24:07</span></div><div class="card__body"><h4 class="card__title">Colour, in one block</h4></div></article></article>
      <article class="shelf__item"><article class="card card-video"><div class="card__media"><img src="/assets/media/city.jpg" alt="" /><span class="card__stamp">18:30</span></div><div class="card__body"><h4 class="card__title">The frame layer</h4></div></article></article>
      <article class="shelf__item"><article class="card card-video"><div class="card__media"><img src="/assets/media/night.jpg" alt="" /><span class="card__stamp">31:12</span></div><div class="card__body"><h4 class="card__title">The thumbnail is the product</h4></div></article></article>
      <article class="shelf__item"><article class="card card-video"><div class="card__media"><img src="/assets/media/road.jpg" alt="" /><span class="card__stamp">22:41</span></div><div class="card__body"><h4 class="card__title">Rebuilt in a weekend</h4></div></article></article>
    </div>
  </section>
  <section class="shelf shelf-ranked shelf-tall shelf-inset">
    <header class="shelf__head"><h3 class="shelf__title">Shorts, ranked</h3><span class="shelf__meta">9:16 · 64</span></header>
    <div class="shelf__track cq-card">
      <article class="shelf__item"><article class="card card-story card-tile"><div class="card__media"><img src="/assets/media/portrait.jpg" alt="" /><span class="veil veil-scrim veil-heavy"></span><span class="card__stamp">0:48</span></div><div class="card__body"><h4 class="card__title">One light</h4></div></article></article>
      <article class="shelf__item"><article class="card card-story card-tile"><div class="card__media"><img src="/assets/media/peak.jpg" alt="" /><span class="veil veil-scrim veil-heavy"></span><span class="card__stamp">0:36</span></div><div class="card__body"><h4 class="card__title">Stop centring</h4></div></article></article>
      <article class="shelf__item"><article class="card card-story card-tile"><div class="card__media"><img src="/assets/media/coast.jpg" alt="" /><span class="veil veil-scrim veil-heavy"></span><span class="card__stamp">1:02</span></div><div class="card__body"><h4 class="card__title">Thin audio</h4></div></article></article>
      <article class="shelf__item"><article class="card card-story card-tile"><div class="card__media"><img src="/assets/media/desk.jpg" alt="" /><span class="veil veil-scrim veil-heavy"></span><span class="card__stamp">0:29</span></div><div class="card__body"><h4 class="card__title">Cheap tripod</h4></div></article></article>
    </div>
  </section>
</div>
:::

## Filters

**Category** and **length**. Not "tags" — a channel with forty tags has no
taxonomy, and a facet list nobody can read filters nothing.

Length is the one filter people actually use and almost nobody ships: *under
ten minutes* is a different viewing decision from *over thirty*, and it is the
question a viewer is really asking when they scan durations.

## The detail page

The [player](/video.html) at the top, then title, channel row, description,
[timestamps](/timestamps.html), and the thread. The two shapes diverge here:
16:9 gets a full-width stage; 9:16 gets a **sticky portrait stage** with the
words beside it, because a vertical video in a full-width band is a column of
letterboxing.

## Next

`.pager-media` — the still leads on previous and follows on next, so the two
mirror each other across the gap the way the arrows do. For a numbered series,
`.pager-series` puts `S02E04` above the title.

See it whole: the [channel](/templates/video/index.html), the
[16:9 episode](/templates/video/post.html) and the
[9:16 short](/templates/video/short.html).
