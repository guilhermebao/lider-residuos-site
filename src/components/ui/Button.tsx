import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'sprout' | 'outline-light' | 'outline-dark'

const variants: Record<Variant, string> = {
  primary: 'bg-forest text-white hover:bg-forest-dark',
  sprout: 'bg-sprout text-forest hover:brightness-95',
  'outline-light': 'border-2 border-white text-white hover:bg-white/10',
  'outline-dark': 'border-2 border-forest text-forest hover:bg-forest/5',
}

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: Variant
  size?: 'md' | 'lg'
  children: ReactNode
}

/** Botão pill. Links internos usam o router; externos (wa.me, tel:) abrem normalmente. */
export function Button({ href, variant = 'primary', size = 'lg', className = '', children, ...rest }: Props) {
  const cls = [
    'inline-flex items-center justify-center gap-2 rounded-full font-bold transition whitespace-nowrap',
    size === 'lg' ? 'h-[52px] px-7 text-base md:h-[54px]' : 'h-[46px] px-[22px] text-sm',
    variants[variant],
    className,
  ].join(' ')

  const external = /^(https?:|tel:|mailto:)/.test(href)
  if (external || href.startsWith('#')) {
    const target = href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a href={href} className={cls} {...target} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={href} className={cls} {...rest}>
      {children}
    </Link>
  )
}
