'use client'
import Table2D from '@/components/Table2D'

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
          'normal_value',
        ][columnIndex]
        window.location.href = `?sort=${column}`
      }}
    />
  )
}
