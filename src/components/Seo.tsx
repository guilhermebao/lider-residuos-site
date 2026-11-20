import { Head } from 'vite-react-ssg'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../data/sitemap'

interface Props {
  title: string
  description: string
  /** Objetos JSON-LD (LocalBusiness, FAQPage, BreadcrumbList...) */
  schema?: object[]
  image?: string
  noindex?: boolean
}

/** Na Vercel de apresentação, VITE_NOINDEX=true evita que o Google indexe a prévia. */
const NOINDEX = import.meta.env.VITE_NOINDEX === 'true'

export function Seo({ title, description, schema = [], image = '/icon-512.png', noindex = false }: Props) {
  const { pathname } = useLocation()
  const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`
  return (
    <Head>
      <html lang="pt-BR" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {(NOINDEX || noindex) && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Líder Resíduos" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Head>
  )
}
