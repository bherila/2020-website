import { form461 } from './form461'

describe('Form 461 - Limitation on Business Losses', () => {
  it('should calculate excess business loss correctly for single filer with $400k business loss', () => {
    const result = form461({
      taxYear: 2024,
      isSingle: true,
      schedule1_line3: -400000, // Business loss
      nonBusinessCapGains: 50000, // Capital gains
      schedule1_line4: 0,
      schedule1_line5: 0,
      schedule1_line6: 0,
      f461_line8: 0,
      businessCapGains: 0,
      f461_line11: 0,
      override_f461_line15: 250000, // Threshold for 2024
    })

    // Part I: Trade or business income/loss
    expect(result.f461_line2).toBe(-400000) // Business loss
    expect(result.f461_line3).toBe(50000) // Capital gains
    expect(result.f461_line9).toBe(-350000) // Combined business activities

    // Part II: Non-business income/loss adjustments
    expect(result.f461_line10).toBe(50000) // Non-business capital gains excluded from business calculation
    expect(result.f461_line11).toBe(0)
    expect(result.f461_line12).toBe(50000) // 50000 - 0 = 50000
    expect(result.f461_line13).toBe(-50000) // Positive becomes negative

    // Part III: Excess business loss calculation
    expect(result.f461_line14).toBe(-400000) // Business loss + non-business adjustment (-350000 + (-50000))
    expect(result.f461_line15).toBe(250000) // Threshold
    expect(result.f461_line16).toBe(150000) // Excess loss: abs(min(0, -400000 + 250000))
  })

  it('should not disallow any loss when business loss is within threshold', () => {
    const result = form461({
      taxYear: 2024,
      isSingle: true,
      schedule1_line3: -200000, // Business loss within limit
      nonBusinessCapGains: 0,
      schedule1_line4: 0,
      schedule1_line5: 0,
      schedule1_line6: 0,
      f461_line8: 0,
      businessCapGains: 0,
      f461_line11: 0,
      override_f461_line15: 250000,
    })

    expect(result.f461_line9).toBe(-200000)
    expect(result.f461_line14).toBe(-200000)
    expect(result.f461_line16).toBe(0) // No excess loss to disallow
  })

  it('should handle positive business income correctly', () => {
    const result = form461({
      taxYear: 2024,
      isSingle: true,
      schedule1_line3: 100000, // Business income
      nonBusinessCapGains: 0,
      schedule1_line4: 0,
      schedule1_line5: 0,
      schedule1_line6: 0,
      f461_line8: 0,
      businessCapGains: 0,
      override_f461_line15: 250000,
    })

    expect(result.f461_line9).toBe(100000)
    expect(result.f461_line14).toBe(100000)
    expect(result.f461_line16).toBe(0) // No loss to disallow
  })

  // Edge Case Tests
  it('should handle zero business income and zero capital gains', () => {
    const result = form461({
      taxYear: 2024,
      isSingle: true,
      schedule1_line3: 0, // No business income
      nonBusinessCapGains: 0, // No capital gains
      schedule1_line4: 0,
      schedule1_line5: 0,
      schedule1_line6: 0,
      f461_line8: 0,
      businessCapGains: 0,
      override_f461_line15: 250000,
    })

    expect(result.f461_line2).toBe(0)
    expect(result.f461_line3).toBe(0)
    expect(result.f461_line9).toBe(0)
    expect(result.f461_line10).toBe(0)
    expect(result.f461_line14).toBe(0)
    expect(result.f461_line16).toBe(0) // No excess loss
  })

  it('should handle business loss exactly at the threshold', () => {
    const result = form461({
      taxYear: 2024,
      isSingle: true,
      schedule1_line3: -250000, // Loss exactly at limit
      nonBusinessCapGains: 0,
      schedule1_line4: 0,
      schedule1_line5: 0,
      schedule1_line6: 0,
      f461_line8: 0,
      businessCapGains: 0,
      override_f461_line15: 250000,
    })

    expect(result.f461_line9).toBe(-250000)
    expect(result.f461_line14).toBe(-250000)
    expect(result.f461_line15).toBe(250000)
    expect(result.f461_line16).toBe(0) // No excess - exactly at limit
  })

  it('should handle business loss one dollar over threshold', () => {
    const result = form461({
      taxYear: 2024,
      isSingle: true,
      schedule1_line3: -250001, // Loss one dollar over limit
      nonBusinessCapGains: 0,
      schedule1_line4: 0,
      schedule1_line5: 0,
      schedule1_line6: 0,
      f461_line8: 0,
      businessCapGains: 0,
      override_f461_line15: 250000,
    })

    expect(result.f461_line9).toBe(-250001)
    expect(result.f461_line14).toBe(-250001)
    expect(result.f461_line15).toBe(250000)
    expect(result.f461_line16).toBe(1) // Excess of $1
  })

  it('should handle large non-business capital gains with business loss', () => {
    const result = form461({
      taxYear: 2024,
      isSingle: true,
      schedule1_line3: -500000, // Large business loss
      nonBusinessCapGains: 300000, // Large non-business capital gains
      schedule1_line4: 0,
      schedule1_line5: 0,
      schedule1_line6: 0,
      f461_line8: 0,
      businessCapGains: 0,
      override_f461_line15: 250000,
    })

    expect(result.f461_line2).toBe(-500000)
    expect(result.f461_line3).toBe(300000)
    expect(result.f461_line9).toBe(-200000) // Business loss + capital gains
    expect(result.f461_line10).toBe(300000) // Non-business cap gains excluded
    expect(result.f461_line12).toBe(300000)
    expect(result.f461_line13).toBe(-300000)
    expect(result.f461_line14).toBe(-500000) // Net effect: -200k + (-300k)
    expect(result.f461_line16).toBe(250000) // Excess: 500k - 250k = 250k
  })

  it('should handle mixed business and non-business capital gains', () => {
    const result = form461({
      taxYear: 2024,
      isSingle: true,
      schedule1_line3: -300000, // Business loss
      nonBusinessCapGains: 100000, // Non-business capital gains
      schedule1_line4: 0,
      schedule1_line5: 0,
      schedule1_line6: 0,
      f461_line8: 0,
      businessCapGains: 50000, // Business capital gains
      override_f461_line15: 250000,
    })

    expect(result.f461_line2).toBe(-300000)
    expect(result.f461_line3).toBe(150000) // Total capital gains (100k + 50k)
    expect(result.f461_line9).toBe(-150000) // Business activity: -300k + 150k
    expect(result.f461_line10).toBe(100000) // Only non-business cap gains excluded
    expect(result.f461_line12).toBe(100000)
    expect(result.f461_line13).toBe(-100000)
    expect(result.f461_line14).toBe(-250000) // Net: -150k + (-100k)
    expect(result.f461_line16).toBe(0) // Exactly at limit, no excess
  })

  it('should handle business capital gains that completely offset business loss', () => {
    const result = form461({
      taxYear: 2024,
      isSingle: true,
      schedule1_line3: -200000, // Business loss
      nonBusinessCapGains: 50000,
      schedule1_line4: 0,
      schedule1_line5: 0,
      schedule1_line6: 0,
      f461_line8: 0,
      businessCapGains: 250000, // Large business capital gains
      override_f461_line15: 250000,
    })

    expect(result.f461_line2).toBe(-200000)
    expect(result.f461_line3).toBe(300000) // Total capital gains
    expect(result.f461_line9).toBe(100000) // Net business profit: -200k + 300k
    expect(result.f461_line10).toBe(50000) // Non-business exclusion
    expect(result.f461_line14).toBe(50000) // Net: 100k + (-50k)
    expect(result.f461_line16).toBe(0) // No loss to disallow (net profit)
  })

  it('should handle multiple income sources with rental and farm income', () => {
    const result = form461({
      taxYear: 2024,
      isSingle: true,
      schedule1_line3: -150000, // Business loss
      nonBusinessCapGains: 25000,
      schedule1_line4: 10000, // Other gains
      schedule1_line5: -30000, // Rental loss
      schedule1_line6: 20000, // Farm income
      f461_line8: 5000, // Other trade/business income
      businessCapGains: 0,
      override_f461_line15: 250000,
    })

    expect(result.f461_line2).toBe(-150000)
    expect(result.f461_line3).toBe(25000)
    expect(result.f461_line4).toBe(10000)
    expect(result.f461_line5).toBe(-30000)
    expect(result.f461_line6).toBe(20000)
    expect(result.f461_line8).toBe(5000)
    expect(result.f461_line9).toBe(-120000) // Sum: -150k + 25k + 10k - 30k + 20k + 5k
    expect(result.f461_line10).toBe(25000)
    expect(result.f461_line14).toBe(-145000) // -120k + (-25k)
    expect(result.f461_line16).toBe(0) // No excess loss (under 250k limit)
  })

  it('should handle married filing jointly with different threshold', () => {
    const result = form461({
      taxYear: 2024,
      isSingle: false, // Married filing jointly
      schedule1_line3: -600000, // Large business loss
      nonBusinessCapGains: 0,
      schedule1_line4: 0,
      schedule1_line5: 0,
      schedule1_line6: 0,
      f461_line8: 0,
      businessCapGains: 0,
      override_f461_line15: 500000, // Higher limit for MFJ
    })

    expect(result.f461_line9).toBe(-600000)
    expect(result.f461_line14).toBe(-600000)
    expect(result.f461_line15).toBe(500000)
    expect(result.f461_line16).toBe(100000) // Excess: 600k - 500k = 100k
  })
})
