---
title: Introduction
group: Start
order: 10
lead: I kept rebuilding the same buttons. So I stopped, wrote the decisions down once, and this is what came out.
---

Hi — I'm Swarnil. I build things on the internet and I make videos about it, and
for a long time both halves of that had the same problem.

Every project started the same way. New repo, new stylesheet, and then forty
minutes of me deciding whether this heading is 28px or 32px, whether the border
is `#e5e5e5` or `#eaeaea`, whether the button radius is 6 or 8. I'd get it right,
ship it, and then three months later start the next thing and decide all of it
again — differently. My site, my theme, my course pages and my thumbnails all
looked like they came from four people who had never met.

The annoying part wasn't the inconsistency. It was that **none of those were
interesting decisions.** I was spending my good hours on 6px versus 8px instead
of on the thing I actually wanted to make.

So I made this. One set of decisions, written down, that everything I build
reads from. Change three variables and every surface I own rebrands at once.

:::demo The system, in one card
<article class="card card-hover-frame frame frame-hover w-md">
  <span class="frame__tr"></span><span class="frame__bl"></span>
  <div class="card__body">
    <p class="card__meta">Hover it, or tab to it</p>
    <h3 class="card__title">The viewfinder finds it</h3>
    <p class="card__excerpt">Corner brackets close in instead of the card lifting. One hover answer, not two.</p>
  </div>
</article>
:::

## What I was actually after

<div class="grid-3 mt-6">
  <article class="card card-hover-frame frame frame-hover">
    <span class="frame__tr"></span><span class="frame__bl"></span>
    <div class="card__body">
      <p class="card__kicker">Mission</p>
      <h3 class="card__title">Decide once</h3>
      <p class="card__excerpt">Make the boring call a single time, put it in a token, and never negotiate it again. The system exists so I can spend my attention on the work instead of on the wrapper.</p>
    </div>
  </article>

  <article class="card card-hover-frame frame frame-hover">
    <span class="frame__tr"></span><span class="frame__bl"></span>
    <div class="card__body">
      <p class="card__kicker">Ideology</p>
      <h3 class="card__title">Consistency is the feature</h3>
      <p class="card__excerpt">Everything I publish should feel like it came from one person, because it did. Not a template I skinned — a set of decisions that are recognisably mine and carry across every surface.</p>
    </div>
  </article>

  <article class="card card-hover-frame frame frame-hover">
    <span class="frame__tr"></span><span class="frame__bl"></span>
    <div class="card__body">
      <p class="card__kicker">Who it's for</p>
      <h3 class="card__title">People who make things</h3>
      <p class="card__excerpt">Built around what a creator actually ships: posts, courses, thumbnails, end screens, a shop, a changelog. Not around a SaaS dashboard that nobody reading this is building.</p>
    </div>
  </article>

  <article class="card card-hover-frame frame frame-hover">
    <span class="frame__tr"></span><span class="frame__bl"></span>
    <div class="card__body">
      <p class="card__kicker">Constraint</p>
      <h3 class="card__title">Nothing to install</h3>
      <p class="card__excerpt">One <code class="code">&lt;link&gt;</code> to the prebuilt bundle and there is nothing to install — Tailwind and daisyUI are already compiled into it. Run Tailwind yourself instead and the same source generates only the utilities your own markup uses.</p>
    </div>
  </article>

  <article class="card card-hover-frame frame frame-hover">
    <span class="frame__tr"></span><span class="frame__bl"></span>
    <div class="card__body">
      <p class="card__kicker">Character</p>
      <h3 class="card__title">It looks like a camera</h3>
      <p class="card__excerpt">Viewfinder brackets, a record dot, a timecode. I make videos, so the visual language came from the thing I already spend my life inside rather than from a dashboard I don't.</p>
    </div>
  </article>

  <article class="card card-hover-frame frame frame-hover">
    <span class="frame__tr"></span><span class="frame__bl"></span>
    <div class="card__body">
      <p class="card__kicker">Discipline</p>
      <h3 class="card__title">Responsive, not "mobile too"</h3>
      <p class="card__excerpt">Every component is drawn at 320px before it is drawn at 1440px. Each demo on this site has a 320px toggle, because a layout you cannot check is a layout you are guessing about.</p>
    </div>
  </article>
