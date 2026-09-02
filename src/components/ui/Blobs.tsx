/** Formas orgánicas decorativas en degradé de marca — puramente visuales (aria-hidden). */
export function Blobs({ variant = 'default' }: { variant?: 'default' | 'amber' | 'subtle' }) {
  if (variant === 'subtle') {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-drift absolute -left-32 top-0 h-96 w-96 rounded-full bg-larimar-100 blur-3xl" />
        <div className="animate-drift absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-50 blur-3xl [animation-delay:-8s]" />
      </div>
    )
  }

  if (variant === 'amber') {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-drift absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-amber-400/30 to-larimar-500/20 blur-3xl" />
        <div className="animate-drift absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-larimar-500/20 blur-3xl [animation-delay:-11s]" />
      </div>
    )
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="animate-drift absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-larimar-500/25 blur-3xl" />
      <div className="animate-drift absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl [animation-delay:-6s]" />
      <div className="animate-drift absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-larimar-300/20 blur-3xl [animation-delay:-14s]" />
    </div>
  )
}
