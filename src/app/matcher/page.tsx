'use client'
import React, { useState } from 'react'
import MainTitle from '@/components/main-title'
import Container from '@/components/container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { SetDocumentButton } from '@/components/TextImporter'
import Table2D from '@/components/Table2D'
import { Button } from 'react-bootstrap'
import CleanupDataButton from '@/components/matcher/CleanupDataButton'
import DeleteDuplicateRowsButton from '@/components/matcher/DeleteDuplicateRowsButton'
import FormatDatesButton from '@/components/matcher/FormatDatesButton'

export default function MatcherPage() {
  const [csvData, setCsvData] = useState<string[][]>([])
  return (
    <>
      <Container>
        <MainTitle>Matcher</MainTitle>
        <Row>
          <Col xs={12}>
            <SetDocumentButton setDocFn={(newData) => setCsvData(newData)}>
              Import
            </SetDocumentButton>
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
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row
          style={{
            overflowX: 'auto',
            fontFamily: 'Atkinson Hyperlegible',
            fontSize: '9pt',
          }}
          className="mt-4"
        >
          <Table2D data={csvData} />
        </Row>
      </Container>
    </>
  )
}
