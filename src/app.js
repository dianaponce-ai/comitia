/* ===== Routing ===== */
var ROUTES={
 inicio:{es:'',en:'',pt:''},
 soluciones:{es:'soluciones',en:'solutions',pt:'solucoes'},
 bue:{p:'soluciones',es:'bue',en:'bue',pt:'bue'},
 notebox:{p:'soluciones',es:'notebox',en:'notebox',pt:'notebox'},
 turing:{p:'soluciones',es:'turing',en:'turing',pt:'turing'},
 invote:{p:'soluciones',es:'invote',en:'invote',pt:'invote'},
 operaciones:{p:'soluciones',es:'operaciones-electorales',en:'electoral-operations',pt:'operacoes-eleitorais'},
 informacion:{p:'soluciones',es:'informacion-y-capacitacion',en:'information-and-training',pt:'informacao-e-capacitacao'},
 'como-trabajamos':{es:'como-trabajamos',en:'how-we-work',pt:'como-trabalhamos'},
 casos:{es:'casos-de-exito',en:'case-studies',pt:'casos-de-sucesso'},
 'caso-paraguay':{p:'casos',es:'paraguay',en:'paraguay',pt:'paraguai'},
 'caso-tierra-del-fuego':{p:'casos',es:'tierra-del-fuego',en:'tierra-del-fuego',pt:'terra-do-fogo'},
 'caso-salta':{p:'casos',es:'salta',en:'salta',pt:'salta'},
 noticias:{es:'noticias',en:'news',pt:'noticias'},
 nosotros:{es:'nosotros',en:'about-us',pt:'sobre-nos'},
 contacto:{es:'contacto',en:'contact',pt:'contato'}
};
var PAGES=Object.keys(ROUTES);
var SITE=(typeof __SITE__!=='undefined'&&__SITE__)||{mode:'spa',origin:'',base:''};
function segs(page,lg){ var r=ROUTES[page],a=[]; if(r.p) a.push(ROUTES[r.p][lg]); if(r[lg]) a.push(r[lg]); return a; }
function path(page,lg){ var s=segs(page,lg||lang); return SITE.base+'/'+(lg||lang)+'/'+(s.length?s.join('/')+'/':''); }
function token(page,lg){ return [lg||lang].concat(segs(page,lg||lang)).join('-'); }
function href(page,lg){ return SITE.mode==='static'?path(page,lg):'#'+token(page,lg); }
var TOK={}; PAGES.forEach(function(p){ LANGS.forEach(function(l){ TOK[token(p,l)]={page:p,lang:l}; }); });

/* ===== Extra strings ===== */
var U2={
 nav_casos:{es:'Casos de éxito',en:'Case studies',pt:'Casos de sucesso'},
 cs_l:{es:'Casos de éxito',en:'Case studies',pt:'Casos de sucesso'},
 cs_h:{es:'Cada voto cuenta, <em>en cualquier parte del mundo</em>.',en:'Every vote counts, <em>anywhere in the world</em>.',pt:'Cada voto conta, <em>em qualquer lugar do mundo</em>.'},
 cs_p:{es:'Gobiernos, cámaras, universidades y asociaciones que confiaron su proceso electoral a nuestra tecnología. Un registro auditable de dónde y cómo trabajamos.',en:'Governments, chambers of commerce, universities and associations that entrusted their electoral processes to our technology. An auditable record of where and how we work.',pt:'Governos, câmaras, universidades e associações que confiaram seu processo eleitoral à nossa tecnologia. Um registro auditável de onde e como trabalhamos.'},
 s_countries:{es:'países con proyectos',en:'countries with projects',pt:'países com projetos'},
 s_places:{es:'ciudades y localidades',en:'cities and localities',pt:'cidades e localidades'},
 s_years:{es:'años de trayectoria',en:'years of experience',pt:'anos de trajetória'},
 s_plat:{es:'plataformas: BUE, Notebox, Turing, Invote y SOE',en:'platforms: BUE, Notebox, Turing, Invote and SOE',pt:'plataformas: BUE, Notebox, Turing, Invote e SOE'},
 ms_l:{es:'Hitos',en:'Milestones',pt:'Marcos'},
 ms_h:{es:'Hitos que marcaron la historia electoral.',en:'Milestones in electoral history.',pt:'Marcos na história eleitoral.'},
 x_l:{es:'Dónde prestamos servicio',en:'Where we work',pt:'Onde atuamos'},
 x_h:{es:'74 ubicaciones en 28 países.',en:'74 locations in 28 countries.',pt:'74 localidades em 28 países.'},
 x_p:{es:'Explore por región, filtre por plataforma o busque un país, una ciudad o una institución.',en:'Explore by region, filter by platform or search for a country, city or institution.',pt:'Explore por região, filtre por plataforma ou busque um país, uma cidade ou uma instituição.'},
 x_search:{es:'Buscar país, ciudad o institución',en:'Search country, city or institution',pt:'Buscar país, cidade ou instituição'},
 x_plat:{es:'Plataforma',en:'Platform',pt:'Plataforma'},
 x_others:{es:'Otros sistemas',en:'Other systems',pt:'Outros sistemas'},
 x_loc1:{es:'ubicación',en:'location',pt:'localidade'},
 x_locn:{es:'ubicaciones',en:'locations',pt:'localidades'},
 x_ctry:{es:'países',en:'countries',pt:'países'},
 x_ctry1:{es:'país',en:'country',pt:'país'},
 x_prov:{es:'provincias',en:'provinces',pt:'províncias'},
 x_byreg:{es:'Por región',en:'By region',pt:'Por região'},
 x_view:{es:'Ver región',en:'View region',pt:'Ver região'},
 x_ar:{es:'Argentina, por provincia',en:'Argentina, by province',pt:'Argentina, por província'},
 x_results:{es:'Resultados',en:'Results',pt:'Resultados'},
 x_none:{es:'No hay ubicaciones que coincidan con la búsqueda. Pruebe con otro término o quite los filtros.',en:'No locations match your search. Try another term or clear the filters.',pt:'Nenhuma localidade corresponde à busca. Tente outro termo ou remova os filtros.'},
 x_clear:{es:'Quitar filtros',en:'Clear filters',pt:'Limpar filtros'},
 x_legend:{es:'Ubicaciones con proyectos',en:'Locations with projects',pt:'Localidades com projetos'},
 x_source:{es:'Fuente: registro interno de proyectos, Comitia · Grupo MSA, 1999–2026.',en:'Source: internal project record, Comitia · Grupo MSA, 1999–2026.',pt:'Fonte: registro interno de projetos, Comitia · Grupo MSA, 1999–2026.'},
 fc_l:{es:'Casos destacados',en:'Featured cases',pt:'Casos em destaque'},
 fc_h:{es:'Las elecciones más recientes.',en:'Our most recent elections.',pt:'As eleições mais recentes.'},
 cs_cta_h:{es:'¿Su institución tiene una elección por delante?',en:'Does your institution have an election coming up?',pt:'Sua instituição tem uma eleição pela frente?'},
 cs_cta_p:{es:'Cuéntenos el proceso y armamos la solución a medida.',en:'Tell us about the process and we will build a tailored solution.',pt:'Conte-nos sobre o processo e montamos a solução sob medida.'},
 back_cases:{es:'Volver a casos de éxito',en:'Back to case studies',pt:'Voltar aos casos de sucesso'},
 all_cases:{es:'Ver todos los casos de éxito',en:'View all case studies',pt:'Ver todos os casos de sucesso'},
 lang_name:{es:'Español',en:'English',pt:'Português'}
};
for(var k2 in U2) U[k2]=U2[k2];

