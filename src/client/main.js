// Interacciones del sitio (reemplazan a React). Cada bloque se activa solo si
// su markup está en la página; las librerías pesadas se cargan bajo demanda.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const SITE = window.__SITE__ || { lang: 'es', base: '' };
const isMobile = () => window.innerWidth < 1024;

/* ---------- Header ---------- */
function initHeader() {
  const header = $('#site-header'); if (!header) return;
  const menu = $('#mainNav');
  const toggler = $('#menuToggler');
  const close = $('#closeMenu');
  const toggle = () => { menu.classList.toggle('open'); if (toggler) toggler.setAttribute('aria-expanded', String(menu.classList.contains('open'))); };
  const closeMenu = () => { menu.classList.remove('open'); dd && dd.classList.remove('open'); ddMenu && ddMenu.classList.remove('show'); if (toggler) toggler.setAttribute('aria-expanded', 'false'); };
  if (toggler) { toggler.addEventListener('click', toggle); toggler.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }); }
  if (close) close.addEventListener('click', toggle);
  $$('a', menu).forEach((a) => a.addEventListener('click', () => closeMenu()));

  // Dropdown "Soluciones": hover en desktop, click en mobile
  const dd = $('.dropdown-parent', menu), ddMenu = dd && $('.dropdown-menu', dd);
  if (dd) {
    const set = (o) => { dd.classList.toggle('open', o); ddMenu.classList.toggle('show', o); };
    dd.addEventListener('mouseenter', () => { if (!isMobile()) set(true); });
    dd.addEventListener('mouseleave', () => { if (!isMobile()) set(false); });
    $('.soluciones-toogle-mob', dd).addEventListener('click', () => { if (isMobile()) set(!dd.classList.contains('open')); });
    const tabs = () => { $('.soluciones-toogle-desk', dd).tabIndex = isMobile() ? -1 : 0; $('.soluciones-toogle-mob', dd).tabIndex = isMobile() ? 0 : -1; };
    tabs(); window.addEventListener('resize', tabs);
  }

  // Botones "Contacto" / "Soluciones": scroll en la home, o ir a la home y luego scrollear
  $$('[data-goto]').forEach((b) => b.addEventListener('click', (e) => {
    const id = b.dataset.goto;
    e.preventDefault(); closeMenu();
    if (document.getElementById(id) && (SITE.page === 'home' || id === 'contacto' && b.closest('main'))) scrollToSection(id, b.closest('main') ? 0 : null);
    else { try { sessionStorage.setItem('pendingScroll', id); } catch (_) {} location.href = SITE.base + '/' + SITE.lang; }
  }));
  if (SITE.page === 'home') {
    let p = null; try { p = sessionStorage.getItem('pendingScroll'); sessionStorage.removeItem('pendingScroll'); } catch (_) {}
    if (!p && location.hash) p = location.hash.slice(1);
    if (p && document.getElementById(p)) window.addEventListener('load', () => setTimeout(() => scrollToSection(p), 300));
  }

  // Idiomas: misma página en el otro idioma
  $$('[data-lang-href]').forEach((b) => b.addEventListener('click', () => {
    try { localStorage.setItem('i18nextLng', b.getAttribute('lang')); } catch (_) {}
    location.href = b.dataset.langHref + location.search;
  }));

  // Clase "scrolled": en la home cuando el hero sale de pantalla; en el resto al scrollear
  const hero = $('#site-hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver((es) => es.forEach((en) => header.classList.toggle('scrolled', !en.isIntersecting)), { threshold: 0 }).observe(hero);
  } else {
    const on = () => header.classList.toggle('scrolled', window.scrollY > 0);
    on(); window.addEventListener('scroll', on, { passive: true });
  }
}

// Scroll suave a una sección. Como el layout puede moverse mientras tanto
// (animación 3D fijada, fuentes, imágenes), se re-mide y corrige al terminar.
function scrollToSection(id, offset, tries = 0) {
  const el = document.getElementById(id), header = $('#site-header'); if (!el) return;
  const target = () => Math.max(0, el.getBoundingClientRect().top + window.scrollY - (offset ?? (header ? header.offsetHeight : 0)));
  window.scrollTo({ top: target(), behavior: tries ? 'auto' : 'smooth' });
  let done = false, last = -1, still = 0;
  const check = () => {
    if (done) return;
    if (Math.abs(window.scrollY - last) < 1) still++; else still = 0;
    last = window.scrollY;
    if (still < 4) return requestAnimationFrame(check);
    done = true;
    if (Math.abs(window.scrollY - target()) > 4 && tries < 3) scrollToSection(id, offset, tries + 1);
  };
  requestAnimationFrame(check);
}

