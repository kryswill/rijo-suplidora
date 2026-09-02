import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import clsx from 'clsx'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-larimar-500 disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary: 'bg-larimar-700 text-white shadow-glow hover:bg-larimar-600 hover:-translate-y-0.5',
  amber: 'bg-amber-500 text-white shadow-glow-amber hover:bg-amber-600 hover:-translate-y-0.5',
  ghost: 'bg-white/10 text-white ring-1 ring-inset ring-white/40 backdrop-blur hover:bg-white/20 hover:-translate-y-0.5',
  outline: 'bg-transparent text-larimar-700 ring-1 ring-inset ring-larimar-300 hover:bg-larimar-50 hover:-translate-y-0.5',
}

type Variant = keyof typeof variants

export function ButtonLink({
  to,
  variant = 'primary',
  className,
  children,
  ...rest
}: LinkProps & { variant?: Variant; children: ReactNode }) {
  return (
    <Link to={to} className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  )
}

export function ButtonAnchor({
  variant = 'primary',
  className,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <a className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </a>
  )
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  )
}
