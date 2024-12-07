'use client'
import Table from 'react-bootstrap/Table'
import { AccountSpend } from '@/app/api/account/model'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { X } from 'react-bootstrap-icons'
import currency from 'currency.js'

interface Props {
  data: AccountSpend[]
}

// Extracted reusable clear button component
const ClearFilterButton = ({ onClick, ariaLabel }: { onClick: () => void; ariaLabel: string }) => (
  <button
    className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent p-0 me-2"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
    aria-label={ariaLabel}
  >
    <X color="gray" size={16} />
  </button>
)

export default function TransactionsTable({ data }: Props) {
  const [sortField, setSortField] = useState<keyof AccountSpend>('spend_date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [descriptionFilter, setDescriptionFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const handleSort = (field: keyof AccountSpend) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const filteredData = data.filter(
    (row) =>
      (!descriptionFilter || row.spend_description?.toLowerCase().includes(descriptionFilter.toLowerCase())) &&
      (!categoryFilter || (row.spend_category || 'uncategorized').toLowerCase().includes(categoryFilter.toLowerCase())),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    const direction = sortDirection === 'asc' ? 1 : -1
    if (aVal == null) return 1
    if (bVal == null) return -1
    return aVal < bVal ? -direction : direction
  })

  // Calculate total amount for filtered rows using currency.js
  const totalAmount = sortedData.reduce((sum, row) => sum.add(currency(row.spend_amount || 0)), currency(0))

  return (
    <Table size="sm" bordered striped>
      <thead>
        <tr>
          <th onClick={() => handleSort('spend_date')} style={{ cursor: 'pointer' }}>
            Date {sortField === 'spend_date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('spend_description')} style={{ cursor: 'pointer' }}>
            Description {sortField === 'spend_description' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('spend_amount')} style={{ cursor: 'pointer', textAlign: 'right' }}>
            Amount {sortField === 'spend_amount' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('spend_category')} style={{ cursor: 'pointer' }}>
            Category {sortField === 'spend_category' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
        </tr>
        <tr>
          <th></th>
          <th className="position-relative">
            <Form.Control
              size="sm"
              type="text"
              placeholder="Filter description..."
              value={descriptionFilter}
              onChange={(e) => setDescriptionFilter(e.target.value)}
            />
            {descriptionFilter && (
              <ClearFilterButton onClick={() => setDescriptionFilter('')} ariaLabel="Clear description filter" />
            )}
          </th>
          <th style={{ width: '100px' }}></th>
          <th className="position-relative" style={{ width: '140px' }}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Filter category..."
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            />
            {categoryFilter && (
              <ClearFilterButton onClick={() => setCategoryFilter('')} ariaLabel="Clear category filter" />
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.spend_id}>
            <td style={{ fontFamily: 'Atkinson Hyperlegible, monospace', width: '120px' }}>
              {row.spend_date?.slice(0, 10)}
            </td>
            <td
              onClick={() => {
                if (descriptionFilter === row.spend_description) {
                  setDescriptionFilter('')
                } else {
                  setDescriptionFilter(row.spend_description || '')
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              {row.spend_description}
            </td>
            <td style={{ textAlign: 'right' }}>{currency(row.spend_amount).format()}</td>
            <td>{row.spend_category ?? 'uncategorized'}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>
            <strong>Total</strong>
          </td>
          <td style={{ textAlign: 'right' }}>
            <strong>{totalAmount.format()}</strong>
          </td>
          <td></td>
        </tr>
      </tfoot>
    </Table>
  )
}
