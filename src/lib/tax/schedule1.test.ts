import { schedule1 } from './schedule1'
import { scheduleD } from './scheduleD'

describe('Schedule 1 - Additional Income and Adjustments to Income', () => {
  it('should correctly integrate Form 461 excess business loss adjustment', () => {
    // Create Schedule D data with business and non-business capital gains
    const scheduleDData = scheduleD({
      line1a_gain_loss: 50000, // Personal capital gains
      line5: 0, // Business capital gains
      isSingle: true,
    })
    
    const result = schedule1({
      scheduleDData,
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
    const scheduleDData = scheduleD({
      line1a_gain_loss: 0,
      line5: 0,
      isSingle: true,
    })
    
    const result = schedule1({
      scheduleDData,
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

    expect(result.sch1_line8a).toBe(-50000)
    expect(result.sch1_line8p).toBe(0)
    expect(result.sch1_line9).toBe(-50000)
    expect(result.sch1_line10).toBe(-50000)
  })

  it('should calculate adjustments to income correctly', () => {
    const scheduleDData = scheduleD({
      line1a_gain_loss: 0,
      line5: 0,
      isSingle: true,
    })
    
    const result = schedule1({
      scheduleDData,
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
    expect(result.sch1_line26).toBe(10100)
  })

  it('should handle zero income scenario', () => {
    const scheduleDData = scheduleD({
      line1a_gain_loss: 0,
      line5: 0,
      isSingle: true,
    })
    
    const result = schedule1({
      scheduleDData,
      businessIncome: 0,
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      netOperatingLoss: 0,
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      taxYear: 2024,
      isSingle: true,
      override_f461_line15: 250000,
    })

    expect(result.sch1_line3).toBe(0)
    expect(result.sch1_line8a).toBe(-0)
    expect(result.sch1_line8p).toBe(0)
    expect(result.sch1_line10).toBe(0)
    expect(result.sch1_line26).toBe(0)
    expect(result.form461output?.f461_line16).toBe(0)
  })

  it('should handle large NOL with small business income', () => {
    const scheduleDData = scheduleD({
      line1a_gain_loss: 0,
      line5: 0,
      isSingle: true,
    })
    
    const result = schedule1({
      scheduleDData,
      businessIncome: 50000, // Small business income
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      netOperatingLoss: 300000, // Large NOL from prior years
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      taxYear: 2024,
      isSingle: true,
      override_f461_line15: 250000,
    })

    expect(result.sch1_line3).toBe(50000)
    expect(result.sch1_line8a).toBe(-300000)
    expect(result.sch1_line8p).toBe(0)
    expect(result.sch1_line9).toBe(-300000)
    expect(result.sch1_line10).toBe(-250000)
  })
})
