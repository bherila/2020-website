import StockQuote from '@/lib/StockQuote'
import currency from 'currency.js'

export interface StockQuoteExtended extends StockQuote {
  pctChg?: currency
  nearEarnings?: number // index of earnings we are near, this is int so currency not needed
  prevClose?: currency
  change?: currency
}
