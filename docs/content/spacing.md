---
title: Spacing
group: Foundation
order: 50
lead: One 4px ladder. "A bit more room" becomes "the next step up" — a decision anyone makes the same way twice.
---

Every margin, padding and gap in the system is a step on one ladder. The value
of a ladder is not the numbers; it is that spacing stops being a judgement
call.

## The ladder

:::demo Each bar is one step
<div class="stack stack-sm">
  <div class="cluster"><span class="t-data w-xs">--space-1 · 4px</span><span class="sp-bar" style="--sp: var(--space-1)"></span></div>
  <div class="cluster"><span class="t-data w-xs">--space-2 · 8px</span><span class="sp-bar" style="--sp: var(--space-2)"></span></div>
  <div class="cluster"><span class="t-data w-xs">--space-3 · 12px</span><span class="sp-bar" style="--sp: var(--space-3)"></span></div>
  <div class="cluster"><span class="t-data w-xs">--space-4 · 16px</span><span class="sp-bar" style="--sp: var(--space-4)"></span></div>
  <div class="cluster"><span class="t-data w-xs">--space-6 · 24px</span><span class="sp-bar" style="--sp: var(--space-6)"></span></div>
  <div class="cluster"><span class="t-data w-xs">--space-8 · fluid</span><span class="sp-bar" style="--sp: var(--space-8)"></span></div>
  <div class="cluster"><span class="t-data w-xs">--space-12 · fluid</span><span class="sp-bar" style="--sp: var(--space-12)"></span></div>
  <div class="cluster"><span class="t-data w-xs">--space-16 · fluid</span><span class="sp-bar" style="--sp: var(--space-16)"></span></div>
</div>
:::

Steps `1–6` are fixed; from `8` up they are fluid via `clamp()`, so **section
rhythm opens on a wide screen while the gaps inside components never drift**.
That split is the whole design: component space is about the component, page
space is about the page.

## Where each range lives

| Steps | Belong to |
| --- | --- |
| `1–3` | inside a control — icon gaps, badge padding |
| `4–6` | inside a component — card padding, field gaps |
| `8–12` | between components — deck gaps, stack rhythm |
| `16–24` | between page sections |

## Using it

Utilities (`u-gap-4`, `u-p-5`, `u-mt-8`), primitive knobs (`--stack-gap`,
`--grid-gap`, `--section-pad`), or the tokens directly in your own CSS. All
three are the same ladder — nothing invents a gap outside it, and
`--gutter` handles the page edge on its own.
