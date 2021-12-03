import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Container, Row } from 'reactstrap'

interface BrexSchema {
  date: string
  description: string
  amount: number
}

export default function Render(props: {}) {
  const [bankCsv, setBankCsv] = useState('')
  const [parsedData, setParsedData] = useState<BrexSchema[]>(null);
  useEffect(() => {
    if (parsedData == null) {
      setParsedData(loadDataFromStorage())
    }
  }, [parsedData])

  return (
    <Container>
      <Row>
        <textarea
          value={bankCsv}
          onChange={(e) => setBankCsv(e.currentTarget.value)}
        />
      </Row>
    </Container>
  )
}

// Helpers -- Saving & Loading data

const STORAGE_KEY = 'etradeData'
function loadDataFromStorage(): BrexSchema[] {
  return typeof localStorage === 'undefined'
    ? []
    : JSON.parse(localStorage.getItem(STORAGE_KEY))
}
function saveDataToStorage(dataToSave: BrexSchema[]) {
  if (typeof localStorage === 'undefined') {
    console.error('LocalStorage is undefined!')
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave, null, 2))
  }
}
