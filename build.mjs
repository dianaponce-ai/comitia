import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { feature } from 'topojson-client';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { GROUPS } from './src/locations.mjs';

const ORIGIN = process.env.SITE_ORIGIN || 'https://comitiacorp.com';
const BASE = (process.env.SITE_BASE || '').replace(/\/$/, '');
const W = 1000, H = 470;
const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/land-110m.json'));
const land = feature(topo, topo.objects.land);
const proj = geoEqualEarth().rotate([-10, 0]).fitExtent([[0, 0], [W, H + 40]], { type: 'Sphere' });
const LAND = geoPath(proj).digits(1)(land);

const offices = { tampa:[-82.46,27.95], miami:[-80.19,25.76], colonia:[-57.84,-34.47], dubai:[55.27,25.20], barcelona:[2.17,41.39], bsas:[-58.38,-34.60], asuncion:[-57.58,-25.26], quito:[-78.47,-0.18], tegucigalpa:[-87.19,14.07], johannesburg:[28.05,-26.20], sanjose:[-84.08,9.93], ontario:[-79.38,43.65] };
const LAND_PTS = {};
for (const k in offices) { const [x, y] = proj(offices[k]); LAND_PTS[k] = [+(x / W * 100).toFixed(2), +(y / H * 100).toFixed(2)]; }

const LOC = GROUPS.map(([r, id, name, lon, lat, items]) => { const [x, y] = proj([lon, lat]); return { r, id, name, x: +x.toFixed(1), y: +y.toFixed(1), items }; });
const VB = { world: [0, 0, W, H] };
for (const r of ['ar', 'latam', 'na', 'eu', 'mea', 'apac']) {
  const pts = LOC.filter(g => g.r === r);
  let x0 = Math.min(...pts.map(p => p.x)), x1 = Math.max(...pts.map(p => p.x));
  let y0 = Math.min(...pts.map(p => p.y)), y1 = Math.max(...pts.map(p => p.y));
  const pad = 40; x0 -= pad; x1 += pad; y0 -= pad; y1 += pad;
  let w = Math.max(x1 - x0, 200), h = Math.max(y1 - y0, 200 * H / W);
  if (w / h > W / H) h = w * H / W; else w = h * W / H;
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  VB[r] = [cx - w / 2, cy - h / 2, w, h].map(v => +v.toFixed(1));
}

