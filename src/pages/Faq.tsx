import { useTranslation } from 'react-i18next'
import { Seo } from '../components/seo/Seo'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { Blobs } from '../components/ui/Blobs'
import { FaqAccordion } from '../components/ui/FaqAccordion'
import { ButtonLink } from '../components/ui/Button'
import { localePath, type Locale } from '../lib/routes'
import { tArray } from '../lib/i18nHelpers'
import { faqSchema, breadcrumbSchema } from '../lib/jsonLd'

type FaqItem = { q: string; a: string }

export function Faq({ locale }: { locale: Locale }) {
  const { t } = useTranslation()
  const items = tArray<FaqItem>(t, 'faq.items')

  return (
    <>
      <Seo
        locale={locale}
        path={localePath(locale, 'faq')}
        title={t('faq.seo.title')}
        description={t('faq.seo.description')}
        jsonLd={[
          faqSchema(items),
          breadcrumbSchema([
            { name: t('nav.home'), path: localePath(locale, 'home') },
            { name: t('nav.faq'), path: localePath(locale, 'faq') },
          ]),
        ]}
      />

      <section className="relative overflow-hidden bg-larimar-950 pb-16 pt-40">
        <Blobs variant="amber" />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 ring-1 ring-white/20">
              {t('faq.hero.eyebrow')}
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">{t('faq.hero.title')}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">{t('faq.hero.subtitle')}</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="max-w-3xl">
          <FaqAccordion items={items} />
          <Reveal className="mt-12 text-center">
            <ButtonLink to={localePath(locale, 'contact')} variant="primary">
              {t('common.contactUs')}
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
