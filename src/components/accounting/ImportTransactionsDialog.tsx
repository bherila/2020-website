import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import * as React from 'react'

import { AccountingDbRow } from '@/lib/accounting-row'
import { parseDate } from '@/lib/DateHelper'

import { StockOptionSchema } from '../matcher'
import { TableColDefinition } from './AccountingTable'

export interface FormDialogProps {
  onImport: null | ((res: AccountingDbRow[]) => void)
  columns: TableColDefinition[]
  accountID: string
}

export default function FormDialog(props: FormDialogProps) {
  const { onImport } = props
  const columns = props.columns.filter((r) => !r.hide)
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleImport = () => {
    const result: AccountingDbRow[] = []
    const rows = value.split('\n').filter(Boolean)
    rows.map((row) => {
      const inputCols = row.split('\t')
      const record: AccountingDbRow = {}
      for (let colIndex = 0; colIndex < inputCols.length; ++colIndex) {
        if (colIndex >= columns.length) {
          break
        }
        switch (columns[colIndex].id) {
          case 't_id':
            record.t_id = parseInt(inputCols[colIndex])
            break
          case 't_account':
            record.t_account = inputCols[colIndex]
            break
          case 't_date':
            record.t_date = parseDate(inputCols[colIndex])?.formatYMD()
            break
          case 't_type':
            record.t_type = inputCols[colIndex] as any
            break
          case 't_symbol':
            record.t_symbol = inputCols[colIndex]
            break
          case 't_qty':
            record.t_qty = parseFloat(inputCols[colIndex])
            break
          case 't_amt':
            record.t_amt = parseFloat(inputCols[colIndex])
            break
          case 't_price':
            record.t_price = parseFloat(inputCols[colIndex])
            break
          case 't_commission':
            record.t_commission = parseFloat(inputCols[colIndex])
            break
          case 't_fee':
            record.t_fee = parseFloat(inputCols[colIndex])
            break
          case 't_method':
            record.t_method = inputCols[colIndex]
            break
          case 't_source':
            record.t_source = inputCols[colIndex]
            break
          case 't_origin':
            record.t_origin = inputCols[colIndex]
            break
          case 't_description':
            record.t_description = inputCols[colIndex]
            break
          case 't_comment':
            record.t_comment = inputCols[colIndex]
            break
          case 'opt_expiration':
            record.opt_expiration = parseDate(inputCols[colIndex])?.formatYMD()
            break
          case 'opt_type':
            record.opt_type = StockOptionSchema.TypeMap.get(
              inputCols[colIndex].toLowerCase(),
            )
            break
          case 'opt_strike':
            record.opt_strike = parseFloat(inputCols[colIndex])
            break
          case 't_from':
            record.t_from = parseDate(inputCols[colIndex])?.formatYMD()
            break
          case 't_to':
            record.t_to = parseDate(inputCols[colIndex])?.formatYMD()
            break
          case 't_interest_rate':
            record.t_interest_rate = inputCols[colIndex]
            break
          default:
            console.error(
              `Column ${columns[colIndex]} not defined in ImportTransactionsDialog`,
            )
            break
        }
      }

      // try to parse t_description as stock option definition...
      const option = StockOptionSchema.tryParse(record.t_description ?? '')
      if (option != null && option !== StockOptionSchema.Invalid) {
        if (record.t_symbol && record.t_symbol !== option.symbol) {
          console.warn(
            `overwriting t_symbol ${record.t_symbol} with ${option.symbol}`,
          )
        }
        record.t_symbol = option.symbol
        record.opt_strike = option.strike.value
        record.opt_expiration = option.maturity?.formatYMD()
        record.opt_type = option.type ?? '?'
      }

      props.columns.forEach((col) => {
        if (typeof col.importFunc === 'function') {
          col.importFunc(record)
        }
      })

      if (record.t_date == null || record.t_date === 'Invalid date') {
        // skip the row
        console.warn('Skipping invalid row', record)
      } else {
        result.push(record)
      }
    })
    if (onImport != null) {
      onImport(result)
    }
    setOpen(false)
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Import Transactions
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Import Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Paste the data you want to import. Expected columns:{' '}
            {columns.map((x) => x.label || x.id).join(', ')}. Each column
            separated with TAB (copy &amp; paste grid from Excel). Rows:{' '}
            {value.split('\n').filter(Boolean).length}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Data"
            type="text"
            fullWidth
            multiline={true}
            rows={10}
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleImport}>Import</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
