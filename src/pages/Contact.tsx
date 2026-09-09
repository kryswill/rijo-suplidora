import type { ComponentType, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { Seo } from '../components/seo/Seo'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { Blobs } from '../components/ui/Blobs'
import { ContactForm } from '../components/ui/ContactForm'
import { IconInstagram } from '../components/ui/IconInstagram'
import { site, whatsappLink } from '../data/site'
import { localePath, type Locale } from '../lib/routes'
import { breadcrumbSchema } from '../lib/jsonLd'

export function Contact({ locale }: { locale: Locale }) {
  const { t } = useTranslation()

  return (
    <>
      <Seo
        locale={locale}
        path={localePath(locale, 'contact')}
        title={t('contact.seo.title')}
        description={t('contact.seo.description')}
        jsonLd={breadcrumbSchema([
          { name: t('nav.home'), path: localePath(locale, 'home') },
          { name: t('nav.contact'), path: localePath(locale, 'contact') },
        ])}
      />

      <section className="relative overflow-hidden bg-larimar-950 pb-16 pt-40">
        <Blobs variant="amber" />
        <Container className="relative">
          <Reveal className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 ring-1 ring-white/20">
              {t('contact.hero.eyebrow')}
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">{t('contact.hero.title')}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">{t('contact.hero.subtitle')}</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <Reveal direction="left" className="space-y-8">
            <InfoRow icon={MapPin} title={t('contact.info.addressTitle')}>
              <p>{site.address.full}</p>
            </InfoRow>
            <InfoRow icon={Clock} title={t('contact.info.hoursTitle')}>
              <p>{site.hours}</p>
            </InfoRow>
            <InfoRow icon={Phone} title={t('contact.info.phoneTitle')}>
              <a href={`tel:${site.phoneIntl}`} className="hover:text-amber-600">
                {site.phoneDisplay}
              </a>
            </InfoRow>
            <InfoRow icon={Mail} title={t('contact.info.emailTitle')}>
              <a href={`mailto:${site.email.public}`} className="hover:text-amber-600">
                {site.email.public}
              </a>
            </InfoRow>
            <InfoRow icon={IconInstagram} title={t('contact.info.socialTitle')}>
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="hover:text-amber-600">
                {site.social.instagramHandle}
              </a>
            </InfoRow>

            <a
              href={whatsappLink(t('whatsapp.defaultMessage'))}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle size={18} /> {t('common.writeWhatsapp')}
            </a>

            <div className="group relative overflow-hidden rounded-2xl shadow-sm">
              <iframe
                title="Rijo Suplidora — Google Maps"
                src={site.mapsEmbedSrc}
                loading="lazy"
                className="h-64 w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={site.mapsLinkSrc}
                target="_blank"
                rel="noreferrer"
                aria-label={t('common.viewOnMap')}
                className="absolute inset-0 z-10 bg-larimar-950/0 transition-colors duration-300 group-hover:bg-larimar-950/10"
              >
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-larimar-800 shadow-lg transition-transform duration-300 group-hover:-translate-y-0.5">
                  <MapPin size={14} className="text-amber-500" /> {t('common.viewOnMap')}
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal direction="right" className="rounded-3xl border border-larimar-100 bg-white p-6 shadow-sm sm:p-9">
            <h2 className="font-display text-xl font-semibold text-larimar-950">{t('contact.form.title')}</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ size?: number; className?: string }>
  title: string
  children: ReactNode
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-larimar-50 text-larimar-700">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-larimar-500">{title}</h3>
        <div className="mt-1 text-base text-larimar-900">{children}</div>
      </div>
    </div>
  )
}