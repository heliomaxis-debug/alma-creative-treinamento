import { useState, type KeyboardEvent } from 'react'
import { BookOpen, ChevronDown, ListChecks, ListOrdered, Presentation, Search, Stethoscope, Waypoints, type LucideIcon } from 'lucide-react'
import { AlmaWordmark } from '../components/brand/Brand'
import { AtemWiring } from '../components/diagrams/AtemWiring'
import { SignalFlow } from '../components/diagrams/SignalFlow'
import { Checklist } from '../components/interactive/Checklist'
import { DiagnosticSimulator } from '../components/interactive/DiagnosticSimulator'
import { Callout } from '../components/ui/Callout'
import { OPERATIONAL } from '../data/checklist'
import { GLOSSARY } from '../data/glossary'
import { PROCEDURES } from '../data/procedures'

const TABS: { id: string; label: string; icon: LucideIcon; intro: string }[] = [
  { id: 'checklist', label: 'Checklist', icon: ListChecks, intro: 'Marque cada item. O progresso fica salvo neste navegador.' },
  { id: 'fluxo', label: 'Fluxo de sinal', icon: Waypoints, intro: 'O caminho da imagem, da câmera ao público.' },
  { id: 'diagnostico', label: 'Diagnóstico', icon: Stethoscope, intro: 'Escolha o problema e responda às perguntas em ordem.' },
  { id: 'procedimentos', label: 'Procedimentos', icon: ListOrdered, intro: 'Passo a passo resumido de cada tarefa.' },
  { id: 'glossario', label: 'Glossário', icon: BookOpen, intro: 'Termos técnicos explicados de forma simples.' },
]

interface Props {
  tab: string
  onTab: (tab: string) => void
  onExit: () => void
}

/** Consulta rápida: procedimentos sem precisar percorrer os slides. */
export function QuickReference({ tab, onTab, onExit }: Props) {
  const current = TABS.find((t) => t.id === tab) ?? TABS[0]

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const i = TABS.findIndex((t) => t.id === current.id)
    const next = TABS[(i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length]
    onTab(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  return (
    <div className="min-h-full bg-ink-950">
      <header className="sticky top-0 z-20 border-b border-ink-800 bg-ink-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <AlmaWordmark withChurch={false} />
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-2 rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-ink-200 hover:border-accent hover:text-ink-100"
          >
            <Presentation className="size-4" />
            <span className="hidden sm:inline">Voltar à apresentação</span>
            <span className="sm:hidden">Slides</span>
          </button>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <div role="tablist" aria-label="Seções da consulta rápida" onKeyDown={onKeyDown} className="scrollbar-thin -mb-px flex gap-1 overflow-x-auto">
            {TABS.map((t) => {
              const Icon = t.icon
              const on = t.id === current.id
              return (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => onTab(t.id)}
                  className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-sm whitespace-nowrap transition-colors ${
                    on ? 'border-accent text-ink-100' : 'border-transparent text-ink-400 hover:text-ink-200'
                  }`}
                >
                  <Icon className="size-4" /> {t.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <main id={`panel-${current.id}`} role="tabpanel" aria-labelledby={`tab-${current.id}`} className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        <p className="font-mono text-xs tracking-widest text-accent uppercase">Consulta rápida</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink-100 md:text-4xl">{current.label}</h1>
        <p className="mt-1 mb-6 text-sm text-ink-400 md:text-base">{current.intro}</p>

        <div key={current.id} className="animate-fade-in">
          {current.id === 'checklist' && <Checklist groups={OPERATIONAL} storageKey="alma-checklist-operacional" />}
          {current.id === 'fluxo' && <FlowTab />}
          {current.id === 'diagnostico' && <DiagnosticSimulator />}
          {current.id === 'procedimentos' && <ProceduresTab />}
          {current.id === 'glossario' && <GlossaryTab />}
        </div>
      </main>
    </div>
  )
}

function FlowTab() {
  return (
    <div className="space-y-8">
      <SignalFlow />
      <section>
        <h2 className="mb-3 text-lg font-semibold text-ink-100">Ligação física</h2>
        <div className="rounded-2xl border border-ink-700 bg-ink-900 p-4 md:p-6">
          <AtemWiring />
        </div>
      </section>
      <Callout tone="dica" title="Fluxo de referência">
        Confirme a ligação real conforme o modelo da ATEM Mini e a estrutura da igreja.
      </Callout>
    </div>
  )
}

function ProceduresTab() {
  const [open, setOpen] = useState<string | null>(PROCEDURES[0].id)
  return (
    <div className="space-y-2">
      {PROCEDURES.map((p, i) => {
        const on = open === p.id
        return (
          <section key={p.id} className={`rounded-xl border ${on ? 'border-ink-600 bg-ink-900' : 'border-ink-800 bg-ink-900/60'}`}>
            <h2>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`proc-${p.id}`}
                onClick={() => setOpen(on ? null : p.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
              >
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 font-semibold text-ink-100 md:text-lg">{p.title}</span>
                <span className="hidden font-mono text-xs text-ink-500 sm:inline">slide {p.slide}</span>
                <ChevronDown className={`size-5 text-ink-400 transition-transform ${on ? 'rotate-180' : ''}`} />
              </button>
            </h2>
            {on && (
              <div id={`proc-${p.id}`} className="animate-fade-in space-y-3 px-4 pb-4">
                <ol className="space-y-2">
                  {p.steps.map((s, j) => (
                    <li key={j} className="flex gap-3 text-sm text-ink-200 md:text-base">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink-800 font-mono text-xs text-accent">{j + 1}</span>
                      <span className="pt-0.5">{s}</span>
                    </li>
                  ))}
                </ol>
                {p.warn && <Callout tone="alerta">{p.warn}</Callout>}
                {p.tip && <Callout tone="dica">{p.tip}</Callout>}
                <p className="font-mono text-xs text-ink-500">Explicação completa no slide {p.slide}.</p>
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function GlossaryTab() {
  const [query, setQuery] = useState('')
  const q = normalize(query.trim())
  const items = GLOSSARY.filter((g) => !q || normalize(`${g.term} ${g.short} ${g.detail}`).includes(q))
  return (
    <div>
      <label className="relative mb-5 block">
        <span className="sr-only">Buscar termo</span>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar termo (ex.: bitrate)"
          className="w-full rounded-xl border border-ink-600 bg-ink-900 py-2.5 pr-3 pl-9 text-ink-100 placeholder:text-ink-500 focus:border-accent focus:outline-none"
        />
      </label>
      {items.length === 0 ? (
        <p className="text-ink-400">Nenhum termo encontrado para “{query}”.</p>
      ) : (
        <dl className="grid gap-3 md:grid-cols-2">
          {items.map((g) => (
            <div key={g.term} className="rounded-xl border border-ink-700 bg-ink-900 p-4">
              <dt className="font-semibold text-ink-100 md:text-lg">{g.term}</dt>
              <dd className="mt-1 text-sm font-medium text-accent">{g.short}</dd>
              <dd className="mt-2 text-sm leading-relaxed text-ink-300">{g.detail}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
