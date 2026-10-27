// Plantillas del sitio de Comitia.
// Replican 1:1 el markup (mismas etiquetas y clases) de los componentes React
// del sitio anterior, para que el CSS original (src/styles/app.css) se vea igual.
// Cada página se genera como HTML estático en build.mjs.
import fs from 'fs';
import * as BETA from './beta.mjs';

const read = (p) => JSON.parse(fs.readFileSync(new URL(p, import.meta.url)));
export const LOCALES = { es: read('./locales/es.json'), en: read('./locales/en.json'), pt: read('./locales/pt.json') };
export const CASOS = read('./content/casos.json');
export const BLOG = read('./content/blog.json');
export const LEGAL = read('./content/legal.json');
export const SEO = { es: read('./content/seo-es.json'), en: read('./content/seo-en.json'), pt: read('./content/seo-pt.json') };
export const LANGS = ['es', 'en', 'pt'];
export const HTML_LANG = { es: 'es', en: 'en', pt: 'pt-BR' };
export const SITE_URL = 'https://comitiacorp.com';

export const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const stripHtml = (h) => String(h ?? '').replace(/<[^>]+>/g, '').trim();
const byLang = (o, l) => (o && o[l]) ? o[l] : (o && o.es ? o.es : '');

// Contexto por página: idioma, traducciones, rutas y assets
export function ctx({ lang, base, assets }) {
  const L = LOCALES[lang];
  const c = {
    lang, base, assets,
    t: (k) => esc(L[k] ?? k),          // {t('...')} en React: texto escapado
    T: (k) => L[k] ?? k,               // <Trans/>: admite HTML
    raw: (k) => L[k] ?? k,
    url: (p) => base + p,              // URL absoluta dentro del sitio
    to: (p) => base + '/' + lang + (p === '/' ? '' : p),   // withLang()
    img: (key, o = {}) => imgTag(c, key, o),
    src: (key) => assetSrc(c, key),
  };
  return c;
}

function assetSrc(c, key) {
  const a = c.assets[key];
  if (!a) throw new Error('Asset no encontrado: ' + key);
  return c.base + a.src;
}
function imgTag(c, key, { alt = '', cls = '', style = '', eager = false, sizes = '100vw', attrs = '' } = {}) {
  const a = c.assets[key];
  if (!a) throw new Error('Asset no encontrado: ' + key);
  const srcset = a.sm ? ` srcset="${c.base + a.sm} 800w, ${c.base + a.src} ${a.w}w" sizes="${sizes}"` : '';
  const dims = a.nw ? ` width="${a.nw}" height="${a.nh}"` : '';
  return `<img src="${c.base + a.src}"${srcset}${dims}${cls ? ` class="${cls}"` : ''} alt="${esc(alt)}"${style ? ` style="${style}"` : ''}${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${attrs}>`;
}

