import AccountingContainer from 'components/accounting/AccountingContainer'
import AccountingTable, {
  TableColDefinition,
} from 'components/accounting/AccountingTable'
import { date2string } from 'components/accounting/formatting'
import React from 'react'

function col(
  id: string,
  minWidth = 100,
  format?: (any) => string,
): TableColDefinition {
  return { id, minWidth, format }
}
const columns: TableColDefinition[] = [
  col('date', 100, date2string),
  col('transaction'),
  col('expiration', 100, date2string),
  col('quantity'),
  col('price'),
  col('commission'),
  col('fees'),
  col('amount'),
  col('comments'),
]

export default function Option() {
  const rows = []
  return (
    <AccountingContainer>
      <AccountingTable rows={rows} columns={columns} />
    </AccountingContainer>
  )
}
