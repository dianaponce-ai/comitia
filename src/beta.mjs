// Páginas en versión beta: "Mapa de casos" y "Nosotros" (con mapa de oficinas).
// Usan la tipografía y la paleta del sitio; sus estilos están en src/styles/beta.css.
import fs from 'fs';
import { feature } from 'topojson-client';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { GROUPS } from './content/locations.mjs';
import { makeExplorer } from './beta-explorer.js';
import { CASOS, esc } from './site.mjs';

/* ---------- Geografía (se calcula una vez en el build) ---------- */
const W = 1000, H = 470;
const topo = JSON.parse(fs.readFileSync(new URL('../node_modules/world-atlas/land-110m.json', import.meta.url)));
const proj = geoEqualEarth().rotate([-10, 0]).fitExtent([[0, 0], [W, H + 40]], { type: 'Sphere' });
export const LAND = geoPath(proj).digits(1)(feature(topo, topo.objects.land));
export const LOC = GROUPS.map(([r, id, name, lon, lat, items]) => { const [x, y] = proj([lon, lat]); return { r, id, name, x: +x.toFixed(1), y: +y.toFixed(1), items }; });
export const VB = { world: [0, 0, W, H] };
for (const r of ['ar', 'latam', 'na', 'eu', 'mea', 'apac']) {
  const pts = LOC.filter((g) => g.r === r);
  let x0 = Math.min(...pts.map((p) => p.x)) - 40, x1 = Math.max(...pts.map((p) => p.x)) + 40;
  let y0 = Math.min(...pts.map((p) => p.y)) - 40, y1 = Math.max(...pts.map((p) => p.y)) + 40;
  let w = Math.max(x1 - x0, 200), h = Math.max(y1 - y0, 200 * H / W);
  if (w / h > W / H) h = w * H / W; else w = h * W / H;
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  VB[r] = [cx - w / 2, cy - h / 2, w, h].map((v) => +v.toFixed(1));
}
export const COUNTRIES = LOC.filter((g) => g.r !== 'ar').length + 1;
export const TOTAL = LOC.reduce((a, g) => a + g.items.length, 0);

