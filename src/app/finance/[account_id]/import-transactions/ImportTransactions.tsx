import { useMemo, useState, useCallback } from 'react'
import { ZodError } from 'zod'
import { AccountLineItem, AccountLineItemSchema } from '@/lib/AccountLineItem'
import TransactionsTable from '../TransactionsTable'
import { parseEtradeCsv } from './parseEtradeCsv'

import { parseQuickenQFX } from './parseQuickenQFX'
import { Button } from '@/components/ui/button'
import { splitDelimitedText } from '@/lib/splitDelimitedText'
import { parseWealthfrontHAR } from './parseWealthfrontHAR'

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
    // If text is empty, return null data and no parse error
    if (!text.trim()) {
      return { data: null, parseError: null }
    }
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

      {data && data.length > 0 && (
        <>
          <div className="my-2">
            <Button
              className="mx-1"
              onClick={(e) => {
                e.preventDefault()
                data && props.onImportClick(data)
              }}
            >
              Import {data.length}
            </Button>
            <Button className="mx-1" onClick={() => setText('')}>
              Clear
            </Button>
          </div>

          <TransactionsTable data={data} />
        </>
      )}
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
  // Try parsing as Wealthfront HAR
  const Wealthfront = parseWealthfrontHAR(text)
  if (Wealthfront.length > 0) {
    return {
      data: Wealthfront,
      parseError: null,
    }
  }

  const data: AccountLineItem[] = []
  let parseError: string | null = null
  try {
    const lines = splitDelimitedText(text)
    let dateColIndex: number | null = null
    let timeColIndex: number | null = null
    let descriptionColIndex: number | null = null
    let amountColIndex: number | null = null
    let commentColIndex: number | null = null
    let typeColIndex: number | null = null
    let categoryColIndex: number | null = null
    if (lines.length > 0) {
      const getColumnIndex = (...headers: string[]) => {
        for (const header of headers) {
          const index = lines[0].indexOf(header)
          if (index !== -1) {
            return index
          }
        }
        return null
      }
      dateColIndex = getColumnIndex('Date', 'Transaction Date')
      timeColIndex = getColumnIndex('Time')
      descriptionColIndex = getColumnIndex('Description', 'Desc')
      amountColIndex = getColumnIndex('Amount', 'Amt')
      commentColIndex = getColumnIndex('Comment')
      typeColIndex = getColumnIndex('Type')
      categoryColIndex = getColumnIndex('Category')
    }
    if (dateColIndex == null) {
      throw new Error('Date column not found')
    }
    if (descriptionColIndex == null) {
      throw new Error('Description column not found')
    }
    if (amountColIndex == null) {
      throw new Error('Amount column not found')
    }
    for (const row of lines) {
      if (row[dateColIndex] === 'Date') {
        continue
      }
      data.push(
        AccountLineItemSchema.parse({
          t_date: row[dateColIndex],
          t_description: row[descriptionColIndex],
          t_amt: row[amountColIndex], // Pass raw string for t_amt, letting Zod handle the parsing
          t_comment: commentColIndex ? row[commentColIndex] : null,
          t_type: typeColIndex ? row[typeColIndex] : null,
          t_schc_category: categoryColIndex ? row[categoryColIndex] : null,
        }),
      )
    }
  } catch (e) {
    parseError = e instanceof ZodError ? e.message : (e?.toString() ?? null)
  }
  return {
    data: data.length > 0 ? data : null,
    parseError,
  }
}
