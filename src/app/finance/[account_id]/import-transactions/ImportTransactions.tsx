import { useMemo, useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import currency from 'currency.js'
import { z, ZodError } from 'zod'
import { AccountLineItem, AccountLineItemSchema } from '@/lib/AccountLineItem'
import { parseDate } from '@/lib/DateHelper'
import TransactionsTable from '../TransactionsTable'
import { parseEtradeCsv } from './parseEtradeCsv'
import Row from 'react-bootstrap/Row'
import { Col } from 'react-bootstrap'

export default function ImportTransactions(props: { onImportClick: (data: AccountLineItem[]) => void }) {
  const [text, setText] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const handleFileRead = useCallback(async (file: File) => {
    try {
      const text = await file.text()
      setText(text)
      setError(null)
    } catch (err) {
      setError(`Error reading file: ${err instanceof Error ? err.message : String(err)}`)
    }
  }, [])

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setIsDragOver(false)

      const files = event.dataTransfer?.files
      if (files && files.length > 0) {
        const file = files[0]
        if (file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv')) {
          handleFileRead(file)
        } else {
          setError('Please drop a CSV file')
        }
      }
    },
    [handleFileRead],
  )

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
  }, [])

  const { data, parseError } = useMemo((): { data: AccountLineItem[] | null; parseError: string | null } => {
    return parseData(text)
  }, [text])

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        border: isDragOver ? '2px dashed #007bff' : '2px dashed #ced4da',
        padding: '20px',
        textAlign: 'center',
        transition: 'border-color 0.3s',
      }}
    >
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {parseError && <div style={{ color: 'red' }}>{parseError}</div>}

      <textarea
        value={text}
        onChange={handleTextareaChange}
        placeholder="date, description, amount, [comment, type, category]"
        rows={5}
        style={{ width: '100%' }}
      />

      <Row className="my-2">
        <Col xs={12}>
          <Button
            className="mx-1"
            disabled={!data?.length}
            onClick={(e) => {
              e.preventDefault()
              data && props.onImportClick(data)
            }}
          >
            Import {data?.length ?? 'nothing'}
          </Button>
          <Button className="mx-1" onClick={() => setText('')} disabled={!text.length}>
            Clear
          </Button>
        </Col>
      </Row>

      {data && <TransactionsTable data={data} />}
    </div>
  )
}

function parseData(text: string): { data: AccountLineItem[] | null; parseError: string | null } {
  // Try parsing as ETrade CSV
  const eTradeData = parseEtradeCsv(text)
  if (eTradeData.length > 0) {
    return {
      data: eTradeData,
      parseError: null,
    }
  }

  try {
    const pd = text
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const row = line.split('\t')
        return {
          t_date: parseDate(row[0]) ?? new Date(row[0]),
          t_description: row[1] ?? '[no description]',
          t_amt: currency(row[2] ?? 0).value,
          t_comment: row[3] ?? null,
          t_type: 'spend' as const, // Default type
          t_schc_category: null,
        } as AccountLineItem
      })
      .filter((r) => r.t_date)
    return {
      data: pd,
      parseError: null,
    }
  } catch (e) {
    return {
      data: null,
      parseError: e instanceof ZodError ? e.message : (e?.toString() ?? null),
    }
  }
}
