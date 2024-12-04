import { useMemo } from 'react'
import { Button } from 'react-bootstrap'
import { reformatDates } from '@/lib/data2d'

export default function FormatDatesButton(props: { csvData: string[][]; setCsvData: (newData: string[][]) => void }) {
  const { csvData, setCsvData } = props
  const canDedupe = useMemo(
    () => csvData[0] && JSON.stringify(reformatDates(csvData)) !== JSON.stringify(csvData),
    [csvData],
  )
  return (
    <>
      <Button
        className="ms-1"
        onClick={(e) => {
          setCsvData(reformatDates(csvData))
          e.preventDefault()
        }}
      >
        Parse Dates
      </Button>
    </>
  )
}
