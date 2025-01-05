'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ProductKeyModalProps {
  show: boolean
  productKey: string | null
  onHide: () => void
}

export default function ProductKeyModal({ show, productKey, onHide }: ProductKeyModalProps) {
  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Full Product Key</DialogTitle>
          <DialogDescription>View and copy the complete product key</DialogDescription>
        </DialogHeader>
        <Textarea rows={10} value={productKey || ''} readOnly className="font-mono" />
        <DialogFooter>
          <Button variant="outline" onClick={onHide}>
            Close
          </Button>
          <Button
            onClick={() => {
              if (productKey) {
                navigator.clipboard.writeText(productKey)
                alert('Key copied to clipboard')
              }
            }}
          >
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
