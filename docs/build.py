#!/usr/bin/env python3
"""Swarnil Design System — docs site generator.

    docs/            SOURCE
      content/*.md   one markdown file per page, with front matter
      templates/     the page shell
      assets/        favicon, og image, the docs site's own css + js
      build.py       this file

    site/            OUTPUT — generated, gitignored, never committed

Run with `npm run docs`. Serve with `npm run dev`.

WHY THIS EXISTS
The previous generator was 6,583 lines of HTML embedded in Python string
literals across twelve modules, which is why the docs had no preview/code
toggle: adding one meant editing string concatenation in twelve places. Here
a page is a markdown file, and the toggle is a feature of the renderer, so
every example on the site gets it for free.

MARKDOWN SUBSET
Deliberately small — headings, paragraphs, lists, tables, blockquotes, rules,
fenced code, inline code/bold/italic/links, and raw HTML passthrough. Content
here is written by us, so raw HTML is trusted and passed straight through;
that is what makes component demos possible without a plugin system.

THE ONE EXTENSION

    :::demo Optional caption
    <button class="btn btn-primary">Record</button>
    :::

becomes a live preview, an HTML pane with the same markup escaped, a copy
button and a 320px width toggle. One source of truth per example: the thing
you see and the code you copy cannot drift, because they are the same string.
"""
import gzip
import html
import json
import os
import pathlib
import re
import shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / 'docs'
CONTENT = DOCS / 'content'
TEMPLATES = DOCS / 'templates'
ASSETS = DOCS / 'assets'
# SDS_OUT lets a parallel build (CI, an agent, a preview) write somewhere else.
OUT = pathlib.Path(os.environ.get('SDS_OUT') or ROOT / 'site')

SITE = 'https://design.imswarnil.com'
NAME = 'Swarnil Design System'

# SDS_DEV=1 serves the SOURCE: site/src/ is copied whole and the page links
# src/index.css, so a saved file shows up on reload with no rebuild.
#
# Without it the page links ONE compiled, minified sheet — assets/site.min.css,
# produced by `npm run css:site` from docs/assets/site.css. This is the whole
# point of the flag. The production site used to link /src/index.css too, which
# meant every visitor followed a three-deep @import chain across ~78 unminified
# files while the minified bundles the build had already made sat in site/dist/
# with nothing pointing at them.
DEV = os.environ.get('SDS_DEV') not in (None, '', '0')

# WHICH ENTRY THE SITE IS BUILT FROM. One name, used by BOTH modes.
#
# This was hardcoded to 'index.css' in the dev branch of styles_html() while
# production went through docs/assets/site.css — which on this branch imports
# src/bulma.css, not src/index.css. So `npm run dev` served the markup of one
# site with the stylesheet of another: Bulma classes everywhere and no Bulma
# loaded, which looks exactly like a broken build and is impossible to debug
# from the page. Dev and production must resolve to the same entry or dev is
# not a preview of anything.
CSS_ENTRY = 'index.css'

# Nothing on the page is third-party; the primary nav is one list, in one place,
# rather than pasted into both shells with the current item hard-coded in one.
PRIMARY = [
    ('/introduction.html', 'Docs', 'file'),
    ('/principles.html', 'Principles', 'bookmark'),
    ('/install.html', 'Install', 'box'),
    ('/icons.html', 'Icons', 'capture'),
    ('/templates.html', 'Templates', 'folder'),
]

# Nav group order. A page names its group in front matter; a group not listed
# here sorts to the end, so adding one is never a silent disappearance.
GROUPS = [
    'Start',
    'Foundation',
    'Layout',
    'Elements',
    'Components',
    'Forms',
    'Patterns',
    'Sections',
    'Collections',
    'Broadcast',
    'Utilities',
    'Templates',
]

# One icon per group, from the system's own sprite (Swarnil Icons). The old
# docs had these and the eye uses them: a glyph is found faster than a word
# when scanning a column of eight uppercase labels.
GROUP_ICONS = {
    'Start': 'play',
    'Foundation': 'aperture',
    'Layout': 'crop',
    'Elements': 'type',
    'Components': 'box',
    'Forms': 'edit',
    'Patterns': 'scan',
    'Sections': 'browser',
    'Collections': 'playlist',
    'Broadcast': 'live',
    'Utilities': 'settings',
    'Templates': 'folder',
}


