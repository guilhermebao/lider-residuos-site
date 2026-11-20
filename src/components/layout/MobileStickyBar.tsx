import { Phone } from 'lucide-react'
import { company, whatsappHref } from '../../data/site'
import { WhatsAppIcon } from '../ui/icons'

/** Barra fixa no rodapé (só mobile): WhatsApp em largura total + botão de ligação. */
export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white/95 px-4 pt-2.5 pb-[max(10px,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-forest text-base font-bold text-white"
      >
        <WhatsAppIcon size={20} className="text-sprout" />
        Orçamento no WhatsApp
      </a>
      <a
        href={company.phone.href}
        aria-label={`Ligar para ${company.phone.display}`}
        className="inline-flex size-[52px] shrink-0 items-center justify-center rounded-full bg-sprout text-forest"
      >
        <Phone size={22} aria-hidden="true" />
      </a>
    </div>
  )
}
