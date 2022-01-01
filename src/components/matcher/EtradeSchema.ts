import currency from 'currency.js'
import { EtradeSchema } from 'lib/accounting-row'
import _ from 'lodash'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { StockOptionSchema } from './StockOptionSchema'
import { sum } from './sum'

export interface TradingAccount {
  accountID: AccountID
  transactions: EtradeSchema[]
}

export type CapitalGain = Map<number, currency>

export interface MatchedTransaction extends EtradeSchema {
  CapGain?: CapitalGain
}

export type AccountID = string
export type TransactionKey = string

class MatchedAccount {
  originalAccount: TradingAccount
  groups: Record<string, MatchedTransaction[]>
  unmatched: EtradeSchema[]
  cash: EtradeSchema[]
}

function matchAccount(account: TradingAccount): MatchedAccount {
  const source: EtradeSchema[] = _.orderBy(
    account.transactions,
    ['TransactionDate', 'TransactionType', 'Quantity'],
    ['asc', 'asc', 'desc'],
  ).filter((r) => !!r.TransactionType)
  // fee populator
  for (let i = 0; i < source.length; ++i) {
    if (source[i].Quantity.value == 0) {
      continue
    }
    const mult = source[i].SecurityType === 'OPTN' ? -100 : -1
    const pq = source[i].Quantity.multiply(source[i].Price)
    source[i].Fee = pq
      .multiply(mult)
      .subtract(source[i].Commission)
      .subtract(source[i].Amount)
    // if (source[i].Fee.value != 0) {
    //   console.log(`${source[i].Description} - ${source[i].Fee}`)
    // }
  }

  const groups: Record<string, MatchedTransaction[]> = {}

  // pull out cash 1st
  const cash: EtradeSchema[] = []
  const matchedIndexes = new Set<number>()
  const tt = new Set<string>(['Journal', 'Interest', 'Transfer', 'Credit'])
  for (let i = 0; i < source.length; ++i) {
    if (tt.has(source[i].SecurityType)) {
      matchedIndexes.add(i)
      cash.push(source[i])
    }
  }

  for (let i = 0; i < source.length; ++i) {
    if (matchedIndexes.has(i)) continue
    const isMatched = false
    const doMatch = (xOpen: string, xClose: string[]) => {
      if (source[i].TransactionType === xOpen) {
        const qtyOpen = source[i].Quantity
        const group: MatchedTransaction[] = [source[i]]
        for (let j = 0; j < source.length; ++j) {
          if (sum(group.map((x) => x.Quantity)).intValue == 0) break
          if (matchedIndexes.has(j)) continue
          if (j == i) continue
          const isClosingTransaction =
            xClose.indexOf(source[j].TransactionType) !== -1
          if (
            (isClosingTransaction || xOpen === source[j].TransactionType) &&
            source[j].Description === source[i].Description
          ) {
            const capGain: CapitalGain = new Map()
            if (isClosingTransaction) {
              const closeYear = moment(source[j].TransactionDate).year()
              // const qtyClosed = qtyOpen.subtract(source[i].Quantity) //
              // const ratio = qtyClosed.divide(sourc)
              // capGain.set(
              //   closeYear,
              //   closeVal.add(openVal),
              // )
              // if (source[j].Description === "TSLA Nov 13 '20 $500 Put") {
              //   console.log({
              //     closeYear, openVal, closeVal, ratio
              //   })
              // }
            }
            matchedIndexes.add(j)
            group.push({
              CapGain: capGain,
              ...source[j],
            })
          }
        }
        if (group.length > 1) {
          matchedIndexes.add(i)
          const existing = groups[source[i].Description] ?? []
          groups[source[i].Description] = _.sortBy(
            [...group, ...existing],
            (x) => moment(x.TransactionDate),
          )
          return true
        } else if (group.length == 1) {
          group[0].CapGain = undefined
        }
      }
      return false
    }
    doMatch('Bought To Open', [
      'Sold To Close',
      'Option Expiration',
      'Option Exercise',
    ]) ||
      doMatch('Sold Short', [
        'Bought To Cover',
        'Option Expiration',
        'Option Assignment',
      ])
    doMatch('Bought', ['Sold'])
  }

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
      accountMatches: Map<AccountID, MatchedTransaction[]>
      totalQty: currency
    }
  > = {}
  const yearlyGains: Map<any, number> = new Map()
  for (const acc of matchedAccounts) {
    const handleUnmatch = (
      accountName: string,
      records: MatchedTransaction[],
    ) => {
      overallResult[accountName] ||= {
        total: currency(0),
        accountMatches: new Map(),
        totalQty: currency(0),
      } // supply default
      overallResult[accountName].accountMatches.set(
        acc.originalAccount.accountID,
        records,
      )
      overallResult[accountName].total = overallResult[accountName].total.add(
        sum(records.map((trans) => trans.Amount)),
      )
      overallResult[accountName].totalQty =
        accountName === 'cash'
          ? null
          : overallResult[accountName].totalQty.add(
              sum(records.map((trans) => trans.Quantity)),
            )

      if (accountName !== 'cash') {
        // cap gain
        overallResult[accountName].accountMatches
      }
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
  keyObjects.sort((a, b) => {
    if (!a.stockOption && !b.stockOption) {
      if (a.key < b.key) return -1
      if (a.key > b.key) return 1
    }
    if (a.stockOption && b.stockOption) {
      if (a.stockOption.symbol < b.stockOption.symbol) return -1
      if (a.stockOption.symbol > b.stockOption.symbol) return 1
      else return a.stockOption.maturity.diff(b.stockOption.maturity)
    }
    if (a.stockOption && !b.stockOption) {
      return -1
    }
    if (!a.stockOption && b.stockOption) {
      return 1
    }
    return 0
  })

  // Sort options by maturity date
  // keyObjects.sort((a, b) => {
  //   if (!a.stockOption && !b.stockOption) {
  //     if (a.key < b.key) return -1
  //     if (a.key > b.key) return 1
  //   }
  //   if (a.stockOption && !b.stockOption) {
  //     return -1
  //   }
  //   if (!a.stockOption && b.stockOption) {
  //     return 1
  //   }
  //   if (a.stockOption && b.stockOption) {
  //     const timeDiff = a.stockOption.maturity.diff(b.stockOption.maturity)
  //     if (timeDiff != 0) {
  //       return timeDiff
  //     }
  //     if (a.stockOption.symbol < b.stockOption.symbol) return -1
  //     if (a.stockOption.symbol > b.stockOption.symbol) return 1
  //     return 0
  //   }
  //   return 0
  // })

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
          Comment: '',
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
