import { parsePage } from './parse'
import type { PageContent } from './types'

/**
 * Todo o texto do site vem de content/textos/*.md (gerados no chat de textos do projeto).
 * Para atualizar uma página, basta substituir o arquivo .md e fazer o build.
 */
const files = import.meta.glob('../../content/textos/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const all: PageContent[] = Object.values(files).map(parsePage)

/** Páginas institucionais com layout próprio. */
export const INSTITUTIONAL = ['servicos', 'empresa', 'contato'] as const

export function getPage(slug: string): PageContent {
  const page = all.find((p) => p.slug === slug)
  if (!page) throw new Error(`Texto não encontrado: content/textos/${slug}.md`)
  return page
}

/** Páginas de serviço (modelo de SEO), em ordem alfabética de URL. */
export const servicePages: PageContent[] = all
  .filter((p) => !(INSTITUTIONAL as readonly string[]).includes(p.slug))
  .sort((a, b) => a.slug.localeCompare(b.slug))

export const allPaths: string[] = ['/', ...all.map((p) => p.path)]

export type { PageContent } from './types'
