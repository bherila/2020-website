import { Paper, TableContainer } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextColors from 'components/TextColors.module.css'
import currency from 'currency.js'
import { AccountingDbRow } from 'lib/accounting-row'
import _ from 'lodash'
import React, { CSSProperties } from 'react'

import { fetchWrapper } from '../../lib/fetchWrapper'
import { sum } from '../matcher'
import SimpleMuiAlert from '../SimpleMuiAlert'
import { TableColDefinition } from './AccountingTable'

export default function MatcherTable(props: {
  rows?: any[]
  columns: TableColDefinition[]
  requestRequireColumns?: (keyof AccountingDbRow)[]
}) {
  const { rows, columns, requestRequireColumns } = props
  const [dataRows, setDataRows] = React.useState<AccountingDbRow[]>(
    rows ?? null,
  )
  const [newRows, setNewRows] = React.useState<AccountingDbRow[]>([])
  const [error, setError] = React.useState('')
  const [isSaving, setIsSaving] = React.useState(false)
  const [filterValue, setFilterValue] = React.useState<string | number | null>(
    null,
  )

  const reload = React.useCallback(() => {
    const query =
      Array.isArray(requestRequireColumns) && requestRequireColumns.length > 0
        ? 'requestRequireColumns=' +
          encodeURIComponent(requestRequireColumns.join(',').toLowerCase())
        : ''
    fetchWrapper.get('/api/accounting?' + query).then((res) => {
      setDataRows(res.t_data.filter((r) => r && r.t_qty))
      setNewRows([])
    })
  }, [requestRequireColumns])

  React.useEffect(() => reload(), [])

  const groups: Record<string, AccountingDbRow[]> = React.useMemo(() => {
    const groups = {}
    if (!dataRows) return groups
    for (const row of _.sortBy(dataRows.filter(Boolean), (r) => r.t_date)) {
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
        open={typeof error === 'string' && error != ''}
        onClose={() => setError(null)}
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
  const total: currency = sum(rows.map((row) => currency(row.t_amt)))
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
