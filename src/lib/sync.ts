import { useEffect, useRef } from 'react'

type SyncMessage = { type: 'goto'; index: number } | { type: 'blackout'; on: boolean } | { type: 'hello' }

const CHANNEL = 'alma-creative-slides'

/**
 * Sincroniza a apresentação (telão) e o modo instrutor abertos em abas/janelas
 * diferentes do mesmo navegador. Não usa rede: BroadcastChannel é local.
 */
export function useSlideSync(onMessage: (msg: SyncMessage) => void) {
  const channelRef = useRef<BroadcastChannel | null>(null)
  const handlerRef = useRef(onMessage)
  handlerRef.current = onMessage

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return
    const channel = new BroadcastChannel(CHANNEL)
    channel.onmessage = (event: MessageEvent<SyncMessage>) => handlerRef.current(event.data)
    channelRef.current = channel
    return () => channel.close()
  }, [])

  return (msg: SyncMessage) => channelRef.current?.postMessage(msg)
}
