---
title: Badge
group: Components
order: 50
lead: A label with a background. The status colours are chosen so none of them can be mistaken for the accent.
---

:::demo Emphasis
<div class="cluster">
  <span class="badge">Draft</span>
  <span class="badge badge-solid">Solid</span>
  <span class="badge badge-outline">Outline</span>
  <span class="badge badge-quiet">Quiet</span>
</div>
:::

:::demo Meaning
<div class="cluster">
  <span class="badge badge-accent">Accent</span>
  <span class="badge badge-craft">Craft</span>
  <span class="badge badge-success">Shipped</span>
  <span class="badge badge-info">Note</span>
  <span class="badge badge-warning">Review</span>
  <span class="badge badge-danger">Blocked</span>
</div>
:::

A "danger" badge that reads as "live" is a bug, not a palette preference — the
status hues sit far from the accent's hue for exactly that reason.

## Live

`.badge-live` is the one badge that gets the record colour, because *live* is the
one meaning the accent is reserved for. The dot pulses, and stops pulsing under
reduced motion.

:::demo
<div class="cluster">
  <span class="badge badge-live">Live</span>
  <span class="badge badge-dot badge-success">Passing</span>
  <span class="badge badge-lg">Large</span>
</div>
:::

## Chips

A chip is a badge you can interact with. It styles `[aria-pressed]` rather than
an `.is-selected` class, so the visual state and the announced state cannot
disagree.

:::demo
<div class="cluster">
  <button class="chip" type="button" aria-pressed="false">Salesforce <span class="chip__count">12</span></button>
  <button class="chip" type="button" aria-pressed="true">Ghost <span class="chip__count">4</span></button>
  <span class="chip chip-lg">Large chip</span>
</div>
:::

## Data, not labels

The badge is a label, so it is Inter. The count inside it is data, so it is mono.
That one example is the whole typography rule.

:::demo
<div class="cluster">
  <span class="timecode">00:14:22</span>
  <span class="timecode timecode-live">On air</span>
  <span class="cluster cluster-sm"><kbd class="kbd">⌘</kbd><kbd class="kbd">K</kbd></span>
</div>
:::

## Avatars

:::demo
<div class="cluster">
  <span class="avatar avatar-xs">S</span>
  <span class="avatar avatar-sm">S</span>
  <span class="avatar">S</span>
  <span class="avatar avatar-lg avatar-square">S</span>
  <span class="avatar avatar-lg avatar-ring">S</span>
</div>
:::

## Avatars, continued

:::demo Sizes to 2xl, the craft ring, and the live ring that breathes
<div class="cluster cluster-lg">
  <span class="avatar avatar-2xl">S</span>
  <span class="avatar avatar-xl avatar-ring-craft">S</span>
  <span class="avatar avatar-lg avatar-live">S</span>
</div>
:::

:::demo Status — a dot on the shoulder, coloured by the attribute
<div class="cluster cluster-lg">
  <span class="avatar avatar-status" data-status="online">PR</span>
  <span class="avatar avatar-status" data-status="busy">AM</span>
  <span class="avatar avatar-status" data-status="away">TK</span>
  <span class="avatar avatar-status" data-status="live">S</span>
  <span class="avatar avatar-status">LN</span>
</div>
:::

An avatar cannot be both `avatar-live` and carry a status: both are the one
`::after`. One thing at a time on a face.

:::demo Group — faces overlap, each ringed in canvas; tight, and with a count
<div class="stack">
  <div class="avatar-group"><span class="avatar">PR</span><span class="avatar">AM</span><span class="avatar">TK</span><span class="avatar">LN</span><span class="avatar-group__more">+1,204 watching</span></div>
  <div class="avatar-group avatar-group-tight"><span class="avatar avatar-sm">PR</span><span class="avatar avatar-sm">AM</span><span class="avatar avatar-sm">TK</span><span class="avatar avatar-sm">LN</span><span class="avatar avatar-sm">RK</span></div>
</div>
:::

## Timecodes that seek

`timecode-link` is a timecode that is a control — a button or a link under a
video that jumps to the moment. The playing one is `aria-current`.

:::demo
<p class="u-m-0">
  <button class="timecode timecode-link" type="button">00:00</button> Intro ·
  <button class="timecode timecode-link" type="button" aria-current="true">02:14</button> The key light ·
  <button class="timecode timecode-link" type="button">09:47</button> Fill and rim ·
  <span class="timecode timecode-sm">24:07 total</span>
</p>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--badge-bg` | Fill |
| `--badge-fg` | Text colour |
| `--badge-line` | Border colour |
| `--badge-pad` | Padding |
| `--chip-h` | Chip height |
| `--avatar-size` | Avatar diameter |
