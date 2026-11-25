import { Fragment } from 'react'

/**
 * Texto com **negrito** e marcadores [CONFIRMAR ...].
 * Os marcadores aparecem destacados para o cliente validar na prévia.
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[CONFIRMAR[^\]]*\])/g).filter(Boolean)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-ink">{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('[CONFIRMAR')) {
          return (
            <mark
              key={i}
              title="Informação a confirmar com o cliente"
              className="rounded-md border border-dashed border-[#B08A00] bg-[#FFF4C2] px-1 py-px text-[0.85em] font-semibold whitespace-normal text-[#5C4700]"
            >
              {part.slice(1, -1)}
            </mark>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
