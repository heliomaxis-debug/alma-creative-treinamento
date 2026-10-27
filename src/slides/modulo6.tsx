import {
  AppWindow,
  Cable,
  CloudOff,
  Cpu,
  Gauge,
  Headphones,
  Laptop,
  MicVocal,
  MonitorCheck,
  Plug,
  Power,
  RefreshCw,
  Router,
  SlidersHorizontal,
  TriangleAlert,
  Usb,
  Volume2,
  VolumeX,
  Wifi,
  type LucideIcon,
} from 'lucide-react'
import { DecisionChain } from '../components/diagrams/DecisionChain'
import { Callout } from '../components/ui/Callout'
import { SlideFrame } from '../components/ui/SlideFrame'
import type { SlideDef } from '../lib/types'

/** Card de causa → solução. */
function FixCard({ icon: Icon, cause, fix }: { icon: LucideIcon; cause: string; fix: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-ink-700 bg-ink-900/80 p-4 md:gap-4 md:p-5">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink-700 text-ink-100 md:size-11">
        <Icon className="size-5 md:size-6" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink-100 md:text-[20px]">{cause}</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-300 md:text-base">{fix}</p>
      </div>
    </div>
  )
}

function AtemNaoAparece() {
  return (
    <SlideFrame title="A ATEM Mini não aparece no OBS" lead="Vá do mais simples ao mais complexo. Quase sempre é cabo, porta ou outro programa usando a câmera.">
      <div className="grid gap-3 md:grid-cols-3 md:gap-4 stagger">
        <FixCard icon={Usb} cause="Cabo e porta USB" fix="Confira o cabo nas duas pontas e teste outra porta do computador." />
        <FixCard icon={Plug} cause="Alimentação" fix="Confirme que a ATEM está ligada na fonte e com os botões acesos." />
        <FixCard icon={Laptop} cause="Reconhecimento pelo sistema" fix="Veja se o sistema mostra o dispositivo (Gerenciador de Dispositivos no Windows; Informações do Sistema no Mac)." />
        <FixCard icon={AppWindow} cause="Outro programa usando" fix="Feche Zoom, Teams, navegador ou outro app que possa estar com a câmera aberta." />
        <FixCard icon={RefreshCw} cause="Fonte travada no OBS" fix="Remova a fonte e adicione de novo, escolhendo o dispositivo da ATEM." />
        <FixCard icon={Power} cause="Reiniciar equipamentos" fix="Só como último recurso, com segurança e autorização do responsável." />
      </div>
      <Callout tone="alerta" title="Reinicie somente quando for seguro e autorizado" className="mt-4 md:mt-6">
        Com a live no ar, reiniciar a ATEM ou o computador interrompe a transmissão. Coloque a cena de espera e avise a equipe antes.
      </Callout>
    </SlideFrame>
  )
}

function ImagemPreta() {
  return (
    <SlideFrame title="O OBS mostra imagem preta" lead="Siga o caminho do sinal, da câmera até o OBS. Clique em uma etapa para destacá-la.">
      <DecisionChain
        steps={[
          { question: 'A câmera está ligada?', fix: 'Ligue, confira bateria/fonte e tampa da lente.' },
          { question: 'A fonte HDMI está correta?', fix: 'Cabo firme, entrada certa e saída HDMI da câmera ativa.' },
          { question: 'A ATEM está mostrando a câmera?', fix: 'Aperte o botão da entrada; confira se o FTB está desligado.' },
          { question: 'O computador reconhece a ATEM?', fix: 'Confira USB, troque a porta, feche apps que usam câmera.' },
          { question: 'A fonte correta foi selecionada no OBS?', fix: 'Cena certa, fonte visível e dispositivo da ATEM escolhido.' },
        ]}
        done="Imagem de volta: confira a prévia no YouTube Studio"
      />
    </SlideFrame>
  )
}

