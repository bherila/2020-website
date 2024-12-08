'use client'
import Table from 'react-bootstrap/Table'
import { useState, useMemo } from 'react'
import Form from 'react-bootstrap/Form'
import { X, Trash } from 'react-bootstrap-icons'
import currency from 'currency.js'
import { AccountLineItem } from '@/lib/AccountLineItem'

import './TransactionsTable.css'

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
  const [typeFilter, setTypeFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [symbolFilter, setSymbolFilter] = useState('')
  const [cusipFilter, setCusipFilter] = useState('')
  const [optExpirationFilter, setOptExpirationFilter] = useState('')
  const [optTypeFilter, setOptTypeFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [memoFilter, setMemoFilter] = useState('')

  const handleSort = (field: keyof AccountLineItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  // Determine if Category column should be hidden
  const isCategoryColumnEmpty = useMemo(() => {
    return data.every((row) => !row.t_schc_category)
  }, [data])

  // Determine if new columns should be hidden
  const isQtyColumnEmpty = useMemo(() => {
    return data.every((row) => row.t_qty == null || row.t_qty === 0)
  }, [data])

  const isPriceColumnEmpty = useMemo(() => {
    return data.every((row) => row.t_price == null || row.t_price === 0)
  }, [data])

  const isCommissionColumnEmpty = useMemo(() => {
    return data.every((row) => row.t_commission == null || row.t_commission === 0)
  }, [data])

  const isFeeColumnEmpty = useMemo(() => {
    return data.every((row) => row.t_fee == null || row.t_fee === 0)
  }, [data])

  const isTypeColumnEmpty = useMemo(() => {
    return data.every((row) => !row.t_type)
  }, [data])

  const isMemoColumnEmpty = useMemo(() => {
    return data.every((row) => !row.t_comment)
  }, [data])

  const isCusipColumnEmpty = useMemo(() => {
    return data.every((row) => !row.t_cusip)
  }, [data])

  const isSymbolColumnEmpty = useMemo(() => {
    return data.every((row) => !row.t_symbol)
  }, [data])

  const isOptionExpiryColumnEmpty = useMemo(() => {
    return data.every((row) => !row.opt_expiration)
  }, [data])

  const isOptionTypeColumnEmpty = useMemo(() => {
    return data.every((row) => !row.opt_type)
  }, [data])

  const isStrikeColumnEmpty = useMemo(() => {
    return data.every((row) => row.opt_strike == null || row.opt_strike === 0)
  }, [data])

  const filteredData = data.filter(
    (row) =>
      (!dateFilter || row.t_date?.toISOString().slice(0, 10).includes(dateFilter)) &&
      (!descriptionFilter || row.t_description?.toLowerCase().includes(descriptionFilter.toLowerCase())) &&
      (!typeFilter || (row.t_type || '-').toLowerCase().includes(typeFilter.toLowerCase())) &&
      (!categoryFilter || (row.t_schc_category || '-').toLowerCase().includes(categoryFilter.toLowerCase())) &&
      (!symbolFilter || row.t_symbol?.toLowerCase().includes(symbolFilter.toLowerCase())) &&
      (!cusipFilter || row.t_cusip?.toLowerCase().includes(cusipFilter.toLowerCase())) &&
      (!optExpirationFilter || row.opt_expiration?.includes(optExpirationFilter.toLowerCase())) &&
      (!optTypeFilter || row.opt_type?.toLowerCase().includes(optTypeFilter.toLowerCase())) &&
      (!memoFilter || (row.t_comment || '-').toLowerCase().includes(memoFilter.toLowerCase())),
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
    <Table size="sm" bordered striped style={{ fontSize: '90%' }}>
      <thead>
        <tr>
          <th onClick={() => handleSort('t_date')} style={{ cursor: 'pointer' }}>
            Date {sortField === 't_date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          {!isTypeColumnEmpty && (
            <th onClick={() => handleSort('t_type')} style={{ cursor: 'pointer' }}>
              Type {sortField === 't_type' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          )}
          <th onClick={() => handleSort('t_description')} style={{ cursor: 'pointer' }}>
            Description {sortField === 't_description' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          {!isQtyColumnEmpty && (
            <th onClick={() => handleSort('t_qty')} style={{ cursor: 'pointer' }}>
              Qty {sortField === 't_qty' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          )}
          {!isPriceColumnEmpty && (
            <th onClick={() => handleSort('t_price')} style={{ cursor: 'pointer' }}>
              Price {sortField === 't_price' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          )}
          {!isCommissionColumnEmpty && (
            <th onClick={() => handleSort('t_commission')} style={{ cursor: 'pointer' }}>
              Comm. {sortField === 't_commission' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          )}
          {!isFeeColumnEmpty && (
            <th onClick={() => handleSort('t_fee')} style={{ cursor: 'pointer' }}>
              Fee {sortField === 't_fee' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          )}
          <th onClick={() => handleSort('t_amt')} style={{ cursor: 'pointer' }}>
            Amount {sortField === 't_amt' && (sortDirection === 'asc' ? '↑' : '↓')}
          </th>
          {!isCategoryColumnEmpty && (
            <th onClick={() => handleSort('t_schc_category')} style={{ cursor: 'pointer' }}>
              Category {sortField === 't_schc_category' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          )}
          {!isCusipColumnEmpty && (
            <th onClick={() => handleSort('t_cusip')} style={{ cursor: 'pointer' }}>
              CUSIP {sortField === 't_cusip' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          )}
          {!isSymbolColumnEmpty && (
            <th onClick={() => handleSort('t_symbol')} style={{ cursor: 'pointer' }}>
              Symbol {sortField === 't_symbol' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          )}
          {!isOptionExpiryColumnEmpty && (
            <th onClick={() => handleSort('opt_expiration')} style={{ cursor: 'pointer' }}>
              Option Expiry {sortField === 'opt_expiration' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          )}
          {!isOptionTypeColumnEmpty && (
            <th onClick={() => handleSort('opt_type')} style={{ cursor: 'pointer' }}>
              Option Type {sortField === 'opt_type' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          )}
          {!isStrikeColumnEmpty && (
            <th onClick={() => handleSort('opt_strike')} style={{ cursor: 'pointer' }}>
              Strike {sortField === 'opt_strike' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          )}
          {!isMemoColumnEmpty && (
            <th onClick={() => handleSort('t_comment')} style={{ cursor: 'pointer', width: '200px' }}>
              Memo {sortField === 't_comment' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          )}
          {onDeleteTransaction && (
            <th style={{ textAlign: 'center' }}>
              <Trash size={16} />
            </th>
          )}
        </tr>
        <tr>
          <th className="position-relative" style={{ width: '120px' }}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Filter date..."
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
            {dateFilter && <ClearFilterButton onClick={() => setDateFilter('')} ariaLabel="Clear date filter" />}
          </th>
          {!isTypeColumnEmpty && (
            <th className="position-relative" style={{ width: '100px' }}>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Filter type..."
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              />
              {typeFilter && <ClearFilterButton onClick={() => setTypeFilter('')} ariaLabel="Clear type filter" />}
            </th>
          )}
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
          {!isQtyColumnEmpty && <th></th>}
          {!isPriceColumnEmpty && <th></th>}
          {!isCommissionColumnEmpty && <th></th>}
          {!isFeeColumnEmpty && <th></th>}
          <th></th>
          {!isCategoryColumnEmpty && (
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
          )}
          {!isCusipColumnEmpty && (
            <th className="position-relative" style={{ width: '100px' }}>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Filter CUSIP..."
                value={cusipFilter}
                onChange={(e) => setCusipFilter(e.target.value)}
              />
              {cusipFilter && <ClearFilterButton onClick={() => setCusipFilter('')} ariaLabel="Clear CUSIP filter" />}
            </th>
          )}
          {!isSymbolColumnEmpty && (
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
          )}
          {!isOptionExpiryColumnEmpty && (
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
          )}
          {!isOptionTypeColumnEmpty && (
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
          )}
          {!isStrikeColumnEmpty && <th></th>}
          {!isMemoColumnEmpty && (
            <th className="position-relative" style={{ width: '200px' }}>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Filter memo..."
                value={memoFilter}
                onChange={(e) => setMemoFilter(e.target.value)}
              />
              {memoFilter && <ClearFilterButton onClick={() => setMemoFilter('')} ariaLabel="Clear memo filter" />}
            </th>
          )}
          {onDeleteTransaction && <th></th>}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <tr key={row.t_id + ':' + i}>
            <td
              className="numericCol"
              onClick={() => {
                const formattedDate = row.t_date?.toISOString().slice(0, 10)
                if (dateFilter === formattedDate) {
                  setDateFilter('')
                } else {
                  setDateFilter(formattedDate || '')
                }
              }}
            >
              {row.t_date?.toISOString().slice(0, 10)}
            </td>
            {!isTypeColumnEmpty && (
              <td
                onClick={() => {
                  if (typeFilter === row.t_type) {
                    setTypeFilter('')
                  } else {
                    setTypeFilter(row.t_type || '')
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                {row.t_type}
              </td>
            )}
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
            {!isQtyColumnEmpty && <td className={'numericCol'}>{row.t_qty != null ? row.t_qty.toLocaleString() : ''}</td>}
            {!isPriceColumnEmpty && (
              <td className={'numericCol'}>{row.t_price != null ? currency(row.t_price, { symbol: '' }).format() : ''}</td>
            )}
            {!isCommissionColumnEmpty && (
              <td className={'numericCol'}>
                {row.t_commission != null ? currency(row.t_commission, { symbol: '' }).format() : ''}
              </td>
            )}
            {!isFeeColumnEmpty && (
              <td className={'numericCol'}>
                {row.t_fee != null ? currency(row.t_fee, { precision: 4, symbol: '' }).format() : ''}
              </td>
            )}
            <td
              className={'numericCol'}
              style={{
                color: row.t_amt >= 0 ? 'green' : 'red',
                whiteSpace: 'nowrap',
              }}
            >
              {currency(row.t_amt || 0, { symbol: '' }).format()}
            </td>
            {!isCategoryColumnEmpty && (
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
            )}
            {!isCusipColumnEmpty && (
              <td
                style={{ width: '100px', cursor: 'pointer' }}
                onClick={() => {
                  if (cusipFilter === row.t_cusip) {
                    setCusipFilter('')
                  } else {
                    setCusipFilter(row.t_cusip || '')
                  }
                }}
              >
                {row.t_cusip}
              </td>
            )}
            {!isSymbolColumnEmpty && (
              <td
                className={'numericCol'}
                onClick={() => {
                  if (symbolFilter === row.t_symbol) {
                    setSymbolFilter('')
                  } else {
                    setSymbolFilter(row.t_symbol || '')
                  }
                }}
              >
                {row.t_symbol}
              </td>
            )}
            {!isOptionExpiryColumnEmpty && (
              <td
                className={'numericCol'}
                onClick={() => {
                  const formattedExpiry = row.opt_expiration?.slice(0, 10)
                  if (optExpirationFilter === formattedExpiry) {
                    setOptExpirationFilter('')
                  } else {
                    setOptExpirationFilter(formattedExpiry || '')
                  }
                }}
              >
                {row.opt_expiration?.slice(0, 10) ?? ''}
              </td>
            )}
            {!isOptionTypeColumnEmpty && (
              <td
                className={'numericCol'}
                onClick={() => {
                  if (optTypeFilter === row.opt_type) {
                    setOptTypeFilter('')
                  } else {
                    setOptTypeFilter(row.opt_type || '')
                  }
                }}
              >
                {row.opt_type}
              </td>
            )}
            {!isStrikeColumnEmpty && (
              <td className={'numericCol'}>
                {row.opt_strike != null ? currency(row.opt_strike, { symbol: '' }).format() : ''}
              </td>
            )}
            {!isMemoColumnEmpty && <td>{row.t_comment}</td>}
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
          {!isTypeColumnEmpty && <td></td>}
          {!isQtyColumnEmpty && <td></td>}
          {!isPriceColumnEmpty && <td></td>}
          {!isCommissionColumnEmpty && <td></td>}
          {!isFeeColumnEmpty && <td></td>}
          <td>
            <strong>{totalAmount.format()}</strong>
          </td>
          {!isCategoryColumnEmpty && <td></td>}
          {!isCusipColumnEmpty && <td></td>}
          {!isSymbolColumnEmpty && <td></td>}
          {!isOptionExpiryColumnEmpty && <td></td>}
          {!isOptionTypeColumnEmpty && <td></td>}
          {!isStrikeColumnEmpty && <td></td>}
          {!isMemoColumnEmpty && <td></td>}
          {onDeleteTransaction && <td></td>}
        </tr>
      </tfoot>
    </Table>
  )
}
