---
title: Timeline
group: Patterns
order: 30
lead: An ordered sequence with a rail through it — the one idea the build log, itinerary and curriculum all wear differently.
---

:::demo A vertical timeline with a done step, the current step, and what is ahead
<ol class="timeline">
  <li class="timeline__item" data-done data-kind="start">
    <span class="timeline__node"></span>
    <div class="timeline__body">
      <span class="timeline__time">Jun 02</span>
      <span class="timeline__title">Channel trailer scripted</span>
      <p class="timeline__note">Ninety seconds, one take promised, four taken.</p>
    </div>
  </li>
  <li class="timeline__item" data-done>
    <span class="timeline__node">2</span>
    <div class="timeline__body">
      <span class="timeline__time">Jun 05</span>
      <span class="timeline__title">Set rebuilt for the wide lens</span>
    </div>
  </li>
  <li class="timeline__item" aria-current="step">
    <span class="timeline__node">3</span>
    <div class="timeline__body">
      <span class="timeline__time">Jun 10</span>
      <a class="timeline__title" href="#i">Episode 12 in the edit</a>
      <p class="timeline__note">Colour pass done; the mix is waiting on the voice-over retake.</p>
      <div class="timeline__meta"><span class="badge">Edit</span><span class="badge badge-craft">Retake</span></div>
    </div>
  </li>
  <li class="timeline__item" data-kind="ship">
    <span class="timeline__node"></span>
    <div class="timeline__body">
      <span class="timeline__time">Jun 14</span>
      <span class="timeline__title">Publish</span>
    </div>
  </li>
</ol>
:::

The rail stops short of the first and last node. A line that runs past them
reads as *there is more*, which is a lie in a finished sequence. State is an
attribute, not a class: `[data-done]` fills the node, `[aria-current]` rings it
with the accent, and everything after the current item goes dashed without
being told.

## State

`[data-done]` is behind you. `[aria-current]` is where you are. `[data-upcoming]`
says *ahead* explicitly, for a sequence with no current item to count from.
`[data-kind]` swaps the glyph — `start`, `ship`, or `now` for the one node
painted solid accent.

:::demo Every state on one rail
<ol class="timeline">
  <li class="timeline__item" data-done><span class="timeline__node"></span><div class="timeline__body"><span class="timeline__title">Done — the node fills</span></div></li>
  <li class="timeline__item" aria-current="step"><span class="timeline__node">2</span><div class="timeline__body"><span class="timeline__title">Current — the accent ring</span></div></li>
  <li class="timeline__item" data-upcoming><span class="timeline__node">3</span><div class="timeline__body"><span class="timeline__title">Upcoming — dashed, receded</span></div></li>
  <li class="timeline__item" data-kind="now"><span class="timeline__node"></span><div class="timeline__body"><span class="timeline__title">Now — the one solid accent node</span></div></li>
</ol>
:::

## A mark in the node

A node carrying a real icon drops the generated glyph. Two marks in one circle
is one too many, and the icon says more than a tick does.

:::demo
<ol class="timeline">
  <li class="timeline__item" data-done><span class="timeline__node"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-mic"/></svg></span><div class="timeline__body"><span class="timeline__time">Take 1</span><span class="timeline__title">Voice-over recorded</span></div></li>
  <li class="timeline__item" data-done><span class="timeline__node"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-camera"/></svg></span><div class="timeline__body"><span class="timeline__time">Take 2</span><span class="timeline__title">B-roll captured</span></div></li>
  <li class="timeline__item" aria-current="step"><span class="timeline__node"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-upload"/></svg></span><div class="timeline__body"><span class="timeline__time">Now</span><span class="timeline__title">Uploading</span></div></li>
</ol>
:::

## Density

:::demo Compact — a changelog in a sidebar
<ol class="timeline timeline-compact">
  <li class="timeline__item" data-done><span class="timeline__node"></span><div class="timeline__body"><span class="timeline__time">14:02</span><span class="timeline__title">Thumbnail swapped</span></div></li>
  <li class="timeline__item" data-done><span class="timeline__node"></span><div class="timeline__body"><span class="timeline__time">14:20</span><span class="timeline__title">Chapters added</span></div></li>
  <li class="timeline__item" aria-current="step"><span class="timeline__node"></span><div class="timeline__body"><span class="timeline__time">14:41</span><span class="timeline__title">Scheduled for Friday</span></div></li>
</ol>
:::

