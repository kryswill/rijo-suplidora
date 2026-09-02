import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Logo } from './Logo'
import { LanguageSwitcher } from './LanguageSwitcher'
import { localePath, type Locale, type PageKey } from '../../lib/routes'

const NAV_ITEMS: { key: PageKey; labelKey: string }[] = [
  { key: 'home', labelKey: 'nav.home' },
  { key: 'about', labelKey: 'nav.about' },
  { key: 'products', labelKey: 'nav.products' },
  { key: 'faq', labelKey: 'nav.faq' },
  { key: 'contact', labelKey: 'nav.contact' },
]

export function Header({ locale }: { locale: Locale }) {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 24)
  const [open, setOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(location.pathname)

  // Cierra el menú móvil al navegar (ajuste de estado durante el render, sin efecto).
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = location.pathname === localePath(locale, 'home')
  const solid = scrolled || !isHome || open

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid ? 'bg-white/90 shadow-sm backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Logo locale={locale} dark={!solid} />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              to={localePath(locale, item.key)}
              end={item.key === 'home'}
              className={({ isActive }) =>
                clsx(
                  'text-sm font-medium tracking-wide transition-colors',
                  solid ? 'text-larimar-800 hover:text-amber-600' : 'text-white/90 hover:text-white',
                  isActive && (solid ? 'text-amber-600' : 'text-white'),
                )
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher locale={locale} dark={!solid} />
        </div>

        <button
          type="button"
          aria-label="menu"
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            'flex h-10 w-10 items-center justify-center rounded-full lg:hidden',
            solid ? 'text-larimar-900' : 'text-white',
          )}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.key}
                  to={localePath(locale, item.key)}
                  end={item.key === 'home'}
                  className={({ isActive }) =>
                    clsx(
                      'rounded-lg px-3 py-3 text-base font-medium text-larimar-800',
                      isActive && 'bg-larimar-50 text-amber-600',
                    )
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              ))}
              <div className="mt-3">
                <LanguageSwitcher locale={locale} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}