/* ================= Header ================= */
const ROUTE_FLAGS = {
  home: { hideCC: true, isHome: true },
  card: { hideSiteMenu: true, hideMobileMenu: true, hideNewsLink: true },
};
export function header(c, page) {
  const f = ROUTE_FLAGS[page.kind] || { hideCC: true };
  const { t } = c;
  const path = page.rest || '/';
  const active = (p) => (path === p ? 'active' : '');
  const download = page.vcf ? c.url('/cards/' + page.vcf) : '/#';
  const ccShare = (withLangs) => `<div class="cc-share"><ul><li><a class="share" href="#" role="button" aria-label="Compartir"></a></li><li><a href="${download}" class="download" target="_blank" aria-label="Descargar contacto"></a></li></ul>${withLangs ? langSel(c, page) : ''}</div>`;
  const menu = `<div class="site-menu"><ul>`
    + `<li class="dropdown-parent "><div class="dropdown-tooglers"><button class="soluciones-toogle-desk" type="button" tabindex="0" data-goto="soluciones">${t('soluciones-link')}</button><button class="soluciones-toogle-mob" type="button" tabindex="-1">${t('soluciones-link')}</button></div>`
    + `<ul class="dropdown-menu">`
    + [['/bue', 'bue-link'], ['/notebox', 'notebox-link'], ['/turing', 'turing-link'], ['/sistema-operaciones-electorales', 'eos-link'], ['/invote', 'invote-link'], ['/soe', 'soe-link']]
      .map(([p, k]) => `<li class="${active(p)}"><a href="${c.to(p)}">${t(k)}</a></li>`).join('')
    + `</ul></li>`
    + `<li class="${active('/como-trabajamos')}"><a href="${c.to('/como-trabajamos')}">${t('como-link')}</a></li>`
    + `<li class="${active('/casos')}"><a href="${c.to('/casos')}">${t('casos-link')}</a></li>`
    + `<li class="${path === '/blog' || path.startsWith('/blog/') ? 'active' : ''}"><a href="${c.to('/blog')}">${t('blog-link')}</a></li>`
    + [['/mapa-de-casos', 'nav_mapa'], ['/nosotros', 'nav_nosotros']].map(([p, k]) => { const bs = BETA.strings(c.lang); return `<li class="bx-nav ${active(p)}"><a href="${c.to(p)}">${bs[k]}<sup class="bx-star" title="${esc(bs.beta_note)}"><span aria-hidden="true">★</span> ${bs.beta}</sup></a></li>`; }).join('')
    + `<li><button class="" type="button" data-goto="contacto">${t('contacto-link')}</button></li>`
    + `</ul></div>`;
  return `<header id="site-header" class="siteHeader ${f.isHome ? 'home' : ''}">`
    + `<div class="mobileMenu"><a href="${c.to('/')}"><img src="${c.src('mark-comitia.svg')}" alt="Comitia - Logo"></a><div class="mobileMenuTools">`
    + (!f.hideCC ? ccShare(true) : '')
    + (!f.hideMobileMenu ? `<div class="menuToggler" id="menuToggler" role="button" tabindex="0" aria-label="${t('soluciones-link') && 'Menú'}" aria-controls="mainNav" aria-expanded="false"><span class="line"></span><span class="line"></span><span class="line"></span></div>` : '')
    + `</div></div>`
    + `<nav class="mainNav" id="mainNav"><div class="brand"><a href="${c.to('/')}"><img src="${c.src('logo-comitia.svg')}" class="header-logo-blue" alt="Comitia - Logo"><img src="${c.src('logo-comitia-dark.svg')}" class="header-logo-white" alt="Comitia - Logo"></a><button id="closeMenu" type="button" aria-label="Cerrar menú"><img src="${c.src('chevron-right.svg')}" alt=""></button></div>`
    + (!f.hideSiteMenu ? menu : '')
    + `<div class="moreLinks">`
    + (!f.hideCC ? ccShare(false) : '')
    + (!f.hideNewsLink ? `<a class="msa-news-link" href="https://www.msa.com.ar/noticias/comitia" target="_blank">${c.T('msa-news')}</a>` : '')
    + `<button class="btn btn-primary internal-link contact-btn" type="button" data-goto="contacto">${t('contacto-link')}</button>`
    + langSel(c, page)
    + `<a class="menu-linkedin-link" href="https://www.linkedin.com/company/comitia/posts/?feedView=all" target="_blank" rel="noreferrer"><img src="${c.src('linkedin-icon.svg')}" alt="Linkedin Icon"></a>`
    + `</div></nav></header><div id="mobileNavOverlay" class="mobile-nav-overlay"></div>`;
}
function langSel(c, page) {
  return `<ul class="language-selector">` + LANGS.map((l) =>
    `<li><button type="button" class="language-btn internal-link ${c.lang === l ? 'active' : ''}" data-lang-href="${page.unprefixed && page.kind === 'card' ? c.base + page.rest : page.alts ? page.alts[l] : c.base + '/' + l}" lang="${l}">${l.toUpperCase()}</button></li>`).join('') + `</ul>`;
}

/* ================= Footer ================= */
export function footer(c) {
  const { t } = c;
  return `<footer class="siteFooter"><div class="footerLogo"><img src="${c.src('logo-comitia-dark.svg')}" width="180" alt="Comitia Logo"><div class="press-link"><span>${t('press')} </span><a href="mailto:press@comitiacorp.com">press@comitiacorp.com</a></div></div>`
    + `<div class="footerCopy"><p>${t('copyright')} <a href="https://www.msa.com.ar/" target="_blank" rel="noreferrer">${t('copyright-msa')}</a> | <a href="${c.url('/' + c.raw('sgi-link'))}" target="_blank" rel="noreferrer">${t('sgi')}</a> | <a href="${c.to('/' + c.raw('legal-link'))}">${t('legal')}</a> | <a href="${c.to('/' + c.raw('policy-link'))}">${t('policy')}</a> | <a href="${c.to('/' + c.raw('cookies-link'))}">${t('cookies')}</a></p>`
    + `<div class="footerLinks"><a class="footerMail" href="mailto:contactus@comitiacorp.com" target="_blank" rel="noreferrer" aria-label="Email"></a><a class="footerLkd" href="https://www.linkedin.com/company/comitia/posts/?feedView=all" target="_blank" rel="noreferrer" aria-label="LinkedIn"></a></div></div></footer>`;
}

/* ================= Bloques comunes ================= */
const banner = (c) => `<section class="we-help"><p>${c.t('banner-text')}</p></section>`;

