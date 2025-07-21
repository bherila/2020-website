import { form1040 } from './form1040'

describe('Form 1040 - U.S. Individual Income Tax Return', () => {
  it('should calculate AGI and taxable income correctly with business loss and excess business loss adjustment', () => {
    const result = form1040({
      wages: 100000,
      interest: 0,
      dividends: 0,
      iraDistributions: 0,
      pensions: 0,
      socialSecurity: 0,
      nonBusinessCapGains: 50000,
      businessIncome: -400000,
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      nolDeductionFromOtherYears: 0,
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      businessCapGains: 0,
      standardDeduction: 14600,
      qbiDeduction: 0,
      isSingle: true,
      taxYear: 2024,
      override_f461_line15: 250000,
    })

    // Income section
    expect(result.f1040_line1z).toBe(100000) // Wages
    expect(result.f1040_line7).toBe(50000) // Capital gains
    expect(result.f1040_line8).toBe(-250000) // Additional income from Schedule 1 (business loss adjusted by Form 461)
    expect(result.f1040_line9).toBe(-100000) // Total income

    // AGI calculation
    expect(result.f1040_line10).toBe(0) // No adjustments to income in this example
    expect(result.f1040_line11).toBe(-100000) // AGI

    // Taxable income calculation
    expect(result.f1040_line12).toBe(14600) // Standard deduction
    expect(result.f1040_line13).toBe(0) // QBI deduction
    expect(result.f1040_line14).toBe(14600) // Total deductions
    expect(result.f1040_line15).toBe(0) // Taxable income (can't be negative)

    // Schedule 1 should show the excess business loss adjustment
    expect(result.schedule1.sch1_line3).toBe(-400000) // Original business loss
    expect(result.schedule1.sch1_line8p).toBe(150000) // Excess business loss adjustment
    expect(result.schedule1.sch1_line10).toBe(-250000) // Net additional income
  })

  it('should handle NOL carryforward correctly', () => {
    const result = form1040({
      wages: 100000,
      interest: 0,
      dividends: 0,
      iraDistributions: 0,
      pensions: 0,
      socialSecurity: 0,
      nonBusinessCapGains: 50000,
      businessIncome: 0,
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      nolDeductionFromOtherYears: 200000, // NOL from prior years
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      businessCapGains: 0,
      standardDeduction: 14600,
      qbiDeduction: 0,
      isSingle: true,
      taxYear: 2024,
      override_f461_line15: 250000,
    })

    // Income before NOL
    expect(result.f1040_line1z).toBe(100000) // Wages
    expect(result.f1040_line7).toBe(50000) // Capital gains

    // NOL deduction should reduce additional income
    expect(result.f1040_line8).toBe(-200000) // NOL deduction from Schedule 1
    expect(result.f1040_line9).toBe(-50000) // Total income after NOL (100k + 50k - 200k)
    expect(result.f1040_line11).toBe(-50000) // AGI
    expect(result.f1040_line15).toBe(0) // Taxable income
  })

  it('should calculate basic tax return with positive income', () => {
    const result = form1040({
      wages: 75000,
      interest: 1000,
      dividends: 2000,
      iraDistributions: 0,
      pensions: 0,
      socialSecurity: 0,
      nonBusinessCapGains: 5000,
      businessIncome: 0,
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      nolDeductionFromOtherYears: 0,
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      businessCapGains: 0,
      standardDeduction: 14600,
      qbiDeduction: 0,
      isSingle: true,
      taxYear: 2024,
      override_f461_line15: 250000,
    })

    expect(result.f1040_line1z).toBe(75000) // Wages
    expect(result.f1040_line2b).toBe(1000) // Interest
    expect(result.f1040_line3b).toBe(2000) // Dividends
    expect(result.f1040_line7).toBe(5000) // Capital gains
    expect(result.f1040_line8).toBe(0) // No additional income
    expect(result.f1040_line9).toBe(83000) // Total income
    expect(result.f1040_line11).toBe(83000) // AGI
    expect(result.f1040_line15).toBe(68400) // Taxable income (83000 - 14600)
  })
})
