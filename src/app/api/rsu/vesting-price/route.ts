import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/server_lib/prisma'

export async function POST(request: NextRequest) {
  const { vestDates, symbol } = (await request.json()) as any

  if (!vestDates || !Array.isArray(vestDates) || !symbol) {
    return NextResponse.json({ error: 'vestDates (array) and symbol are required' }, { status: 400 })
  }

  const prices: { [key: string]: number | null } = {}

  for (const vestDate of vestDates) {
    try {
      let stockPrice = await prisma.stockQuotesDaily.findFirst({
        where: {
          c_symb: symbol,
          c_date: {
            lte: new Date(vestDate),
          },
        },
        orderBy: {
          c_date: 'desc',
        },
        select: {
          c_close: true,
        },
      })

      if (!stockPrice) {
        stockPrice = await prisma.stockQuotesDaily.findFirst({
          where: {
            c_symb: symbol,
          },
          orderBy: {
            c_date: 'desc',
          },
          select: {
            c_close: true,
          },
        })
      }

      prices[vestDate] = stockPrice ? parseFloat(stockPrice.c_close.toString()) : null
    } catch (error) {
      console.error(`Error fetching stock price for ${symbol} on ${vestDate}:`, error)
      prices[vestDate] = null
    }
  }

  return NextResponse.json(prices)
}
