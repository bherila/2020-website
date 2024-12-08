import 'server-only'
import MainTitle from '@/components/main-title'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import NewAccountForm from '@/app/finance/NewAccountForm'
import AccountList from '@/app/finance/AccountList'
import db, { sql } from '@/server_lib/db'
import { AccountTableRow } from '../api/finance/model'

export default async function Page() {
  const uid = (await getSession())?.uid
  if (!uid) {
    redirect(AuthRoutes.signIn)
  }

  const accounts = (await sql`
    select acct_id, acct_owner, acct_name 
    from accounts 
    where acct_owner = ${uid} 
    order by acct_name
  `) as AccountTableRow[]

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
          <AccountList accounts={accounts} />
        </Col>
        <Col xs={4}>
          New account
          <NewAccountForm />
        </Col>
      </Row>
    </Container>
  )
}
