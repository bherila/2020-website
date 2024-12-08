import { z } from 'zod'

export interface AccountTableRow {
  acct_id?: number
  acct_owner?: number
  acct_name?: string
}

export const AccountTableSchema = z.object({
  acct_id: z.number().optional(),
  acct_owner: z.number().optional(),
  acct_name: z.string().min(1).max(50),
})

// TypeScript interface for the table
export interface AccountSpend {
  spend_id?: number
  account_id?: number
  spend_date: string | null
  spend_category?: string | null
  spend_description: string | null
  spend_amount: number
  is_business?: boolean
  transaction_type?: string | null
  notes?: string | null
}

// Zod schema for the table
export const AccountSpendSchema = z.object({
  spend_id: z.number().optional(),
  account_id: z.number().optional(),
  spend_date: z.string().nullable(),
  spend_category: z.string().max(40).nullable().optional(),
  spend_description: z.string().max(100).nullable(),
  spend_amount: z.number(),
  is_business: z.boolean().optional().default(false),
  transaction_type: z.string().max(20).nullable().optional(),
  notes: z.string().max(50).nullable().optional(),
})
