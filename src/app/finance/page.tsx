import 'server-only'
import { prisma } from '@/server_lib/prisma'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '@/components/ui/table'
import StackedBalanceChart from '@/components/charts/StackedBalanceChart'
import Container from '@/components/container'
import Link from '@/components/link'
import MainTitle from '@/components/main-title'
import NewAccountForm from '@/app/finance/NewAccountForm'
import requireSession from '@/server_lib/requireSession'
import currency from 'currency.js'
import EditBalanceDisplay from './EditBalanceDisplay'
import { formatDistance } from 'date-fns'
import { Button } from '@/components/ui/button'

export default async function Page() {
  const { uid } = await requireSession()

  // Get accounts
  const accounts = await prisma.finAccounts.findMany({
    where: {
      acct_owner: uid,
      when_deleted: null,
    },
    orderBy: [{ acct_sort_order: 'asc' }, { acct_name: 'asc' }],
  })

  // Separate accounts into Assets, Liabilities, and Retirement
  const assetAccounts = accounts.filter((account) => !account.acct_is_debt && !account.acct_is_retirement)
  const liabilityAccounts = accounts.filter((account) => account.acct_is_debt)
  const retirementAccounts = accounts.filter((account) => account.acct_is_retirement)

  // Calculate totals for each category
  const calculateCategoryTotal = (categoryAccounts: typeof accounts) => {
    return categoryAccounts.reduce((total, account) => {
      return total.add(currency(account.acct_last_balance || 0))
    }, currency(0))
  }

  const assetTotal = calculateCategoryTotal(assetAccounts)
  const liabilityTotal = calculateCategoryTotal(liabilityAccounts)
  const retirementTotal = calculateCategoryTotal(retirementAccounts)

  // Get balance history for all accounts
  const balanceHistory = await prisma.finAccountBalanceSnapshot.findMany({
    where: {
      acct_id: {
        in: accounts.map((a) => a.acct_id),
      },
    },
    orderBy: {
      when_added: 'asc',
    },
  })

  // Group snapshots by quarter and account, keeping only the latest balance per quarter
  const quarterlyBalances = balanceHistory.reduce((acc: { [quarter: string]: { [acct: string]: string } }, snapshot) => {
    const date = snapshot.when_added
    const quarter = `${date.getFullYear()}-Q${Math.floor(date.getMonth() / 3) + 1}`

    if (!acc[quarter]) {
      acc[quarter] = {}
    }

    // Always update the balance since we're iterating in chronological order
    // This ensures we keep the latest balance for each account in the quarter
    acc[quarter][snapshot.acct_id] = snapshot.balance

    return acc
  }, {})

  // Sort quarters chronologically
  const sortedQuarters = Object.keys(quarterlyBalances).sort()

  // Convert to array format needed by chart, carrying forward previous balances
  const chartDataArray = sortedQuarters.map((quarter, index) => {
    const currentBalances = quarterlyBalances[quarter]
    const previousQuarter = index > 0 ? sortedQuarters[index - 1] : null
    const previousBalances = previousQuarter ? quarterlyBalances[previousQuarter] : {}

    return [
      quarter,
      ...accounts.map((account) => {
        // Use current balance if available, otherwise use previous quarter's balance, or '0' if no previous
        const balance = currentBalances[account.acct_id] || previousBalances[account.acct_id] || '0'
        // Negate balance for liability accounts
        return account.acct_is_debt ? `-${balance}` : balance
      }),
    ]
  })

  return (
    <Container>
      <div className="flex justify-between items-center">
        <MainTitle>Accounting</MainTitle>
        <Button asChild>
          <Link href="/finance/tags">Manage Tags</Link>
        </Button>
      </div>
      <div className="mb-8">
        <StackedBalanceChart
          data={chartDataArray}
          labels={accounts.map((a) => a.acct_name)}
          isNegative={accounts.map((a) => a.acct_is_debt)}
          isRetirement={accounts.map((a) => a.acct_is_retirement || false)}
        />
      </div>
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="w-full space-y-4">
          <h2 className="text-xl font-semibold">Assets</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead className="text-right" style={{ textAlign: 'right', width: '150px' }}>
                  Last Balance
                </TableHead>
                <TableHead className="text-right whitespace-nowrap w-0" style={{ width: '150px' }}>
                  Last update
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetAccounts.map((account) => (
                <tr key={account.acct_id}>
                  <td className="px-2">
                    <Link href={`/finance/${account.acct_id}`}>{account.acct_name}</Link>
                  </td>
                  <td className="flex items-end justify-end">
                    <EditBalanceDisplay
                      acct_id={account.acct_id}
                      defaultBalance={currency(account.acct_last_balance).toString()}
                    />
                  </td>
                  <td className="px-2" style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {formatDistance(new Date(), account.acct_last_balance_date ?? new Date())}
                  </td>
                </tr>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <strong>Total Assets</strong>
                </TableCell>
                <TableCell className="text-right">
                  <strong>{assetTotal.format()}</strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <h2 className="text-xl font-semibold mt-8">Liabilities</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead className="text-right" style={{ textAlign: 'right', width: '150px' }}>
                  Last Balance
                </TableHead>
                <TableHead className="text-right whitespace-nowrap w-0" style={{ width: '150px' }}>
                  Last update
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {liabilityAccounts.map((account) => (
                <tr key={account.acct_id}>
                  <td className="px-2">
                    <Link href={`/finance/${account.acct_id}`}>{account.acct_name}</Link>
                  </td>
                  <td className="flex items-end justify-end">
                    <EditBalanceDisplay
                      acct_id={account.acct_id}
                      defaultBalance={currency(account.acct_last_balance).toString()}
                    />
                  </td>
                  <td className="px-2" style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {formatDistance(new Date(), account.acct_last_balance_date ?? new Date())}
                  </td>
                </tr>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <strong>Total Liabilities</strong>
                </TableCell>
                <TableCell className="text-right">
                  <strong>{liabilityTotal.format()}</strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <h2 className="text-xl font-semibold mt-8">Retirement</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead className="text-right" style={{ textAlign: 'right', width: '150px' }}>
                  Last Balance
                </TableHead>
                <TableHead className="text-right whitespace-nowrap w-0" style={{ width: '150px' }}>
                  Last update
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {retirementAccounts.map((account) => (
                <tr key={account.acct_id}>
                  <td className="px-2">
                    <Link href={`/finance/${account.acct_id}`}>{account.acct_name}</Link>
                  </td>
                  <td className="flex items-end justify-end">
                    <EditBalanceDisplay
                      acct_id={account.acct_id}
                      defaultBalance={currency(account.acct_last_balance).toString()}
                    />
                  </td>
                  <td className="px-2" style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {formatDistance(new Date(), account.acct_last_balance_date ?? new Date())}
                  </td>
                </tr>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <strong>Total Retirement</strong>
                </TableCell>
                <TableCell className="text-right">
                  <strong>{retirementTotal.format()}</strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <NewAccountForm />
      </div>
    </Container>
  )
}
