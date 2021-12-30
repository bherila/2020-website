import AccountingContainer from 'components/accounting/AccountingContainer'
import AccountingTable, {
  TableColDefinition,
} from 'components/accounting/AccountingTable'
import React from 'react'

function row(id: string, minWidth = 100): TableColDefinition {
  return { id, minWidth }
}

const columns: TableColDefinition[] = [
  row('date'),
  row('amount'),
  row('type'),
  row('method'),
  row('source account'),
  row('origin'),
  row('comment'),
]

export default function IO() {
  const rows = []
  return (
    <AccountingContainer>
      <AccountingTable rows={rows} columns={columns} />
    </AccountingContainer>
  )
}
