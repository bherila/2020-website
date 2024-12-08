'use client'
import Table from 'react-bootstrap/Table'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { X, Trash } from 'react-bootstrap-icons'
import currency from 'currency.js'
import { AccountLineItem } from '@/lib/AccountLineItem'

interface Props {
  data: AccountLineItem[]
  onDeleteTransaction?: (transactionId: string) => Promise<void>
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

export default function TransactionsTable({ data, onDeleteTransaction }: Props) {
  const [sortField, setSortField] = useState<keyof AccountLineItem>('t_date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [descriptionFilter, setDescriptionFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [symbolFilter, setSymbolFilter] = useState('')
  const [optExpirationFilter, setOptExpirationFilter] = useState('')
  const [optTypeFilter, setOptTypeFilter] = useState('')

  const handleSort = (field: keyof AccountLineItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const filteredData = data.filter(
    (row) =>
      (!descriptionFilter || row.t_description?.toLowerCase().includes(descriptionFilter.toLowerCase())) &&
      (!categoryFilter || (row.t_schc_category || '-').toLowerCase().includes(categoryFilter.toLowerCase())) &&
      (!symbolFilter || row.t_symbol?.toLowerCase().includes(symbolFilter.toLowerCase())) &&
      (!optExpirationFilter || row.opt_expiration?.toString().slice(0, 10).includes(optExpirationFilter.toLowerCase())) &&
      (!optTypeFilter || row.opt_type?.toLowerCase().includes(optTypeFilter.toLowerCase())),
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
  const totalAmount = sortedData.reduce((sum, row) => sum.add(currency(row.t_amt || 0)), currency(0))

  return (
    <Table size="sm" bordered striped>
      <thead>
        <tr>
          <th onClick={() => handleSort('t_date')} style={{ cursor: 'pointer' }}>
            Date {sortField === 't_date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('t_description')} style={{ cursor: 'pointer' }}>
            Description {sortField === 't_description' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('t_amt')} style={{ cursor: 'pointer', textAlign: 'right' }}>
            Amount {sortField === 't_amt' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('t_schc_category')} style={{ cursor: 'pointer' }}>
            Category {sortField === 't_schc_category' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('t_symbol')} style={{ cursor: 'pointer', width: '100px' }}>
            Symbol {sortField === 't_symbol' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('opt_expiration')} style={{ cursor: 'pointer', width: '100px' }}>
            Option Expiry {sortField === 'opt_expiration' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('opt_type')} style={{ cursor: 'pointer', width: '100px' }}>
            Option Type {sortField === 'opt_type' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => handleSort('opt_strike')} style={{ cursor: 'pointer', textAlign: 'right', width: '100px' }}>
            Strike {sortField === 'opt_strike' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          {onDeleteTransaction && (
            <th style={{ textAlign: 'center' }}>
              <Trash size={16} />
            </th>
          )}
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
          <th className="position-relative" style={{ width: '100px' }}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Filter symbol..."
              value={symbolFilter}
              onChange={(e) => setSymbolFilter(e.target.value)}
            />
            {symbolFilter && <ClearFilterButton onClick={() => setSymbolFilter('')} ariaLabel="Clear symbol filter" />}
          </th>
          <th className="position-relative" style={{ width: '100px' }}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Filter option expiry..."
              value={optExpirationFilter}
              onChange={(e) => setOptExpirationFilter(e.target.value)}
            />
            {optExpirationFilter && (
              <ClearFilterButton onClick={() => setOptExpirationFilter('')} ariaLabel="Clear option expiry filter" />
            )}
          </th>
          <th className="position-relative" style={{ width: '100px' }}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Filter option type..."
              value={optTypeFilter}
              onChange={(e) => setOptTypeFilter(e.target.value)}
            />
            {optTypeFilter && (
              <ClearFilterButton onClick={() => setOptTypeFilter('')} ariaLabel="Clear option type filter" />
            )}
          </th>
          <th style={{ width: '100px' }}></th>
          {onDeleteTransaction && <th></th>}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <tr key={row.t_id + ':' + i}>
            <td style={{ fontFamily: 'Atkinson Hyperlegible, monospace', width: '120px' }}>
              {row.t_date?.toString()?.slice(0, 10)}
            </td>
            <td
              onClick={() => {
                if (descriptionFilter === row.t_description) {
                  setDescriptionFilter('')
                } else {
                  setDescriptionFilter(row.t_description || '')
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              {row.t_description}
            </td>
            <td
              style={{
                textAlign: 'right',
                whiteSpace: 'nowrap',
              }}
              className={row.t_amt >= 0 ? 'text-success' : 'text-danger'}
            >
              {currency(row.t_amt).format()}
            </td>
            <td
              onClick={() => {
                if (categoryFilter === (row.t_schc_category || '-')) {
                  setCategoryFilter('')
                } else {
                  setCategoryFilter(row.t_schc_category || '-')
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              {row.t_schc_category ?? '-'}
            </td>
            <td style={{ width: '100px' }}>{row.t_symbol}</td>
            <td style={{ width: '100px' }}>{row.opt_expiration?.toString()?.slice(0, 10)}</td>
            <td style={{ width: '100px' }}>{row.opt_type}</td>
            <td style={{ textAlign: 'right', width: '100px' }}>
              {row.opt_strike ? currency(row.opt_strike).format() : ''}
            </td>
            {onDeleteTransaction && (
              <td style={{ textAlign: 'center' }}>
                <button
                  onClick={() => onDeleteTransaction(row.t_id?.toString() || '')}
                  className="btn btn-link p-0"
                  aria-label="Delete transaction"
                >
                  <Trash size={16} />
                </button>
              </td>
            )}
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
          <td colSpan={5}></td>
        </tr>
      </tfoot>
    </Table>
  )
}
