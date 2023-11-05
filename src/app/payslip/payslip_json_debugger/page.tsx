'use client'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState } from 'react'
import { parseEntities } from '@/app/payslip/payslipSchemaReducer'

export default function PayslipJsonDebugPage() {
  const [json, setJson] = useState('{}')
  let entitles = ''
  try {
    entitles = JSON.stringify(
      JSON.parse(json)?.obj?.document?.entities,
      null,
      2,
    )
  } catch (err) {
    entitles = err?.toString() ?? 'error: null'
  }
  const parsed = parseEntities(json)
  return (
    <Container>
      <Row>
        <textarea
          onChange={(e) => setJson(e.currentTarget.value)}
          value={json}
          rows={20}
          style={{ width: '100%' }}
        />
      </Row>
      <Row>
        <Col xs={6}>
          <textarea
            readOnly
            value={entitles}
            rows={20}
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={6}>
          <textarea
            readOnly
            value={JSON.stringify(parsed, null, 2)}
            rows={20}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
    </Container>
  )
}
