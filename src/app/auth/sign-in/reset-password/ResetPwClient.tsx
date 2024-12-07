'use client'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'

export default function ResetPwClient() {
  return (
    <>
      <Form.Group as={Row} className="mb-3" controlId="email">
        <Form.Label column xs={3}>
          Email
        </Form.Label>
        <Col xs={9}>
          <Form.Control
            type="email"
            required
            aria-required="true"
            aria-label="Enter your email"
            name="email"
            placeholder="Enter your email"
          />
        </Col>
      </Form.Group>
      <Row>
        <Col xs={3}></Col>
        <Col xs={9}>
          <Button style={{ marginRight: '1rem' }} type="submit">
            Send Reset Link
          </Button>
          <Link href="../">Go to Sign In</Link>
        </Col>
      </Row>
    </>
  )
}
