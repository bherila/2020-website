import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { AccountTableRow, AccountTableSchema } from '@/app/api/account/model'
import { z } from 'zod'
import { getSession } from '@/lib/session'
export async function GET(request: NextRequest) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json({ error: 'not logged in' }, { status: 403 })
    }
    const rows: AccountTableRow[] = z
      .array(AccountTableSchema)
      .parse(
        await db.query(
          'select acct_id, acct_owner, acct_name from accounts where acct_owner = ? order by acct_name',
          [uid],
        ),
      )
    return NextResponse.json(rows)
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  } finally {
    await db.end()
  }
}
export async function POST(request: NextRequest) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json({ error: 'not logged in' }, { status: 403 })
    }
    const body = await request.json()
    const obj: AccountTableRow = AccountTableSchema.parse(body)
    await db.query(
      `insert into accounts (acct_owner, acct_name)
                    values (?, ?)`,
      [uid, obj.acct_name],
    )
    return await GET(request)
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  } finally {
    await db.end()
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json({ error: 'not logged in' }, { status: 403 })
    }
    const body = await request.json()
    const obj: AccountTableRow = AccountTableSchema.parse(body)
    if (obj.acct_id) {
      await db.query(
        `delete from accounts where acct_owner = ? and acct_id = ?`,
        [uid, obj.acct_id],
      )
    } else if (obj.acct_name) {
      await db.query(
        `delete from accounts where acct_owner = ? and acct_name = ?`,
        [uid, obj.acct_name],
      )
    }
    return await GET(request)
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  } finally {
    await db.end()
  }
}
