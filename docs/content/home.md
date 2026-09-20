---
title: The design system for people who make things
layout: home
lead: A token-first design system on Tailwind CSS 4 and daisyUI. Almost monochrome, so one colour can mean something.
---

<section class="band hero">
  <!-- Full-bleed footage behind the whole band. The id lives here and nowhere
       else; docs.js builds the iframe and skips it under reduced motion. -->
  <span class="hero__bg" data-hero-video="7OoSX3KbXOw" aria-hidden="true"></span>

  <div class="hero__copy">
    <p class="hero__eyebrow">MIT · v0.2 · Tailwind 4 · daisyUI</p>
    <h1 class="hero__title">Decide once.<br />Then stop <em>deciding</em>.</h1>
    <p class="hero__lead">A design system built on Tailwind 4 and daisyUI, with a token layer of its own on top. Change three variables and the whole thing rebrands — site, cards, thumbnails, end screens.</p>
    <div class="hero__cta">
      <a class="btn btn-primary btn-lg" href="/introduction.html">Read the docs</a>
      <a class="btn btn-secondary btn-lg" href="/button.html">Browse components</a>
    </div>
    <p class="hero__fine">Tailwind 4 · daisyUI · No build step required</p>
  </div>

  <!-- The rig. Every colour is a system token, so it themes with the page
       instead of guessing at prefers-color-scheme like the old media/hero.svg. -->
  <div class="hero__art" aria-hidden="true">
    <svg class="rig" viewBox="0 0 440 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- viewfinder -->
      <rect class="rig__plate" x="20" y="18" width="400" height="228" rx="14" />
      <path class="rig__grid" d="M20 94h400M20 170h400M153 18v228M287 18v228" />
      <path class="rig__tick" d="M44 42v20M44 42h20M396 222v-20M396 222h-20" />
      <circle class="rig__rec" cx="52" cy="222" r="5" />
      <text class="rig__slate" x="66" y="226">REC</text>
      <text class="rig__slate" x="330" y="42">00:12:47</text>
      <g class="rig__scan"><rect x="20" y="18" width="400" height="3" rx="1.5" /></g>
      <circle class="rig__lens" cx="220" cy="132" r="38" />
      <circle class="rig__lens2" cx="220" cy="132" r="22" />
      <path class="rig__play" d="M212 122l18 10-18 10z" />

      <!-- the ramp -->
      <text class="rig__label" x="20" y="288">COLOUR</text>
      <rect class="rig__sw1" x="20" y="298" width="60" height="26" rx="6" />
      <rect class="rig__sw2" x="86" y="298" width="60" height="26" rx="6" />
      <rect class="rig__sw3" x="152" y="298" width="60" height="26" rx="6" />
      <rect class="rig__sw4" x="218" y="298" width="60" height="26" rx="6" />
      <rect class="rig__accent" x="284" y="298" width="136" height="26" rx="6" />

      <!-- the specimen -->
      <text class="rig__label" x="20" y="368">TYPE</text>
      <text class="rig__spec" x="20" y="400">Aa</text>
      <rect class="rig__bar" x="96" y="378" width="196" height="9" rx="4.5" />
      <rect class="rig__bar" x="96" y="394" width="152" height="9" rx="4.5" />
      <rect class="rig__barf" x="96" y="410" width="108" height="9" rx="4.5" />

      <!-- a component, assembled -->
      <rect class="rig__card" x="20" y="440" width="260" height="44" rx="10" />
      <circle class="rig__dot" cx="44" cy="462" r="6" />
      <rect class="rig__bar" x="60" y="452" width="92" height="8" rx="4" />
      <rect class="rig__barf" x="60" y="466" width="140" height="7" rx="3.5" />
      <rect class="rig__btn" x="292" y="440" width="128" height="44" rx="10" />
      <rect class="rig__btnl" x="318" y="458" width="76" height="9" rx="4.5" />
    </svg>
  </div>
</section>

