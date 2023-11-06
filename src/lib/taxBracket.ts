import currency from 'currency.js'

const fedBrackets = preprocessBrackets(`
Year|0%|10%|15%|25%|28%|33%|35%|37%
2003|$0|$7,000|$28,400|$68,800|$143,500|$311,950
2004|$0|$7,150|$28,400|$68,800|$143,500|$311,950
2005|$0|$7,300|$29,700|$71,950|$150,150|$326,450
2006|$0|$7,550|$30,650|$74,200|$154,800|$336,550
2007|$0|$7,825|$31,850|$77,100|$160,850|$349,700
2008|$0|$8,025|$32,550|$78,850|$164,550|$357,700
2009|$0|$8,350|$33,950|$82,250|$171,550|$372,950
2010|$0|$8,375|$34,000|$82,400|$171,850|$373,650
2011|$0|$8,500|$34,500|$83,600|$174,400|$379,150
2012|$0|$8,700|$35,350|$85,650|$178,650|$388,350
2013|$0|$8,925|$36,250|$87,850|$183,250|$398,350
2014|$0|$9,075|$36,900|$89,350|$186,350|$405,100
2015|$0|$9,225|$37,450|$90,750|$189,300|$411,500
2016|$0|$9,275|$37,650|$91,150|$190,150|$413,350
2017|$0|$9,325|$37,950|$91,900|$191,650|$416,700
2018|$0|$9,525|$38,700|$82,500|$157,500|$200,000|$500,000
2019|$0|$9,700|$39,475|$84,200|$160,725|$204,100|$510,300
2020|$0|$9,875|$40,125|$85,525|$163,300|$207,350|$518,400
2021|$0|$9,950|$40,525|$86,375|$164,925|$209,425|$523,600
2022|$0|$10,275|$41,775|$89,075|$170,050|$215,950|$539,900
2023|$0|$11,000|$44,725|95,375|182,100|231,250|578,125
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
