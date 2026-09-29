import { useTranslation } from 'react-i18next'
import { ArrowRight, Truck } from 'lucide-react'
import { Seo } from '../components/seo/Seo'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CatalogShowcase } from '../components/ui/CatalogShowcase'
import { Reveal } from '../components/ui/Reveal'
import { Blobs } from '../components/ui/Blobs'
import { ButtonLink } from '../components/ui/Button'
import { src, IMAGES } from '../data/images'
import distributionVanPhoto from '../assets/photos/minibus-distribucion-rijo-suplidora.png'
import { localePath, type Locale } from '../lib/routes'
import { breadcrumbSchema } from '../lib/jsonLd'

export function Products({ locale }: { locale: Locale }) {
  const { t } = useTranslation()

  return (
    <>
      <Seo
        locale={locale}
        path={localePath(locale, 'products')}
        title={t('products.seo.title')}
        description={t('products.seo.description')}
        jsonLd={breadcrumbSchema([
          { name: t('nav.home'), path: localePath(locale, 'home') },
          { name: t('nav.products'), path: localePath(locale, 'products') },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-larimar-950 pb-20 pt-40">
        <Blobs variant="amber" />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 ring-1 ring-white/20">
              {t('products.hero.eyebrow')}
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">{t('products.hero.title')}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">{t('products.hero.subtitle')}</p>
          </Reveal>
        </Container>
      </section>

      {/* GEM FEATURE BANNER */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <img
            src={src('larimarStone', 900)}
            alt={locale === 'es' ? IMAGES.larimarStone.altEs : IMAGES.larimarStone.altEn}
            loading="lazy"
            className="h-64 w-full object-cover sm:h-80"
          />
          <img
            src={src('amberStone', 900)}
            alt={locale === 'es' ? IMAGES.amberStone.altEs : IMAGES.amberStone.altEn}
            loading="lazy"
            className="h-64 w-full object-cover sm:h-80"
          />
        </div>
        <div className="absolute inset-0 flex items-center bg-larimar-950/55">
          <Container>
            <Reveal className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">{t('products.gemFeature.eyebrow')}</span>
              <h2 className="font-display mt-3 text-2xl font-semibold text-white sm:text-3xl">{t('products.gemFeature.title')}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">{t('products.gemFeature.body')}</p>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <Blobs variant="subtle" />
        <Container>
          <SectionHeading center eyebrow={t('products.categories.eyebrow')} title={t('products.categories.title')} className="mx-auto" />
          <CatalogShowcase />
        </Container>
      </section>

      {/* DISTRIBUTION */}
      <section className="relative overflow-hidden bg-larimar-950 py-24">
        <Blobs />
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
              <Truck size={22} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">{t('products.distribution.eyebrow')}</span>
            <h2 className="font-display mt-3 text-2xl font-semibold text-white sm:text-3xl">{t('products.distribution.title')}</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">{t('products.distribution.body')}</p>
          </Reveal>
          <Reveal direction="right">
            <img
              src={distributionVanPhoto}
              alt={t('products.distribution.imageAlt')}
              loading="lazy"
              className="aspect-[65/33] w-full object-contain"
            />
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <h2 className="font-display max-w-xl text-3xl font-semibold text-white sm:text-4xl">{t('products.ctaWholesale.title')}</h2>
            <p className="mx-auto mt-4 max-w-lg text-white/90">{t('products.ctaWholesale.body')}</p>
            <ButtonLink to={localePath(locale, 'contact')} variant="ghost" className="mt-8 bg-white text-amber-700 hover:bg-white/90">
              {t('products.ctaWholesale.cta')} <ArrowRight size={18} />
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  )
}