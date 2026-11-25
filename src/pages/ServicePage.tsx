import { Check, FileText, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Button } from '../components/ui/Button'
import { Rich } from '../components/ui/Rich'
import { WhatsAppIcon } from '../components/ui/icons'
import { PageHero } from '../components/sections/PageHero'
import { ContactChannels, CtaBand, Faq, LinkGrid, Steps } from '../components/sections/shared'
import { ContactForm } from '../components/sections/ContactForm'
import { company, whatsappHref } from '../data/site'
import type { PageContent } from '../content'
import { pagePhoto } from '../content/photos'
import { pageSchemas } from '../lib/schema'

export const h2Section = 'text-[24px] leading-[1.1] font-extrabold md:text-[28px]'

export function whatsappMessageFor(page: PageContent) {
  return `Olá! Vim pelo site (${page.breadcrumb}) e gostaria de um orçamento.`
}

/** Modelo de página de serviço (handoff, seção 4). Conteúdo: content/textos/<slug>.md */
export function ServicePage({ page }: { page: PageContent }) {
  const photo = pagePhoto(page.slug, page.kicker)
  const message = whatsappMessageFor(page)

  return (
    <>
      <Seo
        title={page.seo.title}
        description={page.seo.description}
        schema={pageSchemas(page, { service: true })}
      />

      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Serviços', href: '/servicos' }, { label: page.breadcrumb }]}
        kicker={page.kicker}
        title={page.h1}
        lead={page.lead}
        photo={{ ...photo, alt: page.h1 }}
        actions={
          <>
            <Button href="#orcamento" variant="sprout">
              Solicitar orçamento
            </Button>
            <Button href={whatsappHref(message)} variant="outline-light">
              <WhatsAppIcon size={18} />
              {company.whatsapp.display}
            </Button>
          </>
        }
      />

      {/* Conteúdo + lateral */}
      <section>
        <div className="container-site flex flex-col gap-10 py-10 md:py-16 lg:flex-row lg:items-start">
          <div className="flex min-w-0 flex-col gap-10 md:gap-12 lg:flex-[1_1_620px]">
            <IntroBlock page={page} />
            <GroupsBlock page={page} />

            {page.steps.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className={h2Section}>Como funciona</h2>
                <Steps steps={page.steps} layout="grid2" />
              </div>
            )}

            {page.docs && <DocsBlock docs={page.docs} />}
            <CitiesBlock cities={page.cities} />

            {page.faq.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className={h2Section}>Perguntas frequentes</h2>
                <Faq items={page.faq} />
              </div>
            )}
          </div>

          <aside
            id="orcamento"
            className="flex scroll-mt-4 flex-col gap-4 lg:sticky lg:top-6 lg:flex-[1_1_340px]"
            aria-label="Pedir orçamento"
          >
            <div className="flex flex-col gap-1.5">
              <span className="kicker">Orçamento rápido</span>
              <span className="font-display text-2xl font-extrabold text-forest">Fale com a nossa equipe</span>
            </div>
            <ContactForm variant="compact" origin={page.breadcrumb} submitLabel="Pedir orçamento" />
            <ContactChannels compact />
          </aside>
        </div>
      </section>

      {page.related.length > 0 && (
        <section className="bg-white">
          <div className="container-site flex flex-col gap-5 py-10 md:py-14">
            <h2 className={h2Section}>Serviços relacionados</h2>
            <LinkGrid links={page.related} />
          </div>
        </section>
      )}

      <CtaBand title={page.cta} whatsappMessage={message} />
    </>
  )
}

/* ---------- Blocos reutilizados nas páginas institucionais ---------- */

export function IntroBlock({ page }: { page: PageContent }) {
  return (
    <div className="flex flex-col gap-4">
      {page.intro.title && (
        <h2 className="text-[26px] leading-[1.1] font-extrabold md:text-[32px]">{page.intro.title}</h2>
      )}
      {page.intro.paragraphs.map((p, i) => (
        <p key={i} className="text-base leading-relaxed text-ink-2">
          <Rich text={p} />
        </p>
      ))}
    </div>
  )
}

export function GroupsBlock({ page }: { page: PageContent }) {
  return (
    <>
      {page.groups.map((g) => (
        <div key={g.title} className="flex flex-col gap-4">
          {g.title && <h2 className={h2Section}>{g.title}</h2>}
          {g.items.length > 0 && (
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {g.items.map((item) => (
                <li key={item.text} className="flex items-start gap-2.5 text-base leading-snug">
                  <Check size={18} className="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
                  {item.href ? (
                    <Link to={item.href} className="font-semibold text-forest underline-offset-2 hover:underline">
                      <Rich text={item.text} />
                    </Link>
                  ) : (
                    <span>
                      <Rich text={item.text} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          {g.notes.map((n, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-ink-2">
              <Rich text={n} />
            </p>
          ))}
        </div>
      ))}
    </>
  )
}

export function DocsBlock({ docs }: { docs: NonNullable<PageContent['docs']> }) {
  return (
    <div className="flex items-start gap-5 rounded-[24px] bg-forest p-6 text-white md:p-7">
      <FileText size={36} className="shrink-0 text-sprout" aria-hidden="true" />
      <div className="flex flex-col gap-2">
        <h2 className="text-[22px] font-extrabold text-white md:text-2xl">{docs.title}</h2>
        {docs.paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-on-forest-2 [&_mark]:text-[#5C4700]">
            <Rich text={p} />
          </p>
        ))}
      </div>
    </div>
  )
}

export function CitiesBlock({ cities }: { cities: string[] }) {
  if (!cities.length) return null
  return (
    <div className="flex flex-col gap-4">
      <h2 className={h2Section}>Onde atendemos</h2>
      <ul className="flex flex-wrap gap-2">
        {cities.map((c) => (
          <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-semibold">
            <MapPin size={16} className="text-leaf" aria-hidden="true" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
}
