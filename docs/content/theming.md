---
title: Theming
group: Start
order: 40
lead: Rebrand with one attribute, retheme with one block, restyle one instance with one token.
---

Theming happens at three altitudes, and knowing which one you are at is most of
the skill.

## 1 · The whole site — an attribute

:::demo
<div class="stack">
  <div class="accent-demo" data-accent="azure"><span class="t-label">azure</span><span class="cluster"><button class="btn btn-primary btn-sm" type="button">Primary</button><span class="badge badge-accent">Badge</span><span class="dot dot-accent"></span></span></div>
  <div class="accent-demo" data-accent="iris"><span class="t-label">iris</span><span class="cluster"><button class="btn btn-primary btn-sm" type="button">Primary</button><span class="badge badge-accent">Badge</span><span class="dot dot-accent"></span></span></div>
</div>
:::

```html
<html data-accent="azure" data-theme="dark">
```

Six presets ship (`azure iris teal mint craft rose`); `data-theme` pins light or
dark over the OS preference.

## 2 · A block of tokens — your own theme

Your stylesheet declares no layer, and unlayered CSS beats every layer — so
overrides win with zero specificity fights:

```css
:root {
  --accent: oklch(62% 0.17 250);
  --radius-card: 2px;          /* the brutalist build */
  --font-display: "Your Face", sans-serif;
}
```

## 3 · One instance — a component's own knobs

Every component declares its variables first, so one card can differ without a
new class:

```html
<article class="card" style="--card-pad: var(--space-8); --card-ratio: 1">
```

That is the only inline style this system endorses: **setting a token**. Never a
raw property, never a raw value.

## What you may not do

Read a tier-1 ramp step from a component (`--ink-700`), hard-code a hex, or add
`!important` — none is ever needed, because the cascade order is a declared
contract. If you feel the need, a token is missing: [open an issue](https://github.com/imswarnil/swarnil-design/issues).
