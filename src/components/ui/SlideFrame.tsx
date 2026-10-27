import type { ReactNode } from 'react'
import { AlmaWordmark } from '../brand/Brand'
import { useSlideCtx } from './SlideContext'

interface Props {
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
  /** Classe do corpo do slide (ex.: grid). */
  bodyClassName?: string
}

/** Moldura padrão de um slide: módulo, título, introdução, corpo e rodapé. */
export function SlideFrame({ title, lead, children, bodyClassName = '' }: Props) {
  const { index, total, moduleLabel } = useSlideCtx()
  return (
    <div className="relative flex h-full w-full flex-col bg-ink-950 px-5 pt-6 pb-16 md:px-20 md:pt-14 md:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <header className="relative stagger">
        <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase md:text-sm">{moduleLabel}</p>
        <h2 className="mt-2 text-3xl leading-[1.08] font-semibold tracking-tight text-balance text-ink-100 md:mt-3 md:text-[54px]">
          {title}
        </h2>
        {lead && <p className="mt-3 max-w-[1200px] text-base leading-relaxed text-ink-300 md:mt-4 md:text-[23px]">{lead}</p>}
      </header>
      <div className={`relative mt-6 min-h-0 flex-1 md:mt-9 ${bodyClassName}`}>{children}</div>
      <footer className="absolute inset-x-5 bottom-5 flex items-center justify-between md:inset-x-20 md:bottom-8">
        <AlmaWordmark withChurch={false} className="opacity-60" />
        <span className="font-mono text-xs text-ink-500 md:text-sm">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </footer>
    </div>
  )
}
