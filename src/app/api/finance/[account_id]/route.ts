import { prisma } from '@/server_lib/prisma'
import { z } from 'zod'
import requireSession from '@/server_lib/requireSession'

async function getTheAccount(context: { params: Promise<{ account_id: string }> }) {
  const session = await requireSession()
  const uid = session.uid
  const accounts = await prisma.finAccounts.findMany({
    where: { acct_owner: uid },
    orderBy: { acct_name: 'asc' },
    select: {
      acct_id: true,
      acct_owner: true,
      acct_name: true,
    },
  })
  const accountId = z.coerce.number().parse((await context.params).account_id)
  const theAccount = accounts.find((a) => a.acct_id === accountId)
  if (!theAccount) {
    throw new Error('account not found')
  }
  return theAccount
}
