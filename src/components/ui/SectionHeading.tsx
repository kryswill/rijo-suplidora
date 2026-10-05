import type { ReactNode } from 'react'
import clsx from 'clsx'
import { Reveal } from './Reveal'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  dark = false,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  center?: boolean
  dark?: boolean
  className?: string
}) {
  return (
    <Reveal className={clsx('max-w-2xl', center ? 'mx-auto text-center' : 'text-left', className)}>
      {eyebrow && (
        <span
          className={clsx(
            'mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest',
            dark ? 'bg-white/10 text-amber-300' : 'bg-amber-50 text-amber-600',
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          {eyebrow}
        </span>
      )}
      <h2
        className={clsx(
          'font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl',
          dark ? 'text-white' : 'text-larimar-950',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={clsx('mt-4 text-base leading-relaxed sm:text-lg', dark ? 'text-white/70' : 'text-larimar-700/80')}>
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
