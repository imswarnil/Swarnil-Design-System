# approach.md — the spec

**What this system IS.** `AGENTS.md` is how to work in the repo; `PROJECT.md` is
what state it is in. This file is the argument, and it changes only when the
argument does.

It used to be 1,090 lines, most of them describing a dependency-free CSS system
with its own nine-layer cascade, its own grid and its own utility layer. That
system is gone: Tailwind supplies the floor now, daisyUI supplies the parts, and
what is left here is the part that was always the point — the tokens, the
voices, and the rules about what a component may read.

---

## 1 · The one-sentence version

A token-first design system on **Tailwind CSS 4** and **daisyUI**, almost
monochrome so that one colour can mean something, with a broadcast layer for
the things a creator ships that a website does not — thumbnails, stream scenes,
lower thirds, end screens.

## 2 · Three tiers, and the order is the argument

| | supplies | example |
| --- | --- | --- |
| **Tailwind** | the reset, the theme variables, every utility | `flex`, `md:grid-cols-3`, `bg-surface` |
| **daisyUI** | the thirty-one components this repo never built | `drawer`, `range`, `rating`, `modal`, `toggle` |
| **this repo** | the design, and the components a creator needs | `.frame`, `.shelf`, `.codeplayer`, `.thumb` |

Each tier wins over the one before it, with one deliberate exception: a Tailwind
*utility* beats everything, including this repo's components. A utility that
loses to a component is not a utility.

### Why the layer list is not flat

Tailwind declares `theme, base, components, utilities` and we do not get to
change it. daisyUI does not use `components` — it nests its own inside
`utilities`, because per the cascade spec a rule written **directly** in a layer
beats every sub-layer nested within it. That one detail is what makes
`class="btn bg-red-500"` behave.

So this system goes where daisyUI went, one step later:

```css
@layer utilities {
  @layer sds {
    @layer elements, components, patterns, sections, theme;
  }
}
```

```
.btn              → ours
.btn.bg-red-500   → the utility
.drawer           → daisyUI's
```

Our reset and tokens sit in `base`, unlayered, so they land after Tailwind's
preflight and before everything else.

**The cascade does not settle every collision.** Layer order decides `.hero` vs
`.hero`. It decides nothing about `.hero > *` — daisyUI stacking every child of
a hero into one grid cell — because we have no competing rule. So the thirty
components both systems name are excluded from daisyUI's output entirely, in
`src/index.css`. Build one of them here and it joins that list the same day.

### Overriding, from outside

Every rule in the package is inside a layer. Your own stylesheet declares none,
and unlayered CSS beats every layer — so a consumer override wins with no
`!important` on either side, from either direction.

## 3 · Tokens — two tiers, never three

**Tier 1 is a palette. Tier 2 is the argument.** A component may read tier 2 and
nothing else. A component that reads `--ink-700` has hard-coded an appearance
and will be wrong the moment the theme changes; a component that reads
`--fg-muted` has asked for a job, and the theme answers it.

```
--ink-700          tier 1 · a position on a ladder. No component may name one.
--fg-muted         tier 2 · a job. The only names a component may read.
--color-fg-muted   the same token, as Tailwind's theme → `text-fg-muted`
```

That third line is the whole of `src/0-config/theme.css`. Every token is also a
utility, with every variant, because generating those is a compiler's job.

Two kinds of entry live there, and the difference matters. Where our name and
Tailwind's namespace **differ**, the file only aliases and the foundation file
still owns the value. Where our name **is** the namespace — `--radius-*`,
`--text-*`, `--font-*`, `--leading-*`, `--tracking-*`, `--ease-*`, `--shadow-*` —
an alias would point at itself, so `theme.css` is the declaration site and the
foundation file carries a pointer. One name, one home.

Three things are deliberately not taken over: Tailwind's numeric spacing scale
(ours goes fluid above `--space-6`, and one ladder with two rules is worse than
either), Tailwind's colour palette (`bg-red-500` should work), and the
breakpoints, which must be **literal** — `var()` is not legal in a media query,
and `@media (width >= var(--bp-md))` compiles silently and does nothing.

## 4 · Dark mode is not an inversion

Every tier-2 token is declared once, with both themes on the same line:

```css
--bg-surface: light-dark(var(--ink-0), var(--ink-950));
--line-default: light-dark(var(--ink-200), oklch(100% 0 0 / 0.12));
```

Surfaces **lift with light** in dark mode rather than descending from paper.
Hairlines go **translucent** rather than becoming a grey step, so they survive
over an image. Shadow becomes elevation. No component contains a `data-theme`
block or a `prefers-color-scheme` query — if one does, it is a bug.

