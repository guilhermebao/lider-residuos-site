import type { ServicePage } from './types'

const page: ServicePage = {
  slug: 'empresa-coleta-residuos-industriais',
  seo: {
    title: 'Coleta de Resíduos Industriais em BH e Região | Líder Resíduos',
    description:
      'Coleta, transporte e destinação de resíduos industriais em Belo Horizonte, Contagem e Betim, com MTR e certificado de destinação final. Peça seu orçamento.',
  },
  breadcrumb: 'Coleta de resíduos industriais',
  kicker: 'Coleta e transporte',
  h1: 'Coleta de resíduos industriais em BH e região',
  lead: 'Retiramos os resíduos da sua indústria com frota adequada, equipe treinada e toda a documentação para a fiscalização ambiental.',
  image: {
    alt: 'Caminhão da Líder Resíduos com caçamba para coleta de resíduos industriais',
    placeholder: 'Foto: caminhão da Líder com caçamba',
  },
  intro: {
    title: 'Coleta industrial com responsabilidade e documentação',
    paragraphs: [
      'A Líder Resíduos atende indústrias de todos os portes com coleta, transporte e destinação de resíduos, fornecendo matéria-prima para indústrias de reciclagem licenciadas. Assim, sua empresa reduz custos, cumpre a legislação e evita passivo ambiental.',
      '[TEXTO SEO: 2 a 3 parágrafos sobre o serviço, com a palavra-chave “coleta de resíduos industriais” e as cidades atendidas.]',
    ],
  },
  list: {
    title: 'Resíduos que coletamos',
    items: [
      'Papel e papelão',
      'Plásticos',
      'Sucatas ferrosas e não ferrosas',
      'Vidro',
      'Madeira e pallets',
      'Resíduos orgânicos',
      'Big bags e embalagens',
      'Resíduos perigosos (Classe I)',
    ],
  },
  steps: [
    { title: 'Diagnóstico', text: 'Entendemos o tipo, o volume e a frequência dos seus resíduos.' },
    { title: 'Plano de coleta', text: 'Definimos caçambas, rota e periodicidade para a sua operação.' },
    { title: 'Coleta e transporte', text: 'Frota adequada e equipe treinada, com o MTR emitido.' },
    { title: 'Destinação e certificado', text: 'Destino licenciado e certificado de destinação final (CDF).' },
  ],
  docs: {
    title: 'Documentação inclusa',
    text: 'Manifesto de Transporte de Resíduos (MTR) e Certificado de Destinação Final (CDF) em todas as coletas, prontos para auditoria.',
  },
  cities: ['Belo Horizonte', 'Contagem', 'Betim', 'Ribeirão das Neves', 'Santa Luzia', 'Ibirité'],
  faq: [
    {
      q: 'A Líder emite o MTR?',
      a: 'Sim. Emitimos o Manifesto de Transporte de Resíduos em cada coleta e entregamos o certificado de destinação final.',
    },
    { q: 'Qual a frequência de coleta?', a: 'Definida conforme o seu volume: coletas avulsas, semanais ou programadas.' },
    { q: 'Vocês coletam resíduos perigosos?', a: 'Sim, com veículos e procedimentos adequados para resíduos Classe I.' },
    { q: 'Atendem fora de BH?', a: 'Atendemos Contagem, Betim e toda a região metropolitana de Belo Horizonte.' },
  ],
  // TODO: apontar para as URLs reais das páginas de SEO após o levantamento no Search Console
  related: [
    { label: 'Destinação de resíduos sólidos industriais', href: '/servicos' },
    { label: 'Transporte de resíduos perigosos', href: '/servicos' },
    { label: 'Aluguel de caçambas', href: '/servicos' },
    { label: 'Software de gestão de resíduos', href: '/servicos' },
  ],
  cta: {
    title: 'Precisa de uma coleta esta semana?',
    whatsappMessage: 'Olá! Vim pelo site e preciso de uma coleta de resíduos industriais.',
  },
}

export default page
