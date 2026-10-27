import { useEffect, useRef, useState } from 'react'

export const STAGE_W = 1600
export const STAGE_H = 900

/**
 * Calcula a escala para encaixar o palco 16:9 (1600×900) no espaço disponível.
 * Em telas estreitas (celular), retorna null: o slide é exibido em modo fluido.
 */
export function useStageScale(fluidBelow = 768) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState<number | null>(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      if (window.innerWidth < fluidBelow) {
        setScale(null)
        return
      }
      const { width, height } = el.getBoundingClientRect()
      setScale(Math.max(0.1, Math.min(width / STAGE_W, height / STAGE_H)))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [fluidBelow])

  return { ref, scale }
}
