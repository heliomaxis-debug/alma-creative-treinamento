import { useState } from 'react'

interface Hotspot {
  n: number
  label: string
  text: string
  side: 'frente' | 'traseira'
  warn?: boolean
}

const HOTSPOTS: Hotspot[] = [
  { n: 1, side: 'frente', label: 'Controles de áudio', text: 'Ligam/desligam o áudio de cada entrada e dos microfones e ajustam o nível. Mexa só com orientação de quem cuida do som.' },
  { n: 2, side: 'frente', label: 'Estilos de transição', text: 'Definem como uma câmera passa para outra (mistura, cortina etc.). O conjunto de efeitos varia conforme o modelo.' },
  { n: 3, side: 'frente', label: 'CUT e AUTO', text: 'CUT troca a imagem na hora. AUTO faz a troca usando a transição escolhida. Use conforme a direção do culto.' },
  { n: 4, side: 'frente', label: 'FTB (Fade to Black)', text: 'Escurece toda a saída. Se for apertado sem querer, a live fica preta. Aperte de novo para voltar.', warn: true },
  { n: 5, side: 'frente', label: 'Seleção das câmeras', text: 'Um botão para cada entrada HDMI. O botão aceso em vermelho indica a câmera que está saindo da ATEM.' },
  { n: 6, side: 'traseira', label: 'Entradas HDMI', text: 'Onde as câmeras são conectadas. ATEM Mini, Mini Pro e Pro ISO têm 4 entradas; os modelos Extreme têm 8.' },
  { n: 7, side: 'traseira', label: 'Entradas de microfone', text: 'Entradas P2 (3,5 mm) para microfone ou para o sinal da mesa de som, conforme a estrutura.' },
  { n: 8, side: 'traseira', label: 'USB-C para o computador', text: 'Leva imagem e áudio ao computador, que reconhece a ATEM como se fosse uma webcam.' },
  { n: 9, side: 'traseira', label: 'Saída HDMI', text: 'Para um monitor ou TV, quando aplicável. Nos modelos Pro e Extreme pode exibir a tela de multiview.' },
  { n: 10, side: 'traseira', label: 'Alimentação e rede', text: 'A alimentação é pela fonte própria da ATEM. A porta de rede serve para controle e, nos modelos Pro/Extreme, para transmissão direta.' },
]

function Pin({ n, x, y, active, warn, onSelect }: { n: number; x: number; y: number; active: boolean; warn?: boolean; onSelect: (n: number) => void }) {
  const fill = active ? 'var(--color-accent)' : warn ? 'var(--color-live)' : '#2e2e35'
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`Ponto ${n}`}
      className="cursor-pointer outline-none"
      onClick={() => onSelect(n)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(n)}
    >
      <circle cx={x} cy={y} r="17" fill={fill} stroke="#0a0a0b" strokeWidth="3" />
      <text x={x} y={y + 6} textAnchor="middle" fontSize="17" fontWeight="700" fill={active ? '#0a0a0b' : '#f4f4f5'} fontFamily="var(--font-mono)">
        {n}
      </text>
    </g>
  )
}

function Btn({ x, y, w = 40, h = 30, on, label }: { x: number; y: number; w?: number; h?: number; on?: 'red' | 'green' | 'white'; label?: string }) {
  const fill = on === 'red' ? '#e5484d' : on === 'green' ? '#3fbf6a' : on === 'white' ? '#e7e7ea' : '#3a3a42'
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill={fill} stroke="#111" />
      {label && (
        <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={on ? '#111' : '#bdbdc6'} fontFamily="var(--font-sans)">
          {label}
        </text>
      )}
    </g>
  )
}

const label = { fontSize: 14, fill: '#8a8a94', fontFamily: 'var(--font-mono)', letterSpacing: 2 }
const small = { fontSize: 13, fill: '#8a8a94', fontFamily: 'var(--font-mono)', textAnchor: 'middle' as const }

/**
 * Ilustração esquemática da ATEM Mini (frente e traseira) com pontos clicáveis.
 * Posições aproximadas: serve para explicar as funções, não para reproduzir o painel exato.
 */
