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
import { EditAccountFlags } from './EditAccountFlags'

export default async function MaintenancePage({ params }: { params: Promise<{ account_id: string }> }) {
  await requireSession()
  const accountId = parseInt((await params).account_id, 10)
  const account = await prisma.finAccounts.findUnique({
    where: { acct_id: Number(accountId) },
  })
  if (!account) {
    redirect(`/finance/`)
  }

  return (
    <Container fluid>
      <AccountNavigation accountId={accountId} activeTab="maintenance" accountName={account.acct_name} />
      <Container>
        <MainTitle>Account Maintenance</MainTitle>
        <MaintenanceClient accountId={accountId} accountName={account.acct_name} whenClosed={account.when_closed} />
        <EditAccountFlags
          accountId={accountId.toString()}
          isDebt={account.acct_is_debt}
          isRetirement={account.acct_is_retirement}
        />
        <Card className="shadow-sm mt-8">
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
