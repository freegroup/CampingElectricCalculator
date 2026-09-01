/*
 * Blog generator.
 *
 * Reads every article under content/blog/<slug>/content.md, renders it to a
 * self-contained static HTML page under public/blog/<slug>/index.html, copies
 * the article images alongside it, and (from the collected article list) writes
 * the blog index page, an RSS 2.0 feed and the blog section of the sitemap.
 *
 * It runs BEFORE `vue-cli-service build`, so its output in public/ is picked up
 * by the Vue CLI copy step and lands in docs/ — which CI commits.
 *
 * New article  =  new folder in content/blog/  +  a content.md with front
 * matter (title, description, optional date, optional layout). Nothing else to
 * wire up.
 */

const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const { marked } = require('marked')

const ROOT = path.resolve(__dirname, '..')
const CONTENT_DIR = path.join(ROOT, 'content', 'blog')
const OUT_DIR = path.join(ROOT, 'public', 'blog')
const SITEMAP = path.join(ROOT, 'public', 'sitemap.xml')

const SITE = 'https://camper-elektrik-planer.de'
const BASE = SITE + '/blog'

// The three layout variants for the leading image. One is chosen per article
// via a stable hash of the slug (so the same article always renders the same
// way and rebuilds produce no churn), unless overridden by `layout:` in the
// front matter.
const LAYOUTS = ['image-top', 'image-left', 'image-right']

// ---------------------------------------------------------------------------
// small helpers
// ---------------------------------------------------------------------------

function escapeHtml (s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Minimal YAML front matter parser: a `---` fenced block of `key: value` pairs
// at the top of the file. Values may be quoted. That is all our articles use.
function parseFrontMatter (raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return { data: {}, body: raw }
  const data = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!kv) continue
    let value = kv[2].trim()
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    data[kv[1]] = value
  }
  return { data, body: m[2] }
}

