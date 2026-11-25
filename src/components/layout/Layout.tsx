import { Outlet, ScrollRestoration, useMatches } from 'react-router-dom'
import { Topbar } from './Topbar'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileStickyBar } from './MobileStickyBar'
import { RouteTracker } from './RouteTracker'

export function Layout() {
  const matches = useMatches() as { handle?: { servicePage?: boolean } }[]
  const isServicePage = matches.some((m) => m.handle?.servicePage)

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-sprout focus:px-4 focus:py-2 focus:font-bold focus:text-forest"
      >
        Pular para o conteúdo
      </a>
      <Topbar />
      <Header isServicePage={isServicePage} />
      <main id="conteudo">
        <Outlet />
      </main>
      {/* espaço para a barra fixa no mobile não cobrir o rodapé */}
      <div className="bg-forest-dark pb-[76px] md:pb-0">
        <Footer />
      </div>
      <MobileStickyBar />
      <ScrollRestoration />
      <RouteTracker />
    </>
  )
}
