'use client'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import MainTitle from '@/components/main-title'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { Fragment, useEffect, useState } from 'react'
import {
  tax_hierarchy,
  tax_row,
  taxFilingTypes,
} from '@/app/api/tax-brackets/schema'
import { fetchWrapper } from '@/lib/fetchWrapper'
import ImportTaxBrackets from '@/app/tax-brackets/ImportTaxBrackets'

export default function TaxBrackets() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<tax_hierarchy>({})
  useEffect(() => {
    fetchWrapper
      .get('/api/tax-brackets/')
      .then((res) => setData(res))
      .finally(() => setLoading(false))
  })

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <MainTitle>Tax brackets</MainTitle>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          {Object.keys(data).map((year) => (
            <Table bordered size="sm" hover striped key={year}>
              <caption>{year}</caption>
              <thead>
                <tr>
                  <th>Location</th>
                  {taxFilingTypes.map((type) => (
                    <th key={type}>{type}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(data[year]).map((region) => {
                  return (
                    <tr key={region}>
                      <td>{region ?? 'Federal'}</td>
                      {taxFilingTypes.map((type) => (
                        <td key={type}>
                          <Table>
                            <tbody>
                              {data[year][region][type]?.map((record) => (
                                <tr key={record.income_over.toString()}>
                                  <td>{record.income_over}</td>
                                  <td>{record.rate}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          ))}
        </Col>
        <Col xs={4}>
          <ImportTaxBrackets
            onImportClick={(data) => {
              setLoading(true)
              fetchWrapper
                .post('/api/tax-brackets/', data)
                .then((res) => setData(res))
                .finally(() => setLoading(false))
            }}
          />
        </Col>
      </Row>
    </Container>
  )
}
