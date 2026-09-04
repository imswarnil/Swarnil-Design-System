# 3 · The frame layer, and what moving one file taught about the cascade

*Written at the end of Phase 3.*

---

## The complaint

> "maybe i want that hover card to have camcorder borders style animation"

I hovered the homepage cards to check. Nothing happened — no lift, no border change, no
brackets. Six rounded rectangles that did not respond to the pointer at all.

The surprising part came next. `.frame-hover` — corner brackets that ease in from the
outside on hover — **already existed**, fully built, with focus support, reduced-motion
handling and a touch fallback. It had been written and then never connected to anything.

That is worth naming, because it is common: **the gap between a design system and a
designed site is usually wiring, not components.** The `audit-classes.py` output says the
same thing louder — 121 entirely-unused class families. Before writing a new component in
this system, the first move is to check whether it is already there and simply unused.

So Phase 3 was not "build the brackets". It was: put them in the right file, give the
`.card` a documented variant, and actually connect them.

---

## What the brackets are for

The frame layer is the system's signature, and it earns its place by *meaning* something
rather than decorating:

> A window chrome says **this is an app**. A terminal says **this is a command**. A
> viewfinder says **this is footage**.

The reader knows what they are looking at before reading a word. That is the argument.
`PRINCIPLES.md` #7 states it as a constraint: *use them to mean, not to decorate.* Which
is why the same file warns that corner brackets do not belong on a blog OG card — nothing
was ever recorded.

`.frame-hover` extends the idea to interaction: the brackets are absent, then close in on
the thing you point at. **The camera finding focus.** Feedback that is specific to this
system rather than the generic lift-and-shadow every card on the internet does.

### How it is built, and why those choices

```css
.frame-hover::before  { translate: var(--frame-travel) var(--frame-travel); opacity: 0; }
.frame-hover:hover::before,
.frame-hover:focus-visible::before,
.frame-hover:focus-within::before { opacity: 1; translate: 0 0; }
```

Four details in there are decisions, not incidentals:

**`translate`, not `transform`.** They do the same thing, but `transform` is one property
holding a list — so animating it overwrites any rotate or scale the element already has.
`translate` is its own property, so a card that is also tilted or lifted keeps both. Modern
CSS split `translate`/`rotate`/`scale` out of `transform` for exactly this reason, and
using them means components compose instead of fighting.

**`:focus-visible` and `:focus-within`, both.** `:focus-visible` covers the element itself
being tabbed to — a button. `:focus-within` covers a *card* whose real tab stop is the
link inside it. Without the second, keyboard users get nothing on precisely the component
this was built for. Keyboard parity is not a nice-to-have here: the brackets are the
*only* hover feedback, so without it the interaction simply does not exist for anyone not
using a mouse.

**A `@media (hover: none)` fallback.** Touch devices have no hover. Brackets that only
appear on `:hover` would be invisible on a phone, and worse, would stick on after a tap
because touch leaves a lingering hover state. So on touch they are shown outright.

**Reduced motion keeps the reveal, drops the travel.** Not `animation: none`. The user
still needs to know the thing responded; they asked not to be moved. The durations already
collapse to `1ms` globally, so components inherit that for free — no component writes its
own `prefers-reduced-motion` query, which is the contract in `05-motion.css`.

---

## The real lesson: moving one file changed what the page looked like

`.frame`, `.frame-4` and `.frame-hover` lived in `06-layout.css`. That is the wrong home —
a layout file answers *where does this sit*; corner brackets answer *what is this*, which
is the frame file's whole job. So they moved to `12-frame.css`.

A pure file move. No rule edited. And it changed the rendering of two pages.

Here is why, and it is the most useful CSS thing in this phase.

Both `.frame` and `.pattern` paint on the **`::before` pseudo-element**. An element has
exactly one. When two classes both want it, they do not merge cleanly — they overwrite
each other property by property, and **the winner is decided by specificity, then by
source order**.

Both selectors are one class deep. Identical specificity. So source order decides:

```
Before:  06-layout.css  →  07-pattern.css      pattern loads later → pattern wins
After:   07-pattern.css →  12-frame.css        frame  loads later → frame wins
```

Two demo pages had `class="frame frame-4 pattern pattern-hatch"` on a single element.
Before the move the texture won and the brackets vanished; after it, the brackets won and
the texture vanished. **The markup did not change. The stylesheet rules did not change.
Only the order they were read in.**

