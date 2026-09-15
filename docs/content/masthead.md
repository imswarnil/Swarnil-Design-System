---
title: Masthead
group: Components
order: 50
lead: One project, held at the top of its page. It pins, and as the page moves under it, it condenses — but the mark never leaves.
---

A case study, a build log and a project page all have the same problem: the
reader scrolls a long way through content that belongs to a **project**, and two
screens down nothing on screen says which project it is. A page title that
scrolls away is a title that only worked for the first screen.

So the masthead pins, and condenses:

- **at rest** — the mark at full size, the claim, the facts, the actions
- **condensed** — one line: the mark small, the name beside it, the actions

Nothing appears or disappears in that transition. The same elements are simply
smaller and on one row, so the eye tracks them down rather than re-reading a new
bar. The mark never leaves; it is the constant, and it is the only reason the
condensed state is worth having.

## At rest

:::demo Not sticky, so you can see the full state
<header class="masthead masthead-line rounded-lg">
  <div class="center masthead__inner">
    <span class="masthead__mark" aria-hidden="true">SD</span>
    <div class="masthead__text">
      <p class="masthead__eyebrow"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-code"/></svg> Case study · Open source</p>
      <h3 class="masthead__title">Swarnil Design System</h3>
      <p class="masthead__lead">Six sites that looked like six people made them, rebuilt on one token-first system in thirty days.</p>
      <p class="masthead__facts">
        <span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-calendar"/></svg> <strong>2026</strong></span>
        <span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-clock"/></svg> <strong>30</strong> days</span>
        <span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-star"/></svg> <strong>1.2k</strong> stars</span>
        <span><span class="dot dot-sm dot-live"></span> Active</span>
      </p>
    </div>
    <div class="masthead__actions">
      <a class="btn btn-primary btn-sm" href="#i">Live site</a>
      <a class="btn btn-outline btn-sm" href="#i">Source</a>
    </div>
  </div>
  <span class="masthead__rail" aria-hidden="true"></span>
</header>
:::

## Sticky and condensing

Add `.masthead-sticky`. The condensing is a scroll-driven animation —
`animation-timeline: scroll()` — which means **no listener, no observer, and no
JavaScript**. A browser without it falls through `@supports` and gets a masthead
that stays at rest size, which is a correct page and not a broken one.

```html
<header class="masthead masthead-sticky masthead-blur"
        style="--masthead-top: 3.5rem; --masthead-range: 260px">
```

| Variable | Default | What it is |
| --- | --- | --- |
| `--masthead-top` | `0px` | where it pins — the height of whatever is above it |
| `--masthead-range` | `240px` | how far you scroll before it is fully condensed |
| `--masthead-mark` | `3.5rem` | the mark's resting size |
| `--masthead-pad` | `--space-8` | the resting vertical padding |

The rail along the bottom edge is how far through the content you are. It
belongs to the masthead rather than to the viewport because it measures **this
article**, not the document.

See it working on the
[project case-study template](/templates/projects/project.html).

## Variants

:::demo Inverse, and the larger mark
<div class="stack">
  <header class="masthead masthead-inverse rounded-lg">
    <div class="center masthead__inner">
      <span class="masthead__mark" aria-hidden="true">SI</span>
      <div class="masthead__text">
        <p class="masthead__eyebrow">Open source</p>
        <h3 class="masthead__title">Swarnil Icons</h3>
        <p class="masthead__facts"><span><strong>96</strong> icons</span><span>24px grid</span><span>MIT</span></p>
      </div>
      <div class="masthead__actions"><a class="btn btn-inverse btn-sm" href="#i">Source</a></div>
    </div>
  </header>
  <header class="masthead masthead-lg masthead-sunken rounded-lg">
    <div class="center masthead__inner">
      <span class="masthead__mark" aria-hidden="true">PK</span>
      <div class="masthead__text">
        <p class="masthead__eyebrow">Experiment</p>
        <h3 class="masthead__title">Prompt Kit</h3>
        <p class="masthead__lead">Specs, evals and the harness that runs them.</p>
      </div>
      <div class="masthead__actions"><a class="btn btn-outline btn-sm" href="#i">Read</a></div>
    </div>
  </header>
</div>
:::

## Classes

| Class | What it does |
| --- | --- |
| `.masthead` | the band |
| `.masthead__inner` | mark, text, actions on one row |
| `.masthead__mark` | the square plate — a logo, an icon, or two letters |
| `.masthead__text` | eyebrow, title, lead, facts |
| `.masthead__eyebrow` `.masthead__title` `.masthead__lead` | the words |
| `.masthead__facts` | shipped, stack, status — data voice, tabular |
| `.masthead__actions` | live site, source, download |
| `.masthead__rail` | reading progress on the band's own edge |
| `.masthead-sticky` | pins, and condenses on scroll |
| `.masthead-blur` | glass, for a band over content that scrolls beneath it |
| `.masthead-sunken` `.masthead-line` `.masthead-inverse` | grounds |
| `.masthead-lg` | a bigger mark, for a project whose artwork is the point |

Under `prefers-reduced-motion` the condense is off entirely — a header that
resizes itself as you scroll is exactly the kind of movement the setting is
asking about. Sticky stays: that is position, not motion.
