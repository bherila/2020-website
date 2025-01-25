import { NextRequest, NextResponse } from 'next/server'
import { AccountLineItemSchema } from '@/lib/AccountLineItem'
import { z } from 'zod'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'

async function validateAccess(accountId: number) {
  const { uid } = await requireSession()

  const account = await prisma.finAccounts.findFirst({
    where: {
      acct_owner: uid,
      acct_id: accountId,
    },
    select: {
      acct_id: true,
      acct_owner: true,
    },
  })

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

    const items = await prisma.finAccountLineItems.findMany({
      where: {
        t_account: accountId,
        when_deleted: includeDeleted ? undefined : null,
      },
      orderBy: {
        t_date: 'desc',
      },
    })

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
      await prisma.finAccountLineItems.createMany({
        data: items,
      })
    } else {
      const item = AccountLineItemSchema.parse(body)
      await prisma.finAccountLineItems.create({
        data: item,
      })
    }

    // Return updated list
    return GET(request, context)
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

    await prisma.finAccountLineItems.update({
      where: { t_id },
      data: { when_deleted: new Date() },
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  }
}
