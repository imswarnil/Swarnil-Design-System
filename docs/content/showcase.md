---
title: Showcase
group: Start
order: 15
lead: The whole system in one scroll — every family at its real size, on one page, so incoherence has nowhere to hide.
---

The per-component pages prove a rule each. The [templates](/templates.html)
prove a page each. This page proves the **set**: every family at once, at the
size it actually ships, so anything that disagrees with the rest is visible in
one scroll rather than in a diff.

It is also the page to open after changing a token. Retint `--accent`, reset
`--radius-md`, swap the typeface — and everything that moved is on this screen.

## Controls

The density here is the app scale, not the landing-page scale: a **34px**
default button with 12px of padding. The 44px touch minimum is enforced
separately on coarse pointers, so the visual size shrinks and the target does
not.

:::demo Emphasis, across the five sizes
<div class="stack">
  <div class="cluster"><button class="button is-primary is-small" type="button">Record</button><button class="button is-link is-small" type="button">Preview</button><button class="button is-outlined is-small" type="button">Export</button><button class="button is-light is-small" type="button">Duplicate</button><button class="button is-ghost is-small" type="button">Cancel</button><button class="button is-ghost is-small" type="button">Skip</button><span class="t-fine t-muted">xs · 24px</span></div>
  <div class="cluster"><button class="button is-primary is-small" type="button">Record</button><button class="button is-link is-small" type="button">Preview</button><button class="button is-outlined is-small" type="button">Export</button><button class="button is-light is-small" type="button">Duplicate</button><button class="button is-ghost is-small" type="button">Cancel</button><button class="button is-ghost is-small" type="button">Skip</button><span class="t-fine t-muted">sm · 28px</span></div>
  <div class="cluster"><button class="button is-primary" type="button">Record</button><button class="button is-link" type="button">Preview</button><button class="button is-outlined" type="button">Export</button><button class="button is-light" type="button">Duplicate</button><button class="button is-ghost" type="button">Cancel</button><button class="button is-ghost" type="button">Skip</button><span class="t-fine t-muted">default · 34px</span></div>
  <div class="cluster"><button class="button is-primary is-medium" type="button">Record</button><button class="button is-link is-medium" type="button">Preview</button><button class="button is-outlined is-medium" type="button">Export</button><span class="t-fine t-muted">lg · 40px</span></div>
  <div class="cluster"><button class="button is-primary is-large" type="button">Watch the latest</button><span class="t-fine t-muted">xl · 46px — one per page, if that</span></div>
</div>
:::

:::demo Icons, groups, states and the reaction
<div class="stack">
  <div class="cluster">
    <button class="button is-primary" type="button" aria-label="Record"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-record"/></svg></button>
    <button class="button is-outlined" type="button" aria-label="Settings"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-settings"/></svg></button>
    <a class="button is-outlined" href="#i">Read the post <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-right"/></svg></a>
    <button class="button is-small" type="button">Live</button>
    <button class="button is-primary" type="button" aria-busy="true">Uploading</button>
    <button class="button is-outlined" type="button" disabled>Disabled</button>
  </div>
  <div class="cluster">
    <div class="buttons has-addons" role="group" aria-label="Alignment">
      <button class="button is-outlined is-small" type="button" aria-pressed="true">Left</button>
      <button class="button is-outlined is-small" type="button" aria-pressed="false">Centre</button>
      <button class="button is-outlined is-small" type="button" aria-pressed="false">Right</button>
    </div>
    <div class="buttons has-addons btn-group-segmented" role="group" aria-label="View">
      <button class="button" type="button" aria-pressed="true">Grid</button>
      <button class="button" type="button" aria-pressed="false">List</button>
    </div>
    <button class="button is-primary" type="button" aria-pressed="false" data-toggle>Subscribe<span class="btn__pop" aria-hidden="true"><span style="--a: 70deg"><svg class="icon"><use href="/icons/sprite.svg#i-bell"/></svg></span><span style="--a: 110deg"><svg class="icon"><use href="/icons/sprite.svg#i-heart"/></svg></span><span style="--a: 90deg; --d: 4rem"><svg class="icon"><use href="/icons/sprite.svg#i-star"/></svg></span></span></button>
    <button class="button is-outlined" type="button" aria-pressed="false" data-toggle><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-bookmark"/></svg> Save <span class="btn__count">1.4k</span></button>
  </div>
</div>
:::

## Fields

Controls and fields share one height, so a button beside an input lines up
without either being told about the other.

