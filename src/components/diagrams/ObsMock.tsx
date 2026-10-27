import type { ReactNode } from 'react'
import { CameraFeed } from './WindowMock'

export type ObsRegion = 'preview' | 'cenas' | 'fontes' | 'mixer' | 'transicoes' | 'controles'

export const OBS_REGIONS: { key: ObsRegion; n: number; label: string; text: string }[] = [
  { key: 'preview', n: 1, label: 'Pré-visualização', text: 'Mostra exatamente o que vai para a live. Se aqui está preto, a live também estará.' },
  { key: 'cenas', n: 2, label: 'Cenas', text: 'Cada cena é uma "tela pronta" (ex.: Aguardando, Câmera principal). Clique para trocar.' },
  { key: 'fontes', n: 3, label: 'Fontes', text: 'Os ingredientes de uma cena: a ATEM Mini, uma imagem, um texto, um áudio.' },
  { key: 'mixer', n: 4, label: 'Mixer de áudio', text: 'Medidores e volume de cada fonte de áudio. Fique de olho nele durante todo o culto.' },
  { key: 'transicoes', n: 5, label: 'Transições de cena', text: 'Como uma cena passa para outra no OBS (corte ou desvanecimento).' },
  { key: 'controles', n: 6, label: 'Controles', text: 'Iniciar transmissão, iniciar gravação e acesso às Configurações.' },
]

interface Props {
  highlight?: ObsRegion | null
  onSelect?: (r: ObsRegion) => void
  numbered?: boolean
  scenes?: string[]
  activeScene?: number
  sources?: string[]
  feedLabel?: string
  dark?: boolean
  streaming?: boolean
  /** Conteúdo extra sobre a pré-visualização (ex.: janela de diálogo). */
  overlay?: ReactNode
}

type DockProps = { region: ObsRegion; title: string; children: ReactNode } & Pick<Props, 'highlight' | 'onSelect' | 'numbered'>

function Dock({ region, title, children, highlight, onSelect, numbered }: DockProps) {
  const n = OBS_REGIONS.find((r) => r.key === region)!.n
  const on = highlight === region
  const dim = highlight && !on
  return (
    <button
      type="button"
      onClick={() => onSelect?.(region)}
      disabled={!onSelect}
      className={`relative flex min-w-0 flex-col rounded-md border bg-ink-850 text-left transition-all disabled:cursor-default ${
        on ? 'border-accent ring-2 ring-accent/40' : 'border-ink-700'
      } ${dim ? 'opacity-40' : ''}`}
    >
      <span className="border-b border-ink-700 px-2 py-1 text-[9px] font-medium text-ink-300 md:text-[13px]">{title}</span>
      <span className="flex-1 overflow-hidden p-1.5 md:p-2">{children}</span>
      {numbered && (
        <span
          className={`absolute -top-2.5 -right-2 grid size-5 place-items-center rounded-full font-mono text-[10px] font-bold md:size-7 md:text-sm ${
            on ? 'bg-accent text-ink-950' : 'bg-ink-600 text-ink-100'
          }`}
        >
          {n}
        </span>
      )}
    </button>
  )
}

function Row({ children, active }: { children: ReactNode; active?: boolean }) {
  return <span className={`block truncate rounded px-1.5 py-0.5 text-[9px] md:text-[13px] ${active ? 'bg-ink-600 text-ink-100' : 'text-ink-300'}`}>{children}</span>
}

/**
 * Ilustração simplificada da janela principal do OBS Studio.
 * A disposição real pode mudar conforme a versão e o layout salvo no computador.
 */