export function AtemPanel() {
  const [sel, setSel] = useState(5)
  const current = HOTSPOTS.find((h) => h.n === sel)!

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_400px] md:gap-8">
      <div className="space-y-3">
        <p className="font-mono text-[11px] tracking-widest text-ink-400 uppercase md:text-sm">Frente · painel de controle</p>
        <svg viewBox="0 0 1000 300" className="w-full" role="img" aria-label="Painel frontal ilustrado da ATEM Mini">
          <rect x="10" y="20" width="980" height="270" rx="22" fill="#18181c" stroke="#33333a" strokeWidth="2" />
          <text x="60" y="62" {...label}>ÁUDIO</text>
          {[0, 1, 2, 3, 4, 5].map((c) => (
            <g key={c}>
              <Btn x={50 + c * 56} y={80} w={44} h={26} on={c === 2 ? 'green' : undefined} label="ON" />
              <Btn x={50 + c * 56} y={114} w={44} h={26} label="AFV" />
              <Btn x={50 + c * 56} y={160} w={44} h={26} label="+" />
              <Btn x={50 + c * 56} y={194} w={44} h={26} label="−" />
              <text x={72 + c * 56} y={250} {...small}>
                {c < 2 ? `M${c + 1}` : c - 1}
              </text>
            </g>
          ))}
          <text x="420" y="62" {...label}>TRANSIÇÕES</text>
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2].map((c) => <Btn key={`${r}-${c}`} x={420 + c * 54} y={80 + r * 38} w={44} h={28} on={r === 0 && c === 0 ? 'white' : undefined} />),
          )}
          <Btn x={640} y={80} w={90} h={52} label="CUT" />
          <Btn x={640} y={146} w={90} h={52} label="AUTO" />
          <Btn x={750} y={80} w={70} h={52} label="FTB" />
          <text x="670" y="232" {...label}>ENTRADAS</text>
          {[1, 2, 3, 4].map((n) => (
            <Btn key={n} x={600 + n * 70} y={242} w={58} h={34} on={n === 1 ? 'red' : n === 2 ? 'green' : undefined} label={String(n)} />
          ))}
          <Pin n={1} x={30} y={40} active={sel === 1} onSelect={setSel} />
          <Pin n={2} x={400} y={40} active={sel === 2} onSelect={setSel} />
          <Pin n={3} x={620} y={64} active={sel === 3} onSelect={setSel} />
          <Pin n={4} x={840} y={70} active={sel === 4} warn onSelect={setSel} />
          <Pin n={5} x={960} y={232} active={sel === 5} onSelect={setSel} />
        </svg>

        <p className="pt-2 font-mono text-[11px] tracking-widest text-ink-400 uppercase md:text-sm">Traseira · conexões</p>
        <svg viewBox="0 0 1000 150" className="w-full" role="img" aria-label="Painel traseiro ilustrado da ATEM Mini">
          <rect x="10" y="20" width="980" height="120" rx="18" fill="#18181c" stroke="#33333a" strokeWidth="2" />
          <circle cx="70" cy="80" r="16" fill="#0d0d10" stroke="#55555e" strokeWidth="3" />
          <rect x="115" y="62" width="48" height="38" rx="4" fill="#0d0d10" stroke="#55555e" strokeWidth="2" />
          <rect x="205" y="72" width="54" height="18" rx="9" fill="#0d0d10" stroke="var(--color-accent)" strokeWidth="2.5" />
          <path d="M300 66h70v20l-8 10h-54l-8-10z" fill="#0d0d10" stroke="#55555e" strokeWidth="2" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <path d={`M${430 + i * 95} 66h70v20l-8 10h-54l-8-10z`} fill="#0d0d10" stroke="#8a8a94" strokeWidth="2" />
              <text x={465 + i * 95} y={122} {...small}>
                IN {i + 1}
              </text>
            </g>
          ))}
          {[0, 1].map((i) => (
            <circle key={i} cx={845 + i * 50} cy={80} r="12" fill="#0d0d10" stroke="#8a8a94" strokeWidth="3" />
          ))}
          <text x="70" y="122" {...small}>12V</text>
          <text x="139" y="122" {...small}>REDE</text>
          <text x="232" y="122" {...small} fill="var(--color-accent)">USB-C</text>
          <text x="335" y="122" {...small}>HDMI OUT</text>
          <text x="870" y="122" {...small}>MIC 1 · 2</text>
          <Pin n={10} x={104} y={36} active={sel === 10} onSelect={setSel} />
          <Pin n={8} x={232} y={36} active={sel === 8} onSelect={setSel} />
          <Pin n={9} x={335} y={36} active={sel === 9} onSelect={setSel} />
          <Pin n={6} x={608} y={36} active={sel === 6} onSelect={setSel} />
          <Pin n={7} x={870} y={36} active={sel === 7} onSelect={setSel} />
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <div
          key={current.n}
          className={`animate-fade-in rounded-xl border p-4 md:p-5 ${current.warn ? 'border-live/50 bg-live-soft' : 'border-accent/50 bg-accent-soft'}`}
        >
          <p className="font-mono text-xs tracking-widest text-ink-300 uppercase md:text-sm">
            {current.n} · {current.side}
          </p>
          <p className="mt-1 text-lg font-semibold text-ink-100 md:text-2xl">{current.label}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-200 md:text-lg">{current.text}</p>
        </div>
        <ul className="grid grid-cols-2 gap-1 md:grid-cols-1">
          {HOTSPOTS.map((h) => (
            <li key={h.n}>
              <button
                type="button"
                onClick={() => setSel(h.n)}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1 text-left text-xs md:text-base ${
                  sel === h.n ? 'bg-ink-700 text-ink-100' : 'text-ink-300 hover:bg-ink-800'
                }`}
              >
                <span className={`font-mono ${h.warn ? 'text-live' : 'text-accent'}`}>{String(h.n).padStart(2, '0')}</span>
                {h.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
