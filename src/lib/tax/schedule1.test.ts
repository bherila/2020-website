import { schedule1 } from './schedule1'

describe('Schedule 1 - Additional Income and Adjustments to Income', () => {
  it('should correctly integrate Form 461 excess business loss adjustment', () => {
    const result = schedule1({
      f1040_line7: 50000, // Capital gains
      businessIncome: -400000, // Business loss
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      netOperatingLoss: 0, // No NOL from prior years
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      taxYear: 2024,
      isSingle: true,
      override_f461_line15: 250000,
    })

    // Additional Income section
    expect(result.sch1_line3).toBe(-400000) // Business loss
    expect(result.sch1_line8a).toBe(-0) // No NOL deduction (JavaScript returns -0)
    expect(result.sch1_line8p).toBe(150000) // Excess business loss adjustment from Form 461
    expect(result.sch1_line9).toBe(150000) // Total other income (8a + 8p)
    expect(result.sch1_line10).toBe(-250000) // Net additional income (-400k + 0 + 0 + 0 + 0 + 150k)

    // Adjustments section
    expect(result.sch1_line26).toBe(0) // No adjustments in this example

    // Form 461 should be included
    expect(result.form461output?.f461_line16).toBe(150000)
  })

  it('should handle NOL deduction correctly', () => {
    const result = schedule1({
      f1040_line7: 0,
      businessIncome: 0,
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      netOperatingLoss: 50000, // NOL from prior years
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      taxYear: 2024,
      isSingle: true,
      override_f461_line15: 250000,
    })

    expect(result.sch1_line8a).toBe(-50000) // NOL deduction as negative
    expect(result.sch1_line8p).toBe(0) // No excess business loss
    expect(result.sch1_line9).toBe(-50000) // Total other income
    expect(result.sch1_line10).toBe(-50000) // Net additional income
  })

  it('should calculate adjustments to income correctly', () => {
    const result = schedule1({
      f1040_line7: 0,
      businessIncome: 0,
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      netOperatingLoss: 0,
      selfEmploymentTax: 5000,
      sepSimpleQualifiedPlans: 3000,
      selfEmployedHealthInsurance: 2000,
      earlyWithdrawalPenalty: 100,
      taxYear: 2024,
      isSingle: true,
      override_f461_line15: 250000,
    })

    expect(result.sch1_line15).toBe(5000)
    expect(result.sch1_line16).toBe(3000)
    expect(result.sch1_line17).toBe(2000)
    expect(result.sch1_line18).toBe(100)
    expect(result.sch1_line26).toBe(10100) // Total adjustments
  })

  // Edge Case Tests
  it('should handle zero income scenario', () => {
    const result = schedule1({
      businessIncome: 0,
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      netOperatingLoss: 0,
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      businessCapGains: 0,
      nonBusinessCapGains: 0,
      taxYear: 2024,
      isSingle: true,
      override_f461_line15: 250000,
    })

    expect(result.sch1_line3).toBe(0)
    expect(result.sch1_line8a).toBe(-0) // JavaScript -0
    expect(result.sch1_line8p).toBe(0)
    expect(result.sch1_line10).toBe(0)
    expect(result.sch1_line26).toBe(0)
    expect(result.form461output?.f461_line16).toBe(0)
  })

  it('should handle large NOL with small business income', () => {
    const result = schedule1({
      businessIncome: 50000, // Small business profit
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      netOperatingLoss: 300000, // Large NOL
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      businessCapGains: 0,
      nonBusinessCapGains: 0,
      taxYear: 2024,
      isSingle: true,
      override_f461_line15: 250000,
    })

    expect(result.sch1_line3).toBe(50000)
    expect(result.sch1_line8a).toBe(-300000) // NOL deduction
    expect(result.sch1_line8p).toBe(0) // No excess business loss
    expect(result.sch1_line9).toBe(-300000)
    expect(result.sch1_line10).toBe(-250000) // Net: 50k - 300k
  })

  it('should handle mixed business and non-business capital gains with Form 461', () => {
    const result = schedule1({
      businessIncome: -200000,
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      netOperatingLoss: 0,
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      businessCapGains: 75000, // Business capital gains
      nonBusinessCapGains: 25000, // Non-business capital gains
      taxYear: 2024,
      isSingle: true,
      override_f461_line15: 250000,
    })

    expect(result.sch1_line3).toBe(-200000)
    expect(result.sch1_line8p).toBe(0) // No excess loss (-125k business activity + 25k exclusion = -100k net)
    expect(result.sch1_line10).toBe(-200000)
    
    // Form 461 calculations
    expect(result.form461output?.f461_line2).toBe(-200000)
    expect(result.form461output?.f461_line3).toBe(100000) // Total capital gains
    expect(result.form461output?.f461_line9).toBe(-100000) // Net business activity
    expect(result.form461output?.f461_line10).toBe(25000) // Non-business exclusion
    expect(result.form461output?.f461_line16).toBe(0) // No excess loss
  })

  it('should handle rental and farm losses with business income', () => {
    const result = schedule1({
      businessIncome: 100000, // Business profit
      otherGains: 5000,
      rentalIncome: -40000, // Rental loss
      farmIncome: -15000, // Farm loss
      netOperatingLoss: 0,
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      businessCapGains: 0,
      nonBusinessCapGains: 0,
      taxYear: 2024,
      isSingle: true,
      override_f461_line15: 250000,
    })

    expect(result.sch1_line3).toBe(100000)
    expect(result.sch1_line4).toBe(5000)
    expect(result.sch1_line5).toBe(-40000)
    expect(result.sch1_line6).toBe(-15000)
    expect(result.sch1_line8p).toBe(0) // No excess business loss
    expect(result.sch1_line10).toBe(50000) // Net: 100k + 5k - 40k - 15k

    // Form 461 should show net profit
    expect(result.form461output?.f461_line9).toBe(50000)
    expect(result.form461output?.f461_line16).toBe(0)
  })

  it('should handle business loss exactly at Form 461 threshold', () => {
    const result = schedule1({
      businessIncome: -250000, // Loss exactly at threshold
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      netOperatingLoss: 0,
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      businessCapGains: 0,
      nonBusinessCapGains: 0,
      taxYear: 2024,
      isSingle: true,
      override_f461_line15: 250000,
    })

    expect(result.sch1_line3).toBe(-250000)
    expect(result.sch1_line8p).toBe(0) // No excess loss - exactly at limit
    expect(result.sch1_line10).toBe(-250000)
    expect(result.form461output?.f461_line16).toBe(0)
  })

  it('should handle all adjustment categories with business loss', () => {
    const result = schedule1({
      businessIncome: -150000,
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      netOperatingLoss: 50000, // NOL from prior years
      selfEmploymentTax: 8000, // Self-employment tax deduction
      sepSimpleQualifiedPlans: 5000, // SEP-IRA contribution
      selfEmployedHealthInsurance: 12000, // Health insurance
      earlyWithdrawalPenalty: 500, // Early withdrawal penalty
      businessCapGains: 0,
      nonBusinessCapGains: 20000,
      taxYear: 2024,
      isSingle: true,
      override_f461_line15: 250000,
    })

    expect(result.sch1_line3).toBe(-150000)
    expect(result.sch1_line8a).toBe(-50000) // NOL deduction
    expect(result.sch1_line8p).toBe(0) // No excess business loss
    expect(result.sch1_line10).toBe(-200000) // Net additional income
    
    // Adjustments
    expect(result.sch1_line15).toBe(8000)
    expect(result.sch1_line16).toBe(5000)
    expect(result.sch1_line17).toBe(12000)
    expect(result.sch1_line18).toBe(500)
    expect(result.sch1_line26).toBe(25500) // Total adjustments

    // Form 461: -150k business + 20k non-business exclusion = -130k net
    expect(result.form461output?.f461_line9).toBe(-130000)
    expect(result.form461output?.f461_line10).toBe(20000)
    expect(result.form461output?.f461_line14).toBe(-150000)
    expect(result.form461output?.f461_line16).toBe(0) // Under threshold
  })
})
