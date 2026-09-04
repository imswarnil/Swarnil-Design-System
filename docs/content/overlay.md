---
title: Overlay
group: Components
order: 40
lead: Dialog, tooltip, accordion, toast — everything that floats, built on the platform.
---

Four components, one principle: the platform already ships the hard part.

## Dialog

`<dialog>` + `showModal()` buys focus trapped inside, focus returned on close,
Escape, the top layer, `::backdrop`, and an inert page behind it. Focus escaping
into the page behind a modal is the single most common accessibility failure on
the web — and it cannot happen here, because the browser owns the trap.

:::demo
<button class="btn btn-primary" type="button" data-dialog-open>Delete take</button>
<dialog class="dialog dialog-danger">
  <div class="dialog__head">
    <h2 class="dialog__title">Delete take 47?</h2>
  </div>
  <div class="dialog__body">This removes the take and its thumbnail. The footage stays in your library.</div>
  <form method="dialog" class="dialog__foot">
    <button class="btn btn-ghost" value="cancel">Keep it</button>
    <button class="btn btn-danger" value="confirm">Delete take</button>
  </form>
</dialog>
:::

`<form method="dialog">` closes it and reports which button did — no handler.
The error copy follows PRINCIPLES #12: what happened, then what to do.

Variants: `dialog-sm`, `dialog-lg`, `dialog-danger`, and `dialog-sheet` — the
same element becomes a bottom sheet below 40rem.

## Tooltip

For a **label** on an icon-only control, never for content — anything a user
must read to proceed belongs on the page, because a tooltip cannot be reached
on touch. The trigger still needs `aria-label`; the tooltip is the sighted
mouse user's copy of it, not the accessible name.

:::demo Hover, or tab to them
<div class="cluster">
  <button class="btn btn-outline btn-icon" type="button" aria-label="Search" data-tip="Search"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-search"/></svg></button>
  <button class="btn btn-outline btn-icon" type="button" aria-label="Settings" data-tip="Settings"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-settings"/></svg></button>
  <button class="btn btn-outline btn-icon" type="button" aria-label="Record" data-tip-below data-tip="Record"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-record"/></svg></button>
</div>
:::

CSS only — a hover label does not deserve JavaScript. On touch it hides
entirely: long-press means something else there, and `aria-label` is the real
name.

## Accordion

`<details>`/`<summary>`. Keyboard toggling and state come free, and browsers
search **closed** panels and auto-open the one with the match — behaviour
nobody reimplements correctly. Same-`name` panels are exclusive without
JavaScript.

:::demo One open at a time — the platform's name attribute
<div>
  <details class="acc" name="faq">
    <summary>Does it work without JavaScript?</summary>
    <div class="acc__body">Yes. Every overlay here is a platform element; script only adds polish.</div>
  </details>
  <details class="acc" name="faq">
    <summary>Why does opening one close the other?</summary>
    <div class="acc__body">They share a <code class="code">name</code>. That is the whole exclusive-accordion implementation.</div>
  </details>
  <details class="acc" name="faq">
    <summary>Does the height animate?</summary>
    <div class="acc__body">Where <code class="code">interpolate-size</code> ships, yes — the modern answer to animating to <code class="code">height: auto</code>. Elsewhere it snaps, which downgrades polish, not function.</div>
  </details>
</div>
:::

Variants: `acc-boxed`, `acc-flush`, `acc-quiet`.

## Toast

An alert that arrives. The container carries `aria-live="polite"` so arrivals
are announced — polite because a toast is by definition not urgent enough to
interrupt. If it must interrupt, it is a dialog, not a toast.

:::demo
<div class="stack w-md">
  <div class="alert alert-success toast"><span class="alert__body">Take 47 exported — 4.2s.</span></div>
  <div class="alert toast"><span class="alert__body">Draft saved.</span></div>
</div>
:::

Position the real thing with `.toaster` (fixed, end-corner, stacking). Entry
animates via `@starting-style`; exit is the consumer's job — remove the node,
or set `data-leaving` and wait for `transitionend`.
