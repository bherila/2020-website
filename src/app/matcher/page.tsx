'use client'
import React, { useEffect, useMemo, useState } from 'react'
import MainTitle from '@/components/main-title'
import Container from '@/components/container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { SetDocumentButton } from '@/components/TextImporter'
import Table2D from '@/components/Table2D'

export default function MatcherPage() {
  const [csvData, setCsvData] = useState<string[][]>([])
  return (
    <>
      <Container>
        <MainTitle>Matcher</MainTitle>
        <Row>
          <Col xs={12}>
            <SetDocumentButton setDocFn={(d) => setCsvData(d)} />
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
