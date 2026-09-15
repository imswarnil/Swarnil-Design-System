---
title: Writing
group: Collections
order: 30
lead: The collection with the least metadata and the most words — which makes the card's job harder, not easier.
---

A post has no duration, no price, no star count. The card has one picture, one
category and one number, and it has to make a stranger want to read eight
hundred words. That is the whole design problem here.

## The card

:::demo Grid and list — the same card, one attribute apart
<div class="stack stack-lg">
  <div class="results results-sm cq-card">
    <article class="card card-hover-lift">
      <div class="card__media"><img src="/assets/media/code.jpg" alt="" /><span class="veil veil-grain"></span></div>
      <div class="card__body"><p class="card__kicker">Design systems</p><h4 class="card__title"><a class="card__link" href="#i">Decide once. Then stop deciding.</a></h4><p class="card__excerpt">Why a token-first system is the only kind that survives a rebrand.</p></div>
      <div class="card__footer"><span>Sep 07</span><span class="t-data">8 min</span></div>
    </article>
    <article class="card card-hover-lift">
      <div class="card__media"><img src="/assets/media/desk.jpg" alt="" /><span class="veil veil-grain"></span></div>
      <div class="card__body"><p class="card__kicker">AI</p><h4 class="card__title"><a class="card__link" href="#i">A prompt is a spec you have not written yet</a></h4><p class="card__excerpt">What building agents taught me about writing requirements.</p></div>
      <div class="card__footer"><span>Sep 03</span><span class="t-data">11 min</span></div>
    </article>
    <article class="card card-hover-lift">
      <div class="card__media"><img src="/assets/media/peak.jpg" alt="" /><span class="veil veil-grain"></span></div>
      <div class="card__body"><p class="card__kicker">Travel</p><h4 class="card__title"><a class="card__link" href="#i">Ladakh, on film</a></h4><p class="card__excerpt">Fourteen photographs and the one that did not come out.</p></div>
      <div class="card__footer"><span>Aug 28</span><span class="t-data">6 min</span></div>
    </article>
  </div>
  <div class="results cq-card" data-view="list">
    <article class="card card-hover-lift">
      <div class="card__media"><img src="/assets/media/code.jpg" alt="" /></div>
      <div class="card__body"><p class="card__kicker">Design systems</p><h4 class="card__title"><a class="card__link" href="#i">Decide once. Then stop deciding.</a></h4><p class="card__excerpt">Why a token-first system is the only kind that survives a rebrand — and how three variables carry a whole site.</p></div>
      <div class="card__footer"><span>Sep 07</span><span class="t-data">8 min</span></div>
    </article>
    <article class="card card-hover-lift">
      <div class="card__media"><img src="/assets/media/desk.jpg" alt="" /></div>
      <div class="card__body"><p class="card__kicker">AI</p><h4 class="card__title"><a class="card__link" href="#i">A prompt is a spec you have not written yet</a></h4><p class="card__excerpt">What building agents taught me about writing requirements, and the template I start every one from.</p></div>
      <div class="card__footer"><span>Sep 03</span><span class="t-data">11 min</span></div>
    </article>
  </div>
</div>
:::

This is the collection where the [grid-or-list switch](/results.html) earns
itself. In a grid the pictures do the selling; in a list the **titles** do, and
a reader scanning forty posts for one they have not read wants the list.

## The one fact

**Read time.** Not word count, which means nothing to a reader, and not a
"popularity" number, which is a thing the site wants rather than a thing the
reader asked for.

It sits in `.card__footer` opposite the date, so the two numbers a reader
actually uses — *how old* and *how long* — are the only two on the card.

## The featured one

A blog front page usually wants one post larger than the rest. That is
[`.card-tile`](/card.html) — media behind the words — and it is the only card
on the page allowed to be it.

:::demo The front page shape: one featured, three latest
<div class="grid-2" style="--grid-gap: var(--space-8)">
  <article class="card card-tile card-hover-lift" style="--card-ratio: 16 / 10">
    <div class="card__media veil-mono"><img src="/assets/media/night.jpg" alt="" /><span class="veil veil-grade"></span><span class="veil veil-scrim veil-heavy"></span><span class="card__badge"><span class="badge badge-solid">Featured</span></span></div>
    <div class="card__body"><p class="card__kicker">Design systems · 8 min</p><h3 class="card__title t-h3"><a class="card__link" href="#i">Decide once. Then stop deciding.</a></h3><p class="card__excerpt">Why a token-first system is the only kind that survives a rebrand.</p></div>
  </article>
  <div class="stack stack-sm cq-card">
    <p class="eyebrow">Latest</p>
    <article class="card card-row card-compact card-quiet card-hover-lift"><div class="card__media"><img src="/assets/media/desk.jpg" alt="" /></div><div class="card__body"><p class="card__kicker">AI · Sep 03</p><h4 class="card__title"><a class="card__link" href="#i">A prompt is a spec you have not written yet</a></h4></div></article>
    <article class="card card-row card-compact card-quiet card-hover-lift"><div class="card__media"><img src="/assets/media/peak.jpg" alt="" /></div><div class="card__body"><p class="card__kicker">Travel · Aug 28</p><h4 class="card__title"><a class="card__link" href="#i">Ladakh, on film</a></h4></div></article>
    <article class="card card-row card-compact card-quiet card-hover-lift"><div class="card__media"><img src="/assets/media/city.jpg" alt="" /></div><div class="card__body"><p class="card__kicker">Craft · Aug 21</p><h4 class="card__title"><a class="card__link" href="#i">Why the thumbnail is the product</a></h4></div></article>
  </div>
</div>
:::

## Filters

**Topic**, **year**, **length**. Topic is the real one; year matters because a
blog that has run for a decade has a *history* a reader may want to browse
rather than search.

A post has no other honest axis. Resist adding one: a facet with three items in
it is a facet that makes the column look busy and filters nothing.

## The detail page

The [prose column](/typography.html) at 66ch, the
[share rail](/share.html) beside it, and everything on the
[Article](/content.html) page available inside it. `.pager` — the plain one —
because a post's "next" is chronological and needs no picture to explain
itself.

The whole thing: the [blog home](/templates/blog/index.html) and the
[post](/templates/blog/post.html).
