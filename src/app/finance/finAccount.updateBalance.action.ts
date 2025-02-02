'use server'
import { getSession } from '@/server_lib/session'
import { prisma } from '@/server_lib/prisma'
import { revalidatePath } from 'next/cache'
import currency from 'currency.js'

export async function updateBalance(acct_id: number, newBalance: string): Promise<void> {
  'use server'
  const acct_owner = (await getSession())?.uid
  if (!acct_owner) {
    throw new Error('User not authenticated')
  }
  if (!newBalance) {
    throw new Error('Balance is required')
  }
  if (newBalance.length > 50) {
    throw new Error('Balance must be less than 50 characters')
  }
  // validate uid owns the account
  const account = await prisma.finAccounts.findUnique({
    where: { acct_id, acct_owner },
  })
  if (!account) {
    throw new Error('Account not found')
  }

  // update balance of the account
  await prisma.finAccounts.update({
    where: { acct_id, acct_owner },
    data: { acct_last_balance: currency(newBalance).value.toString(), acct_last_balance_date: new Date() },
  })

  // add a finAccountBalanceSnapshot
  await prisma.finAccountBalanceSnapshot.create({
    data: {
      acct_id,
      balance: newBalance,
    },
  })

  // revalidate the page
  revalidatePath(`/finance`)
}
