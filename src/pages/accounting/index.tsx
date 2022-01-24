import { CircularProgress } from '@mui/material'
import AccountingContainer from 'components/accounting/AccountingContainer'
import React from 'react'

export default function Index() {
  if (typeof window === 'undefined') {
    return <CircularProgress />
  }
  return <AccountingContainer>Welcome</AccountingContainer>
}
