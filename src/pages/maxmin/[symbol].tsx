import React, { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from '../../components/layout'
import DataGrid, { Column } from 'devextreme-react/data-grid'
import { Container, Row, Col } from 'reactstrap'
import CheckBox from 'devextreme-react/check-box'
import Form, { Item } from 'devextreme-react/form'
import Button from 'devextreme-react/button'
import Chart, {
  CommonSeriesSettings,
  Series,
  Reduction,
  ArgumentAxis,
  Label,
  Format,
  ValueAxis,
  Title,
  Legend,
  Export,
  Tooltip,
  Annotation,
} from 'devextreme-react/chart'
import useEarnings from '../../hooks/useEarnings'

const key = '07HZXPDVA6CKI94B'
const fetcher = (url) => fetch(url).then((r) => r.json())

interface Quote {
  open: number
  close: number
  date: string
  prevClose: number
  change: number
  min: number
  max: number
  percentChange: number
  nearEarnings: number | null
}

function asc(a, b) {
  if (a.date < b.date) {
    return -1
  }
  if (a.date > b.date) {
    return 1
  }
  return 0
}
const desc = (a, b) => -1 * asc(a, b)

function centerDataAround(data: Quote[], date: string, n: number) {
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

function DetailChart(props: {
  symbol: string
  data: Quote[]
  centerDate: string
}) {
  const { symbol, data, centerDate } = props
  const [n] = useState(21)
  const filterData = centerDataAround(data, centerDate, n)
  return (
    <Chart
      id="chart"
      title={`${symbol} Stock Price`}
      dataSource={filterData}
      width="100%"
    >
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
      <Annotation
        key="centerDate"
        argument={centerDate}
        value={filterData[Math.floor(filterData.length / 2)].max}
        type="text"
        text="⭐️"
        color="transparent"
        border={{ visible: false }}
      />
    </Chart>
  )
}

export default function MaxMin() {
  const router = useRouter()
  const symbol = router.query.symbol
  const [skip, setSkip] = useState(false)
  const quote = useSWR(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
    }
  )
  // {
  //   "Global Quote": {
  //   "01. symbol": "IBM",
  //     "02. open": "129.1000",
  //     "03. high": "129.3700",
  //     "04. low": "127.1500",
  //     "05. price": "127.3300",
  //     "06. volume": "4160885",
  //     "07. latest trading day": "2020-07-23",
  //     "08. previous close": "128.6700",
  //     "09. change": "-1.3400",
  //     "10. change percent": "-1.0414%"
  // }
  // }
  let sp = 0
  if (quote.data) {
    sp = parseFloat(quote.data['Global Quote']['05. price'])
  }

  if (!(sp > 0) && !skip) {
    return (
      <Layout bootstrap hideNav>
        <p>Waiting for quote</p>
        <button onClick={(e) => setSkip(true)}>Skip</button>
      </Layout>
    )
  }
  if (typeof symbol === 'string') {
    return (
      <Layout bootstrap hideNav>
        <MaxMinInternal symbol={symbol} stockPrice={sp} />
      </Layout>
    )
  } else {
    return (
      <Layout bootstrap hideNav>
        Loading!
      </Layout>
    )
  }
}

function MaxMinInternal({ symbol, stockPrice }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [onlyNearEarnings, setOnlyNearEarnings] = useState(false)
  const { data, error } = useSWR(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${key}&outputsize=full`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  const earnings = useEarnings(symbol)
  const [inputs, setInputs] = useState({
    stockPrice,
    annualizedImpliedVolatilityPercent: 1.3,
    daysToExpiration: 5,
  })

  if (error || !data || typeof symbol !== 'string') {
    return <>{error}</>
  }
  if (data) {
    const ts = data['Time Series (Daily)']
    if (!ts) {
      return (
        <>
          <p>No data from time series...</p>
        </>
      )
    }
    let tableData: Quote[] = []
    const dates = Object.keys(ts).sort()
    for (let i = 0; i < dates.length; ++i) {
      tableData.push({
        date: dates[i],
        open: parseFloat(ts[dates[i]]['1. open']),
        close: parseFloat(ts[dates[i]]['4. close']),
        max: parseFloat(ts[dates[i]]['2. high']),
        min: parseFloat(ts[dates[i]]['3. low']),
        prevClose: 0,
        change: 0,
        percentChange: 0,
        nearEarnings: null,
      })
      const today = tableData[i]
      const yesterday = i > 0 ? tableData[i - 1] : null
      if (yesterday) {
        today.prevClose = yesterday.close
        today.change = today.open - yesterday.close
        today.percentChange = today.change / yesterday.close
      }
    }

    // flag rows near earnings dates
    if (earnings.data) {
      const c = 5
      const earningsDates = earnings.data.map((ed) => ed.date)
      const allDates = tableData.map((td) => td.date) // index maps into tableData
      for (const earningDate of earningsDates) {
        const tableIndex = allDates.indexOf(earningDate)
        const startIndex = Math.max(0, tableIndex - c)
        const endIndex = Math.min(tableIndex + c + 1, tableData.length - 1)
        for (let i = startIndex; i <= endIndex; ++i) {
          tableData[i].nearEarnings = i - tableIndex
        }
      }
      if (onlyNearEarnings) {
        tableData = tableData.filter((x) => x.nearEarnings !== null)
      }
    }

    tableData.sort((a, b) => a.percentChange - b.percentChange)
    const sd1 =
      inputs.stockPrice *
      inputs.annualizedImpliedVolatilityPercent *
      Math.sqrt(inputs.daysToExpiration / 365)
    const outputs = [
      {
        N_SD: 1,
        SD_Value: sd1,
        Min: inputs.stockPrice - sd1,
        Max: inputs.stockPrice + sd1,
        Probability: 68.2,
      },
      {
        N_SD: 2,
        SD_Value: sd1 * 2,
        Min: inputs.stockPrice - sd1 * 2,
        Max: inputs.stockPrice + sd1 * 2,
        Probability: 95.4,
      },
      {
        N_SD: 3,
        SD_Value: sd1 * 3,
        Min: inputs.stockPrice - sd1 * 3,
        Max: inputs.stockPrice + sd1 * 3,
        Probability: 99.7,
      },
    ]

    return (
      <>
        <Container fluid>
          <Row>
            <Col sm={6}>
              <DataGrid
                dataSource={tableData}
                focusedRowEnabled={true}
                keyExpr="date"
                focusedRowKey={selectedDate}
                onFocusedRowChanged={({ row }) =>
                  setSelectedDate(row?.data?.date)
                }
              >
                <Column dataField="date" dataType="date" />
                <Column
                  dataField="prevClose"
                  dataType="number"
                  calculateSortValue={(row) => parseFloat(row.prevClose)}
                  calculateDisplayValue={(row) =>
                    row.prevClose && row.prevClose.toFixed(2)
                  }
                />
                <Column
                  dataField="open"
                  dataType="number"
                  calculateSortValue={(row) => parseFloat(row.open)}
                  calculateDisplayValue={(row) =>
                    row.open && row.open.toFixed(2)
                  }
                />
                <Column
                  dataField="close"
                  dataType="number"
                  calculateSortValue={(row) => parseFloat(row.close)}
                  calculateDisplayValue={(row) =>
                    row.close && row.close.toFixed(2)
                  }
                />
                <Column
                  dataField="change"
                  dataType="number"
                  calculateSortValue={(row) => parseFloat(row.change)}
                  calculateDisplayValue={(row) =>
                    row.change && row.change.toFixed(2)
                  }
                />
                <Column
                  dataField="percentChange"
                  dataType="number"
                  calculateSortValue={(row) => parseFloat(row.percentChange)}
                  calculateDisplayValue={(row) =>
                    row.percentChange &&
                    (100 * row.percentChange).toFixed(2) + '%'
                  }
                />
                <Column
                  dataField="nearEarnings"
                  dataType="number"
                  calculateSortValue={(row) => parseFloat(row.nearEarnings)}
                  calculateDisplayValue={(row) =>
                    row.nearEarnings === 0 ? '⭐️' : row.nearEarnings
                  }
                />
              </DataGrid>
              <CheckBox
                value={onlyNearEarnings}
                text="Only show rows near earnings dates"
                onValueChanged={({ value }) => setOnlyNearEarnings(value)}
              />
            </Col>
            <Col sm={6}>
              <h3>Inputs</h3>
              <form
                onSubmit={(e) => {
                  setInputs(Object.assign({}, inputs))
                  e.preventDefault()
                }}
              >
                <Form
                  id="form"
                  formData={inputs}
                  readOnly={false}
                  showColonAfterLabel={true}
                  labelLocation={'left'}
                  colCount={1}
                  width={'100%'}
                >
                  <Item dataField="stockPrice" editorType="dxNumberBox" />
                  <Item
                    dataField="annualizedImpliedVolatilityPercent"
                    editorType="dxNumberBox"
                    editorOptions={{
                      format: '#0%',
                    }}
                    title="Annualized Implied Volatility (%)"
                  />
                  <Item dataField="daysToExpiration" editorType="dxNumberBox" />
                </Form>
                <Button
                  text="Recalculate"
                  type="normal"
                  stylingMode="outlined"
                  useSubmitBehavior={true}
                />
              </form>
              <DataGrid dataSource={outputs} style={{ paddingTop: '1em' }} />
              {selectedDate && tableData ? (
                <DetailChart
                  data={tableData}
                  centerDate={selectedDate}
                  symbol={symbol}
                />
              ) : null}
            </Col>
          </Row>
        </Container>
      </>
    )
  }
  return <Layout>Loading...</Layout>
}
