'use client'
import React, { useState, useEffect } from 'react'
import { z } from 'zod'
import productKeySchema from '@/lib/productKeySchema'
import { fetchWrapper } from '@/lib/fetchWrapper'
import ProductKeySchema from '@/lib/productKeySchema'
import Table from 'react-bootstrap/Table'

type KeyArray = Array<z.infer<typeof productKeySchema>>

export default function Client() {
  const [rows, setRows] = useState<KeyArray>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch data from your API when the component mounts
    fetchWrapper.get('/api/cdkeys/').then((response) => {
      setRows(z.array(ProductKeySchema).parse(response))
      setLoading(false)
    })
  }, [])

  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Key</th>
          <th>Product Name</th>
          <th>Computer Name</th>
          <th>Comment</th>
          <th>Used On</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.product_key}>
            <td>{r.product_id}</td>
            <td style={{ whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
              {r.product_key}
            </td>
            <td>{r.product_name}</td>
            <td>{r.computer_name}</td>
            <td>{r.comment}</td>
            <td style={{ whiteSpace: 'nowrap' }}>
              {r.used_on?.toISOString()?.slice(0, 10)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
