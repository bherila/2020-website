'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { renameAccount } from './actions/rename-account'

interface Props {
  accountId: number
  accountName: string
}

export default function MaintenanceClient({ accountId, accountName }: Props) {
  const [newName, setNewName] = useState(accountName)
  const [error, setError] = useState('')

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await renameAccount(accountId.toString(), newName)
      window.location.reload()
    } catch (err) {
      setError('Failed to rename account')
    }
  }

  return (
    <>
      <Card className="shadow-sm mb-6 w-100">
        <CardHeader>
          <CardTitle>Rename Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRename} className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="account-name">Account Name</Label>
              <Input id="account-name" value={newName} onChange={(e) => setNewName(e.target.value)} required />
            </div>
            <Button type="submit">Save New Name</Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
