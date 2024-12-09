'use client'
import { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { AccountLineItem } from '@/lib/AccountLineItem'
import SimpleMuiAlert from '@/components/SimpleMuiAlert'

interface Props {
  accountId: number
  accountName: string
  handleRename: (e: React.FormEvent, newName: string) => Promise<void>
  handleDelete: () => Promise<void>
}

export default function MaintenanceClient({
  accountId,
  accountName,
  handleRename: propHandleRename,
  handleDelete: propHandleDelete,
}: Props) {
  const [newName, setNewName] = useState(accountName)
  const [error, setError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await propHandleRename(e, newName)
      window.location.reload()
    } catch (err) {
      setError('Failed to rename account')
    }
  }

  const handleDelete = async () => {
    try {
      await propHandleDelete()
      window.location.href = '/finance'
    } catch (err) {
      setError('Failed to delete account')
    }
  }

  return (
    <>
      <Row className="mb-4">
        <Col md={6}>
          <h3>Rename Account</h3>
          <Form onSubmit={handleRename}>
            <Form.Group className="mb-3">
              <Form.Label>Account Name</Form.Label>
              <Form.Control type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required />
            </Form.Group>
            <Button type="submit" variant="primary">
              Rename Account
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h3>Delete Account</h3>
          <p className="text-danger">Warning: This action cannot be undone.</p>
          <Button onClick={() => setShowDeleteConfirm(true)} variant="danger">
            Delete Account
          </Button>
        </Col>
      </Row>

      <SimpleMuiAlert open={!!error} onClose={() => setError('')} text={error} />

      <SimpleMuiAlert open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
        <p>Are you sure you want to delete this account? This action cannot be undone.</p>
        <Button onClick={handleDelete} variant="danger" className="me-2">
          Yes, Delete Account
        </Button>
        <Button onClick={() => setShowDeleteConfirm(false)} variant="secondary">
          Cancel
        </Button>
      </SimpleMuiAlert>
    </>
  )
}
