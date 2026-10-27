import { useEffect, useRef } from 'react'

/**
 * Atalhos globais. Ignora teclas digitadas em campos de formulário
 * e combinações com Ctrl/Cmd/Alt (para não sequestrar atalhos do navegador).
 */
export function useKeyboard(handlers: Record<string, (e: KeyboardEvent) => void>, enabled = true) {
  const ref = useRef(handlers)
  ref.current = handlers

  useEffect(() => {
    if (!enabled) return
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const handler = ref.current[key]
      if (handler) {
        e.preventDefault()
        handler(e)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enabled])
}
