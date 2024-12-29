import { useMemo, useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import { ZodError } from 'zod'
import { AccountLineItem, AccountLineItemSchema, TransactionType } from '@/lib/AccountLineItem'
import TransactionsTable from '../TransactionsTable'
import { parseEtradeCsv } from './parseEtradeCsv'
import Row from 'react-bootstrap/Row'
import { Col } from 'react-bootstrap'
import { parseQuickenQFX } from './parseQuickenQFX'

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
        handleFileRead(file)
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

  // Try parsing as QFX
  const qfxData = parseQuickenQFX(text)
  if (qfxData.length > 0) {
    return {
      data: qfxData,
      parseError: null,
    }
  }

  const data: AccountLineItem[] = []
  let parseError: string | null = null
  try {
    for (const line of text.split('\n')) {
      const row = line.split(line.includes('\t') ? '\t' : ',')
      if (row[0] === 'Date') {
        continue
      }
      data.push(
        AccountLineItemSchema.parse({
          t_date: row[0],
          t_description: row[1],
          t_amt: row[2], // Pass raw string for t_amt, letting Zod handle the parsing
          t_comment: row[3],
          t_type: 'spend' as TransactionType,
          t_schc_category: null,
        }),
      )
    }
  } catch (e) {
    parseError = e instanceof ZodError ? e.message : (e?.toString() ?? null)
  }
  return {
    data,
    parseError,
  }
}