/* ---------- Textos ---------- */
const T = (es, en, pt) => ({ es, en, pt });
const STR = {
  beta: T('Beta', 'Beta', 'Beta'),
  nav_mapa: T('Mapa de casos', 'Case map', 'Mapa de casos'),
  nav_nosotros: T('Nosotros', 'About us', 'Sobre nós'),
  beta_note: T('Versión beta: estamos terminando de validar esta sección.', 'Beta version: we are still validating this section.', 'Versão beta: ainda estamos validando esta seção.'),
  cs_h: T('Cada voto cuenta, en cualquier parte del mundo', 'Every vote counts, anywhere in the world', 'Cada voto conta, em qualquer lugar do mundo'),
  cs_p: T('Gobiernos, cámaras, universidades y asociaciones que confiaron su proceso electoral a nuestra tecnología. Un registro de dónde y cómo trabajamos.', 'Governments, chambers of commerce, universities and associations that entrusted their electoral processes to our technology. A record of where and how we work.', 'Governos, câmaras, universidades e associações que confiaram seu processo eleitoral à nossa tecnologia. Um registro de onde e como trabalhamos.'),
  s_countries: T('países con proyectos', 'countries with projects', 'países com projetos'),
  s_places: T('ciudades y localidades', 'cities and localities', 'cidades e localidades'),
  s_years: T('años de trayectoria', 'years of experience', 'anos de trajetória'),
  s_plat: T('plataformas: BUE, Notebox, Turing, Invote y SOE', 'platforms: BUE, Notebox, Turing, Invote and SOE', 'plataformas: BUE, Notebox, Turing, Invote e SOE'),
  ms_h: T('Hitos que marcaron la historia electoral', 'Milestones in electoral history', 'Marcos na história eleitoral'),
  read_case: T('Leer el caso', 'Read the case', 'Ler o caso'),
  x_l: T('Dónde prestamos servicio', 'Where we work', 'Onde atuamos'),
  x_h: T('ubicaciones en', 'locations in', 'localidades em'),
  x_p: T('Explore por región, filtre por plataforma o busque un país, una ciudad o una institución.', 'Explore by region, filter by platform or search for a country, city or institution.', 'Explore por região, filtre por plataforma ou busque um país, uma cidade ou uma instituição.'),
  x_search: T('Buscar país, ciudad o institución', 'Search country, city or institution', 'Buscar país, cidade ou instituição'),
  x_plat: T('Plataforma', 'Platform', 'Plataforma'),
  x_others: T('Otros sistemas', 'Other systems', 'Outros sistemas'),
  x_loc1: T('ubicación', 'location', 'localidade'), x_locn: T('ubicaciones', 'locations', 'localidades'),
  x_ctry: T('países', 'countries', 'países'), x_ctry1: T('país', 'country', 'país'), x_prov: T('provincias', 'provinces', 'províncias'),
  x_byreg: T('Por región', 'By region', 'Por região'), x_view: T('Ver región', 'View region', 'Ver região'),
  x_ar: T('Argentina, por provincia', 'Argentina, by province', 'Argentina, por província'),
  x_results: T('Resultados', 'Results', 'Resultados'),
  x_none: T('No hay ubicaciones que coincidan con la búsqueda. Pruebe con otro término o quite los filtros.', 'No locations match your search. Try another term or clear the filters.', 'Nenhuma localidade corresponde à busca. Tente outro termo ou remova os filtros.'),
  x_clear: T('Quitar filtros', 'Clear filters', 'Limpar filtros'),
  x_legend: T('Ubicaciones con proyectos', 'Locations with projects', 'Localidades com projetos'),
  x_source: T('Fuente: registro interno de proyectos, Comitia · Grupo MSA, 1999–2026.', 'Source: internal project record, Comitia · Grupo MSA, 1999–2026.', 'Fonte: registro interno de projetos, Comitia · Grupo MSA, 1999–2026.'),
  fc_h: T('Casos destacados', 'Featured cases', 'Casos em destaque'),
  about_h: T('Presencia global, impacto local', 'Global presence, local impact', 'Presença global, impacto local'),
  about_p: T('Desde Buenos Aires, Comitia trabaja junto a gobiernos e instituciones en América, Europa, Medio Oriente y África, adaptando su tecnología a cada contexto, marco legal y desafío concreto.', 'From Buenos Aires, Comitia partners with governments and institutions across the Americas, Europe, the Middle East and Africa, adapting its technology to each context, legal framework and real-world challenge.', 'De Buenos Aires, a Comitia trabalha com governos e instituições nas Américas, na Europa, no Oriente Médio e na África, adaptando sua tecnologia a cada contexto, marco legal e desafio concreto.'),
  a1h: T('Equipos cerca de cada elección', 'Teams close to every election', 'Equipes perto de cada eleição'),
  a1p: T('Doce oficinas permiten acompañar cada proceso en su propia zona horaria, idioma y marco normativo.', 'Twelve offices let us support each process in its own time zone, language and regulatory framework.', 'Doze escritórios permitem apoiar cada processo em seu próprio fuso horário, idioma e marco regulatório.'),
  a2h: T('Respaldo de Grupo MSA', 'Backed by Grupo MSA', 'Respaldo do Grupo MSA'),
  a2p: T('Comitia forma parte de Grupo MSA y comparte su trayectoria en tecnología electoral.', 'Comitia is part of Grupo MSA and shares its track record in electoral technology.', 'A Comitia faz parte do Grupo MSA e compartilha sua trajetória em tecnologia eleitoral.'),
  a3h: T('Gestión certificada', 'Certified management', 'Gestão certificada'),
  a3p: T('Nuestro sistema de gestión cuenta con certificaciones ISO/IEC 27001 e ISO/IEC 27701.', 'Our management system is certified to ISO/IEC 27001 and ISO/IEC 27701.', 'Nosso sistema de gestão é certificado pelas normas ISO/IEC 27001 e ISO/IEC 27701.'),
  offices_h: T('Doce oficinas en once países', 'Twelve offices in eleven countries', 'Doze escritórios em onze países'),
  offices_p: T('Seleccione una oficina en el mapa o en el listado para ubicarla.', 'Select an office on the map or in the list to locate it.', 'Selecione um escritório no mapa ou na lista para localizá-lo.'),
  hq: T('Sede central', 'Headquarters', 'Sede'), office: T('Oficina', 'Office', 'Escritório'),
  office_note: T('Oficina regional. Escríbanos a contactus@comitiacorp.com para coordinar una reunión con el equipo local.', 'Regional office. Write to contactus@comitiacorp.com to arrange a meeting with the local team.', 'Escritório regional. Escreva para contactus@comitiacorp.com para agendar uma reunião com a equipe local.'),
  hq_note: T('Atuel 362, Distrito Tecnológico, Parque Patricios (C1437EPD), Buenos Aires. Tel. +54 11 6091-1540.', 'Atuel 362, Technology District, Parque Patricios (C1437EPD), Buenos Aires. Phone +54 11 6091-1540.', 'Atuel 362, Distrito Tecnológico, Parque Patricios (C1437EPD), Buenos Aires. Tel. +54 11 6091-1540.'),
  certs_h: T('Seguridad y privacidad bajo normas internacionales', 'Security and privacy under international standards', 'Segurança e privacidade sob normas internacionais'),
  c1p: T('Sistema de gestión de la seguridad de la información.', 'Information security management system.', 'Sistema de gestão da segurança da informação.'),
  c2p: T('Sistema de gestión de la información de privacidad.', 'Privacy information management system.', 'Sistema de gestão da informação de privacidade.'),
  c3p: T('Certificación independiente de TÜV Rheinland.', 'Independent certification by TÜV Rheinland.', 'Certificação independente da TÜV Rheinland.'),
  msa_t: T('<strong>Comitia es parte de Grupo MSA.</strong> Para noticias institucionales del grupo, visite <a href="https://www.msa.com.ar/noticias/comitia" target="_blank" rel="noreferrer">msa.com.ar</a>. Consultas de prensa: <a href="mailto:press@comitiacorp.com">press@comitiacorp.com</a>.', '<strong>Comitia is part of Grupo MSA.</strong> For corporate news from the group, visit <a href="https://www.msa.com.ar/noticias/comitia" target="_blank" rel="noreferrer">msa.com.ar</a>. Press enquiries: <a href="mailto:press@comitiacorp.com">press@comitiacorp.com</a>.', '<strong>A Comitia faz parte do Grupo MSA.</strong> Para notícias institucionais do grupo, visite <a href="https://www.msa.com.ar/noticias/comitia" target="_blank" rel="noreferrer">msa.com.ar</a>. Imprensa: <a href="mailto:press@comitiacorp.com">press@comitiacorp.com</a>.'),
  meta_mapa_t: T('Mapa de casos de éxito | COMITIA', 'Case study map | COMITIA', 'Mapa de casos de sucesso | COMITIA'),
  meta_mapa_d: T('Dónde trabajó Comitia: ubicaciones con proyectos electorales en todo el mundo, por región y plataforma, e hitos de la historia electoral.', 'Where Comitia has worked: locations with electoral projects worldwide, by region and platform, and milestones in electoral history.', 'Onde a Comitia atuou: localidades com projetos eleitorais em todo o mundo, por região e plataforma, e marcos da história eleitoral.'),
  meta_nos_t: T('Nosotros | Oficinas y certificaciones | COMITIA', 'About us | Offices and certifications | COMITIA', 'Sobre nós | Escritórios e certificações | COMITIA'),
  meta_nos_d: T('Comitia, empresa de Grupo MSA: doce oficinas en once países, certificaciones ISO/IEC 27001 y 27701 y equipos cerca de cada elección.', 'Comitia, a Grupo MSA company: twelve offices in eleven countries, ISO/IEC 27001 and 27701 certifications and teams close to every election.', 'Comitia, empresa do Grupo MSA: doze escritórios em onze países, certificações ISO/IEC 27001 e 27701 e equipes perto de cada eleição.'),
};
const REGION_NAMES = { world: T('Mundo', 'World', 'Mundo'), ar: T('Argentina', 'Argentina', 'Argentina'), latam: T('LATAM', 'LATAM', 'LATAM'), na: T('Norteamérica', 'North America', 'América do Norte'), eu: T('Europa', 'Europe', 'Europa'), mea: T('Medio Oriente y África', 'Middle East and Africa', 'Oriente Médio e África'), apac: T('Asia-Pacífico', 'Asia-Pacific', 'Ásia-Pacífico') };
export const strings = (lang) => Object.fromEntries(Object.entries(STR).map(([k, v]) => [k, v[lang]]));
const regionNames = (lang) => Object.fromEntries(Object.entries(REGION_NAMES).map(([k, v]) => [k, v[lang]]));

