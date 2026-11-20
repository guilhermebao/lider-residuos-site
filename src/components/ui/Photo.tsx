import { ImageIcon } from 'lucide-react'

interface Props {
  src?: string
  alt: string
  /** Texto exibido enquanto a foto real do cliente não chega. */
  placeholder: string
  className?: string
  priority?: boolean
}

/**
 * Foto com fallback. As fotos do quadro de design são de banco e não podem ir ao ar,
 * então, sem `src`, mostramos um bloco indicando qual foto precisa ser produzida.
 */
export function Photo({ src, alt, placeholder, className = '', priority = false }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`block object-cover ${className}`}
      />
    )
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex flex-col items-center justify-center gap-2 bg-photo p-4 text-center text-sm font-semibold text-leaf-text ${className}`}
    >
      <ImageIcon size={28} strokeWidth={1.8} aria-hidden="true" />
      <span>{placeholder}</span>
    </div>
  )
}
