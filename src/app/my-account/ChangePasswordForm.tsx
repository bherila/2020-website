'use client'

import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'

export default function ChangePasswordForm(props: { changePasswordAction: (formData: FormData) => Promise<void> }) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const formData = new FormData()
    formData.append('password', password)

    try {
      await props.changePasswordAction(formData)
      setSuccess(true)
      setError(null)
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError('Failed to change password')
      setSuccess(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Password changed successfully</Alert>}

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter new password"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm new password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Change Password
      </Button>
    </Form>
  )
}
