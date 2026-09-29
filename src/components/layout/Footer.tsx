import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Logo } from './Logo'
import { IconInstagram } from '../ui/IconInstagram'
import { IconFacebook } from '../ui/IconFacebook'
import { IconX } from '../ui/IconX'
import { Container } from '../ui/Container'
import { site } from '../../data/site'
import { localePath, type Locale, type PageKey } from '../../lib/routes'
import { Link } from 'react-router-dom'

const NAV_ITEMS: { key: PageKey; labelKey: string }[] = [
  { key: 'home', labelKey: 'nav.home' },
  { key: 'about', labelKey: 'nav.about' },
  { key: 'products', labelKey: 'nav.products' },
  { key: 'faq', labelKey: 'nav.faq' },
  { key: 'contact', labelKey: 'nav.contact' },
]

export function Footer({ locale }: { locale: Locale }) {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-larimar-950 text-white">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Logo locale={locale} dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{t('footer.tagline')}</p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-amber-400">
            {t('footer.columnsCompany')}
          </h3>
          <ul className="mt-5 space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link to={localePath(locale, item.key)} className="text-sm text-white/70 transition-colors hover:text-white">
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-amber-400">
            {t('footer.columnsContact')}
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-larimar-300" />
              <span>{site.address.full}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-larimar-300" />
              <a href={`tel:${site.phoneIntl}`} className="hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-larimar-300" />
              <a href={`mailto:${site.email.public}`} className="hover:text-white">
                {site.email.public}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-larimar-300" />
              <span>{site.hours}</span>
            </li>
            <li className="flex gap-3">
              <IconInstagram size={18} className="mt-0.5 shrink-0 text-larimar-300" />
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="hover:text-white">
                {site.social.instagramHandle}
              </a>
            </li>
            <li className="flex gap-3">
              <IconFacebook size={18} className="mt-0.5 shrink-0 text-larimar-300" />
              <a href={site.social.facebook} target="_blank" rel="noreferrer" className="hover:text-white">
                {site.social.facebookHandle}
              </a>
            </li>
            <li className="flex gap-3">
              <IconX size={18} className="mt-0.5 shrink-0 text-larimar-300" />
              <a href={site.social.x} target="_blank" rel="noreferrer" className="hover:text-white">
                {site.social.xHandle}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {t('meta.siteName')} — {t('footer.rights')}
          </p>
          <p>{t('footer.legalNote', { legalName: site.legalName })}</p>
        </Container>
      </div>
    </footer>
  )
}