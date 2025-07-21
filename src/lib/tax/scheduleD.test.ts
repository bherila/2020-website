import { scheduleD } from './scheduleD'

describe('Schedule D', () => {
  it('should calculate net capital gains correctly', () => {
    const result = scheduleD({
      line1a_gain_loss: 10000, // Personal short-term gains
      line5: 5000, // Business short-term gains
      line8a_gain_loss: 8000, // Long-term gains
      isSingle: true,
    })

    expect(result.schD_line7).toBe(15000) // Short-term total: 10k + 5k
    expect(result.schD_line15).toBe(8000) // Long-term total
    expect(result.schD_line16).toBe(23000) // Combined: 15k + 8k
    expect(result.schD_line21).toBe(23000) // No loss limitation
  })

  it('should apply loss limitation for single filers', () => {
    const result = scheduleD({
      line1a_gain_loss: -5000, // Personal losses
      line5: -2000, // Business losses
      isSingle: true,
    })

    expect(result.schD_line7).toBe(-7000) // Short-term total losses
    expect(result.schD_line15).toBe(0) // No long-term
    expect(result.schD_line16).toBe(-7000) // Combined losses
    expect(result.schD_line21).toBe(-3000) // Limited to -$3,000 for single
  })

  it('should apply loss limitation for married filing separately', () => {
    const result = scheduleD({
      line1a_gain_loss: -5000, // Personal losses
      line5: -2000, // Business losses
      isSingle: false,
    })

    expect(result.schD_line7).toBe(-7000) // Short-term total losses
    expect(result.schD_line15).toBe(0) // No long-term
    expect(result.schD_line16).toBe(-7000) // Combined losses
    expect(result.schD_line21).toBe(-1500) // Limited to -$1,500 for MFS
  })

  it('should handle mixed gains and losses', () => {
    const result = scheduleD({
      line1a_gain_loss: 5000, // Personal short-term gains
      line5: -8000, // Business short-term losses
      line8a_gain_loss: 2000, // Long-term gains
      isSingle: true,
    })

    expect(result.schD_line7).toBe(-3000) // Short-term: 5k - 8k = -3k
    expect(result.schD_line15).toBe(2000) // Long-term gains
    expect(result.schD_line16).toBe(-1000) // Combined: -3k + 2k = -1k
    expect(result.schD_line21).toBe(-1000) // No limitation needed (within -$3k limit)
  })

  it('should handle capital gain distributions', () => {
    const result = scheduleD({
      line13_capital_gain_distributions: 1500,
      line8a_gain_loss: 500,
      isSingle: true,
    })

    expect(result.schD_line13).toBe(1500)
    expect(result.schD_line15).toBe(2000) // 500 + 1500
    expect(result.schD_line16).toBe(2000)
    expect(result.schD_line21).toBe(2000)
  })

  it('should handle carryover losses', () => {
    const result = scheduleD({
      line6_carryover: -1000, // Short-term carryover
      line14_carryover: -2000, // Long-term carryover
      line1a_gain_loss: 5000,
      isSingle: true,
    })

    expect(result.schD_line6).toBe(-1000)
    expect(result.schD_line14).toBe(-2000)
    expect(result.schD_line7).toBe(4000) // 5000 - 1000
    expect(result.schD_line15).toBe(-2000) // 0 - 2000
    expect(result.schD_line16).toBe(2000) // 4000 - 2000
    expect(result.schD_line21).toBe(2000)
  })

  it('should handle zero amounts correctly', () => {
    const result = scheduleD({
      isSingle: true,
    })

    expect(result.schD_line7).toBe(0)
    expect(result.schD_line15).toBe(0)
    expect(result.schD_line16).toBe(0)
    expect(result.schD_line21).toBe(0)
  })

  it('should handle large losses that exceed limitation', () => {
    const result = scheduleD({
      line1a_gain_loss: -10000,
      line5: -15000,
      line8a_gain_loss: -5000,
      isSingle: true,
    })

    expect(result.schD_line7).toBe(-25000) // Short-term total
    expect(result.schD_line15).toBe(-5000) // Long-term total
    expect(result.schD_line16).toBe(-30000) // Combined
    expect(result.schD_line21).toBe(-3000) // Limited to -$3,000
  })
})
