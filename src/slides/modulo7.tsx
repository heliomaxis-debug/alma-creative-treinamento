import { useEffect, useState } from 'react'
import { Pause, Play, RotateCcw, Users } from 'lucide-react'
import { AlmaWordmark, LogoLockup, Tagline } from '../components/brand/Brand'
import { Quiz } from '../components/interactive/Quiz'
import { Callout } from '../components/ui/Callout'
import { SlideFrame } from '../components/ui/SlideFrame'
import { Steps } from '../components/ui/Steps'
import { QUIZ } from '../data/quiz'
import type { SlideDef } from '../lib/types'

const DEFAULT_MIN = 20

/** Cronômetro regressivo simples para a prática. */
function Timer() {
  const [minutes, setMinutes] = useState(DEFAULT_MIN)
  const [left, setLeft] = useState(DEFAULT_MIN * 60)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          setRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [running])

  const reset = (m = minutes) => {
    setRunning(false)
    setLeft(m * 60)
  }
  const setPreset = (m: number) => {
    setMinutes(m)
    reset(m)
  }

  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  const over = left === 0

  return (
    <div className="rounded-2xl border border-ink-700 bg-ink-900 p-4 md:p-6">
      <p className="font-mono text-xs tracking-widest text-ink-400 uppercase md:text-sm">Tempo da prática</p>
      <p className={`mt-2 font-mono text-5xl font-semibold tabular-nums md:text-[88px] md:leading-none ${over ? 'text-live' : running ? 'text-accent' : 'text-ink-100'}`} aria-live="polite">
        {mm}:{ss}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          disabled={over}
          className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 font-semibold text-ink-950 hover:brightness-110 disabled:opacity-40 md:text-lg"
        >
          {running ? <Pause className="size-5" /> : <Play className="size-5" />}
          {running ? 'Pausar' : 'Iniciar'}
        </button>
        <button type="button" onClick={() => reset()} className="flex items-center gap-2 rounded-xl border border-ink-600 px-4 py-2 text-ink-200 hover:border-ink-400 md:text-lg">
          <RotateCcw className="size-5" /> Zerar
        </button>
      </div>
      <div className="mt-3 flex gap-1.5">
        {[10, 15, 20, 30].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setPreset(m)}
            aria-pressed={minutes === m}
            className={`rounded-lg border px-2.5 py-1 font-mono text-xs md:text-sm ${minutes === m ? 'border-accent text-accent' : 'border-ink-600 text-ink-300 hover:border-ink-400'}`}
          >
            {m} min
          </button>
        ))}
      </div>
    </div>
  )
}

function Desafio() {
  return (
    <SlideFrame title="Desafio prático" lead="Em dupla: um opera, o outro confere. Depois, invertam.">
      <div className="grid gap-5 md:grid-cols-[1.35fr_1fr] md:gap-10">
        <div>
          <p className="mb-3 flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase md:text-sm">
            <Users className="size-4" /> Missão da dupla
          </p>
          <Steps
            columns={2}
            items={[
              'Conectar a ATEM Mini',
              'Abrir o OBS',
              'Selecionar a fonte correta',
              'Conferir imagem e áudio',
              'Criar uma transmissão de teste',
              'Enviar o sinal',
              'Conferir a recepção no YouTube Studio',
              'Encerrar corretamente a transmissão de teste',
            ]}
          />
        </div>
        <div className="space-y-4">
          <Timer />
          <Callout tone="alerta" title="Teste privado ou não listado">
            Use a visibilidade definida pela política da igreja e confirme que não há público recebendo o teste indevidamente.
          </Callout>
        </div>
      </div>
    </SlideFrame>
  )
}

function Avaliacao() {
  return (
    <SlideFrame title="Avaliação rápida" lead="Responda e veja a explicação de cada questão.">
      <Quiz questions={QUIZ} />
    </SlideFrame>
  )
}

