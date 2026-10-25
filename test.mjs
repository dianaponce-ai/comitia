import { JSDOM } from 'jsdom';
import fs from 'fs';
const html = fs.readFileSync('artifact/comitia.html','utf8');
const errs=[];
for (const h of ['', '#en-case-studies', '#pt-casos-de-sucesso', '#es-soluciones-bue', '#en-about-us', '#pt-contato', '#es-noticias', '#casos', '#zz']) {
  const dom = new JSDOM('<!doctype html><html><body>'+html+'</body></html>', { runScripts:'dangerously', url:'https://x.test/'+h, pretendToBeVisual:true });
  dom.window.addEventListener('error', e=>errs.push(h+' '+e.message));
  await new Promise(r=>setTimeout(r,50));
  const d=dom.window.document;
  const t=d.querySelector('main h1')?.textContent;
  let extra='';
  if (d.getElementById('xwrap')) {
    d.querySelector('[data-reg="eu"]').click();
    extra += ' eu-cards:'+d.querySelectorAll('.gcard').length;
    const q=d.getElementById('x-q'); q.value='swiss'; q.dispatchEvent(new dom.window.Event('input',{bubbles:true}));
    extra += ' swiss:'+d.querySelectorAll('.gcard li').length;
    d.querySelector('[data-pl="B"]').click(); extra+=' empty:'+!!d.querySelector('.x-empty');
    d.querySelector('[data-clear]').click(); extra+=' after-clear:'+d.querySelectorAll('.gcard li').length;
    d.querySelector('[data-reg="world"]').click(); extra+=' rcards:'+d.querySelectorAll('.rcard').length+' bubs:'+d.querySelectorAll('.bub').length;
  }
  const langLinks=[...d.querySelectorAll('.lang a')].map(a=>a.getAttribute('href')).join(' ');
  console.log(h||'(none)', '|', d.documentElement.lang, '|', t, '|', langLinks, extra);
}
console.log('errors', errs);
