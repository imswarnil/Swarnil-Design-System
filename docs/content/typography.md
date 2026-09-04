---
title: Typography
group: Foundation
order: 20
lead: Two faces you read, one you do not. Mono is a signal, and a signal used everywhere is not a signal.
---

## The three roles

| Token | Face | Job |
| --- | --- | --- |
| `--font-display` | Space Grotesk | Headlines, numbers, the mark |
| `--font-body` | Inter | Everything read in sentences |
| `--font-label` | Inter | The same face worn small, uppercase, tracked |
| `--font-slate` | IBM Plex Mono | **Data only** — timecodes, counts, dimensions, code |

`--font-label` deliberately points at `--font-body` rather than naming Inter again. A
label is not a different *face* from body copy; it is the same face worn differently.

## The scale

:::demo
<div class="stack stack-sm">
  <p class="spec-display spec-4xl u-m-0">Display, 4xl</p>
  <p class="spec-display spec-2xl u-m-0">Heading, 2xl</p>
  <p class="t-lead u-m-0">Lead paragraph, lg — the sentence that sells the page.</p>
  <p class="u-m-0">Body copy, base. The size everything else is measured against.</p>
  <p class="t-small u-m-0">Small, sm — captions and secondary detail.</p>
</div>
:::

Sizes are fluid via `clamp()` **from 2xl up**, and fixed below it. That split is
deliberate: `lg` and `xl` are what UI copy is set in, and UI copy has to fit inside a
component, not inside a page. A size that drifts with the viewport is being decided by
something that has nothing to do with the box it lives in.

## The label voice

:::demo Three ways to be small — only one of them is mono
<div class="stack stack-sm">
  <p class="t-label u-m-0">Section label · Inter</p>
  <p class="t-label-sm u-m-0">Smaller label · Inter</p>
  <p class="t-slate u-m-0">TAKE 47 · 00:12:47</p>
  <p class="t-slate-sm u-m-0">1280 × 720 · V2.1.0</p>
</div>
:::

What makes a label read as a label was never the monospace. It is small size, uppercase,
letter-spacing and weight. The mono was only making everything look like a build log.

One detail that is easy to get wrong: the two voices need **different tracking**.

```css
--tracking-label: 0.08em;   /* Inter uppercase */
--tracking-slate: 0.14em;   /* mono uppercase */
```

Monospace glyphs are already far apart — that width is the fixed-width grid, not a
design choice. Reusing `0.14em` on a proportional face spaces it to shreds.

## The rule is enforced

`scripts/audit-mono.py` fails the build on any `font-family: var(--font-slate)` outside
an explicit allowlist, and on the subtler bug: a rule setting the mono tracking while
rendering in a proportional face.

The allowlist is 61 named selectors rather than a pattern, so widening the rule means
writing down the claim "this is data" next to a selector, where someone can disagree
with it in review.
