import React, { useCallback, useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'reactstrap'
import DataGrid, { Column } from 'devextreme-react/data-grid'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import Layout from '../../components/layout'
import _ from 'lodash'
import CurrencyDisplay from '../../components/CurrencyDisplay'
import cn from "classnames";
import textStyle from '../../components/TextColors.module.css'
import currency from 'currency.js'

function sum(values: currency[]): currency {
  return values.reduce((prev, cur) => prev.add(cur), currency(0))
}

type OptionType = 'Call' | 'Put' | '?'
class StockOptionSchema {
  readonly symbol: string
  readonly maturity: moment.Moment
  readonly type: OptionType
  readonly strike: currency

  static readonly Invalid: StockOptionSchema = null
  static readonly TypeMap = new Map<string, OptionType>([
    ['call', 'Call'],
    ['put', 'Put'],
  ])
  static tryParse(description: string): StockOptionSchema | null {
    // AAPL Feb 12 '21 $160 Call
    const expr = /([A-Z]+)\s+([^$]+)(\$[\d.]+) (Call|Put)/i
    const match = description.match(expr)
    if (match) {
      return {
        symbol: match[1],
        maturity: moment(match[2]),
        strike: currency(match[3]),
        type: StockOptionSchema.TypeMap.get(match[4].toLowerCase()) ?? '?'
      }
    } else {
      return StockOptionSchema.Invalid
    }
  }
}

interface EtradeSchema {
  id: string
  TransactionDate: string
  TransactionType: string
  SecurityType: string
  Symbol: string
  Quantity: currency
  Amount: currency
  Price: currency
  Commission: currency
  Description: string
  StockOption: StockOptionSchema | null
}

function parseEtrade(tsv: string): EtradeSchema[] {
  const lines = tsv.split('\n')
  const res = lines
    .map((col) => {
      try {
        const cols = col.split('\t')
        let res: EtradeSchema = {
          id: uuidv4(),
          TransactionDate: moment(cols[0]).format('YYYY-MM-DD'),
          TransactionType: cols[1],
          SecurityType: cols[2],
          Symbol: cols[3],
          Quantity: currency(cols[4] || 0),
          Amount: currency(cols[5] || 0),
          Price: currency(cols[6] || 0),
          Commission: currency(cols[7] || 0),
          Description: cols[8],
          StockOption: StockOptionSchema.tryParse(cols[8]),
        }
        return res
      } catch (err) {
        console.warn(err)
        return null
      }
    })
    .filter(Boolean)
  console.info(res)
  return res
}

function ImportData(props: { onImport: (data: EtradeSchema[]) => void }) {
  const [importContent, setImportContent] = useState('')
  const click = useCallback(() => {
    if (typeof props.onImport === 'function') {
      props.onImport(parseEtrade(importContent))
    }
  }, [importContent])
  return (
    <div>
      <h1>Import</h1>
      <textarea
        value={importContent}
        onChange={(e) => setImportContent(e.currentTarget.value)}
        rows={20}
        wrap="nowrap"
      />
      <button onClick={click}>
        Submit {parseEtrade(importContent).length} items
      </button>
    </div>
  )
}

interface Options {
  showUnitPrice: boolean
  showQty: boolean
}

function NulledTransactions(props: { tableData: EtradeSchema[], options: Options }) {
  const source: EtradeSchema[] = _.orderBy(props.tableData, [
    'TransactionDate',
    'TransactionType',
  ]).filter((r) => !!r.TransactionType)
  const groups: Record<string, EtradeSchema[]> = {}
  const matchedIndexes = new Set<number>()
  for (let i = 0; i < source.length; ++i) {
    if (matchedIndexes.has(i)) continue
    let isMatched = false
    const doMatch = (xOpen: string, xClose: string[]) => {
      if (source[i].TransactionType === xOpen) {
        const group: EtradeSchema[] = [source[i]]
        for (let j = 0; j < source.length; ++j) {
          if (matchedIndexes.has(j)) continue
          if (j == i) continue
          if (
            (xClose.indexOf(source[j].TransactionType) !== -1 ||
              xOpen === source[j].TransactionType) &&
            source[j].Description === source[i].Description
          ) {
            matchedIndexes.add(j)
            group.push(source[j])
          }
        }
        if (group.length > 1) {
          matchedIndexes.add(i)
          groups[source[i].Description] = _.sortBy(group, (x) =>
            moment(x.TransactionDate),
          )
          return true
        }
      }
      return false
    }
    doMatch('Bought To Open', ['Sold To Close', 'Option Expiration']) ||
      doMatch('Sold Short', ['Bought To Cover', 'Option Expiration'])
  }

  const cash: EtradeSchema[] = []
  const unmatched: EtradeSchema[] = []
  for (let i = 0; i < source.length; ++i) {
    if (!matchedIndexes.has(i)) {
      if (
        source[i].Description.match(
          /TFR (?:CASH|MARGIN).*|TRANSFER BAL.*|ACH.*|EXTENDED INSURANCE.*|INWIRE.*|INTEREST.*|CUSTOMER PROMO.*/i,
        )
      ) {
        cash.push(source[i])
      } else {
        unmatched.push(source[i])
      }
    }
  }

  return (
    <Container fluid={true}>
      <Row>
        <Col xs={4}>
          <Table size="xs">
            <tbody style={{ color: '#fff' }}>
              {_.sortBy(Object.entries(groups), (group) => group[0]).map(
                (entry) => {
                  const subTotal = sum(entry[1].map(x => x.Amount))
                  const rowClass = cn(subTotal.value < 0 ? textStyle.redBg : null);
                  const firstEntry = entry[1][0]
                  return (
                    <tr key={entry[0]} className={rowClass}>
                      <td>{entry[0]}{firstEntry.StockOption?.maturity?.format('YYYY-MM-DD')}</td>
                      <td><CurrencyDisplay value={subTotal} digits={2} /></td>
                      <td>
                      <Table size="xs">
                        <tbody style={{ color: '#fff' }}>
                          {entry[1].map((item, j) => {
                            let check = currency(item.Price)
                            check = check.multiply(item.Quantity)
                            check = check.multiply(100)
                            check = check.add(item.Commission)
                            check = check.add(item.Amount)

                            return (
                              <tr key={j} className={rowClass}>
                                <td>{item.TransactionDate}</td>
                                {/*<td>{item.TransactionType}</td>*/}
                                {!props.options?.showQty ? null : <><td>{item.Quantity}</td>
                                <td>
                                  <CurrencyDisplay
                                    digits={4}
                                    value={item.Price}
                                  />
                                </td>
                                <td>
                                  <CurrencyDisplay
                                    digits={4}
                                    value={item.Commission}
                                  />
                                </td>
                                </>}
                                <td>
                                  <CurrencyDisplay
                                    digits={2}
                                    value={item.Amount}
                                  />
                                </td>
                                <td>
                                  {Math.abs(check.value) < 0.01 ? '✅' : <CurrencyDisplay
                                    digits={6}
                                    value={check}
                                    />}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                      </td>
                    </tr>
                  )
                },
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <div>
            Matched {matchedIndexes.size} out of {props.tableData.length} rows
          </div>
          <ol>
            {_.sortBy(Object.entries(groups), (group) => group[0]).map(
              (entry) => {
                return (
                  <li key={entry[0]}>
                    {entry[0]} -- subtotal = $
                    <CurrencyDisplay value={sum(entry[1].map(x => x.Amount))} digits={2} />
                    <ul>
                      {entry[1].map((item, j) => (
                        <li key={j}>
                          {item.TransactionDate} ... {item.TransactionType} ...
                          Qty {item.Quantity} ... <CurrencyDisplay value={item.Amount} digits={2} />
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              },
            )}
          </ol>
        </Col>
        <Col xs={3}>
          Unmatched (working on the logic... TODO: handle expiry), total = $
          <CurrencyDisplay value={sum(unmatched.map(x => x.Amount))} digits={2} />
          <ol>
            {unmatched.map((row, i) => (
              <li key={i}>
                {row.TransactionDate} ... {row.TransactionType}{' '}
                {row.Description} ... $<CurrencyDisplay value={row.Amount} digits={2} />
              </li>
            ))}
          </ol>
        </Col>

        <Col xs={3}>
          Other i.e. cash, bonus, interest, xfers, total = $
          <CurrencyDisplay value={sum(cash.map(x => x.Amount))} digits={2} />
          <ol>
            {cash.map((row, i) => (
              <li key={i}>
                {row.TransactionDate} ... {row.Description} ... $
                <CurrencyDisplay value={row.Amount} digits={2} />
              </li>
            ))}
          </ol>
        </Col>
      </Row>
    </Container>
  )
}

export default function render() {
  const [isImporting, setIsImporting] = useState(false)
  const [tableData, setTableData] = useState<EtradeSchema[]>(null)
  const handleImport = useCallback((loadedData: EtradeSchema[]) => {
    setIsImporting(false)
    setTableData(loadedData)
    saveDataToStorage(loadedData)
  }, [])
  useEffect(() => {
    if (tableData == null) {
      setTableData(loadDataFromStorage() ?? [])
    }
  })
  return (
    <Layout bootstrap hideNav>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <button type="button" onClick={() => setIsImporting(true)}>
              Import
            </button>
            {isImporting && <ImportData onImport={handleImport} />}
            {tableData && (
              <>
                <div>
                  <ul>
                    <li>
                      Net Commission: $<CurrencyDisplay value= {sum(tableData.map((row) => row.Commission))} digits={2} />
                    </li>
                    <li>
                      Net Amount:
                      <CurrencyDisplay value= {sum(tableData.map((row) => row.Amount))} digits={2} />
                    </li>
                  </ul>
                </div>
                <NulledTransactions tableData={tableData} options={{showQty: false, showUnitPrice: false}} />
                <h1>All Transactions</h1>
                <DataGrid
                  dataSource={tableData}
                  keyExpr="id"
                  sorting={{
                    showSortIndexes: true,
                    mode: 'multiple',
                  }}
                >
                  <Column
                    dataField="TransactionDate"
                    dataType="string"
                    alignment="right"
                  />
                  <Column
                    dataField="TransactionType"
                    dataType="string"
                    alignment="right"
                  />
                  <Column
                    dataField="SecurityType"
                    dataType="string"
                    alignment="right"
                  />
                  <Column
                    dataField="Symbol"
                    dataType="string"
                    alignment="right"
                  />
                  <Column
                    dataField="Quantity"
                    dataType="number"
                    alignment="right"
                  />
                  <Column
                    dataField="Amount"
                    dataType="number"
                    alignment="right"
                  />
                  <Column
                    dataField="Price"
                    dataType="number"
                    alignment="right"
                  />
                  <Column
                    dataField="Commission"
                    dataType="number"
                    alignment="right"
                  />
                  <Column
                    dataField="Description"
                    dataType="string"
                    alignment="right"
                  />
                </DataGrid>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

// Helpers -- Saving & Loading data

const STORAGE_KEY = 'etradeData'
function loadDataFromStorage(): EtradeSchema[] {
  return typeof localStorage === 'undefined'
    ? []
    : JSON.parse(localStorage.getItem(STORAGE_KEY))
}
function saveDataToStorage(dataToSave: EtradeSchema[]) {
  if (typeof localStorage === 'undefined') {
    console.error('LocalStorage is undefined!')
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave, null, 2))
  }
}
