'use client'
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MainTitle from '@/components/main-title'
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'

export default function AccountClient() {
  'use client'
  const [isImporting, setImport] = useState(false)
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <MainTitle>Account</MainTitle>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <Button onClick={() => setImport(true)}>Import more</Button>
          <Table size="sm" bordered striped>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
              </tr>
            </thead>
          </Table>
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
