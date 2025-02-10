import { NextRequest, NextResponse } from 'next/server'
import { AccountLineItem, AccountLineItemSchema, AccountLineItemTagSchema } from '@/lib/AccountLineItem'
import { z } from 'zod'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'
import currency from 'currency.js'

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
        when_deleted: includeDeleted ? { not: null } : null,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        t_date: 'desc',
      },
    })

    const itemsConverted = items.map((item) => {
      const r = {
        ...item,
        t_price: item.t_price?.toString(),
        t_amt: item.t_amt?.toString(),
        t_fee: item.t_fee?.toString(),
        t_commission: item.t_commission?.toString(),
        opt_strike: item.opt_strike?.toString(),
        t_harvested_amount: !item.t_harvested_amount ? undefined : item.t_harvested_amount.toString(),
        tags: item.tags.map((tagMap) => ({
          tag_id: tagMap.tag.tag_id,
          tag_userid: tagMap.tag.tag_userid,
          tag_color: tagMap.tag.tag_color,
          tag_label: tagMap.tag.tag_label,
        })),
      } as any
      delete r.when_added
      delete r.when_deleted
      for (const key of Object.keys(r)) {
        if (r[key] == null) {
          delete r[key]
        }
      }
      return r
    })
    return NextResponse.json(itemsConverted)
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ account_id: string }> }) {
  try {
    const accountId = z.coerce.number().parse((await context.params).account_id)
    const { uid } = await requireSession()
    await validateAccess(accountId)

    function enrich(item: z.infer<typeof AccountLineItemSchema>) {
      item.t_account = accountId
      if (item.t_amt) {
        item.t_amt = currency(item.t_amt).toString()
      }
      if (item.t_commission) {
        item.t_commission = currency(item.t_commission).toString()
      }
      if (item.t_fee) {
        item.t_fee = currency(item.t_fee).toString()
      }
      if (item.t_price) {
        item.t_price = currency(item.t_price).toString()
      }
      return item
    }

    const body = await request.json()
    if (Array.isArray(body)) {
      const items = z.array(AccountLineItemSchema).parse(body).map(enrich)

      // Create transactions
      const createdItems = await prisma.finAccountLineItems.createMany({
        data: items,
      })

      // Handle tags if present
      for (const item of items) {
        if (item.tags && item.tags.length > 0) {
          // Create or find tags
          const tagOperations = item.tags.map(async (tag) => {
            // Upsert tag
            const createdTag = await prisma.finAccountTag.upsert({
              where: {
                tag_userid_tag_label: {
                  tag_userid: uid,
                  tag_label: tag.tag_label,
                },
              },
              update: {
                tag_color: tag.tag_color,
              },
              create: {
                tag_userid: uid,
                tag_color: tag.tag_color,
                tag_label: tag.tag_label,
              },
            })

            // Map tag to transaction
            await prisma.finAccountLineItemTagMap.create({
              data: {
                t_id: item.t_id!, // Assuming t_id is auto-generated
                tag_id: createdTag.tag_id,
              },
            })
          })

          await Promise.all(tagOperations)
        }
      }
    } else {
      const item = AccountLineItemSchema.parse(body)
      await prisma.finAccountLineItems.createMany({
        data: [enrich(item)],
      })
    }

    // Return updated list
    return GET(request, context)
  } catch (e) {
    console.error(e, e instanceof Error ? (e as Error).stack : undefined)
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
