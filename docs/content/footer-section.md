---
title: Footer
group: Sections
order: 50
lead: The last section, not an afterthought — identity, somewhere to go next, and the sign-off.
---

A reader who scrolled to the end is *looking* for a next step. A footer
without links is a dead end wearing a copyright line.

## The full footer

:::demo
<footer class="footer u-rounded-lg">
  <div class="center">
    <div class="footer__top">
      <div>
        <p class="footer__brand"><span class="dot dot-accent"></span> Swarnil</p>
        <p class="footer__note">Almost monochrome, so one colour can mean something.</p>
      </div>
      <nav class="footer__col" aria-label="Docs"><p class="footer__head">Docs</p><a href="#i">Foundation</a><a href="#i">Components</a><a href="#i">Patterns</a></nav>
      <nav class="footer__col" aria-label="Project"><p class="footer__head">Project</p><a href="#i">GitHub</a><a href="#i">Icons</a><a href="#i">Changelog</a></nav>
    </div>
    <div class="footer__bottom">
      <p class="footer__fine">MIT · © 2026 Swarnil Singhai</p>
      <span class="footer__rec"><span class="dot dot-sm dot-live"></span> Still rolling</span>
    </div>
  </div>
</footer>
:::

## Minimal

:::demo For a one-pager or a tool
<footer class="footer footer-minimal u-rounded-lg">
  <div class="center">
    <div class="footer__bottom">
      <p class="footer__fine">MIT · © 2026</p>
      <span class="footer__rec"><span class="dot dot-sm dot-live"></span> Still rolling</span>
    </div>
  </div>
</footer>
:::

## The full-height close

A footer that carries a newsletter, the platforms and the fine print is not a
bigger footer — it is the same three strips with three more parts. The oversized
wordmark is decoration, so it is `aria-hidden`: the accessible name is already
in `.footer__brand` at the top.

:::demo Every part, on the dark close
<footer class="footer footer-inverse u-rounded-lg">
  <div class="center">
    <div class="footer__top">
      <div>
        <p class="footer__brand"><span class="dot dot-accent"></span> Swarnil</p>
        <p class="footer__note">Engineer, creator, occasional traveller. Everything here is made in the open.</p>
        <div class="footer__social">
          <a class="btn btn-social btn-sm btn-icon" href="#i" aria-label="YouTube"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-video"/></svg></a>
          <a class="btn btn-social btn-sm btn-icon" href="#i" aria-label="GitHub"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-code"/></svg></a>
          <a class="btn btn-social btn-sm btn-icon" href="#i" aria-label="RSS"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-rss"/></svg></a>
        </div>
        <form class="footer__form" action="#i" onsubmit="return false">
          <label class="u-sr-only" for="f-mail">Email</label>
          <input class="input input-sm" id="f-mail" type="email" placeholder="you@studio.tv" />
          <button class="btn btn-secondary btn-sm" type="submit">Subscribe</button>
        </form>
      </div>
      <nav class="footer__col" aria-label="Docs"><p class="footer__head">Docs</p><a href="#i">Foundation</a><a href="#i">Components</a><a href="#i">Patterns</a><a href="#i">Broadcast</a></nav>
      <nav class="footer__col" aria-label="Project"><p class="footer__head">Project</p><a href="#i">GitHub</a><a href="#i">Icons</a><a href="#i">Changelog</a></nav>
      <nav class="footer__col" aria-label="More"><p class="footer__head">More</p><a href="#i">About</a><a href="#i">Uses</a><a href="#i">Colophon</a></nav>
    </div>
    <span class="footer__mark" aria-hidden="true">Swarnil</span>
    <div class="footer__bottom">
      <div>
        <p class="footer__fine">MIT · © 2026 Swarnil Singhai</p>
        <p class="footer__meta"><span><strong>v0.4.0</strong></span><span>Built <strong>Sep 07</strong></span><span>Set in <strong>Inter</strong></span></p>
      </div>
      <div class="stack stack-sm">
        <nav class="footer__legal" aria-label="Legal"><a href="#i">Privacy</a><a href="#i">Licence</a><a href="#i">RSS</a><a href="#i">Sitemap</a></nav>
        <span class="footer__rec"><span class="dot dot-sm dot-live"></span> Still rolling</span>
      </div>
    </div>
  </div>
</footer>
:::

## Centred, and compact

:::demo `.footer-center` with `.footer-compact` and the solid wordmark
<footer class="footer footer-center footer-compact u-rounded-lg">
  <div class="center">
    <div class="footer__top">
      <div>
        <p class="footer__brand"><span class="dot dot-accent"></span> Swarnil</p>
        <p class="footer__note">One page, one purpose, one link out.</p>
        <div class="footer__social">
          <a class="btn btn-social btn-sm btn-icon" href="#i" aria-label="YouTube"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-video"/></svg></a>
          <a class="btn btn-social btn-sm btn-icon" href="#i" aria-label="Mail"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-mail"/></svg></a>
        </div>
      </div>
    </div>
    <span class="footer__mark footer__mark-solid" aria-hidden="true">Swarnil</span>
    <div class="footer__bottom">
      <p class="footer__fine">© 2026</p>
      <nav class="footer__legal" aria-label="Legal"><a href="#i">Privacy</a><a href="#i">RSS</a></nav>
    </div>
  </div>
</footer>
:::

`.footer-loose` goes the other way — a roomier close for a site with a lot
behind it.

## Grounds

The footer sets its own `background` in the `sections` layer, so a `bg-*` class
(which lives in `elements`) would lose. One line hands the property back, and it
is already in the file:

```css
.footer[class*='bg-'] { background: revert-layer; }
```

So `class="footer bg-glow bg-faint"` works, and so does any other ground.

## Classes

| Class | What it does |
| --- | --- |
| `.footer__top` `.footer__bottom` | the columns strip and the fine-print strip |
| `.footer__brand` `.footer__note` | identity |
| `.footer__col` `.footer__head` | one column of links and its label |
| `.footer__social` | a row of icon links, as buttons so the tap target is the system's |
| `.footer__form` | the subscribe box, footer-sized |
| `.footer__meta` | version, build, typeface — facts, in the data voice |
| `.footer__legal` | privacy, licence, RSS — a row, not a column |
| `.footer__mark` | the oversized wordmark. `-solid` fills it instead of outlining |
| `.footer__fine` `.footer__rec` | the copyright and the sign-off |
| `.footer-minimal` | fine print only |
| `.footer-compact` `.footer-loose` | tighter / roomier |
| `.footer-center` | one centred column |
| `.footer-inverse` | the dark close |

## Responsive

Two steps, not one: a footer that goes from four columns straight to one wastes
a tablet. Under 64rem the identity block spans the full width and the link
columns pack; under 40rem everything stacks.

## The sign-off

The record dot ends the page the way the brand opened it — one mark, both
ends. It is the only animation a footer gets: the page may be over, but the
channel is not.
