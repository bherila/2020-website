'use client'

import { Modal, Button, Form } from 'react-bootstrap'

interface ProductKeyModalProps {
  show: boolean
  productKey: string | null
  onHide: () => void
}

export default function ProductKeyModal({ show, productKey, onHide }: ProductKeyModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Full Product Key</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control as="textarea" rows={10} value={productKey || ''} readOnly className="font-monospace" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (productKey) {
              navigator.clipboard.writeText(productKey)
              alert('Key copied to clipboard')
            }
          }}
        >
          Copy
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
