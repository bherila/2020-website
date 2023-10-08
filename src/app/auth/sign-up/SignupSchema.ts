import { z } from 'zod'

export const SignupZod = z.object({
  alias: z.string().min(3).max(20),
  email: z.string().email().max(100),
  password: z.string().min(8).max(100),
  inviteCode: z.string().optional(),
})

export type SignupType = z.infer<typeof SignupZod>
