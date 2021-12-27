import cn from 'classnames'
import currency from 'currency.js'
import DataGrid, { Column } from 'devextreme-react/data-grid'
import _ from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Col, Container, Row, Table } from 'reactstrap'

import buttonStyle from '../../components/ButtonStyle.module.css'
import CurrencyDisplay from '../../components/CurrencyDisplay'
import Layout from '../../components/layout'
import {
  EtradeSchema,
  matchAcrossAccounts,
  MatchedTransaction,
  parseEtrade,
  sum,
} from '../../components/matcher'
import textStyle from '../../components/TextColors.module.css'
import moment from 'moment'

const cellStyle = {
  border: 'none', // '1px solid #333'
  minWidth: '100px',
  fontFamily: 'Atkinson Hyperlegible, Arial',
}

const importTypes = ['etrade', 'fidelity', 'ib']
function ImportData(props: { onImport: (data: EtradeSchema[]) => void }) {
  const [importContent, setImportContent] = useState('')
  const [importType, setImportType] = useState(importTypes[0])
  const click = useCallback(() => {
    if (typeof props.onImport === 'function') {
      props.onImport(parseEtrade(importContent))
    }
  }, [importContent])
  return (
    <div style={{ border: '1px solid gray', padding: '1em' }}>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <h1>Import</h1>
            <p>
              type
              <select
                value={importType}
                onChange={(e) => setImportType(e.currentTarget.value)}
              >
                {importTypes.map((x) => (
                  <option value={x}>{x}</option>
                ))}
              </select>
            </p>
            {importType === 'etrade' && (
              <>
                <p>etrade instructions</p>
                <ol>
                  <li>transactions</li>
                  <li>download transactions</li>
                  <li>choose date range i.e. "from" and "to"</li>
                </ol>
                <p>
                  data does not contain pass-through exchange and regulatory
                  fees
                </p>
              </>
            )}
            {importType === 'ib' && (
              <>
                <p>interactive brokers instructions</p>
                <ol>
                  <li>coming soon</li>
                </ol>
              </>
            )}
            {importType === 'fidelity' && (
              <>
                <p>fidelity instructions</p>
                <ol>
                  <li>coming soon</li>
                </ol>
              </>
            )}
            <div>
              <textarea
                className={buttonStyle.toolButton}
                style={{ width: '100%' }}
                value={importContent}
                onChange={(e) => setImportContent(e.currentTarget.value)}
                rows={20}
                wrap="nowrap"
              />
            </div>
            <button onClick={click} className={buttonStyle.toolButton}>
              Submit {parseEtrade(importContent).length} items
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

interface Options {
  showUnitPrice: boolean
  showQty: boolean
}

interface Account {
  accountID: string
  transactions: EtradeSchema[]
  color: string
}

function NulledTransactions(props: {
  options: Options
  accounts: Account[]
  onAddAccount: () => void
  onDelAccount: (key: Account) => void
}) {
  const { accounts } = props
  const [showCash, setShowCash] = useState(false)
  const [showChecks, setShowChecks] = useState(false)
  const res = useMemo(
    () => matchAcrossAccounts(props.accounts),
    [props.accounts],
  )

  const capGains = new Map<number, currency>()
  const fees = new Map<number, currency>()
  Object.values(res.overallResult).forEach((calc) =>
    calc.accountMatches.forEach((accountTransactions) =>
      accountTransactions.forEach((x) => {
        const year = moment(x.TransactionDate).year()
        x.CapGain?.forEach((gain, year) =>
          capGains.set(year, (capGains.get(year) ?? currency(0)).add(gain)),
        )
        fees.set(
          year,
          (fees.get(year) ?? currency(0)).add(x.Commission).add(x.Fee),
        )
      }),
    ),
  )
  const capGainsElements = []
  capGains.forEach((amount, year) =>
    capGainsElements.push(
      <div key={year}>
        {year} realized gain = <CurrencyDisplay value={amount} digits={2} />,
        total fee = <CurrencyDisplay value={fees.get(year) ?? 0} digits={2} />
      </div>,
    ),
  )

  return (
    <Container fluid={true}>
      <Row>
        <Col xs={12}>
          <div style={{ marginBottom: '1em', ...cellStyle }}>
            {capGainsElements}
            <div>
              Total:
              <CurrencyDisplay value={res.grandTotal} digits={4} />
            </div>
          </div>
          <Table size="sm" style={{ width: 'auto' }}>
            <thead>
              <tr>
                <th style={{ marginTop: '0.2em', color: '#fff' }}>
                  Description
                </th>
                {accounts.map((acc) => (
                  <th
                    key={acc.accountID}
                    style={{ marginTop: '0.2em', color: '#fff' }}
                  >
                    <b>{acc.accountID}</b>
                    {' - '}
                    <button
                      onClick={() => props.onDelAccount(acc)}
                      className={buttonStyle.toolButton}
                    >
                      del
                    </button>
                  </th>
                ))}
                <th>
                  <button
                    onClick={() => props.onAddAccount()}
                    className={buttonStyle.toolButton}
                  >
                    new
                  </button>
                </th>
              </tr>
            </thead>
            <tbody style={{ color: '#fff' }}>
              {res.keys.map((key, i) => {
                if (!showCash && key === 'cash') {
                  return null
                }
                const subTotal = res.overallResult[key].total
                const defaultRowClass =
                  subTotal.value < 0 ? textStyle.redBg : null
                return (
                  <tr key={key} className={defaultRowClass}>
                    <td style={{ ...cellStyle, width: '280px' }}>{key}</td>
                    {accounts.map((acc) => {
                      const matches = res.overallResult[key].accountMatches.get(
                        acc.accountID,
                      )
                      const netQty = sum(matches?.map((x) => x.Quantity))
                      return (
                        <td
                          key={acc.accountID}
                          style={{ paddingTop: 0, ...cellStyle }}
                        >
                          {matches ? (
                            <TransactionList
                              transactions={matches}
                              options={props.options}
                              rowClass={cn(defaultRowClass ?? acc.color)}
                              showChecks={showChecks}
                            />
                          ) : (
                            '-'
                          )}
                          {netQty.value == 0 ? null : (
                            <div className={textStyle.orange}>
                              ⚠️ open {netQty.value}
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

function TransactionList({
  rowClass,
  transactions,
  options,
  showChecks,
}: {
  rowClass: string
  transactions: MatchedTransaction[]
  options: Options
  showChecks: boolean
}) {
  const showCapGain = true
  const [cb, setCb] = useState(0)
  return (
    <Table size="sm">
      <tbody>
        {transactions.map((item, j) => {
          let check = currency(item.Price)
          check = check.multiply(item.Quantity)
          check = check.multiply(100)
          check = check.add(item.Commission)
          check = check.add(item.Amount)

          return (
            <tr key={j} className={rowClass}>
              <td style={cellStyle}>{item.TransactionDate}</td>
              {/*<td>{item.TransactionType}</td>*/}
              {!options?.showQty ? null : (
                <>
                  <td align="right" style={{ ...cellStyle, minWidth: '50px' }}>
                    {currency(item.Quantity).value}
                  </td>
                  <td align="right" style={cellStyle}>
                    <CurrencyDisplay digits={4} value={item.Price} />
                  </td>
                  <td align="right" style={cellStyle}>
                    <CurrencyDisplay digits={4} value={item.Commission} />
                  </td>
                </>
              )}
              {showChecks && (
                <td align="right" style={cellStyle}>
                  {Math.abs(check.value) - Math.abs(item.Fee?.value ?? 0) <
                  0.01 ? (
                    ' '
                  ) : (
                    <span
                      onClick={() => {
                        //item.Fee = check.multiply(-1)
                        //setCb(cb + 1)
                      }}
                    >
                      <CurrencyDisplay digits={6} value={check.multiply(-1)} />
                    </span>
                  )}
                </td>
              )}
              <td align="right" style={cellStyle}>
                <CurrencyDisplay digits={2} value={item.Amount} />
              </td>
              {showCapGain &&
                [2020, 2021].map((year) => (
                  <td align="right" style={cellStyle} key={year}>
                    <CurrencyDisplay
                      value={item.CapGain?.get(year) ?? null}
                      digits={2}
                    />
                  </td>
                ))}
              {j === transactions.length - 1 && (
                <td style={{ fontWeight: 'bold', ...cellStyle }} align="right">
                  <CurrencyDisplay
                    value={sum(transactions.map((x) => x.Amount))}
                    digits={2}
                  />
                </td>
              )}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default function render() {
  const [isImporting, setIsImporting] = useState(false)
  const [tableData, setTableData] = useState<Account[]>(null)
  const handleImport = useCallback(
    (loadedData: EtradeSchema[]) => {
      setIsImporting(false)
      const newTableData = [
        {
          accountID: 'deafult',
          color: textStyle.blue,
          transactions: loadedData,
        },
        ...tableData,
      ]
      setTableData(newTableData)
      saveAccountsToStorage(newTableData)
    },
    [tableData],
  )
  useEffect(() => {
    if (tableData == null) {
      setTableData(loadAccountsFromStorage() ?? [])
    }
  })

  const handleDelete = useCallback(
    (toDelete: Account) => {
      setIsImporting(false)
      const newTableData = tableData.filter((td) => td !== toDelete)
      setTableData(newTableData)
      saveAccountsToStorage(newTableData)
    },
    [tableData],
  )

  const sortedAccounts = _.sortBy(tableData, (x) => x.accountID)

  return (
    <Layout bootstrap hideNav>
      <Container fluid>
        <Row>
          <Col xs={12}>
            {isImporting && <ImportData onImport={handleImport} />}
            {tableData && (
              <>
                <NulledTransactions
                  accounts={sortedAccounts}
                  onAddAccount={() => setIsImporting(true)}
                  onDelAccount={handleDelete}
                  options={{ showQty: true, showUnitPrice: true }}
                />
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
function loadAccountsFromStorage(): Account[] {
  const data =
    typeof localStorage === 'undefined'
      ? []
      : JSON.parse(localStorage.getItem(STORAGE_KEY))
  if (!data || !Array.isArray(data)) return []
  if (typeof (data[0] as Account)?.accountID === 'string') {
    data.forEach((account: Account) => rehydrateCurrency(account.transactions))
    return data
  }
  if (typeof (data[0] as EtradeSchema)?.Description === 'string') {
    // migrate from EtradeSchema
    return [
      {
        accountID: 'default',
        color: textStyle.green,
        transactions: rehydrateCurrency(data),
      },
    ]
  } else {
    return []
  }
}

function rehydrateCurrency(rows: EtradeSchema[]) {
  rows.forEach((row) => {
    if (typeof row.Price === 'number') {
      row.Price = currency(row.Price)
    }
    if (typeof row.Quantity === 'number') {
      row.Quantity = currency(row.Quantity)
    }
    if (typeof row.Amount === 'number') {
      row.Amount = currency(row.Amount)
    }
    if (typeof row.Fee === 'number') {
      row.Fee = currency(row.Fee)
    }
    if (typeof row.Commission === 'number') {
      row.Commission = currency(row.Commission)
    }
  })
  return rows
}

function saveAccountsToStorage(dataToSave: Account[]) {
  if (typeof localStorage === 'undefined') {
    console.error('LocalStorage is undefined!')
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave, null, 2))
  }
}
