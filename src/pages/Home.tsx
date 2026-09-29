import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { ArrowRight, MapPin } from 'lucide-react'
import { Seo } from '../components/seo/Seo'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { IconCard } from '../components/ui/IconCard'
import { CatalogShowcase } from '../components/ui/CatalogShowcase'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Blobs } from '../components/ui/Blobs'
import { ButtonAnchor, ButtonLink } from '../components/ui/Button'
import { valuePropIcons } from '../data/products'
import { pillarIcons, sectorIcons } from '../data/sectors'
import { src, IMAGES } from '../data/images'
import storeTeamPhoto from '../assets/photos/equipo-tienda-rijo-suplidora.jpg'
import { site } from '../data/site'
import { localePath, type Locale } from '../lib/routes'
import { localBusinessSchema, organizationSchema } from '../lib/jsonLd'
import { tArray } from '../lib/i18nHelpers'

type Item = { title: string; body: string }

export function Home({ locale }: { locale: Locale }) {
  const { t } = useTranslation()
  const valueProps = tArray<Item>(t, 'home.valueProps.items')
  const pillars = tArray<Item>(t, 'home.pillars.items')
  const sectors = tArray<string>(t, 'home.sectors.list')

  return (
    <>
      <Seo
        locale={locale}
        path={localePath(locale, 'home')}
        title={t('home.seo.title')}
        description={t('home.seo.description')}
        jsonLd={[organizationSchema(locale), localBusinessSchema(locale)]}
      />

      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-larimar-950 pt-20">
        <img
          src={src('heroCoastline', 1920)}
          srcSet={`${src('heroCoastline', 960)} 960w, ${src('heroCoastline', 1600)} 1600w, ${src('heroCoastline', 2400)} 2400w`}
          sizes="100vw"
          alt={locale === 'es' ? IMAGES.heroCoastline.altEs : IMAGES.heroCoastline.altEn}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-larimar-950 via-larimar-950/75 to-larimar-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-larimar-950/80 via-transparent to-amber-950/30" />
        <div aria-hidden className="bg-grain absolute inset-0" />

        <Container className="relative py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 ring-1 ring-white/20 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
              {t('home.hero.eyebrow')}
            </span>
            <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="text-gradient-brand bg-gradient-to-r from-larimar-200 via-white to-amber-300">
                {t('home.hero.title')}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{t('home.hero.subtitle')}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink to={localePath(locale, 'products')} variant="amber">
                {t('home.hero.ctaPrimary')} <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink to={localePath(locale, 'contact')} variant="ghost">
                {t('home.hero.ctaSecondary')}
              </ButtonLink>
            </div>
          </motion.div>
        </Container>

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-24 -right-24 hidden h-72 w-72 rounded-full bg-gradient-to-br from-amber-400/40 to-larimar-400/20 blur-3xl lg:block"
          aria-hidden
        />
      </section>

      {/* INTRO */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <Blobs variant="subtle" />
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <SectionHeading eyebrow={t('home.intro.eyebrow')} title={t('home.intro.title')} subtitle={t('home.intro.body')} />
          <Reveal direction="right" className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-glow">
              <img
                src={storeTeamPhoto}
                alt={t('home.intro.imageAlt')}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-5 shadow-xl sm:block">
              <p className="font-display text-2xl font-semibold text-larimar-900">
                {new Date().getFullYear() - site.founded}+ <span className="text-sm font-medium text-larimar-600">{t('common.years')}</span>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* GEM FEATURE */}
      <section className="relative overflow-hidden bg-larimar-950 py-24 sm:py-32">
        <Blobs variant="amber" />
        <Container>
          <SectionHeading
            dark
            center
            eyebrow={t('home.gemFeature.eyebrow')}
            title={t('home.gemFeature.title')}
            subtitle={t('home.gemFeature.body')}
            className="mx-auto"
          />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2" stagger={0.15}>
            <GemCard
              imageKey="larimarStone"
              locale={locale}
              title={t('home.gemFeature.larimarTitle')}
              body={t('home.gemFeature.larimarBody')}
              accent="from-larimar-400/90 to-larimar-900/90"
            />
            <GemCard
              imageKey="amberStone"
              locale={locale}
              title={t('home.gemFeature.amberTitle')}
              body={t('home.gemFeature.amberBody')}
              accent="from-amber-400/90 to-amber-900/90"
            />
          </RevealGroup>
        </Container>
      </section>

      {/* VALUE PROPS */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading center eyebrow={t('home.valueProps.eyebrow')} title={t('home.valueProps.title')} className="mx-auto" />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.06}>
            {valueProps.map((item, i) => (
              <IconCard
                key={item.title}
                icon={valuePropIcons[i % valuePropIcons.length]}
                title={item.title}
                body={item.body}
                accent={i % 2 === 0 ? 'larimar' : 'amber'}
              />
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="relative overflow-hidden bg-larimar-950 py-24 sm:py-32">
        <Blobs />
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              dark
              eyebrow={t('home.portfolioPreview.eyebrow')}
              title={t('home.portfolioPreview.title')}
              subtitle={t('home.portfolioPreview.subtitle')}
            />
            <Reveal>
              <ButtonLink to={localePath(locale, 'products')} variant="ghost" className="shrink-0">
                {t('home.portfolioPreview.cta')} <ArrowRight size={16} />
              </ButtonLink>
            </Reveal>
          </div>
          <CatalogShowcase dark />
        </Container>
      </section>

      {/* SECTORS */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading center eyebrow={t('home.sectors.eyebrow')} title={t('home.sectors.title')} className="mx-auto" />
          <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" stagger={0.05}>
            {sectors.map((label, i) => {
              const Icon = sectorIcons[i]
              return (
                <RevealItem key={label}>
                  <div className="flex items-center gap-3 rounded-xl bg-larimar-50/60 px-4 py-3.5 transition-colors hover:bg-amber-50">
                    <Icon size={18} className="shrink-0 text-larimar-600" />
                    <span className="text-sm font-medium text-larimar-900">{label}</span>
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </Container>
      </section>

      {/* PILLARS */}
      <section className="relative overflow-hidden bg-larimar-950 py-24 sm:py-32">
        <Blobs />
        <Container>
          <SectionHeading dark center eyebrow={t('home.pillars.eyebrow')} title={t('home.pillars.title')} className="mx-auto" />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
            {pillars.map((item, i) => {
              const Icon = pillarIcons[i]
              return (
                <RevealItem key={item.title}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{item.body}</p>
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </Container>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-br from-amber-500 to-amber-600 py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <h2 className="font-display max-w-2xl text-3xl font-semibold text-white sm:text-4xl">{t('home.ctaBanner.title')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/90">{t('home.ctaBanner.subtitle')}</p>
            <ButtonLink to={localePath(locale, 'contact')} variant="ghost" className="mt-8 bg-white text-amber-700 hover:bg-white/90">
              {t('home.ctaBanner.cta')} <ArrowRight size={18} />
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* LOCATION */}
      <section className="py-24 sm:py-32">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal direction="left">
            <SectionHeading eyebrow={t('home.location.eyebrow')} title={t('home.location.title')} />
            <div className="mt-6 flex items-start gap-3 text-larimar-800">
              <MapPin size={20} className="mt-0.5 shrink-0 text-amber-500" />
              <p className="text-sm leading-relaxed sm:text-base">{site.address.full}</p>
            </div>
            <ButtonAnchor href={site.mapsLinkSrc} target="_blank" rel="noreferrer" variant="outline" className="mt-6">
              {t('home.location.cta')}
            </ButtonAnchor>
          </Reveal>
          <Reveal direction="right" className="group relative overflow-hidden rounded-3xl shadow-glow">
            <iframe
              title="Rijo Suplidora — Google Maps"
              src={site.mapsEmbedSrc}
              loading="lazy"
              className="h-80 w-full border-0 lg:h-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={site.mapsLinkSrc}
              target="_blank"
              rel="noreferrer"
              aria-label={t('common.viewOnMap')}
              className="absolute inset-0 z-10 bg-larimar-950/0 transition-colors duration-300 group-hover:bg-larimar-950/10"
            >
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-larimar-800 shadow-lg transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-sm">
                <MapPin size={14} className="text-amber-500" /> {t('common.viewOnMap')}
              </span>
            </a>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

function GemCard({
  imageKey,
  locale,
  title,
  body,
  accent,
}: {
  imageKey: 'larimarStone' | 'amberStone'
  locale: Locale
  title: string
  body: string
  accent: string
}) {
  const alt = locale === 'es' ? IMAGES[imageKey].altEs : IMAGES[imageKey].altEn
  return (
    <div className="group relative overflow-hidden rounded-3xl">
      <img
        src={src(imageKey, 900)}
        srcSet={`${src(imageKey, 600)} 600w, ${src(imageKey, 900)} 900w, ${src(imageKey, 1200)} 1200w`}
        sizes="(min-width: 640px) 45vw, 90vw"
        alt={alt}
        loading="lazy"
        className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${accent} opacity-90`} />
      <div className="absolute inset-x-0 bottom-0 p-7">
        <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/85">{body}</p>
      </div>
    </div>
  )
}