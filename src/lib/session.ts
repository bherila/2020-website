import 'server-only'
import type { IronSessionOptions } from 'iron-session'
import { cookies } from 'next/headers'
import { sealData, unsealData } from 'iron-session'
import { sessionSchema, sessionType } from '@/lib/sessionSchema'
import { cache } from 'react'

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

async function getSession_internal(): Promise<sessionType | null> {
  const cookieStore = await cookies()
  const encryptedSession = cookieStore.get(sessionOptions.cookieName)?.value
  const session = encryptedSession
    ? await unsealData(encryptedSession, {
        password: sessionOptions.password,
      })
    : null
  return session == null ? null : sessionSchema.parse(session)
}
export const getSession = cache(getSession_internal)

export async function encryptSession(session: sessionType): Promise<string> {
  return await sealData(session, { password: sessionOptions.password })
}

export async function saveSession(session: sessionType | null) {
  const cookieStore = await cookies()
  if (session == null) {
    cookieStore.delete(sessionOptions.cookieName)
  } else {
    cookieStore.set(sessionOptions.cookieName, await encryptSession(session))
  }
}
