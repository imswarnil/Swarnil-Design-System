---
title: The design system for people who make things
layout: home
lead: A token-first, dependency-free CSS design system. Almost monochrome, so one colour can mean something.
---

<section class="band hero">
  <div>
    <p class="hero__eyebrow">MIT · v0.1 · Dependency-free CSS</p>
    <h1 class="hero__title">Decide once.<br />Then stop <em>deciding</em>.</h1>
    <p class="hero__lead">A token-first CSS design system with no framework, no runtime and no build step. Change three variables and the whole thing rebrands — site, cards, thumbnails, end screens.</p>
    <div class="hero__cta">
      <a class="btn btn-primary btn-lg" href="/introduction.html">Read the docs</a>
      <a class="btn btn-secondary btn-lg frame frame-sm frame-hover" href="/button.html">Browse components</a>
    </div>
    <p class="hero__fine">No framework · No runtime · No build step required</p>
  </div>

  <div class="hero__vf frame frame-4 frame-signal" aria-hidden="true">
    <span class="frame__tr"></span><span class="frame__bl"></span>
    <span class="hero__tc">TAKE 47 · 00:12:47</span>
    <span class="hero__rec">REC</span>
    <span class="hero__dims">1280 × 720 · 16:9</span>
    <span class="hero__mode">SP</span>
    <span class="hero__scan"></span>
    <span class="hero__play">
      <svg class="icon icon-solid"><use href="/icons/sprite.svg#i-play"/></svg>
    </span>
  </div>
</section>

<section class="band">
  <p class="sec__kicker"><span class="sec__take">TAKE 01</span>Why it exists</p>
  <h2 class="sec__title">Opinions, so you can stop having them</h2>
  <p class="sec__lead">Six decisions, made once and written down, so you are not standing at 2am asking whether this should be 16px or 20px.</p>

  <div class="feats">
    <article class="feat frame frame-4 frame-hover">
      <span class="frame__tr"></span><span class="frame__bl"></span>
      <span class="feat__ico"><svg class="icon"><use href="/icons/sprite.svg#i-box"/></svg></span>
      <h3>Token-first</h3>
      <p>Every value is a variable off a ladder. Nothing invents a number, so nothing drifts.</p>
    </article>

    <article class="feat frame frame-4 frame-hover">
      <span class="frame__tr"></span><span class="frame__bl"></span>
      <span class="feat__ico"><svg class="icon"><use href="/icons/sprite.svg#i-aperture"/></svg></span>
      <h3>One rationed accent</h3>
      <p>Near-monochrome ink, so a single colour can mean <em>live</em>. Attention is budgeted, not sprayed.</p>
    </article>

    <article class="feat frame frame-4 frame-hover">
      <span class="frame__tr"></span><span class="frame__bl"></span>
      <span class="feat__ico"><svg class="icon"><use href="/icons/sprite.svg#i-browser"/></svg></span>
      <h3>The platform first</h3>
      <p>Native <code class="code">&lt;dialog&gt;</code>, <code class="code">&lt;details&gt;</code> and the Popover API. Keyboard and focus come free.</p>
    </article>

    <article class="feat frame frame-4 frame-hover">
      <span class="frame__tr"></span><span class="frame__bl"></span>
      <span class="feat__ico"><svg class="icon"><use href="/icons/sprite.svg#i-activity"/></svg></span>
      <h3>Honest motion</h3>
      <p>Under 200ms for feedback, one property at a time, and every animation off under reduced motion.</p>
    </article>

    <article class="feat frame frame-4 frame-hover">
      <span class="frame__tr"></span><span class="frame__bl"></span>
      <span class="feat__ico"><svg class="icon"><use href="/icons/sprite.svg#i-moon"/></svg></span>
      <h3>Dark is not an inversion</h3>
      <p>Surfaces lift with light, hairlines go translucent, shadow becomes elevation. One block of tokens.</p>
    </article>

    <article class="feat frame frame-4 frame-hover">
      <span class="frame__tr"></span><span class="frame__bl"></span>
      <span class="feat__ico"><svg class="icon"><use href="/icons/sprite.svg#i-type"/></svg></span>
      <h3>Mono means data</h3>
      <p>Timecodes, counts, dimensions, code. Never a sentence — and CI fails the build if that slips.</p>
    </article>
  </div>
</section>

<section class="band">
  <div class="install">
    <div>
      <p class="sec__kicker"><span class="sec__take">TAKE 02</span>Install</p>
      <h2 class="sec__title">Three lines, any stack</h2>
      <p class="sec__lead">It is CSS. Link it, or import it. There is no configuration file and nothing to compile.</p>
    </div>
    <div>

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@imswarnil/swarnil-design/dist/swarnil-design.min.css">
```

```css
@import "@imswarnil/swarnil-design";
```

</div>
  </div>
</section>

<section class="band">
  <p class="sec__kicker"><span class="sec__take">TAKE 03</span>The two voices</p>
  <h2 class="sec__title">Type that knows what it is saying</h2>
  <p class="sec__lead">Space Grotesk for display, Inter for everything you read — including labels, which are the same face worn small and tracked. Monospace appears only where the content is data.</p>

  <div class="feats">
    <article class="feat">
      <p class="t-label u-m-0 u-mb-2">A label · Inter</p>
      <p class="t-small u-m-0">Uppercase and tracked is what makes a label read as a label. The monospace was never doing that work.</p>
    </article>
    <article class="feat">
      <p class="t-data u-m-0 u-mb-2">TAKE 47 · 00:12:47</p>
      <p class="t-small u-m-0">A timecode is data, so it takes the mono voice. This is the only kind of thing that does.</p>
    </article>
    <article class="feat">
      <p class="spec-display spec-xl u-m-0 u-mb-2">Space Grotesk</p>
      <p class="t-small u-m-0">Headlines, numbers, the mark. Tight tracking that closes further as it grows.</p>
    </article>
  </div>
</section>

<section class="band">
  <p class="sec__kicker"><span class="sec__take">TAKE 04</span>The numbers</p>
  <h2 class="sec__title">Small enough to read in an afternoon</h2>
  <p class="sec__lead">Every figure below is measured by the build, not claimed. When one drifts, CI knows before the page does.</p>

  <div class="stats">
    <div class="stats__item">
      <span class="t-stat">14.7</span>
      <span class="stats__label">KB gzipped — the whole system</span>
    </div>
    <div class="stats__item">
      <span class="t-stat">97</span>
      <span class="stats__label">Tones across 8 oklch ramps</span>
    </div>
    <div class="stats__item">
      <span class="t-stat">61</span>
      <span class="stats__label">Icons, drawn from scratch</span>
    </div>
    <div class="stats__item">
      <span class="t-stat">0</span>
      <span class="stats__label">Dependencies, runtimes, build steps</span>
    </div>
  </div>
</section>

<section class="band">
  <div class="close-band">
    <p class="sec__kicker"><span class="sec__take">TAKE 05</span>Open source</p>
    <h2 class="sec__title">Free forever. MIT.</h2>
    <p>Built in the open, for a site that actually ships. If it saves you a weekend, a star is plenty.</p>
    <div class="hero__cta">
      <a class="btn btn-primary btn-lg" href="/introduction.html">Start reading</a>
      <a class="btn btn-ghost btn-lg" href="https://github.com/imswarnil/swarnil-design" rel="noopener">View on GitHub</a>
    </div>
  </div>
</section>
