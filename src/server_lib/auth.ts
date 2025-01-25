import 'server-only'
import { betterAuth, boolean } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './prisma'

const boolType = { type: 'boolean', required: false, defaultValue: false, input: false }

const auth = betterAuth({
  plugins: [nextCookies()],
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

export default auth
