---
title: Button
group: Components
order: 10
lead: One shape, eight emphases, three sizes. Only one button on a screen should be primary.
---

:::demo Emphasis
<div class="cluster">
  <button class="btn btn-primary">Record</button>
  <button class="btn btn-secondary">Preview</button>
  <button class="btn btn-outline">Export</button>
  <button class="btn btn-soft">Duplicate</button>
  <button class="btn btn-ghost">Cancel</button>
  <button class="btn btn-quiet">Skip</button>
  <button class="btn btn-danger">Delete</button>
  <button class="btn btn-link">Learn more</button>
</div>
:::

If two things are equally important then neither is. That is the accent-rationing
principle applied to a component: one primary per screen.

## Size and shape

:::demo
<div class="cluster">
  <button class="btn btn-primary btn-sm">Small</button>
  <button class="btn btn-primary">Default</button>
  <button class="btn btn-primary btn-lg">Large</button>
  <button class="btn btn-outline btn-pill">Pill</button>
</div>
:::

A coarse pointer gets a 44px minimum height however small the design says,
because a thumb is not a mouse.

## States

:::demo
<div class="cluster">
  <button class="btn btn-primary" aria-busy="true">Saving</button>
  <button class="btn btn-outline" disabled>Disabled</button>
  <button class="btn btn-live">Go live</button>
</div>
:::

The loading button keeps its width — the label goes transparent rather than being
replaced, so the layout cannot jump under the pointer mid-click.

`disabled` is the attribute, not a class. A class can lie to a screen reader.

## Groups

:::demo
<div class="btn-group" role="group" aria-label="View">
  <button class="btn" type="button" aria-pressed="true">Day</button>
  <button class="btn" type="button" aria-pressed="false">Week</button>
  <button class="btn" type="button" aria-pressed="false">Month</button>
</div>
:::

## With the frame

A button can take the corner brackets. `.frame-sm` sizes them down so they bracket
the label instead of swallowing it. Tab to it — the keyboard gets the same
affordance as the mouse.

:::demo
<div class="cluster">
  <button class="btn btn-primary frame frame-sm frame-hover">Record</button>
  <button class="btn btn-outline frame frame-sm frame-hover frame-ink">Preview</button>
</div>
:::

`.btn-live` spends `::before` on its record dot, so it cannot also take `.frame`.
Use `.frame-4` with real corner spans, or pick one.

## Properties

| Variable | Does |
| --- | --- |
| `--btn-h` | Control height |
| `--btn-pad` | Inline padding |
| `--btn-radius` | Corner radius |
| `--btn-bg` | Fill |
| `--btn-fg` | Label colour |
| `--btn-line` | Border colour |

Retheme one instance without touching the system:

```css
.btn-checkout { --btn-h: 3rem; --btn-radius: var(--radius-full); }
```

## Accessibility

- 44px minimum target on coarse pointers.
- An icon-only button needs `aria-label`; there is no accessible name otherwise.
- Loading uses `aria-busy`, disabled uses `disabled` — both are attributes a
  screen reader already understands.
- Focus is visible in both themes.
