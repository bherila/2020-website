'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ClearFilterButton } from '@/lib/ClearFilterButton'
import { EditCDKeyFormData } from './types'
import { updateCDKey } from './actions'
import CdKeyEditModal from './CdKeyEditModal'
import ProductKeyModal from './ProductKeyModal'
import { ProductKey, ProductKeySchema } from '@/lib/prisma-generated-zod'

type CdKeyClientProps = {
  initialRows: ProductKey[]
}

export default function CdKeyClient({ initialRows }: CdKeyClientProps) {
  const [rows, setRows] = useState<ProductKey[]>(
    initialRows.sort((a, b) => (a.productName || 'Unknown Product').localeCompare(b.productName || 'Unknown Product')),
  )
  const [selectedKey, setSelectedKey] = useState<ProductKey | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [selectedProductKey, setSelectedProductKey] = useState<string | null>(null)
  const [sortField, setSortField] = useState<keyof ProductKey>('productName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [productNameFilter, setProductNameFilter] = useState('')
  const [productKeyFilter, setProductKeyFilter] = useState('')
  const [commentFilter, setCommentFilter] = useState('')
  const [computerNameFilter, setComputerNameFilter] = useState('')

  const handleSort = (field: keyof ProductKey) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const processedRows = useMemo(() => {
    // Apply filters
    let filteredRows = rows.filter(
      (row) =>
        (!productNameFilter || (row.productName || '').toLowerCase().includes(productNameFilter.toLowerCase())) &&
        (!productKeyFilter || (row.productKey || '').toLowerCase().includes(productKeyFilter.toLowerCase())) &&
        (!commentFilter || (row.comment || '').toLowerCase().includes(commentFilter.toLowerCase())) &&
        (!computerNameFilter || (row.computerName || '').toLowerCase().includes(computerNameFilter.toLowerCase())),
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
      return 0
    })
  }, [rows, sortField, sortDirection, productNameFilter, productKeyFilter, commentFilter, computerNameFilter])

  const handleSave = async (formData: EditCDKeyFormData) => {
    if (!selectedKey) return

    const result = await updateCDKey(selectedKey.id!, {
      computerName: formData.computerName || null,
      comment: formData.comment || null,
      usedOn: formData.usedOn || null,
    })

    if (result.success && result.updatedRow) {
      const parsedRow = ProductKeySchema.parse(result.updatedRow)
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('productName')} className="cursor-pointer">
              Product Name {sortField === 'productName' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead onClick={() => handleSort('productKey')} className="cursor-pointer">
              License Key {sortField === 'productKey' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead onClick={() => handleSort('comment')} className="cursor-pointer">
              Comment {sortField === 'comment' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead onClick={() => handleSort('usedOn')} className="cursor-pointer">
              Used On {sortField === 'usedOn' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead onClick={() => handleSort('computerName')} className="cursor-pointer">
              Computer Name {sortField === 'computerName' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="relative flex items-center">
                <Input
                  placeholder="Filter product name..."
                  value={productNameFilter}
                  onChange={(e) => setProductNameFilter(e.target.value)}
                  className="pr-8"
                />
                {productNameFilter && (
                  <ClearFilterButton onClick={() => setProductNameFilter('')} ariaLabel="Clear product name filter" />
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="relative flex items-center">
                <Input
                  placeholder="Filter product key..."
                  value={productKeyFilter}
                  onChange={(e) => setProductKeyFilter(e.target.value)}
                  className="pr-8"
                />
                {productKeyFilter && (
                  <ClearFilterButton onClick={() => setProductKeyFilter('')} ariaLabel="Clear product key filter" />
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="relative flex items-center">
                <Input
                  placeholder="Filter comment..."
                  value={commentFilter}
                  onChange={(e) => setCommentFilter(e.target.value)}
                  className="pr-8"
                />
                {commentFilter && (
                  <ClearFilterButton onClick={() => setCommentFilter('')} ariaLabel="Clear comment filter" />
                )}
              </div>
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <div className="relative flex items-center">
                <Input
                  placeholder="Filter computer name..."
                  value={computerNameFilter}
                  onChange={(e) => setComputerNameFilter(e.target.value)}
                  className="pr-8"
                />
                {computerNameFilter && (
                  <ClearFilterButton onClick={() => setComputerNameFilter('')} ariaLabel="Clear computer name filter" />
                )}
              </div>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {processedRows.map((key) => (
            <TableRow key={key.productKey}>
              <TableCell>{highlightMatch(key.productName || 'Unknown Product', productNameFilter)}</TableCell>
              <TableCell className="whitespace-nowrap font-mono">
                {key.productKey && key.productKey.length > 50
                  ? renderProductKey(key.productKey)
                  : highlightMatch(key.productKey || '', productKeyFilter)}
              </TableCell>
              <TableCell>
                {key.comment}
                {key.productId && <Badge className="ml-2">ID: {key.productId}</Badge>}
              </TableCell>
              <TableCell className="whitespace-nowrap">{key.usedOn}</TableCell>
              <TableCell>{key.computerName}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedKey(key)
                    setShowEditModal(true)
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
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
