import currency from 'currency.js'

export function sum(values: currency[]): currency {
  if (values == null) return currency(0)
  return values.reduce((prev, cur) => prev.add(cur), currency(0))
}
