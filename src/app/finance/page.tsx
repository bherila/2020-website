import 'server-only'
import { getSession } from '@/server_lib/session'
import { prisma } from '@/server_lib/prisma'
import { revalidatePath } from 'next/cache'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import Container from '@/components/container'
import Link from '@/components/link'
import MainTitle from '@/components/main-title'
import NewAccountForm from '@/app/finance/NewAccountForm'
import requireSession from '@/server_lib/requireSession'
import currency from 'currency.js'
import EditBalanceDisplay from './EditBalanceDisplay'
import { updateBalance } from './finAccount.updateBalance.action'

export default async function Page() {
  const { uid } = await requireSession()
  const accounts = await prisma.finAccounts.findMany({
    where: {
      acct_owner: uid,
      when_deleted: null,
    },
    orderBy: [{ acct_sort_order: 'asc' }, { acct_name: 'asc' }],
  })

  return (
    <Container>
      <MainTitle>Accounting</MainTitle>
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4 sm:space-y-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account Name</TableHead>
              <TableHead className="text-right">Last Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.acct_id}>
                <TableCell>
                  <Link href={`/finance/${account.acct_id}`}>{account.acct_name}</Link>
                </TableCell>
                <TableCell className="flex items-end justify-end">
                  <EditBalanceDisplay
                    acct_id={account.acct_id}
                    defaultBalance={currency(account.acct_last_balance).toString()}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <NewAccountForm />
      </div>
    </Container>
  )
}
