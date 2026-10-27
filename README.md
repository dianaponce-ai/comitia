# Comitia · comitiacorp.com

Sitio de Comitia (Grupo MSA) en español e inglés. Tiene **el mismo diseño y el mismo contenido** que el sitio React anterior, pero cada página se genera como HTML estático, lista para que Google y los buscadores con IA la lean sin ejecutar JavaScript.

## Qué cambió respecto del sitio React

| | Sitio anterior (React SPA + prerender) | Este sitio |
|---|---|---|
| HTML | Vacío; el contenido aparecía al ejecutar React (había un parche con Puppeteer) | Cada página ya viene con todo su contenido |
| Peso de la home | ~61 MB | ~5 MB |
| Lighthouse (rendimiento, mobile) | 23–58 | 94–96 en páginas internas |
| Fotos | JPG originales (hasta 3 MB c/u) | WebP en dos tamaños, con `width`/`height` |
| Videos | 61 MB + 15 MB | 7 MB + 0,5 MB (el del hero no se descarga en mobile) |
| Modelos 3D | 12 + 12 + 6 MB | 2,5 + 2,5 + 2,4 MB (Meshopt), se cargan después de la página |
| Brochures PDF | 36–46 MB | 3–4 MB, mismo contenido visual |
| SEO | title/description por JS; inglés con metadatos en español | title, description, canonical, hreflang, Open Graph y JSON-LD en el HTML de cada idioma |
| Sitemap | Manual | Generado en cada build, con alternativas por idioma |

Las URLs son **las mismas** (`/es/bue`, `/en/casos/invote-en-la-antartida`, `/es/blog/voto-electronico`, etc.), así que no se pierde posicionamiento. Las rutas viejas sin idioma (`/bue`, `/casos`…) redirigen igual que antes.

Se mantienen: Google Tag Manager (`GTM-5QNJCVZL`), el envío del formulario a `msa-emails.vercel.app` (destino `contactus@comitiacorp.com`), las animaciones 3D por scroll, la galería, el mapa con tooltips, el carrusel mobile, las tarjetas personales con QR y los PDFs legales.

## Estructura

- `src/site.mjs` · plantillas de todas las páginas (replican el markup y las clases de los componentes React)
- `src/locales/es.json`, `en.json` · textos del sitio (los mismos `translation.json` de antes)
- `src/content/casos.json`, `blog.json` · casos de éxito y notas de Comitia News
- `src/content/legal.json` · Aviso de Privacidad, Aviso Legal y Política de Cookies
- `src/content/seo-es.json`, `seo-en.json` · títulos, descripciones y datos estructurados de la home y las soluciones
- `src/styles/` · CSS original (`app.css`, `index.css`, `modal.css`) + `overrides.css` (ajustes mínimos)
- `src/assets/` · imágenes originales (el build las optimiza)
- `src/client/` · JavaScript del sitio (menú, formulario, galería, mapa, 3D)
- `src/brochures/` · brochures optimizados (ES y EN); el build los publica con todos los nombres históricos
- `public/` · archivos que se publican tal cual (PDFs, íconos, modelos 3D, videos, vCards)

## Uso

```bash
npm ci
npm run build    # genera dist/ para comitiacorp.com
npm test         # revisa links, recursos y metadatos de cada página
npm run serve    # http://localhost:4173
```

Vista previa en una subcarpeta (GitHub Pages): `npm run build:pages`.

## Publicación

`dist/` es un sitio estático: se puede servir desde cualquier hosting.

- **Vercel**: `vercel.json` ya define build, carpeta de salida, URLs sin `.html`, redirecciones por idioma y caché.
- **Nginx** (servidor propio):

```nginx
location / {
  try_files $uri $uri.html $uri/index.html =404;
}
error_page 404 /404.html;
location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
```

Después de publicar, dar de alta `https://comitiacorp.com/sitemap.xml` en Google Search Console.

## Cómo editar contenido

- **Un texto**: cambiarlo en `src/locales/es.json` y `en.json` (misma clave).
- **Un caso o una nota**: agregar el objeto en `src/content/casos.json` o `blog.json` (mismo formato que los existentes) y poner las imágenes en `src/assets/casos/` o `src/assets/blog/`. La página, el listado y el sitemap se generan solos.
- **Una imagen**: reemplazar el JPG/PNG original en `src/assets/`; el build genera las versiones WebP.
