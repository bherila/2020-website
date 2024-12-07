import 'server-only'
import { headers } from 'next/headers'
import { sessionSchema, sessionType } from '@/lib/sessionSchema'

export default async function getServerSession(): Promise<sessionType> {
  const headersList = await headers()
  const sessionData = headersList.get('x-session-data') || '{}'

  try {
    const parsedSession = JSON.parse(sessionData)
    const validatedSession = sessionSchema.parse(parsedSession)
    return validatedSession
  } catch {
    // Return default session if parsing or validation fails
    return { uid: 0 }
  }
}
