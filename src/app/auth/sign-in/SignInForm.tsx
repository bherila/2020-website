'use client'
import { useState } from 'react'
import { redirect } from 'next/navigation'
import { startAuthentication } from '@simplewebauthn/browser'
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
          <Button variant="primary" type="submit" aria-label="Sign in" aria-live="polite">
            Sign in
          </Button>
          <Button 
            variant="secondary" 
            className="ms-2"
            onClick={async (e) => {
              e.preventDefault()
              try {
                const optionsRes = await fetch('/api/auth/passkey/auth-options')
                const options = await optionsRes.json()
                const auth = await startAuthentication(options)
                const verifyRes = await fetch('/api/auth/passkey/auth-verify', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(auth)
                })
                if (verifyRes.ok) {
                  window.location.href = '/'
                }
              } catch (err) {
                console.error(err)
              }
            }}
          >
            Sign in with passkey
          </Button>
          <div className="mt-3">
            <Link href="/auth/reset-password">Forgot password?</Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
