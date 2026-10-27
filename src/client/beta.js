// Interacción de las páginas beta (mapa de casos y mapa de oficinas).
import { makeExplorer } from '../beta-explorer.js';

export function initExplorer(wrap) {
  const dataEl = document.getElementById('bx-data');
  if (!dataEl) return;
  const D = JSON.parse(dataEl.textContent);
  D.land = wrap.querySelector('.bx-land').getAttribute('d'); // el contorno ya viene en el HTML
  const ex = makeExplorer(D);
  const X = { region: 'world', plats: {}, q: '' };
  const paint = (full) => {
    if (full) {
      const q = wrap.querySelector('#bx-q'), focus = document.activeElement === q, pos = q ? q.selectionStart : 0;
      wrap.innerHTML = ex.explorer(X);
      if (focus) { const n = wrap.querySelector('#bx-q'); n.focus(); n.setSelectionRange(pos, pos); }
    } else {
      wrap.querySelector('#bx-map').innerHTML = ex.map(X);
      wrap.querySelector('#bx-res').innerHTML = ex.results(X);
    }
  };
  wrap.addEventListener('click', (e) => {
    const t = e.target.closest('[data-reg],[data-pl],[data-clear],.bx-bub');
    if (!t) return;
    if (t.dataset.reg) { X.region = t.dataset.reg; paint(true); if (t.closest('#bx-res')) wrap.querySelector('#bx-map').scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    else if (t.dataset.pl) { X.plats[t.dataset.pl] = !X.plats[t.dataset.pl]; paint(true); }
    else if (t.dataset.clear) { X.plats = {}; X.q = ''; paint(true); }
    else if (t.dataset.g) focusGroup(t.dataset.g);
  });
  wrap.addEventListener('keydown', (e) => {
    const b = e.target.closest('.bx-bub');
    if (b && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); focusGroup(b.dataset.g); }
  });
  let timer;
  wrap.addEventListener('input', (e) => {
    if (e.target.id !== 'bx-q') return;
    clearTimeout(timer);
    timer = setTimeout(() => { X.q = e.target.value.trim(); paint(false); }, 150);
  });
  function focusGroup(id) {
    const g = D.loc.find((x) => x.id === id);
    if (!g) return;
    // Desde la vista mundial, primero se pasa a la región del grupo
    if (X.region === 'world' && !X.q && !Object.values(X.plats).some(Boolean)) { X.region = g.r; paint(true); }
    const card = wrap.querySelector('#g-' + CSS.escape(id));
    if (!card) return;
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    card.classList.add('flash');
    setTimeout(() => card.classList.remove('flash'), 1600);
  }
}

export function initOffices(root) {
  const detail = root.querySelector('#bx-odetail');
  const select = (id, scroll) => {
    root.querySelectorAll('[data-office]').forEach((el) => {
      const on = el.dataset.office === id;
      el.classList.toggle('on', on);
      if (el.classList.contains('bx-office')) el.setAttribute('aria-pressed', on);
    });
    const item = root.querySelector('.bx-office[data-office="' + id + '"]');
    if (item && detail) {
      detail.innerHTML = '';
      const b = document.createElement('b'); b.textContent = item.dataset.name;
      detail.append(b, document.createTextNode(item.dataset.note));
      if (scroll && window.matchMedia('(max-width: 1023px)').matches) detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };
  root.addEventListener('click', (e) => {
    const t = e.target.closest('[data-office]');
    if (t) select(t.dataset.office, t.classList.contains('bx-pin'));
  });
}
