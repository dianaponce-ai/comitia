// Genera el sitio estático de Comitia en dist/
//   - Una página HTML por ruta e idioma (/es/... y /en/...), con su title,
//     description, canonical, hreflang, Open Graph y datos estructurados.
//   - Imágenes optimizadas a WebP (dos tamaños) desde los originales en src/assets.
//   - CSS original (src/styles) minificado en un solo archivo.
//   - JS mínimo (src/client) con carga diferida de 3D, carruseles y mapa.
// Uso: node build.mjs            → para comitiacorp.com
//      SITE_BASE=/comitia node build.mjs → para una subcarpeta (vista previa)
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';
import * as esbuild from 'esbuild';
import * as S from './src/site.mjs';

const BASE = (process.env.SITE_BASE || '').replace(/\/$/, '');
const ORIGIN = S.SITE_URL;
const OUT = 'dist';
const CACHE = '.cache/img';
const t0 = Date.now();

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT + '/assets', { recursive: true });

/* ---------- 1. Imágenes ---------- */
// Clave → { src, sm?, w } (rutas públicas). Las claves son las rutas originales:
//   src/assets/img/<x>          → "<x>"                 → /img/<x>.webp
//   src/assets/casos/<x>.jpg    → "casos/images/<x>.jpg" (como en casos.json) → /casos/images/<x>.webp
//   src/assets/blog/<x>.jpg     → "blog/images/<x>.jpg"  (como en blog.json)  → /blog/images/<x>.webp
const assets = {};
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const sources = [
  ...walk('src/assets/img').map((f) => [f, path.relative('src/assets/img', f), 'img/' + path.relative('src/assets/img', f)]),
  ...walk('src/assets/casos').map((f) => [f, 'casos/images/' + path.basename(f), 'casos/images/' + path.basename(f)]),
  ...walk('src/assets/blog').map((f) => [f, 'blog/images/' + path.basename(f), 'blog/images/' + path.basename(f)]),
];
let made = 0;
await Promise.all(sources.map(async ([file, key, out]) => {
  const ext = path.extname(file).toLowerCase();
  const dest = path.join(OUT, out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (ext === '.svg') { fs.copyFileSync(file, dest); assets[key] = { src: '/' + out }; return; }
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;
  const isQR = /qr-/.test(file);
  const stat = fs.statSync(file);
  const stem = out.slice(0, -ext.length);
  const meta = await sharp(file).metadata();
  const w = Math.min(meta.width, 1920);
  const variants = [[stem + (isQR ? '.png' : '.webp'), w]];
  if (!isQR && meta.width > 900) variants.push([stem + '-sm.webp', 800]);
  for (const [o, width] of variants) {
    const cached = path.join(CACHE, o + '.' + stat.mtimeMs.toFixed(0) + '.' + stat.size);
    if (!fs.existsSync(cached)) {
      fs.mkdirSync(path.dirname(cached), { recursive: true });
      let p = sharp(file).rotate().resize({ width, withoutEnlargement: true });
      p = isQR ? p.png({ compressionLevel: 9, palette: true }) : p.webp({ quality: /ISO_|TUV|logo/i.test(file) ? 88 : 78, effort: 5 });
      await p.toFile(cached); made++;
    }
    fs.copyFileSync(cached, path.join(OUT, o));
  }
  assets[key] = { src: '/' + variants[0][0], w, nw: meta.width, nh: meta.height, ...(variants[1] ? { sm: '/' + variants[1][0] } : {}) };
}));

/* ---------- 2. CSS (mismo orden que el bundle del sitio anterior) ---------- */
let css = ['src/styles/index.css', 'src/styles/app.css', 'src/styles/modal.css', 'node_modules/@splidejs/splide/dist/css/splide.min.css', 'src/styles/overrides.css']
  .map((f) => fs.readFileSync(f, 'utf8')).join('\n');
css = css.replace(/url\((['"]?)assets\/img\/([^'")]+)\1\)/g, (m, q, p) => {
  const a = assets[p]; if (!a) throw new Error('CSS: falta ' + p);
  return `url(${BASE}${a.src})`;
});
css = (await esbuild.transform(css, { loader: 'css', minify: true, target: ['chrome100', 'safari15', 'firefox100'] })).code;
const hash = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 10);
const cssFile = `/assets/site.${hash(css)}.css`;
fs.writeFileSync(OUT + cssFile, css);

/* ---------- 3. JS ---------- */
const js = await esbuild.build({
  entryPoints: ['src/client/main.js'], bundle: true, splitting: true, format: 'esm', minify: true,
  outdir: OUT + '/assets', entryNames: 'main.[hash]', chunkNames: 'chunks/[name].[hash]',
  target: ['chrome100', 'safari15', 'firefox100'], metafile: true, legalComments: 'none',
});
const mainJs = '/' + path.relative(OUT, Object.keys(js.metafile.outputs).find((o) => /main\.[A-Z0-9]+\.js$/i.test(o)));
const chunk = (name) => { const o = Object.keys(js.metafile.outputs).find((x) => new RegExp('chunks/' + name + '\\.').test(x) && x.endsWith('.js')); return o ? '/' + path.relative(OUT, o) : null; };

/* ---------- 4. Archivos públicos, brochures y videos ---------- */
fs.cpSync('public', OUT, { recursive: true });
const brochures = { es: 'src/brochures/es.pdf', en: 'src/brochures/en.pdf' };
fs.mkdirSync(OUT + '/brochures', { recursive: true });
for (const l of S.LANGS) for (const k of Object.keys(S.LOCALES[l]).filter((k) => k.endsWith('-brochure-url'))) {
  fs.copyFileSync(brochures[l], OUT + '/brochures/' + S.LOCALES[l][k]);
}
// Nombres históricos de brochures que no están en las traducciones
for (const [n, l] of [['Comitia_Brochure_ENG_GENERAL_Digital_v2.pdf', 'en'], ['Comitia_Brochure_ESP_GENERAL_Digital_v2.pdf', 'es']]) {
  if (!fs.existsSync(OUT + '/brochures/' + n)) fs.copyFileSync(brochures[l], OUT + '/brochures/' + n);
}

/* ---------- 5. Páginas ---------- */
const routes = S.routes();
const urlOf = (r, l = r.lang) => r.unprefixed ? r.rest : '/' + l + (r.rest === '/' ? '' : r.rest);
const has = new Set(routes.map((r) => r.lang + ':' + r.rest));
const GTM = 'GTM-5QNJCVZL';
const OG_LOCALE = { es: 'es_AR', en: 'en_US' };

function head(r, c, m) {
  const self = ORIGIN + urlOf(r);
  const alts = r.unprefixed ? '' : S.LANGS.filter((l) => has.has(l + ':' + r.rest)).map((l) => `<link rel="alternate" hreflang="${l}" href="${ORIGIN + urlOf(r, l)}">`).join('')
    + `<link rel="alternate" hreflang="x-default" href="${ORIGIN + urlOf(r, 'es')}">`;
  const ogImg = m.image && c.assets[m.image] ? ORIGIN + c.assets[m.image].src : ORIGIN + '/comitia-og.jpg';
  const ogDims = m.image ? '' : '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">';
  const preload = r.kind === 'home' ? `<link rel="preload" as="image" href="${BASE}/video/comitia-video-home.jpg" media="(min-width: 746px)">` : '';
  return `<!doctype html>
<html lang="${r.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${S.esc(m.title)}</title>
<meta name="description" content="${S.esc(m.desc)}">
${m.noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${self}">
${alts}
<meta property="og:site_name" content="Comitia">
<meta property="og:type" content="${m.article ? 'article' : 'website'}">
<meta property="og:title" content="${S.esc(m.title)}">
<meta property="og:description" content="${S.esc(m.desc)}">
<meta property="og:url" content="${self}">
<meta property="og:locale" content="${OG_LOCALE[r.lang]}">
<meta property="og:image" content="${ogImg}">${ogDims}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${S.esc(m.title)}">
<meta name="twitter:description" content="${S.esc(m.desc)}">
<meta name="theme-color" content="#182230">
<link rel="icon" href="${BASE}/comitia-icon.svg">
<link rel="icon" href="${BASE}/comitia-icon-dark.svg" media="(prefers-color-scheme: dark)">
<link rel="apple-touch-icon" href="${BASE}/apple-touch-icon.png">
<link rel="manifest" href="${BASE}/manifest.json">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100..700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${BASE}${cssFile}">
<link rel="modulepreload" href="${BASE}${mainJs}">
${preload}
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');</script>
${jsonLd(r, c, m, self)}
</head>`;
}

// Datos estructurados: los mismos del sitio anterior (en español), con las URLs
// corregidas a las de cada idioma; en inglés, una versión equivalente traducida.
function jsonLd(r, c, m, self) {
  const org = { '@id': ORIGIN + '/#organization' };
  let graph = [];
  if (m.ld) {
    const es = S.SEO.es[m.ld].ld;
    const fixUrl = (u) => typeof u === 'string' && u.startsWith(ORIGIN) ? u.replace(ORIGIN + '/', ORIGIN + '/' + r.lang + '/').replace(new RegExp(ORIGIN + '/' + r.lang + '/$'), ORIGIN + '/' + r.lang).replace(/\/(es|en)\/#/, '/#') : u;
    const fix = (o) => Array.isArray(o) ? o.map(fix) : o && typeof o === 'object' ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, (k === 'url' || k === 'item' || k === '@id') ? fixUrl(v) : fix(v)])) : o;
    if (r.lang === 'es') graph = fix(es['@graph']);
    else {
      // Inglés: organización/sitio + página y producto con los textos traducidos
      graph = fix(es['@graph']).filter((n) => ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList', 'Product', 'Service'].includes(n['@type'])).map((n) => {
        const L = S.LOCALES.en;
        if (n['@type'] === 'WebPage') return { ...n, name: m.title, description: m.desc };
        if (n['@type'] === 'Product') { const { additionalProperty, ...rest } = n; return { ...rest, description: m.desc, category: 'Electoral Technology' }; }
        if (n['@type'] === 'BreadcrumbList') return { ...n, itemListElement: n.itemListElement.map((i, k) => ({ ...i, name: k === 0 ? 'Home' : (r.solution ? L[S.SOLUTIONS[r.solution].k + '-link'] || i.name : i.name) })) };
        if (n['@type'] === 'Organization') return { ...n, description: 'Secure, scalable and auditable digital platforms for elections worldwide.' };
        if (n['@type'] === 'Service') return { ...n, serviceType: 'Electoral Technology' };
        return n;
      });
    }
    graph = graph.map((n) => n['@type'] === 'Organization' ? { ...n, logo: ORIGIN + '/comitia-icon-512x512.png' } : n);
  } else if (m.article) {
    const x = m.article, l = r.lang;
    graph = [{ '@type': r.kind === 'nota' ? 'BlogPosting' : 'Article', headline: x.title[l] || x.title.es, description: m.desc, image: c.assets[x.image] ? ORIGIN + c.assets[x.image].src : undefined, inLanguage: l, mainEntityOfPage: self, publisher: { '@type': 'Organization', name: 'Comitia', logo: { '@type': 'ImageObject', url: ORIGIN + '/comitia-icon-512x512.png' } } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: l === 'es' ? 'Inicio' : 'Home', item: ORIGIN + '/' + l }, { '@type': 'ListItem', position: 2, name: S.LOCALES[l][r.kind === 'nota' ? 'blog-title' : 'casos-title'], item: ORIGIN + '/' + l + (r.kind === 'nota' ? '/blog' : '/casos') }, { '@type': 'ListItem', position: 3, name: x.title[l] || x.title.es, item: self }] }];
  } else if (r.kind !== 'card') {
    graph = [{ '@type': 'WebPage', url: self, name: m.title, description: m.desc, inLanguage: r.lang, isPartOf: { '@id': ORIGIN + '/#website' }, publisher: org }];
  }
  if (!graph.length) return '';
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`;
}

function page(r) {
  const c = S.ctx({ lang: r.lang, base: BASE, assets });
  r.alts = Object.fromEntries(S.LANGS.map((l) => [l, BASE + (has.has(l + ':' + r.rest) && !r.unprefixed ? urlOf(r, l) : (r.unprefixed ? r.rest : '/' + l))]));
  const m = r.meta(c);
  const body = S.header(c, r) + r.render(c) + S.footer(c);
  const site = { lang: r.lang, base: BASE, page: r.kind };
  // Tarjetas personales (sin idioma en la URL): como antes, se muestran en el
  // idioma del navegador; la versión en inglés viaja en un <template>.
  let alt = '';
  if (r.kind === 'card') {
    const ce = S.ctx({ lang: 'en', base: BASE, assets });
    const re = { ...r, lang: 'en' };
    alt = `<template id="alt-en">${S.header(ce, re) + r.render(ce) + S.footer(ce)}</template><script>(function(){var l;try{l=localStorage.getItem('i18nextLng')}catch(e){}if(!l)l=(navigator.language||'es').slice(0,2);if(l==='en'){var t=document.getElementById('alt-en');var a=document.querySelector('#root .App');a.innerHTML=t.innerHTML;document.documentElement.lang='en';window.__SITE__={lang:'en',base:'${BASE}',page:'card'}}})()</script>`;
  }
  return `${head(r, c, m)}
