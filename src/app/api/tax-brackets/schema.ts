import { z } from 'zod'

export const graduatedTaxSchema = z.object({
  year: z.number().min(1900).max(2023),
  region: z.string().length(2).nullable(),
  income_over: z.number().min(-1),
  rate: z.coerce.string(),
  type: z.enum(['s', 'mfj', 'mfs', 'hoh']).optional(),
})