var XREG=[
 {id:'world',n:{es:'Mundo',en:'World',pt:'Mundo'}},
 {id:'ar',n:'Argentina'},
 {id:'latam',n:'LATAM'},
 {id:'na',n:{es:'Norteamérica',en:'North America',pt:'América do Norte'}},
 {id:'eu',n:{es:'Europa',en:'Europe',pt:'Europa'}},
 {id:'mea',n:{es:'Medio Oriente y África',en:'Middle East and Africa',pt:'Oriente Médio e África'}},
 {id:'apac',n:{es:'Asia-Pacífico',en:'Asia-Pacific',pt:'Ásia-Pacífico'}}
];
var PLATS=[['B','BUE'],['N','Notebox'],['T','Turing'],['I','Invote'],['O',null]];
function platName(c){ for(var i=0;i<PLATS.length;i++) if(PLATS[i][0]===c) return PLATS[i][1]||u('x_others'); }
var MS=[
 {when:'2025',pl:'I',h:{es:'<b>1.ª</b> votación por internet desde la Antártida',en:'<b>1st</b> internet vote from Antarctica',pt:'<b>1.ª</b> votação pela internet a partir da Antártida'},p:{es:'Por primera vez en el mundo, el personal de las bases antárticas votó en línea en las elecciones de Tierra del Fuego.',en:'For the first time in the world, staff at Antarctic bases voted online in the Tierra del Fuego elections.',pt:'Pela primeira vez no mundo, o pessoal das bases antárticas votou online nas eleições da Terra do Fogo.'},w:{es:'Ushuaia, Tierra del Fuego',en:'Ushuaia, Tierra del Fuego',pt:'Ushuaia, Terra do Fogo'}},
 {when:'2011–2023',pl:'I',h:{es:'Voto electrónico en el <b>100%</b> del país',en:'Electronic voting across <b>100%</b> of the country',pt:'Voto eletrônico em <b>100%</b> do país'},p:{es:'Elecciones del Federal National Council implementadas en todo el territorio de los Emiratos durante más de una década.',en:'Federal National Council elections implemented across the entire UAE for more than a decade.',pt:'Eleições do Federal National Council implementadas em todo o território dos Emirados por mais de uma década.'},w:{es:'Emiratos Árabes Unidos',en:'United Arab Emirates',pt:'Emirados Árabes Unidos'}},
 {when:{es:'Plataforma permanente',en:'Permanent platform',pt:'Plataforma permanente'},pl:'I',h:{es:'<b>16 millones</b> de votantes en una sola plataforma',en:'<b>16 million</b> voters on a single platform',pt:'<b>16 milhões</b> de eleitores em uma única plataforma'},p:{es:'Sistema de votación permanente para todo el padrón del estado de Gujarat.',en:'A permanent voting system for the entire voter roll of the state of Gujarat.',pt:'Sistema de votação permanente para todo o cadastro eleitoral do estado de Gujarat.'},w:{es:'Gujarat, India',en:'Gujarat, India',pt:'Gujarat, Índia'}},
 {when:'2024',pl:'B',h:{es:'<b>25</b> municipios votaron con Boleta Única Electrónica',en:'<b>25</b> municipalities voted with the Electronic Single Ballot',pt:'<b>25</b> municípios votaram com a Cédula Única Eletrônica'},p:{es:'Elecciones municipales en 25 cantones (así se llaman los municipios en Costa Rica) con BUE.',en:'Municipal elections in 25 cantons (as municipalities are called in Costa Rica) with BUE.',pt:'Eleições municipais em 25 cantões (como se chamam os municípios na Costa Rica) com a BUE.'},w:{es:'San José, Costa Rica',en:'San José, Costa Rica',pt:'San José, Costa Rica'}},
 {when:'2009–2025',pl:'BNO',h:{es:'<b>16 años</b> de voto electrónico en Salta',en:'<b>16 years</b> of electronic voting in Salta',pt:'<b>16 anos</b> de voto eletrônico em Salta'},p:{es:'Implementación integral de BUE, Recuento Provisorio y Notebox en la provincia, elección tras elección.',en:'End-to-end implementation of BUE, provisional count and Notebox in the province, election after election.',pt:'Implementação integral da BUE, contagem provisória e Notebox na província, eleição após eleição.'},w:{es:'Salta, Argentina',en:'Salta, Argentina',pt:'Salta, Argentina'}},
 {when:{es:'España',en:'Spain',pt:'Espanha'},pl:'I',h:{es:'<b>23</b> procesos electorales en Madrid',en:'<b>23</b> electoral processes in Madrid',pt:'<b>23</b> processos eleitorais em Madri'},p:{es:'Votaciones para instituciones como el Ayuntamiento de Madrid y la Guardia Civil.',en:'Votes for institutions such as Madrid City Council and the Guardia Civil.',pt:'Votações para instituições como a Prefeitura de Madri e a Guardia Civil.'},w:{es:'Madrid, España',en:'Madrid, Spain',pt:'Madri, Espanha'}}
];

