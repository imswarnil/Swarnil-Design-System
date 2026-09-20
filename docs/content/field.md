---
title: Field
group: Forms
order: 50
lead: Label, control, hint or error — one unit, built on native controls that are dressed rather than rebuilt.
---

:::demo The unit
<div class="stack w-md">
  <div class="field">
    <label class="field__label" for="f-title">Episode title</label>
    <input class="input" id="f-title" type="text" placeholder="Take 47: the lav mic that would not die" />
    <span class="field__hint">Shown on the thumbnail and the OG card.</span>
  </div>
  <div class="field">
    <label class="field__label" for="f-slug">Slug</label>
    <input class="input" id="f-slug" type="text" value="take 47!" aria-invalid="true" aria-describedby="f-slug-err" />
    <span class="field__error" id="f-slug-err" role="alert">Spaces and punctuation break the URL — try take-47.</span>
  </div>
</div>
:::

The browser already knows how to be a form control. The job here is to make
each one look like it belongs, not to rebuild it — a rebuilt checkbox loses
keyboard behaviour, form association and assistive-tech support in one move.
Every control is exactly as tall as a button of the same size, so a field and a
submit sit on one line without shimming.

## Label, hint, error, count

Optional marks itself; required does not. Most fields are required, so an
asterisk on each one is noise and the exception is what gets the word. A hint
and an error never show together: when the field is invalid the error has taken
the hint's line, and the stylesheet hides the hint itself.

:::demo
<div class="stack w-md">
  <div class="field">
    <label class="field__label" for="f-desc" data-optional>Description</label>
    <textarea class="input" id="f-desc" rows="3" placeholder="What happens in this one?"></textarea>
    <div class="cluster cluster-between">
      <span class="field__hint">Plain text. Links become chapters.</span>
      <span class="field__count">0 / 160</span>
    </div>
  </div>
</div>
:::

## Validation

The invalid state styles `[aria-invalid]`, not a class — the attribute is the
same fact the screen reader announces, so the two cannot disagree. It also
styles `:user-invalid`, the browser's own verdict once the user has touched the
control, so `required` and `pattern` light up with no script at all. Clear the
second field below and tab away to see it.

:::demo
<div class="stack w-md">
  <div class="field">
    <label class="field__label" for="f-email">Email</label>
    <input class="input" id="f-email" type="email" value="swarnil@" aria-invalid="true" aria-describedby="f-email-err" />
    <span class="field__error" id="f-email-err" role="alert">Add a domain after the @ to finish this address.</span>
  </div>
  <div class="field">
    <label class="field__label" for="f-req">Episode number</label>
    <input class="input" id="f-req" type="number" value="47" min="1" required />
    <span class="field__hint">Required — the browser flags it once you leave it empty.</span>
  </div>
</div>
:::

The error says what happened, then what to do. Never just "invalid".

## Text input

:::demo States
<div class="stack stack-sm w-md">
  <input class="input" type="text" placeholder="Default" aria-label="Default" />
  <input class="input" type="text" value="Filled value" aria-label="Filled" />
  <input class="input" type="text" value="Read only" readonly aria-label="Read only" />
  <input class="input" type="text" placeholder="Disabled" disabled aria-label="Disabled" />
</div>
:::

:::demo Sizes
<div class="stack stack-sm w-md">
  <input class="input input-sm" type="text" placeholder="Small · 2rem" aria-label="Small" />
  <input class="input" type="text" placeholder="Default · 2.5rem" aria-label="Default" />
  <input class="input input-lg" type="text" placeholder="Large · 3rem" aria-label="Large" />
</div>
:::

Three heights, matching `.btn-sm`, `.btn` and `.btn-lg`. The size goes on the
control, not on the wrapper — `.input-sm`, `.select-sm` and `.textarea-sm`, and
the same three in `-lg`. To resize every control at once, put `.form-sm` or
`.form-lg` on the form; see [Form](/form).

## Textarea

