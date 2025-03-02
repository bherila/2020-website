'use server'

import { z } from 'zod'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'

export async function updateTransactionComment(formData: FormData) {
  const { uid } = await requireSession('/finance')

  const transactionId = z.coerce.number().parse(formData.get('transactionId'))
  const comment = z.string().optional().parse(formData.get('comment'))

  // Verify the transaction belongs to the user
  const transaction = await prisma.finAccountLineItems.findUnique({
    where: {
      t_id: transactionId,
      t_account: {
        in: await prisma.finAccounts
          .findMany({
            where: { acct_owner: uid },
            select: { acct_id: true },
          })
          .then((accounts) => accounts.map((a) => a.acct_id)),
      },
    },
  })

  if (!transaction) {
    throw new Error('Transaction not found or not authorized')
  }

  // Update the transaction comment
  await prisma.finAccountLineItems.update({
    where: { t_id: transactionId },
    data: { t_comment: comment },
  })

  return { success: true }
}