function prefooter(c) {
  const { t } = c;
  const field = (name, label, type, ph, req, extraCls, wrapCls) =>
    `<div class="${wrapCls}"><label for="cf-${name}" class="display-block mb-6">${t(label)}${req ? ' <span class="color-blue-500">*</span>' : ''}</label>`
    + (type === 'textarea'
      ? `<textarea id="cf-${name}" class="w-100 fs-16 lh-130" name="${name}" placeholder="${t(ph)}"${req ? ' data-required="1"' : ''}></textarea>`
      : `<input id="cf-${name}" class="w-100 ${extraCls}fs-16 lh-130" type="${type}" name="${name}" placeholder="${t(ph)}"${req ? ' data-required="1"' : ''}${type === 'email' ? ' autocomplete="email"' : ''}>`)
    + `</div>`;
  return `<section class="contact" id="contacto"><div class="contact-form-container"><div class="contact-form-mw"><div><h2 class="lh-120 fw-600">${t('contact-title')}</h2><p class="contact-lead">${t('contact-lead')}</p></div>`
    + `<form id="contactForm" novalidate data-ok="${t('form-message-sent')}" data-fail="${t('form-message-sent-error')}" data-e-name="${t('form-error-name')}" data-e-lastname="${t('form-error-lastname')}" data-e-email="${t('form-error-inavlid-email')}" data-e-email-invalid="${t('form-error-email')}" data-e-message="${t('form-error-message')}">`
    + `<div class="grid-1-1 gap-16 mb-24">` + field('name', 'label-name', 'text', 'ph-name', 1, '', '') + field('lastname', 'label-lastname', 'text', 'ph-lastname', 1, 'mb-6 ', '') + `</div>`
    + field('email', 'label-email', 'email', 'ph-email', 1, '', ' mb-24')
    + field('phone', 'label-tel', 'tel', 'ph-tel', 0, '', ' mb-24')
    + field('message', 'label-mes', 'textarea', 'ph-mes', 1, '', 'mb-24 ')
    + `<div><button type="submit" class="btn btn-primary">${t('form-btn')}</button><small class="form-disc">${t('form-disc')}</small></div><div style="display:none" class="form-feedback " role="status" aria-live="polite"></div></form></div></div>`
    + `<div class="contact-video"><video autoplay muted loop playsinline preload="none" poster="${c.url('/video/contact-video.jpg')}" data-lazy-video><source data-src="${c.url('/video/contact-video.mp4')}" type="video/mp4"></video></div></section>`
    + `<div class="preFooter">`
    + `<div class="preFooter-item"><img src="${c.src('marker-pin-02.svg')}" alt=""><p class="preFooter-item-location">LATAM</p><a href="mailto:contactus@comitiacorp.com" target="_blank">contactus@comitiacorp.com</a><a href="tel:+541160911540" target="_blank">+541160911540</a><p>Atuel 362, Distrito Tecnológico</p><p>Parque Patricios (C1437EPD)</p><p>Buenos Aires, Argentina</p></div>`
    + `<div class="preFooter-item"><img src="${c.src('marker-pin-02.svg')}" alt=""><p class="preFooter-item-location">USA</p><a href="mailto:contactus@comitiacorp.com" target="_blank">contactus@comitiacorp.com</a></div>`
    + `<div class="preFooter-item"><img src="${c.src('marker-pin-02.svg')}" alt=""><p class="preFooter-item-location">${t('eu-location')}</p><a href="mailto:contactus@comitiacorp.com" target="_blank">contactus@comitiacorp.com</a></div>`
    + `</div>`;
}

/* ================= Home ================= */
const MAP = [ // [id, key, placement] en el orden del listado
  ['tampa-marker', 'map-tampa', 'left'], ['miami-marker', 'map-miami', 'right'], ['colonia-marker', 'map-colonia', 'right'],
  ['dubai-marker', 'map-dubai', 'top'], ['barcelona-marker', 'map-barcelona', 'top'], ['buenos-aires-marker', 'map-bsas', 'left'],
  ['asuncion-marker', 'map-asuncion', 'left'], ['ecuador-marker', 'map-ecuador', 'left'], ['honduras-marker', 'map-honduras', 'left'],
  ['johannesburg-marker', 'map-johannesburg', 'top'], ['san-jose-marker', 'map-san-jose', 'right'], ['ontario-marker', 'map-ontario', 'top'],
];
const MARKER_ORDER = ['buenos-aires-marker', 'colonia-marker', 'asuncion-marker', 'ecuador-marker', 'honduras-marker', 'miami-marker', 'tampa-marker', 'barcelona-marker', 'dubai-marker', 'johannesburg-marker', 'san-jose-marker', 'ontario-marker'];

function caseCard(c, caso, more, sizes) {
  return `<article><a href="${c.to('/casos/' + caso.slug)}"><div class="news-img">${c.img(caso.image_thumb, { alt: byLang(caso.title, c.lang), sizes })}</div>`
    + `<div class="news-date">${esc(byLang(caso.category, c.lang))}</div><h2 class="news-title">${esc(byLang(caso.title, c.lang))}</h2><p class="news-lead">${esc(byLang(caso.description_short, c.lang))}</p><span class="read-more">${c.t('news-read-more')}${more}</span></a></article>`;
}

function solItem(c, p, thumb, title, body, brochureKey) {
  return `<div class="solutions-item"><a href="${c.to(p)}" class="solutions-item-link solutions-item-img">${c.img(thumb, { alt: stripHtml(title), sizes: '(max-width:744px) 100vw, 50vw' })}</a>`
    + `<div class="sb"><a href="${c.to(p)}" class="solutions-item-link"><h3 class="fw-600">${title}</h3>${body}</a><a href="${c.url('/brochures/' + c.raw(brochureKey))}" class="btn btn-sm btn-outlined btn-download" target="_blank">${c.t('brochure-btn')}</a></div></div>`;
}

