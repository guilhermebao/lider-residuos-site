// Dados fixos da empresa (handoff, seção 6). Manter igual ao Perfil da Empresa no Google (NAP).

export const company = {
  name: 'Líder Resíduos',
  tagline: 'Coleta, transporte, destinação e comércio de recicláveis em BH e região.',
  serviceArea: 'Atendemos Belo Horizonte, Contagem, Betim e região metropolitana',
  phone: { display: '(31) 3531-3197', href: 'tel:+553135313197', e164: '+55-31-3531-3197' },
  whatsapp: {
    display: '(31) 99149-0544',
    number: '5531991490544',
  },
  address: {
    street: 'Av. do Contorno, 2905, Sala 405',
    district: 'Santa Efigênia',
    city: 'Belo Horizonte',
    state: 'MG',
    zip: '30110-017',
  },
  areaServed: ['Belo Horizonte', 'Contagem', 'Betim', 'Região Metropolitana de Belo Horizonte'],
} as const

export function whatsappHref(message = 'Olá! Vim pelo site e gostaria de um orçamento.') {
  return `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent(message)}`
}

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Empresa', href: '/empresa' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Vender sucata', href: '/vender-sucata' },
  { label: 'Contato', href: '/contato' },
] as const

/** Páginas previstas que ainda não foram desenvolvidas (exibem "em desenvolvimento"). */
export const plannedPages = [
  { path: '/servicos', title: 'Serviços' },
  { path: '/comercio-reciclaveis', title: 'Comércio de recicláveis' },
  { path: '/vender-sucata', title: 'Vender sucata' },
  { path: '/empresa', title: 'Empresa' },
  { path: '/contato', title: 'Contato' },
] as const
