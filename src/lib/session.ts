import 'server-only'
import type { IronSessionOptions } from 'iron-session'
import { cookies } from 'next/headers'
import { sealData, unsealData } from 'iron-session'
import { z } from 'zod'

const sessionOptions: IronSessionOptions = {
  password:
    (process.env.VERCEL_ANALYTICS_ID as string) +
    'cryptographically-strong pseudo random number generator',
  cookieName: 'bwh-session',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

const sessionSchema = z.object({
  uid: z.number(),
})

export async function getSession() {
  const cookieStore = cookies()
  const encryptedSession = cookieStore.get(sessionOptions.cookieName)?.value
  const session = encryptedSession
    ? await unsealData(encryptedSession, {
        password: sessionOptions.password,
      })
    : null
  return session == null ? null : sessionSchema.parse(session)
}

export async function encryptSession(
  session: z.infer<typeof sessionSchema>,
): Promise<string> {
  return await sealData(session, { password: sessionOptions.password })
}

export async function saveSession(
  session: z.infer<typeof sessionSchema> | null,
) {
  const cookieStore = cookies()
  if (session == null) {
    cookieStore.delete(sessionOptions.cookieName)
  } else {
    cookieStore.set(sessionOptions.cookieName, await encryptSession(session))
  }
}
