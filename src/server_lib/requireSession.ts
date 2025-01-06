import 'server-only'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import AuthRoutes from '@/app/auth/AuthRoutes'
import { getSession } from './session'

export default async function requireSession(returnUrl?: string) {
  const session = await getSession()
  if (!session?.uid) {
    const headersList = await headers()
    const path = headersList.get('x-pathname') || returnUrl || '/'
    const url = AuthRoutes.signIn + '?next=' + encodeURIComponent(path)
    redirect(url)
  }
  return session
}
