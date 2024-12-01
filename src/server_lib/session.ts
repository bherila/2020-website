import 'server-only'
import { cookies } from 'next/headers'
import { sessionSchema } from '@/lib/sessionSchema'
import { cache } from 'react'
import * as jose from 'jose'

const cookieName = 'bwh-session'

// Pad the key to 32 bytes (256 bits)
function padKey(key: string): Uint8Array {
  const encoder = new TextEncoder()
  const originalKey = encoder.encode(key)
  const paddedKey = new Uint8Array(32) // 256 bits = 32 bytes
  paddedKey.fill(0) // Fill with zeros
  paddedKey.set(originalKey.slice(0, 32)) // Use first 32 bytes of original key, or all if shorter
  return paddedKey
}

const secret = padKey(process.env.VERCEL_ANALYTICS_ID || '')

async function getSession_internal() {
  const cookieStore = await cookies()
  const encryptedSession = cookieStore.get(cookieName)?.value
  const session = encryptedSession ? await decryptSession(encryptedSession) : null
  return session == null ? null : sessionSchema.parse(session)
}
export const getSession = cache(getSession_internal)

async function encryptSession(session: string) {
  const jwe = await new jose.EncryptJWT(JSON.parse(JSON.stringify(session)))
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .encrypt(secret)
  return jwe
}

async function decryptSession(encrypted: string) {
  try {
    const { payload } = await jose.jwtDecrypt(encrypted, secret)
    return payload
  } catch (err) {
    console.warn(err)
    return null
  }
}

export async function saveSession(session: any) {
  const cookieStore = await cookies()
  if (session == null) {
    cookieStore.delete(cookieName)
  } else {
    cookieStore.set(cookieName, await encryptSession(session), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  }
}
