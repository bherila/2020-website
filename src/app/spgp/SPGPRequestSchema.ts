import * as z from 'zod'

export const SPGPRequestSchema = z.object({
  r_first: z.string().min(1, { message: 'Required' }),
  r_last: z.string().min(1, { message: 'Required' }),
  r_email: z.string().email(),
  r_birthdate: z.coerce.date(),
  r_previous_passid: z.coerce
    .string()
    .regex(/I\d{8,25}|^$/i)
    .optional()
    .transform((arg) => (arg == null ? '' : arg)), // either iXXXXX or empty
  passtype_id: z.coerce.number().nonnegative(),

  // optionals
  r_id: z.number().optional(),
  uid: z.number().optional(),
  r_comment: z.coerce.string().optional(),
  r_total: z.coerce.number().optional(),
  r_redeemedMonth: z.string().optional(),
})

export interface SPGPRequestType {
  r_first: string
  r_last: string
  r_email: string
  r_birthdate: Date
  r_previous_passid: string
  passtype_id: number

  r_id: number
  uid: number
  r_comment: string
  r_total: number
  r_redeemedMonth: string
}

export interface SPGPRequestTypeWithPromo extends SPGPRequestType {
  r_promo?: string
}
