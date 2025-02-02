import { AccountLineItem, AccountLineItemSchema } from '@/lib/AccountLineItem'
import { parseOptionDescription } from './StockOptionUtil'
import { splitDelimitedText } from '@/lib/splitDelimitedText'
import currency from 'currency.js'
import { parseDate } from '@/lib/DateHelper'

export function parseEtradeCsv(csvString: string): AccountLineItem[] {
  try {
    // remove the 1st 2 rows for Etrade format
    const rows = splitDelimitedText(csvString.split('\n').slice(2).join('\n'))
    const accountLineItems: AccountLineItem[] = []

    if (!rows || rows.length < 1 || !['TransactionDate', 'Trade Date'].includes(rows[0][0])) {
      return []
    }

    // verify the column headers of 1st row
    if (
      rows[0].join(',') !=
      'TransactionDate,TransactionType,SecurityType,Symbol,Quantity,Amount,Price,Commission,Description'
    ) {
      console.warn('Expected eTrade column headers were not found')
      return []
    }

    rows.slice(1).forEach((columns) => {
      if (columns.length == 0) return // Skip rows with insufficient data

      const [transactionDate, transactionType, securityType, symbol, quantity, amount, price, commission, description] =
        columns

      //   const optionDescription = description.replace(/^PUT |^CALL /, ''); // Remove leading "PUT " or "CALL "
      const option = parseOptionDescription(symbol) ?? parseOptionDescription(transactionType)

      let t_type: string | null = null
      if (description.includes('JOURNAL') || description.includes('MARGIN TO CASH')) {
        t_type = 'journal'
      } else if (description.includes('TRNSFR') || description.includes('TRANSFER')) {
        t_type = 'transfer'
      }

      const accountLineItem: AccountLineItem = AccountLineItemSchema.parse({
        t_date: parseDate(transactionDate)?.formatYMD() ?? transactionDate,
        t_type,
        t_amt: currency(amount).toString(),
        t_symbol: option?.symbol ?? symbol,
        t_qty: currency(quantity).value,
        t_price: price,
        t_commission: commission,
        // t_fee: currency(price).multiply(quantity).subtract(commission).subtract(amount).value,
        opt_expiration: option?.maturityDate ?? undefined,
        opt_type: option?.optionType ?? undefined,
        opt_strike: option?.strikePrice ? currency(option?.strikePrice).value : undefined,
        t_description: description,
      })

      accountLineItems.push(accountLineItem)
    })

    return accountLineItems
  } catch (err) {
    console.error(err)
    return []
  }
}
