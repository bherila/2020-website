import currency from 'currency.js'

const fedBrackets = preprocessBrackets(`
Year|10%|12%    |22%   |24%    |32%    |35%    |37%
2023|$0 |$11,000|$44,725|95,375|182,100|231,250|578,125
`)

const stateBrackets = {
  CA: preprocessBrackets(`
Year | 1% | 2%     | 4%      | 6%      | 8%      | 9.3%  | 10.3% | 11.3% | 12.3%
2023 | $0 | $8,544 | $ | $338,639 | $406,365 | $677,276
`),
}

function preprocessBrackets(brackets: string) {
  return brackets
    .split('\n')
    .filter(Boolean)
    .map((row) =>
      row
        .trim()
        .split('|')
        .map((col) => ({
          rawValue: col.trim(),
          minThreshold: currency(col.trim()),
        })),
    )
}

export function genBrackets(year: string, amount: currency) {
  const multipliers = fedBrackets[0].map((r) => r.minThreshold.divide(100))
  const cutoff = fedBrackets.find((b) => b[0].rawValue == year)
  if (!cutoff) {
    throw new Error('no config found for year' + year)
  }
  let remainder = amount
  let i = cutoff.length - 1
  let taxes = []
  while (i > 0) {
    if (!!cutoff[i].minThreshold) {
      let incomeInBracket = remainder.subtract(cutoff[i].minThreshold)
      if (incomeInBracket.intValue < 0) {
        incomeInBracket = currency(0)
      }
      let tax = multipliers[i].multiply(incomeInBracket)
      remainder = remainder.subtract(incomeInBracket)
      taxes.push({ tax, amt: incomeInBracket, bracket: multipliers[i] })
    }
    --i
  }
  return taxes
}
