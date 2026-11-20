import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/layout/Layout'
import { ServicePage } from './pages/ServicePage'
import { EmBreve } from './pages/EmBreve'
import { servicePages } from './data/servicos'
import { plannedPages } from './data/site'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/layout/Layout.tsx',
    children: [
      { index: true, lazy: () => import('./pages/Home') },

      // Páginas de serviço (uma rota estática por slug, mantendo as URLs atuais)
      ...servicePages.map((page) => ({
        path: page.slug,
        element: <ServicePage page={page} />,
        handle: { servicePage: true },
      })),

      // Seções previstas ainda não desenvolvidas
      ...plannedPages.map((p) => ({
        path: p.path.slice(1),
        element: <EmBreve title={p.title} />,
      })),

      { path: '404', element: <EmBreve title="Página não encontrada" notFound /> },
      { path: '*', element: <EmBreve title="Página não encontrada" notFound /> },
    ],
  },
]