That is the fragility cascade layers exist to remove, and it is exactly the thing that
made the user's original complaint — *"theming with CSS variables is very hard"* — true.
When precedence is an accident of import order, every refactor is a rendering risk, and
nobody can tell you what will win without tracing the whole import graph.

Three things came out of it:

1. **The demos were fixed properly** — the pattern moved to a child element, which is what
   the file's own header comment had told people to do all along. The demos now show the
   rule being followed instead of quietly violating it.
2. **The composition warning was corrected.** It said the pattern wins. That was true when
   the frame lived in `06`, and false the moment it moved. A stale comment about cascade
   order is worse than no comment, because it is confidently wrong.
3. **It is a concrete argument for Phase 1.** Once every file sits inside its declared
   `@layer`, moving a file between numbers stops being able to do this, because the layer
   — not the import position — decides. The `@layer` line shipped in Phase 0 was a
   promise; this is the bug it prevents.

**Generalisable rule: if two selectors have equal specificity, their relative order is
part of your API, whether you documented it or not.**

---

## Wiring it up

Two pieces, because there were two different things called "card".

**The system gets a variant.** `.card-hover-frame` — four declarations, no duplicated
geometry:

```css
.card-hover-frame { --frame-size: 16px; --frame-inset: 8px; --frame-color: var(--accent); }
@media (hover: hover) and (pointer: fine) {
  .card-hover-frame:hover { transform: none; box-shadow: none; }
}
```

It turns the lift **off**. That is the actual design decision in the variant: the brackets
*are* the feedback, and a card that both lifts and brackets is a card that cannot decide
what it is. One hover answer per question.

The brackets themselves come from the foundation by composition —
`class="card card-hover-frame frame frame-4 frame-hover"` — which is the existing house
idiom (the button demos already do `btn frame frame-sm frame-hover`). Following it kept
the variant at four declarations instead of duplicating forty, and meant I did not invent
a second way to do a thing the system already had a way to do.

Accent, not the craft amber, because a card is an interactive target and the accent is the
colour this system reserves for *this responds to you*.

**The homepage cards get connected.** Those turned out not to be `.card` at all — they are
`.lp-feat`, a docs-only landing-page tile defined in `preview.css`. Worth checking rather
than assuming: I nearly "fixed the card" and left the page the user was complaining about
untouched.

---

## Verifying it, and getting fooled once

Hover was easy to confirm — screenshot resting, screenshot hovered, four accent brackets
close in.

Keyboard was not, and the way it went wrong is instructive.

I read the computed style with JavaScript after focusing the button, and got
`:focus-visible = true` alongside `opacity: 0` — apparently a real bug: keyboard focus
matching but the brackets staying hidden. I went looking for a specificity conflict, then
a broken selector list, then a stale cached stylesheet. All dead ends, because there was
no bug.

Two things were wrong with the test:

1. `element.focus()` from a script does **not** set `:focus-visible`. That pseudo-class
   deliberately only matches when the browser judges focus to be keyboard-driven — that is
   its entire purpose, and it is why you can use it to show focus rings for keyboard users
   without showing them on every mouse click.
2. Running the measurement through the devtools bridge moved focus off the element. So the
   later reads were measuring an unfocused button.

The fix was to stop measuring and **look**: focus the preceding element, send a real `Tab`
keypress, screenshot. The brackets were there, next to the focus ring, exactly as written.

**When a tool and your eyes disagree about what is on screen, check the tool first.** I
burned four rounds theorising about a cascade bug that did not exist, because I trusted a
number over a picture. Measurement instruments have their own failure modes, and an
instrument that perturbs the thing it measures — focus, in this case — will lie to you
consistently enough to be convincing.

---

## Where Phase 3 landed

| | |
| --- | --- |
| Frame primitives | moved `06-layout.css` → `12-frame.css`, 157 lines |
| Cascade regression | found and fixed in 2 demos, warning comment corrected |
| New | `.card-hover-frame`, documented and demoed on the card page |
| Homepage cards | brackets on hover, verified resting + hovered |
| Keyboard | verified with a real `Tab`, not a scripted focus |
| Reduced motion | reveal kept, travel dropped, durations already collapse to 1ms |
| Touch | brackets shown outright, no stuck hover |
| Bundle | 40.1 KB gzipped (budget 55) |

---

**Next:** the docs themselves get rebuilt — the 6,583 lines of HTML inside Python string
literals go, and pages get a real preview↔code toggle.
