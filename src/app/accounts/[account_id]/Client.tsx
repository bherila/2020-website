'use client'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MainTitle from '@/components/main-title'
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import ImportTransactions from '@/app/accounts/[account_id]/ImportTransactions'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { AccountSpend, AccountSpendSchema } from '@/app/api/account/model'

export default function AccountClient(props: { id: string }) {
  const [isImporting, setImport] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AccountSpend[]>([])
  useEffect(() => {
    setLoading(true)
    fetchWrapper.get(`/api/account/${props.id}/`).then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [props.id])
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <MainTitle>Account</MainTitle>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <Table size="sm" bordered striped>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.spend_id}>
                  <td>{row.spend_date?.slice(0, 10)}</td>
                  <td>{row.spend_description}</td>
                  <td>{row.spend_amount}</td>
                  <td>{row.spend_category ?? 'uncategorized'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col xs={4}>
          <div>Add filters:</div>
          <div>
            <p>With everything in view:</p>
            <p>Set category:</p>
          </div>
          <h3>Import</h3>
          <p>Paste as tab separated (like from Excel or Google Sheet)</p>
          <ImportTransactions
            onImportClick={(data) => {
              setLoading(true)
              fetchWrapper
                .post(`/api/account/${props.id}/`, data)
                .then((res) => {
                  setData(res)
                  setLoading(false)
                })
            }}
          />
        </Col>
      </Row>
    </Container>
  )
}
