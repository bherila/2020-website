import { NextRequest, NextResponse } from 'next/server'
import db from '@/server_lib/db'
import { AccountSpend, AccountSpendSchema, AccountTableRow, AccountTableSchema } from '@/app/api/finance/model'
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

export async function GET(request: NextRequest, context: { params: Promise<{ account_id: string }> }) {
  try {
    const theAccount = await getTheAccount(context)
    const url = new URL(request.url)
    const includeDeleted = url.searchParams.get('includeDeleted') === 'true'

    const query = includeDeleted
      ? `select * from account_spend where account_id = ? and when_deleted is not null`
      : `select * from account_spend where account_id = ? and when_deleted is null`

    const rows: AccountSpend[] = await db.query(query, [theAccount.acct_id])
    return NextResponse.json(rows)
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  } finally {
    await db.end()
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ account_id: string }> }) {
  try {
    const parsed: AccountSpend[] = z.array(AccountSpendSchema).parse(await request.json())
    const theAccount = await getTheAccount(context)
    const rows: any[][] = parsed.map((row: AccountSpend) => [
      theAccount.acct_id,
      row.spend_date,
      row.spend_category,
      row.spend_description,
      row.spend_amount,
      row.is_business,
      row.transaction_type,
      row.notes,
    ])
    await db.query(
      `insert into account_spend (account_id, spend_date, spend_category,
                                  spend_description, spend_amount, is_business,
                                  transaction_type, notes)
       values ?`,
      [rows],
    )
    return await GET(request, context)
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  } finally {
    await db.end()
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ account_id: string }> }) {
  try {
    const theAccount = await getTheAccount(context)
    const { spend_id } = await request.json()

    if (!spend_id) {
      return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 })
    }

    await db.query(
      `update account_spend 
       set when_deleted = NOW() 
       where spend_id = ? and account_id = ? and when_deleted is null`,
      [spend_id, theAccount.acct_id],
    )

    return NextResponse.json({ success: true, message: 'Transaction marked as deleted' })
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  } finally {
    await db.end()
  }
}
