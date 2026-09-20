---
title: House style
group: Start
order: 25
lead: Eight rules the whole system is being re-cut against — what a surface looks like, where the accent is allowed, and what hover may change.
---

The system had tokens and components before it had a **look**. Tokens say what
values exist; they do not say whether a card has a border or a fill, and two
systems with identical tokens can look nothing alike.

These eight rules are that missing layer. Every component is being re-cut
against them, one at a time — see the progress table at the bottom.

## 1 · Fills, not outlines

A surface is distinguished by its **background stepping**, not by a line drawn
around it. `--bg-canvas` → `--bg-sunken` → `--bg-muted` is three legible depths
before a border is needed at all.

A hairline is for a **real edge** — where two regions meet and one has to end,
like a sidebar against content, or a table row against the next. It is not for
outlining a box that already has a fill.

| | Before | After |
| --- | --- | --- |
| Card | `--bg-surface` + hairline | `--bg-sunken`, no border |
| Panel | hairline | fill |
| Table row | hairline all round | one rule between rows |
| Sidebar edge | — | hairline (a real edge) |

## 2 · One radius family, named for the job

| Token | Value | On |
| --- | --- | --- |
| `--radius-badge` | 6px | the smallest fill — chips, counts, code |
| `--radius-control` | 10px | buttons, inputs, nav rows |
| `--radius-card` | 14px | cards, panels, alerts |
| `--radius-media` | 16px | images, video wells |
| `--radius-sheet` | 24px | dialogs, drawers |

A control inside a card is **tighter** than the card. Equal radii make the
control look stuck to the wall behind it.

## 3 · Type stays flat

11px to 28px covers everything the UI does. A heading reads as a heading by
**weight and tracking**, not by size — which is why `2xl / 3xl / 4xl` are 22 /
25 / 28 and not a fluid climb to 52.

`5xl` and `6xl` are display sizes. A landing hero may use one. Nothing else.

## 4 · Space is generous between, tight within

| Where | Step |
| --- | --- |
| Between page sections | `--gap-section` (fluid 60 → 80) |
| Between blocks in a section | `--space-8` |
| Inside a component | `--space-3` … `--space-5` |
| Icon to its label | `--gap-snug` |
| Inside a chip | `--gap-tight` |

Most systems get this backwards — generous padding inside components and
cramped gaps between them, which makes a page read as one undifferentiated
mass.

## 5 · The accent is rationed to one spend per view

One filled accent element on screen at a time: **the primary button**, or the
active dot, or a live indicator. Not all three.

Everything else that needs to stand out uses the **surface stepping up**, not
colour. A selected chip is `--bg-muted`, not accent-filled.

This is the rule the whole "almost monochrome" argument rests on, and it is the
easiest one to lose — see [Colour](/color.html).

## 6 · The active state is a dot

Not a fill, not a pill, not an underline. A `--dot-sm` circle in the accent,
hanging in the gutter so the label column stays aligned.

The sidebar, the navbar, the tabs, the contents list and the demo tabs all use
it. One mark means one thing everywhere.

## 7 · Hover changes colour, and nothing else

**No lift. No shadow. No scale.** A card that rises under the cursor is
animating its own importance, and on a grid of twelve it turns a page into a
field of twitching rectangles.

Hover may change: `color`, `background-color`, `border-color`, and the
`text-decoration` of a link. That is the whole list.

Focus is the exception — a focus ring is an accessibility affordance, not
decoration, and it stays.

## 8 · Metadata is one line

Author, date, tag, reading time: **one row, 14px, bullet-separated**. Not a
stack of labelled fields.

:::demo The meta line
<div class="card w-sm">
  <div class="card__media pattern pattern-dot"></div>
  <div class="card__body">
    <h3 class="card__title"><a class="card__link" href="#i">Decide once</a></h3>
    <p class="card__excerpt">Why a token-first system survives a rebrand.</p>
    <p class="card__meta">Swarnil Singhai <span aria-hidden="true">·</span> 14 Sep 2026 <span aria-hidden="true">·</span> 9 min</p>
  </div>
</div>
:::

## Progress

The system is being re-cut against these rules component by component. This
table is the record — it is edited by hand as each one lands, and a component
not on it has not been looked at yet.

| Component | State |
| --- | --- |
| Navbar + dropdown | Done |
| Navigation (navlist) | Done |
| Shell | Done |
| Card | Done |
| Everything else | Pending |
