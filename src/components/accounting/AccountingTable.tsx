import currency from 'currency.js'
import React, { CSSProperties } from 'react'

import { AccountingDbRow } from '@/lib/accounting-row'
import { fetchWrapper } from '@/lib/fetchWrapper'

import ImportTransactionsDialog from './ImportTransactionsDialog'
import Button from '@/components/button'
import Container from '@/components/container'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import SimpleMuiAlert from '@/components/SimpleMuiAlert'
import Table from 'react-bootstrap/Table'
import Typography from '@/components/typography'

export interface TableColDefinition {
  id: keyof AccountingDbRow
  label?: string
  minWidth: number
  align?: 'right'
  format?: (value: any) => string
  importFunc?: (arg: AccountingDbRow) => void
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
  const [dataRows, setDataRows] = React.useState<AccountingDbRow[]>(rows ?? [])
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
      .then(() => reload())
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
              disabled={isSaving}
              variant="outlined"
              onClick={() => saveNewRows(newRows)}
            >
              Save Added Rows
            </Button>
            <Button
              disabled={isSaving}
              variant="outlined"
              onClick={() => setNewRows([])}
            >
              Clear Added Rows
            </Button>
          </>
        )}
        {dataRows && (
          <div style={{ display: 'inline' }}>
            &Sigma; t_amt ={' '}
            {
              dataRows.reduce(
                (a, r) => currency(r?.t_amt ?? 0).add(a),
                currency(0),
              ).value
            }
          </div>
        )}
      </div>
      <SimpleMuiAlert open={!!error} onClose={() => setError('')}>
        {error}
      </SimpleMuiAlert>
      {dataRows == null ? (
        <Spinner />
      ) : (
        <Container>
          {!newRows.length && (
            <Col xs={2}>
              <FilterList
                {...{ clientRowFilter, groupByField, dataRows }}
                onSelect={(x) => setFilterValue(x)}
                selectedItem={filterValue}
              />
            </Col>
          )}
          <Col xs={10}>
            <InternalTable
              {...{ columns, newRows, dataRows }}
              clientRowFilter={combinedClientRowFilter}
              hideInvalid={!!filterValue}
            />
          </Col>
        </Container>
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
  const { groupByField, dataRows } = props
  if (!groupByField || !dataRows) {
    return null
  }
  const filterItems = Array.from(
    new Set(dataRows.map((r) => r[groupByField]).filter(Boolean)),
  ).sort()
  return (
    <Table aria-label="sticky table">
      <th>
        <tr style={filterListItemStyle}>
          <td style={filterListItemStyle} onClick={() => props.onSelect('')}>
            <Typography color={'green'}>Show all {groupByField}</Typography>
          </td>
        </tr>
      </th>
      <tbody>
        {filterItems.map((x) => (
          <tr
            style={filterListItemStyle}
            role="checkbox"
            tabIndex={-1}
            key={x}
            // selected={x === props.selectedItem}
            onClick={() => props.onSelect(x ?? null)}
          >
            <td style={filterListItemStyle}>
              <Typography color={'green'}>{x}</Typography>
            </td>
          </tr>
        ))}
      </tbody>
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
    <Table aria-label="sticky table">
      <thead>
        <tr>
          {columns
            .filter((r) => !r.hide)
            .map((column) => (
              <td
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label ?? column.id}
              </td>
            ))}
        </tr>
      </thead>
      <tbody>
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
            <tr
              role="checkbox"
              tabIndex={-1}
              key={row.t_id}
              // selected={isNew}
            >
              {columns
                .filter((r) => !r.hide)
                .map((column) => {
                  const value = row[column.id]
                  return (
                    <td key={column.id} align={column.align} style={sty}>
                      {column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                    </td>
                  )
                })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
