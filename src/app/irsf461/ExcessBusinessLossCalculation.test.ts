import { calculateExcessBusinessLoss } from '@/app/irsf461/ExcessBusinessLossCalculation'

describe('ExcessBusinessLossCalculation', () => {
  it('should correctly calculate NOL carryforward across 3 years with W-2, capital gains, and business losses', () => {
    // Assume NOL limit is constant at $250,000 for all years
    const singleStdDed = 14600

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
      {
        year: 2026,
        w2: 90000,
        capGain: 10000,
        businessNetIncome: 50000,
        override_f461_line15: 250000,
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    // === Year 1: 2024 ===
    // Income: $100,000 (W-2) + $50,000 (cap gain) = $150,000
    // Business Loss: -$400,000
    // Capital gains: +$50,000 (treated as non-business for Form 461 exclusion)
    // Form 461 line 9: -$400,000 + $50,000 = -$350,000
    // Form 461 line 10: $50,000 (non-business income excluded)
    // Form 461 line 14: -$350,000 + (-$50,000) = -$400,000
    // Form 461 limit: $250,000
    // Disallowed loss: $400,000 - $250,000 = $150,000
    // Allowed loss: -$250,000
    // AGI: $100,000 + $50,000 - $250,000 = -$100,000
    // Taxable income: -$100,000 - $14,600 = -$114,600 → $0
    // NOL carryforward: unused allowed loss ($100,000) + disallowed loss ($150,000) = $250,000

    expect(result[0].limit).toBe(250000)
    expect(result[0].disallowedLoss).toBe(150000)
    expect(result[0].allowedLoss).toBe(-200000)
    expect(result[0].f1040.f1040_line11).toBe(-100000)
    expect(result[0].f1040.f1040_line15).toBe(0)
    expect(result[0].startingNOL).toBe(0)
    expect(result[0].nolUsed).toBe(0)
    expect(result[0].currentYearNOL).toBe(100000)
    // Total NOL carryforward should be disallowed loss + current year NOL = 150000 + 100000 = 250000

    // === Year 2: 2025 ===
    // Income: $120,000 (W-2) + $30,000 (cap gain) = $150,000
    // Business Loss: -$100,000
    // Capital gains: +$30,000 (treated as non-business for Form 461 exclusion)
    // Form 461 line 9: -$100,000 + $30,000 = -$70,000
    // Form 461 line 10: $30,000 (non-business income excluded)
    // Form 461 line 14: -$70,000 + (-$30,000) = -$100,000
    // Starting NOL: $250,000 from 2024
    // Form 461 limit: $250,000, business loss is only $100,000, so all allowed
    // Disallowed loss: $0
    // Allowed loss: -$70,000 (net business activity after capital gains)
    // AGI before NOL: $120,000 + $30,000 - $100,000 = $50,000
    // NOL used: $50,000 (to bring AGI to $0, can't go negative)
    // Remaining NOL: $250,000 - $50,000 = $200,000
    // Taxable income: $0 - $14,600 = -$14,600 → $0

    expect(result[1].limit).toBe(250000)
    expect(result[1].disallowedLoss).toBe(0)
    expect(result[1].allowedLoss).toBe(-70000)
    expect(result[1].startingNOL).toBe(250000)
    expect(result[1].nolUsed).toBe(50000)
    expect(result[1].f1040.f1040_line11).toBe(0)
    expect(result[1].f1040.f1040_line15).toBe(0)
    expect(result[1].currentYearNOL).toBe(0)
    // Remaining NOL carryforward should be 250000 - 50000 + 0 + 0 = 200000

    // === Year 3: 2026 ===
    // Income: $90,000 (W-2) + $10,000 (cap gain) = $100,000
    // Business income: +$50,000
    // Capital gains: +$10,000 (treated as non-business for Form 461 exclusion)
    // Form 461 line 9: +$50,000 + $10,000 = +$60,000
    // Form 461 line 10: $10,000 (non-business income excluded)
    // Form 461 line 14: +$60,000 + (-$10,000) = +$50,000
    // Starting NOL: $200,000 from 2025
    // No excess business loss (positive business income)
    // Disallowed loss: $0
    // Allowed income: +$60,000 (net business activity after capital gains)
    // AGI before NOL: $90,000 + $10,000 + $50,000 = $150,000
    // NOL used: $150,000 (use all available AGI)
    // Remaining NOL: $200,000 - $150,000 = $50,000
    // AGI after NOL: $160,000 - $160,000 = $0
    // Taxable income: $0 - $14,600 = -$14,600 → $0

    expect(result[2].limit).toBe(250000)
    expect(result[2].disallowedLoss).toBe(0)
    expect(result[2].allowedLoss).toBe(60000)
    expect(result[2].startingNOL).toBe(200000)
    expect(result[2].nolUsed).toBe(150000)
    expect(result[2].f1040.f1040_line11).toBe(0)
    expect(result[2].f1040.f1040_line15).toBe(0)
    expect(result[2].currentYearNOL).toBe(0)
    // Remaining NOL carryforward should be 200000 - 150000 + 0 + 0 = 50000
  })

  it('should handle scenarios without business capital gains', () => {
    const rows = [
      {
        year: 2024,
        w2: 100000,
        capGain: 0, // No business capital gains
        businessNetIncome: -400000,
        override_f461_line15: 250000,
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    // === Year 1: 2024 (No business capital gains) ===
    // Income: $100,000 (W-2) + $0 (cap gain) = $100,000
    // Business Loss: -$400,000
    // Business capital gains: $0
    // Net business loss: -$400,000 + $0 = -$400,000
    // Form 461 limit: $250,000
    // Allowed loss: -$250,000
    // Disallowed loss: $400,000 - $250,000 = $150,000
    // AGI: $100,000 - $250,000 = -$150,000
    // Current year NOL: $150,000
    // Total NOL carryforward: $150,000 + $150,000 = $300,000

    expect(result[0].limit).toBe(250000)
    expect(result[0].disallowedLoss).toBe(150000)
    expect(result[0].allowedLoss).toBe(-250000)
    expect(result[0].f1040.f1040_line11).toBe(-150000)
    expect(result[0].f1040.f1040_line15).toBe(0)
    expect(result[0].currentYearNOL).toBe(150000)
  })

  it('should handle scenarios with positive business capital gains offsetting losses', () => {
    const rows = [
      {
        year: 2024,
        w2: 50000,
        capGain: 200000, // Large business capital gains
        businessNetIncome: -300000,
        override_f461_line15: 250000,
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    // === Year 1: 2024 (Large capital gains) ===
    // Income: $50,000 (W-2) + $200,000 (cap gain) = $250,000
    // Business Loss: -$300,000
    // Capital gains: +$200,000 (treated as non-business for Form 461 exclusion)
    // Form 461 line 9: -$300,000 + $200,000 = -$100,000
    // Form 461 line 10: $200,000 (non-business income excluded)
    // Form 461 line 14: -$100,000 + (-$200,000) = -$300,000
    // Form 461 limit: $250,000
    // Disallowed loss: $300,000 - $250,000 = $50,000
    // Allowed loss: -$250,000
    // AGI: $50,000 + $200,000 - $250,000 = $0
    // Current year NOL: $0
    // Total NOL carryforward: $50,000

    expect(result[0].limit).toBe(250000)
    expect(result[0].disallowedLoss).toBe(50000)
    expect(result[0].allowedLoss).toBe(-50000)
    expect(result[0].f1040.f1040_line11).toBe(0)
    expect(result[0].f1040.f1040_line15).toBe(0) // $0 - $14,600 = $0 (can't go negative)
    expect(result[0].currentYearNOL).toBe(0)
  })

  it('should handle scenarios where business capital gains completely offset business losses', () => {
    const rows = [
      {
        year: 2024,
        w2: 100000,
        capGain: 300000, // Business capital gains exceed business losses
        businessNetIncome: -250000,
        override_f461_line15: 250000,
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    // === Year 1: 2024 (Capital gains exceed losses) ===
    // Income: $100,000 (W-2) + $300,000 (cap gain) = $400,000
    // Business Loss: -$250,000
    // Capital gains: +$300,000 (treated as non-business for Form 461 exclusion)
    // Form 461 line 9: -$250,000 + $300,000 = +$50,000
    // Form 461 line 10: $300,000 (non-business income excluded)
    // Form 461 line 14: +$50,000 + (-$300,000) = -$250,000
    // Form 461 limit: $250,000
    // Disallowed loss: $250,000 - $250,000 = $0 (exactly at limit)
    // Allowed loss: -$250,000
    // AGI: $100,000 + $300,000 - $250,000 = $150,000
    // Taxable income: $150,000 - $14,600 = $135,400

    expect(result[0].limit).toBe(250000)
    expect(result[0].disallowedLoss).toBe(0)
    expect(result[0].allowedLoss).toBe(50000)
    expect(result[0].f1040.f1040_line11).toBe(150000)
    expect(result[0].f1040.f1040_line15).toBe(135400)
    expect(result[0].currentYearNOL).toBe(0)
  })
})
