import 'server-only'
import AccountClient from './Client'
import AccountNavigation from './AccountNavigation'
import { z } from 'zod'
import Container from '@/components/container'
import requireSession from '@/server_lib/requireSession'
import { prisma } from '@/server_lib/prisma'

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
  return (
    <Container fluid>
      {account_id && <AccountNavigation accountId={account_id} activeTab="transactions" accountName={account.acct_name} />}
      <AccountClient id={account_id} />
    </Container>
  )
}
