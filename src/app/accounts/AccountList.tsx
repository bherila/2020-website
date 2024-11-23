'use client'
import { useState, useEffect } from 'react'
import { AccountTableRow } from '@/app/api/account/model'
import Link from 'next/link'
import Table from 'react-bootstrap/Table'
import { fetchWrapper } from '@/lib/fetchWrapper'
import Spinner from 'react-bootstrap/Spinner'

// Do this as soon as the module is loaded so we can reuse it, will this cause problems?
const fp = fetchWrapper.get('/api/account/')

function AccountList() {
  const [accounts, setAccounts] = useState<AccountTableRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fp.then((data) => {
      setAccounts(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Name</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.acct_id}>
              <td>{account.acct_id}</td>
              <td>
                <Link href={`/accounts/${account.acct_id}`}>{account.acct_name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default AccountList
