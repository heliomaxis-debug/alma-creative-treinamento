import { useState } from 'react'
import { Clapperboard, Layers, Send, Volume2 } from 'lucide-react'
import { AudioMeter } from '../components/diagrams/AudioMeter'
import { OBS_REGIONS, ObsMock, type ObsRegion } from '../components/diagrams/ObsMock'
import { CameraFeed, FieldMock, WindowMock } from '../components/diagrams/WindowMock'
import { Callout } from '../components/ui/Callout'
import { Card, MenuPath, Tag } from '../components/ui/Card'
import { SlideFrame } from '../components/ui/SlideFrame'
import { Steps } from '../components/ui/Steps'
import type { SlideDef } from '../lib/types'

function OQueE() {
  return (
    <SlideFrame
      title="O que é o OBS Studio?"
      lead="Um programa gratuito que organiza as fontes de vídeo e áudio em cenas e envia o resultado ao YouTube."
    >
      <div className="grid h-full items-center gap-6 md:grid-cols-[1fr_1.15fr] md:gap-10">
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4 stagger">
          <Card icon={Layers} title="Organiza">
            Junta a imagem da ATEM, logotipos, textos e áudio.
          </Card>
          <Card icon={Clapperboard} title="Monta cenas">
            Telas prontas para cada momento do culto.
          </Card>
          <Card icon={Volume2} title="Controla o áudio">
            Mostra os medidores e o volume de cada fonte.
          </Card>
          <Card icon={Send} title="Envia" tone="accent">
            Transmite para o YouTube (e pode gravar uma cópia).
          </Card>
        </div>
        <ObsMock numbered={false} />
      </div>
    </SlideFrame>
  )
}

