'use client'
import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ImportTransactions from '../ImportTransactions'
import { fetchWrapper } from '@/lib/fetchWrapper'
import AccountNavigation from '../AccountNavigation'

export default function ImportTransactionsClient({ id, accountName }: { id: number; accountName: string }) {
  const [loading, setLoading] = useState(false)

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <AccountNavigation accountId={id} accountName={accountName} activeTab="import" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <p>Paste as tab separated (like from Excel or Google Sheet)</p>
          <ImportTransactions
            onImportClick={(data) => {
              setLoading(true)
              fetchWrapper.post(`/api/finance/${id}/line_items`, data).then(() => {
                setLoading(false)
                window.location.href = `/finance/${id}`
              })
            }}
          />
        </Col>
      </Row>
    </Container>
  )
}