:::demo
<div class="row gy-4">
  <div class="col-12 col-md-6">
    <div class="form">
      <label class="field"><span class="field__label">Episode title</span><input class="input" type="text" placeholder="Colour, in one block of tokens" /><span class="field__hint">Shown on the card and in search.</span></label>
      <label class="field"><span class="field__label">Category</span><select class="select"><option>Craft</option><option>Code</option><option>Business</option></select></label>
      <div class="field field-inline"><label class="choice"><input class="switch" type="checkbox" role="switch" checked /> Publish to the RSS feed</label></div>
      <label class="field"><span class="field__label">Search</span><span class="input-icon"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-search"/></svg><input class="input" type="search" placeholder="Search 128 videos" /></span></label>
    </div>
  </div>
  <div class="col-12 col-md-6">
    <div class="form">
      <label class="field"><span class="field__label">Description</span><textarea class="input" rows="3" placeholder="What did this miss?"></textarea></label>
      <div class="field"><span class="field__label">Visibility</span>
        <label class="choice"><input type="radio" name="sc-vis" class="radio" checked /> Public</label>
        <label class="choice"><input type="radio" name="sc-vis" class="radio" /> Unlisted</label>
      </div>
      <label class="field"><span class="field__label">Email</span><input class="input" type="email" placeholder="you@studio.tv" aria-invalid="true" /><span class="field__error">That address is missing an @.</span></label>
      <div class="form__actions"><button class="button is-ghost is-small" type="button">Cancel</button><button class="button is-primary is-small" type="submit">Publish</button></div>
    </div>
  </div>
</div>
:::

## Cards

Every content type, in one grid, at the same width — which is the only way to
see that they are one component.

:::demo
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-4 cq-card">
  <div><article class="card card-video card-hover-frame frame-hover"><div class="card__media"><img src="/assets/media/studio.jpg" alt="" /><span class="veil veil-scrim veil-light"></span><span class="card__stamp">24:07</span><span class="card__play" aria-hidden="true"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-play"/></svg></span></div><div class="card__body"><p class="card__kicker">Ep. 48 · Craft</p><h4 class="card__title"><a class="card__link" href="#i">Colour, in one block of tokens</a></h4><p class="card__excerpt">Eight ramps, ninety-seven tones, and why dark mode is not an inversion.</p></div></article></div>
  <div><article class="card card-hover-lift"><div class="card__media"><img src="/assets/media/code.jpg" alt="" /><span class="veil veil-grain"></span></div><div class="card__body"><p class="card__kicker">Design systems</p><h4 class="card__title"><a class="card__link" href="#i">Decide once. Then stop deciding.</a></h4><p class="card__excerpt">Why a token-first system is the only kind that survives a rebrand.</p></div><div class="card__footer"><span>Sep 07</span><span class="t-data">8 min</span></div></article></div>
  <div><article class="card card-repo card-hover-lift"><div class="card__body"><p class="card__kicker"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-book"/></svg> imswarnil / <strong>swarnil-icons</strong> <span class="tag badge-outline">Public</span></p><p class="card__excerpt">One sprite, 96 icons, drawn on a 24px grid.</p><div class="card__tags"><span class="chip">icons</span><span class="chip">svg</span></div><p class="card__facts"><span class="card__lang" style="--lang: var(--chart-6)">SVG</span><span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-star"/></svg> 410</span><span>4 days ago</span></p></div><a class="card__link u-sr-only" href="#i">Open</a><span class="card__langs" aria-hidden="true"><span style="--lang: var(--chart-6); --value: 82%"></span><span style="--lang: var(--chart-1); --value: 18%"></span></span></article></div>
  <div><article class="card card-product card-hover-lift"><div class="card__media" style="--card-ratio: 4 / 3"><img src="/assets/media/camera.jpg" alt="" /><span class="card__badge"><span class="tag is-primary">Pick</span></span></div><div class="card__body"><p class="card__kicker">Camera</p><h4 class="card__title"><a class="card__link" href="#i">Sony FX3</a></h4><p class="card__rating"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-star"/></svg><b>4.8</b> · 1,204</p></div><div class="card__buy"><span class="card__price">₹2,40,000<span class="card__was">₹2,68,000</span></span><button class="button is-primary is-small card__above" type="button">Buy</button></div></article></div>
  <div><article class="card card-tile card-hover-zoom veil-mono" style="--card-ratio: 4 / 5"><div class="card__media"><img src="/assets/media/peak.jpg" alt="" /><span class="veil veil-grade"></span><span class="veil veil-scrim veil-heavy"></span></div><div class="card__body"><p class="card__kicker">Travel</p><h4 class="card__title"><a class="card__link" href="#i">Ladakh, on film</a></h4></div></article></div>
  <div><article class="card card-inverse"><span class="card__pattern pattern pattern-blueprint pattern-fine" aria-hidden="true"></span><div class="card__body"><p class="card__kicker"><span class="dot dot-sm dot-live"></span> Now</p><h4 class="card__title">What I'm on this month</h4><ol class="buildlog u-mt-3"><li class="buildlog__step" data-kind="start" data-done><span class="buildlog__node"></span><a class="buildlog__link" href="#i">Design system rebuilt<span class="buildlog__date">Sep 05</span></a></li><li class="buildlog__step" aria-current="step"><span class="buildlog__node">2</span><a class="buildlog__link" href="#i">Episode 48 in the edit<span class="buildlog__date">Sep 10</span></a></li></ol></div></article></div>
