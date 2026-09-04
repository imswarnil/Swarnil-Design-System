---
title: Hero
group: Sections
order: 10
lead: One claim, one supporting line, at most two actions.
---

A hero with three messages is a section pretending to be a page. The parts
enforce the ration: eyebrow, title (one `em` of accent allowed), lead, two
actions, a fine-print note.

## Split — claim beside media

:::demo
<div class="hero">
  <div>
    <p class="hero__eyebrow">MIT · Dependency-free</p>
    <h2 class="hero__title u-m-0">Decide once.<br />Then stop <em>deciding</em>.</h2>
    <p class="hero__lead">Change three variables and the whole thing rebrands.</p>
    <div class="hero__actions">
      <button class="btn btn-primary btn-lg" type="button">Read the docs</button>
      <button class="btn btn-outline btn-lg" type="button">Components</button>
    </div>
    <p class="hero__note">No framework · No runtime</p>
  </div>
  <div class="hero__media">
    <div class="vf ratio ratio-photo u-border u-rounded-lg">
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
    <h2 class="hero__title u-m-0">The system ships</h2>
    <p class="hero__lead">Everything below this line is under semver now.</p>
    <div class="hero__actions"><button class="btn btn-primary btn-lg" type="button">Changelog</button></div>
  </div>
</div>
:::

Below 60rem the split stacks and the title steps down one size — the one
media query this section owns, because a hero collapsing is page topology.