// Datos que necesita el navegador para filtrar el mapa
export function explorerData(lang) {
  return { lang, s: strings(lang), loc: LOC, vb: VB, land: LAND, regions: regionNames(lang), countries: COUNTRIES };
}

/* ---------- Hitos ---------- */
const MS = [
  { when: '2025', pl: 'I', caso: 'invote-en-la-antartida', h: T('<b>1.ª</b> votación por internet desde la Antártida', '<b>1st</b> internet vote from Antarctica', '<b>1.ª</b> votação pela internet a partir da Antártida'), p: T('Por primera vez en el mundo, el personal de las bases antárticas votó en línea en las elecciones de Tierra del Fuego.', 'For the first time in the world, staff at Antarctic bases voted online in the Tierra del Fuego elections.', 'Pela primeira vez no mundo, o pessoal das bases antárticas votou online nas eleições da Terra do Fogo.'), w: T('Ushuaia, Tierra del Fuego', 'Ushuaia, Tierra del Fuego', 'Ushuaia, Terra do Fogo') },
  { when: '2011–2023', pl: 'I', h: T('Voto electrónico en el <b>100%</b> del país', 'Electronic voting across <b>100%</b> of the country', 'Voto eletrônico em <b>100%</b> do país'), p: T('Elecciones del Federal National Council implementadas en todo el territorio de los Emiratos durante más de una década.', 'Federal National Council elections implemented across the entire UAE for more than a decade.', 'Eleições do Federal National Council implementadas em todo o território dos Emirados por mais de uma década.'), w: T('Emiratos Árabes Unidos', 'United Arab Emirates', 'Emirados Árabes Unidos') },
  { when: T('Plataforma permanente', 'Permanent platform', 'Plataforma permanente'), pl: 'I', h: T('<b>16 millones</b> de votantes en una sola plataforma', '<b>16 million</b> voters on a single platform', '<b>16 milhões</b> de eleitores em uma única plataforma'), p: T('Sistema de votación permanente para todo el padrón del estado de Gujarat.', 'A permanent voting system for the entire voter roll of the state of Gujarat.', 'Sistema de votação permanente para todo o cadastro eleitoral do estado de Gujarat.'), w: T('Gujarat, India', 'Gujarat, India', 'Gujarat, Índia') },
  { when: '2024', pl: 'B', h: T('<b>25</b> municipios votaron con Boleta Única Electrónica', '<b>25</b> municipalities voted with the Electronic Single Ballot', '<b>25</b> municípios votaram com a Cédula Única Eletrônica'), p: T('Elecciones municipales en 25 cantones (así se llaman los municipios en Costa Rica) con BUE.', 'Municipal elections in 25 cantons (as municipalities are called in Costa Rica) with BUE.', 'Eleições municipais em 25 cantões (como se chamam os municípios na Costa Rica) com a BUE.'), w: T('San José, Costa Rica', 'San José, Costa Rica', 'San José, Costa Rica') },
  { when: '2009–2025', pl: 'BNO', caso: 'notebox-en-las-elecciones-de-salta', h: T('<b>16 años</b> de voto electrónico en Salta', '<b>16 years</b> of electronic voting in Salta', '<b>16 anos</b> de voto eletrônico em Salta'), p: T('Implementación integral de BUE, Recuento Provisorio y Notebox en la provincia, elección tras elección.', 'End-to-end implementation of BUE, provisional count and Notebox in the province, election after election.', 'Implementação integral da BUE, contagem provisória e Notebox na província, eleição após eleição.'), w: T('Salta, Argentina', 'Salta, Argentina', 'Salta, Argentina') },
  { when: T('España', 'Spain', 'Espanha'), pl: 'I', h: T('<b>23</b> procesos electorales en Madrid', '<b>23</b> electoral processes in Madrid', '<b>23</b> processos eleitorais em Madri'), p: T('Votaciones para instituciones como el Ayuntamiento de Madrid y la Guardia Civil.', 'Votes for institutions such as Madrid City Council and the Guardia Civil.', 'Votações para instituições como a Prefeitura de Madri e a Guardia Civil.'), w: T('Madrid, España', 'Madrid, Spain', 'Madri, Espanha') },
];

