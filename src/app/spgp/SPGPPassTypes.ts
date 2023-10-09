import { z } from 'zod'

export const SPGPPassTypesSchema = z.object({
  passtype_id: z.number().nonnegative(),
  display_name: z.string(),
  expiry: z.date(),
  info: z.string(),
})

export type ParsedSPGPPassType = z.infer<typeof SPGPPassTypesSchema>
