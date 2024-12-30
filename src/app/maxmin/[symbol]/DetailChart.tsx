'use client'
import { useState } from 'react'
import { ComposedChart, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts'
import Candlestick from './Candlestick'
import StockQuote from '@/lib/StockQuote'

function asc(a: any, b: any) {
  if (a.date < b.date) {
    return -1
  }
  if (a.date > b.date) {
    return 1
  }
  return 0
}

export function DetailChart(props: { symbol: string; data: StockQuote[]; centerDate?: string }) {
  const { symbol, data, centerDate } = props
  const [n] = useState(21)
  const filterData = centerDate ? centerDataAround(data, centerDate, n) : data.sort(asc).slice(data.length - 30)
  const circa = centerDate ? `circa ${centerDate}` : 'past 30 days'

  const chartData = filterData.map((quote) => ({
    date: quote.date,
    open: parseFloat(quote.open),
    close: parseFloat(quote.close),
    high: parseFloat(quote.max),
    low: parseFloat(quote.min),
  }))

  return (
    <div>
      <h3>
        {symbol} Stock Price {circa}
      </h3>
      <ComposedChart width={800} height={400} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        {chartData.map((entry, index) => (
          <Candlestick
            key={`candle-${index}`}
            x={index * 30}
            y={Math.min(...chartData.map((d) => d.low))}
            width={20}
            height={entry.high - entry.low}
            openClose={[entry.open, entry.close]}
            low={entry.low}
            high={entry.high}
            fill="#8884d8"
          />
        ))}
        {centerDate && <ReferenceLine x={centerDate} stroke="#ff7300" label="⭐️" />}
      </ComposedChart>
    </div>
  )
}

function centerDataAround(data: StockQuote[], date: string, n: number) {
  const a = data
    .filter((x) => x.date < date)
    .sort(desc)
    .slice(0, n)
    .sort(asc)
  const b = data
    .filter((x) => x.date >= date)
    .sort(asc)
    .slice(0, n + 1)
  return [...a, ...b]
}

const desc = (a: any, b: any) => -1 * asc(a, b)
