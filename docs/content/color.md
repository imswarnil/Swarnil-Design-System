---
title: Colour
group: Foundation
order: 50
lead: Two tiers, eight ramps, 97 tones — and components may only ever read the second tier.
---

Colour is where "decide once" is easiest to see. There are two tiers, and the
rule is absolute: **a component may only read tier 2.**

A component that reads `--ink-700` has hard-coded an appearance and will be wrong
the moment the theme changes. A component that reads `--fg-muted` has asked for a
*job*, and the theme answers it.

## Why so much colour in an almost-monochrome system

That looks like a contradiction and is not. **Tier 1 is a palette; tier 2 is the
argument.** Only a handful of these hues are promoted to semantics — the rest are
there for the two jobs that genuinely need many colours at once, charts and
category coding, plus for you to repoint `--accent` at.

The restraint lives in tier 2. Widening tier 1 costs nothing and removes the last
reason anyone would hard-code a hex.

## Tier 1 — the ramps

One **shared lightness ladder** runs through every ramp. `signal-500`,
`mint-500` and `iris-500` sit at the same perceived weight, which is what makes
them safely interchangeable as an accent and legible together as chart series.
Chroma varies per hue because hues peak at different saturations; lightness never
does.

That is the whole reason for `oklch()`. In `hsl`, two colours at the same stated
lightness look nothing alike — `#0000ff` and `#ffff00` are both "50%", and one is
nearly black to the eye while the other is nearly white.

<p class="ramp__name">ink &middot; <span class="t-small t-muted">the neutral everything is built on — 14 steps, because surfaces, borders and text all come from here</span></p>
<div class="ramp">
  <span class="ramp__step sw-ink-0">0</span>
  <span class="ramp__step sw-ink-25">25</span>
  <span class="ramp__step sw-ink-50">50</span>
  <span class="ramp__step sw-ink-100">100</span>
  <span class="ramp__step sw-ink-200">200</span>
  <span class="ramp__step sw-ink-300">300</span>
  <span class="ramp__step sw-ink-400">400</span>
  <span class="ramp__step sw-ink-500 ramp__step-dark">500</span>
  <span class="ramp__step sw-ink-600 ramp__step-dark">600</span>
  <span class="ramp__step sw-ink-700 ramp__step-dark">700</span>
  <span class="ramp__step sw-ink-800 ramp__step-dark">800</span>
  <span class="ramp__step sw-ink-900 ramp__step-dark">900</span>
  <span class="ramp__step sw-ink-950 ramp__step-dark">950</span>
  <span class="ramp__step sw-ink-1000 ramp__step-dark">1000</span>
</div>
<p class="ramp__name">signal &middot; <span class="t-small t-muted">vermilion. The record light, and the only chromatic voice with authority</span></p>
<div class="ramp">
  <span class="ramp__step sw-signal-50">50</span>
  <span class="ramp__step sw-signal-100">100</span>
  <span class="ramp__step sw-signal-200">200</span>
  <span class="ramp__step sw-signal-300">300</span>
  <span class="ramp__step sw-signal-400">400</span>
  <span class="ramp__step sw-signal-500 ramp__step-dark">500</span>
  <span class="ramp__step sw-signal-600 ramp__step-dark">600</span>
  <span class="ramp__step sw-signal-700 ramp__step-dark">700</span>
  <span class="ramp__step sw-signal-800 ramp__step-dark">800</span>
  <span class="ramp__step sw-signal-900 ramp__step-dark">900</span>
  <span class="ramp__step sw-signal-950 ramp__step-dark">950</span>
