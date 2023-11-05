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

interface Props {
  data: fin_payslip[]
  cols: { field: fin_payslip_col; hide?: boolean; title?: string }[]
}

function format(val: pay_data) {
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
  return (
    <Table
      size="sm"
      striped
      bordered
      style={{ fontSize: '9pt', fontFamily: 'Atkinson Hyperlegible' }}
    >
      <thead>
        <tr>
          {cols
            .filter((c) => !c.hide)
            .map((s, i) => (
              <th key={i}>{(s.title || s.field).trim()}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {_.orderBy(data, 'pay_date').map((row, rid) => (
          <tr key={rid}>
            {cols
              .filter((c) => !c.hide)
              .map((c, ci) => {
                if (currency(row[c.field]).value > 0) {
                  return (
                    <td style={{ textAlign: 'right' }} key={c.field}>
                      <div>{format(row[c.field])}</div>
                      <div style={{ opacity: 0.5 }}>
                        {'Σ '}
                        {format(
                          data
                            .filter(
                              (d) =>
                                // same year and prior or equal month:
                                d.pay_date <= row.pay_date &&
                                d.pay_date.slice(0, 4) ===
                                  row.pay_date.slice(0, 4),
                            )
                            .reduce(
                              (prev, cur) => currency(cur[c.field]).add(prev),
                              currency(0),
                            ),
                        )}
                      </div>
                    </td>
                  )
                }
                return (
                  <td style={{ textAlign: 'right' }} key={c.field}>
                    {format(row[c.field])}
                  </td>
                )
              })}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
