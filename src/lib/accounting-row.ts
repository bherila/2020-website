import currency from 'currency.js'

import { DateContainer, parseDate } from '@/lib/DateHelper'

import { OptionType, StockOptionSchema } from '../components/matcher'
import { AccountLineItem } from '@/server_lib/AccountLineItem.server'

export const TransactionTypes = [
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
] as const

export interface EtradeSchema {
  id: string
  TransactionDate: DateContainer | null
  TransactionType: string
  SecurityType: string
  Symbol: string
  Quantity: currency
  Amount: currency
  Price: currency
  Commission: currency
  Fee: currency
  Description: string
  Comment: string
  StockOption: StockOptionSchema | null
  FromDate: string | null
  ToDate: string | null
  InterestRate: string | null
}

export function db2eTrade(row: AccountLineItem): EtradeSchema {
  return {
    id: row.t_id!.toString(),
    TransactionDate: parseDate(row.t_date),
    TransactionType: row.t_type!,
    SecurityType: '',
    Symbol: row.t_symbol!,
    Amount: currency(row.t_amt!.toString()),
    Price: currency(row.t_price!.toString()),
    Quantity: currency(row.t_qty!),
    Commission: currency(row.t_commission!),
    Fee: currency(row.t_fee!),
    StockOption: {
      symbol: row.t_symbol!,
      strike: currency(row.opt_strike!),
      type: StockOptionSchema.TypeMap.get(row.opt_type!.toLowerCase()) ?? null,
      maturity: parseDate(row.opt_expiration),
    },
    Description: row.t_description ?? '',
    Comment: row.t_comment!,
    FromDate: row.t_from!,
    ToDate: row.t_to!,
    InterestRate: row.t_interest_rate!,
  }
}

export function eTrade2db(schema: EtradeSchema): AccountingDbRow {
  return {
    // t_id: schema.id .. auto increment
    t_account: '',
    t_date: schema.TransactionDate?.formatYMD(),
    t_type: schema.TransactionType as (typeof TransactionTypes)[number],
    t_symbol: schema.Symbol,
    t_qty: schema.Quantity.value,
    t_amt: schema.Amount.value,
    t_price: schema.Price.value,
    t_commission: schema.Commission.value,
    t_fee: schema.Fee.value,
    t_method: null,
    t_source: null,
    t_origin: null,
    t_description: schema.Description,
    t_comment: schema.Comment,
    opt_expiration: schema.StockOption?.maturity?.formatYMD(),
    opt_type: schema.StockOption?.type ?? '?',
    opt_strike: schema.StockOption?.strike?.value,
    t_from: schema.FromDate ?? null,
    t_to: schema.ToDate ?? null,
    t_interest_rate: schema.InterestRate ?? null,
  }
}
