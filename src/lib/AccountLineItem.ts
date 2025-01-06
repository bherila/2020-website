import { z } from 'zod'
import currency from 'currency.js'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

export const transactionTypeSchema = z
  .enum([
    'bought to open',
    'sold short',
    'sold to close',
    'journal',
    'interest',
    'transfer',
    'option expiration',
    'bought to cover',
    'dividend',
    'credit',
    'deposit',
    'equity',
    'spend',
    'refund',
  ])
  .nullable()

const currencyNumeric = z.union([
  z.string().transform((val) => {
    try {
      return currency(val).value
    } catch (e) {
      throw new Error(`Invalid currency value: ${val}`)
    }
  }),
  z.number(),
])

const ymdstring = z.union([
  z.date().transform((date) => dayjs(date).format('YYYY-MM-DD')),
  z.coerce.string().transform((val) => {
    // Define multiple parsing formats
    const formats = ['YYYY-MM-DD', 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'MM-DD-YYYY', 'DD-MM-YYYY']

    // Try parsing with each format
    for (const format of formats) {
      const parsed = dayjs(val, format, true)
      if (parsed.isValid()) {
        return parsed.format('YYYY-MM-DD')
      }
    }

    // If no format matches, try general parsing
    const generalParsed = dayjs(val)
    if (generalParsed.isValid()) {
      return generalParsed.format('YYYY-MM-DD')
    }

    // Throw error if parsing fails
    throw new Error(`Invalid date format: ${val}`)
  }),
])

// Schema validation for the account_line_items table
export const AccountLineItemSchema = z.object({
  t_id: z.number().optional(),
  t_account: z.number().nullable().optional(),
  t_date: ymdstring,
  t_type: transactionTypeSchema,
  t_schc_category: z
    .enum([
      'Advertising',
      'Car and truck',
      'Commissions and fees',
      'Contract labor',
      'Depletion',
      'Depreciation',
      'Employee benefit',
      'Insurance other than health',
      'Interest: Mortgage',
      'Interest: Other',
      'Legal and Professional',
      'Office Expense',
      'Pension and Profit Sharing',
      'Rent or lease',
      'Rent or lease: Vehicles',
      'Rent or lease: Property',
      'Repairs and maintenance',
      'Supplies',
      'Taxes and licenses',
      'Travel',
      'Meals 0%',
      'Meals 50%',
      'Meals 100%',
      'Utilities',
      'Wages',
      'Other',
      'Tuition',
      'Energy Efficient Commercial Buildings',
    ])
    .nullable()
    .optional(),
  t_amt: currencyNumeric.default(0),
  t_symbol: z.string().max(20).nullable().optional(),
  t_cusip: z.string().max(20).nullable().optional(),
  t_qty: z.coerce.number().default(0),
  t_price: z.coerce.number().default(0),
  t_commission: z.coerce.number().default(0),
  t_fee: z.coerce.number().default(0),
  t_method: z.string().max(20).nullable().optional(),
  t_source: z.string().max(20).nullable().optional(),
  t_origin: z.string().max(20).nullable().optional(),
  opt_expiration: ymdstring.nullable().optional(),
  opt_type: z.enum(['call', 'put']).nullable().optional(),
  opt_strike: currencyNumeric.default(0).nullable().optional(),
  t_description: z.string().max(255).nullable().optional(),
  t_comment: z.string().max(255).nullable().optional(),
  t_from: ymdstring.nullable().optional(),
  t_to: ymdstring.nullable().optional(),
  t_interest_rate: z.string().max(20).nullable().optional(),
  parent_t_id: z.number().nullable().optional(),
})

export type TransactionType = z.infer<typeof transactionTypeSchema>

export type AccountLineItem = z.infer<typeof AccountLineItemSchema>
