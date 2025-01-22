'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useForm } from 'react-hook-form'

type AddProductKeyProps = {
  addProductKey: (formData: FormData) => Promise<void>
  productNames: string[]
}

export default function AddKeyClientComponent({ addProductKey, productNames }: AddProductKeyProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const form = useForm()

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const formData = new FormData()
      Object.entries(form.getValues()).forEach(([key, value]) => {
        if (value) formData.set(key, value)
      })
      await addProductKey(formData)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      setError(errorMessage)
      console.error('Error adding product key:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            placeholder="Enter product name"
            {...form.register('productName', { required: true })}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productKey">License Key</Label>
          <Textarea
            id="productKey"
            placeholder="Enter license key"
            rows={4}
            {...form.register('productKey', { required: true })}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="usedOn">Used On (Optional)</Label>
          <Input id="usedOn" type="date" {...form.register('usedOn')} disabled={isSubmitting} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="computerName">Computer Name (Optional)</Label>
          <Input
            id="computerName"
            placeholder="Enter computer name"
            {...form.register('computerName')}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">Comment (Optional)</Label>
          <Textarea
            id="comment"
            placeholder="Enter any additional notes"
            rows={3}
            {...form.register('comment')}
            disabled={isSubmitting}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding License Key...' : 'Add License Key'}
        </Button>
      </form>
    </div>
  )
}
