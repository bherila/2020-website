import 'server-only'
import { cookies, headers } from 'next/headers'
import { sessionSchema, sessionType } from '@/lib/sessionSchema'
import { cache } from 'react'
import auth from './auth'

async function getSession_internal(): Promise<sessionType | null> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return null

  return sessionSchema.parse({
    uid: session.user.id,
    email: session.user.email,
    name: session.user.name,
    userId: session.user.id,
    isVerified: session.user.emailVerified !== null,
  })
}
export const getSession = cache(getSession_internal)
