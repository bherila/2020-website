import { AccountLineItem, TransactionType } from '@/lib/AccountLineItem'
import { parseOptionDescription } from './StockOptionUtil'
import currency from 'currency.js'

export function parseEtradeCsv(csvString: string): AccountLineItem[] {
  const rows = csvString.split('\n').slice(2) // Remove the first two rows (header info)
  const accountLineItems: AccountLineItem[] = []

  rows.forEach((row) => {
    const columns = row.split(',')
    if (columns.length < 9) return // Skip rows with insufficient data

    const [transactionDate, transactionType, securityType, symbol, quantity, amount, price, commission, description] =
      columns

    if (transactionDate === 'TransactionDate') return

    //   const optionDescription = description.replace(/^PUT |^CALL /, ''); // Remove leading "PUT " or "CALL "
    const option = parseOptionDescription(symbol)

    let t_type: TransactionType | null = null
    if (description.includes('JOURNAL') || description.includes('MARGIN TO CASH')) {
      t_type = 'journal'
    } else if (description.includes('TRNSFR') || description.includes('TRANSFER')) {
      t_type = 'transfer'
    }

    const accountLineItem: AccountLineItem = {
      t_date: new Date(transactionDate),
      t_type,
      t_schc_category: null,
      t_amt: parseFloat(amount),
      t_symbol: option?.symbol ?? symbol,
      t_qty: parseInt(quantity, 10),
      t_price: parseFloat(price),
      t_commission: parseFloat(commission),
      t_fee: currency(price).multiply(quantity).subtract(commission).subtract(amount).value,
      t_method: null,
      t_source: null,
      t_origin: null,
      opt_expiration: option?.maturityDate ?? undefined,
      opt_type: option?.optionType ?? undefined,
      opt_strike: option?.strikePrice ?? undefined,
      t_description: description,
      t_comment: null,
      t_from: null,
      t_to: null,
      t_interest_rate: null,
      parent_t_id: null,
    }

    accountLineItems.push(accountLineItem)
  })

  return accountLineItems
}