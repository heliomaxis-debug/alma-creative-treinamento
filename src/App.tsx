import { useCallback } from 'react'
import { useHashRoute } from './lib/router'
import { InstructorMode } from './pages/InstructorMode'
import { Presentation } from './pages/Presentation'
import { QuickReference } from './pages/QuickReference'

export default function App() {
  const { route, navigate } = useHashRoute()

  const goSlide = useCallback((index: number, replace = false) => navigate({ name: 'slides', index }, replace), [navigate])

  switch (route.name) {
    case 'consulta':
      return <QuickReference tab={route.tab} onTab={(tab) => navigate({ name: 'consulta', tab }, true)} onExit={() => window.history.length > 1 ? window.history.back() : goSlide(0)} />
    case 'instrutor':
      return <InstructorMode />
    case 'slides':
      return <Presentation index={route.index} onGo={goSlide} onConsulta={() => navigate({ name: 'consulta', tab: 'checklist' })} />
  }
}