</div>
<p class="ramp__name">craft &middot; <span class="t-small t-muted">amber. Construction lines and brackets — "in progress", never "live"</span></p>
<div class="ramp">
  <span class="ramp__step sw-craft-50">50</span>
  <span class="ramp__step sw-craft-100">100</span>
  <span class="ramp__step sw-craft-200">200</span>
  <span class="ramp__step sw-craft-300">300</span>
  <span class="ramp__step sw-craft-400">400</span>
  <span class="ramp__step sw-craft-500 ramp__step-dark">500</span>
  <span class="ramp__step sw-craft-600 ramp__step-dark">600</span>
  <span class="ramp__step sw-craft-700 ramp__step-dark">700</span>
  <span class="ramp__step sw-craft-800 ramp__step-dark">800</span>
  <span class="ramp__step sw-craft-900 ramp__step-dark">900</span>
  <span class="ramp__step sw-craft-950 ramp__step-dark">950</span>
</div>
<p class="ramp__name">mint &middot; <span class="t-small t-muted">green. Success</span></p>
<div class="ramp">
  <span class="ramp__step sw-mint-50">50</span>
  <span class="ramp__step sw-mint-100">100</span>
  <span class="ramp__step sw-mint-200">200</span>
  <span class="ramp__step sw-mint-300">300</span>
  <span class="ramp__step sw-mint-400">400</span>
  <span class="ramp__step sw-mint-500 ramp__step-dark">500</span>
  <span class="ramp__step sw-mint-600 ramp__step-dark">600</span>
  <span class="ramp__step sw-mint-700 ramp__step-dark">700</span>
  <span class="ramp__step sw-mint-800 ramp__step-dark">800</span>
  <span class="ramp__step sw-mint-900 ramp__step-dark">900</span>
  <span class="ramp__step sw-mint-950 ramp__step-dark">950</span>
</div>
<p class="ramp__name">azure &middot; <span class="t-small t-muted">blue. Info</span></p>
<div class="ramp">
  <span class="ramp__step sw-azure-50">50</span>
  <span class="ramp__step sw-azure-100">100</span>
  <span class="ramp__step sw-azure-200">200</span>
  <span class="ramp__step sw-azure-300">300</span>
  <span class="ramp__step sw-azure-400">400</span>
  <span class="ramp__step sw-azure-500 ramp__step-dark">500</span>
  <span class="ramp__step sw-azure-600 ramp__step-dark">600</span>
  <span class="ramp__step sw-azure-700 ramp__step-dark">700</span>
  <span class="ramp__step sw-azure-800 ramp__step-dark">800</span>
  <span class="ramp__step sw-azure-900 ramp__step-dark">900</span>
  <span class="ramp__step sw-azure-950 ramp__step-dark">950</span>
</div>
<p class="ramp__name">rose &middot; <span class="t-small t-muted">red. Danger. Nineteen degrees from signal, so the two can never be confused</span></p>
<div class="ramp">
  <span class="ramp__step sw-rose-50">50</span>
  <span class="ramp__step sw-rose-100">100</span>
  <span class="ramp__step sw-rose-200">200</span>
  <span class="ramp__step sw-rose-300">300</span>
  <span class="ramp__step sw-rose-400">400</span>
  <span class="ramp__step sw-rose-500 ramp__step-dark">500</span>
  <span class="ramp__step sw-rose-600 ramp__step-dark">600</span>
  <span class="ramp__step sw-rose-700 ramp__step-dark">700</span>
  <span class="ramp__step sw-rose-800 ramp__step-dark">800</span>
  <span class="ramp__step sw-rose-900 ramp__step-dark">900</span>
  <span class="ramp__step sw-rose-950 ramp__step-dark">950</span>
</div>
<p class="ramp__name">iris &middot; <span class="t-small t-muted">violet. No semantic job — charts, category coding, or an accent preset</span></p>
<div class="ramp">
  <span class="ramp__step sw-iris-50">50</span>
  <span class="ramp__step sw-iris-100">100</span>
  <span class="ramp__step sw-iris-200">200</span>
  <span class="ramp__step sw-iris-300">300</span>
  <span class="ramp__step sw-iris-400">400</span>
  <span class="ramp__step sw-iris-500 ramp__step-dark">500</span>
  <span class="ramp__step sw-iris-600 ramp__step-dark">600</span>
  <span class="ramp__step sw-iris-700 ramp__step-dark">700</span>
  <span class="ramp__step sw-iris-800 ramp__step-dark">800</span>
  <span class="ramp__step sw-iris-900 ramp__step-dark">900</span>
  <span class="ramp__step sw-iris-950 ramp__step-dark">950</span>
