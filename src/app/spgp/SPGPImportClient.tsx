'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { colKeys, SPGPSchema } from '@/app/spgp/SPGPSchema'
import { ZodError } from 'zod'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useForm } from 'react-hook-form'

export default function SPGPImportClient({ passTypes }: { passTypes: ParsedSPGPPassType[] }) {
  const [tsv, setTsv] = useState<string | null>(null)
  useEffect(() => {
    if (tsv === null) {
      setTsv(sessionStorage.getItem('spgp-import') ?? '')
    } else {
      sessionStorage.setItem('spgp-import', tsv)
    }
  }, [tsv])

  const errors = new Set<string>()
  const data = (tsv ?? '')
    .split('\n')
    .map((line) => {
      const rowData: any = {}
      const colData = line.split('\t')
      if (colData[0] === 'Promo Code') {
        return null // col header
      }
      for (let i = 0; i < Math.min(colKeys.length, colData.length); ++i) {
        if (i == 4) {
          rowData[colKeys[i]] = colData[i] // TODO: Maybe need to reformat date?
        } else if (i == 9) {
          rowData[colKeys[i]] = colData[i].replace(/[^\d.]/g, '')
        } else {
          rowData[colKeys[i]] = colData[i]
        }
      }
      try {
        return SPGPSchema.parse(rowData)
      } catch (err) {
        if (err instanceof ZodError) {
          errors.add(line)
        } else if (err instanceof Error) {
          errors.add(err.message + ': ' + line)
        }
        return null
      }
    })
    .filter(Boolean)

  const [isLoading, setLoading] = useState(false)
  const form = useForm()

  return (
    <form
      onSubmit={form.handleSubmit(() => {
        setLoading(true)
        fetchWrapper.post('/api/spgp/', { action: 'spgp-import', data }).finally(() => setLoading(false))
      })}
    >
      <FormField
        control={form.control}
        name="import"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                rows={10}
                className="w-full"
                value={tsv ?? ''}
                onChange={(e) => {
                  field.onChange(e)
                  setTsv(e.currentTarget.value)
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
      {tsv && errors.size && (
        <Alert variant="destructive">
          <AlertTitle>Errors found</AlertTitle>
          <AlertDescription>
            Errors in the entry will be skipped:
            <ol>
              {Array.from(errors).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ol>
          </AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="mt-4" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>
      <Table className="text-xs">
        <TableHeader>
          <TableRow>
            {colKeys.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {colKeys.map((colKey) => (
                <TableCell key={colKey}>{(row as any)[colKey]?.toString() ?? '-'}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </form>
  )
}
