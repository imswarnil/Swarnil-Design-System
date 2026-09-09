---
title: Projects
group: Collections
order: 50
lead: The one collection filtered by skill rather than by topic — and the only one whose card is a shape every developer already knows how to read.
---

A portfolio has a different reader. Nobody browses projects for pleasure: they
are looking for evidence that you can do a specific thing. That makes **skill**
the axis, and it makes the card's job identification rather than seduction.

## The card

The repository card is the shape every developer already reads fluently:
`owner/name`, one sentence, the topics, then the facts.

:::demo `.card-repo`, with the language bar on the bottom edge
<div class="grid-2 cq-card">
  <article class="card card-repo card-hover-lift">
    <div class="card__body">
      <p class="card__kicker"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-book"/></svg> imswarnil / <strong>Swarnil-Design-System</strong> <span class="tag badge-outline">Public</span></p>
      <p class="card__excerpt">Token-first, dependency-free CSS. Nine cascade layers, no runtime, no build step required to use it.</p>
      <div class="card__tags"><span class="chip">css</span><span class="chip">design-tokens</span><span class="chip">oklch</span></div>
      <p class="card__facts"><span class="card__lang" style="--lang: var(--chart-2)">CSS</span><span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-star"/></svg> 1.2k</span><span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-git-branch"/></svg> 84</span><span>Updated 2 hours ago</span></p>
    </div>
    <a class="card__link u-sr-only" href="#i">Open the design system</a>
    <span class="card__langs" aria-hidden="true"><span style="--lang: var(--chart-2); --value: 78%"></span><span style="--lang: var(--chart-4); --value: 16%"></span><span style="--lang: var(--chart-1); --value: 6%"></span></span>
  </article>
  <article class="card card-repo card-hover-lift">
    <div class="card__body">
      <p class="card__kicker"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-book"/></svg> imswarnil / <strong>swarnil-icons</strong> <span class="tag badge-outline">Public</span></p>
      <p class="card__excerpt">One sprite, 96 icons, drawn on a 24px grid so a 16px render still lands on whole pixels.</p>
      <div class="card__tags"><span class="chip">icons</span><span class="chip">svg</span></div>
      <p class="card__facts"><span class="card__lang" style="--lang: var(--chart-6)">SVG</span><span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-star"/></svg> 410</span><span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-git-branch"/></svg> 21</span><span>Updated 4 days ago</span></p>
    </div>
    <a class="card__link u-sr-only" href="#i">Open the icon set</a>
    <span class="card__langs" aria-hidden="true"><span style="--lang: var(--chart-6); --value: 82%"></span><span style="--lang: var(--chart-1); --value: 18%"></span></span>
  </article>
</div>
:::

The language dot takes its colour from `--lang` on the instance. That is the
only place in this system where a hue is set per item, and it is set because
**the hue is data** — the language — rather than emphasis. The same argument
covers the [syntax palette](/code.html); everything else stays monochrome.

## The one fact

**Stars**, and only because they are the number this reader already calibrates
against. On a client project with no repo, the fact is the year — and the card
becomes a `.card-tile` with the year in the corner, because a case study is
sold by its picture rather than by its metadata.

## Filters — the skill column

This is the collection's real difference. The facet column is a list of
**skills**, each with a language swatch and a count, and it is the thing the
reader came to use.

:::demo `.facets` with `--lang` swatches
<div class="w-sm">
  <div class="facets facets-boxed facets-ruled">
    <div class="facets__head"><h3 class="facets__title">Filter</h3><button class="button is-ghost is-small" type="button">Clear all</button></div>
    <div class="facets__active"><span class="chip">CSS<button class="chip__x" type="button" aria-label="Remove CSS"></button></span></div>
    <details class="facets__group" open>
      <summary><span class="facets__label u-m-0">Skills</span></summary>
      <ul class="facets__list">
        <li><label class="facets__opt"><input type="checkbox" checked /><span class="facets__swatch" style="--lang: var(--chart-2)"></span><span>CSS</span><span class="facets__count">18</span></label></li>
        <li><label class="facets__opt"><input type="checkbox" /><span class="facets__swatch" style="--lang: var(--chart-1)"></span><span>TypeScript</span><span class="facets__count">14</span></label></li>
        <li><label class="facets__opt"><input type="checkbox" /><span class="facets__swatch" style="--lang: var(--chart-4)"></span><span>Python</span><span class="facets__count">11</span></label></li>
        <li><label class="facets__opt"><input type="checkbox" /><span class="facets__swatch" style="--lang: var(--chart-3)"></span><span>Handlebars</span><span class="facets__count">6</span></label></li>
        <li><label class="facets__opt"><input type="checkbox" disabled /><span class="facets__swatch" style="--lang: var(--chart-5)"></span><span>Rust</span><span class="facets__count">0</span></label></li>
      </ul>
    </details>
    <details class="facets__group" open>
      <summary><span class="facets__label u-m-0">Status</span></summary>
      <ul class="facets__list">
        <li><label class="facets__opt"><input type="checkbox" checked /><span>Active</span><span class="facets__count">14</span></label></li>
        <li><label class="facets__opt"><input type="checkbox" /><span>Archived</span><span class="facets__count">5</span></label></li>
      </ul>
    </details>
  </div>
</div>
:::

The zero stays visible and un-hidden. A reader deciding what to *un*-check
needs to see that the answer is nothing.

## The detail page — a case study

The one collection whose detail page is not the same shape as its listing. A
project page is an argument, and it has a **masthead**: the mark pins at the top
and the header condenses as you scroll, so two screens into a build log you
still know which project you are inside.

That component is [`.masthead`](/masthead.html), and the log below it is the
[illustrated timeline](/timeline.html) — written at the time, wrong turns left
in, which is the only version anybody learns anything from.

## Next

The plain `.pager` with a mark. A project's "next" is arbitrary — there is no
episode number and no chronology worth following — so it gets the project's
name and nothing pretending to be a sequence.

The whole thing: the [portfolio](/templates/projects/index.html) and a
[case study](/templates/projects/project.html).
