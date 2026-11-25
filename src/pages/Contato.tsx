import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Rich } from '../components/ui/Rich'
import { WhatsAppIcon } from '../components/ui/icons'
import { PageHero } from '../components/sections/PageHero'
import { CtaBand, Faq, LinkGrid } from '../components/sections/shared'
import { ContactForm } from '../components/sections/ContactForm'
import { getPage } from '../content'
import { company, whatsappHref } from '../data/site'
import { pageSchemas } from '../lib/schema'
import { CitiesBlock, h2Section } from './ServicePage'

/** Valor de um canal na lista "Canais de atendimento" do texto (ex.: "Horário: ..."). */
function channel(items: { text: string }[], label: string) {
  const item = items.find((i) => i.text.toLowerCase().startsWith(label.toLowerCase()))
  return item ? item.text.slice(item.text.indexOf(':') + 1).trim() : ''
}

/** Página Contato (tela `Contato` do quadro). Conteúdo: content/textos/contato.md */
export function Component() {
  const page = getPage('contato')
  const canais = page.groups.find((g) => /canais/i.test(g.title))?.items ?? []
  const email = channel(canais, 'E-mail')
  const horario = channel(canais, 'Horário')
  const { address } = company
  const mapQuery = encodeURIComponent(`${address.street}, ${address.district}, ${address.city} - ${address.state}`)

  return (
    <>
      <Seo title={page.seo.title} description={page.seo.description} schema={pageSchemas(page, { localBusiness: true })} />

      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: page.breadcrumb }]}
        kicker={page.kicker}
        title={page.h1}
        lead={page.lead}
      />

      <section>
        <div className="container-site flex flex-col gap-10 py-10 md:py-16 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-3 lg:flex-[1_1_360px]">
            <h2 className="sr-only">Canais de atendimento</h2>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 rounded-[20px] bg-forest p-5 text-white transition hover:bg-forest-dark"
            >
              <WhatsAppIcon size={26} className="shrink-0 text-sprout" />
              <span className="flex flex-col">
                <span className="text-[13px] font-semibold text-sprout">WhatsApp: resposta mais rápida</span>
                <span className="text-[22px] font-bold">{company.whatsapp.display}</span>
              </span>
            </a>
            <a href={company.phone.href} className="flex items-center gap-3.5 rounded-[20px] bg-white p-5 text-forest">
              <Phone size={26} className="shrink-0 text-leaf" aria-hidden="true" />
              <span className="flex flex-col">
                <span className="text-[13px] font-semibold text-ink-muted">Telefone fixo</span>
                <span className="text-[22px] font-bold">{company.phone.display}</span>
              </span>
            </a>
            <div className="flex items-start gap-3.5 rounded-[20px] bg-white p-5">
              <MapPin size={26} className="shrink-0 text-leaf" aria-hidden="true" />
              <address className="flex flex-col gap-0.5 not-italic">
                <span className="text-[13px] font-semibold text-ink-muted">Endereço</span>
                <span className="text-base leading-normal font-semibold">
                  {address.street.replace(', Sala', ' · Sala')}
                  <br />
                  {address.district} · {address.city}/{address.state}
                  <br />
                  CEP {address.zip}
                </span>
              </address>
            </div>
            {email && (
              <div className="flex items-start gap-3.5 rounded-[20px] bg-white p-5">
                <Mail size={26} className="shrink-0 text-leaf" aria-hidden="true" />
                <span className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-semibold text-ink-muted">E-mail</span>
                  <span className="text-base font-semibold">
                    <Rich text={email} />
                  </span>
                </span>
              </div>
            )}
            {horario && (
              <div className="flex items-start gap-3.5 rounded-[20px] bg-white p-5">
                <Clock size={26} className="shrink-0 text-leaf" aria-hidden="true" />
                <span className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-semibold text-ink-muted">Horário de atendimento</span>
                  <span className="text-base font-semibold">
                    <Rich text={horario} />
                  </span>
                </span>
              </div>
            )}
          </div>

          <div id="orcamento" className="flex min-w-0 scroll-mt-4 flex-col gap-4 lg:flex-[1_1_560px]">
            <h2 className={h2Section}>{page.intro.title}</h2>
            {page.intro.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-ink-2">
                <Rich text={p} />
              </p>
            ))}
            <ContactForm variant="contact" origin="Contato" />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-10 md:py-16">
          <iframe
            title="Mapa: Líder Resíduos na Av. do Contorno, Belo Horizonte"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[300px] w-full rounded-[24px] border-0 bg-photo md:h-[360px]"
          />
        </div>
      </section>

      <section>
        <div className="container-site grid grid-cols-1 gap-10 py-10 md:py-16 lg:grid-cols-2">
          <CitiesBlock cities={page.cities} />
          <div className="flex flex-col gap-3">
            <h2 className={h2Section}>Perguntas frequentes</h2>
            <Faq items={page.faq} />
          </div>
        </div>
      </section>

      {page.related.length > 0 && (
        <section className="bg-white">
          <div className="container-site flex flex-col gap-5 py-10 md:py-14">
            <h2 className={h2Section}>Serviços mais procurados</h2>
            <LinkGrid links={page.related} />
          </div>
        </section>
      )}

      <CtaBand title={page.cta} />
    </>
  )
}