export function home(c) {
  const { t } = c;
  const casos = CASOS.slice(0, 3);
  const gal = [1, 2, 3, 4, 5].map((n) => `<div class="gallery-grid-item-${n}" data-gallery="${[1, 5, 0, 3, 4][n - 1]}" role="button" tabindex="0" aria-label="${t('gallery-btn')}">${c.img(`gallery/comitia-gallery-0${n}.jpg`, { style: 'cursor:pointer', sizes: n === 1 ? '(max-width:744px) 100vw, 50vw' : '(max-width:744px) 50vw, 25vw' })}</div>`).join('');
  return `<main class="App-main">`
    + `<section id="site-hero" class="home-hero-v2"><div class="home-hero-text-v2"><h1 class="fs-60 fw-600 lh-120">${t('hero-title')}</h1><p class="fs-20">${t('hero-text')}</p><a class="btn btn-primary" href="#contacto" data-goto="contacto">${t('hero-btn')}</a></div>`
    + `<div class="home-hero-video-v2"><video autoplay muted loop playsinline preload="none" poster="${c.url('/video/comitia-video-home.jpg')}" data-lazy-video="hero"><source data-src="${c.url('/video/comitia-video-home.mp4')}" type="video/mp4"></video></div></section>`
    + `<section class="part-cert"><p class="fs-16 fw-400">${t('partners')}</p><ul class="partners">`
    + `<li><img src="${c.src('amazon-web-services-logo-grey.svg')}" alt="Amazon Web Services Logo"></li>`
    + `<li class="d-none"><img src="${c.src('andreani-logo-grey.svg')}" alt="Andreani Logo"></li>`
    + `<li><img src="${c.src('intel-logo-grey.svg')}" alt="Intel Logo"></li>`
    + `<li><img src="${c.src('st-logo-grey.svg')}" alt="ST Logo"></li>`
    + `<li>${c.img('ISO_IEC_27001_2022_HOR.jpg', { alt: 'ISO/IEC 27001:2022', cls: 'logo-big-2', sizes: '200px' })}</li>`
    + `<li>${c.img('ISO_IEC_27701_2019_HOR.jpg', { alt: 'ISO/IEC 27701:2019', cls: 'logo-big-2', sizes: '200px' })}</li>`
    + `<li>${c.img('TUV.jpg', { alt: 'TÜV Rheinland', cls: 'logo-big-2', sizes: '200px' })}</li>`
    + `</ul></section>`
    + viewer3d('home')
    + `<section class="object3d"><div class="why"><h2 class="fs-48 lh-120 fw-600 reveal">${t('porque-title')}</h2><ul><li class="reveal">${t('porque-item-1')}</li><li class="reveal">${t('porque-item-2')}</li><li class="reveal">${t('porque-item-3')}</li></ul></div></section>`
    + `<section class="map"><div class="map-text"><h2 class="fs-48 fw-600 lh-120">${t('map-title')}</h2><p class="fs-20">${t('map-lead')}</p></div><div class="map-container"><div class="locations">`
    + MAP.map(([id, k]) => `<p style="cursor:pointer" data-marker="${id}">${t(k)}</p>`).join('')
    + `</div><div class="map-image-v2">`
    + MARKER_ORDER.map((id) => { const m = MAP.find((x) => x[0] === id); return `<img class="map-marker-v2" id="${id}" src="${c.src('marker-bg.svg')}" alt="${t(m[1])}" tabindex="0" data-tip="${t(m[1])}" data-placement="${m[2]}">`; }).join('')
    + c.img('map-base.png', { cls: 'map-base-v2', alt: '', sizes: '(max-width:744px) 100vw, 60vw' })
    + `</div></div></section>`
    + banner(c)
    + `<section id="soluciones" class="solutions-feed"><div class="solutions-title"><h2 class="lh-120 fw-600">${t('solutions-title')}</h2></div>`
    + `<div class="solutions-grid-2">`
    + solItem(c, '/bue', 'solutions/BUE-thumbnail.jpg', 'BUE', `<p>${t('desc-bue')}</p>`, 'bue-brochure-url')
    + solItem(c, '/notebox', 'solutions/notebox-thumbnail.jpg', 'Notebox', `<p>${t('desc-notebox')}</p>`, 'notebox-brochure-url')
    + `</div><div class="solutions-grid-4">`
    + solItem(c, '/turing', 'solutions/turing-thumbnail.jpg', 'Turing', `<p>${t('desc-turing')}</p>`, 'turing-brochure-url')
    + solItem(c, '/invote', 'solutions/invote-thumbnail.jpg', 'Invote', `<p>${t('desc-invote')}</p>`, 'invote-brochure-url')
    + solItem(c, '/soe', 'solutions/SOE-thumbnail.jpg', t('soe-link'), `<ul><li>${t('desc-soe-1')}</li><li>${t('desc-soe-2')}</li><li>${t('desc-soe-3')}</li></ul>`, 'soe-brochure-url')
    + solItem(c, '/sistema-operaciones-electorales', 'solutions/electoral-operation-system-thumnail.jpg', t('name-electoral'), `<p>${t('desc-electoral')}</p>`, 'eos-brochure-url')
    + `</div></section>`
    + `<section class="gallery"><div class="gallery-title"><h2 class="fw-600 lh-120">${t('gallery-title')}</h2><p>${t('gallery-lead')}</p><button class="btn btn-outlined" type="button" data-gallery="0">${t('gallery-btn')}</button></div><div class="gallery-grid">${gal}</div></section>`
    + `<template id="galleryFull">` + ['gallery/hombre-votando.jpg', 'gallery/ciudadana-votando.jpg', 'gallery/ninios-votando.jpg', 'gallery/comitia-full-04.jpg', 'gallery/comitia-oficina.jpg', 'gallery/centro-distribucion.jpg'].map((k) => c.img(k, { sizes: '(max-width:744px) 100vw, 80vw' })).join('') + `</template>`
    + `<section class="news" id="news"><div class="container news-feed-header"><h2 class="fw-600 fs-36 lh-120">${t('casos-title')}</h2><a href="${c.to('/casos')}" class="btn btn-primary">${t('casos-btn')}</a></div>`
    + `<div class="container news-feed news-feed-desktop">${casos.map((x) => caseCard(c, x, '...', '(max-width:1024px) 50vw, 33vw')).join('')}</div>`
    + `<div class="news-feed news-feed-mobile"><div class="splide" aria-label="Últimas Noticias" data-splide-news><div class="splide__track"><ul class="splide__list">${casos.map((x) => `<li class="splide__slide">${caseCard(c, x, '...', '100vw')}</li>`).join('')}</ul></div></div></div></section>`
    + prefooter(c)
    + `</main>`;
}

