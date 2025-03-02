'use server'

import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'

export async function updateAccountClosed(accountId: string, closedDate: Date | null) {
  await requireSession()

  return prisma.finAccounts.update({
    where: { acct_id: Number(accountId) },
    data: {
      when_closed: closedDate,
    },
  })
}
