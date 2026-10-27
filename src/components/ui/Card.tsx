import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface Props {
  icon?: LucideIcon
  title: ReactNode
  children?: ReactNode
  className?: string
  tone?: 'default' | 'accent' | 'live'
}

export function Card({ icon: Icon, title, children, className = '', tone = 'default' }: Props) {
  const iconTone = { default: 'text-ink-200 bg-ink-700', accent: 'text-accent bg-accent-soft', live: 'text-live bg-live-soft' }[tone]
  return (
    <div className={`rounded-2xl border border-ink-700 bg-ink-900/80 p-4 md:p-6 ${className}`}>
      <div className="flex items-center gap-3">
        {Icon && (
          <span className={`grid size-9 shrink-0 place-items-center rounded-lg md:size-12 ${iconTone}`}>
            <Icon className="size-5 md:size-6" strokeWidth={1.75} />
          </span>
        )}
        <h3 className="text-base font-semibold text-ink-100 md:text-[23px]">{title}</h3>
      </div>
      {children && <div className="mt-2 text-sm leading-relaxed text-ink-300 md:mt-3 md:text-lg">{children}</div>}
    </div>
  )
}

/** Rótulo pequeno em fonte mono. */
export function Tag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-md border border-ink-600 bg-ink-800 px-2 py-0.5 font-mono text-[11px] tracking-wide text-ink-300 md:text-sm ${className}`}>
      {children}
    </span>
  )
}

/** Caminho de menu, ex.: Configurações → Vídeo. */
export function MenuPath({ path }: { path: string[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5 align-middle font-mono text-[12px] md:text-base">
      {path.map((p, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          {i > 0 && <span className="text-ink-500">→</span>}
          <span className="rounded-md border border-ink-600 bg-ink-800 px-2 py-0.5 text-ink-100">{p}</span>
        </span>
      ))}
    </span>
  )
}
