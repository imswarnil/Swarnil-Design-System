---
title: Installation
group: Start
order: 20
lead: Three lines, any stack. The whole integration is a link tag.
---

## From a CDN

The fastest way to try it. Nothing to install.

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@imswarnil/swarnil-design/dist/swarnil-design.min.css">
```

## From npm

```bash
npm install @imswarnil/swarnil-design
```

```css
@import "@imswarnil/swarnil-design";
```

## Take less than all of it

The system is layered, and each layer is its own entry point. Import the foundation
alone if you only want the tokens and intend to write your own components.

```css
@import "@imswarnil/swarnil-design/foundation";   /* tokens only */
@import "@imswarnil/swarnil-design/elements";
@import "@imswarnil/swarnil-design/components";
```

## The broadcast bundle

Thumbnails, scenes, lower thirds and stream widgets live in a second bundle,
so a website never pays for them. It contains everything the web bundle does
plus the [creator layer](/canvas.html). Load it in OBS as a browser source, or
in the page that renders your thumbnails.

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@imswarnil/swarnil-design/dist/swarnil-broadcast.min.css">
```

```css
@import "@imswarnil/swarnil-design/broadcast";
```

## The fonts

The fonts are the only external dependency, and even they are a choice. Two
families, not three — Inter does display and body alike. Point the family tokens
anywhere you like and drop the `<link>`.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
      rel="stylesheet">
```

```css
:root {
  --font-display: "Your Display Face", sans-serif;
  --font-body:    "Your Body Face", sans-serif;
  --font-mono:    "Your Mono", monospace;
}
```

## Overriding anything

Every rule in the system lives inside a cascade layer. Your own stylesheet declares no
layer, and **unlayered CSS beats every layer** — so your overrides win with zero
specificity fights and no `!important`.

```css
/* This wins. It is one class deep and it is not in a layer. */
.card { --card-pad: 2rem; }
```

That is the entire customisation API. There is no configuration file.

## The four bundles

The package ships four stylesheets. Each is complete on its own, so you load
exactly one.

| Bundle | Contains | For | gzip |
| --- | --- | --- | --- |
| `swarnil-design.css` | tokens, elements, components, patterns, sections, utilities | a website | 49 KB |
| `swarnil-broadcast.css` | + canvases, scenes, lower thirds, stream widgets, thumbnails | OBS, thumbnail rendering | 54 KB |
| `swarnil-framework.css` | + the [twelve-column grid](/framework.html) and responsive utilities | porting from Bootstrap | 57 KB |
| `swarnil-design-bulma.css` | + the **Bulma base** underneath the whole system | a Bulma layout API under our components | 78 KB |

```html
<link rel="stylesheet" href=".../dist/swarnil-design.min.css">
```
```css
@import "@imswarnil/swarnil-design";            /* the web bundle      */
@import "@imswarnil/swarnil-design/broadcast";  /* + the creator layer */
@import "@imswarnil/swarnil-design/framework";  /* + the 12-col grid   */
@import "@imswarnil/swarnil-design/bulma";      /* + the Bulma base    */
```

Gzipped, the framework bundle is about 2 KB more than the base one — a
repetitive grid compresses almost to nothing, which is the one genuinely good
argument for shipping the whole twelve columns rather than a subset.

## The Bulma base

`swarnil-design-bulma.css` puts [Bulma](https://bulma.io) **underneath** this
system rather than beside it. You get Bulma's layout API — `.container`,
`.columns`/`.column`, `.grid`, `.section`, `.level`, `.media` — with every
component on this site sitting on top of it.

**The cascade does the arbitration, not you.** `bulma` is the first name in the
layer order, which makes it the lowest layer in the document:

```css
@layer bulma, reset, tokens, elements, components, patterns, sections, theme,
	tailwind, utilities;
```

A layer declared earlier loses to every layer after it. So where Bulma and this
system define the same class — and there are two dozen: `.card`, `.navbar`,
`.table`, `.input`, `.hero`, `.footer`, `.breadcrumb`, `.content`, `.tabs`,
`.tag`, `.menu`, `.modal`, `.pagination`, `.progress`, `.select`, `.icon` —
**ours wins, every time**, with no specificity fight and no `!important` on
either side. Bulma is the floor: it catches what this system has not built, and
overrides nothing it has.

### It wears our tokens

`src/0-bulma/bridge.css` points Bulma's own custom properties at ours, so the
base follows the theme toggle without knowing a theme toggle exists:

```css
--bulma-scheme-main: var(--bg-canvas);
--bulma-text: var(--fg-muted);
--bulma-border: var(--line-default);
--bulma-primary: var(--accent);
--bulma-family-primary: var(--font-body);
--bulma-column-gap: var(--space-4);
```

The composed variable is overridden, not the HSL parts Bulma builds it from.
That matters: this palette is OKLCH and every token is already a `light-dark()`
pair, so decomposing it into Bulma's `h`/`s`/`l` triplets would cost a build
step and a colour-accuracy loss for nothing. CSS does not care what space a
custom property resolves to.

`.column` therefore takes its gutter from `--space-4`, not from Bulma's
`0.75rem`, and a Bulma grid lines up with everything else on the page.

### What is in it, and what is not

Compiled from Bulma's Sass rather than taken from its 691 KB prebuilt file:
**utilities, themes, base and the layout primitives only.** Its elements,
components and form controls are left out — this system already builds those,
so shipping Bulma's would be ~39 KB gzipped of CSS that loses every cascade it
takes part in. To take all of Bulma instead, add one line to
`src/bulma-base.scss` and rebuild.

### Which bundle should I use?

Use the plain one. `swarnil-design.css` is the default, it is
**dependency-free**, and nothing in this system reads a `--bulma-*` variable —
the relationship is one-way, so removing the base layer changes nothing above
it. Reach for the Bulma bundle when you are porting a page that already speaks
`.columns`/`.column`, or when you want that layout API and our components in
one stylesheet.
