---
title: Toast
group: Components
order: 44
lead: An alert that arrives — placements, colour, entry and exit, and the interruption rule.
---

A toast answers an action without stealing the page. The rule that sizes it:
**polite by definition** — the container carries `aria-live="polite"`, and if
the message is urgent enough to interrupt, it is a [dialog](/dialog.html), not
a toast.

## Colour is the alert's

A toast is an `.alert` wearing `.toast`, so every status colour comes along —
one component's palette, not two.

:::demo
<div class="stack w-md">
  <div class="alert alert-success toast"><span class="alert__body">Take 47 exported — 4.2s.</span></div>
  <div class="alert alert-info toast"><span class="alert__body">Rendering continues in the background.</span></div>
  <div class="alert alert-danger toast"><span class="alert__body">Export failed — the disk is full. Clear space and retry.</span></div>
  <div class="alert toast"><span class="alert__body">Draft saved.</span></div>
</div>
:::

## Placement

`.toaster` owns position and stacking. Bottom-end is the default — the only
corner that never covers navigation or a title. Variants move it:

```html
<div class="toaster" aria-live="polite">…</div>          <!-- bottom end -->
<div class="toaster toaster-start">…</div>               <!-- bottom start -->
<div class="toaster toaster-top">…</div>                 <!-- top end -->
<div class="toaster toaster-top toaster-center">…</div>  <!-- top centre -->
```

Pick ONE placement per product. Toasts that arrive from different corners read
as different systems shouting.

## Entry, exit, timing

Entry is `@starting-style` — rise and fade, no JavaScript. Exit is the
consumer's: remove the node, or set `data-leaving` and wait for
`transitionend`. Auto-dismiss around 5s for confirmations; **never**
auto-dismiss an error — a failure that vanishes before it is read did not
happen, as far as the reader knows.

```js
toast.dataset.leaving = '';
toast.addEventListener('transitionend', () => toast.remove(), { once: true });
```

Under reduced motion both directions collapse to a fade.
