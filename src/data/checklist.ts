export interface ChecklistItem {
  id: string
  text: string
  /** Item que, se falhar, pode derrubar ou expor a transmissão. */
  critical?: boolean
}

export interface ChecklistGroup {
  id: string
  title: string
  items: ChecklistItem[]
}

/** Checklist do slide 18 (antes do culto). */
export const PRE_SERVICE: ChecklistGroup[] = [
  {
    id: 'pre',
    title: 'Antes do culto',
    items: [
      { id: 'cameras', text: 'Câmeras ligadas, com bateria/fonte e cartão conferidos' },
      { id: 'atem', text: 'ATEM Mini ligada e mostrando as câmeras' },
      { id: 'fonte-obs', text: 'Fonte da ATEM reconhecida pelo OBS (tem imagem)', critical: true },
      { id: 'cena', text: 'Cena correta selecionada no OBS' },
      { id: 'audio', text: 'Áudio testado com fala real no medidor', critical: true },
      { id: 'internet', text: 'Internet verificada (cabo ou rede da transmissão)' },
      { id: 'teste', text: 'Transmissão de teste realizada, quando possível' },
      { id: 'titulo', text: 'Título e visibilidade conferidos no YouTube Studio', critical: true },
      { id: 'previa', text: 'Prévia do YouTube Studio recebendo o sinal', critical: true },
      { id: 'equipe', text: 'Responsáveis alinhados sobre o momento de iniciar' },
    ],
  },
]

/** Checklist operacional completo da consulta rápida. */
export const OPERATIONAL: ChecklistGroup[] = [
  {
    id: 'antes',
    title: 'Antes do culto',
    items: [
      { id: 'chegar', text: 'Chegar com a antecedência combinada pela equipe' },
      { id: 'energia', text: 'Equipamentos ligados na energia (fontes e baterias conferidas)' },
      { id: 'cameras', text: 'Câmeras ligadas, enquadradas e com foco' },
      { id: 'hdmi', text: 'Cabos HDMI firmes nas câmeras e na ATEM' },
      { id: 'atem', text: 'ATEM mostrando cada câmera ao apertar 1, 2, 3, 4' },
      { id: 'usb', text: 'USB da ATEM conectada ao computador' },
      { id: 'internet', text: 'Internet testada no computador da transmissão' },
    ],
  },
  {
    id: 'preparacao',
    title: 'Preparação da live',
    items: [
      { id: 'obs-fonte', text: 'OBS aberto e fonte "ATEM MINI" com imagem', critical: true },
      { id: 'obs-cenas', text: 'Cenas conferidas (Aguardando, Câmera, Encerramento)' },
      { id: 'audio', text: 'Áudio com fala real: medidor mexendo, sem vermelho', critical: true },
      { id: 'yt-evento', text: 'Transmissão correta aberta no YouTube Studio', critical: true },
      { id: 'yt-titulo', text: 'Título, descrição e visibilidade conferidos', critical: true },
      { id: 'obs-destino', text: 'OBS configurado para o destino certo (conta ou chave)' },
      { id: 'iniciar', text: 'Envio iniciado no OBS e prévia recebendo no YouTube', critical: true },
      { id: 'saude', text: 'Saúde da transmissão sem alertas graves' },
      { id: 'publicar', text: 'Momento de publicar confirmado com o responsável' },
    ],
  },
  {
    id: 'durante',
    title: 'Durante a transmissão',
    items: [
      { id: 'medidores', text: 'Acompanhando os medidores de áudio' },
      { id: 'imagem', text: 'Conferindo imagem, cena e indicadores do OBS' },
      { id: 'estatisticas', text: 'Sem quadros perdidos crescendo nas estatísticas' },
      { id: 'comunicar', text: 'Falhas comunicadas imediatamente ao responsável' },
      { id: 'sem-mudancas', text: 'Nenhuma configuração alterada sem necessidade' },
    ],
  },
  {
    id: 'encerramento',
    title: 'Encerramento',
    items: [
      { id: 'cena-final', text: 'Cena de encerramento exibida no momento combinado' },
      { id: 'finalizar', text: 'Live finalizada (OBS parado e YouTube encerrado)', critical: true },
      { id: 'conferir', text: 'Conferido no YouTube Studio que a live terminou' },
      { id: 'desligar', text: 'Equipamentos desligados na ordem orientada pela equipe' },
      { id: 'guardar', text: 'Cabos e equipamentos guardados e organizados' },
      { id: 'relato', text: 'Problemas do dia relatados à liderança' },
    ],
  },
]
