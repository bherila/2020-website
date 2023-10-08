import { z } from 'zod'

export const sessionSchema = z.object({
  uid: z.number().nonnegative().default(0),
  ax_maxmin: z.boolean().optional().default(false),
  ax_homes: z.boolean().optional().default(false),
  ax_tax: z.boolean().optional().default(false),
  ax_evdb: z.boolean().optional().default(false),
  ax_spgp: z.boolean().optional().default(false),
})

export type sessionType = z.infer<typeof sessionSchema>
