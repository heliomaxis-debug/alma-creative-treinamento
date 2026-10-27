import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, ListChecks, MonitorOff, Pause, Play, Printer, RotateCcw, TimerReset } from 'lucide-react'
import { AlmaWordmark } from '../components/brand/Brand'
import { NotesView } from '../components/presentation/NotesView'
import { Stage } from '../components/presentation/Stage'
import { MODULES } from '../data/modules'
import { useKeyboard } from '../hooks/useKeyboard'
import { useSlideSync } from '../lib/sync'
import { useLocalStorage } from '../lib/storage'
import { SLIDES, TOTAL, clampIndex } from '../slides'

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

/** Cronômetro da aula. */
function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [running])
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-2xl text-ink-100 tabular-nums">{fmt(seconds)}</span>
      <button type="button" onClick={() => setRunning((r) => !r)} aria-label={running ? 'Pausar cronômetro' : 'Iniciar cronômetro'} className="rounded-lg border border-ink-600 p-1.5 text-ink-200 hover:border-ink-400">
        {running ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
      <button type="button" onClick={() => setSeconds(0)} aria-label="Zerar cronômetro" className="rounded-lg border border-ink-600 p-1.5 text-ink-200 hover:border-ink-400">
        <TimerReset className="size-4" />
      </button>
    </div>
  )
}

/** Todas as notas em uma lista, para revisar antes da aula ou imprimir. */
function AllNotes({ onGo }: { onGo: (i: number) => void }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 print:max-w-none print:p-0">
      {MODULES.map((m) => (
        <section key={m.n} className="mb-8 break-inside-avoid-page">
          <h2 className="mb-3 border-b border-ink-700 pb-2 text-xl font-semibold text-ink-100 print:text-black">
            Módulo {m.n} — {m.title}
          </h2>
          {SLIDES.map((s, i) =>
            s.module === m.n ? (
              <article key={s.id} className="mb-5 break-inside-avoid rounded-xl border border-ink-700 bg-ink-900 p-4 print:border-gray-300 print:bg-white">
                <button type="button" onClick={() => onGo(i)} className="mb-2 text-left font-semibold text-accent hover:underline print:text-black">
                  {i + 1}. {s.title}
                </button>
                <NotesView notes={s.notes} />
              </article>
            ) : null,
          )}
        </section>
      ))}
    </div>
  )
}

/**
 * Modo instrutor: slide atual, próximo slide, notas e cronômetro.
 * Abra em outra janela: ela fica sincronizada com a apresentação no telão.
 */
