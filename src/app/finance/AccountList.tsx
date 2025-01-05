'use client'
import { AccountTableRow } from '@/app/api/finance/model'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

function AccountList({ accounts }: { accounts: AccountTableRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead style={{ width: '120px', textAlign: 'right' }}>Account ID</TableHead>
          <TableHead>Account Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.acct_id}>
            <TableCell style={{ width: '100px', textAlign: 'right' }}>{account.acct_id}</TableCell>
            <TableCell>
              <Link href={`/finance/${account.acct_id}`}>{account.acct_name}</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AccountList