</div>
<p class="ramp__name">teal &middot; <span class="t-small t-muted">no semantic job. Charts and presets</span></p>
<div class="ramp">
  <span class="ramp__step sw-teal-50">50</span>
  <span class="ramp__step sw-teal-100">100</span>
  <span class="ramp__step sw-teal-200">200</span>
  <span class="ramp__step sw-teal-300">300</span>
  <span class="ramp__step sw-teal-400">400</span>
  <span class="ramp__step sw-teal-500 ramp__step-dark">500</span>
  <span class="ramp__step sw-teal-600 ramp__step-dark">600</span>
  <span class="ramp__step sw-teal-700 ramp__step-dark">700</span>
  <span class="ramp__step sw-teal-800 ramp__step-dark">800</span>
  <span class="ramp__step sw-teal-900 ramp__step-dark">900</span>
  <span class="ramp__step sw-teal-950 ramp__step-dark">950</span>
</div>

### The ladder, step by step

| Step | L | Job |
| --- | --- | --- |
| `50` | 97% | a wash — the faintest tint that still reads as coloured |
| `100` | 94% | a tint — status backgrounds in light mode |
| `200` | 89% | a soft fill |
| `300` | 82% | a border, or foreground text in **dark** mode |
| `400` | 74% | the light-mode hover step |
| `500` | ~63% | **the step** — the hue at full voice; fills and marks |
| `600` | 56% | the pressed step, and accent *text* in light mode |
| `700` | 47% | readable text on a light background |
| `800` | 38% | deep fill |
| `900` | 29% | a near-black tint of the hue |
| `950` | 22% | the floor |

## Tier 2 — semantics

The only public names. Each says what a value is *for*, not what it looks like.

| Group | Tokens |
| --- | --- |
| Surface | `--bg-canvas` `--bg-surface` `--bg-raised` `--bg-overlay` `--bg-sunken` `--bg-muted` `--bg-inverse` `--bg-media` `--bg-scrim` |
| Foreground | `--fg-default` `--fg-muted` `--fg-subtle` `--fg-faint` `--fg-disabled` `--fg-on-inverse` `--fg-on-accent` `--fg-accent` `--fg-link` |
| Line | `--line-subtle` `--line-default` `--line-strong` `--line-inverse` `--line-accent` |
| Accent | `--accent` `--accent-hover` `--accent-press` `--accent-soft` `--accent-soft-fg` `--accent-ring` |
| Status | `--{success,info,warning,danger}-{bg,fg,line,solid}` |
| Interaction | `--hover-wash` `--press-wash` `--selection-bg` `--selection-fg` |
| Chart | `--chart-1` … `--chart-6` |

:::demo The surface ladder
<div class="swatches">
  <span class="swatch swatch-canvas"></span>
  <span class="swatch swatch-surface"></span>
  <span class="swatch swatch-sunken"></span>
  <span class="swatch swatch-muted"></span>
  <span class="swatch swatch-inverse"></span>
  <span class="swatch swatch-accent"></span>
  <span class="swatch swatch-craft"></span>
</div>
:::

## Status, four tones each

`bg` is a wash, `fg` is readable text, `line` is a border, `solid` is a filled
background. In dark the wash is an **alpha of the hue** rather than the `100`
step, which would glow.

:::demo
<div class="cluster">
  <span class="badge badge-success">Shipped</span>
  <span class="badge badge-info">Note</span>
  <span class="badge badge-warning">Review</span>
  <span class="badge badge-danger">Blocked</span>
</div>
<div class="stack stack-sm u-mt-4">
  <div class="alert alert-success"><span class="alert__body">Deployed in 4.2s.</span></div>
  <div class="alert alert-danger"><span class="alert__body">The build failed — three tests are red in <code class="code">card.spec.ts</code>.</span></div>
