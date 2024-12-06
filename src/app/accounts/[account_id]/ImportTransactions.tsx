import { useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import currency from 'currency.js'
import { z, ZodError } from 'zod'
import { AccountSpend, AccountSpendSchema } from '@/app/api/account/model'
import { parseDate } from '@/lib/DateHelper'
import TransactionsTable from './TransactionsTable'

export default function ImportTransactions(props: { onImportClick: (data: AccountSpend[]) => void }) {
  const [text, setText] = useState<string>('')

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const { data, error } = useMemo(() => {
    try {
      const pd = text
        .split('\n')
        .filter(Boolean)
        .map((line) => {
          const row = line.split('\t')
          return {
            spend_date: parseDate(row[0])?.formatYMD() ?? row[0],
            spend_description: row[1] ?? '[no description]',
            spend_amount: currency(row[2] ?? 0).value,
            notes: row[3] ?? null,
          }
        })
        .filter((r) => r.spend_date)
      return {
        data: z.array(AccountSpendSchema).parse(pd) as AccountSpend[],
        error: null,
      }
    } catch (e) {
      return {
        data: null,
        error: e instanceof ZodError ? e.message : (e?.toString() ?? null),
      }
    }
  }, [text])

  return (
    <div>
      {error}
      <textarea
        value={text}
        onChange={handleTextareaChange}
        placeholder="date, description, amount"
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
