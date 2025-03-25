import { z } from 'zod'
import { Prisma } from '@prisma/client'
import Decimal from 'decimal.js'

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// DECIMAL
//------------------------------------------------------

export const DecimalJsLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
  toFixed: z.function(z.tuple([]), z.string()),
})

export const DECIMAL_STRING_REGEX =
  /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:\.[01]+)?(?:[pP][-+]?\d+)?|0[oO][0-7]+(?:\.[0-7]+)?(?:[pP][-+]?\d+)?|0[xX][\da-fA-F]+(?:\.[\da-fA-F]+)?(?:[pP][-+]?\d+)?|(?:\d+|\d*\.\d+)(?:[eE][-+]?\d+)?))$/

export const isValidDecimalInput = (
  v?: null | string | number | Prisma.DecimalJsLike,
): v is string | number | Prisma.DecimalJsLike => {
  if (v === undefined || v === null) return false
  return (
    (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) ||
    (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
    typeof v === 'number'
  )
}

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
])

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'email',
  'emailVerified',
  'image',
  'createdAt',
  'updatedAt',
  'twoFactorEnabled',
  'username',
  'inviteCode',
])

export const SessionScalarFieldEnumSchema = z.enum([
  'id',
  'expiresAt',
  'token',
  'createdAt',
  'updatedAt',
  'ipAddress',
  'userAgent',
  'userId',
])

export const AccountScalarFieldEnumSchema = z.enum([
  'id',
  'accountId',
  'providerId',
  'userId',
  'accessToken',
  'refreshToken',
  'idToken',
  'accessTokenExpiresAt',
  'refreshTokenExpiresAt',
  'scope',
  'password',
  'createdAt',
  'updatedAt',
])

export const VerificationScalarFieldEnumSchema = z.enum([
  'id',
  'identifier',
  'value',
  'expiresAt',
  'createdAt',
  'updatedAt',
])

export const TwoFactorScalarFieldEnumSchema = z.enum(['id', 'secret', 'backupCodes', 'userId'])

export const PhrLabResultScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'testName',
  'collectionDatetime',
  'resultDatetime',
  'resultStatus',
  'orderingProvider',
  'resultingLab',
  'analyte',
  'value',
  'unit',
  'rangeMin',
  'rangeMax',
  'rangeUnit',
  'normalValue',
  'messageFromProvider',
  'resultComment',
  'labDirector',
])

export const ProductKeyScalarFieldEnumSchema = z.enum([
  'id',
  'uid',
  'productId',
  'productKey',
  'productName',
  'computerName',
  'comment',
  'usedOn',
  'claimedDate',
  'keyType',
  'keyRetrievalNote',
])

export const FinAccountsScalarFieldEnumSchema = z.enum([
  'acct_id',
  'acct_owner',
  'acct_name',
  'acct_last_balance',
  'acct_last_balance_date',
  'acct_is_debt',
  'acct_is_retirement',
  'acct_sort_order',
  'when_closed',
  'when_deleted',
])

export const FinAccountLineItemsScalarFieldEnumSchema = z.enum([
  't_id',
  't_account',
  't_date',
  't_date_posted',
  't_type',
  't_schc_category',
  't_amt',
  't_symbol',
  't_qty',
  't_price',
  't_commission',
  't_fee',
  't_method',
  't_source',
  't_origin',
  'opt_expiration',
  'opt_type',
  'opt_strike',
  't_description',
  't_comment',
  't_from',
  't_to',
  't_interest_rate',
  't_cusip',
  't_harvested_amount',
  'parent_t_id',
  'when_added',
  'when_deleted',
])

export const FinAccountBalanceSnapshotScalarFieldEnumSchema = z.enum(['snapshot_id', 'acct_id', 'balance', 'when_added'])

export const EarningsAnnualScalarFieldEnumSchema = z.enum(['symbol', 'fiscalDateEnding', 'reportedEPS'])

export const EarningsQuarterlyScalarFieldEnumSchema = z.enum([
  'symbol',
  'fiscalDateEnding',
  'reportedDate',
  'reportedEPS',
  'estimatedEPS',
  'surprise',
  'surprisePercentage',
])

export const FinEquityAwardsScalarFieldEnumSchema = z.enum([
  'id',
  'award_id',
  'grant_date',
  'vest_date',
  'share_count',
  'symbol',
  'uid',
  'vest_price',
])

export const FinPayslipsScalarFieldEnumSchema = z.enum([
  'payslip_id',
  'uid',
  'period_start',
  'period_end',
  'pay_date',
  'earnings_gross',
  'earnings_bonus',
  'earnings_net_pay',
  'earnings_rsu',
  'imp_other',
  'imp_legal',
  'imp_fitness',
  'imp_ltd',
  'ps_oasdi',
  'ps_medicare',
  'ps_fed_tax',
  'ps_fed_tax_addl',
  'ps_state_tax',
  'ps_state_tax_addl',
  'ps_state_disability',
  'ps_401k_pretax',
  'ps_401k_aftertax',
  'ps_401k_employer',
  'ps_fed_tax_refunded',
  'ps_payslip_file_hash',
  'ps_is_estimated',
  'ps_comment',
  'ps_pretax_medical',
  'ps_pretax_fsa',
  'ps_salary',
  'ps_vacation_payout',
  'ps_pretax_dental',
  'ps_pretax_vision',
  'other',
])

export const FinPayslipUploadsScalarFieldEnumSchema = z.enum(['id', 'file_name', 'file_hash', 'parsed_json'])

export const GraduatedTaxScalarFieldEnumSchema = z.enum(['year', 'region', 'income_over', 'type', 'rate', 'verified'])

export const PHRPatientVitalsScalarFieldEnumSchema = z.enum(['id', 'user_id', 'vital_name', 'vital_date', 'vital_value'])

export const StockQuotesDailyScalarFieldEnumSchema = z.enum([
  'c_date',
  'c_symb',
  'c_open',
  'c_high',
  'c_low',
  'c_close',
  'c_vol',
])

export const TimeSeriesDatapointScalarFieldEnumSchema = z.enum([
  'dp_id',
  'dp_series_id',
  'dp_date',
  'dp_value',
  'dp_comment',
])

export const TimeSeriesDocumentScalarFieldEnumSchema = z.enum(['id', 'uid', 'name'])

export const TimeSeriesSeriesScalarFieldEnumSchema = z.enum(['id', 'document_id', 'series_name'])

export const UsersLegacyScalarFieldEnumSchema = z.enum([
  'uid',
  'email',
  'pw',
  'salt',
  'alias',
  'ax_maxmin',
  'ax_homes',
  'ax_tax',
  'ax_evdb',
  'ax_spgp',
  'ax_phr',
  'reset_token',
  'reset_requested_at',
  'passkey_credential_id',
  'passkey_public_key',
])

export const VXCVFilesScalarFieldEnumSchema = z.enum([
  'hash',
  'filename',
  'mime',
  'downloads',
  'max_downloads',
  'size',
  'uploaded',
  'blocked',
  'ip',
])

export const VXCVLinksScalarFieldEnumSchema = z.enum(['uniqueid', 'url'])

export const AccountLineItemTagScalarFieldEnumSchema = z.enum(['tag_id', 'tag_userid', 'tag_color', 'tag_label'])

export const FinAccountTagScalarFieldEnumSchema = z.enum([
  'tag_id',
  'tag_userid',
  'tag_color',
  'tag_label',
  'when_added',
  'when_deleted',
])

export const FinAccountLineItemTagMapScalarFieldEnumSchema = z.enum(['id', 'when_added', 'when_deleted', 't_id', 'tag_id'])

export const SortOrderSchema = z.enum(['asc', 'desc'])

export const NullsOrderSchema = z.enum(['first', 'last'])

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id', 'name', 'email', 'image', 'username', 'inviteCode'])

export const SessionOrderByRelevanceFieldEnumSchema = z.enum(['id', 'token', 'ipAddress', 'userAgent', 'userId'])

export const AccountOrderByRelevanceFieldEnumSchema = z.enum([
  'id',
  'accountId',
  'providerId',
  'userId',
  'accessToken',
  'refreshToken',
  'idToken',
  'scope',
  'password',
])

export const VerificationOrderByRelevanceFieldEnumSchema = z.enum(['id', 'identifier', 'value'])

export const TwoFactorOrderByRelevanceFieldEnumSchema = z.enum(['id', 'secret', 'backupCodes', 'userId'])

export const PhrLabResultOrderByRelevanceFieldEnumSchema = z.enum([
  'userId',
  'testName',
  'resultStatus',
  'orderingProvider',
  'resultingLab',
  'analyte',
  'value',
  'unit',
  'rangeUnit',
  'normalValue',
  'messageFromProvider',
  'resultComment',
  'labDirector',
])

export const ProductKeyOrderByRelevanceFieldEnumSchema = z.enum([
  'uid',
  'productId',
  'productKey',
  'productName',
  'computerName',
  'comment',
  'usedOn',
  'claimedDate',
  'keyType',
  'keyRetrievalNote',
])

export const FinAccountsOrderByRelevanceFieldEnumSchema = z.enum(['acct_owner', 'acct_name', 'acct_last_balance'])

export const FinAccountLineItemsOrderByRelevanceFieldEnumSchema = z.enum([
  't_date',
  't_date_posted',
  't_type',
  't_schc_category',
  't_symbol',
  't_method',
  't_source',
  't_origin',
  'opt_expiration',
  't_description',
  't_comment',
  't_from',
  't_to',
  't_interest_rate',
  't_cusip',
])

export const FinAccountBalanceSnapshotOrderByRelevanceFieldEnumSchema = z.enum(['balance'])

export const EarningsAnnualOrderByRelevanceFieldEnumSchema = z.enum(['symbol'])

export const EarningsQuarterlyOrderByRelevanceFieldEnumSchema = z.enum(['symbol'])

export const FinEquityAwardsOrderByRelevanceFieldEnumSchema = z.enum([
  'award_id',
  'grant_date',
  'vest_date',
  'symbol',
  'uid',
])

export const FinPayslipsOrderByRelevanceFieldEnumSchema = z.enum([
  'uid',
  'period_start',
  'period_end',
  'pay_date',
  'ps_payslip_file_hash',
  'ps_comment',
  'other',
])

export const FinPayslipUploadsOrderByRelevanceFieldEnumSchema = z.enum(['file_name', 'file_hash', 'parsed_json'])

export const GraduatedTaxOrderByRelevanceFieldEnumSchema = z.enum(['region'])

export const PHRPatientVitalsOrderByRelevanceFieldEnumSchema = z.enum(['user_id', 'vital_name', 'vital_value'])

export const StockQuotesDailyOrderByRelevanceFieldEnumSchema = z.enum(['c_symb'])

export const TimeSeriesDatapointOrderByRelevanceFieldEnumSchema = z.enum(['dp_value', 'dp_comment'])

export const TimeSeriesDocumentOrderByRelevanceFieldEnumSchema = z.enum(['name'])

export const TimeSeriesSeriesOrderByRelevanceFieldEnumSchema = z.enum(['series_name'])

export const UsersLegacyOrderByRelevanceFieldEnumSchema = z.enum([
  'email',
  'pw',
  'alias',
  'reset_token',
  'passkey_credential_id',
  'passkey_public_key',
])

export const VXCVFilesOrderByRelevanceFieldEnumSchema = z.enum(['filename', 'mime'])

export const VXCVLinksOrderByRelevanceFieldEnumSchema = z.enum(['uniqueid', 'url'])

export const AccountLineItemTagOrderByRelevanceFieldEnumSchema = z.enum(['tag_userid', 'tag_color', 'tag_label'])

export const FinAccountTagOrderByRelevanceFieldEnumSchema = z.enum(['tag_userid', 'tag_color', 'tag_label'])

export const graduated_tax_typeSchema = z.enum(['s', 'mfj', 'mfs', 'hoh'])

export type graduated_tax_typeType = `${z.infer<typeof graduated_tax_typeSchema>}`

export const account_line_items_opt_typeSchema = z.enum(['call', 'put'])

export type account_line_items_opt_typeType = `${z.infer<typeof account_line_items_opt_typeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().nullable(),
  username: z.string().nullable(),
  inviteCode: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  idToken: z.string().nullable(),
  accessTokenExpiresAt: z.coerce.date().nullable(),
  refreshTokenExpiresAt: z.coerce.date().nullable(),
  scope: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// VERIFICATION SCHEMA
/////////////////////////////////////////

export const VerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
})

export type Verification = z.infer<typeof VerificationSchema>

/////////////////////////////////////////
// TWO FACTOR SCHEMA
/////////////////////////////////////////

export const TwoFactorSchema = z.object({
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string(),
  userId: z.string(),
})

export type TwoFactor = z.infer<typeof TwoFactorSchema>

/////////////////////////////////////////
// PHR LAB RESULT SCHEMA
/////////////////////////////////////////

export const PhrLabResultSchema = z.object({
  id: z.number().int(),
  userId: z.string().nullable(),
  testName: z.string().nullable(),
  collectionDatetime: z.coerce.date().nullable(),
  resultDatetime: z.coerce.date().nullable(),
  resultStatus: z.string().nullable(),
  orderingProvider: z.string().nullable(),
  resultingLab: z.string().nullable(),
  analyte: z.string().nullable(),
  value: z.string().nullable(),
  unit: z.string().nullable(),
  rangeMin: z
    .instanceof(Prisma.Decimal, { message: "Field 'rangeMin' must be a Decimal. Location: ['Models', 'PhrLabResult']" })
    .nullable(),
  rangeMax: z
    .instanceof(Prisma.Decimal, { message: "Field 'rangeMax' must be a Decimal. Location: ['Models', 'PhrLabResult']" })
    .nullable(),
  rangeUnit: z.string().nullable(),
  normalValue: z.string().nullable(),
  messageFromProvider: z.string().nullable(),
  resultComment: z.string().nullable(),
  labDirector: z.string().nullable(),
})

export type PhrLabResult = z.infer<typeof PhrLabResultSchema>

/////////////////////////////////////////
// PRODUCT KEY SCHEMA
/////////////////////////////////////////

export const ProductKeySchema = z.object({
  id: z.number().int(),
  uid: z.string().nullable(),
  productId: z.string().nullable(),
  productKey: z.string().nullable(),
  productName: z.string().nullable(),
  computerName: z.string().nullable(),
  comment: z.string().nullable(),
  usedOn: z.string().nullable(),
  claimedDate: z.string().nullable(),
  keyType: z.string().nullable(),
  keyRetrievalNote: z.string().nullable(),
})

export type ProductKey = z.infer<typeof ProductKeySchema>

/////////////////////////////////////////
// FIN ACCOUNTS SCHEMA
/////////////////////////////////////////

export const FinAccountsSchema = z.object({
  acct_id: z.number().int(),
  acct_owner: z.string(),
  acct_name: z.string(),
  acct_last_balance: z.string(),
  acct_last_balance_date: z.coerce.date().nullable(),
  acct_is_debt: z.boolean(),
  acct_is_retirement: z.boolean(),
  acct_sort_order: z.number().int(),
  when_closed: z.coerce.date().nullable(),
  when_deleted: z.coerce.date().nullable(),
})

export type FinAccounts = z.infer<typeof FinAccountsSchema>

/////////////////////////////////////////
// FIN ACCOUNT LINE ITEMS SCHEMA
/////////////////////////////////////////

/**
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export const FinAccountLineItemsSchema = z.object({
  opt_type: account_line_items_opt_typeSchema.nullable(),
  t_id: z.number().int(),
  t_account: z.number().int().nullable(),
  t_date: z.string(),
  t_date_posted: z.string().nullable(),
  t_type: z.string().nullable(),
  t_schc_category: z.string().nullable(),
  t_amt: z
    .instanceof(Prisma.Decimal, { message: "Field 't_amt' must be a Decimal. Location: ['Models', 'FinAccountLineItems']" })
    .nullable(),
  t_symbol: z.string().nullable(),
  t_qty: z.number(),
  t_price: z
    .instanceof(Prisma.Decimal, {
      message: "Field 't_price' must be a Decimal. Location: ['Models', 'FinAccountLineItems']",
    })
    .nullable(),
  t_commission: z
    .instanceof(Prisma.Decimal, {
      message: "Field 't_commission' must be a Decimal. Location: ['Models', 'FinAccountLineItems']",
    })
    .nullable(),
  t_fee: z
    .instanceof(Prisma.Decimal, { message: "Field 't_fee' must be a Decimal. Location: ['Models', 'FinAccountLineItems']" })
    .nullable(),
  t_method: z.string().nullable(),
  t_source: z.string().nullable(),
  t_origin: z.string().nullable(),
  opt_expiration: z.string().nullable(),
  opt_strike: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'opt_strike' must be a Decimal. Location: ['Models', 'FinAccountLineItems']",
    })
    .nullable(),
  t_description: z.string().nullable(),
  t_comment: z.string().nullable(),
  t_from: z.string().nullable(),
  t_to: z.string().nullable(),
  t_interest_rate: z.string().nullable(),
  t_cusip: z.string().nullable(),
  t_harvested_amount: z
    .instanceof(Prisma.Decimal, {
      message: "Field 't_harvested_amount' must be a Decimal. Location: ['Models', 'FinAccountLineItems']",
    })
    .nullable(),
  parent_t_id: z.number().int().nullable(),
  when_added: z.coerce.date().nullable(),
  when_deleted: z.coerce.date().nullable(),
})

export type FinAccountLineItems = z.infer<typeof FinAccountLineItemsSchema>

/////////////////////////////////////////
// FIN ACCOUNT BALANCE SNAPSHOT SCHEMA
/////////////////////////////////////////

export const FinAccountBalanceSnapshotSchema = z.object({
  snapshot_id: z.number().int(),
  acct_id: z.number().int(),
  balance: z.string(),
  when_added: z.coerce.date(),
})

export type FinAccountBalanceSnapshot = z.infer<typeof FinAccountBalanceSnapshotSchema>

/////////////////////////////////////////
// EARNINGS ANNUAL SCHEMA
/////////////////////////////////////////

export const EarningsAnnualSchema = z.object({
  symbol: z.string(),
  fiscalDateEnding: z.coerce.date(),
  reportedEPS: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'reportedEPS' must be a Decimal. Location: ['Models', 'EarningsAnnual']",
    })
    .nullable(),
})

export type EarningsAnnual = z.infer<typeof EarningsAnnualSchema>

/////////////////////////////////////////
// EARNINGS QUARTERLY SCHEMA
/////////////////////////////////////////

export const EarningsQuarterlySchema = z.object({
  symbol: z.string(),
  fiscalDateEnding: z.coerce.date(),
  reportedDate: z.coerce.date().nullable(),
  reportedEPS: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'reportedEPS' must be a Decimal. Location: ['Models', 'EarningsQuarterly']",
    })
    .nullable(),
  estimatedEPS: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'estimatedEPS' must be a Decimal. Location: ['Models', 'EarningsQuarterly']",
    })
    .nullable(),
  surprise: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'surprise' must be a Decimal. Location: ['Models', 'EarningsQuarterly']",
    })
    .nullable(),
  surprisePercentage: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'surprisePercentage' must be a Decimal. Location: ['Models', 'EarningsQuarterly']",
    })
    .nullable(),
})

export type EarningsQuarterly = z.infer<typeof EarningsQuarterlySchema>

/////////////////////////////////////////
// FIN EQUITY AWARDS SCHEMA
/////////////////////////////////////////

export const FinEquityAwardsSchema = z.object({
  id: z.number().int(),
  award_id: z.string(),
  grant_date: z.string(),
  vest_date: z.string(),
  share_count: z.number().int(),
  symbol: z.string(),
  uid: z.string(),
  vest_price: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'vest_price' must be a Decimal. Location: ['Models', 'FinEquityAwards']",
    })
    .nullable(),
})

export type FinEquityAwards = z.infer<typeof FinEquityAwardsSchema>

/////////////////////////////////////////
// FIN PAYSLIPS SCHEMA
/////////////////////////////////////////

export const FinPayslipsSchema = z.object({
  payslip_id: z.number().int(),
  uid: z.string().nullable(),
  period_start: z.string().nullable(),
  period_end: z.string().nullable(),
  pay_date: z.string().nullable(),
  earnings_gross: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'earnings_gross' must be a Decimal. Location: ['Models', 'FinPayslips']",
    })
    .nullable(),
  earnings_bonus: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'earnings_bonus' must be a Decimal. Location: ['Models', 'FinPayslips']",
    })
    .nullable(),
  earnings_net_pay: z.instanceof(Prisma.Decimal, {
    message: "Field 'earnings_net_pay' must be a Decimal. Location: ['Models', 'FinPayslips']",
  }),
  earnings_rsu: z
    .instanceof(Prisma.Decimal, { message: "Field 'earnings_rsu' must be a Decimal. Location: ['Models', 'FinPayslips']" })
    .nullable(),
  imp_other: z
    .instanceof(Prisma.Decimal, { message: "Field 'imp_other' must be a Decimal. Location: ['Models', 'FinPayslips']" })
    .nullable(),
  imp_legal: z
    .instanceof(Prisma.Decimal, { message: "Field 'imp_legal' must be a Decimal. Location: ['Models', 'FinPayslips']" })
    .nullable(),
  imp_fitness: z
    .instanceof(Prisma.Decimal, { message: "Field 'imp_fitness' must be a Decimal. Location: ['Models', 'FinPayslips']" })
    .nullable(),
  imp_ltd: z
    .instanceof(Prisma.Decimal, { message: "Field 'imp_ltd' must be a Decimal. Location: ['Models', 'FinPayslips']" })
    .nullable(),
  ps_oasdi: z
    .instanceof(Prisma.Decimal, { message: "Field 'ps_oasdi' must be a Decimal. Location: ['Models', 'FinPayslips']" })
    .nullable(),
  ps_medicare: z
    .instanceof(Prisma.Decimal, { message: "Field 'ps_medicare' must be a Decimal. Location: ['Models', 'FinPayslips']" })
    .nullable(),
  ps_fed_tax: z
    .instanceof(Prisma.Decimal, { message: "Field 'ps_fed_tax' must be a Decimal. Location: ['Models', 'FinPayslips']" })
    .nullable(),
  ps_fed_tax_addl: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'ps_fed_tax_addl' must be a Decimal. Location: ['Models', 'FinPayslips']",
    })
    .nullable(),
  ps_state_tax: z
    .instanceof(Prisma.Decimal, { message: "Field 'ps_state_tax' must be a Decimal. Location: ['Models', 'FinPayslips']" })
    .nullable(),
  ps_state_tax_addl: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'ps_state_tax_addl' must be a Decimal. Location: ['Models', 'FinPayslips']",
    })
    .nullable(),
  ps_state_disability: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'ps_state_disability' must be a Decimal. Location: ['Models', 'FinPayslips']",
    })
    .nullable(),
  ps_401k_pretax: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'ps_401k_pretax' must be a Decimal. Location: ['Models', 'FinPayslips']",
    })
    .nullable(),
  ps_401k_aftertax: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'ps_401k_aftertax' must be a Decimal. Location: ['Models', 'FinPayslips']",
    })
    .nullable(),
  ps_401k_employer: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'ps_401k_employer' must be a Decimal. Location: ['Models', 'FinPayslips']",
    })
    .nullable(),
  ps_fed_tax_refunded: z
    .instanceof(Prisma.Decimal, {
      message: "Field 'ps_fed_tax_refunded' must be a Decimal. Location: ['Models', 'FinPayslips']",
    })
    .nullable(),
  ps_payslip_file_hash: z.string().nullable(),
  ps_is_estimated: z.boolean(),
  ps_comment: z.string().nullable(),
  ps_pretax_medical: z.instanceof(Prisma.Decimal, {
    message: "Field 'ps_pretax_medical' must be a Decimal. Location: ['Models', 'FinPayslips']",
  }),
  ps_pretax_fsa: z.instanceof(Prisma.Decimal, {
    message: "Field 'ps_pretax_fsa' must be a Decimal. Location: ['Models', 'FinPayslips']",
  }),
  ps_salary: z.instanceof(Prisma.Decimal, {
    message: "Field 'ps_salary' must be a Decimal. Location: ['Models', 'FinPayslips']",
  }),
  ps_vacation_payout: z.instanceof(Prisma.Decimal, {
    message: "Field 'ps_vacation_payout' must be a Decimal. Location: ['Models', 'FinPayslips']",
  }),
  ps_pretax_dental: z.instanceof(Prisma.Decimal, {
    message: "Field 'ps_pretax_dental' must be a Decimal. Location: ['Models', 'FinPayslips']",
  }),
  ps_pretax_vision: z.instanceof(Prisma.Decimal, {
    message: "Field 'ps_pretax_vision' must be a Decimal. Location: ['Models', 'FinPayslips']",
  }),
  other: z.string().nullable(),
})

export type FinPayslips = z.infer<typeof FinPayslipsSchema>

/////////////////////////////////////////
// FIN PAYSLIP UPLOADS SCHEMA
/////////////////////////////////////////

export const FinPayslipUploadsSchema = z.object({
  id: z.number().int(),
  file_name: z.string().nullable(),
  file_hash: z.string().nullable(),
  parsed_json: z.string().nullable(),
})

export type FinPayslipUploads = z.infer<typeof FinPayslipUploadsSchema>

/////////////////////////////////////////
// GRADUATED TAX SCHEMA
/////////////////////////////////////////

export const GraduatedTaxSchema = z.object({
  type: graduated_tax_typeSchema,
  year: z.number().int(),
  region: z.string(),
  income_over: z.number().int(),
  rate: z.instanceof(Prisma.Decimal, { message: "Field 'rate' must be a Decimal. Location: ['Models', 'GraduatedTax']" }),
  verified: z.boolean(),
})

export type GraduatedTax = z.infer<typeof GraduatedTaxSchema>

/////////////////////////////////////////
// PHR PATIENT VITALS SCHEMA
/////////////////////////////////////////

export const PHRPatientVitalsSchema = z.object({
  id: z.number().int(),
  user_id: z.string().nullable(),
  vital_name: z.string().nullable(),
  vital_date: z.coerce.date().nullable(),
  vital_value: z.string().nullable(),
})

export type PHRPatientVitals = z.infer<typeof PHRPatientVitalsSchema>

/////////////////////////////////////////
// STOCK QUOTES DAILY SCHEMA
/////////////////////////////////////////

export const StockQuotesDailySchema = z.object({
  c_date: z.coerce.date(),
  c_symb: z.string(),
  c_open: z.instanceof(Prisma.Decimal, {
    message: "Field 'c_open' must be a Decimal. Location: ['Models', 'StockQuotesDaily']",
  }),
  c_high: z.instanceof(Prisma.Decimal, {
    message: "Field 'c_high' must be a Decimal. Location: ['Models', 'StockQuotesDaily']",
  }),
  c_low: z.instanceof(Prisma.Decimal, {
    message: "Field 'c_low' must be a Decimal. Location: ['Models', 'StockQuotesDaily']",
  }),
  c_close: z.instanceof(Prisma.Decimal, {
    message: "Field 'c_close' must be a Decimal. Location: ['Models', 'StockQuotesDaily']",
  }),
  c_vol: z.bigint(),
})

export type StockQuotesDaily = z.infer<typeof StockQuotesDailySchema>

/////////////////////////////////////////
// TIME SERIES DATAPOINT SCHEMA
/////////////////////////////////////////

export const TimeSeriesDatapointSchema = z.object({
  dp_id: z.number().int(),
  dp_series_id: z.number().int(),
  dp_date: z.coerce.date().nullable(),
  dp_value: z.string().nullable(),
  dp_comment: z.string().nullable(),
})

export type TimeSeriesDatapoint = z.infer<typeof TimeSeriesDatapointSchema>

/////////////////////////////////////////
// TIME SERIES DOCUMENT SCHEMA
/////////////////////////////////////////

export const TimeSeriesDocumentSchema = z.object({
  id: z.number().int(),
  uid: z.number().int(),
  name: z.string(),
})

export type TimeSeriesDocument = z.infer<typeof TimeSeriesDocumentSchema>

/////////////////////////////////////////
// TIME SERIES SERIES SCHEMA
/////////////////////////////////////////

export const TimeSeriesSeriesSchema = z.object({
  id: z.number().int(),
  document_id: z.number().int(),
  series_name: z.string(),
})

export type TimeSeriesSeries = z.infer<typeof TimeSeriesSeriesSchema>

/////////////////////////////////////////
// USERS LEGACY SCHEMA
/////////////////////////////////////////

export const UsersLegacySchema = z.object({
  uid: z.bigint(),
  email: z.string(),
  pw: z.string().nullable(),
  salt: z.bigint(),
  alias: z.string().nullable(),
  ax_maxmin: z.boolean(),
  ax_homes: z.boolean().nullable(),
  ax_tax: z.boolean(),
  ax_evdb: z.boolean().nullable(),
  ax_spgp: z.boolean(),
  ax_phr: z.number().int(),
  reset_token: z.string().nullable(),
  reset_requested_at: z.coerce.date().nullable(),
  passkey_credential_id: z.string().nullable(),
  passkey_public_key: z.string().nullable(),
})

export type UsersLegacy = z.infer<typeof UsersLegacySchema>

/////////////////////////////////////////
// VXCV FILES SCHEMA
/////////////////////////////////////////

export const VXCVFilesSchema = z.object({
  hash: z.instanceof(Buffer),
  filename: z.string(),
  mime: z.string(),
  downloads: z.number().int(),
  max_downloads: z.number().int(),
  size: z.number().int(),
  uploaded: z.coerce.date(),
  blocked: z.number().int(),
  ip: z.number().int(),
})

export type VXCVFiles = z.infer<typeof VXCVFilesSchema>

/////////////////////////////////////////
// VXCV LINKS SCHEMA
/////////////////////////////////////////

export const VXCVLinksSchema = z.object({
  uniqueid: z.string(),
  url: z.string(),
})

export type VXCVLinks = z.infer<typeof VXCVLinksSchema>

/////////////////////////////////////////
// ACCOUNT LINE ITEM TAG SCHEMA
/////////////////////////////////////////

export const AccountLineItemTagSchema = z.object({
  tag_id: z.number().int(),
  tag_userid: z.string(),
  tag_color: z.string(),
  tag_label: z.string(),
})

export type AccountLineItemTag = z.infer<typeof AccountLineItemTagSchema>

/////////////////////////////////////////
// FIN ACCOUNT TAG SCHEMA
/////////////////////////////////////////

export const FinAccountTagSchema = z.object({
  tag_id: z.number().int(),
  tag_userid: z.string(),
  tag_color: z.string(),
  tag_label: z.string(),
  when_added: z.coerce.date(),
  when_deleted: z.coerce.date().nullable(),
})

export type FinAccountTag = z.infer<typeof FinAccountTagSchema>

/////////////////////////////////////////
// FIN ACCOUNT LINE ITEM TAG MAP SCHEMA
/////////////////////////////////////////

export const FinAccountLineItemTagMapSchema = z.object({
  id: z.number().int(),
  when_added: z.coerce.date(),
  when_deleted: z.coerce.date().nullable(),
  t_id: z.number().int(),
  tag_id: z.number().int(),
})

export type FinAccountLineItemTagMap = z.infer<typeof FinAccountLineItemTagMapSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    accounts: z.union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)]).optional(),
    sessions: z.union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)]).optional(),
    twofactors: z.union([z.boolean(), z.lazy(() => TwoFactorFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
  })
  .strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict()

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
  })
  .strict()

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z
  .object({
    accounts: z.boolean().optional(),
    sessions: z.boolean().optional(),
    twofactors: z.boolean().optional(),
  })
  .strict()

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    image: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    twoFactorEnabled: z.boolean().optional(),
    username: z.boolean().optional(),
    inviteCode: z.boolean().optional(),
    accounts: z.union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)]).optional(),
    sessions: z.union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)]).optional(),
    twofactors: z.union([z.boolean(), z.lazy(() => TwoFactorFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
  })
  .strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z
  .object({
    select: z.lazy(() => SessionSelectSchema).optional(),
    include: z.lazy(() => SessionIncludeSchema).optional(),
  })
  .strict()

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z
  .object({
    id: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    token: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    ipAddress: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z
  .object({
    select: z.lazy(() => AccountSelectSchema).optional(),
    include: z.lazy(() => AccountIncludeSchema).optional(),
  })
  .strict()

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z
  .object({
    id: z.boolean().optional(),
    accountId: z.boolean().optional(),
    providerId: z.boolean().optional(),
    userId: z.boolean().optional(),
    accessToken: z.boolean().optional(),
    refreshToken: z.boolean().optional(),
    idToken: z.boolean().optional(),
    accessTokenExpiresAt: z.boolean().optional(),
    refreshTokenExpiresAt: z.boolean().optional(),
    scope: z.boolean().optional(),
    password: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict()

// VERIFICATION
//------------------------------------------------------

export const VerificationSelectSchema: z.ZodType<Prisma.VerificationSelect> = z
  .object({
    id: z.boolean().optional(),
    identifier: z.boolean().optional(),
    value: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict()

// TWO FACTOR
//------------------------------------------------------

export const TwoFactorIncludeSchema: z.ZodType<Prisma.TwoFactorInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict()

export const TwoFactorArgsSchema: z.ZodType<Prisma.TwoFactorDefaultArgs> = z
  .object({
    select: z.lazy(() => TwoFactorSelectSchema).optional(),
    include: z.lazy(() => TwoFactorIncludeSchema).optional(),
  })
  .strict()

export const TwoFactorSelectSchema: z.ZodType<Prisma.TwoFactorSelect> = z
  .object({
    id: z.boolean().optional(),
    secret: z.boolean().optional(),
    backupCodes: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict()

// PHR LAB RESULT
//------------------------------------------------------

export const PhrLabResultSelectSchema: z.ZodType<Prisma.PhrLabResultSelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    testName: z.boolean().optional(),
    collectionDatetime: z.boolean().optional(),
    resultDatetime: z.boolean().optional(),
    resultStatus: z.boolean().optional(),
    orderingProvider: z.boolean().optional(),
    resultingLab: z.boolean().optional(),
    analyte: z.boolean().optional(),
    value: z.boolean().optional(),
    unit: z.boolean().optional(),
    rangeMin: z.boolean().optional(),
    rangeMax: z.boolean().optional(),
    rangeUnit: z.boolean().optional(),
    normalValue: z.boolean().optional(),
    messageFromProvider: z.boolean().optional(),
    resultComment: z.boolean().optional(),
    labDirector: z.boolean().optional(),
  })
  .strict()

// PRODUCT KEY
//------------------------------------------------------

export const ProductKeySelectSchema: z.ZodType<Prisma.ProductKeySelect> = z
  .object({
    id: z.boolean().optional(),
    uid: z.boolean().optional(),
    productId: z.boolean().optional(),
    productKey: z.boolean().optional(),
    productName: z.boolean().optional(),
    computerName: z.boolean().optional(),
    comment: z.boolean().optional(),
    usedOn: z.boolean().optional(),
    claimedDate: z.boolean().optional(),
    keyType: z.boolean().optional(),
    keyRetrievalNote: z.boolean().optional(),
  })
  .strict()

// FIN ACCOUNTS
//------------------------------------------------------

export const FinAccountsSelectSchema: z.ZodType<Prisma.FinAccountsSelect> = z
  .object({
    acct_id: z.boolean().optional(),
    acct_owner: z.boolean().optional(),
    acct_name: z.boolean().optional(),
    acct_last_balance: z.boolean().optional(),
    acct_last_balance_date: z.boolean().optional(),
    acct_is_debt: z.boolean().optional(),
    acct_is_retirement: z.boolean().optional(),
    acct_sort_order: z.boolean().optional(),
    when_closed: z.boolean().optional(),
    when_deleted: z.boolean().optional(),
  })
  .strict()

// FIN ACCOUNT LINE ITEMS
//------------------------------------------------------

export const FinAccountLineItemsIncludeSchema: z.ZodType<Prisma.FinAccountLineItemsInclude> = z
  .object({
    tags: z.union([z.boolean(), z.lazy(() => FinAccountLineItemTagMapFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => FinAccountLineItemsCountOutputTypeArgsSchema)]).optional(),
  })
  .strict()

export const FinAccountLineItemsArgsSchema: z.ZodType<Prisma.FinAccountLineItemsDefaultArgs> = z
  .object({
    select: z.lazy(() => FinAccountLineItemsSelectSchema).optional(),
    include: z.lazy(() => FinAccountLineItemsIncludeSchema).optional(),
  })
  .strict()

export const FinAccountLineItemsCountOutputTypeArgsSchema: z.ZodType<Prisma.FinAccountLineItemsCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => FinAccountLineItemsCountOutputTypeSelectSchema).nullish(),
    })
    .strict()

export const FinAccountLineItemsCountOutputTypeSelectSchema: z.ZodType<Prisma.FinAccountLineItemsCountOutputTypeSelect> = z
  .object({
    tags: z.boolean().optional(),
  })
  .strict()

export const FinAccountLineItemsSelectSchema: z.ZodType<Prisma.FinAccountLineItemsSelect> = z
  .object({
    t_id: z.boolean().optional(),
    t_account: z.boolean().optional(),
    t_date: z.boolean().optional(),
    t_date_posted: z.boolean().optional(),
    t_type: z.boolean().optional(),
    t_schc_category: z.boolean().optional(),
    t_amt: z.boolean().optional(),
    t_symbol: z.boolean().optional(),
    t_qty: z.boolean().optional(),
    t_price: z.boolean().optional(),
    t_commission: z.boolean().optional(),
    t_fee: z.boolean().optional(),
    t_method: z.boolean().optional(),
    t_source: z.boolean().optional(),
    t_origin: z.boolean().optional(),
    opt_expiration: z.boolean().optional(),
    opt_type: z.boolean().optional(),
    opt_strike: z.boolean().optional(),
    t_description: z.boolean().optional(),
    t_comment: z.boolean().optional(),
    t_from: z.boolean().optional(),
    t_to: z.boolean().optional(),
    t_interest_rate: z.boolean().optional(),
    t_cusip: z.boolean().optional(),
    t_harvested_amount: z.boolean().optional(),
    parent_t_id: z.boolean().optional(),
    when_added: z.boolean().optional(),
    when_deleted: z.boolean().optional(),
    tags: z.union([z.boolean(), z.lazy(() => FinAccountLineItemTagMapFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => FinAccountLineItemsCountOutputTypeArgsSchema)]).optional(),
  })
  .strict()

// FIN ACCOUNT BALANCE SNAPSHOT
//------------------------------------------------------

export const FinAccountBalanceSnapshotSelectSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotSelect> = z
  .object({
    snapshot_id: z.boolean().optional(),
    acct_id: z.boolean().optional(),
    balance: z.boolean().optional(),
    when_added: z.boolean().optional(),
  })
  .strict()

// EARNINGS ANNUAL
//------------------------------------------------------

export const EarningsAnnualSelectSchema: z.ZodType<Prisma.EarningsAnnualSelect> = z
  .object({
    symbol: z.boolean().optional(),
    fiscalDateEnding: z.boolean().optional(),
    reportedEPS: z.boolean().optional(),
  })
  .strict()

// EARNINGS QUARTERLY
//------------------------------------------------------

export const EarningsQuarterlySelectSchema: z.ZodType<Prisma.EarningsQuarterlySelect> = z
  .object({
    symbol: z.boolean().optional(),
    fiscalDateEnding: z.boolean().optional(),
    reportedDate: z.boolean().optional(),
    reportedEPS: z.boolean().optional(),
    estimatedEPS: z.boolean().optional(),
    surprise: z.boolean().optional(),
    surprisePercentage: z.boolean().optional(),
  })
  .strict()

// FIN EQUITY AWARDS
//------------------------------------------------------

export const FinEquityAwardsSelectSchema: z.ZodType<Prisma.FinEquityAwardsSelect> = z
  .object({
    id: z.boolean().optional(),
    award_id: z.boolean().optional(),
    grant_date: z.boolean().optional(),
    vest_date: z.boolean().optional(),
    share_count: z.boolean().optional(),
    symbol: z.boolean().optional(),
    uid: z.boolean().optional(),
    vest_price: z.boolean().optional(),
  })
  .strict()

// FIN PAYSLIPS
//------------------------------------------------------

export const FinPayslipsSelectSchema: z.ZodType<Prisma.FinPayslipsSelect> = z
  .object({
    payslip_id: z.boolean().optional(),
    uid: z.boolean().optional(),
    period_start: z.boolean().optional(),
    period_end: z.boolean().optional(),
    pay_date: z.boolean().optional(),
    earnings_gross: z.boolean().optional(),
    earnings_bonus: z.boolean().optional(),
    earnings_net_pay: z.boolean().optional(),
    earnings_rsu: z.boolean().optional(),
    imp_other: z.boolean().optional(),
    imp_legal: z.boolean().optional(),
    imp_fitness: z.boolean().optional(),
    imp_ltd: z.boolean().optional(),
    ps_oasdi: z.boolean().optional(),
    ps_medicare: z.boolean().optional(),
    ps_fed_tax: z.boolean().optional(),
    ps_fed_tax_addl: z.boolean().optional(),
    ps_state_tax: z.boolean().optional(),
    ps_state_tax_addl: z.boolean().optional(),
    ps_state_disability: z.boolean().optional(),
    ps_401k_pretax: z.boolean().optional(),
    ps_401k_aftertax: z.boolean().optional(),
    ps_401k_employer: z.boolean().optional(),
    ps_fed_tax_refunded: z.boolean().optional(),
    ps_payslip_file_hash: z.boolean().optional(),
    ps_is_estimated: z.boolean().optional(),
    ps_comment: z.boolean().optional(),
    ps_pretax_medical: z.boolean().optional(),
    ps_pretax_fsa: z.boolean().optional(),
    ps_salary: z.boolean().optional(),
    ps_vacation_payout: z.boolean().optional(),
    ps_pretax_dental: z.boolean().optional(),
    ps_pretax_vision: z.boolean().optional(),
    other: z.boolean().optional(),
  })
  .strict()

// FIN PAYSLIP UPLOADS
//------------------------------------------------------

export const FinPayslipUploadsSelectSchema: z.ZodType<Prisma.FinPayslipUploadsSelect> = z
  .object({
    id: z.boolean().optional(),
    file_name: z.boolean().optional(),
    file_hash: z.boolean().optional(),
    parsed_json: z.boolean().optional(),
  })
  .strict()

// GRADUATED TAX
//------------------------------------------------------

export const GraduatedTaxSelectSchema: z.ZodType<Prisma.GraduatedTaxSelect> = z
  .object({
    year: z.boolean().optional(),
    region: z.boolean().optional(),
    income_over: z.boolean().optional(),
    type: z.boolean().optional(),
    rate: z.boolean().optional(),
    verified: z.boolean().optional(),
  })
  .strict()

// PHR PATIENT VITALS
//------------------------------------------------------

export const PHRPatientVitalsSelectSchema: z.ZodType<Prisma.PHRPatientVitalsSelect> = z
  .object({
    id: z.boolean().optional(),
    user_id: z.boolean().optional(),
    vital_name: z.boolean().optional(),
    vital_date: z.boolean().optional(),
    vital_value: z.boolean().optional(),
  })
  .strict()

// STOCK QUOTES DAILY
//------------------------------------------------------

export const StockQuotesDailySelectSchema: z.ZodType<Prisma.StockQuotesDailySelect> = z
  .object({
    c_date: z.boolean().optional(),
    c_symb: z.boolean().optional(),
    c_open: z.boolean().optional(),
    c_high: z.boolean().optional(),
    c_low: z.boolean().optional(),
    c_close: z.boolean().optional(),
    c_vol: z.boolean().optional(),
  })
  .strict()

// TIME SERIES DATAPOINT
//------------------------------------------------------

export const TimeSeriesDatapointIncludeSchema: z.ZodType<Prisma.TimeSeriesDatapointInclude> = z
  .object({
    timeseries_series: z.union([z.boolean(), z.lazy(() => TimeSeriesSeriesArgsSchema)]).optional(),
  })
  .strict()

export const TimeSeriesDatapointArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointDefaultArgs> = z
  .object({
    select: z.lazy(() => TimeSeriesDatapointSelectSchema).optional(),
    include: z.lazy(() => TimeSeriesDatapointIncludeSchema).optional(),
  })
  .strict()

export const TimeSeriesDatapointSelectSchema: z.ZodType<Prisma.TimeSeriesDatapointSelect> = z
  .object({
    dp_id: z.boolean().optional(),
    dp_series_id: z.boolean().optional(),
    dp_date: z.boolean().optional(),
    dp_value: z.boolean().optional(),
    dp_comment: z.boolean().optional(),
    timeseries_series: z.union([z.boolean(), z.lazy(() => TimeSeriesSeriesArgsSchema)]).optional(),
  })
  .strict()

// TIME SERIES DOCUMENT
//------------------------------------------------------

export const TimeSeriesDocumentIncludeSchema: z.ZodType<Prisma.TimeSeriesDocumentInclude> = z
  .object({
    timeseries_series: z.union([z.boolean(), z.lazy(() => TimeSeriesSeriesFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TimeSeriesDocumentCountOutputTypeArgsSchema)]).optional(),
  })
  .strict()

export const TimeSeriesDocumentArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentDefaultArgs> = z
  .object({
    select: z.lazy(() => TimeSeriesDocumentSelectSchema).optional(),
    include: z.lazy(() => TimeSeriesDocumentIncludeSchema).optional(),
  })
  .strict()

export const TimeSeriesDocumentCountOutputTypeArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentCountOutputTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => TimeSeriesDocumentCountOutputTypeSelectSchema).nullish(),
  })
  .strict()

export const TimeSeriesDocumentCountOutputTypeSelectSchema: z.ZodType<Prisma.TimeSeriesDocumentCountOutputTypeSelect> = z
  .object({
    timeseries_series: z.boolean().optional(),
  })
  .strict()

export const TimeSeriesDocumentSelectSchema: z.ZodType<Prisma.TimeSeriesDocumentSelect> = z
  .object({
    id: z.boolean().optional(),
    uid: z.boolean().optional(),
    name: z.boolean().optional(),
    timeseries_series: z.union([z.boolean(), z.lazy(() => TimeSeriesSeriesFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TimeSeriesDocumentCountOutputTypeArgsSchema)]).optional(),
  })
  .strict()

// TIME SERIES SERIES
//------------------------------------------------------

export const TimeSeriesSeriesIncludeSchema: z.ZodType<Prisma.TimeSeriesSeriesInclude> = z
  .object({
    timeseries_datapoint: z.union([z.boolean(), z.lazy(() => TimeSeriesDatapointFindManyArgsSchema)]).optional(),
    timeseries_documents: z.union([z.boolean(), z.lazy(() => TimeSeriesDocumentArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TimeSeriesSeriesCountOutputTypeArgsSchema)]).optional(),
  })
  .strict()

export const TimeSeriesSeriesArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesDefaultArgs> = z
  .object({
    select: z.lazy(() => TimeSeriesSeriesSelectSchema).optional(),
    include: z.lazy(() => TimeSeriesSeriesIncludeSchema).optional(),
  })
  .strict()

export const TimeSeriesSeriesCountOutputTypeArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesCountOutputTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => TimeSeriesSeriesCountOutputTypeSelectSchema).nullish(),
  })
  .strict()

export const TimeSeriesSeriesCountOutputTypeSelectSchema: z.ZodType<Prisma.TimeSeriesSeriesCountOutputTypeSelect> = z
  .object({
    timeseries_datapoint: z.boolean().optional(),
  })
  .strict()

export const TimeSeriesSeriesSelectSchema: z.ZodType<Prisma.TimeSeriesSeriesSelect> = z
  .object({
    id: z.boolean().optional(),
    document_id: z.boolean().optional(),
    series_name: z.boolean().optional(),
    timeseries_datapoint: z.union([z.boolean(), z.lazy(() => TimeSeriesDatapointFindManyArgsSchema)]).optional(),
    timeseries_documents: z.union([z.boolean(), z.lazy(() => TimeSeriesDocumentArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TimeSeriesSeriesCountOutputTypeArgsSchema)]).optional(),
  })
  .strict()

// USERS LEGACY
//------------------------------------------------------

export const UsersLegacySelectSchema: z.ZodType<Prisma.UsersLegacySelect> = z
  .object({
    uid: z.boolean().optional(),
    email: z.boolean().optional(),
    pw: z.boolean().optional(),
    salt: z.boolean().optional(),
    alias: z.boolean().optional(),
    ax_maxmin: z.boolean().optional(),
    ax_homes: z.boolean().optional(),
    ax_tax: z.boolean().optional(),
    ax_evdb: z.boolean().optional(),
    ax_spgp: z.boolean().optional(),
    ax_phr: z.boolean().optional(),
    reset_token: z.boolean().optional(),
    reset_requested_at: z.boolean().optional(),
    passkey_credential_id: z.boolean().optional(),
    passkey_public_key: z.boolean().optional(),
  })
  .strict()

// VXCV FILES
//------------------------------------------------------

export const VXCVFilesSelectSchema: z.ZodType<Prisma.VXCVFilesSelect> = z
  .object({
    hash: z.boolean().optional(),
    filename: z.boolean().optional(),
    mime: z.boolean().optional(),
    downloads: z.boolean().optional(),
    max_downloads: z.boolean().optional(),
    size: z.boolean().optional(),
    uploaded: z.boolean().optional(),
    blocked: z.boolean().optional(),
    ip: z.boolean().optional(),
  })
  .strict()

// VXCV LINKS
//------------------------------------------------------

export const VXCVLinksSelectSchema: z.ZodType<Prisma.VXCVLinksSelect> = z
  .object({
    uniqueid: z.boolean().optional(),
    url: z.boolean().optional(),
  })
  .strict()

// ACCOUNT LINE ITEM TAG
//------------------------------------------------------

export const AccountLineItemTagSelectSchema: z.ZodType<Prisma.AccountLineItemTagSelect> = z
  .object({
    tag_id: z.boolean().optional(),
    tag_userid: z.boolean().optional(),
    tag_color: z.boolean().optional(),
    tag_label: z.boolean().optional(),
  })
  .strict()

// FIN ACCOUNT TAG
//------------------------------------------------------

export const FinAccountTagIncludeSchema: z.ZodType<Prisma.FinAccountTagInclude> = z
  .object({
    FinAccountLineItemTagMap: z.union([z.boolean(), z.lazy(() => FinAccountLineItemTagMapFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => FinAccountTagCountOutputTypeArgsSchema)]).optional(),
  })
  .strict()

export const FinAccountTagArgsSchema: z.ZodType<Prisma.FinAccountTagDefaultArgs> = z
  .object({
    select: z.lazy(() => FinAccountTagSelectSchema).optional(),
    include: z.lazy(() => FinAccountTagIncludeSchema).optional(),
  })
  .strict()

export const FinAccountTagCountOutputTypeArgsSchema: z.ZodType<Prisma.FinAccountTagCountOutputTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => FinAccountTagCountOutputTypeSelectSchema).nullish(),
  })
  .strict()

export const FinAccountTagCountOutputTypeSelectSchema: z.ZodType<Prisma.FinAccountTagCountOutputTypeSelect> = z
  .object({
    FinAccountLineItemTagMap: z.boolean().optional(),
  })
  .strict()

export const FinAccountTagSelectSchema: z.ZodType<Prisma.FinAccountTagSelect> = z
  .object({
    tag_id: z.boolean().optional(),
    tag_userid: z.boolean().optional(),
    tag_color: z.boolean().optional(),
    tag_label: z.boolean().optional(),
    when_added: z.boolean().optional(),
    when_deleted: z.boolean().optional(),
    FinAccountLineItemTagMap: z.union([z.boolean(), z.lazy(() => FinAccountLineItemTagMapFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => FinAccountTagCountOutputTypeArgsSchema)]).optional(),
  })
  .strict()

// FIN ACCOUNT LINE ITEM TAG MAP
//------------------------------------------------------

export const FinAccountLineItemTagMapIncludeSchema: z.ZodType<Prisma.FinAccountLineItemTagMapInclude> = z
  .object({
    transaction: z.union([z.boolean(), z.lazy(() => FinAccountLineItemsArgsSchema)]).optional(),
    tag: z.union([z.boolean(), z.lazy(() => FinAccountTagArgsSchema)]).optional(),
  })
  .strict()

export const FinAccountLineItemTagMapArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapDefaultArgs> = z
  .object({
    select: z.lazy(() => FinAccountLineItemTagMapSelectSchema).optional(),
    include: z.lazy(() => FinAccountLineItemTagMapIncludeSchema).optional(),
  })
  .strict()

export const FinAccountLineItemTagMapSelectSchema: z.ZodType<Prisma.FinAccountLineItemTagMapSelect> = z
  .object({
    id: z.boolean().optional(),
    when_added: z.boolean().optional(),
    when_deleted: z.boolean().optional(),
    t_id: z.boolean().optional(),
    tag_id: z.boolean().optional(),
    transaction: z.union([z.boolean(), z.lazy(() => FinAccountLineItemsArgsSchema)]).optional(),
    tag: z.union([z.boolean(), z.lazy(() => FinAccountTagArgsSchema)]).optional(),
  })
  .strict()

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    emailVerified: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    twoFactorEnabled: z
      .union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
      .optional()
      .nullable(),
    username: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    inviteCode: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
    sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
    twofactors: z.lazy(() => TwoFactorListRelationFilterSchema).optional(),
  })
  .strict()

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    twoFactorEnabled: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    username: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    inviteCode: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
    sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
    twofactors: z.lazy(() => TwoFactorOrderByRelationAggregateInputSchema).optional(),
    _relevance: z.lazy(() => UserOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z
  .union([
    z.object({
      id: z.string(),
      email: z.string(),
      username: z.string(),
    }),
    z.object({
      id: z.string(),
      email: z.string(),
    }),
    z.object({
      id: z.string(),
      username: z.string(),
    }),
    z.object({
      id: z.string(),
    }),
    z.object({
      email: z.string(),
      username: z.string(),
    }),
    z.object({
      email: z.string(),
    }),
    z.object({
      username: z.string(),
    }),
  ])
  .and(
    z
      .object({
        id: z.string().optional(),
        email: z.string().optional(),
        username: z.string().optional(),
        AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => UserWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
        name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        emailVerified: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
        image: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        twoFactorEnabled: z
          .union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
          .optional()
          .nullable(),
        inviteCode: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
        sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
        twofactors: z.lazy(() => TwoFactorListRelationFilterSchema).optional(),
      })
      .strict(),
  )

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    twoFactorEnabled: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    username: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    inviteCode: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    emailVerified: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
    image: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    twoFactorEnabled: z
      .union([z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean()])
      .optional()
      .nullable(),
    username: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    inviteCode: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict()

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => SessionWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expiresAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    ipAddress: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userAgent: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
  })
  .strict()

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    userAgent: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    _relevance: z.lazy(() => SessionOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z
  .union([
    z.object({
      id: z.string(),
      token: z.string(),
    }),
    z.object({
      id: z.string(),
    }),
    z.object({
      token: z.string(),
    }),
  ])
  .and(
    z
      .object({
        id: z.string().optional(),
        token: z.string().optional(),
        AND: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => SessionWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
        expiresAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        ipAddress: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        userAgent: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
      })
      .strict(),
  )

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    userAgent: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    expiresAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    token: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    ipAddress: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    userAgent: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  })
  .strict()

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => AccountWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    accountId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    providerId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    accessToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    refreshToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    idToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    scope: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    password: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
  })
  .strict()

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    refreshToken: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    idToken: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    accessTokenExpiresAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    refreshTokenExpiresAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    scope: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    password: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    _relevance: z.lazy(() => AccountOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z
  .object({
    id: z.string(),
  })
  .and(
    z
      .object({
        id: z.string().optional(),
        AND: z.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => AccountWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()]).optional(),
        accountId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        providerId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        accessToken: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        refreshToken: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        idToken: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        accessTokenExpiresAt: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        refreshTokenExpiresAt: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        scope: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        password: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
      })
      .strict(),
  )

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    refreshToken: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    idToken: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    accessTokenExpiresAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    refreshTokenExpiresAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    scope: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    password: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    accountId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    providerId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    accessToken: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    refreshToken: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    idToken: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    scope: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    password: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
  })
  .strict()

export const VerificationWhereInputSchema: z.ZodType<Prisma.VerificationWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => VerificationWhereInputSchema), z.lazy(() => VerificationWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => VerificationWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => VerificationWhereInputSchema), z.lazy(() => VerificationWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    identifier: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    value: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expiresAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    updatedAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
  })
  .strict()

export const VerificationOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    updatedAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _relevance: z.lazy(() => VerificationOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const VerificationWhereUniqueInputSchema: z.ZodType<Prisma.VerificationWhereUniqueInput> = z
  .object({
    id: z.string(),
  })
  .and(
    z
      .object({
        id: z.string().optional(),
        AND: z
          .union([z.lazy(() => VerificationWhereInputSchema), z.lazy(() => VerificationWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => VerificationWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => VerificationWhereInputSchema), z.lazy(() => VerificationWhereInputSchema).array()])
          .optional(),
        identifier: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        value: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        expiresAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        updatedAt: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
      })
      .strict(),
  )

export const VerificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    updatedAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => VerificationCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => VerificationMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => VerificationMinOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const VerificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),
          z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VerificationScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),
          z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      identifier: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      value: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      expiresAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      updatedAt: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
    })
    .strict()

export const TwoFactorWhereInputSchema: z.ZodType<Prisma.TwoFactorWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => TwoFactorWhereInputSchema), z.lazy(() => TwoFactorWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => TwoFactorWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => TwoFactorWhereInputSchema), z.lazy(() => TwoFactorWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    secret: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    backupCodes: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
  })
  .strict()

export const TwoFactorOrderByWithRelationInputSchema: z.ZodType<Prisma.TwoFactorOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    secret: z.lazy(() => SortOrderSchema).optional(),
    backupCodes: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    _relevance: z.lazy(() => TwoFactorOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const TwoFactorWhereUniqueInputSchema: z.ZodType<Prisma.TwoFactorWhereUniqueInput> = z
  .object({
    id: z.string(),
  })
  .and(
    z
      .object({
        id: z.string().optional(),
        AND: z.union([z.lazy(() => TwoFactorWhereInputSchema), z.lazy(() => TwoFactorWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => TwoFactorWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => TwoFactorWhereInputSchema), z.lazy(() => TwoFactorWhereInputSchema).array()]).optional(),
        secret: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        backupCodes: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
      })
      .strict(),
  )

export const TwoFactorOrderByWithAggregationInputSchema: z.ZodType<Prisma.TwoFactorOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    secret: z.lazy(() => SortOrderSchema).optional(),
    backupCodes: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => TwoFactorCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => TwoFactorMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => TwoFactorMinOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const TwoFactorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TwoFactorScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema),
        z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema),
        z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    secret: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    backupCodes: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  })
  .strict()

export const PhrLabResultWhereInputSchema: z.ZodType<Prisma.PhrLabResultWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => PhrLabResultWhereInputSchema), z.lazy(() => PhrLabResultWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => PhrLabResultWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => PhrLabResultWhereInputSchema), z.lazy(() => PhrLabResultWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    userId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    testName: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    collectionDatetime: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    resultDatetime: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    resultStatus: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    orderingProvider: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    resultingLab: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    analyte: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    value: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    unit: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    rangeMin: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    rangeMax: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    rangeUnit: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    normalValue: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    messageFromProvider: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    resultComment: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    labDirector: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict()

export const PhrLabResultOrderByWithRelationInputSchema: z.ZodType<Prisma.PhrLabResultOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    testName: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    collectionDatetime: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    resultDatetime: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    resultStatus: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    orderingProvider: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    resultingLab: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    analyte: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    value: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    unit: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    rangeMin: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    rangeMax: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    rangeUnit: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    normalValue: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    messageFromProvider: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    resultComment: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    labDirector: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _relevance: z.lazy(() => PhrLabResultOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const PhrLabResultWhereUniqueInputSchema: z.ZodType<Prisma.PhrLabResultWhereUniqueInput> = z
  .object({
    id: z.number().int(),
  })
  .and(
    z
      .object({
        id: z.number().int().optional(),
        AND: z
          .union([z.lazy(() => PhrLabResultWhereInputSchema), z.lazy(() => PhrLabResultWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => PhrLabResultWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => PhrLabResultWhereInputSchema), z.lazy(() => PhrLabResultWhereInputSchema).array()])
          .optional(),
        userId: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        testName: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        collectionDatetime: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        resultDatetime: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        resultStatus: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        orderingProvider: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        resultingLab: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        analyte: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        value: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        unit: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        rangeMin: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        rangeMax: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        rangeUnit: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        normalValue: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        messageFromProvider: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        resultComment: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        labDirector: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
      })
      .strict(),
  )

export const PhrLabResultOrderByWithAggregationInputSchema: z.ZodType<Prisma.PhrLabResultOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    testName: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    collectionDatetime: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    resultDatetime: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    resultStatus: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    orderingProvider: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    resultingLab: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    analyte: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    value: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    unit: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    rangeMin: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    rangeMax: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    rangeUnit: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    normalValue: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    messageFromProvider: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    resultComment: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    labDirector: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => PhrLabResultCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => PhrLabResultAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => PhrLabResultMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => PhrLabResultMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => PhrLabResultSumOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const PhrLabResultScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PhrLabResultScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PhrLabResultScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PhrLabResultScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PhrLabResultScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PhrLabResultScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PhrLabResultScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      userId: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      testName: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      collectionDatetime: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      resultDatetime: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      resultStatus: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      orderingProvider: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      resultingLab: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      analyte: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      value: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      unit: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      rangeMin: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      rangeMax: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      rangeUnit: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      normalValue: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      messageFromProvider: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      resultComment: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      labDirector: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict()

export const ProductKeyWhereInputSchema: z.ZodType<Prisma.ProductKeyWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => ProductKeyWhereInputSchema), z.lazy(() => ProductKeyWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => ProductKeyWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => ProductKeyWhereInputSchema), z.lazy(() => ProductKeyWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    uid: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    productId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    productKey: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    productName: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    computerName: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    comment: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    usedOn: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    claimedDate: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    keyType: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    keyRetrievalNote: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict()

export const ProductKeyOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductKeyOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    uid: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    productId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    productKey: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    productName: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    computerName: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    comment: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    usedOn: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    claimedDate: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    keyType: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    keyRetrievalNote: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _relevance: z.lazy(() => ProductKeyOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const ProductKeyWhereUniqueInputSchema: z.ZodType<Prisma.ProductKeyWhereUniqueInput> = z
  .union([
    z.object({
      id: z.number().int(),
      productKey: z.string(),
    }),
    z.object({
      id: z.number().int(),
    }),
    z.object({
      productKey: z.string(),
    }),
  ])
  .and(
    z
      .object({
        id: z.number().int().optional(),
        productKey: z.string().optional(),
        AND: z
          .union([z.lazy(() => ProductKeyWhereInputSchema), z.lazy(() => ProductKeyWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => ProductKeyWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => ProductKeyWhereInputSchema), z.lazy(() => ProductKeyWhereInputSchema).array()])
          .optional(),
        uid: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        productId: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        productName: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        computerName: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        comment: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        usedOn: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        claimedDate: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        keyType: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        keyRetrievalNote: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
      })
      .strict(),
  )

export const ProductKeyOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductKeyOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    uid: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    productId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    productKey: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    productName: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    computerName: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    comment: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    usedOn: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    claimedDate: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    keyType: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    keyRetrievalNote: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => ProductKeyCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => ProductKeyAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => ProductKeyMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => ProductKeyMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => ProductKeySumOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const ProductKeyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductKeyScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ProductKeyScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ProductKeyScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ProductKeyScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ProductKeyScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ProductKeyScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
    uid: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    productId: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    productKey: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    productName: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    computerName: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    comment: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    usedOn: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    claimedDate: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    keyType: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    keyRetrievalNote: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict()

export const FinAccountsWhereInputSchema: z.ZodType<Prisma.FinAccountsWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => FinAccountsWhereInputSchema), z.lazy(() => FinAccountsWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => FinAccountsWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => FinAccountsWhereInputSchema), z.lazy(() => FinAccountsWhereInputSchema).array()]).optional(),
    acct_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    acct_owner: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    acct_name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    acct_last_balance: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    acct_last_balance_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    acct_is_debt: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    acct_is_retirement: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    acct_sort_order: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    when_closed: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    when_deleted: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
  })
  .strict()

export const FinAccountsOrderByWithRelationInputSchema: z.ZodType<Prisma.FinAccountsOrderByWithRelationInput> = z
  .object({
    acct_id: z.lazy(() => SortOrderSchema).optional(),
    acct_owner: z.lazy(() => SortOrderSchema).optional(),
    acct_name: z.lazy(() => SortOrderSchema).optional(),
    acct_last_balance: z.lazy(() => SortOrderSchema).optional(),
    acct_last_balance_date: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    acct_is_debt: z.lazy(() => SortOrderSchema).optional(),
    acct_is_retirement: z.lazy(() => SortOrderSchema).optional(),
    acct_sort_order: z.lazy(() => SortOrderSchema).optional(),
    when_closed: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    when_deleted: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _relevance: z.lazy(() => FinAccountsOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const FinAccountsWhereUniqueInputSchema: z.ZodType<Prisma.FinAccountsWhereUniqueInput> = z
  .union([
    z.object({
      acct_id: z.number().int(),
      acct_owner_acct_name: z.lazy(() => FinAccountsAcct_ownerAcct_nameCompoundUniqueInputSchema),
    }),
    z.object({
      acct_id: z.number().int(),
    }),
    z.object({
      acct_owner_acct_name: z.lazy(() => FinAccountsAcct_ownerAcct_nameCompoundUniqueInputSchema),
    }),
  ])
  .and(
    z
      .object({
        acct_id: z.number().int().optional(),
        acct_owner_acct_name: z.lazy(() => FinAccountsAcct_ownerAcct_nameCompoundUniqueInputSchema).optional(),
        AND: z
          .union([z.lazy(() => FinAccountsWhereInputSchema), z.lazy(() => FinAccountsWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => FinAccountsWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => FinAccountsWhereInputSchema), z.lazy(() => FinAccountsWhereInputSchema).array()])
          .optional(),
        acct_owner: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        acct_name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        acct_last_balance: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        acct_last_balance_date: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        acct_is_debt: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
        acct_is_retirement: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
        acct_sort_order: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        when_closed: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        when_deleted: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
      })
      .strict(),
  )

export const FinAccountsOrderByWithAggregationInputSchema: z.ZodType<Prisma.FinAccountsOrderByWithAggregationInput> = z
  .object({
    acct_id: z.lazy(() => SortOrderSchema).optional(),
    acct_owner: z.lazy(() => SortOrderSchema).optional(),
    acct_name: z.lazy(() => SortOrderSchema).optional(),
    acct_last_balance: z.lazy(() => SortOrderSchema).optional(),
    acct_last_balance_date: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    acct_is_debt: z.lazy(() => SortOrderSchema).optional(),
    acct_is_retirement: z.lazy(() => SortOrderSchema).optional(),
    acct_sort_order: z.lazy(() => SortOrderSchema).optional(),
    when_closed: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    when_deleted: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => FinAccountsCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => FinAccountsAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => FinAccountsMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => FinAccountsMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => FinAccountsSumOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const FinAccountsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FinAccountsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => FinAccountsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinAccountsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => FinAccountsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => FinAccountsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinAccountsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      acct_id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      acct_owner: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      acct_name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      acct_last_balance: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      acct_last_balance_date: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      acct_is_debt: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
      acct_is_retirement: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
      acct_sort_order: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      when_closed: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      when_deleted: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
    })
    .strict()

export const FinAccountLineItemsWhereInputSchema: z.ZodType<Prisma.FinAccountLineItemsWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => FinAccountLineItemsWhereInputSchema), z.lazy(() => FinAccountLineItemsWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => FinAccountLineItemsWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => FinAccountLineItemsWhereInputSchema), z.lazy(() => FinAccountLineItemsWhereInputSchema).array()])
      .optional(),
    t_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    t_account: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    t_date: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    t_date_posted: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    t_type: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    t_schc_category: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    t_amt: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    t_symbol: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    t_qty: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    t_price: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    t_commission: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    t_fee: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    t_method: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    t_source: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    t_origin: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    opt_expiration: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    opt_type: z
      .union([
        z.lazy(() => Enumaccount_line_items_opt_typeNullableFilterSchema),
        z.lazy(() => account_line_items_opt_typeSchema),
      ])
      .optional()
      .nullable(),
    opt_strike: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    t_description: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    t_comment: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    t_from: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    t_to: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    t_interest_rate: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    t_cusip: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    t_harvested_amount: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    parent_t_id: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    when_added: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    when_deleted: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    tags: z.lazy(() => FinAccountLineItemTagMapListRelationFilterSchema).optional(),
  })
  .strict()

export const FinAccountLineItemsOrderByWithRelationInputSchema: z.ZodType<Prisma.FinAccountLineItemsOrderByWithRelationInput> =
  z
    .object({
      t_id: z.lazy(() => SortOrderSchema).optional(),
      t_account: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_date: z.lazy(() => SortOrderSchema).optional(),
      t_date_posted: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_type: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_schc_category: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_amt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_symbol: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_qty: z.lazy(() => SortOrderSchema).optional(),
      t_price: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_commission: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_fee: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_method: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_source: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_origin: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      opt_expiration: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      opt_type: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      opt_strike: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_description: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_comment: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_from: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_to: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_interest_rate: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_cusip: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_harvested_amount: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      parent_t_id: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      when_added: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      when_deleted: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      tags: z.lazy(() => FinAccountLineItemTagMapOrderByRelationAggregateInputSchema).optional(),
      _relevance: z.lazy(() => FinAccountLineItemsOrderByRelevanceInputSchema).optional(),
    })
    .strict()

export const FinAccountLineItemsWhereUniqueInputSchema: z.ZodType<Prisma.FinAccountLineItemsWhereUniqueInput> = z
  .object({
    t_id: z.number().int(),
  })
  .and(
    z
      .object({
        t_id: z.number().int().optional(),
        AND: z
          .union([
            z.lazy(() => FinAccountLineItemsWhereInputSchema),
            z.lazy(() => FinAccountLineItemsWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => FinAccountLineItemsWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => FinAccountLineItemsWhereInputSchema),
            z.lazy(() => FinAccountLineItemsWhereInputSchema).array(),
          ])
          .optional(),
        t_account: z
          .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
          .optional()
          .nullable(),
        t_date: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        t_date_posted: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        t_type: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        t_schc_category: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        t_amt: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        t_symbol: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        t_qty: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        t_price: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        t_commission: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        t_fee: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        t_method: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        t_source: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        t_origin: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        opt_expiration: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        opt_type: z
          .union([
            z.lazy(() => Enumaccount_line_items_opt_typeNullableFilterSchema),
            z.lazy(() => account_line_items_opt_typeSchema),
          ])
          .optional()
          .nullable(),
        opt_strike: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        t_description: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        t_comment: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        t_from: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        t_to: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        t_interest_rate: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        t_cusip: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        t_harvested_amount: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        parent_t_id: z
          .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
          .optional()
          .nullable(),
        when_added: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        when_deleted: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        tags: z.lazy(() => FinAccountLineItemTagMapListRelationFilterSchema).optional(),
      })
      .strict(),
  )

export const FinAccountLineItemsOrderByWithAggregationInputSchema: z.ZodType<Prisma.FinAccountLineItemsOrderByWithAggregationInput> =
  z
    .object({
      t_id: z.lazy(() => SortOrderSchema).optional(),
      t_account: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_date: z.lazy(() => SortOrderSchema).optional(),
      t_date_posted: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_type: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_schc_category: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_amt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_symbol: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_qty: z.lazy(() => SortOrderSchema).optional(),
      t_price: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_commission: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_fee: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_method: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_source: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_origin: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      opt_expiration: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      opt_type: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      opt_strike: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_description: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_comment: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_from: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_to: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_interest_rate: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_cusip: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_harvested_amount: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      parent_t_id: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      when_added: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      when_deleted: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      _count: z.lazy(() => FinAccountLineItemsCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => FinAccountLineItemsAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => FinAccountLineItemsMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => FinAccountLineItemsMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => FinAccountLineItemsSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const FinAccountLineItemsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FinAccountLineItemsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => FinAccountLineItemsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinAccountLineItemsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => FinAccountLineItemsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => FinAccountLineItemsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinAccountLineItemsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      t_id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      t_account: z
        .union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()])
        .optional()
        .nullable(),
      t_date: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      t_date_posted: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      t_type: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      t_schc_category: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      t_amt: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      t_symbol: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      t_qty: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
      t_price: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      t_commission: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      t_fee: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      t_method: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      t_source: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      t_origin: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      opt_expiration: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      opt_type: z
        .union([
          z.lazy(() => Enumaccount_line_items_opt_typeNullableWithAggregatesFilterSchema),
          z.lazy(() => account_line_items_opt_typeSchema),
        ])
        .optional()
        .nullable(),
      opt_strike: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      t_description: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      t_comment: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      t_from: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      t_to: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      t_interest_rate: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      t_cusip: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      t_harvested_amount: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      parent_t_id: z
        .union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()])
        .optional()
        .nullable(),
      when_added: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      when_deleted: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
    })
    .strict()

export const FinAccountBalanceSnapshotWhereInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => FinAccountBalanceSnapshotWhereInputSchema),
        z.lazy(() => FinAccountBalanceSnapshotWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => FinAccountBalanceSnapshotWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => FinAccountBalanceSnapshotWhereInputSchema),
        z.lazy(() => FinAccountBalanceSnapshotWhereInputSchema).array(),
      ])
      .optional(),
    snapshot_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    acct_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    balance: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    when_added: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
  })
  .strict()

export const FinAccountBalanceSnapshotOrderByWithRelationInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotOrderByWithRelationInput> =
  z
    .object({
      snapshot_id: z.lazy(() => SortOrderSchema).optional(),
      acct_id: z.lazy(() => SortOrderSchema).optional(),
      balance: z.lazy(() => SortOrderSchema).optional(),
      when_added: z.lazy(() => SortOrderSchema).optional(),
      _relevance: z.lazy(() => FinAccountBalanceSnapshotOrderByRelevanceInputSchema).optional(),
    })
    .strict()

export const FinAccountBalanceSnapshotWhereUniqueInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotWhereUniqueInput> =
  z
    .object({
      snapshot_id: z.number().int(),
    })
    .and(
      z
        .object({
          snapshot_id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => FinAccountBalanceSnapshotWhereInputSchema),
              z.lazy(() => FinAccountBalanceSnapshotWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => FinAccountBalanceSnapshotWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => FinAccountBalanceSnapshotWhereInputSchema),
              z.lazy(() => FinAccountBalanceSnapshotWhereInputSchema).array(),
            ])
            .optional(),
          acct_id: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
          balance: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
          when_added: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        })
        .strict(),
    )

export const FinAccountBalanceSnapshotOrderByWithAggregationInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotOrderByWithAggregationInput> =
  z
    .object({
      snapshot_id: z.lazy(() => SortOrderSchema).optional(),
      acct_id: z.lazy(() => SortOrderSchema).optional(),
      balance: z.lazy(() => SortOrderSchema).optional(),
      when_added: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => FinAccountBalanceSnapshotCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => FinAccountBalanceSnapshotAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => FinAccountBalanceSnapshotMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => FinAccountBalanceSnapshotMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => FinAccountBalanceSnapshotSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const FinAccountBalanceSnapshotScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => FinAccountBalanceSnapshotScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinAccountBalanceSnapshotScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => FinAccountBalanceSnapshotScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => FinAccountBalanceSnapshotScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinAccountBalanceSnapshotScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      snapshot_id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      acct_id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      balance: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      when_added: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    })
    .strict()

export const EarningsAnnualWhereInputSchema: z.ZodType<Prisma.EarningsAnnualWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => EarningsAnnualWhereInputSchema), z.lazy(() => EarningsAnnualWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => EarningsAnnualWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => EarningsAnnualWhereInputSchema), z.lazy(() => EarningsAnnualWhereInputSchema).array()])
      .optional(),
    symbol: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fiscalDateEnding: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    reportedEPS: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsAnnualOrderByWithRelationInputSchema: z.ZodType<Prisma.EarningsAnnualOrderByWithRelationInput> = z
  .object({
    symbol: z.lazy(() => SortOrderSchema).optional(),
    fiscalDateEnding: z.lazy(() => SortOrderSchema).optional(),
    reportedEPS: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _relevance: z.lazy(() => EarningsAnnualOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const EarningsAnnualWhereUniqueInputSchema: z.ZodType<Prisma.EarningsAnnualWhereUniqueInput> = z
  .object({
    symbol_fiscalDateEnding: z.lazy(() => EarningsAnnualSymbolFiscalDateEndingCompoundUniqueInputSchema),
  })
  .and(
    z
      .object({
        symbol_fiscalDateEnding: z.lazy(() => EarningsAnnualSymbolFiscalDateEndingCompoundUniqueInputSchema).optional(),
        AND: z
          .union([z.lazy(() => EarningsAnnualWhereInputSchema), z.lazy(() => EarningsAnnualWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => EarningsAnnualWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => EarningsAnnualWhereInputSchema), z.lazy(() => EarningsAnnualWhereInputSchema).array()])
          .optional(),
        symbol: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        fiscalDateEnding: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        reportedEPS: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
      })
      .strict(),
  )

export const EarningsAnnualOrderByWithAggregationInputSchema: z.ZodType<Prisma.EarningsAnnualOrderByWithAggregationInput> =
  z
    .object({
      symbol: z.lazy(() => SortOrderSchema).optional(),
      fiscalDateEnding: z.lazy(() => SortOrderSchema).optional(),
      reportedEPS: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      _count: z.lazy(() => EarningsAnnualCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => EarningsAnnualAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => EarningsAnnualMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => EarningsAnnualMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => EarningsAnnualSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const EarningsAnnualScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EarningsAnnualScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => EarningsAnnualScalarWhereWithAggregatesInputSchema),
          z.lazy(() => EarningsAnnualScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => EarningsAnnualScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => EarningsAnnualScalarWhereWithAggregatesInputSchema),
          z.lazy(() => EarningsAnnualScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      symbol: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      fiscalDateEnding: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
      reportedEPS: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
    })
    .strict()

export const EarningsQuarterlyWhereInputSchema: z.ZodType<Prisma.EarningsQuarterlyWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => EarningsQuarterlyWhereInputSchema), z.lazy(() => EarningsQuarterlyWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => EarningsQuarterlyWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => EarningsQuarterlyWhereInputSchema), z.lazy(() => EarningsQuarterlyWhereInputSchema).array()])
      .optional(),
    symbol: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fiscalDateEnding: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    reportedDate: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    reportedEPS: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    estimatedEPS: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    surprise: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    surprisePercentage: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsQuarterlyOrderByWithRelationInputSchema: z.ZodType<Prisma.EarningsQuarterlyOrderByWithRelationInput> =
  z
    .object({
      symbol: z.lazy(() => SortOrderSchema).optional(),
      fiscalDateEnding: z.lazy(() => SortOrderSchema).optional(),
      reportedDate: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      reportedEPS: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      estimatedEPS: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      surprise: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      surprisePercentage: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      _relevance: z.lazy(() => EarningsQuarterlyOrderByRelevanceInputSchema).optional(),
    })
    .strict()

export const EarningsQuarterlyWhereUniqueInputSchema: z.ZodType<Prisma.EarningsQuarterlyWhereUniqueInput> = z
  .object({
    symbol_fiscalDateEnding: z.lazy(() => EarningsQuarterlySymbolFiscalDateEndingCompoundUniqueInputSchema),
  })
  .and(
    z
      .object({
        symbol_fiscalDateEnding: z.lazy(() => EarningsQuarterlySymbolFiscalDateEndingCompoundUniqueInputSchema).optional(),
        AND: z
          .union([z.lazy(() => EarningsQuarterlyWhereInputSchema), z.lazy(() => EarningsQuarterlyWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => EarningsQuarterlyWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => EarningsQuarterlyWhereInputSchema), z.lazy(() => EarningsQuarterlyWhereInputSchema).array()])
          .optional(),
        symbol: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        fiscalDateEnding: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        reportedDate: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        reportedEPS: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        estimatedEPS: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        surprise: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        surprisePercentage: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
      })
      .strict(),
  )

export const EarningsQuarterlyOrderByWithAggregationInputSchema: z.ZodType<Prisma.EarningsQuarterlyOrderByWithAggregationInput> =
  z
    .object({
      symbol: z.lazy(() => SortOrderSchema).optional(),
      fiscalDateEnding: z.lazy(() => SortOrderSchema).optional(),
      reportedDate: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      reportedEPS: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      estimatedEPS: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      surprise: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      surprisePercentage: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      _count: z.lazy(() => EarningsQuarterlyCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => EarningsQuarterlyAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => EarningsQuarterlyMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => EarningsQuarterlyMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => EarningsQuarterlySumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const EarningsQuarterlyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EarningsQuarterlyScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => EarningsQuarterlyScalarWhereWithAggregatesInputSchema),
          z.lazy(() => EarningsQuarterlyScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => EarningsQuarterlyScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => EarningsQuarterlyScalarWhereWithAggregatesInputSchema),
          z.lazy(() => EarningsQuarterlyScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      symbol: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      fiscalDateEnding: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
      reportedDate: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      reportedEPS: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      estimatedEPS: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      surprise: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      surprisePercentage: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
    })
    .strict()

export const FinEquityAwardsWhereInputSchema: z.ZodType<Prisma.FinEquityAwardsWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => FinEquityAwardsWhereInputSchema), z.lazy(() => FinEquityAwardsWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => FinEquityAwardsWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => FinEquityAwardsWhereInputSchema), z.lazy(() => FinEquityAwardsWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    award_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    grant_date: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    vest_date: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    share_count: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    symbol: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    uid: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    vest_price: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const FinEquityAwardsOrderByWithRelationInputSchema: z.ZodType<Prisma.FinEquityAwardsOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    award_id: z.lazy(() => SortOrderSchema).optional(),
    grant_date: z.lazy(() => SortOrderSchema).optional(),
    vest_date: z.lazy(() => SortOrderSchema).optional(),
    share_count: z.lazy(() => SortOrderSchema).optional(),
    symbol: z.lazy(() => SortOrderSchema).optional(),
    uid: z.lazy(() => SortOrderSchema).optional(),
    vest_price: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _relevance: z.lazy(() => FinEquityAwardsOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const FinEquityAwardsWhereUniqueInputSchema: z.ZodType<Prisma.FinEquityAwardsWhereUniqueInput> = z
  .union([
    z.object({
      id: z.number().int(),
      grant_date_award_id_vest_date_symbol: z.lazy(
        () => FinEquityAwardsGrant_dateAward_idVest_dateSymbolCompoundUniqueInputSchema,
      ),
    }),
    z.object({
      id: z.number().int(),
    }),
    z.object({
      grant_date_award_id_vest_date_symbol: z.lazy(
        () => FinEquityAwardsGrant_dateAward_idVest_dateSymbolCompoundUniqueInputSchema,
      ),
    }),
  ])
  .and(
    z
      .object({
        id: z.number().int().optional(),
        grant_date_award_id_vest_date_symbol: z
          .lazy(() => FinEquityAwardsGrant_dateAward_idVest_dateSymbolCompoundUniqueInputSchema)
          .optional(),
        AND: z
          .union([z.lazy(() => FinEquityAwardsWhereInputSchema), z.lazy(() => FinEquityAwardsWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => FinEquityAwardsWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => FinEquityAwardsWhereInputSchema), z.lazy(() => FinEquityAwardsWhereInputSchema).array()])
          .optional(),
        award_id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        grant_date: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        vest_date: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        share_count: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        symbol: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        uid: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        vest_price: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
      })
      .strict(),
  )

export const FinEquityAwardsOrderByWithAggregationInputSchema: z.ZodType<Prisma.FinEquityAwardsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      award_id: z.lazy(() => SortOrderSchema).optional(),
      grant_date: z.lazy(() => SortOrderSchema).optional(),
      vest_date: z.lazy(() => SortOrderSchema).optional(),
      share_count: z.lazy(() => SortOrderSchema).optional(),
      symbol: z.lazy(() => SortOrderSchema).optional(),
      uid: z.lazy(() => SortOrderSchema).optional(),
      vest_price: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      _count: z.lazy(() => FinEquityAwardsCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => FinEquityAwardsAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => FinEquityAwardsMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => FinEquityAwardsMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => FinEquityAwardsSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const FinEquityAwardsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FinEquityAwardsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => FinEquityAwardsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinEquityAwardsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => FinEquityAwardsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => FinEquityAwardsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinEquityAwardsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      award_id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      grant_date: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      vest_date: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      share_count: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      symbol: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      uid: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      vest_price: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
    })
    .strict()

export const FinPayslipsWhereInputSchema: z.ZodType<Prisma.FinPayslipsWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => FinPayslipsWhereInputSchema), z.lazy(() => FinPayslipsWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => FinPayslipsWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => FinPayslipsWhereInputSchema), z.lazy(() => FinPayslipsWhereInputSchema).array()]).optional(),
    payslip_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    uid: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    period_start: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    period_end: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    pay_date: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    earnings_gross: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    earnings_bonus: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    earnings_net_pay: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional(),
    earnings_rsu: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    imp_other: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    imp_legal: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    imp_fitness: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    imp_ltd: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    ps_oasdi: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    ps_medicare: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    ps_fed_tax: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    ps_fed_tax_addl: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    ps_state_tax: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    ps_state_tax_addl: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    ps_state_disability: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    ps_401k_pretax: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    ps_401k_aftertax: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    ps_401k_employer: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    ps_fed_tax_refunded: z
      .union([
        z.lazy(() => DecimalNullableFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional()
      .nullable(),
    ps_payslip_file_hash: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    ps_is_estimated: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    ps_comment: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    ps_pretax_medical: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional(),
    ps_pretax_fsa: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional(),
    ps_salary: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional(),
    ps_vacation_payout: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional(),
    ps_pretax_dental: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional(),
    ps_pretax_vision: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional(),
    other: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict()

export const FinPayslipsOrderByWithRelationInputSchema: z.ZodType<Prisma.FinPayslipsOrderByWithRelationInput> = z
  .object({
    payslip_id: z.lazy(() => SortOrderSchema).optional(),
    uid: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    period_start: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    period_end: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    pay_date: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    earnings_gross: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    earnings_bonus: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    earnings_net_pay: z.lazy(() => SortOrderSchema).optional(),
    earnings_rsu: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    imp_other: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    imp_legal: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    imp_fitness: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    imp_ltd: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_oasdi: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_medicare: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_fed_tax: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_fed_tax_addl: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_state_tax: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_state_tax_addl: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_state_disability: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_401k_pretax: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_401k_aftertax: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_401k_employer: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_fed_tax_refunded: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_payslip_file_hash: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_is_estimated: z.lazy(() => SortOrderSchema).optional(),
    ps_comment: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_pretax_medical: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_fsa: z.lazy(() => SortOrderSchema).optional(),
    ps_salary: z.lazy(() => SortOrderSchema).optional(),
    ps_vacation_payout: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_dental: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_vision: z.lazy(() => SortOrderSchema).optional(),
    other: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _relevance: z.lazy(() => FinPayslipsOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const FinPayslipsWhereUniqueInputSchema: z.ZodType<Prisma.FinPayslipsWhereUniqueInput> = z
  .union([
    z.object({
      payslip_id: z.number().int(),
      uid_period_start_period_end_pay_date: z.lazy(
        () => FinPayslipsUidPeriod_startPeriod_endPay_dateCompoundUniqueInputSchema,
      ),
    }),
    z.object({
      payslip_id: z.number().int(),
    }),
    z.object({
      uid_period_start_period_end_pay_date: z.lazy(
        () => FinPayslipsUidPeriod_startPeriod_endPay_dateCompoundUniqueInputSchema,
      ),
    }),
  ])
  .and(
    z
      .object({
        payslip_id: z.number().int().optional(),
        uid_period_start_period_end_pay_date: z
          .lazy(() => FinPayslipsUidPeriod_startPeriod_endPay_dateCompoundUniqueInputSchema)
          .optional(),
        AND: z
          .union([z.lazy(() => FinPayslipsWhereInputSchema), z.lazy(() => FinPayslipsWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => FinPayslipsWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => FinPayslipsWhereInputSchema), z.lazy(() => FinPayslipsWhereInputSchema).array()])
          .optional(),
        uid: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        period_start: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        period_end: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        pay_date: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        earnings_gross: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        earnings_bonus: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        earnings_net_pay: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional(),
        earnings_rsu: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        imp_other: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        imp_legal: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        imp_fitness: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        imp_ltd: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        ps_oasdi: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        ps_medicare: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        ps_fed_tax: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        ps_fed_tax_addl: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        ps_state_tax: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        ps_state_tax_addl: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        ps_state_disability: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        ps_401k_pretax: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        ps_401k_aftertax: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        ps_401k_employer: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        ps_fed_tax_refunded: z
          .union([
            z.lazy(() => DecimalNullableFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional()
          .nullable(),
        ps_payslip_file_hash: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        ps_is_estimated: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
        ps_comment: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        ps_pretax_medical: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional(),
        ps_pretax_fsa: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional(),
        ps_salary: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional(),
        ps_vacation_payout: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional(),
        ps_pretax_dental: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional(),
        ps_pretax_vision: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional(),
        other: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
      })
      .strict(),
  )

export const FinPayslipsOrderByWithAggregationInputSchema: z.ZodType<Prisma.FinPayslipsOrderByWithAggregationInput> = z
  .object({
    payslip_id: z.lazy(() => SortOrderSchema).optional(),
    uid: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    period_start: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    period_end: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    pay_date: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    earnings_gross: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    earnings_bonus: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    earnings_net_pay: z.lazy(() => SortOrderSchema).optional(),
    earnings_rsu: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    imp_other: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    imp_legal: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    imp_fitness: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    imp_ltd: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_oasdi: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_medicare: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_fed_tax: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_fed_tax_addl: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_state_tax: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_state_tax_addl: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_state_disability: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_401k_pretax: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_401k_aftertax: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_401k_employer: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_fed_tax_refunded: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_payslip_file_hash: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_is_estimated: z.lazy(() => SortOrderSchema).optional(),
    ps_comment: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ps_pretax_medical: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_fsa: z.lazy(() => SortOrderSchema).optional(),
    ps_salary: z.lazy(() => SortOrderSchema).optional(),
    ps_vacation_payout: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_dental: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_vision: z.lazy(() => SortOrderSchema).optional(),
    other: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => FinPayslipsCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => FinPayslipsAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => FinPayslipsMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => FinPayslipsMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => FinPayslipsSumOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const FinPayslipsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FinPayslipsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => FinPayslipsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinPayslipsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => FinPayslipsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => FinPayslipsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinPayslipsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      payslip_id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      uid: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      period_start: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      period_end: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      pay_date: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      earnings_gross: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      earnings_bonus: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      earnings_net_pay: z
        .union([
          z.lazy(() => DecimalWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional(),
      earnings_rsu: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      imp_other: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      imp_legal: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      imp_fitness: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      imp_ltd: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      ps_oasdi: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      ps_medicare: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      ps_fed_tax: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      ps_fed_tax_addl: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      ps_state_tax: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      ps_state_tax_addl: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      ps_state_disability: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      ps_401k_pretax: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      ps_401k_aftertax: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      ps_401k_employer: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      ps_fed_tax_refunded: z
        .union([
          z.lazy(() => DecimalNullableWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional()
        .nullable(),
      ps_payslip_file_hash: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      ps_is_estimated: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
      ps_comment: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      ps_pretax_medical: z
        .union([
          z.lazy(() => DecimalWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional(),
      ps_pretax_fsa: z
        .union([
          z.lazy(() => DecimalWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional(),
      ps_salary: z
        .union([
          z.lazy(() => DecimalWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional(),
      ps_vacation_payout: z
        .union([
          z.lazy(() => DecimalWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional(),
      ps_pretax_dental: z
        .union([
          z.lazy(() => DecimalWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional(),
      ps_pretax_vision: z
        .union([
          z.lazy(() => DecimalWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional(),
      other: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict()

export const FinPayslipUploadsWhereInputSchema: z.ZodType<Prisma.FinPayslipUploadsWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => FinPayslipUploadsWhereInputSchema), z.lazy(() => FinPayslipUploadsWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => FinPayslipUploadsWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => FinPayslipUploadsWhereInputSchema), z.lazy(() => FinPayslipUploadsWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    file_name: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    file_hash: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    parsed_json: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict()

export const FinPayslipUploadsOrderByWithRelationInputSchema: z.ZodType<Prisma.FinPayslipUploadsOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      file_name: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      file_hash: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      parsed_json: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      _relevance: z.lazy(() => FinPayslipUploadsOrderByRelevanceInputSchema).optional(),
    })
    .strict()

export const FinPayslipUploadsWhereUniqueInputSchema: z.ZodType<Prisma.FinPayslipUploadsWhereUniqueInput> = z
  .object({
    id: z.number().int(),
  })
  .and(
    z
      .object({
        id: z.number().int().optional(),
        AND: z
          .union([z.lazy(() => FinPayslipUploadsWhereInputSchema), z.lazy(() => FinPayslipUploadsWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => FinPayslipUploadsWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => FinPayslipUploadsWhereInputSchema), z.lazy(() => FinPayslipUploadsWhereInputSchema).array()])
          .optional(),
        file_name: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        file_hash: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        parsed_json: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
      })
      .strict(),
  )

export const FinPayslipUploadsOrderByWithAggregationInputSchema: z.ZodType<Prisma.FinPayslipUploadsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      file_name: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      file_hash: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      parsed_json: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      _count: z.lazy(() => FinPayslipUploadsCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => FinPayslipUploadsAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => FinPayslipUploadsMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => FinPayslipUploadsMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => FinPayslipUploadsSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const FinPayslipUploadsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FinPayslipUploadsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => FinPayslipUploadsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinPayslipUploadsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => FinPayslipUploadsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => FinPayslipUploadsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinPayslipUploadsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      file_name: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      file_hash: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      parsed_json: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict()

export const GraduatedTaxWhereInputSchema: z.ZodType<Prisma.GraduatedTaxWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => GraduatedTaxWhereInputSchema), z.lazy(() => GraduatedTaxWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => GraduatedTaxWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => GraduatedTaxWhereInputSchema), z.lazy(() => GraduatedTaxWhereInputSchema).array()])
      .optional(),
    year: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    region: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    income_over: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    type: z.union([z.lazy(() => Enumgraduated_tax_typeFilterSchema), z.lazy(() => graduated_tax_typeSchema)]).optional(),
    rate: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional(),
    verified: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  })
  .strict()

export const GraduatedTaxOrderByWithRelationInputSchema: z.ZodType<Prisma.GraduatedTaxOrderByWithRelationInput> = z
  .object({
    year: z.lazy(() => SortOrderSchema).optional(),
    region: z.lazy(() => SortOrderSchema).optional(),
    income_over: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    rate: z.lazy(() => SortOrderSchema).optional(),
    verified: z.lazy(() => SortOrderSchema).optional(),
    _relevance: z.lazy(() => GraduatedTaxOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const GraduatedTaxWhereUniqueInputSchema: z.ZodType<Prisma.GraduatedTaxWhereUniqueInput> = z
  .object({
    year_region_income_over_type: z.lazy(() => GraduatedTaxYearRegionIncome_overTypeCompoundUniqueInputSchema),
  })
  .and(
    z
      .object({
        year_region_income_over_type: z
          .lazy(() => GraduatedTaxYearRegionIncome_overTypeCompoundUniqueInputSchema)
          .optional(),
        AND: z
          .union([z.lazy(() => GraduatedTaxWhereInputSchema), z.lazy(() => GraduatedTaxWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => GraduatedTaxWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => GraduatedTaxWhereInputSchema), z.lazy(() => GraduatedTaxWhereInputSchema).array()])
          .optional(),
        year: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        region: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        income_over: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        type: z
          .union([z.lazy(() => Enumgraduated_tax_typeFilterSchema), z.lazy(() => graduated_tax_typeSchema)])
          .optional(),
        rate: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional(),
        verified: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
      })
      .strict(),
  )

export const GraduatedTaxOrderByWithAggregationInputSchema: z.ZodType<Prisma.GraduatedTaxOrderByWithAggregationInput> = z
  .object({
    year: z.lazy(() => SortOrderSchema).optional(),
    region: z.lazy(() => SortOrderSchema).optional(),
    income_over: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    rate: z.lazy(() => SortOrderSchema).optional(),
    verified: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => GraduatedTaxCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => GraduatedTaxAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => GraduatedTaxMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => GraduatedTaxMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => GraduatedTaxSumOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const GraduatedTaxScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GraduatedTaxScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => GraduatedTaxScalarWhereWithAggregatesInputSchema),
          z.lazy(() => GraduatedTaxScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => GraduatedTaxScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => GraduatedTaxScalarWhereWithAggregatesInputSchema),
          z.lazy(() => GraduatedTaxScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      year: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      region: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      income_over: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      type: z
        .union([z.lazy(() => Enumgraduated_tax_typeWithAggregatesFilterSchema), z.lazy(() => graduated_tax_typeSchema)])
        .optional(),
      rate: z
        .union([
          z.lazy(() => DecimalWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional(),
      verified: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
    })
    .strict()

export const PHRPatientVitalsWhereInputSchema: z.ZodType<Prisma.PHRPatientVitalsWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => PHRPatientVitalsWhereInputSchema), z.lazy(() => PHRPatientVitalsWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => PHRPatientVitalsWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => PHRPatientVitalsWhereInputSchema), z.lazy(() => PHRPatientVitalsWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    user_id: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    vital_name: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    vital_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    vital_value: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict()

export const PHRPatientVitalsOrderByWithRelationInputSchema: z.ZodType<Prisma.PHRPatientVitalsOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    user_id: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    vital_name: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    vital_date: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    vital_value: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _relevance: z.lazy(() => PHRPatientVitalsOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const PHRPatientVitalsWhereUniqueInputSchema: z.ZodType<Prisma.PHRPatientVitalsWhereUniqueInput> = z
  .object({
    id: z.number().int(),
  })
  .and(
    z
      .object({
        id: z.number().int().optional(),
        AND: z
          .union([z.lazy(() => PHRPatientVitalsWhereInputSchema), z.lazy(() => PHRPatientVitalsWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => PHRPatientVitalsWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => PHRPatientVitalsWhereInputSchema), z.lazy(() => PHRPatientVitalsWhereInputSchema).array()])
          .optional(),
        user_id: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        vital_name: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        vital_date: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        vital_value: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
      })
      .strict(),
  )

export const PHRPatientVitalsOrderByWithAggregationInputSchema: z.ZodType<Prisma.PHRPatientVitalsOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      vital_name: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      vital_date: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      vital_value: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      _count: z.lazy(() => PHRPatientVitalsCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => PHRPatientVitalsAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => PHRPatientVitalsMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => PHRPatientVitalsMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => PHRPatientVitalsSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const PHRPatientVitalsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PHRPatientVitalsScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PHRPatientVitalsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PHRPatientVitalsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PHRPatientVitalsScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PHRPatientVitalsScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PHRPatientVitalsScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      user_id: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      vital_name: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      vital_date: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      vital_value: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict()

export const StockQuotesDailyWhereInputSchema: z.ZodType<Prisma.StockQuotesDailyWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => StockQuotesDailyWhereInputSchema), z.lazy(() => StockQuotesDailyWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => StockQuotesDailyWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => StockQuotesDailyWhereInputSchema), z.lazy(() => StockQuotesDailyWhereInputSchema).array()])
      .optional(),
    c_date: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    c_symb: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    c_open: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional(),
    c_high: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional(),
    c_low: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional(),
    c_close: z
      .union([
        z.lazy(() => DecimalFilterSchema),
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
      ])
      .optional(),
    c_vol: z.union([z.lazy(() => BigIntFilterSchema), z.bigint()]).optional(),
  })
  .strict()

export const StockQuotesDailyOrderByWithRelationInputSchema: z.ZodType<Prisma.StockQuotesDailyOrderByWithRelationInput> = z
  .object({
    c_date: z.lazy(() => SortOrderSchema).optional(),
    c_symb: z.lazy(() => SortOrderSchema).optional(),
    c_open: z.lazy(() => SortOrderSchema).optional(),
    c_high: z.lazy(() => SortOrderSchema).optional(),
    c_low: z.lazy(() => SortOrderSchema).optional(),
    c_close: z.lazy(() => SortOrderSchema).optional(),
    c_vol: z.lazy(() => SortOrderSchema).optional(),
    _relevance: z.lazy(() => StockQuotesDailyOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const StockQuotesDailyWhereUniqueInputSchema: z.ZodType<Prisma.StockQuotesDailyWhereUniqueInput> = z
  .object({
    c_symb_c_date: z.lazy(() => StockQuotesDailyC_symbC_dateCompoundUniqueInputSchema),
  })
  .and(
    z
      .object({
        c_symb_c_date: z.lazy(() => StockQuotesDailyC_symbC_dateCompoundUniqueInputSchema).optional(),
        AND: z
          .union([z.lazy(() => StockQuotesDailyWhereInputSchema), z.lazy(() => StockQuotesDailyWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => StockQuotesDailyWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => StockQuotesDailyWhereInputSchema), z.lazy(() => StockQuotesDailyWhereInputSchema).array()])
          .optional(),
        c_date: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        c_symb: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        c_open: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional(),
        c_high: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional(),
        c_low: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional(),
        c_close: z
          .union([
            z.lazy(() => DecimalFilterSchema),
            z
              .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
              .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          ])
          .optional(),
        c_vol: z.union([z.lazy(() => BigIntFilterSchema), z.bigint()]).optional(),
      })
      .strict(),
  )

export const StockQuotesDailyOrderByWithAggregationInputSchema: z.ZodType<Prisma.StockQuotesDailyOrderByWithAggregationInput> =
  z
    .object({
      c_date: z.lazy(() => SortOrderSchema).optional(),
      c_symb: z.lazy(() => SortOrderSchema).optional(),
      c_open: z.lazy(() => SortOrderSchema).optional(),
      c_high: z.lazy(() => SortOrderSchema).optional(),
      c_low: z.lazy(() => SortOrderSchema).optional(),
      c_close: z.lazy(() => SortOrderSchema).optional(),
      c_vol: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => StockQuotesDailyCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => StockQuotesDailyAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => StockQuotesDailyMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => StockQuotesDailyMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => StockQuotesDailySumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const StockQuotesDailyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StockQuotesDailyScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => StockQuotesDailyScalarWhereWithAggregatesInputSchema),
          z.lazy(() => StockQuotesDailyScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => StockQuotesDailyScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => StockQuotesDailyScalarWhereWithAggregatesInputSchema),
          z.lazy(() => StockQuotesDailyScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      c_date: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
      c_symb: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      c_open: z
        .union([
          z.lazy(() => DecimalWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional(),
      c_high: z
        .union([
          z.lazy(() => DecimalWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional(),
      c_low: z
        .union([
          z.lazy(() => DecimalWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional(),
      c_close: z
        .union([
          z.lazy(() => DecimalWithAggregatesFilterSchema),
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        ])
        .optional(),
      c_vol: z.union([z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint()]).optional(),
    })
    .strict()

export const TimeSeriesDatapointWhereInputSchema: z.ZodType<Prisma.TimeSeriesDatapointWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => TimeSeriesDatapointWhereInputSchema), z.lazy(() => TimeSeriesDatapointWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => TimeSeriesDatapointWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => TimeSeriesDatapointWhereInputSchema), z.lazy(() => TimeSeriesDatapointWhereInputSchema).array()])
      .optional(),
    dp_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    dp_series_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    dp_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    dp_value: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    dp_comment: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    timeseries_series: z
      .union([z.lazy(() => TimeSeriesSeriesScalarRelationFilterSchema), z.lazy(() => TimeSeriesSeriesWhereInputSchema)])
      .optional(),
  })
  .strict()

export const TimeSeriesDatapointOrderByWithRelationInputSchema: z.ZodType<Prisma.TimeSeriesDatapointOrderByWithRelationInput> =
  z
    .object({
      dp_id: z.lazy(() => SortOrderSchema).optional(),
      dp_series_id: z.lazy(() => SortOrderSchema).optional(),
      dp_date: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      dp_value: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      dp_comment: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      timeseries_series: z.lazy(() => TimeSeriesSeriesOrderByWithRelationInputSchema).optional(),
      _relevance: z.lazy(() => TimeSeriesDatapointOrderByRelevanceInputSchema).optional(),
    })
    .strict()

export const TimeSeriesDatapointWhereUniqueInputSchema: z.ZodType<Prisma.TimeSeriesDatapointWhereUniqueInput> = z
  .object({
    dp_id: z.number().int(),
  })
  .and(
    z
      .object({
        dp_id: z.number().int().optional(),
        AND: z
          .union([
            z.lazy(() => TimeSeriesDatapointWhereInputSchema),
            z.lazy(() => TimeSeriesDatapointWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => TimeSeriesDatapointWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => TimeSeriesDatapointWhereInputSchema),
            z.lazy(() => TimeSeriesDatapointWhereInputSchema).array(),
          ])
          .optional(),
        dp_series_id: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        dp_date: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        dp_value: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        dp_comment: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        timeseries_series: z
          .union([z.lazy(() => TimeSeriesSeriesScalarRelationFilterSchema), z.lazy(() => TimeSeriesSeriesWhereInputSchema)])
          .optional(),
      })
      .strict(),
  )

export const TimeSeriesDatapointOrderByWithAggregationInputSchema: z.ZodType<Prisma.TimeSeriesDatapointOrderByWithAggregationInput> =
  z
    .object({
      dp_id: z.lazy(() => SortOrderSchema).optional(),
      dp_series_id: z.lazy(() => SortOrderSchema).optional(),
      dp_date: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      dp_value: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      dp_comment: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      _count: z.lazy(() => TimeSeriesDatapointCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => TimeSeriesDatapointAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => TimeSeriesDatapointMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => TimeSeriesDatapointMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => TimeSeriesDatapointSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const TimeSeriesDatapointScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TimeSeriesDatapointScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TimeSeriesDatapointScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TimeSeriesDatapointScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TimeSeriesDatapointScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TimeSeriesDatapointScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TimeSeriesDatapointScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      dp_id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      dp_series_id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      dp_date: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      dp_value: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      dp_comment: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict()

export const TimeSeriesDocumentWhereInputSchema: z.ZodType<Prisma.TimeSeriesDocumentWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => TimeSeriesDocumentWhereInputSchema), z.lazy(() => TimeSeriesDocumentWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => TimeSeriesDocumentWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => TimeSeriesDocumentWhereInputSchema), z.lazy(() => TimeSeriesDocumentWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    uid: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    timeseries_series: z.lazy(() => TimeSeriesSeriesListRelationFilterSchema).optional(),
  })
  .strict()

export const TimeSeriesDocumentOrderByWithRelationInputSchema: z.ZodType<Prisma.TimeSeriesDocumentOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      uid: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      timeseries_series: z.lazy(() => TimeSeriesSeriesOrderByRelationAggregateInputSchema).optional(),
      _relevance: z.lazy(() => TimeSeriesDocumentOrderByRelevanceInputSchema).optional(),
    })
    .strict()

export const TimeSeriesDocumentWhereUniqueInputSchema: z.ZodType<Prisma.TimeSeriesDocumentWhereUniqueInput> = z
  .object({
    id: z.number().int(),
  })
  .and(
    z
      .object({
        id: z.number().int().optional(),
        AND: z
          .union([
            z.lazy(() => TimeSeriesDocumentWhereInputSchema),
            z.lazy(() => TimeSeriesDocumentWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => TimeSeriesDocumentWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => TimeSeriesDocumentWhereInputSchema),
            z.lazy(() => TimeSeriesDocumentWhereInputSchema).array(),
          ])
          .optional(),
        uid: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        timeseries_series: z.lazy(() => TimeSeriesSeriesListRelationFilterSchema).optional(),
      })
      .strict(),
  )

export const TimeSeriesDocumentOrderByWithAggregationInputSchema: z.ZodType<Prisma.TimeSeriesDocumentOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      uid: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => TimeSeriesDocumentCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => TimeSeriesDocumentAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => TimeSeriesDocumentMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => TimeSeriesDocumentMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => TimeSeriesDocumentSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const TimeSeriesDocumentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TimeSeriesDocumentScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TimeSeriesDocumentScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TimeSeriesDocumentScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TimeSeriesDocumentScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TimeSeriesDocumentScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TimeSeriesDocumentScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      uid: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    })
    .strict()

export const TimeSeriesSeriesWhereInputSchema: z.ZodType<Prisma.TimeSeriesSeriesWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => TimeSeriesSeriesWhereInputSchema), z.lazy(() => TimeSeriesSeriesWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => TimeSeriesSeriesWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => TimeSeriesSeriesWhereInputSchema), z.lazy(() => TimeSeriesSeriesWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    document_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    series_name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    timeseries_datapoint: z.lazy(() => TimeSeriesDatapointListRelationFilterSchema).optional(),
    timeseries_documents: z
      .union([z.lazy(() => TimeSeriesDocumentScalarRelationFilterSchema), z.lazy(() => TimeSeriesDocumentWhereInputSchema)])
      .optional(),
  })
  .strict()

export const TimeSeriesSeriesOrderByWithRelationInputSchema: z.ZodType<Prisma.TimeSeriesSeriesOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    document_id: z.lazy(() => SortOrderSchema).optional(),
    series_name: z.lazy(() => SortOrderSchema).optional(),
    timeseries_datapoint: z.lazy(() => TimeSeriesDatapointOrderByRelationAggregateInputSchema).optional(),
    timeseries_documents: z.lazy(() => TimeSeriesDocumentOrderByWithRelationInputSchema).optional(),
    _relevance: z.lazy(() => TimeSeriesSeriesOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const TimeSeriesSeriesWhereUniqueInputSchema: z.ZodType<Prisma.TimeSeriesSeriesWhereUniqueInput> = z
  .object({
    id: z.number().int(),
  })
  .and(
    z
      .object({
        id: z.number().int().optional(),
        AND: z
          .union([z.lazy(() => TimeSeriesSeriesWhereInputSchema), z.lazy(() => TimeSeriesSeriesWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => TimeSeriesSeriesWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => TimeSeriesSeriesWhereInputSchema), z.lazy(() => TimeSeriesSeriesWhereInputSchema).array()])
          .optional(),
        document_id: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        series_name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        timeseries_datapoint: z.lazy(() => TimeSeriesDatapointListRelationFilterSchema).optional(),
        timeseries_documents: z
          .union([
            z.lazy(() => TimeSeriesDocumentScalarRelationFilterSchema),
            z.lazy(() => TimeSeriesDocumentWhereInputSchema),
          ])
          .optional(),
      })
      .strict(),
  )

export const TimeSeriesSeriesOrderByWithAggregationInputSchema: z.ZodType<Prisma.TimeSeriesSeriesOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      document_id: z.lazy(() => SortOrderSchema).optional(),
      series_name: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => TimeSeriesSeriesCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => TimeSeriesSeriesAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => TimeSeriesSeriesMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => TimeSeriesSeriesMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => TimeSeriesSeriesSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const TimeSeriesSeriesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TimeSeriesSeriesScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TimeSeriesSeriesScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TimeSeriesSeriesScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TimeSeriesSeriesScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TimeSeriesSeriesScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TimeSeriesSeriesScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      document_id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      series_name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    })
    .strict()

export const UsersLegacyWhereInputSchema: z.ZodType<Prisma.UsersLegacyWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => UsersLegacyWhereInputSchema), z.lazy(() => UsersLegacyWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => UsersLegacyWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => UsersLegacyWhereInputSchema), z.lazy(() => UsersLegacyWhereInputSchema).array()]).optional(),
    uid: z.union([z.lazy(() => BigIntFilterSchema), z.bigint()]).optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    pw: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    salt: z.union([z.lazy(() => BigIntFilterSchema), z.bigint()]).optional(),
    alias: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    ax_maxmin: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    ax_homes: z
      .union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
      .optional()
      .nullable(),
    ax_tax: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    ax_evdb: z
      .union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
      .optional()
      .nullable(),
    ax_spgp: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    ax_phr: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    reset_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    reset_requested_at: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    passkey_credential_id: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    passkey_public_key: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict()

export const UsersLegacyOrderByWithRelationInputSchema: z.ZodType<Prisma.UsersLegacyOrderByWithRelationInput> = z
  .object({
    uid: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    pw: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    salt: z.lazy(() => SortOrderSchema).optional(),
    alias: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ax_maxmin: z.lazy(() => SortOrderSchema).optional(),
    ax_homes: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ax_tax: z.lazy(() => SortOrderSchema).optional(),
    ax_evdb: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ax_spgp: z.lazy(() => SortOrderSchema).optional(),
    ax_phr: z.lazy(() => SortOrderSchema).optional(),
    reset_token: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    reset_requested_at: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    passkey_credential_id: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    passkey_public_key: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _relevance: z.lazy(() => UsersLegacyOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const UsersLegacyWhereUniqueInputSchema: z.ZodType<Prisma.UsersLegacyWhereUniqueInput> = z
  .union([
    z.object({
      uid: z.bigint(),
      email: z.string(),
    }),
    z.object({
      uid: z.bigint(),
    }),
    z.object({
      email: z.string(),
    }),
  ])
  .and(
    z
      .object({
        uid: z.bigint().optional(),
        email: z.string().optional(),
        AND: z
          .union([z.lazy(() => UsersLegacyWhereInputSchema), z.lazy(() => UsersLegacyWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => UsersLegacyWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => UsersLegacyWhereInputSchema), z.lazy(() => UsersLegacyWhereInputSchema).array()])
          .optional(),
        pw: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        salt: z.union([z.lazy(() => BigIntFilterSchema), z.bigint()]).optional(),
        alias: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        ax_maxmin: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
        ax_homes: z
          .union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
          .optional()
          .nullable(),
        ax_tax: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
        ax_evdb: z
          .union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
          .optional()
          .nullable(),
        ax_spgp: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
        ax_phr: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        reset_token: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        reset_requested_at: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        passkey_credential_id: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        passkey_public_key: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
      })
      .strict(),
  )

export const UsersLegacyOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsersLegacyOrderByWithAggregationInput> = z
  .object({
    uid: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    pw: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    salt: z.lazy(() => SortOrderSchema).optional(),
    alias: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ax_maxmin: z.lazy(() => SortOrderSchema).optional(),
    ax_homes: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ax_tax: z.lazy(() => SortOrderSchema).optional(),
    ax_evdb: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    ax_spgp: z.lazy(() => SortOrderSchema).optional(),
    ax_phr: z.lazy(() => SortOrderSchema).optional(),
    reset_token: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    reset_requested_at: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    passkey_credential_id: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    passkey_public_key: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => UsersLegacyCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => UsersLegacyAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => UsersLegacyMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => UsersLegacyMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => UsersLegacySumOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const UsersLegacyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsersLegacyScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UsersLegacyScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UsersLegacyScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UsersLegacyScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UsersLegacyScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UsersLegacyScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      uid: z.union([z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint()]).optional(),
      email: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      pw: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      salt: z.union([z.lazy(() => BigIntWithAggregatesFilterSchema), z.bigint()]).optional(),
      alias: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      ax_maxmin: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
      ax_homes: z
        .union([z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean()])
        .optional()
        .nullable(),
      ax_tax: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
      ax_evdb: z
        .union([z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean()])
        .optional()
        .nullable(),
      ax_spgp: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
      ax_phr: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      reset_token: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      reset_requested_at: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      passkey_credential_id: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
      passkey_public_key: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict()

export const VXCVFilesWhereInputSchema: z.ZodType<Prisma.VXCVFilesWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => VXCVFilesWhereInputSchema), z.lazy(() => VXCVFilesWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => VXCVFilesWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => VXCVFilesWhereInputSchema), z.lazy(() => VXCVFilesWhereInputSchema).array()]).optional(),
    hash: z.union([z.lazy(() => BytesFilterSchema), z.instanceof(Buffer)]).optional(),
    filename: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    mime: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    downloads: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    max_downloads: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    size: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    uploaded: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    blocked: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    ip: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  })
  .strict()

export const VXCVFilesOrderByWithRelationInputSchema: z.ZodType<Prisma.VXCVFilesOrderByWithRelationInput> = z
  .object({
    hash: z.lazy(() => SortOrderSchema).optional(),
    filename: z.lazy(() => SortOrderSchema).optional(),
    mime: z.lazy(() => SortOrderSchema).optional(),
    downloads: z.lazy(() => SortOrderSchema).optional(),
    max_downloads: z.lazy(() => SortOrderSchema).optional(),
    size: z.lazy(() => SortOrderSchema).optional(),
    uploaded: z.lazy(() => SortOrderSchema).optional(),
    blocked: z.lazy(() => SortOrderSchema).optional(),
    ip: z.lazy(() => SortOrderSchema).optional(),
    _relevance: z.lazy(() => VXCVFilesOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const VXCVFilesWhereUniqueInputSchema: z.ZodType<Prisma.VXCVFilesWhereUniqueInput> = z
  .object({
    hash: z.instanceof(Buffer),
  })
  .and(
    z
      .object({
        hash: z.instanceof(Buffer).optional(),
        AND: z.union([z.lazy(() => VXCVFilesWhereInputSchema), z.lazy(() => VXCVFilesWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => VXCVFilesWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => VXCVFilesWhereInputSchema), z.lazy(() => VXCVFilesWhereInputSchema).array()]).optional(),
        filename: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        mime: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        downloads: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        max_downloads: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        size: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        uploaded: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        blocked: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        ip: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
      })
      .strict(),
  )

export const VXCVFilesOrderByWithAggregationInputSchema: z.ZodType<Prisma.VXCVFilesOrderByWithAggregationInput> = z
  .object({
    hash: z.lazy(() => SortOrderSchema).optional(),
    filename: z.lazy(() => SortOrderSchema).optional(),
    mime: z.lazy(() => SortOrderSchema).optional(),
    downloads: z.lazy(() => SortOrderSchema).optional(),
    max_downloads: z.lazy(() => SortOrderSchema).optional(),
    size: z.lazy(() => SortOrderSchema).optional(),
    uploaded: z.lazy(() => SortOrderSchema).optional(),
    blocked: z.lazy(() => SortOrderSchema).optional(),
    ip: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => VXCVFilesCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => VXCVFilesAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => VXCVFilesMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => VXCVFilesMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => VXCVFilesSumOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const VXCVFilesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VXCVFilesScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => VXCVFilesScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VXCVFilesScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VXCVFilesScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VXCVFilesScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VXCVFilesScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    hash: z.union([z.lazy(() => BytesWithAggregatesFilterSchema), z.instanceof(Buffer)]).optional(),
    filename: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    mime: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    downloads: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
    max_downloads: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
    size: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
    uploaded: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    blocked: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
    ip: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  })
  .strict()

export const VXCVLinksWhereInputSchema: z.ZodType<Prisma.VXCVLinksWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => VXCVLinksWhereInputSchema), z.lazy(() => VXCVLinksWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => VXCVLinksWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => VXCVLinksWhereInputSchema), z.lazy(() => VXCVLinksWhereInputSchema).array()]).optional(),
    uniqueid: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    url: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  })
  .strict()

export const VXCVLinksOrderByWithRelationInputSchema: z.ZodType<Prisma.VXCVLinksOrderByWithRelationInput> = z
  .object({
    uniqueid: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
    _relevance: z.lazy(() => VXCVLinksOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const VXCVLinksWhereUniqueInputSchema: z.ZodType<Prisma.VXCVLinksWhereUniqueInput> = z
  .object({
    uniqueid: z.string(),
  })
  .and(
    z
      .object({
        uniqueid: z.string().optional(),
        AND: z.union([z.lazy(() => VXCVLinksWhereInputSchema), z.lazy(() => VXCVLinksWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => VXCVLinksWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => VXCVLinksWhereInputSchema), z.lazy(() => VXCVLinksWhereInputSchema).array()]).optional(),
        url: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      })
      .strict(),
  )

export const VXCVLinksOrderByWithAggregationInputSchema: z.ZodType<Prisma.VXCVLinksOrderByWithAggregationInput> = z
  .object({
    uniqueid: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => VXCVLinksCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => VXCVLinksMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => VXCVLinksMinOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const VXCVLinksScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VXCVLinksScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => VXCVLinksScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VXCVLinksScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VXCVLinksScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VXCVLinksScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VXCVLinksScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    uniqueid: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    url: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  })
  .strict()

export const AccountLineItemTagWhereInputSchema: z.ZodType<Prisma.AccountLineItemTagWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => AccountLineItemTagWhereInputSchema), z.lazy(() => AccountLineItemTagWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => AccountLineItemTagWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => AccountLineItemTagWhereInputSchema), z.lazy(() => AccountLineItemTagWhereInputSchema).array()])
      .optional(),
    tag_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    tag_userid: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    tag_color: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    tag_label: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  })
  .strict()

export const AccountLineItemTagOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountLineItemTagOrderByWithRelationInput> =
  z
    .object({
      tag_id: z.lazy(() => SortOrderSchema).optional(),
      tag_userid: z.lazy(() => SortOrderSchema).optional(),
      tag_color: z.lazy(() => SortOrderSchema).optional(),
      tag_label: z.lazy(() => SortOrderSchema).optional(),
      _relevance: z.lazy(() => AccountLineItemTagOrderByRelevanceInputSchema).optional(),
    })
    .strict()

export const AccountLineItemTagWhereUniqueInputSchema: z.ZodType<Prisma.AccountLineItemTagWhereUniqueInput> = z
  .union([
    z.object({
      tag_id: z.number().int(),
      tag_userid_tag_label: z.lazy(() => AccountLineItemTagTag_useridTag_labelCompoundUniqueInputSchema),
    }),
    z.object({
      tag_id: z.number().int(),
    }),
    z.object({
      tag_userid_tag_label: z.lazy(() => AccountLineItemTagTag_useridTag_labelCompoundUniqueInputSchema),
    }),
  ])
  .and(
    z
      .object({
        tag_id: z.number().int().optional(),
        tag_userid_tag_label: z.lazy(() => AccountLineItemTagTag_useridTag_labelCompoundUniqueInputSchema).optional(),
        AND: z
          .union([
            z.lazy(() => AccountLineItemTagWhereInputSchema),
            z.lazy(() => AccountLineItemTagWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => AccountLineItemTagWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => AccountLineItemTagWhereInputSchema),
            z.lazy(() => AccountLineItemTagWhereInputSchema).array(),
          ])
          .optional(),
        tag_userid: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        tag_color: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        tag_label: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      })
      .strict(),
  )

export const AccountLineItemTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountLineItemTagOrderByWithAggregationInput> =
  z
    .object({
      tag_id: z.lazy(() => SortOrderSchema).optional(),
      tag_userid: z.lazy(() => SortOrderSchema).optional(),
      tag_color: z.lazy(() => SortOrderSchema).optional(),
      tag_label: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => AccountLineItemTagCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => AccountLineItemTagAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => AccountLineItemTagMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => AccountLineItemTagMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => AccountLineItemTagSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const AccountLineItemTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountLineItemTagScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AccountLineItemTagScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AccountLineItemTagScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AccountLineItemTagScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AccountLineItemTagScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AccountLineItemTagScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      tag_id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      tag_userid: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      tag_color: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      tag_label: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    })
    .strict()

export const FinAccountTagWhereInputSchema: z.ZodType<Prisma.FinAccountTagWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => FinAccountTagWhereInputSchema), z.lazy(() => FinAccountTagWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => FinAccountTagWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => FinAccountTagWhereInputSchema), z.lazy(() => FinAccountTagWhereInputSchema).array()])
      .optional(),
    tag_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    tag_userid: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    tag_color: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    tag_label: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    when_added: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    when_deleted: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    FinAccountLineItemTagMap: z.lazy(() => FinAccountLineItemTagMapListRelationFilterSchema).optional(),
  })
  .strict()

export const FinAccountTagOrderByWithRelationInputSchema: z.ZodType<Prisma.FinAccountTagOrderByWithRelationInput> = z
  .object({
    tag_id: z.lazy(() => SortOrderSchema).optional(),
    tag_userid: z.lazy(() => SortOrderSchema).optional(),
    tag_color: z.lazy(() => SortOrderSchema).optional(),
    tag_label: z.lazy(() => SortOrderSchema).optional(),
    when_added: z.lazy(() => SortOrderSchema).optional(),
    when_deleted: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    FinAccountLineItemTagMap: z.lazy(() => FinAccountLineItemTagMapOrderByRelationAggregateInputSchema).optional(),
    _relevance: z.lazy(() => FinAccountTagOrderByRelevanceInputSchema).optional(),
  })
  .strict()

export const FinAccountTagWhereUniqueInputSchema: z.ZodType<Prisma.FinAccountTagWhereUniqueInput> = z
  .union([
    z.object({
      tag_id: z.number().int(),
      tag_userid_tag_label: z.lazy(() => FinAccountTagTag_useridTag_labelCompoundUniqueInputSchema),
    }),
    z.object({
      tag_id: z.number().int(),
    }),
    z.object({
      tag_userid_tag_label: z.lazy(() => FinAccountTagTag_useridTag_labelCompoundUniqueInputSchema),
    }),
  ])
  .and(
    z
      .object({
        tag_id: z.number().int().optional(),
        tag_userid_tag_label: z.lazy(() => FinAccountTagTag_useridTag_labelCompoundUniqueInputSchema).optional(),
        AND: z
          .union([z.lazy(() => FinAccountTagWhereInputSchema), z.lazy(() => FinAccountTagWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => FinAccountTagWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => FinAccountTagWhereInputSchema), z.lazy(() => FinAccountTagWhereInputSchema).array()])
          .optional(),
        tag_userid: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        tag_color: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        tag_label: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        when_added: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        when_deleted: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        FinAccountLineItemTagMap: z.lazy(() => FinAccountLineItemTagMapListRelationFilterSchema).optional(),
      })
      .strict(),
  )

export const FinAccountTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.FinAccountTagOrderByWithAggregationInput> = z
  .object({
    tag_id: z.lazy(() => SortOrderSchema).optional(),
    tag_userid: z.lazy(() => SortOrderSchema).optional(),
    tag_color: z.lazy(() => SortOrderSchema).optional(),
    tag_label: z.lazy(() => SortOrderSchema).optional(),
    when_added: z.lazy(() => SortOrderSchema).optional(),
    when_deleted: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => FinAccountTagCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => FinAccountTagAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => FinAccountTagMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => FinAccountTagMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => FinAccountTagSumOrderByAggregateInputSchema).optional(),
  })
  .strict()

export const FinAccountTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FinAccountTagScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => FinAccountTagScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinAccountTagScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => FinAccountTagScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => FinAccountTagScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinAccountTagScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      tag_id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      tag_userid: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      tag_color: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      tag_label: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      when_added: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
      when_deleted: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
    })
    .strict()

export const FinAccountLineItemTagMapWhereInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => FinAccountLineItemTagMapWhereInputSchema),
        z.lazy(() => FinAccountLineItemTagMapWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => FinAccountLineItemTagMapWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => FinAccountLineItemTagMapWhereInputSchema),
        z.lazy(() => FinAccountLineItemTagMapWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    when_added: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    when_deleted: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    t_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    tag_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    transaction: z
      .union([
        z.lazy(() => FinAccountLineItemsScalarRelationFilterSchema),
        z.lazy(() => FinAccountLineItemsWhereInputSchema),
      ])
      .optional(),
    tag: z
      .union([z.lazy(() => FinAccountTagScalarRelationFilterSchema), z.lazy(() => FinAccountTagWhereInputSchema)])
      .optional(),
  })
  .strict()

export const FinAccountLineItemTagMapOrderByWithRelationInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      when_added: z.lazy(() => SortOrderSchema).optional(),
      when_deleted: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_id: z.lazy(() => SortOrderSchema).optional(),
      tag_id: z.lazy(() => SortOrderSchema).optional(),
      transaction: z.lazy(() => FinAccountLineItemsOrderByWithRelationInputSchema).optional(),
      tag: z.lazy(() => FinAccountTagOrderByWithRelationInputSchema).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapWhereUniqueInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapWhereUniqueInput> = z
  .union([
    z.object({
      id: z.number().int(),
      t_id_tag_id: z.lazy(() => FinAccountLineItemTagMapT_idTag_idCompoundUniqueInputSchema),
    }),
    z.object({
      id: z.number().int(),
    }),
    z.object({
      t_id_tag_id: z.lazy(() => FinAccountLineItemTagMapT_idTag_idCompoundUniqueInputSchema),
    }),
  ])
  .and(
    z
      .object({
        id: z.number().int().optional(),
        t_id_tag_id: z.lazy(() => FinAccountLineItemTagMapT_idTag_idCompoundUniqueInputSchema).optional(),
        AND: z
          .union([
            z.lazy(() => FinAccountLineItemTagMapWhereInputSchema),
            z.lazy(() => FinAccountLineItemTagMapWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => FinAccountLineItemTagMapWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => FinAccountLineItemTagMapWhereInputSchema),
            z.lazy(() => FinAccountLineItemTagMapWhereInputSchema).array(),
          ])
          .optional(),
        when_added: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        when_deleted: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        t_id: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        tag_id: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        transaction: z
          .union([
            z.lazy(() => FinAccountLineItemsScalarRelationFilterSchema),
            z.lazy(() => FinAccountLineItemsWhereInputSchema),
          ])
          .optional(),
        tag: z
          .union([z.lazy(() => FinAccountTagScalarRelationFilterSchema), z.lazy(() => FinAccountTagWhereInputSchema)])
          .optional(),
      })
      .strict(),
  )

export const FinAccountLineItemTagMapOrderByWithAggregationInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      when_added: z.lazy(() => SortOrderSchema).optional(),
      when_deleted: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
      t_id: z.lazy(() => SortOrderSchema).optional(),
      tag_id: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => FinAccountLineItemTagMapCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => FinAccountLineItemTagMapAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => FinAccountLineItemTagMapMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => FinAccountLineItemTagMapMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => FinAccountLineItemTagMapSumOrderByAggregateInputSchema).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinAccountLineItemTagMapScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => FinAccountLineItemTagMapScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapScalarWhereWithAggregatesInputSchema),
          z.lazy(() => FinAccountLineItemTagMapScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      when_added: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
      when_deleted: z
        .union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      t_id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      tag_id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
    })
    .strict()

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    twoFactorEnabled: z.boolean().optional().nullable(),
    username: z.string().optional().nullable(),
    inviteCode: z.string().optional().nullable(),
    accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
    sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
    twofactors: z.lazy(() => TwoFactorCreateNestedManyWithoutUserInputSchema).optional(),
  })
  .strict()

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    twoFactorEnabled: z.boolean().optional().nullable(),
    username: z.string().optional().nullable(),
    inviteCode: z.string().optional().nullable(),
    accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    twofactors: z.lazy(() => TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  })
  .strict()

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    emailVerified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    image: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    twoFactorEnabled: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    username: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    inviteCode: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
    sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
    twofactors: z.lazy(() => TwoFactorUpdateManyWithoutUserNestedInputSchema).optional(),
  })
  .strict()

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    emailVerified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    image: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    twoFactorEnabled: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    username: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    inviteCode: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    twofactors: z.lazy(() => TwoFactorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  })
  .strict()

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    twoFactorEnabled: z.boolean().optional().nullable(),
    username: z.string().optional().nullable(),
    inviteCode: z.string().optional().nullable(),
  })
  .strict()

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    emailVerified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    image: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    twoFactorEnabled: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    username: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    inviteCode: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    emailVerified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    image: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    twoFactorEnabled: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    username: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    inviteCode: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z
  .object({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
  })
  .strict()

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z
  .object({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    userId: z.string(),
  })
  .strict()

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    ipAddress: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    userAgent: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional(),
  })
  .strict()

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    ipAddress: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    userAgent: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z
  .object({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    userId: z.string(),
  })
  .strict()

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    ipAddress: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    userAgent: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    ipAddress: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    userAgent: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z
  .object({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema),
  })
  .strict()

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z
  .object({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    userId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
  .strict()

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    accountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    providerId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    accessToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    refreshToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    idToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    scope: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    password: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional(),
  })
  .strict()

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    accountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    providerId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    accessToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    refreshToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    idToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    scope: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    password: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z
  .object({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    userId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
  .strict()

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    accountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    providerId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    accessToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    refreshToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    idToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    scope: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    password: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    accountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    providerId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    accessToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    refreshToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    idToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    scope: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    password: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const VerificationCreateInputSchema: z.ZodType<Prisma.VerificationCreateInput> = z
  .object({
    id: z.string(),
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.coerce.date(),
    createdAt: z.coerce.date().optional().nullable(),
    updatedAt: z.coerce.date().optional().nullable(),
  })
  .strict()

export const VerificationUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationUncheckedCreateInput> = z
  .object({
    id: z.string(),
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.coerce.date(),
    createdAt: z.coerce.date().optional().nullable(),
    updatedAt: z.coerce.date().optional().nullable(),
  })
  .strict()

export const VerificationUpdateInputSchema: z.ZodType<Prisma.VerificationUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    value: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    updatedAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const VerificationUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    value: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    updatedAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const VerificationCreateManyInputSchema: z.ZodType<Prisma.VerificationCreateManyInput> = z
  .object({
    id: z.string(),
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.coerce.date(),
    createdAt: z.coerce.date().optional().nullable(),
    updatedAt: z.coerce.date().optional().nullable(),
  })
  .strict()

export const VerificationUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    value: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    updatedAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const VerificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    value: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    updatedAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const TwoFactorCreateInputSchema: z.ZodType<Prisma.TwoFactorCreateInput> = z
  .object({
    id: z.string(),
    secret: z.string(),
    backupCodes: z.string(),
    user: z.lazy(() => UserCreateNestedOneWithoutTwofactorsInputSchema),
  })
  .strict()

export const TwoFactorUncheckedCreateInputSchema: z.ZodType<Prisma.TwoFactorUncheckedCreateInput> = z
  .object({
    id: z.string(),
    secret: z.string(),
    backupCodes: z.string(),
    userId: z.string(),
  })
  .strict()

export const TwoFactorUpdateInputSchema: z.ZodType<Prisma.TwoFactorUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    secret: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    backupCodes: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    user: z.lazy(() => UserUpdateOneRequiredWithoutTwofactorsNestedInputSchema).optional(),
  })
  .strict()

export const TwoFactorUncheckedUpdateInputSchema: z.ZodType<Prisma.TwoFactorUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    secret: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    backupCodes: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const TwoFactorCreateManyInputSchema: z.ZodType<Prisma.TwoFactorCreateManyInput> = z
  .object({
    id: z.string(),
    secret: z.string(),
    backupCodes: z.string(),
    userId: z.string(),
  })
  .strict()

export const TwoFactorUpdateManyMutationInputSchema: z.ZodType<Prisma.TwoFactorUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    secret: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    backupCodes: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const TwoFactorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TwoFactorUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    secret: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    backupCodes: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const PhrLabResultCreateInputSchema: z.ZodType<Prisma.PhrLabResultCreateInput> = z
  .object({
    userId: z.string().optional().nullable(),
    testName: z.string().optional().nullable(),
    collectionDatetime: z.coerce.date().optional().nullable(),
    resultDatetime: z.coerce.date().optional().nullable(),
    resultStatus: z.string().optional().nullable(),
    orderingProvider: z.string().optional().nullable(),
    resultingLab: z.string().optional().nullable(),
    analyte: z.string().optional().nullable(),
    value: z.string().optional().nullable(),
    unit: z.string().optional().nullable(),
    rangeMin: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    rangeMax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    rangeUnit: z.string().optional().nullable(),
    normalValue: z.string().optional().nullable(),
    messageFromProvider: z.string().optional().nullable(),
    resultComment: z.string().optional().nullable(),
    labDirector: z.string().optional().nullable(),
  })
  .strict()

export const PhrLabResultUncheckedCreateInputSchema: z.ZodType<Prisma.PhrLabResultUncheckedCreateInput> = z
  .object({
    id: z.number().int().optional(),
    userId: z.string().optional().nullable(),
    testName: z.string().optional().nullable(),
    collectionDatetime: z.coerce.date().optional().nullable(),
    resultDatetime: z.coerce.date().optional().nullable(),
    resultStatus: z.string().optional().nullable(),
    orderingProvider: z.string().optional().nullable(),
    resultingLab: z.string().optional().nullable(),
    analyte: z.string().optional().nullable(),
    value: z.string().optional().nullable(),
    unit: z.string().optional().nullable(),
    rangeMin: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    rangeMax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    rangeUnit: z.string().optional().nullable(),
    normalValue: z.string().optional().nullable(),
    messageFromProvider: z.string().optional().nullable(),
    resultComment: z.string().optional().nullable(),
    labDirector: z.string().optional().nullable(),
  })
  .strict()

export const PhrLabResultUpdateInputSchema: z.ZodType<Prisma.PhrLabResultUpdateInput> = z
  .object({
    userId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    testName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    collectionDatetime: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultDatetime: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultStatus: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    orderingProvider: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultingLab: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    analyte: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    value: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    unit: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    rangeMin: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rangeMax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rangeUnit: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    normalValue: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    messageFromProvider: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultComment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    labDirector: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const PhrLabResultUncheckedUpdateInputSchema: z.ZodType<Prisma.PhrLabResultUncheckedUpdateInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    userId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    testName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    collectionDatetime: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultDatetime: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultStatus: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    orderingProvider: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultingLab: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    analyte: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    value: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    unit: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    rangeMin: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rangeMax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rangeUnit: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    normalValue: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    messageFromProvider: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultComment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    labDirector: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const PhrLabResultCreateManyInputSchema: z.ZodType<Prisma.PhrLabResultCreateManyInput> = z
  .object({
    id: z.number().int().optional(),
    userId: z.string().optional().nullable(),
    testName: z.string().optional().nullable(),
    collectionDatetime: z.coerce.date().optional().nullable(),
    resultDatetime: z.coerce.date().optional().nullable(),
    resultStatus: z.string().optional().nullable(),
    orderingProvider: z.string().optional().nullable(),
    resultingLab: z.string().optional().nullable(),
    analyte: z.string().optional().nullable(),
    value: z.string().optional().nullable(),
    unit: z.string().optional().nullable(),
    rangeMin: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    rangeMax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    rangeUnit: z.string().optional().nullable(),
    normalValue: z.string().optional().nullable(),
    messageFromProvider: z.string().optional().nullable(),
    resultComment: z.string().optional().nullable(),
    labDirector: z.string().optional().nullable(),
  })
  .strict()

export const PhrLabResultUpdateManyMutationInputSchema: z.ZodType<Prisma.PhrLabResultUpdateManyMutationInput> = z
  .object({
    userId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    testName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    collectionDatetime: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultDatetime: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultStatus: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    orderingProvider: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultingLab: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    analyte: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    value: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    unit: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    rangeMin: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rangeMax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rangeUnit: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    normalValue: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    messageFromProvider: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultComment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    labDirector: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const PhrLabResultUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PhrLabResultUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    userId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    testName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    collectionDatetime: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultDatetime: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultStatus: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    orderingProvider: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultingLab: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    analyte: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    value: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    unit: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    rangeMin: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rangeMax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    rangeUnit: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    normalValue: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    messageFromProvider: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    resultComment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    labDirector: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const ProductKeyCreateInputSchema: z.ZodType<Prisma.ProductKeyCreateInput> = z
  .object({
    uid: z.string().optional().nullable(),
    productId: z.string().optional().nullable(),
    productKey: z.string().optional().nullable(),
    productName: z.string().optional().nullable(),
    computerName: z.string().optional().nullable(),
    comment: z.string().optional().nullable(),
    usedOn: z.string().optional().nullable(),
    claimedDate: z.string().optional().nullable(),
    keyType: z.string().optional().nullable(),
    keyRetrievalNote: z.string().optional().nullable(),
  })
  .strict()

export const ProductKeyUncheckedCreateInputSchema: z.ZodType<Prisma.ProductKeyUncheckedCreateInput> = z
  .object({
    id: z.number().int().optional(),
    uid: z.string().optional().nullable(),
    productId: z.string().optional().nullable(),
    productKey: z.string().optional().nullable(),
    productName: z.string().optional().nullable(),
    computerName: z.string().optional().nullable(),
    comment: z.string().optional().nullable(),
    usedOn: z.string().optional().nullable(),
    claimedDate: z.string().optional().nullable(),
    keyType: z.string().optional().nullable(),
    keyRetrievalNote: z.string().optional().nullable(),
  })
  .strict()

export const ProductKeyUpdateInputSchema: z.ZodType<Prisma.ProductKeyUpdateInput> = z
  .object({
    uid: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productKey: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    computerName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    comment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    usedOn: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    claimedDate: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    keyType: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    keyRetrievalNote: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const ProductKeyUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductKeyUncheckedUpdateInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    uid: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productKey: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    computerName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    comment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    usedOn: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    claimedDate: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    keyType: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    keyRetrievalNote: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const ProductKeyCreateManyInputSchema: z.ZodType<Prisma.ProductKeyCreateManyInput> = z
  .object({
    id: z.number().int().optional(),
    uid: z.string().optional().nullable(),
    productId: z.string().optional().nullable(),
    productKey: z.string().optional().nullable(),
    productName: z.string().optional().nullable(),
    computerName: z.string().optional().nullable(),
    comment: z.string().optional().nullable(),
    usedOn: z.string().optional().nullable(),
    claimedDate: z.string().optional().nullable(),
    keyType: z.string().optional().nullable(),
    keyRetrievalNote: z.string().optional().nullable(),
  })
  .strict()

export const ProductKeyUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductKeyUpdateManyMutationInput> = z
  .object({
    uid: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productKey: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    computerName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    comment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    usedOn: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    claimedDate: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    keyType: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    keyRetrievalNote: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const ProductKeyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductKeyUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    uid: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productKey: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    computerName: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    comment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    usedOn: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    claimedDate: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    keyType: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    keyRetrievalNote: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinAccountsCreateInputSchema: z.ZodType<Prisma.FinAccountsCreateInput> = z
  .object({
    acct_owner: z.string(),
    acct_name: z.string(),
    acct_last_balance: z.string().optional(),
    acct_last_balance_date: z.coerce.date().optional().nullable(),
    acct_is_debt: z.boolean().optional(),
    acct_is_retirement: z.boolean().optional(),
    acct_sort_order: z.number().int().optional(),
    when_closed: z.coerce.date().optional().nullable(),
    when_deleted: z.coerce.date().optional().nullable(),
  })
  .strict()

export const FinAccountsUncheckedCreateInputSchema: z.ZodType<Prisma.FinAccountsUncheckedCreateInput> = z
  .object({
    acct_id: z.number().int().optional(),
    acct_owner: z.string(),
    acct_name: z.string(),
    acct_last_balance: z.string().optional(),
    acct_last_balance_date: z.coerce.date().optional().nullable(),
    acct_is_debt: z.boolean().optional(),
    acct_is_retirement: z.boolean().optional(),
    acct_sort_order: z.number().int().optional(),
    when_closed: z.coerce.date().optional().nullable(),
    when_deleted: z.coerce.date().optional().nullable(),
  })
  .strict()

export const FinAccountsUpdateInputSchema: z.ZodType<Prisma.FinAccountsUpdateInput> = z
  .object({
    acct_owner: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    acct_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    acct_last_balance: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    acct_last_balance_date: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    acct_is_debt: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    acct_is_retirement: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    acct_sort_order: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    when_closed: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    when_deleted: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinAccountsUncheckedUpdateInputSchema: z.ZodType<Prisma.FinAccountsUncheckedUpdateInput> = z
  .object({
    acct_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    acct_owner: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    acct_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    acct_last_balance: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    acct_last_balance_date: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    acct_is_debt: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    acct_is_retirement: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    acct_sort_order: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    when_closed: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    when_deleted: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinAccountsCreateManyInputSchema: z.ZodType<Prisma.FinAccountsCreateManyInput> = z
  .object({
    acct_id: z.number().int().optional(),
    acct_owner: z.string(),
    acct_name: z.string(),
    acct_last_balance: z.string().optional(),
    acct_last_balance_date: z.coerce.date().optional().nullable(),
    acct_is_debt: z.boolean().optional(),
    acct_is_retirement: z.boolean().optional(),
    acct_sort_order: z.number().int().optional(),
    when_closed: z.coerce.date().optional().nullable(),
    when_deleted: z.coerce.date().optional().nullable(),
  })
  .strict()

export const FinAccountsUpdateManyMutationInputSchema: z.ZodType<Prisma.FinAccountsUpdateManyMutationInput> = z
  .object({
    acct_owner: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    acct_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    acct_last_balance: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    acct_last_balance_date: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    acct_is_debt: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    acct_is_retirement: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    acct_sort_order: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    when_closed: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    when_deleted: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinAccountsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FinAccountsUncheckedUpdateManyInput> = z
  .object({
    acct_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    acct_owner: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    acct_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    acct_last_balance: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    acct_last_balance_date: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    acct_is_debt: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    acct_is_retirement: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    acct_sort_order: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    when_closed: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    when_deleted: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinAccountLineItemsCreateInputSchema: z.ZodType<Prisma.FinAccountLineItemsCreateInput> = z
  .object({
    t_account: z.number().int().optional().nullable(),
    t_date: z.string(),
    t_date_posted: z.string().optional().nullable(),
    t_type: z.string().optional().nullable(),
    t_schc_category: z.string().optional().nullable(),
    t_amt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_symbol: z.string().optional().nullable(),
    t_qty: z.number().optional(),
    t_price: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_commission: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_fee: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_method: z.string().optional().nullable(),
    t_source: z.string().optional().nullable(),
    t_origin: z.string().optional().nullable(),
    opt_expiration: z.string().optional().nullable(),
    opt_type: z
      .lazy(() => account_line_items_opt_typeSchema)
      .optional()
      .nullable(),
    opt_strike: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_description: z.string().optional().nullable(),
    t_comment: z.string().optional().nullable(),
    t_from: z.string().optional().nullable(),
    t_to: z.string().optional().nullable(),
    t_interest_rate: z.string().optional().nullable(),
    t_cusip: z.string().optional().nullable(),
    t_harvested_amount: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    parent_t_id: z.number().int().optional().nullable(),
    when_added: z.coerce.date().optional().nullable(),
    when_deleted: z.coerce.date().optional().nullable(),
    tags: z.lazy(() => FinAccountLineItemTagMapCreateNestedManyWithoutTransactionInputSchema).optional(),
  })
  .strict()

export const FinAccountLineItemsUncheckedCreateInputSchema: z.ZodType<Prisma.FinAccountLineItemsUncheckedCreateInput> = z
  .object({
    t_id: z.number().int().optional(),
    t_account: z.number().int().optional().nullable(),
    t_date: z.string(),
    t_date_posted: z.string().optional().nullable(),
    t_type: z.string().optional().nullable(),
    t_schc_category: z.string().optional().nullable(),
    t_amt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_symbol: z.string().optional().nullable(),
    t_qty: z.number().optional(),
    t_price: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_commission: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_fee: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_method: z.string().optional().nullable(),
    t_source: z.string().optional().nullable(),
    t_origin: z.string().optional().nullable(),
    opt_expiration: z.string().optional().nullable(),
    opt_type: z
      .lazy(() => account_line_items_opt_typeSchema)
      .optional()
      .nullable(),
    opt_strike: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_description: z.string().optional().nullable(),
    t_comment: z.string().optional().nullable(),
    t_from: z.string().optional().nullable(),
    t_to: z.string().optional().nullable(),
    t_interest_rate: z.string().optional().nullable(),
    t_cusip: z.string().optional().nullable(),
    t_harvested_amount: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    parent_t_id: z.number().int().optional().nullable(),
    when_added: z.coerce.date().optional().nullable(),
    when_deleted: z.coerce.date().optional().nullable(),
    tags: z.lazy(() => FinAccountLineItemTagMapUncheckedCreateNestedManyWithoutTransactionInputSchema).optional(),
  })
  .strict()

export const FinAccountLineItemsUpdateInputSchema: z.ZodType<Prisma.FinAccountLineItemsUpdateInput> = z
  .object({
    t_account: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    t_date_posted: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_type: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_schc_category: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_amt: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    t_symbol: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_qty: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    t_price: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    t_commission: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    t_fee: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    t_method: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_source: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_origin: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    opt_expiration: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    opt_type: z
      .union([
        z.lazy(() => account_line_items_opt_typeSchema),
        z.lazy(() => NullableEnumaccount_line_items_opt_typeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    opt_strike: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    t_description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_comment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_from: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_to: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_interest_rate: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_cusip: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_harvested_amount: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    parent_t_id: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    when_added: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    when_deleted: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    tags: z.lazy(() => FinAccountLineItemTagMapUpdateManyWithoutTransactionNestedInputSchema).optional(),
  })
  .strict()

export const FinAccountLineItemsUncheckedUpdateInputSchema: z.ZodType<Prisma.FinAccountLineItemsUncheckedUpdateInput> = z
  .object({
    t_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    t_account: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    t_date_posted: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_type: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_schc_category: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_amt: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    t_symbol: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_qty: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    t_price: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    t_commission: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    t_fee: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    t_method: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_source: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_origin: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    opt_expiration: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    opt_type: z
      .union([
        z.lazy(() => account_line_items_opt_typeSchema),
        z.lazy(() => NullableEnumaccount_line_items_opt_typeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    opt_strike: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    t_description: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_comment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_from: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_to: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_interest_rate: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_cusip: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    t_harvested_amount: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    parent_t_id: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    when_added: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    when_deleted: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    tags: z.lazy(() => FinAccountLineItemTagMapUncheckedUpdateManyWithoutTransactionNestedInputSchema).optional(),
  })
  .strict()

export const FinAccountLineItemsCreateManyInputSchema: z.ZodType<Prisma.FinAccountLineItemsCreateManyInput> = z
  .object({
    t_id: z.number().int().optional(),
    t_account: z.number().int().optional().nullable(),
    t_date: z.string(),
    t_date_posted: z.string().optional().nullable(),
    t_type: z.string().optional().nullable(),
    t_schc_category: z.string().optional().nullable(),
    t_amt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_symbol: z.string().optional().nullable(),
    t_qty: z.number().optional(),
    t_price: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_commission: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_fee: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_method: z.string().optional().nullable(),
    t_source: z.string().optional().nullable(),
    t_origin: z.string().optional().nullable(),
    opt_expiration: z.string().optional().nullable(),
    opt_type: z
      .lazy(() => account_line_items_opt_typeSchema)
      .optional()
      .nullable(),
    opt_strike: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    t_description: z.string().optional().nullable(),
    t_comment: z.string().optional().nullable(),
    t_from: z.string().optional().nullable(),
    t_to: z.string().optional().nullable(),
    t_interest_rate: z.string().optional().nullable(),
    t_cusip: z.string().optional().nullable(),
    t_harvested_amount: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    parent_t_id: z.number().int().optional().nullable(),
    when_added: z.coerce.date().optional().nullable(),
    when_deleted: z.coerce.date().optional().nullable(),
  })
  .strict()

export const FinAccountLineItemsUpdateManyMutationInputSchema: z.ZodType<Prisma.FinAccountLineItemsUpdateManyMutationInput> =
  z
    .object({
      t_account: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      t_date_posted: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_type: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_schc_category: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_amt: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_symbol: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_qty: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      t_price: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_commission: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_fee: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_method: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_source: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_origin: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      opt_expiration: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      opt_type: z
        .union([
          z.lazy(() => account_line_items_opt_typeSchema),
          z.lazy(() => NullableEnumaccount_line_items_opt_typeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      opt_strike: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_comment: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_from: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_to: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_interest_rate: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_cusip: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_harvested_amount: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      parent_t_id: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      when_added: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const FinAccountLineItemsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FinAccountLineItemsUncheckedUpdateManyInput> =
  z
    .object({
      t_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      t_account: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      t_date_posted: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_type: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_schc_category: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_amt: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_symbol: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_qty: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      t_price: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_commission: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_fee: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_method: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_source: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_origin: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      opt_expiration: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      opt_type: z
        .union([
          z.lazy(() => account_line_items_opt_typeSchema),
          z.lazy(() => NullableEnumaccount_line_items_opt_typeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      opt_strike: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_comment: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_from: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_to: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_interest_rate: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_cusip: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_harvested_amount: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      parent_t_id: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      when_added: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const FinAccountBalanceSnapshotCreateInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotCreateInput> = z
  .object({
    acct_id: z.number().int(),
    balance: z.string(),
    when_added: z.coerce.date().optional(),
  })
  .strict()

export const FinAccountBalanceSnapshotUncheckedCreateInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotUncheckedCreateInput> =
  z
    .object({
      snapshot_id: z.number().int().optional(),
      acct_id: z.number().int(),
      balance: z.string(),
      when_added: z.coerce.date().optional(),
    })
    .strict()

export const FinAccountBalanceSnapshotUpdateInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotUpdateInput> = z
  .object({
    acct_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    balance: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const FinAccountBalanceSnapshotUncheckedUpdateInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotUncheckedUpdateInput> =
  z
    .object({
      snapshot_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      acct_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      balance: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const FinAccountBalanceSnapshotCreateManyInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotCreateManyInput> = z
  .object({
    snapshot_id: z.number().int().optional(),
    acct_id: z.number().int(),
    balance: z.string(),
    when_added: z.coerce.date().optional(),
  })
  .strict()

export const FinAccountBalanceSnapshotUpdateManyMutationInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotUpdateManyMutationInput> =
  z
    .object({
      acct_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      balance: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const FinAccountBalanceSnapshotUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotUncheckedUpdateManyInput> =
  z
    .object({
      snapshot_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      acct_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      balance: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const EarningsAnnualCreateInputSchema: z.ZodType<Prisma.EarningsAnnualCreateInput> = z
  .object({
    symbol: z.string(),
    fiscalDateEnding: z.coerce.date(),
    reportedEPS: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsAnnualUncheckedCreateInputSchema: z.ZodType<Prisma.EarningsAnnualUncheckedCreateInput> = z
  .object({
    symbol: z.string(),
    fiscalDateEnding: z.coerce.date(),
    reportedEPS: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsAnnualUpdateInputSchema: z.ZodType<Prisma.EarningsAnnualUpdateInput> = z
  .object({
    symbol: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fiscalDateEnding: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    reportedEPS: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsAnnualUncheckedUpdateInputSchema: z.ZodType<Prisma.EarningsAnnualUncheckedUpdateInput> = z
  .object({
    symbol: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fiscalDateEnding: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    reportedEPS: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsAnnualCreateManyInputSchema: z.ZodType<Prisma.EarningsAnnualCreateManyInput> = z
  .object({
    symbol: z.string(),
    fiscalDateEnding: z.coerce.date(),
    reportedEPS: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsAnnualUpdateManyMutationInputSchema: z.ZodType<Prisma.EarningsAnnualUpdateManyMutationInput> = z
  .object({
    symbol: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fiscalDateEnding: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    reportedEPS: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsAnnualUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EarningsAnnualUncheckedUpdateManyInput> = z
  .object({
    symbol: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fiscalDateEnding: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    reportedEPS: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsQuarterlyCreateInputSchema: z.ZodType<Prisma.EarningsQuarterlyCreateInput> = z
  .object({
    symbol: z.string(),
    fiscalDateEnding: z.coerce.date(),
    reportedDate: z.coerce.date().optional().nullable(),
    reportedEPS: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    estimatedEPS: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    surprise: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    surprisePercentage: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsQuarterlyUncheckedCreateInputSchema: z.ZodType<Prisma.EarningsQuarterlyUncheckedCreateInput> = z
  .object({
    symbol: z.string(),
    fiscalDateEnding: z.coerce.date(),
    reportedDate: z.coerce.date().optional().nullable(),
    reportedEPS: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    estimatedEPS: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    surprise: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    surprisePercentage: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsQuarterlyUpdateInputSchema: z.ZodType<Prisma.EarningsQuarterlyUpdateInput> = z
  .object({
    symbol: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fiscalDateEnding: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    reportedDate: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    reportedEPS: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    estimatedEPS: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    surprise: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    surprisePercentage: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsQuarterlyUncheckedUpdateInputSchema: z.ZodType<Prisma.EarningsQuarterlyUncheckedUpdateInput> = z
  .object({
    symbol: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fiscalDateEnding: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    reportedDate: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    reportedEPS: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    estimatedEPS: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    surprise: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    surprisePercentage: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsQuarterlyCreateManyInputSchema: z.ZodType<Prisma.EarningsQuarterlyCreateManyInput> = z
  .object({
    symbol: z.string(),
    fiscalDateEnding: z.coerce.date(),
    reportedDate: z.coerce.date().optional().nullable(),
    reportedEPS: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    estimatedEPS: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    surprise: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    surprisePercentage: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsQuarterlyUpdateManyMutationInputSchema: z.ZodType<Prisma.EarningsQuarterlyUpdateManyMutationInput> = z
  .object({
    symbol: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fiscalDateEnding: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    reportedDate: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    reportedEPS: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    estimatedEPS: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    surprise: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    surprisePercentage: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const EarningsQuarterlyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EarningsQuarterlyUncheckedUpdateManyInput> =
  z
    .object({
      symbol: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      fiscalDateEnding: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      reportedDate: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      reportedEPS: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      estimatedEPS: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      surprise: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      surprisePercentage: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict()

export const FinEquityAwardsCreateInputSchema: z.ZodType<Prisma.FinEquityAwardsCreateInput> = z
  .object({
    award_id: z.string(),
    grant_date: z.string(),
    vest_date: z.string(),
    share_count: z.number().int(),
    symbol: z.string(),
    uid: z.string(),
    vest_price: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
  })
  .strict()

export const FinEquityAwardsUncheckedCreateInputSchema: z.ZodType<Prisma.FinEquityAwardsUncheckedCreateInput> = z
  .object({
    id: z.number().int().optional(),
    award_id: z.string(),
    grant_date: z.string(),
    vest_date: z.string(),
    share_count: z.number().int(),
    symbol: z.string(),
    uid: z.string(),
    vest_price: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
  })
  .strict()

export const FinEquityAwardsUpdateInputSchema: z.ZodType<Prisma.FinEquityAwardsUpdateInput> = z
  .object({
    award_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    grant_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    vest_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    share_count: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    symbol: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    uid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    vest_price: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const FinEquityAwardsUncheckedUpdateInputSchema: z.ZodType<Prisma.FinEquityAwardsUncheckedUpdateInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    award_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    grant_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    vest_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    share_count: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    symbol: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    uid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    vest_price: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const FinEquityAwardsCreateManyInputSchema: z.ZodType<Prisma.FinEquityAwardsCreateManyInput> = z
  .object({
    id: z.number().int().optional(),
    award_id: z.string(),
    grant_date: z.string(),
    vest_date: z.string(),
    share_count: z.number().int(),
    symbol: z.string(),
    uid: z.string(),
    vest_price: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
  })
  .strict()

export const FinEquityAwardsUpdateManyMutationInputSchema: z.ZodType<Prisma.FinEquityAwardsUpdateManyMutationInput> = z
  .object({
    award_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    grant_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    vest_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    share_count: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    symbol: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    uid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    vest_price: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const FinEquityAwardsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FinEquityAwardsUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    award_id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    grant_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    vest_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    share_count: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    symbol: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    uid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    vest_price: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const FinPayslipsCreateInputSchema: z.ZodType<Prisma.FinPayslipsCreateInput> = z
  .object({
    uid: z.string().optional().nullable(),
    period_start: z.string().optional().nullable(),
    period_end: z.string().optional().nullable(),
    pay_date: z.string().optional().nullable(),
    earnings_gross: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    earnings_bonus: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    earnings_net_pay: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    earnings_rsu: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    imp_other: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    imp_legal: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    imp_fitness: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    imp_ltd: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_oasdi: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_medicare: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_fed_tax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_fed_tax_addl: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_state_tax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_state_tax_addl: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_state_disability: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_401k_pretax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_401k_aftertax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_401k_employer: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_fed_tax_refunded: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_payslip_file_hash: z.string().optional().nullable(),
    ps_is_estimated: z.boolean().optional(),
    ps_comment: z.string().optional().nullable(),
    ps_pretax_medical: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_pretax_fsa: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_salary: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_vacation_payout: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_pretax_dental: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_pretax_vision: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    other: z.string().optional().nullable(),
  })
  .strict()

export const FinPayslipsUncheckedCreateInputSchema: z.ZodType<Prisma.FinPayslipsUncheckedCreateInput> = z
  .object({
    payslip_id: z.number().int().optional(),
    uid: z.string().optional().nullable(),
    period_start: z.string().optional().nullable(),
    period_end: z.string().optional().nullable(),
    pay_date: z.string().optional().nullable(),
    earnings_gross: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    earnings_bonus: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    earnings_net_pay: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    earnings_rsu: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    imp_other: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    imp_legal: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    imp_fitness: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    imp_ltd: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_oasdi: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_medicare: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_fed_tax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_fed_tax_addl: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_state_tax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_state_tax_addl: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_state_disability: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_401k_pretax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_401k_aftertax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_401k_employer: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_fed_tax_refunded: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_payslip_file_hash: z.string().optional().nullable(),
    ps_is_estimated: z.boolean().optional(),
    ps_comment: z.string().optional().nullable(),
    ps_pretax_medical: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_pretax_fsa: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_salary: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_vacation_payout: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_pretax_dental: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_pretax_vision: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    other: z.string().optional().nullable(),
  })
  .strict()

export const FinPayslipsUpdateInputSchema: z.ZodType<Prisma.FinPayslipsUpdateInput> = z
  .object({
    uid: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    period_start: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    period_end: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    pay_date: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    earnings_gross: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    earnings_bonus: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    earnings_net_pay: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    earnings_rsu: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_other: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_legal: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_fitness: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_ltd: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_oasdi: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_medicare: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_fed_tax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_fed_tax_addl: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_state_tax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_state_tax_addl: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_state_disability: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_401k_pretax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_401k_aftertax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_401k_employer: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_fed_tax_refunded: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_payslip_file_hash: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ps_is_estimated: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ps_comment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ps_pretax_medical: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_pretax_fsa: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_salary: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_vacation_payout: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_pretax_dental: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_pretax_vision: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    other: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinPayslipsUncheckedUpdateInputSchema: z.ZodType<Prisma.FinPayslipsUncheckedUpdateInput> = z
  .object({
    payslip_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    uid: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    period_start: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    period_end: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    pay_date: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    earnings_gross: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    earnings_bonus: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    earnings_net_pay: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    earnings_rsu: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_other: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_legal: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_fitness: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_ltd: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_oasdi: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_medicare: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_fed_tax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_fed_tax_addl: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_state_tax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_state_tax_addl: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_state_disability: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_401k_pretax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_401k_aftertax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_401k_employer: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_fed_tax_refunded: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_payslip_file_hash: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ps_is_estimated: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ps_comment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ps_pretax_medical: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_pretax_fsa: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_salary: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_vacation_payout: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_pretax_dental: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_pretax_vision: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    other: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinPayslipsCreateManyInputSchema: z.ZodType<Prisma.FinPayslipsCreateManyInput> = z
  .object({
    payslip_id: z.number().int().optional(),
    uid: z.string().optional().nullable(),
    period_start: z.string().optional().nullable(),
    period_end: z.string().optional().nullable(),
    pay_date: z.string().optional().nullable(),
    earnings_gross: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    earnings_bonus: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    earnings_net_pay: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    earnings_rsu: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    imp_other: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    imp_legal: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    imp_fitness: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    imp_ltd: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_oasdi: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_medicare: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_fed_tax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_fed_tax_addl: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_state_tax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_state_tax_addl: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_state_disability: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_401k_pretax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_401k_aftertax: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_401k_employer: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_fed_tax_refunded: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    ps_payslip_file_hash: z.string().optional().nullable(),
    ps_is_estimated: z.boolean().optional(),
    ps_comment: z.string().optional().nullable(),
    ps_pretax_medical: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_pretax_fsa: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_salary: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_vacation_payout: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_pretax_dental: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    ps_pretax_vision: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    other: z.string().optional().nullable(),
  })
  .strict()

export const FinPayslipsUpdateManyMutationInputSchema: z.ZodType<Prisma.FinPayslipsUpdateManyMutationInput> = z
  .object({
    uid: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    period_start: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    period_end: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    pay_date: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    earnings_gross: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    earnings_bonus: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    earnings_net_pay: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    earnings_rsu: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_other: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_legal: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_fitness: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_ltd: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_oasdi: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_medicare: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_fed_tax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_fed_tax_addl: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_state_tax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_state_tax_addl: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_state_disability: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_401k_pretax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_401k_aftertax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_401k_employer: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_fed_tax_refunded: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_payslip_file_hash: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ps_is_estimated: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ps_comment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ps_pretax_medical: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_pretax_fsa: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_salary: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_vacation_payout: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_pretax_dental: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_pretax_vision: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    other: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinPayslipsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FinPayslipsUncheckedUpdateManyInput> = z
  .object({
    payslip_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    uid: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    period_start: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    period_end: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    pay_date: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    earnings_gross: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    earnings_bonus: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    earnings_net_pay: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    earnings_rsu: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_other: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_legal: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_fitness: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    imp_ltd: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_oasdi: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_medicare: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_fed_tax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_fed_tax_addl: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_state_tax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_state_tax_addl: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_state_disability: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_401k_pretax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_401k_aftertax: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_401k_employer: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_fed_tax_refunded: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    ps_payslip_file_hash: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ps_is_estimated: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ps_comment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ps_pretax_medical: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_pretax_fsa: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_salary: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_vacation_payout: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_pretax_dental: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ps_pretax_vision: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    other: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinPayslipUploadsCreateInputSchema: z.ZodType<Prisma.FinPayslipUploadsCreateInput> = z
  .object({
    file_name: z.string().optional().nullable(),
    file_hash: z.string().optional().nullable(),
    parsed_json: z.string().optional().nullable(),
  })
  .strict()

export const FinPayslipUploadsUncheckedCreateInputSchema: z.ZodType<Prisma.FinPayslipUploadsUncheckedCreateInput> = z
  .object({
    id: z.number().int().optional(),
    file_name: z.string().optional().nullable(),
    file_hash: z.string().optional().nullable(),
    parsed_json: z.string().optional().nullable(),
  })
  .strict()

export const FinPayslipUploadsUpdateInputSchema: z.ZodType<Prisma.FinPayslipUploadsUpdateInput> = z
  .object({
    file_name: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    file_hash: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    parsed_json: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinPayslipUploadsUncheckedUpdateInputSchema: z.ZodType<Prisma.FinPayslipUploadsUncheckedUpdateInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    file_name: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    file_hash: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    parsed_json: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinPayslipUploadsCreateManyInputSchema: z.ZodType<Prisma.FinPayslipUploadsCreateManyInput> = z
  .object({
    id: z.number().int().optional(),
    file_name: z.string().optional().nullable(),
    file_hash: z.string().optional().nullable(),
    parsed_json: z.string().optional().nullable(),
  })
  .strict()

export const FinPayslipUploadsUpdateManyMutationInputSchema: z.ZodType<Prisma.FinPayslipUploadsUpdateManyMutationInput> = z
  .object({
    file_name: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    file_hash: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    parsed_json: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinPayslipUploadsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FinPayslipUploadsUncheckedUpdateManyInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      file_name: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      file_hash: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      parsed_json: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const GraduatedTaxCreateInputSchema: z.ZodType<Prisma.GraduatedTaxCreateInput> = z
  .object({
    year: z.number().int(),
    region: z.string(),
    income_over: z.number().int(),
    type: z.lazy(() => graduated_tax_typeSchema).optional(),
    rate: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    verified: z.boolean().optional(),
  })
  .strict()

export const GraduatedTaxUncheckedCreateInputSchema: z.ZodType<Prisma.GraduatedTaxUncheckedCreateInput> = z
  .object({
    year: z.number().int(),
    region: z.string(),
    income_over: z.number().int(),
    type: z.lazy(() => graduated_tax_typeSchema).optional(),
    rate: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    verified: z.boolean().optional(),
  })
  .strict()

export const GraduatedTaxUpdateInputSchema: z.ZodType<Prisma.GraduatedTaxUpdateInput> = z
  .object({
    year: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    region: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    income_over: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    type: z
      .union([z.lazy(() => graduated_tax_typeSchema), z.lazy(() => Enumgraduated_tax_typeFieldUpdateOperationsInputSchema)])
      .optional(),
    rate: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    verified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const GraduatedTaxUncheckedUpdateInputSchema: z.ZodType<Prisma.GraduatedTaxUncheckedUpdateInput> = z
  .object({
    year: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    region: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    income_over: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    type: z
      .union([z.lazy(() => graduated_tax_typeSchema), z.lazy(() => Enumgraduated_tax_typeFieldUpdateOperationsInputSchema)])
      .optional(),
    rate: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    verified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const GraduatedTaxCreateManyInputSchema: z.ZodType<Prisma.GraduatedTaxCreateManyInput> = z
  .object({
    year: z.number().int(),
    region: z.string(),
    income_over: z.number().int(),
    type: z.lazy(() => graduated_tax_typeSchema).optional(),
    rate: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    verified: z.boolean().optional(),
  })
  .strict()

export const GraduatedTaxUpdateManyMutationInputSchema: z.ZodType<Prisma.GraduatedTaxUpdateManyMutationInput> = z
  .object({
    year: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    region: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    income_over: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    type: z
      .union([z.lazy(() => graduated_tax_typeSchema), z.lazy(() => Enumgraduated_tax_typeFieldUpdateOperationsInputSchema)])
      .optional(),
    rate: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    verified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const GraduatedTaxUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GraduatedTaxUncheckedUpdateManyInput> = z
  .object({
    year: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    region: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    income_over: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    type: z
      .union([z.lazy(() => graduated_tax_typeSchema), z.lazy(() => Enumgraduated_tax_typeFieldUpdateOperationsInputSchema)])
      .optional(),
    rate: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    verified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const PHRPatientVitalsCreateInputSchema: z.ZodType<Prisma.PHRPatientVitalsCreateInput> = z
  .object({
    user_id: z.string().optional().nullable(),
    vital_name: z.string().optional().nullable(),
    vital_date: z.coerce.date().optional().nullable(),
    vital_value: z.string().optional().nullable(),
  })
  .strict()

export const PHRPatientVitalsUncheckedCreateInputSchema: z.ZodType<Prisma.PHRPatientVitalsUncheckedCreateInput> = z
  .object({
    id: z.number().int().optional(),
    user_id: z.string().optional().nullable(),
    vital_name: z.string().optional().nullable(),
    vital_date: z.coerce.date().optional().nullable(),
    vital_value: z.string().optional().nullable(),
  })
  .strict()

export const PHRPatientVitalsUpdateInputSchema: z.ZodType<Prisma.PHRPatientVitalsUpdateInput> = z
  .object({
    user_id: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    vital_name: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    vital_date: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    vital_value: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const PHRPatientVitalsUncheckedUpdateInputSchema: z.ZodType<Prisma.PHRPatientVitalsUncheckedUpdateInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    user_id: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    vital_name: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    vital_date: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    vital_value: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const PHRPatientVitalsCreateManyInputSchema: z.ZodType<Prisma.PHRPatientVitalsCreateManyInput> = z
  .object({
    id: z.number().int().optional(),
    user_id: z.string().optional().nullable(),
    vital_name: z.string().optional().nullable(),
    vital_date: z.coerce.date().optional().nullable(),
    vital_value: z.string().optional().nullable(),
  })
  .strict()

export const PHRPatientVitalsUpdateManyMutationInputSchema: z.ZodType<Prisma.PHRPatientVitalsUpdateManyMutationInput> = z
  .object({
    user_id: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    vital_name: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    vital_date: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    vital_value: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const PHRPatientVitalsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PHRPatientVitalsUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    user_id: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    vital_name: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    vital_date: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    vital_value: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const StockQuotesDailyCreateInputSchema: z.ZodType<Prisma.StockQuotesDailyCreateInput> = z
  .object({
    c_date: z.coerce.date(),
    c_symb: z.string(),
    c_open: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    c_high: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    c_low: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    c_close: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    c_vol: z.bigint(),
  })
  .strict()

export const StockQuotesDailyUncheckedCreateInputSchema: z.ZodType<Prisma.StockQuotesDailyUncheckedCreateInput> = z
  .object({
    c_date: z.coerce.date(),
    c_symb: z.string(),
    c_open: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    c_high: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    c_low: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    c_close: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    c_vol: z.bigint(),
  })
  .strict()

export const StockQuotesDailyUpdateInputSchema: z.ZodType<Prisma.StockQuotesDailyUpdateInput> = z
  .object({
    c_date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    c_symb: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    c_open: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_high: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_low: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_close: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_vol: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const StockQuotesDailyUncheckedUpdateInputSchema: z.ZodType<Prisma.StockQuotesDailyUncheckedUpdateInput> = z
  .object({
    c_date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    c_symb: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    c_open: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_high: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_low: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_close: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_vol: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const StockQuotesDailyCreateManyInputSchema: z.ZodType<Prisma.StockQuotesDailyCreateManyInput> = z
  .object({
    c_date: z.coerce.date(),
    c_symb: z.string(),
    c_open: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    c_high: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    c_low: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    c_close: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
    c_vol: z.bigint(),
  })
  .strict()

export const StockQuotesDailyUpdateManyMutationInputSchema: z.ZodType<Prisma.StockQuotesDailyUpdateManyMutationInput> = z
  .object({
    c_date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    c_symb: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    c_open: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_high: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_low: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_close: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_vol: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const StockQuotesDailyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StockQuotesDailyUncheckedUpdateManyInput> = z
  .object({
    c_date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    c_symb: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    c_open: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_high: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_low: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_close: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => DecimalFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    c_vol: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const TimeSeriesDatapointCreateInputSchema: z.ZodType<Prisma.TimeSeriesDatapointCreateInput> = z
  .object({
    dp_date: z.coerce.date().optional().nullable(),
    dp_value: z.string().optional().nullable(),
    dp_comment: z.string().optional().nullable(),
    timeseries_series: z.lazy(() => TimeSeriesSeriesCreateNestedOneWithoutTimeseries_datapointInputSchema),
  })
  .strict()

export const TimeSeriesDatapointUncheckedCreateInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUncheckedCreateInput> = z
  .object({
    dp_id: z.number().int().optional(),
    dp_series_id: z.number().int(),
    dp_date: z.coerce.date().optional().nullable(),
    dp_value: z.string().optional().nullable(),
    dp_comment: z.string().optional().nullable(),
  })
  .strict()

export const TimeSeriesDatapointUpdateInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUpdateInput> = z
  .object({
    dp_date: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    dp_value: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    dp_comment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    timeseries_series: z
      .lazy(() => TimeSeriesSeriesUpdateOneRequiredWithoutTimeseries_datapointNestedInputSchema)
      .optional(),
  })
  .strict()

export const TimeSeriesDatapointUncheckedUpdateInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUncheckedUpdateInput> = z
  .object({
    dp_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    dp_series_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    dp_date: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    dp_value: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    dp_comment: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const TimeSeriesDatapointCreateManyInputSchema: z.ZodType<Prisma.TimeSeriesDatapointCreateManyInput> = z
  .object({
    dp_id: z.number().int().optional(),
    dp_series_id: z.number().int(),
    dp_date: z.coerce.date().optional().nullable(),
    dp_value: z.string().optional().nullable(),
    dp_comment: z.string().optional().nullable(),
  })
  .strict()

export const TimeSeriesDatapointUpdateManyMutationInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUpdateManyMutationInput> =
  z
    .object({
      dp_date: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      dp_value: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      dp_comment: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const TimeSeriesDatapointUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUncheckedUpdateManyInput> =
  z
    .object({
      dp_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      dp_series_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      dp_date: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      dp_value: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      dp_comment: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const TimeSeriesDocumentCreateInputSchema: z.ZodType<Prisma.TimeSeriesDocumentCreateInput> = z
  .object({
    uid: z.number().int(),
    name: z.string(),
    timeseries_series: z.lazy(() => TimeSeriesSeriesCreateNestedManyWithoutTimeseries_documentsInputSchema).optional(),
  })
  .strict()

export const TimeSeriesDocumentUncheckedCreateInputSchema: z.ZodType<Prisma.TimeSeriesDocumentUncheckedCreateInput> = z
  .object({
    id: z.number().int().optional(),
    uid: z.number().int(),
    name: z.string(),
    timeseries_series: z
      .lazy(() => TimeSeriesSeriesUncheckedCreateNestedManyWithoutTimeseries_documentsInputSchema)
      .optional(),
  })
  .strict()

export const TimeSeriesDocumentUpdateInputSchema: z.ZodType<Prisma.TimeSeriesDocumentUpdateInput> = z
  .object({
    uid: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    timeseries_series: z.lazy(() => TimeSeriesSeriesUpdateManyWithoutTimeseries_documentsNestedInputSchema).optional(),
  })
  .strict()

export const TimeSeriesDocumentUncheckedUpdateInputSchema: z.ZodType<Prisma.TimeSeriesDocumentUncheckedUpdateInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    uid: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    timeseries_series: z
      .lazy(() => TimeSeriesSeriesUncheckedUpdateManyWithoutTimeseries_documentsNestedInputSchema)
      .optional(),
  })
  .strict()

export const TimeSeriesDocumentCreateManyInputSchema: z.ZodType<Prisma.TimeSeriesDocumentCreateManyInput> = z
  .object({
    id: z.number().int().optional(),
    uid: z.number().int(),
    name: z.string(),
  })
  .strict()

export const TimeSeriesDocumentUpdateManyMutationInputSchema: z.ZodType<Prisma.TimeSeriesDocumentUpdateManyMutationInput> =
  z
    .object({
      uid: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const TimeSeriesDocumentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TimeSeriesDocumentUncheckedUpdateManyInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      uid: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const TimeSeriesSeriesCreateInputSchema: z.ZodType<Prisma.TimeSeriesSeriesCreateInput> = z
  .object({
    series_name: z.string(),
    timeseries_datapoint: z.lazy(() => TimeSeriesDatapointCreateNestedManyWithoutTimeseries_seriesInputSchema).optional(),
    timeseries_documents: z.lazy(() => TimeSeriesDocumentCreateNestedOneWithoutTimeseries_seriesInputSchema),
  })
  .strict()

export const TimeSeriesSeriesUncheckedCreateInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUncheckedCreateInput> = z
  .object({
    id: z.number().int().optional(),
    document_id: z.number().int(),
    series_name: z.string(),
    timeseries_datapoint: z
      .lazy(() => TimeSeriesDatapointUncheckedCreateNestedManyWithoutTimeseries_seriesInputSchema)
      .optional(),
  })
  .strict()

export const TimeSeriesSeriesUpdateInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUpdateInput> = z
  .object({
    series_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    timeseries_datapoint: z.lazy(() => TimeSeriesDatapointUpdateManyWithoutTimeseries_seriesNestedInputSchema).optional(),
    timeseries_documents: z
      .lazy(() => TimeSeriesDocumentUpdateOneRequiredWithoutTimeseries_seriesNestedInputSchema)
      .optional(),
  })
  .strict()

export const TimeSeriesSeriesUncheckedUpdateInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUncheckedUpdateInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    document_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    series_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    timeseries_datapoint: z
      .lazy(() => TimeSeriesDatapointUncheckedUpdateManyWithoutTimeseries_seriesNestedInputSchema)
      .optional(),
  })
  .strict()

export const TimeSeriesSeriesCreateManyInputSchema: z.ZodType<Prisma.TimeSeriesSeriesCreateManyInput> = z
  .object({
    id: z.number().int().optional(),
    document_id: z.number().int(),
    series_name: z.string(),
  })
  .strict()

export const TimeSeriesSeriesUpdateManyMutationInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUpdateManyMutationInput> = z
  .object({
    series_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const TimeSeriesSeriesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    document_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    series_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const UsersLegacyCreateInputSchema: z.ZodType<Prisma.UsersLegacyCreateInput> = z
  .object({
    uid: z.bigint().optional(),
    email: z.string(),
    pw: z.string().optional().nullable(),
    salt: z.bigint().optional(),
    alias: z.string().optional().nullable(),
    ax_maxmin: z.boolean().optional(),
    ax_homes: z.boolean().optional().nullable(),
    ax_tax: z.boolean().optional(),
    ax_evdb: z.boolean().optional().nullable(),
    ax_spgp: z.boolean().optional(),
    ax_phr: z.number().int().optional(),
    reset_token: z.string().optional().nullable(),
    reset_requested_at: z.coerce.date().optional().nullable(),
    passkey_credential_id: z.string().optional().nullable(),
    passkey_public_key: z.string().optional().nullable(),
  })
  .strict()

export const UsersLegacyUncheckedCreateInputSchema: z.ZodType<Prisma.UsersLegacyUncheckedCreateInput> = z
  .object({
    uid: z.bigint().optional(),
    email: z.string(),
    pw: z.string().optional().nullable(),
    salt: z.bigint().optional(),
    alias: z.string().optional().nullable(),
    ax_maxmin: z.boolean().optional(),
    ax_homes: z.boolean().optional().nullable(),
    ax_tax: z.boolean().optional(),
    ax_evdb: z.boolean().optional().nullable(),
    ax_spgp: z.boolean().optional(),
    ax_phr: z.number().int().optional(),
    reset_token: z.string().optional().nullable(),
    reset_requested_at: z.coerce.date().optional().nullable(),
    passkey_credential_id: z.string().optional().nullable(),
    passkey_public_key: z.string().optional().nullable(),
  })
  .strict()

export const UsersLegacyUpdateInputSchema: z.ZodType<Prisma.UsersLegacyUpdateInput> = z
  .object({
    uid: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    pw: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    salt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
    alias: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ax_maxmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ax_homes: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ax_tax: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ax_evdb: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ax_spgp: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ax_phr: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    reset_token: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    reset_requested_at: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    passkey_credential_id: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    passkey_public_key: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const UsersLegacyUncheckedUpdateInputSchema: z.ZodType<Prisma.UsersLegacyUncheckedUpdateInput> = z
  .object({
    uid: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    pw: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    salt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
    alias: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ax_maxmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ax_homes: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ax_tax: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ax_evdb: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ax_spgp: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ax_phr: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    reset_token: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    reset_requested_at: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    passkey_credential_id: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    passkey_public_key: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const UsersLegacyCreateManyInputSchema: z.ZodType<Prisma.UsersLegacyCreateManyInput> = z
  .object({
    uid: z.bigint().optional(),
    email: z.string(),
    pw: z.string().optional().nullable(),
    salt: z.bigint().optional(),
    alias: z.string().optional().nullable(),
    ax_maxmin: z.boolean().optional(),
    ax_homes: z.boolean().optional().nullable(),
    ax_tax: z.boolean().optional(),
    ax_evdb: z.boolean().optional().nullable(),
    ax_spgp: z.boolean().optional(),
    ax_phr: z.number().int().optional(),
    reset_token: z.string().optional().nullable(),
    reset_requested_at: z.coerce.date().optional().nullable(),
    passkey_credential_id: z.string().optional().nullable(),
    passkey_public_key: z.string().optional().nullable(),
  })
  .strict()

export const UsersLegacyUpdateManyMutationInputSchema: z.ZodType<Prisma.UsersLegacyUpdateManyMutationInput> = z
  .object({
    uid: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    pw: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    salt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
    alias: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ax_maxmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ax_homes: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ax_tax: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ax_evdb: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ax_spgp: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ax_phr: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    reset_token: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    reset_requested_at: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    passkey_credential_id: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    passkey_public_key: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const UsersLegacyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsersLegacyUncheckedUpdateManyInput> = z
  .object({
    uid: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    pw: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    salt: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputSchema)]).optional(),
    alias: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ax_maxmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ax_homes: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ax_tax: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ax_evdb: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    ax_spgp: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    ax_phr: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    reset_token: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    reset_requested_at: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    passkey_credential_id: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    passkey_public_key: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const VXCVFilesCreateInputSchema: z.ZodType<Prisma.VXCVFilesCreateInput> = z
  .object({
    hash: z.instanceof(Buffer),
    filename: z.string(),
    mime: z.string(),
    downloads: z.number().int().optional(),
    max_downloads: z.number().int().optional(),
    size: z.number().int(),
    uploaded: z.coerce.date(),
    blocked: z.number().int().optional(),
    ip: z.number().int(),
  })
  .strict()

export const VXCVFilesUncheckedCreateInputSchema: z.ZodType<Prisma.VXCVFilesUncheckedCreateInput> = z
  .object({
    hash: z.instanceof(Buffer),
    filename: z.string(),
    mime: z.string(),
    downloads: z.number().int().optional(),
    max_downloads: z.number().int().optional(),
    size: z.number().int(),
    uploaded: z.coerce.date(),
    blocked: z.number().int().optional(),
    ip: z.number().int(),
  })
  .strict()

export const VXCVFilesUpdateInputSchema: z.ZodType<Prisma.VXCVFilesUpdateInput> = z
  .object({
    hash: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
    filename: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    mime: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    downloads: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    max_downloads: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    size: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    uploaded: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    blocked: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    ip: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const VXCVFilesUncheckedUpdateInputSchema: z.ZodType<Prisma.VXCVFilesUncheckedUpdateInput> = z
  .object({
    hash: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
    filename: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    mime: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    downloads: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    max_downloads: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    size: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    uploaded: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    blocked: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    ip: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const VXCVFilesCreateManyInputSchema: z.ZodType<Prisma.VXCVFilesCreateManyInput> = z
  .object({
    hash: z.instanceof(Buffer),
    filename: z.string(),
    mime: z.string(),
    downloads: z.number().int().optional(),
    max_downloads: z.number().int().optional(),
    size: z.number().int(),
    uploaded: z.coerce.date(),
    blocked: z.number().int().optional(),
    ip: z.number().int(),
  })
  .strict()

export const VXCVFilesUpdateManyMutationInputSchema: z.ZodType<Prisma.VXCVFilesUpdateManyMutationInput> = z
  .object({
    hash: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
    filename: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    mime: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    downloads: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    max_downloads: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    size: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    uploaded: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    blocked: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    ip: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const VXCVFilesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VXCVFilesUncheckedUpdateManyInput> = z
  .object({
    hash: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputSchema)]).optional(),
    filename: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    mime: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    downloads: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    max_downloads: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    size: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    uploaded: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    blocked: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    ip: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const VXCVLinksCreateInputSchema: z.ZodType<Prisma.VXCVLinksCreateInput> = z
  .object({
    uniqueid: z.string(),
    url: z.string(),
  })
  .strict()

export const VXCVLinksUncheckedCreateInputSchema: z.ZodType<Prisma.VXCVLinksUncheckedCreateInput> = z
  .object({
    uniqueid: z.string(),
    url: z.string(),
  })
  .strict()

export const VXCVLinksUpdateInputSchema: z.ZodType<Prisma.VXCVLinksUpdateInput> = z
  .object({
    uniqueid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    url: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const VXCVLinksUncheckedUpdateInputSchema: z.ZodType<Prisma.VXCVLinksUncheckedUpdateInput> = z
  .object({
    uniqueid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    url: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const VXCVLinksCreateManyInputSchema: z.ZodType<Prisma.VXCVLinksCreateManyInput> = z
  .object({
    uniqueid: z.string(),
    url: z.string(),
  })
  .strict()

export const VXCVLinksUpdateManyMutationInputSchema: z.ZodType<Prisma.VXCVLinksUpdateManyMutationInput> = z
  .object({
    uniqueid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    url: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const VXCVLinksUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VXCVLinksUncheckedUpdateManyInput> = z
  .object({
    uniqueid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    url: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const AccountLineItemTagCreateInputSchema: z.ZodType<Prisma.AccountLineItemTagCreateInput> = z
  .object({
    tag_userid: z.string(),
    tag_color: z.string(),
    tag_label: z.string(),
  })
  .strict()

export const AccountLineItemTagUncheckedCreateInputSchema: z.ZodType<Prisma.AccountLineItemTagUncheckedCreateInput> = z
  .object({
    tag_id: z.number().int().optional(),
    tag_userid: z.string(),
    tag_color: z.string(),
    tag_label: z.string(),
  })
  .strict()

export const AccountLineItemTagUpdateInputSchema: z.ZodType<Prisma.AccountLineItemTagUpdateInput> = z
  .object({
    tag_userid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    tag_color: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    tag_label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const AccountLineItemTagUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountLineItemTagUncheckedUpdateInput> = z
  .object({
    tag_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    tag_userid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    tag_color: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    tag_label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const AccountLineItemTagCreateManyInputSchema: z.ZodType<Prisma.AccountLineItemTagCreateManyInput> = z
  .object({
    tag_id: z.number().int().optional(),
    tag_userid: z.string(),
    tag_color: z.string(),
    tag_label: z.string(),
  })
  .strict()

export const AccountLineItemTagUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountLineItemTagUpdateManyMutationInput> =
  z
    .object({
      tag_userid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      tag_color: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      tag_label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const AccountLineItemTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountLineItemTagUncheckedUpdateManyInput> =
  z
    .object({
      tag_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      tag_userid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      tag_color: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      tag_label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const FinAccountTagCreateInputSchema: z.ZodType<Prisma.FinAccountTagCreateInput> = z
  .object({
    tag_userid: z.string(),
    tag_color: z.string(),
    tag_label: z.string(),
    when_added: z.coerce.date().optional(),
    when_deleted: z.coerce.date().optional().nullable(),
    FinAccountLineItemTagMap: z.lazy(() => FinAccountLineItemTagMapCreateNestedManyWithoutTagInputSchema).optional(),
  })
  .strict()

export const FinAccountTagUncheckedCreateInputSchema: z.ZodType<Prisma.FinAccountTagUncheckedCreateInput> = z
  .object({
    tag_id: z.number().int().optional(),
    tag_userid: z.string(),
    tag_color: z.string(),
    tag_label: z.string(),
    when_added: z.coerce.date().optional(),
    when_deleted: z.coerce.date().optional().nullable(),
    FinAccountLineItemTagMap: z
      .lazy(() => FinAccountLineItemTagMapUncheckedCreateNestedManyWithoutTagInputSchema)
      .optional(),
  })
  .strict()

export const FinAccountTagUpdateInputSchema: z.ZodType<Prisma.FinAccountTagUpdateInput> = z
  .object({
    tag_userid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    tag_color: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    tag_label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    when_deleted: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    FinAccountLineItemTagMap: z.lazy(() => FinAccountLineItemTagMapUpdateManyWithoutTagNestedInputSchema).optional(),
  })
  .strict()

export const FinAccountTagUncheckedUpdateInputSchema: z.ZodType<Prisma.FinAccountTagUncheckedUpdateInput> = z
  .object({
    tag_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    tag_userid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    tag_color: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    tag_label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    when_deleted: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    FinAccountLineItemTagMap: z
      .lazy(() => FinAccountLineItemTagMapUncheckedUpdateManyWithoutTagNestedInputSchema)
      .optional(),
  })
  .strict()

export const FinAccountTagCreateManyInputSchema: z.ZodType<Prisma.FinAccountTagCreateManyInput> = z
  .object({
    tag_id: z.number().int().optional(),
    tag_userid: z.string(),
    tag_color: z.string(),
    tag_label: z.string(),
    when_added: z.coerce.date().optional(),
    when_deleted: z.coerce.date().optional().nullable(),
  })
  .strict()

export const FinAccountTagUpdateManyMutationInputSchema: z.ZodType<Prisma.FinAccountTagUpdateManyMutationInput> = z
  .object({
    tag_userid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    tag_color: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    tag_label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    when_deleted: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinAccountTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FinAccountTagUncheckedUpdateManyInput> = z
  .object({
    tag_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    tag_userid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    tag_color: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    tag_label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    when_deleted: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FinAccountLineItemTagMapCreateInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateInput> = z
  .object({
    when_added: z.coerce.date().optional(),
    when_deleted: z.coerce.date().optional().nullable(),
    transaction: z.lazy(() => FinAccountLineItemsCreateNestedOneWithoutTagsInputSchema),
    tag: z.lazy(() => FinAccountTagCreateNestedOneWithoutFinAccountLineItemTagMapInputSchema),
  })
  .strict()

export const FinAccountLineItemTagMapUncheckedCreateInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      when_added: z.coerce.date().optional(),
      when_deleted: z.coerce.date().optional().nullable(),
      t_id: z.number().int(),
      tag_id: z.number().int(),
    })
    .strict()

export const FinAccountLineItemTagMapUpdateInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpdateInput> = z
  .object({
    when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    when_deleted: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    transaction: z.lazy(() => FinAccountLineItemsUpdateOneRequiredWithoutTagsNestedInputSchema).optional(),
    tag: z.lazy(() => FinAccountTagUpdateOneRequiredWithoutFinAccountLineItemTagMapNestedInputSchema).optional(),
  })
  .strict()

export const FinAccountLineItemTagMapUncheckedUpdateInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUncheckedUpdateInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      tag_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapCreateManyInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateManyInput> = z
  .object({
    id: z.number().int().optional(),
    when_added: z.coerce.date().optional(),
    when_deleted: z.coerce.date().optional().nullable(),
    t_id: z.number().int(),
    tag_id: z.number().int(),
  })
  .strict()

export const FinAccountLineItemTagMapUpdateManyMutationInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpdateManyMutationInput> =
  z
    .object({
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const FinAccountLineItemTagMapUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUncheckedUpdateManyInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      tag_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    search: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
  })
  .strict()

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
  })
  .strict()

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    search: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
  })
  .strict()

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z
  .object({
    equals: z.boolean().optional().nullable(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z
  .object({
    every: z.lazy(() => AccountWhereInputSchema).optional(),
    some: z.lazy(() => AccountWhereInputSchema).optional(),
    none: z.lazy(() => AccountWhereInputSchema).optional(),
  })
  .strict()

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z
  .object({
    every: z.lazy(() => SessionWhereInputSchema).optional(),
    some: z.lazy(() => SessionWhereInputSchema).optional(),
    none: z.lazy(() => SessionWhereInputSchema).optional(),
  })
  .strict()

export const TwoFactorListRelationFilterSchema: z.ZodType<Prisma.TwoFactorListRelationFilter> = z
  .object({
    every: z.lazy(() => TwoFactorWhereInputSchema).optional(),
    some: z.lazy(() => TwoFactorWhereInputSchema).optional(),
    none: z.lazy(() => TwoFactorWhereInputSchema).optional(),
  })
  .strict()

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict()

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z
  .object({
    _count: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z
  .object({
    _count: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const TwoFactorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TwoFactorOrderByRelationAggregateInput> = z
  .object({
    _count: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const UserOrderByRelevanceInputSchema: z.ZodType<Prisma.UserOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => UserOrderByRelevanceFieldEnumSchema),
      z.lazy(() => UserOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
    username: z.lazy(() => SortOrderSchema).optional(),
    inviteCode: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
    username: z.lazy(() => SortOrderSchema).optional(),
    inviteCode: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
    username: z.lazy(() => SortOrderSchema).optional(),
    inviteCode: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    search: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  })
  .strict()

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
  })
  .strict()

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    search: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  })
  .strict()

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  })
  .strict()

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z
  .object({
    equals: z.boolean().optional().nullable(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  })
  .strict()

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z
  .object({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict()

export const SessionOrderByRelevanceInputSchema: z.ZodType<Prisma.SessionOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => SessionOrderByRelevanceFieldEnumSchema),
      z.lazy(() => SessionOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z.lazy(() => SortOrderSchema).optional(),
    userAgent: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z.lazy(() => SortOrderSchema).optional(),
    userAgent: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z.lazy(() => SortOrderSchema).optional(),
    userAgent: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z
  .object({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const AccountOrderByRelevanceInputSchema: z.ZodType<Prisma.AccountOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => AccountOrderByRelevanceFieldEnumSchema),
      z.lazy(() => AccountOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z.lazy(() => SortOrderSchema).optional(),
    refreshToken: z.lazy(() => SortOrderSchema).optional(),
    idToken: z.lazy(() => SortOrderSchema).optional(),
    accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    scope: z.lazy(() => SortOrderSchema).optional(),
    password: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z.lazy(() => SortOrderSchema).optional(),
    refreshToken: z.lazy(() => SortOrderSchema).optional(),
    idToken: z.lazy(() => SortOrderSchema).optional(),
    accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    scope: z.lazy(() => SortOrderSchema).optional(),
    password: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z.lazy(() => SortOrderSchema).optional(),
    refreshToken: z.lazy(() => SortOrderSchema).optional(),
    idToken: z.lazy(() => SortOrderSchema).optional(),
    accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    scope: z.lazy(() => SortOrderSchema).optional(),
    password: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z
  .object({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  })
  .strict()

export const VerificationOrderByRelevanceInputSchema: z.ZodType<Prisma.VerificationOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => VerificationOrderByRelevanceFieldEnumSchema),
      z.lazy(() => VerificationOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const VerificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const VerificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const VerificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const TwoFactorOrderByRelevanceInputSchema: z.ZodType<Prisma.TwoFactorOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => TwoFactorOrderByRelevanceFieldEnumSchema),
      z.lazy(() => TwoFactorOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const TwoFactorCountOrderByAggregateInputSchema: z.ZodType<Prisma.TwoFactorCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    secret: z.lazy(() => SortOrderSchema).optional(),
    backupCodes: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const TwoFactorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TwoFactorMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    secret: z.lazy(() => SortOrderSchema).optional(),
    backupCodes: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const TwoFactorMinOrderByAggregateInputSchema: z.ZodType<Prisma.TwoFactorMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    secret: z.lazy(() => SortOrderSchema).optional(),
    backupCodes: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict()

export const DecimalNullableFilterSchema: z.ZodType<Prisma.DecimalNullableFilter> = z
  .object({
    equals: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    in: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional()
      .nullable(),
    notIn: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional()
      .nullable(),
    lt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    lte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    not: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NestedDecimalNullableFilterSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const PhrLabResultOrderByRelevanceInputSchema: z.ZodType<Prisma.PhrLabResultOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => PhrLabResultOrderByRelevanceFieldEnumSchema),
      z.lazy(() => PhrLabResultOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const PhrLabResultCountOrderByAggregateInputSchema: z.ZodType<Prisma.PhrLabResultCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    testName: z.lazy(() => SortOrderSchema).optional(),
    collectionDatetime: z.lazy(() => SortOrderSchema).optional(),
    resultDatetime: z.lazy(() => SortOrderSchema).optional(),
    resultStatus: z.lazy(() => SortOrderSchema).optional(),
    orderingProvider: z.lazy(() => SortOrderSchema).optional(),
    resultingLab: z.lazy(() => SortOrderSchema).optional(),
    analyte: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    unit: z.lazy(() => SortOrderSchema).optional(),
    rangeMin: z.lazy(() => SortOrderSchema).optional(),
    rangeMax: z.lazy(() => SortOrderSchema).optional(),
    rangeUnit: z.lazy(() => SortOrderSchema).optional(),
    normalValue: z.lazy(() => SortOrderSchema).optional(),
    messageFromProvider: z.lazy(() => SortOrderSchema).optional(),
    resultComment: z.lazy(() => SortOrderSchema).optional(),
    labDirector: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const PhrLabResultAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PhrLabResultAvgOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    rangeMin: z.lazy(() => SortOrderSchema).optional(),
    rangeMax: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const PhrLabResultMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PhrLabResultMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    testName: z.lazy(() => SortOrderSchema).optional(),
    collectionDatetime: z.lazy(() => SortOrderSchema).optional(),
    resultDatetime: z.lazy(() => SortOrderSchema).optional(),
    resultStatus: z.lazy(() => SortOrderSchema).optional(),
    orderingProvider: z.lazy(() => SortOrderSchema).optional(),
    resultingLab: z.lazy(() => SortOrderSchema).optional(),
    analyte: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    unit: z.lazy(() => SortOrderSchema).optional(),
    rangeMin: z.lazy(() => SortOrderSchema).optional(),
    rangeMax: z.lazy(() => SortOrderSchema).optional(),
    rangeUnit: z.lazy(() => SortOrderSchema).optional(),
    normalValue: z.lazy(() => SortOrderSchema).optional(),
    messageFromProvider: z.lazy(() => SortOrderSchema).optional(),
    resultComment: z.lazy(() => SortOrderSchema).optional(),
    labDirector: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const PhrLabResultMinOrderByAggregateInputSchema: z.ZodType<Prisma.PhrLabResultMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    testName: z.lazy(() => SortOrderSchema).optional(),
    collectionDatetime: z.lazy(() => SortOrderSchema).optional(),
    resultDatetime: z.lazy(() => SortOrderSchema).optional(),
    resultStatus: z.lazy(() => SortOrderSchema).optional(),
    orderingProvider: z.lazy(() => SortOrderSchema).optional(),
    resultingLab: z.lazy(() => SortOrderSchema).optional(),
    analyte: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    unit: z.lazy(() => SortOrderSchema).optional(),
    rangeMin: z.lazy(() => SortOrderSchema).optional(),
    rangeMax: z.lazy(() => SortOrderSchema).optional(),
    rangeUnit: z.lazy(() => SortOrderSchema).optional(),
    normalValue: z.lazy(() => SortOrderSchema).optional(),
    messageFromProvider: z.lazy(() => SortOrderSchema).optional(),
    resultComment: z.lazy(() => SortOrderSchema).optional(),
    labDirector: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const PhrLabResultSumOrderByAggregateInputSchema: z.ZodType<Prisma.PhrLabResultSumOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    rangeMin: z.lazy(() => SortOrderSchema).optional(),
    rangeMax: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
  })
  .strict()

export const DecimalNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalNullableWithAggregatesFilter> = z
  .object({
    equals: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    in: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional()
      .nullable(),
    notIn: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional()
      .nullable(),
    lt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    lte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    not: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NestedDecimalNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _avg: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
    _sum: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
  })
  .strict()

export const ProductKeyOrderByRelevanceInputSchema: z.ZodType<Prisma.ProductKeyOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => ProductKeyOrderByRelevanceFieldEnumSchema),
      z.lazy(() => ProductKeyOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const ProductKeyCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductKeyCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    uid: z.lazy(() => SortOrderSchema).optional(),
    productId: z.lazy(() => SortOrderSchema).optional(),
    productKey: z.lazy(() => SortOrderSchema).optional(),
    productName: z.lazy(() => SortOrderSchema).optional(),
    computerName: z.lazy(() => SortOrderSchema).optional(),
    comment: z.lazy(() => SortOrderSchema).optional(),
    usedOn: z.lazy(() => SortOrderSchema).optional(),
    claimedDate: z.lazy(() => SortOrderSchema).optional(),
    keyType: z.lazy(() => SortOrderSchema).optional(),
    keyRetrievalNote: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const ProductKeyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductKeyAvgOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const ProductKeyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductKeyMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    uid: z.lazy(() => SortOrderSchema).optional(),
    productId: z.lazy(() => SortOrderSchema).optional(),
    productKey: z.lazy(() => SortOrderSchema).optional(),
    productName: z.lazy(() => SortOrderSchema).optional(),
    computerName: z.lazy(() => SortOrderSchema).optional(),
    comment: z.lazy(() => SortOrderSchema).optional(),
    usedOn: z.lazy(() => SortOrderSchema).optional(),
    claimedDate: z.lazy(() => SortOrderSchema).optional(),
    keyType: z.lazy(() => SortOrderSchema).optional(),
    keyRetrievalNote: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const ProductKeyMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductKeyMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    uid: z.lazy(() => SortOrderSchema).optional(),
    productId: z.lazy(() => SortOrderSchema).optional(),
    productKey: z.lazy(() => SortOrderSchema).optional(),
    productName: z.lazy(() => SortOrderSchema).optional(),
    computerName: z.lazy(() => SortOrderSchema).optional(),
    comment: z.lazy(() => SortOrderSchema).optional(),
    usedOn: z.lazy(() => SortOrderSchema).optional(),
    claimedDate: z.lazy(() => SortOrderSchema).optional(),
    keyType: z.lazy(() => SortOrderSchema).optional(),
    keyRetrievalNote: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const ProductKeySumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductKeySumOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinAccountsOrderByRelevanceInputSchema: z.ZodType<Prisma.FinAccountsOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => FinAccountsOrderByRelevanceFieldEnumSchema),
      z.lazy(() => FinAccountsOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const FinAccountsAcct_ownerAcct_nameCompoundUniqueInputSchema: z.ZodType<Prisma.FinAccountsAcct_ownerAcct_nameCompoundUniqueInput> =
  z
    .object({
      acct_owner: z.string(),
      acct_name: z.string(),
    })
    .strict()

export const FinAccountsCountOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountsCountOrderByAggregateInput> = z
  .object({
    acct_id: z.lazy(() => SortOrderSchema).optional(),
    acct_owner: z.lazy(() => SortOrderSchema).optional(),
    acct_name: z.lazy(() => SortOrderSchema).optional(),
    acct_last_balance: z.lazy(() => SortOrderSchema).optional(),
    acct_last_balance_date: z.lazy(() => SortOrderSchema).optional(),
    acct_is_debt: z.lazy(() => SortOrderSchema).optional(),
    acct_is_retirement: z.lazy(() => SortOrderSchema).optional(),
    acct_sort_order: z.lazy(() => SortOrderSchema).optional(),
    when_closed: z.lazy(() => SortOrderSchema).optional(),
    when_deleted: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinAccountsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountsAvgOrderByAggregateInput> = z
  .object({
    acct_id: z.lazy(() => SortOrderSchema).optional(),
    acct_sort_order: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinAccountsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountsMaxOrderByAggregateInput> = z
  .object({
    acct_id: z.lazy(() => SortOrderSchema).optional(),
    acct_owner: z.lazy(() => SortOrderSchema).optional(),
    acct_name: z.lazy(() => SortOrderSchema).optional(),
    acct_last_balance: z.lazy(() => SortOrderSchema).optional(),
    acct_last_balance_date: z.lazy(() => SortOrderSchema).optional(),
    acct_is_debt: z.lazy(() => SortOrderSchema).optional(),
    acct_is_retirement: z.lazy(() => SortOrderSchema).optional(),
    acct_sort_order: z.lazy(() => SortOrderSchema).optional(),
    when_closed: z.lazy(() => SortOrderSchema).optional(),
    when_deleted: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinAccountsMinOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountsMinOrderByAggregateInput> = z
  .object({
    acct_id: z.lazy(() => SortOrderSchema).optional(),
    acct_owner: z.lazy(() => SortOrderSchema).optional(),
    acct_name: z.lazy(() => SortOrderSchema).optional(),
    acct_last_balance: z.lazy(() => SortOrderSchema).optional(),
    acct_last_balance_date: z.lazy(() => SortOrderSchema).optional(),
    acct_is_debt: z.lazy(() => SortOrderSchema).optional(),
    acct_is_retirement: z.lazy(() => SortOrderSchema).optional(),
    acct_sort_order: z.lazy(() => SortOrderSchema).optional(),
    when_closed: z.lazy(() => SortOrderSchema).optional(),
    when_deleted: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinAccountsSumOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountsSumOrderByAggregateInput> = z
  .object({
    acct_id: z.lazy(() => SortOrderSchema).optional(),
    acct_sort_order: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
  })
  .strict()

export const Enumaccount_line_items_opt_typeNullableFilterSchema: z.ZodType<Prisma.Enumaccount_line_items_opt_typeNullableFilter> =
  z
    .object({
      equals: z
        .lazy(() => account_line_items_opt_typeSchema)
        .optional()
        .nullable(),
      in: z
        .lazy(() => account_line_items_opt_typeSchema)
        .array()
        .optional()
        .nullable(),
      notIn: z
        .lazy(() => account_line_items_opt_typeSchema)
        .array()
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => account_line_items_opt_typeSchema),
          z.lazy(() => NestedEnumaccount_line_items_opt_typeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict()

export const FinAccountLineItemTagMapListRelationFilterSchema: z.ZodType<Prisma.FinAccountLineItemTagMapListRelationFilter> =
  z
    .object({
      every: z.lazy(() => FinAccountLineItemTagMapWhereInputSchema).optional(),
      some: z.lazy(() => FinAccountLineItemTagMapWhereInputSchema).optional(),
      none: z.lazy(() => FinAccountLineItemTagMapWhereInputSchema).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountLineItemsOrderByRelevanceInputSchema: z.ZodType<Prisma.FinAccountLineItemsOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => FinAccountLineItemsOrderByRelevanceFieldEnumSchema),
      z.lazy(() => FinAccountLineItemsOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const FinAccountLineItemsCountOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountLineItemsCountOrderByAggregateInput> =
  z
    .object({
      t_id: z.lazy(() => SortOrderSchema).optional(),
      t_account: z.lazy(() => SortOrderSchema).optional(),
      t_date: z.lazy(() => SortOrderSchema).optional(),
      t_date_posted: z.lazy(() => SortOrderSchema).optional(),
      t_type: z.lazy(() => SortOrderSchema).optional(),
      t_schc_category: z.lazy(() => SortOrderSchema).optional(),
      t_amt: z.lazy(() => SortOrderSchema).optional(),
      t_symbol: z.lazy(() => SortOrderSchema).optional(),
      t_qty: z.lazy(() => SortOrderSchema).optional(),
      t_price: z.lazy(() => SortOrderSchema).optional(),
      t_commission: z.lazy(() => SortOrderSchema).optional(),
      t_fee: z.lazy(() => SortOrderSchema).optional(),
      t_method: z.lazy(() => SortOrderSchema).optional(),
      t_source: z.lazy(() => SortOrderSchema).optional(),
      t_origin: z.lazy(() => SortOrderSchema).optional(),
      opt_expiration: z.lazy(() => SortOrderSchema).optional(),
      opt_type: z.lazy(() => SortOrderSchema).optional(),
      opt_strike: z.lazy(() => SortOrderSchema).optional(),
      t_description: z.lazy(() => SortOrderSchema).optional(),
      t_comment: z.lazy(() => SortOrderSchema).optional(),
      t_from: z.lazy(() => SortOrderSchema).optional(),
      t_to: z.lazy(() => SortOrderSchema).optional(),
      t_interest_rate: z.lazy(() => SortOrderSchema).optional(),
      t_cusip: z.lazy(() => SortOrderSchema).optional(),
      t_harvested_amount: z.lazy(() => SortOrderSchema).optional(),
      parent_t_id: z.lazy(() => SortOrderSchema).optional(),
      when_added: z.lazy(() => SortOrderSchema).optional(),
      when_deleted: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountLineItemsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountLineItemsAvgOrderByAggregateInput> =
  z
    .object({
      t_id: z.lazy(() => SortOrderSchema).optional(),
      t_account: z.lazy(() => SortOrderSchema).optional(),
      t_amt: z.lazy(() => SortOrderSchema).optional(),
      t_qty: z.lazy(() => SortOrderSchema).optional(),
      t_price: z.lazy(() => SortOrderSchema).optional(),
      t_commission: z.lazy(() => SortOrderSchema).optional(),
      t_fee: z.lazy(() => SortOrderSchema).optional(),
      opt_strike: z.lazy(() => SortOrderSchema).optional(),
      t_harvested_amount: z.lazy(() => SortOrderSchema).optional(),
      parent_t_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountLineItemsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountLineItemsMaxOrderByAggregateInput> =
  z
    .object({
      t_id: z.lazy(() => SortOrderSchema).optional(),
      t_account: z.lazy(() => SortOrderSchema).optional(),
      t_date: z.lazy(() => SortOrderSchema).optional(),
      t_date_posted: z.lazy(() => SortOrderSchema).optional(),
      t_type: z.lazy(() => SortOrderSchema).optional(),
      t_schc_category: z.lazy(() => SortOrderSchema).optional(),
      t_amt: z.lazy(() => SortOrderSchema).optional(),
      t_symbol: z.lazy(() => SortOrderSchema).optional(),
      t_qty: z.lazy(() => SortOrderSchema).optional(),
      t_price: z.lazy(() => SortOrderSchema).optional(),
      t_commission: z.lazy(() => SortOrderSchema).optional(),
      t_fee: z.lazy(() => SortOrderSchema).optional(),
      t_method: z.lazy(() => SortOrderSchema).optional(),
      t_source: z.lazy(() => SortOrderSchema).optional(),
      t_origin: z.lazy(() => SortOrderSchema).optional(),
      opt_expiration: z.lazy(() => SortOrderSchema).optional(),
      opt_type: z.lazy(() => SortOrderSchema).optional(),
      opt_strike: z.lazy(() => SortOrderSchema).optional(),
      t_description: z.lazy(() => SortOrderSchema).optional(),
      t_comment: z.lazy(() => SortOrderSchema).optional(),
      t_from: z.lazy(() => SortOrderSchema).optional(),
      t_to: z.lazy(() => SortOrderSchema).optional(),
      t_interest_rate: z.lazy(() => SortOrderSchema).optional(),
      t_cusip: z.lazy(() => SortOrderSchema).optional(),
      t_harvested_amount: z.lazy(() => SortOrderSchema).optional(),
      parent_t_id: z.lazy(() => SortOrderSchema).optional(),
      when_added: z.lazy(() => SortOrderSchema).optional(),
      when_deleted: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountLineItemsMinOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountLineItemsMinOrderByAggregateInput> =
  z
    .object({
      t_id: z.lazy(() => SortOrderSchema).optional(),
      t_account: z.lazy(() => SortOrderSchema).optional(),
      t_date: z.lazy(() => SortOrderSchema).optional(),
      t_date_posted: z.lazy(() => SortOrderSchema).optional(),
      t_type: z.lazy(() => SortOrderSchema).optional(),
      t_schc_category: z.lazy(() => SortOrderSchema).optional(),
      t_amt: z.lazy(() => SortOrderSchema).optional(),
      t_symbol: z.lazy(() => SortOrderSchema).optional(),
      t_qty: z.lazy(() => SortOrderSchema).optional(),
      t_price: z.lazy(() => SortOrderSchema).optional(),
      t_commission: z.lazy(() => SortOrderSchema).optional(),
      t_fee: z.lazy(() => SortOrderSchema).optional(),
      t_method: z.lazy(() => SortOrderSchema).optional(),
      t_source: z.lazy(() => SortOrderSchema).optional(),
      t_origin: z.lazy(() => SortOrderSchema).optional(),
      opt_expiration: z.lazy(() => SortOrderSchema).optional(),
      opt_type: z.lazy(() => SortOrderSchema).optional(),
      opt_strike: z.lazy(() => SortOrderSchema).optional(),
      t_description: z.lazy(() => SortOrderSchema).optional(),
      t_comment: z.lazy(() => SortOrderSchema).optional(),
      t_from: z.lazy(() => SortOrderSchema).optional(),
      t_to: z.lazy(() => SortOrderSchema).optional(),
      t_interest_rate: z.lazy(() => SortOrderSchema).optional(),
      t_cusip: z.lazy(() => SortOrderSchema).optional(),
      t_harvested_amount: z.lazy(() => SortOrderSchema).optional(),
      parent_t_id: z.lazy(() => SortOrderSchema).optional(),
      when_added: z.lazy(() => SortOrderSchema).optional(),
      when_deleted: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountLineItemsSumOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountLineItemsSumOrderByAggregateInput> =
  z
    .object({
      t_id: z.lazy(() => SortOrderSchema).optional(),
      t_account: z.lazy(() => SortOrderSchema).optional(),
      t_amt: z.lazy(() => SortOrderSchema).optional(),
      t_qty: z.lazy(() => SortOrderSchema).optional(),
      t_price: z.lazy(() => SortOrderSchema).optional(),
      t_commission: z.lazy(() => SortOrderSchema).optional(),
      t_fee: z.lazy(() => SortOrderSchema).optional(),
      opt_strike: z.lazy(() => SortOrderSchema).optional(),
      t_harvested_amount: z.lazy(() => SortOrderSchema).optional(),
      parent_t_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  })
  .strict()

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
    _min: z.lazy(() => NestedFloatFilterSchema).optional(),
    _max: z.lazy(() => NestedFloatFilterSchema).optional(),
  })
  .strict()

export const Enumaccount_line_items_opt_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumaccount_line_items_opt_typeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z
        .lazy(() => account_line_items_opt_typeSchema)
        .optional()
        .nullable(),
      in: z
        .lazy(() => account_line_items_opt_typeSchema)
        .array()
        .optional()
        .nullable(),
      notIn: z
        .lazy(() => account_line_items_opt_typeSchema)
        .array()
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => account_line_items_opt_typeSchema),
          z.lazy(() => NestedEnumaccount_line_items_opt_typeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumaccount_line_items_opt_typeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumaccount_line_items_opt_typeNullableFilterSchema).optional(),
    })
    .strict()

export const FinAccountBalanceSnapshotOrderByRelevanceInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotOrderByRelevanceInput> =
  z
    .object({
      fields: z.union([
        z.lazy(() => FinAccountBalanceSnapshotOrderByRelevanceFieldEnumSchema),
        z.lazy(() => FinAccountBalanceSnapshotOrderByRelevanceFieldEnumSchema).array(),
      ]),
      sort: z.lazy(() => SortOrderSchema),
      search: z.string(),
    })
    .strict()

export const FinAccountBalanceSnapshotCountOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotCountOrderByAggregateInput> =
  z
    .object({
      snapshot_id: z.lazy(() => SortOrderSchema).optional(),
      acct_id: z.lazy(() => SortOrderSchema).optional(),
      balance: z.lazy(() => SortOrderSchema).optional(),
      when_added: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountBalanceSnapshotAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotAvgOrderByAggregateInput> =
  z
    .object({
      snapshot_id: z.lazy(() => SortOrderSchema).optional(),
      acct_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountBalanceSnapshotMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotMaxOrderByAggregateInput> =
  z
    .object({
      snapshot_id: z.lazy(() => SortOrderSchema).optional(),
      acct_id: z.lazy(() => SortOrderSchema).optional(),
      balance: z.lazy(() => SortOrderSchema).optional(),
      when_added: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountBalanceSnapshotMinOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotMinOrderByAggregateInput> =
  z
    .object({
      snapshot_id: z.lazy(() => SortOrderSchema).optional(),
      acct_id: z.lazy(() => SortOrderSchema).optional(),
      balance: z.lazy(() => SortOrderSchema).optional(),
      when_added: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountBalanceSnapshotSumOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotSumOrderByAggregateInput> =
  z
    .object({
      snapshot_id: z.lazy(() => SortOrderSchema).optional(),
      acct_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const EarningsAnnualOrderByRelevanceInputSchema: z.ZodType<Prisma.EarningsAnnualOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => EarningsAnnualOrderByRelevanceFieldEnumSchema),
      z.lazy(() => EarningsAnnualOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const EarningsAnnualSymbolFiscalDateEndingCompoundUniqueInputSchema: z.ZodType<Prisma.EarningsAnnualSymbolFiscalDateEndingCompoundUniqueInput> =
  z
    .object({
      symbol: z.string(),
      fiscalDateEnding: z.coerce.date(),
    })
    .strict()

export const EarningsAnnualCountOrderByAggregateInputSchema: z.ZodType<Prisma.EarningsAnnualCountOrderByAggregateInput> = z
  .object({
    symbol: z.lazy(() => SortOrderSchema).optional(),
    fiscalDateEnding: z.lazy(() => SortOrderSchema).optional(),
    reportedEPS: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const EarningsAnnualAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EarningsAnnualAvgOrderByAggregateInput> = z
  .object({
    reportedEPS: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const EarningsAnnualMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EarningsAnnualMaxOrderByAggregateInput> = z
  .object({
    symbol: z.lazy(() => SortOrderSchema).optional(),
    fiscalDateEnding: z.lazy(() => SortOrderSchema).optional(),
    reportedEPS: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const EarningsAnnualMinOrderByAggregateInputSchema: z.ZodType<Prisma.EarningsAnnualMinOrderByAggregateInput> = z
  .object({
    symbol: z.lazy(() => SortOrderSchema).optional(),
    fiscalDateEnding: z.lazy(() => SortOrderSchema).optional(),
    reportedEPS: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const EarningsAnnualSumOrderByAggregateInputSchema: z.ZodType<Prisma.EarningsAnnualSumOrderByAggregateInput> = z
  .object({
    reportedEPS: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const EarningsQuarterlyOrderByRelevanceInputSchema: z.ZodType<Prisma.EarningsQuarterlyOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => EarningsQuarterlyOrderByRelevanceFieldEnumSchema),
      z.lazy(() => EarningsQuarterlyOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const EarningsQuarterlySymbolFiscalDateEndingCompoundUniqueInputSchema: z.ZodType<Prisma.EarningsQuarterlySymbolFiscalDateEndingCompoundUniqueInput> =
  z
    .object({
      symbol: z.string(),
      fiscalDateEnding: z.coerce.date(),
    })
    .strict()

export const EarningsQuarterlyCountOrderByAggregateInputSchema: z.ZodType<Prisma.EarningsQuarterlyCountOrderByAggregateInput> =
  z
    .object({
      symbol: z.lazy(() => SortOrderSchema).optional(),
      fiscalDateEnding: z.lazy(() => SortOrderSchema).optional(),
      reportedDate: z.lazy(() => SortOrderSchema).optional(),
      reportedEPS: z.lazy(() => SortOrderSchema).optional(),
      estimatedEPS: z.lazy(() => SortOrderSchema).optional(),
      surprise: z.lazy(() => SortOrderSchema).optional(),
      surprisePercentage: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const EarningsQuarterlyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EarningsQuarterlyAvgOrderByAggregateInput> =
  z
    .object({
      reportedEPS: z.lazy(() => SortOrderSchema).optional(),
      estimatedEPS: z.lazy(() => SortOrderSchema).optional(),
      surprise: z.lazy(() => SortOrderSchema).optional(),
      surprisePercentage: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const EarningsQuarterlyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EarningsQuarterlyMaxOrderByAggregateInput> =
  z
    .object({
      symbol: z.lazy(() => SortOrderSchema).optional(),
      fiscalDateEnding: z.lazy(() => SortOrderSchema).optional(),
      reportedDate: z.lazy(() => SortOrderSchema).optional(),
      reportedEPS: z.lazy(() => SortOrderSchema).optional(),
      estimatedEPS: z.lazy(() => SortOrderSchema).optional(),
      surprise: z.lazy(() => SortOrderSchema).optional(),
      surprisePercentage: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const EarningsQuarterlyMinOrderByAggregateInputSchema: z.ZodType<Prisma.EarningsQuarterlyMinOrderByAggregateInput> =
  z
    .object({
      symbol: z.lazy(() => SortOrderSchema).optional(),
      fiscalDateEnding: z.lazy(() => SortOrderSchema).optional(),
      reportedDate: z.lazy(() => SortOrderSchema).optional(),
      reportedEPS: z.lazy(() => SortOrderSchema).optional(),
      estimatedEPS: z.lazy(() => SortOrderSchema).optional(),
      surprise: z.lazy(() => SortOrderSchema).optional(),
      surprisePercentage: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const EarningsQuarterlySumOrderByAggregateInputSchema: z.ZodType<Prisma.EarningsQuarterlySumOrderByAggregateInput> =
  z
    .object({
      reportedEPS: z.lazy(() => SortOrderSchema).optional(),
      estimatedEPS: z.lazy(() => SortOrderSchema).optional(),
      surprise: z.lazy(() => SortOrderSchema).optional(),
      surprisePercentage: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinEquityAwardsOrderByRelevanceInputSchema: z.ZodType<Prisma.FinEquityAwardsOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => FinEquityAwardsOrderByRelevanceFieldEnumSchema),
      z.lazy(() => FinEquityAwardsOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const FinEquityAwardsGrant_dateAward_idVest_dateSymbolCompoundUniqueInputSchema: z.ZodType<Prisma.FinEquityAwardsGrant_dateAward_idVest_dateSymbolCompoundUniqueInput> =
  z
    .object({
      grant_date: z.string(),
      award_id: z.string(),
      vest_date: z.string(),
      symbol: z.string(),
    })
    .strict()

export const FinEquityAwardsCountOrderByAggregateInputSchema: z.ZodType<Prisma.FinEquityAwardsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      award_id: z.lazy(() => SortOrderSchema).optional(),
      grant_date: z.lazy(() => SortOrderSchema).optional(),
      vest_date: z.lazy(() => SortOrderSchema).optional(),
      share_count: z.lazy(() => SortOrderSchema).optional(),
      symbol: z.lazy(() => SortOrderSchema).optional(),
      uid: z.lazy(() => SortOrderSchema).optional(),
      vest_price: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinEquityAwardsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FinEquityAwardsAvgOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    share_count: z.lazy(() => SortOrderSchema).optional(),
    vest_price: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinEquityAwardsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FinEquityAwardsMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    award_id: z.lazy(() => SortOrderSchema).optional(),
    grant_date: z.lazy(() => SortOrderSchema).optional(),
    vest_date: z.lazy(() => SortOrderSchema).optional(),
    share_count: z.lazy(() => SortOrderSchema).optional(),
    symbol: z.lazy(() => SortOrderSchema).optional(),
    uid: z.lazy(() => SortOrderSchema).optional(),
    vest_price: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinEquityAwardsMinOrderByAggregateInputSchema: z.ZodType<Prisma.FinEquityAwardsMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    award_id: z.lazy(() => SortOrderSchema).optional(),
    grant_date: z.lazy(() => SortOrderSchema).optional(),
    vest_date: z.lazy(() => SortOrderSchema).optional(),
    share_count: z.lazy(() => SortOrderSchema).optional(),
    symbol: z.lazy(() => SortOrderSchema).optional(),
    uid: z.lazy(() => SortOrderSchema).optional(),
    vest_price: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinEquityAwardsSumOrderByAggregateInputSchema: z.ZodType<Prisma.FinEquityAwardsSumOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    share_count: z.lazy(() => SortOrderSchema).optional(),
    vest_price: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const DecimalFilterSchema: z.ZodType<Prisma.DecimalFilter> = z
  .object({
    equals: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    in: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional(),
    notIn: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional(),
    lt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    lte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    not: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NestedDecimalFilterSchema),
      ])
      .optional(),
  })
  .strict()

export const FinPayslipsOrderByRelevanceInputSchema: z.ZodType<Prisma.FinPayslipsOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => FinPayslipsOrderByRelevanceFieldEnumSchema),
      z.lazy(() => FinPayslipsOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const FinPayslipsUidPeriod_startPeriod_endPay_dateCompoundUniqueInputSchema: z.ZodType<Prisma.FinPayslipsUidPeriod_startPeriod_endPay_dateCompoundUniqueInput> =
  z
    .object({
      uid: z.string(),
      period_start: z.string(),
      period_end: z.string(),
      pay_date: z.string(),
    })
    .strict()

export const FinPayslipsCountOrderByAggregateInputSchema: z.ZodType<Prisma.FinPayslipsCountOrderByAggregateInput> = z
  .object({
    payslip_id: z.lazy(() => SortOrderSchema).optional(),
    uid: z.lazy(() => SortOrderSchema).optional(),
    period_start: z.lazy(() => SortOrderSchema).optional(),
    period_end: z.lazy(() => SortOrderSchema).optional(),
    pay_date: z.lazy(() => SortOrderSchema).optional(),
    earnings_gross: z.lazy(() => SortOrderSchema).optional(),
    earnings_bonus: z.lazy(() => SortOrderSchema).optional(),
    earnings_net_pay: z.lazy(() => SortOrderSchema).optional(),
    earnings_rsu: z.lazy(() => SortOrderSchema).optional(),
    imp_other: z.lazy(() => SortOrderSchema).optional(),
    imp_legal: z.lazy(() => SortOrderSchema).optional(),
    imp_fitness: z.lazy(() => SortOrderSchema).optional(),
    imp_ltd: z.lazy(() => SortOrderSchema).optional(),
    ps_oasdi: z.lazy(() => SortOrderSchema).optional(),
    ps_medicare: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax_addl: z.lazy(() => SortOrderSchema).optional(),
    ps_state_tax: z.lazy(() => SortOrderSchema).optional(),
    ps_state_tax_addl: z.lazy(() => SortOrderSchema).optional(),
    ps_state_disability: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_pretax: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_aftertax: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_employer: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax_refunded: z.lazy(() => SortOrderSchema).optional(),
    ps_payslip_file_hash: z.lazy(() => SortOrderSchema).optional(),
    ps_is_estimated: z.lazy(() => SortOrderSchema).optional(),
    ps_comment: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_medical: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_fsa: z.lazy(() => SortOrderSchema).optional(),
    ps_salary: z.lazy(() => SortOrderSchema).optional(),
    ps_vacation_payout: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_dental: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_vision: z.lazy(() => SortOrderSchema).optional(),
    other: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinPayslipsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FinPayslipsAvgOrderByAggregateInput> = z
  .object({
    payslip_id: z.lazy(() => SortOrderSchema).optional(),
    earnings_gross: z.lazy(() => SortOrderSchema).optional(),
    earnings_bonus: z.lazy(() => SortOrderSchema).optional(),
    earnings_net_pay: z.lazy(() => SortOrderSchema).optional(),
    earnings_rsu: z.lazy(() => SortOrderSchema).optional(),
    imp_other: z.lazy(() => SortOrderSchema).optional(),
    imp_legal: z.lazy(() => SortOrderSchema).optional(),
    imp_fitness: z.lazy(() => SortOrderSchema).optional(),
    imp_ltd: z.lazy(() => SortOrderSchema).optional(),
    ps_oasdi: z.lazy(() => SortOrderSchema).optional(),
    ps_medicare: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax_addl: z.lazy(() => SortOrderSchema).optional(),
    ps_state_tax: z.lazy(() => SortOrderSchema).optional(),
    ps_state_tax_addl: z.lazy(() => SortOrderSchema).optional(),
    ps_state_disability: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_pretax: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_aftertax: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_employer: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax_refunded: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_medical: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_fsa: z.lazy(() => SortOrderSchema).optional(),
    ps_salary: z.lazy(() => SortOrderSchema).optional(),
    ps_vacation_payout: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_dental: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_vision: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinPayslipsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FinPayslipsMaxOrderByAggregateInput> = z
  .object({
    payslip_id: z.lazy(() => SortOrderSchema).optional(),
    uid: z.lazy(() => SortOrderSchema).optional(),
    period_start: z.lazy(() => SortOrderSchema).optional(),
    period_end: z.lazy(() => SortOrderSchema).optional(),
    pay_date: z.lazy(() => SortOrderSchema).optional(),
    earnings_gross: z.lazy(() => SortOrderSchema).optional(),
    earnings_bonus: z.lazy(() => SortOrderSchema).optional(),
    earnings_net_pay: z.lazy(() => SortOrderSchema).optional(),
    earnings_rsu: z.lazy(() => SortOrderSchema).optional(),
    imp_other: z.lazy(() => SortOrderSchema).optional(),
    imp_legal: z.lazy(() => SortOrderSchema).optional(),
    imp_fitness: z.lazy(() => SortOrderSchema).optional(),
    imp_ltd: z.lazy(() => SortOrderSchema).optional(),
    ps_oasdi: z.lazy(() => SortOrderSchema).optional(),
    ps_medicare: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax_addl: z.lazy(() => SortOrderSchema).optional(),
    ps_state_tax: z.lazy(() => SortOrderSchema).optional(),
    ps_state_tax_addl: z.lazy(() => SortOrderSchema).optional(),
    ps_state_disability: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_pretax: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_aftertax: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_employer: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax_refunded: z.lazy(() => SortOrderSchema).optional(),
    ps_payslip_file_hash: z.lazy(() => SortOrderSchema).optional(),
    ps_is_estimated: z.lazy(() => SortOrderSchema).optional(),
    ps_comment: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_medical: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_fsa: z.lazy(() => SortOrderSchema).optional(),
    ps_salary: z.lazy(() => SortOrderSchema).optional(),
    ps_vacation_payout: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_dental: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_vision: z.lazy(() => SortOrderSchema).optional(),
    other: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinPayslipsMinOrderByAggregateInputSchema: z.ZodType<Prisma.FinPayslipsMinOrderByAggregateInput> = z
  .object({
    payslip_id: z.lazy(() => SortOrderSchema).optional(),
    uid: z.lazy(() => SortOrderSchema).optional(),
    period_start: z.lazy(() => SortOrderSchema).optional(),
    period_end: z.lazy(() => SortOrderSchema).optional(),
    pay_date: z.lazy(() => SortOrderSchema).optional(),
    earnings_gross: z.lazy(() => SortOrderSchema).optional(),
    earnings_bonus: z.lazy(() => SortOrderSchema).optional(),
    earnings_net_pay: z.lazy(() => SortOrderSchema).optional(),
    earnings_rsu: z.lazy(() => SortOrderSchema).optional(),
    imp_other: z.lazy(() => SortOrderSchema).optional(),
    imp_legal: z.lazy(() => SortOrderSchema).optional(),
    imp_fitness: z.lazy(() => SortOrderSchema).optional(),
    imp_ltd: z.lazy(() => SortOrderSchema).optional(),
    ps_oasdi: z.lazy(() => SortOrderSchema).optional(),
    ps_medicare: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax_addl: z.lazy(() => SortOrderSchema).optional(),
    ps_state_tax: z.lazy(() => SortOrderSchema).optional(),
    ps_state_tax_addl: z.lazy(() => SortOrderSchema).optional(),
    ps_state_disability: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_pretax: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_aftertax: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_employer: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax_refunded: z.lazy(() => SortOrderSchema).optional(),
    ps_payslip_file_hash: z.lazy(() => SortOrderSchema).optional(),
    ps_is_estimated: z.lazy(() => SortOrderSchema).optional(),
    ps_comment: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_medical: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_fsa: z.lazy(() => SortOrderSchema).optional(),
    ps_salary: z.lazy(() => SortOrderSchema).optional(),
    ps_vacation_payout: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_dental: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_vision: z.lazy(() => SortOrderSchema).optional(),
    other: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinPayslipsSumOrderByAggregateInputSchema: z.ZodType<Prisma.FinPayslipsSumOrderByAggregateInput> = z
  .object({
    payslip_id: z.lazy(() => SortOrderSchema).optional(),
    earnings_gross: z.lazy(() => SortOrderSchema).optional(),
    earnings_bonus: z.lazy(() => SortOrderSchema).optional(),
    earnings_net_pay: z.lazy(() => SortOrderSchema).optional(),
    earnings_rsu: z.lazy(() => SortOrderSchema).optional(),
    imp_other: z.lazy(() => SortOrderSchema).optional(),
    imp_legal: z.lazy(() => SortOrderSchema).optional(),
    imp_fitness: z.lazy(() => SortOrderSchema).optional(),
    imp_ltd: z.lazy(() => SortOrderSchema).optional(),
    ps_oasdi: z.lazy(() => SortOrderSchema).optional(),
    ps_medicare: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax_addl: z.lazy(() => SortOrderSchema).optional(),
    ps_state_tax: z.lazy(() => SortOrderSchema).optional(),
    ps_state_tax_addl: z.lazy(() => SortOrderSchema).optional(),
    ps_state_disability: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_pretax: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_aftertax: z.lazy(() => SortOrderSchema).optional(),
    ps_401k_employer: z.lazy(() => SortOrderSchema).optional(),
    ps_fed_tax_refunded: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_medical: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_fsa: z.lazy(() => SortOrderSchema).optional(),
    ps_salary: z.lazy(() => SortOrderSchema).optional(),
    ps_vacation_payout: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_dental: z.lazy(() => SortOrderSchema).optional(),
    ps_pretax_vision: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const DecimalWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalWithAggregatesFilter> = z
  .object({
    equals: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    in: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional(),
    notIn: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional(),
    lt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    lte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    not: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NestedDecimalWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
    _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
    _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
    _max: z.lazy(() => NestedDecimalFilterSchema).optional(),
  })
  .strict()

export const FinPayslipUploadsOrderByRelevanceInputSchema: z.ZodType<Prisma.FinPayslipUploadsOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => FinPayslipUploadsOrderByRelevanceFieldEnumSchema),
      z.lazy(() => FinPayslipUploadsOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const FinPayslipUploadsCountOrderByAggregateInputSchema: z.ZodType<Prisma.FinPayslipUploadsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      file_name: z.lazy(() => SortOrderSchema).optional(),
      file_hash: z.lazy(() => SortOrderSchema).optional(),
      parsed_json: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinPayslipUploadsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FinPayslipUploadsAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinPayslipUploadsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FinPayslipUploadsMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      file_name: z.lazy(() => SortOrderSchema).optional(),
      file_hash: z.lazy(() => SortOrderSchema).optional(),
      parsed_json: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinPayslipUploadsMinOrderByAggregateInputSchema: z.ZodType<Prisma.FinPayslipUploadsMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      file_name: z.lazy(() => SortOrderSchema).optional(),
      file_hash: z.lazy(() => SortOrderSchema).optional(),
      parsed_json: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinPayslipUploadsSumOrderByAggregateInputSchema: z.ZodType<Prisma.FinPayslipUploadsSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const Enumgraduated_tax_typeFilterSchema: z.ZodType<Prisma.Enumgraduated_tax_typeFilter> = z
  .object({
    equals: z.lazy(() => graduated_tax_typeSchema).optional(),
    in: z
      .lazy(() => graduated_tax_typeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => graduated_tax_typeSchema)
      .array()
      .optional(),
    not: z
      .union([z.lazy(() => graduated_tax_typeSchema), z.lazy(() => NestedEnumgraduated_tax_typeFilterSchema)])
      .optional(),
  })
  .strict()

export const GraduatedTaxOrderByRelevanceInputSchema: z.ZodType<Prisma.GraduatedTaxOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => GraduatedTaxOrderByRelevanceFieldEnumSchema),
      z.lazy(() => GraduatedTaxOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const GraduatedTaxYearRegionIncome_overTypeCompoundUniqueInputSchema: z.ZodType<Prisma.GraduatedTaxYearRegionIncome_overTypeCompoundUniqueInput> =
  z
    .object({
      year: z.number(),
      region: z.string(),
      income_over: z.number(),
      type: z.lazy(() => graduated_tax_typeSchema),
    })
    .strict()

export const GraduatedTaxCountOrderByAggregateInputSchema: z.ZodType<Prisma.GraduatedTaxCountOrderByAggregateInput> = z
  .object({
    year: z.lazy(() => SortOrderSchema).optional(),
    region: z.lazy(() => SortOrderSchema).optional(),
    income_over: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    rate: z.lazy(() => SortOrderSchema).optional(),
    verified: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const GraduatedTaxAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GraduatedTaxAvgOrderByAggregateInput> = z
  .object({
    year: z.lazy(() => SortOrderSchema).optional(),
    income_over: z.lazy(() => SortOrderSchema).optional(),
    rate: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const GraduatedTaxMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GraduatedTaxMaxOrderByAggregateInput> = z
  .object({
    year: z.lazy(() => SortOrderSchema).optional(),
    region: z.lazy(() => SortOrderSchema).optional(),
    income_over: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    rate: z.lazy(() => SortOrderSchema).optional(),
    verified: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const GraduatedTaxMinOrderByAggregateInputSchema: z.ZodType<Prisma.GraduatedTaxMinOrderByAggregateInput> = z
  .object({
    year: z.lazy(() => SortOrderSchema).optional(),
    region: z.lazy(() => SortOrderSchema).optional(),
    income_over: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    rate: z.lazy(() => SortOrderSchema).optional(),
    verified: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const GraduatedTaxSumOrderByAggregateInputSchema: z.ZodType<Prisma.GraduatedTaxSumOrderByAggregateInput> = z
  .object({
    year: z.lazy(() => SortOrderSchema).optional(),
    income_over: z.lazy(() => SortOrderSchema).optional(),
    rate: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const Enumgraduated_tax_typeWithAggregatesFilterSchema: z.ZodType<Prisma.Enumgraduated_tax_typeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => graduated_tax_typeSchema).optional(),
      in: z
        .lazy(() => graduated_tax_typeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => graduated_tax_typeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => graduated_tax_typeSchema),
          z.lazy(() => NestedEnumgraduated_tax_typeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumgraduated_tax_typeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumgraduated_tax_typeFilterSchema).optional(),
    })
    .strict()

export const PHRPatientVitalsOrderByRelevanceInputSchema: z.ZodType<Prisma.PHRPatientVitalsOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => PHRPatientVitalsOrderByRelevanceFieldEnumSchema),
      z.lazy(() => PHRPatientVitalsOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const PHRPatientVitalsCountOrderByAggregateInputSchema: z.ZodType<Prisma.PHRPatientVitalsCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      user_id: z.lazy(() => SortOrderSchema).optional(),
      vital_name: z.lazy(() => SortOrderSchema).optional(),
      vital_date: z.lazy(() => SortOrderSchema).optional(),
      vital_value: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const PHRPatientVitalsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PHRPatientVitalsAvgOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const PHRPatientVitalsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PHRPatientVitalsMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    user_id: z.lazy(() => SortOrderSchema).optional(),
    vital_name: z.lazy(() => SortOrderSchema).optional(),
    vital_date: z.lazy(() => SortOrderSchema).optional(),
    vital_value: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const PHRPatientVitalsMinOrderByAggregateInputSchema: z.ZodType<Prisma.PHRPatientVitalsMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    user_id: z.lazy(() => SortOrderSchema).optional(),
    vital_name: z.lazy(() => SortOrderSchema).optional(),
    vital_date: z.lazy(() => SortOrderSchema).optional(),
    vital_value: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const PHRPatientVitalsSumOrderByAggregateInputSchema: z.ZodType<Prisma.PHRPatientVitalsSumOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const BigIntFilterSchema: z.ZodType<Prisma.BigIntFilter> = z
  .object({
    equals: z.bigint().optional(),
    in: z.bigint().array().optional(),
    notIn: z.bigint().array().optional(),
    lt: z.bigint().optional(),
    lte: z.bigint().optional(),
    gt: z.bigint().optional(),
    gte: z.bigint().optional(),
    not: z.union([z.bigint(), z.lazy(() => NestedBigIntFilterSchema)]).optional(),
  })
  .strict()

export const StockQuotesDailyOrderByRelevanceInputSchema: z.ZodType<Prisma.StockQuotesDailyOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => StockQuotesDailyOrderByRelevanceFieldEnumSchema),
      z.lazy(() => StockQuotesDailyOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const StockQuotesDailyC_symbC_dateCompoundUniqueInputSchema: z.ZodType<Prisma.StockQuotesDailyC_symbC_dateCompoundUniqueInput> =
  z
    .object({
      c_symb: z.string(),
      c_date: z.coerce.date(),
    })
    .strict()

export const StockQuotesDailyCountOrderByAggregateInputSchema: z.ZodType<Prisma.StockQuotesDailyCountOrderByAggregateInput> =
  z
    .object({
      c_date: z.lazy(() => SortOrderSchema).optional(),
      c_symb: z.lazy(() => SortOrderSchema).optional(),
      c_open: z.lazy(() => SortOrderSchema).optional(),
      c_high: z.lazy(() => SortOrderSchema).optional(),
      c_low: z.lazy(() => SortOrderSchema).optional(),
      c_close: z.lazy(() => SortOrderSchema).optional(),
      c_vol: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const StockQuotesDailyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StockQuotesDailyAvgOrderByAggregateInput> = z
  .object({
    c_open: z.lazy(() => SortOrderSchema).optional(),
    c_high: z.lazy(() => SortOrderSchema).optional(),
    c_low: z.lazy(() => SortOrderSchema).optional(),
    c_close: z.lazy(() => SortOrderSchema).optional(),
    c_vol: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const StockQuotesDailyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StockQuotesDailyMaxOrderByAggregateInput> = z
  .object({
    c_date: z.lazy(() => SortOrderSchema).optional(),
    c_symb: z.lazy(() => SortOrderSchema).optional(),
    c_open: z.lazy(() => SortOrderSchema).optional(),
    c_high: z.lazy(() => SortOrderSchema).optional(),
    c_low: z.lazy(() => SortOrderSchema).optional(),
    c_close: z.lazy(() => SortOrderSchema).optional(),
    c_vol: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const StockQuotesDailyMinOrderByAggregateInputSchema: z.ZodType<Prisma.StockQuotesDailyMinOrderByAggregateInput> = z
  .object({
    c_date: z.lazy(() => SortOrderSchema).optional(),
    c_symb: z.lazy(() => SortOrderSchema).optional(),
    c_open: z.lazy(() => SortOrderSchema).optional(),
    c_high: z.lazy(() => SortOrderSchema).optional(),
    c_low: z.lazy(() => SortOrderSchema).optional(),
    c_close: z.lazy(() => SortOrderSchema).optional(),
    c_vol: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const StockQuotesDailySumOrderByAggregateInputSchema: z.ZodType<Prisma.StockQuotesDailySumOrderByAggregateInput> = z
  .object({
    c_open: z.lazy(() => SortOrderSchema).optional(),
    c_high: z.lazy(() => SortOrderSchema).optional(),
    c_low: z.lazy(() => SortOrderSchema).optional(),
    c_close: z.lazy(() => SortOrderSchema).optional(),
    c_vol: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const BigIntWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntWithAggregatesFilter> = z
  .object({
    equals: z.bigint().optional(),
    in: z.bigint().array().optional(),
    notIn: z.bigint().array().optional(),
    lt: z.bigint().optional(),
    lte: z.bigint().optional(),
    gt: z.bigint().optional(),
    gte: z.bigint().optional(),
    not: z.union([z.bigint(), z.lazy(() => NestedBigIntWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
    _max: z.lazy(() => NestedBigIntFilterSchema).optional(),
  })
  .strict()

export const TimeSeriesSeriesScalarRelationFilterSchema: z.ZodType<Prisma.TimeSeriesSeriesScalarRelationFilter> = z
  .object({
    is: z.lazy(() => TimeSeriesSeriesWhereInputSchema).optional(),
    isNot: z.lazy(() => TimeSeriesSeriesWhereInputSchema).optional(),
  })
  .strict()

export const TimeSeriesDatapointOrderByRelevanceInputSchema: z.ZodType<Prisma.TimeSeriesDatapointOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => TimeSeriesDatapointOrderByRelevanceFieldEnumSchema),
      z.lazy(() => TimeSeriesDatapointOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const TimeSeriesDatapointCountOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesDatapointCountOrderByAggregateInput> =
  z
    .object({
      dp_id: z.lazy(() => SortOrderSchema).optional(),
      dp_series_id: z.lazy(() => SortOrderSchema).optional(),
      dp_date: z.lazy(() => SortOrderSchema).optional(),
      dp_value: z.lazy(() => SortOrderSchema).optional(),
      dp_comment: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const TimeSeriesDatapointAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesDatapointAvgOrderByAggregateInput> =
  z
    .object({
      dp_id: z.lazy(() => SortOrderSchema).optional(),
      dp_series_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const TimeSeriesDatapointMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesDatapointMaxOrderByAggregateInput> =
  z
    .object({
      dp_id: z.lazy(() => SortOrderSchema).optional(),
      dp_series_id: z.lazy(() => SortOrderSchema).optional(),
      dp_date: z.lazy(() => SortOrderSchema).optional(),
      dp_value: z.lazy(() => SortOrderSchema).optional(),
      dp_comment: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const TimeSeriesDatapointMinOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesDatapointMinOrderByAggregateInput> =
  z
    .object({
      dp_id: z.lazy(() => SortOrderSchema).optional(),
      dp_series_id: z.lazy(() => SortOrderSchema).optional(),
      dp_date: z.lazy(() => SortOrderSchema).optional(),
      dp_value: z.lazy(() => SortOrderSchema).optional(),
      dp_comment: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const TimeSeriesDatapointSumOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesDatapointSumOrderByAggregateInput> =
  z
    .object({
      dp_id: z.lazy(() => SortOrderSchema).optional(),
      dp_series_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const TimeSeriesSeriesListRelationFilterSchema: z.ZodType<Prisma.TimeSeriesSeriesListRelationFilter> = z
  .object({
    every: z.lazy(() => TimeSeriesSeriesWhereInputSchema).optional(),
    some: z.lazy(() => TimeSeriesSeriesWhereInputSchema).optional(),
    none: z.lazy(() => TimeSeriesSeriesWhereInputSchema).optional(),
  })
  .strict()

export const TimeSeriesSeriesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TimeSeriesSeriesOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const TimeSeriesDocumentOrderByRelevanceInputSchema: z.ZodType<Prisma.TimeSeriesDocumentOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => TimeSeriesDocumentOrderByRelevanceFieldEnumSchema),
      z.lazy(() => TimeSeriesDocumentOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const TimeSeriesDocumentCountOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesDocumentCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      uid: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const TimeSeriesDocumentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesDocumentAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      uid: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const TimeSeriesDocumentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesDocumentMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      uid: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const TimeSeriesDocumentMinOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesDocumentMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      uid: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const TimeSeriesDocumentSumOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesDocumentSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      uid: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const TimeSeriesDatapointListRelationFilterSchema: z.ZodType<Prisma.TimeSeriesDatapointListRelationFilter> = z
  .object({
    every: z.lazy(() => TimeSeriesDatapointWhereInputSchema).optional(),
    some: z.lazy(() => TimeSeriesDatapointWhereInputSchema).optional(),
    none: z.lazy(() => TimeSeriesDatapointWhereInputSchema).optional(),
  })
  .strict()

export const TimeSeriesDocumentScalarRelationFilterSchema: z.ZodType<Prisma.TimeSeriesDocumentScalarRelationFilter> = z
  .object({
    is: z.lazy(() => TimeSeriesDocumentWhereInputSchema).optional(),
    isNot: z.lazy(() => TimeSeriesDocumentWhereInputSchema).optional(),
  })
  .strict()

export const TimeSeriesDatapointOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TimeSeriesDatapointOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const TimeSeriesSeriesOrderByRelevanceInputSchema: z.ZodType<Prisma.TimeSeriesSeriesOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => TimeSeriesSeriesOrderByRelevanceFieldEnumSchema),
      z.lazy(() => TimeSeriesSeriesOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const TimeSeriesSeriesCountOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesSeriesCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      document_id: z.lazy(() => SortOrderSchema).optional(),
      series_name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const TimeSeriesSeriesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesSeriesAvgOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    document_id: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const TimeSeriesSeriesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesSeriesMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    document_id: z.lazy(() => SortOrderSchema).optional(),
    series_name: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const TimeSeriesSeriesMinOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesSeriesMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    document_id: z.lazy(() => SortOrderSchema).optional(),
    series_name: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const TimeSeriesSeriesSumOrderByAggregateInputSchema: z.ZodType<Prisma.TimeSeriesSeriesSumOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    document_id: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const UsersLegacyOrderByRelevanceInputSchema: z.ZodType<Prisma.UsersLegacyOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => UsersLegacyOrderByRelevanceFieldEnumSchema),
      z.lazy(() => UsersLegacyOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const UsersLegacyCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsersLegacyCountOrderByAggregateInput> = z
  .object({
    uid: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    pw: z.lazy(() => SortOrderSchema).optional(),
    salt: z.lazy(() => SortOrderSchema).optional(),
    alias: z.lazy(() => SortOrderSchema).optional(),
    ax_maxmin: z.lazy(() => SortOrderSchema).optional(),
    ax_homes: z.lazy(() => SortOrderSchema).optional(),
    ax_tax: z.lazy(() => SortOrderSchema).optional(),
    ax_evdb: z.lazy(() => SortOrderSchema).optional(),
    ax_spgp: z.lazy(() => SortOrderSchema).optional(),
    ax_phr: z.lazy(() => SortOrderSchema).optional(),
    reset_token: z.lazy(() => SortOrderSchema).optional(),
    reset_requested_at: z.lazy(() => SortOrderSchema).optional(),
    passkey_credential_id: z.lazy(() => SortOrderSchema).optional(),
    passkey_public_key: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const UsersLegacyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UsersLegacyAvgOrderByAggregateInput> = z
  .object({
    uid: z.lazy(() => SortOrderSchema).optional(),
    salt: z.lazy(() => SortOrderSchema).optional(),
    ax_phr: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const UsersLegacyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsersLegacyMaxOrderByAggregateInput> = z
  .object({
    uid: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    pw: z.lazy(() => SortOrderSchema).optional(),
    salt: z.lazy(() => SortOrderSchema).optional(),
    alias: z.lazy(() => SortOrderSchema).optional(),
    ax_maxmin: z.lazy(() => SortOrderSchema).optional(),
    ax_homes: z.lazy(() => SortOrderSchema).optional(),
    ax_tax: z.lazy(() => SortOrderSchema).optional(),
    ax_evdb: z.lazy(() => SortOrderSchema).optional(),
    ax_spgp: z.lazy(() => SortOrderSchema).optional(),
    ax_phr: z.lazy(() => SortOrderSchema).optional(),
    reset_token: z.lazy(() => SortOrderSchema).optional(),
    reset_requested_at: z.lazy(() => SortOrderSchema).optional(),
    passkey_credential_id: z.lazy(() => SortOrderSchema).optional(),
    passkey_public_key: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const UsersLegacyMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsersLegacyMinOrderByAggregateInput> = z
  .object({
    uid: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    pw: z.lazy(() => SortOrderSchema).optional(),
    salt: z.lazy(() => SortOrderSchema).optional(),
    alias: z.lazy(() => SortOrderSchema).optional(),
    ax_maxmin: z.lazy(() => SortOrderSchema).optional(),
    ax_homes: z.lazy(() => SortOrderSchema).optional(),
    ax_tax: z.lazy(() => SortOrderSchema).optional(),
    ax_evdb: z.lazy(() => SortOrderSchema).optional(),
    ax_spgp: z.lazy(() => SortOrderSchema).optional(),
    ax_phr: z.lazy(() => SortOrderSchema).optional(),
    reset_token: z.lazy(() => SortOrderSchema).optional(),
    reset_requested_at: z.lazy(() => SortOrderSchema).optional(),
    passkey_credential_id: z.lazy(() => SortOrderSchema).optional(),
    passkey_public_key: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const UsersLegacySumOrderByAggregateInputSchema: z.ZodType<Prisma.UsersLegacySumOrderByAggregateInput> = z
  .object({
    uid: z.lazy(() => SortOrderSchema).optional(),
    salt: z.lazy(() => SortOrderSchema).optional(),
    ax_phr: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const BytesFilterSchema: z.ZodType<Prisma.BytesFilter> = z
  .object({
    equals: z.instanceof(Buffer).optional(),
    in: z.instanceof(Buffer).array().optional(),
    notIn: z.instanceof(Buffer).array().optional(),
    not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesFilterSchema)]).optional(),
  })
  .strict()

export const VXCVFilesOrderByRelevanceInputSchema: z.ZodType<Prisma.VXCVFilesOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => VXCVFilesOrderByRelevanceFieldEnumSchema),
      z.lazy(() => VXCVFilesOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const VXCVFilesCountOrderByAggregateInputSchema: z.ZodType<Prisma.VXCVFilesCountOrderByAggregateInput> = z
  .object({
    hash: z.lazy(() => SortOrderSchema).optional(),
    filename: z.lazy(() => SortOrderSchema).optional(),
    mime: z.lazy(() => SortOrderSchema).optional(),
    downloads: z.lazy(() => SortOrderSchema).optional(),
    max_downloads: z.lazy(() => SortOrderSchema).optional(),
    size: z.lazy(() => SortOrderSchema).optional(),
    uploaded: z.lazy(() => SortOrderSchema).optional(),
    blocked: z.lazy(() => SortOrderSchema).optional(),
    ip: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const VXCVFilesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.VXCVFilesAvgOrderByAggregateInput> = z
  .object({
    downloads: z.lazy(() => SortOrderSchema).optional(),
    max_downloads: z.lazy(() => SortOrderSchema).optional(),
    size: z.lazy(() => SortOrderSchema).optional(),
    blocked: z.lazy(() => SortOrderSchema).optional(),
    ip: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const VXCVFilesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VXCVFilesMaxOrderByAggregateInput> = z
  .object({
    hash: z.lazy(() => SortOrderSchema).optional(),
    filename: z.lazy(() => SortOrderSchema).optional(),
    mime: z.lazy(() => SortOrderSchema).optional(),
    downloads: z.lazy(() => SortOrderSchema).optional(),
    max_downloads: z.lazy(() => SortOrderSchema).optional(),
    size: z.lazy(() => SortOrderSchema).optional(),
    uploaded: z.lazy(() => SortOrderSchema).optional(),
    blocked: z.lazy(() => SortOrderSchema).optional(),
    ip: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const VXCVFilesMinOrderByAggregateInputSchema: z.ZodType<Prisma.VXCVFilesMinOrderByAggregateInput> = z
  .object({
    hash: z.lazy(() => SortOrderSchema).optional(),
    filename: z.lazy(() => SortOrderSchema).optional(),
    mime: z.lazy(() => SortOrderSchema).optional(),
    downloads: z.lazy(() => SortOrderSchema).optional(),
    max_downloads: z.lazy(() => SortOrderSchema).optional(),
    size: z.lazy(() => SortOrderSchema).optional(),
    uploaded: z.lazy(() => SortOrderSchema).optional(),
    blocked: z.lazy(() => SortOrderSchema).optional(),
    ip: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const VXCVFilesSumOrderByAggregateInputSchema: z.ZodType<Prisma.VXCVFilesSumOrderByAggregateInput> = z
  .object({
    downloads: z.lazy(() => SortOrderSchema).optional(),
    max_downloads: z.lazy(() => SortOrderSchema).optional(),
    size: z.lazy(() => SortOrderSchema).optional(),
    blocked: z.lazy(() => SortOrderSchema).optional(),
    ip: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const BytesWithAggregatesFilterSchema: z.ZodType<Prisma.BytesWithAggregatesFilter> = z
  .object({
    equals: z.instanceof(Buffer).optional(),
    in: z.instanceof(Buffer).array().optional(),
    notIn: z.instanceof(Buffer).array().optional(),
    not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBytesFilterSchema).optional(),
    _max: z.lazy(() => NestedBytesFilterSchema).optional(),
  })
  .strict()

export const VXCVLinksOrderByRelevanceInputSchema: z.ZodType<Prisma.VXCVLinksOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => VXCVLinksOrderByRelevanceFieldEnumSchema),
      z.lazy(() => VXCVLinksOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const VXCVLinksCountOrderByAggregateInputSchema: z.ZodType<Prisma.VXCVLinksCountOrderByAggregateInput> = z
  .object({
    uniqueid: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const VXCVLinksMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VXCVLinksMaxOrderByAggregateInput> = z
  .object({
    uniqueid: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const VXCVLinksMinOrderByAggregateInputSchema: z.ZodType<Prisma.VXCVLinksMinOrderByAggregateInput> = z
  .object({
    uniqueid: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const AccountLineItemTagOrderByRelevanceInputSchema: z.ZodType<Prisma.AccountLineItemTagOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => AccountLineItemTagOrderByRelevanceFieldEnumSchema),
      z.lazy(() => AccountLineItemTagOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const AccountLineItemTagTag_useridTag_labelCompoundUniqueInputSchema: z.ZodType<Prisma.AccountLineItemTagTag_useridTag_labelCompoundUniqueInput> =
  z
    .object({
      tag_userid: z.string(),
      tag_label: z.string(),
    })
    .strict()

export const AccountLineItemTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountLineItemTagCountOrderByAggregateInput> =
  z
    .object({
      tag_id: z.lazy(() => SortOrderSchema).optional(),
      tag_userid: z.lazy(() => SortOrderSchema).optional(),
      tag_color: z.lazy(() => SortOrderSchema).optional(),
      tag_label: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const AccountLineItemTagAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountLineItemTagAvgOrderByAggregateInput> =
  z
    .object({
      tag_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const AccountLineItemTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountLineItemTagMaxOrderByAggregateInput> =
  z
    .object({
      tag_id: z.lazy(() => SortOrderSchema).optional(),
      tag_userid: z.lazy(() => SortOrderSchema).optional(),
      tag_color: z.lazy(() => SortOrderSchema).optional(),
      tag_label: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const AccountLineItemTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountLineItemTagMinOrderByAggregateInput> =
  z
    .object({
      tag_id: z.lazy(() => SortOrderSchema).optional(),
      tag_userid: z.lazy(() => SortOrderSchema).optional(),
      tag_color: z.lazy(() => SortOrderSchema).optional(),
      tag_label: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const AccountLineItemTagSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountLineItemTagSumOrderByAggregateInput> =
  z
    .object({
      tag_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountTagOrderByRelevanceInputSchema: z.ZodType<Prisma.FinAccountTagOrderByRelevanceInput> = z
  .object({
    fields: z.union([
      z.lazy(() => FinAccountTagOrderByRelevanceFieldEnumSchema),
      z.lazy(() => FinAccountTagOrderByRelevanceFieldEnumSchema).array(),
    ]),
    sort: z.lazy(() => SortOrderSchema),
    search: z.string(),
  })
  .strict()

export const FinAccountTagTag_useridTag_labelCompoundUniqueInputSchema: z.ZodType<Prisma.FinAccountTagTag_useridTag_labelCompoundUniqueInput> =
  z
    .object({
      tag_userid: z.string(),
      tag_label: z.string(),
    })
    .strict()

export const FinAccountTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountTagCountOrderByAggregateInput> = z
  .object({
    tag_id: z.lazy(() => SortOrderSchema).optional(),
    tag_userid: z.lazy(() => SortOrderSchema).optional(),
    tag_color: z.lazy(() => SortOrderSchema).optional(),
    tag_label: z.lazy(() => SortOrderSchema).optional(),
    when_added: z.lazy(() => SortOrderSchema).optional(),
    when_deleted: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinAccountTagAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountTagAvgOrderByAggregateInput> = z
  .object({
    tag_id: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinAccountTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountTagMaxOrderByAggregateInput> = z
  .object({
    tag_id: z.lazy(() => SortOrderSchema).optional(),
    tag_userid: z.lazy(() => SortOrderSchema).optional(),
    tag_color: z.lazy(() => SortOrderSchema).optional(),
    tag_label: z.lazy(() => SortOrderSchema).optional(),
    when_added: z.lazy(() => SortOrderSchema).optional(),
    when_deleted: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinAccountTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountTagMinOrderByAggregateInput> = z
  .object({
    tag_id: z.lazy(() => SortOrderSchema).optional(),
    tag_userid: z.lazy(() => SortOrderSchema).optional(),
    tag_color: z.lazy(() => SortOrderSchema).optional(),
    tag_label: z.lazy(() => SortOrderSchema).optional(),
    when_added: z.lazy(() => SortOrderSchema).optional(),
    when_deleted: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinAccountTagSumOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountTagSumOrderByAggregateInput> = z
  .object({
    tag_id: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const FinAccountLineItemsScalarRelationFilterSchema: z.ZodType<Prisma.FinAccountLineItemsScalarRelationFilter> = z
  .object({
    is: z.lazy(() => FinAccountLineItemsWhereInputSchema).optional(),
    isNot: z.lazy(() => FinAccountLineItemsWhereInputSchema).optional(),
  })
  .strict()

export const FinAccountTagScalarRelationFilterSchema: z.ZodType<Prisma.FinAccountTagScalarRelationFilter> = z
  .object({
    is: z.lazy(() => FinAccountTagWhereInputSchema).optional(),
    isNot: z.lazy(() => FinAccountTagWhereInputSchema).optional(),
  })
  .strict()

export const FinAccountLineItemTagMapT_idTag_idCompoundUniqueInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapT_idTag_idCompoundUniqueInput> =
  z
    .object({
      t_id: z.number(),
      tag_id: z.number(),
    })
    .strict()

export const FinAccountLineItemTagMapCountOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      when_added: z.lazy(() => SortOrderSchema).optional(),
      when_deleted: z.lazy(() => SortOrderSchema).optional(),
      t_id: z.lazy(() => SortOrderSchema).optional(),
      tag_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      t_id: z.lazy(() => SortOrderSchema).optional(),
      tag_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      when_added: z.lazy(() => SortOrderSchema).optional(),
      when_deleted: z.lazy(() => SortOrderSchema).optional(),
      t_id: z.lazy(() => SortOrderSchema).optional(),
      tag_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapMinOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      when_added: z.lazy(() => SortOrderSchema).optional(),
      when_deleted: z.lazy(() => SortOrderSchema).optional(),
      t_id: z.lazy(() => SortOrderSchema).optional(),
      tag_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapSumOrderByAggregateInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      t_id: z.lazy(() => SortOrderSchema).optional(),
      tag_id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict()

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
    connect: z
      .union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()])
      .optional(),
  })
  .strict()

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
    connect: z
      .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
      .optional(),
  })
  .strict()

export const TwoFactorCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TwoFactorCreateWithoutUserInputSchema),
          z.lazy(() => TwoFactorCreateWithoutUserInputSchema).array(),
          z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TwoFactorCreateManyUserInputEnvelopeSchema).optional(),
      connect: z
        .union([z.lazy(() => TwoFactorWhereUniqueInputSchema), z.lazy(() => TwoFactorWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict()

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
      connect: z
        .union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict()

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
      connect: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict()

export const TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TwoFactorCreateWithoutUserInputSchema),
          z.lazy(() => TwoFactorCreateWithoutUserInputSchema).array(),
          z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TwoFactorCreateManyUserInputEnvelopeSchema).optional(),
      connect: z
        .union([z.lazy(() => TwoFactorWhereUniqueInputSchema), z.lazy(() => TwoFactorWhereUniqueInputSchema).array()])
        .optional(),
    })
    .strict()

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z
  .object({
    set: z.string().optional(),
  })
  .strict()

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z
  .object({
    set: z.boolean().optional(),
  })
  .strict()

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z
  .object({
    set: z.string().optional().nullable(),
  })
  .strict()

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z
  .object({
    set: z.coerce.date().optional(),
  })
  .strict()

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z
  .object({
    set: z.boolean().optional().nullable(),
  })
  .strict()

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
        z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
    set: z
      .union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()])
      .optional(),
    disconnect: z
      .union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()])
      .optional(),
    delete: z
      .union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()])
      .optional(),
    connect: z
      .union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()])
      .optional(),
    update: z
      .union([
        z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
        z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()])
      .optional(),
  })
  .strict()

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
        z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
    set: z
      .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
      .optional(),
    disconnect: z
      .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
      .optional(),
    delete: z
      .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
      .optional(),
    connect: z
      .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
      .optional(),
    update: z
      .union([
        z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
        z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
        z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()])
      .optional(),
  })
  .strict()

export const TwoFactorUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TwoFactorUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TwoFactorCreateWithoutUserInputSchema),
          z.lazy(() => TwoFactorCreateWithoutUserInputSchema).array(),
          z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TwoFactorCreateManyUserInputEnvelopeSchema).optional(),
      set: z
        .union([z.lazy(() => TwoFactorWhereUniqueInputSchema), z.lazy(() => TwoFactorWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => TwoFactorWhereUniqueInputSchema), z.lazy(() => TwoFactorWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => TwoFactorWhereUniqueInputSchema), z.lazy(() => TwoFactorWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => TwoFactorWhereUniqueInputSchema), z.lazy(() => TwoFactorWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TwoFactorUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => TwoFactorUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => TwoFactorScalarWhereInputSchema), z.lazy(() => TwoFactorScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict()

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
      set: z
        .union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict()

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
      set: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict()

export const TwoFactorUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TwoFactorUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TwoFactorCreateWithoutUserInputSchema),
          z.lazy(() => TwoFactorCreateWithoutUserInputSchema).array(),
          z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TwoFactorCreateManyUserInputEnvelopeSchema).optional(),
      set: z
        .union([z.lazy(() => TwoFactorWhereUniqueInputSchema), z.lazy(() => TwoFactorWhereUniqueInputSchema).array()])
        .optional(),
      disconnect: z
        .union([z.lazy(() => TwoFactorWhereUniqueInputSchema), z.lazy(() => TwoFactorWhereUniqueInputSchema).array()])
        .optional(),
      delete: z
        .union([z.lazy(() => TwoFactorWhereUniqueInputSchema), z.lazy(() => TwoFactorWhereUniqueInputSchema).array()])
        .optional(),
      connect: z
        .union([z.lazy(() => TwoFactorWhereUniqueInputSchema), z.lazy(() => TwoFactorWhereUniqueInputSchema).array()])
        .optional(),
      update: z
        .union([
          z.lazy(() => TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TwoFactorUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => TwoFactorUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([z.lazy(() => TwoFactorScalarWhereInputSchema), z.lazy(() => TwoFactorScalarWhereInputSchema).array()])
        .optional(),
    })
    .strict()

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  })
  .strict()

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
      upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),
          z.lazy(() => UserUpdateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  })
  .strict()

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict()

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutAccountsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
      upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),
          z.lazy(() => UserUpdateWithoutAccountsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const UserCreateNestedOneWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTwofactorsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutTwofactorsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutTwofactorsInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTwofactorsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict()

export const UserUpdateOneRequiredWithoutTwofactorsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTwofactorsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutTwofactorsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutTwofactorsInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTwofactorsInputSchema).optional(),
      upsert: z.lazy(() => UserUpsertWithoutTwofactorsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutTwofactorsInputSchema),
          z.lazy(() => UserUpdateWithoutTwofactorsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutTwofactorsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const NullableDecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDecimalFieldUpdateOperationsInput> =
  z
    .object({
      set: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      increment: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional(),
      decrement: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional(),
      multiply: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional(),
      divide: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional(),
    })
    .strict()

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z
  .object({
    set: z.number().optional(),
    increment: z.number().optional(),
    decrement: z.number().optional(),
    multiply: z.number().optional(),
    divide: z.number().optional(),
  })
  .strict()

export const FinAccountLineItemTagMapCreateNestedManyWithoutTransactionInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateNestedManyWithoutTransactionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTransactionInputSchema).array(),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => FinAccountLineItemTagMapCreateManyTransactionInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const FinAccountLineItemTagMapUncheckedCreateNestedManyWithoutTransactionInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUncheckedCreateNestedManyWithoutTransactionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTransactionInputSchema).array(),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => FinAccountLineItemTagMapCreateManyTransactionInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z
  .object({
    set: z.number().optional().nullable(),
    increment: z.number().optional(),
    decrement: z.number().optional(),
    multiply: z.number().optional(),
    divide: z.number().optional(),
  })
  .strict()

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z
  .object({
    set: z.number().optional(),
    increment: z.number().optional(),
    decrement: z.number().optional(),
    multiply: z.number().optional(),
    divide: z.number().optional(),
  })
  .strict()

export const NullableEnumaccount_line_items_opt_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumaccount_line_items_opt_typeFieldUpdateOperationsInput> =
  z
    .object({
      set: z
        .lazy(() => account_line_items_opt_typeSchema)
        .optional()
        .nullable(),
    })
    .strict()

export const FinAccountLineItemTagMapUpdateManyWithoutTransactionNestedInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpdateManyWithoutTransactionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTransactionInputSchema).array(),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapUpsertWithWhereUniqueWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUpsertWithWhereUniqueWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => FinAccountLineItemTagMapCreateManyTransactionInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapUpdateWithWhereUniqueWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUpdateWithWhereUniqueWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapUpdateManyWithWhereWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUpdateManyWithWhereWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema),
          z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const FinAccountLineItemTagMapUncheckedUpdateManyWithoutTransactionNestedInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUncheckedUpdateManyWithoutTransactionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTransactionInputSchema).array(),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapUpsertWithWhereUniqueWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUpsertWithWhereUniqueWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => FinAccountLineItemTagMapCreateManyTransactionInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapUpdateWithWhereUniqueWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUpdateWithWhereUniqueWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapUpdateManyWithWhereWithoutTransactionInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUpdateManyWithWhereWithoutTransactionInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema),
          z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> = z
  .object({
    set: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    increment: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    decrement: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    multiply: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    divide: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
  })
  .strict()

export const Enumgraduated_tax_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumgraduated_tax_typeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => graduated_tax_typeSchema).optional(),
    })
    .strict()

export const BigIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BigIntFieldUpdateOperationsInput> = z
  .object({
    set: z.bigint().optional(),
    increment: z.bigint().optional(),
    decrement: z.bigint().optional(),
    multiply: z.bigint().optional(),
    divide: z.bigint().optional(),
  })
  .strict()

export const TimeSeriesSeriesCreateNestedOneWithoutTimeseries_datapointInputSchema: z.ZodType<Prisma.TimeSeriesSeriesCreateNestedOneWithoutTimeseries_datapointInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_datapointInputSchema),
          z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_datapointInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => TimeSeriesSeriesCreateOrConnectWithoutTimeseries_datapointInputSchema).optional(),
      connect: z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema).optional(),
    })
    .strict()

export const TimeSeriesSeriesUpdateOneRequiredWithoutTimeseries_datapointNestedInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUpdateOneRequiredWithoutTimeseries_datapointNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_datapointInputSchema),
          z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_datapointInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => TimeSeriesSeriesCreateOrConnectWithoutTimeseries_datapointInputSchema).optional(),
      upsert: z.lazy(() => TimeSeriesSeriesUpsertWithoutTimeseries_datapointInputSchema).optional(),
      connect: z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => TimeSeriesSeriesUpdateToOneWithWhereWithoutTimeseries_datapointInputSchema),
          z.lazy(() => TimeSeriesSeriesUpdateWithoutTimeseries_datapointInputSchema),
          z.lazy(() => TimeSeriesSeriesUncheckedUpdateWithoutTimeseries_datapointInputSchema),
        ])
        .optional(),
    })
    .strict()

export const TimeSeriesSeriesCreateNestedManyWithoutTimeseries_documentsInputSchema: z.ZodType<Prisma.TimeSeriesSeriesCreateNestedManyWithoutTimeseries_documentsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_documentsInputSchema).array(),
          z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TimeSeriesSeriesCreateOrConnectWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesCreateOrConnectWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TimeSeriesSeriesCreateManyTimeseries_documentsInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const TimeSeriesSeriesUncheckedCreateNestedManyWithoutTimeseries_documentsInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUncheckedCreateNestedManyWithoutTimeseries_documentsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_documentsInputSchema).array(),
          z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TimeSeriesSeriesCreateOrConnectWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesCreateOrConnectWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TimeSeriesSeriesCreateManyTimeseries_documentsInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const TimeSeriesSeriesUpdateManyWithoutTimeseries_documentsNestedInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUpdateManyWithoutTimeseries_documentsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_documentsInputSchema).array(),
          z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TimeSeriesSeriesCreateOrConnectWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesCreateOrConnectWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TimeSeriesSeriesUpsertWithWhereUniqueWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesUpsertWithWhereUniqueWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TimeSeriesSeriesCreateManyTimeseries_documentsInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TimeSeriesSeriesUpdateWithWhereUniqueWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesUpdateWithWhereUniqueWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TimeSeriesSeriesUpdateManyWithWhereWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesUpdateManyWithWhereWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TimeSeriesSeriesScalarWhereInputSchema),
          z.lazy(() => TimeSeriesSeriesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const TimeSeriesSeriesUncheckedUpdateManyWithoutTimeseries_documentsNestedInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUncheckedUpdateManyWithoutTimeseries_documentsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_documentsInputSchema).array(),
          z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TimeSeriesSeriesCreateOrConnectWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesCreateOrConnectWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TimeSeriesSeriesUpsertWithWhereUniqueWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesUpsertWithWhereUniqueWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TimeSeriesSeriesCreateManyTimeseries_documentsInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TimeSeriesSeriesUpdateWithWhereUniqueWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesUpdateWithWhereUniqueWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TimeSeriesSeriesUpdateManyWithWhereWithoutTimeseries_documentsInputSchema),
          z.lazy(() => TimeSeriesSeriesUpdateManyWithWhereWithoutTimeseries_documentsInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TimeSeriesSeriesScalarWhereInputSchema),
          z.lazy(() => TimeSeriesSeriesScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const TimeSeriesDatapointCreateNestedManyWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDatapointCreateNestedManyWithoutTimeseries_seriesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TimeSeriesDatapointCreateWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointCreateWithoutTimeseries_seriesInputSchema).array(),
          z.lazy(() => TimeSeriesDatapointUncheckedCreateWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointUncheckedCreateWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TimeSeriesDatapointCreateOrConnectWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointCreateOrConnectWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TimeSeriesDatapointCreateManyTimeseries_seriesInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const TimeSeriesDocumentCreateNestedOneWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDocumentCreateNestedOneWithoutTimeseries_seriesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TimeSeriesDocumentCreateWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDocumentUncheckedCreateWithoutTimeseries_seriesInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => TimeSeriesDocumentCreateOrConnectWithoutTimeseries_seriesInputSchema).optional(),
      connect: z.lazy(() => TimeSeriesDocumentWhereUniqueInputSchema).optional(),
    })
    .strict()

export const TimeSeriesDatapointUncheckedCreateNestedManyWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUncheckedCreateNestedManyWithoutTimeseries_seriesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TimeSeriesDatapointCreateWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointCreateWithoutTimeseries_seriesInputSchema).array(),
          z.lazy(() => TimeSeriesDatapointUncheckedCreateWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointUncheckedCreateWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TimeSeriesDatapointCreateOrConnectWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointCreateOrConnectWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TimeSeriesDatapointCreateManyTimeseries_seriesInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const TimeSeriesDatapointUpdateManyWithoutTimeseries_seriesNestedInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUpdateManyWithoutTimeseries_seriesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TimeSeriesDatapointCreateWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointCreateWithoutTimeseries_seriesInputSchema).array(),
          z.lazy(() => TimeSeriesDatapointUncheckedCreateWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointUncheckedCreateWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TimeSeriesDatapointCreateOrConnectWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointCreateOrConnectWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TimeSeriesDatapointUpsertWithWhereUniqueWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointUpsertWithWhereUniqueWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TimeSeriesDatapointCreateManyTimeseries_seriesInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TimeSeriesDatapointUpdateWithWhereUniqueWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointUpdateWithWhereUniqueWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TimeSeriesDatapointUpdateManyWithWhereWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointUpdateManyWithWhereWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TimeSeriesDatapointScalarWhereInputSchema),
          z.lazy(() => TimeSeriesDatapointScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const TimeSeriesDocumentUpdateOneRequiredWithoutTimeseries_seriesNestedInputSchema: z.ZodType<Prisma.TimeSeriesDocumentUpdateOneRequiredWithoutTimeseries_seriesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TimeSeriesDocumentCreateWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDocumentUncheckedCreateWithoutTimeseries_seriesInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => TimeSeriesDocumentCreateOrConnectWithoutTimeseries_seriesInputSchema).optional(),
      upsert: z.lazy(() => TimeSeriesDocumentUpsertWithoutTimeseries_seriesInputSchema).optional(),
      connect: z.lazy(() => TimeSeriesDocumentWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => TimeSeriesDocumentUpdateToOneWithWhereWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDocumentUpdateWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDocumentUncheckedUpdateWithoutTimeseries_seriesInputSchema),
        ])
        .optional(),
    })
    .strict()

export const TimeSeriesDatapointUncheckedUpdateManyWithoutTimeseries_seriesNestedInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUncheckedUpdateManyWithoutTimeseries_seriesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TimeSeriesDatapointCreateWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointCreateWithoutTimeseries_seriesInputSchema).array(),
          z.lazy(() => TimeSeriesDatapointUncheckedCreateWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointUncheckedCreateWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TimeSeriesDatapointCreateOrConnectWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointCreateOrConnectWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TimeSeriesDatapointUpsertWithWhereUniqueWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointUpsertWithWhereUniqueWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => TimeSeriesDatapointCreateManyTimeseries_seriesInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema),
          z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TimeSeriesDatapointUpdateWithWhereUniqueWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointUpdateWithWhereUniqueWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TimeSeriesDatapointUpdateManyWithWhereWithoutTimeseries_seriesInputSchema),
          z.lazy(() => TimeSeriesDatapointUpdateManyWithWhereWithoutTimeseries_seriesInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TimeSeriesDatapointScalarWhereInputSchema),
          z.lazy(() => TimeSeriesDatapointScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const BytesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BytesFieldUpdateOperationsInput> = z
  .object({
    set: z.instanceof(Buffer).optional(),
  })
  .strict()

export const FinAccountLineItemTagMapCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateNestedManyWithoutTagInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTagInputSchema).array(),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTagInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTagInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => FinAccountLineItemTagMapCreateManyTagInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const FinAccountLineItemTagMapUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUncheckedCreateNestedManyWithoutTagInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTagInputSchema).array(),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTagInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTagInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => FinAccountLineItemTagMapCreateManyTagInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const FinAccountLineItemTagMapUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpdateManyWithoutTagNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTagInputSchema).array(),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTagInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTagInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapUpsertWithWhereUniqueWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUpsertWithWhereUniqueWithoutTagInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => FinAccountLineItemTagMapCreateManyTagInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapUpdateWithWhereUniqueWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUpdateWithWhereUniqueWithoutTagInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapUpdateManyWithWhereWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUpdateManyWithWhereWithoutTagInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema),
          z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const FinAccountLineItemTagMapUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUncheckedUpdateManyWithoutTagNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateWithoutTagInputSchema).array(),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTagInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapCreateOrConnectWithoutTagInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapUpsertWithWhereUniqueWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUpsertWithWhereUniqueWithoutTagInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => FinAccountLineItemTagMapCreateManyTagInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
          z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapUpdateWithWhereUniqueWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUpdateWithWhereUniqueWithoutTagInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapUpdateManyWithWhereWithoutTagInputSchema),
          z.lazy(() => FinAccountLineItemTagMapUpdateManyWithWhereWithoutTagInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema),
          z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const FinAccountLineItemsCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.FinAccountLineItemsCreateNestedOneWithoutTagsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FinAccountLineItemsCreateWithoutTagsInputSchema),
          z.lazy(() => FinAccountLineItemsUncheckedCreateWithoutTagsInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => FinAccountLineItemsCreateOrConnectWithoutTagsInputSchema).optional(),
      connect: z.lazy(() => FinAccountLineItemsWhereUniqueInputSchema).optional(),
    })
    .strict()

export const FinAccountTagCreateNestedOneWithoutFinAccountLineItemTagMapInputSchema: z.ZodType<Prisma.FinAccountTagCreateNestedOneWithoutFinAccountLineItemTagMapInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FinAccountTagCreateWithoutFinAccountLineItemTagMapInputSchema),
          z.lazy(() => FinAccountTagUncheckedCreateWithoutFinAccountLineItemTagMapInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => FinAccountTagCreateOrConnectWithoutFinAccountLineItemTagMapInputSchema).optional(),
      connect: z.lazy(() => FinAccountTagWhereUniqueInputSchema).optional(),
    })
    .strict()

export const FinAccountLineItemsUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.FinAccountLineItemsUpdateOneRequiredWithoutTagsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FinAccountLineItemsCreateWithoutTagsInputSchema),
          z.lazy(() => FinAccountLineItemsUncheckedCreateWithoutTagsInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => FinAccountLineItemsCreateOrConnectWithoutTagsInputSchema).optional(),
      upsert: z.lazy(() => FinAccountLineItemsUpsertWithoutTagsInputSchema).optional(),
      connect: z.lazy(() => FinAccountLineItemsWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => FinAccountLineItemsUpdateToOneWithWhereWithoutTagsInputSchema),
          z.lazy(() => FinAccountLineItemsUpdateWithoutTagsInputSchema),
          z.lazy(() => FinAccountLineItemsUncheckedUpdateWithoutTagsInputSchema),
        ])
        .optional(),
    })
    .strict()

export const FinAccountTagUpdateOneRequiredWithoutFinAccountLineItemTagMapNestedInputSchema: z.ZodType<Prisma.FinAccountTagUpdateOneRequiredWithoutFinAccountLineItemTagMapNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => FinAccountTagCreateWithoutFinAccountLineItemTagMapInputSchema),
          z.lazy(() => FinAccountTagUncheckedCreateWithoutFinAccountLineItemTagMapInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => FinAccountTagCreateOrConnectWithoutFinAccountLineItemTagMapInputSchema).optional(),
      upsert: z.lazy(() => FinAccountTagUpsertWithoutFinAccountLineItemTagMapInputSchema).optional(),
      connect: z.lazy(() => FinAccountTagWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => FinAccountTagUpdateToOneWithWhereWithoutFinAccountLineItemTagMapInputSchema),
          z.lazy(() => FinAccountTagUpdateWithoutFinAccountLineItemTagMapInputSchema),
          z.lazy(() => FinAccountTagUncheckedUpdateWithoutFinAccountLineItemTagMapInputSchema),
        ])
        .optional(),
    })
    .strict()

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    search: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
  })
  .strict()

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
  })
  .strict()

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    search: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
  })
  .strict()

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z
  .object({
    equals: z.boolean().optional().nullable(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    search: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  })
  .strict()

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict()

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
  })
  .strict()

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    search: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  })
  .strict()

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  })
  .strict()

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z
  .object({
    equals: z.boolean().optional().nullable(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  })
  .strict()

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z
  .object({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema)])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict()

export const NestedDecimalNullableFilterSchema: z.ZodType<Prisma.NestedDecimalNullableFilter> = z
  .object({
    equals: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional()
      .nullable(),
    in: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional()
      .nullable(),
    notIn: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional()
      .nullable(),
    lt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    lte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    not: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NestedDecimalNullableFilterSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
  })
  .strict()

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
  })
  .strict()

export const NestedDecimalNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalNullableWithAggregatesFilter> =
  z
    .object({
      equals: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      in: z
        .union([
          z.number().array(),
          z.string().array(),
          z.instanceof(Decimal).array(),
          z.instanceof(Prisma.Decimal).array(),
          DecimalJsLikeSchema.array(),
        ])
        .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
          message: 'Must be a Decimal',
        })
        .optional()
        .nullable(),
      notIn: z
        .union([
          z.number().array(),
          z.string().array(),
          z.instanceof(Decimal).array(),
          z.instanceof(Prisma.Decimal).array(),
          DecimalJsLikeSchema.array(),
        ])
        .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
          message: 'Must be a Decimal',
        })
        .optional()
        .nullable(),
      lt: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional(),
      lte: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional(),
      gt: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional(),
      gte: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional(),
      not: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NestedDecimalNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDecimalNullableFilterSchema).optional(),
    })
    .strict()

export const NestedEnumaccount_line_items_opt_typeNullableFilterSchema: z.ZodType<Prisma.NestedEnumaccount_line_items_opt_typeNullableFilter> =
  z
    .object({
      equals: z
        .lazy(() => account_line_items_opt_typeSchema)
        .optional()
        .nullable(),
      in: z
        .lazy(() => account_line_items_opt_typeSchema)
        .array()
        .optional()
        .nullable(),
      notIn: z
        .lazy(() => account_line_items_opt_typeSchema)
        .array()
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => account_line_items_opt_typeSchema),
          z.lazy(() => NestedEnumaccount_line_items_opt_typeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict()

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  })
  .strict()

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
    _min: z.lazy(() => NestedFloatFilterSchema).optional(),
    _max: z.lazy(() => NestedFloatFilterSchema).optional(),
  })
  .strict()

export const NestedEnumaccount_line_items_opt_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumaccount_line_items_opt_typeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z
        .lazy(() => account_line_items_opt_typeSchema)
        .optional()
        .nullable(),
      in: z
        .lazy(() => account_line_items_opt_typeSchema)
        .array()
        .optional()
        .nullable(),
      notIn: z
        .lazy(() => account_line_items_opt_typeSchema)
        .array()
        .optional()
        .nullable(),
      not: z
        .union([
          z.lazy(() => account_line_items_opt_typeSchema),
          z.lazy(() => NestedEnumaccount_line_items_opt_typeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumaccount_line_items_opt_typeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumaccount_line_items_opt_typeNullableFilterSchema).optional(),
    })
    .strict()

export const NestedDecimalFilterSchema: z.ZodType<Prisma.NestedDecimalFilter> = z
  .object({
    equals: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    in: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional(),
    notIn: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional(),
    lt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    lte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    not: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NestedDecimalFilterSchema),
      ])
      .optional(),
  })
  .strict()

export const NestedDecimalWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalWithAggregatesFilter> = z
  .object({
    equals: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    in: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional(),
    notIn: z
      .union([
        z.number().array(),
        z.string().array(),
        z.instanceof(Decimal).array(),
        z.instanceof(Prisma.Decimal).array(),
        DecimalJsLikeSchema.array(),
      ])
      .refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), {
        message: 'Must be a Decimal',
      })
      .optional(),
    lt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    lte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gt: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    gte: z
      .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
      .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
      .optional(),
    not: z
      .union([
        z
          .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
          .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
        z.lazy(() => NestedDecimalWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
    _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
    _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
    _max: z.lazy(() => NestedDecimalFilterSchema).optional(),
  })
  .strict()

export const NestedEnumgraduated_tax_typeFilterSchema: z.ZodType<Prisma.NestedEnumgraduated_tax_typeFilter> = z
  .object({
    equals: z.lazy(() => graduated_tax_typeSchema).optional(),
    in: z
      .lazy(() => graduated_tax_typeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => graduated_tax_typeSchema)
      .array()
      .optional(),
    not: z
      .union([z.lazy(() => graduated_tax_typeSchema), z.lazy(() => NestedEnumgraduated_tax_typeFilterSchema)])
      .optional(),
  })
  .strict()

export const NestedEnumgraduated_tax_typeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumgraduated_tax_typeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => graduated_tax_typeSchema).optional(),
      in: z
        .lazy(() => graduated_tax_typeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => graduated_tax_typeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => graduated_tax_typeSchema),
          z.lazy(() => NestedEnumgraduated_tax_typeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumgraduated_tax_typeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumgraduated_tax_typeFilterSchema).optional(),
    })
    .strict()

export const NestedBigIntFilterSchema: z.ZodType<Prisma.NestedBigIntFilter> = z
  .object({
    equals: z.bigint().optional(),
    in: z.bigint().array().optional(),
    notIn: z.bigint().array().optional(),
    lt: z.bigint().optional(),
    lte: z.bigint().optional(),
    gt: z.bigint().optional(),
    gte: z.bigint().optional(),
    not: z.union([z.bigint(), z.lazy(() => NestedBigIntFilterSchema)]).optional(),
  })
  .strict()

export const NestedBigIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBigIntWithAggregatesFilter> = z
  .object({
    equals: z.bigint().optional(),
    in: z.bigint().array().optional(),
    notIn: z.bigint().array().optional(),
    lt: z.bigint().optional(),
    lte: z.bigint().optional(),
    gt: z.bigint().optional(),
    gte: z.bigint().optional(),
    not: z.union([z.bigint(), z.lazy(() => NestedBigIntWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
    _max: z.lazy(() => NestedBigIntFilterSchema).optional(),
  })
  .strict()

export const NestedBytesFilterSchema: z.ZodType<Prisma.NestedBytesFilter> = z
  .object({
    equals: z.instanceof(Buffer).optional(),
    in: z.instanceof(Buffer).array().optional(),
    notIn: z.instanceof(Buffer).array().optional(),
    not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesFilterSchema)]).optional(),
  })
  .strict()

export const NestedBytesWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBytesWithAggregatesFilter> = z
  .object({
    equals: z.instanceof(Buffer).optional(),
    in: z.instanceof(Buffer).array().optional(),
    notIn: z.instanceof(Buffer).array().optional(),
    not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBytesFilterSchema).optional(),
    _max: z.lazy(() => NestedBytesFilterSchema).optional(),
  })
  .strict()

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z
  .object({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
  .strict()

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z
  .object({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
  .strict()

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => AccountWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => AccountCreateWithoutUserInputSchema),
      z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
    ]),
  })
  .strict()

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([z.lazy(() => AccountCreateManyUserInputSchema), z.lazy(() => AccountCreateManyUserInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z
  .object({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
  })
  .strict()

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z
  .object({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
  })
  .strict()

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => SessionWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => SessionCreateWithoutUserInputSchema),
      z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
    ]),
  })
  .strict()

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([z.lazy(() => SessionCreateManyUserInputSchema), z.lazy(() => SessionCreateManyUserInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const TwoFactorCreateWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorCreateWithoutUserInput> = z
  .object({
    id: z.string(),
    secret: z.string(),
    backupCodes: z.string(),
  })
  .strict()

export const TwoFactorUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUncheckedCreateWithoutUserInput> = z
  .object({
    id: z.string(),
    secret: z.string(),
    backupCodes: z.string(),
  })
  .strict()

export const TwoFactorCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => TwoFactorWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => TwoFactorCreateWithoutUserInputSchema),
      z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema),
    ]),
  })
  .strict()

export const TwoFactorCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TwoFactorCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => TwoFactorCreateManyUserInputSchema),
      z.lazy(() => TwoFactorCreateManyUserInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => AccountUpdateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => AccountUpdateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => AccountUpdateManyMutationInputSchema),
        z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict()

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => AccountScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    accountId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    providerId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    accessToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    refreshToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    idToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    scope: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    password: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
  })
  .strict()

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => SessionUpdateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateManyMutationInputSchema),
        z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict()

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => SessionScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expiresAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    ipAddress: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userAgent: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  })
  .strict()

export const TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => TwoFactorWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TwoFactorUpdateWithoutUserInputSchema),
        z.lazy(() => TwoFactorUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TwoFactorCreateWithoutUserInputSchema),
        z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => TwoFactorWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TwoFactorUpdateWithoutUserInputSchema),
        z.lazy(() => TwoFactorUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict()

export const TwoFactorUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => TwoFactorScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TwoFactorUpdateManyMutationInputSchema),
        z.lazy(() => TwoFactorUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict()

export const TwoFactorScalarWhereInputSchema: z.ZodType<Prisma.TwoFactorScalarWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => TwoFactorScalarWhereInputSchema), z.lazy(() => TwoFactorScalarWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => TwoFactorScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => TwoFactorScalarWhereInputSchema), z.lazy(() => TwoFactorScalarWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    secret: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    backupCodes: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  })
  .strict()

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    twoFactorEnabled: z.boolean().optional().nullable(),
    username: z.string().optional().nullable(),
    inviteCode: z.string().optional().nullable(),
    accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
    twofactors: z.lazy(() => TwoFactorCreateNestedManyWithoutUserInputSchema).optional(),
  })
  .strict()

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    twoFactorEnabled: z.boolean().optional().nullable(),
    username: z.string().optional().nullable(),
    inviteCode: z.string().optional().nullable(),
    accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    twofactors: z.lazy(() => TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  })
  .strict()

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutSessionsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
    ]),
  })
  .strict()

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutSessionsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutSessionsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict()

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
      ]),
    })
    .strict()

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    emailVerified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    image: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    twoFactorEnabled: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    username: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    inviteCode: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
    twofactors: z.lazy(() => TwoFactorUpdateManyWithoutUserNestedInputSchema).optional(),
  })
  .strict()

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    emailVerified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    image: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    twoFactorEnabled: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    username: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    inviteCode: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    twofactors: z.lazy(() => TwoFactorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  })
  .strict()

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    twoFactorEnabled: z.boolean().optional().nullable(),
    username: z.string().optional().nullable(),
    inviteCode: z.string().optional().nullable(),
    sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
    twofactors: z.lazy(() => TwoFactorCreateNestedManyWithoutUserInputSchema).optional(),
  })
  .strict()

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    twoFactorEnabled: z.boolean().optional().nullable(),
    username: z.string().optional().nullable(),
    inviteCode: z.string().optional().nullable(),
    sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    twofactors: z.lazy(() => TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  })
  .strict()

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
    ]),
  })
  .strict()

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict()

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
      ]),
    })
    .strict()

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    emailVerified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    image: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    twoFactorEnabled: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    username: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    inviteCode: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
    twofactors: z.lazy(() => TwoFactorUpdateManyWithoutUserNestedInputSchema).optional(),
  })
  .strict()

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    emailVerified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    image: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    twoFactorEnabled: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    username: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    inviteCode: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    twofactors: z.lazy(() => TwoFactorUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  })
  .strict()

export const UserCreateWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserCreateWithoutTwofactorsInput> = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    twoFactorEnabled: z.boolean().optional().nullable(),
    username: z.string().optional().nullable(),
    inviteCode: z.string().optional().nullable(),
    accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
    sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  })
  .strict()

export const UserUncheckedCreateWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTwofactorsInput> =
  z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      emailVerified: z.boolean(),
      image: z.string().optional().nullable(),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
      twoFactorEnabled: z.boolean().optional().nullable(),
      username: z.string().optional().nullable(),
      inviteCode: z.string().optional().nullable(),
      accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
      sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    })
    .strict()

export const UserCreateOrConnectWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTwofactorsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutTwofactorsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutTwofactorsInputSchema),
      ]),
    })
    .strict()

export const UserUpsertWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserUpsertWithoutTwofactorsInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutTwofactorsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutTwofactorsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutTwofactorsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutTwofactorsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict()

export const UserUpdateToOneWithWhereWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTwofactorsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutTwofactorsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutTwofactorsInputSchema),
      ]),
    })
    .strict()

export const UserUpdateWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserUpdateWithoutTwofactorsInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    emailVerified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    image: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    twoFactorEnabled: z
      .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    username: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    inviteCode: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
    sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  })
  .strict()

export const UserUncheckedUpdateWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTwofactorsInput> =
  z
    .object({
      id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      emailVerified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
      image: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      twoFactorEnabled: z
        .union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      username: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      inviteCode: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
      sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapCreateWithoutTransactionInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateWithoutTransactionInput> =
  z
    .object({
      when_added: z.coerce.date().optional(),
      when_deleted: z.coerce.date().optional().nullable(),
      tag: z.lazy(() => FinAccountTagCreateNestedOneWithoutFinAccountLineItemTagMapInputSchema),
    })
    .strict()

export const FinAccountLineItemTagMapUncheckedCreateWithoutTransactionInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUncheckedCreateWithoutTransactionInput> =
  z
    .object({
      id: z.number().int().optional(),
      when_added: z.coerce.date().optional(),
      when_deleted: z.coerce.date().optional().nullable(),
      tag_id: z.number().int(),
    })
    .strict()

export const FinAccountLineItemTagMapCreateOrConnectWithoutTransactionInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateOrConnectWithoutTransactionInput> =
  z
    .object({
      where: z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => FinAccountLineItemTagMapCreateWithoutTransactionInputSchema),
        z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTransactionInputSchema),
      ]),
    })
    .strict()

export const FinAccountLineItemTagMapCreateManyTransactionInputEnvelopeSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateManyTransactionInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => FinAccountLineItemTagMapCreateManyTransactionInputSchema),
        z.lazy(() => FinAccountLineItemTagMapCreateManyTransactionInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const FinAccountLineItemTagMapUpsertWithWhereUniqueWithoutTransactionInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpsertWithWhereUniqueWithoutTransactionInput> =
  z
    .object({
      where: z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => FinAccountLineItemTagMapUpdateWithoutTransactionInputSchema),
        z.lazy(() => FinAccountLineItemTagMapUncheckedUpdateWithoutTransactionInputSchema),
      ]),
      create: z.union([
        z.lazy(() => FinAccountLineItemTagMapCreateWithoutTransactionInputSchema),
        z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTransactionInputSchema),
      ]),
    })
    .strict()

export const FinAccountLineItemTagMapUpdateWithWhereUniqueWithoutTransactionInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpdateWithWhereUniqueWithoutTransactionInput> =
  z
    .object({
      where: z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => FinAccountLineItemTagMapUpdateWithoutTransactionInputSchema),
        z.lazy(() => FinAccountLineItemTagMapUncheckedUpdateWithoutTransactionInputSchema),
      ]),
    })
    .strict()

export const FinAccountLineItemTagMapUpdateManyWithWhereWithoutTransactionInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpdateManyWithWhereWithoutTransactionInput> =
  z
    .object({
      where: z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => FinAccountLineItemTagMapUpdateManyMutationInputSchema),
        z.lazy(() => FinAccountLineItemTagMapUncheckedUpdateManyWithoutTransactionInputSchema),
      ]),
    })
    .strict()

export const FinAccountLineItemTagMapScalarWhereInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema),
        z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema),
        z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    when_added: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    when_deleted: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    t_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    tag_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  })
  .strict()

export const TimeSeriesSeriesCreateWithoutTimeseries_datapointInputSchema: z.ZodType<Prisma.TimeSeriesSeriesCreateWithoutTimeseries_datapointInput> =
  z
    .object({
      series_name: z.string(),
      timeseries_documents: z.lazy(() => TimeSeriesDocumentCreateNestedOneWithoutTimeseries_seriesInputSchema),
    })
    .strict()

export const TimeSeriesSeriesUncheckedCreateWithoutTimeseries_datapointInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUncheckedCreateWithoutTimeseries_datapointInput> =
  z
    .object({
      id: z.number().int().optional(),
      document_id: z.number().int(),
      series_name: z.string(),
    })
    .strict()

export const TimeSeriesSeriesCreateOrConnectWithoutTimeseries_datapointInputSchema: z.ZodType<Prisma.TimeSeriesSeriesCreateOrConnectWithoutTimeseries_datapointInput> =
  z
    .object({
      where: z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_datapointInputSchema),
        z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_datapointInputSchema),
      ]),
    })
    .strict()

export const TimeSeriesSeriesUpsertWithoutTimeseries_datapointInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUpsertWithoutTimeseries_datapointInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => TimeSeriesSeriesUpdateWithoutTimeseries_datapointInputSchema),
        z.lazy(() => TimeSeriesSeriesUncheckedUpdateWithoutTimeseries_datapointInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_datapointInputSchema),
        z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_datapointInputSchema),
      ]),
      where: z.lazy(() => TimeSeriesSeriesWhereInputSchema).optional(),
    })
    .strict()

export const TimeSeriesSeriesUpdateToOneWithWhereWithoutTimeseries_datapointInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUpdateToOneWithWhereWithoutTimeseries_datapointInput> =
  z
    .object({
      where: z.lazy(() => TimeSeriesSeriesWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => TimeSeriesSeriesUpdateWithoutTimeseries_datapointInputSchema),
        z.lazy(() => TimeSeriesSeriesUncheckedUpdateWithoutTimeseries_datapointInputSchema),
      ]),
    })
    .strict()

export const TimeSeriesSeriesUpdateWithoutTimeseries_datapointInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUpdateWithoutTimeseries_datapointInput> =
  z
    .object({
      series_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      timeseries_documents: z
        .lazy(() => TimeSeriesDocumentUpdateOneRequiredWithoutTimeseries_seriesNestedInputSchema)
        .optional(),
    })
    .strict()

export const TimeSeriesSeriesUncheckedUpdateWithoutTimeseries_datapointInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUncheckedUpdateWithoutTimeseries_datapointInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      document_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      series_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const TimeSeriesSeriesCreateWithoutTimeseries_documentsInputSchema: z.ZodType<Prisma.TimeSeriesSeriesCreateWithoutTimeseries_documentsInput> =
  z
    .object({
      series_name: z.string(),
      timeseries_datapoint: z.lazy(() => TimeSeriesDatapointCreateNestedManyWithoutTimeseries_seriesInputSchema).optional(),
    })
    .strict()

export const TimeSeriesSeriesUncheckedCreateWithoutTimeseries_documentsInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUncheckedCreateWithoutTimeseries_documentsInput> =
  z
    .object({
      id: z.number().int().optional(),
      series_name: z.string(),
      timeseries_datapoint: z
        .lazy(() => TimeSeriesDatapointUncheckedCreateNestedManyWithoutTimeseries_seriesInputSchema)
        .optional(),
    })
    .strict()

export const TimeSeriesSeriesCreateOrConnectWithoutTimeseries_documentsInputSchema: z.ZodType<Prisma.TimeSeriesSeriesCreateOrConnectWithoutTimeseries_documentsInput> =
  z
    .object({
      where: z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_documentsInputSchema),
        z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_documentsInputSchema),
      ]),
    })
    .strict()

export const TimeSeriesSeriesCreateManyTimeseries_documentsInputEnvelopeSchema: z.ZodType<Prisma.TimeSeriesSeriesCreateManyTimeseries_documentsInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => TimeSeriesSeriesCreateManyTimeseries_documentsInputSchema),
        z.lazy(() => TimeSeriesSeriesCreateManyTimeseries_documentsInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const TimeSeriesSeriesUpsertWithWhereUniqueWithoutTimeseries_documentsInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUpsertWithWhereUniqueWithoutTimeseries_documentsInput> =
  z
    .object({
      where: z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TimeSeriesSeriesUpdateWithoutTimeseries_documentsInputSchema),
        z.lazy(() => TimeSeriesSeriesUncheckedUpdateWithoutTimeseries_documentsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TimeSeriesSeriesCreateWithoutTimeseries_documentsInputSchema),
        z.lazy(() => TimeSeriesSeriesUncheckedCreateWithoutTimeseries_documentsInputSchema),
      ]),
    })
    .strict()

export const TimeSeriesSeriesUpdateWithWhereUniqueWithoutTimeseries_documentsInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUpdateWithWhereUniqueWithoutTimeseries_documentsInput> =
  z
    .object({
      where: z.lazy(() => TimeSeriesSeriesWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TimeSeriesSeriesUpdateWithoutTimeseries_documentsInputSchema),
        z.lazy(() => TimeSeriesSeriesUncheckedUpdateWithoutTimeseries_documentsInputSchema),
      ]),
    })
    .strict()

export const TimeSeriesSeriesUpdateManyWithWhereWithoutTimeseries_documentsInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUpdateManyWithWhereWithoutTimeseries_documentsInput> =
  z
    .object({
      where: z.lazy(() => TimeSeriesSeriesScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TimeSeriesSeriesUpdateManyMutationInputSchema),
        z.lazy(() => TimeSeriesSeriesUncheckedUpdateManyWithoutTimeseries_documentsInputSchema),
      ]),
    })
    .strict()

export const TimeSeriesSeriesScalarWhereInputSchema: z.ZodType<Prisma.TimeSeriesSeriesScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TimeSeriesSeriesScalarWhereInputSchema),
        z.lazy(() => TimeSeriesSeriesScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TimeSeriesSeriesScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TimeSeriesSeriesScalarWhereInputSchema),
        z.lazy(() => TimeSeriesSeriesScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    document_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    series_name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  })
  .strict()

export const TimeSeriesDatapointCreateWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDatapointCreateWithoutTimeseries_seriesInput> =
  z
    .object({
      dp_date: z.coerce.date().optional().nullable(),
      dp_value: z.string().optional().nullable(),
      dp_comment: z.string().optional().nullable(),
    })
    .strict()

export const TimeSeriesDatapointUncheckedCreateWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUncheckedCreateWithoutTimeseries_seriesInput> =
  z
    .object({
      dp_id: z.number().int().optional(),
      dp_date: z.coerce.date().optional().nullable(),
      dp_value: z.string().optional().nullable(),
      dp_comment: z.string().optional().nullable(),
    })
    .strict()

export const TimeSeriesDatapointCreateOrConnectWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDatapointCreateOrConnectWithoutTimeseries_seriesInput> =
  z
    .object({
      where: z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TimeSeriesDatapointCreateWithoutTimeseries_seriesInputSchema),
        z.lazy(() => TimeSeriesDatapointUncheckedCreateWithoutTimeseries_seriesInputSchema),
      ]),
    })
    .strict()

export const TimeSeriesDatapointCreateManyTimeseries_seriesInputEnvelopeSchema: z.ZodType<Prisma.TimeSeriesDatapointCreateManyTimeseries_seriesInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => TimeSeriesDatapointCreateManyTimeseries_seriesInputSchema),
        z.lazy(() => TimeSeriesDatapointCreateManyTimeseries_seriesInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const TimeSeriesDocumentCreateWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDocumentCreateWithoutTimeseries_seriesInput> =
  z
    .object({
      uid: z.number().int(),
      name: z.string(),
    })
    .strict()

export const TimeSeriesDocumentUncheckedCreateWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDocumentUncheckedCreateWithoutTimeseries_seriesInput> =
  z
    .object({
      id: z.number().int().optional(),
      uid: z.number().int(),
      name: z.string(),
    })
    .strict()

export const TimeSeriesDocumentCreateOrConnectWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDocumentCreateOrConnectWithoutTimeseries_seriesInput> =
  z
    .object({
      where: z.lazy(() => TimeSeriesDocumentWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TimeSeriesDocumentCreateWithoutTimeseries_seriesInputSchema),
        z.lazy(() => TimeSeriesDocumentUncheckedCreateWithoutTimeseries_seriesInputSchema),
      ]),
    })
    .strict()

export const TimeSeriesDatapointUpsertWithWhereUniqueWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUpsertWithWhereUniqueWithoutTimeseries_seriesInput> =
  z
    .object({
      where: z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TimeSeriesDatapointUpdateWithoutTimeseries_seriesInputSchema),
        z.lazy(() => TimeSeriesDatapointUncheckedUpdateWithoutTimeseries_seriesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TimeSeriesDatapointCreateWithoutTimeseries_seriesInputSchema),
        z.lazy(() => TimeSeriesDatapointUncheckedCreateWithoutTimeseries_seriesInputSchema),
      ]),
    })
    .strict()

export const TimeSeriesDatapointUpdateWithWhereUniqueWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUpdateWithWhereUniqueWithoutTimeseries_seriesInput> =
  z
    .object({
      where: z.lazy(() => TimeSeriesDatapointWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TimeSeriesDatapointUpdateWithoutTimeseries_seriesInputSchema),
        z.lazy(() => TimeSeriesDatapointUncheckedUpdateWithoutTimeseries_seriesInputSchema),
      ]),
    })
    .strict()

export const TimeSeriesDatapointUpdateManyWithWhereWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUpdateManyWithWhereWithoutTimeseries_seriesInput> =
  z
    .object({
      where: z.lazy(() => TimeSeriesDatapointScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TimeSeriesDatapointUpdateManyMutationInputSchema),
        z.lazy(() => TimeSeriesDatapointUncheckedUpdateManyWithoutTimeseries_seriesInputSchema),
      ]),
    })
    .strict()

export const TimeSeriesDatapointScalarWhereInputSchema: z.ZodType<Prisma.TimeSeriesDatapointScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TimeSeriesDatapointScalarWhereInputSchema),
        z.lazy(() => TimeSeriesDatapointScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TimeSeriesDatapointScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TimeSeriesDatapointScalarWhereInputSchema),
        z.lazy(() => TimeSeriesDatapointScalarWhereInputSchema).array(),
      ])
      .optional(),
    dp_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    dp_series_id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    dp_date: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    dp_value: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    dp_comment: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict()

export const TimeSeriesDocumentUpsertWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDocumentUpsertWithoutTimeseries_seriesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => TimeSeriesDocumentUpdateWithoutTimeseries_seriesInputSchema),
        z.lazy(() => TimeSeriesDocumentUncheckedUpdateWithoutTimeseries_seriesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TimeSeriesDocumentCreateWithoutTimeseries_seriesInputSchema),
        z.lazy(() => TimeSeriesDocumentUncheckedCreateWithoutTimeseries_seriesInputSchema),
      ]),
      where: z.lazy(() => TimeSeriesDocumentWhereInputSchema).optional(),
    })
    .strict()

export const TimeSeriesDocumentUpdateToOneWithWhereWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDocumentUpdateToOneWithWhereWithoutTimeseries_seriesInput> =
  z
    .object({
      where: z.lazy(() => TimeSeriesDocumentWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => TimeSeriesDocumentUpdateWithoutTimeseries_seriesInputSchema),
        z.lazy(() => TimeSeriesDocumentUncheckedUpdateWithoutTimeseries_seriesInputSchema),
      ]),
    })
    .strict()

export const TimeSeriesDocumentUpdateWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDocumentUpdateWithoutTimeseries_seriesInput> =
  z
    .object({
      uid: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const TimeSeriesDocumentUncheckedUpdateWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDocumentUncheckedUpdateWithoutTimeseries_seriesInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      uid: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapCreateWithoutTagInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateWithoutTagInput> =
  z
    .object({
      when_added: z.coerce.date().optional(),
      when_deleted: z.coerce.date().optional().nullable(),
      transaction: z.lazy(() => FinAccountLineItemsCreateNestedOneWithoutTagsInputSchema),
    })
    .strict()

export const FinAccountLineItemTagMapUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUncheckedCreateWithoutTagInput> =
  z
    .object({
      id: z.number().int().optional(),
      when_added: z.coerce.date().optional(),
      when_deleted: z.coerce.date().optional().nullable(),
      t_id: z.number().int(),
    })
    .strict()

export const FinAccountLineItemTagMapCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateOrConnectWithoutTagInput> =
  z
    .object({
      where: z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => FinAccountLineItemTagMapCreateWithoutTagInputSchema),
        z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTagInputSchema),
      ]),
    })
    .strict()

export const FinAccountLineItemTagMapCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateManyTagInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => FinAccountLineItemTagMapCreateManyTagInputSchema),
        z.lazy(() => FinAccountLineItemTagMapCreateManyTagInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const FinAccountLineItemTagMapUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpsertWithWhereUniqueWithoutTagInput> =
  z
    .object({
      where: z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => FinAccountLineItemTagMapUpdateWithoutTagInputSchema),
        z.lazy(() => FinAccountLineItemTagMapUncheckedUpdateWithoutTagInputSchema),
      ]),
      create: z.union([
        z.lazy(() => FinAccountLineItemTagMapCreateWithoutTagInputSchema),
        z.lazy(() => FinAccountLineItemTagMapUncheckedCreateWithoutTagInputSchema),
      ]),
    })
    .strict()

export const FinAccountLineItemTagMapUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpdateWithWhereUniqueWithoutTagInput> =
  z
    .object({
      where: z.lazy(() => FinAccountLineItemTagMapWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => FinAccountLineItemTagMapUpdateWithoutTagInputSchema),
        z.lazy(() => FinAccountLineItemTagMapUncheckedUpdateWithoutTagInputSchema),
      ]),
    })
    .strict()

export const FinAccountLineItemTagMapUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpdateManyWithWhereWithoutTagInput> =
  z
    .object({
      where: z.lazy(() => FinAccountLineItemTagMapScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => FinAccountLineItemTagMapUpdateManyMutationInputSchema),
        z.lazy(() => FinAccountLineItemTagMapUncheckedUpdateManyWithoutTagInputSchema),
      ]),
    })
    .strict()

export const FinAccountLineItemsCreateWithoutTagsInputSchema: z.ZodType<Prisma.FinAccountLineItemsCreateWithoutTagsInput> =
  z
    .object({
      t_account: z.number().int().optional().nullable(),
      t_date: z.string(),
      t_date_posted: z.string().optional().nullable(),
      t_type: z.string().optional().nullable(),
      t_schc_category: z.string().optional().nullable(),
      t_amt: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      t_symbol: z.string().optional().nullable(),
      t_qty: z.number().optional(),
      t_price: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      t_commission: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      t_fee: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      t_method: z.string().optional().nullable(),
      t_source: z.string().optional().nullable(),
      t_origin: z.string().optional().nullable(),
      opt_expiration: z.string().optional().nullable(),
      opt_type: z
        .lazy(() => account_line_items_opt_typeSchema)
        .optional()
        .nullable(),
      opt_strike: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      t_description: z.string().optional().nullable(),
      t_comment: z.string().optional().nullable(),
      t_from: z.string().optional().nullable(),
      t_to: z.string().optional().nullable(),
      t_interest_rate: z.string().optional().nullable(),
      t_cusip: z.string().optional().nullable(),
      t_harvested_amount: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      parent_t_id: z.number().int().optional().nullable(),
      when_added: z.coerce.date().optional().nullable(),
      when_deleted: z.coerce.date().optional().nullable(),
    })
    .strict()

export const FinAccountLineItemsUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.FinAccountLineItemsUncheckedCreateWithoutTagsInput> =
  z
    .object({
      t_id: z.number().int().optional(),
      t_account: z.number().int().optional().nullable(),
      t_date: z.string(),
      t_date_posted: z.string().optional().nullable(),
      t_type: z.string().optional().nullable(),
      t_schc_category: z.string().optional().nullable(),
      t_amt: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      t_symbol: z.string().optional().nullable(),
      t_qty: z.number().optional(),
      t_price: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      t_commission: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      t_fee: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      t_method: z.string().optional().nullable(),
      t_source: z.string().optional().nullable(),
      t_origin: z.string().optional().nullable(),
      opt_expiration: z.string().optional().nullable(),
      opt_type: z
        .lazy(() => account_line_items_opt_typeSchema)
        .optional()
        .nullable(),
      opt_strike: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      t_description: z.string().optional().nullable(),
      t_comment: z.string().optional().nullable(),
      t_from: z.string().optional().nullable(),
      t_to: z.string().optional().nullable(),
      t_interest_rate: z.string().optional().nullable(),
      t_cusip: z.string().optional().nullable(),
      t_harvested_amount: z
        .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
      parent_t_id: z.number().int().optional().nullable(),
      when_added: z.coerce.date().optional().nullable(),
      when_deleted: z.coerce.date().optional().nullable(),
    })
    .strict()

export const FinAccountLineItemsCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.FinAccountLineItemsCreateOrConnectWithoutTagsInput> =
  z
    .object({
      where: z.lazy(() => FinAccountLineItemsWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => FinAccountLineItemsCreateWithoutTagsInputSchema),
        z.lazy(() => FinAccountLineItemsUncheckedCreateWithoutTagsInputSchema),
      ]),
    })
    .strict()

export const FinAccountTagCreateWithoutFinAccountLineItemTagMapInputSchema: z.ZodType<Prisma.FinAccountTagCreateWithoutFinAccountLineItemTagMapInput> =
  z
    .object({
      tag_userid: z.string(),
      tag_color: z.string(),
      tag_label: z.string(),
      when_added: z.coerce.date().optional(),
      when_deleted: z.coerce.date().optional().nullable(),
    })
    .strict()

export const FinAccountTagUncheckedCreateWithoutFinAccountLineItemTagMapInputSchema: z.ZodType<Prisma.FinAccountTagUncheckedCreateWithoutFinAccountLineItemTagMapInput> =
  z
    .object({
      tag_id: z.number().int().optional(),
      tag_userid: z.string(),
      tag_color: z.string(),
      tag_label: z.string(),
      when_added: z.coerce.date().optional(),
      when_deleted: z.coerce.date().optional().nullable(),
    })
    .strict()

export const FinAccountTagCreateOrConnectWithoutFinAccountLineItemTagMapInputSchema: z.ZodType<Prisma.FinAccountTagCreateOrConnectWithoutFinAccountLineItemTagMapInput> =
  z
    .object({
      where: z.lazy(() => FinAccountTagWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => FinAccountTagCreateWithoutFinAccountLineItemTagMapInputSchema),
        z.lazy(() => FinAccountTagUncheckedCreateWithoutFinAccountLineItemTagMapInputSchema),
      ]),
    })
    .strict()

export const FinAccountLineItemsUpsertWithoutTagsInputSchema: z.ZodType<Prisma.FinAccountLineItemsUpsertWithoutTagsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => FinAccountLineItemsUpdateWithoutTagsInputSchema),
        z.lazy(() => FinAccountLineItemsUncheckedUpdateWithoutTagsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => FinAccountLineItemsCreateWithoutTagsInputSchema),
        z.lazy(() => FinAccountLineItemsUncheckedCreateWithoutTagsInputSchema),
      ]),
      where: z.lazy(() => FinAccountLineItemsWhereInputSchema).optional(),
    })
    .strict()

export const FinAccountLineItemsUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.FinAccountLineItemsUpdateToOneWithWhereWithoutTagsInput> =
  z
    .object({
      where: z.lazy(() => FinAccountLineItemsWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => FinAccountLineItemsUpdateWithoutTagsInputSchema),
        z.lazy(() => FinAccountLineItemsUncheckedUpdateWithoutTagsInputSchema),
      ]),
    })
    .strict()

export const FinAccountLineItemsUpdateWithoutTagsInputSchema: z.ZodType<Prisma.FinAccountLineItemsUpdateWithoutTagsInput> =
  z
    .object({
      t_account: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      t_date_posted: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_type: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_schc_category: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_amt: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_symbol: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_qty: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      t_price: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_commission: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_fee: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_method: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_source: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_origin: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      opt_expiration: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      opt_type: z
        .union([
          z.lazy(() => account_line_items_opt_typeSchema),
          z.lazy(() => NullableEnumaccount_line_items_opt_typeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      opt_strike: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_comment: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_from: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_to: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_interest_rate: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_cusip: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_harvested_amount: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      parent_t_id: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      when_added: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const FinAccountLineItemsUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.FinAccountLineItemsUncheckedUpdateWithoutTagsInput> =
  z
    .object({
      t_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      t_account: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_date: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      t_date_posted: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_type: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_schc_category: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_amt: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_symbol: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_qty: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      t_price: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_commission: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_fee: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_method: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_source: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_origin: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      opt_expiration: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      opt_type: z
        .union([
          z.lazy(() => account_line_items_opt_typeSchema),
          z.lazy(() => NullableEnumaccount_line_items_opt_typeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      opt_strike: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      t_description: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_comment: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_from: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_to: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_interest_rate: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_cusip: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_harvested_amount: z
        .union([
          z
            .union([z.number(), z.string(), z.instanceof(Decimal), z.instanceof(Prisma.Decimal), DecimalJsLikeSchema])
            .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
          z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      parent_t_id: z
        .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      when_added: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const FinAccountTagUpsertWithoutFinAccountLineItemTagMapInputSchema: z.ZodType<Prisma.FinAccountTagUpsertWithoutFinAccountLineItemTagMapInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => FinAccountTagUpdateWithoutFinAccountLineItemTagMapInputSchema),
        z.lazy(() => FinAccountTagUncheckedUpdateWithoutFinAccountLineItemTagMapInputSchema),
      ]),
      create: z.union([
        z.lazy(() => FinAccountTagCreateWithoutFinAccountLineItemTagMapInputSchema),
        z.lazy(() => FinAccountTagUncheckedCreateWithoutFinAccountLineItemTagMapInputSchema),
      ]),
      where: z.lazy(() => FinAccountTagWhereInputSchema).optional(),
    })
    .strict()

export const FinAccountTagUpdateToOneWithWhereWithoutFinAccountLineItemTagMapInputSchema: z.ZodType<Prisma.FinAccountTagUpdateToOneWithWhereWithoutFinAccountLineItemTagMapInput> =
  z
    .object({
      where: z.lazy(() => FinAccountTagWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => FinAccountTagUpdateWithoutFinAccountLineItemTagMapInputSchema),
        z.lazy(() => FinAccountTagUncheckedUpdateWithoutFinAccountLineItemTagMapInputSchema),
      ]),
    })
    .strict()

export const FinAccountTagUpdateWithoutFinAccountLineItemTagMapInputSchema: z.ZodType<Prisma.FinAccountTagUpdateWithoutFinAccountLineItemTagMapInput> =
  z
    .object({
      tag_userid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      tag_color: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      tag_label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const FinAccountTagUncheckedUpdateWithoutFinAccountLineItemTagMapInputSchema: z.ZodType<Prisma.FinAccountTagUncheckedUpdateWithoutFinAccountLineItemTagMapInput> =
  z
    .object({
      tag_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      tag_userid: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      tag_color: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      tag_label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z
  .object({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
  .strict()

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z
  .object({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
  })
  .strict()

export const TwoFactorCreateManyUserInputSchema: z.ZodType<Prisma.TwoFactorCreateManyUserInput> = z
  .object({
    id: z.string(),
    secret: z.string(),
    backupCodes: z.string(),
  })
  .strict()

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    accountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    providerId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    accessToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    refreshToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    idToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    scope: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    password: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    accountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    providerId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    accessToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    refreshToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    idToken: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    scope: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    password: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      accountId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      providerId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      accessToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      refreshToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      idToken: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      accessTokenExpiresAt: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      refreshTokenExpiresAt: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      scope: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      password: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    ipAddress: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    userAgent: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    ipAddress: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    userAgent: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      ipAddress: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      userAgent: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const TwoFactorUpdateWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUpdateWithoutUserInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    secret: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    backupCodes: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const TwoFactorUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUncheckedUpdateWithoutUserInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    secret: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    backupCodes: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict()

export const TwoFactorUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      secret: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      backupCodes: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapCreateManyTransactionInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateManyTransactionInput> =
  z
    .object({
      id: z.number().int().optional(),
      when_added: z.coerce.date().optional(),
      when_deleted: z.coerce.date().optional().nullable(),
      tag_id: z.number().int(),
    })
    .strict()

export const FinAccountLineItemTagMapUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpdateWithoutTransactionInput> =
  z
    .object({
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      tag: z.lazy(() => FinAccountTagUpdateOneRequiredWithoutFinAccountLineItemTagMapNestedInputSchema).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapUncheckedUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUncheckedUpdateWithoutTransactionInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      tag_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapUncheckedUpdateManyWithoutTransactionInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUncheckedUpdateManyWithoutTransactionInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      tag_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const TimeSeriesSeriesCreateManyTimeseries_documentsInputSchema: z.ZodType<Prisma.TimeSeriesSeriesCreateManyTimeseries_documentsInput> =
  z
    .object({
      id: z.number().int().optional(),
      series_name: z.string(),
    })
    .strict()

export const TimeSeriesSeriesUpdateWithoutTimeseries_documentsInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUpdateWithoutTimeseries_documentsInput> =
  z
    .object({
      series_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      timeseries_datapoint: z.lazy(() => TimeSeriesDatapointUpdateManyWithoutTimeseries_seriesNestedInputSchema).optional(),
    })
    .strict()

export const TimeSeriesSeriesUncheckedUpdateWithoutTimeseries_documentsInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUncheckedUpdateWithoutTimeseries_documentsInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      series_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      timeseries_datapoint: z
        .lazy(() => TimeSeriesDatapointUncheckedUpdateManyWithoutTimeseries_seriesNestedInputSchema)
        .optional(),
    })
    .strict()

export const TimeSeriesSeriesUncheckedUpdateManyWithoutTimeseries_documentsInputSchema: z.ZodType<Prisma.TimeSeriesSeriesUncheckedUpdateManyWithoutTimeseries_documentsInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      series_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const TimeSeriesDatapointCreateManyTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDatapointCreateManyTimeseries_seriesInput> =
  z
    .object({
      dp_id: z.number().int().optional(),
      dp_date: z.coerce.date().optional().nullable(),
      dp_value: z.string().optional().nullable(),
      dp_comment: z.string().optional().nullable(),
    })
    .strict()

export const TimeSeriesDatapointUpdateWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUpdateWithoutTimeseries_seriesInput> =
  z
    .object({
      dp_date: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      dp_value: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      dp_comment: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const TimeSeriesDatapointUncheckedUpdateWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUncheckedUpdateWithoutTimeseries_seriesInput> =
  z
    .object({
      dp_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      dp_date: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      dp_value: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      dp_comment: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const TimeSeriesDatapointUncheckedUpdateManyWithoutTimeseries_seriesInputSchema: z.ZodType<Prisma.TimeSeriesDatapointUncheckedUpdateManyWithoutTimeseries_seriesInput> =
  z
    .object({
      dp_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      dp_date: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      dp_value: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      dp_comment: z
        .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
    })
    .strict()

export const FinAccountLineItemTagMapCreateManyTagInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateManyTagInput> =
  z
    .object({
      id: z.number().int().optional(),
      when_added: z.coerce.date().optional(),
      when_deleted: z.coerce.date().optional().nullable(),
      t_id: z.number().int(),
    })
    .strict()

export const FinAccountLineItemTagMapUpdateWithoutTagInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpdateWithoutTagInput> =
  z
    .object({
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      transaction: z.lazy(() => FinAccountLineItemsUpdateOneRequiredWithoutTagsNestedInputSchema).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUncheckedUpdateWithoutTagInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

export const FinAccountLineItemTagMapUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUncheckedUpdateManyWithoutTagInput> =
  z
    .object({
      id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
      when_added: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
      when_deleted: z
        .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
        .optional()
        .nullable(),
      t_id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict()

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema]).optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereInputSchema.optional(),
    orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
    cursor: SessionWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereInputSchema.optional(),
    orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
    cursor: SessionWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereInputSchema.optional(),
    orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
    cursor: SessionWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z
  .object({
    where: SessionWhereInputSchema.optional(),
    orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
    cursor: SessionWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z
  .object({
    where: SessionWhereInputSchema.optional(),
    orderBy: z
      .union([SessionOrderByWithAggregationInputSchema.array(), SessionOrderByWithAggregationInputSchema])
      .optional(),
    by: SessionScalarFieldEnumSchema.array(),
    having: SessionScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
  })
  .strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
  })
  .strict()

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereInputSchema.optional(),
    orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
    cursor: AccountWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereInputSchema.optional(),
    orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
    cursor: AccountWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereInputSchema.optional(),
    orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
    cursor: AccountWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z
  .object({
    where: AccountWhereInputSchema.optional(),
    orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
    cursor: AccountWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z
  .object({
    where: AccountWhereInputSchema.optional(),
    orderBy: z
      .union([AccountOrderByWithAggregationInputSchema.array(), AccountOrderByWithAggregationInputSchema])
      .optional(),
    by: AccountScalarFieldEnumSchema.array(),
    having: AccountScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
  })
  .strict()

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
  })
  .strict()

export const VerificationFindFirstArgsSchema: z.ZodType<Prisma.VerificationFindFirstArgs> = z
  .object({
    select: VerificationSelectSchema.optional(),
    where: VerificationWhereInputSchema.optional(),
    orderBy: z
      .union([VerificationOrderByWithRelationInputSchema.array(), VerificationOrderByWithRelationInputSchema])
      .optional(),
    cursor: VerificationWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([VerificationScalarFieldEnumSchema, VerificationScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const VerificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindFirstOrThrowArgs> = z
  .object({
    select: VerificationSelectSchema.optional(),
    where: VerificationWhereInputSchema.optional(),
    orderBy: z
      .union([VerificationOrderByWithRelationInputSchema.array(), VerificationOrderByWithRelationInputSchema])
      .optional(),
    cursor: VerificationWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([VerificationScalarFieldEnumSchema, VerificationScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const VerificationFindManyArgsSchema: z.ZodType<Prisma.VerificationFindManyArgs> = z
  .object({
    select: VerificationSelectSchema.optional(),
    where: VerificationWhereInputSchema.optional(),
    orderBy: z
      .union([VerificationOrderByWithRelationInputSchema.array(), VerificationOrderByWithRelationInputSchema])
      .optional(),
    cursor: VerificationWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([VerificationScalarFieldEnumSchema, VerificationScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const VerificationAggregateArgsSchema: z.ZodType<Prisma.VerificationAggregateArgs> = z
  .object({
    where: VerificationWhereInputSchema.optional(),
    orderBy: z
      .union([VerificationOrderByWithRelationInputSchema.array(), VerificationOrderByWithRelationInputSchema])
      .optional(),
    cursor: VerificationWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const VerificationGroupByArgsSchema: z.ZodType<Prisma.VerificationGroupByArgs> = z
  .object({
    where: VerificationWhereInputSchema.optional(),
    orderBy: z
      .union([VerificationOrderByWithAggregationInputSchema.array(), VerificationOrderByWithAggregationInputSchema])
      .optional(),
    by: VerificationScalarFieldEnumSchema.array(),
    having: VerificationScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const VerificationFindUniqueArgsSchema: z.ZodType<Prisma.VerificationFindUniqueArgs> = z
  .object({
    select: VerificationSelectSchema.optional(),
    where: VerificationWhereUniqueInputSchema,
  })
  .strict()

export const VerificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindUniqueOrThrowArgs> = z
  .object({
    select: VerificationSelectSchema.optional(),
    where: VerificationWhereUniqueInputSchema,
  })
  .strict()

export const TwoFactorFindFirstArgsSchema: z.ZodType<Prisma.TwoFactorFindFirstArgs> = z
  .object({
    select: TwoFactorSelectSchema.optional(),
    include: TwoFactorIncludeSchema.optional(),
    where: TwoFactorWhereInputSchema.optional(),
    orderBy: z.union([TwoFactorOrderByWithRelationInputSchema.array(), TwoFactorOrderByWithRelationInputSchema]).optional(),
    cursor: TwoFactorWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TwoFactorScalarFieldEnumSchema, TwoFactorScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const TwoFactorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TwoFactorFindFirstOrThrowArgs> = z
  .object({
    select: TwoFactorSelectSchema.optional(),
    include: TwoFactorIncludeSchema.optional(),
    where: TwoFactorWhereInputSchema.optional(),
    orderBy: z.union([TwoFactorOrderByWithRelationInputSchema.array(), TwoFactorOrderByWithRelationInputSchema]).optional(),
    cursor: TwoFactorWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TwoFactorScalarFieldEnumSchema, TwoFactorScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const TwoFactorFindManyArgsSchema: z.ZodType<Prisma.TwoFactorFindManyArgs> = z
  .object({
    select: TwoFactorSelectSchema.optional(),
    include: TwoFactorIncludeSchema.optional(),
    where: TwoFactorWhereInputSchema.optional(),
    orderBy: z.union([TwoFactorOrderByWithRelationInputSchema.array(), TwoFactorOrderByWithRelationInputSchema]).optional(),
    cursor: TwoFactorWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TwoFactorScalarFieldEnumSchema, TwoFactorScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const TwoFactorAggregateArgsSchema: z.ZodType<Prisma.TwoFactorAggregateArgs> = z
  .object({
    where: TwoFactorWhereInputSchema.optional(),
    orderBy: z.union([TwoFactorOrderByWithRelationInputSchema.array(), TwoFactorOrderByWithRelationInputSchema]).optional(),
    cursor: TwoFactorWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const TwoFactorGroupByArgsSchema: z.ZodType<Prisma.TwoFactorGroupByArgs> = z
  .object({
    where: TwoFactorWhereInputSchema.optional(),
    orderBy: z
      .union([TwoFactorOrderByWithAggregationInputSchema.array(), TwoFactorOrderByWithAggregationInputSchema])
      .optional(),
    by: TwoFactorScalarFieldEnumSchema.array(),
    having: TwoFactorScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const TwoFactorFindUniqueArgsSchema: z.ZodType<Prisma.TwoFactorFindUniqueArgs> = z
  .object({
    select: TwoFactorSelectSchema.optional(),
    include: TwoFactorIncludeSchema.optional(),
    where: TwoFactorWhereUniqueInputSchema,
  })
  .strict()

export const TwoFactorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TwoFactorFindUniqueOrThrowArgs> = z
  .object({
    select: TwoFactorSelectSchema.optional(),
    include: TwoFactorIncludeSchema.optional(),
    where: TwoFactorWhereUniqueInputSchema,
  })
  .strict()

export const PhrLabResultFindFirstArgsSchema: z.ZodType<Prisma.PhrLabResultFindFirstArgs> = z
  .object({
    select: PhrLabResultSelectSchema.optional(),
    where: PhrLabResultWhereInputSchema.optional(),
    orderBy: z
      .union([PhrLabResultOrderByWithRelationInputSchema.array(), PhrLabResultOrderByWithRelationInputSchema])
      .optional(),
    cursor: PhrLabResultWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([PhrLabResultScalarFieldEnumSchema, PhrLabResultScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const PhrLabResultFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PhrLabResultFindFirstOrThrowArgs> = z
  .object({
    select: PhrLabResultSelectSchema.optional(),
    where: PhrLabResultWhereInputSchema.optional(),
    orderBy: z
      .union([PhrLabResultOrderByWithRelationInputSchema.array(), PhrLabResultOrderByWithRelationInputSchema])
      .optional(),
    cursor: PhrLabResultWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([PhrLabResultScalarFieldEnumSchema, PhrLabResultScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const PhrLabResultFindManyArgsSchema: z.ZodType<Prisma.PhrLabResultFindManyArgs> = z
  .object({
    select: PhrLabResultSelectSchema.optional(),
    where: PhrLabResultWhereInputSchema.optional(),
    orderBy: z
      .union([PhrLabResultOrderByWithRelationInputSchema.array(), PhrLabResultOrderByWithRelationInputSchema])
      .optional(),
    cursor: PhrLabResultWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([PhrLabResultScalarFieldEnumSchema, PhrLabResultScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const PhrLabResultAggregateArgsSchema: z.ZodType<Prisma.PhrLabResultAggregateArgs> = z
  .object({
    where: PhrLabResultWhereInputSchema.optional(),
    orderBy: z
      .union([PhrLabResultOrderByWithRelationInputSchema.array(), PhrLabResultOrderByWithRelationInputSchema])
      .optional(),
    cursor: PhrLabResultWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const PhrLabResultGroupByArgsSchema: z.ZodType<Prisma.PhrLabResultGroupByArgs> = z
  .object({
    where: PhrLabResultWhereInputSchema.optional(),
    orderBy: z
      .union([PhrLabResultOrderByWithAggregationInputSchema.array(), PhrLabResultOrderByWithAggregationInputSchema])
      .optional(),
    by: PhrLabResultScalarFieldEnumSchema.array(),
    having: PhrLabResultScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const PhrLabResultFindUniqueArgsSchema: z.ZodType<Prisma.PhrLabResultFindUniqueArgs> = z
  .object({
    select: PhrLabResultSelectSchema.optional(),
    where: PhrLabResultWhereUniqueInputSchema,
  })
  .strict()

export const PhrLabResultFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PhrLabResultFindUniqueOrThrowArgs> = z
  .object({
    select: PhrLabResultSelectSchema.optional(),
    where: PhrLabResultWhereUniqueInputSchema,
  })
  .strict()

export const ProductKeyFindFirstArgsSchema: z.ZodType<Prisma.ProductKeyFindFirstArgs> = z
  .object({
    select: ProductKeySelectSchema.optional(),
    where: ProductKeyWhereInputSchema.optional(),
    orderBy: z
      .union([ProductKeyOrderByWithRelationInputSchema.array(), ProductKeyOrderByWithRelationInputSchema])
      .optional(),
    cursor: ProductKeyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductKeyScalarFieldEnumSchema, ProductKeyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const ProductKeyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductKeyFindFirstOrThrowArgs> = z
  .object({
    select: ProductKeySelectSchema.optional(),
    where: ProductKeyWhereInputSchema.optional(),
    orderBy: z
      .union([ProductKeyOrderByWithRelationInputSchema.array(), ProductKeyOrderByWithRelationInputSchema])
      .optional(),
    cursor: ProductKeyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductKeyScalarFieldEnumSchema, ProductKeyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const ProductKeyFindManyArgsSchema: z.ZodType<Prisma.ProductKeyFindManyArgs> = z
  .object({
    select: ProductKeySelectSchema.optional(),
    where: ProductKeyWhereInputSchema.optional(),
    orderBy: z
      .union([ProductKeyOrderByWithRelationInputSchema.array(), ProductKeyOrderByWithRelationInputSchema])
      .optional(),
    cursor: ProductKeyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductKeyScalarFieldEnumSchema, ProductKeyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const ProductKeyAggregateArgsSchema: z.ZodType<Prisma.ProductKeyAggregateArgs> = z
  .object({
    where: ProductKeyWhereInputSchema.optional(),
    orderBy: z
      .union([ProductKeyOrderByWithRelationInputSchema.array(), ProductKeyOrderByWithRelationInputSchema])
      .optional(),
    cursor: ProductKeyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const ProductKeyGroupByArgsSchema: z.ZodType<Prisma.ProductKeyGroupByArgs> = z
  .object({
    where: ProductKeyWhereInputSchema.optional(),
    orderBy: z
      .union([ProductKeyOrderByWithAggregationInputSchema.array(), ProductKeyOrderByWithAggregationInputSchema])
      .optional(),
    by: ProductKeyScalarFieldEnumSchema.array(),
    having: ProductKeyScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const ProductKeyFindUniqueArgsSchema: z.ZodType<Prisma.ProductKeyFindUniqueArgs> = z
  .object({
    select: ProductKeySelectSchema.optional(),
    where: ProductKeyWhereUniqueInputSchema,
  })
  .strict()

export const ProductKeyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductKeyFindUniqueOrThrowArgs> = z
  .object({
    select: ProductKeySelectSchema.optional(),
    where: ProductKeyWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountsFindFirstArgsSchema: z.ZodType<Prisma.FinAccountsFindFirstArgs> = z
  .object({
    select: FinAccountsSelectSchema.optional(),
    where: FinAccountsWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountsOrderByWithRelationInputSchema.array(), FinAccountsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinAccountsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinAccountsScalarFieldEnumSchema, FinAccountsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinAccountsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FinAccountsFindFirstOrThrowArgs> = z
  .object({
    select: FinAccountsSelectSchema.optional(),
    where: FinAccountsWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountsOrderByWithRelationInputSchema.array(), FinAccountsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinAccountsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinAccountsScalarFieldEnumSchema, FinAccountsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinAccountsFindManyArgsSchema: z.ZodType<Prisma.FinAccountsFindManyArgs> = z
  .object({
    select: FinAccountsSelectSchema.optional(),
    where: FinAccountsWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountsOrderByWithRelationInputSchema.array(), FinAccountsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinAccountsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinAccountsScalarFieldEnumSchema, FinAccountsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinAccountsAggregateArgsSchema: z.ZodType<Prisma.FinAccountsAggregateArgs> = z
  .object({
    where: FinAccountsWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountsOrderByWithRelationInputSchema.array(), FinAccountsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinAccountsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinAccountsGroupByArgsSchema: z.ZodType<Prisma.FinAccountsGroupByArgs> = z
  .object({
    where: FinAccountsWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountsOrderByWithAggregationInputSchema.array(), FinAccountsOrderByWithAggregationInputSchema])
      .optional(),
    by: FinAccountsScalarFieldEnumSchema.array(),
    having: FinAccountsScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinAccountsFindUniqueArgsSchema: z.ZodType<Prisma.FinAccountsFindUniqueArgs> = z
  .object({
    select: FinAccountsSelectSchema.optional(),
    where: FinAccountsWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FinAccountsFindUniqueOrThrowArgs> = z
  .object({
    select: FinAccountsSelectSchema.optional(),
    where: FinAccountsWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountLineItemsFindFirstArgsSchema: z.ZodType<Prisma.FinAccountLineItemsFindFirstArgs> = z
  .object({
    select: FinAccountLineItemsSelectSchema.optional(),
    include: FinAccountLineItemsIncludeSchema.optional(),
    where: FinAccountLineItemsWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountLineItemsOrderByWithRelationInputSchema.array(), FinAccountLineItemsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinAccountLineItemsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([FinAccountLineItemsScalarFieldEnumSchema, FinAccountLineItemsScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const FinAccountLineItemsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FinAccountLineItemsFindFirstOrThrowArgs> = z
  .object({
    select: FinAccountLineItemsSelectSchema.optional(),
    include: FinAccountLineItemsIncludeSchema.optional(),
    where: FinAccountLineItemsWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountLineItemsOrderByWithRelationInputSchema.array(), FinAccountLineItemsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinAccountLineItemsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([FinAccountLineItemsScalarFieldEnumSchema, FinAccountLineItemsScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const FinAccountLineItemsFindManyArgsSchema: z.ZodType<Prisma.FinAccountLineItemsFindManyArgs> = z
  .object({
    select: FinAccountLineItemsSelectSchema.optional(),
    include: FinAccountLineItemsIncludeSchema.optional(),
    where: FinAccountLineItemsWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountLineItemsOrderByWithRelationInputSchema.array(), FinAccountLineItemsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinAccountLineItemsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([FinAccountLineItemsScalarFieldEnumSchema, FinAccountLineItemsScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const FinAccountLineItemsAggregateArgsSchema: z.ZodType<Prisma.FinAccountLineItemsAggregateArgs> = z
  .object({
    where: FinAccountLineItemsWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountLineItemsOrderByWithRelationInputSchema.array(), FinAccountLineItemsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinAccountLineItemsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinAccountLineItemsGroupByArgsSchema: z.ZodType<Prisma.FinAccountLineItemsGroupByArgs> = z
  .object({
    where: FinAccountLineItemsWhereInputSchema.optional(),
    orderBy: z
      .union([
        FinAccountLineItemsOrderByWithAggregationInputSchema.array(),
        FinAccountLineItemsOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: FinAccountLineItemsScalarFieldEnumSchema.array(),
    having: FinAccountLineItemsScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinAccountLineItemsFindUniqueArgsSchema: z.ZodType<Prisma.FinAccountLineItemsFindUniqueArgs> = z
  .object({
    select: FinAccountLineItemsSelectSchema.optional(),
    include: FinAccountLineItemsIncludeSchema.optional(),
    where: FinAccountLineItemsWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountLineItemsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FinAccountLineItemsFindUniqueOrThrowArgs> = z
  .object({
    select: FinAccountLineItemsSelectSchema.optional(),
    include: FinAccountLineItemsIncludeSchema.optional(),
    where: FinAccountLineItemsWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountBalanceSnapshotFindFirstArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotFindFirstArgs> = z
  .object({
    select: FinAccountBalanceSnapshotSelectSchema.optional(),
    where: FinAccountBalanceSnapshotWhereInputSchema.optional(),
    orderBy: z
      .union([
        FinAccountBalanceSnapshotOrderByWithRelationInputSchema.array(),
        FinAccountBalanceSnapshotOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: FinAccountBalanceSnapshotWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([FinAccountBalanceSnapshotScalarFieldEnumSchema, FinAccountBalanceSnapshotScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const FinAccountBalanceSnapshotFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotFindFirstOrThrowArgs> =
  z
    .object({
      select: FinAccountBalanceSnapshotSelectSchema.optional(),
      where: FinAccountBalanceSnapshotWhereInputSchema.optional(),
      orderBy: z
        .union([
          FinAccountBalanceSnapshotOrderByWithRelationInputSchema.array(),
          FinAccountBalanceSnapshotOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: FinAccountBalanceSnapshotWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([FinAccountBalanceSnapshotScalarFieldEnumSchema, FinAccountBalanceSnapshotScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict()

export const FinAccountBalanceSnapshotFindManyArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotFindManyArgs> = z
  .object({
    select: FinAccountBalanceSnapshotSelectSchema.optional(),
    where: FinAccountBalanceSnapshotWhereInputSchema.optional(),
    orderBy: z
      .union([
        FinAccountBalanceSnapshotOrderByWithRelationInputSchema.array(),
        FinAccountBalanceSnapshotOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: FinAccountBalanceSnapshotWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([FinAccountBalanceSnapshotScalarFieldEnumSchema, FinAccountBalanceSnapshotScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const FinAccountBalanceSnapshotAggregateArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotAggregateArgs> = z
  .object({
    where: FinAccountBalanceSnapshotWhereInputSchema.optional(),
    orderBy: z
      .union([
        FinAccountBalanceSnapshotOrderByWithRelationInputSchema.array(),
        FinAccountBalanceSnapshotOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: FinAccountBalanceSnapshotWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinAccountBalanceSnapshotGroupByArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotGroupByArgs> = z
  .object({
    where: FinAccountBalanceSnapshotWhereInputSchema.optional(),
    orderBy: z
      .union([
        FinAccountBalanceSnapshotOrderByWithAggregationInputSchema.array(),
        FinAccountBalanceSnapshotOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: FinAccountBalanceSnapshotScalarFieldEnumSchema.array(),
    having: FinAccountBalanceSnapshotScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinAccountBalanceSnapshotFindUniqueArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotFindUniqueArgs> = z
  .object({
    select: FinAccountBalanceSnapshotSelectSchema.optional(),
    where: FinAccountBalanceSnapshotWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountBalanceSnapshotFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotFindUniqueOrThrowArgs> =
  z
    .object({
      select: FinAccountBalanceSnapshotSelectSchema.optional(),
      where: FinAccountBalanceSnapshotWhereUniqueInputSchema,
    })
    .strict()

export const EarningsAnnualFindFirstArgsSchema: z.ZodType<Prisma.EarningsAnnualFindFirstArgs> = z
  .object({
    select: EarningsAnnualSelectSchema.optional(),
    where: EarningsAnnualWhereInputSchema.optional(),
    orderBy: z
      .union([EarningsAnnualOrderByWithRelationInputSchema.array(), EarningsAnnualOrderByWithRelationInputSchema])
      .optional(),
    cursor: EarningsAnnualWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([EarningsAnnualScalarFieldEnumSchema, EarningsAnnualScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const EarningsAnnualFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EarningsAnnualFindFirstOrThrowArgs> = z
  .object({
    select: EarningsAnnualSelectSchema.optional(),
    where: EarningsAnnualWhereInputSchema.optional(),
    orderBy: z
      .union([EarningsAnnualOrderByWithRelationInputSchema.array(), EarningsAnnualOrderByWithRelationInputSchema])
      .optional(),
    cursor: EarningsAnnualWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([EarningsAnnualScalarFieldEnumSchema, EarningsAnnualScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const EarningsAnnualFindManyArgsSchema: z.ZodType<Prisma.EarningsAnnualFindManyArgs> = z
  .object({
    select: EarningsAnnualSelectSchema.optional(),
    where: EarningsAnnualWhereInputSchema.optional(),
    orderBy: z
      .union([EarningsAnnualOrderByWithRelationInputSchema.array(), EarningsAnnualOrderByWithRelationInputSchema])
      .optional(),
    cursor: EarningsAnnualWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([EarningsAnnualScalarFieldEnumSchema, EarningsAnnualScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const EarningsAnnualAggregateArgsSchema: z.ZodType<Prisma.EarningsAnnualAggregateArgs> = z
  .object({
    where: EarningsAnnualWhereInputSchema.optional(),
    orderBy: z
      .union([EarningsAnnualOrderByWithRelationInputSchema.array(), EarningsAnnualOrderByWithRelationInputSchema])
      .optional(),
    cursor: EarningsAnnualWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const EarningsAnnualGroupByArgsSchema: z.ZodType<Prisma.EarningsAnnualGroupByArgs> = z
  .object({
    where: EarningsAnnualWhereInputSchema.optional(),
    orderBy: z
      .union([EarningsAnnualOrderByWithAggregationInputSchema.array(), EarningsAnnualOrderByWithAggregationInputSchema])
      .optional(),
    by: EarningsAnnualScalarFieldEnumSchema.array(),
    having: EarningsAnnualScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const EarningsAnnualFindUniqueArgsSchema: z.ZodType<Prisma.EarningsAnnualFindUniqueArgs> = z
  .object({
    select: EarningsAnnualSelectSchema.optional(),
    where: EarningsAnnualWhereUniqueInputSchema,
  })
  .strict()

export const EarningsAnnualFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EarningsAnnualFindUniqueOrThrowArgs> = z
  .object({
    select: EarningsAnnualSelectSchema.optional(),
    where: EarningsAnnualWhereUniqueInputSchema,
  })
  .strict()

export const EarningsQuarterlyFindFirstArgsSchema: z.ZodType<Prisma.EarningsQuarterlyFindFirstArgs> = z
  .object({
    select: EarningsQuarterlySelectSchema.optional(),
    where: EarningsQuarterlyWhereInputSchema.optional(),
    orderBy: z
      .union([EarningsQuarterlyOrderByWithRelationInputSchema.array(), EarningsQuarterlyOrderByWithRelationInputSchema])
      .optional(),
    cursor: EarningsQuarterlyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([EarningsQuarterlyScalarFieldEnumSchema, EarningsQuarterlyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const EarningsQuarterlyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EarningsQuarterlyFindFirstOrThrowArgs> = z
  .object({
    select: EarningsQuarterlySelectSchema.optional(),
    where: EarningsQuarterlyWhereInputSchema.optional(),
    orderBy: z
      .union([EarningsQuarterlyOrderByWithRelationInputSchema.array(), EarningsQuarterlyOrderByWithRelationInputSchema])
      .optional(),
    cursor: EarningsQuarterlyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([EarningsQuarterlyScalarFieldEnumSchema, EarningsQuarterlyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const EarningsQuarterlyFindManyArgsSchema: z.ZodType<Prisma.EarningsQuarterlyFindManyArgs> = z
  .object({
    select: EarningsQuarterlySelectSchema.optional(),
    where: EarningsQuarterlyWhereInputSchema.optional(),
    orderBy: z
      .union([EarningsQuarterlyOrderByWithRelationInputSchema.array(), EarningsQuarterlyOrderByWithRelationInputSchema])
      .optional(),
    cursor: EarningsQuarterlyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([EarningsQuarterlyScalarFieldEnumSchema, EarningsQuarterlyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const EarningsQuarterlyAggregateArgsSchema: z.ZodType<Prisma.EarningsQuarterlyAggregateArgs> = z
  .object({
    where: EarningsQuarterlyWhereInputSchema.optional(),
    orderBy: z
      .union([EarningsQuarterlyOrderByWithRelationInputSchema.array(), EarningsQuarterlyOrderByWithRelationInputSchema])
      .optional(),
    cursor: EarningsQuarterlyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const EarningsQuarterlyGroupByArgsSchema: z.ZodType<Prisma.EarningsQuarterlyGroupByArgs> = z
  .object({
    where: EarningsQuarterlyWhereInputSchema.optional(),
    orderBy: z
      .union([
        EarningsQuarterlyOrderByWithAggregationInputSchema.array(),
        EarningsQuarterlyOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: EarningsQuarterlyScalarFieldEnumSchema.array(),
    having: EarningsQuarterlyScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const EarningsQuarterlyFindUniqueArgsSchema: z.ZodType<Prisma.EarningsQuarterlyFindUniqueArgs> = z
  .object({
    select: EarningsQuarterlySelectSchema.optional(),
    where: EarningsQuarterlyWhereUniqueInputSchema,
  })
  .strict()

export const EarningsQuarterlyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EarningsQuarterlyFindUniqueOrThrowArgs> = z
  .object({
    select: EarningsQuarterlySelectSchema.optional(),
    where: EarningsQuarterlyWhereUniqueInputSchema,
  })
  .strict()

export const FinEquityAwardsFindFirstArgsSchema: z.ZodType<Prisma.FinEquityAwardsFindFirstArgs> = z
  .object({
    select: FinEquityAwardsSelectSchema.optional(),
    where: FinEquityAwardsWhereInputSchema.optional(),
    orderBy: z
      .union([FinEquityAwardsOrderByWithRelationInputSchema.array(), FinEquityAwardsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinEquityAwardsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinEquityAwardsScalarFieldEnumSchema, FinEquityAwardsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinEquityAwardsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FinEquityAwardsFindFirstOrThrowArgs> = z
  .object({
    select: FinEquityAwardsSelectSchema.optional(),
    where: FinEquityAwardsWhereInputSchema.optional(),
    orderBy: z
      .union([FinEquityAwardsOrderByWithRelationInputSchema.array(), FinEquityAwardsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinEquityAwardsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinEquityAwardsScalarFieldEnumSchema, FinEquityAwardsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinEquityAwardsFindManyArgsSchema: z.ZodType<Prisma.FinEquityAwardsFindManyArgs> = z
  .object({
    select: FinEquityAwardsSelectSchema.optional(),
    where: FinEquityAwardsWhereInputSchema.optional(),
    orderBy: z
      .union([FinEquityAwardsOrderByWithRelationInputSchema.array(), FinEquityAwardsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinEquityAwardsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinEquityAwardsScalarFieldEnumSchema, FinEquityAwardsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinEquityAwardsAggregateArgsSchema: z.ZodType<Prisma.FinEquityAwardsAggregateArgs> = z
  .object({
    where: FinEquityAwardsWhereInputSchema.optional(),
    orderBy: z
      .union([FinEquityAwardsOrderByWithRelationInputSchema.array(), FinEquityAwardsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinEquityAwardsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinEquityAwardsGroupByArgsSchema: z.ZodType<Prisma.FinEquityAwardsGroupByArgs> = z
  .object({
    where: FinEquityAwardsWhereInputSchema.optional(),
    orderBy: z
      .union([FinEquityAwardsOrderByWithAggregationInputSchema.array(), FinEquityAwardsOrderByWithAggregationInputSchema])
      .optional(),
    by: FinEquityAwardsScalarFieldEnumSchema.array(),
    having: FinEquityAwardsScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinEquityAwardsFindUniqueArgsSchema: z.ZodType<Prisma.FinEquityAwardsFindUniqueArgs> = z
  .object({
    select: FinEquityAwardsSelectSchema.optional(),
    where: FinEquityAwardsWhereUniqueInputSchema,
  })
  .strict()

export const FinEquityAwardsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FinEquityAwardsFindUniqueOrThrowArgs> = z
  .object({
    select: FinEquityAwardsSelectSchema.optional(),
    where: FinEquityAwardsWhereUniqueInputSchema,
  })
  .strict()

export const FinPayslipsFindFirstArgsSchema: z.ZodType<Prisma.FinPayslipsFindFirstArgs> = z
  .object({
    select: FinPayslipsSelectSchema.optional(),
    where: FinPayslipsWhereInputSchema.optional(),
    orderBy: z
      .union([FinPayslipsOrderByWithRelationInputSchema.array(), FinPayslipsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinPayslipsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinPayslipsScalarFieldEnumSchema, FinPayslipsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinPayslipsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FinPayslipsFindFirstOrThrowArgs> = z
  .object({
    select: FinPayslipsSelectSchema.optional(),
    where: FinPayslipsWhereInputSchema.optional(),
    orderBy: z
      .union([FinPayslipsOrderByWithRelationInputSchema.array(), FinPayslipsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinPayslipsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinPayslipsScalarFieldEnumSchema, FinPayslipsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinPayslipsFindManyArgsSchema: z.ZodType<Prisma.FinPayslipsFindManyArgs> = z
  .object({
    select: FinPayslipsSelectSchema.optional(),
    where: FinPayslipsWhereInputSchema.optional(),
    orderBy: z
      .union([FinPayslipsOrderByWithRelationInputSchema.array(), FinPayslipsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinPayslipsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinPayslipsScalarFieldEnumSchema, FinPayslipsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinPayslipsAggregateArgsSchema: z.ZodType<Prisma.FinPayslipsAggregateArgs> = z
  .object({
    where: FinPayslipsWhereInputSchema.optional(),
    orderBy: z
      .union([FinPayslipsOrderByWithRelationInputSchema.array(), FinPayslipsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinPayslipsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinPayslipsGroupByArgsSchema: z.ZodType<Prisma.FinPayslipsGroupByArgs> = z
  .object({
    where: FinPayslipsWhereInputSchema.optional(),
    orderBy: z
      .union([FinPayslipsOrderByWithAggregationInputSchema.array(), FinPayslipsOrderByWithAggregationInputSchema])
      .optional(),
    by: FinPayslipsScalarFieldEnumSchema.array(),
    having: FinPayslipsScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinPayslipsFindUniqueArgsSchema: z.ZodType<Prisma.FinPayslipsFindUniqueArgs> = z
  .object({
    select: FinPayslipsSelectSchema.optional(),
    where: FinPayslipsWhereUniqueInputSchema,
  })
  .strict()

export const FinPayslipsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FinPayslipsFindUniqueOrThrowArgs> = z
  .object({
    select: FinPayslipsSelectSchema.optional(),
    where: FinPayslipsWhereUniqueInputSchema,
  })
  .strict()

export const FinPayslipUploadsFindFirstArgsSchema: z.ZodType<Prisma.FinPayslipUploadsFindFirstArgs> = z
  .object({
    select: FinPayslipUploadsSelectSchema.optional(),
    where: FinPayslipUploadsWhereInputSchema.optional(),
    orderBy: z
      .union([FinPayslipUploadsOrderByWithRelationInputSchema.array(), FinPayslipUploadsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinPayslipUploadsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinPayslipUploadsScalarFieldEnumSchema, FinPayslipUploadsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinPayslipUploadsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FinPayslipUploadsFindFirstOrThrowArgs> = z
  .object({
    select: FinPayslipUploadsSelectSchema.optional(),
    where: FinPayslipUploadsWhereInputSchema.optional(),
    orderBy: z
      .union([FinPayslipUploadsOrderByWithRelationInputSchema.array(), FinPayslipUploadsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinPayslipUploadsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinPayslipUploadsScalarFieldEnumSchema, FinPayslipUploadsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinPayslipUploadsFindManyArgsSchema: z.ZodType<Prisma.FinPayslipUploadsFindManyArgs> = z
  .object({
    select: FinPayslipUploadsSelectSchema.optional(),
    where: FinPayslipUploadsWhereInputSchema.optional(),
    orderBy: z
      .union([FinPayslipUploadsOrderByWithRelationInputSchema.array(), FinPayslipUploadsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinPayslipUploadsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinPayslipUploadsScalarFieldEnumSchema, FinPayslipUploadsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinPayslipUploadsAggregateArgsSchema: z.ZodType<Prisma.FinPayslipUploadsAggregateArgs> = z
  .object({
    where: FinPayslipUploadsWhereInputSchema.optional(),
    orderBy: z
      .union([FinPayslipUploadsOrderByWithRelationInputSchema.array(), FinPayslipUploadsOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinPayslipUploadsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinPayslipUploadsGroupByArgsSchema: z.ZodType<Prisma.FinPayslipUploadsGroupByArgs> = z
  .object({
    where: FinPayslipUploadsWhereInputSchema.optional(),
    orderBy: z
      .union([
        FinPayslipUploadsOrderByWithAggregationInputSchema.array(),
        FinPayslipUploadsOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: FinPayslipUploadsScalarFieldEnumSchema.array(),
    having: FinPayslipUploadsScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinPayslipUploadsFindUniqueArgsSchema: z.ZodType<Prisma.FinPayslipUploadsFindUniqueArgs> = z
  .object({
    select: FinPayslipUploadsSelectSchema.optional(),
    where: FinPayslipUploadsWhereUniqueInputSchema,
  })
  .strict()

export const FinPayslipUploadsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FinPayslipUploadsFindUniqueOrThrowArgs> = z
  .object({
    select: FinPayslipUploadsSelectSchema.optional(),
    where: FinPayslipUploadsWhereUniqueInputSchema,
  })
  .strict()

export const GraduatedTaxFindFirstArgsSchema: z.ZodType<Prisma.GraduatedTaxFindFirstArgs> = z
  .object({
    select: GraduatedTaxSelectSchema.optional(),
    where: GraduatedTaxWhereInputSchema.optional(),
    orderBy: z
      .union([GraduatedTaxOrderByWithRelationInputSchema.array(), GraduatedTaxOrderByWithRelationInputSchema])
      .optional(),
    cursor: GraduatedTaxWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([GraduatedTaxScalarFieldEnumSchema, GraduatedTaxScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const GraduatedTaxFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GraduatedTaxFindFirstOrThrowArgs> = z
  .object({
    select: GraduatedTaxSelectSchema.optional(),
    where: GraduatedTaxWhereInputSchema.optional(),
    orderBy: z
      .union([GraduatedTaxOrderByWithRelationInputSchema.array(), GraduatedTaxOrderByWithRelationInputSchema])
      .optional(),
    cursor: GraduatedTaxWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([GraduatedTaxScalarFieldEnumSchema, GraduatedTaxScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const GraduatedTaxFindManyArgsSchema: z.ZodType<Prisma.GraduatedTaxFindManyArgs> = z
  .object({
    select: GraduatedTaxSelectSchema.optional(),
    where: GraduatedTaxWhereInputSchema.optional(),
    orderBy: z
      .union([GraduatedTaxOrderByWithRelationInputSchema.array(), GraduatedTaxOrderByWithRelationInputSchema])
      .optional(),
    cursor: GraduatedTaxWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([GraduatedTaxScalarFieldEnumSchema, GraduatedTaxScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const GraduatedTaxAggregateArgsSchema: z.ZodType<Prisma.GraduatedTaxAggregateArgs> = z
  .object({
    where: GraduatedTaxWhereInputSchema.optional(),
    orderBy: z
      .union([GraduatedTaxOrderByWithRelationInputSchema.array(), GraduatedTaxOrderByWithRelationInputSchema])
      .optional(),
    cursor: GraduatedTaxWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const GraduatedTaxGroupByArgsSchema: z.ZodType<Prisma.GraduatedTaxGroupByArgs> = z
  .object({
    where: GraduatedTaxWhereInputSchema.optional(),
    orderBy: z
      .union([GraduatedTaxOrderByWithAggregationInputSchema.array(), GraduatedTaxOrderByWithAggregationInputSchema])
      .optional(),
    by: GraduatedTaxScalarFieldEnumSchema.array(),
    having: GraduatedTaxScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const GraduatedTaxFindUniqueArgsSchema: z.ZodType<Prisma.GraduatedTaxFindUniqueArgs> = z
  .object({
    select: GraduatedTaxSelectSchema.optional(),
    where: GraduatedTaxWhereUniqueInputSchema,
  })
  .strict()

export const GraduatedTaxFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GraduatedTaxFindUniqueOrThrowArgs> = z
  .object({
    select: GraduatedTaxSelectSchema.optional(),
    where: GraduatedTaxWhereUniqueInputSchema,
  })
  .strict()

export const PHRPatientVitalsFindFirstArgsSchema: z.ZodType<Prisma.PHRPatientVitalsFindFirstArgs> = z
  .object({
    select: PHRPatientVitalsSelectSchema.optional(),
    where: PHRPatientVitalsWhereInputSchema.optional(),
    orderBy: z
      .union([PHRPatientVitalsOrderByWithRelationInputSchema.array(), PHRPatientVitalsOrderByWithRelationInputSchema])
      .optional(),
    cursor: PHRPatientVitalsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([PHRPatientVitalsScalarFieldEnumSchema, PHRPatientVitalsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const PHRPatientVitalsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PHRPatientVitalsFindFirstOrThrowArgs> = z
  .object({
    select: PHRPatientVitalsSelectSchema.optional(),
    where: PHRPatientVitalsWhereInputSchema.optional(),
    orderBy: z
      .union([PHRPatientVitalsOrderByWithRelationInputSchema.array(), PHRPatientVitalsOrderByWithRelationInputSchema])
      .optional(),
    cursor: PHRPatientVitalsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([PHRPatientVitalsScalarFieldEnumSchema, PHRPatientVitalsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const PHRPatientVitalsFindManyArgsSchema: z.ZodType<Prisma.PHRPatientVitalsFindManyArgs> = z
  .object({
    select: PHRPatientVitalsSelectSchema.optional(),
    where: PHRPatientVitalsWhereInputSchema.optional(),
    orderBy: z
      .union([PHRPatientVitalsOrderByWithRelationInputSchema.array(), PHRPatientVitalsOrderByWithRelationInputSchema])
      .optional(),
    cursor: PHRPatientVitalsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([PHRPatientVitalsScalarFieldEnumSchema, PHRPatientVitalsScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const PHRPatientVitalsAggregateArgsSchema: z.ZodType<Prisma.PHRPatientVitalsAggregateArgs> = z
  .object({
    where: PHRPatientVitalsWhereInputSchema.optional(),
    orderBy: z
      .union([PHRPatientVitalsOrderByWithRelationInputSchema.array(), PHRPatientVitalsOrderByWithRelationInputSchema])
      .optional(),
    cursor: PHRPatientVitalsWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const PHRPatientVitalsGroupByArgsSchema: z.ZodType<Prisma.PHRPatientVitalsGroupByArgs> = z
  .object({
    where: PHRPatientVitalsWhereInputSchema.optional(),
    orderBy: z
      .union([PHRPatientVitalsOrderByWithAggregationInputSchema.array(), PHRPatientVitalsOrderByWithAggregationInputSchema])
      .optional(),
    by: PHRPatientVitalsScalarFieldEnumSchema.array(),
    having: PHRPatientVitalsScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const PHRPatientVitalsFindUniqueArgsSchema: z.ZodType<Prisma.PHRPatientVitalsFindUniqueArgs> = z
  .object({
    select: PHRPatientVitalsSelectSchema.optional(),
    where: PHRPatientVitalsWhereUniqueInputSchema,
  })
  .strict()

export const PHRPatientVitalsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PHRPatientVitalsFindUniqueOrThrowArgs> = z
  .object({
    select: PHRPatientVitalsSelectSchema.optional(),
    where: PHRPatientVitalsWhereUniqueInputSchema,
  })
  .strict()

export const StockQuotesDailyFindFirstArgsSchema: z.ZodType<Prisma.StockQuotesDailyFindFirstArgs> = z
  .object({
    select: StockQuotesDailySelectSchema.optional(),
    where: StockQuotesDailyWhereInputSchema.optional(),
    orderBy: z
      .union([StockQuotesDailyOrderByWithRelationInputSchema.array(), StockQuotesDailyOrderByWithRelationInputSchema])
      .optional(),
    cursor: StockQuotesDailyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([StockQuotesDailyScalarFieldEnumSchema, StockQuotesDailyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const StockQuotesDailyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StockQuotesDailyFindFirstOrThrowArgs> = z
  .object({
    select: StockQuotesDailySelectSchema.optional(),
    where: StockQuotesDailyWhereInputSchema.optional(),
    orderBy: z
      .union([StockQuotesDailyOrderByWithRelationInputSchema.array(), StockQuotesDailyOrderByWithRelationInputSchema])
      .optional(),
    cursor: StockQuotesDailyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([StockQuotesDailyScalarFieldEnumSchema, StockQuotesDailyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const StockQuotesDailyFindManyArgsSchema: z.ZodType<Prisma.StockQuotesDailyFindManyArgs> = z
  .object({
    select: StockQuotesDailySelectSchema.optional(),
    where: StockQuotesDailyWhereInputSchema.optional(),
    orderBy: z
      .union([StockQuotesDailyOrderByWithRelationInputSchema.array(), StockQuotesDailyOrderByWithRelationInputSchema])
      .optional(),
    cursor: StockQuotesDailyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([StockQuotesDailyScalarFieldEnumSchema, StockQuotesDailyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const StockQuotesDailyAggregateArgsSchema: z.ZodType<Prisma.StockQuotesDailyAggregateArgs> = z
  .object({
    where: StockQuotesDailyWhereInputSchema.optional(),
    orderBy: z
      .union([StockQuotesDailyOrderByWithRelationInputSchema.array(), StockQuotesDailyOrderByWithRelationInputSchema])
      .optional(),
    cursor: StockQuotesDailyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const StockQuotesDailyGroupByArgsSchema: z.ZodType<Prisma.StockQuotesDailyGroupByArgs> = z
  .object({
    where: StockQuotesDailyWhereInputSchema.optional(),
    orderBy: z
      .union([StockQuotesDailyOrderByWithAggregationInputSchema.array(), StockQuotesDailyOrderByWithAggregationInputSchema])
      .optional(),
    by: StockQuotesDailyScalarFieldEnumSchema.array(),
    having: StockQuotesDailyScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const StockQuotesDailyFindUniqueArgsSchema: z.ZodType<Prisma.StockQuotesDailyFindUniqueArgs> = z
  .object({
    select: StockQuotesDailySelectSchema.optional(),
    where: StockQuotesDailyWhereUniqueInputSchema,
  })
  .strict()

export const StockQuotesDailyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StockQuotesDailyFindUniqueOrThrowArgs> = z
  .object({
    select: StockQuotesDailySelectSchema.optional(),
    where: StockQuotesDailyWhereUniqueInputSchema,
  })
  .strict()

export const TimeSeriesDatapointFindFirstArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointFindFirstArgs> = z
  .object({
    select: TimeSeriesDatapointSelectSchema.optional(),
    include: TimeSeriesDatapointIncludeSchema.optional(),
    where: TimeSeriesDatapointWhereInputSchema.optional(),
    orderBy: z
      .union([TimeSeriesDatapointOrderByWithRelationInputSchema.array(), TimeSeriesDatapointOrderByWithRelationInputSchema])
      .optional(),
    cursor: TimeSeriesDatapointWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TimeSeriesDatapointScalarFieldEnumSchema, TimeSeriesDatapointScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const TimeSeriesDatapointFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointFindFirstOrThrowArgs> = z
  .object({
    select: TimeSeriesDatapointSelectSchema.optional(),
    include: TimeSeriesDatapointIncludeSchema.optional(),
    where: TimeSeriesDatapointWhereInputSchema.optional(),
    orderBy: z
      .union([TimeSeriesDatapointOrderByWithRelationInputSchema.array(), TimeSeriesDatapointOrderByWithRelationInputSchema])
      .optional(),
    cursor: TimeSeriesDatapointWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TimeSeriesDatapointScalarFieldEnumSchema, TimeSeriesDatapointScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const TimeSeriesDatapointFindManyArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointFindManyArgs> = z
  .object({
    select: TimeSeriesDatapointSelectSchema.optional(),
    include: TimeSeriesDatapointIncludeSchema.optional(),
    where: TimeSeriesDatapointWhereInputSchema.optional(),
    orderBy: z
      .union([TimeSeriesDatapointOrderByWithRelationInputSchema.array(), TimeSeriesDatapointOrderByWithRelationInputSchema])
      .optional(),
    cursor: TimeSeriesDatapointWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TimeSeriesDatapointScalarFieldEnumSchema, TimeSeriesDatapointScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const TimeSeriesDatapointAggregateArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointAggregateArgs> = z
  .object({
    where: TimeSeriesDatapointWhereInputSchema.optional(),
    orderBy: z
      .union([TimeSeriesDatapointOrderByWithRelationInputSchema.array(), TimeSeriesDatapointOrderByWithRelationInputSchema])
      .optional(),
    cursor: TimeSeriesDatapointWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const TimeSeriesDatapointGroupByArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointGroupByArgs> = z
  .object({
    where: TimeSeriesDatapointWhereInputSchema.optional(),
    orderBy: z
      .union([
        TimeSeriesDatapointOrderByWithAggregationInputSchema.array(),
        TimeSeriesDatapointOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: TimeSeriesDatapointScalarFieldEnumSchema.array(),
    having: TimeSeriesDatapointScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const TimeSeriesDatapointFindUniqueArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointFindUniqueArgs> = z
  .object({
    select: TimeSeriesDatapointSelectSchema.optional(),
    include: TimeSeriesDatapointIncludeSchema.optional(),
    where: TimeSeriesDatapointWhereUniqueInputSchema,
  })
  .strict()

export const TimeSeriesDatapointFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointFindUniqueOrThrowArgs> = z
  .object({
    select: TimeSeriesDatapointSelectSchema.optional(),
    include: TimeSeriesDatapointIncludeSchema.optional(),
    where: TimeSeriesDatapointWhereUniqueInputSchema,
  })
  .strict()

export const TimeSeriesDocumentFindFirstArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentFindFirstArgs> = z
  .object({
    select: TimeSeriesDocumentSelectSchema.optional(),
    include: TimeSeriesDocumentIncludeSchema.optional(),
    where: TimeSeriesDocumentWhereInputSchema.optional(),
    orderBy: z
      .union([TimeSeriesDocumentOrderByWithRelationInputSchema.array(), TimeSeriesDocumentOrderByWithRelationInputSchema])
      .optional(),
    cursor: TimeSeriesDocumentWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TimeSeriesDocumentScalarFieldEnumSchema, TimeSeriesDocumentScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const TimeSeriesDocumentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentFindFirstOrThrowArgs> = z
  .object({
    select: TimeSeriesDocumentSelectSchema.optional(),
    include: TimeSeriesDocumentIncludeSchema.optional(),
    where: TimeSeriesDocumentWhereInputSchema.optional(),
    orderBy: z
      .union([TimeSeriesDocumentOrderByWithRelationInputSchema.array(), TimeSeriesDocumentOrderByWithRelationInputSchema])
      .optional(),
    cursor: TimeSeriesDocumentWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TimeSeriesDocumentScalarFieldEnumSchema, TimeSeriesDocumentScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const TimeSeriesDocumentFindManyArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentFindManyArgs> = z
  .object({
    select: TimeSeriesDocumentSelectSchema.optional(),
    include: TimeSeriesDocumentIncludeSchema.optional(),
    where: TimeSeriesDocumentWhereInputSchema.optional(),
    orderBy: z
      .union([TimeSeriesDocumentOrderByWithRelationInputSchema.array(), TimeSeriesDocumentOrderByWithRelationInputSchema])
      .optional(),
    cursor: TimeSeriesDocumentWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TimeSeriesDocumentScalarFieldEnumSchema, TimeSeriesDocumentScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const TimeSeriesDocumentAggregateArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentAggregateArgs> = z
  .object({
    where: TimeSeriesDocumentWhereInputSchema.optional(),
    orderBy: z
      .union([TimeSeriesDocumentOrderByWithRelationInputSchema.array(), TimeSeriesDocumentOrderByWithRelationInputSchema])
      .optional(),
    cursor: TimeSeriesDocumentWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const TimeSeriesDocumentGroupByArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentGroupByArgs> = z
  .object({
    where: TimeSeriesDocumentWhereInputSchema.optional(),
    orderBy: z
      .union([
        TimeSeriesDocumentOrderByWithAggregationInputSchema.array(),
        TimeSeriesDocumentOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: TimeSeriesDocumentScalarFieldEnumSchema.array(),
    having: TimeSeriesDocumentScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const TimeSeriesDocumentFindUniqueArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentFindUniqueArgs> = z
  .object({
    select: TimeSeriesDocumentSelectSchema.optional(),
    include: TimeSeriesDocumentIncludeSchema.optional(),
    where: TimeSeriesDocumentWhereUniqueInputSchema,
  })
  .strict()

export const TimeSeriesDocumentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentFindUniqueOrThrowArgs> = z
  .object({
    select: TimeSeriesDocumentSelectSchema.optional(),
    include: TimeSeriesDocumentIncludeSchema.optional(),
    where: TimeSeriesDocumentWhereUniqueInputSchema,
  })
  .strict()

export const TimeSeriesSeriesFindFirstArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesFindFirstArgs> = z
  .object({
    select: TimeSeriesSeriesSelectSchema.optional(),
    include: TimeSeriesSeriesIncludeSchema.optional(),
    where: TimeSeriesSeriesWhereInputSchema.optional(),
    orderBy: z
      .union([TimeSeriesSeriesOrderByWithRelationInputSchema.array(), TimeSeriesSeriesOrderByWithRelationInputSchema])
      .optional(),
    cursor: TimeSeriesSeriesWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TimeSeriesSeriesScalarFieldEnumSchema, TimeSeriesSeriesScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const TimeSeriesSeriesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesFindFirstOrThrowArgs> = z
  .object({
    select: TimeSeriesSeriesSelectSchema.optional(),
    include: TimeSeriesSeriesIncludeSchema.optional(),
    where: TimeSeriesSeriesWhereInputSchema.optional(),
    orderBy: z
      .union([TimeSeriesSeriesOrderByWithRelationInputSchema.array(), TimeSeriesSeriesOrderByWithRelationInputSchema])
      .optional(),
    cursor: TimeSeriesSeriesWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TimeSeriesSeriesScalarFieldEnumSchema, TimeSeriesSeriesScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const TimeSeriesSeriesFindManyArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesFindManyArgs> = z
  .object({
    select: TimeSeriesSeriesSelectSchema.optional(),
    include: TimeSeriesSeriesIncludeSchema.optional(),
    where: TimeSeriesSeriesWhereInputSchema.optional(),
    orderBy: z
      .union([TimeSeriesSeriesOrderByWithRelationInputSchema.array(), TimeSeriesSeriesOrderByWithRelationInputSchema])
      .optional(),
    cursor: TimeSeriesSeriesWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TimeSeriesSeriesScalarFieldEnumSchema, TimeSeriesSeriesScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const TimeSeriesSeriesAggregateArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesAggregateArgs> = z
  .object({
    where: TimeSeriesSeriesWhereInputSchema.optional(),
    orderBy: z
      .union([TimeSeriesSeriesOrderByWithRelationInputSchema.array(), TimeSeriesSeriesOrderByWithRelationInputSchema])
      .optional(),
    cursor: TimeSeriesSeriesWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const TimeSeriesSeriesGroupByArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesGroupByArgs> = z
  .object({
    where: TimeSeriesSeriesWhereInputSchema.optional(),
    orderBy: z
      .union([TimeSeriesSeriesOrderByWithAggregationInputSchema.array(), TimeSeriesSeriesOrderByWithAggregationInputSchema])
      .optional(),
    by: TimeSeriesSeriesScalarFieldEnumSchema.array(),
    having: TimeSeriesSeriesScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const TimeSeriesSeriesFindUniqueArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesFindUniqueArgs> = z
  .object({
    select: TimeSeriesSeriesSelectSchema.optional(),
    include: TimeSeriesSeriesIncludeSchema.optional(),
    where: TimeSeriesSeriesWhereUniqueInputSchema,
  })
  .strict()

export const TimeSeriesSeriesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesFindUniqueOrThrowArgs> = z
  .object({
    select: TimeSeriesSeriesSelectSchema.optional(),
    include: TimeSeriesSeriesIncludeSchema.optional(),
    where: TimeSeriesSeriesWhereUniqueInputSchema,
  })
  .strict()

export const UsersLegacyFindFirstArgsSchema: z.ZodType<Prisma.UsersLegacyFindFirstArgs> = z
  .object({
    select: UsersLegacySelectSchema.optional(),
    where: UsersLegacyWhereInputSchema.optional(),
    orderBy: z
      .union([UsersLegacyOrderByWithRelationInputSchema.array(), UsersLegacyOrderByWithRelationInputSchema])
      .optional(),
    cursor: UsersLegacyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UsersLegacyScalarFieldEnumSchema, UsersLegacyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const UsersLegacyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsersLegacyFindFirstOrThrowArgs> = z
  .object({
    select: UsersLegacySelectSchema.optional(),
    where: UsersLegacyWhereInputSchema.optional(),
    orderBy: z
      .union([UsersLegacyOrderByWithRelationInputSchema.array(), UsersLegacyOrderByWithRelationInputSchema])
      .optional(),
    cursor: UsersLegacyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UsersLegacyScalarFieldEnumSchema, UsersLegacyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const UsersLegacyFindManyArgsSchema: z.ZodType<Prisma.UsersLegacyFindManyArgs> = z
  .object({
    select: UsersLegacySelectSchema.optional(),
    where: UsersLegacyWhereInputSchema.optional(),
    orderBy: z
      .union([UsersLegacyOrderByWithRelationInputSchema.array(), UsersLegacyOrderByWithRelationInputSchema])
      .optional(),
    cursor: UsersLegacyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UsersLegacyScalarFieldEnumSchema, UsersLegacyScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const UsersLegacyAggregateArgsSchema: z.ZodType<Prisma.UsersLegacyAggregateArgs> = z
  .object({
    where: UsersLegacyWhereInputSchema.optional(),
    orderBy: z
      .union([UsersLegacyOrderByWithRelationInputSchema.array(), UsersLegacyOrderByWithRelationInputSchema])
      .optional(),
    cursor: UsersLegacyWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const UsersLegacyGroupByArgsSchema: z.ZodType<Prisma.UsersLegacyGroupByArgs> = z
  .object({
    where: UsersLegacyWhereInputSchema.optional(),
    orderBy: z
      .union([UsersLegacyOrderByWithAggregationInputSchema.array(), UsersLegacyOrderByWithAggregationInputSchema])
      .optional(),
    by: UsersLegacyScalarFieldEnumSchema.array(),
    having: UsersLegacyScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const UsersLegacyFindUniqueArgsSchema: z.ZodType<Prisma.UsersLegacyFindUniqueArgs> = z
  .object({
    select: UsersLegacySelectSchema.optional(),
    where: UsersLegacyWhereUniqueInputSchema,
  })
  .strict()

export const UsersLegacyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsersLegacyFindUniqueOrThrowArgs> = z
  .object({
    select: UsersLegacySelectSchema.optional(),
    where: UsersLegacyWhereUniqueInputSchema,
  })
  .strict()

export const VXCVFilesFindFirstArgsSchema: z.ZodType<Prisma.VXCVFilesFindFirstArgs> = z
  .object({
    select: VXCVFilesSelectSchema.optional(),
    where: VXCVFilesWhereInputSchema.optional(),
    orderBy: z.union([VXCVFilesOrderByWithRelationInputSchema.array(), VXCVFilesOrderByWithRelationInputSchema]).optional(),
    cursor: VXCVFilesWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([VXCVFilesScalarFieldEnumSchema, VXCVFilesScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const VXCVFilesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VXCVFilesFindFirstOrThrowArgs> = z
  .object({
    select: VXCVFilesSelectSchema.optional(),
    where: VXCVFilesWhereInputSchema.optional(),
    orderBy: z.union([VXCVFilesOrderByWithRelationInputSchema.array(), VXCVFilesOrderByWithRelationInputSchema]).optional(),
    cursor: VXCVFilesWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([VXCVFilesScalarFieldEnumSchema, VXCVFilesScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const VXCVFilesFindManyArgsSchema: z.ZodType<Prisma.VXCVFilesFindManyArgs> = z
  .object({
    select: VXCVFilesSelectSchema.optional(),
    where: VXCVFilesWhereInputSchema.optional(),
    orderBy: z.union([VXCVFilesOrderByWithRelationInputSchema.array(), VXCVFilesOrderByWithRelationInputSchema]).optional(),
    cursor: VXCVFilesWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([VXCVFilesScalarFieldEnumSchema, VXCVFilesScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const VXCVFilesAggregateArgsSchema: z.ZodType<Prisma.VXCVFilesAggregateArgs> = z
  .object({
    where: VXCVFilesWhereInputSchema.optional(),
    orderBy: z.union([VXCVFilesOrderByWithRelationInputSchema.array(), VXCVFilesOrderByWithRelationInputSchema]).optional(),
    cursor: VXCVFilesWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const VXCVFilesGroupByArgsSchema: z.ZodType<Prisma.VXCVFilesGroupByArgs> = z
  .object({
    where: VXCVFilesWhereInputSchema.optional(),
    orderBy: z
      .union([VXCVFilesOrderByWithAggregationInputSchema.array(), VXCVFilesOrderByWithAggregationInputSchema])
      .optional(),
    by: VXCVFilesScalarFieldEnumSchema.array(),
    having: VXCVFilesScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const VXCVFilesFindUniqueArgsSchema: z.ZodType<Prisma.VXCVFilesFindUniqueArgs> = z
  .object({
    select: VXCVFilesSelectSchema.optional(),
    where: VXCVFilesWhereUniqueInputSchema,
  })
  .strict()

export const VXCVFilesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VXCVFilesFindUniqueOrThrowArgs> = z
  .object({
    select: VXCVFilesSelectSchema.optional(),
    where: VXCVFilesWhereUniqueInputSchema,
  })
  .strict()

export const VXCVLinksFindFirstArgsSchema: z.ZodType<Prisma.VXCVLinksFindFirstArgs> = z
  .object({
    select: VXCVLinksSelectSchema.optional(),
    where: VXCVLinksWhereInputSchema.optional(),
    orderBy: z.union([VXCVLinksOrderByWithRelationInputSchema.array(), VXCVLinksOrderByWithRelationInputSchema]).optional(),
    cursor: VXCVLinksWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([VXCVLinksScalarFieldEnumSchema, VXCVLinksScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const VXCVLinksFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VXCVLinksFindFirstOrThrowArgs> = z
  .object({
    select: VXCVLinksSelectSchema.optional(),
    where: VXCVLinksWhereInputSchema.optional(),
    orderBy: z.union([VXCVLinksOrderByWithRelationInputSchema.array(), VXCVLinksOrderByWithRelationInputSchema]).optional(),
    cursor: VXCVLinksWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([VXCVLinksScalarFieldEnumSchema, VXCVLinksScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const VXCVLinksFindManyArgsSchema: z.ZodType<Prisma.VXCVLinksFindManyArgs> = z
  .object({
    select: VXCVLinksSelectSchema.optional(),
    where: VXCVLinksWhereInputSchema.optional(),
    orderBy: z.union([VXCVLinksOrderByWithRelationInputSchema.array(), VXCVLinksOrderByWithRelationInputSchema]).optional(),
    cursor: VXCVLinksWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([VXCVLinksScalarFieldEnumSchema, VXCVLinksScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const VXCVLinksAggregateArgsSchema: z.ZodType<Prisma.VXCVLinksAggregateArgs> = z
  .object({
    where: VXCVLinksWhereInputSchema.optional(),
    orderBy: z.union([VXCVLinksOrderByWithRelationInputSchema.array(), VXCVLinksOrderByWithRelationInputSchema]).optional(),
    cursor: VXCVLinksWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const VXCVLinksGroupByArgsSchema: z.ZodType<Prisma.VXCVLinksGroupByArgs> = z
  .object({
    where: VXCVLinksWhereInputSchema.optional(),
    orderBy: z
      .union([VXCVLinksOrderByWithAggregationInputSchema.array(), VXCVLinksOrderByWithAggregationInputSchema])
      .optional(),
    by: VXCVLinksScalarFieldEnumSchema.array(),
    having: VXCVLinksScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const VXCVLinksFindUniqueArgsSchema: z.ZodType<Prisma.VXCVLinksFindUniqueArgs> = z
  .object({
    select: VXCVLinksSelectSchema.optional(),
    where: VXCVLinksWhereUniqueInputSchema,
  })
  .strict()

export const VXCVLinksFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VXCVLinksFindUniqueOrThrowArgs> = z
  .object({
    select: VXCVLinksSelectSchema.optional(),
    where: VXCVLinksWhereUniqueInputSchema,
  })
  .strict()

export const AccountLineItemTagFindFirstArgsSchema: z.ZodType<Prisma.AccountLineItemTagFindFirstArgs> = z
  .object({
    select: AccountLineItemTagSelectSchema.optional(),
    where: AccountLineItemTagWhereInputSchema.optional(),
    orderBy: z
      .union([AccountLineItemTagOrderByWithRelationInputSchema.array(), AccountLineItemTagOrderByWithRelationInputSchema])
      .optional(),
    cursor: AccountLineItemTagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([AccountLineItemTagScalarFieldEnumSchema, AccountLineItemTagScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const AccountLineItemTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountLineItemTagFindFirstOrThrowArgs> = z
  .object({
    select: AccountLineItemTagSelectSchema.optional(),
    where: AccountLineItemTagWhereInputSchema.optional(),
    orderBy: z
      .union([AccountLineItemTagOrderByWithRelationInputSchema.array(), AccountLineItemTagOrderByWithRelationInputSchema])
      .optional(),
    cursor: AccountLineItemTagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([AccountLineItemTagScalarFieldEnumSchema, AccountLineItemTagScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const AccountLineItemTagFindManyArgsSchema: z.ZodType<Prisma.AccountLineItemTagFindManyArgs> = z
  .object({
    select: AccountLineItemTagSelectSchema.optional(),
    where: AccountLineItemTagWhereInputSchema.optional(),
    orderBy: z
      .union([AccountLineItemTagOrderByWithRelationInputSchema.array(), AccountLineItemTagOrderByWithRelationInputSchema])
      .optional(),
    cursor: AccountLineItemTagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([AccountLineItemTagScalarFieldEnumSchema, AccountLineItemTagScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const AccountLineItemTagAggregateArgsSchema: z.ZodType<Prisma.AccountLineItemTagAggregateArgs> = z
  .object({
    where: AccountLineItemTagWhereInputSchema.optional(),
    orderBy: z
      .union([AccountLineItemTagOrderByWithRelationInputSchema.array(), AccountLineItemTagOrderByWithRelationInputSchema])
      .optional(),
    cursor: AccountLineItemTagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const AccountLineItemTagGroupByArgsSchema: z.ZodType<Prisma.AccountLineItemTagGroupByArgs> = z
  .object({
    where: AccountLineItemTagWhereInputSchema.optional(),
    orderBy: z
      .union([
        AccountLineItemTagOrderByWithAggregationInputSchema.array(),
        AccountLineItemTagOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: AccountLineItemTagScalarFieldEnumSchema.array(),
    having: AccountLineItemTagScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const AccountLineItemTagFindUniqueArgsSchema: z.ZodType<Prisma.AccountLineItemTagFindUniqueArgs> = z
  .object({
    select: AccountLineItemTagSelectSchema.optional(),
    where: AccountLineItemTagWhereUniqueInputSchema,
  })
  .strict()

export const AccountLineItemTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountLineItemTagFindUniqueOrThrowArgs> = z
  .object({
    select: AccountLineItemTagSelectSchema.optional(),
    where: AccountLineItemTagWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountTagFindFirstArgsSchema: z.ZodType<Prisma.FinAccountTagFindFirstArgs> = z
  .object({
    select: FinAccountTagSelectSchema.optional(),
    include: FinAccountTagIncludeSchema.optional(),
    where: FinAccountTagWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountTagOrderByWithRelationInputSchema.array(), FinAccountTagOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinAccountTagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinAccountTagScalarFieldEnumSchema, FinAccountTagScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinAccountTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FinAccountTagFindFirstOrThrowArgs> = z
  .object({
    select: FinAccountTagSelectSchema.optional(),
    include: FinAccountTagIncludeSchema.optional(),
    where: FinAccountTagWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountTagOrderByWithRelationInputSchema.array(), FinAccountTagOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinAccountTagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinAccountTagScalarFieldEnumSchema, FinAccountTagScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinAccountTagFindManyArgsSchema: z.ZodType<Prisma.FinAccountTagFindManyArgs> = z
  .object({
    select: FinAccountTagSelectSchema.optional(),
    include: FinAccountTagIncludeSchema.optional(),
    where: FinAccountTagWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountTagOrderByWithRelationInputSchema.array(), FinAccountTagOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinAccountTagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([FinAccountTagScalarFieldEnumSchema, FinAccountTagScalarFieldEnumSchema.array()]).optional(),
  })
  .strict()

export const FinAccountTagAggregateArgsSchema: z.ZodType<Prisma.FinAccountTagAggregateArgs> = z
  .object({
    where: FinAccountTagWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountTagOrderByWithRelationInputSchema.array(), FinAccountTagOrderByWithRelationInputSchema])
      .optional(),
    cursor: FinAccountTagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinAccountTagGroupByArgsSchema: z.ZodType<Prisma.FinAccountTagGroupByArgs> = z
  .object({
    where: FinAccountTagWhereInputSchema.optional(),
    orderBy: z
      .union([FinAccountTagOrderByWithAggregationInputSchema.array(), FinAccountTagOrderByWithAggregationInputSchema])
      .optional(),
    by: FinAccountTagScalarFieldEnumSchema.array(),
    having: FinAccountTagScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinAccountTagFindUniqueArgsSchema: z.ZodType<Prisma.FinAccountTagFindUniqueArgs> = z
  .object({
    select: FinAccountTagSelectSchema.optional(),
    include: FinAccountTagIncludeSchema.optional(),
    where: FinAccountTagWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FinAccountTagFindUniqueOrThrowArgs> = z
  .object({
    select: FinAccountTagSelectSchema.optional(),
    include: FinAccountTagIncludeSchema.optional(),
    where: FinAccountTagWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountLineItemTagMapFindFirstArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapFindFirstArgs> = z
  .object({
    select: FinAccountLineItemTagMapSelectSchema.optional(),
    include: FinAccountLineItemTagMapIncludeSchema.optional(),
    where: FinAccountLineItemTagMapWhereInputSchema.optional(),
    orderBy: z
      .union([
        FinAccountLineItemTagMapOrderByWithRelationInputSchema.array(),
        FinAccountLineItemTagMapOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: FinAccountLineItemTagMapWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([FinAccountLineItemTagMapScalarFieldEnumSchema, FinAccountLineItemTagMapScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const FinAccountLineItemTagMapFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapFindFirstOrThrowArgs> =
  z
    .object({
      select: FinAccountLineItemTagMapSelectSchema.optional(),
      include: FinAccountLineItemTagMapIncludeSchema.optional(),
      where: FinAccountLineItemTagMapWhereInputSchema.optional(),
      orderBy: z
        .union([
          FinAccountLineItemTagMapOrderByWithRelationInputSchema.array(),
          FinAccountLineItemTagMapOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: FinAccountLineItemTagMapWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([FinAccountLineItemTagMapScalarFieldEnumSchema, FinAccountLineItemTagMapScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict()

export const FinAccountLineItemTagMapFindManyArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapFindManyArgs> = z
  .object({
    select: FinAccountLineItemTagMapSelectSchema.optional(),
    include: FinAccountLineItemTagMapIncludeSchema.optional(),
    where: FinAccountLineItemTagMapWhereInputSchema.optional(),
    orderBy: z
      .union([
        FinAccountLineItemTagMapOrderByWithRelationInputSchema.array(),
        FinAccountLineItemTagMapOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: FinAccountLineItemTagMapWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([FinAccountLineItemTagMapScalarFieldEnumSchema, FinAccountLineItemTagMapScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const FinAccountLineItemTagMapAggregateArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapAggregateArgs> = z
  .object({
    where: FinAccountLineItemTagMapWhereInputSchema.optional(),
    orderBy: z
      .union([
        FinAccountLineItemTagMapOrderByWithRelationInputSchema.array(),
        FinAccountLineItemTagMapOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: FinAccountLineItemTagMapWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinAccountLineItemTagMapGroupByArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapGroupByArgs> = z
  .object({
    where: FinAccountLineItemTagMapWhereInputSchema.optional(),
    orderBy: z
      .union([
        FinAccountLineItemTagMapOrderByWithAggregationInputSchema.array(),
        FinAccountLineItemTagMapOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: FinAccountLineItemTagMapScalarFieldEnumSchema.array(),
    having: FinAccountLineItemTagMapScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const FinAccountLineItemTagMapFindUniqueArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapFindUniqueArgs> = z
  .object({
    select: FinAccountLineItemTagMapSelectSchema.optional(),
    include: FinAccountLineItemTagMapIncludeSchema.optional(),
    where: FinAccountLineItemTagMapWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountLineItemTagMapFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapFindUniqueOrThrowArgs> =
  z
    .object({
      select: FinAccountLineItemTagMapSelectSchema.optional(),
      include: FinAccountLineItemTagMapIncludeSchema.optional(),
      where: FinAccountLineItemTagMapWhereUniqueInputSchema,
    })
    .strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([UserCreateManyInputSchema, UserCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
    where: UserWhereInputSchema.optional(),
  })
  .strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
  })
  .strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([SessionCreateInputSchema, SessionUncheckedCreateInputSchema]),
  })
  .strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
    create: z.union([SessionCreateInputSchema, SessionUncheckedCreateInputSchema]),
    update: z.union([SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema]),
  })
  .strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z
  .object({
    data: z.union([SessionCreateManyInputSchema, SessionCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
  })
  .strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema]),
    where: SessionWhereUniqueInputSchema,
  })
  .strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z
  .object({
    data: z.union([SessionUpdateManyMutationInputSchema, SessionUncheckedUpdateManyInputSchema]),
    where: SessionWhereInputSchema.optional(),
  })
  .strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z
  .object({
    where: SessionWhereInputSchema.optional(),
  })
  .strict()

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([AccountCreateInputSchema, AccountUncheckedCreateInputSchema]),
  })
  .strict()

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
    create: z.union([AccountCreateInputSchema, AccountUncheckedCreateInputSchema]),
    update: z.union([AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema]),
  })
  .strict()

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z
  .object({
    data: z.union([AccountCreateManyInputSchema, AccountCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
  })
  .strict()

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema]),
    where: AccountWhereUniqueInputSchema,
  })
  .strict()

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z
  .object({
    data: z.union([AccountUpdateManyMutationInputSchema, AccountUncheckedUpdateManyInputSchema]),
    where: AccountWhereInputSchema.optional(),
  })
  .strict()

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z
  .object({
    where: AccountWhereInputSchema.optional(),
  })
  .strict()

export const VerificationCreateArgsSchema: z.ZodType<Prisma.VerificationCreateArgs> = z
  .object({
    select: VerificationSelectSchema.optional(),
    data: z.union([VerificationCreateInputSchema, VerificationUncheckedCreateInputSchema]),
  })
  .strict()

export const VerificationUpsertArgsSchema: z.ZodType<Prisma.VerificationUpsertArgs> = z
  .object({
    select: VerificationSelectSchema.optional(),
    where: VerificationWhereUniqueInputSchema,
    create: z.union([VerificationCreateInputSchema, VerificationUncheckedCreateInputSchema]),
    update: z.union([VerificationUpdateInputSchema, VerificationUncheckedUpdateInputSchema]),
  })
  .strict()

export const VerificationCreateManyArgsSchema: z.ZodType<Prisma.VerificationCreateManyArgs> = z
  .object({
    data: z.union([VerificationCreateManyInputSchema, VerificationCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const VerificationDeleteArgsSchema: z.ZodType<Prisma.VerificationDeleteArgs> = z
  .object({
    select: VerificationSelectSchema.optional(),
    where: VerificationWhereUniqueInputSchema,
  })
  .strict()

export const VerificationUpdateArgsSchema: z.ZodType<Prisma.VerificationUpdateArgs> = z
  .object({
    select: VerificationSelectSchema.optional(),
    data: z.union([VerificationUpdateInputSchema, VerificationUncheckedUpdateInputSchema]),
    where: VerificationWhereUniqueInputSchema,
  })
  .strict()

export const VerificationUpdateManyArgsSchema: z.ZodType<Prisma.VerificationUpdateManyArgs> = z
  .object({
    data: z.union([VerificationUpdateManyMutationInputSchema, VerificationUncheckedUpdateManyInputSchema]),
    where: VerificationWhereInputSchema.optional(),
  })
  .strict()

export const VerificationDeleteManyArgsSchema: z.ZodType<Prisma.VerificationDeleteManyArgs> = z
  .object({
    where: VerificationWhereInputSchema.optional(),
  })
  .strict()

export const TwoFactorCreateArgsSchema: z.ZodType<Prisma.TwoFactorCreateArgs> = z
  .object({
    select: TwoFactorSelectSchema.optional(),
    include: TwoFactorIncludeSchema.optional(),
    data: z.union([TwoFactorCreateInputSchema, TwoFactorUncheckedCreateInputSchema]),
  })
  .strict()

export const TwoFactorUpsertArgsSchema: z.ZodType<Prisma.TwoFactorUpsertArgs> = z
  .object({
    select: TwoFactorSelectSchema.optional(),
    include: TwoFactorIncludeSchema.optional(),
    where: TwoFactorWhereUniqueInputSchema,
    create: z.union([TwoFactorCreateInputSchema, TwoFactorUncheckedCreateInputSchema]),
    update: z.union([TwoFactorUpdateInputSchema, TwoFactorUncheckedUpdateInputSchema]),
  })
  .strict()

export const TwoFactorCreateManyArgsSchema: z.ZodType<Prisma.TwoFactorCreateManyArgs> = z
  .object({
    data: z.union([TwoFactorCreateManyInputSchema, TwoFactorCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const TwoFactorDeleteArgsSchema: z.ZodType<Prisma.TwoFactorDeleteArgs> = z
  .object({
    select: TwoFactorSelectSchema.optional(),
    include: TwoFactorIncludeSchema.optional(),
    where: TwoFactorWhereUniqueInputSchema,
  })
  .strict()

export const TwoFactorUpdateArgsSchema: z.ZodType<Prisma.TwoFactorUpdateArgs> = z
  .object({
    select: TwoFactorSelectSchema.optional(),
    include: TwoFactorIncludeSchema.optional(),
    data: z.union([TwoFactorUpdateInputSchema, TwoFactorUncheckedUpdateInputSchema]),
    where: TwoFactorWhereUniqueInputSchema,
  })
  .strict()

export const TwoFactorUpdateManyArgsSchema: z.ZodType<Prisma.TwoFactorUpdateManyArgs> = z
  .object({
    data: z.union([TwoFactorUpdateManyMutationInputSchema, TwoFactorUncheckedUpdateManyInputSchema]),
    where: TwoFactorWhereInputSchema.optional(),
  })
  .strict()

export const TwoFactorDeleteManyArgsSchema: z.ZodType<Prisma.TwoFactorDeleteManyArgs> = z
  .object({
    where: TwoFactorWhereInputSchema.optional(),
  })
  .strict()

export const PhrLabResultCreateArgsSchema: z.ZodType<Prisma.PhrLabResultCreateArgs> = z
  .object({
    select: PhrLabResultSelectSchema.optional(),
    data: z.union([PhrLabResultCreateInputSchema, PhrLabResultUncheckedCreateInputSchema]).optional(),
  })
  .strict()

export const PhrLabResultUpsertArgsSchema: z.ZodType<Prisma.PhrLabResultUpsertArgs> = z
  .object({
    select: PhrLabResultSelectSchema.optional(),
    where: PhrLabResultWhereUniqueInputSchema,
    create: z.union([PhrLabResultCreateInputSchema, PhrLabResultUncheckedCreateInputSchema]),
    update: z.union([PhrLabResultUpdateInputSchema, PhrLabResultUncheckedUpdateInputSchema]),
  })
  .strict()

export const PhrLabResultCreateManyArgsSchema: z.ZodType<Prisma.PhrLabResultCreateManyArgs> = z
  .object({
    data: z.union([PhrLabResultCreateManyInputSchema, PhrLabResultCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const PhrLabResultDeleteArgsSchema: z.ZodType<Prisma.PhrLabResultDeleteArgs> = z
  .object({
    select: PhrLabResultSelectSchema.optional(),
    where: PhrLabResultWhereUniqueInputSchema,
  })
  .strict()

export const PhrLabResultUpdateArgsSchema: z.ZodType<Prisma.PhrLabResultUpdateArgs> = z
  .object({
    select: PhrLabResultSelectSchema.optional(),
    data: z.union([PhrLabResultUpdateInputSchema, PhrLabResultUncheckedUpdateInputSchema]),
    where: PhrLabResultWhereUniqueInputSchema,
  })
  .strict()

export const PhrLabResultUpdateManyArgsSchema: z.ZodType<Prisma.PhrLabResultUpdateManyArgs> = z
  .object({
    data: z.union([PhrLabResultUpdateManyMutationInputSchema, PhrLabResultUncheckedUpdateManyInputSchema]),
    where: PhrLabResultWhereInputSchema.optional(),
  })
  .strict()

export const PhrLabResultDeleteManyArgsSchema: z.ZodType<Prisma.PhrLabResultDeleteManyArgs> = z
  .object({
    where: PhrLabResultWhereInputSchema.optional(),
  })
  .strict()

export const ProductKeyCreateArgsSchema: z.ZodType<Prisma.ProductKeyCreateArgs> = z
  .object({
    select: ProductKeySelectSchema.optional(),
    data: z.union([ProductKeyCreateInputSchema, ProductKeyUncheckedCreateInputSchema]).optional(),
  })
  .strict()

export const ProductKeyUpsertArgsSchema: z.ZodType<Prisma.ProductKeyUpsertArgs> = z
  .object({
    select: ProductKeySelectSchema.optional(),
    where: ProductKeyWhereUniqueInputSchema,
    create: z.union([ProductKeyCreateInputSchema, ProductKeyUncheckedCreateInputSchema]),
    update: z.union([ProductKeyUpdateInputSchema, ProductKeyUncheckedUpdateInputSchema]),
  })
  .strict()

export const ProductKeyCreateManyArgsSchema: z.ZodType<Prisma.ProductKeyCreateManyArgs> = z
  .object({
    data: z.union([ProductKeyCreateManyInputSchema, ProductKeyCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const ProductKeyDeleteArgsSchema: z.ZodType<Prisma.ProductKeyDeleteArgs> = z
  .object({
    select: ProductKeySelectSchema.optional(),
    where: ProductKeyWhereUniqueInputSchema,
  })
  .strict()

export const ProductKeyUpdateArgsSchema: z.ZodType<Prisma.ProductKeyUpdateArgs> = z
  .object({
    select: ProductKeySelectSchema.optional(),
    data: z.union([ProductKeyUpdateInputSchema, ProductKeyUncheckedUpdateInputSchema]),
    where: ProductKeyWhereUniqueInputSchema,
  })
  .strict()

export const ProductKeyUpdateManyArgsSchema: z.ZodType<Prisma.ProductKeyUpdateManyArgs> = z
  .object({
    data: z.union([ProductKeyUpdateManyMutationInputSchema, ProductKeyUncheckedUpdateManyInputSchema]),
    where: ProductKeyWhereInputSchema.optional(),
  })
  .strict()

export const ProductKeyDeleteManyArgsSchema: z.ZodType<Prisma.ProductKeyDeleteManyArgs> = z
  .object({
    where: ProductKeyWhereInputSchema.optional(),
  })
  .strict()

export const FinAccountsCreateArgsSchema: z.ZodType<Prisma.FinAccountsCreateArgs> = z
  .object({
    select: FinAccountsSelectSchema.optional(),
    data: z.union([FinAccountsCreateInputSchema, FinAccountsUncheckedCreateInputSchema]),
  })
  .strict()

export const FinAccountsUpsertArgsSchema: z.ZodType<Prisma.FinAccountsUpsertArgs> = z
  .object({
    select: FinAccountsSelectSchema.optional(),
    where: FinAccountsWhereUniqueInputSchema,
    create: z.union([FinAccountsCreateInputSchema, FinAccountsUncheckedCreateInputSchema]),
    update: z.union([FinAccountsUpdateInputSchema, FinAccountsUncheckedUpdateInputSchema]),
  })
  .strict()

export const FinAccountsCreateManyArgsSchema: z.ZodType<Prisma.FinAccountsCreateManyArgs> = z
  .object({
    data: z.union([FinAccountsCreateManyInputSchema, FinAccountsCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const FinAccountsDeleteArgsSchema: z.ZodType<Prisma.FinAccountsDeleteArgs> = z
  .object({
    select: FinAccountsSelectSchema.optional(),
    where: FinAccountsWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountsUpdateArgsSchema: z.ZodType<Prisma.FinAccountsUpdateArgs> = z
  .object({
    select: FinAccountsSelectSchema.optional(),
    data: z.union([FinAccountsUpdateInputSchema, FinAccountsUncheckedUpdateInputSchema]),
    where: FinAccountsWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountsUpdateManyArgsSchema: z.ZodType<Prisma.FinAccountsUpdateManyArgs> = z
  .object({
    data: z.union([FinAccountsUpdateManyMutationInputSchema, FinAccountsUncheckedUpdateManyInputSchema]),
    where: FinAccountsWhereInputSchema.optional(),
  })
  .strict()

export const FinAccountsDeleteManyArgsSchema: z.ZodType<Prisma.FinAccountsDeleteManyArgs> = z
  .object({
    where: FinAccountsWhereInputSchema.optional(),
  })
  .strict()

export const FinAccountLineItemsCreateArgsSchema: z.ZodType<Prisma.FinAccountLineItemsCreateArgs> = z
  .object({
    select: FinAccountLineItemsSelectSchema.optional(),
    include: FinAccountLineItemsIncludeSchema.optional(),
    data: z.union([FinAccountLineItemsCreateInputSchema, FinAccountLineItemsUncheckedCreateInputSchema]),
  })
  .strict()

export const FinAccountLineItemsUpsertArgsSchema: z.ZodType<Prisma.FinAccountLineItemsUpsertArgs> = z
  .object({
    select: FinAccountLineItemsSelectSchema.optional(),
    include: FinAccountLineItemsIncludeSchema.optional(),
    where: FinAccountLineItemsWhereUniqueInputSchema,
    create: z.union([FinAccountLineItemsCreateInputSchema, FinAccountLineItemsUncheckedCreateInputSchema]),
    update: z.union([FinAccountLineItemsUpdateInputSchema, FinAccountLineItemsUncheckedUpdateInputSchema]),
  })
  .strict()

export const FinAccountLineItemsCreateManyArgsSchema: z.ZodType<Prisma.FinAccountLineItemsCreateManyArgs> = z
  .object({
    data: z.union([FinAccountLineItemsCreateManyInputSchema, FinAccountLineItemsCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const FinAccountLineItemsDeleteArgsSchema: z.ZodType<Prisma.FinAccountLineItemsDeleteArgs> = z
  .object({
    select: FinAccountLineItemsSelectSchema.optional(),
    include: FinAccountLineItemsIncludeSchema.optional(),
    where: FinAccountLineItemsWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountLineItemsUpdateArgsSchema: z.ZodType<Prisma.FinAccountLineItemsUpdateArgs> = z
  .object({
    select: FinAccountLineItemsSelectSchema.optional(),
    include: FinAccountLineItemsIncludeSchema.optional(),
    data: z.union([FinAccountLineItemsUpdateInputSchema, FinAccountLineItemsUncheckedUpdateInputSchema]),
    where: FinAccountLineItemsWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountLineItemsUpdateManyArgsSchema: z.ZodType<Prisma.FinAccountLineItemsUpdateManyArgs> = z
  .object({
    data: z.union([FinAccountLineItemsUpdateManyMutationInputSchema, FinAccountLineItemsUncheckedUpdateManyInputSchema]),
    where: FinAccountLineItemsWhereInputSchema.optional(),
  })
  .strict()

export const FinAccountLineItemsDeleteManyArgsSchema: z.ZodType<Prisma.FinAccountLineItemsDeleteManyArgs> = z
  .object({
    where: FinAccountLineItemsWhereInputSchema.optional(),
  })
  .strict()

export const FinAccountBalanceSnapshotCreateArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotCreateArgs> = z
  .object({
    select: FinAccountBalanceSnapshotSelectSchema.optional(),
    data: z.union([FinAccountBalanceSnapshotCreateInputSchema, FinAccountBalanceSnapshotUncheckedCreateInputSchema]),
  })
  .strict()

export const FinAccountBalanceSnapshotUpsertArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotUpsertArgs> = z
  .object({
    select: FinAccountBalanceSnapshotSelectSchema.optional(),
    where: FinAccountBalanceSnapshotWhereUniqueInputSchema,
    create: z.union([FinAccountBalanceSnapshotCreateInputSchema, FinAccountBalanceSnapshotUncheckedCreateInputSchema]),
    update: z.union([FinAccountBalanceSnapshotUpdateInputSchema, FinAccountBalanceSnapshotUncheckedUpdateInputSchema]),
  })
  .strict()

export const FinAccountBalanceSnapshotCreateManyArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotCreateManyArgs> = z
  .object({
    data: z.union([FinAccountBalanceSnapshotCreateManyInputSchema, FinAccountBalanceSnapshotCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const FinAccountBalanceSnapshotDeleteArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotDeleteArgs> = z
  .object({
    select: FinAccountBalanceSnapshotSelectSchema.optional(),
    where: FinAccountBalanceSnapshotWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountBalanceSnapshotUpdateArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotUpdateArgs> = z
  .object({
    select: FinAccountBalanceSnapshotSelectSchema.optional(),
    data: z.union([FinAccountBalanceSnapshotUpdateInputSchema, FinAccountBalanceSnapshotUncheckedUpdateInputSchema]),
    where: FinAccountBalanceSnapshotWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountBalanceSnapshotUpdateManyArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotUpdateManyArgs> = z
  .object({
    data: z.union([
      FinAccountBalanceSnapshotUpdateManyMutationInputSchema,
      FinAccountBalanceSnapshotUncheckedUpdateManyInputSchema,
    ]),
    where: FinAccountBalanceSnapshotWhereInputSchema.optional(),
  })
  .strict()

export const FinAccountBalanceSnapshotDeleteManyArgsSchema: z.ZodType<Prisma.FinAccountBalanceSnapshotDeleteManyArgs> = z
  .object({
    where: FinAccountBalanceSnapshotWhereInputSchema.optional(),
  })
  .strict()

export const EarningsAnnualCreateArgsSchema: z.ZodType<Prisma.EarningsAnnualCreateArgs> = z
  .object({
    select: EarningsAnnualSelectSchema.optional(),
    data: z.union([EarningsAnnualCreateInputSchema, EarningsAnnualUncheckedCreateInputSchema]),
  })
  .strict()

export const EarningsAnnualUpsertArgsSchema: z.ZodType<Prisma.EarningsAnnualUpsertArgs> = z
  .object({
    select: EarningsAnnualSelectSchema.optional(),
    where: EarningsAnnualWhereUniqueInputSchema,
    create: z.union([EarningsAnnualCreateInputSchema, EarningsAnnualUncheckedCreateInputSchema]),
    update: z.union([EarningsAnnualUpdateInputSchema, EarningsAnnualUncheckedUpdateInputSchema]),
  })
  .strict()

export const EarningsAnnualCreateManyArgsSchema: z.ZodType<Prisma.EarningsAnnualCreateManyArgs> = z
  .object({
    data: z.union([EarningsAnnualCreateManyInputSchema, EarningsAnnualCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const EarningsAnnualDeleteArgsSchema: z.ZodType<Prisma.EarningsAnnualDeleteArgs> = z
  .object({
    select: EarningsAnnualSelectSchema.optional(),
    where: EarningsAnnualWhereUniqueInputSchema,
  })
  .strict()

export const EarningsAnnualUpdateArgsSchema: z.ZodType<Prisma.EarningsAnnualUpdateArgs> = z
  .object({
    select: EarningsAnnualSelectSchema.optional(),
    data: z.union([EarningsAnnualUpdateInputSchema, EarningsAnnualUncheckedUpdateInputSchema]),
    where: EarningsAnnualWhereUniqueInputSchema,
  })
  .strict()

export const EarningsAnnualUpdateManyArgsSchema: z.ZodType<Prisma.EarningsAnnualUpdateManyArgs> = z
  .object({
    data: z.union([EarningsAnnualUpdateManyMutationInputSchema, EarningsAnnualUncheckedUpdateManyInputSchema]),
    where: EarningsAnnualWhereInputSchema.optional(),
  })
  .strict()

export const EarningsAnnualDeleteManyArgsSchema: z.ZodType<Prisma.EarningsAnnualDeleteManyArgs> = z
  .object({
    where: EarningsAnnualWhereInputSchema.optional(),
  })
  .strict()

export const EarningsQuarterlyCreateArgsSchema: z.ZodType<Prisma.EarningsQuarterlyCreateArgs> = z
  .object({
    select: EarningsQuarterlySelectSchema.optional(),
    data: z.union([EarningsQuarterlyCreateInputSchema, EarningsQuarterlyUncheckedCreateInputSchema]),
  })
  .strict()

export const EarningsQuarterlyUpsertArgsSchema: z.ZodType<Prisma.EarningsQuarterlyUpsertArgs> = z
  .object({
    select: EarningsQuarterlySelectSchema.optional(),
    where: EarningsQuarterlyWhereUniqueInputSchema,
    create: z.union([EarningsQuarterlyCreateInputSchema, EarningsQuarterlyUncheckedCreateInputSchema]),
    update: z.union([EarningsQuarterlyUpdateInputSchema, EarningsQuarterlyUncheckedUpdateInputSchema]),
  })
  .strict()

export const EarningsQuarterlyCreateManyArgsSchema: z.ZodType<Prisma.EarningsQuarterlyCreateManyArgs> = z
  .object({
    data: z.union([EarningsQuarterlyCreateManyInputSchema, EarningsQuarterlyCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const EarningsQuarterlyDeleteArgsSchema: z.ZodType<Prisma.EarningsQuarterlyDeleteArgs> = z
  .object({
    select: EarningsQuarterlySelectSchema.optional(),
    where: EarningsQuarterlyWhereUniqueInputSchema,
  })
  .strict()

export const EarningsQuarterlyUpdateArgsSchema: z.ZodType<Prisma.EarningsQuarterlyUpdateArgs> = z
  .object({
    select: EarningsQuarterlySelectSchema.optional(),
    data: z.union([EarningsQuarterlyUpdateInputSchema, EarningsQuarterlyUncheckedUpdateInputSchema]),
    where: EarningsQuarterlyWhereUniqueInputSchema,
  })
  .strict()

export const EarningsQuarterlyUpdateManyArgsSchema: z.ZodType<Prisma.EarningsQuarterlyUpdateManyArgs> = z
  .object({
    data: z.union([EarningsQuarterlyUpdateManyMutationInputSchema, EarningsQuarterlyUncheckedUpdateManyInputSchema]),
    where: EarningsQuarterlyWhereInputSchema.optional(),
  })
  .strict()

export const EarningsQuarterlyDeleteManyArgsSchema: z.ZodType<Prisma.EarningsQuarterlyDeleteManyArgs> = z
  .object({
    where: EarningsQuarterlyWhereInputSchema.optional(),
  })
  .strict()

export const FinEquityAwardsCreateArgsSchema: z.ZodType<Prisma.FinEquityAwardsCreateArgs> = z
  .object({
    select: FinEquityAwardsSelectSchema.optional(),
    data: z.union([FinEquityAwardsCreateInputSchema, FinEquityAwardsUncheckedCreateInputSchema]),
  })
  .strict()

export const FinEquityAwardsUpsertArgsSchema: z.ZodType<Prisma.FinEquityAwardsUpsertArgs> = z
  .object({
    select: FinEquityAwardsSelectSchema.optional(),
    where: FinEquityAwardsWhereUniqueInputSchema,
    create: z.union([FinEquityAwardsCreateInputSchema, FinEquityAwardsUncheckedCreateInputSchema]),
    update: z.union([FinEquityAwardsUpdateInputSchema, FinEquityAwardsUncheckedUpdateInputSchema]),
  })
  .strict()

export const FinEquityAwardsCreateManyArgsSchema: z.ZodType<Prisma.FinEquityAwardsCreateManyArgs> = z
  .object({
    data: z.union([FinEquityAwardsCreateManyInputSchema, FinEquityAwardsCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const FinEquityAwardsDeleteArgsSchema: z.ZodType<Prisma.FinEquityAwardsDeleteArgs> = z
  .object({
    select: FinEquityAwardsSelectSchema.optional(),
    where: FinEquityAwardsWhereUniqueInputSchema,
  })
  .strict()

export const FinEquityAwardsUpdateArgsSchema: z.ZodType<Prisma.FinEquityAwardsUpdateArgs> = z
  .object({
    select: FinEquityAwardsSelectSchema.optional(),
    data: z.union([FinEquityAwardsUpdateInputSchema, FinEquityAwardsUncheckedUpdateInputSchema]),
    where: FinEquityAwardsWhereUniqueInputSchema,
  })
  .strict()

export const FinEquityAwardsUpdateManyArgsSchema: z.ZodType<Prisma.FinEquityAwardsUpdateManyArgs> = z
  .object({
    data: z.union([FinEquityAwardsUpdateManyMutationInputSchema, FinEquityAwardsUncheckedUpdateManyInputSchema]),
    where: FinEquityAwardsWhereInputSchema.optional(),
  })
  .strict()

export const FinEquityAwardsDeleteManyArgsSchema: z.ZodType<Prisma.FinEquityAwardsDeleteManyArgs> = z
  .object({
    where: FinEquityAwardsWhereInputSchema.optional(),
  })
  .strict()

export const FinPayslipsCreateArgsSchema: z.ZodType<Prisma.FinPayslipsCreateArgs> = z
  .object({
    select: FinPayslipsSelectSchema.optional(),
    data: z.union([FinPayslipsCreateInputSchema, FinPayslipsUncheckedCreateInputSchema]).optional(),
  })
  .strict()

export const FinPayslipsUpsertArgsSchema: z.ZodType<Prisma.FinPayslipsUpsertArgs> = z
  .object({
    select: FinPayslipsSelectSchema.optional(),
    where: FinPayslipsWhereUniqueInputSchema,
    create: z.union([FinPayslipsCreateInputSchema, FinPayslipsUncheckedCreateInputSchema]),
    update: z.union([FinPayslipsUpdateInputSchema, FinPayslipsUncheckedUpdateInputSchema]),
  })
  .strict()

export const FinPayslipsCreateManyArgsSchema: z.ZodType<Prisma.FinPayslipsCreateManyArgs> = z
  .object({
    data: z.union([FinPayslipsCreateManyInputSchema, FinPayslipsCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const FinPayslipsDeleteArgsSchema: z.ZodType<Prisma.FinPayslipsDeleteArgs> = z
  .object({
    select: FinPayslipsSelectSchema.optional(),
    where: FinPayslipsWhereUniqueInputSchema,
  })
  .strict()

export const FinPayslipsUpdateArgsSchema: z.ZodType<Prisma.FinPayslipsUpdateArgs> = z
  .object({
    select: FinPayslipsSelectSchema.optional(),
    data: z.union([FinPayslipsUpdateInputSchema, FinPayslipsUncheckedUpdateInputSchema]),
    where: FinPayslipsWhereUniqueInputSchema,
  })
  .strict()

export const FinPayslipsUpdateManyArgsSchema: z.ZodType<Prisma.FinPayslipsUpdateManyArgs> = z
  .object({
    data: z.union([FinPayslipsUpdateManyMutationInputSchema, FinPayslipsUncheckedUpdateManyInputSchema]),
    where: FinPayslipsWhereInputSchema.optional(),
  })
  .strict()

export const FinPayslipsDeleteManyArgsSchema: z.ZodType<Prisma.FinPayslipsDeleteManyArgs> = z
  .object({
    where: FinPayslipsWhereInputSchema.optional(),
  })
  .strict()

export const FinPayslipUploadsCreateArgsSchema: z.ZodType<Prisma.FinPayslipUploadsCreateArgs> = z
  .object({
    select: FinPayslipUploadsSelectSchema.optional(),
    data: z.union([FinPayslipUploadsCreateInputSchema, FinPayslipUploadsUncheckedCreateInputSchema]).optional(),
  })
  .strict()

export const FinPayslipUploadsUpsertArgsSchema: z.ZodType<Prisma.FinPayslipUploadsUpsertArgs> = z
  .object({
    select: FinPayslipUploadsSelectSchema.optional(),
    where: FinPayslipUploadsWhereUniqueInputSchema,
    create: z.union([FinPayslipUploadsCreateInputSchema, FinPayslipUploadsUncheckedCreateInputSchema]),
    update: z.union([FinPayslipUploadsUpdateInputSchema, FinPayslipUploadsUncheckedUpdateInputSchema]),
  })
  .strict()

export const FinPayslipUploadsCreateManyArgsSchema: z.ZodType<Prisma.FinPayslipUploadsCreateManyArgs> = z
  .object({
    data: z.union([FinPayslipUploadsCreateManyInputSchema, FinPayslipUploadsCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const FinPayslipUploadsDeleteArgsSchema: z.ZodType<Prisma.FinPayslipUploadsDeleteArgs> = z
  .object({
    select: FinPayslipUploadsSelectSchema.optional(),
    where: FinPayslipUploadsWhereUniqueInputSchema,
  })
  .strict()

export const FinPayslipUploadsUpdateArgsSchema: z.ZodType<Prisma.FinPayslipUploadsUpdateArgs> = z
  .object({
    select: FinPayslipUploadsSelectSchema.optional(),
    data: z.union([FinPayslipUploadsUpdateInputSchema, FinPayslipUploadsUncheckedUpdateInputSchema]),
    where: FinPayslipUploadsWhereUniqueInputSchema,
  })
  .strict()

export const FinPayslipUploadsUpdateManyArgsSchema: z.ZodType<Prisma.FinPayslipUploadsUpdateManyArgs> = z
  .object({
    data: z.union([FinPayslipUploadsUpdateManyMutationInputSchema, FinPayslipUploadsUncheckedUpdateManyInputSchema]),
    where: FinPayslipUploadsWhereInputSchema.optional(),
  })
  .strict()

export const FinPayslipUploadsDeleteManyArgsSchema: z.ZodType<Prisma.FinPayslipUploadsDeleteManyArgs> = z
  .object({
    where: FinPayslipUploadsWhereInputSchema.optional(),
  })
  .strict()

export const GraduatedTaxCreateArgsSchema: z.ZodType<Prisma.GraduatedTaxCreateArgs> = z
  .object({
    select: GraduatedTaxSelectSchema.optional(),
    data: z.union([GraduatedTaxCreateInputSchema, GraduatedTaxUncheckedCreateInputSchema]),
  })
  .strict()

export const GraduatedTaxUpsertArgsSchema: z.ZodType<Prisma.GraduatedTaxUpsertArgs> = z
  .object({
    select: GraduatedTaxSelectSchema.optional(),
    where: GraduatedTaxWhereUniqueInputSchema,
    create: z.union([GraduatedTaxCreateInputSchema, GraduatedTaxUncheckedCreateInputSchema]),
    update: z.union([GraduatedTaxUpdateInputSchema, GraduatedTaxUncheckedUpdateInputSchema]),
  })
  .strict()

export const GraduatedTaxCreateManyArgsSchema: z.ZodType<Prisma.GraduatedTaxCreateManyArgs> = z
  .object({
    data: z.union([GraduatedTaxCreateManyInputSchema, GraduatedTaxCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const GraduatedTaxDeleteArgsSchema: z.ZodType<Prisma.GraduatedTaxDeleteArgs> = z
  .object({
    select: GraduatedTaxSelectSchema.optional(),
    where: GraduatedTaxWhereUniqueInputSchema,
  })
  .strict()

export const GraduatedTaxUpdateArgsSchema: z.ZodType<Prisma.GraduatedTaxUpdateArgs> = z
  .object({
    select: GraduatedTaxSelectSchema.optional(),
    data: z.union([GraduatedTaxUpdateInputSchema, GraduatedTaxUncheckedUpdateInputSchema]),
    where: GraduatedTaxWhereUniqueInputSchema,
  })
  .strict()

export const GraduatedTaxUpdateManyArgsSchema: z.ZodType<Prisma.GraduatedTaxUpdateManyArgs> = z
  .object({
    data: z.union([GraduatedTaxUpdateManyMutationInputSchema, GraduatedTaxUncheckedUpdateManyInputSchema]),
    where: GraduatedTaxWhereInputSchema.optional(),
  })
  .strict()

export const GraduatedTaxDeleteManyArgsSchema: z.ZodType<Prisma.GraduatedTaxDeleteManyArgs> = z
  .object({
    where: GraduatedTaxWhereInputSchema.optional(),
  })
  .strict()

export const PHRPatientVitalsCreateArgsSchema: z.ZodType<Prisma.PHRPatientVitalsCreateArgs> = z
  .object({
    select: PHRPatientVitalsSelectSchema.optional(),
    data: z.union([PHRPatientVitalsCreateInputSchema, PHRPatientVitalsUncheckedCreateInputSchema]).optional(),
  })
  .strict()

export const PHRPatientVitalsUpsertArgsSchema: z.ZodType<Prisma.PHRPatientVitalsUpsertArgs> = z
  .object({
    select: PHRPatientVitalsSelectSchema.optional(),
    where: PHRPatientVitalsWhereUniqueInputSchema,
    create: z.union([PHRPatientVitalsCreateInputSchema, PHRPatientVitalsUncheckedCreateInputSchema]),
    update: z.union([PHRPatientVitalsUpdateInputSchema, PHRPatientVitalsUncheckedUpdateInputSchema]),
  })
  .strict()

export const PHRPatientVitalsCreateManyArgsSchema: z.ZodType<Prisma.PHRPatientVitalsCreateManyArgs> = z
  .object({
    data: z.union([PHRPatientVitalsCreateManyInputSchema, PHRPatientVitalsCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const PHRPatientVitalsDeleteArgsSchema: z.ZodType<Prisma.PHRPatientVitalsDeleteArgs> = z
  .object({
    select: PHRPatientVitalsSelectSchema.optional(),
    where: PHRPatientVitalsWhereUniqueInputSchema,
  })
  .strict()

export const PHRPatientVitalsUpdateArgsSchema: z.ZodType<Prisma.PHRPatientVitalsUpdateArgs> = z
  .object({
    select: PHRPatientVitalsSelectSchema.optional(),
    data: z.union([PHRPatientVitalsUpdateInputSchema, PHRPatientVitalsUncheckedUpdateInputSchema]),
    where: PHRPatientVitalsWhereUniqueInputSchema,
  })
  .strict()

export const PHRPatientVitalsUpdateManyArgsSchema: z.ZodType<Prisma.PHRPatientVitalsUpdateManyArgs> = z
  .object({
    data: z.union([PHRPatientVitalsUpdateManyMutationInputSchema, PHRPatientVitalsUncheckedUpdateManyInputSchema]),
    where: PHRPatientVitalsWhereInputSchema.optional(),
  })
  .strict()

export const PHRPatientVitalsDeleteManyArgsSchema: z.ZodType<Prisma.PHRPatientVitalsDeleteManyArgs> = z
  .object({
    where: PHRPatientVitalsWhereInputSchema.optional(),
  })
  .strict()

export const StockQuotesDailyCreateArgsSchema: z.ZodType<Prisma.StockQuotesDailyCreateArgs> = z
  .object({
    select: StockQuotesDailySelectSchema.optional(),
    data: z.union([StockQuotesDailyCreateInputSchema, StockQuotesDailyUncheckedCreateInputSchema]),
  })
  .strict()

export const StockQuotesDailyUpsertArgsSchema: z.ZodType<Prisma.StockQuotesDailyUpsertArgs> = z
  .object({
    select: StockQuotesDailySelectSchema.optional(),
    where: StockQuotesDailyWhereUniqueInputSchema,
    create: z.union([StockQuotesDailyCreateInputSchema, StockQuotesDailyUncheckedCreateInputSchema]),
    update: z.union([StockQuotesDailyUpdateInputSchema, StockQuotesDailyUncheckedUpdateInputSchema]),
  })
  .strict()

export const StockQuotesDailyCreateManyArgsSchema: z.ZodType<Prisma.StockQuotesDailyCreateManyArgs> = z
  .object({
    data: z.union([StockQuotesDailyCreateManyInputSchema, StockQuotesDailyCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const StockQuotesDailyDeleteArgsSchema: z.ZodType<Prisma.StockQuotesDailyDeleteArgs> = z
  .object({
    select: StockQuotesDailySelectSchema.optional(),
    where: StockQuotesDailyWhereUniqueInputSchema,
  })
  .strict()

export const StockQuotesDailyUpdateArgsSchema: z.ZodType<Prisma.StockQuotesDailyUpdateArgs> = z
  .object({
    select: StockQuotesDailySelectSchema.optional(),
    data: z.union([StockQuotesDailyUpdateInputSchema, StockQuotesDailyUncheckedUpdateInputSchema]),
    where: StockQuotesDailyWhereUniqueInputSchema,
  })
  .strict()

export const StockQuotesDailyUpdateManyArgsSchema: z.ZodType<Prisma.StockQuotesDailyUpdateManyArgs> = z
  .object({
    data: z.union([StockQuotesDailyUpdateManyMutationInputSchema, StockQuotesDailyUncheckedUpdateManyInputSchema]),
    where: StockQuotesDailyWhereInputSchema.optional(),
  })
  .strict()

export const StockQuotesDailyDeleteManyArgsSchema: z.ZodType<Prisma.StockQuotesDailyDeleteManyArgs> = z
  .object({
    where: StockQuotesDailyWhereInputSchema.optional(),
  })
  .strict()

export const TimeSeriesDatapointCreateArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointCreateArgs> = z
  .object({
    select: TimeSeriesDatapointSelectSchema.optional(),
    include: TimeSeriesDatapointIncludeSchema.optional(),
    data: z.union([TimeSeriesDatapointCreateInputSchema, TimeSeriesDatapointUncheckedCreateInputSchema]),
  })
  .strict()

export const TimeSeriesDatapointUpsertArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointUpsertArgs> = z
  .object({
    select: TimeSeriesDatapointSelectSchema.optional(),
    include: TimeSeriesDatapointIncludeSchema.optional(),
    where: TimeSeriesDatapointWhereUniqueInputSchema,
    create: z.union([TimeSeriesDatapointCreateInputSchema, TimeSeriesDatapointUncheckedCreateInputSchema]),
    update: z.union([TimeSeriesDatapointUpdateInputSchema, TimeSeriesDatapointUncheckedUpdateInputSchema]),
  })
  .strict()

export const TimeSeriesDatapointCreateManyArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointCreateManyArgs> = z
  .object({
    data: z.union([TimeSeriesDatapointCreateManyInputSchema, TimeSeriesDatapointCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const TimeSeriesDatapointDeleteArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointDeleteArgs> = z
  .object({
    select: TimeSeriesDatapointSelectSchema.optional(),
    include: TimeSeriesDatapointIncludeSchema.optional(),
    where: TimeSeriesDatapointWhereUniqueInputSchema,
  })
  .strict()

export const TimeSeriesDatapointUpdateArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointUpdateArgs> = z
  .object({
    select: TimeSeriesDatapointSelectSchema.optional(),
    include: TimeSeriesDatapointIncludeSchema.optional(),
    data: z.union([TimeSeriesDatapointUpdateInputSchema, TimeSeriesDatapointUncheckedUpdateInputSchema]),
    where: TimeSeriesDatapointWhereUniqueInputSchema,
  })
  .strict()

export const TimeSeriesDatapointUpdateManyArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointUpdateManyArgs> = z
  .object({
    data: z.union([TimeSeriesDatapointUpdateManyMutationInputSchema, TimeSeriesDatapointUncheckedUpdateManyInputSchema]),
    where: TimeSeriesDatapointWhereInputSchema.optional(),
  })
  .strict()

export const TimeSeriesDatapointDeleteManyArgsSchema: z.ZodType<Prisma.TimeSeriesDatapointDeleteManyArgs> = z
  .object({
    where: TimeSeriesDatapointWhereInputSchema.optional(),
  })
  .strict()

export const TimeSeriesDocumentCreateArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentCreateArgs> = z
  .object({
    select: TimeSeriesDocumentSelectSchema.optional(),
    include: TimeSeriesDocumentIncludeSchema.optional(),
    data: z.union([TimeSeriesDocumentCreateInputSchema, TimeSeriesDocumentUncheckedCreateInputSchema]),
  })
  .strict()

export const TimeSeriesDocumentUpsertArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentUpsertArgs> = z
  .object({
    select: TimeSeriesDocumentSelectSchema.optional(),
    include: TimeSeriesDocumentIncludeSchema.optional(),
    where: TimeSeriesDocumentWhereUniqueInputSchema,
    create: z.union([TimeSeriesDocumentCreateInputSchema, TimeSeriesDocumentUncheckedCreateInputSchema]),
    update: z.union([TimeSeriesDocumentUpdateInputSchema, TimeSeriesDocumentUncheckedUpdateInputSchema]),
  })
  .strict()

export const TimeSeriesDocumentCreateManyArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentCreateManyArgs> = z
  .object({
    data: z.union([TimeSeriesDocumentCreateManyInputSchema, TimeSeriesDocumentCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const TimeSeriesDocumentDeleteArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentDeleteArgs> = z
  .object({
    select: TimeSeriesDocumentSelectSchema.optional(),
    include: TimeSeriesDocumentIncludeSchema.optional(),
    where: TimeSeriesDocumentWhereUniqueInputSchema,
  })
  .strict()

export const TimeSeriesDocumentUpdateArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentUpdateArgs> = z
  .object({
    select: TimeSeriesDocumentSelectSchema.optional(),
    include: TimeSeriesDocumentIncludeSchema.optional(),
    data: z.union([TimeSeriesDocumentUpdateInputSchema, TimeSeriesDocumentUncheckedUpdateInputSchema]),
    where: TimeSeriesDocumentWhereUniqueInputSchema,
  })
  .strict()

export const TimeSeriesDocumentUpdateManyArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentUpdateManyArgs> = z
  .object({
    data: z.union([TimeSeriesDocumentUpdateManyMutationInputSchema, TimeSeriesDocumentUncheckedUpdateManyInputSchema]),
    where: TimeSeriesDocumentWhereInputSchema.optional(),
  })
  .strict()

export const TimeSeriesDocumentDeleteManyArgsSchema: z.ZodType<Prisma.TimeSeriesDocumentDeleteManyArgs> = z
  .object({
    where: TimeSeriesDocumentWhereInputSchema.optional(),
  })
  .strict()

export const TimeSeriesSeriesCreateArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesCreateArgs> = z
  .object({
    select: TimeSeriesSeriesSelectSchema.optional(),
    include: TimeSeriesSeriesIncludeSchema.optional(),
    data: z.union([TimeSeriesSeriesCreateInputSchema, TimeSeriesSeriesUncheckedCreateInputSchema]),
  })
  .strict()

export const TimeSeriesSeriesUpsertArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesUpsertArgs> = z
  .object({
    select: TimeSeriesSeriesSelectSchema.optional(),
    include: TimeSeriesSeriesIncludeSchema.optional(),
    where: TimeSeriesSeriesWhereUniqueInputSchema,
    create: z.union([TimeSeriesSeriesCreateInputSchema, TimeSeriesSeriesUncheckedCreateInputSchema]),
    update: z.union([TimeSeriesSeriesUpdateInputSchema, TimeSeriesSeriesUncheckedUpdateInputSchema]),
  })
  .strict()

export const TimeSeriesSeriesCreateManyArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesCreateManyArgs> = z
  .object({
    data: z.union([TimeSeriesSeriesCreateManyInputSchema, TimeSeriesSeriesCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const TimeSeriesSeriesDeleteArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesDeleteArgs> = z
  .object({
    select: TimeSeriesSeriesSelectSchema.optional(),
    include: TimeSeriesSeriesIncludeSchema.optional(),
    where: TimeSeriesSeriesWhereUniqueInputSchema,
  })
  .strict()

export const TimeSeriesSeriesUpdateArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesUpdateArgs> = z
  .object({
    select: TimeSeriesSeriesSelectSchema.optional(),
    include: TimeSeriesSeriesIncludeSchema.optional(),
    data: z.union([TimeSeriesSeriesUpdateInputSchema, TimeSeriesSeriesUncheckedUpdateInputSchema]),
    where: TimeSeriesSeriesWhereUniqueInputSchema,
  })
  .strict()

export const TimeSeriesSeriesUpdateManyArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesUpdateManyArgs> = z
  .object({
    data: z.union([TimeSeriesSeriesUpdateManyMutationInputSchema, TimeSeriesSeriesUncheckedUpdateManyInputSchema]),
    where: TimeSeriesSeriesWhereInputSchema.optional(),
  })
  .strict()

export const TimeSeriesSeriesDeleteManyArgsSchema: z.ZodType<Prisma.TimeSeriesSeriesDeleteManyArgs> = z
  .object({
    where: TimeSeriesSeriesWhereInputSchema.optional(),
  })
  .strict()

export const UsersLegacyCreateArgsSchema: z.ZodType<Prisma.UsersLegacyCreateArgs> = z
  .object({
    select: UsersLegacySelectSchema.optional(),
    data: z.union([UsersLegacyCreateInputSchema, UsersLegacyUncheckedCreateInputSchema]),
  })
  .strict()

export const UsersLegacyUpsertArgsSchema: z.ZodType<Prisma.UsersLegacyUpsertArgs> = z
  .object({
    select: UsersLegacySelectSchema.optional(),
    where: UsersLegacyWhereUniqueInputSchema,
    create: z.union([UsersLegacyCreateInputSchema, UsersLegacyUncheckedCreateInputSchema]),
    update: z.union([UsersLegacyUpdateInputSchema, UsersLegacyUncheckedUpdateInputSchema]),
  })
  .strict()

export const UsersLegacyCreateManyArgsSchema: z.ZodType<Prisma.UsersLegacyCreateManyArgs> = z
  .object({
    data: z.union([UsersLegacyCreateManyInputSchema, UsersLegacyCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const UsersLegacyDeleteArgsSchema: z.ZodType<Prisma.UsersLegacyDeleteArgs> = z
  .object({
    select: UsersLegacySelectSchema.optional(),
    where: UsersLegacyWhereUniqueInputSchema,
  })
  .strict()

export const UsersLegacyUpdateArgsSchema: z.ZodType<Prisma.UsersLegacyUpdateArgs> = z
  .object({
    select: UsersLegacySelectSchema.optional(),
    data: z.union([UsersLegacyUpdateInputSchema, UsersLegacyUncheckedUpdateInputSchema]),
    where: UsersLegacyWhereUniqueInputSchema,
  })
  .strict()

export const UsersLegacyUpdateManyArgsSchema: z.ZodType<Prisma.UsersLegacyUpdateManyArgs> = z
  .object({
    data: z.union([UsersLegacyUpdateManyMutationInputSchema, UsersLegacyUncheckedUpdateManyInputSchema]),
    where: UsersLegacyWhereInputSchema.optional(),
  })
  .strict()

export const UsersLegacyDeleteManyArgsSchema: z.ZodType<Prisma.UsersLegacyDeleteManyArgs> = z
  .object({
    where: UsersLegacyWhereInputSchema.optional(),
  })
  .strict()

export const VXCVFilesCreateArgsSchema: z.ZodType<Prisma.VXCVFilesCreateArgs> = z
  .object({
    select: VXCVFilesSelectSchema.optional(),
    data: z.union([VXCVFilesCreateInputSchema, VXCVFilesUncheckedCreateInputSchema]),
  })
  .strict()

export const VXCVFilesUpsertArgsSchema: z.ZodType<Prisma.VXCVFilesUpsertArgs> = z
  .object({
    select: VXCVFilesSelectSchema.optional(),
    where: VXCVFilesWhereUniqueInputSchema,
    create: z.union([VXCVFilesCreateInputSchema, VXCVFilesUncheckedCreateInputSchema]),
    update: z.union([VXCVFilesUpdateInputSchema, VXCVFilesUncheckedUpdateInputSchema]),
  })
  .strict()

export const VXCVFilesCreateManyArgsSchema: z.ZodType<Prisma.VXCVFilesCreateManyArgs> = z
  .object({
    data: z.union([VXCVFilesCreateManyInputSchema, VXCVFilesCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const VXCVFilesDeleteArgsSchema: z.ZodType<Prisma.VXCVFilesDeleteArgs> = z
  .object({
    select: VXCVFilesSelectSchema.optional(),
    where: VXCVFilesWhereUniqueInputSchema,
  })
  .strict()

export const VXCVFilesUpdateArgsSchema: z.ZodType<Prisma.VXCVFilesUpdateArgs> = z
  .object({
    select: VXCVFilesSelectSchema.optional(),
    data: z.union([VXCVFilesUpdateInputSchema, VXCVFilesUncheckedUpdateInputSchema]),
    where: VXCVFilesWhereUniqueInputSchema,
  })
  .strict()

export const VXCVFilesUpdateManyArgsSchema: z.ZodType<Prisma.VXCVFilesUpdateManyArgs> = z
  .object({
    data: z.union([VXCVFilesUpdateManyMutationInputSchema, VXCVFilesUncheckedUpdateManyInputSchema]),
    where: VXCVFilesWhereInputSchema.optional(),
  })
  .strict()

export const VXCVFilesDeleteManyArgsSchema: z.ZodType<Prisma.VXCVFilesDeleteManyArgs> = z
  .object({
    where: VXCVFilesWhereInputSchema.optional(),
  })
  .strict()

export const VXCVLinksCreateArgsSchema: z.ZodType<Prisma.VXCVLinksCreateArgs> = z
  .object({
    select: VXCVLinksSelectSchema.optional(),
    data: z.union([VXCVLinksCreateInputSchema, VXCVLinksUncheckedCreateInputSchema]),
  })
  .strict()

export const VXCVLinksUpsertArgsSchema: z.ZodType<Prisma.VXCVLinksUpsertArgs> = z
  .object({
    select: VXCVLinksSelectSchema.optional(),
    where: VXCVLinksWhereUniqueInputSchema,
    create: z.union([VXCVLinksCreateInputSchema, VXCVLinksUncheckedCreateInputSchema]),
    update: z.union([VXCVLinksUpdateInputSchema, VXCVLinksUncheckedUpdateInputSchema]),
  })
  .strict()

export const VXCVLinksCreateManyArgsSchema: z.ZodType<Prisma.VXCVLinksCreateManyArgs> = z
  .object({
    data: z.union([VXCVLinksCreateManyInputSchema, VXCVLinksCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const VXCVLinksDeleteArgsSchema: z.ZodType<Prisma.VXCVLinksDeleteArgs> = z
  .object({
    select: VXCVLinksSelectSchema.optional(),
    where: VXCVLinksWhereUniqueInputSchema,
  })
  .strict()

export const VXCVLinksUpdateArgsSchema: z.ZodType<Prisma.VXCVLinksUpdateArgs> = z
  .object({
    select: VXCVLinksSelectSchema.optional(),
    data: z.union([VXCVLinksUpdateInputSchema, VXCVLinksUncheckedUpdateInputSchema]),
    where: VXCVLinksWhereUniqueInputSchema,
  })
  .strict()

export const VXCVLinksUpdateManyArgsSchema: z.ZodType<Prisma.VXCVLinksUpdateManyArgs> = z
  .object({
    data: z.union([VXCVLinksUpdateManyMutationInputSchema, VXCVLinksUncheckedUpdateManyInputSchema]),
    where: VXCVLinksWhereInputSchema.optional(),
  })
  .strict()

export const VXCVLinksDeleteManyArgsSchema: z.ZodType<Prisma.VXCVLinksDeleteManyArgs> = z
  .object({
    where: VXCVLinksWhereInputSchema.optional(),
  })
  .strict()

export const AccountLineItemTagCreateArgsSchema: z.ZodType<Prisma.AccountLineItemTagCreateArgs> = z
  .object({
    select: AccountLineItemTagSelectSchema.optional(),
    data: z.union([AccountLineItemTagCreateInputSchema, AccountLineItemTagUncheckedCreateInputSchema]),
  })
  .strict()

export const AccountLineItemTagUpsertArgsSchema: z.ZodType<Prisma.AccountLineItemTagUpsertArgs> = z
  .object({
    select: AccountLineItemTagSelectSchema.optional(),
    where: AccountLineItemTagWhereUniqueInputSchema,
    create: z.union([AccountLineItemTagCreateInputSchema, AccountLineItemTagUncheckedCreateInputSchema]),
    update: z.union([AccountLineItemTagUpdateInputSchema, AccountLineItemTagUncheckedUpdateInputSchema]),
  })
  .strict()

export const AccountLineItemTagCreateManyArgsSchema: z.ZodType<Prisma.AccountLineItemTagCreateManyArgs> = z
  .object({
    data: z.union([AccountLineItemTagCreateManyInputSchema, AccountLineItemTagCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const AccountLineItemTagDeleteArgsSchema: z.ZodType<Prisma.AccountLineItemTagDeleteArgs> = z
  .object({
    select: AccountLineItemTagSelectSchema.optional(),
    where: AccountLineItemTagWhereUniqueInputSchema,
  })
  .strict()

export const AccountLineItemTagUpdateArgsSchema: z.ZodType<Prisma.AccountLineItemTagUpdateArgs> = z
  .object({
    select: AccountLineItemTagSelectSchema.optional(),
    data: z.union([AccountLineItemTagUpdateInputSchema, AccountLineItemTagUncheckedUpdateInputSchema]),
    where: AccountLineItemTagWhereUniqueInputSchema,
  })
  .strict()

export const AccountLineItemTagUpdateManyArgsSchema: z.ZodType<Prisma.AccountLineItemTagUpdateManyArgs> = z
  .object({
    data: z.union([AccountLineItemTagUpdateManyMutationInputSchema, AccountLineItemTagUncheckedUpdateManyInputSchema]),
    where: AccountLineItemTagWhereInputSchema.optional(),
  })
  .strict()

export const AccountLineItemTagDeleteManyArgsSchema: z.ZodType<Prisma.AccountLineItemTagDeleteManyArgs> = z
  .object({
    where: AccountLineItemTagWhereInputSchema.optional(),
  })
  .strict()

export const FinAccountTagCreateArgsSchema: z.ZodType<Prisma.FinAccountTagCreateArgs> = z
  .object({
    select: FinAccountTagSelectSchema.optional(),
    include: FinAccountTagIncludeSchema.optional(),
    data: z.union([FinAccountTagCreateInputSchema, FinAccountTagUncheckedCreateInputSchema]),
  })
  .strict()

export const FinAccountTagUpsertArgsSchema: z.ZodType<Prisma.FinAccountTagUpsertArgs> = z
  .object({
    select: FinAccountTagSelectSchema.optional(),
    include: FinAccountTagIncludeSchema.optional(),
    where: FinAccountTagWhereUniqueInputSchema,
    create: z.union([FinAccountTagCreateInputSchema, FinAccountTagUncheckedCreateInputSchema]),
    update: z.union([FinAccountTagUpdateInputSchema, FinAccountTagUncheckedUpdateInputSchema]),
  })
  .strict()

export const FinAccountTagCreateManyArgsSchema: z.ZodType<Prisma.FinAccountTagCreateManyArgs> = z
  .object({
    data: z.union([FinAccountTagCreateManyInputSchema, FinAccountTagCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const FinAccountTagDeleteArgsSchema: z.ZodType<Prisma.FinAccountTagDeleteArgs> = z
  .object({
    select: FinAccountTagSelectSchema.optional(),
    include: FinAccountTagIncludeSchema.optional(),
    where: FinAccountTagWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountTagUpdateArgsSchema: z.ZodType<Prisma.FinAccountTagUpdateArgs> = z
  .object({
    select: FinAccountTagSelectSchema.optional(),
    include: FinAccountTagIncludeSchema.optional(),
    data: z.union([FinAccountTagUpdateInputSchema, FinAccountTagUncheckedUpdateInputSchema]),
    where: FinAccountTagWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountTagUpdateManyArgsSchema: z.ZodType<Prisma.FinAccountTagUpdateManyArgs> = z
  .object({
    data: z.union([FinAccountTagUpdateManyMutationInputSchema, FinAccountTagUncheckedUpdateManyInputSchema]),
    where: FinAccountTagWhereInputSchema.optional(),
  })
  .strict()

export const FinAccountTagDeleteManyArgsSchema: z.ZodType<Prisma.FinAccountTagDeleteManyArgs> = z
  .object({
    where: FinAccountTagWhereInputSchema.optional(),
  })
  .strict()

export const FinAccountLineItemTagMapCreateArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateArgs> = z
  .object({
    select: FinAccountLineItemTagMapSelectSchema.optional(),
    include: FinAccountLineItemTagMapIncludeSchema.optional(),
    data: z.union([FinAccountLineItemTagMapCreateInputSchema, FinAccountLineItemTagMapUncheckedCreateInputSchema]),
  })
  .strict()

export const FinAccountLineItemTagMapUpsertArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpsertArgs> = z
  .object({
    select: FinAccountLineItemTagMapSelectSchema.optional(),
    include: FinAccountLineItemTagMapIncludeSchema.optional(),
    where: FinAccountLineItemTagMapWhereUniqueInputSchema,
    create: z.union([FinAccountLineItemTagMapCreateInputSchema, FinAccountLineItemTagMapUncheckedCreateInputSchema]),
    update: z.union([FinAccountLineItemTagMapUpdateInputSchema, FinAccountLineItemTagMapUncheckedUpdateInputSchema]),
  })
  .strict()

export const FinAccountLineItemTagMapCreateManyArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapCreateManyArgs> = z
  .object({
    data: z.union([FinAccountLineItemTagMapCreateManyInputSchema, FinAccountLineItemTagMapCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const FinAccountLineItemTagMapDeleteArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapDeleteArgs> = z
  .object({
    select: FinAccountLineItemTagMapSelectSchema.optional(),
    include: FinAccountLineItemTagMapIncludeSchema.optional(),
    where: FinAccountLineItemTagMapWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountLineItemTagMapUpdateArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpdateArgs> = z
  .object({
    select: FinAccountLineItemTagMapSelectSchema.optional(),
    include: FinAccountLineItemTagMapIncludeSchema.optional(),
    data: z.union([FinAccountLineItemTagMapUpdateInputSchema, FinAccountLineItemTagMapUncheckedUpdateInputSchema]),
    where: FinAccountLineItemTagMapWhereUniqueInputSchema,
  })
  .strict()

export const FinAccountLineItemTagMapUpdateManyArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapUpdateManyArgs> = z
  .object({
    data: z.union([
      FinAccountLineItemTagMapUpdateManyMutationInputSchema,
      FinAccountLineItemTagMapUncheckedUpdateManyInputSchema,
    ]),
    where: FinAccountLineItemTagMapWhereInputSchema.optional(),
  })
  .strict()

export const FinAccountLineItemTagMapDeleteManyArgsSchema: z.ZodType<Prisma.FinAccountLineItemTagMapDeleteManyArgs> = z
  .object({
    where: FinAccountLineItemTagMapWhereInputSchema.optional(),
  })
  .strict()
