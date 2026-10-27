import { useState } from 'react'

interface Props {
  /** Mostra a saída HDMI opcional para monitor. */
  showMonitor?: boolean
}

const mono = { fontFamily: 'var(--font-mono)' }

/** Diagrama de ligação: câmeras → HDMI → ATEM Mini → USB → computador. */
export function AtemWiring({ showMonitor = true }: Props) {
  const [cams, setCams] = useState(4)
  const atemY = 210
  const camY = (i: number) => 60 + i * 100

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2 md:mb-4">
        <span className="text-xs text-ink-400 md:text-base">Câmeras disponíveis:</span>
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setCams(n)}
            aria-pressed={cams === n}
            className={`size-8 rounded-lg border font-mono text-sm md:size-10 md:text-base ${
              cams === n ? 'border-accent bg-accent text-ink-950' : 'border-ink-600 bg-ink-800 text-ink-200 hover:border-ink-400'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 1000 420" className="w-full" role="img" aria-label={`${cams} câmera(s) ligada(s) por HDMI à ATEM Mini, que se liga ao computador por USB`}>
        {[0, 1, 2, 3].map((i) => {
          const on = i < cams
          const y = camY(i)
          const stroke = on ? '#d4d4da' : '#4a4a53'
          return (
            <g key={i} opacity={on ? 1 : 0.2} className="transition-opacity duration-300">
              <rect x="20" y={y - 26} width="96" height="52" rx="8" fill="#1d1d22" stroke={stroke} strokeWidth="2" />
              <path d={`M116 ${y - 14} l26 -10 v48 l-26 -10z`} fill="#1d1d22" stroke={stroke} strokeWidth="2" />
              <circle cx="36" cy={y - 12} r="5" fill={on ? 'var(--color-live)' : '#4a4a53'} />
              <text x="70" y={y + 8} textAnchor="middle" fontSize="18" fontWeight="600" fill="#ececf0">
                CAM {i + 1}
              </text>
              <path
                d={`M150 ${y} C 260 ${y}, 260 ${atemY - 45 + i * 30}, 380 ${atemY - 45 + i * 30}`}
                fill="none"
                stroke={on ? 'var(--color-accent)' : '#4a4a53'}
                strokeWidth="3"
                strokeDasharray="8 8"
                className={on ? 'animate-dash' : ''}
              />
              <text x="226" y={y - 10} fontSize="14" fill="#a9a9b3" style={mono}>
                HDMI
              </text>
            </g>
          )
        })}

        <rect x="380" y={atemY - 75} width="240" height="150" rx="16" fill="#18181c" stroke="#d4d4da" strokeWidth="2.5" />
        <text x="500" y={atemY - 22} textAnchor="middle" fontSize="26" fontWeight="700" fill="#ececf0">
          ATEM MINI
        </text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={414 + i * 46} y={atemY + 4} width="36" height="26" rx="4" fill={i === 0 ? '#e5484d' : i < cams ? '#3a3a42' : '#24242a'} />
        ))}
        <text x="500" y={atemY + 56} textAnchor="middle" fontSize="13" fill="#8a8a94" style={mono}>
          CÂMERA 1 SELECIONADA
        </text>

        <line x1="620" y1={atemY} x2="760" y2={atemY} stroke="var(--color-accent)" strokeWidth="4" strokeDasharray="10 8" className="animate-dash" />
        <text x="690" y={atemY - 14} textAnchor="middle" fontSize="16" fontWeight="600" fill="var(--color-accent)" style={mono}>
          USB-C
        </text>

        <rect x="760" y={atemY - 70} width="210" height="128" rx="10" fill="#18181c" stroke="#d4d4da" strokeWidth="2.5" />
        <rect x="776" y={atemY - 56} width="178" height="100" rx="4" fill="#0d0d10" />
        <text x="865" y={atemY - 6} textAnchor="middle" fontSize="18" fontWeight="600" fill="#ececf0">
          COMPUTADOR
        </text>
        <text x="865" y={atemY + 20} textAnchor="middle" fontSize="14" fill="#a9a9b3" style={mono}>
          OBS STUDIO
        </text>
        <path d={`M740 ${atemY + 58} h250 l-16 16 h-218z`} fill="#24242a" stroke="#d4d4da" strokeWidth="2" />

        {showMonitor && (
          <g>
            <path d={`M500 ${atemY + 75} V 365 H 640`} fill="none" stroke="#7d7d88" strokeWidth="2.5" strokeDasharray="5 7" />
            <text x="512" y="345" fontSize="14" fill="#7d7d88" style={mono}>
              HDMI OUT · opcional
            </text>
            <rect x="640" y="330" width="120" height="70" rx="6" fill="#18181c" stroke="#7d7d88" strokeWidth="2" />
            <text x="700" y="371" textAnchor="middle" fontSize="15" fill="#a9a9b3">
              Monitor
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}
