// Dados fixos da empresa (handoff, seção 6). Manter igual ao Perfil da Empresa no Google (NAP).

export const company = {
  name: 'Líder Resíduos',
  tagline: 'Coleta, transporte, destinação e comércio de recicláveis em BH e região.',
  serviceArea: 'Atendemos empresas de todo o Brasil',
  phone: { display: '(31) 3531-3197', href: 'tel:+553135313197', e164: '+55-31-3531-3197' },
  whatsapp: {
    display: '(31) 99149-0544',
    number: '5531991490544',
  },
  address: {
    street: 'Av. Ivair Nogueira do Pinho, 256',
    // TODO: confirmar bairro e CEP com o cliente
    district: '',
    city: 'Betim',
    state: 'MG',
    zip: '',
  },
  areaServed: ['Belo Horizonte', 'Contagem', 'Betim', 'Região Metropolitana de Belo Horizonte'],
} as const

/** Endereço em até 3 linhas, sem campos vazios: rua · bairro · cidade/UF · CEP */
export function addressLines() {
  const { street, district, city, state, zip } = company.address
  return [street, [district, `${city}/${state}`].filter(Boolean).join(' · '), zip ? `CEP ${zip}` : ''].filter(Boolean)
}

export function whatsappHref(message = 'Olá! Vim pelo site e gostaria de um orçamento.') {
  return `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent(message)}`
}

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Empresa', href: '/empresa' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Vender sucata', href: '/compra-venda-sucata' },
  { label: 'Contato', href: '/contato' },
] as const

