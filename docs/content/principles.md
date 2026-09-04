---
title: Principles
group: Start
order: 30
lead: The house rules. They are public because they are the reason to choose this over Bootstrap.
---

A design system is not a collection of assets. It is a collection of decisions. These
are the decisions, and the reason each one exists.

## 1 · One accent, rationed

The system is almost monochrome so that a single colour can mean something. Adding a
second hue amends the argument; it is not a tweak.

:::demo
<div class="cluster">
  <span class="badge badge-live">Live</span>
  <span class="badge">Draft</span>
  <span class="badge badge-accent">Accent</span>
  <span class="badge badge-success">Shipped</span>
</div>
:::

## 2 · Active state is a dot or a 2px rule, never a filled pill

A filled pill is loud, and it competes with the accent for the one job the accent has.
Look at this page's sidebar and the tabs on every example — both use a rule.

## 3 · State lives in ARIA

Style `[aria-current]`, `[aria-expanded]`, `[aria-selected]`, `[data-*]`. An `.active`
class can disagree with the accessibility tree; an attribute cannot, because it is the
same fact the screen reader is reading.

## 4 · The platform first

`<details>`, `<dialog>`, the Popover API, native inputs. Keyboard handling, focus
trapping and Escape should come free rather than be rebuilt badly in JavaScript.

## 5 · Motion is honest

Under 200ms for feedback, one property at a time, everything off under reduced motion.
The finished state is the resting state — nothing may be unreachable if an animation
never runs.

Components never write their own `prefers-reduced-motion` query. The duration tokens
collapse to `1ms` globally, so every component inherits the behaviour for free.

## 6 · Two tiers of token, never three

Primitives are referenced by semantics. Components read semantics only. That is why one
override rebrands everything, and why no component ever needs to know which theme it is
in.

## 7 · Frames say what a thing is before you read it

A window says app. A terminal says command. A viewfinder says footage. Use them to
mean, not to decorate — which is also why corner brackets do not belong on a blog card,
where nothing was ever recorded.

:::demo
<div class="win w-md">
  <div class="win__bar"><span class="win__dots"><span></span><span></span><span></span></span></div>
  <div class="win-term__body"><span class="win-term__prompt">npm install @imswarnil/swarnil-design</span><span class="win-term__cursor"></span></div>
</div>
:::

## 8 · Dark is not an inversion

Surfaces lift with light rather than darkening. Hairlines go translucent so they survive
over media. Shadow becomes elevation. Toggle the theme in the bar and watch what happens
to the borders, not the background.

## 9 · The mono voice is metadata only

Timecodes, counts, dimensions, versions, code. The moment mono carries a sentence it
stops meaning "this is data".

This one is enforced, not merely stated: `scripts/audit-mono.py` fails CI on a mono
declaration outside an explicit allowlist of 61 selectors, each an assertion that what
renders there is data. A rule without a test is a wish.

## 10 · Nothing generated is committed

If CI can build it, git should not hold it. Generated files make every diff noise, go
stale silently, and produce merge conflicts in files nobody wrote.

## 11 · A component that cannot fill the docs template is not finished

Anatomy, every variant, properties, states, responsive behaviour, accessibility notes,
a do/don't pair, both themes, and 320px. If it cannot fill that, it is not done.

## 12 · Copy is design

Errors say what happened, then what to do. Empty states are an invitation with a verb.
Buttons name the thing that happens. No "please", no "successfully".
