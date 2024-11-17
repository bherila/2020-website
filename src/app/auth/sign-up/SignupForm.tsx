'use client'

import { SignupZod } from '@/app/auth/SignupSchema'
import { SignupAction } from '@/app/auth/SignupAction'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { z, ZodIssue } from 'zod'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    inviteCode: '',
  })

  const [validationErrors, setValidationErrors] = useState<ZodIssue[] | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    try {
      SignupZod.parse(formData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.errors)
      }
      event.preventDefault()
    }
  }

  const xs = 4
  return (
    <Form onSubmit={handleSubmit} action={SignupAction}>
      {validationErrors && (
        <Alert variant="danger">
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form.Group as={Row} className="mb-3" controlId="username">
        <Form.Label column xs={xs}>
          Username
        </Form.Label>
        <Col xs={12 - xs}>
          <Form.Control
            autoFocus
            type="text"
            placeholder="Enter your username"
            required
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="email">
        <Form.Label column xs={xs}>
          Email
        </Form.Label>
        <Col xs={12 - xs}>
          <Form.Control
            type="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="password">
        <Form.Label column xs={xs}>
          Password
        </Form.Label>
        <Col xs={12 - xs}>
          <Form.Control
            type="password"
            required
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
        <Form.Label column xs={xs}>
          Confirm Password
        </Form.Label>
        <Col xs={12 - xs}>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="inviteCode">
        <Form.Label column xs={xs}>
          Invite Code (Optional)
        </Form.Label>
        <Col xs={12 - xs}>
          <Form.Control
            type="text"
            placeholder="Enter your invite code"
            value={formData.inviteCode}
            onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
          />
        </Col>
      </Form.Group>

      <Row>
        <Col xs={xs}></Col>
        <Col xs={12 - xs}>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SignupForm