:::demo Large — three milestones that matter
<ol class="timeline timeline-lg">
  <li class="timeline__item" data-done><span class="timeline__node">1</span><div class="timeline__body"><span class="timeline__time">2024</span><span class="timeline__title">First hundred subscribers</span><p class="timeline__note">Every one of them from a comment reply.</p></div></li>
  <li class="timeline__item" aria-current="step"><span class="timeline__node">2</span><div class="timeline__body"><span class="timeline__time">2025</span><span class="timeline__title">The course launches</span></div></li>
  <li class="timeline__item"><span class="timeline__node">3</span><div class="timeline__body"><span class="timeline__time">2026</span><span class="timeline__title">Studio two</span></div></li>
</ol>
:::

## Ranged

A role held for three years is a bar, not a dot. `.timeline-ranged` turns each
node into a capsule that fills its own row, with its mark at the top where the
span begins.

:::demo
<ol class="timeline timeline-ranged timeline-lg">
  <li class="timeline__item"><span class="timeline__node"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-video"/></svg></span><div class="timeline__body"><span class="timeline__time">2023 – now</span><span class="timeline__title">Running the channel</span><p class="timeline__note">Weekly episodes, a course, and a studio built twice.</p></div></li>
  <li class="timeline__item"><span class="timeline__node"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-code"/></svg></span><div class="timeline__body"><span class="timeline__time">2019 – 2023</span><span class="timeline__title">Salesforce consultant</span><p class="timeline__note">Where the CRM Analytics material comes from.</p></div></li>
</ol>
:::

## Alternating

Items zig-zag either side of a centred rail. Only honest with short copy and an
even-ish count; below 48rem it folds back to the plain rail rather than
squeezing two columns into nothing.

:::demo
<ol class="timeline timeline-alt">
  <li class="timeline__item" data-done><span class="timeline__node"></span><div class="timeline__body"><span class="timeline__time">Week 1</span><span class="timeline__title">Script</span></div></li>
  <li class="timeline__item" data-done><span class="timeline__node"></span><div class="timeline__body"><span class="timeline__time">Week 2</span><span class="timeline__title">Shoot</span></div></li>
  <li class="timeline__item" aria-current="step"><span class="timeline__node"></span><div class="timeline__body"><span class="timeline__time">Week 3</span><span class="timeline__title">Edit</span></div></li>
  <li class="timeline__item"><span class="timeline__node"></span><div class="timeline__body"><span class="timeline__time">Week 4</span><span class="timeline__title">Publish</span></div></li>
</ol>
:::

## Horizontal

A process, not a list. `.timeline-h` runs left to right, scrolls rather than
wraps — a timeline that wraps to a second row has stopped being one line of
time — and folds to vertical under 48rem.

:::demo
<ol class="timeline timeline-h">
  <li class="timeline__item" data-done data-kind="start"><span class="timeline__node"></span><div class="timeline__body"><span class="timeline__time">Day 1</span><span class="timeline__title">Brief</span><p class="timeline__note">What the episode is for.</p></div></li>
  <li class="timeline__item" data-done><span class="timeline__node">2</span><div class="timeline__body"><span class="timeline__time">Day 3</span><span class="timeline__title">Record</span><p class="timeline__note">Two cameras, one take each.</p></div></li>
  <li class="timeline__item" aria-current="step"><span class="timeline__node">3</span><div class="timeline__body"><span class="timeline__time">Day 6</span><span class="timeline__title">Edit</span><p class="timeline__note">Cut, colour, mix.</p></div></li>
  <li class="timeline__item" data-kind="ship"><span class="timeline__node"></span><div class="timeline__body"><span class="timeline__time">Day 8</span><span class="timeline__title">Publish</span><p class="timeline__note">Friday, nine sharp.</p></div></li>
</ol>
:::

## Avatars on the rail

Who did it, not what happened. The node becomes the face and drops its
border and glyph; the current face takes the accent ring.

:::demo
<ol class="timeline timeline-avatar" style="max-width: 32rem">
  <li class="timeline__item" data-done><span class="timeline__node"><span class="avatar">PR</span></span><div class="timeline__body"><span class="timeline__time">Jun 02 · 09:14</span><span class="timeline__title">Priya opened the review</span><p class="timeline__note">Two notes on the colour pass, one on the mix.</p></div></li>
  <li class="timeline__item" aria-current="step"><span class="timeline__node"><span class="avatar">S</span></span><div class="timeline__body"><span class="timeline__time">Jun 02 · 11:40</span><span class="timeline__title">Swarnil pushed the retake</span></div></li>
  <li class="timeline__item"><span class="timeline__node"><span class="avatar">AM</span></span><div class="timeline__body"><span class="timeline__time">Pending</span><span class="timeline__title">Anu signs off</span></div></li>
