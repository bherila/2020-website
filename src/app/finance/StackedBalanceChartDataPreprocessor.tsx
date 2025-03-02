import 'server-only'
import { prisma } from '@/server_lib/prisma'
import StackedBalanceChart from './StackedBalanceChart'

export default async function StackedBalanceChartDataPreprocessor({
  accounts,
}: {
  accounts: {
    acct_name: string
    acct_is_retirement: boolean
    acct_is_debt: boolean
    acct_id: number
  }[]
}) {
  // Get balance history for active accounts
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
    <StackedBalanceChart
      data={chartDataArray}
      labels={accounts.map((a) => a.acct_name)}
      isNegative={accounts.map((a) => a.acct_is_debt)}
      isRetirement={accounts.map((a) => a.acct_is_retirement || false)}
    />
  )
}
