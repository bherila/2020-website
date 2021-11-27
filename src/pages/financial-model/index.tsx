import React, { useEffect, useState } from 'react'
import { Container, Row } from 'reactstrap'
import moment from 'moment'
import _ from 'lodash'

interface BrexSchema {
  date: string
  description: string
  amount: number
}

export default function Render(props: {}) {
  const [bankCsv, setBankCsv] = useState('')
  useEffect(() => {
    if (bankCsv == null) {
      setBankCsv(loadDataFromStorage())
    }
  })

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
function loadDataFromStorage(): EtradeSchema[] {
  return typeof localStorage === 'undefined'
    ? []
    : JSON.parse(localStorage.getItem(STORAGE_KEY))
}
function saveDataToStorage(dataToSave: EtradeSchema[]) {
  if (typeof localStorage === 'undefined') {
    console.error('LocalStorage is undefined!')
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave, null, 2))
  }
}
