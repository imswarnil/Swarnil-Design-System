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
    for root in (ROOT / 'src', ASSETS):
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
HTML_TOK = [
    (re.compile(r'(&lt;!--.*?--&gt;)', re.S), 'com'),
    (re.compile(r'(&lt;/?)([\w-]+)'), None),          # handled specially
    (re.compile(r'([\w-]+)(=)(&quot;[^&]*?&quot;)'), None),
]


def colour_html(escaped):
    """Light syntax colouring for the HTML pane. Operates on already-escaped
    text so it can never introduce markup, only spans."""
    s = re.sub(r'(&lt;!--.*?--&gt;)', r'<span class="tok-com">\1</span>', escaped, flags=re.S)
    s = re.sub(r'(&lt;/?)([\w-]+)', r'\1<span class="tok-tag">\2</span>', s)
    s = re.sub(r'([\w-]+)(=)(&quot;.*?&quot;)',
               r'<span class="tok-attr">\1</span>\2<span class="tok-str">\3</span>', s)
    return s


def colour_css(escaped):
    s = re.sub(r'(/\*.*?\*/)', r'<span class="tok-com">\1</span>', escaped, flags=re.S)
    s = re.sub(r'(--[\w-]+)', r'<span class="tok-var">\1</span>', s)
    s = re.sub(r'^([^\n{};]+)(\s*\{)', r'<span class="tok-sel">\1</span>\2', s, flags=re.M)
    # property names — start of a declaration, lowercase-dash, before a colon
    s = re.sub(r'(?m)^(\s*)([a-z-]{2,})(\s*:)', r'\1<span class="tok-key">\2</span>\3', s)
    # numbers with their units
    s = re.sub(r'(?<![\w-])(\d+(?:\.\d+)?(?:px|rem|em|ch|vw|vh|s|ms|deg|%)?)(?![\w-])',
               r'<span class="tok-num">\1</span>', s)
    return s


def colour(code, lang):
    esc = html.escape(code)
    if lang in ('html', 'htm'):
        return colour_html(esc)
    if lang in ('css',):
        return colour_css(esc)
    return esc


def codeblock(code, lang, copy=True):
    btn = ('<button class="cb__copy" type="button" data-copy>Copy</button>'
           if copy else '')
    return (f'<figure class="cb"><figcaption class="cb__head">'
            f'<span class="cb__dots" aria-hidden="true"><span></span><span></span><span></span></span>'
            f'<span class="cb__lang">{html.escape(lang or "text")}</span>{btn}'
            f'</figcaption><pre class="cb__pre"><code>{colour(code, lang)}</code></pre></figure>')


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
<div class="demo__tabs" role="tablist" aria-label="Example view">
<button class="demo__tab" type="button" role="tab" aria-selected="true" data-pane="preview">Preview</button>
<button class="demo__tab" type="button" role="tab" aria-selected="false" data-pane="code">HTML</button>
</div>
<div class="demo__tools">
<button class="demo__tool" type="button" data-narrow aria-pressed="false" title="Preview at 320px">320px</button>
<button class="demo__tool" type="button" data-copy title="Copy the HTML">Copy</button>
</div>
</div>
<div class="demo__stage" data-pane="preview"><div class="demo__inner">
{markup}
</div></div>
<div class="demo__code" data-pane="code" hidden><pre class="cb__pre"><code>{colour(markup.strip(), 'html')}</code></pre></div>
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
            out.append('<hr class="rule" />')
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
            out.append(f'<div class="table-wrap"><table class="table">'
                       f'<thead><tr>{th}</tr></thead><tbody>{tb}</tbody></table></div>')
            continue

        # ── blockquote
        if s.startswith('> '):
            body = []
            while i < n and lines[i].strip().startswith('>'):
                body.append(lines[i].strip().lstrip('>').strip())
                i += 1
            out.append(f'<blockquote class="quote">{inline(" ".join(body))}</blockquote>')
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
            out.append(f'<{tag} class="list">{li}</{tag}>')
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
            f'<a class="nav__link" href="/{p["slug"]}.html"'
            f'{" aria-current=\"page\"" if p["slug"] == current else ""}>{html.escape(p["title"])}</a>'
            for p in items)
        icon = GROUP_ICONS.get(g)
        glyph = (f'<svg class="icon nav__icon" aria-hidden="true">'
                 f'<use href="/icons/sprite.svg#i-{icon}"/></svg>' if icon else '')
        parts.append(
            f'<details class="nav__group"{" open" if open_ else ""}>'
            f'<summary class="nav__title">{glyph}<span class="nav__label">{html.escape(g)}</span></summary>'
            f'<div class="nav__links">{li}</div></details>')
    return ''.join(parts)


