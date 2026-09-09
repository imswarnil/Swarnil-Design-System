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

<div class="grid-3 u-mt-6">
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
      <p class="card__excerpt">One <code class="code">&lt;link&gt;</code>. No framework, no runtime, no build step, no npm tree that rots in eight months. If it can render HTML, it can use this.</p>
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

Nine cascade layers, bottom to top. A file may only reach *down* — which is why
nothing here ever needs `!important` to win an argument.

<div class="stack u-mt-6">
<svg class="layers" viewBox="0 0 640 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nine cascade layers, from config at the base up to utilities at the top. Each layer may only reference the layers below it.">
  <g>
    <rect class="layers__base" x="8" y="196" width="624" height="34" rx="8" />
    <text class="layers__n" x="26" y="217">0</text>
    <text class="layers__t" x="52" y="217">config — the @layer declaration itself</text>
    <text class="layers__w" x="612" y="217">widest reach</text>
  </g>
  <g>
    <rect class="layers__l" x="42" y="158" width="556" height="34" rx="8" />
    <text class="layers__n" x="60" y="179">1</text>
    <text class="layers__t" x="86" y="179">foundation — colour, type, space, motion, frame</text>
  </g>
  <g>
    <rect class="layers__l" x="76" y="120" width="488" height="34" rx="8" />
    <text class="layers__n" x="94" y="141">2</text>
    <text class="layers__t" x="120" y="141">elements — badge, table, code, indicator</text>
  </g>
  <g>
    <rect class="layers__l" x="110" y="82" width="420" height="34" rx="8" />
    <text class="layers__n" x="128" y="103">3</text>
    <text class="layers__t" x="154" y="103">components — button, card, field, nav</text>
  </g>
  <g>
    <rect class="layers__l" x="144" y="44" width="352" height="34" rx="8" />
    <text class="layers__n" x="162" y="65">4·5</text>
    <text class="layers__t" x="196" y="65">patterns and sections</text>
  </g>
  <g>
    <rect class="layers__top" x="178" y="6" width="284" height="34" rx="8" />
    <text class="layers__nt" x="196" y="27">6</text>
    <text class="layers__tt" x="222" y="27">utilities — last word, smallest job</text>
  </g>
  <path class="layers__arrow" d="M622 186V50" />
  <path class="layers__arrow" d="M618 58l4-8 4 8" />
</svg>
</div>

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
  <p class="spec-display spec-2xl u-m-0">Inter sets the headlines</p>
  <p class="t-muted u-m-0">…and everything you actually read, including labels — the same face worn small, uppercase and tracked.</p>
  <p class="t-label u-m-0 u-mt-4">A label, in Inter</p>
  <p class="t-data u-m-0">TAKE 47 · 00:12:47</p>
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
