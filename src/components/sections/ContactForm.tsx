import { useId, useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { sendForm } from '../../lib/sendForm'
import { company, whatsappHref } from '../../data/site'

interface Props {
  /**
   * full: 2 colunas com "Eu quero" (home).
   * contact: 2 colunas com e-mail e cidade (página Contato).
   * compact: 1 coluna (lateral das páginas de serviço).
   */
  variant?: 'full' | 'contact' | 'compact'
  origin: string
  submitLabel?: string
}

const inputCls =
  'h-12 w-full rounded-xl border border-input bg-white px-3.5 text-base font-normal text-ink outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/30'

const interestOptions = {
  full: ['Descartar resíduos', 'Vender sucata', 'Alugar equipamento'],
  contact: ['Descartar resíduos', 'Vender sucata ou recicláveis', 'Alugar equipamento', 'Outro'],
}

type Field = {
  name: string
  label: string
  type?: string
  autoComplete?: string
  required?: boolean
  wide?: boolean
  kind?: 'input' | 'select' | 'textarea'
  options?: string[]
}

function fieldsFor(variant: NonNullable<Props['variant']>): Field[] {
  const nome: Field = { name: 'nome', label: 'Nome', autoComplete: 'name', required: true }
  const empresa: Field = { name: 'empresa', label: 'Empresa', autoComplete: 'organization' }
  const telefone: Field = { name: 'telefone', label: 'Telefone / WhatsApp', type: 'tel', autoComplete: 'tel', required: true }
  const mensagem: Field = { name: 'mensagem', label: 'Tipo e volume do resíduo', kind: 'textarea', wide: true }

  if (variant === 'compact') return [nome, empresa, telefone, mensagem]
  if (variant === 'contact')
    return [
      nome,
      empresa,
      telefone,
      { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email' },
      { name: 'cidade', label: 'Cidade', autoComplete: 'address-level2' },
      { name: 'interesse', label: 'O que você precisa', kind: 'select', options: interestOptions.contact },
      { ...mensagem, label: 'Mensagem' },
    ]
  return [nome, empresa, telefone, { name: 'interesse', label: 'Eu quero', kind: 'select', options: interestOptions.full }, mensagem]
}

export function ContactForm({ variant = 'full', origin, submitLabel = 'Enviar pedido de orçamento' }: Props) {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const twoCols = variant !== 'compact'
  const wide = twoCols ? 'sm:col-span-2' : ''

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

  return (
    <form onSubmit={onSubmit} className={`grid grid-cols-1 gap-4 rounded-[24px] bg-white p-6 md:p-8 ${twoCols ? 'sm:grid-cols-2' : ''}`}>
      {fieldsFor(variant).map((f) => {
        const fid = `${id}-${f.name}`
        return (
          <div key={f.name} className={`flex flex-col gap-1.5 ${f.wide ? wide : ''}`}>
            <label htmlFor={fid} className="text-sm font-semibold">
              {f.label}
            </label>
            {f.kind === 'select' ? (
              <select id={fid} name={f.name} className={inputCls}>
                {f.options?.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : f.kind === 'textarea' ? (
              <textarea id={fid} name={f.name} rows={4} className={`${inputCls} h-auto resize-y py-3`} />
            ) : (
              <input
                id={fid}
                name={f.name}
                type={f.type ?? 'text'}
                inputMode={f.type === 'tel' ? 'tel' : undefined}
                autoComplete={f.autoComplete}
                required={f.required}
                className={inputCls}
              />
            )}
          </div>
        )
      })}

      {/* honeypot anti-spam */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {status === 'error' && (
        <p role="alert" className={`text-sm text-red-700 ${wide}`}>
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
        className={`h-[54px] rounded-full bg-forest text-base font-bold text-white transition hover:bg-forest-dark disabled:opacity-60 ${wide}`}
      >
        {status === 'sending' ? 'Enviando…' : submitLabel}
      </button>
    </form>
  )
}
