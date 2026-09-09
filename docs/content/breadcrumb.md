---
title: Breadcrumb
group: Components
order: 22
lead: Where this page sits, and the way back out. An ordered list, four dresses, and a collapse that works in a card as well as across a page.
---

A breadcrumb is not navigation between siblings — that is [tabs](/navigation.html)
— and it is not a sequence you are meant to finish, which is
[chapters](/navigation.html). It answers one question: *where am I, and how do I
get back up?* Everything below follows from that.

The markup is an `<ol>` inside a `<nav aria-label="Breadcrumb">`. The order is
the whole meaning, so it is an ordered list and not a row of links; the leaf is
**unlinked** and carries `aria-current="page"`, because a link to the page you
are already on is a dead control that still looks live.

The separator is a `::before` on every `li` after the first, so it is never in
the markup and never read out by a screen reader. It is a `/` by default and a
`›` under `.breadcrumb-chevron`.

## The default

An `<ol>` inside a `<nav>`; the leaf is unlinked and carries `aria-current="page"`.

:::demo
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li><a href="#home">Home</a></li>
    <li><a href="#courses">Courses</a></li>
    <li><a href="#course">Lighting a talking head</a></li>
    <li aria-current="page">Lesson 3</li>
  </ol>
</nav>
:::

:::demo With icons and the chevron separator
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb breadcrumb-chevron">
    <li><a href="#home"><svg class="icon icon-sm breadcrumb__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-camera"/></svg> Studio</a></li>
    <li><a href="#folder"><svg class="icon icon-sm breadcrumb__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-folder"/></svg> Season 2</a></li>
    <li aria-current="page"><svg class="icon icon-sm breadcrumb__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-file"/></svg> Episode 7 — colour grade</li>
  </ol>
</nav>
:::

:::demo Truncated — long titles get a budget and an ellipsis
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb breadcrumb-truncate" style="--crumb-max: 10rem">
    <li><a href="#home">Home</a></li>
    <li><a href="#series">The over-produced answer to a simple question</a></li>
    <li aria-current="page">Part 4: why the second camera was a mistake</li>
  </ol>
</nav>
:::

:::demo Collapsed — press 320px: the root, an ellipsis, and the last two survive
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb breadcrumb-collapse">
    <li><a href="#home">Home</a></li>
    <li class="breadcrumb__more" aria-hidden="true">…</li>
    <li><a href="#courses">Courses</a></li>
    <li><a href="#course">Lighting a talking head</a></li>
    <li><a href="#module">Module 2</a></li>
    <li aria-current="page">Lesson 3</li>
  </ol>
</nav>
:::

The breadcrumb is its own query container, so the collapse works in a card or a
sidebar as well as across a page, without a media query.

## Anatomy

| Part | What it is |
| --- | --- |
| `.breadcrumb` | the `<ol>`. Wraps, aligns to the baseline, and is its own container |
| `.breadcrumb__icon` | an optional glyph inside a crumb, sized by the crumb |
| `.breadcrumb__more` | the ellipsis crumb — hidden until `.breadcrumb-collapse` needs it |
| `.breadcrumb-chevron` | `›` instead of `/` |
| `.breadcrumb-truncate` | every crumb gets `--crumb-max` and an ellipsis |
| `.breadcrumb-collapse` | under 28cqi, keep the root, the ellipsis and the last two |
| `--crumb-max` | the per-crumb budget under `.breadcrumb-truncate`. Default `12rem` |

## Accessibility

The `<nav>` needs the `aria-label`, because a page with more than one landmark
of the same kind gives a screen-reader user a list of unlabelled "navigation"
entries to choose between. The leaf takes `aria-current="page"`. The separators
are pseudo-elements and therefore silent, which is the point — a breadcrumb read
aloud as "Home slash Courses slash Lesson 3" is worse than one read as three
links.

`.breadcrumb-collapse` hides crumbs with `display: none`, so the hidden ones are
gone from the accessibility tree too. That is correct here: they are still
reachable one level at a time, and a screen reader announcing six crumbs on a
320px page is not doing anyone a favour.

## This site uses it

The line above every page on this site — Home / group / page — is this
component, unmodified. It is `.breadcrumb.breadcrumb-truncate`, so a long page
title takes an ellipsis rather than wrapping the slate onto two lines.
