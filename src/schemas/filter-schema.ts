import { z } from 'zod'

export const filterScopeValues = ['none', 'energy', 'critical', 'both'] as const
export type FilterScopeValues = (typeof filterScopeValues)[number]

export const filterScope: Record<FilterScopeValues, string> = {
  none: 'Nenhum',
  energy: 'Sensor de Energia',
  critical: 'Crítico',
  both: 'Ambos',
}

export const filterSchema = z.object({
  searchTerm: z.string(),
  scope: z.enum(filterScopeValues),
})

export type FilterSchema = z.infer<typeof filterSchema>
