import 'server-only'
import MainTitle from '@/components/main-title'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import NewAccountForm from '@/app/finance/NewAccountForm'
import AccountList from '@/app/finance/AccountList'
import { db } from '@/server_lib/db'
import { AccountTableRow } from '../api/finance/model'
import { revalidatePath } from 'next/cache'
import Container from '@/components/container'

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

  await db
    .insertInto('accounts')
    .values({
      acct_owner: uid,
      acct_name: acctName,
    })
    .execute()

  revalidatePath(`/finance`)
}

export default async function Page() {
  const uid = (await getSession())?.uid
  if (!uid) {
    redirect(AuthRoutes.signIn)
  }

  const accounts = await db
    .selectFrom('accounts')
    .select(['acct_id', 'acct_owner', 'acct_name'])
    .where('acct_owner', '=', uid)
    .where('when_deleted', 'is', null)
    .orderBy('acct_name')
    .execute()

  return (
    <Container>
      <MainTitle>Accounting</MainTitle>
      <div className="w-full grid grid-cols-2 gap-4">
        <AccountList accounts={accounts} />
        <NewAccountForm createAccount={createAccount} />
      </div>
    </Container>
  )
}
