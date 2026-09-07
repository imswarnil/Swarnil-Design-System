---
title: Code player
group: Components
order: 340
lead: A code block dressed as the thing it is — a screen. A language name, a copy button, and three dresses.
---

`.codeblock` on the [code page](/content.html) is the quiet one: it belongs
inside a paragraph of prose and gets out of the way. This is the loud one. It
belongs on a landing page, in a lesson, or anywhere the code is the subject
rather than a footnote.

The argument is short. Code on a website is already a picture of a terminal —
pretending otherwise is what produces the beige box with a grey border that
every docs site has. The system's visual language is the camera, so a block of
code becomes **the monitor on the rig** rather than a card with a monospace
font. It reads as a screen before it is read as text, which is the job.

:::demo The full set — bezel, scanlines, phosphor bloom
<figure class="codeplayer codeplayer-ln">
  <figcaption class="codeplayer__bar">
    <span class="codeplayer__lang">CSS</span>
    <button class="codeplayer__copy" type="button" data-copy>Copy</button>
  </figcaption>
  <div class="codeplayer__screen">
    <pre class="codeplayer__pre"><code><span class="codeplayer__ln"><span class="tok-com">/* three variables, whole rebrand */</span></span><span class="codeplayer__ln"><span class="tok-sel">:root</span> <span class="tok-punc">{</span></span><span class="codeplayer__ln">  <span class="tok-prop">--accent</span><span class="tok-punc">:</span> <span class="tok-str">oklch(63% 0.19 34)</span><span class="tok-punc">;</span></span><span class="codeplayer__ln">  <span class="tok-prop">--radius-md</span><span class="tok-punc">:</span> <span class="tok-num">8px</span><span class="tok-punc">;</span></span><span class="codeplayer__ln">  <span class="tok-prop">--font-body</span><span class="tok-punc">:</span> <span class="tok-str">'Inter'</span><span class="tok-punc">;</span></span><span class="codeplayer__ln"><span class="tok-punc">}</span></span></code></pre>
  </div>
</figure>
:::

## Three dresses, one skeleton

All three take the same markup and the same parts. Only four local variables are
remapped, which is why a variant is about eight lines rather than a second
component.

| Class | What changes |
| --- | --- |
| `.codeplayer` | the full set — bezel, scanlines, phosphor bloom |
| `.codeplayer-flat` | plain black screen, no scanlines |
| `.codeplayer-light` | the screen is paper instead of phosphor |

:::demo Flat — the sample without the set dressing
<figure class="codeplayer codeplayer-flat">
  <figcaption class="codeplayer__bar">
    <span class="codeplayer__lang">Shell</span>
    <button class="codeplayer__copy" type="button" data-copy>Copy</button>
  </figcaption>
  <div class="codeplayer__screen">
    <pre class="codeplayer__pre"><code><span class="codeplayer__ln"><span class="tok-com"># one link, no build step</span></span><span class="codeplayer__ln">npm install <span class="tok-str">@imswarnil/swarnil-design</span></span></code></pre>
  </div>
</figure>
:::

:::demo Light — same block, paper screen
<figure class="codeplayer codeplayer-light codeplayer-ln">
  <figcaption class="codeplayer__bar">
    <span class="codeplayer__lang">HTML</span>
    <button class="codeplayer__copy" type="button" data-copy>Copy</button>
  </figcaption>
  <div class="codeplayer__screen">
    <pre class="codeplayer__pre"><code><span class="codeplayer__ln"><span class="tok-punc">&lt;</span><span class="tok-tag">link</span> <span class="tok-attr">rel</span><span class="tok-punc">=</span><span class="tok-str">"stylesheet"</span></span><span class="codeplayer__ln">      <span class="tok-attr">href</span><span class="tok-punc">=</span><span class="tok-str">"swarnil-design.css"</span><span class="tok-punc">&gt;</span></span></code></pre>
  </div>
</figure>
:::

## Line numbers and a highlighted line

`.codeplayer-ln` turns the numbers on. They come from a CSS counter, so they
cannot drift from the lines the way a hand-written column does. `data-hl` on a
`.codeplayer__ln` marks the line the paragraph is talking about.