# ─────────────────────────────────────────────────────────────── cache-buster
def stamp():
    """Newest mtime across everything the browser caches.

    A frozen literal (the old build used '?v=cds25' forever) means a rebuild
    changes the CSS but not its URL, so the browser serves the old copy and
    you debug the wrong thing. This changes exactly when the assets change.
    """
    newest = 0.0
    for root in (ROOT / 'src', ASSETS, ROOT / 'dist'):
        if root.is_dir():
            for f in root.rglob('*'):
                if f.is_file():
                    newest = max(newest, f.stat().st_mtime)
    return f'?v={int(newest):x}'


V = stamp()


# ──────────────────────────────────────────────────────────────  front matter
def front_matter(text):
    """Split leading `---` YAML-ish front matter from the body.

    Only `key: value` pairs — no nesting, no lists. If a page ever needs more
    than that, the page is doing too much.
    """
    if not text.startswith('---\n'):
        return {}, text
    end = text.find('\n---', 4)
    if end == -1:
        return {}, text
    meta = {}
    for line in text[4:end].split('\n'):
        if ':' in line:
            k, _, v = line.partition(':')
            meta[k.strip()] = v.strip()
    return meta, text[end + 4:].lstrip('\n')


# ─────────────────────────────────────────────────────────────────── inline md
CODE_SPAN = re.compile(r'`([^`]+)`')
LINK = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')
BOLD = re.compile(r'\*\*([^*]+)\*\*')
ITALIC = re.compile(r'(?<![*\w])\*([^*\n]+)\*(?!\*)')


def inline(s):
    """Inline markdown. Code spans are stashed first so their contents are
    escaped and never re-processed — otherwise `*` inside a code span becomes
    an <em> and the documented value is wrong."""
    stash = []

    def keep(m):
        stash.append(html.escape(m.group(1)))
        return f'\x00{len(stash) - 1}\x00'

    s = CODE_SPAN.sub(keep, s)
    s = LINK.sub(r'<a href="\2">\1</a>', s)
    s = BOLD.sub(r'<strong>\1</strong>', s)
    s = ITALIC.sub(r'<em>\1</em>', s)
    for i, c in enumerate(stash):
        s = s.replace(f'\x00{i}\x00', f'<code class="code">{c}</code>')
    return s


def slug(s):
    s = re.sub(r'<[^>]+>', '', s)
    s = re.sub(r'[^\w\s-]', '', s).strip().lower()
    return re.sub(r'[\s_]+', '-', s)


# ───────────────────────────────────────────────────────────── code colouring
#
# ONE PASS, ONE REGEX, PER LANGUAGE.
#
# The previous version was a chain of re.sub() calls over already-escaped text:
# colour the comments, then the tags, then the attributes. Each pass ran over
# the output of the one before it, so a later pattern could match inside a span
# an earlier one had just inserted — `class="tok-com"` is a word followed by an
# `=`, which is exactly what the attribute rule looks for. It mostly got away
# with it because the patterns were narrow, and it would have kept getting away
# with it right up until a snippet contained the wrong thing.
#
# Here each language is a single alternation, scanned once, left to right.
# Nothing the scanner emits is ever looked at again, so a rule cannot match its
# own output. Text between matches is escaped and passed through; the matched
# text is escaped and wrapped. The scanner therefore cannot introduce markup,
# only spans — which is the property that makes it safe to run on raw source.
#
# Rules are (token, pattern, inner). `inner` names a capture group when only
# part of the match should be coloured — a CSS property is matched with its
# leading indent so it can be anchored to the start of a line, but the indent
# is not part of the token.
#
# The classes are the system's own .tok-* from 2-elements/22-code.css; the
# colours are its --syn-* palette. Nothing here invents a colour.

