import { useTranslation } from 'react-i18next'
import { Compass, Eye, Sparkle, HeartHandshake } from 'lucide-react'
import { Seo } from '../components/seo/Seo'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Chip } from '../components/ui/Chip'
import { Blobs } from '../components/ui/Blobs'
import storefrontPhoto from '../assets/photos/fachada-tienda-rijo-suplidora.jpg'
import { localePath, type Locale } from '../lib/routes'
import { tArray } from '../lib/i18nHelpers'
import { breadcrumbSchema } from '../lib/jsonLd'

type Value = { title: string; body: string }

export function About({ locale }: { locale: Locale }) {
  const { t } = useTranslation()
  const paragraphs = tArray<string>(t, 'about.history.paragraphs')
  const values = tArray<Value>(t, 'about.values.items')
  const personality = tArray<string>(t, 'about.personality.items')

  const identityCards = [
    { icon: Compass, title: t('about.identity.purposeTitle'), body: t('about.identity.purposeBody') },
    { icon: Sparkle, title: t('about.identity.missionTitle'), body: t('about.identity.missionBody') },
    { icon: Eye, title: t('about.identity.visionTitle'), body: t('about.identity.visionBody') },
    { icon: HeartHandshake, title: t('about.identity.promiseTitle'), body: t('about.identity.promiseBody') },
  ]

  return (
    <>
      <Seo
        locale={locale}
        path={localePath(locale, 'about')}
        title={t('about.seo.title')}
        description={t('about.seo.description')}
        jsonLd={breadcrumbSchema([
          { name: t('nav.home'), path: localePath(locale, 'home') },
          { name: t('nav.about'), path: localePath(locale, 'about') },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-larimar-950 pb-20 pt-40">
        <Blobs variant="amber" />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 ring-1 ring-white/20">
              {t('about.hero.eyebrow')}
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">{t('about.hero.title')}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">{t('about.hero.subtitle')}</p>
          </Reveal>
        </Container>
      </section>

      {/* HISTORY */}
      <section className="py-24 sm:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal className="lg:sticky lg:top-32">
              <SectionHeading eyebrow={t('about.history.eyebrow')} title={t('about.history.title')} />
              <div className="mt-8 overflow-hidden rounded-3xl shadow-glow">
                <img
                  src={storefrontPhoto}
                  alt={t('about.history.imageAlt')}
                  loading="lazy"
                  className="aspect-[550/367] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-center text-base leading-relaxed text-larimar-800/90 sm:text-lg">{p}</p>
              </Reveal>
            ))}
            <Reveal>
              <blockquote className="border-t-4 border-amber-400 bg-amber-50 px-6 py-5 text-center font-display text-lg italic text-larimar-900">
                {t('about.history.closing')}
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* IDENTITY */}
      <section className="relative overflow-hidden bg-larimar-950 py-24 sm:py-32">
        <Blobs />
        <Container>
          <SectionHeading dark center eyebrow={t('about.identity.eyebrow')} title={t('meta.slogan')} className="mx-auto" />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {identityCards.map((card) => (
              <RevealItem key={card.title}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur-sm">
                  <card.icon size={22} className="text-amber-300" strokeWidth={1.8} />
                  <h3 className="font-display mt-4 text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{card.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <RevealGroup className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-5" stagger={0.08}>
            <RevealItem>
              <div className="h-full rounded-2xl bg-gradient-to-br from-larimar-600 to-larimar-800 p-7 text-center">
                <h3 className="font-display text-lg font-semibold text-white">{t('about.identity.essenceTitle')}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{t('about.identity.essenceBody')}</p>
              </div>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>

      {/* VALUES */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading center eyebrow={t('about.values.eyebrow')} title={t('about.values.title')} className="mx-auto" />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {values.map((value) => (
              <RevealItem key={value.title}>
                <div className="h-full rounded-2xl border border-larimar-100 bg-white p-6 text-center transition-shadow hover:shadow-lg">
                  <h3 className="font-display text-base font-semibold text-larimar-950">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-larimar-700/75">{value.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative overflow-hidden bg-amber-50 py-24">
        <Container className="text-center">
          <Reveal className="mx-auto max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">{t('about.philosophy.eyebrow')}</span>
            <p className="font-display mt-4 text-2xl font-medium leading-snug text-larimar-950 sm:text-3xl">
              “{t('about.philosophy.quote')}”
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-larimar-700/80 sm:text-base">
              {t('about.philosophy.body')}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* PERSONALITY */}
      <section className="py-24 sm:py-32">
        <Container className="text-center">
          <SectionHeading center eyebrow={t('about.personality.eyebrow')} title={t('about.personality.title')} className="mx-auto" />
          <RevealGroup className="mt-10 flex flex-wrap justify-center gap-3" stagger={0.04}>
            {personality.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* QUALITY + SOCIAL */}
      <section className="pb-24 sm:pb-32">
        <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal direction="left" className="rounded-3xl bg-larimar-50 p-8 text-center">
            <h3 className="font-display text-xl font-semibold text-larimar-950">{t('about.quality.title')}</h3>
            <p className="mt-3 text-sm leading-relaxed text-larimar-700/85 sm:text-base">{t('about.quality.body')}</p>
          </Reveal>
          <Reveal direction="right" className="rounded-3xl bg-amber-50 p-8 text-center">
            <h3 className="font-display text-xl font-semibold text-larimar-950">{t('about.social.title')}</h3>
            <p className="mt-3 text-sm leading-relaxed text-larimar-700/85 sm:text-base">{t('about.social.body')}</p>
          </Reveal>
        </Container>
      </section>
    </>
  )
}