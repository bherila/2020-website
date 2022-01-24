import AccountingContainer from 'components/accounting/AccountingContainer'
import AccountingTable, {
  TableColDefinition,
} from 'components/accounting/AccountingTable'
import { AccountingDbRow } from 'lib/accounting-row'
import React from 'react'
import { Spinner } from 'reactstrap'

function col(id: keyof AccountingDbRow, label?: string): TableColDefinition {
  return { id, minWidth: 100, label }
}

const columns: TableColDefinition[] = [
  col('t_date'),
  {
    id: 't_type',
    minWidth: 100,
    hide: true,
    importFunc: (row: AccountingDbRow) => {
      row.t_type = 'equity'
    },
  },
  col('t_symbol'),
  col('t_qty'),
  col('t_price'),
  col('t_commission'),
  col('t_fee'),
  col('t_amt'),
  col('t_source'),
  col('t_comment'),
]

export default function Equity() {
  const rows = []
  if (typeof window === 'undefined') {
    return <Spinner />
  }
  return (
    <AccountingContainer>
      <AccountingTable
        rows={rows}
        columns={columns}
        clientRowFilter={(row) => !!row.t_symbol && !row.opt_expiration}
        requestRequireColumns={['t_symbol']}
        clientSort={['t_symbol', 't_date']}
      />
    </AccountingContainer>
  )
}