def _scan(rules, code):
    """Colour `code` in one pass. Returns escaped HTML.

    A rule may wrap part of its pattern in a group named `<token>_i` when only
    that part should be coloured — a CSS property is matched together with its
    leading indent so it can be anchored to the start of a line, but the indent
    is not the token. The group is named rather than numbered because the rules
    are concatenated into one regex, which renumbers every group.
    """
    rx = re.compile('|'.join(f'(?P<{tok}>{pat})' for tok, pat in rules), re.S | re.M)

    out, pos = [], 0
    for m in rx.finditer(code):
        tok = m.lastgroup
        # lastgroup is the innermost group that matched; an `_i` group means
        # the rule it belongs to is the real token.
        if tok.endswith('_i'):
            tok = tok[:-2]
        out.append(html.escape(code[pos:m.start()]))
        part = m.group(f'{tok}_i') if f'{tok}_i' in rx.groupindex else None
        if part is not None:
            whole = m.group(tok)
            out.append(html.escape(whole[:whole.index(part)]))
            out.append(f'<span class="tok-{tok}">{html.escape(part)}</span>')
        else:
            out.append(f'<span class="tok-{tok}">{html.escape(m.group(tok))}</span>')
        pos = m.end()
    out.append(html.escape(code[pos:]))
    return ''.join(out)


# Order is precedence only for matches starting at the SAME offset; otherwise
# the leftmost match wins, which is what you want. Comments and strings come
# first in every language so their contents are never re-read as code.

HTML_RULES = [
    ('com',  r'<!--.*?-->'),
    ('key',  r'<!DOCTYPE[^>]*>'),
    ('str',  r'"[^"\n]*"|\'[^\'\n]*\''),
    # The tag name, and only directly after a `<` — so `a < b` in prose is
    # never a tag. The angle bracket is matched separately and FIRST (it is
    # one character to the left), which is what leaves `/a` reachable here on
    # a closing tag: `</` as a single punc token would swallow the slash and
    # strand the name a character further on, out of the lookbehind's reach.
    ('tag',  r'(?<=<)(?P<tag_i>/?[A-Za-z][\w-]*)'),
    # an attribute is a name immediately before an `=`
    ('attr', r'[A-Za-z_:][\w:.-]*(?==)'),
    ('punc', r'[<>]|/(?=>)'),
]

CSS_RULES = [
    ('com',  r'/\*.*?\*/'),
    ('str',  r'"[^"\n]*"|\'[^\'\n]*\''),
    ('var',  r'--[\w-]+'),
    ('key',  r'@[\w-]+'),                       # at-rules read as keywords
    # a declaration: indent, then the property, then a colon
    ('prop', r'^[ \t]*(?P<prop_i>[a-z-]{2,})(?=\s*:)'),
    ('fn',   r'[\w-]+(?=\()'),
    # a selector is what sits before a `{` on its own line
    ('sel',  r'^[ \t]*(?P<sel_i>[^\n{}();]+?)(?=\s*\{)'),
    ('num',  r'(?<![\w.-])-?\d*\.?\d+(?:px|rem|em|ch|cqi|cqb|vw|vh|dvh|deg|ms|s|fr|%)?(?![\w-])'),
    ('punc', r'[{};:,]'),
]

JS_KEYWORDS = (
    'const|let|var|function|return|if|else|for|while|of|in|new|class|extends|'
    'import|export|from|default|await|async|try|catch|finally|throw|typeof|'
    'instanceof|delete|void|this|super|null|undefined|true|false|break|continue'
)

JS_RULES = [
    ('com',  r'//[^\n]*|/\*.*?\*/'),
    ('str',  r'"[^"\n]*"|\'[^\'\n]*\'|`[^`]*`'),
    ('key',  rf'\b(?:{JS_KEYWORDS})\b'),
    ('fn',   r'[A-Za-z_$][\w$]*(?=\s*\()'),
    ('num',  r'(?<![\w.])-?\d*\.?\d+(?![\w.])'),
    ('punc', r'=>|[{}();,]'),
]

SH_RULES = [
    ('com',  r'#[^\n]*'),
    ('str',  r'"[^"\n]*"|\'[^\'\n]*\''),
    # the command is the first word of a line, or the first after a pipe
    ('fn',   r'(?:^|\|[ \t]*)(?P<fn_i>[a-z][\w./-]*)'),
    ('key',  r'(?<=\s)--?[\w-]+'),             # flags
    ('num',  r'(?<![\w.-])\d+(?![\w-])'),
]