/* ================= 3D ================= */
function viewer3d(kind) {
  if (kind === 'home') return `<section id="viewer" style="height:100vh;position:relative" data-viewer="home"><div id="canvas-container" style="position:relative;width:100%;height:100vh;display:grid;place-items:center;background:transparent"></div></section>`;
  const off = kind === 'bue' ? '20vh' : '30vh';
  return `<section id="viewer" style="height:200vh;position:relative;top:-${off};margin-bottom:-${off}" data-viewer="${kind}"><div id="canvas-container" style="position:sticky;top:0;height:100vh;width:100%;overflow:hidden"></div></section>`;
}

/* ================= Soluciones ================= */
export const SOLUTIONS = {
  bue: { path: '/bue', pre: 'BUE', k: 'bue', viewer: 'bue', brochure: 'bue-brochure-url',
    benefits: [['solution-icons/phone-01.svg', 1], ['solution-icons/cpu-chip-02.svg', 2], ['solution-icons/check-circle.svg', 3], ['solution-icons/x-circle.svg', 4], ['solution-icons/users-check.svg', 5]],
    rows: [['solution-shield-icon', 'solutions-security-title', [1, 2, 3], 'solutions/bue/bue-01.jpg'], ['solution-cases-icon', 'solutions-cases-title', [4, 5], 'solutions/bue/bue-02.jpg'], ['solution-puzzle-icon', 'solutions-adapt-title', [6, 7], 'solutions/bue/bue-03.jpg']] },
  notebox: { path: '/notebox', pre: 'Notebox', k: 'notebox', viewer: 'notebox', brochure: 'notebox-brochure-url',
    benefits: [['solution-icons/check-circle.svg', 1], ['solution-icons/phone-01.svg', 2], ['solution-icons/clock.svg', 3], ['solution-icons/bar-chart-square-02.svg', 4], ['solution-icons/settings-02.svg', 5], ['solution-icons/fingerprint-04.svg', 6]],
    rows: [['solution-shield-icon', 'solutions-security-title', [1, 2, 3], 'solutions/notebox/notebox-01.jpg'], ['solution-refresh-icon', 'solutions-adapt-title', [4, 5], 'solutions/notebox/notebox-02.jpg'], ['solution-puzzle-icon', 'solutions-flex-title', [6, 7, 8, 9, 10, 11], 'solutions/notebox/notebox-03.jpg']] },
  turing: { path: '/turing', pre: 'Turing', k: 'turing', hero: 'solutions/turing/turing-hero.jpg', brochure: 'turing-brochure-url',
    benefits: [['solution-icons/signal-02.svg', 1], ['solution-icons/stars-01.svg', 2], ['solution-icons/check-circle.svg', 3], ['solution-icons/scales-02.svg', 4], ['solution-icons/shield-03.svg', 5]],
    rows: [['solution-shield-icon', 'solutions-security-title', [1, 2, 3], 'solutions/turing/turing-04.jpg'], ['solution-cases-icon', 'solutions-cases-title', [4, 5], 'solutions/turing/turing-05.jpg'], ['solution-puzzle-icon', 'solutions-adapt-title', [6, 7], 'solutions/turing/turing-06.jpg']] },
  invote: { path: '/invote', pre: 'Invote', k: 'invote', hero: 'solutions/invote/invote-hero.jpg', brochure: 'invote-brochure-url',
    benefits: [['solution-icons/globe-01.svg', 1], ['solution-icons/check-verified-01.svg', 2], ['solution-icons/search-sm.svg', 3], ['solution-icons/users-check.svg', 4], ['solution-icons/lock-01.svg', 5]],
    rows: [['solution-shield-icon', 'solutions-security-title', [1, 2, 3], 'solutions/invote/invote-01.jpg'], ['solution-location-icon', 'solutions-location-title', [4, 5, 6, 7, 8, 9], 'solutions/invote/invote-02.jpg'], ['solution-awards-icon', 'solutions-award-title', [10, 11], 'solutions/invote/invote-03.jpg']] },
  eos: { path: '/sistema-operaciones-electorales', preKey: 'eos-pretitle', k: 'eos', hero: 'solutions/eos/eos-hero.jpg', brochure: 'eos-brochure-url',
    benefits: [['solution-icons/signal-02.svg', 1], ['solution-icons/stars-01.svg', 2], ['solution-icons/check-circle.svg', 3], ['solution-icons/scales-02.svg', 4], ['solution-icons/shield-03.svg', 5]],
    rows: [['solution-shield-icon', 'solutions-security-title', [1, 2, 3], 'solutions/eos/eos-01.jpg'], ['solution-cases-icon', 'solutions-cases-title', [4, 5], 'solutions/eos/eos-02.jpg'], ['solution-puzzle-icon', 'solutions-adapt-title', [6, 7], 'solutions/eos/eos-03.jpg']] },
  soe: { path: '/soe', pre: 'SOE', k: 'soe', hero: 'solutions/soe/soe-hero.jpg', brochure: 'soe-brochure-url', soe: true,
    benefits: [['solution-icons/signal-02.svg', 1], ['solution-icons/stars-01.svg', 2], ['solution-icons/check-circle.svg', 3]],
    rows: [['', 'soe-ul-title-1', [1, 2, 3], 'solutions/soe/soe-01.jpg'], ['', 'soe-ul-title-2', [4, 5, 6], 'solutions/soe/soe-02.jpg'], ['', 'soe-ul-title-3', [7, 8], 'solutions/soe/soe-03.jpg']] },
};

