import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import AccountClient from './Client'
import { Container, Row, Col } from 'react-bootstrap'
import AccountNavigation from './AccountNavigation'
import { z } from 'zod'
import { sql } from '@/server_lib/db'
import { getLineItemsByAccount } from '@/server_lib/AccountLineItem.server'

export default async function AccountIdPage({ params }: { params: Promise<{ account_id: string }> }) {
  const uid = (await getSession())?.uid
  if (!uid) {
    redirect(AuthRoutes.signIn)
  }

  const _param = await params
  const account_name = (
    (await sql`select acct_name from accounts where acct_id = ${_param.account_id} and acct_owner = ${uid}`) as {
      acct_name: string
    }[]
  )[0]?.acct_name
  if (!account_name) {
    throw new Error('account not found')
  }

  const account_id = z.coerce.number().parse((await params).account_id)
  const items = await getLineItemsByAccount(account_id, false)
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          {account_id && <AccountNavigation accountId={account_id} activeTab="transactions" accountName={account_name} />}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <AccountClient id={account_id} rawData={items} />
        </Col>
      </Row>
    </Container>
  )
}