// Stable non-negative hash of a string.
function hash (s) {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function rfc822 (date) {
  return date.toUTCString()
}

function isoDate (date) {
  return date.toISOString().slice(0, 10)
}

// The day the article was first committed (its "created on GitHub" date), or
// null if it has no git history yet (e.g. a brand-new, uncommitted article on
// a local checkout). This is the natural publish date and needs no manual
// upkeep. We take the oldest add-commit so later edits never change the order,
// and use the author date so it survives rebases. A fresh CI checkout resets
// the filesystem mtime to "now", so mtime alone cannot order articles.
function gitCreatedDate (file) {
  try {
    const out = execFileSync('git',
      ['log', '--diff-filter=A', '--follow', '--format=%aI', '--', file],
      { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
    const lines = out.split('\n').filter(Boolean)
    return lines.length ? new Date(lines[lines.length - 1]) : null
  } catch (e) {
    return null
  }
}

// ---------------------------------------------------------------------------
// shared page chrome (mirrors the hand-written static pages under public/de/)
// ---------------------------------------------------------------------------

const STYLE = `:root{--ink:#212121;--muted:#5f6368;--line:#e0e0e0;--bg:#f7f8fb;--accent:#2e7d32;--accent-dk:#1b5e20;--head:#d9dff2}
*{box-sizing:border-box}
body{margin:0;font:16px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--ink);background:#fff}
header{background:var(--head);padding:10px 0;border-bottom:1px solid rgba(0,0,0,.08);box-shadow:0 1px 4px rgba(0,0,0,.06)}
.wrap{max-width:760px;margin:0 auto;padding:0 20px}
header .wrap{max-width:none;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.brand{display:flex;align-items:center;gap:16px;text-decoration:none;color:var(--ink)}
.brand-logo{width:56px;height:56px;border-radius:50%;display:block;flex-shrink:0}
.brand-title{font-size:2rem;font-weight:300;line-height:1.2;letter-spacing:.2px}
nav{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
nav a{display:inline-flex;align-items:center;gap:8px;height:32px;padding:0 14px;color:#fff;text-decoration:none;font-size:.8rem;font-weight:500;letter-spacing:.09em;text-transform:uppercase;border-radius:4px;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);transition:filter .15s}
nav a:hover{filter:brightness(.92)}
nav a svg{width:20px;height:20px;fill:currentColor;flex-shrink:0}
nav a.dark{background:#212121}
nav a.blog{background:#388e3c}
nav a.coffee{background:#00bfa5}
h1{font-size:2rem;line-height:1.25;margin:36px 0 14px}
h2{font-size:1.35rem;margin:38px 0 12px;padding-top:6px}
h3{font-size:1.05rem;margin:24px 0 6px}
p,li{color:#333}
.lead{font-size:1.1rem;color:#444}
a{color:var(--accent-dk)}
.cta{display:inline-block;background:var(--accent);color:#fff;text-decoration:none;padding:13px 24px;border-radius:8px;font-weight:600;margin:6px 8px 6px 0}
.cta:hover{background:var(--accent-dk)}
.cta.sec{background:#fff;color:var(--accent-dk);border:2px solid var(--accent)}
.cta.sec:hover{background:#f1f8f2}
.box{background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:16px 20px;margin:22px 0}
.warn{background:#fff8e1;border-color:#ffe082}
.crumb{font-size:14px;color:var(--muted);margin:18px 0 0}
.crumb a{color:var(--muted)}
.meta{color:var(--muted);font-size:14px;margin:0 0 8px}
article img{max-width:100%;height:auto;border-radius:10px}
figure{margin:0 0 22px}
figure img{width:100%;height:auto;border-radius:10px;display:block}
figure figcaption{font-size:13px;color:var(--muted);margin-top:6px}
.fig-left{float:left;width:320px;max-width:45%;margin:6px 24px 14px 0}
.fig-right{float:right;width:320px;max-width:45%;margin:6px 0 14px 24px}
article::after{content:"";display:block;clear:both}
.cards{list-style:none;padding:0;margin:28px 0}
.cards li{border-bottom:1px solid var(--line);padding:22px 0}
.cards a.title{font-size:1.25rem;font-weight:600;text-decoration:none;color:var(--ink)}
.cards a.title:hover{color:var(--accent-dk)}
.cards .thumb{float:right;width:150px;margin:0 0 10px 18px;border-radius:8px}
.feedlink{font-size:13px}
/* Same footer as the app (AppFooter.vue): fixed to the bottom, light grey bar,
   one centered line of links separated by dots. Colours and heights are the ones
   that component ends up with - grey darken-1 on grey lighten-4, elevation 4,
   and the 28px content row of the Vuetify container/row/col paddings. */
body{padding-bottom:80px}
footer{position:fixed;left:0;right:0;bottom:0;z-index:5;background:#f5f5f5;border-top:1px solid rgba(0,0,0,.08);box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);padding:24px 0;font-size:14px;line-height:1.5;color:#757575}
footer .wrap{max-width:none;min-height:28px;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:4px}
footer a{color:#757575;text-decoration:none;transition:color .2s ease}
footer a:hover{color:#1976d2;text-decoration:underline}
footer .sep{margin:0 8px;color:#bdbdbd}
footer .heart{color:#ff5252;display:inline-block;margin:0 2px;animation:heartbeat 1.5s ease-in-out infinite}
footer .ico{width:16px;height:16px;fill:currentColor;flex-shrink:0;margin-right:4px}
footer .visitors,footer .visitors-sep{display:none}
footer .stats{display:inline-flex;align-items:center}
@media(min-width:960px){footer .visitors{display:inline-flex;align-items:center}footer .visitors-sep{display:inline}}
@keyframes heartbeat{0%,100%{transform:scale(1)}10%,30%{transform:scale(1.1)}20%,40%{transform:scale(1)}}
@media(max-width:600px){h1{font-size:1.6rem}.cta{display:block;text-align:center;margin-right:0}.fig-left,.fig-right{float:none;width:100%;max-width:100%;margin:0 0 18px}.cards .thumb{width:110px}.brand-logo{width:40px;height:40px}.brand-title{font-size:1.15rem}nav a{padding:0 10px;height:30px;font-size:.72rem}nav a svg{width:18px;height:18px}body{padding-bottom:64px}footer{padding:8px 0;font-size:12px;line-height:1.4}footer .sep{margin:0 5px}footer .stats,footer .stats-sep{display:none}}`

function head (title, description, canonical, extra = '') {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${canonical}">
<link rel="icon" href="/favicon.ico">
<link rel="alternate" type="application/rss+xml" title="Camper Elektrik Planer – Blog" href="${BASE}/feed.xml">
${extra}<style>
${STYLE}
</style>
</head>
<body>

<header><div class="wrap">
  <a class="brand" href="/">
    <img class="brand-logo" src="/logo.svg" alt="" width="52" height="52">
    <span class="brand-title">Camper Elektrik Designer</span>
  </a>
  <nav>
    <a class="dark" href="/en/" title="English"><svg viewBox="0 0 24 24"><path d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z"/></svg>DE</a>
    <a class="blog" href="/blog/"><svg viewBox="0 0 24 24"><path d="M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z"/></svg>Blog</a>
    <a class="coffee" href="https://www.paypal.com/paypalme/freegroup/2.50" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z"/></svg>Spendiere mir einen Kaffee</a>
    <a class="dark" href="/#/"><svg viewBox="0 0 24 24"><path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"/></svg>Anmelden</a>
  </nav>
</div></header>
`
}

// The same footer the app shows (AppFooter.vue) and the static pages carry: the
// visitor total from GoatCounter, the credit line, and the legal pages.
const FOOTER = `
<footer><div class="wrap">
  <span class="visitors"><svg class="ico" viewBox="0 0 24 24"><path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"/></svg><span id="visitorCount">Lädt...</span></span>
  <span class="sep visitors-sep">•</span>
  <span>Gemacht mit <span class="heart">&hearts;</span> für Camper</span>
  <span class="sep stats-sep">•</span>
  <a class="stats" href="https://camping-calculator.goatcounter.com" target="_blank" rel="noopener noreferrer"><svg class="ico" viewBox="0 0 24 24"><path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z"/></svg>Statistiken</a>
  <span class="sep">•</span>
  <a href="/impressum/">Impressum</a>
  <span class="sep">•</span>
  <a href="/datenschutz/">Datenschutz</a>
</div></footer>

<script>
fetch("https://camping-calculator.goatcounter.com/api/v0/stats/total",{headers:{Authorization:"Bearer 1jyqqbdeaorhiy63vxt0disqjm99ofzc2fcsl232fai15jdqdi"}})
  .then(function(r){return r.json()})
  .then(function(d){var n=Number(d.total_utc)||0,s=n>=1000?(n/1000).toFixed(1)+"K":n.toLocaleString();
    document.getElementById("visitorCount").innerHTML="<strong>"+s+"</strong> Besucher"})
  .catch(function(){document.getElementById("visitorCount").textContent="Besucher"})
</script>

</body>
</html>
`

// ---------------------------------------------------------------------------
// article rendering
// ---------------------------------------------------------------------------

// Pull the first markdown image out of the body so it can be placed as a
// dedicated figure according to the chosen layout. Returns the image (or null)
// and the body with that first image removed.
function extractLeadImage (body) {
  const re = /!\[([^\]]*)\]\(([^)\s]+)\)/
  const m = body.match(re)
  if (!m) return { image: null, body }
  return {
    image: { alt: m[1], src: m[2] },
    body: body.replace(re, '').replace(/^\s*\n/, '')
  }
}

// Rewrite folder-relative image sources to absolute /blog/<slug>/ paths.
function absolutiseImages (html, slug) {
  return html.replace(/(<img[^>]+src=")(?!https?:|\/)([^"]+)(")/g,
    (_, a, src, b) => `${a}/blog/${slug}/${src}${b}`)
}

function renderArticle (article) {
  const { slug, title, description, date, lastmod, layout, image, bodyHtml } = article
  const canonical = `${BASE}/${slug}/`

  let figure = ''
  if (image) {
    const src = /^https?:|^\//.test(image.src) ? image.src : `/blog/${slug}/${image.src}`
    const cls = layout === 'image-left' ? 'fig-left'
      : layout === 'image-right' ? 'fig-right' : ''
    const caption = image.alt
      ? `<figcaption>${escapeHtml(image.alt)}</figcaption>` : ''
    figure = `<figure class="${cls}"><img src="${src}" alt="${escapeHtml(image.alt)}" loading="lazy">${caption}</figure>\n`
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        inLanguage: 'de',
        datePublished: isoDate(date),
        dateModified: isoDate(lastmod),
        mainEntityOfPage: canonical,
        ...(image ? { image: `${BASE}/${slug}/${image.src}` } : {}),
        author: { '@type': 'Organization', name: 'Camper Elektrik Planer' }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/` },
          { '@type': 'ListItem', position: 3, name: title, item: canonical }
        ]
      }
    ]
  }

  const dateLabel = date.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })

  return head(title, description, canonical,
    `<meta property="og:type" content="article">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="Camper Elektrik Planer">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${canonical}">
${image ? `<meta property="og:image" content="${BASE}/${slug}/${image.src}">\n` : ''}`) +
`
<main class="wrap">

<p class="crumb"><a href="/">Start</a> › <a href="/blog/">Blog</a> › ${escapeHtml(title)}</p>

<h1>${escapeHtml(title)}</h1>
<p class="meta"><time datetime="${isoDate(date)}">${dateLabel}</time></p>

<article>
${figure}${bodyHtml}
</article>

<p>
  <a class="cta" href="/#/map/new">Ganze Anlage planen</a>
  <a class="cta sec" href="/de/kabelquerschnitt-berechnen/">Kabelquerschnitt berechnen</a>
</p>

<p class="crumb"><a href="/blog/">← Alle Beiträge</a></p>

</main>

<script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
</script>
` + FOOTER
}

