---
title: Alert
group: Components
order: 50
lead: A message with a status — what happened, then what to do. Colour is never the only signal.
---

:::demo The default alert
<div class="alert w-lg" role="status">
  <svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-info"/></svg>
  <div class="alert__content">
    <p class="alert__title u-m-0">Draft saved</p>
    <p class="alert__body u-m-0">Episode 47 is safe. Publishing is still one click away.</p>
  </div>
</div>
:::

Copy is design. An error says what happened, then what to do; a success says
what changed. The CSS cannot enforce that, but it can make the shape carry the
message: a status rule on the start edge, an icon in the status colour, a title
and a body — and never colour alone, because a colour-blind reader gets neither
hue.

## Status

Five statuses plus the accent, which is reserved for the one thing that is
live or new. The status hues sit far from the accent's hue on purpose: a
danger alert that reads as *live* is a bug.

:::demo Success, info, warning, danger, accent, neutral
<div class="stack stack-sm w-lg">
  <div class="alert alert-success" role="status"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-check"/></svg><div class="alert__content"><p class="alert__title u-m-0">Take 47 exported</p><p class="alert__body u-m-0">4.2s · 1080p · 212 MB.</p></div></div>
  <div class="alert alert-info" role="status"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-info"/></svg><div class="alert__content"><p class="alert__title u-m-0">Rendering in the background</p><p class="alert__body u-m-0">You can keep editing; the file lands in Exports.</p></div></div>
  <div class="alert alert-warning" role="status"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-alert"/></svg><div class="alert__content"><p class="alert__title u-m-0">Audio peaks at −0.2 dB</p><p class="alert__body u-m-0">Two sections will clip on a phone speaker. Normalise before publishing.</p></div></div>
  <div class="alert alert-danger" role="alert"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-alert"/></svg><div class="alert__content"><p class="alert__title u-m-0">Export failed</p><p class="alert__body u-m-0">The disk is full. Clear 2 GB and retry — the render is cached.</p></div></div>
  <div class="alert alert-accent" role="status"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-live"/></svg><div class="alert__content"><p class="alert__title u-m-0">You are live</p><p class="alert__body u-m-0">1,204 watching. The stream key rotates when you end.</p></div></div>
  <div class="alert" role="status"><div class="alert__content"><p class="alert__body u-m-0">A neutral note with no icon and no title — a body is enough.</p></div></div>
</div>
:::

## With icon, title, body

The parts compose: icon only, title only, body only, or all three. The icon
takes the alert's own colour, so the status is visible without a second token.

:::demo Body only · title only · icon and body
<div class="stack stack-sm w-lg">
  <div class="alert alert-info"><div class="alert__content"><p class="alert__body u-m-0">Captions are generated after upload; edit them in the transcript tab.</p></div></div>
  <div class="alert alert-success"><div class="alert__content"><p class="alert__title u-m-0">Published to members</p></div></div>
  <div class="alert alert-warning"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-clock"/></svg><div class="alert__content"><p class="alert__body u-m-0">Scheduled for 09:00 — the thumbnail is still the placeholder.</p></div></div>
</div>
:::

## With actions

Actions sit under the words and stay link- or outline-weight. A primary button
inside an alert competes with the page's one primary.

:::demo
<div class="stack stack-sm w-lg">
  <div class="alert alert-danger" role="alert">
    <svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-alert"/></svg>
    <div class="alert__content">
      <p class="alert__title u-m-0">Upload interrupted at 62%</p>
      <p class="alert__body u-m-0">The connection dropped. The first 62% is kept.</p>
      <div class="alert__actions"><button class="btn btn-danger-outline btn-sm" type="button">Resume upload</button><button class="btn btn-quiet btn-sm" type="button">Discard</button></div>
    </div>
  </div>
  <div class="alert alert-info">
    <svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-download"/></svg>
    <div class="alert__content">
      <p class="alert__title u-m-0">Theme 2.1 is available</p>
      <p class="alert__body u-m-0">Container queries in the card, and the new footer.</p>
      <div class="alert__actions"><a class="btn btn-link btn-sm" href="#i">Read the changelog</a></div>
    </div>
  </div>
</div>
:::

## Dismissible

The close is a square quiet button pulled to the end edge. It carries no
behaviour of its own — removing the node is the consumer's job — so it is
never a fake close that only hides.

:::demo
<div class="stack stack-sm w-lg">
  <div class="alert alert-success" role="status">
    <svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-check"/></svg>
    <div class="alert__content"><p class="alert__title u-m-0">Comment posted</p><p class="alert__body u-m-0">Viewers see it after the next refresh.</p></div>
    <button class="btn btn-quiet btn-icon btn-sm alert__close" type="button" aria-label="Dismiss"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button>
  </div>
  <div class="alert">
    <div class="alert__content"><p class="alert__body u-m-0">Tip: press <kbd class="kbd">K</kbd> to pause the preview.</p></div>
    <button class="btn btn-quiet btn-icon btn-sm alert__close" type="button" aria-label="Dismiss"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button>
  </div>
