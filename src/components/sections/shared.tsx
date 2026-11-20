import { Link } from 'react-router-dom'
import { ChevronDown, Phone } from 'lucide-react'
import type { Faq as FaqItem, ServiceLink, Step } from '../../data/servicos/types'
import { company, whatsappHref } from '../../data/site'
import { WhatsAppIcon } from '../ui/icons'
import { Button } from '../ui/Button'

/* ---------- Etapas ---------- */
export function Steps({ steps, layout = 'row' }: { steps: Step[]; layout?: 'row' | 'grid2' }) {
  return (
    <>
      {/* Mobile: lista com número em círculo (HomeMobileB) */}
      <ol className="flex flex-col gap-4 md:hidden">
        {steps.map((s, i) => (
          <li key={s.title} className="flex items-start gap-3.5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-tint font-display text-[15px] font-extrabold text-leaf-text">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-0.5">
              <h3 className="font-sans text-base font-bold text-ink">{s.title}</h3>
              <p className="text-sm leading-snug text-ink-2">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      {/* Desktop: cards com número grande */}
      <ol className={`hidden gap-4 md:grid ${layout === 'row' ? 'md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 gap-3'}`}>
        {steps.map((s, i) => (
          <li
            key={s.title}
            className={`flex flex-col gap-2 rounded-[20px] p-6 ${layout === 'row' ? 'bg-bg' : 'bg-white'}`}
          >
            <span className="font-display text-[30px] font-extrabold text-leaf">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="font-display text-lg font-extrabold text-ink">{s.title}</h3>
            <p className="text-[15px] leading-normal text-ink-2">{s.text}</p>
          </li>
        ))}
      </ol>
    </>
  )
}

/* ---------- FAQ ---------- */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((f, i) => (
        <details key={f.q} className="group rounded-2xl bg-white px-5 py-4 md:px-[22px]" open={i === 0}>
          <summary className="flex min-h-7 cursor-pointer items-center justify-between gap-4 text-base font-bold">
            {f.q}
            <ChevronDown size={20} className="shrink-0 text-leaf transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

/* ---------- Lista de links (Mais procurados / Serviços relacionados) ---------- */
export function LinkGrid({ links, tone = 'bg' }: { links: ServiceLink[]; tone?: 'bg' | 'white' }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {links.map((l) => (
        <li key={l.label}>
          <Link
            to={l.href}
            className={`flex h-full min-h-14 items-center justify-between gap-3 rounded-[18px] px-5 py-4 text-[15px] font-bold text-ink transition hover:ring-2 hover:ring-leaf/40 md:text-base ${
              tone === 'bg' ? 'bg-bg' : 'bg-white'
            }`}
          >
            {l.label}
            <span className="text-leaf-text" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/* ---------- Canais de contato (cards WhatsApp / telefone) ---------- */
export function ContactChannels({ compact = false }: { compact?: boolean }) {
  const pad = compact ? 'px-[18px] py-4' : 'px-5 py-[18px]'
  const num = compact ? 'text-lg' : 'text-xl'
  return (
    <div className="flex flex-col gap-3">
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-3.5 rounded-[18px] bg-forest text-white transition hover:bg-forest-dark ${pad}`}
      >
        <WhatsAppIcon size={22} className="shrink-0 text-sprout" />
        <span className="flex flex-col">
          <span className="text-[13px] font-semibold text-sprout">WhatsApp</span>
          <span className={`${num} font-bold`}>{company.whatsapp.display}</span>
        </span>
      </a>
      <a
        href={company.phone.href}
        className={`flex items-center gap-3.5 rounded-[18px] bg-white text-forest transition hover:ring-2 hover:ring-leaf/40 ${pad}`}
      >
        <Phone size={22} className="shrink-0 text-leaf" aria-hidden="true" />
        <span className="flex flex-col">
          <span className="text-[13px] font-semibold text-ink-muted">Telefone fixo</span>
          <span className={`${num} font-bold`}>{company.phone.display}</span>
        </span>
      </a>
    </div>
  )
}

/* ---------- Faixa CTA (sprout) ---------- */
export function CtaBand({ title, whatsappMessage }: { title: string; whatsappMessage?: string }) {
  return (
    <section className="bg-sprout">
      <div className="container-site flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center md:py-12">
        <div className="flex max-w-[640px] flex-col gap-1.5">
          <h2 className="text-[26px] leading-tight font-extrabold md:text-[32px]">{title}</h2>
          <p className="text-base font-semibold text-forest md:text-[17px]">
            WhatsApp {company.whatsapp.display} · Fixo {company.phone.display}
          </p>
        </div>
        <Button href={whatsappHref(whatsappMessage)} className="w-full md:w-auto">
          <WhatsAppIcon size={18} className="text-sprout" />
          Chamar no WhatsApp
        </Button>
      </div>
    </section>
  )
}

/* ---------- Breadcrumb ---------- */
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Você está em" className="text-sm text-[#C9D8CF]">
      <ol className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <li key={it.label} className="flex gap-2">
            {i > 0 && <span aria-hidden="true">›</span>}
            {it.href ? (
              <Link to={it.href} className="underline-offset-2 hover:text-white hover:underline">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-white">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
