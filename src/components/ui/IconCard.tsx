import type { LucideIcon } from 'lucide-react'
import clsx from 'clsx'
import { RevealItem } from './Reveal'

export function IconCard({
  icon: Icon,
  title,
  body,
  accent = 'larimar',
  className,
}: {
  icon: LucideIcon
  title: string
  body?: string
  accent?: 'larimar' | 'amber'
  className?: string
}) {
  return (
    <RevealItem
      className={clsx(
        'group relative overflow-hidden rounded-2xl border border-larimar-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        className,
      )}
    >
      <div
        className={clsx(
          'mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
          accent === 'larimar' ? 'bg-larimar-50 text-larimar-700' : 'bg-amber-50 text-amber-600',
        )}
      >
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3 className="font-display text-lg font-semibold text-larimar-950">{title}</h3>
      {body && <p className="mt-2 text-sm leading-relaxed text-larimar-700/75">{body}</p>}
      <div
        className={clsx(
          'absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20',
          accent === 'larimar' ? 'bg-larimar-400' : 'bg-amber-400',
        )}
      />
    </RevealItem>
  )
}
