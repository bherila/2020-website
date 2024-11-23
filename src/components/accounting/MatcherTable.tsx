import currency from 'currency.js'
import _ from 'lodash'
import { useState, useCallback, useEffect, useMemo } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import { AccountingDbRow } from '@/lib/accounting-row'
import { fetchWrapper } from '@/lib/fetchWrapper'

import { sum } from '../matcher'
import { TableColDefinition } from './AccountingTable'
import SimpleMuiAlert from '@/components/SimpleMuiAlert'
import Container from '@/components/container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'

export default function MatcherTable(props: {
  rows?: any[]
  requestRequireColumns?: (keyof AccountingDbRow)[]
  columns: TableColDefinition[]
}) {
  const { rows, requestRequireColumns } = props
  const [dataRows, setDataRows] = useState<AccountingDbRow[]>(rows ?? [])
  const [error, setError] = useState('')

  const reload = useCallback(() => {
    const query =
      Array.isArray(requestRequireColumns) && requestRequireColumns.length > 0
        ? 'requestRequireColumns=' + encodeURIComponent(requestRequireColumns.join(',').toLowerCase())
        : ''
    fetchWrapper.get('/api/accounting?' + query).then((res: any) => {
      setDataRows(res.t_data.filter((r: any) => r && r.t_qty))
    })
  }, [requestRequireColumns])

  useEffect(() => reload(), [])

  const groups: { [key: string]: AccountingDbRow[] } = useMemo(() => {
    const groups: { [key: string]: AccountingDbRow[] } = {}
    if (!dataRows) return groups
    for (const row of _.sortBy(dataRows.filter(Boolean), (r) => r.t_date)) {
      if (!row.t_symbol) {
        continue
      }
      if (!groups[row.t_symbol]) {
        groups[row.t_symbol] = []
      }
      groups[row.t_symbol].push(row)
    }
    return groups
  }, [dataRows])

  return (
    <>
      <SimpleMuiAlert open={!!error} onClose={() => setError('')} text={error} />
      {!dataRows ? (
        <Container>
          <Spinner />
        </Container>
      ) : (
        <Container fluid>
          <Row xs={12}>
            <SumDisplay rows={dataRows} />
            <Table>
              <tbody>
                {Object.entries(groups).map(([symbol, rows]) => (
                  <tr key={symbol}>
                    <Summary rows={rows} symbol={symbol} />
                    <td>
                      <Table size="small">
                        {rows.map(
                          (row) =>
                            row && (
                              <tr key={row.t_id}>
                                <td style={{ width: '120px' }} align="right">
                                  {row.t_date}
                                </td>
                                <td style={{ width: '180px' }} align="right">
                                  {row.t_type}
                                </td>
                                <td style={{ width: '300px' }} align="right">
                                  {row.t_description || row.t_symbol}
                                </td>
                                <td style={{ width: '160px' }} align="right">
                                  {row.t_price} &times; {row.t_qty}
                                </td>
                                <td style={{ width: '160px' }} align="right">
                                  -{row.t_commission} - {row.t_fee}
                                </td>
                                <td style={{ width: '120px' }} align="right">
                                  {row.t_amt}
                                </td>
                                <td>{row.t_comment}</td>
                              </tr>
                            ),
                        )}
                      </Table>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Container>
      )}
    </>
  )
}

function SumDisplay({ rows }: { rows: AccountingDbRow[] }) {
  const total: currency = sum(rows.map((row) => currency(row.t_amt ?? 0)))
  return <p>&Sigma; = {total.format({ precision: 4 })}</p>
}

function Summary({ symbol, rows }: { symbol: string; rows: AccountingDbRow[] }) {
  return (
    <td style={{ verticalAlign: 'top' }}>
      <p>{symbol}</p>
      <SumDisplay rows={rows} />
    </td>
  )
}
