import { Check, ShieldCheck } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Button } from '../components/ui/Button'
import { Photo } from '../components/ui/Photo'
import { Rich } from '../components/ui/Rich'
import { PageHero } from '../components/sections/PageHero'
import { CtaBand, Faq, LinkGrid } from '../components/sections/shared'
import { getPage } from '../content'
import { whatsappHref } from '../data/site'
import { pageSchemas } from '../lib/schema'
import { CitiesBlock, h2Section } from './ServicePage'

/** Página Empresa (tela `Empresa` do quadro). Conteúdo: content/textos/empresa.md */
export function Component() {
  const page = getPage('empresa')
  const mvv = page.groups.find((g) => /miss/i.test(g.title))
  const diferenciais = page.groups.find((g) => /diferenc/i.test(g.title))

  return (
    <>
      <Seo title={page.seo.title} description={page.seo.description} schema={pageSchemas(page, { localBusiness: true })} />

      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: page.breadcrumb }]}
        kicker={page.kicker}
        title={page.h1}
        lead={page.lead}
        photo={{ alt: 'Equipe da Líder Resíduos com EPI', placeholder: 'Foto: equipe com EPI' }}
        actions={
          <Button href={whatsappHref()} variant="sprout">
            Falar com a Líder
          </Button>
        }
      />

      {/* História */}
      <section>
        <div className="container-site flex flex-col gap-8 py-10 md:py-[72px] lg:flex-row lg:items-center lg:gap-12">
          <Photo
            alt="Galpão da Líder Resíduos"
            placeholder="Foto: galpão / triagem / prensa"
            className="h-[240px] w-full rounded-[24px] md:h-[420px] lg:flex-[1_1_420px]"
          />
          <div className="flex flex-col gap-4 lg:flex-[1_1_480px]">
            <span className="kicker">{page.intro.title}</span>
            {page.intro.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-ink-2">
                <Rich text={p} />
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      {diferenciais && (
        <section className="bg-forest">
          <div className="container-site flex flex-col gap-7 py-10 md:py-16">
            <h2 className="text-[28px] font-extrabold text-white md:text-[36px]">Por que escolher a Líder</h2>
            <ul className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
              {diferenciais.items.map((d) => (
                <li key={d.text} className="flex items-start gap-3.5 text-[17px] font-semibold text-white">
                  <Check size={22} className="mt-0.5 shrink-0 text-sprout" aria-hidden="true" />
                  <span>
                    <Rich text={d.text} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Missão, visão e valores + licenças */}
      <section>
        <div className="container-site grid grid-cols-1 gap-6 py-10 md:py-16 lg:grid-cols-2">
          {mvv && (
            <div className="flex flex-col gap-4 rounded-[24px] bg-white p-6 md:p-8">
              <h2 className={h2Section}>{mvv.title}</h2>
              <ul className="flex flex-col gap-3">
                {mvv.items.map((item) => (
                  <li key={item.text} className="text-base leading-relaxed text-ink-2">
                    <Rich text={item.text.replace(/^([^:]+):/, '**$1:**')} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {page.docs && (
            <div className="flex flex-col gap-4 rounded-[24px] bg-white p-6 md:p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck size={28} className="text-leaf" aria-hidden="true" />
                <h2 className={h2Section}>{page.docs.title}</h2>
              </div>
              {page.docs.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-ink-2">
                  <Rich text={p} />
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site grid grid-cols-1 gap-10 py-10 md:py-16 lg:grid-cols-2">
          <CitiesBlock cities={page.cities} />
          <div className="flex flex-col gap-3">
            <h2 className={h2Section}>Perguntas frequentes</h2>
            <Faq items={page.faq} />
          </div>
        </div>
      </section>

      {page.related.length > 0 && (
        <section>
          <div className="container-site flex flex-col gap-5 py-10 md:py-14">
            <h2 className={h2Section}>Saiba mais</h2>
            <LinkGrid links={page.related} tone="white" />
          </div>
        </section>
      )}

      <CtaBand title={page.cta} />
    </>
  )
}
