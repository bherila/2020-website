import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import ImportTransactionsClient from './ImportTransactionsClient'

export default async function Page({ params }: { params: Promise<{ account_id: string }> }) {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
  }
  return <ImportTransactionsClient id={(await params).account_id} />
}
