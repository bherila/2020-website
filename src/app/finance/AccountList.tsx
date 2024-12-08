'use client'
import { AccountTableRow } from '@/app/api/finance/model'
import Link from 'next/link'
import Table from 'react-bootstrap/Table'

function AccountList({ accounts }: { accounts: AccountTableRow[] }) {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: '120px', textAlign: 'right' }}>Account ID</th>
            <th>Account Name</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.acct_id}>
              <td style={{ width: '100px', textAlign: 'right' }}>{account.acct_id}</td>
              <td>
                <Link href={`/finance/${account.acct_id}`}>{account.acct_name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default AccountList