LANGS = {
    'html': HTML_RULES, 'htm': HTML_RULES, 'xml': HTML_RULES, 'svg': HTML_RULES,
    'css': CSS_RULES,
    'js': JS_RULES, 'javascript': JS_RULES, 'json': JS_RULES, 'ts': JS_RULES,
    'bash': SH_RULES, 'sh': SH_RULES, 'shell': SH_RULES, 'console': SH_RULES,
}


def colour(code, lang):
    """Colour a snippet, or escape it unchanged if the language is unknown."""
    rules = LANGS.get((lang or '').lower())
    return _scan(rules, code) if rules else html.escape(code)


def codeblock(code, lang, copy=True):
    btn = ('<button class="codeblock__copy" type="button" data-copy>Copy</button>'
           if copy else '')
    return (f'<figure class="codeblock codeblock-night">'
            f'<figcaption class="codeblock__head">'
            f'<span class="codeblock__lang">{html.escape(lang or "text")}</span>{btn}'
            f'</figcaption><pre class="codeblock__pre"><code>{colour(code, lang)}</code></pre></figure>')


# ──────────────────────────────────────────────────────────── the demo block
DEMO_N = [0]


def demo(markup, caption):
    """A live example and its source, from one string.

    Preview and code cannot drift because they are the same characters — the
    preview is the markup, the code pane is the markup escaped.
    """
    DEMO_N[0] += 1
    n = DEMO_N[0]
    cap = (f'<figcaption class="demo__cap">{inline(caption)}</figcaption>'
           if caption else '')
    return f'''<figure class="demo" id="demo-{n}">
{cap}<div class="demo__bar">
<div class="tabs is-small is-boxed" role="tablist" aria-label="Example view">
<ul>
<li class="is-active"><button class="tab" type="button" role="tab" aria-selected="true" data-pane="preview">Preview</button></li>
<li><button class="tab" type="button" role="tab" aria-selected="false" data-pane="code">HTML</button></li>
</ul>
</div>
<div class="demo__tools">
<button class="button is-small is-ghost" type="button" data-narrow aria-pressed="false" title="Preview at 320px">320px</button>
<button class="button is-small is-ghost" type="button" data-copy title="Copy the HTML">Copy</button>
</div>
</div>
<div class="demo__stage" data-pane="preview"><div class="demo__inner">
{markup}
</div></div>
<div class="demo__code codeblock codeblock-night" data-pane="code" hidden><pre class="codeblock__pre"><code>{colour(markup.strip(), 'html')}</code></pre></div>
</figure>'''


