---
title: Templates
group: Start
order: 80
lead: Four whole pages, built from the system and running on the same stylesheet this site does.
---

A component is a thing. A template is a **page made of things**, and it is the
level at which most work actually starts: nobody sets out to build a card, they
set out to build a landing page that happens to need six.

Every page below is **real** — open it, resize it, switch the theme, read the
source. Each links the same `site.min.css` the documentation runs on, and
**none of them contains a single line of CSS of its own**. If a template needed
something the system did not already have, that would be a missing component,
not a missing template.

{{templates}}

## What they are made of

| Template | Components |
| --- | --- |
| Landing page | Navbar (with a dropdown), Hero, Stats, Card, Pricing, CTA, Footer |
| Article | Navbar, Masthead, Article, Table of contents, Share, Card |
| Collection | Navbar, Page header, Filter & facets, Results, Card, Pagination |
| Application shell | Shell, Navbar, Navigation, Stats, Alert, Table, Build log |

## The shell is a component now

Three of the four are ordinary pages: a bar, some bands, a footer. The fourth
is not, and it is why `src/4-patterns/59-shell.css` exists.

An application shell owns the **whole viewport** — a sticky bar, a navigation
column that scrolls independently under it, a content column and an optional
rail. Those are four related decisions, so they belong in one component rather
than in every page that wants the shape.

Everything in it is derived from one number:

| Token | Is |
| --- | --- |
| `--bar-h` | the bar's height — and the nav column's top offset, and the nav column's height subtracted from `100dvh` |
| `--side-w` | the navigation column, open |
| `--rail-w` | the navigation column, collapsed to icons |

Hard-code any of those in a page and a taller bar silently pushes the last nav
item under the fold. That bug is the reason the tokens exist.

**The rail goes before the nav does.** Two breakpoints, in that order, because
a contents list is an aid and the navigation is the way out of the page. The
rail is dropped at `64rem`; the nav survives to `48rem`, where it becomes a
drawer rather than vanishing.

## Why the thumbnails are drawings

They are not screenshots, and they are not iframes.

An earlier version of this page embedded all twelve template pages at once and
produced twelve ~380px pictures in which nothing was legible. A wireframe at
that size says *"bar, nav left, cards right"* — which is the thing a reader is
actually comparing — and it says it at 320px too. Every fill in them is a
system token, so they follow the theme like everything else.
