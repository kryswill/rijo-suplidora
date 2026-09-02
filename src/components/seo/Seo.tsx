import { Head } from 'vite-react-ssg'
import { absoluteUrl, getAlternatePaths, type Locale } from '../../lib/routes'

type SeoProps = {
  locale: Locale
  path: string
  title: string
  description: string
  /** true en la home de cada idioma para reforzar el título con el nombre de marca ya incluido. */
  image?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const OG_LOCALE: Record<Locale, string> = { es: 'es_DO', en: 'en_US' }

export function Seo({ locale, path, title, description, image, noindex, jsonLd }: SeoProps) {
  const alternates = getAlternatePaths(path)
  const url = absoluteUrl(path)
  const ogImage = image ?? absoluteUrl('/og-cover.png')
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Head htmlAttributes={{ lang: locale }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {(Object.keys(alternates) as Locale[]).map((loc) => (
        <link key={loc} rel="alternate" hrefLang={loc === 'es' ? 'es-DO' : 'en'} href={absoluteUrl(alternates[loc])} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={absoluteUrl(alternates.es)} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Rijo Suplidora" />
      <meta property="og:locale" content={OG_LOCALE[locale]} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, i) => (
        // eslint-disable-next-line react/no-danger
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Head>
  )
}