# ────────────────────────────────────────────────────────────── block parser
def render(md):
    """Markdown → (html, toc). A line cursor rather than a blank-line split,
    because demo blocks and code fences legitimately contain blank lines."""
    lines = md.split('\n')
    out, toc = [], []
    i, n = 0, len(lines)

    while i < n:
        line = lines[i]
        s = line.strip()

        if not s:
            i += 1
            continue

        # ── demo block
        if s.startswith(':::demo'):
            caption = s[len(':::demo'):].strip()
            i += 1
            body = []
            while i < n and lines[i].strip() != ':::':
                body.append(lines[i])
                i += 1
            i += 1
            out.append(demo('\n'.join(body), caption))
            continue

        # ── fenced code
        if s.startswith('```'):
            lang = s[3:].strip()
            i += 1
            body = []
            while i < n and not lines[i].strip().startswith('```'):
                body.append(lines[i])
                i += 1
            i += 1
            out.append(codeblock('\n'.join(body), lang))
            continue

        # ── heading
        if s.startswith('#'):
            level = len(s) - len(s.lstrip('#'))
            text = s[level:].strip()
            sid = slug(text)
            if level in (2, 3):
                toc.append((level, sid, text))
            out.append(f'<h{level} id="{sid}">{inline(text)}</h{level}>')
            i += 1
            continue

        # ── horizontal rule
        if s in ('---', '***', '___'):
            out.append('<hr />')
            i += 1
            continue

        # ── table
        if s.startswith('|') and i + 1 < n and set(lines[i + 1].strip()) <= set('|-: '):
            head = [c.strip() for c in s.strip('|').split('|')]
            i += 2
            rows = []
            while i < n and lines[i].strip().startswith('|'):
                rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')])
                i += 1
            th = ''.join(f'<th>{inline(c)}</th>' for c in head)
            tb = ''.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>'
                         for r in rows)
            out.append(f'<div class="table-wrap"><table class="table is-fullwidth is-striped">'
                       f'<thead><tr>{th}</tr></thead><tbody>{tb}</tbody></table></div>')
            continue

        # ── blockquote
        if s.startswith('> '):
            body = []
            while i < n and lines[i].strip().startswith('>'):
                body.append(lines[i].strip().lstrip('>').strip())
                i += 1
            out.append(f'<blockquote>{inline(" ".join(body))}</blockquote>')
            continue

        # ── list
        #
        # A wrapped bullet is one item, not an item and a paragraph. The first
        # version of this took one LINE per item, so a bullet long enough to
        # wrap silently split the list in two and left the remainder as a
        # stray <p> outside it. That went unnoticed on six pages, because the
        # result still reads correctly in the markdown and only looks wrong in
        # the browser — which is the definition of the bug this build should
        # be catching rather than causing.
        #
        # A continuation line is any non-blank line that does not itself start
        # a new item or a new block. That is the whole rule.
        if re.match(r'^[-*] ', s) or re.match(r'^\d+\. ', s):
            ordered = bool(re.match(r'^\d+\. ', s))
            items = []
            while i < n:
                cur = lines[i].strip()
                if re.match(r'^[-*] ', cur) or re.match(r'^\d+\. ', cur):
                    items.append(re.sub(r'^([-*]|\d+\.)\s+', '', cur))
                    i += 1
                    continue
                # continuation of the item above
                if items and cur and not re.match(r'^(#|```|:::|\||>|<|---$)', cur):
                    items[-1] += ' ' + cur
                    i += 1
                    continue
                break
            tag = 'ol' if ordered else 'ul'
            li = ''.join(f'<li>{inline(t)}</li>' for t in items)
            out.append(f'<{tag}>{li}</{tag}>')
            continue

        # ── raw html block: trusted, passed straight through
        if s.startswith('<'):
            body = []
            while i < n and lines[i].strip():
                body.append(lines[i])
                i += 1
            out.append('\n'.join(body))
            continue

        # ── paragraph
        body = []
        while i < n and lines[i].strip() and not re.match(
                r'^(#|```|:::|\||>|[-*] |\d+\. |<|---$)', lines[i].strip()):
            body.append(lines[i].strip())
            i += 1
        out.append(f'<p>{inline(" ".join(body))}</p>')

    return '\n'.join(out), toc


# ─────────────────────────────────────────────────────────────────── the page
def nav_html(pages, current):
    groups = {}
    for p in pages:
        groups.setdefault(p['group'], []).append(p)
    order = {g: i for i, g in enumerate(GROUPS)}
    parts = []
    for g in sorted(groups, key=lambda g: (order.get(g, 99), g)):
        items = sorted(groups[g], key=lambda p: (int(p.get('order', 50)), p['title']))
        open_ = any(p['slug'] == current for p in items)
        li = ''.join(
            f'<li><a href="/{p["slug"]}.html"'
            f'{" class=\"is-active\" aria-current=\"page\"" if p["slug"] == current else ""}>'
            f'{html.escape(p["title"])}</a></li>'
            for p in items)
        icon = GROUP_ICONS.get(g)
        glyph = (f'<svg class="icon icon-sm" aria-hidden="true">'
                 f'<use href="/icons/sprite.svg#i-{icon}"/></svg>' if icon else '')
        # BULMA BRANCH: the side nav is Bulma's .menu / .menu-label /
        # .menu-list, kept inside a <details> so the groups still collapse —
        # Bulma's menu has no disclosure of its own. Neither .menu-label nor
        # .menu-list collides with anything this system defines, so these are
        # genuinely Bulma's rules doing the work, not ours winning a cascade
        # while wearing Bulma's names.
        parts.append(
            f'<details class="acc acc-quiet"{" open" if open_ else ""}>'
            f'<summary class="menu-label" title="{html.escape(g)}">{glyph}'
            f'<span class="acc__label">{html.escape(g)}</span></summary>'
            f'<div class="acc__body"><ul class="menu-list">{li}</ul></div></details>')
    return ''.join(parts)


