'use client'
import { useState } from 'react'
import Chart, {
  Annotation,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Format,
  Label,
  Legend,
  Reduction,
  Series,
  Title,
  Tooltip,
  ValueAxis,
} from 'devextreme-react/chart'
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
const desc = (a: any, b: any) => -1 * asc(a, b)

export function DetailChart(props: { symbol: string; data: StockQuote[]; centerDate?: string }) {
  'use client'
  const { symbol, data, centerDate } = props
  const [n] = useState(21)
  const filterData = centerDate ? centerDataAround(data, centerDate, n) : data.sort(asc).slice(data.length - 30)
  const circa = centerDate ? `circa ${centerDate}` : 'past 30 days'
  return (
    <Chart id="chart" title={`${symbol} Stock Price ${circa}`} dataSource={filterData} width="100%">
      <CommonSeriesSettings argumentField="date" type="candlestick" />
      <Series
        name={symbol}
        openValueField="open"
        highValueField="max"
        lowValueField="min"
        closeValueField="close"
        color="lime"
      >
        <Reduction color="red" />
      </Series>
      <ArgumentAxis workdaysOnly={true}>
        <Label format="shortDate" />
        {/*<ConstantLine value={centerDate}/>*/}
      </ArgumentAxis>
      <ValueAxis>
        <Title text="US dollars" />
        <Label>
          <Format precision={0} type="currency" />
        </Label>
      </ValueAxis>
      <Legend itemTextPosition="left" visible={false} />
      <Export enabled={true} />
      <Tooltip enabled={true} location="edge" />
      {!centerDate ? null : (
        <Annotation
          key="centerDate"
          argument={centerDate}
          value={filterData[Math.floor(filterData.length / 2)].max}
          type="text"
          text="⭐️"
          color="transparent"
          border={{ visible: false }}
        />
      )}
    </Chart>
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