/* ---------- Oficinas ---------- */
const OFFICE_COORDS = { bsas: [-58.38, -34.60], colonia: [-57.84, -34.47], asuncion: [-57.58, -25.26], quito: [-78.47, -0.18], tegucigalpa: [-87.19, 14.07], sanjose: [-84.08, 9.93], miami: [-80.19, 25.76], tampa: [-82.46, 27.95], ontario: [-79.38, 43.65], barcelona: [2.17, 41.39], dubai: [55.27, 25.20], johannesburg: [28.05, -26.20] };
const OFFICES = [
  { n: T('Sudamérica', 'South America', 'América do Sul'), items: [['bsas', 'Buenos Aires', 'Argentina', 1], ['colonia', T('Colonia', 'Colonia', 'Colônia'), 'Uruguay'], ['asuncion', T('Asunción', 'Asunción', 'Assunção'), T('Paraguay', 'Paraguay', 'Paraguai')], ['quito', 'Quito', T('Ecuador', 'Ecuador', 'Equador')]] },
  { n: T('Centroamérica', 'Central America', 'América Central'), items: [['tegucigalpa', 'Tegucigalpa', 'Honduras'], ['sanjose', 'San José', 'Costa Rica']] },
  { n: T('Norteamérica', 'North America', 'América do Norte'), items: [['miami', 'Miami', T('Estados Unidos', 'United States', 'Estados Unidos')], ['tampa', 'Tampa', T('Estados Unidos', 'United States', 'Estados Unidos')], ['ontario', T('Ontario', 'Ontario', 'Ontário'), T('Canadá', 'Canada', 'Canadá')]] },
  { n: T('Europa, Medio Oriente y África', 'Europe, Middle East and Africa', 'Europa, Oriente Médio e África'), items: [['barcelona', 'Barcelona', T('España', 'Spain', 'Espanha')], ['dubai', T('Dubái', 'Dubai', 'Dubai'), T('Emiratos Árabes Unidos', 'United Arab Emirates', 'Emirados Árabes Unidos')], ['johannesburg', T('Johannesburgo', 'Johannesburg', 'Joanesburgo'), T('Sudáfrica', 'South Africa', 'África do Sul')]] },
];
const PINS = Object.fromEntries(Object.entries(OFFICE_COORDS).map(([k, c]) => { const [x, y] = proj(c); return [k, [+(x / W * 100).toFixed(2), +(y / H * 100).toFixed(2)]]; }));

