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
})