<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<div id="root"><div class="App">${body}</div></div>
<script>window.__SITE__=${JSON.stringify(site)}</script>${alt}
<script type="module" src="${BASE}${mainJs}"></script>
</body>
</html>
`;
}

const write = (rel, html) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
for (const r of routes) {
  const html = page(r);
  const u = urlOf(r);
  write(u + '.html', html);                       // /es/bue → es/bue.html
  if (r.rest === '/') write(u + '/index.html', html); // /es/ también
}

// 404 (en español, con el header y footer del sitio)
{
  const c = S.ctx({ lang: 'es', base: BASE, assets });
  const r = { lang: 'es', rest: '/404', kind: 'page', unprefixed: true, alts: { es: BASE + '/es', en: BASE + '/en' } };
  const body = S.header(c, r) + S.notFound(c) + S.footer(c);
  const m = { title: `${S.LOCALES.es['404-title']} | COMITIA`, desc: S.stripHtml(S.LOCALES.es['404-description']), noindex: true };
  write('404.html', head(r, c, m).replace(/<link rel="canonical"[^>]*>\n/, '') + `\n<body><div id="root"><div class="App">${body}</div></div><script>window.__SITE__=${JSON.stringify({ lang: 'es', base: BASE, page: '404' })}</script><script type="module" src="${BASE}${mainJs}"></script></body></html>\n`);
}

// "/" → idioma preferido (como el sitio anterior). Los buscadores ven x-default.
const redirectPage = (target, js) => `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>COMITIA</title><meta name="robots" content="noindex"><link rel="canonical" href="${ORIGIN}${target}"><link rel="alternate" hreflang="es" href="${ORIGIN}/es"><link rel="alternate" hreflang="en" href="${ORIGIN}/en"><link rel="alternate" hreflang="x-default" href="${ORIGIN}/es"><script>${js}</script><meta http-equiv="refresh" content="0; url=${BASE}${target}"></head><body><a href="${BASE}/es">Español</a> · <a href="${BASE}/en">English</a></body></html>\n`;
const prefLang = `var l='es';try{var s=localStorage.getItem('i18nextLng');if(s==='en'||s==='es')l=s;else if((navigator.language||'').slice(0,2)==='en')l='en'}catch(e){}`;
write('index.html', redirectPage('/es', `${prefLang}location.replace('${BASE}/'+l+location.search+location.hash);`));
// Rutas viejas sin idioma (/casos, /bue, ...) → misma página con idioma
const legacy = [...new Set(routes.filter((r) => !r.unprefixed && r.rest !== '/').map((r) => r.rest))];
for (const rest of legacy) write(rest + '.html', redirectPage('/es' + rest, `${prefLang}location.replace('${BASE}/'+l+'${rest}'+location.search+location.hash);`));

/* ---------- 6. sitemap, robots, vercel ---------- */
const today = new Date().toISOString().slice(0, 10);
const indexable = routes.filter((r) => !r.unprefixed);
const groups = [...new Set(indexable.map((r) => r.rest))];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${groups.flatMap((rest) => S.LANGS.filter((l) => has.has(l + ':' + rest)).map((l) => {
  const r = indexable.find((x) => x.rest === rest && x.lang === l);
  const prio = rest === '/' ? '1.0' : r.kind === 'solution' ? '0.9' : ['caso', 'nota', 'legal'].includes(r.kind) ? (r.kind === 'legal' ? '0.3' : '0.7') : '0.8';
  return `  <url><loc>${ORIGIN + urlOf(r)}</loc><lastmod>${today}</lastmod><priority>${prio}</priority>${S.LANGS.filter((x) => has.has(x + ':' + rest)).map((x) => `<xhtml:link rel="alternate" hreflang="${x}" href="${ORIGIN + urlOf(r, x)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN + urlOf(r, 'es')}"/></url>`;
})).join('\n')}
</urlset>
`;
fs.writeFileSync(OUT + '/sitemap.xml', sitemap);
fs.writeFileSync(OUT + '/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

const pages = routes.length;
console.log(`OK · ${pages} páginas · ${Object.keys(assets).length} imágenes (${made} nuevas) · css ${(css.length / 1024).toFixed(0)} KB · ${((Date.now() - t0) / 1000).toFixed(1)} s`);
