import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

/**
 * O site navega sem recarregar a página. A cada troca de rota, envia ao Google Tag Manager
 * o evento "virtual_page_view" (a primeira carga já é contada pelo próprio GTM).
 * No GTM: criar um acionador de Evento personalizado "virtual_page_view" ou usar "Alteração no histórico".
 */
export function RouteTracker() {
  const { pathname, search } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'virtual_page_view',
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, search])

  return null
}
