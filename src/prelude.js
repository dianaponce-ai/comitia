var LANGS=['es','en','pt'];
var lang='es';
(function(){
  var S=(typeof __SITE__!=='undefined')?__SITE__:null;
  if(S&&S.lang){ lang=S.lang; return; }
  try{ var s=localStorage.getItem('cmt-lang'); if(LANGS.indexOf(s)>-1){ lang=s; return; } }catch(e){}
  try{ var n=(navigator.language||'es').slice(0,2); if(n==='en'||n==='pt') lang=n; }catch(e){}
})();
