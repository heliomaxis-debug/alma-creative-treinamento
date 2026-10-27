import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  className?: string
}

/** Janela genérica de aplicativo, usada nas ilustrações de telas. */
export function WindowMock({ title, children, className = '' }: Props) {
  return (
    <div className={`overflow-hidden rounded-xl border border-ink-600 bg-ink-900 shadow-2xl shadow-black/50 ${className}`}>
      <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-800 px-3 py-2">
        <span className="size-2.5 rounded-full bg-ink-500" />
        <span className="size-2.5 rounded-full bg-ink-500" />
        <span className="size-2.5 rounded-full bg-ink-500" />
        <span className="ml-2 truncate font-mono text-[11px] text-ink-300 md:text-sm">{title}</span>
      </div>
      {children}
    </div>
  )
}

/** Campo de formulário ilustrado (rótulo + valor). */
export function FieldMock({ label, value, highlight, mono, masked }: { label: string; value: string; highlight?: boolean; mono?: boolean; masked?: boolean }) {
  return (
    <div className="grid grid-cols-[minmax(0,42%)_1fr] items-center gap-3 py-1.5">
      <span className="text-right text-xs text-ink-300 md:text-base">{label}</span>
      <span
        className={`truncate rounded-md border px-2.5 py-1.5 text-xs md:text-base ${mono || masked ? 'font-mono' : ''} ${
          highlight ? 'border-accent bg-accent-soft text-ink-100' : 'border-ink-600 bg-ink-850 text-ink-200'
        }`}
      >
        {masked ? '••••-••••-••••-••••-••••' : value}
      </span>
    </div>
  )
}

/** Imagem de câmera ilustrada (palco com púlpito), usada nas prévias. */
export function CameraFeed({ label = 'CAM 1', className = '', dark = false }: { label?: string; className?: string; dark?: boolean }) {
  return (
    <svg viewBox="0 0 320 180" className={`block h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="180" fill={dark ? '#000' : '#1b1d24'} />
      {!dark && (
        <>
          <rect y="120" width="320" height="60" fill="#23252e" />
          <rect x="60" y="30" width="200" height="70" rx="3" fill="#2b2f3b" />
          <circle cx="160" cy="78" r="13" fill="#5b6070" />
          <path d="M138 120c0-18 10-28 22-28s22 10 22 28z" fill="#5b6070" />
          <path d="M142 106h36l-4 40h-28z" fill="#3a3e4b" />
          <rect x="8" y="8" width="44" height="16" rx="3" fill="#0008" />
          <text x="30" y="20" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="var(--font-mono)">
            {label}
          </text>
        </>
      )}
    </svg>
  )
}
