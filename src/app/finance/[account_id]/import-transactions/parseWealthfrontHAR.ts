import { AccountLineItem, AccountLineItemSchema } from '@/lib/AccountLineItem'
import { parseDate } from '@/lib/DateHelper'
import currency from 'currency.js'
import { z } from 'zod'

const AccountSchema = z.object({
  account_id: z.number(),
  account_name: z.string(),
  account_sub_type: z.string(),
})

const DividendSchema = z.object({
  symbol: z.string(),
  ex_date: z.string(),
  amount_per_share: z.string(),
  amount: z.string(),
})

const TradeSchema = z.object({
  symbol: z.string(),
  type: z.string(),
  shares: z.number().optional(),
  share_price: z.string().optional(),
  date: z.string(),
  value: z.string(),
})

const DepositDetailsSchema = z.object({
  type: z.string(),
  state_display_name: z.string(),
  number_of_annual_recurrences: z.number(),
  next_transfer_date: z.string(),
  relationship_id: z.number().nullable(),
  amount: z.number(),
  recurring_type: z.string(),
  account_display_name: z.string(),
  source_account_id: z.number(),
  target_account_id: z.number(),
})

const CompletedTransferSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  class_type: z.string(),
  amount: z.string().nullable(),
  type: z.string(),
  transaction_type: z.string(),
  initiator_name: z.string().nullable(),
  dividends: z.array(DividendSchema).optional(),
  total_dividends: z.string().optional(),
  //stock_portfolio_id: z.coerce.number().optional().nullable(),
  trades: z.array(TradeSchema).optional(),
  long_description: z.string().optional(),
  harvested_amount: z.number().optional(),
  harvested_this_year: z
    .object({
      year: z.number(),
      harvested_losses: z.string(),
      potential_savings: z.string(),
    })
    .optional(),
  actions_in_words: z.string().optional(),
  show_total_value: z.boolean().optional(),
  //total_value: z.string().optional(),
  deposit_details: DepositDetailsSchema.optional(),
  source_account_id: z.coerce.string().optional(),
  target_account_id: z.coerce.string().optional(),
})

