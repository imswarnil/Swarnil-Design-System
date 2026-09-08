---
title: Code
group: Elements
order: 50
lead: One page for every way this system renders code — the inline span, the quiet block with syntax highlighting, and the screen, in four dresses including a CRT.
---

There are three, and choosing between them is choosing how loud the code is.

| | What it is | Layer | When |
| --- | --- | --- | --- |
| `.code` | an inline span | elements | a property name inside a sentence |
| `.codeblock` | the quiet block | elements | code inside an article, with the prose around it |
| `.codeplayer` | the screen | components | code as the subject — a landing page, a lesson |

They share one vocabulary. The `.tok-*` syntax classes are the same in all
three, so a highlighter emits one set of spans and the dress decides what they
look like. That is the whole reason there are three dresses and not three
components.

## Inline

`.code` is a span, and it is the only one of the three that may appear inside a
sentence.

:::demo
<p>Override <code class="code">--accent</code> after the import and the whole
system follows. The step below it is <code class="code code-accent">--accent-hover</code>,
which the button reads on its own.</p>
:::

## The quiet block

`.codeblock` belongs in an article. It carries a language, an optional
filename, a copy button, optional line numbers, a highlighted line and a diff —
and it does all of it without pretending to be hardware.

:::demo A block with a filename, line numbers and one highlighted line
<figure class="codeblock codeblock-ln">
  <figcaption class="codeblock__head">
    <span class="codeblock__file">src/1-foundation/01-color.css</span>
    <span class="codeblock__lang">CSS</span>
    <button class="codeblock__copy" type="button" data-copy>Copy</button>
  </figcaption>
  <pre class="codeblock__pre"><code><span class="codeblock__ln"><span class="tok-com">/* tier two names what a step is FOR */</span></span><span class="codeblock__ln"><span class="tok-sel">:root</span> <span class="tok-punc">{</span></span><span class="codeblock__ln" data-hl>  <span class="tok-prop">--fg-muted</span><span class="tok-punc">:</span> <span class="tok-fn">light-dark</span><span class="tok-punc">(</span><span class="tok-str">var(--ink-600)</span><span class="tok-punc">,</span> <span class="tok-str">var(--ink-400)</span><span class="tok-punc">);</span></span><span class="codeblock__ln">  <span class="tok-prop">--line-subtle</span><span class="tok-punc">:</span> <span class="tok-str">var(--ink-200)</span><span class="tok-punc">;</span></span><span class="codeblock__ln"><span class="tok-punc">}</span></span></code></pre>
</figure>
:::

:::demo A diff. `data-diff` swaps the counter for a + or a −, because a diff line has no number to give.
<figure class="codeblock codeblock-ln codeblock-sm">
  <figcaption class="codeblock__head">
    <span class="codeblock__lang">Diff</span>
    <button class="codeblock__copy" type="button" data-copy>Copy</button>
  </figcaption>
  <pre class="codeblock__pre"><code><span class="codeblock__ln"><span class="tok-sel">.btn</span> <span class="tok-punc">{</span></span><span class="codeblock__ln" data-diff="del">  <span class="tok-prop">transition</span><span class="tok-punc">:</span> <span class="tok-str">all 200ms</span><span class="tok-punc">;</span></span><span class="codeblock__ln" data-diff="add">  <span class="tok-prop">transition</span><span class="tok-punc">:</span> <span class="tok-str">var(--t-colors)</span><span class="tok-punc">;</span></span><span class="codeblock__ln"><span class="tok-punc">}</span></span></code></pre>
</figure>
:::

`.codeblock-dark` forces the dark screen on a light page. `.codeblock-wrap`
wraps long lines instead of scrolling; `.codeblock-scroll` caps the height at
24rem. `.codeline` is the one-liner: a command with its own copy button and no
chrome at all.

