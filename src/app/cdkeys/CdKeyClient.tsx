'use client'

import { useState, useMemo } from 'react'
import { z } from 'zod'
import productKeySchema from '@/lib/productKeySchema'
import { Button, Table, Badge, Form } from 'react-bootstrap'
import { ClearFilterButton } from '@/lib/ClearFilterButton'
import { CDKey, EditCDKeyFormData } from './types'
import { updateCDKey } from './actions'
import CdKeyEditModal from './CdKeyEditModal'
import ProductKeyModal from './ProductKeyModal'

type KeyArray = Array<z.infer<typeof productKeySchema>>

type CdKeyClientProps = {
  initialRows: KeyArray
}



export default function CdKeyClient({ initialRows }: CdKeyClientProps) {
  const [rows, setRows] = useState<KeyArray>(
    initialRows.sort((a, b) => (a.product_name || 'Unknown Product').localeCompare(b.product_name || 'Unknown Product')),
  )
  const [selectedKey, setSelectedKey] = useState<CDKey | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [selectedProductKey, setSelectedProductKey] = useState<string | null>(null)
  const [sortField, setSortField] = useState<keyof CDKey>('product_name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [productNameFilter, setProductNameFilter] = useState('')
  const [productKeyFilter, setProductKeyFilter] = useState('')
  const [commentFilter, setCommentFilter] = useState('')
  const [computerNameFilter, setComputerNameFilter] = useState('')

  const handleSort = (field: keyof CDKey) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const processedRows = useMemo(() => {
    // Apply filters
    let filteredRows = rows.filter(row => 
      (!productNameFilter || (row.product_name || '').toLowerCase().includes(productNameFilter.toLowerCase())) &&
      (!productKeyFilter || (row.product_key || '').toLowerCase().includes(productKeyFilter.toLowerCase())) &&
      (!commentFilter || (row.comment || '').toLowerCase().includes(commentFilter.toLowerCase())) &&
      (!computerNameFilter || (row.computer_name || '').toLowerCase().includes(computerNameFilter.toLowerCase()))
    )

    // Apply sorting
    return filteredRows.sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      const direction = sortDirection === 'asc' ? 1 : -1
      
      if (aVal == null) return 1
      if (bVal == null) return -1
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * direction
      }
      if (aVal instanceof Date && bVal instanceof Date) {
        return (aVal.getTime() - bVal.getTime()) * direction
      }
      return 0
    })
  }, [rows, sortField, sortDirection, productNameFilter, productKeyFilter, commentFilter, computerNameFilter])

  const handleSave = async (formData: EditCDKeyFormData) => {
    if (!selectedKey) return

    const result = await updateCDKey(selectedKey.id!, {
      computer_name: formData.computer_name || null,
      comment: formData.comment || null,
      used_on: formData.used_on || null,
    })

    if (result.success && result.updatedRow) {
      const parsedRow = productKeySchema.parse(result.updatedRow)
      const updatedRows = rows.map((oldRow) => (oldRow.id === parsedRow.id ? parsedRow : oldRow))
      setRows(updatedRows)
    } else {
      alert('Failed to update CD key')
    }
  }

  const handleViewFullKey = (key: string) => {
    setSelectedProductKey(key)
    setShowKeyModal(true)
  }

  const highlightMatch = (text: string, filter: string) => {
    if (!filter) return text
    const index = text.toLowerCase().indexOf(filter.toLowerCase())
    if (index === -1) return text
    return (
      <>
        {text.slice(0, index)}
        <span className="bg-warning">{text.slice(index, index + filter.length)}</span>
        {text.slice(index + filter.length)}
      </>
    )
  }

  const renderProductKey = (key: string | null | undefined) => {
    if (!key) {
      return <span className="text-muted">[No key]</span>
    }

    if (key.length > 50) {
      return (
        <Button variant="link" onClick={() => handleViewFullKey(key)} className="p-0">
          View Key
        </Button>
      )
    }
    return key
  }

  return (
    <div>
      <Table size="sm" striped>
        <thead>
          <tr>
            <th onClick={() => handleSort('product_name')} style={{ cursor: 'pointer' }}>
              Product Name {sortField === 'product_name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('product_key')} style={{ cursor: 'pointer' }}>
              Product Key {sortField === 'product_key' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('comment')} style={{ cursor: 'pointer' }}>
              Comment {sortField === 'comment' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('used_on')} style={{ cursor: 'pointer' }}>
              Used On {sortField === 'used_on' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('computer_name')} style={{ cursor: 'pointer' }}>
              Computer Name {sortField === 'computer_name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th>Actions</th>
          </tr>
          <tr>
            <th className="position-relative">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Filter product name..."
                value={productNameFilter}
                onChange={(e) => setProductNameFilter(e.target.value)}
              />
              {productNameFilter && (
                <ClearFilterButton onClick={() => setProductNameFilter('')} ariaLabel="Clear product name filter" />
              )}
            </th>
            <th className="position-relative">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Filter product key..."
                value={productKeyFilter}
                onChange={(e) => setProductKeyFilter(e.target.value)}
              />
              {productKeyFilter && (
                <ClearFilterButton onClick={() => setProductKeyFilter('')} ariaLabel="Clear product key filter" />
              )}
            </th>
            <th className="position-relative">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Filter comment..."
                value={commentFilter}
                onChange={(e) => setCommentFilter(e.target.value)}
              />
              {commentFilter && (
                <ClearFilterButton onClick={() => setCommentFilter('')} ariaLabel="Clear comment filter" />
              )}
            </th>
            <th></th>
            <th className="position-relative">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Filter computer name..."
                value={computerNameFilter}
                onChange={(e) => setComputerNameFilter(e.target.value)}
              />
              {computerNameFilter && (
                <ClearFilterButton onClick={() => setComputerNameFilter('')} ariaLabel="Clear computer name filter" />
              )}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {processedRows.map((key) => (
            <tr key={key.product_key}>
              <td>{highlightMatch(key.product_name || 'Unknown Product', productNameFilter)}</td>
              <td style={{ whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                {key.product_key && key.product_key.length > 50 
                  ? renderProductKey(key.product_key)
                  : highlightMatch(key.product_key || '', productKeyFilter)}
              </td>
              <td>
                {key.comment}
                {key.product_id && (
                  <Badge bg="secondary" className="ms-2">
                    ID: {key.product_id}
                  </Badge>
                )}
              </td>
              <td style={{ whiteSpace: 'nowrap' }}>{key.used_on?.toISOString()?.slice(0, 10)}</td>
              <td>{key.computer_name}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => {
                    setSelectedKey(key)
                    setShowEditModal(true)
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showEditModal && selectedKey && (
        <CdKeyEditModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          cdKey={selectedKey}
          onSave={handleSave}
        />
      )}

      {showKeyModal && selectedProductKey && (
        <ProductKeyModal show={showKeyModal} productKey={selectedProductKey} onHide={() => setShowKeyModal(false)} />
      )}
    </div>
  )
}
