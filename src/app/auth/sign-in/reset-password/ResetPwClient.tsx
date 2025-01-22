'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function ResetPwClient() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          required
          aria-required="true"
          aria-label="Enter your email"
          name="email"
          placeholder="Enter your email"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit">Send Reset Link</Button>
        <Button variant="outline" asChild>
          <Link href="../">Go to Sign In</Link>
        </Button>
      </div>
    </div>
  )
}
