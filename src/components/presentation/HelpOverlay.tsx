import { X } from 'lucide-react'

export const SHORTCUTS: [string[], string][] = [
  [['→', 'Espaço', 'PgDn'], 'Próximo slide'],
  [['←', 'PgUp'], 'Slide anterior'],
  [['Home', 'End'], 'Primeiro / último slide'],
  [['F'], 'Tela cheia'],
  [['N'], 'Mostrar/ocultar notas do apresentador'],
  [['M'], 'Menu de módulos'],
  [['B'], 'Tela preta (pausa no telão)'],
  [['R'], 'Reiniciar a apresentação'],
  [['C'], 'Consulta rápida'],
  [['I'], 'Abrir modo instrutor em outra janela'],
  [['?'], 'Esta ajuda'],
  [['Esc'], 'Fechar painéis'],
]

export function Kbd({ children }: { children: string }) {
  return <kbd className="inline-flex min-w-7 items-center justify-center rounded-md border border-ink-500 bg-ink-800 px-1.5 py-0.5 font-mono text-xs text-ink-100">{children}</kbd>
}

export function HelpOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid animate-fade-in place-items-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
        className="w-full max-w-lg rounded-2xl border border-ink-600 bg-ink-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 id="help-title" className="text-lg font-semibold text-ink-100">
            Atalhos de teclado
          </h2>
          <button type="button" onClick={onClose} aria-label="Fechar" className="rounded-lg p-1.5 text-ink-300 hover:bg-ink-700 hover:text-ink-100">
            <X className="size-5" />
          </button>
        </div>
        <ul className="mt-4 divide-y divide-ink-700">
          {SHORTCUTS.map(([keys, label]) => (
            <li key={label} className="flex items-center justify-between gap-4 py-2 text-sm text-ink-200">
              {label}
              <span className="flex gap-1">
                {keys.map((k) => (
                  <Kbd key={k}>{k}</Kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
