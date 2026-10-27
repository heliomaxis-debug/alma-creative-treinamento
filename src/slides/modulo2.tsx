import { ArrowLeftRight, Download, TriangleAlert, Upload } from 'lucide-react'
import { AtemPanel } from '../components/diagrams/AtemPanel'
import { AtemWiring } from '../components/diagrams/AtemWiring'
import { Callout } from '../components/ui/Callout'
import { Card } from '../components/ui/Card'
import { SlideFrame } from '../components/ui/SlideFrame'
import { Steps } from '../components/ui/Steps'
import type { SlideDef } from '../lib/types'

/** Esquema: várias entradas → uma saída escolhida. */
function SwitchDiagram() {
  return (
    <svg viewBox="0 0 640 420" className="w-full" role="img" aria-label="Quatro câmeras entram na ATEM Mini e uma saída segue para o computador">
      {[0, 1, 2, 3].map((i) => {
        const y = 60 + i * 100
        const on = i === 1
        return (
          <g key={i}>
            <rect x="10" y={y - 30} width="120" height="60" rx="10" fill="#18181c" stroke={on ? 'var(--color-accent)' : '#4a4a53'} strokeWidth="2" />
            <text x="70" y={y + 7} textAnchor="middle" fontSize="20" fontWeight="600" fill="#ececf0">
              CAM {i + 1}
            </text>
            <path d={`M130 ${y} C 190 ${y}, 200 210, 250 210`} fill="none" stroke={on ? 'var(--color-accent)' : '#4a4a53'} strokeWidth={on ? 4 : 2} />
          </g>
        )
      })}
      <rect x="250" y="140" width="170" height="140" rx="16" fill="#18181c" stroke="#d4d4da" strokeWidth="2.5" />
      <text x="335" y="200" textAnchor="middle" fontSize="24" fontWeight="700" fill="#ececf0">
        ATEM
      </text>
      <text x="335" y="232" textAnchor="middle" fontSize="15" fill="#a9a9b3" fontFamily="var(--font-mono)">
        escolhe 1
      </text>
      <line x1="420" y1="210" x2="520" y2="210" stroke="var(--color-accent)" strokeWidth="4" strokeDasharray="10 8" className="animate-dash" />
      <rect x="520" y="165" width="110" height="90" rx="10" fill="var(--color-accent)" />
      <text x="575" y="205" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0a0a0b">
        SAÍDA
      </text>
      <text x="575" y="228" textAnchor="middle" fontSize="14" fontWeight="600" fill="#0a0a0b">
        CAM 2
      </text>
    </svg>
  )
}

function OQueE() {
  return (
    <SlideFrame
      title="O que é a ATEM Mini?"
      lead="Uma mesa de corte de vídeo: recebe várias câmeras, deixa você escolher qual imagem segue adiante e envia essa imagem ao computador ou a outros destinos."
    >
      <div className="grid h-full items-center gap-6 md:grid-cols-[1fr_1.1fr] md:gap-12">
        <div className="space-y-3 md:space-y-4 stagger">
          <Card icon={Download} title="Recebe">
            As câmeras entram pelas entradas HDMI.
          </Card>
          <Card icon={ArrowLeftRight} title="Alterna">
            Um botão por câmera. Apertou, trocou a imagem.
          </Card>
          <Card icon={Upload} title="Envia">
            A imagem escolhida sai pela USB para o computador (e pela saída HDMI, para um monitor).
          </Card>
        </div>
        <div>
          <SwitchDiagram />
          <p className="mt-2 text-center text-sm text-ink-400 md:text-lg">Pense num controle remoto de TV, só que os “canais” são as câmeras do culto.</p>
        </div>
      </div>
    </SlideFrame>
  )
}

