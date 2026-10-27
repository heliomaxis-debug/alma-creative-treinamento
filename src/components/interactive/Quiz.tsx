import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Trophy, X } from 'lucide-react'
import type { QuizQuestion } from '../../data/quiz'

/** Questionário de múltipla escolha com explicação após cada resposta. */
export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null))
  const finished = index >= questions.length
  const score = answers.filter((a, i) => a === questions[i].answer).length

  const restart = () => {
    setAnswers(questions.map(() => null))
    setIndex(0)
  }

  if (finished) {
    const perfect = score === questions.length
    return (
      <div className="flex animate-slide-in flex-col items-center rounded-2xl border border-ink-700 bg-ink-900 p-6 text-center md:p-10">
        <Trophy className={`size-12 md:size-16 ${perfect ? 'text-accent' : 'text-ink-300'}`} strokeWidth={1.5} />
        <p className="mt-4 text-3xl font-semibold text-ink-100 md:text-5xl">
          {score} de {questions.length}
        </p>
        <p className="mt-2 max-w-xl text-sm text-ink-300 md:text-xl">
          {perfect ? 'Excelente! Você está pronto para a prática.' : 'Bom trabalho. Revise as explicações das questões que errou e tente de novo.'}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {questions.map((q, i) => (
            <span
              key={i}
              className={`grid size-8 place-items-center rounded-full font-mono text-sm ${answers[i] === q.answer ? 'bg-ok-soft text-ok' : 'bg-live-soft text-live'}`}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <button type="button" onClick={restart} className="mt-6 flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-semibold text-ink-950 hover:brightness-110 md:text-lg">
          <RotateCcw className="size-5" /> Refazer
        </button>
      </div>
    )
  }

  const q = questions[index]
  const chosen = answers[index]
  const answered = chosen !== null

  const choose = (opt: number) => {
    if (answered) return
    setAnswers((a) => a.map((v, i) => (i === index ? opt : v)))
  }

  return (
    <div className="rounded-2xl border border-ink-700 bg-ink-900 p-4 md:p-7">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs tracking-widest text-accent uppercase md:text-sm">
          Pergunta {index + 1} de {questions.length}
        </p>
        <div className="flex gap-1.5">
          {questions.map((qq, i) => (
            <span
              key={i}
              className={`h-1.5 w-5 rounded-full md:w-8 ${
                i === index ? 'bg-ink-100' : answers[i] === null ? 'bg-ink-700' : answers[i] === qq.answer ? 'bg-ok' : 'bg-live'
              }`}
            />
          ))}
        </div>
      </div>
      <p key={index} className="mt-3 animate-slide-in text-lg font-semibold text-ink-100 md:text-[30px] md:leading-tight">
        {q.question}
      </p>
      <div className="mt-4 grid gap-2 md:mt-5 md:grid-cols-2 md:gap-3">
        {q.options.map((opt, i) => {
          const isRight = i === q.answer
          const isChosen = i === chosen
          let cls = 'border-ink-600 bg-ink-850 hover:border-ink-400'
          if (answered && isRight) cls = 'border-ok bg-ok-soft'
          else if (answered && isChosen) cls = 'border-live bg-live-soft'
          else if (answered) cls = 'border-ink-700 bg-ink-850 opacity-50'
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => choose(i)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm text-ink-100 transition-colors disabled:cursor-default md:text-xl ${cls}`}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-ink-500 font-mono text-xs md:size-8 md:text-sm">
                {answered && isRight ? <Check className="size-4 text-ok" /> : answered && isChosen ? <X className="size-4 text-live" /> : String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className="mt-4 flex animate-slide-in flex-col gap-3 md:flex-row md:items-center">
          <p className={`flex-1 rounded-xl border p-3 text-sm leading-relaxed md:p-4 md:text-lg ${chosen === q.answer ? 'border-ok/40 bg-ok-soft' : 'border-live/40 bg-live-soft'}`}>
            <strong className="text-ink-100">{chosen === q.answer ? 'Correto! ' : 'Não é essa. '}</strong>
            <span className="text-ink-200">{q.explanation}</span>
          </p>
          <button
            type="button"
            onClick={() => setIndex((i) => i + 1)}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-ink-950 hover:brightness-110 md:text-lg"
          >
            {index === questions.length - 1 ? 'Ver resultado' : 'Próxima'} <ArrowRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  )
}
