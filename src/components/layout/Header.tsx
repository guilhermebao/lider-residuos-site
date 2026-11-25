import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { nav, whatsappHref } from '../../data/site'
import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/icons'

/** Serviço individual também ativa "Serviços" no menu. */
function useIsActive() {
  const { pathname } = useLocation()
  return (href: string, isServicePage: boolean) => {
    if (href === '/') return pathname === '/'
    // uma página de serviço ativa "Serviços", a menos que ela própria esteja no menu (ex.: Vender sucata)
    const inNav = nav.some((i) => i.href !== '/' && pathname === i.href)
    if (href === '/servicos' && isServicePage && !inNav) return true
    return pathname === href || pathname.startsWith(`${href}/`)
  }
}

export function Header({ isServicePage = false }: { isServicePage?: boolean }) {
  const [open, setOpen] = useState(false)
  const isActive = useIsActive()
  return (
    <header className="relative z-30 border-b border-line bg-white">
      <div className="container-site flex items-center justify-between gap-4 py-3 md:py-[18px]">
        <Link to="/" aria-label="Líder Resíduos — página inicial" className="flex shrink-0 items-center">
          <img src="/img/logo-simbolo.png" alt="Líder Resíduos" width={94} height={52} className="h-10 w-auto md:h-[52px]" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-6 text-[15px] font-medium">
            {nav.map((item) => {
              const active = isActive(item.href, isServicePage)
              return (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`border-b-[3px] pb-1 text-forest transition hover:text-forest-dark ${
                      active ? 'border-sprout font-bold' : 'border-transparent'
                    }`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href={whatsappHref()} size="md">
            Orçamento no WhatsApp
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className="flex size-11 items-center justify-center rounded-xl bg-bg text-forest lg:hidden"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Principal" onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)} className="absolute inset-x-0 top-full border-b border-line bg-white shadow-lift lg:hidden">
          <ul className="container-site flex flex-col py-2">
            {nav.map((item) => {
              const active = isActive(item.href, isServicePage)
              return (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-12 items-center border-l-[3px] px-3 text-base text-forest ${
                      active ? 'border-sprout font-bold' : 'border-transparent font-medium'
                    }`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
            <li className="pt-2 pb-3">
              <Button href={whatsappHref()} className="w-full">
                <WhatsAppIcon size={18} className="text-sprout" />
                Orçamento no WhatsApp
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
