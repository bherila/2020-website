import currency from 'currency.js'
import moment from 'moment'

import { OptionType, StockOptionSchema } from '../components/matcher'

/*
  create table accounting
  (
      t_id           bigint auto_increment,
      t_account      char(5)                    null,
      t_date         date                       not null,
      t_type         enum ('Bought To Open', 'Sold Short', 'Sold To Close', 'Journal', 'Interest', 'Transfer', 'Option Expiration', 'Bought To Cover', 'Dividend', 'Credit') null,
      t_symbol       char(5)                    null,
      t_qty          int            default 0   not null,
      t_amt          DECIMAL(13, 4) default 0   not null,
      t_price        DECIMAL(13, 4) default 0   not null,
      t_commission   DECIMAL(13, 4) default 0   not null,
      t_method       char(5)                    null,
      t_source       char(5)                    null,
      t_origin       char(5)                    null,
      opt_expiration date                       null,
      opt_type       enum ('call', 'put')       null,
      opt_strike     DECIMAL(13, 4) default 0   not null
      constraint accounting_pk
          primary key (t_id)
  );
 */

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

export interface AccountingDbRow {
  t_id?: number
  t_account?: string
  t_date?: string
  t_type?: (typeof TransactionTypes)[number]
  t_symbol?: string
  t_qty?: number
  t_amt?: number // number as string (mysql DECIMAL)
  t_price?: number // number as string (mysql DECIMAL)
  t_commission?: number // number as string (mysql DECIMAL)
  t_fee?: number // number as string (mysql DECIMAL)
  t_method?: string
  t_source?: string
  t_origin?: string
  t_description?: string
  t_comment?: string
  opt_expiration?: string
  opt_type?: OptionType
  opt_strike?: number
  t_from?: string
  t_to?: string
  t_interest_rate?: string
}

export interface EtradeSchema {
  id: string
  TransactionDate: string
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
  FromDate: string
  ToDate: string
  InterestRate: string
}

export function db2eTrade(row: AccountingDbRow): EtradeSchema {
  return {
    id: row.t_id.toString(),
    TransactionDate: moment(row.t_date).format('YYYY-MM-DD'),
    TransactionType: row.t_type,
    SecurityType: '',
    Symbol: row.t_symbol,
    Amount: currency(row.t_amt),
    Price: currency(row.t_price),
    Quantity: currency(row.t_qty),
    Commission: currency(row.t_commission),
    Fee: currency(row.t_fee),
    StockOption: {
      symbol: row.t_symbol,
      strike: currency(row.opt_strike),
      type: StockOptionSchema.TypeMap.get(row.opt_type.toLowerCase()) || null,
      maturity: moment(row.opt_expiration),
    },
    Description: row.t_description,
    Comment: row.t_comment,
    FromDate: row.t_from,
    ToDate: row.t_to,
    InterestRate: row.t_interest_rate,
  }
}

export function eTrade2db(schema: EtradeSchema): AccountingDbRow {
  return {
    // t_id: schema.id .. auto increment
    t_account: '',
    t_date: schema.TransactionDate,
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
    opt_expiration: schema.StockOption?.maturity.format('YYYY-MM-DD'),
    opt_type: schema.StockOption?.type,
    opt_strike: schema.StockOption?.strike?.value,
    t_from: schema.FromDate,
    t_to: schema.ToDate,
    t_interest_rate: schema.InterestRate,
  }
}
