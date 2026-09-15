---
title: Filter & facets
group: Components
order: 50
lead: The three controls a listing page needs — the facet column, the bar above the results, and the grid-or-list switch. Every one of them a real form control.
---

A collection page is three controls and a list. The controls are here; the list
is [`.results`](/results.html), which is a *pattern* because only that one needs
to know its children are cards.

Everything on this page is a **real form control**. The facet is a checkbox,
the view switch is a radio group, the search is `<input type="search">`. That is
not purity — it is how the keyboard, the screen reader, the browser's own reset
button, form submission and a page that works before its JavaScript arrives all
come free. A `<div role="checkbox">` buys nothing and owes all of it.

State is the control's own state. Nothing here needs a class to say "selected";
`:checked` already says it, and `:checked` cannot disagree with the form the way
a class can.

## The facet column

:::demo Groups as `<details>`, so the column collapses on a phone without a second markup shape
<div class="w-sm">
  <div class="facets facets-ruled">
    <div class="facets__head">
      <h3 class="facets__title">Filter</h3>
      <button class="btn btn-link btn-xs" type="button">Clear all</button>
    </div>
    <div class="facets__active">
      <span class="chip">CSS<button class="chip__x" type="button" aria-label="Remove CSS"></button></span>
      <span class="chip">Active<button class="chip__x" type="button" aria-label="Remove Active"></button></span>
    </div>
    <details class="facets__group" open>
      <summary><span class="facets__label m-0">Skills</span></summary>
      <ul class="facets__list">
        <li><label class="facets__opt"><input type="checkbox" checked /><span class="facets__swatch" style="--lang: var(--chart-2)"></span><span>CSS</span><span class="facets__count">18</span></label></li>
        <li><label class="facets__opt"><input type="checkbox" /><span class="facets__swatch" style="--lang: var(--chart-1)"></span><span>TypeScript</span><span class="facets__count">14</span></label></li>
        <li><label class="facets__opt"><input type="checkbox" /><span class="facets__swatch" style="--lang: var(--chart-4)"></span><span>Python</span><span class="facets__count">11</span></label></li>
        <li><label class="facets__opt"><input type="checkbox" disabled /><span class="facets__swatch" style="--lang: var(--chart-6)"></span><span>Rust</span><span class="facets__count">0</span></label></li>
      </ul>
    </details>
    <details class="facets__group">
      <summary><span class="facets__label m-0">Status</span></summary>
      <ul class="facets__list">
        <li><label class="facets__opt"><input type="checkbox" checked /><span>Active</span><span class="facets__count">14</span></label></li>
        <li><label class="facets__opt"><input type="checkbox" /><span>Archived</span><span class="facets__count">5</span></label></li>
      </ul>
    </details>
  </div>
</div>
:::

The option is the **label**, so the whole row is the hit area — the count
included. A 6px checkbox is not a tap target; a 32px row is.

A zero is left enabled-looking and readable rather than hidden. A reader
deciding what to *un*-check needs to see that the answer is nothing.

:::demo Boxed, and laid out sideways for a page with no room for a column
<div class="stack stack-lg">
  <div class="facets facets-boxed facets-inline">
    <div class="facets__group">
      <p class="facets__label">Topic</p>
      <ul class="facets__list">
        <li><label class="facets__opt"><input type="checkbox" checked /><span>Craft</span><span class="facets__count">41</span></label></li>
        <li><label class="facets__opt"><input type="checkbox" /><span>Code</span><span class="facets__count">33</span></label></li>
        <li><label class="facets__opt"><input type="checkbox" /><span>AI</span><span class="facets__count">18</span></label></li>
      </ul>
    </div>
    <div class="facets__group">
      <p class="facets__label">Length</p>
      <ul class="facets__list">
        <li><label class="facets__opt"><input type="checkbox" /><span>Under 10 min</span><span class="facets__count">39</span></label></li>
        <li><label class="facets__opt"><input type="checkbox" /><span>Over 30 min</span><span class="facets__count">12</span></label></li>
      </ul>
    </div>
  </div>
</div>
:::

`.facets-sticky` pins the column beside a long list. Its offset is a variable,
so a page with a sticky bar tells it where the bar ends:

```html
<div class="facets facets-sticky" style="--facets-top: 5rem">
```

## The bar above the results

:::demo Count, search, sort, and the view switch
<div class="filterbar">
  <p class="filterbar__count"><strong>9</strong> of 214 posts</p>
  <div class="filterbar__actions">
    <label class="filterbar__search"><span class="sr-only">Search posts</span>
      <span class="input-icon"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-search"/></svg><input class="input input-sm" type="search" placeholder="Search 214 posts" /></span>
    </label>
    <label><span class="sr-only">Sort</span>
      <select class="select select-sm"><option>Newest first</option><option>Oldest first</option><option>Longest read</option></select>
    </label>
    <div class="viewtoggle" role="group" aria-label="View">
      <label class="viewtoggle__opt" title="Grid"><input type="radio" name="v-demo" value="grid" checked /><span class="sr-only">Grid</span><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-grid"/></svg></label>
      <label class="viewtoggle__opt" title="List"><input type="radio" name="v-demo" value="list" /><span class="sr-only">List</span><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-menu"/></svg></label>
    </div>
  </div>
</div>
:::

`.filterbar-flush` drops the hairline underneath, for a bar that already sits
under a `.sec-rule` heading.

## The view switch

Two radios on a sunken track. The chosen one rises to the surface with a breath
of elevation and **no accent** — the same answer
[`.btn-group-segmented`](/button.html) gives, because a view switch must never
compete with the page's primary action.

The input is visually hidden but still focusable, which is what puts the focus
ring on the label.

:::demo On its own
<div class="viewtoggle" role="group" aria-label="View">
  <label class="viewtoggle__opt" title="Grid"><input type="radio" name="v-solo" value="grid" checked /><span class="sr-only">Grid</span><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-grid"/></svg></label>
  <label class="viewtoggle__opt" title="List"><input type="radio" name="v-solo" value="list" /><span class="sr-only">List</span><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-menu"/></svg></label>
</div>
:::

Wire it to the results with nothing but CSS — see
[Results](/results.html).

## Classes

| Class | What it does |
| --- | --- |
| `.facets` | the filter column |
| `.facets__head` `.facets__title` | the column's heading row and its label |
| `.facets__group` | one question. A `<details>` or a plain block |
| `.facets__label` | the question's name |
| `.facets__list` `.facets__opt` | the options; the option is the whole label row |
| `.facets__count` | the tally, right-aligned, tabular |
| `.facets__swatch` | a colour dot, from `--lang` on the instance |
| `.facets__active` | the row of chips for what is currently on |
| `.facets-sticky` | pins the column; offset is `--facets-top` |
| `.facets-boxed` | on its own surface |
| `.facets-ruled` | a hairline between groups |
| `.facets-inline` | laid out sideways, for a bar instead of a column |
| `.filterbar` | the strip above the results |
| `.filterbar__count` | how many things you are looking at |
| `.filterbar__actions` `.filterbar__search` | the controls, and the search's width |
| `.filterbar-flush` | no hairline underneath |
| `.viewtoggle` `.viewtoggle__opt` | grid or list, as two radios on one track |
