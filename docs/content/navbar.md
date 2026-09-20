---
title: Navbar
group: Components
order: 50
lead: The bar, the dropdown, the mega panel and the drawer — four things, split on purpose.
---

The navbar is three problems wearing one name, so it is three files:

| File | Owns |
| --- | --- |
| `35-navbar.css` | the bar — layout, links, variants, the burger |
| `36-menu.css` | everything that opens out of it |
| `js/nav.js` | scroll state only, and it is optional |

The previous version of this system had all of it in one 1,574-line file, which
is how a navbar becomes the file nobody wants to touch.

## The bar

:::demo
<header class="navbar navbar-bordered hairline rounded-lg">
  <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>
  <nav class="navbar__nav" aria-label="Main">
    <a class="navbar__link" href="#i" aria-current="page">Watch</a>
    <a class="navbar__link" href="#i">Learn</a>
    <a class="navbar__link" href="#i">Build</a>
    <a class="navbar__link" href="#i">Travel</a>
  </nav>
  <div class="navbar__actions">
    <button class="btn btn-quiet btn-sm" type="button">Sign in</button>
    <button class="btn btn-primary btn-sm" type="button">Subscribe</button>
  </div>
</header>
:::

The active link is marked with **a dot**, not a filled pill. A filled pill is
loud, and it competes with the accent for the one job the accent has.

## Dropdowns — the panel is the sidebar

A bar item that opens a panel, and **the panel holds a real `.navlist`** — the
same component the side navigation is built from. Not styled to match it: it
*is* it. The rows, the icons, the counts, the hover and the active dot have one
definition and two positions.

It is built on `<details>`, the same disclosure the sidebar groups use, which
buys the interaction from the platform: click to toggle, keyboard operable,
works with JavaScript off.

:::demo A bar with two dropdowns
<header class="navbar navbar-bordered hairline rounded-lg">
  <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>
  <nav class="navbar__nav" aria-label="Main">
    <a class="navbar__link" href="#i" aria-current="page">Watch</a>

    <details class="navbar__item">
      <summary class="navbar__link navbar__disclosure">Learn</summary>
      <div class="navbar__panel">
        <nav class="navlist">
          <span class="navlist__label">Courses</span>
          <a class="navlist__link" href="#i"><svg class="icon icon-sm navlist__icon"><use href="/icons/sprite.svg#i-play"/></svg>Getting started<span class="navlist__count">12</span></a>
          <a class="navlist__link" href="#i"><svg class="icon icon-sm navlist__icon"><use href="/icons/sprite.svg#i-box"/></svg>Components<span class="navlist__count">26</span></a>
          <a class="navlist__link" href="#i"><svg class="icon icon-sm navlist__icon"><use href="/icons/sprite.svg#i-aperture"/></svg>Tokens<span class="navlist__count">8</span></a>
        </nav>
      </div>
    </details>

    <details class="navbar__item">
      <summary class="navbar__link navbar__disclosure">Build</summary>
      <div class="navbar__panel navbar__panel-wide">
        <nav class="navlist">
          <span class="navlist__label">Foundation</span>
          <a class="navlist__link" href="#i"><svg class="icon icon-sm navlist__icon"><use href="/icons/sprite.svg#i-type"/></svg>Typography</a>
          <a class="navlist__link" href="#i"><svg class="icon icon-sm navlist__icon"><use href="/icons/sprite.svg#i-aperture"/></svg>Colour</a>
          <a class="navlist__link" href="#i"><svg class="icon icon-sm navlist__icon"><use href="/icons/sprite.svg#i-crop"/></svg>Spacing</a>
        </nav>
        <nav class="navlist">
          <span class="navlist__label">Patterns</span>
          <a class="navlist__link" href="#i"><svg class="icon icon-sm navlist__icon"><use href="/icons/sprite.svg#i-scan"/></svg>Deck</a>
          <a class="navlist__link" href="#i"><svg class="icon icon-sm navlist__icon"><use href="/icons/sprite.svg#i-live"/></svg>Log</a>
          <a class="navlist__link" href="#i"><svg class="icon icon-sm navlist__icon"><use href="/icons/sprite.svg#i-playlist"/></svg>Timeline</a>
        </nav>
        <div class="navbar__panel-foot">
          <span>26 components</span>
          <a class="link" href="/components.html">See all</a>
        </div>
      </div>
    </details>

    <a class="navbar__link" href="#i">Travel</a>
  </nav>
  <div class="navbar__actions">
    <button class="btn btn-primary btn-sm" type="button">Subscribe</button>
  </div>
