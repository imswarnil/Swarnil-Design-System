---
title: Toast
group: Components
order: 75
lead: An alert that arrives — placements, stacking, the timer, and the interruption rule.
---

:::demo Click, then click anywhere else — no script
<button class="btn btn-primary" type="button" popovertarget="toast-demo-1">Export take 47</button>
<div class="toaster" id="toast-demo-1" popover aria-live="polite">
  <div class="alert alert-success toast">
    <svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-check"/></svg>
    <div class="alert__content"><p class="alert__title u-m-0">Take 47 exported</p><p class="alert__body u-m-0">4.2s · 1080p.</p></div>
  </div>
</div>
:::

A toast answers an action without stealing the page. The rule that sizes it:
**polite by definition** — the container carries `aria-live="polite"`, and if
the message is urgent enough to interrupt, it is a [dialog](/dialog.html), not
a toast.

A toast is an `.alert` wearing `.toast`, so every part of the
[alert](/alert.html) — icon, title, body, actions, close — comes along. The
container `.toaster` owns position and stacking. Make it a popover and a
`popovertarget` button shows the stack in the top layer with no script, as
above; light dismiss clears it.

## Status

The status rule stays; the fill rests on the raised surface, so a stack of
mixed toasts reads as one stack.

:::demo Shown in the flow with toaster-static
<div class="toaster toaster-static w-md">
  <div class="alert alert-success toast"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-check"/></svg><div class="alert__content"><p class="alert__body u-m-0">Take 47 exported — 4.2s.</p></div></div>
  <div class="alert alert-info toast"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-info"/></svg><div class="alert__content"><p class="alert__body u-m-0">Rendering continues in the background.</p></div></div>
  <div class="alert alert-warning toast"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-alert"/></svg><div class="alert__content"><p class="alert__body u-m-0">Storage at 91%.</p></div></div>
  <div class="alert alert-danger toast" role="alert"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-alert"/></svg><div class="alert__content"><p class="alert__body u-m-0">Export failed — the disk is full. Clear space and retry.</p></div></div>
  <div class="alert toast"><div class="alert__content"><p class="alert__body u-m-0">Draft saved.</p></div></div>
</div>
:::

## With an action, and dismissible

An undo is the classic toast action. Keep it link-weight; the close is the
alert's own close button.

:::demo
<div class="toaster toaster-static w-md">
  <div class="alert toast">
    <div class="alert__content"><p class="alert__body u-m-0">Take 46 moved to the bin.</p><div class="alert__actions"><button class="btn btn-link btn-sm" type="button">Undo</button></div></div>
    <button class="btn btn-quiet btn-icon btn-sm alert__close" type="button" aria-label="Dismiss"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button>
  </div>
  <div class="alert alert-info toast">
    <svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-download"/></svg>
    <div class="alert__content"><p class="alert__title u-m-0">Render finished</p><div class="alert__actions"><a class="btn btn-outline btn-sm" href="#i">Open in Exports</a><button class="btn btn-quiet btn-sm" type="button">Later</button></div></div>
    <button class="btn btn-quiet btn-icon btn-sm alert__close" type="button" aria-label="Dismiss"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button>
  </div>
</div>
:::

## Auto-dismiss — the timer

`data-timer` draws a hairline that empties over `--toast-dur` (5s by default).
It is only a *picture* of the timer — the removal is still the consumer's —
but it answers "how long do I have?" without a number. Reload to catch it.

:::demo Five seconds, and a slow ten
<div class="toaster toaster-static w-md">
  <div class="alert alert-success toast" data-timer><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-check"/></svg><div class="alert__content"><p class="alert__body u-m-0">Published to members.</p></div></div>
  <div class="alert toast" data-timer style="--toast-dur: 10s"><div class="alert__content"><p class="alert__body u-m-0">Ten seconds — for a message with a link in it.</p></div></div>
</div>
:::

Auto-dismiss around 5s for confirmations; **never** auto-dismiss an error — a
failure that vanishes before it is read did not happen, as far as the reader
knows. An error toast has a close button and no timer.

## Stacking

New toasts go at the end of the container; the flex column keeps the gap. Cap
the stack at three — a fourth arriving means the first should already be gone.

:::demo Three, the ceiling
<div class="toaster toaster-static w-md">
  <div class="alert toast"><div class="alert__content"><p class="alert__body u-m-0">Take 45 uploaded.</p></div></div>
  <div class="alert toast"><div class="alert__content"><p class="alert__body u-m-0">Take 46 uploaded.</p></div></div>
  <div class="alert alert-success toast"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-check"/></svg><div class="alert__content"><p class="alert__body u-m-0">All three transcoded.</p></div></div>
</div>
:::

## Placement

Bottom-end is the default — the only corner that never covers navigation or a
title. Variants move it. Try each: the popover puts the stack in the real
corner.

:::demo Four corners, live
<div class="cluster">
  <button class="btn btn-outline btn-sm" type="button" popovertarget="toast-pl-1">Bottom end</button>
  <button class="btn btn-outline btn-sm" type="button" popovertarget="toast-pl-2">Bottom start</button>
  <button class="btn btn-outline btn-sm" type="button" popovertarget="toast-pl-3">Top end</button>
  <button class="btn btn-outline btn-sm" type="button" popovertarget="toast-pl-4">Top centre</button>
</div>
<div class="toaster" id="toast-pl-1" popover aria-live="polite"><div class="alert toast"><div class="alert__content"><p class="alert__body u-m-0">Bottom end — the default.</p></div></div></div>
<div class="toaster toaster-start" id="toast-pl-2" popover aria-live="polite"><div class="alert toast"><div class="alert__content"><p class="alert__body u-m-0">Bottom start.</p></div></div></div>
<div class="toaster toaster-top" id="toast-pl-3" popover aria-live="polite"><div class="alert toast"><div class="alert__content"><p class="alert__body u-m-0">Top end — answers an action at the top of the screen.</p></div></div></div>
<div class="toaster toaster-top toaster-center" id="toast-pl-4" popover aria-live="polite"><div class="alert toast"><div class="alert__content"><p class="alert__body u-m-0">Top centre.</p></div></div></div>
:::

| Class | Corner |
| --- | --- |
| `toaster` | bottom end (default) |
| `toaster toaster-start` | bottom start |
| `toaster toaster-top` | top end |
| `toaster toaster-top toaster-center` | top centre |
| `toaster toaster-static` | in the flow — a notification centre, or a demo |

Pick ONE placement per product. Toasts that arrive from different corners read
as different systems shouting.

## Entry, exit, timing

Entry is `@starting-style` — rise and fade, no JavaScript. Exit is the
consumer's: remove the node, or set `data-leaving` and wait for
`transitionend`.

```js
toast.dataset.leaving = '';
toast.addEventListener('transitionend', () => toast.remove(), { once: true });
```

Under reduced motion both directions collapse to a fade.

## Properties

| Variable | Does |
| --- | --- |
| `--toaster-w` | stack width (capped to the viewport minus a gutter) |
| `--toast-dur` | timer length for `[data-timer]` |
| `--alert-*` | everything the alert exposes — a toast is an alert |

## Accessibility

- The container carries `aria-live="polite"`; a toast never steals focus.
- An error toast is `role="alert"`, has a close button, and never auto-dismisses.
- The close is a real `<button>` with `aria-label="Dismiss"`; actions are
  buttons or links in the tab order.
- One placement per product, so a screen magnifier user knows where to look.
