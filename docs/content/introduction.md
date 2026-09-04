---
title: Introduction
group: Start
order: 10
lead: A token-first, dependency-free CSS design system. Almost monochrome, so one colour can mean something.
---

This is a design system you can use by writing a `<link>` tag. No framework, no
runtime, no build step, no React. It ships CSS custom properties and classes; every
stack that can render HTML can consume it.

The argument it makes is narrow and it is stated everywhere in the source: **decide
once, in a token, and let every surface inherit the decision.** Change three variables
and the whole site rebrands.

:::demo The system, in one card
<article class="card card-hover-frame frame frame-4 frame-hover w-md">
  <span class="frame__tr"></span><span class="frame__bl"></span>
  <div class="card__body">
    <p class="card__meta">Hover it, or tab to it</p>
    <h3 class="card__title">The viewfinder finds it</h3>
    <p class="card__excerpt">Corner brackets close in instead of the card lifting. One hover answer, not two.</p>
  </div>
</article>
:::

## What is opinionated about it

Six decisions, made once, so you stop making them.

| | |
| --- | --- |
| **Token-first** | Every value is a variable off a ladder. Nothing invents a number. |
| **One rationed accent** | Near-monochrome ink, so a single colour can mean *live*. Attention is budgeted, not sprayed. |
| **The platform first** | `<details>`, `<dialog>`, the Popover API, native inputs. Keyboard and focus come free rather than being rebuilt badly. |
| **Honest motion** | Under 200ms for feedback, one property at a time, every animation off under reduced motion. |
| **State lives in ARIA** | Style `[aria-current]` and `[data-*]`, never an `.is-active` class that can disagree with the accessibility tree. |
| **Dark is not an inversion** | Surfaces lift with light, hairlines go translucent, shadow becomes elevation. |

## The two voices

The type system is two faces you read and one you do not.

:::demo
<div class="stack stack-sm">
  <p class="spec-display spec-2xl u-m-0">Space Grotesk sets the headlines</p>
  <p class="t-muted u-m-0">Inter sets everything you actually read, including labels — the same face worn small, uppercase and tracked.</p>
  <p class="t-label u-m-0 u-mt-4">A label, in Inter</p>
  <p class="t-data u-m-0">TAKE 47 · 00:12:47</p>
</div>
:::

That last line is the only place monospace belongs: **data**. Timecodes, counts,
dimensions, versions, code. The moment mono carries a sentence it stops meaning "this
is data" and starts meaning "this is a terminal" — and a signal used everywhere is not
a signal.

## Where to go next

- [Installation](/install.html) — three lines, any stack
- [Principles](/principles.html) — the house rules, and why each exists
- [Colour](/color.html) — the two-tier token model that makes theming one edit
