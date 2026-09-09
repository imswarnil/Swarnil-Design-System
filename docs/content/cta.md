---
title: CTA
group: Sections
order: 50
lead: The closing band — the page has argued, this asks. One primary, no new facts.
---

A CTA that introduces information is a section that arrived too late. Kicker,
title, one supporting line, one primary action, at most one quiet alternative.

## Boxed

:::demo
<div class="cta cta-boxed">
  <p class="cta__kicker">Open source</p>
  <h2 class="cta__title u-m-0">Free forever. MIT.</h2>
  <p class="cta__body">If it saves you a weekend, a star is plenty.</p>
  <div class="cta__actions">
    <button class="button is-primary is-medium" type="button">Start reading</button>
    <button class="button is-ghost is-medium" type="button">View on GitHub</button>
  </div>
  <p class="cta__fine">No account, no tracking, no build step.</p>
</div>
:::

## Inverse — the full-stop

:::demo
<div class="cta cta-inverse">
  <p class="cta__kicker">The last band</p>
  <h2 class="cta__title u-m-0">Ship the thing.</h2>
  <p class="cta__body">Ink and paper flip; the ghost button is told what quiet means on near-black — without that it lands at 2:1 and disappears.</p>
  <div class="cta__actions">
    <button class="button is-primary is-medium" type="button">Get started</button>
    <button class="button is-ghost is-medium" type="button">Read the principles</button>
  </div>
</div>
:::

Use inverse **once per page at most** — it is the typographic full-stop, and a
page with three full-stops has none.

## Smaller — the newsletter in the middle of a page

The closing band of a landing page and a newsletter box halfway down a homepage
are the same component asking for very different amounts of the screen. A
subscribe form that fills a whole band reads as the point of the page, and on a
personal site it is not the point.

`.cta__form` is the other half of that: without it a `.form-inline` stretches to
the band and you get a 900px-wide email box.

:::demo `.cta-sm` with `.cta__form`
<div class="center center-md">
  <div class="cta cta-sm cta-boxed">
    <p class="cta__kicker">Every Friday</p>
    <h2 class="cta__title u-m-0">One episode, one thing I learned.</h2>
    <p class="cta__body">No sponsor reads. Unsubscribe is one click and I will not ask why.</p>
    <form class="cta__actions cta__form form form-inline" action="#i" onsubmit="return false">
      <label class="u-sr-only" for="cta-mail">Email</label>
      <input class="input input-sm" id="cta-mail" type="email" placeholder="you@studio.tv" />
      <button class="button is-primary is-small" type="submit">Subscribe</button>
    </form>
    <p class="cta__fine">4,812 readers · new issue every Friday</p>
  </div>
</div>
:::

## Sideways — the strip between two bands

`.cta-row` puts the words on one side and the form on the other, for a place
where a centred column would add height the page has not earned.

:::demo
<div class="cta cta-sm cta-row cta-boxed">
  <div>
    <p class="cta__kicker">Available from November</p>
    <h2 class="cta__title u-m-0">Need one of these, but for you?</h2>
    <p class="cta__fine">Two clients at a time, no more.</p>
  </div>
  <div class="cta__actions">
    <button class="button is-primary" type="button">Start a conversation</button>
    <button class="button is-ghost" type="button">About me</button>
  </div>
</div>
:::

Under 48rem the row stacks and the band tightens by one step — a CTA is the last
thing on a page and should not be the tallest.
