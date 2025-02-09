'use server'
import { prisma } from '@/server_lib/prisma'
import { getSession } from '@/server_lib/session'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const AccountFlagsSchema = z.object({
  isDebt: z.boolean().optional(),
  isRetirement: z.boolean().optional(),
})

export async function updateAccountFlags(accountId: string, flags: z.infer<typeof AccountFlagsSchema>) {
  const session = await getSession()
  if (!session?.uid) {
    throw new Error('User not authenticated')
  }

  AccountFlagsSchema.parse(flags)

  // Verify account ownership
  const account = await prisma.finAccounts.findUnique({
    where: {
      acct_id: Number(accountId),
      acct_owner: session.uid,
    },
  })

  if (!account) {
    throw new Error('Account not found or access denied')
  }

  // Update account flags
  await prisma.finAccounts.update({
    where: { acct_id: parseInt(accountId, 10) },
    data: {
      acct_is_debt: flags.isDebt ?? account.acct_is_debt,
      acct_is_retirement: flags.isRetirement ?? account.acct_is_retirement,
    },
  })

  // Revalidate the maintenance page for this specific account
  revalidatePath(`/finance/${accountId}/maintenance`)
}