</div>
:::

```js
close.addEventListener('click', () => close.closest('.alert').remove());
```

## Solid

The status fill with light text, for the alert that has to be seen from across
the room. Use it on a banner or an inverse band; in running content the tinted
default is enough.

:::demo
<div class="stack stack-sm w-lg">
  <div class="alert alert-solid alert-danger" role="alert"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-alert"/></svg><div class="alert__content"><p class="alert__title u-m-0">Stream key leaked</p><p class="alert__body u-m-0">Rotate it now. Anyone with the old key can go live as you.</p></div></div>
  <div class="alert alert-solid alert-success"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-check"/></svg><div class="alert__content"><p class="alert__body u-m-0">All 14 lessons transcoded.</p></div></div>
  <div class="alert alert-solid alert-warning"><div class="alert__content"><p class="alert__body u-m-0">Storage at 91%.</p></div></div>
  <div class="alert alert-solid alert-info"><div class="alert__content"><p class="alert__body u-m-0">Maintenance at 02:00 UTC.</p></div></div>
  <div class="alert alert-solid alert-accent"><div class="alert__content"><p class="alert__body u-m-0">On air.</p></div></div>
  <div class="alert alert-solid"><div class="alert__content"><p class="alert__body u-m-0">Neutral solid — ink on paper.</p></div></div>
</div>
:::

## Quiet and inline

`alert-quiet` drops the fill for a note in running text. `alert-inline` is the
small one — a field hint, a line inside a card, a caption under a form.

:::demo
<div class="stack stack-sm w-lg">
  <div class="alert alert-quiet alert-info"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-info"/></svg><div class="alert__content"><p class="alert__body u-m-0">Members-only posts are hidden from search engines by default.</p></div></div>
  <div class="alert alert-quiet alert-warning"><div class="alert__content"><p class="alert__title u-m-0">Unsaved changes</p><p class="alert__body u-m-0">Leaving this page discards the new thumbnail.</p></div></div>
  <div class="alert alert-inline alert-danger"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-alert"/></svg><div class="alert__content">Slug already used by <b>ep-47-the-frame-layer</b>.</div></div>
  <div class="alert alert-inline alert-success"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-check"/></svg><div class="alert__content">Slug available.</div></div>
  <div class="alert alert-inline"><div class="alert__content">A neutral inline note.</div></div>
</div>
:::

## Banner

Full width, no radius, no side rule: the strip under the navbar that says the
site is in maintenance. Centred, so it reads as the page speaking rather than
one component.

:::demo
<div class="stack stack-sm">
  <div class="alert alert-banner alert-warning" role="status"><svg class="icon alert__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-clock"/></svg><div class="alert__content">Uploads pause for maintenance tonight, 02:00–02:30 UTC.</div></div>
  <div class="alert alert-banner alert-solid alert-accent"><div class="alert__content"><b>Live now:</b> The frame layer, explained — <a href="#i" class="u-fg">join the stream</a></div><button class="btn btn-quiet btn-icon btn-sm alert__close" type="button" aria-label="Dismiss"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button></div>
  <div class="alert alert-banner"><div class="alert__content">Season 2 pre-orders open on Friday.</div></div>
</div>
:::

## Empty state

An invitation with a verb, never "Nothing here yet". The dashed border says
*a thing goes here*; the action says which thing.

:::demo
<div class="empty w-lg">
  <svg class="icon empty__icon" aria-hidden="true"><use href="/icons/sprite.svg#i-upload"/></svg>
  <h3 class="empty__title">Upload your first take</h3>
  <p class="empty__body">Drop a file, or record straight from the browser. Nothing is published until you say so.</p>
  <div class="empty__actions"><button class="btn btn-primary" type="button">Upload a file</button><button class="btn btn-outline" type="button">Record now</button></div>
</div>
:::

## Toast

An alert that arrives has [its own page](/toast.html) — same palette, plus
placement, stacking and the auto-dismiss timer.

## Properties

| Variable | Does |
| --- | --- |
| `--alert-bg` | fill |
| `--alert-fg` | text and icon colour |
| `--alert-line` | the status rule and the border |
| `--alert-pad` | padding — `alert-inline` tightens it |
| `--alert-radius` | corners — `alert-banner` squares them |

## Accessibility

- A message that answers an action is `role="status"`; a failure the reader
  must see now is `role="alert"`. Both are announced without focus moving.
- Colour is never alone: every status alert carries an icon or a title.
- The close button is a real `<button>` with `aria-label="Dismiss"`.
- Actions are buttons or links, in the tab order, after the message they act on.
- Never auto-dismiss an error: a failure that vanishes before it is read did
  not happen, as far as the reader knows.