</div>

## How it fits together

Three tiers, and the order is the whole argument. **Tailwind** is the floor —
the reset, the theme variables and every utility. **daisyUI** is the component
set, covering everything a UI kit ships that this system has not built. **This
system** sits on top: it wins every name it shares with daisyUI, and still
loses to a Tailwind utility.

<div class="stack mt-6">
<svg class="layers" viewBox="0 0 640 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four bands, bottom to top: Tailwind theme and base, daisyUI components, this system's elements through sections, and Tailwind utilities on top.">
  <g>
    <rect class="layers__base" x="8" y="156" width="624" height="34" rx="8" />
    <text class="layers__n" x="26" y="177">1</text>
    <text class="layers__t" x="52" y="177">tailwind — preflight, the theme, the tokens</text>
    <text class="layers__w" x="612" y="177">widest reach</text>
  </g>
  <g>
    <rect class="layers__l" x="42" y="118" width="556" height="34" rx="8" />
    <text class="layers__n" x="60" y="139">2</text>
    <text class="layers__t" x="86" y="139">daisyUI — drawer, range, rating, modal, toggle…</text>
  </g>
  <g>
    <rect class="layers__l" x="76" y="80" width="488" height="34" rx="8" />
    <text class="layers__n" x="94" y="101">3</text>
    <text class="layers__t" x="120" y="101">this system — elements, components, patterns, sections</text>
  </g>
  <g>
    <rect class="layers__top" x="110" y="42" width="420" height="34" rx="8" />
    <text class="layers__nt" x="128" y="63">4</text>
    <text class="layers__tt" x="154" y="63">tailwind utilities — last word, smallest job</text>
  </g>
  <path class="layers__arrow" d="M622 146V52" />
  <path class="layers__arrow" d="M618 60l4-8 4 8" />
</svg>
</div>

The fourth band is the one worth explaining. daisyUI does not put its
components in Tailwind's `components` layer — it nests them *inside*
`utilities`, and per the cascade spec a rule written directly in a layer beats
every sub-layer nested in it. That is what makes `class="btn bg-red-500"` do
what you expect. This system goes in the same place, one step later, so:

| you write | you get |
| --- | --- |
| `btn` | **ours** — this system's button |
| `btn bg-red-500` | **the utility** — because a utility that loses to a component is not a utility |
| `drawer`, `range`, `rating` | **daisyUI's** — this system never built one |

Nothing here ever needs `!important` to win an argument, and the thirty
components both systems name are simply not shipped twice: daisyUI is compiled
with them excluded.

## What is opinionated about it

Six decisions, made once, so you stop making them.

| | |
| --- | --- |
| **Token-first** | Every value is a variable off a ladder. Nothing invents a number. |
| **One rationed accent** | Near-monochrome ink, so a single colour can mean *live*. Attention is budgeted, not sprayed. |
| **The platform first** | `<details>`, `<dialog>`, the Popover API, native inputs. Keyboard and focus come free rather than being rebuilt badly. |
| **Honest motion** | Under 200ms for feedback, one property at a time, every animation off under reduced motion. |
| **State lives in ARIA** | Style `[aria-current]` and `[data-*]`, never an `.is-active` class that can disagree with the accessibility tree. |
| **Dark is not an inversion** | Surfaces lift with light, hairlines go translucent, shadow becomes elevation. |

## The two voices

The type system is one face you read and one you do not.

:::demo
<div class="stack stack-sm">
  <p class="spec-display spec-2xl m-0">Geist sets the headlines</p>
  <p class="t-muted m-0">…and everything you actually read, including labels — the same face worn small, uppercase and tracked.</p>
  <p class="t-label m-0 mt-4">A label, in Geist</p>
  <p class="t-data m-0">TAKE 47 · 00:12:47</p>
</div>
:::

That last line is the only place monospace belongs: **data**. Timecodes, counts,
dimensions, versions, code. The moment mono carries a sentence it stops meaning "this
is data" and starts meaning "this is a terminal" — and a signal used everywhere is not
a signal.

## Where to go next

- [Installation](/install.html) — three lines, any stack
- [Principles](/principles.html) — the house rules, and why each exists
- [Colour](/color.html) — the two-tier token model that makes theming one edit
