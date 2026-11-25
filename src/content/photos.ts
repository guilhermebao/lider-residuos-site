/**
 * Descrição da foto de cada página enquanto as fotos reais não chegam (handoff, seção 7).
 * Quando houver foto, colocar em public/img/ e mapear aqui o `src` pelo slug.
 */
const byKicker: Record<string, string> = {
  'Coleta e transporte': 'Foto: caminhão da Líder com caçamba',
  'Gestão de resíduos': 'Foto: equipe com EPI na triagem',
  'Locação de equipamentos': 'Foto: equipamento da Líder em operação',
  'Compra de recicláveis': 'Foto: fardos e recicláveis separados',
  'Compra de metais': 'Foto: sucata metálica separada no pátio',
  'Compra de sucata': 'Foto: sucata metálica separada no pátio',
  'Desmanche industrial': 'Foto: desmontagem com caminhão munck',
  'Destinação de resíduos': 'Foto: galpão de triagem',
  'Resíduos perigosos': 'Foto: tambores identificados para coleta',
}

const srcBySlug: Record<string, string> = {
  // 'empresa-coleta-residuos-industriais': '/img/caminhao-lider.webp',
}

export function pagePhoto(slug: string, kicker: string) {
  return {
    src: srcBySlug[slug],
    placeholder: byKicker[kicker] ?? 'Foto: operação da Líder Resíduos',
  }
}
