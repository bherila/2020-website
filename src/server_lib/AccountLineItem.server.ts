import 'server-only'
import { AccountLineItem, AccountLineItemSchema } from '@/lib/AccountLineItem'
import db, { sql } from './db'

// Create a single line item
export async function createLineItem(item: AccountLineItem) {
  return bulkCreateLineItems([item])
}

// Bulk create line items
export async function bulkCreateLineItems(items: AccountLineItem[]) {
  const validated = items.map((item) => AccountLineItemSchema.parse(item))
  const values = validated.map((item) => [
    item.t_account,
    item.t_date,
    item.t_type,
    item.t_schc_category,
    item.t_amt,
    item.t_symbol,
    item.t_qty,
    item.t_price,
    item.t_commission,
    item.t_fee,
    item.t_method,
    item.t_source,
    item.t_origin,
    item.opt_expiration,
    item.opt_type,
    item.opt_strike,
    item.t_description,
    item.t_comment,
    item.t_from,
    item.t_to,
    item.t_interest_rate,
    item.parent_t_id,
    new Date(),
  ])

  const result = await db.query(
    `
    INSERT INTO account_line_items (
      t_account, t_date, t_type, t_schc_category, t_amt, t_symbol, t_qty, t_price,
      t_commission, t_fee, t_method, t_source, t_origin, opt_expiration, opt_type,
      opt_strike, t_description, t_comment, t_from, t_to, t_interest_rate, parent_t_id,
      when_added
    )
    VALUES ?
  `,
    [values],
  )
  return result
}

// Get a single line item
export async function getLineItem(id: number) {
  const result = (await sql`
    SELECT * FROM account_line_items 
    WHERE t_id = ${id} 
    AND when_deleted IS NULL
  `) as AccountLineItem[]
  return result[0] as AccountLineItem | undefined
}

// Get line items for an account
export async function getLineItemsByAccount(accountId: number) {
  const result = (await sql`
    SELECT * FROM account_line_items 
    WHERE t_account = ${accountId}
    AND when_deleted IS NULL
    ORDER BY t_date DESC
  `) as AccountLineItem[]
  return result
}

// Update a line item
export async function updateLineItem(id: number, updates: Partial<AccountLineItem>) {
  const validated = AccountLineItemSchema.partial().parse(updates)
  const result = await sql`
    UPDATE account_line_items
    SET t_account = ${validated.t_account},
        t_date = ${validated.t_date},
        t_type = ${validated.t_type},
        t_schc_category = ${validated.t_schc_category},
        t_amt = ${validated.t_amt},
        t_symbol = ${validated.t_symbol},
        t_qty = ${validated.t_qty},
        t_price = ${validated.t_price},
        t_commission = ${validated.t_commission},
        t_fee = ${validated.t_fee},
        t_method = ${validated.t_method},
        t_source = ${validated.t_source},
        t_origin = ${validated.t_origin},
        opt_expiration = ${validated.opt_expiration},
        opt_type = ${validated.opt_type},
        opt_strike = ${validated.opt_strike},
        t_description = ${validated.t_description},
        t_comment = ${validated.t_comment},
        t_from = ${validated.t_from},
        t_to = ${validated.t_to},
        t_interest_rate = ${validated.t_interest_rate},
        parent_t_id = ${validated.parent_t_id},
        when_updated = NOW(),
        when_deleted = NULL
    WHERE t_id = ${id}
    AND when_deleted IS NULL
  `
  return result
}

// Soft delete a line item
export async function deleteLineItem(id: number) {
  const result = await sql`
    UPDATE account_line_items
    SET when_deleted = NOW()
    WHERE t_id = ${id}
    AND when_deleted IS NULL
  `
  return result
}

// Bulk soft delete line items
export async function bulkDeleteLineItems(ids: number[]) {
  const result = await sql`
    UPDATE account_line_items
    SET when_deleted = NOW()
    WHERE t_id IN (${ids})
    AND when_deleted IS NULL
  `
  return result
}
