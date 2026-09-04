---
title: Utilities
group: Utilities
order: 10
lead: The escape hatch — every utility is a token with a class name, and it always wins.
---

Utilities sit in the **last** cascade layer, so a utility beats a component —
which is the only reason to have utilities at all. Every value rides a
foundation ladder; a utility with a raw value in it is a magic number that has
learned to hide.

## Flow & display

`u-flex` `u-iflex` `u-grid` `u-block` `u-hidden` `u-contents` ·
`u-wrap` `u-col` `u-row` `u-grow` `u-none` ·
`u-items-{start,center,end,base}` · `u-justify-{start,center,end,between}`

:::demo
<div class="u-flex u-items-center u-justify-between u-border u-rounded-lg u-p-3">
  <span class="t-small">start</span>
  <span class="badge badge-accent">middle</span>
  <span class="t-small">end</span>
</div>
:::

## Spacing

Gaps, margins and padding on the 4px ladder: `u-gap-1…8`, `u-m-0`,
`u-mt-0…8`, `u-mb-0…8`, `u-mx-auto`, `u-p-0…8`.

## Type & colour

Sizes `u-2xs…u-xl`, weights `u-regular…u-bold`, alignment
`u-text-{left,center,right}`, faces `u-display` `u-body` — and colour from
tier 2 only: `u-fg…u-fg-accent`, `u-bg-canvas…u-bg-soft`.

:::demo
<p class="u-m-0"><span class="u-bg-inverse u-rounded u-p-2 u-xs">inverse chip</span>
<span class="u-bg-soft u-rounded u-p-2 u-xs">soft chip</span>
<span class="u-fg-accent u-semibold">accent text</span></p>
:::

## Border, radius, shadow

`u-border` `u-border-t/b` `u-border-subtle/accent/0` ·
`u-rounded-sm…u-rounded-full` · `u-shadow-0…3` (the elevation ladder).

## Position & size

`u-relative` `u-absolute` `u-sticky` `u-inset-0` · `u-w-full` `u-h-full` ·
`u-overflow-hidden/auto` · measures `u-measure` `u-measure-lead` `u-measure-ui`.

## The rule of reach

Try in order: a component variant → a primitive knob → a utility. A markup
line wearing six utilities is a component that wants to exist — name it. The
utilities are for the last 5%, which is why they get to win.
