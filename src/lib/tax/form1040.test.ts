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

  // Edge Case Tests
  it('should handle zero W-2 income and zero capital gains with business loss', () => {
    const result = form1040({
      wages: 0, // No W-2 income
      interest: 0,
      dividends: 0,
      iraDistributions: 0,
      pensions: 0,
      socialSecurity: 0,
      nonBusinessCapGains: 0, // No capital gains
      businessIncome: -300000, // Pure business loss
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

    expect(result.f1040_line1z).toBe(0) // No wages
    expect(result.f1040_line7).toBe(0) // No capital gains
    expect(result.f1040_line8).toBe(-250000) // Business loss limited by Form 461
    expect(result.f1040_line9).toBe(-250000) // Total income
    expect(result.f1040_line11).toBe(-250000) // AGI
    expect(result.f1040_line15).toBe(0) // Taxable income (can't be negative)
    
    // Form 461 should disallow $50k excess loss ($300k - $250k)
    expect(result.schedule1.sch1_line3).toBe(-300000)
    expect(result.schedule1.sch1_line8p).toBe(50000)
    expect(result.schedule1.sch1_line10).toBe(-250000)
  })

  it('should handle mixed business and non-business capital gains correctly', () => {
    const result = form1040({
      wages: 50000,
      interest: 0,
      dividends: 0,
      iraDistributions: 0,
      pensions: 0,
      socialSecurity: 0,
      nonBusinessCapGains: 30000, // Non-business capital gains
      businessIncome: -200000,
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      nolDeductionFromOtherYears: 0,
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      businessCapGains: 50000, // Business capital gains
      standardDeduction: 14600,
      qbiDeduction: 0,
      isSingle: true,
      taxYear: 2024,
      override_f461_line15: 250000,
    })

    expect(result.f1040_line1z).toBe(50000) // Wages
    expect(result.f1040_line7).toBe(80000) // Total capital gains (30k + 50k)
    expect(result.f1040_line8).toBe(-200000) // Business activity: no Form 461 limitation since net business is -150k
    expect(result.f1040_line9).toBe(-70000) // Total income: 50k + 80k - 200k
    expect(result.f1040_line11).toBe(-70000) // AGI
    expect(result.f1040_line15).toBe(0) // Taxable income

    // Form 461: Business income (-200k) + all capital gains (80k) = -120k
    // Non-business cap gains (30k) excluded from business calculation
    expect(result.schedule1.form461output?.f461_line9).toBe(-120000)
    expect(result.schedule1.form461output?.f461_line10).toBe(30000)
    expect(result.schedule1.form461output?.f461_line16).toBe(0) // No excess loss
  })

  it('should handle business profit with NOL carryforward utilization', () => {
    const result = form1040({
      wages: 60000,
      interest: 0,
      dividends: 0,
      iraDistributions: 0,
      pensions: 0,
      socialSecurity: 0,
      nonBusinessCapGains: 20000,
      businessIncome: 100000, // Business profit
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      nolDeductionFromOtherYears: 150000, // Large NOL from prior years
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

    expect(result.f1040_line1z).toBe(60000) // Wages
    expect(result.f1040_line7).toBe(20000) // Capital gains
    expect(result.f1040_line8).toBe(-50000) // NOL deduction and business income (100k - 150k)
    expect(result.f1040_line9).toBe(30000) // Total income (60k + 20k - 50k)
    expect(result.f1040_line11).toBe(30000) // AGI
    expect(result.f1040_line15).toBe(15400) // Taxable income (30k - 14.6k)
    
    // Schedule 1 shows business profit and NOL usage
    expect(result.schedule1.sch1_line3).toBe(100000)
    expect(result.schedule1.sch1_line8a).toBe(-150000)
    expect(result.schedule1.sch1_line8p).toBe(0) // No excess business loss
    expect(result.schedule1.sch1_line10).toBe(-50000)
  })

  it('should handle exactly zero AGI scenario', () => {
    const result = form1040({
      wages: 100000,
      interest: 0,
      dividends: 0,
      iraDistributions: 0,
      pensions: 0,
      socialSecurity: 0,
      nonBusinessCapGains: 50000,
      businessIncome: -150000, // Exactly offsets other income
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

    expect(result.f1040_line1z).toBe(100000) // Wages
    expect(result.f1040_line7).toBe(50000) // Capital gains
    expect(result.f1040_line8).toBe(-150000) // Business loss (no Form 461 limitation needed)
    expect(result.f1040_line9).toBe(0) // Total income: 100k + 50k - 150k = 0
    expect(result.f1040_line11).toBe(0) // AGI
    expect(result.f1040_line15).toBe(0) // Taxable income (can't be negative)

    // Form 461: -150k business loss + 50k non-business cap gains exclusion = -100k net
    expect(result.schedule1.form461output?.f461_line9).toBe(-100000)
    expect(result.schedule1.form461output?.f461_line14).toBe(-150000)
    expect(result.schedule1.form461output?.f461_line16).toBe(0) // No excess loss
  })

  it('should handle high income with large NOL usage', () => {
    const result = form1040({
      wages: 200000,
      interest: 5000,
      dividends: 10000,
      iraDistributions: 0,
      pensions: 0,
      socialSecurity: 0,
      nonBusinessCapGains: 100000,
      businessIncome: 150000, // Large business profit
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      nolDeductionFromOtherYears: 400000, // Very large NOL
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

    expect(result.f1040_line1z).toBe(200000) // Wages
    expect(result.f1040_line2b).toBe(5000) // Interest
    expect(result.f1040_line3b).toBe(10000) // Dividends
    expect(result.f1040_line7).toBe(100000) // Capital gains
    expect(result.f1040_line8).toBe(-250000) // Business income minus NOL (150k - 400k)
    expect(result.f1040_line9).toBe(65000) // Total income
    expect(result.f1040_line11).toBe(65000) // AGI
    expect(result.f1040_line15).toBe(50400) // Taxable income (65k - 14.6k)
  })

  // New tests for Schedule D integration
  it('should integrate Schedule D capital gains correctly', () => {
    const result = form1040({
      wages: 100000,
      nonBusinessCapGains: 5000, // Personal capital gains
      businessCapGains: 3000, // Business capital gains
      businessIncome: -50000,
      isSingle: true,
      taxYear: 2024,
      override_f461_line15: 250000,
    })

    // Schedule D should combine both types of capital gains
    expect(result.scheduleD.schD_line1a_gain_loss).toBe(5000) // Personal gains
    expect(result.scheduleD.schD_line5).toBe(3000) // Business gains
    expect(result.scheduleD.schD_line7).toBe(8000) // Total short-term gains
    expect(result.scheduleD.schD_line16).toBe(8000) // Combined gains
    expect(result.scheduleD.schD_line21).toBe(8000) // No limitation

    // Form 1040 line 7 should use Schedule D limited amount
    expect(result.f1040_line7).toBe(8000) // Capital gains from Schedule D
  })

  it('should apply capital loss limitation through Schedule D', () => {
    const result = form1040({
      wages: 100000,
      nonBusinessCapGains: -5000, // Personal capital losses
      businessCapGains: -3000, // Business capital losses
      businessIncome: 50000,
      isSingle: true,
      taxYear: 2024,
    })

    // Schedule D should limit the losses
    expect(result.scheduleD.schD_line1a_gain_loss).toBe(-5000) // Personal losses
    expect(result.scheduleD.schD_line5).toBe(-3000) // Business losses
    expect(result.scheduleD.schD_line7).toBe(-8000) // Total short-term losses
    expect(result.scheduleD.schD_line16).toBe(-8000) // Combined losses
    expect(result.scheduleD.schD_line21).toBe(-3000) // Limited to -$3,000 for single

    // Form 1040 line 7 should use limited amount
    expect(result.f1040_line7).toBe(-3000) // Limited capital loss
    expect(result.f1040_line11).toBe(147000) // AGI: 100k + 50k - 3k
  })

  it('should handle mixed personal and business capital gains/losses', () => {
    const result = form1040({
      wages: 80000,
      nonBusinessCapGains: 10000, // Personal gains
      businessCapGains: -15000, // Business losses
      businessIncome: -100000,
      isSingle: true,
      taxYear: 2024,
      override_f461_line15: 250000,
    })

    // Schedule D calculations
    expect(result.scheduleD.schD_line1a_gain_loss).toBe(10000) // Personal gains
    expect(result.scheduleD.schD_line5).toBe(-15000) // Business losses
    expect(result.scheduleD.schD_line7).toBe(-5000) // Net short-term: 10k - 15k
    expect(result.scheduleD.schD_line16).toBe(-5000) // Combined
    expect(result.scheduleD.schD_line21).toBe(-3000) // Limited to -$3,000

    expect(result.f1040_line7).toBe(-3000) // Limited capital loss
  })

  it('should handle capital loss limitation for married filing separately', () => {
    const result = form1040({
      wages: 50000,
      nonBusinessCapGains: -4000, // Personal losses
      businessCapGains: -2000, // Business losses
      businessIncome: 20000,
      isSingle: false, // Married filing separately
      taxYear: 2024,
    })

    // Schedule D should limit to -$1,500 for MFS
    expect(result.scheduleD.schD_line16).toBe(-6000) // Total losses
    expect(result.scheduleD.schD_line21).toBe(-1500) // Limited to -$1,500 for MFS

    expect(result.f1040_line7).toBe(-1500) // Limited capital loss
    expect(result.f1040_line11).toBe(68500) // AGI: 50k + 20k - 1.5k
  })

  it('should handle zero capital gains scenarios with Schedule D', () => {
    const result = form1040({
      wages: 75000,
      nonBusinessCapGains: 0,
      businessCapGains: 0,
      businessIncome: 25000,
      isSingle: true,
      taxYear: 2024,
    })

    // Schedule D should show all zeros
    expect(result.scheduleD.schD_line1a_gain_loss).toBe(0)
    expect(result.scheduleD.schD_line5).toBe(0)
    expect(result.scheduleD.schD_line7).toBe(0)
    expect(result.scheduleD.schD_line16).toBe(0)
    expect(result.scheduleD.schD_line21).toBe(0)

    expect(result.f1040_line7).toBe(0) // No capital gains
    expect(result.f1040_line11).toBe(100000) // AGI: 75k + 25k
  })
})
