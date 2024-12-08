import { z } from 'zod'

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

// Schema validation for the account_line_items table
export const AccountLineItemSchema = z.object({
  t_id: z.number().optional(),
  t_account: z.number().nullable().optional(),
  t_date: z.coerce.date(),
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
      'Meals 50%',
      'Meals 100%',
      'Utilities',
      'Wages',
      'Other',
      'Tuition',
      'Energy Efficient Commercial Buildings',
    ])
    .nullable(),
  t_amt: z.coerce.number(),
  t_symbol: z.string().max(20).nullable(),
  t_cusip: z.string().max(20).nullable().optional(),
  t_qty: z.coerce.number().default(0),
  t_price: z.coerce.number().default(0),
  t_commission: z.coerce.number().default(0),
  t_fee: z.coerce.number().default(0),
  t_method: z.string().max(20).nullable(),
  t_source: z.string().max(20).nullable(),
  t_origin: z.string().max(20).nullable(),
  opt_expiration: z.coerce
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable()
    .optional(),
  opt_type: z.enum(['call', 'put']).nullable().optional(),
  opt_strike: z.coerce.number().default(0).nullable().optional(),
  t_description: z.string().max(255).nullable(),
  t_comment: z.string().max(255).nullable(),
  t_from: z.coerce.date().nullable(),
  t_to: z.coerce.date().nullable(),
  t_interest_rate: z.string().max(20).nullable(),
  parent_t_id: z.number().nullable(),
})

export type TransactionType = z.infer<typeof transactionTypeSchema>

export type AccountLineItem = z.infer<typeof AccountLineItemSchema>
