import { useId, useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { sendForm } from '../../lib/sendForm'
import { company, whatsappHref } from '../../data/site'

interface Props {
  /** full: 2 colunas com "Eu quero" (home/contato). compact: 1 coluna (lateral das páginas de serviço). */
  variant?: 'full' | 'compact'
  origin: string
  submitLabel?: string
}

const inputCls =
  'h-12 w-full rounded-xl border border-input bg-white px-3.5 text-base font-normal text-ink outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/30'

export function ContactForm({ variant = 'full', origin, submitLabel = 'Enviar pedido de orçamento' }: Props) {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const full = variant === 'full'

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>
    setStatus('sending')
    const res = await sendForm(data, origin)
    if (res.ok) {
      setStatus('done')
      form.reset()
    } else {
      setStatus('error')
      setError(res.error)
    }
  }

  if (status === 'done') {
    return (
      <div className="flex flex-col items-start gap-3 rounded-[24px] bg-white p-7 md:p-8" role="status">
        <CheckCircle2 size={36} className="text-leaf" aria-hidden="true" />
        <p className="font-display text-2xl font-extrabold text-forest">Pedido enviado!</p>
        <p className="text-ink-2">Recebemos seus dados e vamos responder em breve. Se for urgente, chame no WhatsApp.</p>
        <button type="button" onClick={() => setStatus('idle')} className="font-bold text-forest underline">
          Enviar outro pedido
        </button>
      </div>
    )
  }

  const field = (name: string) => `${id}-${name}`
  const span = full ? 'sm:col-span-1' : ''

  return (
    <form
      onSubmit={onSubmit}
      className={`grid grid-cols-1 gap-4 rounded-[24px] bg-white p-6 md:p-8 ${full ? 'sm:grid-cols-2' : ''}`}
    >
      <div className={`flex flex-col gap-1.5 ${span}`}>
        <label htmlFor={field('nome')} className="text-sm font-semibold">
          Nome
        </label>
        <input id={field('nome')} name="nome" type="text" autoComplete="name" required className={inputCls} />
      </div>
      <div className={`flex flex-col gap-1.5 ${span}`}>
        <label htmlFor={field('empresa')} className="text-sm font-semibold">
          Empresa
        </label>
        <input id={field('empresa')} name="empresa" type="text" autoComplete="organization" className={inputCls} />
      </div>
      <div className={`flex flex-col gap-1.5 ${span}`}>
        <label htmlFor={field('telefone')} className="text-sm font-semibold">
          Telefone / WhatsApp
        </label>
        <input
          id={field('telefone')}
          name="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          className={inputCls}
        />
      </div>
      {full && (
        <div className={`flex flex-col gap-1.5 ${span}`}>
          <label htmlFor={field('interesse')} className="text-sm font-semibold">
            Eu quero
          </label>
          <select id={field('interesse')} name="interesse" className={inputCls}>
            <option>Descartar resíduos</option>
            <option>Vender sucata</option>
            <option>Alugar equipamento</option>
          </select>
        </div>
      )}
      <div className={`flex flex-col gap-1.5 ${full ? 'sm:col-span-2' : ''}`}>
        <label htmlFor={field('mensagem')} className="text-sm font-semibold">
          Tipo e volume do resíduo
        </label>
        <textarea
          id={field('mensagem')}
          name="mensagem"
          rows={4}
          className={`${inputCls} h-auto resize-y py-3`}
        />
      </div>

      {/* honeypot anti-spam */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {status === 'error' && (
        <p role="alert" className={`text-sm text-red-700 ${full ? 'sm:col-span-2' : ''}`}>
          Não foi possível enviar ({error}). Tente de novo ou fale pelo{' '}
          <a href={whatsappHref()} className="font-bold underline" target="_blank" rel="noopener noreferrer">
            WhatsApp {company.whatsapp.display}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className={`h-[54px] rounded-full bg-forest text-base font-bold text-white transition hover:bg-forest-dark disabled:opacity-60 ${
          full ? 'sm:col-span-2' : ''
        }`}
      >
        {status === 'sending' ? 'Enviando…' : submitLabel}
      </button>
    </form>
  )
}
