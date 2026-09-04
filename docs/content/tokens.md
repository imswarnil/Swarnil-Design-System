---
title: Tokens & variables
group: Layout
order: 40
lead: How to read the system's tokens, define your own, and keep the two from tangling.
---

## The two tiers, one more time

Tier 1 is positions on ladders (`--ink-700`, `--signal-500`). Tier 2 is jobs
(`--fg-muted`, `--accent`). **Components read jobs.** That is the entire
theming architecture, and everything else on this page is bookkeeping.

## Defining your own component's tokens

Follow the system's own contract — declare the knobs first, defaulting to
tier 2, then use only the knobs:

```css
@layer components {
  .promo {
    /* 1 · the public knobs, defaults from tier 2 */
    --promo-bg: var(--bg-sunken);
    --promo-pad: var(--space-6);
    --promo-radius: var(--radius-card);

    /* 2 · the component reads ONLY its knobs */
    background: var(--promo-bg);
    padding: var(--promo-pad);
    border-radius: var(--promo-radius);
  }
}
```

Now `.promo` rethemes three ways for free: globally (change tier 2), as a
variant (`.promo-loud { --promo-bg: var(--accent-soft); }`), and per instance
(`style="--promo-pad: var(--space-10)"`).

## Registering animatable tokens

A custom property animates as a string — it snaps. If a token must *tween*,
register it:

```css
@property --promo-glow {
  syntax: '<color>';
  inherits: false;
  initial-value: transparent;
}
```

The system registers none by default — a registration for a token that does
not exist yet is a lie in a file. Register at the point of need.

## Scope rules worth stealing

- **Inherit on purpose.** Tokens cascade; setting `--accent` on a section
  accents everything inside it. That is the feature, not a leak.
- **Never read tier 1 downstream.** If a component needs `--ink-700`, tier 2
  is missing a name — add the name.
- **Prefix component knobs** (`--promo-*`) so they cannot collide with the
  foundation's vocabulary.
- **A knob nobody overrides is still documentation** — it states what the
  component considers configurable.

## The escape hatch order

When something must change, try in order: a token on the instance → a variant
class → a tier-2 override in your unlayered CSS → a new component. `!important`
is not on the list, because the layer contract makes it unnecessary — your
unlayered CSS already outranks everything here.
