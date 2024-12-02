'use client'
import Table2D from '@/components/Table2D'
import { checkLabRange } from '@/lib/lab-range-check'
import { ExclamationTriangle } from 'react-bootstrap-icons'

export default function LabsTable({ data }: { data: string[][] }) {
  return (
    <Table2D
      data={data}
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
