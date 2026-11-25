import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs'
import type {} from 'vite-react-ssg'
import { join } from 'node:path'

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.liderresiduos.com.br').replace(/\/$/, '')
// Todas as páginas com texto em content/textos + home
const sitemapPaths = ['/', ...readdirSync('content/textos').filter((f) => f.endsWith('.md')).map((f) => `/${f.replace(/\.md$/, '')}`)]

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    entry: 'src/main.tsx',
    // /pagina -> /pagina/index.html: funciona na Vercel e em qualquer hospedagem estática (Apache/cPanel)
    dirStyle: 'nested',
    onFinished(dir: string) {
      // Página 404 na raiz (Vercel e Apache usam /404.html)
      const notFound = join(dir, '404', 'index.html')
      if (existsSync(notFound)) copyFileSync(notFound, join(dir, '404.html'))

      const urls = sitemapPaths
        .map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc></url>`)
        .join('\n')
      writeFileSync(
        join(dir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
    },
  },
})
