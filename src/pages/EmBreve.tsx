import { Construction } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Button } from '../components/ui/Button'
import { whatsappHref } from '../data/site'

/** Página provisória para as seções previstas que ainda não foram desenvolvidas. */
export function EmBreve({ title, notFound = false }: { title: string; notFound?: boolean }) {
  return (
    <>
      <Seo
        title={`${title} | Líder Resíduos`}
        description="Coleta, transporte, destinação e comércio de recicláveis em BH e região."
        noindex
      />
      <section className="bg-forest text-white">
        <div className="container-site flex flex-col items-start gap-5 py-16 md:py-24">
          <Construction size={40} className="text-sprout" aria-hidden="true" />
          <h1 className="text-[34px] leading-tight font-extrabold text-white md:text-[52px]">{title}</h1>
          <p className="max-w-[560px] text-lg text-on-forest-2">
            {notFound
              ? 'Não encontramos esta página. Volte para o início ou fale com a gente.'
              : 'Esta página está em desenvolvimento. Enquanto isso, fale direto com a nossa equipe.'}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappHref()} variant="sprout">
              Falar no WhatsApp
            </Button>
            <Button href="/" variant="outline-light">
              Voltar para a home
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
