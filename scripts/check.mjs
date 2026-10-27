// Verifica el build: cada link y recurso interno de cada página existe en dist/,
// cada página tiene title, description, canonical y un solo <h1>.
import fs from 'fs'; import path from 'path';
const DIST = 'dist', BASE = (process.env.SITE_BASE || '').replace(/\/$/, '');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const exists = (u) => { let p = decodeURIComponent(u.split('#')[0].split('?')[0]); if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length); if (!p || p === '/') return true; const f = path.join(DIST, p); return [f, f + '.html', path.join(f, 'index.html')].some((t) => fs.existsSync(t) && fs.statSync(t).isFile()); };
let errors = 0, pages = 0;
for (const file of walk(DIST).filter((f) => f.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  if (/http-equiv="refresh"/.test(html)) continue; // páginas de redirección
  pages++;
  const urls = [...html.matchAll(/(?:href|src|data-src|poster|data-lang-href)="(\/[^"]*)"/g), ...html.matchAll(/srcset="([^"]+)"/g)].flatMap((m) => m[1].includes(' ') ? m[1].split(',').map((s) => s.trim().split(' ')[0]) : [m[1]]);
  for (const u of new Set(urls)) if (u.startsWith('/') && !u.startsWith('//') && !exists(u)) { errors++; console.log('✗', file, '→', u); }
  if (file.endsWith('404.html')) continue;
  for (const [n, re] of [['title', /<title>[^<]+<\/title>/], ['description', /<meta name="description" content="[^"]+"/], ['canonical', /<link rel="canonical"/]]) if (!re.test(html)) { errors++; console.log('✗', file, 'sin', n); }
  const h1 = (html.match(/<h1[\s>]/g) || []).length; if (h1 !== 1 && !/alt-en/.test(html)) { errors++; console.log('✗', file, h1, '<h1>'); }
}
const css = walk(DIST + '/assets').filter((f) => f.endsWith('.css')).map((f) => fs.readFileSync(f, 'utf8')).join('');
for (const m of css.matchAll(/url\((\/[^)]+)\)/g)) if (!exists(m[1])) { errors++; console.log('✗ css →', m[1]); }
console.log(`${pages} páginas revisadas · ${errors} errores`);
process.exit(errors ? 1 : 0);