</header>
:::

| Class | Job |
| --- | --- |
| `.navbar__item` | the `<details>` — positioning context |
| `.navbar__disclosure` | the `<summary>`, with the drawn chevron |
| `.navbar__panel` | the surface |
| `.navbar__panel-end` | aligned to the right edge, for the last items |
| `.navbar__panel-wide` | two columns of navlist |
| `.navbar__panel-wide-3` | three |
| `.navbar__panel-foot` | the strip along the bottom |

**Why `<details>` and not a popover.** A popover gets Escape, light-dismiss and
the top layer from the platform — but positioning one under its trigger needs
CSS anchor positioning, which is not evenly supported yet. `<details>` gets the
toggle and the keyboard for free today, and `src/js/nav.js` adds the two things
it does not do: close on outside click, and close on Escape with focus
returned. **Both are optional** — leave the file out and the dropdown still
opens, closes and tabs correctly.

**Only one opens at a time.** Two open panels in one bar is a state nobody
asked for and a layout that overlaps itself.

The panel animates in with `@starting-style`, which is the one mechanism that
can transition an element out of `display: none` without JavaScript — and a
`<details>` panel has no "opening" class to hook onto, because it does not
exist until it is open.

## With icons

An icon is optional and inherits the link's colour and size, so a nav with icons
and a nav without are the same component — not two.

:::demo
<header class="navbar navbar-bordered hairline rounded-lg">
  <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>
  <nav class="navbar__nav" aria-label="Main">
    <a class="navbar__link" href="#i" aria-current="page"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-play"/></svg>Watch</a>
    <a class="navbar__link" href="#i"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-file"/></svg>Docs</a>
    <a class="navbar__link" href="#i"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-code"/></svg>Build</a>
  </nav>
  <div class="navbar__actions">
    <button class="btn btn-outline btn-sm btn-icon" type="button" aria-label="Search"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-search"/></svg></button>
    <span class="avatar avatar-sm">S</span>
  </div>
</header>
:::

