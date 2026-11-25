# Site Líder Resíduos

React + Vite + Tailwind CSS v4, com pré-renderização estática ([vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg)): cada página sai como HTML pronto em `dist/`, bom para SEO e compatível com qualquer hospedagem.

Referências: `handoff-desenvolvimento-site.md` e o quadro de design (direção B).

## Comandos

```bash
npm install
npm run dev      # desenvolvimento (CSR)
npm run build    # gera dist/ com HTML de cada rota + sitemap.xml + 404.html
npm run preview  # serve dist/ localmente
```

## Variáveis de ambiente

Ver `.env.example`.

| Variável | Uso |
|---|---|
| `VITE_SITE_URL` | Domínio usado em canonical, schema e sitemap |
| `VITE_WEB3FORMS_KEY` | Envio dos formulários para e-mail (Web3Forms). Sem ela, cai no WhatsApp |
| `VITE_NOINDEX` | `true` na Vercel de apresentação |

## Estrutura

```
src/
  index.css                 tokens da direção B (@theme do Tailwind)
  routes.tsx                rotas (home, serviços, páginas previstas, 404)
  data/
    site.ts                 telefone, WhatsApp, endereço, menu, páginas previstas
    home.ts                 conteúdo da home
  pages/
    Home.tsx
    ServicePage.tsx         modelo de página de serviço
    EmBreve.tsx             páginas ainda não desenvolvidas / 404 (noindex)
  components/
    layout/                 Topbar, Header, Footer, MobileStickyBar, Layout
    sections/               ContactForm, Steps, Faq, LinkGrid, CtaBand, Breadcrumb...
    ui/                     Button, Photo (placeholder de foto), ícones
  lib/                      schema.org (LocalBusiness, FAQPage, Breadcrumb, Service) e envio de formulário
```

## Textos das páginas

Todo o conteúdo das páginas internas vem de `content/textos/<url>.md`, gerados no chat de textos do projeto (docs `claude/textos/` no claude.ai) no formato da seção 4 do handoff. O parser fica em `src/content/parse.ts`.

- **Atualizar um texto:** substituir o `.md` e fazer o build.
- **Nova página de serviço:** criar `content/textos/<url>.md` no mesmo formato. Rota, sitemap, breadcrumb e schema (Service + FAQPage) são gerados automaticamente.
- `servicos.md`, `empresa.md` e `contato.md` usam layouts próprios (`src/pages/`).
- Trechos `[CONFIRMAR ...]` aparecem destacados em amarelo para o cliente validar. Ficam fora do title, da meta e do schema FAQPage.

## Redirecionamentos 301

Lista em `content/redirects.json`. Depois de editar, rodar `npm run redirects` para atualizar `vercel.json` e `public/.htaccess`.

## Fotos

As fotos do quadro são de banco e não vão para o site. Enquanto as fotos reais não chegam, o componente `Photo` mostra um placeholder com a descrição da foto necessária. Para usar a foto real: colocar o arquivo (WebP/AVIF) em `public/img/` e preencher `src`.

## Deploy

- **Vercel (apresentação):** importar o repositório; `vercel.json` já configura build, `cleanUrls` e cache. Definir `VITE_NOINDEX=true`.
- **Hospedagem do cliente:** enviar o conteúdo de `dist/`. Em Apache/cPanel, o `.htaccess` incluso cuida de HTTPS, URLs sem barra final e 404. Os 301 das páginas antigas entram no `.htaccess` (ou em `redirects` do `vercel.json`).

## Pendências que afetam o código

- Logo em vetor (hoje PNG extraído do JPG) → trocar `public/img/` e favicons
- Números reais da faixa de números (`data/home.ts`, `statsAreIllustrative`)
- Horário de atendimento → `openingHoursSpecification` no schema
- Itens `[CONFIRMAR]` nos textos (`grep -rn CONFIRMAR content/textos`)
- Licença Classe I: sem ela, remover os 3 textos de perigosos/químicos e redirecionar para /destinacao-residuos-industriais
