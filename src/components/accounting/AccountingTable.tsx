import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import currency from 'currency.js'
import { AccountingDbRow } from 'lib/accounting-row'
import React, { CSSProperties } from 'react'

import { fetchWrapper } from '../../lib/fetchWrapper'
import SimpleMuiAlert from '../SimpleMuiAlert'
import ImportTransactionsDialog from './ImportTransactionsDialog'

export interface TableColDefinition {
  id: keyof AccountingDbRow
  label?: string
  minWidth: number
  align?: 'right'
  format?: (value: any) => string
  importFunc?: (AccountingDbRow) => void
  hide?: boolean
}

export default function AccountingTable(props: {
  rows?: any[]
  columns: TableColDefinition[]
  requestRequireColumns?: (keyof AccountingDbRow)[]
  clientRowFilter: (row: AccountingDbRow) => boolean
  clientSort?: (keyof AccountingDbRow)[]
}) {
  const { rows, columns, clientRowFilter } = props
  const [dataRows, setDataRows] = React.useState<AccountingDbRow[]>(
    rows ?? null,
  )
  const [newRows, setNewRows] = React.useState<AccountingDbRow[]>([])
  const [error, setError] = React.useState('')
  const [isSaving, setIsSaving] = React.useState(false)

  const saveNewRows = (rowsToSave: AccountingDbRow[]) => {
    setIsSaving(true)
    fetchWrapper
      .post('/api/accounting', {
        t_data: rowsToSave.filter(clientRowFilter),
      })
      .then((_) => reload())
      .catch((err) => {
        console.error('Fail to save', err, typeof err)
        setError(JSON.stringify(err, null, 2))
      })
      .finally(() => setIsSaving(false))
  }

  function reload() {
    const query =
      Array.isArray(props.requestRequireColumns) &&
      props.requestRequireColumns.length > 0
        ? 'requestRequireColumns=' +
          encodeURIComponent(
            props.requestRequireColumns.join(',').toLowerCase(),
          )
        : ''
    fetchWrapper.get('/api/accounting?' + query).then((res) => {
      setDataRows(res.t_data.filter(clientRowFilter))
      setNewRows([])
    })
  }

  React.useEffect(() => reload(), [])

  return (
    <>
      <div>
        <ImportTransactionsDialog
          onImport={(newRows) => {
            setNewRows(newRows)
          }}
          accountID="0"
          columns={columns}
        />
        {newRows.length > 0 && (
          <>
            <Button
              sx={{ mx: 1 }}
              disabled={isSaving}
              variant="outlined"
              onClick={() => saveNewRows(newRows)}
            >
              Save Added Rows
            </Button>
            <Button
              sx={{ mx: 1 }}
              disabled={isSaving}
              variant="outlined"
              onClick={() => setNewRows([])}
            >
              Clear Added Rows
            </Button>
          </>
        )}
        {dataRows && (
          <Box display="inline">
            &Sigma; t_amt ={' '}
            {
              dataRows.reduce((a, r) => currency(r.t_amt).add(a), currency(0))
                .value
            }
          </Box>
        )}
      </div>
      <SimpleMuiAlert
        open={typeof error === 'string' && error != ''}
        onClose={() => setError(null)}
        text={error}
      />
      {dataRows == null ? (
        <CircularProgress />
      ) : (
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns
                .filter((r) => !r.hide)
                .map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label ?? column.id}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...newRows, ...dataRows].map((row) => {
              const isNew = !row.t_id
              const isValid = clientRowFilter(row)
              const sty: CSSProperties = isValid
                ? {}
                : { textDecoration: 'line-through', color: 'red' }
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.t_id}
                  selected={isNew}
                >
                  {columns
                    .filter((r) => !r.hide)
                    .map((column, colIndex) => {
                      const value = row[column.id]
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={sty}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </>
  )
}
