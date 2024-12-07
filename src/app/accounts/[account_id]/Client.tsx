'use client'
import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { AccountSpend } from '@/app/api/account/model'
import AccountNavigation from './AccountNavigation'
import TransactionsTable from './TransactionsTable'

export default function AccountClient({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AccountSpend[] | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchWrapper.get(`/api/account/${id}/`).then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [id])

  const handleDeleteTransaction = async (spendId: string) => {
    try {
      // Optimistic update
      const updatedData = data?.filter((transaction) => transaction.spend_id?.toString() !== spendId) || []
      setData(updatedData)

      // Perform server-side deletion
      await fetchWrapper.delete(`/api/account/${id}/`, { spend_id: spendId })
    } catch (error) {
      // Revert optimistic update on error
      const refreshedData = await fetchWrapper.get(`/api/account/${id}/`)
      setData(refreshedData)

      console.error('Delete transaction error:', error)
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <AccountNavigation accountId={id} activeTab="transactions" />
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          {loading || data === null ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <TransactionsTable data={data} onDeleteTransaction={handleDeleteTransaction} />
          )}
        </Col>
        <Col xs={4}>xx</Col>
      </Row>
    </Container>
  )
}
