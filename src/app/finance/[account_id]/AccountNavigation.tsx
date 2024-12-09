'use client'
import Nav from 'react-bootstrap/Nav'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

export default function AccountNavigation({
  accountId,
  accountName,
  activeTab = 'transactions',
}: {
  accountId: number
  accountName: string
  activeTab?: 'transactions' | 'import' | 'duplicates' | 'summary' | 'maintenance'
}) {
  return (
    <div className="mt-4">
      <Breadcrumb>
        <Breadcrumb.Item href="/finance">Accounts</Breadcrumb.Item>
        <Breadcrumb.Item active>
          Account {accountId} - {accountName ?? 'no name'}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link href={`/finance/${accountId}`} active={activeTab === 'transactions'}>
            Transactions
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`/finance/${accountId}/import-transactions`} active={activeTab === 'import'}>
            Import
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`/finance/${accountId}/duplicates`} active={activeTab === 'duplicates'}>
            Duplicates
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`/finance/${accountId}/summary`} active={activeTab === 'summary'}>
            Summary
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`/finance/${accountId}/maintenance`} active={activeTab === 'maintenance'}>
            Maintenance
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}