def toc_html(toc):
    """The table of contents: a heading and a list of links.

    Deliberately plain. The scrubber that used to live here needed a scroll
    listener, a read-time estimate and per-node measurement; this needs none of
    it and renders identically with JavaScript off.
    """
    if len(toc) < 2:
        return ''
    li = ''.join(
        f'<a class="toc__link toc__link-h{lvl}" href="#{sid}">{html.escape(txt)}</a>'
        for lvl, sid, txt in toc)
    return ('<nav class="toc" aria-label="On this page">'
            '<p class="toc__head">On this page</p>'
            f'{li}</nav>')


def styles_html():
    """What the <head> links, and it is not the same in both modes.

    Production: one file. Development: the source tree, so an edit to a file in
    src/ is visible on reload without running a build at all — which is the only
    thing the @import waterfall was ever good for, and it belongs in dev only.
    """
    if DEV:
        return '\n'.join([
            "<!-- DEV: the unbundled source, so a saved file needs no rebuild. -->",
            f'<link rel="stylesheet" href="/src/{CSS_ENTRY}{V}" />',
            f'<link rel="stylesheet" href="/src/7-broadcast/index.css{V}" />',
            f'<link rel="stylesheet" href="/src/8-framework/index.css{V}" />',
            f'<link rel="stylesheet" href="/assets/docs.css{V}" />',
            f'<link rel="stylesheet" href="/assets/home.css{V}" />',
        ])
    return ('<!-- The system, its two optional layers and the site chrome, '
            'compiled and minified into one file. -->\n'
            f'<link rel="stylesheet" href="/assets/site.min.css{V}" />')


def scripts_html():
    """Two files, both deferred, both optional.

    nav.js is the system's own — it mirrors popover state onto aria-expanded and
    writes the bar's scroll attributes. docs.js is the site's.
    """
    return '\n'.join([
        f'<script src="/assets/nav.js{V}" defer></script>',
        f'<script src="/assets/docs.js{V}" defer></script>',
    ])


def primary_html(current):
    """The bar's own nav. `current` is a slug, or None on the home page."""
    out = []
    for href, label, icon in PRIMARY:
        here = ' aria-current="page"' if href == f'/{current}.html' else ''
        out.append(
            f'<a class="navbar-item" href="{href}"{here}>'
            f'<span class="icon is-small"><svg class="icon icon-sm" aria-hidden="true">'
            f'<use href="/icons/sprite.svg#i-{icon}"/></svg></span><span>{label}</span></a>')
    return ''.join(out)


def bundle_size():
    f = ROOT / 'dist' / 'swarnil-design.min.css'
    if not f.exists():
        return '—'
    return f'{len(gzip.compress(f.read_bytes())) / 1024:.1f}'


