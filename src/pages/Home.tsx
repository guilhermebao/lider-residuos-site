import { Link } from 'react-router-dom'
import { BedDouble, Building2, Factory, HardHat, Soup, UtensilsCrossed, type LucideIcon } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Button } from '../components/ui/Button'
import { Photo } from '../components/ui/Photo'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ContactChannels, LinkGrid, Steps } from '../components/sections/shared'
import { ContactForm } from '../components/sections/ContactForm'
import { addressLines, company } from '../data/site'
import { clients, homeSeo, materials, popular, services, stats, statsAreIllustrative, steps } from '../data/home'
import { localBusinessSchema } from '../lib/schema'

const clientIcons: Record<(typeof clients)[number]['icon'], LucideIcon> = {
  factory: Factory,
  construction: HardHat,
  building: Building2,
  hotel: BedDouble,
  restaurant: UtensilsCrossed,
  kitchen: Soup,
}

export function Component() {
  return (
    <>
      <Seo title={homeSeo.title} description={homeSeo.description} schema={[localBusinessSchema()]} />

      {/* Hero */}
      <section className="bg-forest text-white">
        <div className="container-site flex flex-col gap-10 pt-8 pb-[88px] md:pt-16 md:pb-[120px] lg:flex-row lg:items-center lg:gap-12">
          <div className="flex flex-col gap-[18px] md:gap-[22px] lg:flex-[1_1_500px]">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-sprout uppercase md:text-[13px]">
              Coleta · Transporte · Gerenciamento de resíduos
            </span>
            <h1 className="text-[36px] leading-[1.05] font-extrabold text-white md:text-[60px] md:leading-[1.02]">
              Pensando a sustentabilidade para o futuro.
            </h1>
            <p className="max-w-[560px] text-base leading-relaxed text-on-forest-2 md:text-lg">
              Retiramos, separamos e damos o destino certo aos resíduos da sua empresa, com toda a documentação
              exigida pelos órgãos ambientais.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#orcamento" variant="sprout">
                Solicitar orçamento
              </Button>
              <Button href="/empresa" variant="outline-light">
                Conheça a Líder
              </Button>
            </div>
            <span className="hidden text-[15px] text-on-forest-2 sm:block">
              Prefere ligar?{' '}
              <a href={company.phone.href} className="font-bold text-white underline">
                {company.phone.display}
              </a>
            </span>
          </div>
          <Photo
            priority
            alt="Caminhão da Líder Resíduos com caçamba para coleta"
            placeholder="Foto: caminhão da Líder com o logo"
            className="h-[220px] w-full rounded-[20px] md:h-[400px] md:rounded-[24px] lg:flex-[1_1_420px]"
          />
        </div>
      </section>

      {/* Cards de caminho + chips */}
      <section>
        <div className="container-site -mt-[60px] flex flex-col gap-3 pb-8 md:-mt-[72px] md:gap-6 md:pb-14">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <Link
              to="/empresa-coleta-residuos-industriais"
              className="flex flex-col gap-2 rounded-[20px] bg-white p-[22px] shadow-lift transition hover:-translate-y-0.5 md:gap-2.5 md:rounded-[24px] md:p-8"
            >
              <span className="text-xs font-bold tracking-[0.08em] text-leaf-text uppercase md:text-[13px]">
                Tenho resíduo para descartar
              </span>
              <span className="font-display text-[21px] leading-[1.15] font-extrabold text-forest md:text-[28px] md:leading-[1.12]">
                Coleta, transporte e destinação com MTR e certificado
              </span>
              <span className="font-bold text-forest">Solicitar coleta →</span>
            </Link>
            <Link
              to="/compra-venda-sucata"
              className="flex flex-col gap-2 rounded-[20px] bg-sprout p-[22px] shadow-lift transition hover:-translate-y-0.5 md:gap-2.5 md:rounded-[24px] md:p-8"
            >
              <span className="text-xs font-bold tracking-[0.08em] text-forest uppercase md:text-[13px]">
                Tenho sucata para vender
              </span>
              <span className="font-display text-[21px] leading-[1.15] font-extrabold text-forest md:text-[28px] md:leading-[1.12]">
                Compramos metais, cobre, inox, papelão, plástico e eletrônicos
              </span>
              <span className="font-bold text-forest">Pedir cotação →</span>
            </Link>
          </div>

          <div className="flex flex-col gap-2 pt-1 md:flex-row md:flex-wrap md:items-center">
            <span className="mr-1 hidden text-sm font-semibold text-ink-muted md:inline">Materiais que coletamos:</span>
            <ul
              aria-label="Materiais que coletamos"
              className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
            >
              {materials.map((m) => (
                <li
                  key={m.label}
                  className="shrink-0 rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold md:px-4 md:text-sm"
                >
                  <span className="md:hidden">{m.short ?? m.label}</span>
                  <span className="hidden md:inline">{m.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* O que fazemos */}
      <section>
        <div className="container-site flex flex-col gap-5 pt-6 pb-10 md:gap-8 md:pb-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle kicker="O que fazemos" title="Do recolhimento ao destino certo" />
            <Link to="/servicos" className="hidden text-[15px] font-bold text-forest hover:underline md:inline">
              Todos os serviços →
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.title}>
                <Link
                  to={s.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white transition hover:shadow-lift md:rounded-[24px]"
                >
                  <Photo alt="" placeholder={s.photo} className="h-[150px] w-full md:h-[170px]" />
                  <div className="flex flex-col gap-1.5 p-[18px] md:gap-2 md:p-6">
                    <h3 className="text-[19px] font-extrabold md:text-[21px]">{s.title}</h3>
                    <p className="text-sm leading-normal text-ink-2 md:text-[15px]">{s.text}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/servicos" className="self-start py-2.5 text-[15px] font-bold text-forest md:hidden">
            Todos os serviços →
          </Link>
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-white">
        <div className="container-site flex flex-col gap-5 py-10 md:gap-8 md:py-20">
          <SectionTitle
            kicker="Como funciona"
            title={
              <>
                Seu resíduo de volta ao ciclo<span className="hidden md:inline">, em 4 etapas</span>
              </>
            }
          />
          <Steps steps={steps} />
        </div>
      </section>

      {/* Números */}
      <section className="bg-forest text-white" aria-label="Números da Líder">
        <div className="container-site grid grid-cols-2 gap-5 py-8 md:gap-6 md:py-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col gap-0.5 md:gap-1">
              <span className="font-display text-[30px] font-extrabold text-sprout md:text-[40px]">{s.value}</span>
              <span className="text-[13px] text-on-forest-2 md:text-[15px]">{s.label}</span>
            </div>
          ))}
          {statsAreIllustrative && (
            <span className="col-span-full text-[11px] text-[#9FB8AB] md:text-xs">
              Números ilustrativos: substituir pelos dados reais da Líder.
            </span>
          )}
        </div>
      </section>

      {/* Clientes (V1) */}
      <section>
        <div className="container-site flex flex-col gap-5 py-10 md:gap-7 md:py-20">
          <SectionTitle kicker="Nossos clientes" title="Atendemos quem gera resíduo todos os dias" />
          <ul className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3 lg:grid-cols-6">
            {clients.map((c) => {
              const Icon = clientIcons[c.icon]
              return (
                <li key={c.name} className="flex flex-col gap-2.5 rounded-2xl bg-white p-4 md:gap-3 md:rounded-[18px] md:p-[22px]">
                  <span className="flex size-[42px] items-center justify-center rounded-full bg-tint text-forest md:size-12">
                    <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="text-[15px] font-bold md:text-base">{c.name}</span>
                  <span className="text-xs leading-snug text-ink-muted md:text-[13px]">{c.text}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Mais procurados */}
      <section className="bg-white">
        <div className="container-site flex flex-col gap-4 py-10 md:gap-7 md:py-20">
          <h2 className="h2">Mais procurados</h2>
          <LinkGrid links={popular} />
        </div>
      </section>

      {/* Contato */}
      <section id="orcamento" className="scroll-mt-4">
        <div className="container-site flex flex-col gap-8 py-10 md:py-20 lg:flex-row lg:gap-10">
          <div className="flex flex-col gap-4 md:gap-5 lg:flex-[1_1_380px]">
            <span className="kicker">Contato</span>
            <h2 className="h2">Peça seu orçamento</h2>
            <p className="text-base leading-relaxed text-ink-2 md:text-[17px]">
              Conte o tipo e o volume de resíduo. Respondemos rápido pelo WhatsApp ou telefone.
            </p>
            <ContactChannels />
            <div className="flex flex-col gap-0.5 px-5 py-1 text-[15px] text-ink-2">
              <span className="font-bold text-ink">Endereço</span>
              <span>
                {addressLines().join(' · ')}
              </span>
            </div>
          </div>
          <div className="lg:flex-[1_1_460px]">
            <ContactForm origin="Home" />
          </div>
        </div>
      </section>
    </>
  )
}