/* ---------- Formulario de contacto ---------- */
function initForm() {
  const f = $('#contactForm'); if (!f) return;
  const fb = $('.form-feedback', f);
  const msg = (k) => f.dataset['e' + k.charAt(0).toUpperCase() + k.slice(1)];
  const setErr = (input, text) => {
    const wrap = input.parentElement;
    let span = wrap.querySelector('span.err');
    wrap.classList.toggle('has-error', !!text);
    if (text) { if (!span) { span = document.createElement('span'); span.className = 'err'; wrap.appendChild(span); } span.textContent = text; input.setAttribute('aria-invalid', 'true'); }
    else { if (span) span.remove(); input.removeAttribute('aria-invalid'); }
  };
  const validate = () => {
    let first = null;
    for (const name of ['name', 'lastname', 'email', 'message']) {
      const el = f.elements[name], v = el.value.trim();
      let err = '';
      if (!v) err = msg(name);
      else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) err = f.dataset.eEmailInvalid;
      setErr(el, err); if (err && !first) first = el;
    }
    if (first) first.focus();
    return !first;
  };
  $$('input,textarea', f).forEach((el) => el.addEventListener('input', () => { if (el.parentElement.classList.contains('has-error')) setErr(el, ''); }));
  let timer;
  const show = (text, ok) => {
    fb.textContent = text; fb.className = 'form-feedback ' + (ok ? 'form-feedback--success' : 'form-feedback--error'); fb.style.display = 'inline-block';
    clearTimeout(timer); timer = setTimeout(() => { fb.style.display = 'none'; }, 3000);
  };
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const d = Object.fromEntries(new FormData(f));
    const btn = $('button[type=submit]', f); btn.disabled = true;
    try {
      const r = await fetch('https://msa-emails.vercel.app/api/send-email', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: d.email, message: `Nombre y Apellido: ${d.name} ${d.lastname} - Telefono: ${d.phone || ''} - Mensaje: ${d.message}`, name: d.name, lastname: d.lastname, sendTo: 'contactus@comitiacorp.com' }),
      });
      if (!r.ok) throw new Error(r.status);
      f.reset(); show(f.dataset.ok, true);
      (window.dataLayer = window.dataLayer || []).push({ event: 'contact_form_submit' });
    } catch (_) { show(f.dataset.fail, false); }
    btn.disabled = false;
  });
}

/* ---------- Videos: el del formulario se carga al acercarse ---------- */
function initVideos() {
  const vids = $$('video[data-lazy-video]'); if (!vids.length) return;
  const load = (v) => { $$('source[data-src]', v).forEach((s) => { s.src = s.dataset.src; s.removeAttribute('data-src'); }); v.load(); const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  // Solo se descargan si están visibles (el del hero no se muestra en mobile)
  const shown = (v) => v.offsetParent !== null && getComputedStyle(v.parentElement).display !== 'none';
  vids.filter((v) => v.dataset.lazyVideo === 'hero').forEach((v) => { if (shown(v)) load(v); });
  vids.splice(0, vids.length, ...vids.filter((v) => v.dataset.lazyVideo !== 'hero'));
  if (!('IntersectionObserver' in window)) return vids.forEach(load);
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { io.unobserve(en.target); load(en.target); } }), { rootMargin: '400px' });
  vids.forEach((v) => io.observe(v));
}

/* ---------- Paginación de Casos / Noticias ---------- */
function initPagination() {
  const feed = $('[data-paginate]'), nav = $('.pagination'); if (!feed || !nav) return;
  const items = $$('article', feed); const pages = Math.max(...items.map((a) => +a.dataset.page));
  let cur = 1;
  const go = (n) => {
    cur = Math.min(Math.max(n, 1), pages);
    items.forEach((a) => { a.hidden = +a.dataset.page !== cur; });
    $$('[data-pg]', nav).forEach((li) => li.classList.toggle('msa-pagination-button--current', li.dataset.pg === String(cur)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  $$('[data-pg]', nav).forEach((li) => {
    const act = () => { const v = li.dataset.pg; go(v === 'prev' ? cur - 1 : v === 'next' ? cur + 1 : +v); };
    li.addEventListener('click', act);
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
  });
}

/* ---------- Tarjetas personales: compartir ---------- */
function initCard() {
  const modal = $('#shareModal'); if (!modal) return;
  const open = (e) => { e.preventDefault(); modal.style.display = 'block'; };
  const close = () => { modal.style.display = 'none'; };
  $$('.cc-share .share').forEach((a) => a.addEventListener('click', open));
  modal.addEventListener('click', close);
  $('.modal-content', modal).addEventListener('click', (e) => e.stopPropagation());
  $('.modal-close', modal).addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  const copy = $('.btn-copy', modal), label = copy.textContent;
  copy.addEventListener('click', () => {
    const url = location.href.split('#')[0];
    (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(() => {
      copy.textContent = copy.dataset.copied; setTimeout(() => { copy.textContent = label; }, 2000);
    }).catch(() => {});
  });
}

/* ---------- Carga diferida de módulos pesados ---------- */
function whenNear(el, cb, margin = '600px') {
  if (!('IntersectionObserver' in window)) return cb();
  const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); cb(); } }, { rootMargin: margin });
  io.observe(el);
}
function initLazyModules() {
  const viewer = $('#viewer[data-viewer]');
  if (viewer) import('./viewer3d.js').then((m) => m.initViewer(viewer));
  const map = $('.map-image-v2');
  if (map) whenNear(map, () => import('./map.js').then((m) => m.initMap(map)));
  const news = $('[data-splide-news]');
  if (news) {
    const mq = window.matchMedia('(max-width: 743px)');
    const run = () => import('./splide.js').then((m) => m.initNews(news));
    if (mq.matches) whenNear(news, run); else mq.addEventListener && mq.addEventListener('change', (e) => { if (e.matches) run(); }, { once: true });
  }
  const gal = $$('[data-gallery]');
  if (gal.length) gal.forEach((el) => {
    const open = () => import('./splide.js').then((m) => m.openGallery(+el.dataset.gallery));
    el.addEventListener('click', open);
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

initHeader();
initForm();
initVideos();
initPagination();
initCard();
initLazyModules();
