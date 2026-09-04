---
title: Patterns & shapes
group: Foundation
order: 35
lead: CSS-only textures and the small geometry — zero images, zero requests, theme-proof by construction.
---

Every texture derives from `--pattern-ink`, a `light-dark()` token — so no
pattern knows which theme it is in, and there is no dark-mode variant of any of
them. Toggle the theme on this page and watch them re-ink themselves.

## The textures

:::demo
<div class="grid-auto grid-auto-sm">
  <div class="ratio ratio-photo u-rounded-lg u-border pattern pattern-grid"></div>
  <div class="ratio ratio-photo u-rounded-lg u-border pattern pattern-dot"></div>
  <div class="ratio ratio-photo u-rounded-lg u-border pattern pattern-line"></div>
  <div class="ratio ratio-photo u-rounded-lg u-border pattern pattern-scan"></div>
  <div class="ratio ratio-photo u-rounded-lg u-border pattern pattern-hatch"></div>
  <div class="ratio ratio-photo u-rounded-lg u-border pattern pattern-halftone"></div>
  <div class="ratio ratio-photo u-rounded-lg u-border pattern pattern-timecode"></div>
  <div class="ratio ratio-photo u-rounded-lg u-border pattern pattern-grid pattern-fade"></div>
</div>
:::

| Class | Reads as |
| --- | --- |
| `pattern-grid` | graph paper, the construction sheet |
| `pattern-dot` | the contact sheet |
| `pattern-line` | diagonal hatching, single |
| `pattern-scan` | the tape — scanlines |
| `pattern-hatch` | crosshatch, heavier |
| `pattern-halftone` | print dots |
| `pattern-timecode` | the film edge — a taller tick every fifth |
| `pattern-fade` | modifier: fades any texture out toward the centre |

Knobs: `--pattern-size`, `--pattern-angle`.

## The composition warning

Every pattern paints on `::before`, and an element has exactly one. A pattern
therefore **cannot share an element** with `.frame`, `.vf`, or anything else
that spends its pseudo-elements. Put the pattern on a child or a parent — the
same rule the frame page states from its side.

:::demo Pattern on a child, brackets on the parent — the legal composition
<div class="ratio ratio-photo w-md frame frame-4 u-relative u-rounded-lg u-border">
  <span class="frame__tr"></span><span class="frame__bl"></span>
  <div class="pattern pattern-timecode u-absolute u-inset-0"></div>
</div>
:::

## The small geometry

Dots and rules — the system's punctuation marks.

:::demo
<div class="stack">
  <div class="cluster">
    <span class="dot dot-sm"></span>
    <span class="dot"></span>
    <span class="dot dot-lg"></span>
    <span class="dot dot-accent"></span>
    <span class="dot dot-live"></span>
    <span class="dot dot-success"></span>
    <span class="dot dot-danger"></span>
  </div>
  <hr class="rule u-m-0" />
  <hr class="rule rule-accent u-m-0" />
  <div class="rule-label">Take two</div>
</div>
:::

The dot is the smallest mark that can carry the accent, which is why it is the
system's "you are here" everywhere — nav, tabs, TOC, drawer. `.rule-label` puts
a word on a rule without background hacks: the two line segments are flex
children.

## Where patterns belong

On **stages, media placeholders and export canvases** — places that represent
footage or construction. Not behind body text (the type page's contrast rules
still apply on top of a texture), and never on a demo stage in these docs: a
preview owes you nothing between you and the component.
