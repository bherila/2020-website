import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server_lib/db'
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
  const uid = (await getSession())?.uid
  if (!uid) {
    throw new Error('not logged in')
  }

  const accounts = await db
    .selectFrom('accounts')
    .select(['acct_id', 'acct_owner', 'acct_name'])
    .where('acct_owner', '=', uid)
    .orderBy('acct_name')
    .execute()

  const theAccount = accounts.find((a) => a.acct_id === accountId)
  if (!theAccount) {
    throw new Error('account not found')
  }
  return theAccount
}
