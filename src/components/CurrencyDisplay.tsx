import currency from 'currency.js'
import React from 'react'

export default function CurrencyDisplay({
  value,
  digits = 2,
}: {
  value: number | currency
  digits: number
}) {
  if (typeof value === 'number') {
    if (value < 0) {
      return <span>${value.toFixed(digits)}</span>
    } else {
      return <span>${value.toFixed(digits)}</span>
    }
  } else if (value != null) {
    return <span>{value.format({ precision: digits, symbol: '$' })}</span>
  } else {
    return null
  }
}