:::demo
<figure class="codeplayer codeplayer-ln codeplayer-sm">
  <figcaption class="codeplayer__bar">
    <span class="codeplayer__lang">CSS</span>
    <button class="codeplayer__copy" type="button" data-copy>Copy</button>
  </figcaption>
  <div class="codeplayer__screen">
    <pre class="codeplayer__pre"><code><span class="codeplayer__ln"><span class="tok-sel">.card</span> <span class="tok-punc">{</span></span><span class="codeplayer__ln">  <span class="tok-prop">background</span><span class="tok-punc">:</span> <span class="tok-str">var(--bg-surface)</span><span class="tok-punc">;</span></span><span class="codeplayer__ln" data-hl>  <span class="tok-prop">border-radius</span><span class="tok-punc">:</span> <span class="tok-str">var(--radius-lg)</span><span class="tok-punc">;</span></span><span class="codeplayer__ln">  <span class="tok-prop">padding</span><span class="tok-punc">:</span> <span class="tok-str">var(--space-5)</span><span class="tok-punc">;</span></span><span class="codeplayer__ln"><span class="tok-punc">}</span></span></code></pre>
  </div>
</figure>
:::

`.codeplayer-sm` drops the type a step. `.codeplayer-scroll` caps the screen at
24rem and scrolls inside it, for a sample too long to be worth its full height.

:::demo Scrolling, capped at 24rem
<figure class="codeplayer codeplayer-scroll codeplayer-ln">
  <figcaption class="codeplayer__bar">
    <span class="codeplayer__lang">CSS</span>
    <button class="codeplayer__copy" type="button" data-copy>Copy</button>
  </figcaption>
  <div class="codeplayer__screen">
    <pre class="codeplayer__pre"><code><span class="codeplayer__ln"><span class="tok-sel">.a</span> <span class="tok-punc">{</span> <span class="tok-prop">color</span><span class="tok-punc">:</span> <span class="tok-str">var(--fg-default)</span> <span class="tok-punc">}</span></span><span class="codeplayer__ln"><span class="tok-sel">.b</span> <span class="tok-punc">{</span> <span class="tok-prop">color</span><span class="tok-punc">:</span> <span class="tok-str">var(--fg-muted)</span> <span class="tok-punc">}</span></span><span class="codeplayer__ln"><span class="tok-sel">.c</span> <span class="tok-punc">{</span> <span class="tok-prop">color</span><span class="tok-punc">:</span> <span class="tok-str">var(--fg-faint)</span> <span class="tok-punc">}</span></span><span class="codeplayer__ln"><span class="tok-sel">.d</span> <span class="tok-punc">{</span> <span class="tok-prop">color</span><span class="tok-punc">:</span> <span class="tok-str">var(--fg-subtle)</span> <span class="tok-punc">}</span></span><span class="codeplayer__ln"><span class="tok-sel">.e</span> <span class="tok-punc">{</span> <span class="tok-prop">color</span><span class="tok-punc">:</span> <span class="tok-str">var(--fg-accent)</span> <span class="tok-punc">}</span></span></code></pre>
  </div>
</figure>
:::

## The copy button is old hardware

Square, bevelled, and it travels one pixel when you press it. The bevel is two
inset shadows rather than a border image, so it costs nothing and inverts
cleanly between themes.

It is **styled here and wired elsewhere.** The stylesheet cannot copy anything,
and an inert button is more honest than one that lies about what it does.

## Notes

- Syntax colours are the system's existing `.tok-*` classes, not a second
  vocabulary. Structure keeps the accent; everything else is a step of the same
  light. A rainbow is not comprehension.
- `.codeplayer__screen` spends `::before` on the scanlines and `::after` on the
  bloom. Both pseudo-elements are free on `.codeplayer__pre`.
- The bar holds a language name and a copy button. That is the whole chrome.
  An earlier draft had a power lamp and an on/off CRT strike; both were
  theatre, and theatre a reader has to click through to reach the code is a
  tax rather than a feature. The screen is simply on.
