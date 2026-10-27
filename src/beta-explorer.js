// Explorador del mapa de casos (página beta). Funciones puras que generan HTML:
// las usa el build (HTML inicial) y el navegador (al filtrar), así ambos coinciden.
export const PLATS = [['B', 'BUE'], ['N', 'Notebox'], ['T', 'Turing'], ['I', 'Invote'], ['O', null]];
export const XREG = ['world', 'ar', 'latam', 'na', 'eu', 'mea', 'apac'];

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const L = (o, lang) => (o == null ? '' : typeof o === 'string' ? o : (o[lang] ?? o.es));

export function makeExplorer(D) {
  // D = { lang, s (textos), loc, vb, land, regions (nombres) }
  const { lang, s } = D;
  const platName = (c) => { const p = PLATS.find((x) => x[0] === c); return p[1] || s.x_others; };
  const pls = (codes) => `<span class="bx-pls">${codes.split('').map((c) => `<span class="bx-pl ${c}">${platName(c)}</span>`).join('')}</span>`;
  const anyPlat = (X) => Object.values(X.plats).some(Boolean);
  const itemOk = (X, g, it) => {
    if (anyPlat(X) && !it[1].split('').some((c) => X.plats[c])) return false;
    if (X.q) { const t = norm(L(g.name, lang) + ' ' + L(it[0], lang) + ' ' + it[2] + ' ' + it[3] + ' ' + it[4]); if (!t.includes(norm(X.q))) return false; }
    return true;
  };
  const groupsFor = (X, region) => D.loc.filter((g) => region === 'world' || g.r === region)
    .map((g) => ({ g, items: g.items.filter((it) => itemOk(X, g, it)) })).filter((x) => x.items.length);
  const platsOf = (items) => { const set = {}; items.forEach((it) => it[1].split('').forEach((c) => { set[c] = 1; })); return PLATS.map((p) => p[0]).filter((c) => set[c]).join(''); };
  const count = (n) => n + ' ' + (n === 1 ? s.x_loc1 : s.x_locn);
  const regName = (id) => D.regions[id];
  const nctry = (id, n) => n + ' ' + (id === 'ar' ? s.x_prov : n === 1 ? s.x_ctry1 : s.x_ctry);

  function map(X) {
    const vb = D.vb[X.region], sc = vb[2] / 1000, list = groupsFor(X, X.region);
    const bubs = list.map((x) => {
      const n = x.items.length, r = (6 + 3.2 * Math.sqrt(n)) * sc;
      return `<g class="bx-bub" tabindex="0" role="button" data-g="${x.g.id}" aria-label="${esc(L(x.g.name, lang) + ': ' + count(n))}"><circle cx="${x.g.x}" cy="${x.g.y}" r="${r.toFixed(2)}" stroke-width="${(1.3 * sc).toFixed(2)}"/><text x="${x.g.x}" y="${x.g.y}" font-size="${(9.5 * sc).toFixed(2)}">${n}</text></g>`;
    }).join('');
    return `<svg viewBox="${vb.join(' ')}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(regName(X.region))}"><path class="bx-land" d="${D.land}"/>${bubs}</svg>`
      + `<span class="bx-crumb">${X.region === 'world' ? regName('world') : regName('world') + ' / ' + regName(X.region)}</span><span class="bx-legend">${s.x_legend}</span>`;
  }
  function gcard(x) {
    return `<article class="bx-gcard" id="g-${x.g.id}"><header><div><b>${esc(L(x.g.name, lang))}</b><small>${count(x.items.length)}</small></div><span class="bx-n">${x.items.length}</span>${pls(platsOf(x.items))}</header>`
      + `<ul>${x.items.map((it) => `<li><b>${esc(L(it[0], lang))}</b>${esc(lang === 'es' ? it[2] : lang === 'en' ? it[3] : it[4])}</li>`).join('')}</ul></article>`;
  }
  function columns(cards) {
    const cols = [[], [], []], h = [0, 0, 0];
    cards.forEach((c) => { const i = h.indexOf(Math.min(...h)); cols[i].push(c.html); h[i] += c.w; });
    return `<div class="bx-grid">${cols.map((c) => `<div class="bx-col">${c.join('')}</div>`).join('')}</div>`;
  }
  function results(X) {
    const filtering = anyPlat(X) || X.q;
    if (X.region === 'world' && !filtering) {
      const cards = XREG.slice(1).map((id) => {
        const list = groupsFor(X, id); let items = []; list.forEach((x) => { items = items.concat(x.items); });
        return `<article class="bx-rcard"><div class="bx-top"><div><b>${esc(regName(id))}</b><small>${nctry(id, list.length)}</small></div><span class="bx-n">${items.length}</span>${pls(platsOf(items))}</div><p class="bx-ctry">${list.map((x) => esc(L(x.g.name, lang))).join(' · ')}</p><button type="button" data-reg="${id}">${s.x_view} <span aria-hidden="true">→</span></button></article>`;
      });
      const total = D.loc.reduce((a, g) => a + g.items.length, 0);
      return `<div class="bx-res-head"><h3>${s.x_byreg}</h3><span>${count(total)} · ${D.countries} ${s.x_ctry}</span></div><div class="bx-grid bx-grid-regions">${cards.join('')}</div>`;
    }
    const list = groupsFor(X, X.region); const n = list.reduce((a, x) => a + x.items.length, 0);
    const title = X.region === 'ar' ? s.x_ar : X.region === 'world' ? s.x_results : regName(X.region);
    const head = `<div class="bx-res-head"><h3>${esc(title)}</h3><span>${count(n)} · ${nctry(X.region, list.length)}</span></div>`;
    if (!list.length) return head + `<div class="bx-empty"><span>${s.x_none}</span><button type="button" class="btn btn-primary btn-sm" data-clear="1">${s.x_clear}</button></div>`;
    list.sort((a, b) => b.items.length - a.items.length);
    return head + columns(list.map((x) => ({ html: gcard(x), w: 2 + x.items.length * 1.4 })));
  }
  function explorer(X) {
    const tabs = XREG.map((id) => { const c = id === 'world' ? D.countries : D.loc.filter((g) => g.r === id).length; return `<button type="button" data-reg="${id}" aria-pressed="${X.region === id}">${esc(regName(id))}<small>${c}</small></button>`; }).join('');
    const chips = PLATS.map((p) => { const on = !!X.plats[p[0]]; return `<button type="button" class="bx-pl ${p[0]}${anyPlat(X) && !on ? ' dim' : ''}" data-pl="${p[0]}" aria-pressed="${on}">${platName(p[0])}</button>`; }).join('');
    return `<div class="bx-controls"><div class="bx-tabs" role="group" aria-label="${esc(s.x_l)}">${tabs}</div>`
      + `<label class="bx-search"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg><span class="bx-sr">${s.x_search}</span><input id="bx-q" type="search" placeholder="${esc(s.x_search)}…" value="${esc(X.q)}" autocomplete="off"></label></div>`
      + `<div class="bx-plats" role="group" aria-label="${esc(s.x_plat)}"><span class="bx-label">${s.x_plat}</span>${chips}</div>`
      + `<div class="bx-map" id="bx-map">${map(X)}</div><div id="bx-res">${results(X)}</div><p class="bx-source">${s.x_source}</p>`;
  }
  return { explorer, map, results, pls };
}
