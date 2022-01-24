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
  groupByField?: keyof AccountingDbRow
}) {
  const {
    rows,
    columns,
    clientRowFilter,
    groupByField,
    requestRequireColumns,
  } = props
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
      setDataRows(res.t_data.filter(clientRowFilter))
      setNewRows([])
    })
  }, [clientRowFilter, requestRequireColumns])

  React.useEffect(() => reload(), [])

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

  const combinedClientRowFilter = React.useMemo(() => {
    const safeClientRowFilter =
      typeof clientRowFilter === 'function' ? clientRowFilter : Boolean
    if (!filterValue || !groupByField || !clientRowFilter)
      return safeClientRowFilter

    return (row: AccountingDbRow) =>
      row && row[groupByField] === filterValue && safeClientRowFilter(row)
  }, [clientRowFilter, groupByField, filterValue])

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
        <Grid container spacing={2} columns={12}>
          {!newRows.length && (
            <Grid item xs={2}>
              <FilterList
                {...{ clientRowFilter, groupByField, dataRows }}
                onSelect={(x) => setFilterValue(x)}
                selectedItem={filterValue}
              />
            </Grid>
          )}
          <Grid item xs={10}>
            <InternalTable
              {...{ columns, newRows, dataRows }}
              clientRowFilter={combinedClientRowFilter}
              hideInvalid={!!filterValue}
            />
          </Grid>
        </Grid>
      )}
    </>
  )
}

interface FilterListProps {
  clientRowFilter: (row: AccountingDbRow) => boolean
  groupByField?: keyof AccountingDbRow
  dataRows: AccountingDbRow[]
  selectedItem?: string | number | null
  onSelect: (item: string | number | null) => void
}

const filterListItemStyle: CSSProperties = {
  cursor: 'pointer',
  textDecoration: 'underline',
}

function FilterList(props: FilterListProps) {
  const { groupByField, clientRowFilter, dataRows, selectedItem, onSelect } =
    props
  if (!groupByField || !dataRows) {
    return null
  }
  const filterItems = Array.from(
    new Set(dataRows.map((r) => r[groupByField]).filter(Boolean)),
  ).sort()
  return (
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow style={filterListItemStyle} className={TextColors.green}>
          <TableCell
            style={filterListItemStyle}
            className={TextColors.green}
            onClick={() => props.onSelect('')}
          >
            Show all {groupByField}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filterItems.map((x) => (
          <TableRow
            style={filterListItemStyle}
            className={TextColors.green}
            hover
            role="checkbox"
            tabIndex={-1}
            key={x}
            selected={x === props.selectedItem}
            onClick={() => props.onSelect(x)}
          >
            <TableCell className={TextColors.green} style={filterListItemStyle}>
              {x}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function InternalTable({
  columns,
  newRows,
  dataRows,
  clientRowFilter,
  hideInvalid,
}: {
  columns: TableColDefinition[]
  newRows: AccountingDbRow[]
  dataRows: AccountingDbRow[]
  clientRowFilter: (row: AccountingDbRow) => boolean
  hideInvalid: boolean
}) {
  return (
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
          if (!isValid && hideInvalid) {
            return null
          }
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
                    <TableCell key={column.id} align={column.align} style={sty}>
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
  )
}
