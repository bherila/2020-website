import { useMemo } from 'react'
import { Button } from 'react-bootstrap'
import { deleteRowsWithOnlyOneColumn, deleteUniformColumns } from '@/lib/data2d'

export default function CleanupDataButton(props: { csvData: string[][]; setCsvData: (newData: string[][]) => void }) {
  const { csvData, setCsvData } = props
  const canCleanup = useMemo(
    () =>
      csvData[0] && JSON.stringify(deleteRowsWithOnlyOneColumn(deleteUniformColumns(csvData))) !== JSON.stringify(csvData),
    [csvData],
  )
  return (
    <>
      <Button
        className="ms-1"
        disabled={!canCleanup}
        onClick={(e) => {
          setCsvData(deleteRowsWithOnlyOneColumn(deleteUniformColumns(csvData)))
          e.preventDefault()
        }}
      >
        Cleanup
      </Button>
    </>
  )
}