</ol>
:::

## Cards on the rail

The body becomes a surface, for a changelog where each entry has a paragraph
and a tag row rather than one line.

:::demo
<ol class="timeline timeline-cards" style="max-width: 36rem">
  <li class="timeline__item" data-done><span class="timeline__node">1</span><div class="timeline__body"><span class="timeline__time">v0.1 · Sep 05</span><span class="timeline__title">The rebuild lands</span><p class="timeline__note">Nine cascade layers declared up front; every rule in one.</p><div class="timeline__meta"><span class="badge">tokens</span><span class="badge">docs</span></div></div></li>
  <li class="timeline__item" aria-current="step"><span class="timeline__node">2</span><div class="timeline__body"><span class="timeline__time">v0.2 · Sep 07</span><span class="timeline__title">The creator layer</span><p class="timeline__note">Backgrounds, effects, veils, and the broadcast bundle.</p><div class="timeline__meta"><span class="badge badge-accent">broadcast</span></div></div></li>
</ol>
:::

## Stepper

The sequence as a control: a checkout, an onboarding, an upload. Nodes are
numbered by a CSS counter so the markup carries no digits; the connector
between two done steps fills with ink, and the one leading into the current
step takes the accent. A step ahead is `aria-disabled`, never hidden.

:::demo Horizontal — the default
<ol class="stepper">
  <li class="stepper__step" data-done><span class="stepper__node"></span><span class="stepper__label">Upload</span><span class="stepper__hint">4.2 GB</span></li>
  <li class="stepper__step" data-done><span class="stepper__node"></span><span class="stepper__label">Details</span></li>
  <li class="stepper__step" aria-current="step"><span class="stepper__node"></span><span class="stepper__label">Thumbnail</span><span class="stepper__hint">1280 × 720</span></li>
  <li class="stepper__step"><span class="stepper__node"></span><span class="stepper__label">Visibility</span></li>
  <li class="stepper__step"><span class="stepper__node"></span><span class="stepper__label">Publish</span></li>
</ol>
:::

:::demo Steps as buttons — done ones go back, ahead ones are disabled
<div class="stepper stepper-sm">
  <button class="stepper__step" type="button" data-done><span class="stepper__node"></span><span class="stepper__label">Account</span></button>
  <button class="stepper__step" type="button" aria-current="step"><span class="stepper__node"></span><span class="stepper__label">Channel</span></button>
  <button class="stepper__step" type="button" aria-disabled="true"><span class="stepper__node"></span><span class="stepper__label">Import</span></button>
</div>
:::

:::demo Vertical, large, with icons and an avatar in the nodes
<ol class="stepper stepper-vertical stepper-lg" style="max-width: 24rem">
  <li class="stepper__step" data-done><span class="stepper__node"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-camera"/></svg></span><div class="stepper__body"><span class="stepper__label">Shoot</span><span class="stepper__hint">2 cameras · 47 min</span></div></li>
  <li class="stepper__step" aria-current="step"><span class="stepper__node"><span class="avatar">S</span></span><div class="stepper__body"><span class="stepper__label">Edit</span><span class="stepper__hint">In progress</span></div></li>
  <li class="stepper__step"><span class="stepper__node"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-upload"/></svg></span><div class="stepper__body"><span class="stepper__label">Publish</span><span class="stepper__hint">Thursday</span></div></li>
</ol>
:::

Below 34rem a horizontal stepper hides its labels rather than wrapping five
of them; the numbers still count. Use the vertical form when the labels must
survive on a phone.

## Properties

| Variable | Does |
| --- | --- |
| `--timeline-node` | Node diameter — the rail and the body offset follow it |
| `--timeline-gap` | Rhythm between items |
| `--timeline-rail` | Rail thickness |
| `--timeline-rail-color` | Rail colour |
| `--timeline-col` | Minimum item width in the horizontal form |

## Accessibility

- The list is an `<ol>`; order is the content, not the styling.
- `aria-current="step"` on the current item is what the ring styles — never a class.
- `[data-done]` and `[data-upcoming]` are visual only; put the state in the
  copy too (a date in the past, a ✓ badge) if it matters.
- An icon in a node is `aria-hidden`; the title carries the meaning.
- The horizontal form is a scroll container — it reaches the keyboard by
  tabbing into a linked title.
