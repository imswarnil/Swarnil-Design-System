---
title: Chat
group: Patterns
order: 20
lead: The transcript — human on the accent side, machine on the surface, tool calls in honest mono.
---

The conversation pattern, tuned for an AI console. The reading rules: the
**human** takes the accent side, end-aligned — their words started everything.
The **machine** answers start-aligned on plain surface at full measure.
Metadata is the data voice. And a tool call is the one place mono carries more
than a literal, because it *is* machine output.

## The transcript

:::demo
<div class="chat">
  <div class="chat__msg chat__msg-user">
    <div class="chat__bubble"><p>Make the timecode line up in the table.</p></div>
    <div class="chat__meta"><span class="chat__who">Swarnil</span><span>14:02</span></div>
  </div>
  <div class="chat__msg chat__msg-ai">
    <div class="chat__bubble"><p>Done — the column now uses tabular figures. Every digit gets the same advance width, so <code class="code">00:12:47</code> aligns without monospace.</p></div>
    <div class="chat__meta"><span class="chat__who">Console</span><span>14:02 · 1.4s · 212 tokens</span></div>
  </div>
</div>
:::

## Tool calls and thinking

:::demo
<div class="chat">
  <div class="chat__msg chat__msg-ai">
    <div class="chat__tool">grep -rn "font-slate" src/ | wc -l → 0</div>
    <div class="chat__bubble"><p>Verified: no mono outside the code allowlist.</p></div>
  </div>
  <div class="chat__msg chat__msg-ai">
    <span class="chat__typing"><span></span><span></span><span></span></span>
  </div>
</div>
:::

The tool block carries the **craft** rule on its edge — construction, not
urgency. The typing dots pulse staggered; under reduced motion they stay lit —
still *working*, just not dancing.

## Rules

- The machine never takes the accent bubble. One accent voice per transcript,
  and the human owns it.
- Latency and token counts are data — never bold them into the message.
- A transcript is a document: it must read correctly with the CSS off, which
  is why alignment is layout and never meaning.

| Knob | Does |
| --- | --- |
| `--chat-max` | transcript measure |
| `--chat-gap` | rhythm between turns |
