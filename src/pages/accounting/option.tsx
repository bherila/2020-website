import AccountingContainer from 'components/accounting/AccountingContainer'
import AccountingTable, {
  TableColDefinition,
} from 'components/accounting/AccountingTable'
import { AccountingDbRow } from 'lib/accounting-row'
import moment from 'moment'
import React from 'react'

function col(id: keyof AccountingDbRow, label: string): TableColDefinition {
  return { id, minWidth: 100, label }
}

const columns: TableColDefinition[] = [
  col('t_date', 'date'),
  col('t_type', 'transaction'),
  col('t_description', 'option'),
  col('t_qty', 'quantity'),
  col('t_price', 'price'),
  col('t_commission', 'commission'),
  col('t_fee', 'fees'),
  col('t_amt', 'amount'),
  col('t_comment', 'comments'),
]

export default function Option() {
  return (
    <AccountingContainer>
      <AccountingTable
        columns={columns}
        clientRowFilter={(row) =>
          !!row.t_type &&
          !!row.t_description &&
          !!row.opt_type &&
          !!row.opt_strike &&
          !!row.opt_expiration
        }
        requestRequireColumns={['opt_type', 'opt_strike', 'opt_expiration']}
        groupByField={'t_symbol'}
      />
    </AccountingContainer>
  )
}
