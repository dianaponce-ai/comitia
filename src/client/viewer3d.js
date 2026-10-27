// Animación 3D controlada por scroll (home, BUE y Notebox).
// Mismo comportamiento que los componentes BUE3D / BUE23D / NoteBox3D del sitio anterior.
// GSAP se carga primero (el "pin" de la home afecta el layout); Three.js y los
// modelos se descargan recién cuando el visor está por entrar en pantalla.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CONFIG = {
  home: { model: 'bue_test_anim_home_2.glb', matScreen: 'emission_pantalla.001', controlled: true },
  bue: { model: 'bue_test_anim_02.glb', matScreen: 'emission_notebox', controlled: false, cam: [0, 35], camMul: [1.0, 0.8], scaleMobile: 0.8 },
  notebox: { model: 'notebox_test_anim_02.glb', matScreen: 'emission_notebox', controlled: false, cam: [0, 35], camMul: [0.8, 0.8], scaleMobile: 0.9 },
};

export function initViewer(section) {
  const kind = section.dataset.viewer, cfg = CONFIG[kind];
  const container = section.querySelector('#canvas-container');
  const driver = { p: 0 };
  gsap.registerPlugin(ScrollTrigger);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (cfg.controlled) {
    gsap.to(driver, { p: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: () => '+=' + Math.round(window.innerHeight * 1.5), scrub: 1, pin: true, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true } });
    if (reduce) ScrollTrigger.getAll().forEach((st) => st.disable());
  } else {
    gsap.to(driver, { p: 1, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 3 } });
  }
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());

  // Three.js y los modelos se descargan después de que la página terminó de cargar
  const idle = (fn) => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: 2500 }) : setTimeout(fn, 600));
  const afterLoad = (fn) => (document.readyState === 'complete' ? idle(fn) : window.addEventListener('load', () => idle(fn), { once: true }));
  const start = () => afterLoad(() => import('./three-scene.js').then((m) => m.mountScene(container, cfg, driver, () => ScrollTrigger.refresh())));
  if (!('IntersectionObserver' in window)) return start();
  const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); start(); } }, { rootMargin: '800px' });
  io.observe(section);
}