</div>
:::

## Data

:::demo
<div class="stack stack-lg">
  <div class="stats stats-divided stats-sm">
    <div class="stats__item"><span class="stats__value">128</span><span class="stats__label">Episodes</span></div>
    <div class="stats__item"><span class="stats__value">42<span class="stats__unit">k</span></span><span class="stats__label">Subscribers</span><span class="stats__delta" data-trend="up"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-arrow-up"/></svg> 12%</span></div>
    <div class="stats__item"><span class="stats__value">6</span><span class="stats__label">Courses</span></div>
    <div class="stats__item"><span class="stats__value">23</span><span class="stats__label">Countries</span></div>
  </div>
  <div class="row gy-4">
    <div class="col-12 col-md-6">
      <div class="stack stack-sm">
        <div class="progress-row"><span class="progress-row__head"><span class="progress-row__label">CSS</span><span class="progress-row__value">18 repos</span></span><progress class="progress" value="18" max="31" aria-label="CSS"></progress></div>
        <div class="progress-row"><span class="progress-row__head"><span class="progress-row__label">TypeScript</span><span class="progress-row__value">14 repos</span></span><progress class="progress" value="14" max="31" aria-label="TypeScript"></progress></div>
        <div class="cluster cluster-sm"><span class="progress-ring" style="--value: 62"><span class="progress-ring__value">62%</span></span><span class="spinner"></span><div class="buffer" style="inline-size: 8rem"><span></span></div></div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="cluster cluster-sm">
        <span class="tag">Draft</span><span class="tag is-primary">Featured</span><span class="tag is-primary">4K</span><span class="tag badge-outline">MIT</span><span class="tag is-success">Passing</span><span class="tag is-warning">Beta</span><span class="tag is-danger">Failed</span><span class="tag badge-live">Live</span>
        <span class="chip">css<button class="chip__x" type="button" aria-label="Remove"></button></span>
        <span class="timecode">00:24:07</span><span class="kbd">⌘K</span>
        <span class="avatar-group"><span class="avatar avatar-sm">PR</span><span class="avatar avatar-sm">AM</span><span class="avatar avatar-sm">TK</span><span class="avatar-group__more">+39</span></span>
      </div>
    </div>
  </div>
  <div class="table-scroll">
    <table class="table table-zebra table-compact">
      <thead><tr><th>Episode</th><th>Category</th><th class="table__num">Views</th><th class="table__num">Length</th></tr></thead>
      <tbody>
        <tr><td>Colour, in one block of tokens</td><td>Craft</td><td class="table__num">18,204</td><td class="table__num">24:07</td></tr>
        <tr><td>The frame layer, explained</td><td>Craft</td><td class="table__num">31,880</td><td class="table__num">18:30</td></tr>
        <tr><td>Why the thumbnail is the product</td><td>Business</td><td class="table__num">92,140</td><td class="table__num">31:12</td></tr>
      </tbody>
    </table>
  </div>
</div>
:::

## Navigation

