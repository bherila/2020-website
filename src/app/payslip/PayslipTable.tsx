'use client'

import _ from 'lodash'
import currency from 'currency.js'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { fin_payslip, fin_payslip_col, pay_data } from '@/app/payslip/payslipDbCols'
import PayslipEditButton from '@/app/payslip/PayslipEdit'
import PopoverContent from './PopoverContent'

export interface payslip_table_col {
  field:
    | fin_payslip_col
    | {
        field: fin_payslip_col
        hide?: boolean
        title: string
        color?: string
      }[]
  hide?: boolean
  title: string
  render?: (value: any, row: fin_payslip) => React.ReactNode
}

interface Props {
  data: fin_payslip[]
  cols: payslip_table_col[]
  onRowEdited?: (row: fin_payslip) => void
}

function fmtNum(val: pay_data) {
  if (val == null || val == 0) {
    return null
  }
  if (typeof val === 'number') {
    return val.toFixed(2)
  }
  if (typeof (val as currency)?.value === 'number') {
    return (val as currency).value.toFixed(2)
  }
  if (typeof val === 'object') {
    return <PopoverContent content={val} />
  }
  return val
}

export function PayslipTable(props: Props) {
  const { data, cols } = props

  function ytd(row: fin_payslip, col: fin_payslip_col) {
    return data
      .filter(
        (d) =>
          // same year and prior or equal month:
          d.period_end! <= row.period_end! && d.period_end!.slice(0, 4) === row.period_end!.slice(0, 4),
      )
      .reduce((prev, cur) => currency(cur[col]).add(prev), currency(0))
  }

  function renderValueCellContents(row: fin_payslip, col: fin_payslip_col) {
    if (currency(row[col]).value > 0) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>{fmtNum(row[col])}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>YTD: {fmtNum(ytd(row, col))}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
    return <span>{fmtNum(row[col])}</span>
  }

  return (
    <Table className="text-xs font-mono">
      <TableHeader>
        <TableRow>
          {cols
            .filter((c) => !c.hide)
            .map((s, i) => (
              <TableHead key={i} className="text-center">
                {s.title.trim()}
              </TableHead>
            ))}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {_.orderBy(data, 'period_end').map((row: fin_payslip, rid: number) => (
          <TableRow key={rid}>
            {cols
              .filter((c) => !c.hide)
              .map((c: payslip_table_col, ci: number) => {
                if (Array.isArray(c.field)) {
                  return (
                    <TableCell key={c.title}>
                      <div className="flex gap-2 items-center">
                        {c.field.map(
                          (subItem) =>
                            row[subItem.field] > 0 && (
                              <div key={subItem.field} style={{ color: subItem.color }}>
                                {subItem.title && <span className="font-semibold opacity-50 mr-1">{subItem.title}</span>}
                                {renderValueCellContents(row, subItem.field)}
                              </div>
                            ),
                        )}
                      </div>
                    </TableCell>
                  )
                } else {
                  return (
                    <TableCell key={c.field} className="text-right">
                      {c.render ? c.render(row[c.field], row) : renderValueCellContents(row, c.field)}
                    </TableCell>
                  )
                }
              })}
            <TableCell>
              {typeof props.onRowEdited === 'function' && <PayslipEditButton content={row} onSave={props.onRowEdited} />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
