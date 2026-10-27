import { useCallback, useEffect, useRef, useState } from 'react'
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Maximize,
  Menu,
  Minimize,
  NotebookPen,
  Presentation as PresentationIcon,
  RotateCcw,
  X,
} from 'lucide-react'
import { AlmaWordmark } from '../components/brand/Brand'
import { HelpOverlay } from '../components/presentation/HelpOverlay'
import { ModuleMenu } from '../components/presentation/ModuleMenu'
import { NotesView } from '../components/presentation/NotesView'
import { Stage } from '../components/presentation/Stage'
import { MODULES } from '../data/modules'
import { useFullscreen } from '../hooks/useFullscreen'
import { useKeyboard } from '../hooks/useKeyboard'
import { useSlideSync } from '../lib/sync'
import { SLIDES, TOTAL, clampIndex } from '../slides'

interface Props {
  index: number
  onGo: (index: number, replace?: boolean) => void
  onConsulta: () => void
}

export function openInstructorWindow() {
  window.open(`${window.location.pathname}#/instrutor`, 'alma-instrutor', 'width=1400,height=900')
}

function IconButton({ label, onClick, children, active }: { label: string; onClick: () => void; children: React.ReactNode; active?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={`grid size-9 place-items-center rounded-lg transition-colors md:size-10 ${active ? 'bg-accent text-ink-950' : 'text-ink-300 hover:bg-ink-700 hover:text-ink-100'}`}
    >
      {children}
    </button>
  )
}

