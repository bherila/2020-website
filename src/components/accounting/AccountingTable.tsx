import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'

export interface TableColDefinition {
  id: string
  label?: string
  minWidth: number
  align?: 'right'
  format?: (value: any) => string
}

export default function AccountingTable(props: {
  rows: any[]
  columns: TableColDefinition[]
}) {
  const { rows, columns } = props
  return (
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
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
        {rows.map((row) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
              {columns.map((column) => {
                const value = row[column.id]
                return (
                  <TableCell key={column.id} align={column.align}>
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
