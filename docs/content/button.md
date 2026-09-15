---
title: Button
group: Components
order: 50
lead: One shape, eight emphases, three sizes. Only one button on a screen should be primary.
---

:::demo Emphasis
<div class="cluster">
  <button class="btn btn-primary" type="button">Record</button>
  <button class="btn btn-secondary" type="button">Preview</button>
  <button class="btn btn-outline" type="button">Export</button>
  <button class="btn btn-soft" type="button">Duplicate</button>
  <button class="btn btn-ghost" type="button">Cancel</button>
  <button class="btn btn-quiet" type="button">Skip</button>
  <button class="btn btn-danger" type="button">Delete</button>
  <button class="btn btn-link" type="button">Learn more</button>
</div>
:::

If two things are equally important then neither is. That is the accent-rationing
principle applied to a component: one primary per screen. Everything below is
the same button in a different arrangement — an icon in the label slot, two
buttons sharing an edge, a row of them on a track — so a change to `.btn`
restyles all of it.

## The density

Five sizes, and the scale is an **app** scale rather than a landing-page one:
the default is 34px with 12px of padding.

| | Height | Padding | Type | For |
| --- | --- | --- | --- | --- |
| `btn-xs` | 24px | 8px | 11px | a control inside a row of data |
| `btn-sm` | 28px | 8px | 12px | a toolbar, a card footer |
| *(default)* | **34px** | **12px** | 14px | everything else |
| `btn-lg` | 40px | 20px | 14px | a form's submit, a page's primary action |
| `btn-xl` | 46px | 24px | 16px | a hero. One per page, if that |

These were bigger. A 40px button with 16px of padding is the size a landing
page uses, where there are three buttons and each one is a decision; on a page
with twenty of them it reads as a marketing site that wandered into an
application. The two large sizes were pulled in hardest, because 56px was only
ever there for a hero.

**Shrinking the visual size does not shrink the target.** A coarse pointer gets
a 44px minimum — height *and* width on an icon button — from one media query,
so the compact scale is safe on a phone:

```css
@media (pointer: coarse) {
  .btn { min-height: var(--tap-min); }
  .btn-icon { min-width: var(--tap-min); }
}
```

[Fields](/field.html) follow the same numbers, so a button beside an input
lines up without either being told about the other.

## Emphasis × size

Every emphasis at every size. `btn-sm` tightens the gap and the type one step;
`btn-lg` is for a hero or a closing band, where the button is the only thing
on the line.

:::demo The full matrix
<div class="stack stack-sm">
  <div class="cluster">
    <button class="btn btn-primary btn-sm" type="button">Record</button>
    <button class="btn btn-secondary btn-sm" type="button">Preview</button>
    <button class="btn btn-outline btn-sm" type="button">Export</button>
    <button class="btn btn-soft btn-sm" type="button">Duplicate</button>
    <button class="btn btn-ghost btn-sm" type="button">Cancel</button>
    <button class="btn btn-quiet btn-sm" type="button">Skip</button>
    <button class="btn btn-danger btn-sm" type="button">Delete</button>
    <button class="btn btn-link btn-sm" type="button">Learn more</button>
  </div>
  <div class="cluster">
    <button class="btn btn-primary" type="button">Record</button>
    <button class="btn btn-secondary" type="button">Preview</button>
    <button class="btn btn-outline" type="button">Export</button>
    <button class="btn btn-soft" type="button">Duplicate</button>
    <button class="btn btn-ghost" type="button">Cancel</button>
    <button class="btn btn-quiet" type="button">Skip</button>
    <button class="btn btn-danger" type="button">Delete</button>
    <button class="btn btn-link" type="button">Learn more</button>
  </div>
  <div class="cluster">
    <button class="btn btn-primary btn-lg" type="button">Record</button>
    <button class="btn btn-secondary btn-lg" type="button">Preview</button>
    <button class="btn btn-outline btn-lg" type="button">Export</button>
    <button class="btn btn-soft btn-lg" type="button">Duplicate</button>
    <button class="btn btn-ghost btn-lg" type="button">Cancel</button>
    <button class="btn btn-quiet btn-lg" type="button">Skip</button>
    <button class="btn btn-danger btn-lg" type="button">Delete</button>
    <button class="btn btn-link btn-lg" type="button">Learn more</button>
  </div>
