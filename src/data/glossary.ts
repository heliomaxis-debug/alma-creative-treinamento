export interface GlossaryTerm {
  term: string
  short: string
  detail: string
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: 'OBS Studio',
    short: 'Programa gratuito que monta e envia a transmissão.',
    detail: 'Open Broadcaster Software. Junta vídeo, áudio, imagens e textos em cenas e envia o resultado ao YouTube. Download oficial: obsproject.com.',
  },
  {
    term: 'ATEM Mini',
    short: 'Mesa de corte de vídeo da Blackmagic Design.',
    detail: 'Recebe várias câmeras por HDMI, permite alternar entre elas e envia o sinal escolhido ao computador pela USB. Os recursos variam entre os modelos (Mini, Pro, Pro ISO, Extreme).',
  },
  {
    term: 'Cena',
    short: 'Uma "tela pronta" no OBS.',
    detail: 'Conjunto organizado de fontes. Exemplos: "Aguardando o culto", "Câmera principal", "Encerramento". Trocar de cena muda o que o público vê.',
  },
  {
    term: 'Fonte',
    short: 'Um ingrediente de uma cena.',
    detail: 'Cada elemento dentro de uma cena: a imagem da ATEM, um logotipo, um texto, um áudio. A mesma fonte pode ser usada em várias cenas.',
  },
  {
    term: 'HDMI',
    short: 'Cabo que leva vídeo e áudio digital.',
    detail: 'Liga as câmeras à ATEM Mini e a ATEM a um monitor. Cabos frouxos ou muito longos são causa comum de imagem piscando ou ausente.',
  },
  {
    term: 'USB',
    short: 'Conexão entre a ATEM Mini e o computador.',
    detail: 'Na ATEM Mini, a porta USB-C entrega o sinal ao computador como se fosse uma webcam. Use um cabo de boa qualidade e uma porta adequada do computador.',
  },
  {
    term: 'RTMP / RTMPS',
    short: 'Protocolo usado para enviar a live ao YouTube.',
    detail: 'É o "caminho" pelo qual o OBS entrega o vídeo ao servidor do YouTube. O RTMPS é a versão com criptografia. Use o servidor recomendado pelo YouTube.',
  },
  {
    term: 'Bitrate (taxa de bits)',
    short: 'Quantidade de dados enviados por segundo.',
    detail: 'Medido em Kbps. Mais bitrate = mais qualidade, mas exige mais internet. Se for maior do que o upload aguenta, a live trava. Consulte a recomendação atual do YouTube para a resolução usada.',
  },
  {
    term: 'FPS',
    short: 'Quadros por segundo.',
    detail: 'Quantas imagens por segundo o vídeo tem. 30 FPS é uma boa referência para cultos. 60 FPS deixa movimentos mais suaves, mas exige mais do computador e da internet.',
  },
  {
    term: 'Latência',
    short: 'Atraso entre o que acontece e o que o público vê.',
    detail: 'Normalmente há alguns segundos de atraso entre o culto e a live. É esperado. O YouTube permite escolher modos de latência nas configurações da transmissão.',
  },
  {
    term: 'Chave de transmissão',
    short: 'Código secreto que liga o OBS ao canal.',
    detail: 'Quem tem a chave pode transmitir no canal da igreja. Trate como senha: nunca mostre, fotografe, envie em grupos ou salve em arquivos compartilhados.',
  },
  {
    term: 'Upload',
    short: 'Velocidade de envio da internet.',
    detail: 'É o que importa para transmitir (não o download). Como referência, deixe folga: o upload real deve ser bem maior do que o bitrate configurado.',
  },
  {
    term: 'Clipping',
    short: 'Áudio alto demais, que distorce.',
    detail: 'Acontece quando o sinal chega ao máximo (0 dB, faixa vermelha). A distorção fica gravada na live e não tem conserto depois.',
  },
  {
    term: 'Quadros perdidos',
    short: 'Partes do vídeo que não chegaram ao destino.',
    detail: 'Aparecem nas estatísticas do OBS. Se aumentam, há problema de rede (internet) ou de desempenho (computador sobrecarregado).',
  },
]
