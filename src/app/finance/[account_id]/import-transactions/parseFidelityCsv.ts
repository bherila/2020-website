import { AccountLineItem } from '@/lib/AccountLineItem'
import { parseDate } from '@/lib/DateHelper'
import { splitDelimitedText } from '@/lib/splitDelimitedText'
import currency from 'currency.js'

export function parseFidelityCsv(csvString: string): AccountLineItem[] {
  try {
    const split = splitDelimitedText(csvString)
    return parseFidelityCsvInternal(split)
  } catch (err) {
    console.error(err)
    return []
  }
}

function parseFidelityCsvInternal(csv: string[][]): AccountLineItem[] {
  const row1 = ['Run Date', 'Action', 'Symbol', 'Description', 'Type']
  // ensure the 1st columns of csv[0] match row1
  if (row1.some((v, i) => csv[0][i] !== v)) {
    console.warn('Unexpected Fidelity CSV format')
    return []
  }

  const result: AccountLineItem[] = []
  for (let i = 1; i < csv.length; ++i) {
    const row = csv[i]
    if (row.length < 5) {
      console.warn('Skipping row with less than 5 columns:', row)
      continue
    }

    const [action, item] = splitActionAndItem(row[1])
    const parsedRow: AccountLineItem = {
      t_date: parseDate(row[0])?.formatYMD() ?? '',
      t_description: item || undefined,
      t_type: action || undefined,
      t_symbol: row[2] || undefined,
      t_comment: row[3] || undefined,
      t_method: row[4] || undefined,
      t_qty: row[7] == null ? undefined : currency(row[7]).value,
      t_price: row[9] == null ? undefined : currency(row[9]).toString() || undefined,
      t_commission: row[11] || undefined,
      t_fee: row[12] || undefined,
      t_amt: row[14] || undefined,
    }
    if (parsedRow.t_date.length > 9) {
      result.push(parsedRow)
    } else {
      console.warn('Skipping row with invalid date:', row)
    }
  }
  return result
}

function splitActionAndItem(col: string) {
  const actionTypeMap: { [key: string]: string } = {
    'BILL PAYMENT': 'Payment',
    'CHECK RECEIVED': 'Check',
    'ELECTRONIC FUNDS TRANSFER': 'Transfer',
    'DIRECT DEPOSIT': 'Deposit',
    'CONV TO ROTH IRA': 'RothConversion',
    'DIVIDEND RECEIVED': 'Dividend',
    REDEMPTION: 'Redeem',
    REINVESTMENT: 'Reinvest',
    'WIRE TRANSFER': 'Wire',
    'YOU BOUGHT': 'Buy',
    'YOU SOLD': 'Sell',
  }
  // if col starts with actionTypes, then split the string after the matching actionType and return the parts
  for (const actionType of Object.keys(actionTypeMap)) {
    if (col.toLowerCase().startsWith(actionType.toLowerCase())) {
      return [actionTypeMap[actionType], col.slice(actionType.length + 1)]
    }
  }
  return ['MISC', col]
}