</div>
:::

A coarse pointer gets a 44px minimum height however small the design says,
because a thumb is not a mouse.

## Pill

`btn-pill` swaps the corner token for the full radius. It composes with every
emphasis and size — it is one custom property, not a variant.

:::demo Pill, every emphasis
<div class="cluster">
  <button class="btn btn-primary btn-pill" type="button">Record</button>
  <button class="btn btn-secondary btn-pill" type="button">Preview</button>
  <button class="btn btn-outline btn-pill" type="button">Export</button>
  <button class="btn btn-soft btn-pill" type="button">Duplicate</button>
  <button class="btn btn-ghost btn-pill" type="button">Cancel</button>
  <button class="btn btn-danger btn-pill" type="button">Delete</button>
  <button class="btn btn-outline btn-pill btn-sm" type="button">Small pill</button>
  <button class="btn btn-primary btn-pill btn-lg" type="button">Large pill</button>
</div>
:::

## With an icon

An icon takes the leading or trailing slot and is sized by the button
(`1.15em`), so the same sprite symbol works at every size.

:::demo Leading, trailing, both sizes
<div class="cluster">
  <button class="btn btn-primary" type="button"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-record"/></svg>Record</button>
  <button class="btn btn-outline" type="button">Next take<svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg></button>
  <button class="btn btn-soft btn-sm" type="button"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-upload"/></svg>Upload</button>
  <button class="btn btn-secondary btn-lg" type="button"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-download"/></svg>Download the theme</button>
  <button class="btn btn-ghost" type="button"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-share"/></svg>Share</button>
</div>
:::

## Icon only

`btn-icon` makes the button square: the width follows `--btn-h`, so `btn-sm`
and `btn-lg` size it with no extra class. There is no visible text, so
`aria-label` is not optional.

:::demo Three sizes, three emphases
<div class="cluster">
  <button class="btn btn-outline btn-icon btn-sm" type="button" aria-label="Search"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-search"/></svg></button>
  <button class="btn btn-outline btn-icon" type="button" aria-label="Search"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-search"/></svg></button>
  <button class="btn btn-outline btn-icon btn-lg" type="button" aria-label="Search"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-search"/></svg></button>
  <button class="btn btn-primary btn-icon" type="button" aria-label="Play"><svg class="icon icon-solid" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg></button>
  <button class="btn btn-ghost btn-icon" type="button" aria-label="Settings"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-settings"/></svg></button>
  <button class="btn btn-soft btn-icon btn-pill" type="button" aria-label="Bookmark"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-bookmark"/></svg></button>
  <button class="btn btn-danger-outline btn-icon" type="button" aria-label="Delete take"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-trash"/></svg></button>
</div>
:::

## Block

`btn-block` fills its container — a card footer, a form, a sheet. Two block
buttons stack; they never sit side by side.

:::demo
<div class="stack stack-sm w-sm">
  <button class="btn btn-primary btn-block" type="button">Publish episode</button>
  <button class="btn btn-outline btn-block" type="button">Save as draft</button>
  <button class="btn btn-quiet btn-block btn-sm" type="button">Discard</button>
</div>
:::

## States

:::demo Loading, disabled, live
<div class="cluster">
  <button class="btn btn-primary" type="button" aria-busy="true">Saving</button>
  <button class="btn btn-outline" type="button" aria-busy="true">Exporting</button>
  <button class="btn btn-soft" type="button" aria-busy="true">Uploading</button>
  <button class="btn btn-primary" type="button" disabled>Disabled</button>
  <button class="btn btn-outline" type="button" disabled>Disabled</button>
  <a class="btn btn-secondary" href="#i" aria-disabled="true">Disabled link</a>
  <button class="btn btn-live" type="button">Go live</button>
