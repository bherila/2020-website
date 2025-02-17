import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { notFound } from 'next/navigation'
import StockQuote from '@/lib/StockQuote'
import AlphaVantageEarnings from '@/lib/AlphaVantageEarnings'
import { prisma } from '@/server_lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params
  if (symbol == null) {
    return notFound()
  }

  const [quotes, earnings] = await Promise.all([
    genStockQuotesFromAlphaVantage(symbol),
    genEarningsFromAlphaVantage(symbol),
  ])

  if (quotes.length === 0) {
    return notFound()
  }

  return NextResponse.json(
    { quotes, earnings },
    {
      headers: {
        'Cache-Control': 'max-age=86400, public, stale-while-revalidate',
      },
    },
  )
}

async function genEarningsFromAlphaVantage(symbol: string) {
  const earningsResponse = await fetch(
    `https://www.alphavantage.co/query?function=EARNINGS&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`,
  )

  const earningsData: AlphaVantageEarnings = await earningsResponse.json()

  const annualEarningsData = earningsData.annualEarnings?.map((e) => ({
    symbol,
    fiscalDateEnding: new Date(e.fiscalDateEnding),
    reportedEPS: e.reportedEPS ? parseFloat(e.reportedEPS) : null,
  }))

  if (annualEarningsData) {
    await prisma.earningsAnnual.createMany({
      data: annualEarningsData,
      skipDuplicates: true,
    })
  }

  const quarterlyEarningsData = earningsData.quarterlyEarnings?.map((e) => ({
    symbol,
    fiscalDateEnding: new Date(e.fiscalDateEnding),
    reportedDate: e.reportedDate ? new Date(e.reportedDate) : null,
    reportedEPS: e.reportedEPS ? parseFloat(e.reportedEPS) : null,
    estimatedEPS: e.estimatedEPS ? parseFloat(e.estimatedEPS) : null,
    surprise: e.surprise ? parseFloat(e.surprise) : null,
    surprisePercentage: e.surprisePercentage ? parseFloat(e.surprisePercentage) : null,
  }))

  if (quarterlyEarningsData) {
    await prisma.earningsQuarterly.createMany({
      data: quarterlyEarningsData,
      skipDuplicates: true,
    })
  }

  return earningsData
}

async function genStockQuotesFromAlphaVantage(symbol: string) {
  const tableData: StockQuote[] = []
  const quoteResponse = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}&outputsize=full`,
  )
  const quoteData = (await quoteResponse.json()) as any
  const ts = quoteData['Time Series (Daily)']
  const dates = Object.keys(ts || {}).sort()
  const validNumber = /^[0-9.]+$/
  for (let i = 0; i < dates.length; ++i) {
    //   "Global Quote": {
    //   "01. symbol": "IBM",
    //     "02. open": "129.1000",
    //     "03. high": "129.3700",
    //     "04. low": "127.1500",
    //     "05. price": "127.3300",
    //     "06. volume": "4160885",
    // }
    const stockQuote: StockQuote = {
      date: dates[i],
      open: ts[dates[i]]['1. open'],
      close: ts[dates[i]]['4. close'],
      max: ts[dates[i]]['2. high'],
      min: ts[dates[i]]['3. low'],
      volume: ts[dates[i]]['5. volume'],
    }

    // validate
    if (
      !validNumber.test(stockQuote.open) ||
      !validNumber.test(stockQuote.close) ||
      !validNumber.test(stockQuote.max) ||
      !validNumber.test(stockQuote.min) ||
      !validNumber.test(stockQuote.volume)
    ) {
      throw new Error('stockQuote response contained an invalid quote: ' + JSON.stringify(stockQuote))
    }

    tableData.push(stockQuote)
  }

  if (tableData.length > 0) {
    // cache data in mysql for more advanced analysis later
    await prisma.stockQuotesDaily.createMany({
      data: tableData.map((row) => ({
        c_date: new Date(row.date),
        c_symb: symbol,
        c_open: parseFloat(row.open),
        c_high: parseFloat(row.max),
        c_low: parseFloat(row.min),
        c_close: parseFloat(row.close),
        c_vol: BigInt(row.volume),
      })),
      skipDuplicates: true,
    })
  }
  return tableData
}