# The top bar's four destinations. `match` is the set of slugs that light the
# item up — a section, not a page, because "Docs" is current on all seventy of
# them. Kept here rather than in the template so the active state is computed
# once and cannot drift between the two shells.
# ── Templates ──────────────────────────────────────────────────────────────
# Whole pages, built from the system and served from site/t/. They are real
# pages, not pictures of pages: same stylesheet, same components, no <style>
# block anywhere in them. The gallery on /templates.html is generated from
# this list, so a template cannot be in one place and missing from the other.
PAGES_DIR = DOCS / 'pages'

PAGE_TEMPLATES = [
    ('landing', 'Landing page',
     'Hero, stats, a card grid, pricing, a call to action and a footer — the shape a '
     'project page takes when it has one thing to say and a table to prove it.',
     ['Navbar', 'Hero', 'Stats', 'Card', 'Pricing', 'CTA', 'Footer']),
    ('article', 'Article',
     'A reading column at --width-read with a contents rail beside it, a masthead above, '
     'a share row and a related shelf under.',
     ['Navbar', 'Masthead', 'Article', 'Table of contents', 'Share', 'Card']),
    ('collection', 'Collection',
     'A filterable index: facet column, order tabs, a results grid and pagination. The '
     'shape this site\'s own Components page takes.',
     ['Navbar', 'Page header', 'Filter & facets', 'Results', 'Card', 'Pagination']),
    ('app', 'Application shell',
     'Bar, navigation column, content and rail, on the .shell pattern — every metric '
     'derived from --bar-h so the four regions cannot disagree.',
     ['Shell', 'Navbar', 'Navigation', 'Stats', 'Alert', 'Table', 'Build log']),
]


