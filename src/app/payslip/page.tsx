'use client'
import { useState } from 'react'
import Container from '@/components/container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import currency from 'currency.js'
import Table from 'react-bootstrap/Table'
import { Cols } from '@/app/payslip/Payslip'
import deepRemoveKey from '@/lib/DeepRemoveKey'

function gMt(obj: any, type: string): string | null {
  return obj.properties.find((r: any) => r.type === type)?.mentionText ?? null
}
function entity(obj: any, type: string): string | null {
  return obj.properties.find((r: any) => r.type === type) ?? {}
}

export default function Payslip() {
  const [json, setJson] = useState('{}')

  let obj: any = {}
  try {
    obj = JSON.parse(json)
    deepRemoveKey(obj, 'textAnchor')
    deepRemoveKey(obj, 'pageAnchor')
    deepRemoveKey(obj, 'layout')
    deepRemoveKey(obj, 'blocks')
    deepRemoveKey(obj, 'paragraphs')
    deepRemoveKey(obj, 'lines')
    deepRemoveKey(obj, 'detectedLanguages')
    deepRemoveKey(obj, 'pages')
  } catch {
    obj = {}
  }

  const earning_items =
    obj?.document?.entities
      ?.filter((x: any) => x.type === 'earning_item')
      .map((x: any) => {
        return {
          type: gMt(x, 'earning_type'),
          this_period: currency(gMt(x, 'earning_this_period') ?? 0),
          ytd: currency(gMt(x, 'earning_ytd') ?? 0),
        }
      }) ?? []

  const deduction_items =
    obj?.document?.entities
      ?.filter((x: any) => x.type === 'deduction_item')
      .map((x: any) => {
        return {
          type: gMt(x, 'deduction_type'),
          this_period: currency(gMt(x, 'deduction_this_period') ?? 0),
          ytd: currency(gMt(x, 'deduction_ytd') ?? 0),
        }
      }) ?? []

  const tax_items =
    obj?.document?.entities
      ?.filter((x: any) => x.type === 'tax_item')
      .map((x: any) => {
        return {
          type: gMt(x, 'tax_type'),
          this_period: currency(gMt(x, 'tax_this_period') ?? 0),
          ytd: currency(gMt(x, 'tax_ytd') ?? 0),
        }
      }) ?? []

  const foo: string[] = []
  const mapping = []
  ;[...earning_items, ...deduction_items, ...tax_items].forEach((r) => {
    const n = r.type
      .replace(/[^A-Z0-9 ]+/gi, '')
      .replace(/\s+/g, '_')
      .trim()
      .toLowerCase()
    foo.push(n + '_period DECIMAL(10,2) NULL')
    foo.push(n + '_ytd DECIMAL(10,2) NULL')
  })

  const cols = Cols
  const headings = Object.keys(cols).map((key) => cols[key].title)

  return (
    <Container>
      <Row>
        <Table size="sm" striped bordered>
          <thead>
            <tr>
              {headings.map((s, i) => (
                <th key={i}>{s.trim()}</th>
              ))}
            </tr>
          </thead>
        </Table>
      </Row>
      <Row>
        <form
          action="/api/payslip/"
          method="POST"
          encType="multipart/form-data"
        >
          <input type="hidden" name="foo" value="bar" />
          <Row>
            PDF <input type="file" name="pdf" />
          </Row>
          <Row>
            JSON <input type="file" name="json" />
          </Row>
          <Row>
            <button type="submit">Submit</button>
          </Row>
        </form>
      </Row>
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
          <pre>{foo.join('\n')}</pre>
        </Col>
        <Col xs={6}>
          <textarea
            readOnly
            value={JSON.stringify(obj)}
            rows={20}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
    </Container>
  )
}