</div>
:::

## Rebranding is one attribute

Every component reads the six accent tones and never a hex, so the whole system
follows a single change. Six presets ship:

```html
<html data-accent="azure">
```

:::demo Each strip is the same markup under a different preset
<div class="stack">
  <div class="accent-demo"><span class="t-label">signal</span><span class="cluster"><button class="btn btn-primary btn-sm" type="button">Primary</button><button class="btn btn-soft btn-sm" type="button">Soft</button><span class="badge badge-accent">Badge</span><span class="dot dot-accent"></span></span></div>
  <div class="accent-demo" data-accent="azure"><span class="t-label">azure</span><span class="cluster"><button class="btn btn-primary btn-sm" type="button">Primary</button><button class="btn btn-soft btn-sm" type="button">Soft</button><span class="badge badge-accent">Badge</span><span class="dot dot-accent"></span></span></div>
  <div class="accent-demo" data-accent="iris"><span class="t-label">iris</span><span class="cluster"><button class="btn btn-primary btn-sm" type="button">Primary</button><button class="btn btn-soft btn-sm" type="button">Soft</button><span class="badge badge-accent">Badge</span><span class="dot dot-accent"></span></span></div>
  <div class="accent-demo" data-accent="teal"><span class="t-label">teal</span><span class="cluster"><button class="btn btn-primary btn-sm" type="button">Primary</button><button class="btn btn-soft btn-sm" type="button">Soft</button><span class="badge badge-accent">Badge</span><span class="dot dot-accent"></span></span></div>
  <div class="accent-demo" data-accent="mint"><span class="t-label">mint</span><span class="cluster"><button class="btn btn-primary btn-sm" type="button">Primary</button><button class="btn btn-soft btn-sm" type="button">Soft</button><span class="badge badge-accent">Badge</span><span class="dot dot-accent"></span></span></div>
  <div class="accent-demo" data-accent="craft"><span class="t-label">craft</span><span class="cluster"><button class="btn btn-primary btn-sm" type="button">Primary</button><button class="btn btn-soft btn-sm" type="button">Soft</button><span class="badge badge-accent">Badge</span><span class="dot dot-accent"></span></span></div>
</div>
:::

Nothing in those presets knows a component exists, and no component knows a
preset exists. That is tier 2 doing its job.

A preset moves **all six tones together**, deliberately. One that changed
`--accent` but not `--accent-soft` would leave every soft badge in the old hue —
which is exactly the drift a token system exists to prevent.

Or point it anywhere at all:

```css
:root { --accent: oklch(62% 0.17 285); }
```

## Chart series

Six hues at one lightness, so no series looks louder than another purely because
of its colour — which is the most common way a chart lies.

:::demo
<div class="cluster">
  <span class="badge badge-dot chart-1">Series 1</span>
  <span class="badge badge-dot chart-2">Series 2</span>
  <span class="badge badge-dot chart-3">Series 3</span>
  <span class="badge badge-dot chart-4">Series 4</span>
  <span class="badge badge-dot chart-5">Series 5</span>
  <span class="badge badge-dot chart-6">Series 6</span>
</div>
:::

## Dark mode

No component contains the string `data-theme` or `prefers-color-scheme`. If a
component needs a dark-specific value, tier 2 is missing a token.

Every token is declared **once**, with both themes on the same line:

```css
--bg-canvas: light-dark(var(--ink-0), var(--ink-1000));
```

The previous system hand-maintained a `[data-theme='dark']` block *and* a
near-identical `prefers-color-scheme` copy — and the copy had already drifted,
missing `--craft`, the status tokens and `--pattern-ink`. Two places to edit
means one of them is always out of date.

Three things change in dark beyond the obvious flip:

- **Accent text steps down one.** A 500 vermilion on near-black blooms at text
  sizes; 400 reads clean. Fills stay at 500, because a large area does not bloom.
- **Hairlines go translucent**, not grey, so they survive over an image.
- **Depth is light, not shadow.** See [elevation](/frame.html).
