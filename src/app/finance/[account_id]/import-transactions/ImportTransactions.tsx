import { useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import currency from 'currency.js'
import { z, ZodError } from 'zod'
import { AccountLineItem, AccountLineItemSchema } from '@/lib/AccountLineItem'
import { parseDate } from '@/lib/DateHelper'
import TransactionsTable from '../TransactionsTable'
import { parseEtradeCsv } from './parseEtradeCsv'

export default function ImportTransactions(props: { onImportClick: (data: AccountLineItem[]) => void }) {
  const [text, setText] = useState<string>('')

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const { data, error } = useMemo((): { data: AccountLineItem[] | null; error: string | null } => {
    return parseData(text)
  }, [text])

  return (
    <div>
      {error}
      <textarea
        value={text}
        onChange={handleTextareaChange}
        placeholder="date, description, amount, [comment, type, category]"
        rows={5}
        style={{ width: '100%' }}
      />
      <Button
        disabled={!data?.length}
        onClick={(e) => {
          e.preventDefault()
          data && props.onImportClick(data)
        }}
      >
        Import {data?.length ?? 'nothing'}
      </Button>

      {data && <TransactionsTable data={data} />}
    </div>
  )
}

function parseData(text: string): { data: AccountLineItem[] | null; error: string | null } {
  // Try parsing as ETrade CSV
  const eTradeData = parseEtradeCsv(text)
  if (eTradeData.length > 0) {
    return {
      data: eTradeData,
      error: null,
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
      error: null,
    }
  } catch (e) {
    return {
      data: null,
      error: e instanceof ZodError ? e.message : (e?.toString() ?? null),
    }
  }
}