// ---------------------------------------------------------------------------
// index page + feed + sitemap
// ---------------------------------------------------------------------------

function renderIndex (articles) {
  const canonical = `${BASE}/`
  const items = articles.map(a => {
    const thumb = a.image
      ? `<img class="thumb" src="/blog/${a.slug}/${a.image.src}" alt="${escapeHtml(a.image.alt)}" loading="lazy">`
      : ''
    const dateLabel = a.date.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })
    return `  <li>
    ${thumb}<a class="title" href="/blog/${a.slug}/">${escapeHtml(a.title)}</a>
    <p class="meta"><time datetime="${isoDate(a.date)}">${dateLabel}</time></p>
    <p>${escapeHtml(a.description)}</p>
    <p><a href="/blog/${a.slug}/">Weiterlesen →</a></p>
  </li>`
  }).join('\n')

  return head('Blog – Camper Elektrik Planer',
    'Artikel rund um die 12-V-Elektrik im Wohnmobil: Kabel, Sicherungen, Batterie, Solar und Ladetechnik — verständlich erklärt.',
    canonical,
    `<meta property="og:type" content="website">
<meta property="og:title" content="Blog – Camper Elektrik Planer">
<meta property="og:url" content="${canonical}">
`) +
`
<main class="wrap">

<p class="crumb"><a href="/">Start</a> › Blog</p>

<h1>Blog</h1>
<p class="lead">Hintergrundwissen zur 12-Volt-Elektrik im Wohnmobil — verständlich erklärt und
mit dem passenden Rechner verlinkt. <a class="feedlink" href="/blog/feed.xml">RSS-Feed abonnieren</a>.</p>

<ul class="cards">
${items}
</ul>

</main>
` + FOOTER
}

