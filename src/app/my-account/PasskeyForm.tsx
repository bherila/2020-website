'use client'

import { useState } from 'react'
import { startRegistration } from '@simplewebauthn/browser'
import { Button, Alert } from 'react-bootstrap'

export default function PasskeyForm() {
  const [status, setStatus] = useState<'idle' | 'registering' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string>('')

  async function handleRegister() {
    try {
      setStatus('registering')
      setError('')

      // Get registration options from server
      const optionsRes = await fetch('/api/auth/passkey/register-options')
      const options = await optionsRes.json()

      // Start registration
      const registration = await startRegistration(options)

      // Verify registration with server
      const verifyRes = await fetch('/api/auth/passkey/register-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registration)
      })

      if (!verifyRes.ok) {
        throw new Error('Failed to register passkey')
      }

      setStatus('success')
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Failed to register passkey')
      setStatus('error')
    }
  }

  return (
    <div>
      {status === 'success' && (
        <Alert variant="success" className="mb-3">
          Passkey registered successfully
        </Alert>
      )}
      {status === 'error' && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}
      <Button
        variant="primary"
        onClick={handleRegister}
        disabled={status === 'registering'}
      >
        {status === 'registering' ? 'Registering...' : 'Register Passkey'}
      </Button>
    </div>
  )
}