/** Tela principal: os slides, com navegação, progresso e painéis. */
export function Presentation({ index, onGo, onConsulta }: Props) {
  const i = clampIndex(index)
  const slide = SLIDES[i]
  const [menuOpen, setMenuOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [blackout, setBlackout] = useState(false)
  const [chromeVisible, setChromeVisible] = useState(true)
  const hideTimer = useRef<number>()
  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

  const post = useSlideSync((msg) => {
    if (msg.type === 'goto' && msg.index !== i) onGo(msg.index, true)
    if (msg.type === 'blackout') setBlackout(msg.on)
    if (msg.type === 'hello') post({ type: 'goto', index: i })
  })

  // Avisa o modo instrutor (em outra janela) sempre que o slide muda.
  useEffect(() => {
    post({ type: 'goto', index: i })
    document.title = `${i + 1}/${TOTAL} · ${slide.title} · Alma Creative`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i])

  const go = useCallback((n: number) => onGo(clampIndex(n)), [onGo])
  const next = () => go(i + 1)
  const prev = () => go(i - 1)
  const restart = () => go(0)
  const toggleBlackout = () => {
    setBlackout((b) => {
      post({ type: 'blackout', on: !b })
      return !b
    })
  }

  // Em tela cheia, a barra some sozinha e volta ao mexer o mouse.
  const revealChrome = useCallback(() => {
    setChromeVisible(true)
    window.clearTimeout(hideTimer.current)
    if (document.fullscreenElement) hideTimer.current = window.setTimeout(() => setChromeVisible(false), 2500)
  }, [])
  useEffect(() => {
    revealChrome()
    return () => window.clearTimeout(hideTimer.current)
  }, [isFullscreen, revealChrome])

  const anyPanel = menuOpen || helpOpen
  useKeyboard({
    ArrowRight: next,
    ArrowDown: next,
    PageDown: next,
    ' ': next,
    ArrowLeft: prev,
    ArrowUp: prev,
    PageUp: prev,
    Home: restart,
    End: () => go(TOTAL - 1),
    f: toggleFullscreen,
    n: () => setNotesOpen((v) => !v),
    m: () => setMenuOpen((v) => !v),
    b: toggleBlackout,
    r: restart,
    c: onConsulta,
    i: openInstructorWindow,
    '?': () => setHelpOpen((v) => !v),
    Escape: () => {
      setMenuOpen(false)
      setHelpOpen(false)
      setBlackout(false)
    },
  }, !anyPanel || true)

  const showChrome = !isFullscreen || chromeVisible
  const module = MODULES[slide.module - 1]

  return (
    <div className="flex h-dvh flex-col bg-ink-950" onMouseMove={isFullscreen ? revealChrome : undefined}>
      {/* Barra superior */}
      <header
        className={`z-20 flex items-center gap-2 border-b border-ink-800 bg-ink-950/95 px-2 py-1.5 transition-all duration-300 md:px-4 ${
          isFullscreen ? `absolute inset-x-0 top-0 ${showChrome ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}` : ''
        }`}
      >
        <IconButton label="Menu de módulos (M)" onClick={() => setMenuOpen(true)}>
          <Menu className="size-5" />
        </IconButton>
        <AlmaWordmark withChurch={false} className="hidden sm:flex" />
        <span className="ml-2 hidden truncate text-sm text-ink-400 lg:block">
          Módulo {module.n} · {module.title}
        </span>
        <div className="ml-auto flex items-center gap-0.5">
          <button
            type="button"
            onClick={onConsulta}
            className="mr-1 hidden items-center gap-2 rounded-lg border border-ink-700 px-3 py-1.5 text-sm text-ink-200 hover:border-accent sm:flex"
          >
            <BookOpen className="size-4 text-accent" /> Consulta rápida
          </button>
          <IconButton label="Consulta rápida (C)" onClick={onConsulta}>
            <BookOpen className="size-5 sm:hidden" />
            <span className="hidden" />
          </IconButton>
          <IconButton label="Modo instrutor em outra janela (I)" onClick={openInstructorWindow}>
            <PresentationIcon className="size-5" />
          </IconButton>
          <IconButton label="Notas do apresentador (N)" onClick={() => setNotesOpen((v) => !v)} active={notesOpen}>
            <NotebookPen className="size-5" />
          </IconButton>
          <IconButton label="Atalhos de teclado (?)" onClick={() => setHelpOpen(true)}>
            <CircleHelp className="size-5" />
          </IconButton>
          <IconButton label={isFullscreen ? 'Sair da tela cheia (F)' : 'Tela cheia (F)'} onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
          </IconButton>
        </div>
      </header>

      {/* Palco */}
      <main className="relative min-h-0 flex-1">
        <Stage index={i} />
        {blackout && (
          <button type="button" onClick={toggleBlackout} className="absolute inset-0 z-10 cursor-default bg-black" aria-label="Tela preta ativa. Clique ou tecle B para voltar." />
        )}
      </main>

      {/* Notas */}
      {notesOpen && (
        <aside className="scrollbar-thin relative max-h-[38vh] animate-fade-in overflow-y-auto border-t border-ink-700 bg-ink-900 px-4 py-4 md:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-xs tracking-widest text-accent uppercase">
                Notas do apresentador · {i + 1}. {slide.title}
              </p>
              <button type="button" onClick={() => setNotesOpen(false)} aria-label="Fechar notas" className="rounded-lg p-1 text-ink-400 hover:bg-ink-700 hover:text-ink-100">
                <X className="size-4" />
              </button>
            </div>
            <NotesView notes={slide.notes} />
          </div>
        </aside>
      )}

      {/* Barra inferior */}
      <footer
        className={`z-20 border-t border-ink-800 bg-ink-950/95 transition-all duration-300 ${
          isFullscreen ? `absolute inset-x-0 bottom-0 ${showChrome ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}` : ''
        }`}
      >
        <div className="flex h-1 w-full gap-px bg-ink-900" role="progressbar" aria-valuemin={1} aria-valuemax={TOTAL} aria-valuenow={i + 1} aria-label="Progresso da apresentação">
          {SLIDES.map((s, n) => (
            <button
              key={s.id}
              type="button"
              tabIndex={-1}
              onClick={() => go(n)}
              title={`${n + 1}. ${s.title}`}
              className={`h-full flex-1 transition-colors ${n <= i ? 'bg-accent' : 'bg-ink-700 hover:bg-ink-500'} ${
                SLIDES[n + 1] && SLIDES[n + 1].module !== s.module ? 'mr-1' : ''
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 px-2 py-1.5 md:px-4">
          <IconButton label="Reiniciar apresentação (R)" onClick={restart}>
            <RotateCcw className="size-4.5" />
          </IconButton>
          <span className="hidden truncate text-sm text-ink-300 md:block">{slide.title}</span>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={i === 0}
              className="flex items-center gap-1 rounded-lg border border-ink-700 px-3 py-1.5 text-sm text-ink-200 hover:border-ink-400 disabled:opacity-35"
            >
              <ChevronLeft className="size-4" /> <span className="hidden sm:inline">Voltar</span>
            </button>
            <span className="min-w-16 text-center font-mono text-sm text-ink-200" aria-live="polite">
              {String(i + 1).padStart(2, '0')} / {TOTAL}
            </span>
            <button
              type="button"
              onClick={next}
              disabled={i === TOTAL - 1}
              className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-ink-950 hover:brightness-110 disabled:opacity-35"
            >
              <span className="hidden sm:inline">Avançar</span> <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </footer>

      {menuOpen && (
        <ModuleMenu
          current={i}
          onGo={(n) => {
            go(n)
            setMenuOpen(false)
          }}
          onClose={() => setMenuOpen(false)}
          onConsulta={onConsulta}
          onInstrutor={() => {
            setMenuOpen(false)
            openInstructorWindow()
          }}
        />
      )}
      {helpOpen && <HelpOverlay onClose={() => setHelpOpen(false)} />}
    </div>
  )
}
