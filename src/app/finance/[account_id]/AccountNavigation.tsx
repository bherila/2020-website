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
  activeTab?: 'transactions' | 'import' | 'equities' | 'transfers'
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
            Cash
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`/finance/${accountId}/import-transactions`} active={activeTab === 'import'}>
            Import
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}
