import { createContext, useContext } from 'react'

export interface SlideCtx {
  index: number
  total: number
  moduleLabel: string
}

export const SlideContext = createContext<SlideCtx>({ index: 0, total: 1, moduleLabel: '' })
export const useSlideCtx = () => useContext(SlideContext)