def wireframe(kind):
    """A drawn thumbnail, in system tokens so it follows the theme.

    NOT an iframe of the page. Twelve iframes at 380px produced twelve
    pictures in which nothing was legible — the previous version of this page
    did exactly that. At thumbnail size a wireframe communicates MORE than a
    screenshot does: "bar, nav left, cards right" is the thing a reader is
    comparing, and it survives being 320px wide.
    """
    bar = '<rect x="0" y="0" width="160" height="10" rx="2" fill="var(--bg-muted)"/>'
    parts = {
        'landing': (
            '<rect x="10" y="18" width="62" height="8" rx="2" fill="var(--fg-faint)"/>'
            '<rect x="10" y="30" width="46" height="4" rx="2" fill="var(--line-strong)"/>'
            '<rect x="10" y="38" width="30" height="7" rx="3" fill="var(--accent)"/>'
            '<rect x="88" y="18" width="62" height="34" rx="3" fill="var(--bg-muted)"/>'
            '<rect x="10" y="58" width="140" height="12" rx="2" fill="var(--bg-sunken)"/>'
            '<rect x="10" y="76" width="43" height="24" rx="3" fill="var(--bg-muted)"/>'
            '<rect x="59" y="76" width="43" height="24" rx="3" fill="var(--bg-muted)"/>'
            '<rect x="108" y="76" width="42" height="24" rx="3" fill="var(--bg-muted)"/>'),
        'article': (
            '<rect x="10" y="18" width="86" height="7" rx="2" fill="var(--fg-faint)"/>'
            '<rect x="10" y="30" width="96" height="3" rx="1.5" fill="var(--line-strong)"/>'
            '<rect x="10" y="38" width="96" height="3" rx="1.5" fill="var(--line-strong)"/>'
            '<rect x="10" y="46" width="72" height="3" rx="1.5" fill="var(--line-strong)"/>'
            '<rect x="10" y="56" width="96" height="22" rx="3" fill="var(--bg-muted)"/>'
            '<rect x="10" y="84" width="96" height="3" rx="1.5" fill="var(--line-strong)"/>'
            '<rect x="10" y="92" width="60" height="3" rx="1.5" fill="var(--line-strong)"/>'
            '<rect x="118" y="18" width="32" height="3" rx="1.5" fill="var(--accent)"/>'
            '<rect x="118" y="26" width="32" height="3" rx="1.5" fill="var(--line-default)"/>'
            '<rect x="118" y="34" width="26" height="3" rx="1.5" fill="var(--line-default)"/>'),
        'collection': (
            '<rect x="10" y="18" width="54" height="7" rx="2" fill="var(--fg-faint)"/>'
            '<rect x="10" y="32" width="34" height="68" rx="3" fill="var(--bg-sunken)"/>'
            '<rect x="14" y="38" width="22" height="3" rx="1.5" fill="var(--accent)"/>'
            '<rect x="14" y="46" width="26" height="3" rx="1.5" fill="var(--line-default)"/>'
            '<rect x="14" y="54" width="20" height="3" rx="1.5" fill="var(--line-default)"/>'
            '<rect x="50" y="32" width="47" height="30" rx="3" fill="var(--bg-muted)"/>'
            '<rect x="103" y="32" width="47" height="30" rx="3" fill="var(--bg-muted)"/>'
            '<rect x="50" y="68" width="47" height="30" rx="3" fill="var(--bg-muted)"/>'
            '<rect x="103" y="68" width="47" height="30" rx="3" fill="var(--bg-muted)"/>'),
        'app': (
            '<rect x="0" y="14" width="34" height="86" fill="var(--bg-sunken)"/>'
            '<rect x="6" y="22" width="22" height="3" rx="1.5" fill="var(--accent)"/>'
            '<rect x="6" y="30" width="22" height="3" rx="1.5" fill="var(--line-default)"/>'
            '<rect x="6" y="38" width="18" height="3" rx="1.5" fill="var(--line-default)"/>'
            '<rect x="6" y="50" width="22" height="3" rx="1.5" fill="var(--line-default)"/>'
            '<rect x="42" y="22" width="48" height="6" rx="2" fill="var(--fg-faint)"/>'
            '<rect x="42" y="34" width="80" height="16" rx="3" fill="var(--bg-muted)"/>'
            '<rect x="42" y="56" width="80" height="44" rx="3" fill="var(--bg-muted)"/>'
            '<rect x="130" y="22" width="24" height="3" rx="1.5" fill="var(--accent)"/>'
            '<rect x="130" y="30" width="24" height="3" rx="1.5" fill="var(--line-default)"/>'),
    }
    return (f'<svg class="tplcard__wire" viewBox="0 0 160 100" role="img" '
            f'aria-label="Wireframe of the {kind} template">'
            f'<rect x="0" y="0" width="160" height="100" fill="var(--bg-canvas)"/>'
            f'{bar}{parts.get(kind, "")}</svg>')


def templates_html():
    cards = []
    for slug, title, blurb, uses in PAGE_TEMPLATES:
        chips = ''.join(f'<span class="tplcard__use">{html.escape(u)}</span>' for u in uses)
        cards.append(
            f'<article class="tplcard">'
            f'<a class="tplcard__shot" href="/t/{slug}.html">'
            f'<span class="tplcard__chrome" aria-hidden="true">'
            f'<span></span><span></span><span></span>'
            f'<span class="tplcard__url">/t/{slug}.html</span></span>'
            f'{wireframe(slug)}</a>'
            f'<div class="tplcard__body">'
            f'<h3 class="tplcard__title"><a href="/t/{slug}.html">{html.escape(title)}</a></h3>'
            f'<p class="tplcard__lead">{html.escape(blurb)}</p>'
            f'<div class="tplcard__uses">{chips}</div>'
            f'<a class="btn btn-outline btn-sm" href="/t/{slug}.html">Open full page</a>'
            f'</div></article>')
    return f'<div class="tplgrid">{"".join(cards)}</div>'


