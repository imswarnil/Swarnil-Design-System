---
title: Colour
group: Foundation
order: 10
lead: Two tiers. Components read the second one, and never the first.
---

Colour is where the "decide once" argument is easiest to see. There are two tiers, and
the rule is absolute: **a component may only read tier 2.**

## Tier 1 — primitives

The raw ramps. These have no meaning, only a position on a ladder. A component that
reads `--ink-700` directly has hard-coded an appearance and will break the moment the
theme changes.

:::demo
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

## Tier 2 — semantics

The only public names. Each says what a value is *for*, not what it looks like.

| Group | Tokens |
| --- | --- |
| Surface | `--bg-canvas` `--bg-surface` `--bg-raised` `--bg-sunken` `--bg-muted` `--bg-inverse` |
| Foreground | `--fg-default` `--fg-muted` `--fg-subtle` `--fg-faint` `--fg-on-accent` `--fg-link` |
| Line | `--line-subtle` `--line-default` `--line-strong` `--line-accent` |
| Accent | `--accent` `--accent-hover` `--accent-press` `--accent-soft` `--accent-ring` |

Compare the two names:

```css
--orange-red: #e8543a;   /* describes appearance — renaming hell at rebrand */
--accent: var(--signal-500);  /* describes the job — one line changes everything */
```

## Rebranding is one edit

Because every component reads `--accent` and never a hex value, the whole system
follows a single declaration. Drop this in your own stylesheet:

```css
:root { --accent: oklch(62% 0.17 250); }
```

## Dark mode

No component contains the string `data-theme` or `prefers-color-scheme`. If a component
needs a dark-specific value, tier 2 is missing a token. The theme is one block of
remapped semantics, and everything downstream inherits it.

Use the toggle in the bar. Notice the borders change character, not just the background:
in light, depth is a shadow; in dark, depth is a lighter surface with a translucent
hairline.
