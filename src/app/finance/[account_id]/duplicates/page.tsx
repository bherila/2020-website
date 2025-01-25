import 'server-only'
import Container from '@/components/container'
import AccountNavigation from '../AccountNavigation'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'

export default async function DuplicatesPage({ params }: { params: Promise<{ account_id: string }> }) {
  const session = await requireSession()
  const accountId = (await params).account_id

  const account = await prisma.finAccounts.findUnique({
    where: { acct_id: parseInt(accountId), acct_owner: session.uid },
  })

  if (!account) {
    throw new Error('account not found')
  }

  return (
    <Container fluid>
      <AccountNavigation accountId={parseInt(accountId)} activeTab="duplicates" accountName={account.acct_name} />
      <h2>Duplicate Transactions</h2>
      <p>Coming soon: Tools to identify and manage duplicate transactions.</p>
    </Container>
  )
}
