import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import Container from '@/components/container'
import AccountNavigation from '../AccountNavigation'
import { sql } from '@/server_lib/db'

export default async function DuplicatesPage({ params }: { params: Promise<{ account_id: string }> }) {
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

  return (
    <Container fluid>
      <AccountNavigation accountId={parseInt(_param.account_id)} activeTab="duplicates" accountName={account_name} />
      <h2>Duplicate Transactions</h2>
      <p>Coming soon: Tools to identify and manage duplicate transactions.</p>
    </Container>
  )
}
