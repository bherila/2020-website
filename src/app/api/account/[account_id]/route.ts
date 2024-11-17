import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { AccountSpend, AccountSpendSchema, AccountTableRow, AccountTableSchema } from '@/app/api/account/model'
import { z } from 'zod'
import { getSession } from '@/lib/session'

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
    const rows: AccountSpend[] = await db.query(
      `select *
       from account_spend
       where account_id = ?`,
      [theAccount.acct_id],
    )
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

// export async function DELETE(request: NextRequest) {
//   try {
//     const uid = (await getSession())?.uid
//     if (!uid) {
//       return NextResponse.json({ error: 'not logged in' }, { status: 403 })
//     }
//     const body = await request.json()
//     const obj: AccountTableRow = AccountTableSchema.parse(body)
//     if (obj.acct_id) {
//       await db.query(
//         `delete from accounts where acct_owner = ? and acct_id = ?`,
//         [uid, obj.acct_id],
//       )
//     } else if (obj.acct_name) {
//       await db.query(
//         `delete from accounts where acct_owner = ? and acct_name = ?`,
//         [uid, obj.acct_name],
//       )
//     }
//     return await GET(request)
//   } catch (e) {
//     return NextResponse.json({ error: e?.toString() }, { status: 400 })
//   } finally {
//     await db.end()
//   }
// }