<section class="band">
  <p class="sec__kicker"><span class="sec__take">TAKE 01</span>Why it exists</p>
  <h2 class="sec__title">Opinions, so you can stop having them</h2>
  <p class="sec__lead">Six decisions, made once and written down, so you are not standing at 2am asking whether this should be 16px or 20px.</p>

  <div class="feats">
    <article class="feat">
      <span class="feat__ico"><svg class="icon"><use href="/icons/sprite.svg#i-box"/></svg></span>
      <h3>Token-first</h3>
      <p>Every value is a variable off a ladder. Nothing invents a number, so nothing drifts.</p>
    </article>

    <article class="feat">
      <span class="feat__ico"><svg class="icon"><use href="/icons/sprite.svg#i-aperture"/></svg></span>
      <h3>One rationed accent</h3>
      <p>Near-monochrome ink, so a single colour can mean <em>live</em>. Attention is budgeted, not sprayed.</p>
    </article>

    <article class="feat">
      <span class="feat__ico"><svg class="icon"><use href="/icons/sprite.svg#i-browser"/></svg></span>
      <h3>The platform first</h3>
      <p>Native <code class="code">&lt;dialog&gt;</code>, <code class="code">&lt;details&gt;</code> and the Popover API. Keyboard and focus come free.</p>
    </article>

    <article class="feat">
      <span class="feat__ico"><svg class="icon"><use href="/icons/sprite.svg#i-activity"/></svg></span>
      <h3>Honest motion</h3>
      <p>Under 200ms for feedback, one property at a time, and every animation off under reduced motion.</p>
    </article>

    <article class="feat">
      <span class="feat__ico"><svg class="icon"><use href="/icons/sprite.svg#i-moon"/></svg></span>
      <h3>Dark is not an inversion</h3>
      <p>Surfaces lift with light, hairlines go translucent, shadow becomes elevation. One block of tokens.</p>
    </article>

    <article class="feat">
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
  <p class="sec__lead">Geist for display and for everything you read — including labels, which are the same face worn small and tracked. Hierarchy comes from weight, size and tracking, not from a second family. Monospace appears only where the content is data.</p>

  <div class="feats">
    <article class="feat">
      <p class="t-label m-0 mb-2">A label · Geist</p>
      <p class="t-small m-0">Uppercase and tracked is what makes a label read as a label. The monospace was never doing that work.</p>
    </article>
    <article class="feat">
      <p class="t-data m-0 mb-2">TAKE 47 · 00:12:47</p>
      <p class="t-small m-0">A timecode is data, so it takes the mono voice. This is the only kind of thing that does.</p>
    </article>
    <article class="feat">
      <p class="spec-display spec-xl m-0 mb-2">Geist, at 600</p>
      <p class="t-small m-0">Headlines, numbers, the mark. Tight tracking that closes further as it grows.</p>
    </article>
  </div>
</section>

<section class="band">
  <p class="sec__kicker"><span class="sec__take">TAKE 04</span>The broadcast layer</p>
  <h2 class="sec__title">The same tokens, on the stream</h2>
  <p class="sec__lead">Thumbnails, OG images, the starting-soon card, the lower third, the LIVE bug — every size in container units, so one design renders at 1280 for export and at 320 on this page. Change the accent and the channel follows.</p>

  <div class="feats">
    <div class="canvas canvas-yt">
      <div class="thumb thumb-series">
        <div></div>
        <div class="thumb__strip">
          <div><p class="thumb__kicker">Build log</p><h3 class="thumb__title">The frame layer, explained</h3></div>
          <span class="thumb__badge">47</span>
        </div>
      </div>
    </div>
    <div class="canvas canvas-yt">
      <div class="scene scene-starting">
        <div class="scene__head"><span class="scene__brand"><span class="dot dot-accent"></span> Swarnil</span><span class="scene__bug"><span class="dot"></span> Live</span></div>
        <div class="scene__body"><p class="scene__time">04:59</p><h3 class="scene__title">Starting soon</h3></div>
        <div class="scene__foot"><span class="scene__meta">@imswarnil</span></div>
      </div>
    </div>
    <div class="canvas canvas-yt bg-spot">
      <div class="lowerthird lowerthird-box">
        <span class="lowerthird__mark"></span>
        <div class="lowerthird__body"><p class="lowerthird__name">Swarnil Singhai</p><p class="lowerthird__role">Engineer · Creator</p></div>
      </div>
    </div>
  </div>
  <p class="mt-6"><a class="btn btn-outline" href="/canvas.html">See the broadcast layer</a> <a class="btn btn-ghost" href="/templates.html">Or start from a page template</a></p>
</section>

<section class="band">
  <p class="sec__kicker"><span class="sec__take">TAKE 05</span>The numbers</p>
  <h2 class="sec__title">Small enough to read in an afternoon</h2>
  <p class="sec__lead">Every figure below is measured by the build, not claimed. When one drifts, CI knows before the page does.</p>

  <div class="stats">
    <div class="stats__item">
      <span class="t-stat">{size}</span>
      <span class="stats__label">KB gzipped — the whole web bundle</span>
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
    <p class="sec__kicker"><span class="sec__take">TAKE 06</span>Open source</p>
    <h2 class="sec__title">Free forever. MIT.</h2>
    <p>Built in the open, for a site that actually ships. If it saves you a weekend, a star is plenty.</p>
    <div class="hero__cta">
      <a class="btn btn-primary btn-lg" href="/introduction.html">Start reading</a>
      <a class="btn btn-ghost btn-lg" href="https://github.com/imswarnil/Swarnil-Design-System" rel="noopener">View on GitHub</a>
    </div>
  </div>
</section>
