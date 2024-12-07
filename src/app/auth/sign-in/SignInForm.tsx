'use client'
import { useState } from 'react'
import { redirect } from 'next/navigation'
import Container from '@/components/container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'

export default function SignInForm(props: any) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loggedIn, setLoggedIn] = useState(false)
  const xs = 3
  return (
    <Container fluid>
      {loggedIn && redirect('/')}
      <Form.Group as={Row} className="mb-3" controlId="email">
        <Form.Label column xs={xs}>
          Email
        </Form.Label>
        <Col xs={12 - xs}>
          <Form.Control
            type="email"
            required
            aria-required="true"
            aria-label="Enter your email"
            name="email"
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
            aria-required="true"
            aria-label="Enter your password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </Col>
      </Form.Group>

      <Row>
        <Col xs={xs}></Col>
        <Col xs={12 - xs}>
          <Button style={{ marginRight: '1rem' }} variant="primary" type="submit" aria-label="Sign in" aria-live="polite">
            Sign in
          </Button>
          <Link href="reset-password">Forgot password?</Link>
        </Col>
      </Row>
    </Container>
  )
}