/* ===== Helpers ===== */
var CC='https://comitiacorp.com/';
function sp(lng){ return lng==='en'?'en':'es'; }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function strip(s){ return String(s).replace(/<[^>]+>/g,''); }
function solName(s){ return L(s.name); }
function solById(id){ for(var i=0;i<SOL.length;i++) if(SOL[i].id===id) return SOL[i]; }
function caseById(id){ for(var i=0;i<CASES.length;i++) if(CASES[i].id===id) return CASES[i]; }
function newsBySlug(sl){ for(var i=0;i<NEWS.length;i++) if(NEWS[i].slug===sl) return NEWS[i]; }
var MONTHS={es:['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],en:['January','February','March','April','May','June','July','August','September','October','November','December'],pt:['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']};
function fmtDate(d){ var p=d.split('-'),y=p[0],m=MONTHS[lang][+p[1]-1],dd=+p[2]; return lang==='en'?m+' '+dd+', '+y:dd+' de '+m+' de '+y; }
function ext(h,txt,cls){ return '<a class="tlink'+(cls?' '+cls:'')+'" href="'+h+'" target="_blank" rel="noreferrer">'+txt+' <svg><use href="#ext"/></svg></a>'; }
function arrowLink(page,txt){ return '<a class="tlink" href="'+href(page)+'">'+txt+' <svg><use href="#arrow"/></svg></a>'; }
function catLabel(c){ return c==='general'?u('general'):CATS[c]; }
function newsUrl(n){ return CC+(lang==='en'?'en/':'')+'blog/'+n.slug; }
function secHead(label,h,p,more,tag){ tag=tag||'h2'; return '<div class="sec-head"><p class="label">'+label+'</p><div><'+tag+'>'+h+'</'+tag+'>'+(p?'<p>'+p+'</p>':'')+(more?'<div class="more">'+more+'</div>':'')+'</div></div>'; }
function phead(crumbs,label,h,lead,sub,extra){
  var c='<nav class="crumbs" aria-label="breadcrumb"><a href="'+href('inicio')+'">'+u('nav_inicio')+'</a>';
  crumbs.forEach(function(x){ c+='<span aria-hidden="true">/</span>'+(x[1]?'<a href="'+href(x[1])+'">'+x[0]+'</a>':'<span aria-current="page">'+x[0]+'</span>'); });
  c+='</nav>';
  return '<section class="phead"><div class="wrap">'+c+'<div class="phead-grid"><p class="label">'+label+'</p><div><h1>'+h+(sub?'<span class="sub">'+sub+'</span>':'')+'</h1>'+(lead?'<p class="lead">'+lead+'</p>':'')+'</div></div></div>'+(extra||'')+'</section>';
}
function ctaBand(h,p,btn){ return '<section class="cta-band"><div class="wrap"><div><h2>'+h+'</h2>'+(p?'<p>'+p+'</p>':'')+'</div><a class="btn btn-teal" href="'+href('contacto')+'">'+btn+' <svg><use href="#arrow"/></svg></a></div></section>'; }
function pls(codes){ return '<span class="pls">'+codes.split('').map(function(c){ return '<span class="pl '+c+'">'+platName(c)+'</span>'; }).join('')+'</span>'; }

/* ===== Blocks ===== */
function credsBlock(){
  return '<section class="creds" aria-label="'+u('creds')+'"><div class="wrap"><p class="label">'+u('creds')+'</p><div class="creds-groups">'+
  '<div class="creds-group"><span class="label">'+u('certs_l')+'</span><span class="cred num">ISO/IEC 27001:2022<small>'+u('c27001')+'</small></span><span class="cred num">ISO/IEC 27701:2019<small>'+u('c27701')+'</small></span><span class="cred">TÜV<small>'+u('ctuv')+'</small></span></div>'+
  '<div class="creds-group"><span class="label">'+u('partners_l')+'</span><span class="cred">Amazon Web Services</span><span class="cred">Intel</span><span class="cred">STMicroelectronics</span></div></div></div></section>';
}
function principlesBlock(){
  return '<div class="principles">'+PR.map(function(p){ return '<div class="pr"><svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">'+p.i+'</svg><h3>'+L(p.h)+'</h3><p>'+L(p.p)+'</p></div>'; }).join('')+'</div>';
}
function solRow(s,compact){
  var desc=L(s.desc)+(s.list?'<ul class="bul">'+L(s.list).map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>':'');
  if(compact) return '<article class="sol compact"><h3><a href="'+href(s.id)+'">'+solName(s)+'</a><span class="full">'+L(s.full)+'</span></h3><div class="desc">'+desc+'</div><div class="sol-links">'+arrowLink(s.id,u('see_more'))+'</div></article>';
  return '<article class="sol"><h3><a href="'+href(s.id)+'">'+solName(s)+'</a><span class="full">'+L(s.full)+'</span></h3><div class="desc">'+desc+'</div><span class="tag">'+L(s.tag)+'</span><div class="sol-links">'+arrowLink(s.id,u('see_more'))+'<a class="tlink sub" href="'+CC+'brochures/'+s.brochure+'" target="_blank" rel="noreferrer"><svg><use href="#dl"/></svg> '+u('brochure')+'</a></div></article>';
}
function caseCard(c,leadCase){
  var stats=leadCase&&c.stats.length?'<div class="case-stats">'+c.stats.map(function(s){return '<div><b class="num">'+L(s[0])+'</b><span>'+L(s[1])+'</span></div>';}).join('')+'</div>':'';
  var chips=!leadCase&&c.sols.length?'<div class="chips">'+c.sols.map(function(id){return '<span class="tag">'+solName(solById(id))+'</span>';}).join('')+'</div>':'';
  return '<a class="case'+(leadCase?' lead-case':'')+'" href="'+href(c.id)+'"><div class="case-meta"><span class="label">'+L(c.place)+'</span><time datetime="'+c.date+'">'+fmtDate(c.date)+'</time></div><h3>'+L(c.title)+'</h3><p>'+(leadCase?L(c.lead):L(c.short))+'</p>'+stats+chips+'</a>';
}
function casesGrid(){ return '<div class="cases">'+caseCard(CASES[0],true)+'<div class="cases-side">'+caseCard(CASES[1])+caseCard(CASES[2])+'</div></div>'; }
function newsCard(n){
  return '<a class="news" href="'+newsUrl(n)+'" target="_blank" rel="noreferrer" data-cat="'+n.cat+'"><span class="label">'+catLabel(n.cat)+'</span><h3>'+L(n.t)+'</h3><p>'+L(n.p)+'</p><span class="tlink">'+u('read_art')+' <svg><use href="#ext"/></svg></span></a>';
}
function pager(list,idx,nameFn){
  var p=list[idx-1], n=list[idx+1];
  return '<nav class="pager">'+(p?'<a href="'+href(p.id)+'"><span class="label">← '+u('prev')+'</span><b>'+nameFn(p)+'</b></a>':'<span class="ph"></span>')+(n?'<a href="'+href(n.id)+'"><span class="label">'+u('next')+' →</span><b>'+nameFn(n)+'</b></a>':'<span class="ph"></span>')+'</nav>';
}
function msBlock(){
  return '<div class="ms-grid">'+MS.map(function(m){ return '<article class="ms"><div class="ms-top"><span class="label">'+L(m.when)+'</span>'+pls(m.pl)+'</div><h3>'+L(m.h)+'</h3><p>'+L(m.p)+'</p><span class="where"><i></i>'+L(m.w)+'</span></article>'; }).join('')+'</div>';
}

/* ===== Explorer ===== */
var X={region:'world',plats:{},q:''};
function norm(s){ return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,''); }
function anyPlat(){ for(var k in X.plats) if(X.plats[k]) return true; return false; }
function itemOk(g,it){
  if(anyPlat()){ var ok=false; it[1].split('').forEach(function(c){ if(X.plats[c]) ok=true; }); if(!ok) return false; }
  if(X.q){ var t=norm(L(g.name)+' '+L(it[0])+' '+it[2]+' '+it[3]+' '+it[4]); if(t.indexOf(norm(X.q))<0) return false; }
  return true;
}
function groupsFor(region){
  return LOC.filter(function(g){ return region==='world'||g.r===region; }).map(function(g){
    var items=g.items.filter(function(it){ return itemOk(g,it); });
    return {g:g,items:items};
  }).filter(function(x){ return x.items.length; });
}
function platsOf(items){ var s={}; items.forEach(function(it){ it[1].split('').forEach(function(c){ s[c]=1; }); }); return PLATS.map(function(p){return p[0];}).filter(function(c){ return s[c]; }).join(''); }
function countLabel(n){ return n+' '+(n===1?u('x_loc1'):u('x_locn')); }
function xMap(){
  var vb=VB[X.region], sc=vb[2]/1000, list=groupsFor(X.region);
  var reg=XREG.filter(function(r){return r.id===X.region;})[0];
  var bubs=list.map(function(x){
    var n=x.items.length, r=(6+3.2*Math.sqrt(n))*sc;
    return '<g class="bub" tabindex="0" role="button" data-g="'+x.g.id+'" aria-label="'+esc(L(x.g.name)+': '+countLabel(n))+'"><circle cx="'+x.g.x+'" cy="'+x.g.y+'" r="'+r.toFixed(2)+'" stroke-width="'+(1.3*sc).toFixed(2)+'"/>'+(n>1?'<text x="'+x.g.x+'" y="'+x.g.y+'" font-size="'+(9.5*sc).toFixed(2)+'">'+n+'</text>':'')+'</g>';
  }).join('');
  return '<svg viewBox="'+vb.join(' ')+'" preserveAspectRatio="xMidYMid slice" role="img" aria-label="'+esc(L(reg.n))+'"><path class="land" d="'+LAND+'"/>'+bubs+'</svg><span class="crumb">'+(X.region==='world'?L(XREG[0].n):L(XREG[0].n)+' / '+L(reg.n))+'</span><span class="legend">'+u('x_legend')+'</span>';
}
function gcard(x){
  return '<article class="gcard" id="g-'+x.g.id+'"><header><div><b>'+L(x.g.name)+'</b><small>'+countLabel(x.items.length)+'</small></div><span class="n num">'+x.items.length+'</span>'+pls(platsOf(x.items))+'</header><ul>'+x.items.map(function(it){ return '<li><b>'+L(it[0])+'</b>'+(lang==='es'?it[2]:lang==='en'?it[3]:it[4])+'</li>'; }).join('')+'</ul></article>';
}
function columns(cards){
  var cols=[[],[],[]], h=[0,0,0];
  cards.forEach(function(c){ var i=h.indexOf(Math.min.apply(null,h)); cols[i].push(c.html); h[i]+=c.w; });
  return '<div class="x-grid">'+cols.map(function(c){ return '<div class="x-col">'+c.join('')+'</div>'; }).join('')+'</div>';
}
function xResults(){
  var filtering=anyPlat()||X.q;
  if(X.region==='world' && !filtering){
    var cards=XREG.slice(1).map(function(r){
      var list=groupsFor(r.id), items=[]; list.forEach(function(x){ items=items.concat(x.items); });
      var names=list.map(function(x){return L(x.g.name);}).join(' · ');
      return '<article class="rcard"><div class="top"><div><b>'+L(r.n)+'</b><small>'+list.length+' '+(r.id==='ar'?u('x_prov'):(list.length===1?u('x_ctry1'):u('x_ctry')))+'</small></div><span class="n num">'+items.length+'</span>'+pls(platsOf(items))+'</div><p class="ctry">'+names+'</p><button type="button" data-reg="'+r.id+'">'+u('x_view')+' <svg><use href="#arrow"/></svg></button></article>';
    });
    var total=0; LOC.forEach(function(g){ total+=g.items.length; });
    return '<div class="x-res-head"><h3>'+u('x_byreg')+'</h3><span class="num">'+countLabel(total)+' · 28 '+u('x_ctry')+'</span></div><div class="x-grid" style="display:grid">'+cards.join('')+'</div>';
  }
  var list=groupsFor(X.region), n=0; list.forEach(function(x){ n+=x.items.length; });
  var reg=XREG.filter(function(r){return r.id===X.region;})[0];
  var title=X.region==='ar'?u('x_ar'):(X.region==='world'?u('x_results'):L(reg.n));
  var head='<div class="x-res-head"><h3>'+title+'</h3><span class="num">'+countLabel(n)+' · '+list.length+' '+(X.region==='ar'?u('x_prov'):(list.length===1?u('x_ctry1'):u('x_ctry')))+'</span></div>';
  if(!list.length) return head+'<div class="x-empty"><span>'+u('x_none')+'</span><button type="button" data-clear="1">'+u('x_clear')+'</button></div>';
  list.sort(function(a,b){ return b.items.length-a.items.length; });
  return head+columns(list.map(function(x){ return {html:gcard(x),w:2+x.items.length*1.4}; }));
}
function explorer(){
  var tabs=XREG.map(function(r){ var c=r.id==='world'?28:LOC.filter(function(g){return g.r===r.id;}).length; return '<button type="button" data-reg="'+r.id+'" aria-pressed="'+(X.region===r.id)+'">'+L(r.n)+'<small class="num">'+c+'</small></button>'; }).join('');
  var chips=PLATS.map(function(p){ var on=!!X.plats[p[0]]; return '<button type="button" class="pl '+p[0]+(anyPlat()&&!on?' dim':'')+'" data-pl="'+p[0]+'" aria-pressed="'+on+'">'+platName(p[0])+'</button>'; }).join('');
  return '<div class="x-controls"><div class="x-tabs" role="group" aria-label="'+u('x_l')+'">'+tabs+'</div><label class="x-search"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg><span class="sr" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">'+u('x_search')+'</span><input id="x-q" type="search" placeholder="'+u('x_search')+'…" value="'+esc(X.q)+'" autocomplete="off"></label></div>'+
  '<div class="x-plats" role="group" aria-label="'+u('x_plat')+'"><span class="label">'+u('x_plat')+'</span>'+chips+'</div>'+
  '<div class="xmap" id="xmap">'+xMap()+'</div><div id="xres">'+xResults()+'</div><p class="x-source">'+u('x_source')+'</p>';
}

/* ===== Views ===== */
var V={};
var sealDone=false, newsFilter='all', formState={}, office='bsas', msg='';
V.inicio=function(){
  return '<section class="hero" aria-labelledby="h-hero"><div class="wrap"><div><div class="kicker label"><i></i>'+u('kicker')+'</div><h1 id="h-hero">'+u('hero_h')+'</h1><p class="lead">'+u('hero_p')+'</p><div class="actions"><a class="btn btn-teal" href="'+href('soluciones')+'">'+u('view_sol')+' <svg><use href="#arrow"/></svg></a><a class="btn btn-line" href="'+href('contacto')+'">'+u('req_info')+'</a></div></div>'+
  '<figure class="seal'+(sealDone?' done':'')+'" aria-hidden="true"><svg class="grid" viewBox="0 0 400 400"><g fill="none" stroke="var(--on-navy-rule)" stroke-width="1"><circle cx="200" cy="200" r="196"/><circle cx="200" cy="200" r="150" stroke-dasharray="2 6"/><line x1="200" y1="0" x2="200" y2="400"/><line x1="0" y1="200" x2="400" y2="200"/></g></svg><svg class="mark" viewBox="0 0 100 100"><g fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path class="p-frame" pathLength="1" d="M89.53 55.5L59.53 55.5L74.53 81.48 M65 86.98L50 61L35 86.98 M25.47 81.48L40.47 55.5L10.47 55.5 M10.47 44.5L40.47 44.5L25.47 18.52 M74.53 18.52L59.53 44.5L89.53 44.5"/><path class="p-check" pathLength="1" d="M43 26.88L50 39L65.5 12.15"/></g></svg><figcaption class="label"><span>'+u('every_vote')+'</span><span class="num">ISO/IEC 27001</span></figcaption></figure></div>'+
  '<div class="facts"><div class="wrap"><div class="fact"><b class="num">'+L(NUM.big)+'</b><span>'+u('f1')+'</span></div><div class="fact"><b class="num">'+L(NUM.voters)+'</b><span>'+u('f2')+'</span></div><div class="fact"><b class="num">28</b><span>'+u('s_countries')+'</span></div><div class="fact"><b class="num">27</b><span>'+u('s_years')+'</span></div></div></div></section>'+
  credsBlock()+
  '<section class="blk"><div class="wrap">'+secHead(u('why_l'),u('why_h'),u('why_p'),arrowLink('como-trabajamos',u('nav_como')))+'<div class="body-grid"><div class="rail"></div><div>'+principlesBlock()+'</div></div></div></section>'+
  '<section class="blk alt"><div class="wrap">'+secHead(u('sol_l'),u('sol_h'),u('sol_p'),arrowLink('soluciones',u('all_sol')))+'<div class="sol-list">'+SOL.map(function(s){return solRow(s,true);}).join('')+'</div></div></section>'+
  '<section class="blk"><div class="wrap">'+secHead(u('ms_l'),u('ms_h'),u('cs_p'),arrowLink('casos',u('all_cases')))+msBlock()+'</div></section>'+
  '<section class="blk alt"><div class="wrap">'+secHead(u('fc_l'),u('cases_h'),u('cases_p'))+casesGrid()+'</div></section>'+
  '<section class="blk"><div class="wrap">'+secHead(u('news_l'),u('news_h'),u('news_p'),arrowLink('noticias',u('all_news')))+'<div class="news-grid">'+NEWS.slice(0,3).map(newsCard).join('')+'</div></div></section>'+
  ctaBand(u('contact_h'),u('contact_p'),u('cta_team'));
};
V.soluciones=function(){
  var rows=SOL.map(function(s){ return '<tr><th scope="row"><a href="'+href(s.id)+'">'+solName(s)+'</a></th>'+[0,1,2,3].map(function(i){ var on=s.stages.indexOf(i)>-1; return '<td><span class="cell'+(on?'':' off')+'"'+(on?' title="'+u('st'+i)+'"':'')+'></span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">'+(on?u('st'+i):'—')+'</span></td>'; }).join('')+'</tr>'; }).join('');
  return phead([[u('nav_soluciones')]],u('sol_l'),u('sol_h'),u('sol_p'))+
  '<section class="blk alt"><div class="wrap"><div class="sol-list">'+SOL.map(function(s){return solRow(s);}).join('')+'</div></div></section>'+
  '<section class="blk"><div class="wrap">'+secHead(u('cycle_l'),u('cycle_h'),u('cycle_p'))+'<div class="matrix-wrap"><table class="matrix"><thead><tr><th scope="col">'+u('solution')+'</th>'+[0,1,2,3].map(function(i){return '<th scope="col">'+u('st'+i)+'</th>';}).join('')+'</tr></thead><tbody>'+rows+'</tbody></table></div></div></section>'+
  ctaBand(u('contact_h'),u('contact_p'),u('demo_b'));
};
function solView(s){
  var idx=SOL.indexOf(s);
  var body=L(s.body).map(function(p){return '<p>'+p+'</p>';}).join('')+(s.list?'<ul class="bul">'+L(s.list).map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>':'');
  var pillars='<div class="pillars"><div><b>'+u('p_secure')+'</b><p>'+u('p_secure_t')+'</p></div><div><b>'+u('p_scal')+'</b><p>'+u('p_scal_t')+'</p></div><div><b>'+u('p_aud')+'</b><p>'+u('p_aud_t')+'</p></div></div>';
  var rel='';
  if(s.cases.length){ rel+='<h2>'+u('related_cases')+'</h2><div class="sol-list">'+s.cases.map(function(id){var c=caseById(id);return '<article class="sol compact"><h3 style="font-size:20px"><a href="'+href(c.id)+'">'+L(c.title)+'</a><span class="full">'+L(c.place)+' · '+fmtDate(c.date)+'</span></h3><div class="desc">'+L(c.short)+'</div><div class="sol-links">'+arrowLink(c.id,u('read_case'))+'</div></article>';}).join('')+'</div>'; }
  if(s.news.length){ rel+='<h2>'+u('related_news')+'</h2><div class="sol-list">'+s.news.map(function(sl){var n=newsBySlug(sl);return '<article class="sol compact"><h3 style="font-size:20px"><a href="'+newsUrl(n)+'" target="_blank" rel="noreferrer">'+L(n.t)+'</a></h3><div class="desc">'+L(n.p)+'</div><div class="sol-links">'+ext(newsUrl(n),u('read_art'))+'</div></article>';}).join('')+'</div>'; }
  var ficha='<aside class="ficha"><h3>'+u('ficha')+'</h3><dl><dt>'+u('modality')+'</dt><dd>'+L(s.tag)+'</dd><dt>'+u('stages')+'</dt><dd>'+s.stages.map(function(i){return u('st'+i);}).join(' · ')+'</dd></dl><div class="links">'+ext(CC+sp(lang)+'/'+s.slug,u('official'))+'<a class="tlink sub" href="'+CC+'brochures/'+s.brochure+'" target="_blank" rel="noreferrer"><svg><use href="#dl"/></svg> '+u('brochure')+'</a></div></aside>';
  return phead([[u('nav_soluciones'),'soluciones'],[solName(s)]],L(s.tag),solName(s),L(s.desc),L(s.full))+
  '<section class="blk alt"><div class="wrap"><div class="detail"><div class="prose">'+body+pillars+rel+'</div>'+ficha+'</div></div></section>'+
  '<section class="blk" style="padding-block:0"><div class="wrap">'+pager(SOL,idx,solName)+'</div></section>'+
  ctaBand(u('demo_h').replace('{x}',solName(s)),u('demo_p'),u('demo_b'));
}
V['como-trabajamos']=function(){
  return phead([[u('nav_como')]],u('how_l'),u('how_h'),u('how_p'))+
  '<section class="blk alt"><div class="wrap">'+secHead(u('how_steps_l'),u('how_steps_h'),'')+'<ol class="steps">'+STEPS.map(function(s){return '<li><h3>'+L(s.h)+'</h3><p>'+L(s.p)+'</p></li>';}).join('')+'</ol></div></section>'+
  '<section class="blk"><div class="wrap">'+secHead(u('why_l'),u('why_h'),u('why_p'))+'<div class="body-grid"><div class="rail"></div><div>'+principlesBlock()+'</div></div></div></section>'+
  credsBlock()+ctaBand(u('contact_h'),u('contact_p'),u('cta_team'));
};
V.casos=function(){
  var total=0; LOC.forEach(function(g){ total+=g.items.length; });
  var facts='<div class="phead-facts"><div class="wrap"><div class="fact"><b class="num">28</b><span>'+u('s_countries')+'</span></div><div class="fact"><b class="num">'+total+'</b><span>'+u('s_places')+'</span></div><div class="fact"><b class="num">27</b><span>'+u('s_years')+'</span></div><div class="fact"><b class="num">5</b><span>'+u('s_plat')+'</span></div></div></div>';
  return phead([[u('nav_casos')]],u('cs_l'),u('cs_h'),u('cs_p'),'',facts)+
  '<section class="blk alt"><div class="wrap">'+secHead(u('ms_l'),u('ms_h'),'')+msBlock()+'</div></section>'+
  '<section class="blk" id="explorer"><div class="wrap">'+secHead(u('x_l'),u('x_h'),u('x_p'))+'<div id="xwrap">'+explorer()+'</div></div></section>'+
  '<section class="blk alt"><div class="wrap">'+secHead(u('fc_l'),u('fc_h'),u('cases_p'))+casesGrid()+'</div></section>'+
  ctaBand(u('cs_cta_h'),u('cs_cta_p'),u('cta_team'));
};
function caseView(c){
  var idx=CASES.indexOf(c);
  var stats=c.stats.length?'<div class="stats">'+c.stats.map(function(s){return '<div><b class="num">'+L(s[0])+'</b><span>'+L(s[1])+'</span></div>';}).join('')+'</div>':'';
  var sols=c.sols.length?'<h2>'+u('k_sol')+'</h2><div class="sol-list">'+c.sols.map(function(id){return solRow(solById(id),true);}).join('')+'</div>':'';
  var facts='<dt>'+u('k_date')+'</dt><dd>'+fmtDate(c.date)+'</dd>'+c.facts.map(function(f){return '<dt>'+u(f[0])+'</dt><dd>'+L(f[1])+'</dd>';}).join('')+(c.sols.length?'<dt>'+u('k_sol')+'</dt><dd>'+c.sols.map(function(id){return '<a href="'+href(id)+'">'+solName(solById(id))+'</a>';}).join(' · ')+'</dd>':'');
  return phead([[u('nav_casos'),'casos'],[L(c.place)]],L(c.place),L(c.title),'')+
  '<section class="blk alt"><div class="wrap"><div class="detail"><div class="prose"><p>'+L(c.lead)+'</p>'+stats+sols+'<p style="margin-top:40px">'+ext(CC+sp(lang)+'/casos/'+c.slug,u('case_full'))+'</p></div><aside class="ficha"><h3>'+u('ficha')+'</h3><dl>'+facts+'</dl><div class="links"><a class="tlink sub" href="'+href('casos')+'"><svg><use href="#back"/></svg> '+u('back_cases')+'</a></div></aside></div></div></section>'+
  '<section class="blk" style="padding-block:0"><div class="wrap">'+pager(CASES,idx,function(x){return L(x.title);})+'</div></section>'+
  ctaBand(u('cs_cta_h'),u('cs_cta_p'),u('cta_team'));
}
function newsList(){ return NEWS.slice(1).filter(function(n){return newsFilter==='all'||n.cat===newsFilter;}).map(newsCard).join(''); }
V.noticias=function(){
  var f=NEWS[0], cats=['all','general','bue','notebox','turing','invote'];
  return phead([[u('nav_noticias')]],u('news_l'),u('news_h'),u('news_p'))+
  '<section class="blk alt"><div class="wrap">'+
  '<a class="news-feat" href="'+newsUrl(f)+'" target="_blank" rel="noreferrer"><div><span class="label">'+u('featured')+' · '+catLabel(f.cat)+'</span><h2 style="font-size:clamp(26px,3vw,40px);font-stretch:114%;margin-top:14px">'+L(f.t)+'</h2></div><div><p>'+L(f.p)+'</p><span class="tlink">'+u('read_art')+' <svg><use href="#ext"/></svg></span></div></a>'+
  '<div class="filters" role="group" id="filters">'+cats.map(function(c){return '<button type="button" data-cat="'+c+'" aria-pressed="'+(newsFilter===c)+'">'+(c==='all'?u('all'):catLabel(c))+'</button>';}).join('')+'</div>'+
  '<div class="news-grid" id="newsGrid">'+newsList()+'</div>'+
  (lang==='pt'?'<p style="margin-top:24px;font-size:13.5px;color:var(--muted)">'+u('lang_note')+'</p>':'')+
  '</div></section>'+ctaBand(u('contact_h'),u('contact_p'),u('cta_team'));
};
function officesList(){
  var html='';
  REGIONS.forEach(function(r){
    html+='<div class="region"><span class="label">'+L(r.n)+'</span>';
    r.items.forEach(function(o){ html+='<button type="button" class="office'+(o[0]===office?' on':'')+'" data-id="'+o[0]+'"><span><b>'+L(o[1])+'</b>'+(o[3]?'<span class="hq-badge">'+u('hq')+'</span>':'')+'</span><span class="ct">'+L(o[2])+'</span></button>'; });
    html+='</div>';
  });
  return html+'<div class="office-detail" id="odetail" aria-live="polite">'+officeDetail(office)+'</div>';
}
function officeById(id){ var f; REGIONS.forEach(function(r){ r.items.forEach(function(o){ if(o[0]===id) f=o; }); }); return f; }
function officeDetail(id){ var o=officeById(id); return '<b>'+L(o[1])+', '+L(o[2])+'</b>'+(o[3]?u('hq_note'):u('office_note')); }
function officePins(){
  var h=''; REGIONS.forEach(function(r){ r.items.forEach(function(o){ var p=LAND_PTS[o[0]]; h+='<button type="button" class="pin'+(o[3]?' hq':'')+(p[0]>80?' flip':'')+(o[0]===office?' on':'')+'" data-id="'+o[0]+'" style="left:'+p[0]+'%;top:'+p[1]+'%" aria-label="'+esc(L(o[1])+', '+L(o[2]))+'"><i></i><span class="tip">'+L(o[1])+'</span></button>'; }); });
  return h;
}
V.nosotros=function(){
  return phead([[u('nav_nosotros')]],u('about_l'),u('about_h'),u('about_p'))+
  '<section class="blk alt"><div class="wrap"><div class="about-intro"><div><strong>'+u('a1h')+'</strong><p>'+u('a1p')+'</p></div><div><strong>'+u('a2h')+'</strong><p>'+u('a2p')+'</p></div><div><strong>'+u('a3h')+'</strong><p>'+u('a3p')+'</p></div></div>'+
  secHead(u('offices_l'),u('offices_h'),'')+
  '<div class="atlas"><div class="map"><div class="map-in" id="mapIn"><svg viewBox="0 0 1000 470" preserveAspectRatio="xMidYMid meet" role="img" aria-label="'+u('offices_l')+'"><path class="land" d="'+LAND+'"/></svg>'+officePins()+'</div><div class="map-foot"><span><i class="hq"></i>'+u('hq')+'</span><span><i></i>'+u('office')+'</span><span>'+u('map_hint')+'</span></div></div><div class="offices" id="offices">'+officesList()+'</div></div></div></section>'+
  '<section class="blk"><div class="wrap">'+secHead(u('certs_sec_l'),u('certs_sec_h'),'')+'<div class="body-grid"><div class="rail"></div><div class="certs"><div><b class="num">ISO/IEC 27001:2022</b><p>'+u('c1p')+'</p></div><div><b class="num">ISO/IEC 27701:2019</b><p>'+u('c2p')+'</p></div><div><b>TÜV</b><p>'+u('c3p')+'</p></div></div></div>'+
  '<div class="body-grid" style="margin-top:56px;padding-top:28px;border-top:1px solid var(--rule)"><p class="label">Grupo MSA</p><p style="max-width:700px;color:var(--muted)">'+u('msa_t')+'</p></div></div></section>'+
  ctaBand(u('contact_h'),u('contact_p'),u('cta_team'));
};
V.contacto=function(){
  var opts=[u('general_q')].concat(SOL.map(function(s){return solName(s);}));
  return phead([[u('nav_contacto')]],u('contact_l'),u('contact_h'),u('contact_p'))+
  '<section class="blk contact" style="border-top:1px solid var(--on-navy-rule);padding-top:56px"><div class="wrap"><div class="contact-grid">'+
  '<form class="cf" id="cf" novalidate>'+
  '<div class="field"><label for="f-name">'+u('fn')+' <em>*</em></label><input id="f-name" autocomplete="given-name" placeholder="'+u('fn')+'"><span class="err">'+u('e_name')+'</span></div>'+
  '<div class="field"><label for="f-last">'+u('fl')+' <em>*</em></label><input id="f-last" autocomplete="family-name" placeholder="'+u('fl')+'"><span class="err">'+u('e_last')+'</span></div>'+
  '<div class="field"><label for="f-mail">'+u('fe')+' <em>*</em></label><input id="f-mail" type="email" autocomplete="email" placeholder="'+(lang==='en'?'name@institution.org':lang==='pt'?'nome@instituicao.org':'nombre@institucion.org')+'"><span class="err">'+u('e_mail')+'</span></div>'+
  '<div class="field"><label for="f-phone">'+u('fp')+'</label><input id="f-phone" type="tel" autocomplete="tel" placeholder="+54 11 1234-5678"></div>'+
  '<div class="field full"><label for="f-topic">'+u('ft')+'</label><select id="f-topic">'+opts.map(function(o,i){return '<option value="'+i+'">'+o+'</option>';}).join('')+'</select></div>'+
  '<div class="field full"><label for="f-msg">'+u('fm')+' <em>*</em></label><textarea id="f-msg" placeholder="'+u('fm_ph')+'"></textarea><span class="err">'+u('e_msg')+'</span></div>'+
  '<div class="cf-foot"><button type="submit" class="btn btn-teal">'+u('prep')+' <svg><use href="#arrow"/></svg></button><small>'+u('privacy')+'</small></div>'+
  '<div class="ready" id="ready" hidden><p><strong>'+u('ready_h')+'</strong></p><p>'+u('ready_p')+'</p><div class="row"><button type="button" id="copyMsg">'+u('copy_msg')+'</button><button type="button" data-copy="contactus@comitiacorp.com">'+u('copy_addr')+'</button></div></div>'+
  '</form>'+
  '<aside class="cdir"><div class="cdir-blk"><span class="label">'+u('latam_hq')+'</span><p class="addr">Atuel 362, Distrito Tecnológico<br>Parque Patricios (C1437EPD)<br><span>Buenos Aires, Argentina</span></p><div class="cline" style="margin-top:12px"><div><span class="k">'+u('fp')+'</span><span class="v num">+54 11 6091-1540</span></div><button class="copy" type="button" data-copy="+541160911540">'+u('copy')+'</button></div></div>'+
  '<div class="cdir-blk"><span class="label">'+u('regions_mail')+'</span><div class="cline"><div><span class="k">'+u('sales')+'</span><span class="v">contactus@comitiacorp.com</span></div><button class="copy" type="button" data-copy="contactus@comitiacorp.com">'+u('copy')+'</button></div><div class="cline"><div><span class="k">'+u('press')+'</span><span class="v">press@comitiacorp.com</span></div><button class="copy" type="button" data-copy="press@comitiacorp.com">'+u('copy')+'</button></div></div>'+
  '<div class="cdir-blk"><a class="social" href="https://www.linkedin.com/company/comitia/posts/?feedView=all" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg> '+u('follow')+'</a></div></aside>'+
  '</div></div></section>';
};
V.notfound=function(){ return phead([],'404',u('nf_h'),'')+'<section class="blk"><div class="wrap"><a class="btn btn-ink" href="'+href('inicio')+'">'+u('nf_b')+' <svg><use href="#arrow"/></svg></a></div></section>'; };

function viewHTML(page){
  if(V[page]) return V[page]();
  if(solById(page)) return solView(solById(page));
  if(caseById(page)) return caseView(caseById(page));
  return V.notfound();
}
var NAV=[['soluciones','nav_soluciones'],['como-trabajamos','nav_como'],['casos','nav_casos'],['noticias','nav_noticias'],['nosotros','nav_nosotros'],['contacto','nav_contacto']];
function section(page){ var r=ROUTES[page]; return r&&r.p?r.p:page; }
function chrome(page,inner){
  var sec=section(page);
  var langs=LANGS.map(function(l){ return '<a href="'+href(ROUTES[page]?page:'inicio',l)+'" hreflang="'+l+'" lang="'+l+'" title="'+L(U.lang_name)+'"'+(l===lang?' aria-current="true"':'')+'>'+l.toUpperCase()+'</a>'; }).join('');
  var nav=NAV.map(function(n){ return '<a href="'+href(n[0])+'"'+(sec===n[0]?' class="on" aria-current="page"':'')+'>'+u(n[1])+'</a>'; }).join('');
  return '<div class="util"><div class="wrap"><span class="util-l">'+u('util_company')+'</span><div class="util-r"><a class="hide-s" href="https://www.msa.com.ar/noticias/comitia" target="_blank" rel="noreferrer">'+u('util_msa')+'</a><a class="hide-s" href="https://www.linkedin.com/company/comitia/posts/?feedView=all" target="_blank" rel="noreferrer">LinkedIn</a><nav class="lang" aria-label="Idioma / Language">'+langs+'</nav></div></div></div>'+
  '<header class="top"><div class="wrap"><a class="brand" href="'+href('inicio')+'" aria-label="Comitia"><svg style="color:var(--ink)" aria-hidden="true"><use href="#iso"/></svg><b>comitia</b></a><nav class="main" id="nav" aria-label="'+u('menu')+'">'+nav+'</nav><a class="btn btn-ink cta" href="'+href('contacto')+'">'+u('cta_team')+' <svg><use href="#arrow"/></svg></a><button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="nav">'+u('menu')+'</button></div></header>'+
  '<main id="view">'+inner+'</main><footer class="foot">'+footer()+'</footer>';
}
function footer(){
  return '<div class="wrap"><div class="foot-top"><div><a class="brand" href="'+href('inicio')+'"><svg style="color:var(--ink)" aria-hidden="true"><use href="#iso"/></svg><b>comitia</b></a><p>'+u('foot_p')+'</p></div>'+
  '<div><h4>'+u('nav_soluciones')+'</h4><ul>'+SOL.map(function(s){return '<li><a href="'+href(s.id)+'">'+solName(s)+'</a></li>';}).join('')+'</ul></div>'+
  '<div><h4>'+u('company')+'</h4><ul><li><a href="'+href('como-trabajamos')+'">'+u('nav_como')+'</a></li><li><a href="'+href('casos')+'">'+u('nav_casos')+'</a></li><li><a href="'+href('noticias')+'">'+u('nav_noticias')+'</a></li><li><a href="'+href('nosotros')+'">'+u('nav_nosotros')+'</a></li></ul></div>'+
  '<div><h4>'+u('nav_contacto')+'</h4><ul><li><a href="'+href('contacto')+'">contactus@comitiacorp.com</a></li><li>press@comitiacorp.com</li><li class="num">+54 11 6091-1540</li><li><a href="https://www.linkedin.com/company/comitia/posts/?feedView=all" target="_blank" rel="noreferrer">LinkedIn</a></li></ul></div></div>'+
  '<div class="foot-bot"><span>'+u('part_of')+' <a href="https://www.msa.com.ar/" target="_blank" rel="noreferrer">Grupo MSA</a></span><nav aria-label="legal">'+
  '<a href="'+CC+'EN_Comitia_SGI_policy.pdf" target="_blank" rel="noreferrer">'+u('l1')+'</a><a href="'+CC+'COMITIA_legal_notice.pdf" target="_blank" rel="noreferrer">'+u('l2')+'</a><a href="'+CC+'COMITIA_privacy_notice.pdf" target="_blank" rel="noreferrer">'+u('l3')+'</a><a href="'+CC+'COMITIA_cookie_policy.pdf" target="_blank" rel="noreferrer">'+u('l4')+'</a></nav></div></div>';
}

/* ===== SEO metadata ===== */
function meta(page){
  var t,d;
  if(page==='inicio'){ t='COMITIA | '+strip(u('hero_h')); d=u('hero_p'); }
  else if(solById(page)){ var s=solById(page); t=solName(s)+': '+L(s.full)+' | COMITIA'; d=L(s.desc); }
  else if(caseById(page)){ var c=caseById(page); t=L(c.title)+' | COMITIA'; d=L(c.short); }
  else {
    var m={soluciones:['nav_soluciones','sol_p'],'como-trabajamos':['nav_como','how_p'],casos:['nav_casos','cs_p'],noticias:['news_l','news_p'],nosotros:['nav_nosotros','about_p'],contacto:['nav_contacto','contact_p']}[page];
    t=u(m[0])+' | COMITIA'; d=u(m[1]);
  }
  return {title:strip(t),desc:strip(d)};
}

/* ===== Behaviour ===== */
function bind(page){
  var mb=document.getElementById('menuBtn'), navEl=document.getElementById('nav');
  if(mb){ mb.addEventListener('click', function(){ var o=navEl.classList.toggle('open'); mb.setAttribute('aria-expanded', o); });
    navEl.addEventListener('click', function(e){ if(e.target.closest('a')){ navEl.classList.remove('open'); mb.setAttribute('aria-expanded','false'); } }); }
  if(page==='inicio' && !sealDone) setTimeout(function(){ sealDone=true; },2600);
  if(page==='nosotros') bindMap();
  if(page==='casos') bindExplorer();
  if(page==='noticias'){
    document.getElementById('filters').addEventListener('click', function(e){
      var b=e.target.closest('button'); if(!b) return;
      newsFilter=b.dataset.cat;
      this.querySelectorAll('button').forEach(function(x){ x.setAttribute('aria-pressed', String(x===b)); });
      document.getElementById('newsGrid').innerHTML=newsList();
    });
  }
  if(page==='contacto') bindForm();
}
function bindMap(){
  function select(id){
    office=id;
    document.querySelectorAll('.pin,.office').forEach(function(el){ el.classList.toggle('on', el.dataset.id===id); });
    document.getElementById('odetail').innerHTML=officeDetail(id);
  }
  document.querySelectorAll('.pin,.office').forEach(function(el){ el.addEventListener('click', function(){ select(el.dataset.id); }); });
}
function bindExplorer(){
  var wrap=document.getElementById('xwrap');
  function refresh(full){
    if(full){ var q=document.getElementById('x-q'), had=q&&document.activeElement===q; wrap.innerHTML=explorer(); if(had){ var n=document.getElementById('x-q'); n.focus(); n.setSelectionRange(n.value.length,n.value.length); } }
    else { document.getElementById('xmap').innerHTML=xMap(); document.getElementById('xres').innerHTML=xResults(); }
  }
  wrap.addEventListener('click', function(e){
    var b=e.target.closest('[data-reg]');
    if(b){ X.region=b.dataset.reg; refresh(true); if(b.closest('.rcard')) document.getElementById('xmap').scrollIntoView({block:'start',behavior:'smooth'}); return; }
    var p=e.target.closest('[data-pl]');
    if(p){ X.plats[p.dataset.pl]=!X.plats[p.dataset.pl]; refresh(true); return; }
    if(e.target.closest('[data-clear]')){ X.plats={}; X.q=''; refresh(true); return; }
    var g=e.target.closest('.bub');
    if(g) goGroup(g.dataset.g);
  });
  wrap.addEventListener('keydown', function(e){ var g=e.target.closest&&e.target.closest('.bub'); if(g&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); goGroup(g.dataset.g); } });
  wrap.addEventListener('input', function(e){ if(e.target.id==='x-q'){ X.q=e.target.value; refresh(false); } });
  function goGroup(id){
    var grp=LOC.filter(function(x){return x.id===id;})[0];
    if(X.region==='world'){ X.region=grp.r; refresh(true); }
    var el=document.getElementById('g-'+id);
    if(el){ el.scrollIntoView({block:'center',behavior:'smooth'}); el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }
  }
}
function bindForm(){
  var f=document.getElementById('cf'), ready=document.getElementById('ready');
  ['f-name','f-last','f-mail','f-phone','f-topic','f-msg'].forEach(function(id){
    var el=document.getElementById(id);
    if(formState[id]!=null) el.value=formState[id];
    el.addEventListener('input', function(){ formState[id]=el.value; });
    el.addEventListener('change', function(){ formState[id]=el.value; });
  });
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var ok=true;
    [['f-name',function(v){return v.trim();}],['f-last',function(v){return v.trim();}],['f-mail',function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());}],['f-msg',function(v){return v.trim();}]].forEach(function(r){
      var el=document.getElementById(r[0]), good=!!r[1](el.value); el.closest('.field').classList.toggle('bad',!good); if(!good&&ok){ el.focus(); ok=false; }
    });
    if(!ok){ ready.hidden=true; return; }
    var v=function(id){ return document.getElementById(id).value.trim(); };
    var topic=document.getElementById('f-topic'); var tt=topic.options[topic.selectedIndex].text;
    msg=u('to')+': contactus@comitiacorp.com\n'+u('subj')+': '+tt+'\n\n'+v('f-msg')+'\n\n'+v('f-name')+' '+v('f-last')+'\n'+v('f-mail')+(v('f-phone')?'\n'+v('f-phone'):'');
    ready.hidden=false;
  });
  document.getElementById('copyMsg').addEventListener('click', function(){ copyText(msg, this); });
}
function copyText(text, btn){
  var orig=btn.textContent;
  var done=function(){ btn.textContent=u('copied'); setTimeout(function(){ btn.textContent=orig; },1600); };
  var fb=function(){ var ta=document.createElement('textarea'); ta.value=text; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy');}catch(e){} ta.remove(); done(); };
  try{ navigator.clipboard.writeText(text).then(done, fb); }catch(e){ fb(); }
}

/* ===== Boot ===== */
function resolve(){
  var h=(location.hash||'').replace('#','');
  if(TOK[h]) return TOK[h];
  if(ROUTES[h]) return {page:h,lang:lang};
  return {page:h?'404':'inicio',lang:lang};
}
function renderSPA(isNav){
  var r=resolve(); lang=r.lang;
  try{ localStorage.setItem('cmt-lang',lang); }catch(e){}
  document.documentElement.lang=lang==='pt'?'pt-BR':lang;
  var app=document.getElementById('app');
  app.innerHTML=chrome(r.page, viewHTML(r.page));
  try{ document.title=meta(ROUTES[r.page]?r.page:'inicio').title; }catch(e){}
  var main=document.getElementById('view');
  if(isNav){ main.classList.add('enter'); window.scrollTo(0,0); }
  bind(r.page);
}
if(typeof document!=='undefined' && !SITE.build){
  document.addEventListener('click', function(e){ var b=e.target.closest('[data-copy]'); if(b) copyText(b.dataset.copy, b); });
  if(SITE.mode==='static'){ bind(SITE.page); }
  else { window.addEventListener('hashchange', function(){ renderSPA(true); }); renderSPA(false); }
}
