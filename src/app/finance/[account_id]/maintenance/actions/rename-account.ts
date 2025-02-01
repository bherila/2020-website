'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'

export async function renameAccount(accountId: string, newName: string) {
  'use server'
  const session = await requireSession()

  if (!session?.uid) {
    throw new Error('Unauthorized')
  }

  await prisma.finAccounts.update({
    where: { acct_id: parseInt(accountId), acct_owner: session.uid },
    data: { acct_name: newName },
  })

  revalidatePath(`/finance/${accountId}/maintenance`)
}
