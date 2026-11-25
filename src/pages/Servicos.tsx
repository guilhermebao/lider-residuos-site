import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Photo } from '../components/ui/Photo'
import { Rich } from '../components/ui/Rich'
import { PageHero } from '../components/sections/PageHero'
import { CtaBand, Faq, Steps } from '../components/sections/shared'
import { getPage } from '../content'
import { pageSchemas } from '../lib/schema'
import { CitiesBlock, IntroBlock, h2Section } from './ServicePage'

const groupPhotos = [
  'Foto: caminhão da Líder com caçamba',
  'Foto: fardos e sucata separada',
  'Foto: munck e caçambas',
]

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** Hub de serviços (tela `Servicos` do quadro). Grupos vêm da "Lista" de content/textos/servicos.md */
export function Component() {
  const page = getPage('servicos')
  const big = page.groups.filter((g) => g.items.length >= 5)
  const small = page.groups.filter((g) => g.items.length < 5)

  return (
    <>
      <Seo title={page.seo.title} description={page.seo.description} schema={pageSchemas(page)} />

      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: page.breadcrumb }]}
        kicker={page.kicker}
        title={page.h1}
        lead={page.lead}
      />

      <section>
        <div className="container-site flex flex-col gap-10 py-10 md:gap-12 md:py-16">
          <div className="max-w-[820px]">
            <IntroBlock page={page} />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {big.map((g, i) => (
              <div key={g.title} id={slugify(g.title)} className="flex scroll-mt-4 flex-col overflow-hidden rounded-[24px] bg-white">
                <Photo alt="" placeholder={groupPhotos[i] ?? 'Foto: operação da Líder'} className="h-[160px] w-full md:h-[180px]" />
                <div className="flex flex-col gap-1.5 p-6">
                  <h2 className="mb-1.5 text-[22px] font-extrabold md:text-2xl">{g.title}</h2>
                  <ul>
                    {g.items.map((item) => (
                      <li key={item.text}>
                        <Link
                          to={item.href ?? '/servicos'}
                          className="flex min-h-12 items-center justify-between gap-3 border-t border-[#E6ECE1] py-3 text-[15px] font-semibold text-ink hover:text-forest"
                        >
                          <span>
                            <Rich text={item.text} />
                          </span>
                          <span className="text-leaf-text" aria-hidden="true">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {small.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className={h2Section}>Outros serviços</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {small.map((g) => (
                  <div key={g.title} id={slugify(g.title)} className="flex scroll-mt-4 flex-col gap-2 rounded-[20px] bg-white p-6">
                    <h3 className="text-xl font-extrabold">{g.title}</h3>
                    <ul>
                      {g.items.map((item) => (
                        <li key={item.text}>
                          <Link
                            to={item.href ?? '/servicos'}
                            className="flex min-h-12 items-center justify-between gap-3 border-t border-[#E6ECE1] py-3 text-[15px] font-semibold text-ink hover:text-forest"
                          >
                            <Rich text={item.text} />
                            <span className="text-leaf-text" aria-hidden="true">
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {page.steps.length > 0 && (
        <section className="bg-white">
          <div className="container-site flex flex-col gap-5 py-10 md:gap-8 md:py-16">
            <h2 className="h2">Como funciona</h2>
            <Steps steps={page.steps} />
          </div>
        </section>
      )}

      <section>
        <div className="container-site grid grid-cols-1 gap-10 py-10 md:py-16 lg:grid-cols-2">
          <CitiesBlock cities={page.cities} />
          <div className="flex flex-col gap-3">
            <h2 className={h2Section}>Perguntas frequentes</h2>
            <Faq items={page.faq} />
          </div>
        </div>
      </section>

      <CtaBand title={page.cta} />
    </>
  )
}
