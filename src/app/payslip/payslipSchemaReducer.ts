import deepRemoveKey from '@/lib/DeepRemoveKey'
import currency from 'currency.js'
import { fin_payslip, fin_payslip_col } from '@/app/payslip/payslipDbCols'

const mentionText = (o: any, prop: string): string | null =>
  o.properties.find((p: any) => p.type === prop)?.mentionText ?? null

const normVal = (o: any, prop: string): string | null =>
  o.properties.find((p: any) => p.type === prop)?.normalizedValue?.text ?? null

export function parseEntities(json: string): fin_payslip {
  let obj: any = {}
  try {
    obj = JSON.parse(json)
    deepRemoveKey(obj, 'textAnchor')
    deepRemoveKey(obj, 'pageAnchor')
    deepRemoveKey(obj, 'layout')
    deepRemoveKey(obj, 'blocks')
    deepRemoveKey(obj, 'paragraphs')
    deepRemoveKey(obj, 'lines')
    deepRemoveKey(obj, 'detectedLanguages')
    deepRemoveKey(obj, 'pages')
  } catch {
    obj = {}
  }
  const parsed: any[] = []
  const leftOverEntities: any[] = []

  for (let o of obj?.document?.entities ?? []) {
    if (o.type === 'deduction_item') {
      parsed.push({
        item: mentionText(o, 'deduction_type'),
        amount: normVal(o, 'deduction_this_period'),
        ytd: normVal(o, 'deduction_ytd'),
      })
    } else if (o.type === 'earning_item') {
      parsed.push({
        item: mentionText(o, 'earning_type'),
        amount: normVal(o, 'earning_this_period'),
        ytd: normVal(o, 'earning_ytd'),
      })
    } else if (o.type === 'tax_item') {
      console.log(o)
      parsed.push({
        item: mentionText(o, 'tax_type'),
        amount: normVal(o, 'tax_this_period'),
        ytd: normVal(o, 'tax_ytd'),
      })
    } else {
      const dateTypes = ['start_date', 'end_date', 'pay_date']
      const dti = dateTypes.indexOf(o.type)
      if (dti >= 0) {
        parsed.push({
          item: dateTypes[dti] ?? null,
          date: o.normalizedValue.text, // yyyy-mm-dd
        })
        continue
      }
      const moneyTypes = [
        'gross_earnings',
        'net_pay',
        'federal_additional_tax',
        'state_additional_tax',
      ]
      const mti = moneyTypes.indexOf(o.type)
      if (mti >= 0) {
        parsed.push({
          item: moneyTypes[mti] ?? null,
          amount: o.normalizedValue.text, // yyyy-mm-dd
        })
        continue
      }
      // todo: const ytdTypes = ['gross_earnings_ytd', 'net_pay_ytd']

      // not handled
      leftOverEntities.push(o)
    }
  }

  // Create the mapping
  const mapping: { [key: string]: fin_payslip_col } = {
    Salary: 'ps_salary',
    '401k Salary': 'ps_401k_pretax',
    'Pretax Medical': 'ps_pretax_medical',
    'Medical FSA': 'ps_pretax_fsa',
    'After Tax 401k Salary': 'ps_401k_aftertax',
    'Voluntary Legal ben': 'ps_imputed_income',
    '*Imp Legal': 'ps_imputed_income',
    '*Imp LTD': 'ps_imputed_income',
    'Restricted Stock Units': 'ps_rsu',
    OASDI: 'ps_oasdi',
    Medicare: 'ps_medicare',
    'Federal Withholding': 'ps_fed_tax',
    'State Tax CA': 'ps_state_tax',
    'CA VDI CAVDI': 'ps_state_disability',
    net_pay: 'ps_net_pay',
    gross_earnings: 'ps_gross_earnings',
    pay_date: 'pay_date',
    start_date: 'period_start',
    state_additional_tax: 'ps_state_tax',
    end_date: 'period_end',
    federal_additional_tax: 'ps_fed_tax',
  }

  // Initialize the result object
  const result: fin_payslip = {}

  // Map the data to the desired object fields
  parsed.forEach((item) => {
    const field = mapping[item.item]
    if (field) {
      if (item.amount === null) {
        result[field] ??= null
      } else if (item.date != null) {
        result[field] = item.date
      } else {
        result[field] = currency(item.amount).add(currency(result[field])).value
      }
    } else {
      //result['X-' + item.item] =item.amount || item.date
      leftOverEntities.push(item)
    }
  })

  return { ...result, other: leftOverEntities }
}
