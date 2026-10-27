// Servidor local para probar dist/ con las mismas reglas que producción:
// /es/bue → es/bue.html, /es → es.html, 404 → 404.html
import http from 'http'; import fs from 'fs'; import path from 'path';
const [dir = 'dist', port = 4173] = process.argv.slice(2);
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.mp4': 'video/mp4', '.glb': 'model/gltf-binary', '.xml': 'application/xml', '.txt': 'text/plain', '.vcf': 'text/vcard' };
http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]); const f = path.join(dir, p);
  const hit = [f, f + '.html', path.join(f, 'index.html')].find((t) => { try { return fs.statSync(t).isFile(); } catch { return false; } });
  if (!hit) { res.writeHead(404, { 'Content-Type': MIME['.html'] }); return res.end(fs.readFileSync(path.join(dir, '404.html'))); }
  const st = fs.statSync(hit), type = MIME[path.extname(hit)] || 'application/octet-stream', range = st.size && req.headers.range;
  if (range) { const m = /bytes=(\d*)-(\d*)/.exec(range), s = +m[1] || 0, e = m[2] ? +m[2] : st.size - 1; res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${s}-${e}/${st.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': e - s + 1 }); return fs.createReadStream(hit, { start: s, end: e }).pipe(res); }
  res.writeHead(200, { 'Content-Type': type, 'Content-Length': st.size }); fs.createReadStream(hit).pipe(res);
}).listen(+port, () => console.log(`http://localhost:${port}`));
