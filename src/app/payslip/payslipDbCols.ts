import { z } from 'zod'
import currency from 'currency.js'

export type pay_data = string | number | currency | null

export interface fin_payslip {
  period_start?: any
  period_end?: any
  pay_date?: any
  earnings_gross?: pay_data
  earnings_bonus?: pay_data
  earnings_net_pay?: pay_data
  earnings_rsu?: pay_data
  imp_other?: pay_data
  imp_legal?: pay_data
  imp_fitness?: pay_data
  imp_ltd?: pay_data
  ps_oasdi?: pay_data
  ps_medicare?: pay_data
  ps_fed_tax?: pay_data
  ps_fed_tax_addl?: pay_data
  ps_state_tax?: pay_data
  ps_state_tax_addl?: pay_data
  ps_state_disability?: pay_data
  ps_401k_pretax?: pay_data
  ps_401k_aftertax?: pay_data
  ps_401k_employer?: pay_data
  ps_fed_tax_refunded?: pay_data
  ps_payslip_file_hash?: string | null
  ps_is_estimated?: boolean | null
  ps_comment?: string | null
  ps_vacation_payout?: pay_data
  ps_pretax_medical?: pay_data
  ps_pretax_vision?: pay_data
  ps_pretax_dental?: pay_data
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
  earnings_gross: maybeNum,
  earnings_bonus: maybeNum,
  earnings_net_pay: maybeNum,
  earnings_rsu: maybeNum,
  imp_other: maybeNum,
  imp_legal: maybeNum,
  imp_fitness: maybeNum,
  imp_ltd: maybeNum,
  ps_oasdi: maybeNum,
  ps_medicare: maybeNum,
  ps_fed_tax: maybeNum,
  ps_fed_tax_addl: maybeNum,
  ps_state_tax: maybeNum,
  ps_state_disability: maybeNum,
  ps_state_tax_addl: maybeNum,
  ps_401k_pretax: maybeNum,
  ps_401k_aftertax: maybeNum,
  ps_401k_employer: maybeNum,
  ps_fed_tax_refunded: maybeNum,
  ps_payslip_file_hash: maybeStr,
  ps_is_estimated: z.coerce.boolean().default(false),
  ps_comment: maybeStr,
  ps_pretax_medical: maybeNum,
  ps_pretax_fsa: maybeNum,
  ps_pretax_vision: maybeNum,
  ps_pretax_dental: maybeNum,
  ps_salary: maybeNum,
  ps_vacation_payout: maybeNum,
  other: z.any(),
})

export type fin_payslip_col = keyof fin_payslip
