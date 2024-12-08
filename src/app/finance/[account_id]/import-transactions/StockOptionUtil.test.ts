import { parseOptionDescription } from './StockOptionUtil'

describe('parseOptionDescription', () => {
  it('should parse valid option descriptions correctly', () => {
    // Test case 1: NIO Put option
    const nioOption = parseOptionDescription("NIO Jan 20 '23 $85 Put")
    expect(nioOption).toEqual({
      symbol: 'NIO',
      optionType: 'put',
      maturityDate: new Date('Jan 20, 2023'),
      strikePrice: 85,
    })

    // Test case 2: BIDU Call option
    const biduOption = parseOptionDescription("BIDU Jan 15 '21 $280 Call")
    expect(biduOption).toEqual({
      symbol: 'BIDU',
      optionType: 'call',
      maturityDate: new Date('Jan 15, 2021'),
      strikePrice: 280,
    })

    // Test case 3: ZM Call option
    const zmOption = parseOptionDescription("ZM Jan 15 '21 $430 Call")
    expect(zmOption).toEqual({
      symbol: 'ZM',
      optionType: 'call',
      maturityDate: new Date('Jan 15, 2021'),
      strikePrice: 430,
    })

    // Test case 4: TSLA Call option
    const tslaOption = parseOptionDescription("TSLA Mar 19 '21 $1000 Call")
    expect(tslaOption).toEqual({
      symbol: 'TSLA',
      optionType: 'call',
      maturityDate: new Date('Mar 19, 2021'),
      strikePrice: 1000,
    })
  })

  it('should throw an error for invalid option descriptions', () => {
    const invalidDescriptions = [
      'Invalid Description',
      'NIO Jan 20 $85 Put', // Missing year
      "NIO Jan 20 '23 Put", // Missing strike price
      "NIO Jan 20 '23 $85", // Missing option type
    ]

    invalidDescriptions.forEach((description) => {
      expect(() => parseOptionDescription(description)).toThrow(`Invalid option description: ${description}`)
    })
  })
})
