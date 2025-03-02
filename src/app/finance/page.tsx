import 'server-only'
import { Button } from '@/components/ui/button'
import { prisma } from '@/server_lib/prisma'
import AccountGrouping from './AccountGrouping'
import Container from '@/components/container'
import Link from '@/components/link'
import MainTitle from '@/components/main-title'
import NewAccountForm from '@/app/finance/NewAccountForm'
import requireSession from '@/server_lib/requireSession'
import StackedBalanceChartDataPreprocessor from './StackedBalanceChartDataPreprocessor'

export default async function Page() {
  const { uid } = await requireSession()

  // Get accounts
  const accounts = await prisma.finAccounts.findMany({
    where: {
      acct_owner: uid,
      when_deleted: null,
    },
    orderBy: [
      { when_closed: 'asc' }, // Closed accounts will be sorted to the bottom
      { acct_sort_order: 'asc' },
      { acct_name: 'asc' },
    ],
  })

  // Separate accounts into Assets, Liabilities, and Retirement
  const filterAndSortAccounts = (isDebt: boolean, isRetirement: boolean): typeof accounts => {
    return accounts.filter((account) => !account.acct_is_debt === !isDebt && !account.acct_is_retirement === !isRetirement)
  }

  const assetAccounts = filterAndSortAccounts(false, false)
  const liabilityAccounts = filterAndSortAccounts(true, false)
  const retirementAccounts = filterAndSortAccounts(false, true)

  // Prepare chart data (only for active accounts)
  const activeChartAccounts = accounts.filter((account) => !account.when_closed)

  return (
    <Container>
      <div className="flex justify-between items-center">
        <MainTitle>Accounting</MainTitle>
        <Button asChild>
          <Link href="/finance/tags">Manage Tags</Link>
        </Button>
      </div>
      <div className="mb-8">
        <StackedBalanceChartDataPreprocessor accounts={activeChartAccounts} />
      </div>
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="w-full space-y-4">
          <AccountGrouping title="Assets" accounts={assetAccounts} />
          <AccountGrouping title="Liabilities" accounts={liabilityAccounts} />
          <AccountGrouping title="Retirement" accounts={retirementAccounts} />
        </div>
        <NewAccountForm />
      </div>
    </Container>
  )
}
