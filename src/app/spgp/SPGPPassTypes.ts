import { z } from 'zod'

export const SPGPPassTypesSchema = z.object({
  passtype_id: z.number().nonnegative(),
  display_name: z.string(),
  expiry: z.coerce.string().optional(),
  info: z.string().optional().default(''),
})

export type ParsedSPGPPassType = z.infer<typeof SPGPPassTypesSchema>