export function solution(c, id) {
  const s = SOLUTIONS[id], { t } = c, k = s.k;
  const benefits = `<div class="benefits-grid">${s.benefits.map(([ic, n]) => `<div><img src="${c.src(ic)}" alt=""><p>${t(`${k}-benefit-${n}`)}</p></div>`).join('')}</div>`;
  const rows = s.rows.map(([icon, title, lis, im]) =>
    `<div class="solution-2-grid"><div class="solution-2-grid-txt${icon ? ' ' + icon : ''}"><h3>${t(title)}</h3><ul>${lis.map((n) => `<li>${t(`${k}-li-${n}`)}</li>`).join('')}</ul></div><div class="solution-2-grid-img${s.soe ? ' soe-img' : ''}">${c.img(im, { sizes: '(max-width:1024px) 100vw, 50vw' })}</div></div>`).join('');
  return `<main class="main-container">`
    + `<section class="solution-hero"><p class="fw-600">${s.preKey ? t(s.preKey) : s.pre}</p><h1 class="fw-600 lh-120">${t(k + '-title')}</h1><p class="solution-hero-desc">${t(k + '-desc')}</p><div class="solution-hero-btns"><a class="btn btn-outlined" href="#contacto">${t('soluciones-more-info')}</a><a href="${c.url('/brochures/' + c.raw(s.brochure))}" class="btn btn-primary btn-download" target="_blank">${t('brochure-btn')}</a></div></section>`
    + (s.viewer ? viewer3d(s.viewer) : `<section class="solution-hero-image">${c.img(s.hero, { eager: true, sizes: '100vw' })}</section>`)
    + (s.soe
      ? `<section class="benefits"><h2 class="fw-600 lh-120">${t('soe-benefits-lead')}</h2>${benefits}</section><section class="implementation">${rows}</section>`
      : `<section class="benefits"><h2 class="fw-600 lh-120">${t('solutions-benefits-title')}</h2><p class="benefits-lead">${t(k + '-benefits-lead')}</p>${benefits}</section>`
        + `<section class="implementation"><h2 class="fw-600 lh-120">${t('solutions-implementation-title')}</h2><p class="benefits-lead">${t(k + '-implementation-lead')}</p>${rows}</section>`)
    + banner(c) + prefooter(c) + `</main>`;
}

/* ================= Cómo trabajamos ================= */
export function comoTrabajamos(c) {
  const { t, T } = c;
  const txt = (n) => `<div class="timeline-grid-item-text"><h2>${t(`timeline-${n}-title`)}</h2><p>${t(`timeline-${n}-desc`)}</p><p>${T(`timeline-${n}-end`)}</p></div>`;
  return `<main class="main-container"><section class="timeline-hero"><h1 class="lh-120 fw-600">${t('timeline-h1')}</h1><p class="timeline-lead">${t('timeline-lead')}</p><p>${t('timeline-hero-desc')}</p></section>`
    + `<section class="timeline-grid">`
    + `<div class="timeline-grid-item-1">${txt(1)}</div>`
    + `<div class="timeline-grid-item-2">${c.img('timeline-04.jpg', { cls: 'timeline-img', sizes: '(max-width:1024px) 100vw, 66vw' })}</div>`
    + `<div class="timeline-grid-item-3">${c.img('timeline-02.jpg', { cls: 'timeline-img-square', sizes: '(max-width:1024px) 100vw, 33vw' })}</div>`
    + `<div class="timeline-grid-item-4 bg-blue-500">${txt(2)}</div>`
    + `<div class="timeline-grid-item-5 bg-blue-500">${txt(3)}</div>`
    + `<div class="timeline-grid-item-6 bg-green"></div><div class="timeline-grid-item-7"></div>`
    + `<div class="timeline-grid-item-8">${c.img('timeline-05.jpg', { cls: 'timeline-img-square', sizes: '(max-width:1024px) 100vw, 33vw' })}</div>`
    + `<div class="timeline-grid-item-9">${txt(4)}</div>`
    + `<div class="timeline-grid-item-10 bg-blue-500">${txt(5)}</div>`
    + `<div class="timeline-grid-item-11">${txt(6)}</div>`
    + `</section></main>`;
}

