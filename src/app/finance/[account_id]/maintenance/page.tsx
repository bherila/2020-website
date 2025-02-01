import 'server-only'
import AccountNavigation from '../AccountNavigation'
import MaintenanceClient from './MaintenanceClient'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'
import { DeleteAccountSection } from './DeleteAccountSection'
import { redirect } from 'next/navigation'

export default async function MaintenancePage({ params }: { params: Promise<{ account_id: string }> }) {
  await requireSession()
  const accountId = (await params).account_id
  const account = await prisma.finAccounts.findUnique({
    where: { acct_id: parseInt(accountId) },
  })
  if (!account) {
    redirect(`/finance/`)
  }

  return (
    <Container fluid>
      <AccountNavigation accountId={parseInt(accountId)} activeTab="maintenance" accountName={account.acct_name} />
      <Container>
        <MainTitle>Account Maintenance</MainTitle>
        <MaintenanceClient accountId={parseInt(accountId)} accountName={account.acct_name} />
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Deleted Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mt-3">No deleted transactions found.</p>
          </CardContent>
        </Card>
        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Danger Zone</h2>
          <DeleteAccountSection accountId={accountId} />
        </div>
      </Container>
    </Container>
  )
}