function renderFeed (articles) {
  const items = articles.map(a => `    <item>
      <title>${escapeHtml(a.title)}</title>
      <link>${BASE}/${a.slug}/</link>
      <guid isPermaLink="true">${BASE}/${a.slug}/</guid>
      <pubDate>${rfc822(a.date)}</pubDate>
      <description>${escapeHtml(a.description)}</description>
    </item>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Camper Elektrik Planer – Blog</title>
    <link>${BASE}/</link>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Artikel rund um die 12-V-Elektrik im Wohnmobil.</description>
    <language>de-DE</language>
    <lastBuildDate>${rfc822(articles[0] ? articles[0].lastmod : new Date())}</lastBuildDate>
${items}
  </channel>
</rss>
`
}

// Idempotently inject the blog URLs into public/sitemap.xml between marker
// comments. If the markers are absent, insert a fresh block before </urlset>.
function updateSitemap (articles) {
  if (!fs.existsSync(SITEMAP)) return
  let xml = fs.readFileSync(SITEMAP, 'utf8')

  const entries = [`  <url>
    <loc>${BASE}/</loc>
    <lastmod>${isoDate(articles[0] ? articles[0].lastmod : new Date())}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`]
  for (const a of articles) {
    entries.push(`  <url>
    <loc>${BASE}/${a.slug}/</loc>
    <lastmod>${isoDate(a.lastmod)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`)
  }
  const block = `  <!-- blog:start -->\n${entries.join('\n')}\n  <!-- blog:end -->`

  if (/<!-- blog:start -->[\s\S]*<!-- blog:end -->/.test(xml)) {
    xml = xml.replace(/ *<!-- blog:start -->[\s\S]*<!-- blog:end -->/, block)
  } else {
    xml = xml.replace(/<\/urlset>/, `${block}\n\n</urlset>`)
  }
  fs.writeFileSync(SITEMAP, xml)
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

function main () {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('[blog] no content/blog directory, nothing to build')
    return
  }

  // Start from an empty output directory, so a renamed or deleted article never
  // leaves a stale page behind: what is in content/blog is exactly what gets
  // published. Safe to wipe - everything under public/blog is generated here and
  // is git-ignored.
  fs.rmSync(OUT_DIR, { recursive: true, force: true })

  const slugs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  const articles = []

  for (const slug of slugs) {
    const dir = path.join(CONTENT_DIR, slug)
    const mdPath = path.join(dir, 'index.md')
    if (!fs.existsSync(mdPath)) continue

    const raw = fs.readFileSync(mdPath, 'utf8')
    const { data, body } = parseFrontMatter(raw)
    if (!data.title) {
      console.warn(`[blog] skipping ${slug}: no title in front matter`)
      continue
    }

    // Order by the article's creation date. An explicit `date:` in the front
    // matter wins; otherwise use the git creation day (see gitCreatedDate).
    // A not-yet-committed article has no git date and falls back to mtime,
    // which locally is "now" — i.e. it sorts newest, which is correct.
    const date = data.date
      ? new Date(data.date)
      : (gitCreatedDate(mdPath) || fs.statSync(mdPath).mtime)
    // `lastmod` is the "updated" date and drives sitemap <lastmod> / JSON-LD
    // dateModified; it never affects ordering. Defaults to the created date.
    const lastmod = data.lastmod ? new Date(data.lastmod) : date
    const layout = LAYOUTS.includes(data.layout)
      ? data.layout
      : LAYOUTS[hash(slug) % LAYOUTS.length]

    const { image, body: rest } = extractLeadImage(body)
    const bodyHtml = absolutiseImages(marked.parse(rest), slug)

    const outDir = path.join(OUT_DIR, slug)
    fs.mkdirSync(outDir, { recursive: true })

    // Copy every asset (images etc.) that sits next to index.md.
    for (const f of fs.readdirSync(dir)) {
      if (f === 'index.md') continue
      if (f === 'blogagent.yaml') continue
      fs.copyFileSync(path.join(dir, f), path.join(outDir, f))
    }

    const article = {
      slug,
      title: data.title,
      description: data.description || '',
      date,
      lastmod,
      layout,
      image,
      bodyHtml
    }
    fs.writeFileSync(path.join(outDir, 'index.html'), renderArticle(article))
    articles.push(article)
    console.log(`[blog] rendered ${slug} (${layout})`)
  }

  // Newest first by full creation timestamp; ties broken by slug so ordering
  // is deterministic. (The pages themselves only render the day, not the time.)
  articles.sort((a, b) => (b.date - a.date) || a.slug.localeCompare(b.slug))

  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), renderIndex(articles))
  fs.writeFileSync(path.join(OUT_DIR, 'feed.xml'), renderFeed(articles))
  updateSitemap(articles)

  console.log(`[blog] ${articles.length} article(s), index + feed + sitemap written`)
}

main()