const AUDIO_PATH: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MicVocal, title: 'Origem do áudio', text: 'O som está saindo da mesa ou do microfone para a transmissão?' },
  { icon: SlidersHorizontal, title: 'Configuração de áudio da ATEM', text: 'A entrada certa (MIC ou HDMI) está ligada e com nível?' },
  { icon: Cable, title: 'Cabos e conexões', text: 'Cabo de áudio firme na mesa, na ATEM ou na interface.' },
  { icon: Volume2, title: 'Mixer do OBS', text: 'O medidor da fonte mexe quando alguém fala?' },
  { icon: Gauge, title: 'Volume e clipping', text: 'Nem baixo demais, nem encostando no vermelho.' },
  { icon: VolumeX, title: 'Silenciamento da fonte', text: 'O ícone de mudo está desativado? O volume está acima do mínimo?' },
  { icon: Headphones, title: 'Saída e monitoramento', text: 'Confira o dispositivo de áudio e ouça a prévia do YouTube com fone.' },
]

function SemAudio() {
  return (
    <SlideFrame title="Tem imagem, mas não tem áudio" lead="Siga o caminho do som, na ordem, da origem até o fone.">
      <ol className="grid gap-2.5 md:grid-cols-2 md:gap-x-8 md:gap-y-3 stagger">
        {AUDIO_PATH.map((s, i) => {
          const Icon = s.icon
          return (
            <li key={s.title} className="flex items-center gap-3 rounded-xl border border-ink-700 bg-ink-900/80 p-3 md:gap-4 md:p-4">
              <span className="font-mono text-xs text-accent md:text-base">{String(i + 1).padStart(2, '0')}</span>
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink-700 text-ink-100 md:size-11">
                <Icon className="size-5 md:size-6" strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink-100 md:text-[20px]">{s.title}</span>
                <span className="block text-xs text-ink-300 md:text-base">{s.text}</span>
              </span>
            </li>
          )
        })}
        <li className="md:self-stretch">
          <Callout tone="atencao" title="Imagem não garante som" className="h-full">
            Confira o áudio de verdade, com fala real, sempre.
          </Callout>
        </li>
      </ol>
    </SlideFrame>
  )
}

const STATS: { metric: string; meaning: string; action: string }[] = [
  {
    metric: 'Quadros perdidos por rede',
    meaning: 'A internet não está dando conta.',
    action: 'Conferir conexão e outros usos da rede; reduzir o bitrate se necessário.',
  },
  {
    metric: 'Quadros pulados por atraso de codificação',
    meaning: 'O computador não consegue comprimir o vídeo a tempo.',
    action: 'Fechar programas; reduzir resolução de saída ou FPS.',
  },
  {
    metric: 'Quadros perdidos por atraso de renderização',
    meaning: 'O computador/placa de vídeo está sobrecarregado.',
    action: 'Fechar programas pesados; simplificar as cenas.',
  },
]

