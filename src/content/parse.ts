import type { Faq, LinkItem, ListGroup, PageContent, Step } from './types'

/**
 * Parser do formato usado em content/textos/*.md (modelo do handoff, seção 4):
 *   # Nome
 *   ## URL | Title | Meta description | Breadcrumb | Kicker | H1 | Lead
 *   ## Intro (### título + parágrafos)
 *   ## Lista (um ou mais ### grupos com "- itens" e linhas soltas)
 *   ## Como funciona ("1. **Título** — texto")
 *   ## Documentação (### título + parágrafos)
 *   ## Cidades atendidas
 *   ## FAQ ("**Pergunta?**" + resposta)
 *   ## Serviços relacionados ("- Nome — /url")
 *   ## Faixa CTA
 */

const LINK_RE = /^(.*?)\s+—\s+(\/[a-z0-9/-]*)\s*(.*)$/

function splitSections(raw: string): Record<string, string> {
  const out: Record<string, string> = {}
  let key: string | null = null
  let buf: string[] = []
  for (const line of raw.replace(/\r\n/g, '\n').split('\n')) {
    const m = /^##\s+(.+?)\s*$/.exec(line)
    if (m && !line.startsWith('###')) {
      if (key) out[key] = buf.join('\n').trim()
      key = m[1].toLowerCase()
      buf = []
    } else if (key) {
      buf.push(line)
    }
  }
  if (key) out[key] = buf.join('\n').trim()
  return out
}

function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, ' ').trim())
    .filter(Boolean)
}

/** "### Título\n\nparágrafos..." */
function titled(text = ''): { title: string; paragraphs: string[] } {
  const m = /^###\s+(.+)$/m.exec(text)
  const title = m ? m[1].trim() : ''
  const body = m ? text.replace(m[0], '') : text
  return { title, paragraphs: paragraphs(body) }
}

function groups(text = ''): ListGroup[] {
  const result: ListGroup[] = []
  let current: ListGroup | null = null
  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim()
    if (!line) continue
    const h = /^###\s+(.+)$/.exec(line)
    if (h) {
      current = { title: h[1].trim(), items: [], notes: [] }
      result.push(current)
      continue
    }
    if (!current) {
      current = { title: '', items: [], notes: [] }
      result.push(current)
    }
    if (line.startsWith('- ')) {
      const item = line.slice(2).trim()
      const link = LINK_RE.exec(item)
      if (link) current.items.push({ text: `${link[1]}${link[3] ? ` ${link[3]}` : ''}`, href: link[2] })
      else current.items.push({ text: item })
    } else {
      current.notes.push(line)
    }
  }
  return result
}

function steps(text = ''): Step[] {
  return text
    .split('\n')
    .map((l) => /^\d+\.\s+\*\*(.+?)\*\*\s+—\s+(.+)$/.exec(l.trim()))
    .filter((m): m is RegExpExecArray => !!m)
    .map((m) => ({ title: m[1].trim(), text: m[2].trim() }))
}

function faq(text = ''): Faq[] {
  const items: Faq[] = []
  let cur: Faq | null = null
  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim()
    if (!line) continue
    const q = /^\*\*(.+)\*\*$/.exec(line)
    if (q) {
      cur = { q: q[1].trim(), a: '' }
      items.push(cur)
    } else if (cur) {
      cur.a = cur.a ? `${cur.a} ${line}` : line
    }
  }
  return items
}

function links(text = ''): LinkItem[] {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- '))
    .map((l) => LINK_RE.exec(l.slice(2).trim()))
    .filter((m): m is RegExpExecArray => !!m)
    .map((m) => ({ label: m[1].trim(), href: m[2] }))
}

/** "BH, Contagem, Betim e região metropolitana: Nova Lima, Sabará e Lagoa Santa." → lista de cidades */
function cities(text = ''): string[] {
  const clean = text.replace(/\.$/, '').replace(/\s*e região metropolitana\s*/i, ', ')
  return clean
    .split(/[:,]|\s+e\s+/)
    .map((c) => c.trim())
    .filter(Boolean)
}

const one = (s?: string) => (s ?? '').split('\n')[0].trim()

export function parsePage(raw: string): PageContent {
  const s = splitSections(raw)
  const path = one(s['url']) || '/'
  return {
    slug: path.replace(/^\//, ''),
    path,
    seo: { title: one(s['title']), description: one(s['meta description']) },
    breadcrumb: one(s['breadcrumb']),
    kicker: one(s['kicker']),
    h1: one(s['h1']),
    lead: paragraphs(s['lead'] ?? '').join(' '),
    intro: titled(s['intro']),
    groups: groups(s['lista']),
    steps: steps(s['como funciona']),
    docs: s['documentação'] ? titled(s['documentação']) : undefined,
    cities: cities(one(s['cidades atendidas'])),
    faq: faq(s['faq']),
    related: links(s['serviços relacionados']),
    cta: one(s['faixa cta']),
  }
}

/** Remove marcadores [CONFIRMAR ...] (para title, meta e schema). */
export function stripConfirm(text: string): string {
  return text
    .replace(/\s*\[CONFIRMAR[^\]]*\]/g, '')
    .replace(/\s+([.,;])/g, '$1')
    .trim()
}

export function hasConfirm(text: string): boolean {
  return /\[CONFIRMAR/.test(text)
}