</div>
:::

The loading button keeps its width — the label goes transparent rather than being
replaced, so the layout cannot jump under the pointer mid-click. The spinner
takes the label colour, so it is readable on every emphasis.

`disabled` is the attribute, not a class. A link cannot be `disabled`, so a
link-as-button wears `aria-disabled="true"` instead — same look, and a screen
reader hears it.

## Link as button

An `<a>` with `.btn` is a button-shaped link. Use it when the action is
navigation — a download, a docs page — and keep `<button>` for anything that
changes state on this page. The markup says which is which; the CSS does not
care.

:::demo
<div class="cluster">
  <a class="btn btn-primary" href="#i">Read the docs</a>
  <a class="btn btn-outline" href="#i">Download<svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-download"/></svg></a>
  <a class="btn btn-ghost" href="#i">GitHub<svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-external-link"/></svg></a>
  <a class="btn btn-link" href="#i">Changelog</a>
</div>
:::

## Danger — three weights

A destructive action inside a menu or a card footer should not have to shout to
be recognised, only to be unmistakable. Danger is the one emphasis with its own
outline and soft weights for that reason; the solid one is for the confirm
step, and nothing else.

:::demo Solid confirms; outline and soft sit in context
<div class="cluster">
  <button class="btn btn-danger" type="button">Delete channel</button>
  <button class="btn btn-danger-outline" type="button">Remove take</button>
  <button class="btn btn-danger-soft" type="button">Unpublish</button>
  <button class="btn btn-danger-outline btn-sm" type="button">Revoke</button>
  <button class="btn btn-danger-soft btn-pill" type="button">Block viewer</button>
</div>
:::

## Groups

Three arrangements, one component.

:::demo Joined — buttons sharing an edge, the pressed one carries the soft accent
<div class="btn-group" role="group" aria-label="View">
  <button class="btn" type="button" aria-pressed="true">Day</button>
  <button class="btn" type="button" aria-pressed="false">Week</button>
  <button class="btn" type="button" aria-pressed="false">Month</button>
</div>
:::

:::demo Segmented — on a sunken track; the pressed one rises, no accent
<div class="cluster">
  <div class="btn-group btn-group-segmented" role="group" aria-label="Layout">
    <button class="btn" type="button" aria-pressed="true">Grid</button>
    <button class="btn" type="button" aria-pressed="false">List</button>
    <button class="btn" type="button" aria-pressed="false">Board</button>
  </div>
  <div class="btn-group btn-group-segmented" role="group" aria-label="Alignment">
    <button class="btn btn-icon" type="button" aria-pressed="true" aria-label="Align left"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-left"/></svg></button>
    <button class="btn btn-icon" type="button" aria-pressed="false" aria-label="Align centre"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-minus"/></svg></button>
    <button class="btn btn-icon" type="button" aria-pressed="false" aria-label="Align right"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg></button>
  </div>
</div>
:::

The segmented track deliberately has no accent: a view switcher must never
compete with the page's one primary. `aria-pressed` is the state — a `.active`
class could disagree with what a screen reader announces.

:::demo Toolbar — icon buttons and groups on one surface, hairline separators
<div class="btn-toolbar" role="toolbar" aria-label="Editor">
  <button class="btn btn-ghost btn-icon btn-sm" type="button" aria-label="Crop"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-crop"/></svg></button>
  <button class="btn btn-ghost btn-icon btn-sm" type="button" aria-label="Focus"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-focus"/></svg></button>
  <button class="btn btn-ghost btn-icon btn-sm" type="button" aria-label="Capture"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-capture"/></svg></button>
  <span class="btn-toolbar__sep"></span>
  <button class="btn btn-ghost btn-icon btn-sm" type="button" aria-pressed="true" aria-label="Mute"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-volume"/></svg></button>
  <button class="btn btn-ghost btn-icon btn-sm" type="button" aria-label="Microphone"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-mic"/></svg></button>
  <span class="btn-toolbar__sep"></span>
  <button class="btn btn-primary btn-sm" type="button"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-record"/></svg>Record</button>
