import { AccountLineItem, AccountLineItemSchema } from '@/lib/AccountLineItem'
import { parseOptionDescription } from './StockOptionUtil'

export function parseQuickenQFX(data: string): AccountLineItem[] {
  const accountLineItems: AccountLineItem[] = []
  const lines = data.split('\n')

  let transactionDate: Date | null = null
  let transactionType: string | null = null
  let symbol: string | null = null
  let quantity: number | null = null
  let amount: number | null = null
  let price: number | null = null
  let commission: number | null = null
  let description: string | null = null
  let cusip: string | null = null
  let optType: 'call' | 'put' | null = null
  let optExpiration: string | null = null
  let optStrike: number | null = null

  function reset() {
    transactionDate = null
    transactionType = null
    symbol = null
    quantity = null
    amount = null
    price = null
    commission = null
    description = null
    cusip = null
    optType = null
    optExpiration = null
    optStrike = null
  }

  lines.forEach((line) => {
    if (line.startsWith('<SELLOPT>')) {
      reset()
      return
    }

    // example <DTTRADE>20240102170000.000 parsing as UTC
    if (line.startsWith('<DTTRADE>')) {
      const date = line.substring(9)
      const year = date.substring(0, 4)
      const month = date.substring(4, 6)
      const day = date.substring(6, 8)
      const hour = date.substring(8, 10)
      const minute = date.substring(10, 12)
      const second = date.substring(12, 14)
      transactionDate = new Date(
        Date.UTC(
          parseInt(year, 10),
          parseInt(month, 10) - 1,
          parseInt(day, 10),
          parseInt(hour, 10),
          parseInt(minute, 10),
          parseInt(second, 10),
        ),
      )
    }

    if (line.startsWith('<MEMO>')) {
      description = line.substring(6)
      const optionDescription = parseOptionDescription(description)
      if (optionDescription) {
        optType = optionDescription.optionType
        optExpiration = optionDescription.maturityDate
        optStrike = optionDescription.strikePrice
        symbol = optionDescription.symbol
      }
    }

    if (line.startsWith('<SECID>')) {
      // Do nothing, symbol is now parsed from <MEMO>
      // but CUSIP is parsed from <UNIQUEID> which follows
    }

    if (line.startsWith('<UNIQUEID>')) {
      cusip = line.substring(10)
    }

    if (line.startsWith('<UNITS>')) {
      quantity = parseInt(line.substring(7), 10)
    }

    if (line.startsWith('<UNITPRICE>')) {
      price = parseFloat(line.substring(11))
    }

    if (line.startsWith('<FEES>')) {
      commission = parseFloat(line.substring(6))
    }

    if (line.startsWith('<TOTAL>')) {
      amount = parseFloat(line.substring(7))
    }

    if (line.startsWith('<OPTSELLTYPE>')) {
      if (line.substring(13) === 'SELLTOOPEN') {
        transactionType = 'sold short'
      }
    }

    if (line.startsWith('<OPTBUYTYPE>')) {
      if (line.substring(12) === 'BUYTOCLOSE') {
        transactionType = 'bought to cover'
      }
    }

    if (line.startsWith('</SELLOPT')) {
      console.log(transactionDate, amount, quantity, price)
      if (transactionDate) {
        const accountLineItem: AccountLineItem = AccountLineItemSchema.parse({
          t_date: transactionDate,
          t_type: transactionType,
          t_schc_category: null,
          t_amt: amount ?? 0,
          t_symbol: symbol,
          t_qty: quantity ?? 0,
          t_price: price ?? 0,
          t_commission: commission ?? 0,
          t_fee: 0,
          t_method: null,
          t_source: null,
          t_origin: null,
          opt_expiration: optExpiration,
          opt_type: optType,
          opt_strike: optStrike,
          t_description: description,
          t_comment: null,
          t_from: null,
          t_to: null,
          t_interest_rate: null,
          parent_t_id: null,
          t_cusip: cusip,
        })
        accountLineItems.push(accountLineItem)
      }
    }
  })

  console.log(accountLineItems)
  return accountLineItems
}
