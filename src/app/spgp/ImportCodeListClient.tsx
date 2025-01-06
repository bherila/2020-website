'use client'

import { useState } from 'react'
import { ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from 'react-hook-form'

export default function ImportCodeListClient({ passTypes }: { passTypes: ParsedSPGPPassType[] }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      tsv: '',
      selectedPassType: '',
    },
  })
  const tsv = watch('tsv')
  const selectedPassType = watch('selectedPassType')

  const data = tsv
    .split('\n')
    .map((line) => line.trim().split(' ')[0].trim())
    .filter(Boolean)

  const [submitting, setSubmitting] = useState(false)
  const onSubmit = async () => {
    setSubmitting(true)
    try {
      await fetchWrapper.post('/api/spgp/', {
        action: 'import-codes',
        passTypeID: selectedPassType,
        promoCodes: data,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import codes</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select
            value={selectedPassType}
            onValueChange={(value) => setValue('selectedPassType', value)}
            disabled={submitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select pass type" />
            </SelectTrigger>
            <SelectContent>
              {passTypes?.map((pt) => (
                <SelectItem key={pt.passtype_id} value={pt.passtype_id}>
                  {pt.display_name} exp {pt.expiry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea {...register('tsv')} rows={10} placeholder="Paste codes here (one per line)" disabled={submitting} />

          <Button type="submit" disabled={submitting}>
            {submitting ? 'Importing...' : `Import ${data.length} code(s)`}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
