export interface QuizQuestion {
  question: string
  options: string[]
  answer: number
  explanation: string
}

export const QUIZ: QuizQuestion[] = [
  {
    question: 'Qual é a função da ATEM Mini?',
    options: [
      'Enviar a live direto para o público sem computador, sempre',
      'Receber as câmeras e escolher qual imagem segue para o computador',
      'Gravar o culto no YouTube',
      'Substituir o OBS Studio',
    ],
    answer: 1,
    explanation: 'A ATEM recebe as câmeras por HDMI e permite alternar entre elas. No nosso fluxo, o sinal escolhido vai pela USB para o computador, onde o OBS faz o envio.',
  },
  {
    question: 'Qual é a diferença entre cena e fonte no OBS?',
    options: [
      'Não há diferença, são nomes para a mesma coisa',
      'A fonte é a tela completa; a cena é um elemento dela',
      'A cena é a tela montada; as fontes são os elementos dentro dela',
      'Cena é áudio e fonte é vídeo',
    ],
    answer: 2,
    explanation: 'A cena é a "tela pronta" (ex.: Câmera principal). As fontes são os ingredientes dessa tela: a ATEM, o logotipo, um texto.',
  },
  {
    question: 'Onde configuramos a chave de transmissão no OBS?',
    options: ['Configurações → Transmissão', 'Configurações → Vídeo', 'No mixer de áudio', 'Na lista de cenas'],
    answer: 0,
    explanation: 'Em Configurações → Transmissão escolhemos o serviço (YouTube) e conectamos a conta ou informamos a chave autorizada.',
  },
  {
    question: 'Tem imagem, mas não tem áudio. O que conferir primeiro?',
    options: [
      'Reiniciar o computador imediatamente',
      'Aumentar o bitrate',
      'A origem do áudio e o medidor da fonte no mixer do OBS (mudo, volume, dispositivo)',
      'Trocar a câmera na ATEM',
    ],
    answer: 2,
    explanation: 'Siga o caminho do som: de onde ele vem (mesa, microfone, ATEM), se chega no mixer do OBS, se a fonte está muda e se o dispositivo está certo.',
  },
  {
    question: 'Como confirmar que o YouTube está recebendo o sinal?',
    options: [
      'Basta o OBS mostrar a imagem na pré-visualização',
      'Olhando a prévia e o status da transmissão no YouTube Studio',
      'Perguntando no grupo se alguém está vendo',
      'Pelo tamanho do arquivo gravado',
    ],
    answer: 1,
    explanation: 'O OBS mostrar a imagem não garante a entrega. Confirme no YouTube Studio: a prévia aparece e o status/saúde da transmissão indica recebimento.',
  },
  {
    question: 'Por que não podemos compartilhar a chave de transmissão?',
    options: [
      'Porque ela expira a cada minuto',
      'Porque quem tem a chave pode transmitir qualquer conteúdo no canal da igreja',
      'Porque ela deixa a internet mais lenta',
      'Não há problema em compartilhar em grupos da equipe',
    ],
    answer: 1,
    explanation: 'A chave funciona como uma senha do canal. Com ela, qualquer pessoa pode transmitir em nome da igreja. Trate-a como senha.',
  },
]