/* ================= Casos / Noticias (listados) ================= */
const BACK_SVG = '<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8334 10.4622H4.16675M4.16675 10.4622L10.0001 16.2956M4.16675 10.4622L10.0001 4.62891" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
const NEXT_SVG = '<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.16669 10.4622H15.8334M15.8334 10.4622L10 4.62891M15.8334 10.4622L10 16.2956" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
const PER_PAGE = 6;

function listing(c, items, section, titleKey, descKey) {
  const { t } = c;
  const pages = Math.ceil(items.length / PER_PAGE);
  const cards = items.map((x, i) => `<article data-page="${Math.floor(i / PER_PAGE) + 1}"${i >= PER_PAGE ? ' hidden' : ''}><a href="${c.to(`/${section}/${x.slug}`)}">`
    + (x.image_thumb ? `<div class="news-img">${c.img(x.image_thumb, { alt: byLang(x.title, c.lang), sizes: '(max-width:744px) 100vw, (max-width:1024px) 50vw, 33vw', eager: i < 3 })}</div>` : '')
    + `<div><div class="news-date">${esc(byLang(x.category, c.lang))}</div><h2 class="news-title">${esc(byLang(x.title, c.lang))}</h2><p class="news-lead">${esc(byLang(x.description_short, c.lang))}</p><span class="read-more">${t('news-read-more')}</span></div></a></article>`).join('');
  const nav = items.length > PER_PAGE ? `<nav class="pagination" aria-label="Paginación"><ul>`
    + `<li class="msa-pagination-button msa-pagination-button--back" data-pg="prev"><a class="msa-pagination-link" title="${t('news-paginator-back')}" role="button" tabindex="0">${BACK_SVG}<span class="msa-pagination--arrow-title">${t('news-paginator-back')}</span></a></li>`
    + Array.from({ length: pages }, (_, i) => `<li class="msa-pagination-button${i === 0 ? ' msa-pagination-button--current' : ''}" data-pg="${i + 1}"><a class="msa-pagination-link" role="button" tabindex="0">${i + 1}</a></li>`).join('')
    + `<li class="msa-pagination-button msa-pagination-button--next" data-pg="next"><a class="msa-pagination-link" title="${t('news-paginator-next')}" role="button" tabindex="0"><span class="msa-pagination--arrow-title">${t('news-paginator-next')}</span>${NEXT_SVG}</a></li>`
    + `</ul></nav>` : '';
  return `<main class="main-container"><section class="news-hero"><h1 class="fw-600 lh-120">${t(titleKey)}</h1><p class="fw-400 lh-150">${t(descKey)}</p></section>`
    + `<section class="news news-page-feed"><div class="container news-feed" data-paginate="${PER_PAGE}">${cards}</div>${nav}</section></main>`;
}
export const casos = (c) => listing(c, CASOS, 'casos', 'casos-title', 'casos-description');
export const blog = (c) => listing(c, BLOG, 'blog', 'blog-title', 'blog-description');

function article(c, x, section, backKey) {
  return `<main class="main-container"><section class="news-article"><div class="container-md">`
    + `<a href="${c.to('/' + section)}" class="article-back-link" title="${c.t(backKey)}">${BACK_SVG}<span>${c.t(backKey)}</span></a>`
    + `<article><div class="article-header"><div class="article-date">${esc(byLang(x.category, c.lang))}</div><h1 class="article-title">${esc(byLang(x.title, c.lang))}</h1><p class="article-lead">${byLang(x.description_short, c.lang)}</p></div>`
    + (x.image ? `<div class="article-img">${c.img(x.image, { alt: byLang(x.title, c.lang), eager: true, sizes: '(max-width:900px) 100vw, 900px' })}</div>` : '')
    + `<div class="article-content"><div>${byLang(x.body, c.lang)}</div></div></article></div></section></main>`;
}
export const caso = (c, x) => article(c, x, 'casos', 'casos-back-to');
export const nota = (c, x) => article(c, x, 'blog', 'blog-back-to');

