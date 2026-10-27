import { CloudOff, ImageOff, Gauge, VolumeX, type LucideIcon } from 'lucide-react'

/** Pergunta de sim/não. "sim" segue para a próxima pergunta; "não" leva a uma correção. */
export interface QuestionNode {
  kind: 'q'
  text: string
  hint?: string
  yes: string
  no: string
}

/** Correção sugerida. Se não resolver, continua em `next`. */
export interface FixNode {
  kind: 'fix'
  title: string
  steps: string[]
  warn?: string
  next: string
}

/** Fim do diagnóstico. */
export interface EndNode {
  kind: 'end'
  title: string
  text: string
  tone: 'ok' | 'escalar'
}

export type DiagNode = QuestionNode | FixNode | EndNode

export interface Problem {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  start: string
  nodes: Record<string, DiagNode>
}

const ESCALAR: EndNode = {
  kind: 'end',
  tone: 'escalar',
  title: 'Chame o responsável técnico',
  text: 'Você já conferiu o básico. Informe o que testou, mantenha a cena de espera no ar se for preciso e não faça mudanças grandes sem orientação.',
}

export const PROBLEMS: Problem[] = [
  {
    id: 'sem-imagem',
    title: 'Sem imagem',
    subtitle: 'OBS preto ou ATEM não aparece',
    icon: ImageOff,
    start: 'q1',
    nodes: {
      q1: { kind: 'q', text: 'A câmera está ligada e mostrando imagem no próprio visor?', yes: 'q2', no: 'f1' },
      f1: { kind: 'fix', title: 'Ligue e confira a câmera', steps: ['Confira bateria ou fonte de energia.', 'Veja se a câmera saiu do modo de espera.', 'Confirme que a tampa da lente foi retirada.'], next: 'q2' },
      q2: { kind: 'q', text: 'A câmera aparece na ATEM ao apertar o botão da entrada dela?', hint: 'Use a saída HDMI/monitor da ATEM, se houver.', yes: 'q3', no: 'f2' },
      f2: { kind: 'fix', title: 'Confira o HDMI e a entrada', steps: ['Cabo HDMI firme nas duas pontas.', 'Câmera ligada na entrada certa (1, 2, 3 ou 4).', 'Saída HDMI da câmera ativada nas configurações dela.', 'Teste outro cabo HDMI, se houver.'], next: 'q3' },
      q3: { kind: 'q', text: 'A ATEM está ligada e o botão FTB (Fade to Black) está apagado?', hint: 'FTB piscando = saída escurecida.', yes: 'q4', no: 'f3' },
      f3: { kind: 'fix', title: 'Ligue a ATEM / desative o FTB', steps: ['Confira a fonte de energia da ATEM.', 'Se o FTB estiver piscando, aperte FTB uma vez para voltar a imagem.'], warn: 'Avise a equipe antes, se a live já estiver no ar.', next: 'q4' },
      q4: { kind: 'q', text: 'O computador reconhece a ATEM (aparece como câmera/dispositivo de vídeo)?', yes: 'q5', no: 'f4' },
      f4: { kind: 'fix', title: 'Reconexão USB', steps: ['Confira o cabo USB-C nas duas pontas.', 'Experimente outra porta USB do computador.', 'Feche outros programas que possam estar usando a câmera (Zoom, Teams, navegador).', 'Veja se o sistema mostra o dispositivo (Gerenciador de Dispositivos no Windows; Informações do Sistema no Mac).'], next: 'q5' },
      q5: { kind: 'q', text: 'No OBS, a cena certa está selecionada e a fonte "ATEM MINI" está visível (com o ícone de olho ativo)?', yes: 'q6', no: 'f5' },
      f5: { kind: 'fix', title: 'Ajuste no OBS', steps: ['Selecione a cena correta.', 'Ative a visibilidade (olho) da fonte.', 'Confira se a fonte não está atrás de outra imagem que a cobre.'], next: 'q6' },
      q6: { kind: 'q', text: 'Nas propriedades da fonte, o dispositivo selecionado é o da ATEM?', yes: 'ok', no: 'f6' },
      f6: { kind: 'fix', title: 'Selecione o dispositivo certo', steps: ['Clique duas vezes na fonte "ATEM MINI".', 'Em Dispositivo, escolha o da ATEM (geralmente aparece como "Blackmagic Design").', 'Se continuar preto, remova a fonte e adicione de novo.'], next: 'escalar' },
      ok: { kind: 'end', tone: 'ok', title: 'Imagem de volta?', text: 'Se a pré-visualização mostra a imagem, confira também a prévia no YouTube Studio antes de seguir.' },
      escalar: ESCALAR,
    },
  },
  {
    id: 'sem-audio',
    title: 'Sem áudio',
    subtitle: 'Tem imagem, mas não tem som',
    icon: VolumeX,
    start: 'q1',
    nodes: {
      q1: { kind: 'q', text: 'O som está saindo da origem (mesa de som ou microfone) para a transmissão?', hint: 'Pergunte à equipe de som se o envio para a transmissão está aberto.', yes: 'q2', no: 'f1' },
      f1: { kind: 'fix', title: 'Fale com a equipe de som', steps: ['Peça para conferirem o envio (aux/saída) para a transmissão.', 'Confira o cabo de áudio que sai da mesa.'], next: 'q2' },
      q2: { kind: 'q', text: 'Na ATEM, o áudio da entrada certa (câmera ou MIC) está ligado (ON)?', yes: 'q3', no: 'f2' },
      f2: { kind: 'fix', title: 'Ative o áudio na ATEM', steps: ['Identifique por onde o áudio entra (MIC 1/2 ou HDMI).', 'Ligue o áudio dessa entrada (ON) e ajuste o nível.'], warn: 'Combine com quem cuida do som antes de alterar níveis.', next: 'q3' },
      q3: { kind: 'q', text: 'No mixer do OBS, o medidor da fonte de áudio se mexe quando alguém fala?', yes: 'q5', no: 'q4' },
      q4: { kind: 'q', text: 'A fonte no mixer está sem o ícone de mudo e com o volume acima do mínimo?', yes: 'f4', no: 'f3' },
      f3: { kind: 'fix', title: 'Tire do mudo', steps: ['Clique no ícone de alto-falante para desmutar.', 'Suba o controle de volume da fonte.'], next: 'q3' },
      f4: { kind: 'fix', title: 'Confira o dispositivo de áudio', steps: ['Abra as propriedades da fonte de áudio (ou da fonte da ATEM).', 'Selecione o dispositivo da ATEM ou da interface de áudio usada.', 'Confira em Configurações → Áudio se não há dispositivo desativado ou errado.'], next: 'q5' },
      q5: { kind: 'q', text: 'O som está limpo, sem chegar ao vermelho e sincronizado com a imagem?', yes: 'ok', no: 'f5' },
      f5: { kind: 'fix', title: 'Ajuste de qualidade', steps: ['Se está no vermelho: peça redução do ganho na origem.', 'Se está atrasado/adiantado: avise o responsável (ajuste de sincronia de áudio).', 'Confira se não há duas fontes captando o mesmo som (eco).'], next: 'escalar' },
      ok: { kind: 'end', tone: 'ok', title: 'Áudio funcionando?', text: 'Confira também ouvindo a prévia no YouTube Studio com fone, sem confiar só no medidor.' },
      escalar: ESCALAR,
    },
  },
  {
    id: 'travando',
    title: 'Live travando',
    subtitle: 'Imagem congela ou fica pixelada',
    icon: Gauge,
    start: 'q1',
    nodes: {
      q1: { kind: 'q', text: 'Nas estatísticas do OBS, os "quadros perdidos por rede" estão em zero ou quase zero?', hint: 'Menu Exibir/Docks → Estatísticas (o nome pode variar por versão).', yes: 'q2', no: 'f1' },
      f1: { kind: 'fix', title: 'Problema de internet', steps: ['Confira o cabo de rede ou a qualidade do Wi-Fi.', 'Peça para pausarem downloads, atualizações e outros usos da rede.', 'Se não melhorar, com autorização, reduza o bitrate em Configurações → Saída.'], warn: 'Mudar configurações durante o culto pode interromper a live. Combine antes com o responsável.', next: 'q2' },
      q2: { kind: 'q', text: 'Os quadros "pulados por atraso de codificação" ou de renderização estão baixos?', yes: 'q3', no: 'f2' },
      f2: { kind: 'fix', title: 'Computador sobrecarregado', steps: ['Feche programas que não são necessários.', 'Confira se o notebook está ligado na tomada.', 'Com autorização, reduza FPS ou resolução de saída na próxima pausa.'], next: 'q3' },
      q3: { kind: 'q', text: 'A imagem na ATEM e no OBS está estável (sem piscar)?', yes: 'ok', no: 'f3' },
      f3: { kind: 'fix', title: 'Cabos e sinal', steps: ['Confira os cabos HDMI e o USB da ATEM.', 'Confira se todas as câmeras usam o mesmo formato (ex.: 1080p30).'], next: 'escalar' },
      ok: { kind: 'end', tone: 'ok', title: 'Estável?', text: 'Acompanhe a saúde da transmissão no YouTube Studio durante o culto. Anote o que aconteceu para a equipe revisar depois.' },
      escalar: ESCALAR,
    },
  },
  {
    id: 'youtube-sem-sinal',
    title: 'YouTube sem sinal',
    subtitle: 'O Studio não recebe a transmissão',
    icon: CloudOff,
    start: 'q1',
    nodes: {
      q1: { kind: 'q', text: 'O OBS está transmitindo (botão mostra "Parar transmissão" e a barra inferior indica envio)?', yes: 'q2', no: 'f1' },
      f1: { kind: 'fix', title: 'Inicie o envio no OBS', steps: ['Clique em "Iniciar transmissão".', 'Se aparecer erro, leia a mensagem: ela costuma indicar chave ou conexão.'], next: 'q2' },
      q2: { kind: 'q', text: 'A transmissão aberta no YouTube Studio é a mesma configurada no OBS (mesma chave/evento)?', yes: 'q3', no: 'f2' },
      f2: { kind: 'fix', title: 'Ajuste a transmissão correta', steps: ['No YouTube Studio, abra a transmissão certa.', 'No OBS, em Configurações → Transmissão, use a conta conectada ou a chave correspondente a essa transmissão.', 'Salve e inicie de novo.'], next: 'q3' },
      q3: { kind: 'q', text: 'O computador tem acesso à internet (abre sites normalmente)?', yes: 'q4', no: 'f3' },
      f3: { kind: 'fix', title: 'Restabeleça a internet', steps: ['Confira cabo de rede ou Wi-Fi.', 'Fale com o responsável pela rede da igreja.'], next: 'q4' },
      q4: { kind: 'q', text: 'O YouTube Studio está sem alertas e a conta tem permissão para transmitir ao vivo?', yes: 'ok', no: 'f4' },
      f4: { kind: 'fix', title: 'Verifique alertas e permissões', steps: ['Leia os alertas da sala de controle da transmissão.', 'Confirme com o responsável pelo canal se a conta tem permissão e se o recurso de live está ativo.', 'Lembre: a primeira ativação de lives pode levar até 24 horas.'], next: 'escalar' },
      ok: { kind: 'end', tone: 'ok', title: 'Recebendo?', text: 'Com a prévia aparecendo, confirme com o responsável o momento de publicar (se o início não for automático).' },
      escalar: ESCALAR,
    },
  },
]
