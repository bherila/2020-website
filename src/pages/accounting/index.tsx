import AccountingContainer from 'components/accounting/AccountingContainer'
import React from 'react'
import { Spinner } from 'reactstrap'

export default function Index() {
  if (typeof window === 'undefined') {
    return <Spinner />
  }
  return <AccountingContainer>Welcome</AccountingContainer>
}