</div>
:::

## Split button

One action plus its alternatives. The label acts; the narrow trigger opens a
[dropdown](/dropdown.html) of the other ways to act. Both halves wear the same
emphasis, and the divider is the label colour at low alpha, so it reads on any
fill.

:::demo Click the chevron
<div class="cluster">
  <div class="btn-split">
    <button class="btn btn-primary" type="button">Publish</button>
    <button class="btn btn-primary btn-icon" type="button" popovertarget="split-1" aria-label="More publish options"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-down"/></svg></button>
    <div class="menu" id="split-1" popover>
      <button class="menu__item" type="button"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-clock"/></svg>Schedule</button>
      <button class="menu__item" type="button"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-users"/></svg>Publish to members</button>
      <button class="menu__item" type="button"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-file"/></svg>Save as draft</button>
    </div>
  </div>
  <div class="btn-split">
    <button class="btn btn-outline" type="button">Export</button>
    <button class="btn btn-outline btn-icon" type="button" popovertarget="split-2" aria-label="Export formats"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-down"/></svg></button>
    <div class="menu" id="split-2" popover>
      <button class="menu__item" type="button">MP4 · 1080p</button>
      <button class="menu__item" type="button">MP4 · 4K</button>
      <button class="menu__item" type="button">Audio only</button>
    </div>
  </div>
</div>
:::

## With the frame

A button can take the corner brackets. `.frame-sm` sizes them down so they bracket
the label instead of swallowing it. Tab to it — the keyboard gets the same
affordance as the mouse.

:::demo
<div class="cluster">
  <button class="btn btn-primary frame frame-sm frame-hover" type="button">Record</button>
  <button class="btn btn-outline frame frame-sm frame-hover frame-ink" type="button">Preview</button>
</div>
:::

`.btn-live` spends `::before` on its record dot and the loading state spends
`::after` on the spinner, so neither can also take `.frame`. Use real corner
spans, or pick one.

## More sizes, and the inverse

:::demo
<div class="cluster">
  <button class="btn btn-primary btn-xs" type="button">Extra small</button>
  <button class="btn btn-primary btn-xl" type="button">Extra large</button>
  <button class="btn btn-inverse" type="button">Inverse</button>
</div>
:::

## Glow, arrow, play

`btn-glow` is the single lit call to action a hero is allowed — two glowing
buttons cancel each other. `btn-arrow` sends the trailing icon toward where
the link goes. `btn-play` is the record light's sibling: a pill with a solid
disc holding the triangle.

:::demo
<div class="cluster">
  <a class="btn btn-primary btn-lg btn-glow" href="#i">Start the course</a>
  <a class="btn btn-outline btn-arrow" href="#i">Read the post <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg></a>
  <a class="btn btn-secondary btn-lg btn-play" href="#i"><span class="btn__disc"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg></span>Watch the trailer</a>
</div>
:::

## Count and shortcut

Small data inside the button, in the data voice.

:::demo
<div class="cluster">
  <button class="btn btn-outline" type="button"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-heart"/></svg> Like <span class="btn__count">1,204</span></button>
  <button class="btn btn-quiet" type="button">Comments <span class="btn__count">14</span></button>
  <button class="btn btn-secondary" type="button">Search <span class="btn__kbd">/</span></button>
  <button class="btn btn-primary" type="button">Save <span class="btn__kbd">⌘S</span></button>
</div>
:::

## Social, underline, floating

`btn-social` holds a platform's icon in monochrome — the platform's colour is
not this page's accent; the icon takes the accent on hover. `btn-underline`
is a text button that draws its own rule. `btn-fab` pins to the corner of the
viewport (shown static here).

