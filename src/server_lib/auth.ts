import 'server-only'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mysql',
  }),
  signUp: {
    requireEmailVerification: false,
  },
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: Array.from(
    new Set(['http://localhost:3000', 'https://www.bherila.net', process.env.NEXT_PUBLIC_APP_URL!]),
  ).filter(Boolean),
})
