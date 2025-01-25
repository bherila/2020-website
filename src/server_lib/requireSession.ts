import 'server-only'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { getSession } from './session'

export default async function requireSession(returnUrl?: string) {
  const session = await getSession()
  if (!session?.uid) {
    const headersList = await headers()
    const path = headersList.get('x-pathname') || returnUrl || '/'
    const url = new URL('/auth/sign-in')
    url.searchParams.set('next', path)
    redirect(url.toString())
  }
  return session
}