function Encerramento() {
  return (
    <div className="relative flex h-full min-h-[calc(100dvh-110px)] w-full flex-col justify-between gap-8 overflow-hidden bg-ink-950 px-8 py-12 md:min-h-0 md:gap-0 md:px-24 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)]" />
      <div className="pointer-events-none absolute top-6 left-6 h-10 w-10 border-t-[3px] border-l-[3px] border-accent md:top-10 md:left-10 md:h-14 md:w-14" />
      <div className="pointer-events-none absolute top-6 right-6 h-10 w-10 border-t-[3px] border-r-[3px] border-accent md:top-10 md:right-10 md:h-14 md:w-14" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 border-b-[3px] border-l-[3px] border-accent md:bottom-10 md:left-10 md:h-14 md:w-14" />
      <div className="pointer-events-none absolute right-6 bottom-6 h-10 w-10 border-r-[3px] border-b-[3px] border-accent md:right-10 md:bottom-10 md:h-14 md:w-14" />

      <div className="relative flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-ink-300 uppercase md:text-sm">
        <span className="size-2.5 rounded-full bg-accent" /> Fim do treinamento
      </div>

      <div className="relative grid items-center gap-8 md:grid-cols-[1fr_320px]">
        <div className="stagger">
          <h1 className="text-4xl leading-[1] font-bold tracking-tight text-ink-100 md:text-[100px]">
            EXCELÊNCIA
            <br />
            TAMBÉM É <span className="text-accent">SERVIR BEM.</span>
          </h1>
          <p className="mt-6 max-w-[950px] text-lg leading-relaxed text-ink-300 md:mt-10 md:text-[32px]">
            “Cada detalhe técnico contribui para que a mensagem chegue com clareza a quem está do outro lado da tela.”
          </p>
        </div>
        <div className="hidden justify-center md:flex">
          <LogoLockup className="h-[300px] w-[300px]" />
        </div>
      </div>

      <div className="relative flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <AlmaWordmark size="lg" />
        <Tagline />
      </div>
    </div>
  )
}

export const modulo7: SlideDef[] = [
  {
    id: 'desafio',
    module: 7,
    title: 'Desafio prático',
    Component: Desafio,
    notes: {
      tempo: '20 a 30 min',
      roteiro: [
        'Forme duplas misturando quem tem mais e menos experiência.',
        'Um opera e o outro confere com o checklist; depois invertam os papéis.',
        'Inicie o cronômetro e circule entre as duplas, sem fazer por elas.',
      ],
      demonstracao: ['Deixe preparada uma transmissão de teste privada ou não listada, criada por quem tem autorização no canal.'],
      perguntas: ['Ao final: o que foi mais difícil? Em que etapa vocês travaram?'],
      atencao: 'Confirme a visibilidade do teste antes de começar e não exiba a chave de transmissão no telão.',
    },
  },
  {
    id: 'avaliacao',
    module: 7,
    title: 'Avaliação rápida',
    Component: Avaliacao,
    notes: {
      tempo: '8 min',
      roteiro: [
        'Leia cada pergunta em voz alta e deixe o grupo votar antes de clicar.',
        'Depois de responder, leia a explicação e conecte com o slide correspondente.',
        'No resultado, use “Refazer” se quiser repetir com outro grupo.',
      ],
      perguntas: ['Alguém quer explicar com as próprias palavras por que errou ou acertou?'],
    },
  },
  {
    id: 'encerramento',
    module: 7,
    title: 'Encerramento',
    Component: Encerramento,
    notes: {
      tempo: '3 min',
      roteiro: [
        'Agradeça a disponibilidade de cada voluntário.',
        'Retome o propósito: a técnica serve à mensagem.',
        'Mostre onde fica a consulta rápida (tecla C) para usarem nos cultos.',
      ],
      perguntas: ['Quem já pode entrar na escala acompanhando alguém mais experiente?'],
      atencao: 'Combine os próximos passos: escala, acompanhamento e canal para dúvidas.',
    },
  },
]