/* ================= Legales ================= */
export function legal(c, doc) {
  const d = LEGAL[c.lang][doc];
  // Las referencias cruzadas usan rutas absolutas (/es/...): se ajustan al base del sitio
  const html = c.base ? d.html.replace(/href="\/(es|en)\//g, `href="${c.base}/$1/`) : d.html;
  return `<main class="main-container"><section class="news-hero legal-hero"><h1 class="fw-600 lh-120">${esc(d.title)}</h1></section><article class="legal-content">${html}</article></main>`;
}

/* ================= Tarjetas personales ================= */
export const CARDS = {
  'juan-pablo-prezzoli': { name: 'Juan Pablo Prezzoli', job: 'cc-jpp-job', photo: 'juan-pablo-prelozzi.jpg', qr: 'qr-juan-pablo-prezzoli.png', tel: '5491169963182', mail: 'juanpablo.prezzoli@comitiacorp.com', lkd: 'https://www.linkedin.com/in/juan-pablo-prezzoli-2876311a7/', vcf: 'juan-pablo-prezzoli.vcf' },
  'nicolas-deane': { name: 'Nicolás Deane', job: 'cc-nd-job', photo: 'nicolas-deane.jpg', qr: 'qr-nicolas-deane.png', tel: '5491166070707', mail: 'nicolas.deane@comitiacorp.com', lkd: 'https://www.linkedin.com/in/nicolas-deane-10195b32b/', vcf: 'nicolas-deane.vcf' },
};
export function card(c, slug) {
  const p = CARDS[slug], { t } = c;
  return `<main class="main-container"><section class="contact-card">${c.img(p.photo, { cls: 'cc-pp', alt: p.name, eager: true, sizes: '200px' })}<h1 class="cc-name fw-600 lh-130">${p.name}</h1><p class="fw-400 cc-job">${t(p.job)}</p>`
    + `<div class="cc-buttons"><a class="btn btn-primary btn-phone" href="tel:+${p.tel}" target="_blank" rel="noreferrer">${t('cc-call-cta')}</a><a class="btn btn-secondary btn-wa" href="https://wa.me/${p.tel}" target="_blank" rel="noreferrer">Whatsapp</a><a class="btn btn-outlined btn-email" href="mailto:${p.mail}" target="_blank" rel="noreferrer">Email</a></div>`
    + `<a class="lkdn-icon" href="${p.lkd}" target="_blank" rel="noreferrer" aria-label="LinkedIn"><img src="${c.src('linkedin-round-icon.svg')}" alt=""></a></section>`
    + `<div class="modal-overlay" id="shareModal" style="display:none"><div class="modal-content modal-content-cc" role="dialog" aria-modal="true"><button class="modal-close" type="button" aria-label="Cerrar"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6.5L6 18.5M6 6.5L18 18.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`
    + `<div class="share-card"><img class="qr-code" src="${c.src(p.qr)}" alt="Qr Code"><div><h2 class="fw-600 lh-120">${t('scan-qr-title')}</h2><p>${t('scan-qr-lead')}</p></div><div class="share-card-btns"><a class="btn btn-secondary btn-wa" href="whatsapp://send?text=%20https://comitiacorp.com/${slug}" target="_blank" rel="noreferrer">Compartir por Whatsapp</a><button class="btn btn-outlined btn-copy" type="button" data-copied="${t('link-copied')}">${t('copy-link')}</button></div></div>`
    + `</div></div></main>`;
}

/* ================= 404 ================= */
export function notFound(c) {
  return `<div class="error-404"><div><h1><strong>404</strong>${c.t('404-title')}</h1><p>${c.T('404-description')}.</p><a class="btn btn-primary btn-large" href="${c.to('/')}">${c.t('404-link')}</a></div></div>`;
}

/* ================= Rutas ================= */
// Cada ruta: { kind, rest (path sin idioma), lang, render(c), meta(c) }
export function routes() {
  const out = [];
  for (const lang of LANGS) {
    const L = LOCALES[lang], seo = SEO[lang];
    const add = (rest, kind, render, meta, extra = {}) => out.push({ lang, rest, kind, render, meta, ...extra });
    add('/', 'home', home, () => ({ title: seo.inicio.title, desc: seo.inicio.desc, ld: 'inicio' }));
    for (const [id, s] of Object.entries(SOLUTIONS)) add(s.path, 'solution', (c) => solution(c, id), () => ({ title: seo[id].title, desc: seo[id].desc, ld: id }), { solution: id, viewer: s.viewer });
    add('/como-trabajamos', 'page', comoTrabajamos, () => ({ title: L['como-trabajamos-meta-title'], desc: L['como-trabajamos-meta-description'] }));
    add('/casos', 'page', casos, () => ({ title: `${L['casos-title']} | COMITIA`, desc: L['casos-description'] }));
    for (const x of CASOS) add('/casos/' + x.slug, 'caso', (c) => caso(c, x), () => ({ title: `${byLang(x.title, lang)} | COMITIA`, desc: stripHtml(byLang(x.description_short, lang)), image: x.image, article: x }));
    add('/blog', 'page', blog, () => ({ title: L['blog-title'], desc: L['blog-description'] }));
    for (const x of BLOG) add('/blog/' + x.slug, 'nota', (c) => nota(c, x), () => ({ title: byLang(x.meta_title, lang) || `${byLang(x.title, lang)} | COMITIA`, desc: stripHtml(byLang(x.meta_description, lang) || byLang(x.description_short, lang)), image: x.image, article: x }));
    add('/mapa-de-casos', 'beta', (c) => BETA.mapaCasos(c, { prefooter, banner, caseCard }), () => BETA.META.mapa(lang), { beta: 'mapa' });
    add('/nosotros', 'beta', (c) => BETA.nosotros(c, { prefooter, banner }), () => BETA.META.nosotros(lang), { beta: 'nosotros' });
    for (const doc of Object.keys(LEGAL[lang])) add('/' + doc, 'legal', (c) => legal(c, doc), () => ({ title: `${LEGAL[lang][doc].title} | COMITIA`, desc: LEGAL[lang][doc].description }));
  }
  for (const slug of Object.keys(CARDS)) out.push({ lang: 'es', rest: '/' + slug, kind: 'card', unprefixed: true, vcf: CARDS[slug].vcf, render: (c) => card(c, slug), meta: () => ({ title: `${CARDS[slug].name} | COMITIA`, desc: `${CARDS[slug].name} · ${LOCALES.es[CARDS[slug].job]} · COMITIA`, noindex: true }) });
  return out;
}