function Travando() {
  return (
    <SlideFrame title="A transmissão está travando" lead="Antes de mexer em qualquer coisa, descubra a causa nas estatísticas do OBS.">
      <div className="grid gap-5 md:grid-cols-[0.9fr_1.3fr] md:gap-8">
        <div>
          <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase md:text-sm">Causas comuns</p>
          <ul className="grid grid-cols-2 gap-2 md:gap-2.5 stagger">
            {[
              { icon: Wifi, t: 'Internet instável' },
              { icon: CloudOff, t: 'Upload insuficiente' },
              { icon: Cpu, t: 'Computador sobrecarregado' },
              { icon: Gauge, t: 'Bitrate inadequado' },
              { icon: TriangleAlert, t: 'Perda de quadros' },
              { icon: Router, t: 'Cabo ou rede com problema' },
            ].map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-center gap-2.5 rounded-xl border border-ink-700 bg-ink-900/80 p-3 text-sm text-ink-100 md:text-lg">
                <Icon className="size-5 shrink-0 text-ink-300" strokeWidth={1.75} />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-ink-400 md:text-base">
            Reduza resolução, FPS ou bitrate conforme a capacidade real da conexão. Para os valores, consulte a recomendação atual do YouTube para a resolução usada.
          </p>
        </div>
        <div className="rounded-2xl border border-ink-700 bg-ink-900 p-4 md:p-6">
          <p className="font-mono text-xs tracking-widest text-ink-400 uppercase md:text-sm">Como ler as estatísticas do OBS</p>
          <div className="mt-3 space-y-3">
            {STATS.map((s) => (
              <div key={s.metric} className="grid gap-1 border-b border-ink-700 pb-3 last:border-0 last:pb-0">
                <p className="text-sm font-semibold text-ink-100 md:text-[19px]">{s.metric}</p>
                <p className="text-xs text-ink-300 md:text-base">{s.meaning}</p>
                <p className="text-xs text-accent md:text-base">→ {s.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Callout tone="alerta" title="Não faça mudanças aleatórias durante o culto" className="mt-4 md:mt-5">
        Algumas alterações exigem parar a transmissão. Avalie o impacto e combine com o responsável antes.
      </Callout>
    </SlideFrame>
  )
}

function StatusMock({ receiving }: { receiving: boolean }) {
  return (
    <div className={`rounded-xl border p-3 md:p-4 ${receiving ? 'border-ok/50 bg-ok-soft' : 'border-warn/50 bg-warn-soft'}`}>
      <p className="font-mono text-[10px] tracking-widest text-ink-400 uppercase md:text-xs">YouTube Studio · prévia</p>
      <div className="mt-2 grid aspect-video place-items-center rounded-md bg-ink-950">
        {receiving ? (
          <MonitorCheck className="size-8 text-ok md:size-10" />
        ) : (
          <span className="size-6 animate-spin rounded-full border-2 border-ink-600 border-t-warn md:size-8" />
        )}
      </div>
      <p className={`mt-2 flex items-center gap-2 text-sm font-semibold md:text-lg ${receiving ? 'text-ok' : 'text-warn'}`}>
        <span className={`size-2 rounded-full ${receiving ? 'animate-pulse-dot bg-ok' : 'bg-warn'}`} />
        {receiving ? 'Recebendo' : 'Aguardando sinal'}
      </p>
    </div>
  )
}

function YouTubeSemSinal() {
  return (
    <SlideFrame title="O YouTube não recebe o sinal" lead="A prévia do Studio fica em “aguardando”. Confira estes pontos, em ordem.">
      <div className="grid gap-5 md:grid-cols-[1.4fr_1fr] md:gap-8">
        <ol className="space-y-2 md:space-y-2.5 stagger">
          {[
            'A transmissão correta foi criada/aberta no YouTube Studio?',
            'O OBS está enviando o sinal (botão “Parar transmissão” visível)?',
            'A chave está correta e corresponde a essa transmissão?',
            'A conexão com a internet funciona no computador?',
            'O YouTube Studio apresenta algum alerta?',
            'A conta possui autorização para transmitir ao vivo?',
          ].map((t, i) => (
            <li key={t} className="flex items-center gap-3 rounded-xl border border-ink-700 bg-ink-900/80 px-3 py-2.5 md:px-4 md:py-3">
              <span className="font-mono text-xs text-accent md:text-base">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm text-ink-100 md:text-[20px]">{t}</span>
            </li>
          ))}
        </ol>
        <div className="grid grid-cols-2 content-start gap-3 md:gap-4">
          <StatusMock receiving={false} />
          <StatusMock receiving />
          <p className="col-span-2 text-xs leading-relaxed text-ink-400 md:text-base">
            Ilustração. Os nomes dos status mudam com a interface do YouTube Studio. O que importa: a prévia mostra a imagem do culto.
          </p>
        </div>
      </div>
    </SlideFrame>
  )
}

export const modulo6: SlideDef[] = [
  {
    id: 'atem-nao-aparece',
    module: 6,
    title: 'A ATEM Mini não aparece no OBS',
    Component: AtemNaoAparece,
    notes: {
      tempo: '4 min',
      roteiro: [
        'Apresente as seis causas na ordem: do mais simples (cabo) ao mais drástico (reiniciar).',
        'Reforce que outro programa usando a câmera é uma causa muito comum e fácil de esquecer.',
        'Deixe claro que reiniciar só acontece com autorização.',
      ],
      demonstracao: ['Abra o Zoom ou o navegador com a câmera da ATEM e mostre que o OBS deixa de receber a imagem; depois feche e mostre a volta.'],
      perguntas: ['Por que não reiniciamos o computador logo de cara?'],
      atencao: 'Os nomes dos menus do sistema variam entre Windows e Mac; mostre no computador da igreja.',
    },
  },
  {
    id: 'imagem-preta',
    module: 6,
    title: 'O OBS mostra imagem preta',
    Component: ImagemPreta,
    notes: {
      tempo: '4 min',
      roteiro: [
        'Percorra o fluxograma de cima para baixo: cada “sim” desce, cada “não” aponta a correção.',
        'Ligue com o slide 3: o caminho do sinal é o mesmo, só que agora usado para achar o defeito.',
        'Lembre do FTB da ATEM como causa surpresa de tela preta.',
      ],
      demonstracao: ['Desconecte um HDMI (fora do culto!) e peça que um voluntário siga o fluxograma até achar o problema.'],
      perguntas: ['Em qual etapa você começaria se só uma das câmeras está preta?'],
    },
  },
  {
    id: 'sem-audio',
    module: 6,
    title: 'Tem imagem, mas não tem áudio',
    Component: SemAudio,
    notes: {
      tempo: '4 min',
      roteiro: [
        'Explique que o som tem seu próprio caminho, separado da imagem.',
        'Siga as sete verificações na ordem: origem, ATEM, cabos, mixer, volume, mudo, monitoramento.',
        'Recomende sempre ouvir a prévia do YouTube com fone, sem confiar só no medidor.',
      ],
      demonstracao: ['Mute a fonte no mixer do OBS e mostre como o medidor e o ícone indicam isso.'],
      perguntas: ['Quem cuida do som na igreja e como falamos com essa pessoa durante o culto?'],
      atencao: 'Confirme por onde o áudio entra na estrutura da igreja (ATEM, interface, mesa) e adapte a fala.',
    },
  },
  {
    id: 'travando',
    module: 6,
    title: 'A transmissão está travando',
    Component: Travando,
    notes: {
      tempo: '5 min',
      roteiro: [
        'Mostre que travamento tem duas famílias de causa: internet e computador.',
        'Explique como ler as três métricas das estatísticas do OBS e o que cada uma indica.',
        'Oriente a ajustar resolução, FPS ou bitrate conforme a capacidade real, consultando a recomendação atual do YouTube.',
      ],
      demonstracao: ['Abra as estatísticas do OBS (menu Exibir ou Docks, conforme a versão) e mostre onde ficam os quadros perdidos.'],
      perguntas: ['Se os quadros perdidos por rede estão subindo, adianta fechar programas no computador?'],
      atencao: 'Mudanças de saída podem exigir parar a transmissão. Nunca altere durante o culto sem combinar.',
    },
  },
  {
    id: 'youtube-sem-sinal',
    module: 6,
    title: 'O YouTube não recebe o sinal',
    Component: YouTubeSemSinal,
    notes: {
      tempo: '4 min',
      roteiro: [
        'Explique a diferença entre “aguardando sinal” e “recebendo” na prévia do Studio.',
        'Percorra as seis verificações; a mais comum é transmissão/chave diferente da configurada no OBS.',
        'Lembre que a primeira ativação de lives num canal pode levar até 24 horas.',
      ],
      demonstracao: ['Com uma transmissão de teste, mostre a prévia antes e depois de clicar em “Iniciar transmissão” no OBS.'],
      perguntas: ['O OBS mostra a imagem certinha. Isso garante que o YouTube está recebendo?'],
      atencao: 'Ao demonstrar, não exiba a chave de transmissão no telão.',
    },
  },
]
