import type { ReactNode } from 'react'

export type StepItem = string | { title: ReactNode; detail?: ReactNode }

interface Props {
  items: StepItem[]
  size?: 'md' | 'lg'
  columns?: 1 | 2
  className?: string
}

/** Lista numerada de passos curtos. */
export function Steps({ items, size = 'md', columns = 1, className = '' }: Props) {
  const big = size === 'lg'
  return (
    <ol className={`grid gap-2.5 md:gap-3.5 ${columns === 2 ? 'md:grid-cols-2 md:gap-x-10' : ''} stagger ${className}`}>
      {items.map((item, i) => {
        const { title, detail } = typeof item === 'string' ? { title: item, detail: undefined } : item
        return (
          <li key={i} className="flex items-start gap-3 md:gap-4">
            <span
              className={`grid shrink-0 place-items-center rounded-full border border-ink-600 bg-ink-800 font-mono font-semibold text-accent ${
                big ? 'size-8 text-sm md:size-11 md:text-lg' : 'size-7 text-xs md:size-9 md:text-base'
              }`}
            >
              {i + 1}
            </span>
            <div className="min-w-0 pt-0.5 md:pt-1">
              <p className={`leading-snug text-ink-100 ${big ? 'text-base md:text-[25px]' : 'text-sm md:text-[21px]'}`}>{title}</p>
              {detail && <p className={`mt-1 leading-snug text-ink-400 ${big ? 'text-sm md:text-lg' : 'text-xs md:text-base'}`}>{detail}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