/* ---------- Render ---------- */
const L = (o, lang) => (o == null ? '' : typeof o === 'string' ? o : (o[lang] ?? o.es));
const betaTag = (s) => `<span class="bx-beta" title="${esc(s.beta_note)}"><span aria-hidden="true">★</span> ${s.beta}</span>`;

function hero(c, s, h, p, facts = '') {
  return `<section class="news-hero bx-hero"><div class="bx-hero-tag">${betaTag(s)}</div><h1 class="fw-600 lh-120">${esc(h)}</h1><p class="fw-400 lh-150">${esc(p)}</p></section>${facts}`;
}
const secHead = (h, p) => `<div class="bx-head"><h2 class="fw-600 lh-120">${h}</h2>${p ? `<p>${p}</p>` : ''}</div>`;

export function mapaCasos(c, { prefooter, banner, caseCard }) {
  const s = strings(c.lang), X = { region: 'world', plats: {}, q: '' };
  const ex = makeExplorer(explorerData(c.lang));
  const facts = `<div class="bx-facts">${[[COUNTRIES, s.s_countries], [TOTAL, s.s_places], [27, s.s_years], [5, s.s_plat]].map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div>`;
  const ms = MS.map((m) => {
    const tag = m.caso ? 'a' : 'article';
    return `<${tag} class="bx-ms${m.caso ? ' bx-ms-link' : ''}"${m.caso ? ` href="${c.to('/casos/' + m.caso)}"` : ''}><div class="bx-ms-top"><span class="bx-when">${esc(L(m.when, c.lang))}</span>${ex.pls(m.pl)}</div><h3>${L(m.h, c.lang)}</h3><p>${esc(L(m.p, c.lang))}</p><span class="bx-where">${esc(L(m.w, c.lang))}</span>${m.caso ? `<span class="bx-more">${s.read_case} →</span>` : ''}</${tag}>`;
  }).join('');
  return `<main class="main-container bx-page">`
    + hero(c, s, s.cs_h, s.cs_p, facts)
    + `<section class="bx-sec">${secHead(s.ms_h)}<div class="bx-ms-grid">${ms}</div></section>`
    + `<section class="bx-sec bx-alt" id="explorer">${secHead(`${TOTAL} ${s.x_h} ${COUNTRIES} ${s.x_ctry}`, s.x_p)}<div id="bx-wrap">${ex.explorer(X)}</div></section>`
    + `<section class="news bx-feat"><div class="container news-feed-header"><h2 class="fw-600 fs-36 lh-120">${s.fc_h}</h2><a href="${c.to('/casos')}" class="btn btn-primary">${c.t('casos-btn')}</a></div><div class="container news-feed">${CASOS.slice(0, 3).map((x) => caseCard(c, x, '...', '(max-width:1024px) 50vw, 33vw')).join('')}</div></section>`
    + `<script type="application/json" id="bx-data">${JSON.stringify({ ...explorerData(c.lang), land: undefined }).replace(/</g, '\\u003c')}</script>`
    + banner(c) + prefooter(c) + `</main>`;
}

