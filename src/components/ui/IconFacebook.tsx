export function IconFacebook({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M13.75 8.55h1.65V6.2h-1.9c-1.85 0-2.85 1.12-2.85 2.9v1.45H9.05v2.4h1.6V18h2.4v-5.05h1.75l.4-2.4h-2.15V9.3c0-.5.2-.75.65-.75Z"
        fill="currentColor"
      />
    </svg>
  )
}