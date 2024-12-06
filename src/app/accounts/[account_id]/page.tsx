import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import AccountClient from './Client'

export default async function Page({ params }: { params: Promise<{ account_id: string }> }) {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
  }
  return <AccountClient id={(await params).account_id} />
}
