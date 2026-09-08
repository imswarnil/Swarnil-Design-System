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

## The three bundles

The package ships three stylesheets. Each contains the one before it, so you
load exactly one.

| Bundle | Contains | For |
| --- | --- | --- |
| `swarnil-design.css` | tokens, elements, components, patterns, sections, utilities | a website |
| `swarnil-broadcast.css` | + canvases, scenes, lower thirds, stream widgets, thumbnails | OBS, thumbnail rendering |
| `swarnil-framework.css` | + the [twelve-column grid](/framework.html) and responsive utilities | porting from Bootstrap or Bulma |

```html
<link rel="stylesheet" href=".../dist/swarnil-design.min.css">
```
```css
@import "@imswarnil/swarnil-design";            /* the web bundle    */
@import "@imswarnil/swarnil-design/broadcast";  /* + the creator layer */
@import "@imswarnil/swarnil-design/framework";  /* + the 12-col grid   */
```

Gzipped, the framework bundle is about 2 KB more than the base one — a
repetitive grid compresses almost to nothing, which is the one genuinely good
argument for shipping the whole twelve columns rather than a subset.
