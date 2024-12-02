'use client'
import { Card, Row, Col, Table, Form, InputGroup } from 'react-bootstrap'
import { LabResult } from '../labs-types'
import { checkLabRange, getLatestRangeInfo } from '@/lib/lab-range-check'
import { Search } from 'react-bootstrap-icons'
import { useState } from 'react'

interface GroupedResults {
  [testName: string]: {
    [analyte: string]: LabResult[]
  }
}

function groupByTestAndAnalyte(results: LabResult[]): GroupedResults {
  return results.reduce((acc, result) => {
    const testName = result.test_name || 'Unknown'
    const analyte = result.analyte || 'Unknown'

    if (!acc[testName]) {
      acc[testName] = {}
    }
    if (!acc[testName][analyte]) {
      acc[testName][analyte] = []
    }
    acc[testName][analyte].push(result)
    return acc
  }, {} as GroupedResults)
}

export default function LabsCards({ results }: { results: LabResult[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResults = results.filter(
    (result) => result.test_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false,
  )

  return (
    <div className="container">
      <InputGroup className="mb-3 container">
        <InputGroup.Text>
          <Search style={{ height: '1rem' }} />
        </InputGroup.Text>
        <InputGroup.Text>Filter:</InputGroup.Text>
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to filter labs..."
        />
      </InputGroup>
      <Row xs={1} md={1} lg={2} className="g-4">
        {Object.entries(groupByTestAndAnalyte(filteredResults)).map(([testName, analyteGroups]) => (
          <Col key={testName}>
            <Card>
              <Card.Header>{testName}</Card.Header>
              <Card.Body>
                {Object.entries(analyteGroups).map(([analyte, tests], i) => {
                  const rangeInfo = getLatestRangeInfo(tests)
                  return (
                    <div key={analyte} className="mb-4">
                      <h3 style={{ fontSize: '1.25rem' }}>{analyte}</h3>
                      {rangeInfo && (
                        <div className="mb-2">
                          Expected range:{' '}
                          {rangeInfo.normal_value
                            ? `Equal to ${rangeInfo.normal_value}`
                            : `${rangeInfo.range_min ?? '-∞'} to ${rangeInfo.range_max ?? '∞'} ${rangeInfo.range_unit || ''}`}
                        </div>
                      )}
                      <Table size="sm" bordered={true}>
                        {i !== 0 ? null : (
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Value</th>
                              <th>In Range</th>
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {tests.map((test, index) => {
                            const { isInRange, message } = checkLabRange(test)
                            return (
                              <tr key={index}>
                                <td style={{ width: '100px' }}>{test.result_datetime?.toLocaleDateString()}</td>
                                <td>
                                  {test.value} {test.unit}
                                </td>
                                <td style={{ width: '100px' }}>{isInRange ? '✓' : '⚠️'}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )
                })}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
