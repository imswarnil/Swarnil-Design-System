---
title: Backgrounds
group: Foundation
order: 50
lead: Glows, aurora, spotlight, grain — light that falls on a band, built from the same tokens as everything else, so it retints when the accent does.
---

Patterns draw lines. Backgrounds are light. A glow behind a hero, a stage
light behind a scene, a film grain over a still — each is a gradient of the
tier-2 tokens, so a background never knows which theme it is in and the
colour inside a glow is *the* accent. Switch the theme, or the accent preset,
and watch this page re-light itself.

Every `bg-*` paints on the element's own `background`, never on a
pseudo-element. That is what lets a band be `bg-aurora pattern pattern-grid
frame` with every layer in its own slot.

## Solid grounds

The tier-2 surfaces as classes, for a band or a slab. The inverse and accent
fills set their text colour too.

:::demo
<div class="grid-auto grid-auto-sm">
  <div class="ratio ratio-photo rounded-lg hairline bg-canvas p-3"><span class="t-label">canvas</span></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-surface p-3"><span class="t-label">surface</span></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-sunken p-3"><span class="t-label">sunken</span></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-muted p-3"><span class="t-label">muted</span></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-media p-3"><span class="t-label">media</span></div>
  <div class="ratio ratio-photo rounded-lg bg-inverse p-3"><span class="t-label" style="color: inherit">inverse</span></div>
  <div class="ratio ratio-photo rounded-lg bg-accent p-3"><span class="t-label" style="color: inherit">accent</span></div>
  <div class="ratio ratio-photo rounded-lg bg-accent-soft p-3"><span class="t-label" style="color: inherit">accent-soft</span></div>
</div>
:::

## Glow

One light, one colour. `--bg-glow-x` and `--bg-glow-y` say where it comes
from; the default is top-centre, which is where a hero's light comes from.
The corner, end and centre variants are named positions.

:::demo
<div class="grid-auto grid-auto-sm">
  <div class="ratio ratio-photo rounded-lg hairline bg-glow"></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-glow bg-glow-corner"></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-glow bg-glow-end"></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-glow bg-glow-centre"></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-glow-craft"></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-glow bg-strong"></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-glow bg-faint"></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-glow bg-drift"></div>
</div>
:::

`bg-drift` moves the light slowly between two positions — ambient, not
feedback, so it is allowed eighteen seconds, and it is fully off under reduced
motion. The two position knobs are registered with `@property` so they
interpolate rather than jump.

## Aurora, mesh, spot

Two lights make an aurora; the second hue is craft, the system's one warm
neutral, so the one-accent rule holds. Mesh is three soft lobes. Spot is a
stage light from above and commits to the dark room, like the player does.

:::demo
<div class="grid-3">
  <div class="ratio ratio-photo rounded-lg hairline bg-aurora"></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-mesh"></div>
  <div class="ratio ratio-photo rounded-lg bg-spot"></div>
</div>
:::

## Vignette, fades, ink

:::demo
<div class="grid-auto grid-auto-sm">
  <div class="ratio ratio-photo rounded-lg bg-vignette"></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-fade-down"></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-fade-up"></div>
  <div class="ratio ratio-photo rounded-lg bg-ink"></div>
</div>
:::

## Grain

`bg-noise` is an inline SVG turbulence — no request — blended over whatever
is underneath. It is a `background-image`, not the shorthand, so it stacks on
top of another `bg-*` instead of replacing it.

:::demo Grain alone, and grain on a glow
<div class="grid-2">
  <div class="ratio ratio-photo rounded-lg hairline bg-noise"></div>
  <div class="ratio ratio-photo rounded-lg hairline bg-glow bg-noise"></div>
</div>
:::

## Composed

A band with a glow, a pattern and a frame — three layers, three slots, no
conflict.

:::demo
<section class="bg-glow bg-noise pattern pattern-grid pattern-fade rounded-lg hairline" style="padding: var(--space-10)">
  <div class="" style="padding: var(--space-6)">
    <p class="eyebrow mb-3">Episode 48</p>
    <h3 class="t-h2 m-0">Light, lines, and a frame — on one element each.</h3>
  </div>
</section>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--bg-glow-x`, `--bg-glow-y` | where the light comes from, as percentages |
| `--bg-glow-size` | the ellipse's diameter |
| `--bg-glow-alpha` | 0–1; `bg-faint` and `bg-strong` are its named steps |
| `--bg-noise` | the grain image; swap for your own SVG |

## Loops — a ground that keeps moving

Three, and the budget is spent. Ambient background motion is the most expensive
thing a page can do for the least benefit: it repaints forever, it competes
with the content, and it is exactly what `prefers-reduced-motion` exists to
switch off.

So each of these is slow (12 seconds and up), moves **one** thing, and is off
under that setting — not slower, off. None of them replaces a ground: each
expects a `bg-*` underneath and composes with it, because they animate a
position or a rotation rather than painting a second background over the first.

:::demo `.bg-scanlines` over ink — the tape, running
<div class="bg-ink bg-scanlines p-(--space-8) rounded-lg">
  <p class="t-h3 m-0">Take 48</p>
  <p class="t-small mt-2 m-0">The moving version of <code class="code">pattern-scan</code>, for a hero that should read as footage.</p>
</div>
:::

:::demo `.bg-beams` — a slow sweep, as if something off camera is turning
<div class="bg-sunken bg-beams p-(--space-8) rounded-lg hairline">
  <p class="t-h3 m-0">Forty seconds a turn</p>
  <p class="t-small t-muted mt-2 m-0">One conic gradient on <code class="code">::after</code>, one rotation. It sets <code class="code">isolation: isolate</code>, so the beams stay inside the box.</p>
</div>
:::

:::demo `.bg-graph` — the blueprint under a page that is being drawn
<div class="bg-canvas bg-graph p-(--space-8) rounded-lg hairline">
  <p class="t-h3 m-0">Still being built</p>
  <p class="t-small t-muted mt-2 m-0">Paints on the element like every other ground, so it still composes with a <code class="code">.pattern</code> on <code class="code">::before</code>.</p>
</div>
:::

| Class | Moves | Period |
| --- | --- | --- |
| `.bg-scanlines` | the scanlines travel down | 12s |
| `.bg-beams` | a conic sweep rotates | 40s |
| `.bg-graph` | the grid drifts diagonally | 26s |

## A ground that is a gradient needs a pair rule

`.bg-noise` sets `background-image`, which **replaces** a gradient ground
rather than adding to it — silently, leaving the band the colour of the page.
Every ground built from gradients therefore has an explicit `.bg-x.bg-noise`
pair rule in the file: glow, aurora, mesh, ink, spot.

Anything new that paints a gradient needs its pair adding, and the way you find
out that it does not have one is by **looking at the band**, not at the file.

:::demo Both of these are grain over a dark slab — and both needed a pair rule to be
<div class="grid-2">
  <div class="bg-ink bg-noise p-6 rounded-lg"><span class="t-data">bg-ink · bg-noise</span></div>
  <div class="bg-spot bg-noise p-6 rounded-lg"><span class="t-data">bg-spot · bg-noise</span></div>
</div>
:::

`.bg-ink` and `.bg-spot` also declare `color-scheme: dark`, so `light-dark()`
resolves to its dark branch inside them and a muted paragraph on a dark slab is
legible rather than landing at 2:1.
