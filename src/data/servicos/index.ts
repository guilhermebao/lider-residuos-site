import type { ServicePage } from './types'
import coletaIndustrial from './coleta-residuos-industriais.ts'

/** Registro das páginas de serviço. Cada item vira uma rota pré-renderizada em /<slug>. */
export const servicePages: ServicePage[] = [coletaIndustrial]

export type { ServicePage } from './types'
