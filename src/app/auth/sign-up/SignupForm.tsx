'use client'

import { useState } from 'react'
import { z, ZodIssue } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { object, string } from 'zod'
import authClient from '@/lib/auth-client'
import router from 'next/router'

export const signUpSchema = object({
  name: string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  email: string({ required_error: 'Email is required' }).min(1, 'Email is required').email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: string({
    required_error: 'Confirm Password is required',
  }).min(1, 'Confirm Password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

function SignupForm() {
  const [formData, setFormData] = useState<z.infer<typeof signUpSchema>>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [apiError, setApiError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [validationErrors, setValidationErrors] = useState<ZodIssue[] | null>(null)

  const signupAsync = async () => {
    if (isLoading) return
    setApiError(null)
    setIsLoading(true)
    try {
      await authClient.signUp.email(formData, {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          router.push('/dashboard')
        },
        onError: (ctx: any) => {
          setApiError(ctx.error.message)
        },
      })
    } catch (error) {
      console.error('Signup error:', error)
      setApiError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        signupAsync()
      }}
      className="space-y-4"
    >
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
        <Label htmlFor="username">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  )
}

export default SignupForm
