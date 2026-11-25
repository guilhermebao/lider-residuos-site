import type { ReactNode } from 'react'
import { Breadcrumb } from './shared'
import { Photo } from '../ui/Photo'
import { Rich } from '../ui/Rich'

interface Props {
  breadcrumb: { label: string; href?: string }[]
  kicker: string
  title: string
  lead: string
  actions?: ReactNode
  photo?: { src?: string; alt: string; placeholder: string }
}

/** Hero das páginas internas: fundo forest, breadcrumb, kicker, H1, lead, CTAs e foto opcional. */
export function PageHero({ breadcrumb, kicker, title, lead, actions, photo }: Props) {
  return (
    <section className="bg-forest text-white">
      <div className="container-site flex flex-col gap-6 pt-6 pb-10 md:gap-7 md:pt-10 md:pb-16">
        <Breadcrumb items={breadcrumb} />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex flex-col gap-4 md:gap-[18px] lg:flex-[1_1_520px]">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-sprout uppercase md:text-[13px]">{kicker}</span>
            <h1 className="text-[34px] leading-[1.06] font-extrabold text-white md:text-[52px] md:leading-[1.04]">{title}</h1>
            <p className="max-w-[600px] text-base leading-relaxed text-on-forest-2 md:text-lg">
              <Rich text={lead} />
            </p>
            {actions && <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
          </div>
          {photo && (
            <Photo
              priority
              src={photo.src}
              alt={photo.alt}
              placeholder={photo.placeholder}
              className="h-[220px] w-full rounded-[20px] md:h-[340px] md:rounded-[24px] lg:flex-[1_1_380px]"
            />
          )}
        </div>
      </div>
    </section>
  )
}
