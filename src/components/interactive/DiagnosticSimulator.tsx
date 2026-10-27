import { useState } from 'react'
import { ArrowLeft, Check, CircleHelp, PhoneCall, RotateCcw, TriangleAlert, Wrench, X } from 'lucide-react'
import { PROBLEMS, type Problem } from '../../data/diagnostics'

/** Simulador: o voluntário escolhe o problema e responde perguntas em sequência. */
export function DiagnosticSimulator() {
  const [problem, setProblem] = useState<Problem | null>(null)
  const [path, setPath] = useState<string[]>([])

  const start = (p: Problem) => {
    setProblem(p)
    setPath([p.start])
  }
  const go = (id: string) => setPath((p) => [...p, id])
  const back = () => setPath((p) => (p.length > 1 ? p.slice(0, -1) : p))

  if (!problem) {
    return (
      <div>
        <p className="mb-3 text-sm text-ink-300 md:text-base">Qual é o problema agora?</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {PROBLEMS.map((p) => {
            const Icon = p.icon
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => start(p)}
                className="flex items-center gap-4 rounded-2xl border border-ink-700 bg-ink-900 p-4 text-left transition-colors hover:border-accent md:p-5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-live-soft text-live">
                  <Icon className="size-6" />
                </span>
                <span>
                  <span className="block text-base font-semibold text-ink-100 md:text-lg">{p.title}</span>
                  <span className="block text-sm text-ink-400">{p.subtitle}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const nodeId = path[path.length - 1]
  const node = problem.nodes[nodeId]
  const questionsDone = path.filter((id) => problem.nodes[id].kind === 'q').length

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs tracking-widest text-accent uppercase md:text-sm">{problem.title}</span>
        <span className="text-xs text-ink-500">· etapa {path.length}</span>
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={back} disabled={path.length <= 1} className="flex items-center gap-1.5 rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-ink-200 hover:border-ink-400 disabled:opacity-40">
            <ArrowLeft className="size-4" /> Voltar
          </button>
          <button type="button" onClick={() => setProblem(null)} className="flex items-center gap-1.5 rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-ink-200 hover:border-ink-400">
            <RotateCcw className="size-4" /> Outro problema
          </button>
        </div>
      </div>

      <div key={path.length} className="animate-slide-in rounded-2xl border border-ink-700 bg-ink-900 p-5 md:p-7">
        {node.kind === 'q' && (
          <>
            <div className="flex items-start gap-3">
              <CircleHelp className="mt-1 size-6 shrink-0 text-accent" />
              <div>
                <p className="font-mono text-xs text-ink-400">PERGUNTA {questionsDone}</p>
                <p className="mt-1 text-lg font-semibold text-ink-100 md:text-2xl">{node.text}</p>
                {node.hint && <p className="mt-2 text-sm text-ink-400 md:text-base">{node.hint}</p>}
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => go(node.yes)} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-ok/50 bg-ok-soft py-3 font-semibold text-ink-100 hover:border-ok">
                <Check className="size-5 text-ok" /> Sim
              </button>
              <button type="button" onClick={() => go(node.no)} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-live/50 bg-live-soft py-3 font-semibold text-ink-100 hover:border-live">
                <X className="size-5 text-live" /> Não
              </button>
            </div>
          </>
        )}

        {node.kind === 'fix' && (
          <>
            <div className="flex items-center gap-3">
              <Wrench className="size-6 text-warn" />
              <p className="text-lg font-semibold text-ink-100 md:text-2xl">{node.title}</p>
            </div>
            <ol className="mt-4 space-y-2">
              {node.steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-200 md:text-lg">
                  <span className="font-mono text-accent">{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ol>
            {node.warn && (
              <p className="mt-4 flex items-start gap-2 rounded-lg border border-live/40 bg-live-soft p-3 text-sm text-ink-100 md:text-base">
                <TriangleAlert className="mt-0.5 size-4 shrink-0 text-live" /> {node.warn}
              </p>
            )}
            <p className="mt-5 text-sm text-ink-300 md:text-base">Isso resolveu?</p>
            <div className="mt-2 flex gap-3">
              <button type="button" onClick={() => go('__resolvido')} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-ok/50 bg-ok-soft py-3 font-semibold text-ink-100 hover:border-ok">
                <Check className="size-5 text-ok" /> Resolveu
              </button>
              <button type="button" onClick={() => go(node.next)} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-ink-600 bg-ink-800 py-3 font-semibold text-ink-100 hover:border-ink-400">
                Ainda não, continuar
              </button>
            </div>
          </>
        )}

        {(node.kind === 'end' || nodeId === '__resolvido') && <EndView problem={problem} nodeId={nodeId} onRestart={() => start(problem)} />}
      </div>
    </div>
  )
}

function EndView({ problem, nodeId, onRestart }: { problem: Problem; nodeId: string; onRestart: () => void }) {
  const node = problem.nodes[nodeId]
  const resolved = nodeId === '__resolvido'
  const title = resolved ? 'Resolvido!' : node?.kind === 'end' ? node.title : ''
  const text = resolved
    ? 'Ótimo. Confirme na prévia do YouTube Studio que imagem e áudio estão chegando e anote o que aconteceu para a equipe.'
    : node?.kind === 'end'
      ? node.text
      : ''
  const escalate = !resolved && node?.kind === 'end' && node.tone === 'escalar'
  return (
    <div className="text-center">
      <span className={`mx-auto grid size-14 place-items-center rounded-full ${escalate ? 'bg-warn-soft text-warn' : 'bg-ok-soft text-ok'}`}>
        {escalate ? <PhoneCall className="size-7" /> : <Check className="size-7" />}
      </span>
      <p className="mt-3 text-xl font-semibold text-ink-100 md:text-2xl">{title}</p>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-ink-300 md:text-lg">{text}</p>
      <button type="button" onClick={onRestart} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-ink-600 px-4 py-2 text-sm text-ink-200 hover:border-ink-400">
        <RotateCcw className="size-4" /> Recomeçar este diagnóstico
      </button>
    </div>
  )
}
