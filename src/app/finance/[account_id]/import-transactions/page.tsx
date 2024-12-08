import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import ImportTransactionsClient from './ImportTransactionsClient'
import { z } from 'zod'
import { sql } from '@/server_lib/db'

export default async function Page({ params }: { params: Promise<{ account_id: string }> }) {
  const uid = (await getSession())?.uid
  if (!uid) {
    redirect(AuthRoutes.signIn)
  }

  const _param = await params
  const account_name = (
    (await sql`select acct_name from accounts where acct_id = ${_param.account_id} and acct_owner = ${uid}`) as {
      acct_name: string
    }[]
  )[0]?.acct_name
  if (!account_name) {
    throw new Error('account not found')
  }
  const account_id = z.coerce.number().parse((await params).account_id)
  return <ImportTransactionsClient id={account_id} accountName={account_name} />
}
