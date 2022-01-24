import { CircularProgress } from '@mui/material'
import AccountingContainer from 'components/accounting/AccountingContainer'
import AccountingTable, {
  TableColDefinition,
} from 'components/accounting/AccountingTable'
import { AccountingDbRow } from 'lib/accounting-row'
import React from 'react'

function row(id: keyof AccountingDbRow, minWidth = 100): TableColDefinition {
  return { id, minWidth }
}

const columns: TableColDefinition[] = [
  row('t_date'),
  row('t_amt'),
  row('t_interest_rate'),
  row('t_from'),
  row('t_to'),
  row('t_comment'),
]

export default function IO() {
  if (typeof window === 'undefined') {
    return <CircularProgress />
  }
  return (
    <AccountingContainer>
      <AccountingTable
        columns={columns}
        clientRowFilter={(row) => {
          return !!(
            row.t_interest_rate != null &&
            row.t_from != 'Invalid date' &&
            row.t_to != 'Invalid date' &&
            row.t_from &&
            row.t_to
          )
        }}
      />
    </AccountingContainer>
  )
}
