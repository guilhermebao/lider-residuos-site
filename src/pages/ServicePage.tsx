import { Check, FileText, MapPin } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Button } from '../components/ui/Button'
import { Photo } from '../components/ui/Photo'
import { WhatsAppIcon } from '../components/ui/icons'
import { Breadcrumb, ContactChannels, CtaBand, Faq, LinkGrid, Steps } from '../components/sections/shared'
import { ContactForm } from '../components/sections/ContactForm'
import { company, whatsappHref } from '../data/site'
import type { ServicePage as ServicePageData } from '../data/servicos/types'
import { breadcrumbSchema, faqSchema, localBusinessSchema, serviceSchema } from '../lib/schema'

const h2Section = 'text-[24px] leading-[1.1] font-extrabold md:text-[28px]'

/** Modelo de página de serviço (handoff, seção 4). Todo o conteúdo vem de src/data/servicos. */
export function ServicePage({ page }: { page: ServicePageData }) {
  const path = `/${page.slug}`
  const schema = [
    localBusinessSchema(),
    serviceSchema(page.breadcrumb, page.seo.description, path),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Serviços', path: '/servicos' },
      { name: page.breadcrumb, path },
    ]),
    ...(page.faq.length ? [faqSchema(page.faq)] : []),
  ]

  return (
    <>
      <Seo title={page.seo.title} description={page.seo.description} schema={schema} />

      {/* Hero */}
      <section className="bg-forest text-white">
        <div className="container-site flex flex-col gap-6 pt-6 pb-10 md:gap-7 md:pt-10 md:pb-16">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Serviços', href: '/servicos' }, { label: page.breadcrumb }]} />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
            <div className="flex flex-col gap-4 md:gap-[18px] lg:flex-[1_1_520px]">
              <span className="text-[11px] font-semibold tracking-[0.12em] text-sprout uppercase md:text-[13px]">
                {page.kicker}
              </span>
              <h1 className="text-[34px] leading-[1.06] font-extrabold text-white md:text-[52px] md:leading-[1.04]">
                {page.h1}
              </h1>
              <p className="max-w-[600px] text-base leading-relaxed text-on-forest-2 md:text-lg">{page.lead}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#orcamento" variant="sprout">
                  Solicitar orçamento
                </Button>
                <Button href={whatsappHref(page.cta.whatsappMessage)} variant="outline-light">
                  <WhatsAppIcon size={18} />
                  {company.whatsapp.display}
                </Button>
              </div>
            </div>
            <Photo
              priority
              src={page.image.src}
              alt={page.image.alt}
              placeholder={page.image.placeholder}
              className="h-[220px] w-full rounded-[20px] md:h-[340px] md:rounded-[24px] lg:flex-[1_1_380px]"
            />
          </div>
        </div>
      </section>

      {/* Conteúdo + lateral */}
      <section>
        <div className="container-site flex flex-col gap-10 py-10 md:py-16 lg:flex-row lg:items-start">
          <div className="flex min-w-0 flex-col gap-10 md:gap-12 lg:flex-[1_1_620px]">
            <div className="flex flex-col gap-4">
              <h2 className="text-[26px] leading-[1.1] font-extrabold md:text-[32px]">{page.intro.title}</h2>
              {page.intro.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="text-base leading-relaxed text-ink-2">
                  {p}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h2 className={h2Section}>{page.list.title}</h2>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {page.list.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-base">
                    <Check size={18} className="shrink-0 text-leaf" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className={h2Section}>Como funciona</h2>
              <Steps steps={page.steps} layout="grid2" />
            </div>

            {page.docs && (
              <div className="flex items-start gap-5 rounded-[24px] bg-forest p-6 text-white md:p-7">
                <FileText size={36} className="shrink-0 text-sprout" aria-hidden="true" />
                <div className="flex flex-col gap-2">
                  <h2 className="text-[22px] font-extrabold text-white md:text-2xl">{page.docs.title}</h2>
                  <p className="text-base leading-relaxed text-on-forest-2">{page.docs.text}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <h2 className={h2Section}>Onde atendemos</h2>
              <ul className="flex flex-wrap gap-2">
                {page.cities.map((c) => (
                  <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-semibold">
                    <MapPin size={16} className="text-leaf" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {page.faq.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className={h2Section}>Perguntas frequentes</h2>
                <Faq items={page.faq} />
              </div>
            )}
          </div>

          {/* Lateral fixa no desktop */}
          <aside
            id="orcamento"
            className="flex scroll-mt-4 flex-col gap-4 lg:sticky lg:top-6 lg:flex-[1_1_340px]"
            aria-label="Pedir orçamento"
          >
            <div className="flex flex-col gap-1.5">
              <span className="kicker">Orçamento rápido</span>
              <span className="font-display text-2xl font-extrabold text-forest">Resposta no mesmo dia útil</span>
            </div>
            <ContactForm variant="compact" origin={page.breadcrumb} submitLabel="Pedir orçamento" />
            <ContactChannels compact />
          </aside>
        </div>
      </section>

      {/* Relacionados */}
      {page.related.length > 0 && (
        <section className="bg-white">
          <div className="container-site flex flex-col gap-5 py-10 md:py-14">
            <h2 className={h2Section}>Serviços relacionados</h2>
            <LinkGrid links={page.related} />
          </div>
        </section>
      )}

      <CtaBand title={page.cta.title} whatsappMessage={page.cta.whatsappMessage} />
    </>
  )
}