:::demo Wrapping, dark, and the one-line command
<div class="stack">
  <figure class="codeblock codeblock-dark codeblock-wrap codeblock-sm">
    <figcaption class="codeblock__head"><span class="codeblock__lang">Shell</span><button class="codeblock__copy" type="button" data-copy>Copy</button></figcaption>
    <pre class="codeblock__pre"><code><span class="codeblock__ln"><span class="tok-com"># wraps rather than scrolling, because a command you cannot see the end of is a command you will get wrong</span></span><span class="codeblock__ln">npx <span class="tok-fn">postcss</span> src/index.css <span class="tok-punc">-o</span> dist/swarnil-design.css <span class="tok-punc">--env</span> production</span></code></pre>
  </figure>
  <p class="codeline"><code>npm install @imswarnil/swarnil-design</code><button class="codeline__copy" type="button" data-copy>Copy</button></p>
  <figure class="codeblock codeblock-scroll codeblock-ln codeblock-sm">
    <figcaption class="codeblock__head"><span class="codeblock__lang">CSS</span><button class="codeblock__copy" type="button" data-copy>Copy</button></figcaption>
    <pre class="codeblock__pre"><code><span class="codeblock__ln"><span class="tok-sel">.a</span> <span class="tok-punc">{</span> <span class="tok-prop">color</span><span class="tok-punc">:</span> <span class="tok-str">var(--fg-default)</span> <span class="tok-punc">}</span></span><span class="codeblock__ln"><span class="tok-sel">.b</span> <span class="tok-punc">{</span> <span class="tok-prop">color</span><span class="tok-punc">:</span> <span class="tok-str">var(--fg-muted)</span> <span class="tok-punc">}</span></span><span class="codeblock__ln"><span class="tok-sel">.c</span> <span class="tok-punc">{</span> <span class="tok-prop">color</span><span class="tok-punc">:</span> <span class="tok-str">var(--fg-faint)</span> <span class="tok-punc">}</span></span><span class="codeblock__ln"><span class="tok-sel">.d</span> <span class="tok-punc">{</span> <span class="tok-prop">color</span><span class="tok-punc">:</span> <span class="tok-str">var(--fg-subtle)</span> <span class="tok-punc">}</span></span><span class="codeblock__ln"><span class="tok-sel">.e</span> <span class="tok-punc">{</span> <span class="tok-prop">color</span><span class="tok-punc">:</span> <span class="tok-str">var(--fg-accent)</span> <span class="tok-punc">}</span></span><span class="codeblock__ln"><span class="tok-sel">.f</span> <span class="tok-punc">{</span> <span class="tok-prop">color</span><span class="tok-punc">:</span> <span class="tok-str">var(--fg-link)</span> <span class="tok-punc">}</span></span></code></pre>
  </figure>
</div>
:::

## The syntax vocabulary

Ten classes, and they are the same ten in every dress. A highlighter — Prism,
Shiki, `highlight.js`, or forty lines of your own — only has to emit these.

:::demo Every token, in the quiet block and on the screen
<div class="switcher">
  <figure class="codeblock codeblock-sm">
    <figcaption class="codeblock__head"><span class="codeblock__lang">Tokens</span></figcaption>
    <pre class="codeblock__pre"><code><span class="codeblock__ln"><span class="tok-com">// tok-com</span></span><span class="codeblock__ln"><span class="tok-key">const</span> <span class="tok-var">take</span> <span class="tok-punc">=</span> <span class="tok-fn">record</span><span class="tok-punc">(</span><span class="tok-str">'48'</span><span class="tok-punc">,</span> <span class="tok-num">24</span><span class="tok-punc">);</span></span><span class="codeblock__ln"><span class="tok-punc">&lt;</span><span class="tok-tag">video</span> <span class="tok-attr">muted</span><span class="tok-punc">&gt;</span></span><span class="codeblock__ln"><span class="tok-sel">.card</span> <span class="tok-punc">{</span> <span class="tok-prop">gap</span><span class="tok-punc">:</span> <span class="tok-num">8px</span> <span class="tok-punc">}</span></span></code></pre>
  </figure>
  <div class="stack stack-sm">
    <p class="t-small"><code class="code">tok-com</code> comment · <code class="code">tok-key</code> keyword · <code class="code">tok-str</code> string · <code class="code">tok-num</code> number · <code class="code">tok-fn</code> function · <code class="code">tok-var</code> variable · <code class="code">tok-tag</code> tag · <code class="code">tok-attr</code> attribute · <code class="code">tok-sel</code> selector · <code class="code">tok-prop</code> property · <code class="code">tok-punc</code> punctuation</p>
    <p class="t-small t-muted">Structure keeps the accent; everything else is a step of the same light. A rainbow is not comprehension — it is a legend nobody was given.</p>
  </div>
