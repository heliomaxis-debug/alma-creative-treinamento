import { STAGE_H, STAGE_W, useStageScale } from '../../hooks/useStageScale'
import { SLIDES, TOTAL, slideModuleLabel } from '../../slides'
import { SlideContext } from '../ui/SlideContext'

function SlideContent({ index }: { index: number }) {
  const slide = SLIDES[index]
  if (!slide) return null
  const { Component } = slide
  return (
    <SlideContext.Provider value={{ index, total: TOTAL, moduleLabel: slideModuleLabel(index) }}>
      {/* key: remonta o slide a cada troca, disparando a animação de entrada */}
      <div key={slide.id} className="h-full w-full animate-fade-in">
        <Component />
      </div>
    </SlideContext.Provider>
  )
}

interface Props {
  index: number
  /** Em telas estreitas, troca o palco escalado por um layout fluido com rolagem. */
  fluid?: boolean
  className?: string
}

/** Palco 16:9 (1600×900) escalado para caber no espaço disponível. */
export function Stage({ index, fluid = true, className = '' }: Props) {
  const { ref, scale } = useStageScale(fluid ? 768 : 0)

  return (
    <div ref={ref} className={`relative h-full w-full ${scale === null ? 'overflow-y-auto' : 'flex items-center justify-center overflow-hidden'} ${className}`}>
      {scale === null ? (
        <div className="min-h-full">
          <SlideContent index={index} />
        </div>
      ) : (
        <div className="relative overflow-hidden" style={{ width: STAGE_W * scale, height: STAGE_H * scale }}>
          <div className="absolute top-0 left-0" style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <SlideContent index={index} />
          </div>
        </div>
      )}
    </div>
  )
}
