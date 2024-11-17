import { z } from 'zod'
import moment from 'moment'

export const SPGPSchema = z.object({
  promoCode: z.string().optional(),
  renewOrNew: z.string().optional(),
  first: z.string(),
  last: z.string(),
  birthday: z.string().optional(),
  email: z
    .string()
    .email()
    .optional()
    .transform((r) => r?.toLowerCase()),
  passType: z.string(),
  price: z.string().optional(),
  redeemedMonth: z.string().optional(),
  total: z.string().optional(),
  notes: z.string().optional(),
  sentCode: z.string().optional(),
})

export interface ParsedSPGP {
  promoCode?: string
  renewOrNew?: string
  first?: string
  last?: string
  birthday?: string
  email?: string
  passType?: string
  price?: string
  redeemedMonth?: string
  total?: string
  notes?: string
  sentCode?: string
}

export const colKeys =
  'promoCode,renewOrNew,first,last,birthday,email,passType,price,redeemedMonth,total,notes,sentCode'.split(',')
