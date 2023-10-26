'use client'

import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { colKeys, SPGPSchema } from '@/app/spgp/SPGPSchema'
import { ZodError } from 'zod'
import { Alert, Button } from 'react-bootstrap'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'
import Form from 'react-bootstrap/Form'
import moment from 'moment'

export default function SPGPImportClient({
  passTypes,
}: {
  passTypes: ParsedSPGPPassType[]
}) {
  const [tsv, setTsv] = useState<string | null>(null)
  useEffect(() => {
    if (tsv === null) {
      setTsv(sessionStorage.getItem('spgp-import') ?? '')
    } else {
      sessionStorage.setItem('spgp-import', tsv)
    }
  }, [tsv])

  const errors = new Set<string>()
  const data = (tsv ?? '')
    .split('\n')
    .map((line) => {
      const rowData: any = {}
      const colData = line.split('\t')
      if (colData[0] === 'Promo Code') {
        return null // col header
      }
      for (let i = 0; i < Math.min(colKeys.length, colData.length); ++i) {
        if (i == 4) {
          rowData[colKeys[i]] = moment(colData[i]).format('yyyy-MM-DD')
        } else if (i == 9) {
          rowData[colKeys[i]] = colData[i].replace(/[^\d.]/g, '')
        } else {
          rowData[colKeys[i]] = colData[i]
        }
      }
      try {
        return SPGPSchema.parse(rowData)
      } catch (err) {
        if (err instanceof ZodError) {
          errors.add(line)
        } else if (err instanceof Error) {
          errors.add(err.message + ': ' + line)
        }
        return null
      }
    })
    .filter(Boolean)

  const [isLoading, setLoading] = useState(false)
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        setLoading(true)
        fetchWrapper
          .post('/api/spgp/', { action: 'spgp-import', data })
          .finally(() => setLoading(false))
      }}
    >
      <textarea
        name="import"
        rows={10}
        style={{ width: '100%' }}
        wrap="nowrap"
        value={tsv ?? ''}
        onChange={(e) => setTsv(e.currentTarget.value)}
      />
      {tsv && errors.size && (
        <Alert color="danger">
          Errors in the entry will be skipped:
          <ol>
            {Array.from(errors).map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ol>
        </Alert>
      )}
      <Button type="submit">Submit</Button>
      <Table size="sm" striped hover style={{ fontSize: '8pt' }}>
        <thead>
          <tr>
            {colKeys.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {colKeys.map((colKey) => (
                <td key={colKey}>{(row as any)[colKey]?.toString() ?? '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Form>
  )
}
