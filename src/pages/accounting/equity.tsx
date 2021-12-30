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
  col('transaction_type'),
  col('symbol', 100),
  col('quantity'),
  col('amount'),
  col('price'),
  col('commission'),
  col('description'),
  col('comments'),
]

export default function Equity() {
  const rows = []
  return (
    <AccountingContainer>
      <AccountingTable rows={rows} columns={columns} />
    </AccountingContainer>
  )
}
