import currency from 'currency.js'
import moment from 'moment'

export type OptionType = 'Call' | 'Put' | '?'
export class StockOptionSchema {
  readonly symbol: string
  readonly maturity: moment.Moment
  readonly type: OptionType
  readonly strike: currency

  static readonly Invalid: StockOptionSchema = null
  static readonly TypeMap = new Map<string, OptionType>([
    ['call', 'Call'],
    ['put', 'Put'],
  ])
  static tryParse(description: string): StockOptionSchema | null {
    // AAPL Feb 12 '21 $160 Call
    const expr = /([A-Z]+)\s+([^$]+)(\$[\d.]+) (Call|Put)/i
    const match = description.match(expr)
    if (match) {
      return {
        symbol: match[1],
        maturity: moment(match[2]),
        strike: currency(match[3]),
        type: StockOptionSchema.TypeMap.get(match[4].toLowerCase()) ?? '?',
      }
    } else {
      return StockOptionSchema.Invalid
    }
  }
}