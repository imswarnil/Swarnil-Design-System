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
    <span class="hero__play">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg>
    </span>
  </div>
</section>

<section class="band">
  <p class="sec__kicker">Why it exists</p>
  <h2 class="sec__title">Opinions, so you can stop having them</h2>
  <p class="sec__lead">Six decisions, made once and written down, so you are not standing at 2am asking whether this should be 16px or 20px.</p>

  <div class="feats">
    <article class="feat frame frame-4 frame-hover">
      <span class="frame__tr"></span><span class="frame__bl"></span>
      <span class="feat__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z"/><path d="M12 12v9M12 12 4 7.5M12 12l8-4.5"/></svg></span>
      <h3>Token-first</h3>
      <p>Every value is a variable off a ladder. Nothing invents a number, so nothing drifts.</p>
    </article>

    <article class="feat frame frame-4 frame-hover">
      <span class="frame__tr"></span><span class="frame__bl"></span>
      <span class="feat__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="8" stroke-dasharray="3 4"/></svg></span>
      <h3>One rationed accent</h3>
      <p>Near-monochrome ink, so a single colour can mean <em>live</em>. Attention is budgeted, not sprayed.</p>
    </article>

    <article class="feat frame frame-4 frame-hover">
      <span class="frame__tr"></span><span class="frame__bl"></span>
      <span class="feat__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="13" rx="2"/><path d="M3.5 8.5h17M12 17.5V20M8 20h8"/></svg></span>
      <h3>The platform first</h3>
      <p>Native <code class="code">&lt;dialog&gt;</code>, <code class="code">&lt;details&gt;</code> and the Popover API. Keyboard and focus come free.</p>
    </article>

    <article class="feat frame frame-4 frame-hover">
      <span class="frame__tr"></span><span class="frame__bl"></span>
      <span class="feat__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h4l2-5 3 10 2-5h5"/></svg></span>
      <h3>Honest motion</h3>
      <p>Under 200ms for feedback, one property at a time, and every animation off under reduced motion.</p>
    </article>

    <article class="feat frame frame-4 frame-hover">
      <span class="frame__tr"></span><span class="frame__bl"></span>
      <span class="feat__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg></span>
      <h3>Dark is not an inversion</h3>
      <p>Surfaces lift with light, hairlines go translucent, shadow becomes elevation. One block of tokens.</p>
    </article>

    <article class="feat frame frame-4 frame-hover">
      <span class="frame__tr"></span><span class="frame__bl"></span>
      <span class="feat__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 12h10M4 17h13"/></svg></span>
      <h3>Mono means data</h3>
      <p>Timecodes, counts, dimensions, code. Never a sentence — and CI fails the build if that slips.</p>
    </article>
  </div>
</section>

<section class="band">
  <div class="install">
    <div>
      <p class="sec__kicker">Install</p>
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
  <p class="sec__kicker">The two voices</p>
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
  <div class="close-band">
    <p class="sec__kicker">Open source</p>
    <h2 class="sec__title">Free forever. MIT.</h2>
    <p>Built in the open, for a site that actually ships. If it saves you a weekend, a star is plenty.</p>
    <div class="hero__cta">
      <a class="btn btn-primary btn-lg" href="/introduction.html">Start reading</a>
      <a class="btn btn-ghost btn-lg" href="https://github.com/imswarnil/swarnil-design" rel="noopener">View on GitHub</a>
    </div>
  </div>
</section>
