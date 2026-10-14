export const LOCALES = ['es', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'es'

export type PageKey =
  | 'home'
  | 'about'
  | 'products'
  | 'faq'
  | 'contact'

/**
 * Rutas "limpias" y traducidas por idioma.
 * Español = idioma por defecto, sin prefijo (dominio raíz).
 * Inglés  = prefijo /en.
 */
export const paths: Record<Locale, Record<PageKey, string>> = {
  es: {
    home: '/',
    about: '/nosotros',
    products: '/productos',
    faq: '/preguntas-frecuentes',
    contact: '/contacto',
  },
  en: {
    home: '/en',
    about: '/en/about',
    products: '/en/products',
    faq: '/en/faq',
    contact: '/en/contact',
  },
}

export function localePath(locale: Locale, key: PageKey): string {
  return paths[locale][key]
}

/** Dado un pathname actual, determina el idioma y la "page key" correspondiente. */
export function resolveCurrentPage(pathname: string): { locale: Locale; key: PageKey | null } {
  const clean = pathname.replace(/\/+$/, '') || '/'
  for (const locale of LOCALES) {
    const entries = Object.entries(paths[locale]) as [PageKey, string][]
    for (const [key, value] of entries) {
      if (value === clean || (value !== '/' && clean.startsWith(value))) {
        return { locale, key }
      }
    }
  }
  return { locale: DEFAULT_LOCALE, key: null }
}

/** Construye el par de rutas equivalentes (es/en) para el selector de idioma y hreflang. */
export function getAlternatePaths(pathname: string): Record<Locale, string> {
  const { key } = resolveCurrentPage(pathname)
  if (!key) {
    return { es: paths.es.home, en: paths.en.home }
  }
  return { es: paths.es[key], en: paths.en[key] }
}

/**
 * URL canónica de producción: dominio raíz, sin "www".
 * Es la ÚNICA fuente de verdad para canonical, hreflang, Open Graph y JSON-LD
 * (todo pasa por absoluteUrl). Debe coincidir con public/robots.txt y public/sitemap.xml.
 * El host "www" redirige con 301 a este dominio (Cloudflare Bulk Redirects).
 */
export const SITE_URL = 'https://rijosuplidora.com'

export function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname === '/' ? '' : pathname}`
}