A `<textarea>` takes the same `.input` class. It grows with the field, never the
page: the resize handle is vertical only.

:::demo
<div class="field w-md">
  <label class="field__label" for="f-notes">Show notes</label>
  <textarea class="input" id="f-notes" rows="4" placeholder="00:00 Cold open&#10;02:14 Why the lav died"></textarea>
</div>
:::

## With an icon

`.input-icon` seats a glyph inside the control and pads the text past it. The
icon sits on the leading edge, goes quiet in `--color-mute`, and takes the ink
colour while the control has focus.

:::demo
<div class="stack stack-sm w-md">
  <div class="input-icon">
    <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-search"/></svg>
    <input class="input" type="search" placeholder="Search episodes" aria-label="Search episodes" />
  </div>
</div>
:::

## Select

The native `<select>`, restyled only on the outside. The popup list stays the
platform's — which is what makes it work on every OS and with every input
method. A `multiple` select drops the chevron and shows its options in the box.

:::demo
<div class="stack stack-sm w-md">
  <select class="select" aria-label="Collection">
    <option>All takes</option>
    <option>Published</option>
    <option>Drafts</option>
  </select>
  <select class="select select-sm" aria-label="Sort"><option>Newest</option><option>Oldest</option></select>
  <select class="select select-lg" aria-label="Quality"><option>1080p60</option><option>4K</option></select>
  <select class="select" disabled aria-label="Disabled"><option>Disabled</option></select>
  <select class="select" aria-invalid="true" aria-label="Invalid"><option>Pick a category</option></select>
  <select class="select" multiple size="3" aria-label="Chapters">
    <option selected>Cold open</option>
    <option>Why the lav died</option>
    <option>The fix</option>
  </select>
</div>
:::

## Checkbox and radio

`.check` draws the box itself — a fill with a masked tick, no sprite and no
extra element — so a checked box inverts to the ink colour instead of tinting
the platform's. `type="radio"` rounds it and swaps the tick for a dot. Space and
the arrow keys behave exactly as the platform ships them, and the `.choice`
label wraps the input so the whole line is the hit target.

:::demo
<div class="stack stack-sm w-md">
  <label class="choice"><input class="check" type="checkbox" checked /> Publish to the feed</label>
  <label class="choice"><input class="check" type="checkbox" /> Notify subscribers</label>
  <label class="choice"><input class="check" type="checkbox" disabled /> Cross-post to the newsletter</label>
</div>
:::

:::demo Radios, grouped by a real fieldset
<fieldset class="fieldset w-md">
  <legend>Watch quality</legend>
  <label class="choice"><input class="check" type="radio" name="q" checked /> Auto (recommended)</label>
  <label class="choice"><input class="check" type="radio" name="q" /> 1080p60 always</label>
  <label class="choice"><input class="check" type="radio" name="q" /> Data saver</label>
</fieldset>
:::

:::demo Two-line choice
<div class="stack stack-sm w-md">
  <label class="choice">
    <input class="check" type="checkbox" checked />
    <span>Members only<span class="choice__hint">Free viewers see the trailer and a join button.</span></span>
  </label>
  <label class="choice">
    <input class="check" type="checkbox" />
    <span>Schedule<span class="choice__hint">Goes live at 09:00 in the channel's timezone.</span></span>
  </label>
</div>
:::

## Switch

A switch is for a setting that takes effect immediately; a checkbox is for a
value that gets submitted. The input is still a checkbox — only its box is
drawn — so form association and Space-to-toggle come free. `role="switch"` tells
the screen reader which of the two it is.

:::demo
<div class="stack stack-sm w-md">
  <label class="choice"><input class="switch" type="checkbox" role="switch" checked /> Autoplay next lesson</label>
  <label class="choice"><input class="switch" type="checkbox" role="switch" /> Reduced-motion previews</label>
  <label class="choice"><input class="switch switch-sm" type="checkbox" role="switch" checked /> Small switch</label>
  <label class="choice"><input class="switch" type="checkbox" role="switch" disabled /> Disabled</label>
