import currency from 'currency.js'
import DataGrid, { Column } from 'devextreme-react/data-grid'
import { EtradeSchema } from 'lib/accounting-row'
import _ from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid'

import Layout from '../../components/layout'

function parseEtrade(tsv: string): EtradeSchema[] {
  const lines = tsv.split('\n')
  const res = lines
    .map((col) => {
      try {
        const cols = col.split('\t')
        let i = 0
        const res: EtradeSchema = {
          Comment: '',
          Fee: currency(0),
          StockOption: null,
          id: uuidv4(),
          TransactionDate: moment(cols[i++]).format('YYYY-MM-DD'),
          TransactionType: cols[i++],
          SecurityType: cols[i++],
          Symbol: cols[i++],
          Quantity: currency(cols[i++]),
          Amount: currency(cols[i++]),
          Price: currency(cols[i++]),
          Commission: currency(cols[i++]),
          Description: cols[i++],
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

function NulledTransactions(props: { tableData: EtradeSchema[] }) {
  const source: EtradeSchema[] = _.orderBy(props.tableData, [
    'TransactionDate',
    'TransactionType',
  ]).filter((r) => !!r.TransactionType)
  const groups: Record<string, EtradeSchema[]> = {}
  const matchedIndexes = new Set<number>()
  for (let i = 0; i < source.length; ++i) {
    if (matchedIndexes.has(i)) continue
    const isMatched = false
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
                    {_.sumBy(entry[1], (e) => e.Amount.value).toFixed(2)}
                    <ul>
                      {entry[1].map((item, j) => (
                        <li key={j}>
                          {item.TransactionDate} ... {item.TransactionType} ...
                          Qty {item.Quantity} ... ${item.Amount}
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
          {_.sumBy(unmatched, (e) => e.Amount.value).toFixed(2)}
          <ol>
            {unmatched.map((row) => (
              <li key={row.id}>
                {row.TransactionDate} ... {row.TransactionType}{' '}
                {row.Description} ... ${row.Amount.value.toFixed(2)}
              </li>
            ))}
          </ol>
        </Col>

        <Col xs={3}>
          Other i.e. cash, bonus, interest, xfers, total = $
          {_.sumBy(cash, (e) => e.Amount.value).toFixed(2)}
          <ol>
            {cash.map((row) => (
              <li key={row.id}>
                {row.TransactionDate} ... {row.Description} ... $
                {row.Amount.value.toFixed(2)}
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
                      Net Commission: $
                      {tableData
                        .map((row) => row.Commission)
                        .reduce((a, b) => a.add(b), currency(0))
                        .value.toFixed(2)}
                    </li>
                    <li>
                      Net Amount: $
                      {tableData
                        .map((row) => row.Amount)
                        .reduce((a, b) => a.add(b), currency(0))
                        .value.toFixed(2)}
                    </li>
                  </ul>
                </div>
                <NulledTransactions tableData={tableData} />
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