function Instalacao() {
  return (
    <SlideFrame title="Instalação" lead="Baixe sempre pelo site oficial e escolha a versão do seu sistema operacional.">
      <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:gap-10">
        <div className="space-y-4">
          <Steps
            items={[
              { title: 'Abra o navegador e acesse obsproject.com', detail: 'Confira o endereço antes de clicar em qualquer download.' },
              { title: 'Escolha o sistema do computador', detail: 'Windows, macOS ou Linux.' },
              { title: 'Baixe o instalador' },
              { title: 'Execute e conclua a instalação', detail: 'As opções padrão atendem na maioria dos casos.' },
              { title: 'Abra o OBS', detail: 'Se aparecer o assistente de configuração automática, siga a orientação da equipe.' },
            ]}
          />
          <Callout tone="alerta" title="Só do site oficial">
            Evite sites de terceiros, “versões completas” ou links de grupos: podem conter vírus.
          </Callout>
        </div>
        <WindowMock title="https://obsproject.com/" className="self-start">
          <div className="p-5 md:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-ink-100 md:size-14">
                <span className="size-5 rounded-full border-4 border-ink-900 md:size-7" />
              </span>
              <div>
                <p className="text-lg font-semibold text-ink-100 md:text-2xl">OBS Studio</p>
                <p className="text-xs text-ink-400 md:text-base">Gratuito e de código aberto</p>
              </div>
            </div>
            <p className="mt-5 text-xs text-ink-400 md:text-base">Escolha o seu sistema:</p>
            <div className="mt-2 grid grid-cols-3 gap-2 md:gap-3">
              {['Windows', 'macOS', 'Linux'].map((os, i) => (
                <span
                  key={os}
                  className={`rounded-lg border px-2 py-3 text-center text-sm font-semibold md:py-4 md:text-lg ${
                    i === 0 ? 'border-accent bg-accent-soft text-ink-100' : 'border-ink-600 bg-ink-850 text-ink-300'
                  }`}
                >
                  {os}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-500 md:text-sm">Ilustração. O site real pode ter outra aparência.</p>
          </div>
        </WindowMock>
      </div>
    </SlideFrame>
  )
}

function Interface() {
  const [region, setRegion] = useState<ObsRegion>('preview')
  const info = OBS_REGIONS.find((r) => r.key === region)!
  return (
    <SlideFrame title="Conhecendo a interface" lead="Clique em cada área da janela.">
      <div className="grid gap-5 md:grid-cols-[1.35fr_1fr] md:gap-8">
        <ObsMock highlight={region} onSelect={setRegion} />
        <div className="flex flex-col gap-3 md:gap-4">
          <div key={region} className="animate-fade-in rounded-xl border border-accent/50 bg-accent-soft p-4 md:p-5">
            <p className="font-mono text-xs tracking-widest text-accent uppercase md:text-sm">
              {info.n} · {info.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-100 md:text-xl">{info.text}</p>
          </div>
          <div className="rounded-xl border border-ink-700 bg-ink-900 p-4 md:p-5">
            <p className="text-base font-semibold text-ink-100 md:text-[21px]">Cena × Fonte</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-300 md:text-lg">
              A <strong className="text-ink-100">cena</strong> é o prato pronto. As <strong className="text-ink-100">fontes</strong> são os ingredientes.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Tag className="border-accent/50 text-accent">Cena: Câmera principal</Tag>
              <span className="text-ink-500">=</span>
              <Tag>ATEM MINI</Tag>
              <span className="text-ink-500">+</span>
              <Tag>Logo Alma</Tag>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  )
}

const SCENES = [
  { name: 'Início / Aguardando o culto', sources: 'Imagem ou vídeo de espera, contagem, música' },
  { name: 'Câmera principal', sources: 'ATEM MINI (+ logo, se usado)' },
  { name: 'Câmera alternativa', sources: 'ATEM MINI com outro enquadramento ou recorte' },
  { name: 'Avisos ou letras', sources: 'Imagens de avisos ou letras, se disponíveis' },
  { name: 'Encerramento', sources: 'Imagem final, redes sociais, agradecimento' },
]

function Cenas() {
  return (
    <SlideFrame title="Criando as cenas" lead="Uma cena para cada momento do culto.">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:gap-10">
        <ul className="grid gap-2 md:gap-3 stagger">
          {SCENES.map((s, i) => (
            <li key={s.name} className="flex items-center gap-4 rounded-xl border border-ink-700 bg-ink-900 px-4 py-3 md:px-5">
              <span className="font-mono text-sm text-accent md:text-lg">{String(i + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink-100 md:text-[21px]">{s.name}</p>
                <p className="text-xs text-ink-400 md:text-base">Fontes: {s.sources}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="space-y-4">
          <p className="text-sm font-semibold text-ink-100 md:text-[21px]">Como criar uma cena</p>
          <Steps
            items={[
              'No painel Cenas, clique no botão +',
              'Digite o nome da cena e confirme',
              'Com a cena selecionada, adicione as fontes no painel Fontes',
              'Confira a pré-visualização',
            ]}
          />
          <Callout tone="dica" title="Os nomes são sugestões">
            Adapte as cenas ao fluxo real do Alma Creative e mantenha os mesmos nomes em todos os cultos.
          </Callout>
        </div>
      </div>
    </SlideFrame>
  )
}

function AtemFonte() {
  return (
    <SlideFrame title="Adicionando a ATEM Mini como fonte">
      <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:gap-10">
        <Steps
          items={[
            'Conecte a ATEM Mini ao computador pela USB',
            'Abra o OBS',
            { title: 'Na área Fontes, clique no botão +' },
            { title: 'Selecione “Dispositivo de captura de vídeo”' },
            { title: 'Crie uma fonte chamada “ATEM MINI”' },
            { title: 'Escolha o dispositivo correspondente na lista', detail: 'Geralmente aparece como “Blackmagic Design”; o nome pode variar por sistema.' },
            'Confirme e verifique a imagem na pré-visualização',
          ]}
        />
        <div className="space-y-4">
          <WindowMock title="Propriedades de “ATEM MINI”">
            <div className="grid gap-3 p-3 md:grid-cols-[180px_1fr] md:p-4">
              <div className="aspect-video overflow-hidden rounded-md border border-ink-700">
                <CameraFeed label="ATEM" />
              </div>
              <div>
                <FieldMock label="Dispositivo" value="Blackmagic Design" highlight />
                <FieldMock label="Resolução/FPS" value="Padrão do dispositivo" />
              </div>
            </div>
          </WindowMock>
          <Callout tone="atencao" title="O dispositivo não aparece?">
            Confira o cabo e a porta USB, a alimentação da ATEM, se o sistema reconhece o equipamento e se outro programa (Zoom, Teams, navegador) está usando a câmera.
          </Callout>
        </div>
      </div>
    </SlideFrame>
  )
}

function Video() {
  return (
    <SlideFrame title="Configurando o vídeo" lead={<>Acesse <MenuPath path={['Configurações', 'Vídeo']} /></>}>
      <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:gap-10">
        <div className="space-y-4">
          <WindowMock title="Configurações · Vídeo">
            <div className="p-3 md:p-5">
              <FieldMock label="Resolução base (tela)" value="1920 × 1080" highlight />
              <FieldMock label="Resolução de saída (redimensionada)" value="1920 × 1080" highlight />
              <FieldMock label="Valores comuns de FPS" value="30" highlight />
            </div>
          </WindowMock>
          <p className="text-xs text-ink-500 md:text-sm">Os nomes dos campos podem variar conforme a versão do OBS.</p>
        </div>
        <div className="space-y-3 md:space-y-4">
          <Card title="Resolução base">O tamanho da “tela” onde você monta as cenas.</Card>
          <Card title="Resolução de saída">O tamanho do vídeo que vai para o YouTube.</Card>
          <Card title="FPS">Quadros por segundo. Referência inicial: 30.</Card>
          <Callout tone="dica" title="1920 × 1080 a 30 FPS é a referência">
            Desde que computador, câmeras, internet e destino suportem. 60 FPS pode servir em alguns cenários, mas exige mais processamento e banda. Mantenha câmeras, ATEM e OBS no mesmo FPS.
          </Callout>
        </div>
      </div>
    </SlideFrame>
  )
}

function Audio() {
  return (
    <SlideFrame title="Configurando o áudio" lead="O áudio pode vir da própria ATEM Mini ou de uma interface separada, conforme a estrutura da igreja.">
      <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:gap-10">
        <Steps
          items={[
            { title: 'Dispositivo de áudio correto', detail: 'Confira a fonte e Configurações → Áudio.' },
            { title: 'Medidores do mixer se mexendo' },
            { title: 'Sinal testado com fala real', detail: 'Peça para alguém falar no microfone do culto.' },
            { title: 'Sem clipping nem distorção', detail: 'Nunca encostar no vermelho.' },
            { title: 'Voz sincronizada com a imagem' },
          ]}
        />
        <div className="space-y-4">
          <AudioMeter />
          <Callout tone="alerta" title="Imagem não garante áudio">
            A imagem aparecer não significa que o microfone está chegando. Confira o medidor e ouça com fone.
          </Callout>
        </div>
      </div>
    </SlideFrame>
  )
}

export const modulo3: SlideDef[] = [
  {
    id: 'obs-o-que-e',
    module: 3,
    title: 'O que é o OBS Studio?',
    Component: OQueE,
    notes: {
      tempo: '3 min',
      roteiro: [
        'Apresente o OBS como a “cozinha” da transmissão: junta os ingredientes e entrega o prato pronto.',
        'Explique que é gratuito e usado por igrejas e criadores no mundo todo.',
        'Diga que nos próximos slides vamos instalar, conhecer a tela e configurar.',
      ],
      demonstracao: ['Abra o OBS no computador da transmissão e mostre a janela principal.'],
    },
  },
  {
    id: 'obs-instalacao',
    module: 3,
    title: 'Instalação',
    Component: Instalacao,
    notes: {
      tempo: '3 min',
      roteiro: [
        'Mostre o endereço oficial: obsproject.com.',
        'Explique que cada sistema operacional tem seu instalador.',
        'Reforce o alerta: nunca baixar de sites de terceiros.',
      ],
      demonstracao: ['Abra o site oficial no navegador e mostre onde ficam os botões de download (sem precisar instalar de novo).'],
      atencao: 'No computador da igreja, não atualize o OBS em dia de culto sem combinar com a liderança.',
    },
  },
  {
    id: 'obs-interface',
    module: 3,
    title: 'Conhecendo a interface',
    Component: Interface,
    notes: {
      tempo: '6 min',
      roteiro: [
        'Clique nas áreas na ordem: pré-visualização, cenas, fontes, mixer, transições, controles.',
        'Explique cena × fonte com a analogia do prato e dos ingredientes.',
        'Lembre que a disposição pode mudar conforme a versão e o layout salvo.',
      ],
      demonstracao: ['No OBS real, troque de cena e mostre que as fontes listadas mudam junto.'],
      perguntas: ['Se eu quero mostrar o logo em todas as cenas, ele é uma cena ou uma fonte?'],
    },
  },
  {
    id: 'obs-cenas',
    module: 3,
    title: 'Criando as cenas',
    Component: Cenas,
    notes: {
      tempo: '5 min',
      roteiro: [
        'Passe pelas cinco cenas sugeridas e pelo que vai em cada uma.',
        'Mostre os passos para criar uma cena nova.',
        'Reforce que os nomes devem ser padronizados para todos os voluntários.',
      ],
      demonstracao: ['Crie uma cena de teste chamada “Treinamento” e depois apague.'],
      perguntas: ['Em que momento do culto usaríamos a cena de espera?'],
    },
  },
  {
    id: 'obs-fonte-atem',
    module: 3,
    title: 'Adicionando a ATEM Mini como fonte',
    Component: AtemFonte,
    notes: {
      tempo: '6 min',
      roteiro: [
        'Siga os sete passos devagar, um de cada vez.',
        'Explique que o nome do dispositivo pode variar; o importante é reconhecer o da ATEM.',
        'Passe pelas causas comuns quando o dispositivo não aparece.',
      ],
      demonstracao: ['Adicione a fonte ao vivo. Depois desconecte a USB por alguns segundos e mostre o que acontece.'],
      atencao: 'Não desconecte a USB durante um culto: a demonstração é só para o treinamento.',
    },
  },
  {
    id: 'obs-video',
    module: 3,
    title: 'Configurando o vídeo',
    Component: Video,
    notes: {
      tempo: '4 min',
      roteiro: [
        'Mostre o caminho Configurações → Vídeo.',
        'Explique resolução base, resolução de saída e FPS com palavras simples.',
        'Use 1920×1080 a 30 FPS como referência, sempre condicionada ao equipamento e à internet.',
      ],
      demonstracao: ['Abra as configurações de vídeo no computador da igreja e confira os valores atuais.'],
      perguntas: ['Por que não usar sempre 60 FPS se fica mais suave?'],
      atencao: 'Não altere a configuração oficial durante o treinamento sem combinar com o responsável técnico.',
    },
  },
  {
    id: 'obs-audio',
    module: 3,
    title: 'Configurando o áudio',
    Component: Audio,
    notes: {
      tempo: '6 min',
      roteiro: [
        'Explique de onde vem o áudio na estrutura da igreja (ATEM ou interface separada).',
        'Use o simulador: mostre os estados sem sinal, baixo, bom e clipando.',
        'Reforce o alerta: imagem perfeita não significa áudio chegando.',
      ],
      demonstracao: ['Peça para alguém falar no microfone e mostre o medidor real do OBS.', 'Ouça a saída com fone para conferir sincronia.'],
      perguntas: ['O medidor está parado, mas a imagem está ótima. Qual o primeiro passo?'],
    },
  },
]
