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

  // Edge Case Tests
  it('should handle zero W-2 income and zero capital gains with pure business loss', () => {
    const rows = [
      {
        year: 2024,
        w2: 0, // No W-2 income
        capGain: 0, // No capital gains
        businessNetIncome: -400000, // Pure business loss
        override_f461_line15: 250000,
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    expect(result[0].limit).toBe(250000)
    expect(result[0].disallowedLoss).toBe(150000) // 400k - 250k
    expect(result[0].allowedLoss).toBe(-250000) // Maximum allowed
    expect(result[0].f1040.f1040_line11).toBe(-250000) // AGI
    expect(result[0].f1040.f1040_line15).toBe(0) // Taxable income (can't be negative)
    expect(result[0].currentYearNOL).toBe(250000) // Full AGI becomes NOL
    expect(result[0].startingNOL).toBe(0)
    expect(result[0].nolUsed).toBe(0)
  })

  it('should handle business loss in year 1, then business profit in years 2-3 that reduces NOL to zero', () => {
    const rows = [
      {
        year: 2024,
        w2: 0, // No W-2 for clean numbers
        capGain: 0, // No capital gains
        businessNetIncome: -400000, // Large business loss
        override_f461_line15: 250000,
      },
      {
        year: 2025,
        w2: 0,
        capGain: 0,
        businessNetIncome: 200000, // Business profit
        override_f461_line15: 250000,
      },
      {
        year: 2026,
        w2: 0,
        capGain: 0,
        businessNetIncome: 250000, // Larger business profit
        override_f461_line15: 250000,
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    // === Year 1: 2024 ===
    // Business Loss: -$400,000, Form 461 limit: $250,000
    // Disallowed: $150,000, Allowed: -$250,000
    // AGI: -$250,000, NOL: $250,000
    // Total NOL carryforward: $150,000 (disallowed) + $250,000 (current NOL) = $400,000

    expect(result[0].limit).toBe(250000)
    expect(result[0].disallowedLoss).toBe(150000)
    expect(result[0].allowedLoss).toBe(-250000)
    expect(result[0].f1040.f1040_line11).toBe(-250000)
    expect(result[0].currentYearNOL).toBe(250000)
    expect(result[0].startingNOL).toBe(0)

    // === Year 2: 2025 ===
    // Starting NOL: $400,000 (150k disallowed + 250k current from 2024)
    // Business income: $200,000, no Form 461 limitation
    // AGI before NOL: $200,000
    // NOL used: $200,000 (full AGI)
    // AGI after NOL: $0
    // Remaining NOL: $400,000 - $200,000 = $200,000

    expect(result[1].limit).toBe(250000)
    expect(result[1].disallowedLoss).toBe(0)
    expect(result[1].allowedLoss).toBe(200000)
    expect(result[1].startingNOL).toBe(400000)
    expect(result[1].nolUsed).toBe(200000)
    expect(result[1].f1040.f1040_line11).toBe(0) // AGI after NOL
    expect(result[1].currentYearNOL).toBe(0)

    // === Year 3: 2026 ===
    // Starting NOL: $200,000
    // Business income: $250,000, no Form 461 limitation
    // AGI before NOL: $250,000
    // NOL used: $200,000 (all remaining NOL)
    // AGI after NOL: $50,000
    // Remaining NOL: $0

    expect(result[2].limit).toBe(250000)
    expect(result[2].disallowedLoss).toBe(0)
    expect(result[2].allowedLoss).toBe(250000)
    expect(result[2].startingNOL).toBe(200000)
    expect(result[2].nolUsed).toBe(200000)
    expect(result[2].f1040.f1040_line11).toBe(50000) // AGI after NOL: 250k - 200k
    expect(result[2].f1040.f1040_line15).toBe(35400) // Taxable income: 50k - 14.6k
    expect(result[2].currentYearNOL).toBe(0)
  })

  it('should handle business loss with W-2 income and progression to net profit', () => {
    const rows = [
      {
        year: 2024,
        w2: 50000, // Some W-2 income
        capGain: 0,
        businessNetIncome: -500000, // Large business loss
        override_f461_line15: 250000,
      },
      {
        year: 2025,
        w2: 60000, // Increasing W-2
        capGain: 10000, // Some capital gains
        businessNetIncome: 150000, // Business profit
        override_f461_line15: 250000,
      },
      {
        year: 2026,
        w2: 70000, // Higher W-2
        capGain: 20000, // More capital gains
        businessNetIncome: 200000, // Higher business profit
        override_f461_line15: 250000,
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    // === Year 1: 2024 ===
    // W-2: $50,000, Business loss: -$500,000
    // Form 461: Disallowed $250,000, Allowed -$250,000
    // AGI: $50,000 - $250,000 = -$200,000
    // Current NOL: $200,000
    // Total NOL carryforward: $250,000 (disallowed) + $200,000 (current) = $450,000

    expect(result[0].disallowedLoss).toBe(250000)
    expect(result[0].allowedLoss).toBe(-250000)
    expect(result[0].f1040.f1040_line11).toBe(-200000)
    expect(result[0].currentYearNOL).toBe(200000)

    // === Year 2: 2025 ===
    // Starting NOL: $450,000
    // W-2: $60,000, Cap gains: $10,000, Business: $150,000
    // AGI before NOL: $60,000 + $10,000 + $150,000 = $220,000
    // NOL used: $220,000
    // AGI after NOL: $0
    // Remaining NOL: $450,000 - $220,000 = $230,000

    expect(result[1].startingNOL).toBe(450000)
    expect(result[1].allowedLoss).toBe(160000) // Business income + cap gains: 150k + 10k
    expect(result[1].nolUsed).toBe(220000)
    expect(result[1].f1040.f1040_line11).toBe(0)

    // === Year 3: 2026 ===
    // Starting NOL: $230,000
    // W-2: $70,000, Cap gains: $20,000, Business: $200,000
    // AGI before NOL: $70,000 + $20,000 + $200,000 = $290,000
    // NOL used: $230,000 (all remaining)
    // AGI after NOL: $60,000
    // Taxable income: $60,000 - $14,600 = $45,400

    expect(result[2].startingNOL).toBe(230000)
    expect(result[2].allowedLoss).toBe(220000) // Business income + cap gains: 200k + 20k
    expect(result[2].nolUsed).toBe(230000) // All remaining NOL
    expect(result[2].f1040.f1040_line11).toBe(60000) // 290k - 230k
    expect(result[2].f1040.f1040_line15).toBe(45400) // 60k - 14.6k
    expect(result[2].currentYearNOL).toBe(0)
  })

  it('should handle alternating business losses and profits', () => {
    const rows = [
      {
        year: 2024,
        w2: 100000,
        capGain: 0,
        businessNetIncome: -300000, // Loss year
        override_f461_line15: 250000,
      },
      {
        year: 2025,
        w2: 100000,
        capGain: 0,
        businessNetIncome: 150000, // Profit year
        override_f461_line15: 250000,
      },
      {
        year: 2026,
        w2: 100000,
        capGain: 0,
        businessNetIncome: -200000, // Loss year again
        override_f461_line15: 250000,
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    // Year 1: Create NOL
    expect(result[0].disallowedLoss).toBe(50000) // 300k - 250k
    expect(result[0].currentYearNOL).toBe(150000) // AGI: 100k - 250k = -150k → 150k NOL

    // Year 2: Use some NOL
    expect(result[1].startingNOL).toBe(200000) // 50k disallowed + 150k current
    expect(result[1].nolUsed).toBe(200000) // Use all NOL to offset 250k income
    expect(result[1].f1040.f1040_line11).toBe(50000) // 250k - 200k

    // Year 3: Create new NOL
    expect(result[2].startingNOL).toBe(0) // NOL exhausted in year 2
    expect(result[2].disallowedLoss).toBe(0) // 200k loss under 250k limit
    expect(result[2].f1040.f1040_line11).toBe(-100000) // 100k - 200k
    expect(result[2].currentYearNOL).toBe(100000)
  })

  it('should handle exact threshold scenarios', () => {
    const rows = [
      {
        year: 2024,
        w2: 100000,
        capGain: 0,
        businessNetIncome: -250000, // Exactly at threshold
        override_f461_line15: 250000,
      },
      {
        year: 2025,
        w2: 100000,
        capGain: 0,
        businessNetIncome: -250001, // One dollar over threshold
        override_f461_line15: 250000,
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    // Year 1: Exactly at threshold
    expect(result[0].disallowedLoss).toBe(0) // No excess loss
    expect(result[0].allowedLoss).toBe(-250000) // Full loss allowed
    expect(result[0].f1040.f1040_line11).toBe(-150000) // 100k - 250k

    // Year 2: One dollar over
    expect(result[1].disallowedLoss).toBe(1) // $1 excess
    expect(result[1].allowedLoss).toBe(-250000) // Limited to threshold
    expect(result[1].f1040.f1040_line11).toBe(-150000) // Same AGI as year 1
  })

  it('should handle high-income scenario with business losses', () => {
    const rows = [
      {
        year: 2024,
        w2: 500000, // High W-2 income
        capGain: 200000, // Large capital gains
        businessNetIncome: -600000, // Large business loss
        override_f461_line15: 250000,
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    // High income with large loss
    expect(result[0].disallowedLoss).toBe(350000) // 600k loss (net -400k) over 250k limit = 350k excess  
    expect(result[0].allowedLoss).toBe(-50000) // Net business loss of 400k limited to 250k, offset by other income
    expect(result[0].f1040.f1040_line11).toBe(450000) // 500k + 200k - 250k
    expect(result[0].f1040.f1040_line15).toBe(435400) // 450k - 14.6k
    expect(result[0].currentYearNOL).toBe(0) // Positive AGI, no NOL
  })
})
