import { CircularProgress } from '@mui/material'
import AccountingContainer from 'components/accounting/AccountingContainer'
import { TableColDefinition } from 'components/accounting/AccountingTable'
import MatcherTable from 'components/accounting/MatcherTable'
import { AccountingDbRow } from 'lib/accounting-row'
import React from 'react'

function row(id: keyof AccountingDbRow, minWidth = 100): TableColDefinition {
  return { id, minWidth }
}

const columns: TableColDefinition[] = [
  row('t_date'),
  row('t_description'),
  row('t_symbol'),
  row('opt_type'),
  row('opt_expiration'),
  row('opt_strike'),
  row('t_comment'),
]

export default function IO() {
  if (typeof window === 'undefined') {
    return <CircularProgress />
  }
  return (
    <AccountingContainer>
      <MatcherTable columns={columns} />
    </AccountingContainer>
  )
}
