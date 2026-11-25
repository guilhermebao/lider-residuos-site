import { allPaths } from '../content/index.ts'

const nodeEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
const envUrl = import.meta.env?.VITE_SITE_URL || nodeEnv?.VITE_SITE_URL || ''

/** URL pública do site (canonical, schema e sitemap). Definir VITE_SITE_URL para trocar. */
export const SITE_URL = (envUrl || 'https://www.liderresiduos.com.br').replace(/\/$/, '')

/** Todas as páginas com texto em content/textos + home. */
export const sitemapPaths = allPaths
