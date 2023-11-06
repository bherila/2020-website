'use client'
import Table from 'react-bootstrap/Table'
import _ from 'lodash'
import React from 'react'
import currency from 'currency.js'
import PopoverContent from '@/app/payslip/PopoverContent'
import {
  fin_payslip,
  fin_payslip_col,
  pay_data,
} from '@/app/payslip/payslipDbCols'
import Stack from 'react-bootstrap/Stack'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import PayslipEditButton from '@/app/payslip/PayslipEdit'
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
          d.period_end <= row.period_end &&
          d.period_end.slice(0, 4) === row.period_end.slice(0, 4),
      )
      .reduce((prev, cur) => currency(cur[col]).add(prev), currency(0))
  }

  function renderValueCellContents(row: fin_payslip, col: fin_payslip_col) {
    if (currency(row[col]).value > 0) {
      const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
          YTD: {fmtNum(ytd(row, col))}
        </Tooltip>
      )

      return (
        <OverlayTrigger
          placement="right"
          delay={{ show: 100, hide: 400 }}
          overlay={renderTooltip}
        >
          <span>{fmtNum(row[col])}</span>
        </OverlayTrigger>
      )
    }
    return <span>{fmtNum(row[col])}</span>
  }

  return (
    <Table
      size="sm"
      striped
      bordered
      style={{ fontSize: '10pt', fontFamily: 'Atkinson Hyperlegible' }}
    >
      <thead>
        <tr>
          {cols
            .filter((c) => !c.hide)
            .map((s, i) => (
              <th key={i} style={{ textAlign: 'center' }}>
                {s.title.trim()}
              </th>
            ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {_.orderBy(data, 'period_end').map((row, rid) => (
          <tr key={rid}>
            {cols
              .filter((c) => !c.hide)
              .map((c: payslip_table_col, ci) => {
                if (Array.isArray(c.field)) {
                  // handle as blocks
                  return (
                    <td key={c.title}>
                      <Stack direction="horizontal" gap={2}>
                        {c.field.map((subItem) => {
                          return (
                            row[subItem.field] > 0 && (
                              <div key={subItem.field} color={subItem.color}>
                                {subItem.title && (
                                  <span
                                    style={{ fontWeight: 'bold', opacity: 0.5 }}
                                  >
                                    {subItem.title + ' '}
                                  </span>
                                )}
                                {renderValueCellContents(row, subItem.field)}
                              </div>
                            )
                          )
                        })}
                      </Stack>
                    </td>
                  )
                } else {
                  return (
                    <td style={{ textAlign: 'right' }} key={c.field}>
                      {renderValueCellContents(row, c.field)}
                    </td>
                  )
                }
              })}
            <td>
              {typeof props.onRowEdited === 'function' && (
                <PayslipEditButton content={row} onSave={props.onRowEdited} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
