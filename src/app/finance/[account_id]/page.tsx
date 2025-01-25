import 'server-only'
import AccountClient from './Client'
import AccountNavigation from './AccountNavigation'
import { z } from 'zod'
import { getLineItemsByAccount } from '@/server_lib/AccountLineItem.server'
import Container from '@/components/container'
import requireSession from '@/server_lib/requireSession'
import { prisma } from '@/server_lib/prisma'

export default async function AccountIdPage({ params }: { params: Promise<{ account_id: string }> }) {
  const { uid } = await requireSession(`/finance/${(await params).account_id}`)
  const _param = await params
  const account = await prisma.finAccounts.findUnique({
    where: { acct_id: parseInt(_param.account_id), acct_owner: uid },
  })

  if (!account) {
    throw new Error('account not found')
  }

  const account_id = z.coerce.number().parse(_param.account_id)
  const items = await prisma.finAccountLineItems.findMany({
    where: { t_account: account_id },
    orderBy: { t_date: 'desc' },
  })

  return (
    <Container fluid>
      {account_id && <AccountNavigation accountId={account_id} activeTab="transactions" accountName={account.acct_name} />}
      <AccountClient id={account_id} rawData={items} />
    </Container>
  )
}