:::demo
<div class="cluster">
  <a class="btn btn-social" href="#i"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-video"/></svg> YouTube</a>
  <a class="btn btn-social" href="#i"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-code"/></svg> GitHub</a>
  <a class="btn btn-social btn-icon" href="#i" aria-label="Mail"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-mail"/></svg></a>
  <button class="btn btn-underline" type="button">See all episodes</button>
  <button class="btn btn-primary btn-icon btn-fab" type="button" aria-label="Subscribe" style="position: static"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-bell"/></svg></button>
</div>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--btn-h` | Control height — `1.5` / `1.75` / `2.125` / `2.5` / `2.875rem` across the five sizes; `btn-icon` reads it for width too |
| `--btn-pad` | Inline padding |
| `--btn-gap` | Space between icon and label |
| `--btn-radius` | Corner radius |
| `--btn-bg` | Fill |
| `--btn-fg` | Label colour — the spinner and the split divider derive from it |
| `--btn-line` | Border colour |

Retheme one instance without touching the system:

```css
.btn-checkout { --btn-h: 2.5rem; --btn-radius: var(--radius-full); }
```

## Accessibility

- 44px minimum target on coarse pointers.
- An icon-only button needs `aria-label`; there is no accessible name otherwise.
- Loading uses `aria-busy`, disabled uses `disabled` — both are attributes a
  screen reader already understands. A link-as-button uses `aria-disabled`.
- Toggles in a group carry `aria-pressed`; the group carries `role="group"`
  and a label, a toolbar `role="toolbar"`.
- The split button's trigger has its own `aria-label` and opens a popover, so
  Escape and focus return come from the platform.
- Focus is visible in both themes.

## What a button does when you touch it

The base answer is `scale: 0.98` on `:active`, and it is the right default
because it is the cheapest honest one — the button moves under the finger and
nothing else on the page reflows.

Everything below is an **alternative** to that answer, never an addition to it.
A button that presses *and* fills *and* shines is a button that has not decided
what it is. Pick one.

:::demo Hover each. They are five different sentences, not five decorations.
<div class="cluster cluster-lg">
  <button class="btn btn-outline btn-lg btn-fill" type="button">Fill</button>
  <button class="btn btn-secondary btn-lg btn-swap" type="button"><span class="btn__swap"><span>Copy link</span><span>Copied</span></span></button>
  <a class="btn btn-outline btn-lg btn-slide" href="#i">Read the post <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg></a>
  <button class="btn btn-secondary btn-lg btn-lift" type="button">Lift</button>
  <button class="btn btn-primary btn-lg btn-ring" type="button">Ring — press it</button>
</div>
:::

| Class | The answer |
| --- | --- |
| `.btn-fill` | the ground floods in from the start edge |
| `.btn-swap` | the label slides up and its second self takes its place |
| `.btn-slide` | the icon leaves on one side; the label stays put |
| `.btn-lift` | the button steps toward you instead of away |
| `.btn-ring` | one ripple leaves the edge **on press** |

All of them except the ring are inside `(hover: hover)`, because a touch device
has no way to leave a hover state and a stuck hover is worse than none. The
ring is deliberately outside it: a press is the one interaction a touch device
*does* have, and it is the only feedback that survives a finger covering the
button.

`.btn-swap` needs two spans in a `.btn__swap`, and the button keeps its width
because both are in the flow with one clipped:

```html
<button class="btn btn-swap"><span class="btn__swap">
  <span>Copy link</span><span>Copied</span>
