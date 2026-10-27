import { Activity, Eye, Megaphone, PowerOff, Settings2, Users } from 'lucide-react'
import { Checklist } from '../components/interactive/Checklist'
import { Callout } from '../components/ui/Callout'
import { Card } from '../components/ui/Card'
import { SlideFrame } from '../components/ui/SlideFrame'
import { PRE_SERVICE } from '../data/checklist'
import type { SlideDef } from '../lib/types'

function ChecklistAntes() {
  return (
    <SlideFrame title="Checklist antes do culto" lead="Marque cada item ao conferir. Os itens críticos podem derrubar ou expor a live.">
      <Checklist groups={PRE_SERVICE} storageKey="alma-checklist-slide18" columns={2} size="slide" />
    </SlideFrame>
  )
}

const PHASES: { label: string; steps: { n: number; text: string; highlight?: boolean }[] }[] = [
  {
    label: 'Preparação',
    steps: [
      { n: 1, text: 'Chegar com antecedência' },
      { n: 2, text: 'Ligar e conferir os equipamentos' },
      { n: 3, text: 'Testar todas as fontes' },
      { n: 4, text: 'Verificar o áudio' },
      { n: 5, text: 'Conferir o OBS' },
    ],
  },
  {
    label: 'Envio',
    steps: [
      { n: 6, text: 'Abrir ou criar a transmissão correta no YouTube' },
      { n: 7, text: 'Iniciar o envio do sinal pelo OBS' },
      { n: 8, text: 'Conferir a prévia e a saúde da transmissão' },
    ],
  },
  {
    label: 'No ar',
    steps: [
      { n: 9, text: 'Confirmar o momento de publicação conforme o procedimento da igreja', highlight: true },
      { n: 10, text: 'Manter acompanhamento durante todo o culto' },
    ],
  },
]

function ComoIniciar() {
  return (
    <SlideFrame title="Como iniciar a transmissão" lead="Sempre na mesma ordem. Repetir o processo é o que traz segurança.">
      <div className="grid gap-4 md:grid-cols-3 md:gap-6 stagger">
        {PHASES.map((phase, pi) => (
          <section key={phase.label} className="rounded-2xl border border-ink-700 bg-ink-900/80 p-4 md:p-6">
            <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase md:text-sm">
              <span className={`size-2 rounded-full ${pi === 2 ? 'animate-pulse-dot bg-live' : 'bg-accent'}`} />
              {phase.label}
            </p>
            <ol className="mt-3 space-y-2.5 md:mt-4 md:space-y-3.5">
              {phase.steps.map((s) => (
                <li
                  key={s.n}
                  className={`flex items-start gap-3 rounded-xl ${s.highlight ? 'border border-live/50 bg-live-soft p-3' : ''}`}
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-ink-600 bg-ink-800 font-mono text-xs font-semibold text-accent md:size-9 md:text-base">
                    {s.n}
                  </span>
                  <span className="pt-0.5 text-sm leading-snug text-ink-100 md:pt-1 md:text-[20px]">{s.text}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      <Callout tone="alerta" title="Enviar o sinal não é o mesmo que publicar" className="mt-4 md:mt-6">
        Só considere a live no ar depois de verificar o status no YouTube Studio e confirmar com o responsável.
      </Callout>
    </SlideFrame>
  )
}

function DuranteCulto() {
  return (
    <SlideFrame title="Durante o culto" lead="Com a live no ar, o trabalho é acompanhar, comunicar e não improvisar.">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-5 stagger">
        <Card icon={Settings2} title="Evite mudanças">
          Não altere configurações sem necessidade. Toda mudança tem risco.
        </Card>
        <Card icon={Activity} title="Olho nos medidores">
          Acompanhe o áudio o tempo todo: mexendo, sem vermelho.
        </Card>
        <Card icon={Eye} title="Imagem e sinal">
          Confira a cena, a pré-visualização e os indicadores do OBS.
        </Card>
        <Card icon={Megaphone} title="Comunique na hora" tone="accent">
          Qualquer falha deve ser avisada imediatamente ao responsável.
        </Card>
        <Card icon={PowerOff} title="Nada de desligar" tone="live">
          Não desligue equipamentos sem autorização.
        </Card>
        <Card icon={Users} title="Siga a direção">
          A equipe responsável decide trocas, avisos e o encerramento.
        </Card>
      </div>
      <Callout tone="alerta" title="Desligar um cabo ou equipamento derruba a live" className="mt-4 md:mt-6">
        Mesmo que pareça rápido. Se algo precisar ser reiniciado, combine antes e coloque a cena de espera no ar.
      </Callout>
    </SlideFrame>
  )
}

export const modulo5: SlideDef[] = [
  {
    id: 'checklist',
    module: 5,
    title: 'Checklist antes do culto',
    Component: ChecklistAntes,
    notes: {
      tempo: '5 min',
      roteiro: [
        'Explique que o checklist existe para não depender da memória, nem dos mais experientes.',
        'Marque os itens ao vivo, comentando os críticos (ícone vermelho).',
        'Mostre o botão "Limpar" para recomeçar a cada culto. O progresso fica salvo neste navegador.',
      ],
      demonstracao: ['Percorra o checklist com o equipamento montado, conferindo item por item de verdade.'],
      perguntas: ['Qual desses itens vocês acham que é mais esquecido? Por quê?'],
      atencao: 'Combine com a liderança se o checklist será impresso ou usado pela consulta rápida no celular.',
    },
  },
  {
    id: 'como-iniciar',
    module: 5,
    title: 'Como iniciar a transmissão',
    Component: ComoIniciar,
    notes: {
      tempo: '5 min',
      roteiro: [
        'Apresente as três fases: preparação, envio e no ar.',
        'Reforce que o passo 9 (publicação) segue o procedimento definido pela igreja: quem autoriza e em que momento.',
        'Lembre que o YouTube pode ter início automático ou manual; isso muda quando o público começa a ver.',
      ],
      perguntas: ['Quanto tempo antes do culto vocês acham que a equipe precisa chegar para cumprir tudo isso com calma?'],
      atencao: 'Informe aos voluntários o horário de chegada e quem autoriza a publicação na Alma Church.',
    },
  },
  {
    id: 'durante-culto',
    module: 5,
    title: 'Durante o culto',
    Component: DuranteCulto,
    notes: {
      tempo: '4 min',
      roteiro: [
        'Passe pelas seis boas práticas com exemplos reais de cultos anteriores, se houver.',
        'Combine o canal de comunicação durante o culto (rádio, mensagem, gesto).',
        'Explique por que desligar algo sem autorização derruba a live.',
      ],
      perguntas: ['Se o áudio sumir no meio da pregação, qual é a primeira coisa a fazer?'],
      atencao: 'Defina antes quem é o responsável técnico de cada culto.',
    },
  },
]
