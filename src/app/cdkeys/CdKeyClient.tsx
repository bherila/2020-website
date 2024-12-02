'use client'

import { useState, useMemo } from 'react'
import { z } from 'zod'
import productKeySchema from '@/lib/productKeySchema'
import { Button, Table, Badge } from 'react-bootstrap'
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

  const processedRows = useMemo(() => {
    const sortedRows = [...rows].sort((a, b) =>
      (a.product_name || 'Unknown Product').localeCompare(b.product_name || 'Unknown Product'),
    )

    const groupedRows: Array<{
      productName: string
      rows: KeyArray
    }> = []

    sortedRows.forEach((row) => {
      const productName = row.product_name || 'Unknown Product'
      const lastGroup = groupedRows[groupedRows.length - 1]

      if (!lastGroup || lastGroup.productName !== productName) {
        groupedRows.push({ productName, rows: [row] })
      } else {
        lastGroup.rows.push(row)
      }
    })

    return groupedRows
  }, [rows])

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
      setRows(
        updatedRows.sort((a, b) =>
          (a.product_name || 'Unknown Product').localeCompare(b.product_name || 'Unknown Product'),
        ),
      )
    } else {
      alert('Failed to update CD key')
    }
  }

  const handleViewFullKey = (key: string) => {
    setSelectedProductKey(key)
    setShowKeyModal(true)
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
            <th>Product Name</th>
            <th>Product Key</th>
            <th>Comment</th>
            <th>Used On</th>
            <th>Computer Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {processedRows.map(({ productName, rows: groupRows }) =>
            groupRows.map((key, index) => (
              <tr key={key.product_key}>
                {index === 0 && <td rowSpan={groupRows.length}>{productName}</td>}
                <td style={{ whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{renderProductKey(key.product_key)}</td>
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
            )),
          )}
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
