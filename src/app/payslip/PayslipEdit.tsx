import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { fin_payslip, fin_payslip_schema } from '@/app/payslip/payslipDbCols'
import { Trash2 } from 'lucide-react'
import { deletePayslip } from '@/app/payslip/entry/actions'
import { Textarea } from '@/components/ui/textarea'

interface PayslipEditProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: fin_payslip
  onSave: (newValue: fin_payslip) => void
  onDelete?: () => void
}

const CustomModal: React.FC<PayslipEditProps> = ({ open, onOpenChange, value, onSave, onDelete }) => {
  const { other, ...x } = value
  const [editedValue, setEditedValue] = useState(JSON.stringify(x, null, 2))
  const [editedOther, setEditedOther] = useState(JSON.stringify(other ?? {}, null, 2))
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deletePayslip({
        period_start: value.period_start,
        period_end: value.period_end,
        pay_date: value.pay_date,
      })
      onDelete?.()
    } catch (error) {
      console.error('Failed to delete payslip:', error)
      // TODO: Add user-friendly error handling
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSave = () => {
    try {
      let val = JSON.parse(editedValue)
      val.other = editedOther ? JSON.parse(editedOther) : null
      onSave(fin_payslip_schema.parse(val))
    } catch (error) {
      console.error('Failed to parse or validate payslip:', error)
      // TODO: Add user-friendly error handling
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Payslip</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            className="w-full font-mono"
            rows={20}
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
          />
          <Textarea
            className="w-full font-mono"
            rows={10}
            placeholder="Other (optional JSON)"
            value={editedOther}
            onChange={(e) => setEditedOther(e.target.value)}
          />
          <div className="flex justify-between">
            <Button onClick={handleSave}>Save</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Payslip</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this payslip for the pay period {value.period_start} to{' '}
                    {value.period_end}?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PayslipEditButton(props: { content: fin_payslip; onSave: (newValue: fin_payslip) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <CustomModal
        open={open}
        onOpenChange={setOpen}
        value={props.content}
        onSave={props.onSave}
        onDelete={() => setOpen(false)}
      />
    </div>
  )
}

export default PayslipEditButton
