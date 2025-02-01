'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'

export async function deleteAccount(accountId: string) {
  'use server'
  const session = await requireSession()

  // Verify the user owns the account
  const account = await prisma.finAccounts.findUnique({
    where: { acct_id: parseInt(accountId), acct_owner: session.uid },
  })
  if (!account) {
    throw new Error('Account not found')
  }

  await prisma.$transaction(async (prisma) => {
    // Soft delete all line items
    await prisma.finAccountLineItems.updateMany({
      where: { t_account: parseInt(accountId) },
      data: { when_deleted: new Date() },
    })

    // Soft delete the account
    await prisma.finAccounts.update({
      where: { acct_id: parseInt(accountId), acct_owner: session.uid },
      data: { when_deleted: new Date() },
    })
  })

  revalidatePath('/finance')
  redirect('/finance')
}
