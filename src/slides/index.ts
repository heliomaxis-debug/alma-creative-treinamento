import { moduleLabel } from '../data/modules'
import type { SlideDef } from '../lib/types'
import { modulo1 } from './modulo1'
import { modulo2 } from './modulo2'
import { modulo3 } from './modulo3'
import { modulo4 } from './modulo4'
import { modulo5 } from './modulo5'
import { modulo6 } from './modulo6'
import { modulo7 } from './modulo7'

/** Ordem oficial da aula. Para incluir um slide, adicione-o no arquivo do módulo. */
export const SLIDES: SlideDef[] = [...modulo1, ...modulo2, ...modulo3, ...modulo4, ...modulo5, ...modulo6, ...modulo7]

export const TOTAL = SLIDES.length

export const clampIndex = (i: number) => Math.max(0, Math.min(TOTAL - 1, i))

export const slideModuleLabel = (i: number) => moduleLabel(SLIDES[i]?.module ?? 1)