BAR_NAV = [
    ('Docs', '/introduction.html', 'file', None),
    ('Components', '/components.html', 'box', {'components'}),
    ('Templates', '/templates.html', 'folder', {'templates'}),
    ('Contribute', '/contribute.html', 'heart', {'contribute'}),
]


def bar_nav_html(current):
    """The primary bar, with the active item marked.

    `Docs` is the fallback: anything that is not one of the three named pages
    is documentation, so the bar always has exactly one item lit. A bar with
    nothing current reads as broken, and a bar with two reads as a bug.
    """
    named = {s for _, _, _, m in BAR_NAV if m for s in m}
    out = []
    for label, href, icon, match in BAR_NAV:
        on = (current in match) if match else (current not in named)
        out.append(
            f'<a class="barlink" href="{href}"'
            f'{" aria-current=\"page\"" if on else ""}>'
            f'<svg class="icon icon-sm" aria-hidden="true">'
            f'<use href="/icons/sprite.svg#i-{icon}"/></svg>{label}</a>')
    return ''.join(out)


def index_html(pages, groups):
    """The card index that `{{index:Group,Group}}` expands to.

    A documentation site that only has a sidebar makes you already know the
    name of the thing you are looking for. This is the other way in: every
    component on one page, as a card with its one-line lead, filterable by
    name and re-orderable into a flat A–Z list.

    The data is the SAME front matter the sidebar is built from — there is no
    second list to keep in step, which is the only reason this can be trusted
    to stay complete. Add a page with `group: Components` and its card appears
    here on the next build, with no edit to this file or to components.md.
    """
    wanted = [g.strip() for g in groups.split(',') if g.strip()]
    items = [p for p in pages if p.get('group') in wanted]
    items.sort(key=lambda p: p['title'].lower())

    if not items:
        return ''

    cards = []
    for it in items:
        lead = it.get('lead', '')
        # The first sentence is the card's job; the rest belongs on the page.
        short = lead.split('. ')[0].rstrip('.') + '.' if lead else ''
        cards.append(
            f'<a class="xcard" href="/{it["slug"]}.html" '
            f'data-name="{html.escape(it["title"].lower())}" '
            f'data-group="{html.escape(it.get("group", ""))}" '
            f'data-letter="{html.escape(it["title"][0].upper())}">'
            f'<span class="xcard__letter" aria-hidden="true">'
            f'{html.escape(it["title"][0].upper())}</span>'
            f'<span class="xcard__body">'
            f'<span class="xcard__title">{html.escape(it["title"])}</span>'
            f'<span class="xcard__lead">{html.escape(short)}</span>'
            f'</span>'
            f'<span class="xcard__group">{html.escape(it.get("group", ""))}</span>'
            f'</a>')

    chips = ''
    if len(wanted) > 1:
        chips = ''.join(
            f'<button class="xchip" type="button" data-index-group="{html.escape(g)}">'
            f'{html.escape(g)}</button>' for g in wanted)
        chips = (f'<button class="xchip is-on" type="button" data-index-group="all">All</button>'
                 f'{chips}')

    return (
        '<div class="xindex" data-index>'
        '<div class="xindex__bar">'
        '<label class="xindex__search">'
        '<svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-search"/></svg>'
        '<span class="sr-only">Filter components by name</span>'
        '<input type="search" placeholder="Filter by name…" autocomplete="off" data-index-search>'
        '</label>'
        f'<div class="xindex__chips">{chips}</div>'
        '<div class="xindex__sort" role="group" aria-label="Order">'
        '<button class="xchip is-on" type="button" data-index-sort="az">A–Z</button>'
        '<button class="xchip" type="button" data-index-sort="group">By group</button>'
        '</div>'
        f'<p class="xindex__count" data-index-count>{len(items)} components</p>'
        '</div>'
        f'<div class="xindex__grid" data-index-grid>{"".join(cards)}</div>'
        '<p class="xindex__empty" data-index-empty hidden>Nothing matches that name.</p>'
        '</div>')


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


