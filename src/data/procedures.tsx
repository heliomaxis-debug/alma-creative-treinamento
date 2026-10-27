export interface Procedure {
  id: string
  title: string
  /** Número do slide com a explicação completa. */
  slide: number
  steps: string[]
  warn?: string
  tip?: string
}

export const PROCEDURES: Procedure[] = [
  {
    id: 'conectar-atem',
    title: 'Conectar a ATEM Mini',
    slide: 6,
    steps: [
      'Ligue as câmeras e confira bateria ou fonte.',
      'Conecte cada câmera a uma entrada HDMI (anote qual é qual).',
      'Conecte a ATEM ao computador pela USB-C.',
      'Ligue a ATEM e os demais equipamentos.',
      'Aperte o botão de uma câmera na ATEM.',
      'Confirme no OBS que a imagem chega ao computador.',
    ],
    tip: 'Modelos Pro/Extreme podem transmitir direto pela rede. Não presuma que isso está configurado na igreja.',
  },
  {
    id: 'atem-obs',
    title: 'Adicionar a ATEM no OBS',
    slide: 11,
    steps: [
      'Com a ATEM conectada, abra o OBS.',
      'Selecione a cena desejada.',
      'Em Fontes, clique em +.',
      'Escolha "Dispositivo de captura de vídeo".',
      'Crie uma fonte chamada "ATEM MINI".',
      'Em Dispositivo, escolha o da ATEM (geralmente "Blackmagic Design").',
      'Clique em OK e confira a imagem na pré-visualização.',
    ],
    warn: 'Não aparece? Confira cabo USB, alimentação, se o sistema reconhece a ATEM e se outro programa (Zoom, Teams, navegador) está usando o dispositivo.',
  },
  {
    id: 'audio',
    title: 'Conferir o áudio',
    slide: 13,
    steps: [
      'Confirme de onde vem o áudio: ATEM ou interface separada.',
      'No mixer do OBS, veja se a fonte certa aparece e não está muda.',
      'Peça para alguém falar no microfone real do culto.',
      'Os picos devem ficar no amarelo, sem chegar ao vermelho.',
      'Ouça com fone e confira a sincronia entre voz e imagem.',
    ],
    warn: 'Ter imagem não garante ter áudio. Sempre teste com fala real.',
  },
  {
    id: 'criar-live',
    title: 'Criar a live no YouTube',
    slide: 15,
    steps: [
      'Entre em studio.youtube.com com a conta autorizada.',
      'Clique em Criar → Transmitir ao vivo.',
      'Crie ou selecione a transmissão do culto.',
      'Defina título e descrição.',
      'Defina a visibilidade conforme orientação (Público, Não listado ou Privado).',
      'Confira data e horário, se agendada.',
      'Revise as configurações do evento.',
    ],
    tip: 'A primeira ativação de lives no canal pode levar até 24 horas. A interface do YouTube Studio muda com frequência.',
  },
  {
    id: 'obs-youtube',
    title: 'Conectar o OBS ao YouTube',
    slide: 16,
    steps: [
      'No OBS, abra Configurações → Transmissão.',
      'Em Serviço, escolha YouTube (RTMPS).',
      'Use "Conectar conta" (recomendado) ou a chave de transmissão autorizada.',
      'Mantenha o servidor recomendado pelo YouTube.',
      'Clique em Aplicar e OK.',
    ],
    warn: 'A chave é uma senha: nunca mostre na tela, fotografe, envie em grupos ou salve em arquivos.',
  },
  {
    id: 'iniciar',
    title: 'Iniciar a live',
    slide: 19,
    steps: [
      'Confira imagem, cena e áudio no OBS.',
      'Abra a transmissão correta no YouTube Studio.',
      'Clique em "Iniciar transmissão" no OBS.',
      'Aguarde a prévia aparecer no YouTube Studio.',
      'Confira a saúde da transmissão.',
      'Publique apenas no momento combinado com o responsável.',
    ],
    warn: 'Iniciar o envio no OBS e publicar para o público podem ser etapas diferentes. Só diga que está no ar depois de conferir no YouTube Studio.',
  },
  {
    id: 'encerrar',
    title: 'Encerrar a live corretamente',
    slide: 26,
    steps: [
      'Exiba a cena de encerramento no momento combinado.',
      'Finalize a transmissão no YouTube Studio (Encerrar transmissão).',
      'Clique em "Parar transmissão" no OBS.',
      'Confira no YouTube Studio que a live terminou.',
      'Desligue os equipamentos na ordem orientada pela equipe.',
    ],
    tip: 'Relate à liderança qualquer problema ocorrido durante o culto.',
  },
]
