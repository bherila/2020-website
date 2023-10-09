'use client'

import React, { useEffect, useState } from 'react'
import { ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'
import Form from 'react-bootstrap/Form'
import { fetchWrapper } from '@/lib/fetchWrapper'
import Card from 'react-bootstrap/Card'

export default function ImportCodeListClient({
  passTypes,
}: {
  passTypes: ParsedSPGPPassType[]
}) {
  const [tsv, setTsv] = useState<string>('')
  const [sel, setSel] = useState<string>('')

  const errors = new Set<string>()
  const data = tsv
    .split('\n')
    .map((line) => line.trim().split(' ')[0].trim())
    .filter(Boolean)

  const [submitting, setSubmitting] = useState(false)
  const submitForm = async () => {
    setSubmitting(true)
    try {
      await fetchWrapper.post('/api/spgp/', {
        action: 'import-codes',
        passTypeID: sel,
        promoCodes: data,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>Import codes</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            submitForm()
          }}
        >
          <select
            disabled={submitting}
            value={sel}
            onChange={(x) => setSel(x.currentTarget.value)}
          >
            {passTypes?.map((pt) => (
              <option key={pt.passtype_id} value={pt.passtype_id}>
                {pt.display_name} exp {pt.expiry}
              </option>
            ))}
          </select>
          <button type={'submit'} disabled={submitting}>
            Import {data.length} code(s)
          </button>
          <textarea
            disabled={submitting}
            name="import"
            rows={10}
            style={{ width: '100%' }}
            wrap="nowrap"
            value={tsv ?? ''}
            onChange={(e) => setTsv(e.currentTarget.value)}
          />
        </Form>
      </Card.Body>
    </Card>
  )
}
