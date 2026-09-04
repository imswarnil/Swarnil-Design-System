---
title: Accordion
group: Components
order: 45
lead: Built on details/summary — the platform's disclosure, dressed rather than rebuilt.
---

`<details>`/`<summary>` ships the hard part: keyboard toggling, state exposure,
and one behaviour nobody reimplements correctly — **browsers search closed
panels** and auto-open the one holding the match. Ctrl-F works through a closed
accordion here, because the accordion is the platform's.

## Default

:::demo
<div class="w-lg">
  <details class="acc">
    <summary>What does the open state look like?</summary>
    <div class="acc__body">The summary takes the accent — the house active state. The chevron is two borders rotated with <code class="code">rotate</code>, so it composes with anything else on the element.</div>
  </details>
  <details class="acc" open>
    <summary>This one starts open</summary>
    <div class="acc__body">The <code class="code">open</code> attribute is the state, in the markup, where a screen reader and a crawler can both see it.</div>
  </details>
</div>
:::

## Exclusive — one open at a time

Panels sharing a `name` close each other. That attribute is the **entire**
exclusive-accordion implementation — zero JavaScript.

:::demo
<div class="w-lg">
  <details class="acc" name="x"><summary>First</summary><div class="acc__body">Open me, then open another.</div></details>
  <details class="acc" name="x"><summary>Second</summary><div class="acc__body">The first closed on its own.</div></details>
  <details class="acc" name="x"><summary>Third</summary><div class="acc__body">Same one line of markup.</div></details>
</div>
:::

## Variants

:::demo Boxed — each item its own card
<div class="w-lg">
  <details class="acc acc-boxed"><summary>Shipping</summary><div class="acc__body">Boxed items carry their own border and surface.</div></details>
  <details class="acc acc-boxed"><summary>Returns</summary><div class="acc__body">Use for FAQ pages where items are islands.</div></details>
</div>
:::

:::demo Flush — no rules, for dense lists
<div class="w-lg">
  <details class="acc acc-flush"><summary>Rendering</summary><div class="acc__body">No borders at all.</div></details>
  <details class="acc acc-flush"><summary>Export</summary><div class="acc__body">For sidebars and settings panels.</div></details>
</div>
:::

:::demo Quiet — the label-voice summary, the docs-sidebar shape
<div class="w-md">
  <details class="acc acc-flush acc-quiet" open><summary>Foundation</summary><div class="acc__body"><nav class="navlist"><a class="navlist__link" href="#i" aria-current="page">Colour</a><a class="navlist__link" href="#i">Typography</a></nav></div></details>
</div>
:::

## The height animation

Where `interpolate-size` ships, the panel animates open — the modern answer to
"you cannot animate to `height: auto`". Elsewhere it snaps, which downgrades
polish, not function. Under reduced motion the durations collapse to 1ms
globally, so the accordion never writes its own motion query.

## Properties

| Variable | Does |
| --- | --- |
| `--acc-pad` | summary and body padding |

## Accessibility

- The summary is natively focusable and toggles on Enter and Space.
- State lives in the `open` attribute — the same fact assistive tech reads.
- Don't put interactive controls inside `<summary>`; the whole line is the
  toggle.
