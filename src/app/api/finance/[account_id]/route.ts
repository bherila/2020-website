import { NextRequest, NextResponse } from 'next/server'
import db from '@/server_lib/db'
import { AccountTableRow, AccountTableSchema } from '@/app/api/finance/model'
import { z } from 'zod'
import { getSession } from '@/server_lib/session'

async function getTheAccount(context: { params: Promise<{ account_id: string }> }) {
  const uid = (await getSession())?.uid
  if (!uid) {
    throw new Error('not logged in')
  }
  const accounts: AccountTableRow[] = z
    .array(AccountTableSchema)
    .parse(
      await db.query('select acct_id, acct_owner, acct_name from accounts where acct_owner = ? order by acct_name', [uid]),
    )
  const accountId = z.coerce.number().parse((await context.params).account_id)
  const theAccount = accounts.find((a) => a.acct_id === accountId)
  if (!theAccount) {
    throw new Error('account not found')
  }
  return theAccount
}
