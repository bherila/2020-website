import 'server-only'
import MainTitle from '@/components/main-title'
import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import NewAccountForm from '@/app/accounts/NewAccountForm'
import AccountList from '@/app/accounts/AccountList'

export default async function Page() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
    return null
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <MainTitle>Accounting</MainTitle>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <p>Which account:</p>
          <AccountList />
        </Col>
        <Col xs={4}>
          New account
          <NewAccountForm />
        </Col>
      </Row>
    </Container>
  )
}
