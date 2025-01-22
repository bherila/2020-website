'use client'

import MainTitle from '@/components/main-title'
import { useEffect, useState } from 'react'
import { tax_hierarchy, taxFilingTypes } from '@/app/api/tax-brackets/schema'
import { fetchWrapper } from '@/lib/fetchWrapper'
import ImportTaxBrackets from '@/app/tax-brackets/ImportTaxBrackets'
import Container from '@/components/container'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

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
      <MainTitle>Tax brackets</MainTitle>
      {Object.keys(data).map((year) => (
        <Table key={year}>
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
                <TableRow key={region}>
                  <TableCell>{region ?? 'Federal'}</TableCell>
                  {taxFilingTypes.map((type) => (
                    <TableCell key={type}>
                      <Table>
                        <TableBody>
                          {data[year][region][type]?.map((record) => (
                            <TableRow key={record.income_over.toString()}>
                              <TableCell>{record.income_over}</TableCell>
                              <TableCell>{record.rate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </tbody>
        </Table>
      ))}
      <ImportTaxBrackets
        onImportClick={(data) => {
          setLoading(true)
          fetchWrapper
            .post('/api/tax-brackets/', data)
            .then((res) => setData(res))
            .finally(() => setLoading(false))
        }}
      />
    </Container>
  )
}
