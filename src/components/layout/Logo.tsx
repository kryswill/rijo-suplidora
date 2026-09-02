import { Link } from 'react-router-dom'
import clsx from 'clsx'
import type { Locale } from '../../lib/routes'
import { localePath } from '../../lib/routes'
import logoHorizontal from '../../assets/brand/logo-horizontal.png'

/**
 * `dark` = el logo se muestra sobre un fondo oscuro o una foto (header transparente
 * sobre el hero, footer). El isotipo trae el texto "Rijo Suplidora" en tinta oscura,
 * así que en esos casos se envuelve en una placa clara para mantenerlo legible.
 */
export function Logo({ locale, dark }: { locale: Locale; dark?: boolean }) {
  return (
    <Link
      to={localePath(locale, 'home')}
      className={clsx('inline-flex shrink-0 items-center rounded-xl transition-shadow', dark && 'bg-white/95 px-3 py-1.5 shadow-sm')}
      aria-label="Rijo Suplidora"
    >
      <img src={logoHorizontal} alt="Rijo Suplidora" className="h-8 w-auto sm:h-9" />
    </Link>
  )
}