def bundle_size():
    f = ROOT / 'dist' / 'swarnil-design.min.css'
    if not f.exists():
        return '—'
    return f'{len(gzip.compress(f.read_bytes())) / 1024:.1f}'


def build_page(page, pages, shell):
    body, toc = render(page['body'])

    # `{{index:Components}}` in a page becomes the generated card index. Done
    # here rather than in render() because only this function can see `pages`.
    for m in set(re.findall(r'\{\{index:([^}]+)\}\}', body)):
        body = body.replace('{{index:' + m + '}}', index_html(pages, m))

    if '{{templates}}' in body:
        body = body.replace('{{templates}}', templates_html())
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
        return (f'<a class="pager__item pager__item--{dir_}" href="/{p["slug"]}.html">'
                f'<span class="pager__dir">{dir_html}</span>'
                f'<span class="pager__title">{html.escape(p["title"])}</span></a>')

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
            '<a class="crumbs__link" href="/">Home</a>'
            f'<span class="crumbs__sep" aria-hidden="true">/</span>'
            f'<span class="crumbs__link">{html.escape(page.get("group", ""))}</span>'
            f'<span class="crumbs__sep" aria-hidden="true">/</span>'
            f'<span class="crumbs__here" aria-current="page">{html.escape(page["title"])}</span>'
        ),
        'v': V,
        'nav': nav_html(pages, page['slug']),
        'barnav': bar_nav_html(page['slug']),
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

    # Assets the browser needs.
    #
    # site.css and the two files it pulls in are BUILD ENTRIES, not served
    # files — `npm run docs` compiles them into assets/site.min.css with
    # Tailwind, and that one file is what every page links. Copying the source
    # as well would ship a stylesheet full of `@plugin` and `@theme` that no
    # browser can read, which is exactly the bug this replaced.
    #
    # The SOURCE TREE is not copied either. It was, so a page could link
    # /src/index.css and see an edit without a rebuild; that stopped being
    # possible the moment the system needed a compiler, and copying it shipped
    # ~900 KB and 80 fetchable files that nothing referenced.
    shutil.copytree(ASSETS, OUT / 'assets',
                    ignore=shutil.ignore_patterns('site.css', 'docs.css', 'home.css'))

    # nav.js is the system's own, but the site serves everything it loads from
    # one place, so /src/ does not have to exist in production.
    shutil.copy(ROOT / 'src' / 'js' / 'nav.js', OUT / 'assets' / 'nav.js')

    # dist/ is published so /install.html can point at a real file and a reader
    # can see the bundle they are about to link.
    if (ROOT / 'dist').is_dir():
        (OUT / 'dist').mkdir(exist_ok=True)
        for f in sorted((ROOT / 'dist').glob('*.css')):
            shutil.copy(f, OUT / 'dist' / f.name)

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

    # ── The template pages ────────────────────────────────────────────────
    # Real pages, wrapped in a shell that adds only a "back to templates" bar.
    # They link the SAME site.min.css the docs run on, which is the whole
    # point: a template is the system arranged, not a mock-up with its own CSS.
    tpl_shell = (PAGES_DIR / '_shell.html').read_text()
    (OUT / 't').mkdir(exist_ok=True)
    built = 0
    for slug, title, blurb, uses in PAGE_TEMPLATES:
        src = PAGES_DIR / f'{slug}.html'
        if not src.exists():
            print(f'  warning: docs/pages/{slug}.html missing — listed but not built')
            continue
        out = tpl_shell
        for k, v in {
            'title': html.escape(title),
            'name': NAME,
            'blurb': html.escape(blurb),
            'uses': html.escape(' · '.join(uses)),
            'body': src.read_text(),
            'v': V,
        }.items():
            out = out.replace('{' + k + '}', v)
        (OUT / 't' / f'{slug}.html').write_text(out)
        built += 1

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

    print(f'built {len(docs)} doc pages{" + home" if home else ""}'
          f' + {built} templates -> site/')


if __name__ == '__main__':
    main()
