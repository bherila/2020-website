import currency from 'currency.js'
import _ from 'lodash'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { StockOptionSchema } from './StockOptionSchema'
import { sum } from './sum'

export interface TradingAccount {
  accountID: AccountID
  transactions: EtradeSchema[]
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
  StockOption: StockOptionSchema | null
}

export type AccountID = string
export type TransactionKey = string

export interface MatchedTransactions {
  transactionKeys: TransactionKey[]
  matches: Map<AccountID, EtradeSchema[]>
  netGain: currency
}

class MatchedAccount {
  originalAccount: TradingAccount
  groups: Record<string, EtradeSchema[]>
  unmatched: EtradeSchema[]
  cash: EtradeSchema[]
}

function matchAccount(account: TradingAccount): MatchedAccount {
  const source: EtradeSchema[] = _.orderBy(account.transactions, [
    'TransactionDate',
    'TransactionType',
  ]).filter((r) => !!r.TransactionType)
  const groups: Record<string, EtradeSchema[]> = {}
  const matchedIndexes = new Set<number>()
  for (let i = 0; i < source.length; ++i) {
    if (matchedIndexes.has(i)) continue
    const isMatched = false
    const doMatch = (xOpen: string, xClose: string[]) => {
      if (source[i].TransactionType === xOpen) {
        const group: EtradeSchema[] = [source[i]]
        for (let j = 0; j < source.length; ++j) {
          if (matchedIndexes.has(j)) continue
          if (j == i) continue
          if (
            (xClose.indexOf(source[j].TransactionType) !== -1 ||
              xOpen === source[j].TransactionType) &&
            source[j].Description === source[i].Description
          ) {
            matchedIndexes.add(j)
            group.push(source[j])
          }
        }
        if (group.length > 1) {
          matchedIndexes.add(i)
          groups[source[i].Description] = _.sortBy(group, (x) =>
            moment(x.TransactionDate),
          )
          return true
        }
      }
      return false
    }
    doMatch('Bought To Open', ['Sold To Close', 'Option Expiration']) ||
      doMatch('Sold Short', ['Bought To Cover', 'Option Expiration'])
  }

  const cash: EtradeSchema[] = []
  const unmatched: EtradeSchema[] = []
  for (let i = 0; i < source.length; ++i) {
    if (!matchedIndexes.has(i)) {
      if (
        source[i].Description.match(
          /TFR (?:CASH|MARGIN).*|TRANSFER BAL.*|ACH.*|EXTENDED INSURANCE.*|INWIRE.*|INTEREST.*|CUSTOMER PROMO.*/i,
        )
      ) {
        cash.push(source[i])
      } else {
        unmatched.push(source[i])
      }
    }
  }
  return {
    originalAccount: account,
    groups,
    unmatched,
    cash,
  }
}

export function matchAcrossAccounts(accounts: TradingAccount[]) {
  const matchedAccounts = accounts.map(matchAccount)
  const overallResult: Record<
    TransactionKey,
    {
      total: currency
      accountMatches: Map<AccountID, EtradeSchema[]>
      totalQty: currency
    }
  > = {}
  for (const acc of matchedAccounts) {
    const handleUnmatch = (group: string, records: EtradeSchema[]) => {
      overallResult[group] ||= {
        total: currency(0),
        accountMatches: new Map(),
        totalQty: currency(0),
      } // supply default
      overallResult[group].accountMatches.set(
        acc.originalAccount.accountID,
        records,
      )
      overallResult[group].total = overallResult[group].total.add(
        sum(records.map((trans) => trans.Amount)),
      )
      overallResult[group].totalQty =
        group === 'cash'
          ? null
          : overallResult[group].totalQty.add(
              sum(records.map((trans) => trans.Quantity)),
            )
    }
    Object.entries(acc.groups).forEach((kv) => handleUnmatch(kv[0], kv[1]))
    handleUnmatch('cash', acc.cash)
    acc.unmatched.forEach((r) => handleUnmatch(r.Description, [r]))
  }

  // get sorted keys
  const keyObjects = Object.keys(overallResult).map((key) => ({
    key,
    stockOption: StockOptionSchema.tryParse(key),
  }))

  // Sort by option, then date.
  // keyObjects.sort((a, b) => {
  //   if (!a.stockOption && !b.stockOption) {
  //     if (a.key < b.key) return -1
  //     if (a.key > b.key) return 1
  //   }
  //   if (a.stockOption && b.stockOption) {
  //     if (a.stockOption.symbol < b.stockOption.symbol) return -1
  //     if (a.stockOption.symbol > b.stockOption.symbol) return 1
  //     else return a.stockOption.maturity.diff(b.stockOption.maturity)
  //   }
  //   if (a.stockOption && !b.stockOption) {
  //     return 1
  //   }
  //   if (!a.stockOption && b.stockOption) {
  //     return 1
  //   }
  //   return 0
  // })

  // Sort options by maturity date
  keyObjects.sort((a, b) => {
    if (!a.stockOption && !b.stockOption) {
      if (a.key < b.key) return -1
      if (a.key > b.key) return 1
    }
    if (a.stockOption && b.stockOption) {
      const timeDiff = a.stockOption.maturity.diff(b.stockOption.maturity)
      if (timeDiff != 0) {
        return timeDiff
      }
      if (a.stockOption.symbol < b.stockOption.symbol) return -1
      if (a.stockOption.symbol > b.stockOption.symbol) return 1
      return 0
    }
    if (a.stockOption && !b.stockOption) {
      return 1
    }
    if (!a.stockOption && b.stockOption) {
      return 1
    }
    return 0
  })

  const keys = keyObjects.map((keyObj) => keyObj.key)
  const grandTotal = sum(Object.values(overallResult).map((x) => x.total))
  const grandTotalClosed = sum(
    Object.values(overallResult)
      .filter((r) => r.totalQty != null && r.totalQty.value == 0)
      .map((r) => r.total),
  )
  return {
    keys,
    overallResult,
    grandTotal,
    grandTotalClosed,
  }
}

export function parseEtrade(tsv: string): EtradeSchema[] {
  const lines = tsv.split('\n')
  const res = lines
    .map((col) => {
      try {
        const cols = col.split('\t')
        const res: EtradeSchema = {
          id: uuidv4(),
          TransactionDate: moment(cols[0]).format('YYYY-MM-DD'),
          TransactionType: cols[1],
          SecurityType: cols[2],
          Symbol: cols[3],
          Quantity: currency(cols[4] || 0),
          Amount: currency(cols[5] || 0),
          Price: currency(cols[6] || 0),
          Commission: currency(cols[7] || 0),
          Fee: currency(0),
          Description: cols[8],
          StockOption: StockOptionSchema.tryParse(cols[8]),
        }
        return res
      } catch (err) {
        console.warn(err)
        return null
      }
    })
    .filter(Boolean)
  console.info(res)
  return res
}