Those are [Swarnil Icons](https://icons.imswarnil.com) — the same 24 grid and
1.5 stroke, so they sit at the same weight as the text beside them.

## Menus, in the bar

The [menu components](/dropdown.html) have their own page. This is what they
look like **in a navbar**, which is the only place most of them ever appear —
a dropdown on one item, a mega panel on another, both opened by the platform's
popover and closed by Escape without a line of JavaScript.

:::demo Click "Watch" for a dropdown, "Learn" for the mega panel
<header class="navbar navbar-bordered rounded-lg">
  <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>
  <nav class="navbar__nav" aria-label="Main">
    <a class="navbar__link" href="#i" aria-current="page">Home</a>
    <button class="navbar__link" type="button" popovertarget="nb-watch" aria-expanded="false">Watch <svg class="icon icon-xs" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-down"/></svg></button>
    <button class="navbar__link" type="button" popovertarget="nb-learn" aria-expanded="false">Learn <svg class="icon icon-xs" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-down"/></svg></button>
    <a class="navbar__link" href="#i">Blog</a>
  </nav>
  <div class="navbar__actions">
    <a class="btn btn-primary btn-sm" href="#i">Subscribe</a>
  </div>

  <div class="menu" id="nb-watch" popover>
    <p class="menu__label">Collections</p>
    <a class="menu__item" href="#i"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg> Latest episodes</a>
    <a class="menu__item" href="#i"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-film"/></svg> Series</a>
    <a class="menu__item" href="#i"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-video"/></svg> Shorts <span class="menu__kbd">64</span></a>
    <div class="menu__sep" role="separator"></div>
    <a class="menu__item" href="#i"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-external-link"/></svg> On YouTube</a>
  </div>

  <div class="menu menu-mega" id="nb-learn" popover>
    <div class="menu-mega__grid">
      <div class="menu-mega__col">
        <p class="menu-mega__title">Courses</p>
        <a class="menu-mega__item" href="#i"><span class="menu-mega__ico"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-folder"/></svg></span><span><span class="menu-mega__title">CRM Analytics</span><span class="menu-mega__desc">Twelve lessons, from an empty org.</span></span></a>
        <a class="menu-mega__item" href="#i"><span class="menu-mega__ico"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-camera"/></svg></span><span><span class="menu-mega__title">Lighting a talking head</span><span class="menu-mega__desc">One light, one wall, six lessons.</span></span></a>
      </div>
      <div class="menu-mega__col">
        <p class="menu-mega__title">Free</p>
        <a class="menu-mega__item" href="#i"><span class="menu-mega__ico"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-book"/></svg></span><span><span class="menu-mega__title">The design system</span><span class="menu-mega__desc">Every token and class, documented.</span></span></a>
        <a class="menu-mega__item" href="#i"><span class="menu-mega__ico"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-terminal"/></svg></span><span><span class="menu-mega__title">Snippets</span><span class="menu-mega__desc">The bits I paste into everything.</span></span></a>
      </div>
    </div>
    <div class="menu-mega__foot"><span class="t-small t-muted">11,400 students so far</span><a class="btn btn-outline btn-sm" href="#i">All six courses</a></div>
  </div>
</header>
:::

A `<button popovertarget>` in the nav opens either one. The bar does not know
which — that is the whole wiring, and it is why a dropdown and a mega panel are
the same amount of work.

## The hamburger

Three lines that become a cross. The middle one fades while the outer two
travel and rotate — animated with `translate` and `rotate` rather than
`transform`, so neither declaration overwrites the other.

The state is `aria-expanded` on the button, so the animation and the screen
reader are reading the **same** attribute. There is no `.is-open` class that
can disagree with the accessibility tree.

:::demo `.navbar-burger` keeps the burger at every width, so it is visible here. Click it.
<header class="navbar navbar-burger navbar-bordered rounded-lg">
  <button class="navbar__burger" type="button" popovertarget="nb-drawer" aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
  <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>
  <div class="navbar__actions"><a class="btn btn-primary btn-sm" href="#i">Subscribe</a></div>

  <div class="sheet" id="nb-drawer" popover>
    <div class="sheet__head">
      <button class="btn btn-quiet btn-sm btn-icon" type="button" popovertarget="nb-drawer" popovertargetaction="hide" aria-label="Close"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button>
      <span class="navbar__brand"><span class="dot dot-accent"></span> Swarnil</span>
    </div>
    <div class="sheet__body">
      <div class="sheet__group">
        <a class="sheet__link" href="#i" aria-current="page"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-home"/></svg>Home</a>
        <a class="sheet__link" href="#i"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg>Video<span class="sheet__count">128</span></a>
        <a class="sheet__link" href="#i"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-file"/></svg>Blog<span class="sheet__count">214</span></a>
        <a class="sheet__link" href="#i"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-folder"/></svg>Courses<span class="sheet__count">6</span></a>
      </div>
      <div class="sheet__group">
        <p class="sheet__label">Elsewhere</p>
        <a class="sheet__link" href="#i"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-video"/></svg>YouTube</a>
        <a class="sheet__link" href="#i"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-code"/></svg>GitHub</a>
      </div>
    </div>
    <p class="sheet__foot">Built on the Swarnil Design System</p>
  </div>
</header>
:::

```css
.navbar__burger[aria-expanded='true'] > span:nth-child(1) { translate: 0 6.5px;  rotate:  45deg; }
.navbar__burger[aria-expanded='true'] > span:nth-child(2) { opacity: 0; }
.navbar__burger[aria-expanded='true'] > span:nth-child(3) { translate: 0 -6.5px; rotate: -45deg; }
```

`nav.js` mirrors the popover's own state onto `aria-expanded` — that is the
**only** thing it does for the burger. Without the script the drawer still
opens and closes, because it is a popover; it just does not animate the
three lines.

## The drawer

The hamburger's panel: full height, sections separated by rules, 44px rows, and
the active row marked with a dot. It is a popover too, so Escape and
click-outside are free, and it slides using `@starting-style` rather than a
class the JavaScript has to add and remove.

:::demo Open it, then press Escape or click outside
<header class="navbar navbar-bordered hairline rounded-lg">
  <button class="navbar__burger" type="button" popovertarget="demo-sheet" aria-expanded="false" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
  <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>

  <div class="sheet" id="demo-sheet" popover>
    <div class="sheet__head">
      <button class="btn btn-quiet btn-sm btn-icon" type="button" popovertarget="demo-sheet" popovertargetaction="hide" aria-label="Close">
        <svg class="icon icon-sm"><use href="/icons/sprite.svg#i-x"/></svg>
      </button>
      <span class="navbar__brand"><span class="dot dot-accent"></span> Swarnil</span>
    </div>
    <div class="sheet__body">
      <div class="sheet__group">
        <a class="sheet__link" href="#i" aria-current="page"><svg class="icon"><use href="/icons/sprite.svg#i-play"/></svg>Watch<span class="sheet__count">128</span></a>
        <a class="sheet__link" href="#i"><svg class="icon"><use href="/icons/sprite.svg#i-file"/></svg>Learn<span class="sheet__count">14</span></a>
        <a class="sheet__link" href="#i"><svg class="icon"><use href="/icons/sprite.svg#i-code"/></svg>Build<span class="sheet__count">31</span></a>
      </div>
      <div class="sheet__group">
        <p class="sheet__label">Library</p>
        <a class="sheet__link" href="#i"><svg class="icon"><use href="/icons/sprite.svg#i-bookmark"/></svg>Saved</a>
        <a class="sheet__link" href="#i"><svg class="icon"><use href="/icons/sprite.svg#i-clock"/></svg>History</a>
      </div>
    </div>
    <p class="sheet__foot">MIT &middot; built in the open</p>
  </div>

  <div class="navbar__actions">
    <span class="avatar avatar-sm">S</span>
  </div>
</header>
:::

Hit the **320px** toggle above and the burger appears while the inline nav
hides. That is the one media query in the navbar, and it is correct there: a
navbar collapsing is a *page* decision, not a component one. Everything else in
this system uses container queries.

## Variants

| Class | Does |
| --- | --- |
| `navbar-sticky` | pins to the top of the viewport |
| `navbar-bordered` | a hairline under the bar |
| `navbar-blur` | translucent, but only once `[data-scrolled]` is set |
| `navbar-transparent` | no background at the top, solid once scrolled |
| `navbar-centered` | brand left, nav centred, actions right |
| `navbar-tall` | 4.5rem instead of 3.5rem |
| `navbar-inverse` | ink and paper flipped |
| `navbar-hide-on-scroll` | hides going down, returns going up |

:::demo Inverse and tall
<header class="navbar navbar-inverse navbar-tall rounded-lg">
  <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>
  <nav class="navbar__nav" aria-label="Main">
    <a class="navbar__link" href="#i" aria-current="page">Watch</a>
    <a class="navbar__link" href="#i">Learn</a>
  </nav>
  <div class="navbar__actions">
    <button class="btn btn-primary btn-sm" type="button">Subscribe</button>
  </div>
</header>
:::

## State

Nothing here is a class you have to keep in sync:

| Attribute | Set by | Means |
| --- | --- | --- |
| `aria-current="page"` | you | which link you are on |
| `aria-expanded` | `nav.js` | the burger is open |
| `data-scrolled` | `nav.js` | the bar has left the top |
| `data-dir` | `nav.js` | last meaningful scroll direction |
| `:popover-open` | the browser | the panel is open |

`nav.js` uses a 6px direction threshold and an 80px floor. Without the
threshold, trackpad jitter flips the direction constantly and a hide-on-scroll
bar flickers; without the floor, the bar can vanish while you are still looking
at the top of the page.

## Properties

| Variable | Does |
| --- | --- |
| `--navbar-h` | bar height |
| `--navbar-bg` | background |
| `--navbar-pad` | inline padding |
| `--menu-w` | dropdown width |
| `--mega-col` | minimum mega-panel column width |
| `--sheet-w` | drawer width |

## Accessibility

- The burger is a real `<button>` with `aria-expanded` and an `aria-label`.
- The drawer and dropdowns are popovers, so focus returns to the trigger on
  close and Escape works without a keydown listener.
- Drawer rows are 44px — a drawer is a touch target by definition.
- Under reduced motion the panels still open; they just stop travelling.
