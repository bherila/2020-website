'use client'
import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { AccountSpend } from '@/app/api/account/model'
import AccountNavigation from './AccountNavigation'
import TransactionsTable from './TransactionsTable'

export default function AccountClient({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AccountSpend[]>([])

  useEffect(() => {
    setLoading(true)
    fetchWrapper.get(`/api/account/${id}/`).then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [id])

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <AccountNavigation accountId={id} activeTab="transactions" />
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <TransactionsTable data={data} />
        </Col>
        <Col xs={4}>
          <div>Add filters:</div>
          <div>
            <p>With everything in view:</p>
            <p>Set category:</p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
