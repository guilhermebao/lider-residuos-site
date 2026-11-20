import { Link } from 'react-router-dom'
import { company, nav, whatsappHref } from '../../data/site'

const YEAR = new Date().getFullYear()

export function Footer() {
  const { address } = company
  return (
    <footer className="bg-forest-dark text-sm text-on-forest-muted">
      <div className="container-site flex flex-col gap-8 pt-12 pb-6">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex max-w-[360px] flex-col gap-3">
            <img
              src="/img/logo-simbolo-branco.png"
              alt="Líder Resíduos"
              width={79}
              height={44}
              loading="lazy"
              className="h-11 w-auto self-start"
            />
            <p className="leading-relaxed">
              <strong className="font-semibold text-white">{company.name}</strong> — {company.tagline}
            </p>
          </div>

          <address className="flex flex-col gap-2 not-italic">
            <span className="font-bold text-white">Contato</span>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              WhatsApp {company.whatsapp.display}
            </a>
            <a href={company.phone.href} className="hover:text-white">
              Fixo {company.phone.display}
            </a>
            <span>{address.street.replace(', Sala', ' · Sala')}</span>
            <span>
              {address.district} · {address.city}/{address.state} · {address.zip}
            </span>
          </address>

          <nav aria-label="Rodapé" className="flex flex-col gap-2">
            <span className="font-bold text-white">Navegação</span>
            {nav
              .filter((i) => i.href !== '/')
              .map((item) => (
                <Link key={item.href} to={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ))}
          </nav>
        </div>
        <div className="border-t border-[#1E4436] pt-5 text-[13px]">
          © {YEAR} {company.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
