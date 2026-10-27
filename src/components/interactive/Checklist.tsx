import { Check, RotateCcw, ShieldAlert } from 'lucide-react'
import type { ChecklistGroup } from '../../data/checklist'
import { useLocalStorage } from '../../lib/storage'

interface Props {
  groups: ChecklistGroup[]
  /** Chave de armazenamento: cada checklist guarda seu próprio progresso. */
  storageKey: string
  columns?: 1 | 2
  /** Tamanho para o palco (slide) ou para a página de consulta. */
  size?: 'slide' | 'page'
}

const EMPTY: Record<string, boolean> = {}

/** Checklist marcável, com progresso salvo no navegador. */
export function Checklist({ groups, storageKey, columns = 1, size = 'page' }: Props) {
  const [checked, setChecked, reset] = useLocalStorage<Record<string, boolean>>(storageKey, EMPTY)
  const all = groups.flatMap((g) => g.items.map((i) => `${g.id}-${i.id}`))
  const doneCount = all.filter((id) => checked[id]).length
  const pct = Math.round((doneCount / all.length) * 100)
  const slide = size === 'slide'

  const toggle = (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] }))

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-800">
          <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
        <span className="font-mono text-sm text-ink-200 md:text-base" aria-live="polite">
          {doneCount}/{all.length}
        </span>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 rounded-lg border border-ink-600 px-2.5 py-1 text-xs text-ink-300 hover:border-ink-400 hover:text-ink-100 md:text-sm"
        >
          <RotateCcw className="size-3.5" /> Limpar
        </button>
      </div>
      <div className={`grid gap-6 ${groups.length > 1 ? 'lg:grid-cols-2' : ''}`}>
        {groups.map((g) => (
          <section key={g.id}>
            {groups.length > 1 && <h3 className="mb-2 font-mono text-xs tracking-widest text-accent uppercase md:text-sm">{g.title}</h3>}
            <ul className={`grid gap-2 ${columns === 2 ? 'md:grid-cols-2' : ''}`}>
              {g.items.map((item) => {
                const id = `${g.id}-${item.id}`
                const on = Boolean(checked[id])
                return (
                  <li key={id}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      onClick={() => toggle(id)}
                      className={`flex w-full items-center gap-3 rounded-xl border text-left transition-colors ${slide ? 'px-4 py-3' : 'px-3 py-2.5'} ${
                        on ? 'border-accent/50 bg-accent-soft' : 'border-ink-700 bg-ink-900 hover:border-ink-500'
                      }`}
                    >
                      <span
                        className={`grid shrink-0 place-items-center rounded-md border-2 transition-colors ${slide ? 'size-7' : 'size-6'} ${
                          on ? 'border-accent bg-accent text-ink-950' : 'border-ink-500'
                        }`}
                      >
                        {on && <Check className="size-4" strokeWidth={3} />}
                      </span>
                      <span className={`flex-1 ${slide ? 'text-sm md:text-[21px]' : 'text-sm md:text-base'} ${on ? 'text-ink-300 line-through decoration-ink-500' : 'text-ink-100'}`}>
                        {item.text}
                      </span>
                      {item.critical && (
                        <span title="Item crítico" className="flex items-center gap-1 font-mono text-[10px] text-live md:text-xs">
                          <ShieldAlert className="size-4" />
                          <span className="hidden md:inline">CRÍTICO</span>
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
