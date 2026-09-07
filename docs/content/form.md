---
title: Form
group: Forms
order: 50
lead: Fields in a column, rows that pair, groups with a legend, and the actions at the end — the layout that holds every control on the Field page.
---

:::demo A short form
<form class="form w-lg" action="#" onsubmit="return false">
  <div class="form-row">
    <div class="field">
      <label class="field__label" for="fm-first">First name</label>
      <input class="input" id="fm-first" type="text" autocomplete="given-name" />
    </div>
    <div class="field">
      <label class="field__label" for="fm-last">Last name</label>
      <input class="input" id="fm-last" type="text" autocomplete="family-name" />
    </div>
  </div>
  <div class="field">
    <label class="field__label" for="fm-email">Email</label>
    <input class="input" id="fm-email" type="email" placeholder="you@domain.com" autocomplete="email" />
  </div>
  <div class="field">
    <label class="field__label" for="fm-topic">Topic</label>
    <select class="select" id="fm-topic"><option>Sponsorship</option><option>Collab</option><option>Just saying hi</option></select>
  </div>
  <label class="choice"><input class="check" type="checkbox" checked /> Reply by email, not a call</label>
  <div class="form__actions">
    <button class="btn btn-primary" type="submit">Send it</button>
    <button class="btn btn-quiet" type="reset">Clear</button>
  </div>
</form>
:::

A form composes from the same gap ladder as everything else. `.form` is a
column of fields; `.form-row` pairs fields side by side and stacks them when
there is no room; `.fieldset` groups related controls under a legend; and
`.form__actions` puts the buttons where the reading ends, primary first.
Nothing here is a control — every control lives on [Field](/field).

## Rows

`.form-row` is a grid of equal columns that stacks on its own. It uses
`auto-fit` against a minimum column width rather than a media query, so it
stacks by arithmetic when its container is narrow, not when the viewport is —
toggle the 320px preview to see it. `.form-row-3` lowers the minimum so three
fields fit.

:::demo
<form class="form w-lg" action="#" onsubmit="return false">
  <div class="form-row">
    <div class="field">
      <label class="field__label" for="fr-w">Width</label>
      <input class="input" id="fr-w" type="number" value="1920" />
    </div>
    <div class="field">
      <label class="field__label" for="fr-h">Height</label>
      <input class="input" id="fr-h" type="number" value="1080" />
    </div>
  </div>
  <div class="form-row form-row-3">
    <div class="field">
      <label class="field__label" for="fr-hh">Hours</label>
      <input class="input" id="fr-hh" type="number" value="0" min="0" />
    </div>
    <div class="field">
      <label class="field__label" for="fr-mm">Minutes</label>
      <input class="input" id="fr-mm" type="number" value="12" min="0" max="59" />
    </div>
    <div class="field">
      <label class="field__label" for="fr-ss">Seconds</label>
      <input class="input" id="fr-ss" type="number" value="47" min="0" max="59" />
    </div>
  </div>
</form>
:::

## Fieldset and legend

A group of related controls is a real `<fieldset>`: the legend is announced
before each control inside it, which is how a screen reader user learns that
"1080p60" belongs to "Watch quality". The legend is a label, so it wears the
label voice. `.fieldset-boxed` draws the group as a panel; `disabled` on the
fieldset disables everything inside it at once.

:::demo
<form class="form w-lg" action="#" onsubmit="return false">
  <fieldset class="fieldset">
    <legend>Visibility</legend>
    <label class="choice"><input class="radio" type="radio" name="vis" checked /> Public</label>
    <label class="choice"><input class="radio" type="radio" name="vis" /> Members</label>
    <label class="choice"><input class="radio" type="radio" name="vis" /> Unlisted</label>
  </fieldset>
  <fieldset class="fieldset fieldset-boxed">
    <legend>Distribution</legend>
    <label class="choice"><input class="switch" type="checkbox" role="switch" checked /> Publish to the RSS feed</label>
    <label class="choice"><input class="switch" type="checkbox" role="switch" /> Cross-post to the newsletter</label>
  </fieldset>
  <fieldset class="fieldset fieldset-boxed" disabled>
    <legend>Sponsor read</legend>
    <div class="field">
      <label class="field__label" for="fs-sp">Sponsor</label>
      <input class="input" id="fs-sp" type="text" placeholder="No sponsor on this episode" />
    </div>
  </fieldset>
</form>
:::

## Input group

A control with something welded to its edge: a prefix, a suffix, a button.
The children fuse — inner radii drop, adjacent borders overlap so the seam
reads as one line — and the focused control rises so its ring stays whole.

:::demo
<div class="stack stack-sm w-lg">
  <div class="input-group">
    <span class="input-group__text">https://</span>
    <input class="input" type="text" value="imswarnil.com" aria-label="URL" />
  </div>
  <div class="input-group">
    <input class="input" type="email" placeholder="you@domain.com" aria-label="Email" />
    <button class="btn btn-primary" type="button">Subscribe</button>
  </div>
  <div class="input-group">
    <span class="input-group__text">₹</span>
    <input class="input" type="number" value="499" aria-label="Price" />
    <span class="input-group__text">/ mo</span>
  </div>
  <div class="input-group">
    <select class="select" aria-label="Protocol"><option>rtmp://</option><option>srt://</option></select>
    <input class="input" type="text" placeholder="live.imswarnil.com/ingest" aria-label="Ingest URL" />
    <button class="btn btn-outline btn-icon" type="button" aria-label="Copy"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-link"/></svg></button>
  </div>
</div>
:::

## Inline form

Everything on one line: a filter bar, the subscribe form. The row aligns on
the controls' bottom edge, so a field with a label and a bare button still
line up. It wraps when it must.

