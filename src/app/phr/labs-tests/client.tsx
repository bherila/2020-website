'use client'
import { useState } from 'react'
import { Card, Row, Col, Table, Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import printRange, { checkLabRange, getLatestRangeInfo } from '@/lib/lab-range-check'
import SerializedLabResult from '../SerializedLabResult.type'

interface GroupedResults {
  [analyte: string]: SerializedLabResult[]
}

function groupByAnalyte(results: SerializedLabResult[]): GroupedResults {
  return results.reduce((acc, result) => {
    const analyte = result.analyte || 'Unknown'
    if (!acc[analyte]) {
      acc[analyte] = []
    }
    acc[analyte].push(result)
    return acc
  }, {} as GroupedResults)
}

export default function LabsCards({ labResults }: { labResults: SerializedLabResult[] }) {
  const results = labResults
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResults = results.filter(
    (result) => result.analyte?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false,
  )

  return (
    <div className="container">
      <InputGroup className="mb-3 container">
        <InputGroup.Text>🔍</InputGroup.Text>
        <InputGroup.Text>Filter:</InputGroup.Text>
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to filter analytes..."
        />
      </InputGroup>
      <Row xs={1} md={1} lg={2} className="g-4">
        {Object.entries(groupByAnalyte(filteredResults)).map(([analyte, tests]) => {
          const rangeInfo = getLatestRangeInfo(tests)
          return (
            <Col key={analyte}>
              <Card>
                <Card.Header>{analyte}</Card.Header>
                <Card.Body>
                  <div className="mb-4">
                    {rangeInfo ? <div className="mb-2">Expected range: {printRange(rangeInfo)}</div> : null}
                    <Table size="sm" bordered={true}>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Value</th>
                          <th>In Range</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tests.map((test, index) => {
                          const { isInRange, message } = checkLabRange({
                            value: test.value,
                            rangeMin: rangeInfo?.rangeMin ?? null,
                            rangeMax: rangeInfo?.rangeMax ?? null,
                            normalValue: rangeInfo?.normalValue ?? null,
                          })
                          return (
                            <tr key={index}>
                              <td style={{ width: '100px' }}>
                                {test.resultDatetime == null
                                  ? 'Unknown'
                                  : new Date(test.resultDatetime).toLocaleDateString()}
                              </td>
                              <td>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>{test.testName || 'Unknown Test'}</Tooltip>}
                                >
                                  <span>
                                    {test.value} {test.unit}
                                  </span>
                                </OverlayTrigger>
                              </td>
                              <td style={{ width: '100px' }}>{isInRange ? '✓' : '⚠️'}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
