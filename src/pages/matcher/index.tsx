import React, { useCallback, useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'reactstrap'
import DataGrid, { Column } from 'devextreme-react/data-grid'
import { v4 as uuidv4 } from 'uuid'
import Layout from '../../components/layout'

interface EtradeSchema {
  id: string
  TransactionDate: string
  TransactionType: string
  SecurityType: string
  Symbol: string
  Quantity: number
  Amount: number
  Price: number
  Commission: number
  Description: string
}

function parseEtrade(tsv: string): EtradeSchema[] {
  const lines = tsv.split('\n')
  return lines.map((col) => {
    const cols = col.split('\t')
    let i = 0
    let res: EtradeSchema = {
      id: uuidv4,
      TransactionDate: cols[i++],
      TransactionType: cols[i++],
      SecurityType: cols[i++],
      Symbol: cols[i++],
      Quantity: parseFloat(cols[i++]),
      Amount: parseFloat(cols[i++]),
      Price: parseFloat(cols[i++]),
      Commission: parseFloat(cols[i++]),
      Description: cols[i++],
    }
    return res
  })
}

function ImportData(props: { onImport: (data: EtradeSchema[]) => void }) {
  const [importContent, setImportContent] = useState('')
  const click = useCallback(() => {
    if (typeof props.onImport === 'function') {
      props.onImport(parseEtrade(importContent))
    }
  }, [])
  return (
    <div>
      <h1>Import</h1>
      <textarea
        value={importContent}
        onChange={(e) => setImportContent(e.currentTarget.value)}
        rows={20}
        wrap="nowrap"
      />
      <button onClick={click}>Submit</button>
    </div>
  )
}

export default function render() {
  const [isImporting, setIsImporting] = useState(false)
  const [tableData, setTableData] = useState<EtradeSchema[]>([])
  const handleImport = useCallback((loadedData: EtradeSchema[]) => {
    setIsImporting(false)
    setTableData(loadedData)
    saveDataToStorage(loadedData)
  }, [])
  useEffect(() => {
    setTableData(loadDataFromStorage() ?? [])
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
            <DataGrid
              dataSource={tableData}
              focusedRowEnabled={true}
              keyExpr="date"
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
              <Column dataField="Symbol" dataType="string" alignment="right" />
              <Column
                dataField="Quantity"
                dataType="number"
                alignment="right"
              />
              <Column dataField="Amount" dataType="number" alignment="right" />
              <Column dataField="Price" dataType="number" alignment="right" />
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
