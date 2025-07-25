import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/server_lib/prisma'
import { getSession } from '@/server_lib/session'
import { z, ZodError } from 'zod'

export async function POST(req: NextRequest) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json('Unauthorized', { status: 403 })
    }
    const schema = z.array(
      z.object({
        award_id: z.coerce.string(),
        grant_date: z.coerce.string(),
        vest_date: z.coerce.string(),
        share_count: z.coerce.number(),
        symbol: z.coerce.string(),
      }),
    )
    const data = schema.parse(await req.json())
    await prisma.finEquityAwards.createMany({
      data: data.map((row) => ({
        ...row,
        uid,
      })),
    })
    return NextResponse.json(await getRows(uid))
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.message, { status: 400 })
    }
    return NextResponse.json(e, { status: 400 })
  }
}

async function getRows(uid: string) {
  // Get all awards for the user
  const awards = await prisma.finEquityAwards.findMany({
    where: { uid },
    orderBy: [{ vest_date: 'asc' }, { grant_date: 'asc' }],
  })

  // For each award, fetch the vest price
  const awardsWithPrice = await Promise.all(
    awards.map(async (award) => {
      let vestPrice = null
      let grantPrice = null
      try {
        // Vest price (already present)
        const stockPrice = await prisma.stockQuotesDaily.findFirst({
          where: {
            c_symb: award.symbol,
            c_date: {
              lte: new Date(award.vest_date),
            },
          },
          orderBy: {
            c_date: 'desc',
          },
          select: {
            c_close: true,
          },
        })
        if (stockPrice) {
          vestPrice = parseFloat(stockPrice.c_close.toString())
        }
        // Grant price (new)
        const grantStockPrice = await prisma.stockQuotesDaily.findFirst({
          where: {
            c_symb: award.symbol,
            c_date: {
              lte: new Date(award.grant_date),
            },
          },
          orderBy: {
            c_date: 'desc',
          },
          select: {
            c_close: true,
          },
        })
        if (grantStockPrice) {
          grantPrice = parseFloat(grantStockPrice.c_close.toString())
        }
      } catch (e) {
        vestPrice = null
        grantPrice = null
      }
      return { ...award, vest_price: vestPrice, grant_price: grantPrice }
    }),
  )
  return awardsWithPrice
}

export async function GET(req: NextRequest) {
  const uid = (await getSession())?.uid
  if (!uid) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }
  return NextResponse.json(await getRows(uid))
}
