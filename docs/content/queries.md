---
title: Media & container queries
group: Layout
order: 30
lead: Media queries describe the page. Container queries describe the component. Confusing the two is how responsive CSS rots.
---

## The contract

> A card in a 300px sidebar and a card in a 300px grid slot are the same card
> and must look identical. Only a container query can say that — a media query
> is asking the wrong element how wide it is.

So: **media queries may only change page topology** — a sidebar appearing, a
nav collapsing. Everything inside a component asks its container.

## Container queries

Name a container, then query it:

```css
.deck { container: deck / inline-size; }

@container deck (max-width: 26rem) {
  .card-row { flex-direction: column; }
}
```

The system ships named containers as classes — `.cq` (anonymous), `.cq-card`,
`.cq-deck`, `.cq-shell` — and `card-row` already stacks itself below 26rem
inside any `.cq-card`.

:::demo The demo stage is the container — hit 320px and the row card stacks
<div class="cq-card">
  <article class="card card-row">
    <div class="card__media pattern pattern-dot"></div>
    <div class="card__body"><h3 class="card__title"><a class="card__link" href="#i">I answer to my slot</a></h3><p class="card__excerpt">Not to the window.</p></div>
  </article>
</div>
:::

## Media queries — the five that exist

The canonical page breakpoints, documented as tokens in `03-space.css`:

| Token | Width | Page decision it may make |
| --- | --- | --- |
| `--bp-sm` | 30rem | phone landscape |
| `--bp-md` | 48rem | **navs collapse below this** |
| `--bp-lg` | 64rem | sidebars appear |
| `--bp-xl` | 80rem | content max reached |
| `--bp-2xl` | 96rem | gutters grow; content does not |

Custom properties cannot appear inside `@media` preludes, so these are
documentation-as-tokens — the canonical numbers, written once, cited at every
use site:

```css
/* --bp-md: navs collapse */
@media (width < 48rem) { .navbar__nav { display: none; } }
```

## Fluid before either

Most "responsive" needs are neither query: type and section spacing are fluid
via `clamp()`, and the layout primitives (`grid-auto`, `switcher`, `sidebar`)
fold by content. Reach for a query only when **topology** changes.
