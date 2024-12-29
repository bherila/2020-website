import 'server-only'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import getServerSession from './getServerSession'
import AuthRoutes from '@/app/auth/AuthRoutes'

export default async function requireSession(returnUrl?: string) {
  const session = await getServerSession()
  if (!session?.uid) {
    const headersList = await headers()
    const path = headersList.get('x-pathname') || returnUrl || '/'
    redirect(AuthRoutes.signIn + `?next=${encodeURIComponent(path)}`)
  }
  return session
}
