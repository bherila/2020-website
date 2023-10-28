import currency from 'currency.js'
export interface IAward {
  award_id?: string
  grant_date?: string
  vest_date?: string
  share_count?: currency | number
  symbol?: string
}
