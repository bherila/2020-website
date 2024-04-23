import 'server-only'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import RSUPage from '@/app/rsu/RSUPage'
import { NextPageContext } from 'next'

export default async function Har() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn + '?next=/har/')
    return null
  }
  return <RSUPage />
}
