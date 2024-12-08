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
