import { useCallback, useEffect, useState } from 'react'

export type Route =
  | { name: 'slides'; index: number }
  | { name: 'consulta'; tab: string }
  | { name: 'instrutor' }

/**
 * Rotas por hash (#/slide/3, #/consulta/checklist, #/instrutor), para funcionar
 * abrindo o build direto do disco e sem servidor configurado.
 */
export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  if (parts[0] === 'consulta') return { name: 'consulta', tab: parts[1] ?? 'checklist' }
  if (parts[0] === 'instrutor') return { name: 'instrutor' }
  if (parts[0] === 'slide') {
    const n = Number.parseInt(parts[1] ?? '1', 10)
    return { name: 'slides', index: Number.isFinite(n) ? Math.max(0, n - 1) : 0 }
  }
  return { name: 'slides', index: 0 }
}

export function routeToHash(route: Route): string {
  switch (route.name) {
    case 'slides':
      return `#/slide/${route.index + 1}`
    case 'consulta':
      return `#/consulta/${route.tab}`
    case 'instrutor':
      return '#/instrutor'
  }
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = useCallback((next: Route, replace = false) => {
    const hash = routeToHash(next)
    if (replace) window.history.replaceState(null, '', hash)
    else window.history.pushState(null, '', hash)
    setRoute(next)
  }, [])

  return { route, navigate }
}
