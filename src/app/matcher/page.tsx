'use client'
import { useState } from 'react'
import MainTitle from '@/components/main-title'
import Container from '@/components/container'
import { SetDocumentButton } from '@/components/TextImporter'
import Table2D from '@/components/Table2D'
import CleanupDataButton from '@/components/matcher/CleanupDataButton'
import DeleteDuplicateRowsButton from '@/components/matcher/DeleteDuplicateRowsButton'
import FormatDatesButton from '@/components/matcher/FormatDatesButton'
import { Button } from '@/components/ui/button'

export default function MatcherPage() {
  const [csvData, setCsvData] = useState<string[][]>([])
  return (
    <>
      <Container>
        <MainTitle>Matcher</MainTitle>
        <SetDocumentButton setDocFn={(newData) => setCsvData(newData)}>Import</SetDocumentButton>
        <CleanupDataButton {...{ csvData, setCsvData }} />
        <DeleteDuplicateRowsButton {...{ csvData, setCsvData }} />
        <FormatDatesButton {...{ csvData, setCsvData }} />
        <Button
          className="ms-1"
          disabled={!csvData.length}
          onClick={(e) => {
            setCsvData([])
            e.preventDefault()
          }}
        >
          Clear
        </Button>
      </Container>
      <Container fluid>
        <Table2D data={csvData} />
      </Container>
    </>
  )
}
