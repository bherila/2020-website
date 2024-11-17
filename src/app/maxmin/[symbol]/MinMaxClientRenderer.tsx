'use client'
import DataGrid, { Column } from 'devextreme-react/data-grid'
import CheckBox from 'devextreme-react/check-box'
import Form, { Item } from 'devextreme-react/form'
import Button from 'devextreme-react/button'
import React, { useEffect, useState } from 'react'
import currency from 'currency.js'
import AlphaVantageEarnings from '@/lib/AlphaVantageEarnings'
import StockQuote from '@/lib/StockQuote'
import { StockQuoteExtended } from '@/lib/StockQuoteExtended'
import { DetailChart } from '@/app/maxmin/[symbol]/DetailChart'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

interface Props {
  symbol: string
  quotes: StockQuote[]
  earnings: AlphaVantageEarnings
}

export default function MinMaxClientRenderer({ symbol, quotes, earnings }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [onlyNearEarnings, setOnlyNearEarnings] = useState(false)
  const [inputs, setInputs] = useState({
    stockPrice: 0,
    annualizedImpliedVolatilityPercent: 1.3,
    daysToExpiration: 5,
  })
  const [tableData, setTableData] = useState<StockQuote[]>([])
  useEffect(() => {
    setTableData(preprocessData(quotes, earnings, onlyNearEarnings))
  }, [quotes, earnings, onlyNearEarnings])
  const sd1 = inputs.stockPrice * inputs.annualizedImpliedVolatilityPercent * Math.sqrt(inputs.daysToExpiration / 365)
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

  if (!tableData || tableData.length == 0) {
    return <div>No tableData, input data = {quotes?.length}</div>
  }

  return (
    <Container fluid className="py-4">
      <Row>
        <Col xs={12} sm={6}>
          <DataGrid
            dataSource={tableData}
            focusedRowEnabled={true}
            keyExpr="date"
            sorting={{
              showSortIndexes: true,
              mode: 'multiple',
            }}
            focusedRowKey={selectedDate}
            onFocusedRowChanged={(e: any) => {
              if (e.row && e.row.data) {
                setSelectedDate(e.row.data.date)
              }
            }}
          >
            <Column dataField="date" dataType="date" sortIndex={0} sortOrder={'asc'} />
            <Column
              dataField="prevClose"
              dataType="number"
              calculateSortValue={(row: any) => parseFloat(row.prevClose)}
              format="$ #,##0.##"
            />
            <Column
              dataField="open"
              dataType="number"
              calculateSortValue={(row: any) => parseFloat(row.open)}
              format="$ #,##0.##"
            />
            <Column
              dataField="close"
              dataType="number"
              calculateSortValue={(row: any) => parseFloat(row.close)}
              format="$ #,##0.##"
            />
            <Column
              dataField="change"
              dataType="number"
              calculateSortValue={(row: any) => parseFloat(row.change)}
              format="$ #,##0.##"
            />
            <Column
              dataField="pctChg"
              dataType="number"
              calculateSortValue={(row: any) => parseFloat(row.pctChg)}
              format="#0.00%"
            />
            <Column
              dataField="nearEarnings"
              dataType="number"
              calculateSortValue={(row: any) => parseFloat(row.nearEarnings)}
              calculateDisplayValue={(row: any) => (row.nearEarnings === 0 ? '⭐️' : row.nearEarnings)}
            />
          </DataGrid>
          <CheckBox
            value={onlyNearEarnings}
            text="Only show rows near earnings dates"
            onValueChanged={(e: any) => setOnlyNearEarnings(e?.value)}
          />
        </Col>
        <Col item xs={12} sm={6}>
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
            <Button text="Recalculate" type="normal" stylingMode="outlined" useSubmitBehavior={true} />
          </form>
          <DataGrid dataSource={outputs} style={{ paddingTop: '1em' }}>
            <Column dataField="N_SD" dataType="number" format="0.0#" />
            <Column dataField="SD_Value" dataType="number" format="$ #,##0.##" />
            <Column dataField="SD_Percent_Change" dataType="number" format="#0.00%" />
            <Column dataField="Min" dataType="number" format="$ #,##0.##" />
            <Column dataField="Max" dataType="number" format="$ #,##0.##" />
            <Column dataField="Probability" dataType="number" format="#0.00%" />
          </DataGrid>
          {selectedDate && tableData ? (
            <>
              <DetailChart data={tableData} centerDate={selectedDate} symbol={symbol} />
              <Button onClick={() => setSelectedDate('')} text="Clear selected date" />
            </>
          ) : (
            <DetailChart data={tableData} centerDate={selectedDate ?? undefined} symbol={symbol} />
          )}
        </Col>
      </Row>
    </Container>
  )
}

function preprocessData(
  quotesInput: StockQuote[],
  earnings: AlphaVantageEarnings,
  onlyNearEarnings: boolean,
): StockQuoteExtended[] {
  if (!quotesInput || !Array.isArray(quotesInput)) {
    return quotesInput
  }

  // upcast & copy
  let quotes = quotesInput.map((r: StockQuote): StockQuoteExtended => ({ ...r }))

  for (let i = 0; i < quotes.length; ++i) {
    const today = quotes[i]
    const yesterday = i > 0 ? quotes[i - 1] : null
    if (yesterday) {
      today.prevClose = currency(yesterday.close)
      today.change = currency(today.open).subtract(currency(yesterday.close))
      today.pctChg = today.change.divide(yesterday.close)
    }
  }

  // flag rows near earnings dates
  if (earnings && Array.isArray(earnings.quarterlyEarnings)) {
    const c = 5
    const earningsDates = earnings.quarterlyEarnings.map((ed) => ed.reportedDate)
    const allDates = quotes.map((td) => td.date) // index maps into tableData
    for (const earningDate of earningsDates) {
      const tableIndex = allDates.indexOf(earningDate)
      const startIndex = Math.max(0, tableIndex - c)
      const endIndex = Math.min(tableIndex + c + 1, quotes.length - 1)
      for (let i = startIndex; i <= endIndex; ++i) {
        quotes[i].nearEarnings = i - tableIndex
      }
    }
    if (onlyNearEarnings) {
      quotes = quotes.filter((x) => typeof x.nearEarnings === 'number')
    }
  }

  quotes.sort((a: StockQuoteExtended, b: StockQuoteExtended) => {
    const x = a?.pctChg?.value || 0
    const y = b?.pctChg?.value || 0
    return x - y
  })
  return quotes
}
