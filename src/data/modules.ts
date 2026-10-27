import { Clapperboard, HandHeart, LifeBuoy, PlayCircle, Radio, SlidersHorizontal, Trophy } from 'lucide-react'
import type { ModuleDef } from '../lib/types'

export const MODULES: ModuleDef[] = [
  { n: 1, title: 'Boas-vindas ao Alma Creative', icon: HandHeart },
  { n: 2, title: 'Conhecendo a ATEM Mini', icon: SlidersHorizontal },
  { n: 3, title: 'Configurando o OBS Studio', icon: Clapperboard },
  { n: 4, title: 'Criando a transmissão no YouTube', icon: PlayCircle },
  { n: 5, title: 'Teste e operação no culto', icon: Radio },
  { n: 6, title: 'Resolução de problemas', icon: LifeBuoy },
  { n: 7, title: 'Prática e encerramento', icon: Trophy },
]

export const moduleLabel = (n: number) => `Módulo ${n} — ${MODULES[n - 1]?.title ?? ''}`