</div>
:::

## Range

One slider; the accent fills to the thumb. Set `--value` inline (or from an
`input` listener, as below) for the filled track — without it the track sits at
half, which is only honest for a default of 50.

:::demo
<div class="stack stack-sm w-md">
  <label class="field__label" for="f-pos">Playback position</label>
  <input class="range" id="f-pos" type="range" min="0" max="100" value="35" style="--value: 35%" oninput="this.style.setProperty('--value', this.value + '%')" />
  <div class="range-scale" aria-hidden="true"><span>00:00</span><span>14:22</span></div>
  <input class="range" type="range" value="60" style="--value: 60%" disabled aria-label="Disabled" />
</div>
:::

## File

The native file input, its button dressed as a small outline button. The text
beside it ("No file chosen") is the browser's and stays so — it is the one
place a localised string comes free.

:::demo
<div class="field w-md">
  <label class="field__label" for="f-thumb">Thumbnail</label>
  <input class="input" id="f-thumb" type="file" accept="image/*" />
  <span class="field__hint">1280 × 720 or larger. PNG or JPG.</span>
</div>
:::

## Floating label

The label rests where the value will be, then retreats to a caption on focus or
fill. The placeholder must be a single space: `:placeholder-shown` is what tells
an empty control from a filled one, and it needs a placeholder to show. Only
the label's position and colour move; its size and case snap, which at 120ms
reads as one motion.

:::demo
<div class="stack stack-sm w-md">
  <label class="field field-float"><input class="input" type="email" placeholder=" " /><span class="field__label">Email address</span></label>
  <label class="field field-float"><input class="input" type="text" placeholder=" " value="Swarnil Singhai" /><span class="field__label">Name</span></label>
  <label class="field field-float"><input class="input" type="text" placeholder=" " value="take 47!" aria-invalid="true" /><span class="field__label">Slug</span></label>
  <label class="field field-float"><textarea class="input" rows="3" placeholder=" "></textarea><span class="field__label">Message</span></label>
</div>
:::

## Inline field

Label beside the control instead of above it — a settings row. `--field-label-w`
sets the label column so a stack of them lines up.

:::demo
<div class="stack stack-sm w-lg">
  <div class="field field-inline">
    <label class="field__label" for="f-handle">Handle</label>
    <input class="input" id="f-handle" type="text" value="imswarnil" />
  </div>
  <div class="field field-inline">
    <label class="field__label" for="f-tz">Timezone</label>
    <select class="select" id="f-tz"><option>Asia/Kolkata</option><option>UTC</option></select>
  </div>
</div>
:::

## Properties

| Variable | On | Does |
| --- | --- | --- |
| `--input-h` | `.input`, `.select` | Control height — `2.5rem`, and the radius is half of it |
| `--input-bg` | `.input`, `.select` | The fill, which is the whole shape: there is no border to set |
| `--input-bg-hover` | same | The step the fill takes on hover and while focused |
| `--input-line` | same | `transparent` by default; `.input-bordered` and the invalid state are what set it |

The rest is the token layer doing its job. Sizes come from `.input-sm` and
`.input-lg` setting `--input-h`; the inline padding, the radius and the type
size are derived from it rather than named separately.

## Accessibility

- Every control has a label: a `<label for>`, a wrapping `.choice`, or
  `aria-label` when the label is visual only (a search box with an icon).
- Errors carry `role="alert"` and are linked from the control with
  `aria-describedby`, so the message is read when focus lands.
- Invalid state is `aria-invalid="true"` or the browser's own `:user-invalid`,
  never a class; disabled is the `disabled` attribute.
- The error disc means the state is never carried by colour alone.
- A switch carries `role="switch"`; a group of radios sits in a real
  `<fieldset>` with a `<legend>`.
- The floating label is a real `<label>` wrapping the input, so it is the
  accessible name whether floated or resting.
