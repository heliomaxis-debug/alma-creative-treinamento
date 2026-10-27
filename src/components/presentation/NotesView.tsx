import { Clock, Hand, MessageCircleQuestion, MonitorPlay, TriangleAlert } from 'lucide-react'
import type { PresenterNotes } from '../../lib/types'

interface Props {
  notes: PresenterNotes
  /** Tamanho do texto: compacto (gaveta) ou confortável (modo instrutor). */
  size?: 'sm' | 'md'
}

function Section({ icon: Icon, title, items, tone }: { icon: typeof Hand; title: string; items: string[]; tone: string }) {
  return (
    <section>
      <h4 className={`mb-1.5 flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase ${tone}`}>
        <Icon className="size-3.5" /> {title}
      </h4>
      <ul className="space-y-1.5">
        {items.map((t, i) => (
          <li key={i} className="flex gap-2 leading-relaxed text-ink-200">
            <span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ink-500" />
            {t}
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Notas do apresentador de um slide. */
export function NotesView({ notes, size = 'sm' }: Props) {
  return (
    <div className={`grid gap-4 ${size === 'md' ? 'text-base' : 'text-sm'}`}>
      {notes.tempo && (
        <p className="flex items-center gap-2 font-mono text-xs text-ink-400">
          <Clock className="size-3.5" /> Tempo sugerido: {notes.tempo}
        </p>
      )}
      <Section icon={Hand} title="Roteiro" items={notes.roteiro} tone="text-accent" />
      {notes.demonstracao && <Section icon={MonitorPlay} title="Demonstração" items={notes.demonstracao} tone="text-info" />}
      {notes.perguntas && <Section icon={MessageCircleQuestion} title="Perguntas para a turma" items={notes.perguntas} tone="text-ink-300" />}
      {notes.atencao && (
        <p className="flex gap-2 rounded-lg border border-warn/40 bg-warn-soft p-3 leading-relaxed text-ink-100">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warn" />
          {notes.atencao}
        </p>
      )}
    </div>
  )
}
