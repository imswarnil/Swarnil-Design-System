---
title: Content
group: Elements
order: 5
lead: Headings, paragraphs, quotes, lists — what raw HTML looks like here before any class arrives.
---

Long-form content should need **no classes at all**: wrap it in `.prose` and
every elementary tag is already designed. This page is that contract, shown.

## Headings and body

:::demo
<article class="prose prose-tight">
  <h2>A section heading</h2>
  <p>Body copy at 17px with a 66ch measure and relaxed leading — roughly ten
  words a line, which is where reading speed peaks. Emphasis is
  <strong>semibold ink</strong>, links are <a href="#i">the accent, underlined</a>,
  and inline code is <code>--accent</code> in the mono voice.</p>
  <h3>A subsection</h3>
  <p>The heading above sits closer to this paragraph than to the previous one —
  it belongs to what follows. That single asymmetry is most of what separates
  typeset text from stacked text.</p>
</article>
:::

## Quotes

:::demo
<article class="prose prose-tight">
  <blockquote>A rule that is not executable is a wish.</blockquote>
  <p>The accent rule on the left is the only chrome a quote gets — the words
  carry the weight, larger and in full ink.</p>
</article>
:::

## Lists

:::demo
<article class="prose prose-tight">
  <ul>
    <li>Unordered markers take the faint colour, so the text leads</li>
    <li>Rhythm between items is a fraction of the prose rhythm</li>
    <li>Nesting inherits everything</li>
  </ul>
  <ol>
    <li>Ordered lists count in the same voice</li>
    <li>Nothing to configure</li>
  </ol>
</article>
:::

## The rest of the elementary set

:::demo
<article class="prose prose-tight">
  <p>Keyboard input is <kbd class="kbd">⌘</kbd><kbd class="kbd">S</kbd>, a
  deletion is <del>struck</del>, an insertion is <ins>marked</ins>, fine print
  is <small>small</small>, and an abbreviation like
  <abbr title="Cascading Style Sheets">CSS</abbr> keeps its native dotted
  underline — the browser's own affordance, left alone.</p>
  <hr />
  <p>The horizontal rule above is a hairline from the line ladder.</p>
</article>
:::

## When to leave `.prose`

The moment content stops being a document and becomes an interface — a deck of
cards, a form, a toolbar — leave `.prose` and compose with components. Prose
styling leaking into UI is the same bug as UI chrome leaking into an article,
and the child-combinator scoping in these very docs exists because we hit it.
