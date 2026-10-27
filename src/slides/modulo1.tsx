import { Eye, HandHeart, Sparkles, Users } from 'lucide-react'
import { AlmaMark, AlmaWordmark, CreativeWord, LogoLockup, Tagline } from '../components/brand/Brand'
import { SignalFlow } from '../components/diagrams/SignalFlow'
import { Callout } from '../components/ui/Callout'
import { Card } from '../components/ui/Card'
import { SlideFrame } from '../components/ui/SlideFrame'
import type { SlideDef } from '../lib/types'

function Capa() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-ink-950 px-6 py-8 md:px-24 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_right,black,transparent_65%)]" />
      {/* Cantos de visor, como na logo */}
      <div className="pointer-events-none absolute top-6 left-6 h-10 w-10 border-t-[3px] border-l-[3px] border-accent md:top-10 md:left-10 md:h-14 md:w-14" />
      <div className="pointer-events-none absolute top-6 right-6 h-10 w-10 border-t-[3px] border-r-[3px] border-accent md:top-10 md:right-10 md:h-14 md:w-14" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 border-b-[3px] border-l-[3px] border-accent md:bottom-10 md:left-10 md:h-14 md:w-14" />
      <div className="pointer-events-none absolute right-6 bottom-6 h-10 w-10 border-r-[3px] border-b-[3px] border-accent md:right-10 md:bottom-10 md:h-14 md:w-14" />

      <div className="relative flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-ink-300 uppercase md:text-sm">
          <span className="size-2.5 animate-pulse-dot rounded-full bg-live" /> Treinamento da equipe
        </span>
        <span className="hidden font-mono text-sm text-ink-500 md:block">1920×1080 · 30 FPS</span>
      </div>

      <div className="relative grid items-center gap-8 md:grid-cols-[1fr_380px]">
        <div className="stagger">
          <p className="text-lg font-medium tracking-[0.3em] text-ink-200 uppercase md:text-3xl">
            Transmissão <CreativeWord />
          </p>
          <h1 className="mt-3 text-5xl leading-[0.95] font-bold tracking-tight text-accent md:mt-5 md:text-[132px]">
            TRANSMISSÃO
            <br />
            <span className="text-ink-100">AO VIVO</span>
          </h1>
          <p className="mt-5 text-lg text-ink-300 md:mt-8 md:text-[34px]">Do sinal da câmera à live no YouTube</p>
        </div>
        <div className="hidden justify-center md:flex">
          <LogoLockup className="h-[340px] w-[340px]" />
        </div>
      </div>

      <div className="relative flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <AlmaWordmark size="lg" />
        <Tagline />
      </div>
    </div>
  )
}

function Objetivo() {
  return (
    <SlideFrame
      title="Por que a transmissão existe"
      lead="Nossa equipe leva a mensagem da igreja a quem não pode estar presente: pessoas doentes, viajando, trabalhando, ou que ainda não tiveram coragem de entrar pela porta."
    >
      <div className="grid h-full gap-4 md:grid-cols-[1fr_1fr] md:gap-8">
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4 stagger">
          <Card icon={HandHeart} title="Responsabilidade" tone="accent">
            Do outro lado da tela há pessoas reais contando com a gente.
          </Card>
          <Card icon={Sparkles} title="Excelência" tone="accent">
            Fazer bem feito, com preparo e procedimentos repetíveis.
          </Card>
          <Card icon={Eye} title="Atenção" tone="accent">
            Áudio, imagem e sinal acompanhados do início ao fim.
          </Card>
          <Card icon={Users} title="Trabalho em equipe" tone="accent">
            Ninguém opera sozinho. Comunicação clara, sempre.
          </Card>
        </div>
        <div className="flex flex-col justify-center rounded-2xl border border-ink-700 bg-ink-900 p-6 md:p-10">
          <AlmaMark size={64} />
          <p className="mt-6 text-2xl leading-snug font-medium text-ink-100 md:text-[38px]">
            “A técnica serve à mensagem. Quando tudo funciona, ninguém percebe a gente, e é isso que queremos.”
          </p>
          <p className="mt-5 font-mono text-sm tracking-widest text-accent uppercase">Comunicamos Jesus</p>
        </div>
      </div>
    </SlideFrame>
  )
}

function Fluxo() {
  return (
    <SlideFrame title="O caminho do sinal" lead="Toque em cada etapa para ver a função de cada equipamento.">
      <SignalFlow />
      <Callout tone="dica" title="Este é o fluxo de referência" className="mt-5 md:mt-7">
        A ligação real precisa ser confirmada conforme o modelo da ATEM Mini e a estrutura da igreja (quantidade de câmeras, origem do áudio, computador usado).
      </Callout>
    </SlideFrame>
  )
}

export const modulo1: SlideDef[] = [
  {
    id: 'capa',
    module: 1,
    title: 'Capa',
    Component: Capa,
    notes: {
      tempo: '2 min',
      roteiro: [
        'Dê boas-vindas e apresente-se rapidamente.',
        'Explique que o treinamento vai do zero: ninguém precisa já saber operar OBS ou ATEM.',
        'Combine o formato: teoria curta, demonstração no equipamento real e prática em dupla no final.',
      ],
      perguntas: ['Quem aqui já assistiu a uma live da igreja? Quem já ajudou em alguma?'],
      demonstracao: ['Deixe a ATEM, o computador e uma câmera montados à vista desde o início.'],
    },
  },
  {
    id: 'objetivo',
    module: 1,
    title: 'O objetivo da transmissão',
    Component: Objetivo,
    notes: {
      tempo: '4 min',
      roteiro: [
        'Conecte o trabalho técnico ao propósito: levar a mensagem a quem não pode estar presente.',
        'Passe pelos quatro valores: responsabilidade, excelência, atenção e trabalho em equipe.',
        'Reforce que erros acontecem; o que importa é perceber rápido e comunicar.',
      ],
      perguntas: ['Vocês conhecem alguém que acompanha os cultos pela internet? Por quê?'],
    },
  },
  {
    id: 'fluxo',
    module: 1,
    title: 'O fluxo completo da transmissão',
    Component: Fluxo,
    notes: {
      tempo: '5 min',
      roteiro: [
        'Clique em cada etapa do diagrama, da câmera ao público.',
        'Use a analogia de uma encomenda: a câmera produz, a ATEM escolhe, o computador recebe, o OBS embala e envia, o YouTube entrega.',
        'Deixe claro que este é o fluxo de referência; a montagem real deve ser confirmada na igreja.',
      ],
      demonstracao: ['Aponte fisicamente cada equipamento e o cabo que liga um ao outro.'],
      perguntas: ['Se a imagem chega preta no YouTube, em quais etapas o problema pode estar?'],
      atencao: 'Se a igreja usa outro caminho (ex.: transmissão direta pela ATEM Pro), avise que esse caso é tratado à parte.',
    },
  },
]