:::demo
<div class="stack stack-lg">
  <header class="navbar navbar-bordered u-rounded-lg">
    <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>
    <nav class="navbar__nav" aria-label="Showcase"><a class="navbar__link" href="#i" aria-current="page">Home</a><a class="navbar__link" href="#i">Video</a><a class="navbar__link" href="#i">Blog</a><a class="navbar__link" href="#i">Courses</a></nav>
    <div class="navbar__actions"><button class="button is-ghost is-small" type="button" aria-label="Search"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-search"/></svg></button><a class="button is-primary is-small" href="#i">Subscribe</a></div>
  </header>
  <div class="row gy-4">
    <div class="col-12 col-lg-7">
      <div class="stack">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="#i">Home</a><a href="#i">Video</a><span aria-current="page">Episode 48</span></nav>
        <div class="tabs tabs-underline" role="tablist" aria-label="Views"><button class="tab" type="button" role="tab" aria-selected="true">All <span class="tab__count">128</span></button><button class="tab" type="button" role="tab" aria-selected="false">Craft <span class="tab__count">41</span></button><button class="tab" type="button" role="tab" aria-selected="false">Code <span class="tab__count">33</span></button></div>
        <nav class="pagination pagination-between" aria-label="Pages"><span class="pagination__link" aria-disabled="true" aria-label="Previous"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-left"/></svg></span><span class="pagination__status">Page 1 of 43</span><a class="pagination__link" href="#i" aria-label="Next"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></a></nav>
        <nav class="pager pager-course" aria-label="Lessons"><a class="pager__item" href="#i"><span class="pager__dir"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-left"/></svg> Previous</span><span class="pager__no">Lesson 02</span><span class="pager__title">Recipes and dataflows</span></a><a class="pager__item pager__item-next" href="#i"><span class="pager__dir">Next <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-right"/></svg></span><span class="pager__no">Lesson 04</span><span class="pager__title">Security predicates</span></a></nav>
      </div>
    </div>
    <div class="col-12 col-lg-5">
      <div class="row gy-4">
        <div class="col-6"><nav class="toc" aria-label="On this page"><p class="toc__head">On this page</p><a class="toc__link toc__link-h2" href="#i">Controls</a><a class="toc__link toc__link-h2" href="#i" aria-current="true">Cards</a><a class="toc__link toc__link-h3" href="#i">Data</a><a class="toc__link toc__link-h2" href="#i">Media</a></nav></div>
        <div class="col-6"><ol class="timestamps"><li><a class="ts" href="#i" data-done><span class="ts__time">0:00</span><span class="ts__label">Cold open</span></a></li><li><a class="ts" href="#i" aria-current="true"><span class="ts__time">4:20</span><span class="ts__label">The ramps</span></a></li><li><a class="ts" href="#i"><span class="ts__time">13:10</span><span class="ts__label">Dark mode</span></a></li></ol></div>
      </div>
    </div>
  </div>
</div>
:::

## Feedback

:::demo
<div class="row gy-4">
  <div class="col-12 col-md-6">
    <div class="stack stack-sm">
      <div class="alert alert-info"><span class="alert__icon"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-info"/></svg></span><div class="alert__content"><p class="alert__title">Heads up</p><p class="alert__body">The render finished while you were away.</p></div></div>
      <div class="alert alert-success alert-inline"><span class="alert__icon"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-check"/></svg></span><div class="alert__content"><p class="alert__body">Published to the feed.</p></div></div>
      <div class="alert alert-danger alert-inline"><span class="alert__icon"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-alert"/></svg></span><div class="alert__content"><p class="alert__body">Upload failed — the file is 4.2 GB.</p></div></div>
      <p class="note note-accent">A note is an aside the reader may skip.</p>
    </div>
  </div>
  <div class="col-12 col-md-6">
    <div class="stack stack-sm">
      <div class="callout callout-accent"><span class="callout__icon"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-info"/></svg></span><div class="callout__body"><p class="callout__title">Before you start</p><p>Open the project files. They are deliberately dirty.</p></div></div>
      <div class="skeleton-card"><div class="skeleton skeleton-media skeleton-breathe"></div><div class="stack stack-sm u-p-4"><div class="skeleton skeleton-text skeleton-text-short skeleton-breathe"></div><div class="skeleton skeleton-title skeleton-breathe"></div></div></div>
      <div class="cluster"><button class="button is-outlined is-small" type="button" popovertarget="sc-pop">A popover</button><div class="pop pop-sm" id="sc-pop" popover><div class="pop__body"><p class="t-small u-m-0">Escape closes it. No JavaScript here.</p></div></div><button class="button is-outlined is-small" type="button" data-dialog-open>A dialog</button><dialog class="dialog dialog-sm"><div class="dialog__head"><p class="dialog__title">Delete take 48?</p></div><div class="dialog__body"><p class="u-m-0">This cannot be undone.</p></div><div class="dialog__foot"><form method="dialog"><button class="button is-ghost is-small" type="submit">Cancel</button></form><button class="button is-danger is-small" type="button">Delete</button></div></dialog></div>
    </div>
  </div>
