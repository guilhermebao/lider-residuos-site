export interface Faq {
  q: string
  a: string
}

export interface Step {
  title: string
  text: string
}

export interface ServiceLink {
  label: string
  href: string
}

/**
 * Conteúdo de uma página de serviço (modelo do handoff, seção 4).
 * Para criar uma nova página de SEO: copie um arquivo desta pasta, ajuste o conteúdo
 * e registre em `src/data/servicos/index.ts`.
 */
export interface ServicePage {
  /** URL sem a barra inicial. Manter a URL atual do site quando houver tráfego. */
  slug: string
  seo: { title: string; description: string }
  breadcrumb: string
  kicker: string
  h1: string
  lead: string
  /** Foto do hero. Enquanto não houver foto real, `src` fica vazio e aparece o placeholder. */
  image: { src?: string; alt: string; placeholder: string }
  intro: { title: string; paragraphs: string[] }
  list: { title: string; items: string[] }
  steps: Step[]
  docs?: { title: string; text: string }
  cities: string[]
  faq: Faq[]
  related: ServiceLink[]
  cta: { title: string; whatsappMessage: string }
}
