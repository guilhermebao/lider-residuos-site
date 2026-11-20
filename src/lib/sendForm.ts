import { whatsappHref } from '../data/site'

/**
 * Envio dos formulários para e-mail via Web3Forms (https://web3forms.com).
 * Funciona em qualquer hospedagem estática (Vercel agora, servidor do cliente depois), sem backend.
 *
 * Configurar a variável VITE_WEB3FORMS_KEY com a chave gerada para o e-mail da Líder.
 * Sem a chave (ex.: ambiente local), o envio cai no WhatsApp com os dados preenchidos.
 */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

export type FormData = Record<string, string>

export type SendResult = { ok: true; via: 'email' | 'whatsapp' } | { ok: false; error: string }

export async function sendForm(data: FormData, origin: string): Promise<SendResult> {
  if (data.botcheck) return { ok: true, via: 'email' } // honeypot preenchido = robô

  if (!ACCESS_KEY) {
    const lines = Object.entries(data)
      .filter(([k, v]) => v && k !== 'botcheck')
      .map(([k, v]) => `${k}: ${v}`)
    window.open(whatsappHref(`Olá! Pedido de orçamento pelo site (${origin}).\n\n${lines.join('\n')}`), '_blank')
    return { ok: true, via: 'whatsapp' }
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `Novo pedido de orçamento — ${origin}`,
        from_name: 'Site Líder Resíduos',
        pagina: origin,
        ...data,
      }),
    })
    const json = await res.json()
    if (!res.ok || !json.success) throw new Error(json.message || 'Falha no envio')
    return { ok: true, via: 'email' }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Falha no envio' }
  }
}
