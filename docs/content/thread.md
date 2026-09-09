---
title: Thread
group: Patterns
order: 50
lead: A comment thread and the box that adds to it — one level of nesting, the author's name in body, the time in data, liked in ARIA.
---

:::demo A thread with a reply box, one comment, and a nested reply
<section class="thread" style="max-width:40rem">
  <header class="thread__head">
    <h3 class="thread__count">14 <span>comments</span></h3>
    <button class="button is-ghost is-small" type="button">Newest first</button>
  </header>
  <form class="thread__form" action="#i">
    <label class="label" for="th-1">Add to the thread</label>
    <textarea class="input" id="th-1" placeholder="What did you think of the episode?"></textarea>
    <div class="thread__form-row">
      <span class="thread__note">Markdown works. Be kind.</span>
      <button class="button is-primary is-small" type="submit">Post</button>
    </div>
  </form>
  <ol class="thread__list">
    <li class="comment">
      <span class="comment__face"><span class="avatar">PR</span></span>
      <div class="comment__body">
        <div class="comment__head"><a class="comment__author" href="#i">Priya R.</a><span class="comment__time">2h ago</span></div>
        <div class="comment__text"><p>The bit about tabular figures replacing monospace changed how I set every table this week. Would love a follow-up on ranges.</p></div>
        <div class="comment__actions">
          <button class="comment__action" type="button" aria-pressed="false"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-heart"/></svg> 12</button>
          <button class="comment__action" type="button">Reply</button>
        </div>
        <ol class="comment__replies">
          <li class="comment comment-author">
            <span class="comment__face"><span class="avatar">S</span></span>
            <div class="comment__body">
              <div class="comment__head"><a class="comment__author" href="#i">Swarnil</a><span class="badge is-primary">Author</span><span class="comment__time">1h ago</span></div>
              <div class="comment__text"><p>Ranges are episode 13 — the en dash gets its own segment.</p></div>
              <div class="comment__actions">
                <button class="comment__action" type="button" aria-pressed="true"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-heart"/></svg> 4</button>
                <button class="comment__action" type="button">Reply</button>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </li>
  </ol>
</section>
:::

Framework-agnostic on purpose. This is the markup Ghost, Giscus and a
hand-rolled endpoint all end up needing, so the CSS commits to a shape and
nothing else — a post, a lesson, an episode and a build-log entry can all carry
it without four slightly different comment sections.

## Nesting is one level

A thread that indents five times is a thread nobody can read on a phone, and the
usual fix — shrinking the indent — makes the hierarchy invisible instead of
unreadable. A reply to a reply flattens: the rail already said *this is a
response*.

:::demo Reply, reply-to-reply, and a pinned comment
<section class="thread thread-flush" style="max-width:40rem">
  <ol class="thread__list">
    <li class="comment" data-pinned>
      <span class="comment__face"><span class="avatar">S</span></span>
      <div class="comment__body">
        <div class="comment__head"><span class="comment__author">Swarnil</span><span class="badge">Pinned</span><span class="comment__time">3d ago</span></div>
        <div class="comment__text"><p>Timestamps for every chapter are in the description. Ask about the lav mic here rather than by mail — everyone gets the answer.</p></div>
      </div>
    </li>
    <li class="comment">
      <span class="comment__face"><span class="avatar">AK</span></span>
      <div class="comment__body">
        <div class="comment__head"><span class="comment__author">Arjun K.</span><span class="comment__time">2d ago</span></div>
        <div class="comment__text"><p>Which lav did you end up on?</p></div>
        <div class="comment__actions"><button class="comment__action" type="button">Reply</button></div>
        <ol class="comment__replies">
          <li class="comment">
            <span class="comment__face"><span class="avatar">MT</span></span>
            <div class="comment__body">
              <div class="comment__head"><span class="comment__author">Mei T.</span><span class="comment__time">2d ago</span></div>
              <div class="comment__text"><p>He said at 04:12 — the one with the deadcat.</p></div>
              <ol class="comment__replies">
                <li class="comment">
                  <span class="comment__face"><span class="avatar">AK</span></span>
                  <div class="comment__body">
                    <div class="comment__head"><span class="comment__author">Arjun K.</span><span class="comment__time">1d ago</span></div>
                    <div class="comment__text"><p>Missed that, thanks. This reply sits flat — no second rail.</p></div>
                  </div>
                </li>
              </ol>
            </div>
          </li>
        </ol>
      </div>
    </li>
  </ol>
</section>
:::

## The reply box

The box under one comment is the same form, smaller. Signed out, the box is
replaced by the ask rather than disabled — a disabled form is a dead end with
no explanation attached.

:::demo
<div class="stack" style="max-width:40rem">
  <ol class="thread__list">
    <li class="comment">
      <span class="comment__face"><span class="avatar avatar-sm">JL</span></span>
      <div class="comment__body">
        <div class="comment__head"><span class="comment__author">Jo L.</span><span class="comment__time">12m ago</span></div>
        <div class="comment__text"><p>Where is the LUT from?</p></div>
        <form class="thread__form" action="#i">
          <textarea class="input" aria-label="Reply to Jo L." placeholder="Reply to Jo…"></textarea>
          <div class="thread__form-row">
            <span class="thread__note">Replying as Swarnil</span>
            <span class="cluster cluster-sm"><button class="button is-ghost is-small" type="button">Cancel</button><button class="button is-primary is-small" type="submit">Reply</button></span>
          </div>
        </form>
      </div>
    </li>
  </ol>
  <div class="thread__form thread__form-locked">
    <span class="t-small">Sign in to join the thread.</span>
    <a class="button is-outlined is-small" href="#i">Sign in</a>
  </div>
</div>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--thread-gap` | Rhythm between top-level comments |
| `--thread-indent` | Indent of the reply rail (shrinks on a phone) |
| `--thread-face` | Avatar size at the top level; replies use 2rem |

## Accessibility

- The thread is an `<ol>` of `<li class="comment">`; replies are a nested
  `<ol class="comment__replies">` so the hierarchy is in the tree.
- Liked is `aria-pressed` on the action button — the colour follows the attribute.
- The author badge is a real `.badge` in the head; the ring on the avatar is
  decoration, not the only signal.
- The textarea has a `<label>` or an `aria-label`; `field-sizing: content`
  is progressive, the `min-height` is the fallback.
- `[data-pinned]` is a wash; say *Pinned* in a badge too.
