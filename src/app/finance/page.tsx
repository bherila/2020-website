import 'server-only'
import MainTitle from '@/components/main-title'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import NewAccountForm from '@/app/finance/NewAccountForm'
import AccountList from '@/app/finance/AccountList'
import { sql } from '@/server_lib/db'
import { AccountTableRow } from '../api/finance/model'
import { revalidatePath } from 'next/cache'
import Container from '@/components/container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

async function createAccount(acctName: string): Promise<void> {
  'use server'
  const uid = (await getSession())?.uid
  if (!uid) {
    throw new Error('User not authenticated')
  }
  if (!acctName) {
    throw new Error('Account name is required')
  }
  if (acctName.length > 50) {
    throw new Error('Account name must be less than 50 characters')
  }
  await sql`
    INSERT INTO accounts (acct_owner, acct_name)
    VALUES (${uid}, ${acctName})
  `
  revalidatePath(`/finance`)
}

export default async function Page() {
  const uid = (await getSession())?.uid
  if (!uid) {
    redirect(AuthRoutes.signIn)
  }

  const accounts = (await sql`
    select acct_id, acct_owner, acct_name 
    from accounts 
    where acct_owner = ${uid} and when_deleted is null
    order by acct_name
  `) as AccountTableRow[]

  return (
    <Container>
      <MainTitle>Accounting</MainTitle>
      <div className="w-full grid grid-cols-2 gap-4">
        <div>
          <AccountList accounts={accounts} />
        </div>
        <div>
          <NewAccountForm createAccount={createAccount} />
        </div>
      </div>
    </Container>
  )
}
