---
title: Radius & borders
group: Foundation
order: 28
lead: A corner ladder, named jobs, and the px-vs-rem rule that keeps hairlines hairline.
---

## The ladder

:::demo Same box, each step of the ladder
<div class="cluster cluster-top">
  <div class="rad-tile" style="--rad: var(--radius-none)"><span class="t-data">none</span></div>
  <div class="rad-tile" style="--rad: var(--radius-xs)"><span class="t-data">xs · 2</span></div>
  <div class="rad-tile" style="--rad: var(--radius-sm)"><span class="t-data">sm · 4</span></div>
  <div class="rad-tile" style="--rad: var(--radius-md)"><span class="t-data">md · 6</span></div>
  <div class="rad-tile" style="--rad: var(--radius-lg)"><span class="t-data">lg · 10</span></div>
  <div class="rad-tile" style="--rad: var(--radius-xl)"><span class="t-data">xl · 16</span></div>
  <div class="rad-tile" style="--rad: var(--radius-2xl)"><span class="t-data">2xl · 24</span></div>
  <div class="rad-tile rad-tile-pill" style="--rad: var(--radius-full)"><span class="t-data">full</span></div>
</div>
:::

## Named for jobs, not sizes

Components read the **job tokens**, never the ladder — which is why one line
changes the shape of every card at once:

| Token | Points at | Used by |
| --- | --- | --- |
| `--radius-card` | `lg` | cards, demo frames, panels |
| `--radius-control` | `md` | buttons, inputs, selects |
| `--radius-media` | `lg` | images, video, figure |
| `--radius-sheet` | `2xl` | drawers, bottom sheets |

```css
:root { --radius-card: 2px; }   /* the whole system goes brutalist */
```

## Borders — the px rule

Hairlines are `px`, radii under 4px are `px`, everything else is `rem`. A 1px
border must **stay** 1px when a reader raises their root font size — a scaled
hairline becomes a bar. `--border-hair / 1 / 2 / 3` are the weights; colour
comes from the `--line-*` ladder, which goes translucent in dark so it
survives over media.

## Nested corners

An inner radius must be the outer radius minus the padding between them, or the
inner corner looks fatter than the outer one:

```css
.card__media { border-radius: calc(var(--radius-card) - var(--card-pad)); }
```

The system's components already do this arithmetic; do it too when you nest
your own rounded boxes.
