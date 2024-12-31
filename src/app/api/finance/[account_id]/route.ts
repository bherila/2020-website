import { NextRequest, NextResponse } from 'next/server'
import db from '@/server_lib/db'
import { AccountTableRow, AccountTableSchema } from '@/app/api/finance/model'
import { z } from 'zod'
import { getSession } from '@/server_lib/session'

export async function GET(request: NextRequest, context: { params: Promise<{ account_id: string }> }) {
  const routeParams = await context.params
  const accountId = z.coerce.number().parse(routeParams.account_id)
  const theAccount = await getTheAccount(accountId)
  return NextResponse.json(theAccount)
}

async function getTheAccount(accountId: number) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      throw new Error('not logged in')
    }
    const accounts: AccountTableRow[] = z
      .array(AccountTableSchema)
      .parse(
        await db.query('select acct_id, acct_owner, acct_name from accounts where acct_owner = ? order by acct_name', [
          uid,
        ]),
      )

    const theAccount = accounts.find((a) => a.acct_id === accountId)
    if (!theAccount) {
      throw new Error('account not found')
    }
    return theAccount
  } finally {
    await db.end()
  }
}
