import { z } from 'zod'

export const SignupZod = z.object({
  username: z.string().min(4, { message: 'Username is too short' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password is too short' }),
  confirmPassword: z.string(),
  inviteCode: z.string().optional(),
})

// Check if the confirm password field matches the password field
SignupZod.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type SignupType = z.infer<typeof SignupZod>
