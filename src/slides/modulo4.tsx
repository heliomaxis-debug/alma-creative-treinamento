import { ArrowRight, Eye, EyeOff, Globe, Link2, Lock, MonitorPlay, Radio, Send, Users } from 'lucide-react'
import { FieldMock, WindowMock } from '../components/diagrams/WindowMock'
import { Callout } from '../components/ui/Callout'
import { Card, MenuPath } from '../components/ui/Card'
import { SlideFrame } from '../components/ui/SlideFrame'
import { Steps } from '../components/ui/Steps'
import type { SlideDef } from '../lib/types'

function Canal() {
  return (
    <SlideFrame title="Preparando o canal" lead="Só transmite quem tem autorização para acessar o canal da igreja.">
      <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:gap-10">
        <Steps
          size="lg"
          items={[
            { title: 'Tenha acesso autorizado', detail: 'O responsável pelo canal concede a permissão à sua conta.' },
            { title: 'Entre em studio.youtube.com', detail: 'Com a conta que recebeu a permissão.' },
            { title: 'Abra a área de transmissão', detail: 'Normalmente em Criar → Transmitir ao vivo.' },
          ]}
        />
        <div className="space-y-4">
          <Callout tone="atencao" title="Primeira ativação de lives">
            Pode exigir verificação do canal e levar até 24 horas para ser liberada. Não deixe para o dia do culto.
          </Callout>
          <Callout tone="dica" title="A interface muda">
            O YouTube Studio é atualizado com frequência. Se um botão mudar de lugar, procure por “Criar” ou “Transmitir ao vivo”.
          </Callout>
          <Callout tone="alerta" title="Senhas e chaves não se compartilham">
            Ninguém da equipe vai pedir sua senha ou a chave de transmissão por mensagem. Desconfie de quem pedir.
          </Callout>
        </div>
      </div>
    </SlideFrame>
  )
}

const VISIBILITY = [
  { icon: Globe, title: 'Público', text: 'Qualquer pessoa encontra e assiste. Aparece no canal e nas buscas.' },
  { icon: Link2, title: 'Não listado', text: 'Só quem tem o link assiste. Não aparece no canal nem nas buscas.' },
  { icon: Lock, title: 'Privado', text: 'Só contas convidadas assistem. Bom para testes internos.' },
]

function CriarLive() {
  return (
    <SlideFrame title="Criando a live">
      <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:gap-10">
        <Steps
          items={[
            'Acesse a área de transmissão ao vivo no YouTube Studio',
            'Crie uma nova transmissão ou selecione a agendada',
            'Defina o título',
            'Adicione a descrição',
            'Defina a visibilidade correta',
            'Confira data e horário, quando agendada',
            'Verifique as configurações do evento',
          ]}
        />
        <div className="space-y-3">
          {VISIBILITY.map((v) => (
            <Card key={v.title} icon={v.icon} title={v.title}>
              {v.text}
            </Card>
          ))}
          <Callout tone="atencao" title="Quem decide a visibilidade?">
            Siga sempre a orientação dos responsáveis pelo canal.
          </Callout>
        </div>
      </div>
    </SlideFrame>
  )
}

