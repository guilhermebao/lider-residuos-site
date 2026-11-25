import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/layout/Layout'
import { ServicePage } from './pages/ServicePage'
import { EmBreve } from './pages/EmBreve'
import { servicePages } from './content'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/layout/Layout.tsx',
    children: [
      { index: true, lazy: () => import('./pages/Home') },
      { path: 'servicos', lazy: () => import('./pages/Servicos'), handle: { servicePage: true } },
      { path: 'empresa', lazy: () => import('./pages/Empresa') },
      { path: 'contato', lazy: () => import('./pages/Contato') },

      // Páginas de serviço: uma rota estática por arquivo em content/textos (mantém as URLs atuais)
      ...servicePages.map((page) => ({
        path: page.slug,
        element: <ServicePage page={page} />,
        handle: { servicePage: true },
      })),

      { path: '404', element: <EmBreve title="Página não encontrada" notFound /> },
      { path: '*', element: <EmBreve title="Página não encontrada" notFound /> },
    ],
  },
]
