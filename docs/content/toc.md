---
title: Table of contents
group: Components
order: 50
lead: A map of one document, and where you are in it — the rule the list is built from is the same object that marks the current heading.
---

Three things look alike and are not interchangeable:

| | What it is |
| --- | --- |
| [`.navlist`](/navigation.html) | navigation **between** pages |
| [`.chapters`](/navigation.html) | a sequence you are meant to get through |
| `.toc` | a map of **this** document |

## The rule is the map

Every link sits against a hairline that runs the length of the list, and the
current one turns that hairline into a 2px accent rule. The indicator is
therefore the *same object* as the structure: nothing appears, one thing
changes weight.

That is the house's active state — a rule, never a filled pill — and it is why
this reads at a glance in peripheral vision while you are actually looking at
the article.

:::demo The rail dress, as used on the right of this page
<div class="w-sm">
  <nav class="toc" aria-label="On this page">
    <p class="toc__head">On this page</p>
    <a class="toc__link toc__link-h2" href="#i">The rule is the map</a>
    <a class="toc__link toc__link-h2" href="#i" aria-current="true">Depth is indent</a>
    <a class="toc__link toc__link-h3" href="#i">A third level</a>
    <a class="toc__link toc__link-h3" href="#i">And another</a>
    <a class="toc__link toc__link-h2" href="#i">Variants</a>
    <a class="toc__link toc__link-h4" href="#i">A fourth, if a page really needs one</a>
  </nav>
</div>
:::

## Depth is indent, not size

An `h3` is inset from its `h2` and one step quieter — but it is **not smaller
type**. A contents list that shrinks with depth becomes unreadable exactly
where a long document needs it most.

| Class | Depth |
| --- | --- |
| `.toc__link-h2` | full ink, medium weight |
| `.toc__link-h3` | inset one step |
| `.toc__link-h4` | inset again, subtle ink |

## Variants

:::demo Numbered, for a document read in order
<div class="w-sm">
  <nav class="toc toc-numbered" aria-label="Contents">
    <p class="toc__head">Contents</p>
    <a class="toc__link toc__link-h2" href="#i">Model the data</a>
    <a class="toc__link toc__link-h2" href="#i" aria-current="true">Write the recipe</a>
    <a class="toc__link toc__link-h2" href="#i">Build the dashboard</a>
    <a class="toc__link toc__link-h2" href="#i">Ship it</a>
  </nav>
</div>
:::

:::demo Boxed — the "in this post" block that sits inside the article
<nav class="toc toc-boxed" aria-label="In this post">
  <p class="toc__head">In this post</p>
  <a class="toc__link toc__link-h2" href="#i">The brief, written to myself</a>
  <a class="toc__link toc__link-h2" href="#i">What I did instead</a>
  <a class="toc__link toc__link-h3" href="#i">Nine cascade layers</a>
  <a class="toc__link toc__link-h3" href="#i">What it cost</a>
  <a class="toc__link toc__link-h2" href="#i">Where it ended up</a>
</nav>
:::

:::demo Inline — for a page with few, short headings
<nav class="toc toc-inline" aria-label="Sections">
  <a class="toc__link" href="#i" aria-current="true">Overview</a>
  <a class="toc__link" href="#i">Curriculum</a>
  <a class="toc__link" href="#i">Reviews</a>
  <a class="toc__link" href="#i">Instructor</a>
  <a class="toc__link" href="#i">FAQ</a>
</nav>
:::

The inline dress swaps the left rule for a full border, because a left rule on
a horizontal item marks nothing.

## The read-progress rail

`.toc-progress` fills the hairline the whole list sits against, to how far down
the document you are. It is **one element** rather than a state on each link,
so it moves continuously instead of stepping between headings — which is the
honest picture of scrolling.

It is scroll-driven (`animation-timeline: scroll()`), so there is no listener;
where that is unsupported the rail is simply empty, and the contents still
work.

:::demo Scroll the page — the rail beside this list fills
<div class="w-sm">
  <nav class="toc toc-progress" aria-label="On this page">
    <p class="toc__head">Progress</p>
    <a class="toc__link toc__link-h2" href="#i">The rule is the map</a>
    <a class="toc__link toc__link-h2" href="#i">Depth is indent</a>
    <a class="toc__link toc__link-h2" href="#i">Variants</a>
    <a class="toc__link toc__link-h2" href="#i">The read-progress rail</a>
  </nav>
</div>
:::

## In a rail

`.toc-sticky` pins it. The offset is a variable, because only the page knows
how tall its bar is, and the list gets its own scroll so a long contents never
runs past the viewport.

```html
<nav class="toc toc-sticky" style="--toc-top: 5rem" aria-label="On this page">
```

`.toc-sm` drops the type a step for a sidebar that also holds other things.

## Marking the current one

`aria-current="true"` on the link. Whatever is watching the scroll sets it — an
`IntersectionObserver`, a framework, or nothing at all, in which case this is
a perfectly good list of links and the component has lost nothing it needed.

The attribute is the contract: the styling reads it, and a screen reader reads
the same attribute, so the two cannot disagree.

## Accessibility

- Wrap it in `<nav aria-label="On this page">`, so it is a landmark that is
  distinguishable from the site's main navigation.
- Every entry must point at a heading that actually has that `id`.
- `aria-current="true"`, not `"page"` — you are not on a different page.
- Do not hide it from small screens by default. Use `.toc-boxed` or
  `.toc-inline` above the article instead; a long document is *harder* to
  navigate on a phone, not easier.
