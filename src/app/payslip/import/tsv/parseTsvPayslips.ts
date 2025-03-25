import { fin_payslip, fin_payslip_schema } from '@/app/payslip/payslipDbCols'
import currency from 'currency.js'

// Helper function to extract value from a line
function extractValue(line: string, label: string): string | null {
  const regex = new RegExp(`${label}\\s*([^\\t]+)`, 'i')
  const match = line.match(regex)
  return match ? match[1].trim() : null
}

// Improved helper function to parse date
function parseDate(dateStr: string): string | undefined {
  if (!dateStr) return undefined

  // Handle different date formats
  const formats = [
    /(\d{2})\/(\d{2})\/(\d{4})/, // MM/DD/YYYY
    /(\d{4})-(\d{2})-(\d{2})/, // YYYY-MM-DD
  ]

  for (const format of formats) {
    const match = dateStr.match(format)
    if (match) {
      if (match[3].length === 4) {
        // MM/DD/YYYY format
        return `${match[3]}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`
      } else {
        // YYYY-MM-DD format
        return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`
      }
    }
  }

  return undefined
}

// Improved helper function to parse currency
function parseCurrency(value: string | null): number {
  if (!value) return 0

  // Remove commas, $ signs, and handle parentheses for negative values
  let cleanValue = value.replace(/[,$()]/g, '').trim()

  // Check if value was in parentheses (indicating negative)
  const isNegative = value.includes('(') && value.includes(')')

  const numValue = parseFloat(cleanValue) || 0
  return isNegative ? -numValue : numValue
}

export function parseTsvPayslips(tsvContent: string): fin_payslip[] {
  const lines = tsvContent.split('\n')
  const payslips: fin_payslip[] = []
  let currentPayslip: Partial<fin_payslip> = {}
  let inPayslipSection = false
  let dateInfoLine: string | null = null
  let salaryLine: string | null = null
  let rsuLine: string | null = null
  let isValidSection = false

  for (const line of lines) {
    // Check for payslip separator
    if (line.trim().startsWith('=====')) {
      // Save previous payslip if exists
      if (Object.keys(currentPayslip).length > 0) {
        payslips.push(fin_payslip_schema.parse(currentPayslip))
      }
      // Reset for next payslip
      currentPayslip = {}
      inPayslipSection = false
      dateInfoLine = null
      salaryLine = null
      rsuLine = null
      isValidSection = false
      continue
    }

    // Capture the line with date information
    if (line.includes('Pay Period Begin') && line.includes('Pay Period End')) {
      inPayslipSection = true
      continue
    }

    // Capture the line with actual date values
    if (inPayslipSection && line.includes('332088')) {
      dateInfoLine = line
      continue
    }

    // Capture the Salary line
    if (inPayslipSection && line.trim().startsWith('Salary\t')) {
      salaryLine = line
      continue
    }

    // Capture the Restricted Stock Units line
    if (inPayslipSection && line.trim().startsWith('Restricted Stock Units\t')) {
      rsuLine = line
      continue
    }

    // Check for section header with Amount column
    if (line.includes('Description') && line.includes('Amount') && line.includes('YTD')) {
      isValidSection = true
      continue
    }

    // Skip sections without Amount column
    if (line.includes('Description') && line.includes('YTD') && !line.includes('Amount')) {
      isValidSection = false
      continue
    }

    if (!inPayslipSection || !isValidSection) continue

    // Parse dates from the captured line
    if (dateInfoLine) {
      const dateFields = dateInfoLine.split('\t')
      if (dateFields.length >= 4) {
        // Assuming the order is: Employee ID, Pay Period Begin, Pay Period End, Check Date
        currentPayslip.period_start = parseDate(dateFields[2])
        currentPayslip.period_end = parseDate(dateFields[3])
        currentPayslip.pay_date = parseDate(dateFields[3])
      }
      dateInfoLine = null
    }

    // Parse salary from the captured line
    if (salaryLine) {
      const salaryFields = salaryLine.split('\t')
      if (salaryFields.length >= 5) {
        // 5th column is the salary amount
        currentPayslip.ps_salary = parseCurrency(salaryFields[4])
      }
      salaryLine = null
    }

    // Parse RSU from the captured line
    if (rsuLine) {
      const rsuFields = rsuLine.split('\t')
      if (rsuFields.length >= 5) {
        // 5th column is the RSU amount
        currentPayslip.earnings_rsu = parseCurrency(rsuFields[4])
      }
      rsuLine = null
    }

    // Expanded parsing for various fields
    const fieldMappings: { [key: string]: keyof fin_payslip }[] = [
      { 'Performance Bonus': 'earnings_bonus' },
      { 'RSU Tax Offset': 'ps_fed_tax' },
      { 'RSU Excess Refund': 'ps_fed_tax_refunded' },
      { 'After Tax 401k Salary': 'ps_401k_aftertax' },
      { 'After Tax 401k Bonus': 'ps_401k_aftertax' },
      { '401k Salary': 'ps_401k_pretax' },
      { '401k Bonus': 'ps_401k_pretax' },
      { 'Long term disability premium imputed income': 'imp_ltd' },
      { 'Voluntary Legal ben': 'imp_legal' },
      { OASDI: 'ps_oasdi' },
      { Medicare: 'ps_medicare' },
      { 'Federal Withholding': 'ps_fed_tax' },
      { 'State Tax - CA': 'ps_state_tax' },
      { 'Meta CA VDI': 'ps_state_disability' },
      { 'Pretax Dental': 'ps_pretax_dental' },
      { 'Pretax Medical': 'ps_pretax_medical' },
      { 'Pretax Vision': 'ps_pretax_vision' },
      { 'Medical FSA': 'ps_pretax_fsa' },
    ]

    for (const mapping of fieldMappings) {
      const [taxName, fieldName] = Object.entries(mapping)[0]
      if (line.includes(taxName)) {
        const amountMatch = line.match(new RegExp(`${taxName}\\s*([\\(\\)\\d,.$]+)`))
        if (amountMatch) {
          currentPayslip[fieldName] = Math.abs(parseCurrency(amountMatch[1]))
        }
      }
    }

    // Parse net pay
    if (line.includes('Current and YTD Totals')) {
      const netPayMatch = line.match(/Net Pay\s*([\\(\\)\\d,.$]+)/)
      if (netPayMatch) {
        currentPayslip.earnings_net_pay = parseCurrency(netPayMatch[1])
      }
    }
  }

  // Add last payslip
  if (Object.keys(currentPayslip).length > 0) {
    payslips.push(fin_payslip_schema.parse(currentPayslip))
  }

  return payslips
}
