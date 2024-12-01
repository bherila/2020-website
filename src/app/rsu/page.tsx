import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import RSUPage from '@/app/rsu/RSUPage'
import { NextPageContext } from 'next'

export default async function RSU() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn + '?next=/rsu/')
    return null
  }
  return <RSUPage />
}