export function nosotros(c, { prefooter, banner }) {
  const s = strings(c.lang), lang = c.lang;
  const pins = OFFICES.flatMap((r) => r.items).map((o) => { const p = PINS[o[0]]; return `<button type="button" class="bx-pin${o[3] ? ' hq' : ''}${p[0] > 80 ? ' flip' : ''}${o[0] === 'bsas' ? ' on' : ''}" data-office="${o[0]}" style="left:${p[0]}%;top:${p[1]}%" aria-label="${esc(L(o[1], lang) + ', ' + L(o[2], lang))}"><i></i><span class="bx-tip">${esc(L(o[1], lang))}</span></button>`; }).join('');
  const list = OFFICES.map((r) => `<div class="bx-region"><span class="bx-label">${esc(L(r.n, lang))}</span>${r.items.map((o) => `<button type="button" class="bx-office${o[0] === 'bsas' ? ' on' : ''}" data-office="${o[0]}" data-note="${esc(o[3] ? s.hq_note : s.office_note)}" data-name="${esc(L(o[1], lang) + ', ' + L(o[2], lang))}"><span><b>${esc(L(o[1], lang))}</b>${o[3] ? `<span class="bx-hq">${s.hq}</span>` : ''}</span><span class="bx-ct">${esc(L(o[2], lang))}</span></button>`).join('')}</div>`).join('');
  const certs = [['ISO_IEC_27001_2022_HOR.jpg', 'ISO/IEC 27001:2022', s.c1p], ['ISO_IEC_27701_2019_HOR.jpg', 'ISO/IEC 27701:2019', s.c2p], ['TUV.jpg', 'TÜV Rheinland', s.c3p]]
    .map(([img, n, p]) => `<div class="bx-cert"><span class="bx-badge">${c.img(img, { alt: n, sizes: '240px' })}</span><b>${n}</b><p>${p}</p></div>`).join('');
  return `<main class="main-container bx-page">`
    + hero(c, s, s.about_h, s.about_p)
    + `<section class="bx-sec"><div class="bx-intro">${[[s.a1h, s.a1p], [s.a2h, s.a2p], [s.a3h, s.a3p]].map(([h, p]) => `<div><h3>${h}</h3><p>${p}</p></div>`).join('')}</div></section>`
    + `<section class="bx-sec bx-alt">${secHead(s.offices_h, s.offices_p)}<div class="bx-atlas"><div class="bx-omap"><div class="bx-omap-in" id="bx-omap"><svg viewBox="0 0 1000 470" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(s.offices_h)}"><path class="bx-land" d="${LAND}"/></svg>${pins}</div><div class="bx-omap-foot"><span><i class="hq"></i>${s.hq}</span><span><i></i>${s.office}</span></div><div class="bx-odetail" id="bx-odetail" aria-live="polite"><b>Buenos Aires, Argentina</b>${s.hq_note}</div></div>`
    + `<div class="bx-offices">${list}</div></div></section>`
    + `<section class="bx-sec">${secHead(s.certs_h)}<div class="bx-certs">${certs}</div><p class="bx-msa">${s.msa_t}</p></section>`
    + banner(c) + prefooter(c) + `</main>`;
}

export const META = {
  mapa: (lang) => ({ title: STR.meta_mapa_t[lang], desc: STR.meta_mapa_d[lang], noindex: true }),
  nosotros: (lang) => ({ title: STR.meta_nos_t[lang], desc: STR.meta_nos_d[lang], noindex: true }),
};
