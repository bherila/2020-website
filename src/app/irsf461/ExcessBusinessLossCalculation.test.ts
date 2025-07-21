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
    // Form 461 limit: $250,000
    // Allowed loss: -$250,000
    // Disallowed loss: $400,000 - $250,000 = $150,000 (NOL carryforward)
    // AGI: $150,000 - $250,000 = -$100,000
    // Taxable income: -$100,000 - $14,600 = -$114,600 → $0
    // NOL carryforward: unused allowed loss ($100,000) + disallowed loss ($150,000) = $250,000

    expect(result[0].limit).toBe(250000)
    expect(result[0].disallowedLoss).toBe(150000)
    expect(result[0].allowedLoss).toBe(-250000)
    expect(result[0].f1040.f1040_line11).toBe(-100000)
    expect(result[0].f1040.f1040_line15).toBe(0)
    expect(result[0].startingNOL).toBe(0)
    expect(result[0].nolUsed).toBe(0)
    expect(result[0].currentYearNOL).toBe(100000)
    // Total NOL carryforward should be disallowed loss + current year NOL = 150000 + 100000 = 250000

    // === Year 2: 2025 ===
    // Income: $120,000 (W-2) + $30,000 (cap gain) = $150,000
    // Business Loss: -$100,000
    // Starting NOL: $250,000 from 2024
    // Form 461 limit: $250,000, but only $100,000 business loss, so all allowed
    // AGI before NOL: $150,000 - $100,000 = $50,000
    // NOL used: $50,000 (to bring AGI to $0, can't go negative)
    // Remaining NOL: $250,000 - $50,000 = $200,000
    // Taxable income: $0 - $14,600 = -$14,600 → $0

    expect(result[1].limit).toBe(250000)
    expect(result[1].disallowedLoss).toBe(0)
    expect(result[1].allowedLoss).toBe(-100000)
    expect(result[1].startingNOL).toBe(250000)
    expect(result[1].nolUsed).toBe(50_000)
    expect(result[1].f1040.f1040_line11).toBe(0)
    expect(result[1].f1040.f1040_line15).toBe(0)
    expect(result[1].currentYearNOL).toBe(0)
    // Remaining NOL carryforward should be 250000 - 50000 + 0 + 0 = 200000

    // === Year 3: 2026 ===
    // Income: $90,000 (W-2) + $10,000 (cap gain) = $100,000
    // Business income: +$50,000
    // Starting NOL: $200,000 from 2025
    // AGI before NOL: $100,000 + $50,000 = $150,000
    // NOL used: $150,000 (to bring AGI to $0)
    // Remaining NOL: $200,000 - $150,000 = $50,000
    // Taxable income: $0 - $14,600 = -$14,600 → $0

    expect(result[2].limit).toBe(250000)
    expect(result[2].disallowedLoss).toBe(0)
    expect(result[2].allowedLoss).toBe(50000)
    expect(result[2].startingNOL).toBe(200000)
    expect(result[2].nolUsed).toBe(150000)
    expect(result[2].f1040.f1040_line11).toBe(0)
    expect(result[2].f1040.f1040_line15).toBe(0)
    expect(result[2].currentYearNOL).toBe(0)
    // Remaining NOL carryforward should be 200000 - 150000 + 0 + 0 = 50000
  })
})