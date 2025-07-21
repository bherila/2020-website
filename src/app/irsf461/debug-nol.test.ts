import { calculateExcessBusinessLoss } from '@/app/irsf461/ExcessBusinessLossCalculation'

describe('Debug NOL Calculation', () => {
  it('should debug Year 1 calculation step by step', () => {
    const rows = [
      {
        year: 2024,
        w2: 100000,
        capGain: 50000,
        businessNetIncome: -400000,
        override_f461_line15: 250000,
      },
    ]

    const result = calculateExcessBusinessLoss({ rows, isSingle: true })
    const year1 = result[0]

    console.log('Year 1 Debug:')
    console.log('W-2 income:', year1.w2)
    console.log('Capital gains:', year1.capGain)
    console.log('Business loss:', year1.businessNetIncome)
    console.log('Form 461 limit:', year1.limit)
    console.log('Disallowed loss (Form 461):', year1.disallowedLoss)
    console.log('Allowed loss:', year1.allowedLoss)
    console.log('Current year NOL:', year1.currentYearNOL)
    console.log('AGI (Form 1040 line 11):', year1.f1040.f1040_line11)
    console.log('Taxable income:', year1.taxableIncome)

    // Expected:
    // Disallowed loss: $150,000 (from Form 461)
    // Allowed loss: -$250,000 (business loss limited by Form 461)
    // Total income before business loss: $100,000 + $50,000 = $150,000
    // AGI: $150,000 - $250,000 = -$100,000
    // Current year NOL: $100,000
    // Total NOL carryforward: $150,000 (disallowed) + $100,000 (current) = $250,000

    expect(year1.disallowedLoss).toBe(150000)
    expect(year1.allowedLoss).toBe(-250000)
    expect(year1.f1040.f1040_line11).toBe(-100000)
    expect(year1.currentYearNOL).toBe(100000)
  })

  it('should debug 2-year calculation', () => {
    const rows = [
      {
        year: 2024,
        w2: 100000,
        capGain: 50000,
        businessNetIncome: -400000,
        override_f461_line15: 250000,
      },
      {
        year: 2025,
        w2: 120000,
        capGain: 30000,
        businessNetIncome: -100000,
        override_f461_line15: 250000,
      },
    ]

    const result = calculateExcessBusinessLoss({ rows, isSingle: true })
    const year1 = result[0]
    const year2 = result[1]

    console.log('\nYear 2 Debug:')
    console.log('Starting NOL:', year2.startingNOL)
    console.log('W-2 income:', year2.w2)
    console.log('Capital gains:', year2.capGain)
    console.log('Business loss:', year2.businessNetIncome)
    console.log('Disallowed loss (Form 461):', year2.disallowedLoss)
    console.log('Allowed loss:', year2.allowedLoss)
    console.log('NOL used:', year2.nolUsed)
    console.log('Current year NOL:', year2.currentYearNOL)
    console.log('AGI (Form 1040 line 11):', year2.f1040.f1040_line11)

    // Year 1 should generate 250k NOL carryforward
    expect(year1.disallowedLoss + year1.currentYearNOL).toBe(250000)
    expect(year2.startingNOL).toBe(250000)
  })
})
