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
  row('t_comment'),
]

export default function IO() {
  const rows = []
  return (
    <AccountingContainer>
      <AccountingTable
        clientRowFilter={(row) => !!row.t_fee || row.t_type === 'credit'}
        rows={rows}
        columns={columns}
      />
    </AccountingContainer>
  )
}
