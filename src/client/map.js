// Mapa de oficinas: tooltips en los marcadores y resaltado desde el listado
import { computePosition, offset, flip, shift, arrow, autoUpdate } from '@floating-ui/dom';

export function initMap(root) {
  const markers = Array.from(root.querySelectorAll('.map-marker-v2'));
  const tips = new Map();
  const show = (m) => {
    if (tips.has(m)) return;
    const tip = document.createElement('div');
    tip.className = 'custom-tooltip'; tip.setAttribute('role', 'tooltip'); tip.textContent = m.dataset.tip;
    const ar = document.createElement('div'); ar.className = 'custom-tooltip-arrow'; tip.appendChild(ar);
    tip.style.position = 'absolute'; tip.style.left = '0'; tip.style.top = '0';
    document.body.appendChild(tip);
    const placement = m.dataset.placement || 'top';
    const update = () => computePosition(m, tip, { placement, middleware: [offset(8), flip({ fallbackAxisSideDirection: 'start' }), shift({ padding: 8 }), arrow({ element: ar })] })
      .then(({ x, y, placement: pl, middlewareData }) => {
        Object.assign(tip.style, { left: x + 'px', top: y + 'px' });
        const side = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[pl.split('-')[0]];
        const a = middlewareData.arrow || {};
        Object.assign(ar.style, { left: a.x != null ? a.x + 'px' : '', top: a.y != null ? a.y + 'px' : '', right: '', bottom: '', [side]: '-4px' });
      });
    tips.set(m, { tip, stop: autoUpdate(m, tip, update) });
  };
  const hide = (m) => { const t = tips.get(m); if (!t) return; t.stop(); t.tip.remove(); tips.delete(m); };
  const timers = new Map();
  markers.forEach((m) => {
    const enter = () => { clearTimeout(timers.get(m)); timers.set(m, setTimeout(() => show(m), 300)); };
    const leave = () => { clearTimeout(timers.get(m)); timers.set(m, setTimeout(() => hide(m), 100)); };
    m.addEventListener('mouseenter', enter); m.addEventListener('mouseleave', leave);
    m.addEventListener('focus', () => show(m)); m.addEventListener('blur', () => hide(m));
    m.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(m); });
  });
  // Listado de ciudades: al pasar el mouse se activa el marcador y su tooltip
  document.querySelectorAll('.locations [data-marker]').forEach((p) => {
    const m = document.getElementById(p.dataset.marker); if (!m) return;
    p.addEventListener('mouseenter', () => { m.classList.add('active'); show(m); });
    p.addEventListener('mouseleave', () => { m.classList.remove('active'); hide(m); });
  });
}
