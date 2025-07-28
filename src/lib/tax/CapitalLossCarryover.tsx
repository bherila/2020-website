import React from 'react'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table'
import currency from 'currency.js'

// worksheet for 2024 tax year (2023 inputs)
export interface CapitalLossCarryoverInputs {
  line1: number // 2023 Form 1040, 1040-SR, or 1040-NR, line 15
  line2: number // 2023 Schedule D, line 21 (as positive)
  line5?: number // 2023 Schedule D, line 7 (as positive, if loss)
  line6?: number // 2023 Schedule D, line 15 (if gain, else 0)
  line9?: number // 2023 Schedule D, line 15 (as positive, if loss)
  line10?: number // 2023 Schedule D, line 7 (if gain, else 0)
}

export interface CapitalLossCarryoverResult {
  line1: number
  line2: number
  line3: number
  line4: number
  line5: number
  line6: number
  line7: number
  line8: number
  line9: number
  line10: number
  line11: number
  line12: number
  line13: number
}

export function calculateCapitalLossCarryover(inputs: CapitalLossCarryoverInputs): CapitalLossCarryoverResult {
  const line1 = inputs.line1
  const line2 = inputs.line2
  const line3 = Math.max(0, line1 + line2)
  const line4 = Math.min(line2, line3)

  // Short-term section
  const line5 = inputs.line5 ?? 0
  const line6 = inputs.line6 ?? 0
  const line7 = line4 + line6
  const line8 = Math.max(0, line5 - line7)

  // Long-term section
  const line9 = inputs.line9 ?? 0
  const line10 = inputs.line10 ?? 0
  const line11 = Math.max(0, line4 - line5)
  const line12 = line10 + line11
  const line13 = Math.max(0, line9 - line12)

  return {
    line1,
    line2,
    line3,
    line4,
    line5,
    line6,
    line7,
    line8,
    line9,
    line10,
    line11,
    line12,
    line13,
  }
}

const worksheetLines: { key: keyof CapitalLossCarryoverResult; label: string }[] = [
  {
    key: 'line1',
    label:
      '1. Enter the amount from your 2023 Form 1040, 1040-SR, or 1040-NR, line 15. If the amount would have been a loss if you could enter a negative number on that line, enclose the amount in parentheses.',
  },
  {
    key: 'line2',
    label: '2. Enter the loss from your 2023 Schedule D, line 21, as a positive amount.',
  },
  {
    key: 'line3',
    label: '3. Combine lines 1 and 2. If zero or less, enter -0-.',
  },
  {
    key: 'line4',
    label: '4. Enter the smaller of line 2 or line 3.',
  },
  {
    key: 'line5',
    label: '5. Enter the loss from your 2023 Schedule D, line 7, as a positive amount.',
  },
  {
    key: 'line6',
    label: '6. Enter any gain from your 2023 Schedule D, line 15. If a loss, enter -0-.',
  },
  {
    key: 'line7',
    label: '7. Add lines 4 and 6.',
  },
  {
    key: 'line8',
    label:
      '8. Short-term capital loss carryover for 2024. Subtract line 7 from line 5. If zero or less, enter -0-. If more than zero, also enter this amount on Schedule D, line 6.',
  },
  {
    key: 'line9',
    label: '9. Enter the loss from your 2023 Schedule D, line 15, as a positive amount.',
  },
  {
    key: 'line10',
    label: '10. Enter any gain from your 2023 Schedule D, line 7. If a loss, enter -0-.',
  },
  {
    key: 'line11',
    label: '11. Subtract line 5 from line 4. If zero or less, enter -0-.',
  },
  {
    key: 'line12',
    label: '12. Add lines 10 and 11.',
  },
  {
    key: 'line13',
    label:
      '13. Long-term capital loss carryover for 2024. Subtract line 12 from line 9. If zero or less, enter -0-. If more than zero, also enter this amount on Schedule D, line 14.',
  },
]

export function CapitalLossCarryoverView({ data }: { data: CapitalLossCarryoverResult }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Line</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {worksheetLines.map((line) => {
          const value = data[line.key]
          if (typeof value !== 'number' || value === 0) return null
          return (
            <TableRow key={line.key}>
              <TableCell>{line.label}</TableCell>
              <TableCell className="text-right">{currency(value).format()}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
