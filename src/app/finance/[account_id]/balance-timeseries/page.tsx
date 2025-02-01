import 'server-only'
import AccountNavigation from '../AccountNavigation'
import { z } from 'zod'
import Container from '@/components/container'
import requireSession from '@/server_lib/requireSession'
import { prisma } from '@/server_lib/prisma'
import AccountBalanceHistory from '../AccountBalanceHistory'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import currency from 'currency.js'

export default async function BalanceHistoryPage({ params }: { params: Promise<{ account_id: string }> }) {
  const _param = await params
  const { uid } = await requireSession(`/finance/${_param.account_id}`)
  const account = await prisma.finAccounts.findUnique({
    where: { acct_id: z.coerce.number().parse(_param.account_id), acct_owner: uid },
  })

  if (!account) {
    throw new Error('Account not found')
  }

  const account_id = z.coerce.number().parse(_param.account_id)

  const balances = await prisma.finAccountBalanceSnapshot.findMany({
    where: { acct_id: account_id },
    orderBy: { when_added: 'asc' },
    select: { when_added: true, balance: true },
  })

  const balanceHistory = balances.map((balance, index) => {
    const prev = balances[index - 1]
    return {
      date: balance.when_added,
      balance: currency(balance.balance),
      change: prev ? currency(balance.balance).subtract(prev.balance) : currency(0),
      percentChange: prev
        ? currency(balance.balance).subtract(prev.balance).divide(prev.balance).multiply(100)
        : currency(0),
    }
  })

  return (
    <Container fluid>
      <AccountNavigation accountId={account_id} activeTab="balance-timeseries" accountName={account.acct_name} />
      <AccountBalanceHistory balanceHistory={balances.map((balance) => [balance.when_added.valueOf(), balance.balance])} />
      <Table className="container mx-auto w-[500px]">
        <TableHeader>
          <TableRow>
            <TableCell className="text-right">Date</TableCell>
            <TableCell className="text-right">Balance</TableCell>
            <TableCell className="text-right">Change</TableCell>
            <TableCell className="text-right">% Change</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {balanceHistory.map((row) => (
            <TableRow key={row.date.toISOString()}>
              <TableCell className="text-right">
                {row.date.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell className="text-right">{currency(row.balance).format()}</TableCell>
              <TableCell className="text-right" style={{ color: row.change.value < 0 ? 'red' : undefined }}>
                {row.change.format()}
              </TableCell>
              <TableCell className="text-right" style={{ color: row.percentChange.value < 0 ? 'red' : undefined }}>
                {row.percentChange.toString()}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}
