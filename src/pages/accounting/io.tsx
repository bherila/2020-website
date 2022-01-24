import { CircularProgress } from '@mui/material'
import AccountingContainer from 'components/accounting/AccountingContainer'
import AccountingTable, {
  TableColDefinition,
} from 'components/accounting/AccountingTable'
import { AccountingDbRow } from 'lib/accounting-row'
import React from 'react'

function row(id: keyof AccountingDbRow, label: string): TableColDefinition {
  return { id, minWidth: 100, label }
}

const columns: TableColDefinition[] = [
  row('t_date', 'date'),
  row('t_amt', 'amount'),
  row('t_type', 'type'),
  row('t_method', 'method'),
  row('t_source', 'source account'),
  row('t_origin', 'origin'),
  row('t_comment', 'comment'),
]

export default function IO() {
  if (typeof window === 'undefined') {
    return <CircularProgress />
  }
  return (
    <AccountingContainer>
      <AccountingTable
        columns={columns}
        clientRowFilter={(row) =>
          row.t_method == 'ach' || row.t_method == 'wire'
        }
        requestRequireColumns={['t_source', 't_origin', 't_method']}
      />
    </AccountingContainer>
  )
}
