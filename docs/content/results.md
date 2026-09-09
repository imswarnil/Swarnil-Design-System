---
title: Results
group: Patterns
order: 50
lead: A collection body in two views — a grid when the pictures matter, a list when the titles do — from one container and one attribute.
---

Every listing page ends up wanting the same two shapes. Sites usually ship this
as two templates and a query parameter. It is one container and one attribute.

```html
<div class="results" data-view="grid">  …cards…  </div>
```

The cards do not change. `data-view="list"` turns each one into a row by handing
it the same variables `.card-row` sets — which is allowed *here and nowhere
else*: this is the patterns layer, and a pattern is exactly the thing that is
permitted to know its children are cards (see [Deck](/deck.html)).

## The grid

:::demo The default. `--results-col` is the minimum a column may be.
<div class="results results-sm cq-card">
  <article class="card card-hover-lift"><div class="card__media"></div><div class="card__body"><p class="card__kicker">Craft</p><h3 class="card__title"><a class="card__link" href="#i">Decide once</a></h3><p class="card__excerpt">Why a token-first system survives a rebrand.</p></div></article>
  <article class="card card-hover-lift"><div class="card__media"></div><div class="card__body"><p class="card__kicker">AI</p><h3 class="card__title"><a class="card__link" href="#i">A prompt is a spec</a></h3><p class="card__excerpt">What agents taught me about requirements.</p></div></article>
  <article class="card card-hover-lift"><div class="card__media"></div><div class="card__body"><p class="card__kicker">Travel</p><h3 class="card__title"><a class="card__link" href="#i">Ladakh, on film</a></h3><p class="card__excerpt">Fourteen photographs and the one that did not come out.</p></div></article>
</div>
:::

## The list

:::demo The same cards, `data-view="list"`
<div class="results cq-card" data-view="list">
  <article class="card card-hover-lift"><div class="card__media"></div><div class="card__body"><p class="card__kicker">Craft</p><h3 class="card__title"><a class="card__link" href="#i">Decide once. Then stop deciding.</a></h3><p class="card__excerpt">Why a token-first system is the only kind that survives a rebrand — and how three variables carry a whole site.</p></div></article>
  <article class="card card-hover-lift"><div class="card__media"></div><div class="card__body"><p class="card__kicker">AI</p><h3 class="card__title"><a class="card__link" href="#i">A prompt is a spec you have not written yet</a></h3><p class="card__excerpt">What building agents taught me about writing requirements, and the template I start every one from.</p></div></article>
</div>
:::

Below a phone width the list folds back to stacked cards. A row with a 7rem
picture is a row with no room for words.

## Switching it with no JavaScript

Put a [`.viewtoggle`](/filter.html) and the results inside one `.browse`
wrapper and let `:has()` read the radio. The page then works before, during and
without its scripts.

:::demo Click the two icons. No script on this page is involved.
<section class="browse">
  <div class="filterbar">
    <p class="filterbar__count"><strong>3</strong> of 214</p>
    <div class="filterbar__actions">
      <div class="viewtoggle" role="group" aria-label="View">
        <label class="viewtoggle__opt" title="Grid"><input type="radio" name="v-live" value="grid" checked /><span class="u-sr-only">Grid</span><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-grid"/></svg></label>
        <label class="viewtoggle__opt" title="List"><input type="radio" name="v-live" value="list" /><span class="u-sr-only">List</span><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-menu"/></svg></label>
      </div>
    </div>
  </div>
  <div class="results results-sm cq-card">
    <article class="card card-hover-lift"><div class="card__media"></div><div class="card__body"><p class="card__kicker">Craft</p><h3 class="card__title"><a class="card__link" href="#i">Decide once</a></h3><p class="card__excerpt">Why a token-first system survives a rebrand.</p></div></article>
    <article class="card card-hover-lift"><div class="card__media"></div><div class="card__body"><p class="card__kicker">AI</p><h3 class="card__title"><a class="card__link" href="#i">A prompt is a spec</a></h3><p class="card__excerpt">What agents taught me about requirements.</p></div></article>
    <article class="card card-hover-lift"><div class="card__media"></div><div class="card__body"><p class="card__kicker">Travel</p><h3 class="card__title"><a class="card__link" href="#i">Ladakh, on film</a></h3><p class="card__excerpt">Fourteen photographs and the one that did not come out.</p></div></article>
    <div class="results__foot">
      <nav class="pagination pagination-between" aria-label="Pages">
        <span class="pagination__link" aria-disabled="true" aria-label="Previous page"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-left"/></svg></span>
        <span class="pagination__status">Page 1 of 24</span>
        <a class="pagination__link" href="#i" aria-label="Next page"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></a>
      </nav>
    </div>
  </div>
</section>
:::

A server-rendered page that already knows the answer writes `data-view` and
never ships the radios. Both are supported on purpose: **the attribute is the
contract**, and `:has()` is one way of setting it.

## Empty, and the tail

`.results__empty` and `.results__foot` span the whole grid, so a single result
and no results are not laid out in one narrow column.

:::demo Nothing matched
<div class="results cq-card">
  <div class="results__empty">
    <div class="empty">
      <span class="empty__icon"><svg class="icon icon-lg" aria-hidden="true"><use href="/icons/sprite.svg#i-search"/></svg></span>
      <p class="empty__title">Nothing matches those filters</p>
      <p class="empty__body">Try removing "Rust" — there are no repos in it yet.</p>
      <div class="empty__actions"><button class="button is-outlined is-small" type="button">Clear all filters</button></div>
    </div>
  </div>
</div>
:::

## Classes

| Class | What it does |
| --- | --- |
| `.results` | the collection body. `--results-col`, `--results-gap` |
| `.results-sm` `.results-lg` | 15rem / 26rem minimum column |
| `.results[data-view='list']` | one column; every card becomes a row |
| `.results__empty` | full-width slot for the empty state |
| `.results__foot` | full-width slot for pagination or load-more |
| `.browse` | the wrapper: the `:has()` scope for the view switch, and one rhythm for bar, chips and results |
