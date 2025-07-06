'use client'

import { useSearchParams } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

export function SignOutAlert() {
  const searchParams = useSearchParams()
  const signedOut = searchParams.get('signedOut')

  if (signedOut === 'true') {
    return (
      <div className="my-4">
        <Alert variant="success">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Signed Out</AlertTitle>
          <AlertDescription>
            You have been signed out successfully.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return null
}
