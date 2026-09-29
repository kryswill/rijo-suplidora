import { site } from '../data/site'
import { absoluteUrl } from './routes'
import type { Locale } from './routes'

export function organizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${absoluteUrl('/')}#organization`,
    name: site.tradeName,
    legalName: site.legalName,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/favicon-512.png'),
    foundingDate: String(site.founded),
    slogan:
      locale === 'es' ? 'Conectando culturas, transformando recuerdos' : 'Connecting cultures, transforming memories',
    email: site.email.public,
    telephone: site.phoneIntl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.line,
      addressLocality: 'Higüey',
      addressRegion: 'La Altagracia',
      addressCountry: 'DO',
    },
    sameAs: [site.social.instagram, site.social.facebook, site.social.x],
  }
}

export function localBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Store', 'WholesaleStore'],
    '@id': `${absoluteUrl('/')}#localbusiness`,
    name: site.tradeName,
    image: absoluteUrl('/og-cover.png'),
    url: absoluteUrl('/'),
    telephone: site.phoneIntl,
    email: site.email.public,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.line,
      addressLocality: 'Higüey',
      addressRegion: 'La Altagracia',
      addressCountry: 'DO',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '07:00',
      closes: '19:00',
    },
    inLanguage: locale === 'es' ? 'es-DO' : 'en-US',
    sameAs: [site.social.instagram, site.social.facebook, site.social.x],
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}