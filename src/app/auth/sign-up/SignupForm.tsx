'use client'

import { SignupZod } from '@/app/auth/SignupSchema'
import { SignupAction } from '@/app/auth/SignupAction'
import { useState } from 'react'
import { z, ZodIssue } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

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
        event.preventDefault()
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} action={SignupAction} className="space-y-4">
      {validationErrors && (
        <Alert variant="destructive">
          <AlertDescription>
            <ul className="list-disc pl-4">
              {validationErrors.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          required
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          required
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="inviteCode">Invite Code (Optional)</Label>
        <Input
          id="inviteCode"
          type="text"
          placeholder="Enter your invite code"
          value={formData.inviteCode}
          onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
        />
      </div>
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  )
}

export default SignupForm
