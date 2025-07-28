'use client'

import React, { useState } from 'react'
import { calculateCapitalLossCarryover, CapitalLossCarryoverView } from '@/lib/tax/CapitalLossCarryover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import currency from 'currency.js'
import { Label } from '@/components/ui/label'

export default function CapitalLossCarryoverClient() {
  const [inputs, setInputs] = useState({
    line1: '',
    line2: '',
    line5: '',
    line6: '',
    line9: '',
    line10: '',
  })
  const [result, setResult] = useState<ReturnType<typeof calculateCapitalLossCarryover> | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target
    // Only format if not empty
    if (value.trim() === '') return
    const parsed = currency(value).format()
    setInputs((prev) => ({ ...prev, [name]: parsed }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Convert all to numbers using currency.js value()
    const parsed = {
      line1: currency(inputs.line1).value,
      line2: currency(inputs.line2).value,
      line5: currency(inputs.line5).value,
      line6: currency(inputs.line6).value,
      line9: currency(inputs.line9).value,
      line10: currency(inputs.line10).value,
    }
    setResult(calculateCapitalLossCarryover(parsed))
  }

  const fields: { name: keyof typeof inputs; label: string }[] = [
    {
      name: 'line1',
      label:
        '1. Enter the amount from your 2023 Form 1040, 1040-SR, or 1040-NR, line 15. If the amount would have been a loss if you could enter a negative number on that line, enclose the amount in parentheses',
    },
    {
      name: 'line2',
      label: '2. Enter the loss from your 2023 Schedule D, line 21, as a positive amount',
    },
    {
      name: 'line5',
      label: '5. Enter the loss from your 2023 Schedule D, line 7, as a positive amount',
    },
    {
      name: 'line6',
      label: '6. Enter any gain from your 2023 Schedule D, line 15. If a loss, enter -0-',
    },
    {
      name: 'line9',
      label: '9. Enter the loss from your 2023 Schedule D, line 15, as a positive amount',
    },
    {
      name: 'line10',
      label: '10. Enter any gain from your 2023 Schedule D, line 7. If a loss, enter -0-',
    },
  ]

  return (
    <div className="flex gap-8">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl flex-1" style={{ flexBasis: '50%' }}>
        {fields.map((field) => (
          <div key={field.name} className="grid w-full max-w-sm items-center gap-3">
            <Label className="block font-medium" htmlFor={field.name}>
              {field.label}
            </Label>
            <Input
              type="text"
              name={field.name}
              id={field.name}
              value={inputs[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full"
              inputMode="decimal"
              autoComplete="off"
            />
          </div>
        ))}
        <Button type="submit">Calculate</Button>
      </form>
      <div className="flex-1" style={{ flexBasis: '50%' }}>
        {result && (
          <div className="mt-8">
            <CapitalLossCarryoverView data={result} />
          </div>
        )}
      </div>
    </div>
  )
}
