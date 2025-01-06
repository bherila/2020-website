'use client'
import { useForm, Controller } from 'react-hook-form'
import { fin_payslip } from '@/app/payslip/payslipDbCols'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const PayrollForm: React.FC<{ onSave?: (data: fin_payslip) => void }> = ({ onSave }) => {
  const form = useForm<fin_payslip>()

  const onSubmit = (data: fin_payslip) => {
    if (onSave) {
      onSave(data)
    }
  }

  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h3>Pay Period</h3>
          <div className="grid grid-cols-3 gap-4">
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
          </div>
          <h3>Earnings</h3>
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <h3>Imputed Income</h3>
          <div className="grid grid-cols-3 gap-4">
            {['imp_legal', 'imp_fitness', 'imp_ltd', 'imp_other'].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof fin_payslip}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <h3>Federal Taxes Paid</h3>
          <div className="grid grid-cols-3 gap-4">
            {['ps_oasdi', 'ps_medicare', 'ps_fed_tax', 'ps_fed_tax_addl', 'ps_fed_tax_refunded'].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof fin_payslip}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <h3>State Taxes</h3>
          <div className="grid grid-cols-3 gap-4">
            {['ps_state_tax', 'ps_state_disability', 'ps_state_tax_addl'].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof fin_payslip}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <h3>Retirement Savings</h3>
          <div className="grid grid-cols-3 gap-4">
            {['ps_401k_pretax', 'ps_401k_aftertax', 'ps_401k_employer'].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof fin_payslip}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <h3>Pretax Deductions</h3>
          <div className="grid grid-cols-3 gap-4">
            {['ps_pretax_medical', 'ps_pretax_fsa', 'ps_pretax_vision', 'ps_pretax_dental'].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof fin_payslip}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

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

          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  )
}

export default PayrollForm
