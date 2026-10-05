import type { LucideIcon } from 'lucide-react'
import clsx from 'clsx'
import { RevealItem } from './Reveal'

/**
 * Tarjeta compacta (icono + texto) para la grilla de categorías de productos.
 * A diferencia de `IconCard`, se diseñó para funcionar "flotando" alrededor de una imagen
 * central (ver `CatalogShowcase.tsx`): por eso es más angosta, con fondo semitransparente + blur
 * para integrarse visualmente con la sección, y admite un desplazamiento vertical opcional
 * vía `className` para lograr el efecto de zigzag/flotación en las columnas laterales.
 *
 * `dark` cambia la paleta al estilo "vidrio" ya usado en las secciones de fondo oscuro del sitio
 * (bg-larimar-950): fondo blanco muy tenue, texto blanco e ícono siempre en ámbar (el mismo
 * criterio que ya seguían esas secciones antes de esta tarjeta, en vez de alternar azul/naranja
 * como en fondo claro, donde el contraste de ambos colores contra blanco es parejo).
 */
export function ProductCategoryChip({
  icon: Icon,
  title,
  body,
  accent = 'larimar',
  dark = false,
  className,
}: {
  icon: LucideIcon
  title: string
  body?: string
  accent?: 'larimar' | 'amber'
  dark?: boolean
  className?: string
}) {
  return (
    <RevealItem
      className={clsx(
        'group flex items-center gap-3.5 rounded-2xl p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1',
        dark
          ? 'border border-white/10 bg-white/5 hover:border-amber-300/40 hover:bg-white/10'
          : 'border border-larimar-100 bg-white/90 shadow-sm hover:shadow-lg hover:shadow-larimar-950/5',
        className,
      )}
    >
      <div
        className={clsx(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
          dark ? 'bg-white/10 text-amber-300 group-hover:bg-amber-400/20' : accent === 'larimar' ? 'bg-larimar-50 text-larimar-700' : 'bg-amber-50 text-amber-600',
        )}
      >
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <div className="min-w-0 flex-1 text-center">
        <h3 className={clsx('font-display text-sm font-semibold leading-snug sm:text-[0.95rem]', dark ? 'text-white' : 'text-larimar-950')}>{title}</h3>
        {body && <p className={clsx('mt-1 text-xs leading-relaxed sm:text-[0.8rem]', dark ? 'text-white/65' : 'text-larimar-700/70')}>{body}</p>}
      </div>
    </RevealItem>
  )
}