:::demo
<form class="form form-inline" action="#" onsubmit="return false">
  <div class="field">
    <label class="field__label" for="fi-q">Search</label>
    <input class="input" id="fi-q" type="search" placeholder="Episode, guest, tag" />
  </div>
  <div class="field">
    <label class="field__label" for="fi-status">Status</label>
    <select class="select" id="fi-status"><option>Any</option><option>Published</option><option>Draft</option></select>
  </div>
  <button class="btn btn-outline" type="submit">Filter</button>
</form>
:::

## Sizes

`.form-sm` and `.form-lg` set an inherited height that every `.input`,
`.select` and `.range` inside reads, so a compact filter form or a large
sign-up form is one class rather than one per control. The buttons take their
own size class — a button is not a field.

:::demo
<div class="stack w-lg">
  <form class="form form-inline form-sm" action="#" onsubmit="return false">
    <div class="field">
      <label class="field__label" for="fz-1">Small</label>
      <input class="input" id="fz-1" type="text" placeholder="2rem" />
    </div>
    <div class="field">
      <label class="field__label" for="fz-2">Sort</label>
      <select class="select" id="fz-2"><option>Newest</option></select>
    </div>
    <button class="btn btn-outline btn-sm" type="button">Apply</button>
  </form>
  <form class="form form-inline form-lg" action="#" onsubmit="return false">
    <div class="field">
      <label class="field__label" for="fz-3">Large</label>
      <input class="input" id="fz-3" type="email" placeholder="you@domain.com" />
    </div>
    <button class="btn btn-primary btn-lg" type="button">Subscribe</button>
  </form>
</div>
:::

## Upload an episode

The whole vocabulary on one page: rows, a fieldset, a choice card, a switch, a
range, a file input, a floating label, a divider, and the actions at the end.
Try submitting with the title empty — the browser marks it invalid, and the
stylesheet styles that verdict with no script.

:::demo
<form class="form w-lg" action="#" onsubmit="return false">
  <div class="field">
    <label class="field__label" for="up-title">Title</label>
    <input class="input" id="up-title" type="text" placeholder="Take 47: the lav mic that would not die" required maxlength="100" />
    <div class="cluster cluster-between">
      <span class="field__hint">Shown on the thumbnail and the OG card.</span>
      <span class="field__count">0 / 100</span>
    </div>
  </div>
  <div class="field">
    <label class="field__label" for="up-file">Master file</label>
    <input class="input" id="up-file" type="file" accept="video/*" />
    <span class="field__hint">MP4 or MOV, up to 8 GB. Uploads resume if the connection drops.</span>
  </div>
  <div class="form-row">
    <div class="field">
      <label class="field__label" for="up-series">Series</label>
      <select class="select" id="up-series"><option>Studio Notes</option><option>Field Recordings</option><option>Standalone</option></select>
    </div>
    <div class="field">
      <label class="field__label" for="up-date">Publish on</label>
      <input class="input" id="up-date" type="date" value="2026-09-12" />
    </div>
  </div>
  <label class="field field-float"><textarea class="input" id="up-notes" rows="3" placeholder=" "></textarea><span class="field__label">Show notes</span></label>
  <hr class="form__divider" />
  <fieldset class="fieldset">
    <legend>Resolution</legend>
    <div class="grid-2">
      <label class="choice choice-card"><input class="radio" type="radio" name="up-res" checked /> 1080p60</label>
      <label class="choice choice-card"><input class="radio" type="radio" name="up-res" /> 4K</label>
    </div>
  </fieldset>
  <div class="field">
    <label class="field__label" for="up-thumb">Thumbnail frame</label>
    <input class="range" id="up-thumb" type="range" min="0" max="100" value="18" style="--value: 18%" oninput="this.style.setProperty('--value', this.value + '%')" />
    <div class="range-scale" aria-hidden="true"><span>00:00</span><span>14:22</span></div>
  </div>
  <fieldset class="fieldset">
    <legend>After publishing</legend>
    <label class="choice"><input class="switch" type="checkbox" role="switch" checked /> Notify subscribers</label>
    <label class="choice"><input class="switch" type="checkbox" role="switch" /> Post the clip to the community tab</label>
  </fieldset>
  <div class="form__actions form__actions-end">
    <button class="btn btn-ghost" type="button">Save draft</button>
    <button class="btn btn-primary" type="submit">Upload</button>
  </div>
</form>
:::

`.form__actions-end` moves the buttons to the trailing edge for a form that
ends a dialog or a sheet; the default sits them on the reading edge, under the
fields, where a page-level form ends.

## Properties

| Variable | On | Does |
| --- | --- | --- |
| `--form-gap` | `.form` | Space between fields; rows read it for their column gap too |
| `--form-row-min` | `.form-row` | Minimum column width before the row stacks (`12rem`; `.form-row-3` sets `8rem`) |
| `--field-h`, `--field-text` | `.form-sm`, `.form-lg` | Inherited control height and font size, read by every `.input`, `.select` and `.range` inside |
| `--fieldset-gap` | `.fieldset` | Space between the controls in a group |

## Accessibility

- Every group of related controls is a `<fieldset>` with a `<legend>`; do not
  fake one with a heading, the legend is what gets announced with each control.
- `disabled` on the fieldset disables its controls; `.fieldset` only dims it.
- `.form-row` and `.form-inline` are layout only — the reading order is the
  source order, so keep the source in the order a person fills the form.
- One `type="submit"` per form, and it is the primary button. A `type="reset"`
  is quiet, because losing everything typed should be hard to do by accident.
- The input group's button must have a name: text, or `aria-label` when it is
  icon-only.
- Native validation works without script; pair `required` and `pattern` with a
  `.field__hint` that says what is expected before the user gets it wrong.
