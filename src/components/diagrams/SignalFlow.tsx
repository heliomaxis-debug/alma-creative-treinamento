import { Fragment, useState } from 'react'
import { Clapperboard, Laptop, SlidersHorizontal, Users, Video, Youtube, type LucideIcon } from 'lucide-react'

export interface FlowNode {
  key: string
  label: string
  icon: LucideIcon
  role: string
  detail: string
  /** Rótulo da ligação até o próximo nó. */
  link?: string
}

export const FLOW_NODES: FlowNode[] = [
  {
    key: 'cameras',
    label: 'Câmeras',
    icon: Video,
    role: 'Captam a imagem',
    detail: 'Cada câmera gera um sinal de vídeo. A quantidade depende da estrutura disponível no culto.',
    link: 'HDMI',
  },
  {
    key: 'atem',
    label: 'ATEM Mini',
    icon: SlidersHorizontal,
    role: 'Escolhe a câmera',
    detail: 'Recebe as câmeras, permite alternar entre elas e envia o sinal escolhido ao computador.',
    link: 'USB',
  },
  {
    key: 'pc',
    label: 'Computador',
    icon: Laptop,
    role: 'Recebe o sinal',
    detail: 'Reconhece a ATEM Mini como se fosse uma webcam e roda o OBS Studio.',
    link: 'software',
  },
  {
    key: 'obs',
    label: 'OBS Studio',
    icon: Clapperboard,
    role: 'Organiza e envia',
    detail: 'Monta as cenas (vídeo, áudio, avisos) e envia a transmissão ao YouTube.',
    link: 'internet',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    icon: Youtube,
    role: 'Distribui a live',
    detail: 'Recebe o sinal, mostra a prévia no YouTube Studio e publica para o público.',
    link: 'live',
  },
  {
    key: 'publico',
    label: 'Público',
    icon: Users,
    role: 'Assiste de casa',
    detail: 'Pessoas que não puderam estar presentes acompanham o culto.',
  },
]

interface Props {
  /** Chaves dos nós a exibir (padrão: todos). */
  only?: string[]
  interactive?: boolean
  className?: string
}

/** Diagrama do caminho do sinal, da câmera ao público. */
export function SignalFlow({ only, interactive = true, className = '' }: Props) {
  const nodes = only ? FLOW_NODES.filter((n) => only.includes(n.key)) : FLOW_NODES
  const [active, setActive] = useState<string | null>(interactive ? nodes[0].key : null)
  const current = nodes.find((n) => n.key === active)

  return (
    <div className={className}>
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-0">
        {nodes.map((node, i) => {
          const Icon = node.icon
          const isActive = node.key === active
          return (
            <Fragment key={node.key}>
              <button
                type="button"
                disabled={!interactive}
                onClick={() => setActive(node.key)}
                aria-pressed={isActive}
                className={`group flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors md:w-[190px] md:flex-col md:gap-3 md:p-5 md:text-center ${
                  isActive ? 'border-accent bg-accent-soft' : 'border-ink-700 bg-ink-900 enabled:hover:border-ink-500'
                } disabled:cursor-default`}
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl md:size-16 ${
                    isActive ? 'bg-accent text-ink-950' : 'bg-ink-800 text-ink-100'
                  }`}
                >
                  <Icon className="size-5 md:size-8" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink-100 md:text-[21px]">{node.label}</span>
                  <span className="block text-xs text-ink-400 md:mt-1 md:text-base">{node.role}</span>
                </span>
              </button>
              {i < nodes.length - 1 && (
                <div className="flex items-center justify-center gap-2 md:flex-1 md:flex-col md:gap-1">
                  <span className="font-mono text-[10px] tracking-wider text-ink-400 uppercase md:text-xs">{node.link}</span>
                  <svg className="h-6 w-4 rotate-90 md:h-4 md:w-full md:rotate-0" preserveAspectRatio="none" viewBox="0 0 100 16" aria-hidden="true">
                    <line
                      x1="0"
                      y1="8"
                      x2="92"
                      y2="8"
                      stroke="var(--color-accent)"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      className="animate-dash"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path d="M90 3 L100 8 L90 13" fill="none" stroke="var(--color-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              )}
            </Fragment>
          )
        })}
      </div>
      {interactive && current && (
        <div key={current.key} className="mt-5 animate-fade-in rounded-xl border border-ink-700 bg-ink-900 p-4 md:mt-8 md:p-6">
          <p className="font-mono text-xs tracking-widest text-accent uppercase md:text-sm">{current.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-200 md:text-[22px]">{current.detail}</p>
        </div>
      )}
    </div>
  )
}
