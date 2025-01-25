import 'server-only'
import { redirect } from 'next/navigation'
import AccountNavigation from '../AccountNavigation'
import MaintenanceClient from './MaintenanceClient'
import { revalidatePath } from 'next/cache'
import TransactionsTable from '../TransactionsTable'
import { getLineItemsByAccount } from '@/server_lib/AccountLineItem.server'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'

export default async function MaintenancePage({ params }: { params: Promise<{ account_id: string }> }) {
  const session = await requireSession()
  const accountId = (await params).account_id

  const account = await prisma.finAccounts.findUnique({
    where: { acct_id: parseInt(accountId) },
  })

  if (!account) {
    throw new Error('account not found')
  }

  async function handleRename(e: React.FormEvent, newName: string) {
    'use server'
    const session = await requireSession()
    if (!session?.uid) {
      throw new Error('Unauthorized')
    }

    await prisma.finAccounts.update({
      where: { acct_id: parseInt(accountId), acct_owner: session.uid },
      data: { acct_name: newName },
    })

    revalidatePath(`/finance/${accountId}/maintenance`)
  }

  async function handleDelete() {
    'use server'
    const session = await requireSession()

    // Verify the user owns the account
    const account = await prisma.finAccounts.findUnique({
      where: { acct_id: parseInt(accountId), acct_owner: session.uid },
    })
    if (!account) {
      throw new Error('Account not found')
    }

    await prisma.$transaction(async (prisma) => {
      // First, soft delete all line items for this account
      await prisma.finAccountLineItems.updateMany({
        where: { t_account: parseInt(accountId) },
        data: { when_deleted: new Date() },
      })

      // Then, soft delete the account
      await prisma.finAccounts.update({
        where: { acct_id: parseInt(accountId), acct_owner: session.uid },
        data: { when_deleted: new Date() },
      })
    })

    revalidatePath('/finance')
    redirect('/finance')
  }

  return (
    <Container fluid>
      <AccountNavigation accountId={parseInt(accountId)} activeTab="maintenance" accountName={account.acct_name} />
      <Container>
        <MainTitle>Account Maintenance</MainTitle>
        <MaintenanceClient
          accountId={parseInt(accountId)}
          accountName={account.acct_name}
          handleRename={handleRename}
          handleDelete={handleDelete}
        />
        <hr />
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Deleted Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mt-3">No deleted transactions found.</p>
          </CardContent>
        </Card>
      </Container>
    </Container>
  )
}
