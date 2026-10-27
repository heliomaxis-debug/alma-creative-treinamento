import { BookOpen, Presentation, X } from 'lucide-react'
import { MODULES } from '../../data/modules'
import { SLIDES } from '../../slides'
import { AlmaWordmark } from '../brand/Brand'

interface Props {
  current: number
  onGo: (index: number) => void
  onClose: () => void
  onConsulta: () => void
  onInstrutor: () => void
}

/** Gaveta com todos os módulos e slides, para pular para qualquer ponto da aula. */
export function ModuleMenu({ current, onGo, onClose, onConsulta, onInstrutor }: Props) {
  return (
    <div className="fixed inset-0 z-40 animate-fade-in bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <nav
        aria-label="Módulos do treinamento"
        className="scrollbar-thin flex h-full w-full max-w-md flex-col overflow-y-auto border-r border-ink-700 bg-ink-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-700 bg-ink-900 px-5 py-4">
          <AlmaWordmark withChurch={false} />
          <button type="button" onClick={onClose} aria-label="Fechar menu" className="rounded-lg p-1.5 text-ink-300 hover:bg-ink-700 hover:text-ink-100">
            <X className="size-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-ink-700 p-4">
          <button type="button" onClick={onConsulta} className="flex items-center justify-center gap-2 rounded-xl border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-ink-100 hover:border-accent">
            <BookOpen className="size-4 text-accent" /> Consulta rápida
          </button>
          <button type="button" onClick={onInstrutor} className="flex items-center justify-center gap-2 rounded-xl border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-ink-100 hover:border-accent">
            <Presentation className="size-4 text-accent" /> Modo instrutor
          </button>
        </div>
        <ol className="flex-1 p-3">
          {MODULES.map((m) => {
            const Icon = m.icon
            const slides = SLIDES.map((s, i) => ({ s, i })).filter(({ s }) => s.module === m.n)
            const isCurrent = SLIDES[current]?.module === m.n
            return (
              <li key={m.n} className="mb-2">
                <button
                  type="button"
                  onClick={() => slides[0] && onGo(slides[0].i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${isCurrent ? 'bg-ink-800' : 'hover:bg-ink-800/60'}`}
                >
                  <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${isCurrent ? 'bg-accent text-ink-950' : 'bg-ink-700 text-ink-200'}`}>
                    <Icon className="size-4.5" />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] tracking-widest text-ink-400 uppercase">Módulo {m.n}</span>
                    <span className="block text-sm font-semibold text-ink-100">{m.title}</span>
                  </span>
                </button>
                <ol className="mt-1 ml-[30px] border-l border-ink-700 pl-3">
                  {slides.map(({ s, i }) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => onGo(i)}
                        aria-current={i === current ? 'page' : undefined}
                        className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm ${
                          i === current ? 'bg-accent-soft text-ink-100' : 'text-ink-300 hover:bg-ink-800 hover:text-ink-100'
                        }`}
                      >
                        <span className={`font-mono text-xs ${i === current ? 'text-accent' : 'text-ink-500'}`}>{String(i + 1).padStart(2, '0')}</span>
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ol>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
