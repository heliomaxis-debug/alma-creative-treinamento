import { useCallback, useEffect, useState } from 'react'

/** Estado salvo no navegador. Se o armazenamento estiver bloqueado, funciona só em memória. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? initial : (JSON.parse(raw) as T)
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* armazenamento indisponível: segue em memória */
    }
  }, [key, value])

  const reset = useCallback(() => setValue(initial), [initial])
  return [value, setValue, reset] as const
}
