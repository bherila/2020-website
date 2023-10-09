import { z } from 'zod'

export const SPGPSchema = z.object({
  promoCode: z.string().optional(),
  renewOrNew: z.string().optional(),
  first: z.string(),
  last: z.string(),
  birthday: z.string().optional(),
  email: z.string().optional(),
  passType: z.string(),
  price: z.string().optional(),
  redeemedMonth: z.string().optional(),
  total: z.string().optional(),
  notes: z.string().optional(),
  sentCode: z.string().optional(),
})

export type ParsedSPGP = z.infer<typeof SPGPSchema>

export const colKeys =
  'promoCode,renewOrNew,first,last,birthday,email,passType,price,redeemedMonth,total,notes,sentCode'.split(
    ',',
  )
