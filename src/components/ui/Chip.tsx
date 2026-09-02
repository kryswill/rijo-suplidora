import { RevealItem } from './Reveal'

export function Chip({ label }: { label: string }) {
  return (
    <RevealItem className="inline-flex">
      <span className="inline-flex items-center rounded-full border border-larimar-200 bg-white px-4 py-2 text-sm font-medium text-larimar-800 shadow-sm transition-colors hover:border-amber-300 hover:text-amber-700">
        {label}
      </span>
    </RevealItem>
  )
}
