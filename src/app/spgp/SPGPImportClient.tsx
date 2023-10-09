'use client'

import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { colKeys, SPGPSchema } from '@/app/spgp/SPGPSchema'
import { ZodError } from 'zod'
import { Alert } from 'react-bootstrap'
import { ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'

export default function SPGPImportClient({
  passTypes,
}: {
  passTypes?: ParsedSPGPPassType[]
}) {
  const [tsv, setTsv] = useState<string>(
    typeof sessionStorage === 'undefined'
      ? ''
      : sessionStorage?.getItem('spgp_import') ?? '',
  )
  useEffect(() => {
    if (
      sessionStorage &&
      sessionStorage.getItem('spgp_import') !== tsv &&
      tsv
    ) {
      sessionStorage.setItem('spgp_import', tsv)
    }
  }, [tsv])

  const errors = new Set<string>()
  const data = tsv
    .split('\n')
    .map((line) => {
      const rowData: any = {}
      const colData = line.trim().split('\t')
      if (colData[0] === 'Promo Code') {
        return null // col header
      }
      for (let i = 0; i < Math.min(colKeys.length, colData.length); ++i) {
        rowData[colKeys[i]] = colData[i]
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

  return (
    <form>
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
    </form>
  )
}