</span></button>
```

## The button that is the footage

A play control with the clip running inside it: poster at rest, video on
hover, the label over both on a scrim. It is the strongest thing in this file,
so a page gets **one**.

:::demo Hover it
<div class="cluster">
  <a class="btn btn-lg btn-video" href="#i">
    <video class="btn__video" src="/assets/media/loop.mp4" poster="/assets/media/loop.jpg" muted loop playsinline autoplay></video>
    <svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg>
    <span class="btn__label">Watch the latest</span>
  </a>
  <a class="btn btn-xl btn-video" href="#i">
    <video class="btn__video" src="/assets/media/loop.mp4" poster="/assets/media/loop.jpg" muted loop playsinline autoplay></video>
    <span class="btn__label">Episode 48 · 24:07</span>
  </a>
</div>
:::

The poster is the resting state, so the button is complete before the video
loads and **correct if it never does**. The clip needs `muted loop playsinline`
in the markup; `autoplay` costs nothing here because it is muted and eight
seconds long, and a scrim sits under the label so the words are not on whatever
frame happens to be playing — legibility is not a lottery.

## The reaction

Press subscribe and a handful of marks fly out of the button. This is the one
place in the system where delight is the entire argument, so the rules that
keep it honest matter more than usual:

- the marks are `aria-hidden` — they are confetti, not content;
- they are `pointer-events: none`, so they never eat the next click;
- they run on `[aria-pressed='true']`, so the burst fires when the state
  actually **changes**, not on every stray press;
- and they are gone under reduced motion, where the state change is still
  perfectly legible from the button itself.

:::demo Press them. Press again to release.
<div class="cluster cluster-lg">
  <button class="btn btn-primary btn-lg btn-burst btn-toggle" type="button" aria-pressed="false" data-toggle>
    Subscribe
    <span class="btn__pop" aria-hidden="true">
      <span style="--a: 70deg"><svg class="icon"><use href="/icons/sprite.svg#i-bell"/></svg></span>
      <span style="--a: 110deg"><svg class="icon"><use href="/icons/sprite.svg#i-heart"/></svg></span>
      <span style="--a: 45deg"><svg class="icon"><use href="/icons/sprite.svg#i-star"/></svg></span>
      <span style="--a: 135deg; --d: 2.6rem"><svg class="icon"><use href="/icons/sprite.svg#i-message"/></svg></span>
      <span style="--a: 90deg; --d: 4rem"><svg class="icon"><use href="/icons/sprite.svg#i-share"/></svg></span>
    </span>
  </button>

  <button class="btn btn-outline btn-lg btn-burst btn-toggle" type="button" aria-pressed="false" data-toggle>
    <svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-thumbs-up"/></svg> Like
    <span class="btn__count">1.4k</span>
    <span class="btn__pop" aria-hidden="true">
      <span style="--a: 60deg"><svg class="icon"><use href="/icons/sprite.svg#i-heart"/></svg></span>
      <span style="--a: 120deg"><svg class="icon"><use href="/icons/sprite.svg#i-thumbs-up"/></svg></span>
      <span style="--a: 90deg; --d: 4rem"><svg class="icon"><use href="/icons/sprite.svg#i-sparkle"/></svg></span>
    </span>
  </button>

  <button class="btn btn-ghost btn-lg btn-toggle" type="button" aria-pressed="false" data-toggle>
    <svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-bookmark"/></svg> Save
  </button>
</div>
:::

Each mark reads `--a` (its angle) and optionally `--d` (its distance) from the
markup, so the spray is **authored** rather than random. Five marks at five
chosen angles look designed; five at random angles look broken about a third of
the time.

```html
<button class="btn btn-primary btn-burst btn-toggle" aria-pressed="false">
  Subscribe
  <span class="btn__pop" aria-hidden="true">
    <span style="--a: 70deg"><svg class="icon">…</svg></span>
    <span style="--a: 110deg">…</span>
  </span>
</button>
```

`.btn-toggle` is the pressed dress, and it is the one place a filled pill is
allowed: the house rule bans a fill for **navigation** state, and a toggle is
not navigation — it is a control whose entire job is to be on or off.
`.btn__count` is the number beside the verb, in the data voice, and it takes
the accent when the button is pressed.

The `aria-pressed` attribute is the whole contract. The docs flip it with four
lines of JavaScript; your app's own state code replaces those without the CSS
knowing anything happened.