// News articles: src/news/{slug}.{lang}.md
const escH = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slugify = t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
const NB = {};
for (const f of fs.readdirSync('src/news').filter(f => f.endsWith('.md')).sort()) {
  const [slug, lg] = f.replace(/\.md$/, '').split('.');
  const raw = fs.readFileSync('src/news/' + f, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const title = m[1].match(/title:\s*(.*)/)[1].trim();
  const blocks = m[2].trim().split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  const used = {}; const toc = []; let html = ''; let words = 0; let first = '';
  for (const b of blocks) {
    words += b.split(/\s+/).length;
    const h = b.match(/^(#{2,3})\s+(.*)$/);
    if (h) {
      let id = slugify(h[2]); while (used[id]) id += '-2'; used[id] = 1;
      if (h[1] === '##') toc.push([id, escH(h[2])]);
      html += `<h${h[1].length} id="${id}">${escH(h[2])}</h${h[1].length}>`;
    } else { if (!first) first = b; html += `<p>${escH(b)}</p>`; }
  }
  const sents = first.match(/[^.!?]+[.!?]+/g) || [first];
  let ex = sents[0].trim(); if (ex.length < 110 && sents[1]) ex += ' ' + sents[1].trim();
  (NB[slug] = NB[slug] || {})[lg] = { t: title, html, toc, ex, min: Math.max(1, Math.round(words / 220)) };
}
for (const k in NB) for (const l of ['es', 'en', 'pt']) if (!NB[k][l]) throw new Error('missing ' + k + ' ' + l);
const css = fs.readFileSync('src/style.css', 'utf8');
const FAVSVG = fs.readFileSync('src/icons/favicon.svg', 'utf8');
const ICONS = (b) => `<link rel="icon" href="${b}/favicon.svg" type="image/svg+xml"><link rel="icon" href="${b}/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="${b}/apple-touch-icon.png"><link rel="manifest" href="${b}/site.webmanifest"><meta name="theme-color" content="#1E2740">`;
const code = [
  fs.readFileSync('src/prelude.js', 'utf8'),
  fs.readFileSync('src/data-core.js', 'utf8'),
  'var NB=' + JSON.stringify(NB) + ';',
  'var LOGOS=' + JSON.stringify(Object.fromEntries(fs.readdirSync('src/logos').filter(f => f.endsWith('.svg')).map(f => [f.slice(0, -4), fs.readFileSync('src/logos/' + f, 'utf8').replace(/\s*\n\s*/g, ' ')]))) + ';',
  'var LOC=' + JSON.stringify(LOC) + ';var VB=' + JSON.stringify(VB) + ';var LAND_PTS=' + JSON.stringify(LAND_PTS) + ';var LAND=' + JSON.stringify(LAND) + ';',
  fs.readFileSync('src/app.js', 'utf8')
].join('\n');

const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">';
const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
<symbol id="iso" viewBox="0 0 100 100"><g fill="none" stroke-width="8.4" stroke-linecap="round" stroke-linejoin="round"><path d="M89.53 55.5L59.53 55.5L74.53 81.48 M65 86.98L50 61L35 86.98 M25.47 81.48L40.47 55.5L10.47 55.5 M10.47 44.5L40.47 44.5L25.47 18.52 M74.53 18.52L59.53 44.5L89.53 44.5" stroke="currentColor"/><path d="M43 26.88L50 39L65.5 12.15" stroke="#5AC4B2"/></g></symbol>
<symbol id="arrow" viewBox="0 0 16 16"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></symbol>
<symbol id="back" viewBox="0 0 16 16"><path d="M14 8H3M7 4L3 8l4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></symbol>
<symbol id="ext" viewBox="0 0 16 16"><path d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></symbol>
<symbol id="dl" viewBox="0 0 16 16"><path d="M8 2v8M4.5 6.5L8 10l3.5-3.5M3 13h10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></symbol>
</svg>`;

/* 1) Artifact (single file, hash routes per language) */
const artifact = `<title>Comitia</title>
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(FAVSVG.replace(/\s+/g, ' '))}">
<meta name="claude:viewport-fit-sides" content="cover">
${FONTS}
<style>${css}</style>
${SPRITE}
<div id="app"></div>
<script>var __SITE__={mode:'spa',base:'',img:${JSON.stringify(process.env.ARTIFACT_IMG_ORIGIN || ORIGIN + BASE)}};</script>
<script>${code.replace(/<\/script/gi, '<\\/script')}</script>
`;
fs.mkdirSync('artifact', { recursive: true });
fs.writeFileSync('artifact/comitia.html', artifact);

/* 2) Static site: one URL per language and page */
const ctx = { __SITE__: { mode: 'static', base: BASE, build: true }, console };
vm.createContext(ctx);
vm.runInContext(code, ctx);
const { PAGES, LANGS } = ctx;
const out = 'dist';
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out + '/assets', { recursive: true });
fs.writeFileSync(out + '/assets/site.css', css);
for (const f of fs.readdirSync('src/icons')) fs.copyFileSync('src/icons/' + f, out + '/' + f);
fs.cpSync('src/img', out + '/img', { recursive: true });
fs.cpSync('src/video', out + '/video', { recursive: true });
fs.writeFileSync(out + '/site.webmanifest', JSON.stringify({ name: 'Comitia', short_name: 'Comitia', start_url: BASE + '/', display: 'browser', background_color: '#1E2740', theme_color: '#1E2740', icons: [{ src: BASE + '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: BASE + '/icon-512.png', sizes: '512x512', type: 'image/png' }] }, null, 2));
fs.writeFileSync(out + '/assets/app.js', code);
const LOCALE = { es: 'es_AR', en: 'en_US', pt: 'pt_BR' };
const HTMLLANG = { es: 'es', en: 'en', pt: 'pt-BR' };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const urls = [];
let problems = 0;
for (const page of PAGES) {
  const alts = {};
  for (const l of LANGS) { ctx.lang = l; alts[l] = ORIGIN + ctx.path(page, l); }
  urls.push(alts);
  for (const l of LANGS) {
    ctx.lang = l;
    const body = ctx.chrome(page, ctx.viewHTML(page));
    if (/undefined|NaN/.test(body.replace(/typeof [a-zA-Z_]+!=='undefined'/g, ''))) { problems++; console.log('check', l, page); }
    const m = ctx.meta(page);
    const ld = page === 'inicio' ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: 'Comitia', alternateName: 'Comitia | Grupo MSA', url: ORIGIN, logo: ORIGIN + BASE + '/icon-512.png', description: m.desc, parentOrganization: { '@type': 'Organization', name: 'Grupo MSA', url: 'https://www.msa.com.ar/' }, contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: 'contactus@comitiacorp.com', telephone: '+541160911540' } })}</script>` : '';
    const head = `<!doctype html>
<html lang="${HTMLLANG[l]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.desc)}">
<link rel="canonical" href="${alts[l]}">
${LANGS.map(x => `<link rel="alternate" hreflang="${HTMLLANG[x]}" href="${alts[x]}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${alts.es}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Comitia">
<meta property="og:title" content="${esc(m.title)}">
<meta property="og:description" content="${esc(m.desc)}">
<meta property="og:url" content="${alts[l]}">
<meta property="og:locale" content="${LOCALE[l]}">
${LANGS.filter(x => x !== l).map(x => `<meta property="og:locale:alternate" content="${LOCALE[x]}">`).join('\n')}
<meta property="og:image" content="${m.img ? ORIGIN + BASE + '/img/' + m.img + '.webp' : ORIGIN + BASE + '/comitia-og.jpg'}">
<meta name="twitter:card" content="summary_large_image">
${ICONS(BASE)}
${FONTS}
<link rel="stylesheet" href="${BASE}/assets/site.css">
${ld}
</head>
<body>
${SPRITE}
<div id="app">${body}</div>
<script>window.__SITE__=${JSON.stringify({ mode: 'static', base: BASE, page, lang: l })};</script>
<script src="${BASE}/assets/app.js" defer></script>
</body>
</html>
`;
    const dir = path.join(out, ctx.path(page, l).slice(BASE.length));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), head);
  }
}
// Root: send visitors to their language, crawlers see x-default links
fs.writeFileSync(out + '/index.html', `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>COMITIA</title>${ICONS(BASE)}
<link rel="canonical" href="${ORIGIN}${BASE}/es/">
<link rel="alternate" hreflang="es" href="${ORIGIN}${BASE}/es/"><link rel="alternate" hreflang="en" href="${ORIGIN}${BASE}/en/"><link rel="alternate" hreflang="pt-BR" href="${ORIGIN}${BASE}/pt/"><link rel="alternate" hreflang="x-default" href="${ORIGIN}${BASE}/es/">
<script>var n=(navigator.language||'es').slice(0,2);location.replace('${BASE}/'+(n==='en'||n==='pt'?n:'es')+'/');</script>
<meta http-equiv="refresh" content="0; url=${BASE}/es/"></head><body><a href="${BASE}/es/">Español</a> · <a href="${BASE}/en/">English</a> · <a href="${BASE}/pt/">Português</a></body></html>`);
fs.writeFileSync(out + '/.nojekyll', '');
fs.writeFileSync(out + '/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.flatMap(a => LANGS.map(l => `  <url><loc>${a[l]}</loc>${LANGS.map(x => `<xhtml:link rel="alternate" hreflang="${HTMLLANG[x]}" href="${a[x]}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${a.es}"/></url>`)).join('\n')}
</urlset>
`);
fs.writeFileSync(out + '/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}${BASE}/sitemap.xml\n`);
console.log('pages', PAGES.length * LANGS.length, 'problems', problems, 'artifact KB', Math.round(artifact.length / 1024));
