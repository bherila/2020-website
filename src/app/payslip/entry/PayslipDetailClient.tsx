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
import { useState } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { parseDate } from '@/lib/DateHelper'

interface PayslipDetailClientProps {
  initialPayslip?: fin_payslip
}

export default function PayrollForm({ initialPayslip }: PayslipDetailClientProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [saveMode, setSaveMode] = useState<'edit' | 'new'>('edit')

  const form = useForm<fin_payslip>({
    resolver: zodResolver(fin_payslip_schema),
    defaultValues: {
      ps_is_estimated: false,
      ...initialPayslip,
    },
  })

  const hasYearChanged =
    initialPayslip &&
    parseDate(form.watch('pay_date'))?.formatYMD()?.slice(0, 4) !==
      parseDate(initialPayslip.pay_date)?.formatYMD()?.slice(0, 4)

  const onSubmit = async (data: fin_payslip) => {
    setIsSubmitting(true)
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
      // TODO: Add user-friendly error handling
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
    try {
      await deletePayslip({
        period_start: initialPayslip.period_start,
        period_end: initialPayslip.period_end,
        pay_date: initialPayslip.pay_date,
      })
    } catch (error) {
      console.error('Failed to delete payslip:', error)
      // TODO: Add user-friendly error handling
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="container">
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
            <div className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-4">Earnings</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  'ps_salary',
                  'earnings_gross',
                  'earnings_bonus',
                  'earnings_rsu',
                  'earnings_net_pay',
                  'ps_vacation_payout',
                ].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof fin_payslip}
                    render={({ field: inputField }) => (
                      <FormItem>
                        <FormLabel>{field}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...inputField}
                            onChange={(e) => inputField.onChange(e.target.valueAsNumber)}
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

            <div className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-4">Imputed Income</h3>
              <div className="grid grid-cols-3 gap-4">
                {['imp_legal', 'imp_fitness', 'imp_ltd', 'imp_other'].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof fin_payslip}
                    render={({ field: inputField }) => (
                      <FormItem>
                        <FormLabel>{field}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...inputField}
                            onChange={(e) => inputField.onChange(e.target.valueAsNumber)}
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

            <div className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-4">Federal Taxes Paid</h3>
              <div className="grid grid-cols-3 gap-4">
                {['ps_oasdi', 'ps_medicare', 'ps_fed_tax', 'ps_fed_tax_addl', 'ps_fed_tax_refunded'].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof fin_payslip}
                    render={({ field: inputField }) => (
                      <FormItem>
                        <FormLabel>{field}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...inputField}
                            onChange={(e) => inputField.onChange(e.target.valueAsNumber)}
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

            <div className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-4">State Taxes</h3>
              <div className="grid grid-cols-3 gap-4">
                {['ps_state_tax', 'ps_state_disability', 'ps_state_tax_addl'].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof fin_payslip}
                    render={({ field: inputField }) => (
                      <FormItem>
                        <FormLabel>{field}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...inputField}
                            onChange={(e) => inputField.onChange(e.target.valueAsNumber)}
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

            <div className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-4">Retirement Savings</h3>
              <div className="grid grid-cols-3 gap-4">
                {['ps_401k_pretax', 'ps_401k_aftertax', 'ps_401k_employer'].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof fin_payslip}
                    render={({ field: inputField }) => (
                      <FormItem>
                        <FormLabel>{field}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...inputField}
                            onChange={(e) => inputField.onChange(e.target.valueAsNumber)}
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

            <div className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-4">Pretax Deductions</h3>
              <div className="grid grid-cols-3 gap-4">
                {['ps_pretax_medical', 'ps_pretax_fsa', 'ps_pretax_vision', 'ps_pretax_dental'].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof fin_payslip}
                    render={({ field: inputField }) => (
                      <FormItem>
                        <FormLabel>{field}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...inputField}
                            onChange={(e) => inputField.onChange(e.target.valueAsNumber)}
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
