import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { fin_payslip, fin_payslip_schema } from '@/app/payslip/payslipDbCols'

interface PayslipEditProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: fin_payslip
  onSave: (newValue: fin_payslip) => void
}

const CustomModal: React.FC<PayslipEditProps> = ({ open, onOpenChange, value, onSave }) => {
  const { other, ...x } = value
  const [editedValue, setEditedValue] = useState(JSON.stringify(x, null, 2))
  const [editedOther, setEditedOther] = useState(JSON.stringify(other, null, 2))
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Payslip</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <textarea
            className="w-full font-mono p-2 border rounded"
            rows={20}
            value={editedValue}
            onChange={(x) => setEditedValue(x.currentTarget.value)}
          />
          <textarea
            className="w-full font-mono p-2 border rounded"
            rows={20}
            value={editedOther}
            onChange={(e) => setEditedOther(e.currentTarget.value)}
          />
          <Button
            onClick={(e) => {
              e.preventDefault()
              let val = JSON.parse(editedValue)
              val.other = JSON.parse(editedOther)
              onSave(fin_payslip_schema.parse(val))
            }}
          >
            Save
          </Button>
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
      <CustomModal open={open} onOpenChange={setOpen} value={props.content} onSave={props.onSave} />
    </div>
  )
}

export default PayslipEditButton
