'use client'
import Nav from 'react-bootstrap/Nav'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

export default function AccountNavigation({
  accountId,
  activeTab = 'transactions',
}: {
  accountId: string
  activeTab?: string
}) {
  return (
    <div className="mb-4">
      <Breadcrumb>
        <Breadcrumb.Item href="/accounts">Accounts</Breadcrumb.Item>
        <Breadcrumb.Item active>Account {accountId}</Breadcrumb.Item>
      </Breadcrumb>

      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link href={`/accounts/${accountId}`} active={activeTab === 'transactions'}>
            Transactions
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`/accounts/${accountId}/import-transactions`} active={activeTab === 'import'}>
            Import
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}
