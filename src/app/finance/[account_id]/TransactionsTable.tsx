'use client'
import { useEffect, useMemo, useState } from 'react'
import currency from 'currency.js'
import { AccountLineItem } from '@/lib/AccountLineItem'
import { getUserTags, applyTagToTransactions } from './tag-actions'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import './TransactionsTable.css'
import { Table } from '@/components/ui/table'
import { ClearFilterButton } from '@/lib/ClearFilterButton'
import { TagApplyButton } from './TagApplyButton'
import TransactionDetailsModal from './TransactionDetailsModal'

interface Props {
  data: AccountLineItem[]
  onDeleteTransaction?: (transactionId: string) => Promise<void>
  enableTagging?: boolean
  refreshFn?: () => void
}

export default function TransactionsTable({ data, onDeleteTransaction, enableTagging = false, refreshFn }: Props) {
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
  const [tagFilter, setTagFilter] = useState('')
  const [amountFilter, setAmountFilter] = useState('')
  const [availableTags, setAvailableTags] = useState<
    {
      tag_id: number
      tag_label: string
      tag_color: string
    }[]
  >([])
  const [isLoadingTags, setIsLoadingTags] = useState(false)
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<AccountLineItem | null>(null)

  useEffect(() => {
    if (!enableTagging) return
    setIsLoadingTags(true)
    getUserTags()
      .then(setAvailableTags)
      .catch((error) => console.error('Failed to load tags:', error))
      .finally(() => {
        setIsLoadingTags(false)
      })
  }, [enableTagging])

  const handleApplyTag = async (tagId: number, tagLabel: string) => {
    const transactionIds = sortedData.map((r) => r.t_id).join(',')
    const formData = new FormData()
    formData.append('tag_id', tagId.toString())
    formData.append('transaction_ids', transactionIds)
    try {
      await applyTagToTransactions(formData)
      if (typeof refreshFn === 'function') {
        refreshFn()
      }
    } catch (error) {
      console.error('Failed to apply tag:', error)
    }
  }

  const renderTransactionTags = (row: AccountLineItem) => (
    <div className="flex gap-1">
      {row.tags?.map((tag) => (
        <Badge
          key={tag.tag_id}
          variant="outline"
          className={`bg-${tag.tag_color}-200 text-${tag.tag_color}-800 cursor-pointer hover:opacity-80`}
          onClick={(e) => {
            e.stopPropagation()
            if (tagFilter === tag.tag_label) {
              setTagFilter('')
            } else {
              setTagFilter(tag.tag_label)
            }
          }}
        >
          {tag.tag_label}
        </Badge>
      ))}
    </div>
  )

  const handleSort = (field: keyof AccountLineItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const isCategoryColumnEmpty = useMemo(() => data.every((row) => !row.t_schc_category), [data])
  const isQtyColumnEmpty = useMemo(() => data.every((row) => !row.t_qty || Number(row.t_qty) === 0), [data])
  const isPriceColumnEmpty = useMemo(() => data.every((row) => !row.t_price || Number(row.t_price) === 0), [data])
  const isCommissionColumnEmpty = useMemo(() => data.every((row) => !row.t_commission || Number(row.t_commission) === 0), [data])
  const isFeeColumnEmpty = useMemo(() => data.every((row) => !row.t_fee || Number(row.t_fee) === 0), [data])
  const isTypeColumnEmpty = useMemo(() => data.every((row) => !row.t_type), [data])
  const isMemoColumnEmpty = useMemo(() => data.every((row) => !row.t_comment), [data])
  const isCusipColumnEmpty = useMemo(() => data.every((row) => !row.t_cusip), [data])
  const isSymbolColumnEmpty = useMemo(() => data.every((row) => !row.t_symbol), [data])
  const isOptionExpiryColumnEmpty = useMemo(() => data.every((row) => !row.opt_expiration), [data])
  const isOptionTypeColumnEmpty = useMemo(() => data.every((row) => !row.opt_type), [data])
  const isStrikeColumnEmpty = useMemo(() => data.every((row) => !row.opt_strike || Number(row.opt_strike) === 0), [data])
  const isTagsColumnEmpty = useMemo(() => data.every((row) => !row.tags || row.tags.length === 0), [data])

  const filteredData = data.filter(
    (row) =>
      (!dateFilter || row.t_date?.includes(dateFilter)) &&
      (!descriptionFilter || row.t_description?.toLowerCase().includes(descriptionFilter.toLowerCase())) &&
      (!typeFilter || (row.t_type || '-').toLowerCase().includes(typeFilter.toLowerCase())) &&
      (!categoryFilter || (row.t_schc_category || '-').toLowerCase().includes(categoryFilter.toLowerCase())) &&
      (!symbolFilter || row.t_symbol?.toLowerCase().includes(symbolFilter.toLowerCase())) &&
      (!cusipFilter || row.t_cusip?.toLowerCase().includes(cusipFilter.toLowerCase())) &&
      (!optExpirationFilter || row.opt_expiration?.includes(optExpirationFilter.toLowerCase())) &&
      (!optTypeFilter || row.opt_type?.toLowerCase().includes(optTypeFilter.toLowerCase())) &&
      (!memoFilter || (row.t_comment || '-').toLowerCase().includes(memoFilter.toLowerCase())) &&
      (!tagFilter ||
        (row.tags &&
          row.tags.some((tag) =>
            tagFilter
              .toLowerCase()
              .split(',')
              .map((t) => t.trim())
              .some((filterPart) => tag.tag_label.toLowerCase().includes(filterPart)),
          ))) &&
      (!amountFilter ||
        currency(row.t_amt || 0)
          .value.toString()
          .includes(amountFilter)),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    const direction = sortDirection === 'asc' ? 1 : -1
    if (aVal == null) return 1
    if (bVal == null) return -1
    return aVal < bVal ? -direction : direction
  })

  const totalAmount = sortedData.reduce((sum, row) => sum.add(currency(row.t_amt || 0)), currency(0))

  const handleUpdateTransactionComment = async (comment: string) => {
    console.log('Updating transaction comment', comment)
    if (typeof refreshFn === 'function') {
      refreshFn()
    }
  }

  return (
    <>
      <Table style={{ fontSize: '90%' }}>
        <thead>
          <tr>
            <th className="clickable dateCol" onClick={() => handleSort('t_date')}>
              Date {sortField === 't_date' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            {!isTypeColumnEmpty && (
              <th className="clickable" onClick={() => handleSort('t_type')}>
                Type {sortField === 't_type' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            )}
            <th className="clickable descriptionCol" onClick={() => handleSort('t_description')}>
              Description {sortField === 't_description' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            {!isTagsColumnEmpty && <th>Tags</th>}
            {!isQtyColumnEmpty && (
              <th className="clickable" onClick={() => handleSort('t_qty')}>
                Qty {sortField === 't_qty' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            )}
            {!isPriceColumnEmpty && (
              <th className="clickable" onClick={() => handleSort('t_price')}>
                Price {sortField === 't_price' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            )}
            {!isCommissionColumnEmpty && (
              <th className="clickable" onClick={() => handleSort('t_commission')}>
                Comm. {sortField === 't_commission' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            )}
            {!isFeeColumnEmpty && (
              <th className="clickable" onClick={() => handleSort('t_fee')}>
                Fee {sortField === 't_fee' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            )}
            <th className="clickable" onClick={() => handleSort('t_amt')}>
              Amount {sortField === 't_amt' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            {!isCategoryColumnEmpty && (
              <th className="clickable" onClick={() => handleSort('t_schc_category')}>
                Category {sortField === 't_schc_category' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            )}
            {!isCusipColumnEmpty && (
              <th className="clickable" onClick={() => handleSort('t_cusip')}>
                CUSIP {sortField === 't_cusip' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            )}
            {!isSymbolColumnEmpty && (
              <th className="clickable" onClick={() => handleSort('t_symbol')}>
                Symbol {sortField === 't_symbol' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            )}
            {!isOptionExpiryColumnEmpty && (
              <th className="clickable" onClick={() => handleSort('opt_expiration')}>
                Option Expiry {sortField === 'opt_expiration' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            )}
            {!isOptionTypeColumnEmpty && (
              <th className="clickable" onClick={() => handleSort('opt_type')}>
                Option Type {sortField === 'opt_type' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            )}
            {!isStrikeColumnEmpty && (
              <th className="clickable" onClick={() => handleSort('opt_strike')}>
                Strike {sortField === 'opt_strike' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            )}
            {!isMemoColumnEmpty && (
              <th className="clickable" onClick={() => handleSort('t_comment')} style={{ width: '200px' }}>
                Memo {sortField === 't_comment' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            )}
            {onDeleteTransaction && <th className="text-center">🗑️</th>}
          </tr>
          <tr>
            <th className="position-relative dateCol">
              <input
                className="w-full"
                type="text"
                placeholder="Filter date..."
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              {dateFilter && <ClearFilterButton onClick={() => setDateFilter('')} ariaLabel="Clear date filter" />}
            </th>
            {!isTypeColumnEmpty && (
              <th className="position-relative typeCol" style={{ width: '100px' }}>
                <input
                  className="w-full"
                  type="text"
                  placeholder="Filter type..."
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                />
                {typeFilter && <ClearFilterButton onClick={() => setTypeFilter('')} ariaLabel="Clear type filter" />}
              </th>
            )}
            <th className="position-relative descriptionCol">
              <input
                type="text"
                placeholder="Filter description..."
                value={descriptionFilter}
                onChange={(e) => setDescriptionFilter(e.target.value)}
              />
              {descriptionFilter && (
                <ClearFilterButton onClick={() => setDescriptionFilter('')} ariaLabel="Clear description filter" />
              )}
            </th>
            {!isTagsColumnEmpty && (
              <th className="position-relative">
                <input
                  type="text"
                  placeholder="Filter tags..."
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                />
                {tagFilter && <ClearFilterButton onClick={() => setTagFilter('')} ariaLabel="Clear tag filter" />}
              </th>
            )}
            {!isQtyColumnEmpty && <th></th>}
            {!isPriceColumnEmpty && <th></th>}
            {!isCommissionColumnEmpty && <th></th>}
            {!isFeeColumnEmpty && <th></th>}
            <th className="position-relative">
              <input
                type="text"
                placeholder="Filter amount..."
                value={amountFilter}
                onChange={(e) => setAmountFilter(e.target.value)}
              />
              {amountFilter && <ClearFilterButton onClick={() => setAmountFilter('')} ariaLabel="Clear amount filter" />}
            </th>
            {!isCategoryColumnEmpty && (
              <th className="position-relative" style={{ width: '140px' }}>
                <input
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
                <input
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
                <input
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
                <input
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
                <input
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
                <input
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
                className="dateCol"
                onClick={() => {
                  const formattedDate = row.t_date
                  if (dateFilter === formattedDate) {
                    setDateFilter('')
                  } else {
                    setDateFilter(formattedDate || '')
                  }
                }}
              >
                {row.t_date}
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
                  className="typeCol clickable"
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
                className="descriptionCol clickable"
              >
                {row.t_description}
              </td>
              {!isTagsColumnEmpty && <td className="tagsCol">{renderTransactionTags(row)}</td>}
              {!isQtyColumnEmpty && <td className={'numericCol'}>{row.t_qty != null ? row.t_qty.toLocaleString() : ''}</td>}
              {!isPriceColumnEmpty && (
                <td className={'numericCol'}>
                  {row.t_price != null ? currency(row.t_price, { symbol: '' }).format() : ''}
                </td>
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
                className={'numericCol clickable'}
                style={{
                  color: Number(row.t_amt) >= 0 ? 'green' : 'red',
                  whiteSpace: 'nowrap',
                }}
                onClick={() => {
                  const amt = currency(row.t_amt || 0, { symbol: '' }).format()
                  if (amountFilter === amt) {
                    setAmountFilter('')
                  } else {
                    setAmountFilter(amt)
                  }
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
                    🗑️
                  </button>
                </td>
              )}
              <td>
                <Button variant="outline" size="sm" onClick={() => setSelectedTransaction(row)}>
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="totalCell"></td>
            <td className="totalCell">
              <strong>Total</strong>
            </td>
            <td className="totalCell"></td>
            {!isTypeColumnEmpty && <td className="totalCell"></td>}
            {!isQtyColumnEmpty && <td className="totalCell"></td>}
            {!isPriceColumnEmpty && <td className="totalCell"></td>}
            {!isCommissionColumnEmpty && <td className="totalCell"></td>}
            {!isFeeColumnEmpty && <td className="totalCell"></td>}
            <td className="totalCell numericCol">
              <strong>{totalAmount.format()}</strong>
            </td>
            {!isCategoryColumnEmpty && <td className="totalCell"></td>}
            {!isCusipColumnEmpty && <td className="totalCell"></td>}
            {!isSymbolColumnEmpty && <td className="totalCell"></td>}
            {!isOptionExpiryColumnEmpty && <td className="totalCell"></td>}
            {!isOptionTypeColumnEmpty && <td className="totalCell"></td>}
            {!isStrikeColumnEmpty && <td className="totalCell"></td>}
            {!isMemoColumnEmpty && <td className="totalCell"></td>}
            {onDeleteTransaction && <td className="totalCell"></td>}
          </tr>
        </tfoot>
      </Table>

      {enableTagging && (
        <div className="mt-4 p-4 border rounded">
          <div className="flex flex-wrap items-center gap-4">
            <span>Apply tag to {sortedData.length} selected transactions:</span>
            {isLoadingTags ? (
              <Spinner size="small" />
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <TagApplyButton
                    key={tag.tag_id}
                    tagId={tag.tag_id}
                    tagLabel={tag.tag_label}
                    tagColor={tag.tag_color}
                    disabled={sortedData.length === 0}
                    onApplyTag={handleApplyTag}
                  />
                ))}
                <Link href="/finance/tags" className="ml-auto">
                  <Button variant="secondary" size="sm">
                    Manage Tags
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTransaction && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          onSave={handleUpdateTransactionComment}
        />
      )}
    </>
  )
}
