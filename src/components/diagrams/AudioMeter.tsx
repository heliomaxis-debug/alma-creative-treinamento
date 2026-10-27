import { useEffect, useState } from 'react'

type Level = 'mudo' | 'baixo' | 'ideal' | 'clip'

const LEVELS: Record<Level, { label: string; base: number; spread: number; text: string; tone: string }> = {
  mudo: {
    label: 'Sem sinal',
    base: -60,
    spread: 0,
    text: 'Medidor parado: a fonte está muda, desconectada ou é o dispositivo errado. A imagem pode estar perfeita e mesmo assim a live estará sem som.',
    tone: 'text-live',
  },
  baixo: {
    label: 'Baixo',
    base: -38,
    spread: 5,
    text: 'O público vai precisar aumentar muito o volume. Peça ajuste na origem (mesa de som ou ATEM) antes de mexer no OBS.',
    tone: 'text-warn',
  },
  ideal: {
    label: 'Bom',
    base: -15,
    spread: 5,
    text: 'Na fala, os picos ficam na faixa amarela e nunca encostam no vermelho. Mantenha assim.',
    tone: 'text-ok',
  },
  clip: {
    label: 'Clipando',
    base: -3,
    spread: 3,
    text: 'Encostando no vermelho/0 dB: o som distorce e não dá para consertar depois. Reduza o ganho na origem.',
    tone: 'text-live',
  },
}

// Faixas de cor como no medidor do OBS: verde até -20 dB, amarelo até -9 dB, vermelho acima.
const toPct = (db: number) => Math.max(0, Math.min(100, ((db + 60) / 60) * 100))
const GREEN = toPct(-20)
const YELLOW = toPct(-9) - toPct(-20)

function Bands() {
  return (
    <>
      <span className="h-full shrink-0 bg-[#3fbf6a]" style={{ width: `${GREEN}%` }} />
      <span className="h-full shrink-0 bg-[#e2c044]" style={{ width: `${YELLOW}%` }} />
      <span className="h-full flex-1 bg-live" />
    </>
  )
}

/** Simulação do medidor de áudio do OBS, para treinar a leitura dos níveis. */
export function AudioMeter() {
  const [level, setLevel] = useState<Level>('ideal')
  const [db, setDb] = useState(LEVELS.ideal.base)
  const [peak, setPeak] = useState(LEVELS.ideal.base)

  useEffect(() => {
    const cfg = LEVELS[level]
    setPeak(cfg.base)
    const id = window.setInterval(() => {
      const v = Math.min(0, cfg.base + (Math.random() * 2 - 1) * cfg.spread)
      setDb(v)
      setPeak((p) => (v > p ? v : Math.max(v, p - 1.2)))
    }, 90)
    return () => window.clearInterval(id)
  }, [level])

  const cfg = LEVELS[level]
  const muted = level === 'mudo'
  return (
    <div className="rounded-2xl border border-ink-700 bg-ink-900 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs tracking-widest text-ink-400 uppercase md:text-sm">Mixer de áudio · simulação</p>
        <p className={`font-mono text-sm font-semibold md:text-lg ${cfg.tone}`}>{muted ? '−∞ dB' : `${db.toFixed(1)} dB`}</p>
      </div>
      <div className="mt-3 md:mt-4">
        <p className="mb-1.5 text-sm text-ink-200 md:text-lg">ATEM MINI</p>
        <div className="relative h-4 overflow-hidden rounded bg-ink-800 md:h-6">
          <div className="absolute inset-0 flex opacity-20">
            <Bands />
          </div>
          {/* Faixa colorida revelada até o nível atual */}
          <div className="absolute inset-0 flex transition-[clip-path] duration-75" style={{ clipPath: `inset(0 ${100 - (muted ? 0 : toPct(db))}% 0 0)` }}>
            <Bands />
          </div>
          {!muted && <span className="absolute inset-y-0 w-0.5 bg-ink-100" style={{ left: `${toPct(peak)}%` }} />}
        </div>
        <div className="mt-1 flex justify-between font-mono text-[10px] text-ink-500 md:text-xs">
          {[-60, -50, -40, -30, -20, -10, 0].map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {(Object.keys(LEVELS) as Level[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setLevel(k)}
            aria-pressed={level === k}
            className={`rounded-lg border px-3 py-1.5 text-xs md:text-base ${
              level === k ? 'border-accent bg-accent text-ink-950' : 'border-ink-600 bg-ink-800 text-ink-200 hover:border-ink-400'
            }`}
          >
            {LEVELS[k].label}
          </button>
        ))}
      </div>
      <p key={level} className="mt-3 animate-fade-in text-sm leading-relaxed text-ink-200 md:text-lg">
        {cfg.text}
      </p>
    </div>
  )
}