</div>
:::

## Media

:::demo
<div class="stack stack-lg">
  <div class="row gy-4">
    <div class="col-12 col-lg-7">
      <div class="player player-bar-open frame frame-signal" style="--frame-color: var(--accent)">
        <video src="/assets/media/loop.mp4" poster="/assets/media/loop.jpg" muted loop playsinline autoplay></video>
        <span class="veil veil-vignette"></span><span class="player__frame" aria-hidden="true"></span>
        <span class="player__tc" aria-hidden="true">TAKE 48 · 00:04:12</span><span class="player__rec" aria-hidden="true">Rec</span>
        <a class="play play-lg" href="#i" aria-label="Play"><span class="play__disc"></span></a>
        <div class="player__bar"><span class="player__time">04:12</span><div class="player__rail" role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax="1447" aria-valuenow="252" tabindex="0"><div class="player__buffered" style="--value: 61%"></div><div class="player__played" style="--value: 17%"></div><button class="player__marker" type="button" style="--at: 18%" aria-label="Colour"></button></div><span class="player__time">24:07</span></div>
      </div>
    </div>
    <div class="col-12 col-lg-5">
      <div class="row row-cols-2 gy-3">
        <div><div class="poster"><img src="/assets/media/coast.jpg" alt="" /><span class="veil veil-grade"></span><span class="veil veil-scrim"></span><span class="poster__label"><span class="poster__eyebrow">Lisbon</span><span class="poster__title">The tram episode</span></span></div></div>
        <div><figure class="figure u-m-0 ix-scan u-rounded-lg u-overflow-hidden"><img src="/assets/media/night.jpg" alt="" /></figure></div>
        <div><figure class="figure u-m-0 ix-zoom u-rounded-lg u-overflow-hidden"><img src="/assets/media/road.jpg" alt="" /></figure></div>
        <div><figure class="figure u-m-0 ix-color u-rounded-lg u-overflow-hidden"><img src="/assets/media/city.jpg" alt="" /></figure></div>
      </div>
    </div>
  </div>
  <section class="shelf shelf-inset">
    <header class="shelf__head"><h3 class="shelf__title">Latest episodes</h3><span class="shelf__meta">128 total</span></header>
    <div class="shelf__track cq-card ix-dim">
      <article class="shelf__item"><article class="card card-video"><div class="card__media"><img src="/assets/media/studio.jpg" alt="" /><span class="card__stamp">24:07</span></div><div class="card__body"><h4 class="card__title">Colour, in one block</h4></div></article></article>
      <article class="shelf__item"><article class="card card-video"><div class="card__media"><img src="/assets/media/city.jpg" alt="" /><span class="card__stamp">18:30</span></div><div class="card__body"><h4 class="card__title">The frame layer</h4></div></article></article>
      <article class="shelf__item"><article class="card card-video"><div class="card__media"><img src="/assets/media/night.jpg" alt="" /><span class="card__stamp">31:12</span></div><div class="card__body"><h4 class="card__title">The thumbnail is the product</h4></div></article></article>
      <article class="shelf__item"><article class="card card-video"><div class="card__media"><img src="/assets/media/road.jpg" alt="" /><span class="card__stamp">22:41</span></div><div class="card__body"><h4 class="card__title">Rebuilt in a weekend</h4></div></article></article>
    </div>
  </section>
</div>
:::

## Patterns

