import currency from 'currency.js'

import { DateContainer, parseDate } from '@/lib/DateHelper'

export type OptionType = 'Call' | 'Put' | '?'
export class StockOptionSchema {
  readonly symbol: string
  readonly maturity: DateContainer | null
  readonly type: OptionType | null
  readonly strike: currency

  constructor(
    symbol: string,
    maturity: DateContainer | null,
    type: OptionType | null,
    strike: currency,
  ) {
    this.symbol = symbol
    this.maturity = maturity
    this.type = type
    this.strike = strike
  }

  static readonly Invalid: StockOptionSchema | null = null
  static readonly TypeMap = new Map<string, OptionType>([
    ['call', 'Call'],
    ['put', 'Put'],
  ])
  static tryParse(description: string): StockOptionSchema | null {
    if (!description) {
      return StockOptionSchema.Invalid
    }
    // AAPL Feb 12 '21 $160 Call
    const expr = /([A-Z]+)\s+([^$]+)(\$[\d.]+) (Call|Put)/i
    const match = description.match(expr)
    if (match) {
      return {
        symbol: match[1],
        maturity: parseDate(match[2]),
        strike: currency(match[3]),
        type: StockOptionSchema.TypeMap.get(match[4].toLowerCase()) ?? '?',
      }
    } else {
      return StockOptionSchema.Invalid
    }
  }
}
