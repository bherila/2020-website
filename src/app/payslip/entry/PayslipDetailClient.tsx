'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { fin_payslip, fin_payslip_schema } from '@/app/payslip/payslipDbCols'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { savePayslip, deletePayslip } from './actions'
import { useState, useEffect, useMemo } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { parseDate } from '@/lib/DateHelper'

const PayslipFormSection = ({
  title,
  fields,
  control,
  initialValues,
}: {
  title: string
  fields: string[]
  control: any
  initialValues?: Partial<fin_payslip>
}) => (
  <div className="border p-4 rounded-md">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-3 gap-4">
      {fields.map((field) => (
        <FormField
          key={field}
          control={control}
          name={field as keyof fin_payslip}
          render={({ field: inputField }) => (
            <FormItem>
              <FormLabel>{field}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  value={initialValues?.[field as keyof fin_payslip] ?? inputField.value}
                  onChange={(e) => {
                    const value = e.target.valueAsNumber
                    inputField.onChange(isNaN(value) ? 0 : value)
                  }}
                  onBlur={(e) => {
                    const value = parseFloat(e.target.value)
                    inputField.onChange(isNaN(value) ? 0 : value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  </div>
)

interface PayslipDetailClientProps {
  initialPayslip?: fin_payslip
}

export default function PayrollForm({ initialPayslip }: PayslipDetailClientProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [saveMode, setSaveMode] = useState<'edit' | 'new'>('edit')
  const [apiError, setApiError] = useState<string | null>(null)

  const prepareInitialValues = useMemo(() => {
    if (!initialPayslip) return { ps_is_estimated: false }

    const convertDate = (dateStr?: string | null) => {
      const parsed = parseDate(dateStr)
      return parsed?.formatYMD() ?? dateStr ?? ''
    }

    const convertedPayslip = {
      ...initialPayslip,
      period_start: convertDate(initialPayslip.period_start),
      period_end: convertDate(initialPayslip.period_end),
      pay_date: convertDate(initialPayslip.pay_date),
      ps_is_estimated: initialPayslip.ps_is_estimated ?? false,
    }

    Object.keys(convertedPayslip).forEach(
      (key) => convertedPayslip[key as keyof fin_payslip] == null && delete convertedPayslip[key as keyof fin_payslip],
    )

    return convertedPayslip
  }, [initialPayslip])

  const form = useForm<fin_payslip>({
    resolver: zodResolver(fin_payslip_schema),
    defaultValues: prepareInitialValues,
  })

  useEffect(() => {
    if (initialPayslip) {
      Object.keys(prepareInitialValues).forEach((key) => {
        form.setValue(key as keyof fin_payslip, prepareInitialValues[key as keyof fin_payslip])
      })
    }
  }, [initialPayslip, form.setValue, prepareInitialValues])

  const hasYearChanged =
    initialPayslip &&
    parseDate(form.watch('pay_date'))?.formatYMD()?.slice(0, 4) !==
      parseDate(initialPayslip.pay_date)?.formatYMD()?.slice(0, 4)

  const onSubmit = async (data: fin_payslip) => {
    setIsSubmitting(true)
    setApiError(null)
    try {
      const payslipToSave =
        saveMode === 'edit' && initialPayslip
          ? {
              ...data,
              originalPeriodStart: initialPayslip.period_start ?? undefined,
              originalPeriodEnd: initialPayslip.period_end ?? undefined,
              originalPayDate: initialPayslip.pay_date ?? undefined,
            }
          : {
              ...data,
              originalPeriodStart: undefined,
              originalPeriodEnd: undefined,
              originalPayDate: undefined,
            }

      await savePayslip(payslipToSave)
      router.push('/payslip')
    } catch (error) {
      console.error('Failed to save payslip:', error)
      setApiError(error instanceof Error ? error.message : 'An unexpected error occurred while saving the payslip.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!initialPayslip?.period_start || !initialPayslip?.period_end || !initialPayslip?.pay_date) {
      console.error('Cannot delete: Missing payslip details')
      return
    }

    setIsDeleting(true)
    setApiError(null)
    try {
      await deletePayslip({
        period_start: initialPayslip.period_start,
        period_end: initialPayslip.period_end,
        pay_date: initialPayslip.pay_date,
      })
    } catch (error) {
      console.error('Failed to delete payslip:', error)
      setApiError(error instanceof Error ? error.message : 'An unexpected error occurred while deleting the payslip.')
      setIsDeleting(false)
    }
  }

  const clearApiError = () => {
    setApiError(null)
  }

  return (
    <div className="container">
      {apiError && (
        <AlertDialog open={!!apiError} onOpenChange={clearApiError}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>{apiError}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={clearApiError}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-4 gap-4 border p-4 rounded-md">
            <FormField
              control={form.control}
              name="period_start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Period Start</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="period_end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Period End</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pay_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pay Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ps_comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Optional notes about this payslip" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <PayslipFormSection
              title="Earnings"
              fields={[
                'ps_salary',
                'earnings_gross',
                'earnings_bonus',
                'earnings_rsu',
                'earnings_net_pay',
                'ps_vacation_payout',
              ]}
              control={form.control}
              initialValues={initialPayslip}
            />
            <PayslipFormSection
              title="Imputed Income"
              fields={['imp_legal', 'imp_fitness', 'imp_ltd', 'imp_other']}
              control={form.control}
              initialValues={initialPayslip}
            />
            <PayslipFormSection
              title="Federal Taxes Paid"
              fields={['ps_oasdi', 'ps_medicare', 'ps_fed_tax', 'ps_fed_tax_addl', 'ps_fed_tax_refunded']}
              control={form.control}
              initialValues={initialPayslip}
            />
            <PayslipFormSection
              title="State Taxes"
              fields={['ps_state_tax', 'ps_state_disability', 'ps_state_tax_addl']}
              control={form.control}
              initialValues={initialPayslip}
            />
            <PayslipFormSection
              title="Retirement Savings"
              fields={['ps_401k_pretax', 'ps_401k_aftertax', 'ps_401k_employer']}
              control={form.control}
              initialValues={initialPayslip}
            />
            <PayslipFormSection
              title="Pretax Deductions"
              fields={['ps_pretax_medical', 'ps_pretax_fsa', 'ps_pretax_vision', 'ps_pretax_dental']}
              control={form.control}
              initialValues={initialPayslip}
            />
          </div>

          {hasYearChanged && (
            <Alert variant="destructive">
              <AlertTitle>Tax Year Change Warning</AlertTitle>
              <AlertDescription>
                The pay date year has changed. This will cause the payslip to move to a different Tax Year.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="ps_is_estimated"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value ?? false} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Values are estimated</FormLabel>
                </FormItem>
              )}
            />

            {initialPayslip && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" type="button">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete this payslip entry.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                      {isDeleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        'Delete'
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <div className="flex space-x-2">
              {initialPayslip && (
                <Button type="submit" onClick={() => setSaveMode('edit')} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Edits...
                    </>
                  ) : (
                    'Save Edits'
                  )}
                </Button>
              )}
              <Button type="submit" onClick={() => setSaveMode('new')} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save as New'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
