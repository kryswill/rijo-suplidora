import type { ReactNode } from 'react'
import { RevealItem } from './Reveal'

export function StatCard({ value, label, sub }: { value: ReactNode; label: string; sub?: string }) {
  return (
    <RevealItem className="text-center sm:text-left">
      <div className="font-display text-3xl font-semibold text-white sm:text-4xl">{value}</div>
      <p className="mt-1 text-sm font-medium text-white/70">{label}</p>
      {sub && <p className="mt-0.5 text-xs text-white/45">{sub}</p>}
    </RevealItem>
  )
}
