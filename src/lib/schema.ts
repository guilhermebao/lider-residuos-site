import { company } from '../data/site'
import { SITE_URL } from '../data/sitemap'
import type { Faq, PageContent } from '../content/types'
import { hasConfirm, stripConfirm } from '../content/parse'

export function localBusinessSchema() {
  const { address } = company
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#empresa`,
    name: company.name,
    description: company.tagline,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/icon-512.png`,
    image: `${SITE_URL}/icon-512.png`,
    telephone: company.phone.e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      ...(address.zip ? { postalCode: address.zip } : {}),
      addressCountry: 'BR',
    },
    areaServed: company.areaServed.map((name) => ({ '@type': 'City', name })),
    // TODO: incluir openingHoursSpecification quando o cliente confirmar o horário
  }
}

/** Só entram no schema perguntas com resposta já confirmada (sem [CONFIRMAR]). */
export function faqSchema(faq: Faq[]) {
  const ready = faq.filter((f) => !hasConfirm(f.a) && stripConfirm(f.a).length > 0)
  if (!ready.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ready.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/\*\*/g, '') },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  }
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { '@id': `${SITE_URL}/#empresa` },
    areaServed: company.areaServed.map((n) => ({ '@type': 'City', name: n })),
  }
}

/** Schemas padrão de uma página de conteúdo. */
export function pageSchemas(page: PageContent, opts: { service?: boolean; localBusiness?: boolean } = {}) {
  const crumbs = [{ name: 'Home', path: '/' }]
  if (opts.service) crumbs.push({ name: 'Serviços', path: '/servicos' })
  crumbs.push({ name: page.breadcrumb, path: page.path })
  return [
    ...(opts.service || opts.localBusiness ? [localBusinessSchema()] : []),
    ...(opts.service ? [serviceSchema(stripConfirm(page.h1), page.seo.description, page.path)] : []),
    breadcrumbSchema(crumbs),
    faqSchema(page.faq),
  ].filter(Boolean) as object[]
}
