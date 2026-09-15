---
title: Hero
group: Sections
order: 50
lead: One claim, one supporting line, at most two actions.
---

A hero with three messages is a section pretending to be a page. The parts
enforce the ration: eyebrow, title (one `em` of accent allowed), lead, two
actions, a fine-print note.

## Split — claim beside media

:::demo
<div class="hero">
  <div>
    <p class="hero__eyebrow">MIT · Tailwind 4</p>
    <h2 class="hero__title m-0">Decide once.<br />Then stop <em>deciding</em>.</h2>
    <p class="hero__lead">Change three variables and the whole thing rebrands.</p>
    <div class="hero__actions">
      <button class="btn btn-primary btn-lg" type="button">Read the docs</button>
      <button class="btn btn-outline btn-lg" type="button">Components</button>
    </div>
    <p class="hero__note">Tailwind 4 · daisyUI</p>
  </div>
  <div class="hero__media">
    <div class="vf ratio ratio-photo hairline rounded-lg">
      <span class="vf__tc">TAKE 47 · 00:12:47</span>
      <span class="vf__rec">REC</span>
      <span class="vf__dims">1280 × 720</span>
    </div>
  </div>
</div>
:::

The media slot takes anything — this one holds the viewfinder, the system's
own opening shot.

## Centred — the announcement

:::demo
<div class="hero hero-centre">
  <div>
    <p class="hero__eyebrow">v1.0</p>
    <h2 class="hero__title m-0">The system ships</h2>
    <p class="hero__lead">Everything below this line is under semver now.</p>
    <div class="hero__actions"><button class="btn btn-primary btn-lg" type="button">Changelog</button></div>
  </div>
</div>
:::

Below 60rem the split stacks and the title steps down one size — the one
media query this section owns, because a hero collapsing is page topology.

## Wider — when the footage is the subject

The default ratio favours the words, because most heroes are an argument. A hero
whose **subject** is the picture — an episode, a course trailer, a case study —
should favour the picture. `.hero-wide` flips the ratio and opens the gap;
`.hero-xl` steps the type up for a `center-2xl` column;
`.hero-media-start` puts the media first, so two heroes on one site do not read
as the same page twice.

:::demo `.hero-wide` with `.hero__facts`
<div class="hero hero-wide">
  <div>
    <p class="hero__eyebrow"><span class="dot dot-sm dot-live"></span> Featured · new this week</p>
    <h2 class="hero__title m-0">Colour, in one block of tokens</h2>
    <p class="hero__lead">Eight ramps, ninety-seven tones, and why dark mode is not an inversion.</p>
    <div class="hero__actions">
      <button class="btn btn-primary btn-lg btn-play" type="button"><span class="btn__disc"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg></span>Watch — 24:07</button>
      <button class="btn btn-secondary btn-lg" type="button">All 128 videos</button>
    </div>
    <p class="hero__facts">
      <span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-eye"/></svg> <strong>18k</strong> views</span>
      <span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-clock"/></svg> <strong>24:07</strong></span>
      <span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-hash"/></svg> Episode 48</span>
    </p>
  </div>
  <div class="hero__media">
    <div class="ratio ratio-wide rounded-lg overflow-hidden pattern pattern-scan hairline"></div>
  </div>
</div>
:::

`.hero__facts` is the smallest honest way to say "128 episodes, 23 countries"
without opening a whole [stats](/stats.html) band inside the hero: a hairline,
the data voice, and tabular figures so two heroes line up.

:::demo `.hero-media-start` — the alternate band
<div class="hero hero-media-start">
  <div class="hero__media"><div class="ratio ratio-photo rounded-lg overflow-hidden pattern pattern-halftone hairline"></div></div>
  <div>
    <p class="hero__eyebrow">About</p>
    <h2 class="hero__title m-0">I explain things I had to learn twice.</h2>
    <p class="hero__lead">Salesforce engineer, YouTuber, and a fairly stubborn believer that anything worth understanding can be explained in twenty minutes.</p>
    <div class="hero__actions"><button class="btn btn-primary" type="button">How I work</button></div>
  </div>
</div>
:::

Stacked, the picture goes back under the claim it illustrates —
`hero-media-start` only reorders above 60rem, where there are two columns to
reorder.
