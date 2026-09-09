---
title: What a collection is
group: Collections
order: 10
lead: A collection is a kind of thing you make more than one of. Every one of them is the same five parts — and knowing that is what stops the sixth collection becoming a sixth codebase.
---

A creator site is not one site. It is a video channel, a blog, a course
catalogue, a portfolio and a travel log wearing the same clothes. Each of those
is a **collection**: a kind of thing you make more than one of.

The temptation is to design each one separately, because an episode really is
not a blog post. The result is five listing pages that disagree about where the
date goes. What actually differs between collections is small and specific, and
this section is about naming it — so the sixth collection is an afternoon
rather than a rebuild.

## Every collection is the same five parts

| Part | What it is | Built from |
| --- | --- | --- |
| **The card** | one item, at a glance | [`.card`](https://bulma.io/documentation/components/card/) + a content type |
| **The listing** | all of them, filtered | [`.results`](/results.html) + [`.facets`](/filter.html) |
| **The row** | a few of them, on another page | [`.shelf`](/shelf.html) or [`.deck`](/deck.html) |
| **The detail** | one item, in full | [`page-head`](https://bulma.io/documentation/components/tabs/) + the body |
| **The pager** | the one after this one | [`.pager`](https://bulma.io/documentation/components/tabs/) |

Nothing in that table is per-collection. What *is* per-collection is four
decisions, and they are the only four you have to make.

## The four decisions

**1 · What shape is the card's picture?** A video is 16:9 because that is what
was filmed. A short is 9:16. A course is 16:9 with a progress edge. A project
may have no picture at all. This is `--card-ratio`, and it is usually the whole
difference between two card recipes.

**2 · What is the one fact?** Every card carries exactly one number that
matters, in the data voice: a duration, a read time, a lesson count, a star
count. Two facts is a spec sheet; none is a card you cannot rank.

**3 · What do people filter by?** The facet column is the collection's real
schema. Video filters by category and length; projects by *skill*; courses by
level. If you cannot name three facets, the collection is not a collection
yet — it is a page.

**4 · What is "next"?** A lesson's next is the next lesson. An episode's next
is the next episode. A post's next is whatever is chronologically adjacent, and
a project's next is arbitrary — so it gets a mark rather than a number. That is
the choice between the three [pager dresses](https://bulma.io/documentation/components/tabs/).

## The shape, once

Every listing page in the [templates](/templates.html) is this, and only the
four decisions above change between them.

:::demo A listing, in miniature — bar, facets, results, pager
<section class="browse">
  <div class="filterbar">
    <p class="filterbar__count"><strong>3</strong> of 128</p>
    <div class="filterbar__actions">
      <label><span class="u-sr-only">Sort</span><select class="select select-sm"><option>Newest first</option><option>Most watched</option></select></label>
      <div class="viewtoggle" role="group" aria-label="View">
        <label class="viewtoggle__opt"><input type="radio" name="col-view" value="grid" checked /><span class="u-sr-only">Grid</span><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-grid"/></svg></label>
        <label class="viewtoggle__opt"><input type="radio" name="col-view" value="list" /><span class="u-sr-only">List</span><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-menu"/></svg></label>
      </div>
    </div>
  </div>
  <div class="results results-sm cq-card">
    <article class="card card-video card-hover-lift"><div class="card__media"><img src="/assets/media/studio.jpg" alt="" /><span class="card__stamp">24:07</span></div><div class="card__body"><p class="card__kicker">Ep. 48 · Craft</p><h4 class="card__title"><a class="card__link" href="#i">Colour, in one block of tokens</a></h4></div></article>
    <article class="card card-video card-hover-lift"><div class="card__media"><img src="/assets/media/city.jpg" alt="" /><span class="card__stamp">18:30</span></div><div class="card__body"><p class="card__kicker">Ep. 47 · Craft</p><h4 class="card__title"><a class="card__link" href="#i">The frame layer, explained</a></h4></div></article>
    <article class="card card-video card-hover-lift"><div class="card__media"><img src="/assets/media/night.jpg" alt="" /><span class="card__stamp">31:12</span></div><div class="card__body"><p class="card__kicker">Ep. 46 · Business</p><h4 class="card__title"><a class="card__link" href="#i">Why the thumbnail is the product</a></h4></div></article>
    <div class="results__foot">
      <nav class="pagination pagination-between" aria-label="Pages">
        <span class="pagination__link" aria-disabled="true" aria-label="Previous"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-left"/></svg></span>
        <span class="pagination__status">Page 1 of 43</span>
        <a class="pagination__link" href="#i" aria-label="Next"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></a>
      </nav>
    </div>
  </div>
</section>
:::

Swap `card-video` for `card-story` and it is the shorts wall. Swap it for
`card-repo` and it is the portfolio. The bar, the grid, the view switch and the
pager do not change, because there is nothing about them that *could* change
per collection without the site starting to feel like several sites.

## The collections that exist

| Collection | Card | The one fact | Filters by |
| --- | --- | --- | --- |
| [Video](/collection-video.html) | `card-video`, `card-story` | duration | category, length |
| [Writing](/collection-writing.html) | `card` + `card__footer` | read time | topic, year |
| [Courses](/collection-courses.html) | `card-video` + `card__progress` | lessons | level, progress |
| [Projects](/collection-projects.html) | `card-repo` | stars | **skill**, status |

Travel is the fifth and is deliberately not in that table yet: it is the one
collection whose card is a photograph with almost no metadata, and it is worth
building the page before writing the rule.

## Adding a collection

1. Write the card recipe. Start from the closest existing one; a new content
   type is usually `--card-ratio` and one fact.
2. Name three facets. If you cannot, stop — you have a page.
3. Pick a pager dress.
4. Assemble the listing from `.browse`, `.filterbar`, `.facets`, `.results`.

There is no step five, and there is no new CSS. If a collection needs a
component that does not exist, that is a component the *system* is missing —
write it in `src/` where every collection gets it, not in the collection where
only one does.