function Chave() {
  return (
    <SlideFrame title="A chave de transmissão">
      <div className="grid gap-5 md:grid-cols-[1fr_1fr] md:gap-8">
        <div className="space-y-4">
          <WindowMock title="YouTube Studio · Configurações da transmissão">
            <div className="p-3 md:p-4">
              <FieldMock label="Chave de transmissão" value="" masked highlight />
              <FieldMock label="URL do stream" value="(exibida pelo YouTube)" mono />
            </div>
          </WindowMock>
          <WindowMock title="OBS · Configurações → Transmissão">
            <div className="p-3 md:p-4">
              <FieldMock label="Serviço" value="YouTube - RTMPS" highlight />
              <FieldMock label="Servidor" value="Recomendado pelo YouTube" />
              <FieldMock label="Conexão" value="Conectar conta (recomendado)" />
              <FieldMock label="ou Chave" value="" masked />
            </div>
          </WindowMock>
        </div>
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-ink-300 md:text-xl">
            O YouTube fornece uma chave ou permite conectar a conta direto no OBS, em <MenuPath path={['Configurações', 'Transmissão']} />. Use a integração ou o servidor recomendado pelo YouTube.
          </p>
          <div role="alert" className="rounded-2xl border-2 border-live bg-live-soft p-4 md:p-6">
            <p className="flex items-center gap-2 text-lg font-bold text-ink-100 md:text-[26px]">
              <EyeOff className="size-6 text-live md:size-8" /> A chave é uma senha
            </p>
            <ul className="mt-3 grid gap-1.5 text-sm text-ink-100 md:text-lg">
              {['Não exibir em capturas de tela ou no telão', 'Não colocar em código-fonte', 'Não compartilhar em grupos', 'Não armazenar em arquivos do projeto'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="font-mono text-live">✕</span> {t}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink-300 md:text-base">Se a chave vazar, avise o responsável para gerar outra.</p>
          </div>
        </div>
      </div>
    </SlideFrame>
  )
}

const PHASES = [
  { icon: Send, title: 'OBS envia', text: '“Iniciar transmissão”', tone: 'border-ink-600' },
  { icon: MonitorPlay, title: 'Prévia no Studio', text: 'Só a equipe vê', tone: 'border-warn/60' },
  { icon: Radio, title: 'Publicar', text: 'Botão ou início automático', tone: 'border-accent/60' },
  { icon: Users, title: 'Público', text: 'A live está no ar', tone: 'border-ok/60' },
]

function ConectarYoutube() {
  return (
    <SlideFrame title="Conectando o OBS ao YouTube">
      <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:gap-10">
        <Steps
          items={[
            'Confira a plataforma e o servidor selecionados',
            'Insira a chave autorizada, quando necessário',
            'Salve as configurações',
            'Confira imagem e áudio',
            'Clique em “Iniciar transmissão”',
            'Aguarde o YouTube receber o sinal',
            'Confira a prévia no YouTube Studio',
          ]}
        />
        <div className="space-y-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-1">
            {PHASES.map((p, i) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="flex items-center gap-1 md:flex-1">
                  <div className={`flex-1 rounded-xl border-2 bg-ink-900 p-3 text-center ${p.tone}`}>
                    <Icon className="mx-auto size-6 text-ink-100 md:size-7" />
                    <p className="mt-1.5 text-sm font-semibold text-ink-100 md:text-lg">{p.title}</p>
                    <p className="text-xs text-ink-400 md:text-sm">{p.text}</p>
                  </div>
                  {i < PHASES.length - 1 && <ArrowRight className="hidden size-5 shrink-0 text-accent md:block" />}
                </div>
              )
            })}
          </div>
          <Callout tone="atencao" title="Enviar não é o mesmo que publicar">
            Dependendo da configuração do YouTube, o sinal chega primeiro como prévia. A publicação pode ser manual (botão “Transmitir ao vivo”) ou automática.
          </Callout>
          <Callout tone="alerta" title="Confirme antes de afirmar">
            <span className="inline-flex items-center gap-1.5">
              <Eye className="size-4" /> Só diga que a live está pública depois de verificar o status no YouTube Studio.
            </span>
          </Callout>
        </div>
      </div>
    </SlideFrame>
  )
}

export const modulo4: SlideDef[] = [
  {
    id: 'yt-canal',
    module: 4,
    title: 'Preparando o canal',
    Component: Canal,
    notes: {
      tempo: '4 min',
      roteiro: [
        'Explique que o acesso ao canal é concedido pelo responsável, para a conta pessoal do voluntário.',
        'Mostre o endereço studio.youtube.com e onde fica a área de transmissão.',
        'Avise que a primeira ativação de lives pode levar até 24 horas.',
        'Reforce: ninguém pede senha nem chave por mensagem.',
      ],
      demonstracao: ['Abra o YouTube Studio da igreja (com sua conta) e mostre o botão Criar → Transmitir ao vivo, sem expor dados sensíveis.'],
      atencao: 'Não projete telas com a chave de transmissão visível.',
    },
  },
  {
    id: 'yt-criar-live',
    module: 4,
    title: 'Criando a live',
    Component: CriarLive,
    notes: {
      tempo: '5 min',
      roteiro: [
        'Percorra os sete passos de criação.',
        'Compare público, não listado e privado com exemplos práticos.',
        'Diga qual é o padrão de título e de visibilidade definido pela liderança.',
      ],
      demonstracao: ['Crie uma transmissão privada de teste e mostre onde ficam título, descrição e visibilidade.'],
      perguntas: ['Para um teste de equipe, qual visibilidade você usaria?'],
    },
  },
  {
    id: 'yt-chave',
    module: 4,
    title: 'Copiando a chave de transmissão',
    Component: Chave,
    notes: {
      tempo: '5 min',
      roteiro: [
        'Explique as duas formas: conectar a conta no OBS (recomendado) ou usar chave.',
        'Mostre o caminho Configurações → Transmissão no OBS.',
        'Dedique tempo ao aviso de segurança: a chave é uma senha do canal.',
      ],
      demonstracao: ['Mostre a tela de Configurações → Transmissão no OBS com a chave oculta.'],
      perguntas: ['O que fazer se alguém postar a chave no grupo por engano?'],
      atencao: 'Nunca mostre a chave real no telão, nem por um segundo.',
    },
  },
  {
    id: 'yt-conectar',
    module: 4,
    title: 'Conectando o OBS ao YouTube',
    Component: ConectarYoutube,
    notes: {
      tempo: '6 min',
      roteiro: [
        'Siga os sete passos e explique o diagrama das quatro fases.',
        'Destaque que enviar pelo OBS e publicar para o público podem ser etapas diferentes.',
        'Explique o início automático e quando a igreja usa (ou não) essa opção.',
      ],
      demonstracao: ['Envie o sinal para a transmissão privada de teste e mostre a prévia chegando no YouTube Studio.'],
      perguntas: ['O OBS mostra “Parar transmissão”. Isso garante que o público está vendo?'],
      atencao: 'Confirme no YouTube Studio antes de anunciar que a live está no ar.',
    },
  },
]
