import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from '../../components/layout'
import DataGrid, { Column } from 'devextreme-react/data-grid'
import { Container, Row, Col } from 'reactstrap'
import CheckBox from 'devextreme-react/check-box'
import Form, { Item } from 'devextreme-react/form'
import Button from 'devextreme-react/button'
import moment from 'moment'
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
import useEarnings, { IEarnings } from '../../hooks/useEarnings'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { createEntrypoints } from 'next/dist/build/entries'

const key = '07HZXPDVA6CKI94B'
const fetcher = (url) => fetch(url).then((r) => r.json())

interface Quote {
  open: number
  close: number
  date: string
  prevClose?: number
  change?: number
  min: number
  max: number
  pctChg?: number
  nearEarnings?: number
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
  centerDate?: string
}) {
  const { symbol, data, centerDate } = props
  const [n] = useState(21)
  const filterData = centerDate
    ? centerDataAround(data, centerDate, n)
    : data.sort(asc).slice(data.length - 30)
  const circa = centerDate ? `circa ${centerDate}` : 'past 30 days'
  return (
    <Chart
      id="chart"
      title={`${symbol} Stock Price ${circa}`}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tableData: Quote[] = []
  let error: any = null
  try {
    if (typeof context.query.symbol === 'string') {
      const symbol = context.query.symbol
      const quoteResponse = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${key}&outputsize=full`
      )
      const quoteData = await quoteResponse.json()
      const ts = quoteData['Time Series (Daily)']
      const dates = Object.keys(ts || {}).sort()
      for (let i = 0; i < dates.length; ++i) {
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
        tableData.push({
          date: dates[i],
          open: parseFloat(ts[dates[i]]['1. open']),
          close: parseFloat(ts[dates[i]]['4. close']),
          max: parseFloat(ts[dates[i]]['2. high']),
          min: parseFloat(ts[dates[i]]['3. low']),
        })
      }
    }
  } catch (err) {
    error = err.toString()
  }
  if (tableData.length === 0) {
    context.res.statusCode = 404
  } else {
    context.res.setHeader(
      'Cache-Control',
      'max-age=60000, public, stale-while-revalidate'
    )
  }
  return {
    props: {
      tableData,
      error: error,
    },
  }
}

export default function MaxMin({
  tableData,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
  let sp = 0
  if (quote.data) {
    try {
      sp = parseFloat(quote.data['Global Quote']['05. price'])
    } catch (err) {
      console.warn(err)
    }
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
        <MaxMinInternal symbol={symbol} stockPrice={sp} tableData={tableData} />
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

function prepareTableData(
  tableData: Quote[],
  earnings: IEarnings[],
  onlyNearEarnings: boolean
) {
  for (let i = 0; i < tableData.length; ++i) {
    const today = tableData[i]
    const yesterday = i > 0 ? tableData[i - 1] : null
    if (yesterday) {
      today.prevClose = yesterday.close
      today.change = today.open - yesterday.close
      today.pctChg = today.change / yesterday.close
    }
  }

  // flag rows near earnings dates
  if (earnings) {
    const c = 5
    const earningsDates = earnings.map((ed) => ed.date)
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
      tableData = tableData.filter((x) => typeof x.nearEarnings === 'number')
    }
  }

  tableData.sort((a, b) => a.pctChg - b.pctChg)
  return tableData
}

function MaxMinInternal(props: {
  symbol: string
  stockPrice: number
  tableData: Quote[]
}) {
  const { symbol, stockPrice } = props
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [onlyNearEarnings, setOnlyNearEarnings] = useState(false)
  const earnings = useEarnings(symbol)
  const [inputs, setInputs] = useState({
    stockPrice,
    annualizedImpliedVolatilityPercent: 1.3,
    daysToExpiration: 5,
  })
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    setTableData(
      prepareTableData([...props.tableData], earnings.data, onlyNearEarnings)
    )
  }, [onlyNearEarnings, earnings.hasEarnings])
  const sd1 =
    inputs.stockPrice *
    inputs.annualizedImpliedVolatilityPercent *
    Math.sqrt(inputs.daysToExpiration / 365)
  const outputs = [
    {
      N_SD: 1,
      SD_Value: sd1,
      SD_Percent_Change: sd1 / inputs.stockPrice,
      Min: inputs.stockPrice - sd1,
      Max: inputs.stockPrice + sd1,
      Probability: 0.682,
    },
    {
      N_SD: 2,
      SD_Value: sd1 * 2,
      SD_Percent_Change: (sd1 * 2) / inputs.stockPrice,
      Min: inputs.stockPrice - sd1 * 2,
      Max: inputs.stockPrice + sd1 * 2,
      Probability: 0.954,
    },
    {
      N_SD: 3,
      SD_Value: sd1 * 3,
      SD_Percent_Change: (sd1 * 3) / inputs.stockPrice,
      Min: inputs.stockPrice - sd1 * 3,
      Max: inputs.stockPrice + sd1 * 3,
      Probability: 0.997,
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
              sorting={{
                showSortIndexes: true,
                mode: 'multiple',
              }}
              focusedRowKey={selectedDate}
              onFocusedRowChanged={(e) => {
                if (e.row && e.row.data) {
                  setSelectedDate(e.row.data.date)
                }
              }}
            >
              <Column
                dataField="date"
                dataType="date"
                sortIndex={0}
                sortOrder={'asc'}
              />
              <Column
                dataField="prevClose"
                dataType="number"
                calculateSortValue={(row) => parseFloat(row.prevClose)}
                format="$ #,##0.##"
              />
              <Column
                dataField="open"
                dataType="number"
                calculateSortValue={(row) => parseFloat(row.open)}
                format="$ #,##0.##"
              />
              <Column
                dataField="close"
                dataType="number"
                calculateSortValue={(row) => parseFloat(row.close)}
                format="$ #,##0.##"
              />
              <Column
                dataField="change"
                dataType="number"
                calculateSortValue={(row) => parseFloat(row.change)}
                format="$ #,##0.##"
              />
              <Column
                dataField="pctChg"
                dataType="number"
                calculateSortValue={(row) => parseFloat(row.pctChg)}
                format="#0.00%"
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
            <DataGrid dataSource={outputs} style={{ paddingTop: '1em' }}>
              <Column dataField="N_SD" dataType="number" format="0.0#" />
              <Column
                dataField="SD_Value"
                dataType="number"
                format="$ #,##0.##"
              />
              <Column
                dataField="SD_Percent_Change"
                dataType="number"
                format="#0.00%"
              />
              <Column dataField="Min" dataType="number" format="$ #,##0.##" />
              <Column dataField="Max" dataType="number" format="$ #,##0.##" />
              <Column
                dataField="Probability"
                dataType="number"
                format="#0.00%"
              />
            </DataGrid>
            {selectedDate && tableData ? (
              <>
                <DetailChart
                  data={tableData}
                  centerDate={selectedDate}
                  symbol={symbol}
                />
                <Button
                  onClick={() => setSelectedDate('')}
                  text="Clear selected date"
                />
              </>
            ) : (
              <DetailChart
                data={tableData}
                centerDate={selectedDate}
                symbol={symbol}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}
