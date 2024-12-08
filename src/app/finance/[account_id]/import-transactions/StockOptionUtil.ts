interface Option {
  symbol: string
  optionType: 'call' | 'put'
  maturityDate: Date
  strikePrice: number
}

export function parseOptionDescription(description: string): Option | null {
  const regex = /([A-Z]+) ([A-Za-z]+) (\d{1,2}) '(\d{2}) \$(\d+(?:\.\d+)?) (Call|Put)/
  const match = description.match(regex)

  if (!match) {
    return null
  }

  const [, symbol, month, day, year, strikePrice, optionType] = match
  const maturityDate = new Date(`${month} ${day}, 20${year}`)

  return {
    symbol,
    optionType: optionType.toLowerCase() as 'call' | 'put',
    maturityDate,
    strikePrice: parseFloat(strikePrice),
  }
}