export function InstructorMode() {
  const [index, setIndex] = useLocalStorage('alma-instrutor-slide', 0)
  const [view, setView] = useState<'aula' | 'notas'>('aula')
  const [blackout, setBlackout] = useState(false)
  const i = clampIndex(index)
  const slide = SLIDES[i]

  const post = useSlideSync((msg) => {
    if (msg.type === 'goto') setIndex(msg.index)
    if (msg.type === 'blackout') setBlackout(msg.on)
  })

  const go = (n: number) => {
    const target = clampIndex(n)
    setIndex(target)
    post({ type: 'goto', index: target })
  }

  useEffect(() => {
    document.title = `Instrutor · ${i + 1}/${TOTAL} · Alma Creative`
  }, [i])

  // Ao abrir, pergunta ao telão (se estiver aberto) em qual slide ele está.
  useEffect(() => {
    post({ type: 'hello' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useKeyboard({
    ArrowRight: () => go(i + 1),
    PageDown: () => go(i + 1),
    ' ': () => go(i + 1),
    ArrowLeft: () => go(i - 1),
    PageUp: () => go(i - 1),
    Home: () => go(0),
    End: () => go(TOTAL - 1),
    b: () => {
      post({ type: 'blackout', on: !blackout })
      setBlackout(!blackout)
    },
  })

  const openScreen = () => window.open(`${window.location.pathname}#/slide/${i + 1}`, 'alma-telao')

  return (
    <div className="flex min-h-dvh flex-col bg-ink-950 lg:h-dvh">
      <header className="flex flex-wrap items-center gap-3 border-b border-ink-800 px-4 py-2 print:hidden">
        <AlmaWordmark withChurch={false} />
        <span className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-xs tracking-widest text-accent uppercase">Modo instrutor</span>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Timer />
          <button
            type="button"
            onClick={() => setView(view === 'aula' ? 'notas' : 'aula')}
            className="flex items-center gap-2 rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-ink-200 hover:border-accent"
          >
            <ListChecks className="size-4" /> {view === 'aula' ? 'Todas as notas' : 'Voltar à aula'}
          </button>
          {view === 'notas' && (
            <button type="button" onClick={() => window.print()} className="flex items-center gap-2 rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-ink-200 hover:border-accent">
              <Printer className="size-4" /> Imprimir
            </button>
          )}
          <button type="button" onClick={openScreen} className="flex items-center gap-2 rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-ink-950 hover:brightness-110">
            <ExternalLink className="size-4" /> Abrir telão
          </button>
        </div>
      </header>

      {view === 'notas' ? (
        <div className="scrollbar-thin flex-1 overflow-y-auto">
          <AllNotes
            onGo={(n) => {
              go(n)
              setView('aula')
            }}
          />
        </div>
      ) : (
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(340px,1fr)]">
          <div className="flex min-h-0 min-w-0 flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs tracking-widest text-ink-400 uppercase">
                Agora · {i + 1}/{TOTAL} · {slide.title}
              </p>
              {blackout && (
                <span className="flex items-center gap-1.5 rounded bg-live px-2 py-0.5 text-xs font-semibold text-white">
                  <MonitorOff className="size-3.5" /> Telão em preto (B)
                </span>
              )}
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-ink-700 lg:aspect-auto lg:min-h-0 lg:flex-1">
              <Stage index={i} fluid={false} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => go(i - 1)} disabled={i === 0} className="flex items-center gap-1 rounded-lg border border-ink-600 px-4 py-2 text-ink-200 hover:border-ink-400 disabled:opacity-35">
                <ChevronLeft className="size-5" /> Voltar
              </button>
              <button type="button" onClick={() => go(i + 1)} disabled={i === TOTAL - 1} className="flex items-center gap-1 rounded-lg bg-accent px-4 py-2 font-semibold text-ink-950 hover:brightness-110 disabled:opacity-35">
                Avançar <ChevronRight className="size-5" />
              </button>
              <button type="button" onClick={() => go(0)} className="ml-1 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-ink-300 hover:bg-ink-800" title="Reiniciar">
                <RotateCcw className="size-4" /> Reiniciar
              </button>
              <select
                value={i}
                onChange={(e) => go(Number(e.target.value))}
                aria-label="Ir para o slide"
                className="ml-auto max-w-[45%] rounded-lg border border-ink-600 bg-ink-850 px-2 py-2 text-sm text-ink-100"
              >
                {SLIDES.map((s, n) => (
                  <option key={s.id} value={n}>
                    {n + 1}. {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <aside className="flex min-h-0 min-w-0 flex-col gap-4">
            <div>
              <p className="mb-2 font-mono text-xs tracking-widest text-ink-400 uppercase">Próximo</p>
              {i < TOTAL - 1 ? (
                <button type="button" onClick={() => go(i + 1)} className="block aspect-video w-full overflow-hidden rounded-lg border border-ink-700 opacity-80 hover:opacity-100">
                  <span className="pointer-events-none block h-full w-full">
                    <Stage index={i + 1} fluid={false} />
                  </span>
                </button>
              ) : (
                <p className="rounded-lg border border-ink-700 p-4 text-sm text-ink-400">Último slide.</p>
              )}
            </div>
            <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto rounded-xl border border-ink-700 bg-ink-900 p-4">
              <p className="mb-3 text-lg font-semibold text-ink-100">{slide.title}</p>
              <NotesView notes={slide.notes} size="md" />
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
