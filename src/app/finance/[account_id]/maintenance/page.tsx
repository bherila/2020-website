import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import { Container, Row, Col, Button } from 'react-bootstrap'
import AccountNavigation from '../AccountNavigation'
import MaintenanceClient from './MaintenanceClient'
import { sql } from '@/server_lib/db'
import { revalidatePath } from 'next/cache'
import TransactionsTable from '../TransactionsTable'
import { getLineItemsByAccount } from '@/server_lib/AccountLineItem.server'

export default async function MaintenancePage({ params }: { params: Promise<{ account_id: string }> }) {
  const uid = (await getSession())?.uid
  if (!uid) {
    redirect(AuthRoutes.signIn)
  }

  const _param = await params
  const { account_id } = _param
  const account_name = (
    (await sql`select acct_name from accounts where acct_id = ${account_id} and acct_owner = ${uid}`) as {
      acct_name: string
    }[]
  )[0]?.acct_name
  if (!account_name) {
    throw new Error('account not found')
  }

  async function handleRename(e: React.FormEvent, newName: string) {
    'use server'
    const session = await getSession()
    if (!session?.uid) {
      throw new Error('Unauthorized')
    }

    await sql`
      UPDATE accounts 
      SET acct_name = ${newName} 
      WHERE acct_id = ${account_id} AND acct_owner = ${session.uid}
    `

    revalidatePath(`/finance/${account_id}/maintenance`)
  }

  async function handleDelete() {
    'use server'
    const session = await getSession()
    if (!session?.uid) {
      throw new Error('Unauthorized')
    }

    // First, soft delete all line items for this account
    await sql`
      UPDATE line_items 
      SET when_deleted = NOW() 
      WHERE acct_id = ${account_id} AND acct_owner = ${session.uid}
    `

    // Then, soft delete the account
    await sql`
      UPDATE accounts 
      SET when_deleted = NOW() 
      WHERE acct_id = ${account_id} AND acct_owner = ${session.uid}
    `

    revalidatePath('/finance')
    redirect('/finance')
  }

  const deletedTransactions = await getLineItemsByAccount(parseInt(account_id), true)

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <AccountNavigation accountId={parseInt(account_id)} activeTab="maintenance" accountName={account_name} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>Account Maintenance</h2>
          <MaintenanceClient
            accountId={parseInt(account_id)}
            accountName={account_name}
            handleRename={handleRename}
            handleDelete={handleDelete}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h3>View Deleted Transactions</h3>
          {deletedTransactions.length > 0 ? (
            <div className="mt-3">
              <TransactionsTable data={deletedTransactions} />
            </div>
          ) : (
            <p className="mt-3">No deleted transactions found.</p>
          )}
        </Col>
      </Row>
    </Container>
  )
}
