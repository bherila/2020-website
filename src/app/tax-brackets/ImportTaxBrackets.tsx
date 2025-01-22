import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import currency from 'currency.js'
import { z, ZodError } from 'zod'
import { graduatedTaxSchema, tax_row } from '@/app/api/tax-brackets/schema'

export default function ImportTaxBrackets(props: { onImportClick: (data: tax_row[]) => void }) {
  const [text, setText] = useState<string>('')

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const { data, error } = useMemo(() => {
    try {
      const pd = text.split('\n').map((line) => {
        const row = line.split('\t')
        return {
          year: currency(row[0]).value,
          region: row[1] || '',
          income_over: currency(row[2]).value,
          rate: currency(row[3]).value,
          type: row[4],
        }
      })
      return {
        data: z.array(graduatedTaxSchema).parse(pd) as tax_row[],
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
        placeholder="Year,Region,Income_Over,Rate,{s, mfj, mfs, hoh}"
        rows={5}
        style={{ width: '100%' }}
      />
      <Button
        variant="outline"
        disabled={!data?.length}
        onClick={(e) => {
          e.preventDefault()
          data && props.onImportClick(data)
        }}
      >
        Import {data?.length ?? 'nothing'}
      </Button>
    </div>
  )
}
