'use client'
import { useState, useMemo } from 'react'
import { z } from 'zod'
import productKeySchema from '@/lib/productKeySchema'
import { Button, Table } from 'react-bootstrap'
import { CDKey, EditCDKeyFormData } from './types'
import { updateCDKey } from './actions'
import CdKeyEditModal from './CdKeyEditModal'

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

  const handleEdit = (key: CDKey) => {
    setSelectedKey(key)
    setShowEditModal(true)
  }

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

  return (
    <div>
      <Table size="sm" bordered>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Key</th>
            <th>Computer Name</th>
            <th>Comment</th>
            <th>Product ID</th>
            <th>Used On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {processedRows.map(({ productName, rows: groupRows }) =>
            groupRows.map((key, index) => (
              <tr key={key.product_key}>
                {index === 0 && <td rowSpan={groupRows.length}>{productName}</td>}
                <td style={{ whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{key.product_key}</td>
                <td>{key.computer_name}</td>
                <td>{key.comment}</td>
                <td>{key.product_id}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{key.used_on?.toISOString()?.slice(0, 10)}</td>
                <td>
                  <Button size="sm" variant="outline-primary" onClick={() => handleEdit(key)}>
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
    </div>
  )
}
