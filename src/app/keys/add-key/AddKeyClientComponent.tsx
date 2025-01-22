'use client'

import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'

type AddProductKeyProps = {
  addProductKey: (formData: FormData) => Promise<void>
  productNames: string[]
}

export default function AddKeyClientComponent({ addProductKey, productNames }: AddProductKeyProps) {
  const [validated, setValidated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedProductName, setSelectedProductName] = useState<string[]>([])

  const handleProductNameChange = (selected: any[]) => {
    // If it's a new option, take the first item, otherwise use the selected value
    const newProductName = selected.length > 0 ? (selected[0] as { label: string }).label || selected[0] : []
    setSelectedProductName(newProductName ? [newProductName] : [])
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    // Reset previous states
    setError(null)
    setValidated(false)

    if (form.checkValidity() === false || selectedProductName.length === 0) {
      event.stopPropagation()
      setValidated(true)
      return
    }

    const formData = new FormData(form)
    formData.set('productName', selectedProductName[0])

    try {
      // Set submitting state to prevent multiple submissions
      setIsSubmitting(true)

      await addProductKey(formData)
    } catch (error) {
      // Handle and display error
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'

      setError(errorMessage)
      console.error('Error adding product key:', error)
    } finally {
      // Always reset submitting state
      setIsSubmitting(false)
    }
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              {/* <Typeahead
                id="product-name-typeahead"
                labelKey="name"
                onChange={handleProductNameChange}
                options={productNames}
                placeholder="Select or enter product name"
                selected={selectedProductName}
                allowNew
                newSelectionPrefix="Create new product: "
                disabled={isSubmitting}
              /> */}
              <input
                type="text"
                name="productName"
                placeholder="Enter product name"
                value={selectedProductName[0] || ''}
                onChange={(e) => setSelectedProductName([e.target.value])}
                required
                disabled={isSubmitting}
              />
              {selectedProductName.length === 0 && validated && (
                <div className="text-danger small">Please provide a product name.</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="productKey">
              <Form.Label>License Key</Form.Label>
              <Form.Control
                as="textarea"
                name="productKey"
                rows={4}
                placeholder="Enter license key"
                style={{ resize: 'vertical', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                required
                disabled={isSubmitting}
              />
              <Form.Control.Feedback type="invalid">Please provide a license key.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="usedOn">
              <Form.Label>Used On (Optional)</Form.Label>
              <Form.Control type="date" name="usedOn" placeholder="Select date when key was used" disabled={isSubmitting} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="computerName">
              <Form.Label>Computer Name (Optional)</Form.Label>
              <Form.Control type="text" name="computerName" placeholder="Enter computer name" disabled={isSubmitting} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="comment">
              <Form.Label>Comment (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                rows={3}
                placeholder="Enter any additional notes"
                disabled={isSubmitting}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding License Key...' : 'Add License Key'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
