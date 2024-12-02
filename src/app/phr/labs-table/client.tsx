'use client'
import Table2D from '@/components/Table2D'
import { checkLabRange } from '@/lib/lab-range-check'
import { ExclamationTriangle } from 'react-bootstrap-icons'

export default function LabsTable({ data }: { data: string[][] }) {
  // Process the data to add range check information
  const processedData = data.map((row, rowIndex) => {
    if (rowIndex === 0) return row // Header row

    // Extract values needed for range check
    const value = parseFloat(row[7]) // Value column
    const normal_value = row[12] // Normal column
    const range_min = row[9] ? parseFloat(row[9]) : null // Min column
    const range_max = row[10] ? parseFloat(row[10]) : null // Max column

    const { isInRange, message } = checkLabRange({
      value: isNaN(value) ? null : value,
      normal_value,
      range_min: range_min === null ? null : Number(range_min),
      range_max: range_max === null ? null : Number(range_max),
    })

    // ensure row 0-12 are assigned to at least empty string
    for (let i = 0; i <= 12; i++) {
      row[i] ??= ''
    }

    // Add the range status
    row[13] = !isInRange ? '⚠️' : '✅'
    return row
  })

  return (
    <Table2D
      data={processedData}
      onColumnClick={(columnIndex) => {
        const column = [
          'test_name',
          'collection_datetime',
          'result_datetime',
          'result_status',
          'ordering_provider',
          'resulting_lab',
          'analyte',
          'value',
          'unit',
          'range_min',
          'range_max',
          'range_unit',
          'normal_value',
        ][columnIndex]
        window.location.href = `?sort=${column}`
      }}
    />
  )
}
