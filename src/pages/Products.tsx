import { useTranslation } from 'react-i18next'
import { ArrowRight, Truck } from 'lucide-react'
import { Seo } from '../components/seo/Seo'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CatalogShowcase } from '../components/ui/CatalogShowcase'
import { Reveal } from '../components/ui/Reveal'
import { Blobs } from '../components/ui/Blobs'
import { ButtonLink } from '../components/ui/Button'
import larimarGemPhoto from '../assets/photos/piedra-larimar-rijo-suplidora.jpg'
import amberGemPhoto from '../assets/photos/piedra-ambar-rijo-suplidora.jpg'
import distributionVanPhoto from '../assets/photos/minibus-distribucion-rijo-suplidora.png'
import galleryPhoto1 from '../assets/photos/galeria-set-vaso-pin-bandera.jpg'
import galleryPhoto2 from '../assets/photos/galeria-set-vaso-toalla-bandera.jpg'
import galleryPhoto3 from '../assets/photos/galeria-set-pulsera-larimar-aceite-coco.jpg'
import galleryPhoto4 from '../assets/photos/galeria-caja-regalo-bandera-dominicana.jpg'
import galleryPhoto5 from '../assets/photos/galeria-set-vaso-llavero-pelota.jpg'
import galleryPhoto6 from '../assets/photos/galeria-set-vaso-llavero-dijes.jpg'
import galleryPhoto7 from '../assets/photos/galeria-set-vaso-monedero-mapa.jpg'
import galleryPhoto8 from '../assets/photos/galeria-set-vaso-llavero-mapa.jpg'
import galleryPhoto9 from '../assets/photos/galeria-collar-perlas-pulsera-larimar.jpg'
import galleryPhoto10 from '../assets/photos/galeria-set-vaso-iman-repdom.jpg'
import { localePath, type Locale } from '../lib/routes'
import { breadcrumbSchema } from '../lib/jsonLd'

const GALLERY_ITEMS = [
  {
    src: galleryPhoto1,
    altEs: 'Set de regalo con vaso souvenir de la bandera dominicana y pin de solapa',
    altEn: 'Dominican flag souvenir tumbler and lapel pin gift set',
  },
  {
    src: galleryPhoto2,
    altEs: 'Set de regalo con vaso souvenir y toalla bordada con la bandera dominicana',
    altEn: 'Souvenir tumbler and Dominican-flag embroidered towel gift set',
  },
  {
    src: galleryPhoto3,
    altEs: 'Set de regalo con pulsera de piedra Larimar y aceite de coco',
    altEn: 'Larimar stone bracelet and coconut oil gift set',
  },
  {
    src: galleryPhoto4,
    altEs: 'Caja de regalo envuelta con el diseño de la bandera dominicana',
    altEn: 'Gift box wrapped in Dominican flag design',
  },
  {
    src: galleryPhoto5,
    altEs: 'Set de regalo con vaso souvenir y llavero de pelota de béisbol',
    altEn: 'Souvenir tumbler and baseball keychain gift set',
  },
  {
    src: galleryPhoto6,
    altEs: 'Set de regalo con vaso souvenir y llavero con dijes de República Dominicana',
    altEn: 'Souvenir tumbler and Dominican Republic charm keychain gift set',
  },
  {
    src: galleryPhoto7,
    altEs: 'Set de regalo con vaso souvenir y monedero con el mapa de República Dominicana',
    altEn: 'Souvenir tumbler and Dominican Republic map coin purse gift set',
  },
  {
    src: galleryPhoto8,
    altEs: 'Set de regalo con vaso souvenir y llavero con dije del mapa dominicano',
    altEn: 'Souvenir tumbler and Dominican map charm keychain gift set',
  },
  {
    src: galleryPhoto9,
    altEs: 'Collar de perlas con piedras de Larimar y pulsera a juego',
    altEn: 'Pearl necklace with Larimar stones and matching bracelet',
  },
  {
    src: galleryPhoto10,
    altEs: 'Set de regalo con vaso souvenir e imán decorativo "Rep. Dom."',
    altEn: 'Souvenir tumbler and "Rep. Dom." decorative magnet gift set',
  },
] as const

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
            src={larimarGemPhoto}
            alt={t('products.gemFeature.larimarAlt')}
            loading="lazy"
            className="h-64 w-full object-cover sm:h-80"
          />
          <img
            src={amberGemPhoto}
            alt={t('products.gemFeature.amberAlt')}
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

      {/* GALLERY */}
      <section className="relative overflow-hidden bg-larimar-50/40 py-24 sm:py-32">
        <Container>
          <SectionHeading center eyebrow={t('products.gallery.eyebrow')} title={t('products.gallery.title')} className="mx-auto" />
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-slate-600 sm:text-base">{t('products.gallery.subtitle')}</p>
          <Reveal className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-5">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={i} className="group aspect-square overflow-hidden rounded-2xl shadow-md ring-2 ring-amber-400">
                <img
                  src={item.src}
                  alt={locale === 'es' ? item.altEs : item.altEn}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </Reveal>
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