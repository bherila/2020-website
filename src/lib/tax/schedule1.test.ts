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
})
