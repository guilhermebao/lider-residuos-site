export interface Faq {
  q: string
  a: string
}

export interface Step {
  title: string
  text: string
}

export interface LinkItem {
  label: string
  href: string
}

export interface ListItem {
  text: string
  href?: string
}

export interface ListGroup {
  title: string
  items: ListItem[]
  /** Linhas soltas do grupo (ex.: "**Pode ir na caçamba:** ...") */
  notes: string[]
}

/**
 * Conteúdo de uma página, gerado a partir de content/textos/<slug>.md.
 * Textos podem conter **negrito** e marcadores [CONFIRMAR ...].
 */
export interface PageContent {
  slug: string
  path: string
  seo: { title: string; description: string }
  breadcrumb: string
  kicker: string
  h1: string
  lead: string
  intro: { title: string; paragraphs: string[] }
  groups: ListGroup[]
  steps: Step[]
  docs?: { title: string; paragraphs: string[] }
  cities: string[]
  faq: Faq[]
  related: LinkItem[]
  cta: string
}
