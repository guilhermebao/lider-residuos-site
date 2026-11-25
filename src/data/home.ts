import type { LinkItem as ServiceLink, Step } from '../content/types'

export const homeSeo = {
  title: 'Líder Resíduos | Coleta e Gestão de Resíduos em BH, Contagem e Betim',
  description:
    'Coleta, transporte, destinação e comércio de recicláveis para empresas em Belo Horizonte, Contagem, Betim e região. MTR e certificado de destinação. Peça seu orçamento.',
}

export const materials = [
  { label: 'Papel e papelão' },
  { label: 'Plásticos' },
  { label: 'Ferrosos e não ferrosos', short: 'Metais' },
  { label: 'Vidro' },
  { label: 'Madeira e pallets' },
  { label: 'Big bags' },
  { label: 'Orgânicos' },
]

export const services = [
  {
    title: 'Coleta e destinação',
    text: 'Resíduos industriais e da construção civil, hotéis, condomínios, clubes e cozinhas industriais. Implantação de coleta seletiva.',
    href: '/empresa-coleta-residuos-industriais',
    photo: 'Foto: fardos de papelão prensado',
  },
  {
    title: 'Comércio de recicláveis',
    text: 'Compra e venda de sucata metálica e não ferrosa, papelão e plásticos, além de reciclagem de madeira.',
    href: '/comercio-reciclagem',
    photo: 'Foto: sucata separada no pátio',
  },
  {
    title: 'Destinação especializada',
    text: 'Tambores, bombonas, coprocessamento, incineração, big bags, desmobilização e descaracterização.',
    href: '/destinacao-residuos-industriais',
    photo: 'Foto: equipe com EPI na triagem',
  },
  {
    title: 'Equipamentos e locação',
    text: 'Caminhões, caçambas de vários volumes, munck, trituradores, moinhos, prensas e retroescavadeiras.',
    href: '/servicos#aluguel-de-equipamentos',
    photo: 'Foto: munck e caçambas',
  },
]

export const steps: Step[] = [
  { title: 'Coleta', text: 'Retiramos no seu endereço, com frota própria e equipe treinada.' },
  { title: 'Triagem', text: 'Separação e prensagem na nossa estrutura de 3.000 m².' },
  { title: 'Reciclagem', text: 'Envio para indústrias de reciclagem licenciadas.' },
  { title: 'Comprovação', text: 'Você recebe MTR e certificado de destinação final.' },
]

// ATENÇÃO: números ilustrativos — substituir pelos dados reais da Líder (pendência com o cliente)
export const stats = [
  { value: '3.000 m²', label: 'de estrutura própria' },
  { value: '450 t', label: 'de resíduos destinados por mês' },
  { value: '15 anos', label: 'atendendo empresas em Minas' },
  { value: '92%', label: 'desviado de aterro' },
]
export const statsAreIllustrative = true

export const clients = [
  { icon: 'factory', name: 'Indústrias', text: 'Sucata, papelão, plástico e resíduos de processo' },
  { icon: 'construction', name: 'Construção civil', text: 'Entulho, madeira, metais e caçambas' },
  { icon: 'building', name: 'Condomínios', text: 'Coleta seletiva e recicláveis do dia a dia' },
  { icon: 'hotel', name: 'Hotéis e clubes', text: 'Recicláveis, vidro e orgânicos' },
  { icon: 'restaurant', name: 'Restaurantes', text: 'Orgânicos, óleo, vidro e embalagens' },
  { icon: 'kitchen', name: 'Cozinhas industriais', text: 'Grandes volumes de orgânicos e embalagens' },
] as const

export const popular: ServiceLink[] = [
  { label: 'Coleta de resíduos industriais', href: '/empresa-coleta-residuos-industriais' },
  { label: 'Aluguel de caçamba', href: '/aluguel-cacamba-valor' },
  { label: 'Compra e venda de sucata', href: '/compra-venda-sucata' },
  { label: 'Aluguel de caminhão munck', href: '/preco-locacao-caminhao-munck' },
]
