---
title: Dialog
group: Components
order: 40
lead: The native dialog — confirm, danger, large, and the bottom sheet, all one element.
---

`<dialog>` + `showModal()` buys focus trapped inside, focus returned on close,
Escape, the top layer, `::backdrop`, and an inert page behind it — every one a
bug in most hand-rolled modals, all owned by the browser here.

## Confirm

:::demo
<button class="btn btn-outline" type="button" data-dialog-open>Publish episode</button>
<dialog class="dialog">
  <div class="dialog__head"><h2 class="dialog__title">Publish take 47?</h2></div>
  <div class="dialog__body">Subscribers are notified immediately. The episode page goes live at the scheduled slot.</div>
  <form method="dialog" class="dialog__foot">
    <button class="btn btn-ghost" value="cancel">Not yet</button>
    <button class="btn btn-primary" value="confirm">Publish</button>
  </form>
</dialog>
:::

`<form method="dialog">` closes the dialog and reports which button did — no
handler. The primary action sits last and carries the accent; there is exactly
one.

## Danger

:::demo The title carries the danger, not the chrome
<button class="btn btn-danger" type="button" data-dialog-open>Delete take</button>
<dialog class="dialog dialog-danger">
  <div class="dialog__head"><h2 class="dialog__title">Delete take 47?</h2></div>
  <div class="dialog__body">This removes the take and its thumbnail. The footage stays in your library.</div>
  <form method="dialog" class="dialog__foot">
    <button class="btn btn-ghost" value="cancel">Keep it</button>
    <button class="btn btn-danger" value="confirm">Delete take</button>
  </form>
</dialog>
:::

The copy is the design (PRINCIPLES #12): what happens, then what survives. The
safe action is the quiet one and sits first.

## Sizes and the sheet

`dialog-sm` for a bare confirm, `dialog-lg` for content, and `dialog-sheet` —
the **same element** becomes a bottom sheet below 40rem, where a centred modal
wastes a phone's reachable zone.

:::demo Resize below 40rem (or trust the class) — it docks to the bottom edge
<button class="btn btn-outline" type="button" data-dialog-open>Open the sheet</button>
<dialog class="dialog dialog-sheet">
  <div class="dialog__head"><h2 class="dialog__title">Share this take</h2></div>
  <div class="dialog__body">On a phone this docks to the bottom edge with the sheet radius on top.</div>
  <form method="dialog" class="dialog__foot"><button class="btn btn-primary" value="done">Done</button></form>
</dialog>
:::

## Rules

- One dialog per decision. Stacked modals mean the first one asked too much.
- A dialog interrupts — if the message can wait, it is a [toast](/toast.html).
- Never remove the Escape route. The browser gives it; do not preventDefault it away.

| Variable | Does |
| --- | --- |
| `--dialog-w` | width |
| `--dialog-pad` | internal padding |
