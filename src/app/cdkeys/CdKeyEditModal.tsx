'use client'
import { useState, useEffect } from 'react'
import { Button, Modal, Form, Spinner } from 'react-bootstrap'
import { CDKey, EditCDKeyFormData } from './types'

export interface EditModalProps {
  show: boolean
  onHide: () => void
  cdKey: CDKey | null
  onSave: (data: EditCDKeyFormData) => Promise<void>
}

export default function CdKeyEditModal({ show, onHide, cdKey, onSave }: EditModalProps) {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<EditCDKeyFormData>({
    computer_name: cdKey?.computer_name || '',
    comment: cdKey?.comment || '',
    used_on: cdKey?.used_on?.toISOString().split('T')[0] || '',
  })

  useEffect(() => {
    if (cdKey) {
      setFormData({
        computer_name: cdKey.computer_name || '',
        comment: cdKey.comment || '',
        used_on: cdKey.used_on?.toISOString().split('T')[0] || '',
      })
    }
  }, [cdKey])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cdKey || saving) return

    setSaving(true)
    try {
      await onSave(formData)
      onHide()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit CD Key</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Product ID</Form.Label>
            <Form.Control type="text" value={cdKey?.product_id || ''} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Key</Form.Label>
            <Form.Control type="text" value={cdKey?.product_key || ''} disabled style={{ fontFamily: 'monospace' }} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Computer Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.computer_name}
              onChange={(e) => setFormData({ ...formData, computer_name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Used On</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="date"
                value={formData.used_on}
                onChange={(e) => setFormData({ ...formData, used_on: e.target.value })}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setFormData({ ...formData, used_on: '' })}
                title="Clear date"
              >
                ✕
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
