import { ReactNode } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogClose } from '@/components/ui/dialog'
import Button from './button'

interface SimpleMuiAlertProps {
  children?: ReactNode
  onClose: () => void
  text?: string
  open: boolean
}

export default function SimpleMuiAlert(props: SimpleMuiAlertProps) {
  const { children, text, open, onClose } = props

  return (
    <Dialog open={open}>
      <DialogContent>
        {children}
        {text}
      </DialogContent>
      <DialogFooter>
        <Button onClick={onClose}>Close</Button>
      </DialogFooter>
    </Dialog>
  )
}
