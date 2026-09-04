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
import html
import json
import pathlib
import re
import shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / 'docs'
CONTENT = DOCS / 'content'
TEMPLATES = DOCS / 'templates'
ASSETS = DOCS / 'assets'
OUT = ROOT / 'site'

SITE = 'https://design.imswarnil.com'
NAME = 'Swarnil Design System'

# Nav group order. A page names its group in front matter; a group not listed
# here sorts to the end, so adding one is never a silent disappearance.
GROUPS = [
    'Start',
    'Foundation',
    'Elements',
    'Components',
    'Patterns',
    'Sections',
    'Utilities',
]


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
        if re.match(r'^[-*] ', s) or re.match(r'^\d+\. ', s):
            ordered = bool(re.match(r'^\d+\. ', s))
            items = []
            while i < n and (re.match(r'^[-*] ', lines[i].strip())
                             or re.match(r'^\d+\. ', lines[i].strip())):
                items.append(re.sub(r'^([-*]|\d+\.)\s+', '', lines[i].strip()))
                i += 1
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
        parts.append(
            f'<details class="nav__group"{" open" if open_ else ""}>'
            f'<summary class="nav__title">{html.escape(g)}</summary>'
            f'<div class="nav__links">{li}</div></details>')
    return ''.join(parts)


def toc_html(toc):
    if len(toc) < 2:
        return ''
    li = ''.join(
        f'<a class="toc__link toc__link--h{lvl}" href="#{sid}">{html.escape(txt)}</a>'
        for lvl, sid, txt in toc)
    return (f'<nav class="toc" aria-label="On this page">'
            f'<p class="toc__head">On this page</p>{li}</nav>')


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
        return (f'<a class="pager__item pager__item--{dir_}" href="/{p["slug"]}.html">'
                f'<span class="pager__dir">{"Previous" if dir_ == "prev" else "Next"}</span>'
                f'<span class="pager__title">{html.escape(p["title"])}</span></a>')

    # Plain token replacement, not str.format: the shell contains real
    # JavaScript, and every brace in it would otherwise need doubling.
    fields = {
        'title': html.escape(page['title']),
        'name': NAME,
        'lead_meta': html.escape(page.get('lead', '')),
        'canonical': f'{SITE}/{page["slug"]}.html',
        'group': html.escape(page.get('group', '')),
        'v': V,
        'nav': nav_html(pages, page['slug']),
        'toc': toc_html(toc),
        'lead': lead,
        'body': body,
        'pager': pager(prev_, 'prev') + pager(next_, 'next'),
        'year': '2026',
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

    # Assets the browser needs: the docs' own css/js, and the system itself.
    shutil.copytree(ASSETS, OUT / 'assets')
    for name in ('src', 'icons'):
        if (ROOT / name).is_dir():
            shutil.copytree(ROOT / name, OUT / name)

    # The page links /src/index.css?v=… but an @import INSIDE it names its
    # children with no query at all, so the browser happily serves a cached
    # 12-frame.css behind a freshly-versioned index — including files that no
    # longer exist. Stamp the version onto every @import in the COPY (never the
    # source) so a rebuild is actually visible.
    for css in (OUT / 'src').rglob('*.css'):
        text = css.read_text()
        stamped = re.sub(r"@import url\('(\./[^']+\.css)'\)",
                         lambda m: f"@import url('{m.group(1)}{V}')", text)
        if stamped != text:
            css.write_text(stamped)
    if (ROOT / 'dist').is_dir():
        shutil.copytree(ROOT / 'dist', OUT / 'dist')

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