function Botoes() {
  return (
    <SlideFrame
      title="Conhecendo os botões"
      lead={
        <>
          Clique nos números para ver o que cada parte faz.{' '}
          <span className="inline-flex items-center gap-1.5 text-warn">
            <TriangleAlert className="size-4 md:size-5" /> Os recursos variam conforme o modelo: ilustração esquemática, confira na unidade da igreja.
          </span>
        </>
      }
    >
      <AtemPanel />
    </SlideFrame>
  )
}

function Conectar() {
  return (
    <SlideFrame title="Como conectar a ATEM Mini">
      <div className="grid gap-6 md:grid-cols-[1.25fr_1fr] md:gap-10">
        <div>
          <AtemWiring />
          <Callout tone="dica" title="ATEM Mini Pro e Extreme" className="mt-3">
            Esses modelos podem transmitir direto pela rede, sem o OBS, dependendo da configuração. Não presuma que esse recurso está disponível ou configurado na unidade da igreja.
          </Callout>
        </div>
        <div>
          <Steps
            size="md"
            items={[
              { title: 'Ligue as câmeras', detail: 'Confira bateria ou fonte de alimentação de cada uma.' },
              { title: 'Conecte as câmeras às entradas HDMI', detail: 'Anote qual câmera está em qual número.' },
              { title: 'Conecte a ATEM ao computador pela USB-C', detail: 'Use a porta USB marcada para webcam/computador.' },
              { title: 'Ligue a ATEM e os demais equipamentos' },
              { title: 'Selecione uma câmera na ATEM', detail: 'O botão da entrada fica aceso.' },
              { title: 'Confirme que o sinal chega ao computador', detail: 'Vamos fazer isso no OBS, no próximo módulo.' },
            ]}
          />
        </div>
      </div>
    </SlideFrame>
  )
}

export const modulo2: SlideDef[] = [
  {
    id: 'atem-o-que-e',
    module: 2,
    title: 'O que é a ATEM Mini?',
    Component: OQueE,
    notes: {
      tempo: '3 min',
      roteiro: [
        'Explique com a analogia do controle remoto: cada botão é uma câmera.',
        'Destaque que a ATEM não “transmite para o YouTube” no nosso fluxo de referência; quem faz isso é o OBS.',
        'Mostre que o computador enxerga a ATEM como se fosse uma webcam.',
      ],
      demonstracao: ['Aperte os botões 1, 2, 3 e 4 da ATEM com o monitor ligado e mostre a troca de imagem.'],
    },
  },
  {
    id: 'atem-botoes',
    module: 2,
    title: 'Conhecendo os botões',
    Component: Botoes,
    notes: {
      tempo: '6 min',
      roteiro: [
        'Clique em cada número da ilustração, começando pelos botões das câmeras (5) e por CUT/AUTO (3).',
        'Dê atenção especial ao FTB (4): apertado sem querer, deixa a live preta.',
        'Explique que os controles de áudio (1) só devem ser mexidos com orientação de quem cuida do som.',
      ],
      demonstracao: ['No equipamento real, mostre cada grupo de botões e as conexões da traseira.'],
      perguntas: ['O que você faria se a imagem ficasse preta de repente e o botão FTB estivesse piscando?'],
      atencao: 'Antes de ministrar, confira o modelo exato da ATEM da igreja e adapte a fala se algum recurso não existir nela.',
    },
  },
  {
    id: 'atem-conectar',
    module: 2,
    title: 'Como conectar a ATEM Mini',
    Component: Conectar,
    notes: {
      tempo: '6 min',
      roteiro: [
        'Use os botões 1 a 4 acima do diagrama para mostrar que a quantidade de câmeras depende da estrutura.',
        'Percorra os seis passos na ordem. Reforce: anotar qual câmera está em qual entrada evita confusão no culto.',
        'Comente a nota sobre ATEM Mini Pro/Extreme sem prometer o recurso.',
      ],
      demonstracao: ['Faça a ligação ao vivo: uma câmera por HDMI e a ATEM no computador pela USB-C.'],
      perguntas: ['Por que é importante conectar as câmeras sempre nas mesmas entradas?'],
    },
  },
]
