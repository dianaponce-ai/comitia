// Carruseles (Splide): casos en mobile y galería de fotos en modal
import Splide from '@splidejs/splide';

export function initNews(el) {
  if (el.classList.contains('is-initialized')) return;
  new Splide(el, { pagination: true, padding: { left: 16, right: 16 }, gap: 16 }).mount();
}

let modal = null;
export function openGallery(index = 0) {
  if (modal) return;
  const tpl = document.getElementById('galleryFull');
  const imgs = tpl ? Array.from(tpl.content.querySelectorAll('img')) : [];
  modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = '<div class="modal-content" role="dialog" aria-modal="true"><button class="modal-close" type="button" aria-label="Cerrar"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6.5L6 18.5M6 6.5L18 18.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button><div class="splide-gallery-container"><div class="splide" aria-label=""><div class="splide__track"><ul class="splide__list"></ul></div></div><ul class="thumbnails-list"></ul></div></div>';
  const list = modal.querySelector('.splide__list'), thumbs = modal.querySelector('.thumbnails-list');
  imgs.forEach((im, i) => {
    const li = document.createElement('li'); li.className = 'splide__slide';
    const big = im.cloneNode(); big.removeAttribute('loading'); li.appendChild(big); list.appendChild(li);
    const th = document.createElement('li'); th.className = 'thumbnail'; th.tabIndex = 0;
    const small = im.cloneNode(); small.width = 60; small.removeAttribute('srcset'); small.removeAttribute('sizes');
    if (im.srcset) { const m = im.srcset.split(',')[0].trim().split(' ')[0]; small.src = m; }
    th.appendChild(small); thumbs.appendChild(th);
  });
  document.body.appendChild(modal);
  const content = modal.querySelector('.modal-content');
  const sp = new Splide(modal.querySelector('.splide'), { pagination: false, start: index }).mount();
  Array.from(thumbs.children).forEach((th, i) => {
    th.addEventListener('click', () => sp.go(i));
    th.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sp.go(i); } });
  });
  const prev = document.activeElement;
  const close = () => { sp.destroy(); modal.remove(); modal = null; document.removeEventListener('mousedown', outside); document.removeEventListener('keydown', key); if (prev && prev.focus) prev.focus(); };
  const outside = (e) => { if (!content.contains(e.target)) close(); };
  const key = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('mousedown', outside);
  document.addEventListener('keydown', key);
  modal.querySelector('.modal-close').addEventListener('click', close);
  modal.querySelector('.modal-close').focus();
}
