---
title: Pricing
group: Sections
order: 50
lead: The plans, read across — every part a named slot in a fixed order, and exactly one plan featured.
---

:::demo Three plans, one featured, a monthly/yearly toggle
<section class="pricing pricing-flush" data-period="monthly">
  <header class="pricing__head">
    <h2>Join the channel</h2>
    <p class="t-lead">Every episode is free. Members get the course, the source files and the Friday call.</p>
    <div class="pricing__toggle" role="group" aria-label="Billing period">
      <button class="button" type="button" aria-pressed="true">Monthly</button>
      <button class="button" type="button" aria-pressed="false">Yearly <span class="tag is-success">−2 months</span></button>
    </div>
  </header>
  <div class="pricing__grid">
    <article class="plan">
      <span class="plan__name">Free</span>
      <p class="plan__price">$0<span class="plan__period">/forever</span></p>
      <p class="plan__note">Every public episode, the day it lands.</p>
      <ul class="plan__features">
        <li>All public episodes</li>
        <li>The newsletter</li>
        <li data-off>The course</li>
        <li data-off>Source files</li>
        <li data-off>The Friday call</li>
      </ul>
      <a class="button is-outlined plan__cta" href="#i">Subscribe free</a>
    </article>
    <article class="plan plan-featured">
      <span class="plan__flag">Most popular</span>
      <span class="plan__name">Member</span>
      <p class="plan__price"><span data-monthly>$9</span><span data-yearly>$90</span><span class="plan__period"><span data-monthly>/month</span><span data-yearly>/year</span></span></p>
      <p class="plan__note">Everything, and the archive.</p>
      <ul class="plan__features">
        <li>All public episodes</li>
        <li>The newsletter</li>
        <li>The course, every module</li>
        <li>Source files and LUTs</li>
        <li data-off>The Friday call</li>
      </ul>
      <a class="button is-primary plan__cta" href="#i">Become a member</a>
      <span class="plan__fine"><span data-monthly>Cancel any time.</span><span data-yearly>Billed once a year.</span></span>
    </article>
    <article class="plan">
      <span class="plan__name">Studio</span>
      <p class="plan__price"><span data-monthly>$29</span><span data-yearly>$290</span><span class="plan__period"><span data-monthly>/month</span><span data-yearly>/year</span></span></p>
      <p class="plan__note">For a team that ships video.</p>
      <ul class="plan__features">
        <li>Everything in Member</li>
        <li>Five seats</li>
        <li>The Friday call</li>
        <li>Project reviews</li>
      </ul>
      <a class="button is-link plan__cta" href="#i">Talk to me</a>
    </article>
  </div>
  <p class="pricing__foot">Prices in USD. Students and non-profits: mail me, there is a rate.</p>
</section>
:::

A pricing grid is read **across** rather than down: people compare the same line
on three cards at once. So every part of a plan is a named slot and the order is
not negotiable — what tier, what price, what you get, how to start. The CTAs sit
at the bottom whatever each tier lists, so the row of buttons lines up.

## One featured plan

Exactly one plan in a grid may be `.plan-featured`. Two featured plans is the
same as none, and the accent is rationed in this system precisely so that *this
one* can mean something. The featured plan gets an accent edge and a lift, never
a fill; the flag is the one solid accent in the band.

## Absences you can see

A feature the tier does *not* include still earns a row, marked `data-off`. An
absence you can see beats a list you have to diff against the next card.

:::demo Two tiers, read across
<div class="pricing__grid" style="max-width:36rem">
  <article class="plan">
    <span class="plan__name">Course</span>
    <p class="plan__price">$120<span class="plan__period"> once</span></p>
    <ul class="plan__features">
      <li>Twelve lessons</li>
      <li>Lifetime updates</li>
      <li data-off>Project review</li>
    </ul>
    <a class="button is-outlined plan__cta" href="#i">Buy the course</a>
  </article>
  <article class="plan plan-featured">
    <span class="plan__flag">Best value</span>
    <span class="plan__name">Course + review</span>
    <p class="plan__price">$180<span class="plan__period"> once</span></p>
    <ul class="plan__features">
      <li>Twelve lessons</li>
      <li>Lifetime updates</li>
      <li>One project review</li>
    </ul>
    <a class="button is-primary plan__cta" href="#i">Buy with review</a>
  </article>
</div>
:::

## The toggle

The toggle is two buttons carrying `aria-pressed`, and the band carries
`data-period`. The CSS shows the `[data-monthly]` or `[data-yearly]` figure that
matches and hides the other. Flipping the attribute is the host page's one line
of script — a price switch is state, and state is not CSS's to invent.

:::demo Yearly, pressed — the same markup with data-period flipped
<section class="pricing pricing-flush" data-period="yearly">
  <header class="pricing__head">
    <div class="pricing__toggle" role="group" aria-label="Billing period">
      <button class="button" type="button" aria-pressed="false">Monthly</button>
      <button class="button" type="button" aria-pressed="true">Yearly</button>
    </div>
  </header>
  <div class="pricing__grid" style="max-width:20rem">
    <article class="plan">
      <span class="plan__name">Member</span>
      <p class="plan__price"><span data-monthly>$9</span><span data-yearly>$90</span><span class="plan__period"><span data-monthly>/month</span><span data-yearly>/year</span></span></p>
      <a class="button is-primary plan__cta" href="#i">Become a member</a>
    </article>
  </div>
</section>
:::

```js
toggle.addEventListener('click', e => {
  const b = e.target.closest('[aria-pressed]'); if (!b) return;
  for (const x of toggle.children) x.setAttribute('aria-pressed', x === b);
  band.dataset.period = b.textContent.trim().toLowerCase();
});
```

## Properties

| Variable | Does |
| --- | --- |
| `--pricing-col` | Minimum plan width before the grid wraps |
| `--pricing-gap` | Gap between plans |
| `--pricing-pad` | Band padding; `.pricing-flush` sets it to zero |
| `--plan-pad` | Padding inside a plan |

## Accessibility

- Each plan is an `<article>`; the tier name comes first so a screen reader
  announces the tier before the price.
- The toggle is a `role="group"` with an `aria-label`; each button's state is
  `aria-pressed`, which is what the CSS styles.
- Hidden period figures are `display: none`, so only the active price is read.
- `data-off` rows are still in the list — the *−* is generated, so the copy
  should read as an absence on its own (*No Friday call*) where it matters.
- The featured plan's flag is text, not colour alone.
