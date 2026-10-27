import type { ReactNode } from 'react'
import { CircleCheck, Lightbulb, ShieldAlert, TriangleAlert, type LucideIcon } from 'lucide-react'

export type CalloutTone = 'alerta' | 'atencao' | 'dica' | 'ok'

const tones: Record<CalloutTone, { icon: LucideIcon; box: string; iconColor: string; label: string }> = {
  alerta: { icon: ShieldAlert, box: 'border-live/40 bg-live-soft', iconColor: 'text-live', label: 'Alerta' },
  atencao: { icon: TriangleAlert, box: 'border-warn/40 bg-warn-soft', iconColor: 'text-warn', label: 'Atenção' },
  dica: { icon: Lightbulb, box: 'border-info/30 bg-info-soft', iconColor: 'text-info', label: 'Dica' },
  ok: { icon: CircleCheck, box: 'border-ok/30 bg-ok-soft', iconColor: 'text-ok', label: 'Confirme' },
}

interface Props {
  tone?: CalloutTone
  title?: ReactNode
  children?: ReactNode
  className?: string
}

/** Aviso visual. Use "alerta" nos pontos em que um erro pode derrubar a transmissão. */
export function Callout({ tone = 'atencao', title, children, className = '' }: Props) {
  const t = tones[tone]
  const Icon = t.icon
  return (
    <div role={tone === 'alerta' ? 'alert' : 'note'} className={`flex gap-3 rounded-xl border p-4 md:gap-4 md:p-5 ${t.box} ${className}`}>
      <Icon className={`mt-0.5 size-5 shrink-0 md:size-7 ${t.iconColor}`} strokeWidth={2} />
      <div className="min-w-0 text-sm leading-relaxed text-ink-200 md:text-lg">
        <p className="font-semibold text-ink-100">{title ?? t.label}</p>
        {children && <div className="mt-1">{children}</div>}
      </div>
    </div>
  )
}
