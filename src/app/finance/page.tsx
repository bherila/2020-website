import 'server-only'
import MainTitle from '@/components/main-title'
import { getSession } from '@/server_lib/session'
import { prisma } from '@/server_lib/prisma'
import NewAccountForm from '@/app/finance/NewAccountForm'
import AccountList from '@/app/finance/AccountList'
import { AccountTableRow } from '../api/finance/model'
import { revalidatePath } from 'next/cache'
import Container from '@/components/container'
import requireSession from '@/server_lib/requireSession'

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
  await prisma.finAccounts.create({
    data: {
      acct_owner: uid,
      acct_name: acctName,
    },
  })
  revalidatePath(`/finance`)
}

export default async function Page() {
  const { uid } = await requireSession()
  const accounts = (await prisma.finAccounts.findMany({
    where: {
      acct_owner: uid,
      when_deleted: null,
    },
    orderBy: { acct_name: 'asc' },
    select: {
      acct_id: true,
      acct_owner: true,
      acct_name: true,
    },
  })) as AccountTableRow[]

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