def build_page(page, pages, shell):
    body, toc = render(page['body'])
    lead = (f'<p class="lead">{inline(page["lead"])}</p>' if page.get('lead') else '')
    # The home page is not in the doc sequence, so it has no neighbours.
    slugs = [p['slug'] for p in pages]
    idx = slugs.index(page['slug']) if page['slug'] in slugs else -1
    prev_ = pages[idx - 1] if idx > 0 else None
    next_ = pages[idx + 1] if 0 <= idx < len(pages) - 1 else None

    def pager(p, dir_):
        if not p:
            return ''
        arrow = ('<svg class="icon icon-sm" aria-hidden="true">'
                 f'<use href="/icons/sprite.svg#i-arrow-{"left" if dir_ == "prev" else "right"}"/></svg>')
        label = 'Previous' if dir_ == 'prev' else 'Next'
        dir_html = (f'{arrow}{label}' if dir_ == 'prev' else f'{label}{arrow}')
        cls = 'pagination-next' if dir_ == 'next' else 'pagination-previous'
        return (f'<a class="{cls}" href="/{p["slug"]}.html">'
                f'<span class="shell__pager-dir">{dir_html}</span>'
                f'<span class="shell__pager-title">{html.escape(p["title"])}</span></a>')

    # Plain token replacement, not str.format: the shell contains real
    # JavaScript, and every brace in it would otherwise need doubling.
    take = f'TAKE {idx + 1:02d} / {len(pages):02d}' if idx >= 0 else ''
    fields = {
        'title': html.escape(page['title']),
        'name': NAME,
        'lead_meta': html.escape(page.get('lead', '')),
        'canonical': f'{SITE}/{page["slug"]}.html',
        'group': html.escape(page.get('group', '')),
        'take': take,
        'editurl': f'https://github.com/imswarnil/Swarnil-Design-System/edit/main/docs/content/{page["slug"]}.md',
        'crumbs': (
            '<ul>'
            '<li><a href="/">Home</a></li>'
            f'<li><a href="#">{html.escape(page.get("group", ""))}</a></li>'
            f'<li class="is-active"><a href="#" aria-current="page">{html.escape(page["title"])}</a></li>'
            '</ul>'
        ),
        'v': V,
        'styles': styles_html(),
        'scripts': scripts_html(),
        'primary': primary_html(page['slug'] if page['layout'] != 'home' else None),
        'nav': nav_html(pages, page['slug']),
        'toc': toc_html(toc),
        'lead': lead,
        'body': body,
        'pager': pager(prev_, 'prev') + pager(next_, 'next'),
        'year': '2026',
        # Measured, not claimed: the gzipped size of the minified web bundle,
        # so the home page's number cannot drift from the build.
        'size': bundle_size(),
    }
    out = shell
    for k, val in fields.items():
        out = out.replace('{' + k + '}', val)
    return out