:::demo
<div class="row gy-4">
  <div class="col-12 col-lg-6">
    <ol class="timeline timeline-icons">
      <li class="timeline__item" data-done><span class="timeline__node"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-rocket"/></svg></span><div class="timeline__body"><span class="timeline__time">Day 1</span><h4 class="timeline__title">Kick-off</h4><p class="timeline__note">Six sites, nineteen button styles.</p></div></li>
      <li class="timeline__item" aria-current="step"><span class="timeline__node"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-aperture"/></svg></span><div class="timeline__body"><span class="timeline__time">Day 9</span><h4 class="timeline__title">Nine cascade layers</h4><p class="timeline__note">The specificity fights stopped.</p></div></li>
      <li class="timeline__item"><span class="timeline__node"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-check"/></svg></span><div class="timeline__body"><span class="timeline__time">Day 30</span><h4 class="timeline__title">Ship v1</h4></div></li>
    </ol>
  </div>
  <div class="col-12 col-lg-6">
    <section class="curriculum">
      <header class="curriculum__head"><h3 class="curriculum__title">CRM Analytics, from zero</h3><span class="curriculum__meta">12 lessons · 3h 40m</span><progress class="progress progress-thin" value="4" max="12" aria-label="Progress"></progress></header>
      <div class="curriculum__modules">
        <details class="curriculum__module" open><summary><span class="curriculum__no">01</span><span class="curriculum__module-title">The data model</span><span class="curriculum__count">4 lessons</span></summary>
          <ol class="curriculum__lessons">
            <li><a class="lesson" href="#i" data-done><span class="lesson__tick"></span><span class="lesson__title">What a dataset is</span><span class="lesson__len">08:12</span></a></li>
            <li><a class="lesson" href="#i" aria-current="page"><span class="lesson__tick"></span><span class="lesson__title">Joins, and where they go wrong</span><span class="lesson__len">19:04</span></a></li>
            <li><a class="lesson" href="#i" data-locked><span class="lesson__tick"></span><span class="lesson__title">Security predicates</span><span class="lesson__len">11:48</span></a></li>
          </ol>
        </details>
      </div>
    </section>
  </div>
</div>
:::

## Sections

:::demo A hero, closed by a compact call to action
<div class="stack">
  <section class="section section-tight bg-aurora bg-noise pattern pattern-grid pattern-fade u-rounded-lg">
    <div class="center hero">
      <div>
        <p class="hero__eyebrow"><span class="dot dot-sm dot-live"></span> Episode 48 is in the edit</p>
        <h2 class="hero__title u-m-0">I make things. Then I make a <em>video</em> about it.</h2>
        <p class="hero__lead">Software engineer by trade, YouTuber by habit.</p>
        <div class="hero__actions"><button class="button is-primary is-medium" type="button"><span class="btn__disc"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg></span>Watch the latest</button><button class="button is-link is-medium" type="button">Read the blog</button></div>
        <p class="hero__facts"><span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg> <strong>128</strong> episodes</span><span><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-globe"/></svg> <strong>23</strong> countries</span></p>
      </div>
      <div class="hero__media"><div class="ratio u-rounded-lg u-overflow-hidden"><img src="/assets/media/desk.jpg" alt="" /></div></div>
    </div>
  </section>
  <div class="cta cta-sm cta-row cta-boxed">
    <div><p class="cta__kicker">Every Friday</p><h3 class="cta__title u-m-0">One episode, one thing I learned.</h3><p class="cta__fine">4,812 readers · unsubscribe in one click</p></div>
    <form class="cta__actions cta__form form form-inline" action="#i" onsubmit="return false"><label class="u-sr-only" for="sc-mail">Email</label><input class="input input-sm" id="sc-mail" type="email" placeholder="you@studio.tv" /><button class="button is-primary is-small" type="submit">Subscribe</button></form>
  </div>
</div>
:::

## The broadcast layer

Sized in `cqi`, so the same markup is a 1280px thumbnail and this.

:::demo
<div class="row gy-4">
  <div class="col-12 col-md-6"><div class="canvas canvas-yt"><div class="thumb thumb-split"><div class="thumb__half"><span class="thumb__kicker">Episode 48</span><h3 class="thumb__title">Colour, in <em>one</em> block</h3></div><div class="thumb__half"><img src="/assets/media/studio.jpg" alt="" /></div></div></div></div>
  <div class="col-12 col-md-6"><div class="canvas canvas-yt"><img src="/assets/media/night.jpg" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" /><div class="lowerthird lowerthird-glass"><span class="lowerthird__mark"></span><div class="lowerthird__body"><span class="lowerthird__name">Swarnil Singhai</span><span class="lowerthird__role">Design systems · Episode 48</span></div></div></div></div>
</div>
:::

## What to look for

Open this page after any token change and read down it once. Three things
should be true, and if one is not, the change was wrong rather than the page:

- **One accent.** Count the accent-filled surfaces on screen. More than a
  couple and the rationing has slipped.
- **One rhythm.** Every gap on this page is a space token. A gap that looks
  like it landed between two steps is a hard-coded value that got in.
- **One voice per job.** Numbers are tabular and light; labels are uppercase
  and tracked; only code is monospace. `npm run audit` fails on the third, but
  the first two need an eye.
