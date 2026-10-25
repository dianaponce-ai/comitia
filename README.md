# Comitia · Sitio corporativo

Sitio de Comitia (Grupo MSA) en español, inglés y portugués. Cada idioma tiene sus propias URLs para que Google indexe cada versión por separado.

| Página | Español | English | Português |
|---|---|---|---|
| Inicio | `/es/` | `/en/` | `/pt/` |
| Soluciones | `/es/soluciones/` | `/en/solutions/` | `/pt/solucoes/` |
| Casos de éxito | `/es/casos-de-exito/` | `/en/case-studies/` | `/pt/casos-de-sucesso/` |
| Noticias | `/es/noticias/` | `/en/news/` | `/pt/noticias/` |
| Una nota | `/es/noticias/padron-electoral/` | `/en/news/electoral-roll/` | `/pt/noticias/cadastro-eleitoral/` |
| Nosotros | `/es/nosotros/` | `/en/about-us/` | `/pt/sobre-nos/` |
| Contacto | `/es/contacto/` | `/en/contact/` | `/pt/contato/` |

Cada página incluye `hreflang` hacia sus versiones en los otros idiomas, `canonical`, título y descripción propios, y el contenido ya escrito en el HTML. El sitio genera además `sitemap.xml` con todas las equivalencias y `robots.txt`.

## Estructura

- `src/` · contenido y código del sitio
  - `data-core.js` · textos de interfaz, soluciones, casos, noticias y oficinas
  - `locations.mjs` · registro de las 74 ubicaciones con proyectos
  - `news/` · las 12 notas de Comitia News, un archivo por idioma (`slug.es.md`, `slug.en.md`, `slug.pt.md`)
  - `app.js` · rutas por idioma, páginas e interacción
  - `style.css` · estilos
- `build.mjs` · genera el sitio estático en `dist/` y la versión de un solo archivo en `artifact/`
- `dist/` · sitio listo para publicar en `comitiacorp.com`

## Uso

```bash
npm ci
npm run build        # sitio para comitiacorp.com (raíz del dominio)
npm run build:pages  # vista previa en dianaponce-ai.github.io/comitia
npm test             # prueba de rutas e interacción
```

Para publicar en otro dominio o subcarpeta:

```bash
SITE_ORIGIN=https://www.ejemplo.com SITE_BASE=/carpeta node build.mjs
```

## Publicación

**Producción:** subir el contenido de `dist/` a la raíz de `comitiacorp.com` y dar de alta `https://comitiacorp.com/sitemap.xml` en Google Search Console.

**Vista previa en GitHub Pages:** en *Settings → Pages*, elegir *Source: GitHub Actions*. Cada push a `main` publica una vista previa en `https://dianaponce-ai.github.io/comitia/`.

## Agregar una nota

Crear `src/news/mi-nota.es.md`, `.en.md` y `.pt.md` con un encabezado `title:` y el texto en Markdown (`##` y `###` para subtítulos), sumar la nota a `NEWS_ORDER` en `src/app.js` con su categoría y sus URLs en inglés y portugués, y volver a generar el sitio.

## Pendiente de validar con Comitia

- Las traducciones al portugués de las notas son nuevas: conviene una revisión de un hablante nativo.

- Las cinco etapas de "Cómo trabajamos" y los textos de las oficinas regionales son redacción nueva.
- El formulario de contacto arma el mensaje pero todavía no lo envía: hay que conectarlo al servicio de correo que use Comitia.
