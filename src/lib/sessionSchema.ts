import { z } from 'zod'

export const sessionSchema = z.object({
  uid: z.number().nonnegative().default(0),
  email: z.string().optional(),
  ax_maxmin: z.boolean().optional().default(false),
  ax_homes: z.boolean().optional().default(false),
  ax_tax: z.boolean().optional().default(false),
  ax_evdb: z.boolean().optional().default(false),
  ax_spgp: z.boolean().optional().default(false),
  ax_phr: z.boolean().optional().default(false),
})

export interface sessionType {
  uid: number
  email?: string
  ax_maxmin?: boolean
  ax_homes?: boolean
  ax_tax?: boolean
  ax_evdb?: boolean
  ax_spgp?: boolean
  ax_phr?: boolean
}