daisyUI follows the same switch without knowing it exists, because its colour
slots are pointed at these tokens and its own themes are turned off.

## 5 · The layers, and what each holds

| Layer | Holds |
| --- | --- |
| `0-config` | the `@layer` contract, the `@theme` token bridge, the prebuilt safelist, the typed properties |
| `0-daisy` | daisyUI's own knobs — radii, border width, depth — from our tokens |
| `1-foundation` | reset, colour, typography, space, elevation, motion, layout, pattern, a11y, shape, frame, icon, background |
| `2-elements` | badge, table, code and the syntax palette, indicator, text, effects, interactions, veils, link cards |
| `3-components` | button, card, field, nav, alert, navbar, menu, overlay, disclosure, media, code player, shelf, filter, masthead, ad, toc, timestamps |
| `4-patterns` | deck, prose, timeline, curriculum, thread, log, share, chat, kit, results |
| `5-sections` | hero, stats, pricing, cta, footer |
| `6-utilities` | the few Tailwind lacks, as `@utility` — the surface pairs, the hairline, the measures |
| `7-broadcast` | canvas, scene, lower third, stream widgets, thumbnail. Its own bundle |
| `8-framework` | the page column and the twelve-column row, as `@utility`. The grid itself is Tailwind's |

### The creator layer

Everything in `7-broadcast` is sized in **`cqi`, never px**. Every stage is a
container, so a title at `8cqi` is 102px on a 1280 thumbnail and 26px in a docs
column — one design, rendered at export size and at reading size, with no second
set of numbers. This is the part of the system a website never pays for, and the
reason it is a separate bundle.

### Composition has slots

A `bg-*` paints on the element, a `pattern-*` on `::before`, `.frame` on both
pseudos, a `.veil` is a child. Keeping new decoration in one of those slots is
what lets a single band carry all four without a fight.

---

## 6 · Definition of done

A component is finished when all of these are true:

- [ ] Lives in the right layer and references nothing above it
- [ ] Declares its `--component-*` variables before any other rule
- [ ] Uses tier-2 tokens only — no ramp steps, no raw values, no hex
- [ ] Contains no `data-theme` and no `prefers-color-scheme`
- [ ] Works at 320px without overflow
- [ ] Uses container queries, not media queries, for its own layout
- [ ] Interactive parts are ≥ 44px
- [ ] Focus is visible in both themes and on media backdrops
- [ ] State is expressed in ARIA or `data-*`, never an `.is-` class
- [ ] Degrades correctly with JavaScript disabled
- [ ] Respects `prefers-reduced-motion` through `--dur-*`, with no local query
- [ ] Passes the contrast audit in both themes
- [ ] Header comment explains the argument, and lists pseudo-element conflicts
- [ ] Docs page has anatomy, all variants, properties, states, responsive, a11y,
      do/don't, and both themes
- [ ] `npm run lint && npm run audit && npm run test` clean

---

## 7 · Principles — the personality, stated once

These are the house rules. They go public, because they are the reason someone would
choose this system over Bootstrap.

1. **One accent, rationed.** The system is almost monochrome so that a single colour
   can mean something. Adding a second hue amends the argument, it is not a tweak.
2. **Active state is a dot or a 2px rule. Never a filled pill.**
3. **State lives in ARIA.** Style `[aria-current]`, `[aria-expanded]`, `[data-*]`.
   An `.active` class can disagree with the accessibility tree; an attribute cannot.
4. **The platform first.** `<details>`, `<dialog>`, Popover, native inputs. Keyboard
   and Escape should come free rather than be rebuilt badly.
5. **Motion is honest.** Under 200ms for feedback, one property at a time, everything
   off under reduced motion. The finished state is the resting state — nothing may be
   unreachable if an animation never runs.
6. **Two tiers of token, never three.** Primitives are referenced by semantics.
   Components read semantics. That is why one override rebrands everything.
7. **Frames say what a thing is before you read it.** A window says app, a terminal
   says command, a viewfinder says footage. Use them to mean, not to decorate.
8. **Dark is not an inversion.** Surfaces lift with light. Hairlines go translucent.
   Shadow becomes elevation.
9. **The mono voice is metadata only.** Timecodes, labels, dimensions, code. The
   moment mono carries a sentence, it stops meaning "this is data".
10. **Nothing generated is committed.** If CI can build it, git should not hold it.
11. **A component that cannot fill the docs template is not finished.**
12. **Copy is design.** Errors say what happened then what to do. Empty states are an
    invitation. Buttons name the thing that happens. No "please", no "successfully",
    no exclamation marks.
