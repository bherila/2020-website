import deepRemoveKey from '@/lib/DeepRemoveKey'
import currency from 'currency.js'
import { fin_payslip, fin_payslip_col } from '@/app/payslip/payslipDbCols'

const mentionText = (o: any, prop: string): string | null =>
  (o.properties ?? o.propertiesList).find((p: any) => p.type === prop)
    ?.mentionText ?? null

const normVal = (o: any, prop: string): string | null =>
  (o.properties ?? o.propertiesList).find((p: any) => p.type === prop)
    ?.normalizedValue?.text ?? null

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

  const entities = obj?.document?.entitiesList ?? obj?.document?.entities
  for (let o of entities ?? []) {
    if (o.type === 'deduction_item') {
      parsed.push({
        item: mentionText(o, 'deduction_type'),
        amount: currency(normVal(o, 'deduction_this_period') ?? 0),
        ytd: normVal(o, 'deduction_ytd'),
      })
    } else if (o.type === 'earning_item') {
      parsed.push({
        item: mentionText(o, 'earning_type'),
        amount: currency(normVal(o, 'earning_this_period') ?? 0),
        ytd: normVal(o, 'earning_ytd'),
      })
    } else if (o.type === 'tax_item') {
      parsed.push({
        item: mentionText(o, 'tax_type'),
        amount: currency(normVal(o, 'tax_this_period') ?? 0),
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
        console.log({
          item: moneyTypes[mti] ?? null,
          amount: o.normalizedValue.text,
        })
        parsed.push({
          item: moneyTypes[mti] ?? null,
          amount: currency(o.normalizedValue.text || 0),
        })
        continue
      }
      // todo: const ytdTypes = ['gross_earnings_ytd', 'net_pay_ytd']

      // not handled
      leftOverEntities.push(o)
    }
  }

  // Special case for 401k employer match which is not extracted :(
  if (!parsed.find((row) => row.item === '401k Employer Match')) {
    const match = json.match(
      /401k Employer Match\\n([\d,]+\.?\d{0,2})\\n([\d,]+\.?\d{0,2})\\n([\d,]+\.?\d{0,2})\\n([\d,]+\.?\d{0,2})\\n/,
    )
    if (Array.isArray(match) && match[1]) {
      parsed.push({
        item: '401k Employer Match',
        amount: match[1].replace(',', ''),
      })
    }
  }

  // Create the mapping
  const mapping: { [key: string]: fin_payslip_col } = {
    Salary: 'ps_salary',
    'Choice Day Payout': 'ps_vacation_payout',
    '401k Salary': 'ps_401k_pretax',
    'Pretax Medical': 'ps_pretax_medical',
    'Pretax Dental': 'ps_pretax_dental',
    'Pretax Vision': 'ps_pretax_vision',
    'Medical FSA': 'ps_pretax_fsa',
    'After Tax 401k Salary': 'ps_401k_aftertax',
    'Life@ Choice': 'imp_fitness',
    'Life @ Choice': 'imp_fitness',
    '*Imp Legal': 'imp_legal',
    '*Imp LTD': 'imp_ltd',
    'Imp Legal': 'imp_legal',
    'Imp LTD': 'imp_ltd',
    'Restricted Stock Units': 'earnings_rsu',
    'Performance Bonus': 'earnings_bonus',
    OASDI: 'ps_oasdi',
    Medicare: 'ps_medicare',
    'Federal Withholding': 'ps_fed_tax',
    'RSU Tax Offset': 'ps_fed_tax',
    'RSU Excess Refund': 'ps_fed_tax_refunded',
    'Voluntary Legal ben': 'other',
    'State Tax - CA': 'ps_state_tax',
    'State Tax CA': 'ps_state_tax',
    'CA VDI CAVDI': 'ps_state_disability',
    'CA VDI-CAVDI': 'ps_state_disability',
    'CA VDI - CAVDI': 'ps_state_disability',
    '401k Bonus': 'ps_401k_pretax',
    'AFTAX 401k Bonus': 'ps_401k_aftertax',
    '401k Employer Match': 'ps_401k_employer',
    net_pay: 'earnings_net_pay',
    gross_earnings: 'earnings_gross',
    pay_date: 'pay_date',
    start_date: 'period_start',
    state_additional_tax: 'ps_state_tax_addl',
    end_date: 'period_end',
    federal_additional_tax: 'ps_fed_tax_addl',
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
