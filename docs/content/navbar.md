---
title: Navbar
group: Components
order: 30
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
<header class="navbar navbar-bordered u-border u-rounded-lg">
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

## With icons

An icon is optional and inherits the link's colour and size, so a nav with icons
and a nav without are the same component — not two.

:::demo
<header class="navbar navbar-bordered u-border u-rounded-lg">
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

## Menus

Dropdowns, the hover menu, the account menu and the mega panel have [their own
page](/dropdown.html) — this page stays about the bar itself.

## The drawer

The hamburger's panel: full height, sections separated by rules, 44px rows, and
the active row marked with a dot. It is a popover too, so Escape and
click-outside are free, and it slides using `@starting-style` rather than a
class the JavaScript has to add and remove.

:::demo Open it, then press Escape or click outside
<header class="navbar navbar-bordered u-border u-rounded-lg">
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
<header class="navbar navbar-inverse navbar-tall u-rounded-lg">
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
