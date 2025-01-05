import 'server-only'
import AccountClient from './Client'
import AccountNavigation from './AccountNavigation'
import { z } from 'zod'
import { sql } from '@/server_lib/db'
import { getLineItemsByAccount } from '@/server_lib/AccountLineItem.server'
import requireSession from '@/server_lib/requireSession'
import Container from '@/components/container'

export default async function AccountIdPage({ params }: { params: Promise<{ account_id: string }> }) {
  const session = await requireSession(`/finance/${(await params).account_id}`)
  const uid = session.uid

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
      {account_id && <AccountNavigation accountId={account_id} activeTab="transactions" accountName={account_name} />}
      <AccountClient id={account_id} rawData={items} />
    </Container>
  )
}
