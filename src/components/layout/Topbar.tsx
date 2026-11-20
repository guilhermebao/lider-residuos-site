import { Phone } from 'lucide-react'
import { company, whatsappHref } from '../../data/site'
import { WhatsAppIcon } from '../ui/icons'

export function Topbar() {
  return (
    <div className="bg-forest-dark text-sm text-on-forest-2">
      {/* Desktop */}
      <div className="container-site hidden items-center justify-between gap-6 py-2.5 md:flex">
        <span>{company.serviceArea}</span>
        <div className="flex items-center gap-5">
          <a href={company.phone.href} className="inline-flex items-center gap-2 font-semibold text-white hover:underline">
            <Phone size={16} className="text-sprout" aria-hidden="true" />
            {company.phone.display}
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-white hover:underline"
          >
            <WhatsAppIcon size={16} className="text-sprout" />
            WhatsApp {company.whatsapp.display}
          </a>
        </div>
      </div>

      {/* Mobile: dois botões de toque */}
      <div className="flex gap-2 px-4 py-2 md:hidden">
        <a
          href={company.phone.href}
          className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-[#1E4436] text-[13px] font-semibold text-white"
        >
          <Phone size={16} className="text-sprout" aria-hidden="true" />
          {company.phone.display}
        </a>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-[#1E4436] text-[13px] font-semibold text-white"
          aria-label={`WhatsApp ${company.whatsapp.display}`}
        >
          <WhatsAppIcon size={16} className="text-sprout" />
          {company.whatsapp.display.replace('(31) ', '')}
        </a>
      </div>
    </div>
  )
}
