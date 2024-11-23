import { useMemo } from 'react'
import { Button } from 'react-bootstrap'
import { deleteDuplicateRows } from '@/lib/data2d'

export default function DeleteDuplicateRowsButton(props: {
  csvData: string[][]
  setCsvData: (newData: string[][]) => void
}) {
  const { csvData, setCsvData } = props
  const canDedupe = useMemo(() => csvData[0] && deleteDuplicateRows(csvData).length !== csvData.length, [csvData])
  return (
    <>
      <Button
        className="ms-1"
        disabled={!canDedupe}
        onClick={(e) => {
          setCsvData(deleteDuplicateRows(csvData))
          e.preventDefault()
        }}
      >
        Dedupe
      </Button>
    </>
  )
}
