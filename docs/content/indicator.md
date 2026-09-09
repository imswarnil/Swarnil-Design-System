---
title: Indicators
group: Components
order: 50
lead: Spinner, skeleton, progress, meter — the waiting states, added first rather than last.
---

Every system needs waiting states and most add them last, which is how a product
ends up with four ad-hoc spinners. These are the backbone set: one of each,
honest about what they can promise.

## The honesty rule

A spinner promises *soon*. A progress bar promises **a number**. Never show a
progress bar you cannot back with a real value — a bar that crawls to 90% and
stalls is a spinner wearing a lie. No number? Use the spinner or the
indeterminate bar, which promise only that work continues.

## Spinner

:::demo
<div class="cluster cluster-lg">
  <span class="spinner spinner-sm"></span>
  <span class="spinner"></span>
  <span class="spinner spinner-lg spinner-accent"></span>
  <button class="button is-primary" aria-busy="true" type="button">Saving</button>
</div>
:::

`currentColor`, so it inherits the text it replaces. Under reduced motion it
stops spinning and pulses — the user asked not to be moved, not to be
uninformed.

## Skeleton

A placeholder shaped like the content it stands in for. Size it with the
layout, not with the skeleton: a text skeleton is `1em` tall because it stands
where a line of text will be.

:::demo
<article class="card w-sm">
  <div class="skeleton skeleton-media"></div>
  <div class="card__body">
    <span class="skeleton skeleton-title"></span>
    <span class="skeleton skeleton-text"></span>
    <span class="skeleton skeleton-text-short"></span>
  </div>
</article>
:::

## Progress

The **native** `<progress>` element, restyled. With a `value` it fills; without
one, the indeterminate sweep promises only that work continues.

:::demo
<div class="stack">
  <div class="progress-row">
    <div class="progress-row__head"><span class="t-small">Uploading</span><span class="progress-row__value">64%</span></div>
    <progress class="progress" max="100" value="64"></progress>
  </div>
  <progress class="progress progress-thin" max="100" value="30"></progress>
  <progress class="progress"></progress>
</div>
:::

## Meter

Progress moves toward done; a **meter** reports where a value sits in a range —
disk used, password strength. Different element, different meaning, and the
platform ships both.

:::demo
<div class="stack">
  <meter class="meter" min="0" max="100" low="30" high="75" optimum="90" value="86"></meter>
  <meter class="meter" min="0" max="100" low="30" high="75" optimum="90" value="55"></meter>
  <meter class="meter" min="0" max="100" low="30" high="75" optimum="90" value="12"></meter>
</div>
:::

The green/amber/red come from the status tokens, driven by the element's own
`low`/`high`/`optimum` — the browser decides which band the value is in.

## Properties

| Variable | Does |
| --- | --- |
| `--spinner-size`, `--spinner-stroke` | ring geometry |
| `--skel-base` | skeleton base colour |
| `--progress-h`, `--meter-h` | bar heights |