# ───────────────────────────────────────────────────────────────────── build
def main():
    pages = []
    for f in sorted(CONTENT.glob('*.md')):
        meta, body = front_matter(f.read_text())
        pages.append({
            'slug': f.stem,
            'title': meta.get('title', f.stem),
            'group': meta.get('group', 'Start'),
            'order': meta.get('order', '50'),
            'lead': meta.get('lead', ''),
            'layout': meta.get('layout', 'doc'),
            'body': body,
        })

    gorder = {g: i for i, g in enumerate(GROUPS)}
    pages.sort(key=lambda p: (gorder.get(p['group'], 99), int(p['order']), p['title']))

    # The landing page has its own shell and is deliberately absent from the
    # sidebar and the prev/next chain — it is the way in, not a step in a
    # sequence. Everything else is a doc page.
    home = next((p for p in pages if p['layout'] == 'home'), None)
    docs = [p for p in pages if p['layout'] != 'home']

    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    shell = (TEMPLATES / 'page.html').read_text()
    for p in docs:
        DEMO_N[0] = 0
        (OUT / f'{p["slug"]}.html').write_text(build_page(p, docs, shell))

    if home:
        DEMO_N[0] = 0
        home_shell = (TEMPLATES / 'home.html').read_text()
        (OUT / 'index.html').write_text(build_page(home, docs, home_shell))
    elif docs:
        shutil.copy(OUT / f'{docs[0]["slug"]}.html', OUT / 'index.html')

    # ── Assets ────────────────────────────────────────────────────────────
    # site.css is a BUILD ENTRY, not something the browser should ever fetch;
    # docs.css and home.css are its inputs and are only served in dev. The
    # compiled site.min.css is written into site/assets/ by `npm run css:site`
    # AFTER this runs, so it is not copied from here — it is not in docs/.
    ignore = shutil.ignore_patterns('site.css') if not DEV else shutil.ignore_patterns()
    shutil.copytree(ASSETS, OUT / 'assets', ignore=ignore)
    if not DEV:
        for f in ('docs.css', 'home.css'):
            (OUT / 'assets' / f).unlink(missing_ok=True)

    # nav.js is the system's, but the site serves it from one place with
    # everything else it loads, so /src/ does not have to exist in production.
    shutil.copy(ROOT / 'src' / 'js' / 'nav.js', OUT / 'assets' / 'nav.js')

    # The source tree is a DEV convenience. In production nothing links it, and
    # copying it shipped 908 KB and ~78 fetchable files for no reader.
    if DEV and (ROOT / 'src').is_dir():
        shutil.copytree(ROOT / 'src', OUT / 'src')
        # The entry may @import out of src/ — src/bulma.css reaches for
        # ../dist/bulma-base.css — so the compiled Bulma has to be on disk
        # beside it or dev serves a stylesheet with a hole in it.
        base = ROOT / 'dist' / 'bulma-base.css'
        if base.exists():
            (OUT / 'dist').mkdir(exist_ok=True)
            shutil.copy(base, OUT / 'dist' / base.name)
        # The page links /src/index.css?v=… but an @import INSIDE it names its
        # children with no query at all, so the browser happily serves a cached
        # 12-frame.css behind a freshly-versioned index — including files that
        # no longer exist. Stamp the version onto every @import in the COPY
        # (never the source) so a rebuild is actually visible.
        for css in (OUT / 'src').rglob('*.css'):
            text = css.read_text()
            stamped = re.sub(r"@import url\('(\./[^']+\.css)'\)",
                             lambda m: f"@import url('{m.group(1)}{V}')", text)
            if stamped != text:
                css.write_text(stamped)

    # dist/ is published so /install.html can point at a real file and a reader
    # can download the bundle. Only the minified ones: the expanded copies are
    # 1.9 MB that nothing links, and npm ships them anyway.
    if (ROOT / 'dist').is_dir():
        # exist_ok: in dev the block above may already have put bulma-base.css
        # here.
        (OUT / 'dist').mkdir(exist_ok=True)
        for f in sorted((ROOT / 'dist').glob('*.min.css')):
            shutil.copy(f, OUT / 'dist' / f.name)

    # The page templates are whole pages built out of the system — a personal
    # homepage, a blog. They are copied as-is so they can be opened, viewed at
    # any width and saved from the site; the docs' Templates page frames them.
    # They link /src/index.css like the docs do, so a rebuild is visible in
    # them too. The class audit reads them from here, so a template can only
    # use a class the system (or templates/templates.css) defines.
    if (ROOT / 'templates').is_dir():
        shutil.copytree(ROOT / 'templates', OUT / 'templates',
                        ignore=shutil.ignore_patterns('README.md'))
        # They are authored against the source so they can be opened straight
        # off disk; the copy served from the site links the compiled bundle for
        # the same reason every other page does.
        if not DEV:
            for page in (OUT / 'templates').rglob('*.html'):
                page.write_text(page.read_text()
                                .replace('/src/index.css',
                                         f'/dist/swarnil-design.min.css{V}')
                                .replace('/src/js/nav.js', f'/assets/nav.js{V}'))

    # The icon set is a separate repo (icons.imswarnil.com). Its built sprite
    # is vendored at docs/icons/sprite.svg so CI and a fresh clone can build
    # the site; when the source repo is checked out beside this one, a build
    # refreshes the vendored copy from it, so a redrawn icon lands here on
    # the next build without either repo knowing how the other is built.
    source = ROOT.parent / 'icons.imswarnil.com' / 'dist' / 'sprite.svg'
    vendored = DOCS / 'icons' / 'sprite.svg'
    if source.exists() and (not vendored.exists()
                            or source.read_bytes() != vendored.read_bytes()):
        vendored.parent.mkdir(exist_ok=True)
        shutil.copy(source, vendored)
        print('  refreshed docs/icons/sprite.svg from icons.imswarnil.com')
    if vendored.exists():
        shutil.copytree(vendored.parent, OUT / 'icons')
    else:
        print('  warning: docs/icons/sprite.svg missing — icons will not render')

    (OUT / '.nojekyll').write_text('')
    (OUT / 'CNAME').write_text(SITE.split('//')[1] + '\n')
    (OUT / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n')
    urls = f'<url><loc>{SITE}/</loc></url>' + ''.join(
        f'<url><loc>{SITE}/{p["slug"]}.html</loc></url>' for p in docs)
    (OUT / 'sitemap.xml').write_text(
        f'<?xml version="1.0" encoding="UTF-8"?>'
        f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>')
    (OUT / 'search.json').write_text(json.dumps(
        [{'t': p['title'], 'g': p['group'], 'u': f'/{p["slug"]}.html', 'd': p['lead']}
         for p in docs], separators=(',', ':')))

    print(f'built {len(docs)} doc pages{" + home" if home else ""} -> site/')


if __name__ == '__main__':
    main()
