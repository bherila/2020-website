'use client'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { DragEvent, FormEvent, useState } from 'react'
import { parseEntities } from '@/app/payslip/payslipSchemaReducer'

export default function PayslipJsonDebugPage() {
  const [json, setJson] = useState('{}')
  let entitles = ''
  try {
    entitles = JSON.stringify(JSON.parse(json)?.document?.entitiesList, null, 2)
  } catch (err) {
    entitles = err?.toString() ?? 'error: null'
  }
  const parsed = parseEntities(json)

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const x = reader.result
      if (typeof x === 'string') {
        setJson(x)
      } else {
        alert('Cannot handle dropped file type: ' + typeof x)
      }
    }
    reader.readAsText(file)
  }

  const handleDragOver = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <Container>
      <Row>
        <div
          onDrop={handleDrop}
          style={{
            border: '2px dashed #666',
            padding: '10px',
            borderRadius: '5px',
            width: '100%',
          }}
        >
          <p>You can drop a JSON file in here</p>
          <textarea
            onDragOver={handleDragOver}
            onChange={(e) => setJson(e.currentTarget.value)}
            value={json}
            rows={20}
            style={{ width: '100%' }}
          />
        </div>
      </Row>
      <Row>
        <Col xs={6}>
          <textarea
            readOnly
            value={entitles}
            rows={15}
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
