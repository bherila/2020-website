import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/server_lib/session'
import { AccountLineItem, AccountLineItemSchema } from '@/lib/AccountLineItem'
import { z } from 'zod'
import { db } from '@/server_lib/db'
import {
  getLineItemsByAccount,
  createLineItem,
  bulkCreateLineItems,
  deleteLineItem,
} from '@/server_lib/AccountLineItem.server'

async function validateAccess(accountId: number) {
  const uid = (await getSession())?.uid
  if (!uid) {
    throw new Error('not logged in')
  }

  const account = await db
    .selectFrom('accounts')
    .select(['acct_id', 'acct_owner'])
    .where('acct_owner', '=', uid)
    .where('acct_id', '=', accountId)
    .executeTakeFirst()

  if (!account) {
    throw new Error('account not found or access denied')
  }

  return accountId
}

export async function GET(request: NextRequest, context: { params: Promise<{ account_id: string }> }) {
  try {
    const accountId = z.coerce.number().parse((await context.params).account_id)
    await validateAccess(accountId)
    const url = new URL(request.url)
    const includeDeleted = url.searchParams.get('includeDeleted') === 'true'
    const items = await getLineItemsByAccount(accountId, includeDeleted)
    return NextResponse.json(items)
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ account_id: string }> }) {
  try {
    const accountId = z.coerce.number().parse((await context.params).account_id)
    await validateAccess(accountId)

    const body = await request.json()
    if (Array.isArray(body)) {
      const items = z.array(AccountLineItemSchema).parse(body)
      await bulkCreateLineItems(items)
    } else {
      const item = AccountLineItemSchema.parse(body)
      await createLineItem(item)
    }

    return await GET(request, context)
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ account_id: string }> }) {
  try {
    const accountId = z.coerce.number().parse((await context.params).account_id)
    await validateAccess(accountId)

    const { t_id } = (await request.json()) as any
    if (!t_id) {
      return NextResponse.json({ error: 'Transaction ID is required' }, { status: 400 })
    }

    await deleteLineItem(t_id)
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  }
}
