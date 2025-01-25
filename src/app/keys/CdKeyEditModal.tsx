'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { EditCDKeyFormData } from './types'
import { deleteCDKey } from './actions'
import { ProductKey } from '@/lib/prisma-generated-zod'

export interface EditModalProps {
  show: boolean
  onHide: () => void
  cdKey: ProductKey | null
  onSave: (data: EditCDKeyFormData) => Promise<void>
}

export default function CdKeyEditModal({ show, onHide, cdKey, onSave }: EditModalProps) {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<EditCDKeyFormData>({
    computerName: cdKey?.computerName || '',
    comment: cdKey?.comment || '',
    usedOn: cdKey?.usedOn || '',
  })

  useEffect(() => {
    if (cdKey) {
      setFormData({
        computerName: cdKey.computerName || '',
        comment: cdKey.comment || '',
        usedOn: cdKey.usedOn || '',
      })
    }
  }, [cdKey])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cdKey || saving) return

    setSaving(true)
    try {
      await onSave(formData)
      onHide()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit CD Key</DialogTitle>
          <DialogDescription>Make changes to the CD key details</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Product ID</Label>
              <Input type="text" value={cdKey?.productId || ''} disabled />
            </div>
            <div className="space-y-2">
              <Label>Product Key</Label>
              <Input type="text" value={cdKey?.productKey || ''} disabled className="font-mono" />
            </div>
            <div className="space-y-2">
              <Label>Computer Name</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={formData.computerName || ''}
                  onChange={(e) => setFormData({ ...formData, computerName: e.target.value })}
                />
                <Button variant="outline" size="sm" onClick={() => setFormData({ ...formData, computerName: '' })}>
                  Clear
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Comment</Label>
              <textarea
                rows={5}
                className="w-full rounded-md border p-2"
                value={formData.comment || ''}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              />
              <div className="text-right">
                <Button variant="outline" size="sm" onClick={() => setFormData({ ...formData, comment: '' })}>
                  Clear
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Used On</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  value={formData.usedOn}
                  onChange={(e) => setFormData({ ...formData, usedOn: e.target.value })}
                />
                <Button variant="outline" size="sm" onClick={() => setFormData({ ...formData, usedOn: '' })}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onHide}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (confirm('Are you sure you want to delete this key?')) {
                  setSaving(true)
                  try {
                    const result = await deleteCDKey(cdKey?.id!)
                    if (result.success) {
                      onHide()
                    } else {
                      alert(result.error || 'Failed to delete key')
                    }
                  } finally {
                    setSaving(false)
                  }
                }
              }}
              disabled={saving}
            >
              Delete
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Spinner className="mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
