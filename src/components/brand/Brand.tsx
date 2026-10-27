import { useState } from 'react'

/*
 * Identidade "Transmissão Creative" (Alma Creative), recriada em SVG a partir da logo:
 * câmera branca em tripé, lente verde-limão, dentro de cantos de visor.
 * Para usar o arquivo oficial na capa, salve-o em public/brand/logo.png.
 */

export const TAGLINE = ['Comunicamos Jesus', 'Criatividade', 'Tecnologia', 'Excelência']

interface MarkProps {
  size?: number
  className?: string
}

/** Símbolo: câmera em tripé dentro do enquadramento de visor. */
export function AlmaMark({ size = 28, className }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="none" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="square">
        <path d="M4 14V4h10M50 4h10v10M60 50v10H50M14 60H4V50" />
      </g>
      <g fill="#f4f4f5">
        <rect x="14" y="22" width="26" height="17" rx="3" />
        <rect x="24" y="15" width="16" height="6" rx="2" />
        <path d="M40 24l12-5v23l-12-5z" />
        <path d="M27 40h5l6 16h-4l-4.5-12L25 56h-4z" />
      </g>
      <rect x="18" y="26" width="10" height="9" rx="1.5" fill="#0a0a0b" />
      <circle cx="46" cy="30.5" r="3.6" fill="var(--color-accent)" />
    </svg>
  )
}

/** "CREATIVE" com o A sem travessão, em verde, como na logo. */
export function CreativeWord({ className = '' }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-[0.14em] ${className}`} aria-label="Creative">
      <span aria-hidden="true">
        CRE<span className="text-accent">Λ</span>TIV<span className="text-accent">E</span>
      </span>
    </span>
  )
}

interface WordmarkProps {
  className?: string
  withChurch?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function AlmaWordmark({ className = '', withChurch = true, size = 'sm' }: WordmarkProps) {
  const text = { sm: 'text-[11px] md:text-xs', md: 'text-sm md:text-base', lg: 'text-base md:text-2xl' }[size]
  const mark = { sm: 20, md: 24, lg: 38 }[size]
  return (
    <div className={`flex items-center gap-2.5 font-semibold tracking-[0.22em] uppercase ${text} ${className}`}>
      <AlmaMark size={mark} className="shrink-0" />
      <span className="text-ink-100">
        Alma <CreativeWord />
      </span>
      {withChurch && (
        <>
          <span className="text-ink-500">|</span>
          <span className="text-ink-300">Alma Church</span>
        </>
      )}
    </div>
  )
}

export function Tagline({ className = '' }: { className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-medium tracking-[0.18em] text-ink-200 uppercase md:text-sm ${className}`}>
      {TAGLINE.map((t, i) => (
        <span key={t} className="inline-flex items-center gap-3">
          {i > 0 && <span className="text-accent">|</span>}
          {t}
        </span>
      ))}
    </p>
  )
}

/** Usa public/brand/logo.png se existir; senão, a versão em SVG. */
export function LogoLockup({ className = '' }: { className?: string }) {
  const [hasFile, setHasFile] = useState(true)
  if (hasFile) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}brand/logo.png`}
        alt="Transmissão Creative — Alma Creative"
        className={`object-contain ${className}`}
        onError={() => setHasFile(false)}
      />
    )
  }
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <AlmaMark size={150} />
    </div>
  )
}
