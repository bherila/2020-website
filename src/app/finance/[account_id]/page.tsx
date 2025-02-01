import 'server-only'
import AccountClient from './Client'
import AccountNavigation from './AccountNavigation'
import { z } from 'zod'
import Container from '@/components/container'
import requireSession from '@/server_lib/requireSession'
import { prisma } from '@/server_lib/prisma'
import { AccountLineItem } from '@/lib/AccountLineItem'
import AccountBalanceHistory from './AccountBalanceHistory'

export default async function AccountIdPage({ params }: { params: Promise<{ account_id: string }> }) {
  const _param = await params
  const { uid } = await requireSession(`/finance/${_param.account_id}`)
  const account = await prisma.finAccounts.findUnique({
    where: { acct_id: z.coerce.number().parse(_param.account_id), acct_owner: uid },
  })

  if (!account) {
    throw new Error('account not found')
  }

  const account_id = z.coerce.number().parse(_param.account_id)
  const items = await prisma.finAccountLineItems.findMany({
    where: { t_account: account_id },
    orderBy: { t_date: 'desc' },
    select: {
      t_id: true,
      t_date: true,
      t_type: true,
      t_schc_category: true,
      t_amt: true,
      t_symbol: true,
      t_qty: true,
      t_price: true,
      t_commission: true,
      t_fee: true,
      t_method: true,
      t_source: true,
      t_origin: true,
      opt_expiration: true,
      opt_type: true,
      opt_strike: true,
      t_description: true,
      t_comment: true,
      t_from: true,
      t_to: true,
      t_interest_rate: true,
      parent_t_id: true,
      t_cusip: true,
    },
  })

  const itemsConverted = items.map((item) => ({
    ...item,
    t_price: item.t_price?.toString(),
    t_amt: item.t_amt?.toString(),
    t_fee: item.t_fee?.toString(),
    t_commission: item.t_commission?.toString(),
    opt_strike: item.opt_strike?.toString(),
  })) as AccountLineItem[]

  // balance of this account over time (snapshots)
  const balances = await prisma.finAccountBalanceSnapshot.findMany({
    where: { acct_id: account_id },
    orderBy: { when_added: 'asc' },
    select: { when_added: true, balance: true },
  })

  return (
    <Container fluid>
      {account_id && <AccountNavigation accountId={account_id} activeTab="transactions" accountName={account.acct_name} />}
      <AccountBalanceHistory balanceHistory={balances.map((balance) => [balance.when_added.valueOf(), balance.balance])} />
      <AccountClient id={account_id} rawData={itemsConverted} />
    </Container>
  )
}
