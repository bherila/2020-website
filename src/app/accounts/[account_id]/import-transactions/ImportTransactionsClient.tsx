'use client'
import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ImportTransactions from '../ImportTransactions'
import { fetchWrapper } from '@/lib/fetchWrapper'
import AccountNavigation from '../AccountNavigation'

export default function ImportTransactionsClient({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <AccountNavigation accountId={id} activeTab="import" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <p>Paste as tab separated (like from Excel or Google Sheet)</p>
          <ImportTransactions
            onImportClick={(data) => {
              setLoading(true)
              fetchWrapper.post(`/api/account/${id}/`, data).then(() => {
                setLoading(false)
                window.location.href = `/accounts/${id}`
              })
            }}
          />
        </Col>
      </Row>
    </Container>
  )
}
