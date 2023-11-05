import { z } from 'zod'
import currency from 'currency.js'

export type pay_data = string | number | currency | null

export interface fin_payslip {
  period_start?: any
  period_end?: any
  pay_date?: any
  ps_gross_earnings?: pay_data
  ps_bonus?: pay_data
  ps_net_pay?: pay_data
  ps_rsu?: pay_data
  ps_imputed_income?: pay_data
  ps_oasdi?: pay_data
  ps_medicare?: pay_data
  ps_fed_tax?: pay_data
  ps_state_tax?: pay_data
  ps_state_disability?: pay_data
  ps_401k_pretax?: pay_data
  ps_401k_aftertax?: pay_data
  ps_fed_tax_refunded?: pay_data
  ps_payslip_file_hash?: string | null
  ps_is_estimated?: boolean | null
  ps_comment?: string | null
  ps_pretax_medical?: pay_data
  ps_pretax_fsa?: pay_data
  ps_salary?: pay_data
  other?: any
}

const maybeStr = z.coerce.string().nullable().optional()
const maybeNum = z.coerce.number().default(0)

export const fin_payslip_schema = z.object({
  period_start: maybeStr,
  period_end: maybeStr,
  pay_date: maybeStr,
  ps_gross_earnings: maybeNum,
  ps_bonus: maybeNum,
  ps_net_pay: maybeNum,
  ps_rsu: maybeNum,
  ps_imputed_income: maybeNum,
  ps_oasdi: maybeNum,
  ps_medicare: maybeNum,
  ps_fed_tax: maybeNum,
  ps_state_tax: maybeNum,
  ps_state_disability: maybeNum,
  ps_401k_pretax: maybeNum,
  ps_401k_aftertax: maybeNum,
  ps_fed_tax_refunded: maybeNum,
  ps_payslip_file_hash: maybeStr,
  ps_is_estimated: z.coerce.boolean().default(false),
  ps_comment: maybeStr,
  ps_pretax_medical: maybeNum,
  ps_pretax_fsa: maybeNum,
  ps_salary: maybeNum,
  other: z.any(),
})

export type fin_payslip_col = keyof fin_payslip
