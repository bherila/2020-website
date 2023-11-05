/*
create table bherila.accounting
(
    t_id            bigint auto_increment
        primary key,
    t_account       int                                                                                                                                                                          null,
    t_date          date                                                                                                                                                                         not null,
    t_type          enum ('bought to open', 'sold short', 'sold to close', 'journal', 'interest', 'transfer', 'option expiration', 'bought to cover', 'dividend', 'credit', 'deposit', 'equity') null,
    t_symbol        varchar(20)                                                                                                                                                                  null,
    t_qty           int            default 0                                                                                                                                                     not null,
    t_amt           decimal(13, 4) default 0.0000                                                                                                                                                not null,
    t_price         decimal(13, 4) default 0.0000                                                                                                                                                not null,
    t_commission    decimal(13, 4) default 0.0000                                                                                                                                                not null,
    t_fee           decimal(13, 4) default 0.0000                                                                                                                                                not null,
    t_method        varchar(20)                                                                                                                                                                  null,
    t_source        varchar(20)                                                                                                                                                                  null,
    t_origin        varchar(20)                                                                                                                                                                  null,
    opt_expiration  date                                                                                                                                                                         null,
    opt_type        enum ('call', 'put')                                                                                                                                                         null,
    opt_strike      decimal(13, 4) default 0.0000                                                                                                                                                not null,
    t_description   varchar(255)                                                                                                                                                                 null,
    t_comment       varchar(255)                                                                                                                                                                 null,
    t_from          date                                                                                                                                                                         null,
    t_to            date                                                                                                                                                                         null,
    t_interest_rate varchar(20)                                                                                                                                                                  null
)
    engine = MyISAM
    row_format = COMPACT;

create index accounting_accounts_acct_id_fk
    on bherila.accounting (t_account);
 */
import { z } from 'zod'

export const TransactionTypes = Object.freeze([
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
])

// Define a Zod schema for the MySQL schema
// Create a Zod schema for validation
const AccountingSchema = z.object({
  t_id: z.number(),
  t_account: z.number().nullable().optional(),
  t_date: z.string(),
  t_type: z
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
    ])
    .nullable()
    .optional(),
  t_symbol: z.string().nullable().optional(),
  t_qty: z.number(),
  t_amt: z.number(),
  t_price: z.number(),
  t_commission: z.number(),
  t_fee: z.number(),
  t_method: z.string().nullable().optional(),
  t_source: z.string().nullable().optional(),
  t_origin: z.string().nullable().optional(),
  opt_expiration: z.string().nullable().optional(),
  opt_type: z.enum(['call', 'put']).nullable().optional(),
  opt_strike: z.number(),
  t_description: z.string().nullable().optional(),
  t_comment: z.string().nullable().optional(),
  t_from: z.string().nullable().optional(),
  t_to: z.string().nullable().optional(),
  t_interest_rate: z.string().nullable().optional(),
  parent_t_id: z.number().optional(),
})

interface AccountingItem {
  t_id?: number
  t_account?: number | null
  t_date?: string
  t_type?:
    | 'bought to open'
    | 'sold short'
    | 'sold to close'
    | 'journal'
    | 'interest'
    | 'transfer'
    | 'option expiration'
    | 'bought to cover'
    | 'dividend'
    | 'credit'
    | 'deposit'
    | 'equity'
    | null
  t_qty?: number
  t_amt?: number
  t_price?: number
  t_commission?: number
  t_fee?: number
  t_method?: string | null
  t_source?: string | null
  t_origin?: string | null
  t_symbol?: string | null
  opt_expiration?: string | null
  opt_type?: 'call' | 'put' | null
  opt_strike?: number
  t_description?: string | null
  t_comment?: string | null
  t_from?: string | null
  t_to?: string | null
  t_interest_rate?: string | null
  parent_t_id?: number
}
