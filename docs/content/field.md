---
title: Field
group: Components
order: 15
lead: Input, select, checkbox, radio — native controls, dressed rather than rebuilt.
---

The browser already knows how to be a form control. The job here is to make the
controls look like they belong, not to rebuild them — a rebuilt checkbox loses
keyboard behaviour, form association and assistive-tech support in one move.

## Text input

:::demo
<div class="stack w-md">
  <div class="field">
    <label class="field__label" for="f-name">Episode title</label>
    <input class="input" id="f-name" type="text" placeholder="Take 47" />
    <span class="field__hint">Shown on the thumbnail and the OG card.</span>
  </div>
  <div class="field">
    <label class="field__label" for="f-bad">Slug</label>
    <input class="input" id="f-bad" type="text" value="take 47!" aria-invalid="true" aria-describedby="f-bad-err" />
    <span class="field__error" id="f-bad-err" role="alert">Spaces and punctuation break the URL — try take-47.</span>
  </div>
</div>
:::

The invalid state styles `[aria-invalid]`, not a class — the attribute is the
same fact the screen reader announces, so the two cannot disagree. The error
says what happened, then what to do (PRINCIPLES #12).

## Select

The native `<select>`, restyled only on the outside. The popup list stays the
platform's — which is what makes it work on every OS and with every input
method.

:::demo
<div class="cluster w-md">
  <select class="select">
    <option>All takes</option>
    <option>Published</option>
    <option>Drafts</option>
  </select>
  <select class="select select-sm"><option>Newest</option><option>Oldest</option></select>
</div>
:::

## Checkbox, radio, choice card

`accent-color` is the entire checkbox implementation. The choice card makes the
whole tile the control — the input stays real, so keyboard and screen reader
behaviour stay native, and `:has(:checked)` styles the tile from the input's
own state.

:::demo
<div class="stack w-md">
  <label class="choice"><input class="check" type="checkbox" checked /> Publish to the feed</label>
  <label class="choice"><input class="check" type="checkbox" /> Notify subscribers</label>
  <div class="grid-2">
    <label class="choice choice-card"><input class="radio" type="radio" name="q" checked /> 1080p</label>
    <label class="choice choice-card"><input class="radio" type="radio" name="q" /> 4K</label>
  </div>
</div>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--input-h` | control height |
| `--input-bg`, `--input-line`, `--input-pad` | surface, border, padding |
| `--field-gap` | label/control/hint spacing |
