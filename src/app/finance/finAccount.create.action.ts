'use server'
import { prisma } from '@/server_lib/prisma'
import { getSession } from '@/server_lib/session'
import { revalidatePath } from 'next/cache'

export async function createAccount(acctName: string): Promise<void> {
  'use server'
  const uid = (await getSession())?.uid
  if (!uid) {
    throw new Error('User not authenticated')
  }
  if (!acctName) {
    throw new Error('Account name is required')
  }
  if (acctName.length > 50) {
    throw new Error('Account name must be less than 50 characters')
  }
  await prisma.finAccounts.create({
    data: {
      acct_owner: uid,
      acct_name: acctName,
    },
  })
  revalidatePath(`/finance`)
}