</div>
:::

## The screen

`.codeplayer` is the loud one. It belongs on a landing page, in a lesson, or
anywhere the code is the subject rather than a footnote.

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
| `.codeplayer-crt` | the monitor: curved glass, green phosphor, heavy bloom |
| `.codeplayer-flicker` | the tube is not quite happy — brightness wavers, a band rolls |

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

## The monitor

`.codeplayer-crt` is the full television: the glass bulges, the corners round
harder than the bezel, the phosphor blooms toward the middle and everything is
slightly green, because that is what P1 phosphor was.

The curve is `border-radius` and a radial inset shadow — **not** a 3D
transform. A transform would fight text rendering at every zoom level and blur
the code, which is the one thing a code block may not do. So the glass is faked
at the edges and left alone in the middle, where the reading happens.

:::demo `.codeplayer-crt`
<figure class="codeplayer codeplayer-crt codeplayer-ln">
  <figcaption class="codeplayer__bar">
    <span class="codeplayer__lang">Shell</span>
    <button class="codeplayer__copy" type="button" data-copy>Copy</button>
  </figcaption>
  <div class="codeplayer__screen">
    <pre class="codeplayer__pre"><code><span class="codeplayer__ln"><span class="tok-com"># SWARNIL DESIGN SYSTEM · v0.4.0</span></span><span class="codeplayer__ln">$ npm run build</span><span class="codeplayer__ln"><span class="tok-str">built 64 doc pages + home -&gt; site/</span></span><span class="codeplayer__ln">$ npm run size</span><span class="codeplayer__ln"><span class="tok-str">gzipped: 47.1 KB</span></span></code></pre>
  </div>
</figure>
:::

:::demo `.codeplayer-flicker` on top of it — two motions, both mean on purpose
<figure class="codeplayer codeplayer-crt codeplayer-flicker codeplayer-ln codeplayer-sm">
  <figcaption class="codeplayer__bar">
    <span class="codeplayer__lang">SAQL</span>
    <button class="codeplayer__copy" type="button" data-copy>Copy</button>
  </figcaption>
  <div class="codeplayer__screen">
    <pre class="codeplayer__pre"><code><span class="codeplayer__ln"><span class="tok-com">-- aggregate first, then join</span></span><span class="codeplayer__ln">q <span class="tok-punc">=</span> <span class="tok-fn">load</span> <span class="tok-str">"opportunity_lines"</span><span class="tok-punc">;</span></span><span class="codeplayer__ln">q <span class="tok-punc">=</span> <span class="tok-fn">group</span> q <span class="tok-key">by</span> <span class="tok-str">'opportunity_id'</span><span class="tok-punc">;</span></span></code></pre>
  </div>
</figure>
:::

The flicker is ambient motion **on a block of text**, which is the most
annoying place to put any. So the budget is deliberately mean: 6% of
brightness, and a band that takes eight seconds to cross. Anything more and the
code stops being readable, which would be a decorative effect defeating the
component it decorates. Under `prefers-reduced-motion` both are off.

## The copy button is old hardware

Square, bevelled, and it travels one pixel when you press it. The bevel is two
inset shadows rather than a border image, so it costs nothing and inverts
cleanly between themes.

It is **styled here and wired elsewhere.** The stylesheet cannot copy anything,
and an inert button is more honest than one that lies about what it does.

## Notes

- All three dresses read the same `.tok-*` classes, so one highlighter
  feeds all of them. Structure keeps the accent; everything else is a step of the same
  light. A rainbow is not comprehension.
- `.codeplayer__screen` spends `::before` on the scanlines and `::after` on the
  bloom. Both pseudo-elements are free on `.codeplayer__pre`.
- The bar holds a language name and a copy button. That is the whole chrome.
  An earlier draft had a power lamp and an on/off CRT strike; both were
  theatre, and theatre a reader has to click through to reach the code is a
  tax rather than a feature. The screen is simply on.
