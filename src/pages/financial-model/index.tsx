import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { ModalBody } from 'reactstrap'
import currency from 'currency.js'

interface BrexSchema {
  date: string
  description: string
  amount: number
  memo: string
}

function parseCsvToBrexSchema(bankCsv: string): BrexSchema[] {
  return bankCsv
    .split('\n')
    .filter(Boolean)
    .map((row) => row.split('\t'))
    .map((row) => ({
      date: row[0],
      description: row[1],
      amount: parseFloat(row[2]),
      memo: row[3] || null,
    }))
}

export default function Render() {
  const [bankCsv, setBankCsv] = useState('')
  const parsedCsv = useMemo(() => parseCsvToBrexSchema(bankCsv), [bankCsv])
  const [parsedData, setParsedData] = useState<BrexSchema[]>(null)
  useEffect(() => {
    if (parsedData == null) {
      setParsedData(loadDataFromStorage())
    }
  }, [parsedData])

  const groupedData = useMemo(() => {
    const res: BrexSchema[] = []
    if (!parsedData) return res
    for (const row of parsedData) {
      const existing = res.find((x) => x.description == row.description)
      if (existing) {
        existing.amount = currency(existing.amount).add(row.amount).value
      } else {
        res.push(row)
      }
    }
    return res
  }, [parsedData])

  const [isImportOpen, setImportOpen] = useState(false)

  return (
    <Container>
      <Dialog open={isImportOpen} onClose={() => setImportOpen(false)}>
        <DialogTitle>Import Transactions</DialogTitle>
        <DialogContent>
          <Box>
            <p>
              Expected columns: <code>date, description, amount, memo</code>
            </p>
            <p>Field separator: TAB</p>
          </Box>
          <textarea
            style={{ width: '100%', height: '70px' }}
            value={bankCsv}
            onChange={(e) => setBankCsv(e.currentTarget.value)}
          />
          <Button
            onClick={() => {
              setParsedData(parsedCsv)
              saveDataToStorage(parsedCsv)
            }}
          >
            Load {parsedCsv.length} items
          </Button>
        </DialogContent>
      </Dialog>
      <Box>
        <Button onClick={() => setImportOpen(true)}>Import transactions</Button>
      </Box>
      <Box>
        <h2>By payee</h2>

        <TransactionTable parsedData={groupedData} />

        <h2>All transactions</h2>
        <TransactionTable parsedData={parsedData} />
      </Box>
    </Container>
  )
}

function TransactionTable({ parsedData }: { parsedData: BrexSchema[] }) {
  return (
    <Table size="small">
      <TableHead>
        {['Date', 'Description', 'Amount'].map((hdr) => (
          <TableCell key={hdr}>{hdr}</TableCell>
        ))}
      </TableHead>
      <TableBody>
        {parsedData?.map((row, ri) => (
          <TableRow
            key={ri}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
