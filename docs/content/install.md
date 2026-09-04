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

## The fonts

The fonts are the only external dependency, and even they are a choice. Point the
three family tokens anywhere you like and drop the `<link>`.

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
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