export function ObsMock({
  highlight = null,
  onSelect,
  numbered = true,
  scenes = ['Aguardando o culto', 'Câmera principal', 'Câmera alternativa', 'Avisos', 'Encerramento'],
  activeScene = 1,
  sources = ['ATEM MINI', 'Logo Alma'],
  feedLabel = 'ATEM',
  dark = false,
  streaming = false,
  overlay,
}: Props) {
  const previewOn = highlight === 'preview'
  return (
    <div className="overflow-hidden rounded-xl border border-ink-600 bg-ink-900 shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-800 px-3 py-1.5">
        <span className="size-2 rounded-full bg-ink-500" />
        <span className="size-2 rounded-full bg-ink-500" />
        <span className="size-2 rounded-full bg-ink-500" />
        <span className="ml-2 font-mono text-[10px] text-ink-300 md:text-xs">OBS Studio</span>
      </div>
      <div className="p-2 md:p-3">
        <button
          type="button"
          onClick={() => onSelect?.('preview')}
          disabled={!onSelect}
          className={`relative mx-auto block aspect-video w-[78%] overflow-hidden rounded-md border transition-all disabled:cursor-default ${
            previewOn ? 'border-accent ring-2 ring-accent/40' : 'border-ink-700'
          } ${highlight && !previewOn ? 'opacity-40' : ''}`}
        >
          <CameraFeed label={feedLabel} dark={dark} />
          {streaming && (
            <span className="absolute top-2 right-2 flex items-center gap-1.5 rounded bg-live px-2 py-0.5 text-[10px] font-bold text-white md:text-xs">
              <span className="size-1.5 animate-pulse-dot rounded-full bg-white" /> AO VIVO
            </span>
          )}
          {numbered && (
            <span
              className={`absolute top-2 left-2 grid size-5 place-items-center rounded-full font-mono text-[10px] font-bold md:size-7 md:text-sm ${
                previewOn ? 'bg-accent text-ink-950' : 'bg-ink-600 text-ink-100'
              }`}
            >
              1
            </span>
          )}
          {overlay}
        </button>
        <div className="mt-2 grid h-[120px] grid-cols-5 gap-1.5 md:mt-3 md:h-[170px] md:gap-3">
          <Dock region="cenas" title="Cenas" highlight={highlight} onSelect={onSelect} numbered={numbered}>
            {scenes.map((s, i) => (
              <Row key={s} active={i === activeScene}>
                {s}
              </Row>
            ))}
          </Dock>
          <Dock region="fontes" title="Fontes" highlight={highlight} onSelect={onSelect} numbered={numbered}>
            {sources.map((s, i) => (
              <Row key={s} active={i === 0}>
                {s}
              </Row>
            ))}
          </Dock>
          <Dock region="mixer" title="Mixer de áudio" highlight={highlight} onSelect={onSelect} numbered={numbered}>
            {['ATEM MINI', 'Mic/Aux'].map((s, i) => (
              <span key={s} className="mb-1.5 block">
                <span className="block text-[8px] text-ink-400 md:text-[11px]">{s}</span>
                <span className="mt-0.5 block h-1.5 overflow-hidden rounded-sm bg-ink-700 md:h-2">
                  <span className="block h-full rounded-sm bg-gradient-to-r from-[#3fbf6a] via-[#3fbf6a] to-[#e2c044]" style={{ width: i === 0 ? '68%' : '0%' }} />
                </span>
              </span>
            ))}
          </Dock>
          <Dock region="transicoes" title="Transições de cena" highlight={highlight} onSelect={onSelect} numbered={numbered}>
            <Row active>Desvanecer</Row>
            <Row>Duração 300 ms</Row>
          </Dock>
          <Dock region="controles" title="Controles" highlight={highlight} onSelect={onSelect} numbered={numbered}>
            <span className={`mb-1 block rounded px-1 py-0.5 text-center text-[8px] md:text-[12px] ${streaming ? 'bg-live text-white' : 'bg-ink-600 text-ink-100'}`}>
              {streaming ? 'Parar transmissão' : 'Iniciar transmissão'}
            </span>
            <span className="mb-1 block rounded bg-ink-700 px-1 py-0.5 text-center text-[8px] text-ink-200 md:text-[12px]">Iniciar gravação</span>
            <span className="block rounded bg-ink-700 px-1 py-0.5 text-center text-[8px] text-ink-200 md:text-[12px]">Configurações</span>
          </Dock>
        </div>
      </div>
    </div>
  )
}
