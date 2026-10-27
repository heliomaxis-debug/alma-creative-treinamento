import type { ComponentType } from 'react'
import type { LucideIcon } from 'lucide-react'

/** Orientações para quem está ministrando o treinamento. */
export interface PresenterNotes {
  /** O que falar, em tópicos curtos. */
  roteiro: string[]
  /** O que mostrar na prática, no equipamento real. */
  demonstracao?: string[]
  /** Perguntas para envolver os participantes. */
  perguntas?: string[]
  /** Ponto de atenção que não pode ser esquecido. */
  atencao?: string
  /** Tempo sugerido para o slide. */
  tempo?: string
}

export interface SlideDef {
  id: string
  module: number
  title: string
  notes: PresenterNotes
  Component: ComponentType
}

export interface ModuleDef {
  n: number
  title: string
  icon: LucideIcon
}
