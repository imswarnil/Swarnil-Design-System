---
title: Templates
group: Templates
order: 10
lead: Whole pages built out of the system and nothing else — a personal homepage, a blog with a two-level home and a post. Open one, resize it, take it.
---

A component proves a rule; a page proves the system. These are full pages,
responsive from 320px to a wide desktop, that use only the classes documented
on this site plus a short glue stylesheet for page composition — the one thing
a design system deliberately does not own. Every class in them is held to the
same audit as the docs.

Each opens at full size in a new tab. They link `/src/index.css` here so a
rebuild is visible in them; to take one, swap that for the CDN link and keep
the rest.

## Personal homepage

Hero with the viewfinder, what-I-do tiles, the latest episodes, a build log,
the travel strip, and a newsletter close. For someone who makes more than one
kind of thing and wants one page to say so.

<div class="stack">
  <div class="ratio ratio-wide u-border u-rounded-lg u-overflow-hidden"><iframe src="/templates/personal/index.html" title="Personal homepage template" loading="lazy"></iframe></div>
  <div class="cluster"><a class="btn btn-primary" href="/templates/personal/index.html" target="_blank" rel="noopener">Open the personal homepage</a><a class="btn btn-ghost" href="https://github.com/imswarnil/Swarnil-Design-System/tree/main/templates/personal" rel="noopener">Source</a></div>
</div>

## Blog — the two-level home

The first level is the front page: one featured post and the three latest,
above the fold. The second level is the feed: every post, filterable by
series, with the sidebar. One page, two depths, no second template.

<div class="stack">
  <div class="ratio ratio-wide u-border u-rounded-lg u-overflow-hidden"><iframe src="/templates/blog/index.html" title="Blog home template" loading="lazy"></iframe></div>
  <div class="cluster"><a class="btn btn-primary" href="/templates/blog/index.html" target="_blank" rel="noopener">Open the blog home</a><a class="btn btn-ghost" href="https://github.com/imswarnil/Swarnil-Design-System/tree/main/templates/blog" rel="noopener">Source</a></div>
</div>

## Blog — the post

The reading page: a page head, the prose column at 66ch with the share rail
beside it, a pull quote, a code player, a figure, footnotes, the author, the
next-and-previous pager and the thread.

<div class="stack">
  <div class="ratio ratio-wide u-border u-rounded-lg u-overflow-hidden"><iframe src="/templates/blog/post.html" title="Blog post template" loading="lazy"></iframe></div>
  <div class="cluster"><a class="btn btn-primary" href="/templates/blog/post.html" target="_blank" rel="noopener">Open the post</a><a class="btn btn-ghost" href="https://github.com/imswarnil/Swarnil-Design-System/tree/main/templates/blog" rel="noopener">Source</a></div>
</div>

## What a template is allowed to do

- Use any class on this site, in the markup the docs show.
- Set a token on an instance: `style="--stack-gap: var(--space-8)"`.
- Add a glue class for page composition — a named grid area, a sticky column —
  in `templates/templates.css`, outside every layer, so it always wins.

What it may not do is style a component. If a template needs a card to look
different, the card is missing a variant, and the variant is written here.