const PendingTransferSchema = z.object({
  needs_bank_verification: z.boolean(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  needs_confirmation: z.boolean(),
  is_cancellable: z.boolean(),
  type: z.string(),
  account: z.any().nullable(),
  transaction_type: z.string(),
  amount: z.string(),
  group_type: z.string(),
  state: z.string(),
  id: z.number(),
  customer_full_name: z.string(),
  deposit_details: DepositDetailsSchema.optional(),
  class_type: z.string(),
  expected_completion_date: z.string().nullable(),
  transfer_destination_selection: z.any().nullable(),
  initiator_name: z.string().nullable(),
  externalizedId: z.string(),
  source_account_id: z.coerce.string().optional(),
  target_account_id: z.coerce.string().optional(),
})

const TransfersSchema = z.object({
  unconfirmed_transfers: z.array(z.any()),
  terminated_transfers: z.array(z.any()),
  completed_transfers: z.array(CompletedTransferSchema),
  pending_transfers: z.array(PendingTransferSchema),
})

const RootSchema = z.object({
  account_id: z.number(),
  account: AccountSchema,
  risk_level: z.any().nullable(),
  annual_return: z.number(),
  account_value: z.number(),
  loan_value: z.number(),
  has_recurring_transfers: z.boolean(),
  disclosure: z.any().nullable(),
  transfers: TransfersSchema,
})

export function parseWealthfrontHAR(data: string): AccountLineItem[] {
  if (!data.startsWith('{')) {
    return []
  }

  // attempt to jSON deserialize
  let entries
  try {
    entries = JSON.parse(data).log.entries
  } catch (e) {
    console.warn('Wealthfront HAR parse error:', e)
    return []
  }
  if (!entries) {
    console.warn('No entries found in Wealthfront HAR', entries)
    return []
  }

  const wealthfrontData = entries
    .filter((entry: any) => entry.request?.url.includes('transfers-for-account?'))
    .map((entry: any) => entry.response?.content?.text as string)
    .filter(Boolean)
    .map((jsonString: string): null | z.infer<typeof RootSchema> => {
      try {
        const data = JSON.parse(jsonString)
        const result = RootSchema.parse(data)
        return result
      } catch (error) {
        console.error(error)
        return null
      }
    })

  const result: AccountLineItem[] = []
  const allTypes = new Set<string>()
  for (const data of wealthfrontData) {
    if (!data) {
      console.warn('Invalid Wealthfront data')
      continue
    }
    data.transfers.completed_transfers.forEach((transfer: z.infer<typeof CompletedTransferSchema>) => {
      const rows = convertCompletedTransfer(transfer)
      allTypes.add(transfer.type)
      result.push(...rows)
    })
  }

  if (allTypes.size > 0) {
    console.log('All types: ' + Array.from(allTypes).join(', '))
  }

  return result
}

// Function to convert CompletedTransferSchema to AccountLineItem(s)
function convertCompletedTransfer(
  transfer: z.infer<typeof CompletedTransferSchema>,
): z.infer<typeof AccountLineItemSchema>[] {
  const accountLineItems: z.infer<typeof AccountLineItemSchema>[] = []

  // Convert Dividends to AccountLineItems
  if (transfer.dividends) {
    transfer.dividends.forEach((dividend) => {
      const accountLineItem: z.infer<typeof AccountLineItemSchema> = {
        t_amt: currency(dividend.amount).toString(),
        t_comment: transfer.id.toString(),
        t_date: parseDate(transfer.created_at)?.formatYMD()!,
        t_description: 'Ex. date ' + (parseDate(dividend.ex_date)?.formatYMD() ?? dividend.ex_date),
        t_symbol: dividend.symbol,
        t_type: 'Dividend',
      }
      accountLineItems.push(accountLineItem)
    })
  }

  // Convert Trades to AccountLineItems
  if (transfer.trades) {
    transfer.trades.forEach((trade) => {
      const isSell = trade.type === 'SELL'
      const accountLineItem: z.infer<typeof AccountLineItemSchema> = {
        t_amt: currency(trade.value)
          .multiply(isSell ? 1 : -1)
          .toString(),
        t_comment: transfer.id.toString(),
        t_date: parseDate(trade.date)?.formatYMD()!,
        t_description: transfer.type,
        t_harvested_amount: currency(transfer.harvested_amount || '0').toString(),
        t_price: currency(trade.share_price || '0').toString(),
        t_qty: currency(trade.shares ?? 0).multiply(isSell ? -1 : 1).value,
        t_symbol: trade.symbol,
        t_type: trade.type,
      }
      accountLineItems.push(accountLineItem)
    })
  }

  // Convert the root AccountLineItem for type=advisory fee
  if (transfer.type == 'Advisory Fee') {
    const accountLineItem: z.infer<typeof AccountLineItemSchema> = {
      t_date: parseDate(transfer.created_at)?.formatYMD()!,
      t_type: transfer.type,
      t_amt: currency(transfer.amount!).multiply(-1).toString(),
      t_comment: transfer.id.toString(),
    }
    accountLineItems.push(accountLineItem)
  } else if (transfer.type == 'Transfer' || transfer.type == 'Deposit') {
    const accountLineItem: z.infer<typeof AccountLineItemSchema> = {
      t_date: parseDate(transfer.created_at)?.formatYMD()!,
      t_type: transfer.type,
      t_amt: currency(transfer.amount!).toString(),
      t_comment: transfer.long_description,
    }
    if (transfer.source_account_id && transfer.target_account_id) {
      accountLineItem.t_description =
        (accountLineItem.t_description ?? '') + `from #${transfer.source_account_id} to #${transfer.target_account_id}`
    }
    accountLineItems.push(accountLineItem)
  }

  return accountLineItems
}
