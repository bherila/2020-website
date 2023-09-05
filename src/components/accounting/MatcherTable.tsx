import { Grid, Table, TableBody, TableCell, TableRow } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import currency from 'currency.js'
import _ from 'lodash'
import React from 'react'

import { AccountingDbRow } from '@/lib/accounting-row'
import { fetchWrapper } from '@/lib/fetchWrapper'

import { sum } from '../matcher'
import SimpleMuiAlert from '../SimpleMuiAlert'
import { TableColDefinition } from './AccountingTable'

export default function MatcherTable(props: {
  rows?: any[]
  requestRequireColumns?: (keyof AccountingDbRow)[]
  columns: TableColDefinition[]
}) {
  const { rows, requestRequireColumns } = props
  const [dataRows, setDataRows] = React.useState<AccountingDbRow[]>(rows ?? [])
  const [error, setError] = React.useState('')

  const reload = React.useCallback(() => {
    const query =
      Array.isArray(requestRequireColumns) && requestRequireColumns.length > 0
        ? 'requestRequireColumns=' +
          encodeURIComponent(requestRequireColumns.join(',').toLowerCase())
        : ''
    fetchWrapper.get('/api/accounting?' + query).then((res: any) => {
      setDataRows(res.t_data.filter((r: any) => r && r.t_qty))
    })
  }, [requestRequireColumns])

  React.useEffect(() => reload(), [])

  const groups: { [key: string]: AccountingDbRow[] } = React.useMemo(() => {
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
      <SimpleMuiAlert
        open={!!error}
        onClose={() => setError('')}
        text={error}
      />
      {!dataRows ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12}>
            <SumDisplay rows={dataRows} />
            <Table>
              <TableBody>
                {Object.entries(groups).map(([symbol, rows]) => (
                  <TableRow key={symbol}>
                    <Summary rows={rows} symbol={symbol} />
                    <TableCell>
                      <Table size="small">
                        {rows.map(
                          (row) =>
                            row && (
                              <TableRow key={row.t_id}>
                                <TableCell
                                  sx={{ width: '120px' }}
                                  align="right"
                                >
                                  {row.t_date}
                                </TableCell>
                                <TableCell
                                  sx={{ width: '180px' }}
                                  align="right"
                                >
                                  {row.t_type}
                                </TableCell>
                                <TableCell
                                  sx={{ width: '300px' }}
                                  align="right"
                                >
                                  {row.t_description || row.t_symbol}
                                </TableCell>
                                <TableCell
                                  sx={{ width: '160px' }}
                                  align="right"
                                >
                                  {row.t_price} &times; {row.t_qty}
                                </TableCell>
                                <TableCell
                                  sx={{ width: '160px' }}
                                  align="right"
                                >
                                  -{row.t_commission} - {row.t_fee}
                                </TableCell>
                                <TableCell
                                  sx={{ width: '120px' }}
                                  align="right"
                                >
                                  {row.t_amt}
                                </TableCell>
                                <TableCell>{row.t_comment}</TableCell>
                              </TableRow>
                            ),
                        )}
                      </Table>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      )}
    </>
  )
}

function SumDisplay({ rows }: { rows: AccountingDbRow[] }) {
  const total: currency = sum(rows.map((row) => currency(row.t_amt ?? 0)))
  return <p>&Sigma; = {total.format({ precision: 4 })}</p>
}

function Summary({
  symbol,
  rows,
}: {
  symbol: string
  rows: AccountingDbRow[]
}) {
  return (
    <TableCell style={{ verticalAlign: 'top' }}>
      <p>{symbol}</p>
      <SumDisplay rows={rows} />
    </TableCell>
  )
}
