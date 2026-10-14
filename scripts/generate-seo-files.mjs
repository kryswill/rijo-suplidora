// Genera public/sitemap.xml y public/robots.txt a partir de las rutas del sitio.
// Ejecutar con `node scripts/generate-seo-files.mjs` cada vez que se agregue o
// cambie una página (o dejar que `npm run build` lo haga automáticamente).
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = resolve(__dirname, '..', 'public')
// Dominio canónico de producción (sin "www"). DEBE coincidir con SITE_URL en src/lib/routes.ts:
// si difieren, el sitemap anuncia URLs distintas a las canonical de cada página.
const SITE_URL = 'https://rijosuplidora.com'

// Debe reflejar src/lib/routes.ts (paths). Cada entrada es { es, en } — la misma
// página en ambos idiomas — para poder emitir las etiquetas hreflang alternas.
const PAGES = [
  { es: '/', en: '/en' },
  { es: '/nosotros', en: '/en/about' },
  { es: '/productos', en: '/en/products' },
  { es: '/preguntas-frecuentes', en: '/en/faq' },
  { es: '/contacto', en: '/en/contact' },
]

function urlEntry(loc, alternates) {
  const links = alternates
    .map(({ hreflang, href }) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`)
    .join('\n')
  return `  <url>\n    <loc>${loc}</loc>\n${links}\n    <changefreq>weekly</changefreq>\n  </url>`
}

const entries = []
for (const page of PAGES) {
  const esUrl = `${SITE_URL}${page.es === '/' ? '' : page.es}`
  const enUrl = `${SITE_URL}${page.en}`
  const alternates = [
    { hreflang: 'es-DO', href: esUrl },
    { hreflang: 'en', href: enUrl },
    { hreflang: 'x-default', href: esUrl },
  ]
  entries.push(urlEntry(esUrl, alternates))
  entries.push(urlEntry(enUrl, alternates))
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

writeFileSync(resolve(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf-8')
writeFileSync(resolve(PUBLIC_DIR, 'robots.txt'), robots, 'utf-8')

// eslint-disable-next-line no-console
console.log('✔ sitemap.xml y robots.txt generados en /public')