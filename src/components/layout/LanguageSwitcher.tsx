import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { getAlternatePaths, type Locale } from '../../lib/routes'

export function LanguageSwitcher({ locale, dark }: { locale: Locale; dark?: boolean }) {
  const location = useLocation()
  const alternates = getAlternatePaths(location.pathname)

  return (
    <div
      className={clsx(
        'flex items-center gap-0.5 rounded-full p-1 text-xs font-semibold',
        dark ? 'bg-white/10 ring-1 ring-white/25' : 'bg-larimar-50 ring-1 ring-larimar-100',
      )}
    >
      {(['es', 'en'] as Locale[]).map((loc) => (
        <Link
          key={loc}
          to={alternates[loc]}
          aria-current={locale === loc ? 'true' : undefined}
          className={clsx(
            'rounded-full px-3 py-1.5 uppercase tracking-wide transition-colors',
            locale === loc
              ? dark
                ? 'bg-white text-larimar-800'
                : 'bg-larimar-700 text-white'
              : dark
                ? 'text-white/70 hover:text-white'
                : 'text-larimar-600 hover:text-larimar-800',
          )}
        >
          {loc}
        </Link>
      ))}
    </div>
  )
}
