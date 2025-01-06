import 'server-only'
import { AccountLineItem, AccountLineItemSchema } from '@/lib/AccountLineItem'
import { db } from './db'

// Create a single line item
export async function createLineItem(item: AccountLineItem) {
  return bulkCreateLineItems([item])
}

// Bulk create line items
export async function bulkCreateLineItems(items: AccountLineItem[]) {
  const validated = items.map((item) => AccountLineItemSchema.parse(item))
  
  const result = await db
    .insertInto('account_line_items')
    .values(validated.map(item => ({
      t_account: item.t_account || undefined,
      t_date: new Date(item.t_date),
      t_type: item.t_type,
      t_schc_category: item.t_schc_category || undefined,
      t_amt: item.t_amt.toString(),
      t_symbol: item.t_symbol || undefined,
      t_cusip: item.t_cusip || undefined,
      t_qty: item.t_qty,
      t_price: item.t_price.toString(),
      t_commission: item.t_commission.toString(),
      t_fee: item.t_fee.toString(),
      t_method: item.t_method || undefined,
      t_source: item.t_source || undefined,
      t_origin: item.t_origin || undefined,
      opt_expiration: item.opt_expiration ? new Date(item.opt_expiration) : undefined,
      opt_type: item.opt_type || undefined,
      opt_strike: item.opt_strike?.toString() || undefined,
      t_description: item.t_description || undefined,
      t_comment: item.t_comment || undefined,
      t_from: item.t_from || undefined,
      t_to: item.t_to || undefined,
      t_interest_rate: item.t_interest_rate || undefined,
      parent_t_id: item.parent_t_id || undefined,
      when_added: new Date(),
    })))
    .execute()

  return result
}

// Get line items for an account
export async function getLineItemsByAccount(accountId: number, getDeletedItems = false): Promise<AccountLineItem[]> {
  const result = await db
    .selectFrom('account_line_items')
    .selectAll()
    .where('t_account', '=', accountId)
    .where('when_deleted', getDeletedItems ? 'is not' : 'is', null)
    .orderBy('t_date', 'desc')
    .execute()

  // Format dates
  return result.map(item => ({
    ...item,
    opt_expiration: item.opt_expiration instanceof Date ? item.opt_expiration.toISOString().split('T')[0] : item.opt_expiration ?? undefined,
    opt_strike: item.opt_strike ? parseFloat(item.opt_strike) : undefined,
    t_amt: parseFloat(item.t_amt),
    t_commission: parseFloat(item.t_commission),
    t_date: item.t_date instanceof Date ? item.t_date.toISOString().split('T')[0] : item.t_date ?? undefined,
    t_fee: parseFloat(item.t_fee),
    t_price: parseFloat(item.t_price),
  }))
}

// Update a line item
export async function updateLineItem(id: number, updates: Partial<AccountLineItem>) {
  const validated = AccountLineItemSchema.partial().parse(updates)
  
  const result = await db
    .updateTable('account_line_items')
    .set({
      t_account: validated.t_account || undefined,
      t_date: validated.t_date,
      t_type: validated.t_type,
      t_schc_category: validated.t_schc_category || undefined,
      t_amt: validated.t_amt?.toString(),
      t_symbol: validated.t_symbol || undefined,
      t_cusip: validated.t_cusip || undefined,
      t_qty: validated.t_qty,
      t_price: validated.t_price?.toString(),
      t_commission: validated.t_commission?.toString(),
      t_fee: validated.t_fee?.toString(),
      t_method: validated.t_method || undefined,
      t_source: validated.t_source || undefined,
      t_origin: validated.t_origin || undefined,
      opt_expiration: validated.opt_expiration ? new Date(validated.opt_expiration) : undefined,
      opt_type: validated.opt_type || undefined,
      opt_strike: validated.opt_strike?.toString() || undefined,
      t_description: validated.t_description || undefined,
      t_comment: validated.t_comment || undefined,
      t_from: validated.t_from || undefined,
      t_to: validated.t_to || undefined,
      t_interest_rate: validated.t_interest_rate || undefined,
      parent_t_id: validated.parent_t_id || undefined,
      when_deleted: undefined
    })
    .where('t_id', '=', id)
    .where('when_deleted', 'is', null)
    .execute()

  return result
}

// Soft delete a line item
export async function deleteLineItem(id: number) {
  const result = await db
    .updateTable('account_line_items')
    .set({ when_deleted: new Date() })
    .where('t_id', '=', id)
    .where('when_deleted', 'is', null)
    .execute()

  return result
}

// Bulk soft delete line items
export async function bulkDeleteLineItems(ids: number[]) {
  const result = await db
    .updateTable('account_line_items')
    .set({ when_deleted: new Date() })
    .where('t_id', 'in', ids)
    .where('when_deleted', 'is', null)
    .execute()

  return result
}
