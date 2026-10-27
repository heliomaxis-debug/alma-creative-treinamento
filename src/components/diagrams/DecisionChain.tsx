import { useState } from 'react'
import { ArrowDown, ArrowRight, Check, Wrench } from 'lucide-react'

export interface DecisionStep {
  question: string
  fix: string
}

/**
 * Fluxograma vertical: cada pergunta segue para baixo no "sim"
 * e aponta a correção no "não". Clique em uma etapa para destacá-la.
 */
export function DecisionChain({ steps, done }: { steps: DecisionStep[]; done: string }) {
  const [active, setActive] = useState<number | null>(null)
  return (
    <div className="flex flex-col">
      {steps.map((s, i) => {
        const on = active === i
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setActive(on ? null : i)}
              className={`grid w-full items-center gap-2 rounded-xl text-left transition-opacity md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4 ${
                active !== null && !on ? 'opacity-45' : ''
              }`}
            >
              <span className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 md:px-5 md:py-3 ${on ? 'border-accent bg-accent-soft' : 'border-ink-600 bg-ink-900'}`}>
                <span className="font-mono text-xs text-accent md:text-base">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm font-medium text-ink-100 md:text-[21px]">{s.question}</span>
              </span>
              <span className="hidden items-center gap-1 font-mono text-xs text-live md:flex md:text-sm">
                NÃO <ArrowRight className="size-4" />
              </span>
              <span className={`flex items-center gap-3 rounded-xl border border-dashed px-3 py-2 md:px-4 md:py-2.5 ${on ? 'border-live/70 bg-live-soft' : 'border-ink-600'}`}>
                <Wrench className="size-4 shrink-0 text-live md:size-5" />
                <span className="text-xs text-ink-200 md:text-lg">
                  <span className="font-mono text-live md:hidden">Não: </span>
                  {s.fix}
                </span>
              </span>
            </button>
            <div className="flex items-center gap-1.5 py-1 pl-6 font-mono text-[10px] text-ok md:py-1 md:text-xs">
              <ArrowDown className="size-3.5 md:size-4" /> SIM
            </div>
          </div>
        )
      })}
      <div className="flex items-center gap-3 rounded-xl border border-ok/50 bg-ok-soft px-3 py-2.5 md:w-[calc(50%-50px)] md:px-5 md:py-3">
        <Check className="size-5 text-ok" />
        <span className="text-sm font-medium text-ink-100 md:text-[21px]">{done}</span>
      </div>
    </div>
  )
}
