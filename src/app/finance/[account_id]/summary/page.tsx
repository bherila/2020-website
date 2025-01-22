import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import AccountNavigation from '../AccountNavigation'
import { sql } from '@/server_lib/db'
import SummaryClient from './SummaryClient'
import Container from '@/components/container'

export default async function SummaryPage({ params }: { params: Promise<{ account_id: string }> }) {
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

  const [totals] = (await sql`
    SELECT 
      SUM(ABS(t_amt)) as total_volume,
      SUM(t_commission) as total_commission,
      SUM(t_fee) as total_fee
    FROM account_line_items 
    WHERE t_account = ${_param.account_id}
    AND when_deleted IS NULL
  `) as { total_volume: number; total_commission: number; total_fee: number }[]

  const symbolSummary = (await sql`
    SELECT t_symbol, SUM(t_amt) as total_amount
    FROM account_line_items
    WHERE t_account = ${_param.account_id}
    AND when_deleted IS NULL
    AND t_symbol IS NOT NULL
    GROUP BY t_symbol
    ORDER BY (SUM(t_amt)) DESC
  `) as { t_symbol: string; total_amount: number }[]

  const monthSummary = (await sql`
    SELECT 
      DATE_FORMAT(t_date, '%Y-%m') as month,
      SUM(t_amt) as total_amount
    FROM account_line_items
    WHERE t_account = ${_param.account_id}
    AND when_deleted IS NULL
    GROUP BY DATE_FORMAT(t_date, '%Y-%m')
    ORDER BY month DESC
  `) as { month: string; total_amount: number }[]

  return (
    <Container fluid>
      <AccountNavigation accountId={parseInt(_param.account_id)} activeTab="summary" accountName={account_name} />
      <SummaryClient totals={totals} symbolSummary={symbolSummary} monthSummary={monthSummary} />
    </Container>
  )
}
