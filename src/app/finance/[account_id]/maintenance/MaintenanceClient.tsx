'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Delete } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface Props {
  accountId: number
  accountName: string
  handleRename: (e: React.FormEvent, newName: string) => Promise<void>
  handleDelete: () => Promise<void>
}

export default function MaintenanceClient({
  accountId,
  accountName,
  handleRename: propHandleRename,
  handleDelete: propHandleDelete,
}: Props) {
  const [newName, setNewName] = useState(accountName)
  const [error, setError] = useState('')

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await propHandleRename(e, newName)
      window.location.reload()
    } catch (err) {
      setError('Failed to rename account')
    }
  }

  const handleDelete = async () => {
    try {
      await propHandleDelete()
      window.location.href = '/finance'
    } catch (err) {
      setError('Failed to delete account')
    }
  }

  return (
    <>
      <div className="mb-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Rename Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRename}>
              <label>
                Account Name
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required />
              </label>
              <button type="submit">Rename Account</button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <h3>Delete Account</h3>
        <p className="text-danger">Warning: This action cannot be undone.</p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Delete className="me-2" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this account? This action cannot be undone.
            </AlertDialogDescription>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={() => handleDelete()}>
                Yes, Delete Account
              </Button>
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}
