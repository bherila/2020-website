// Test to reproduce and verify the fix for the bug with personal capital loss limitation in Form 461
// 
// BUG DESCRIPTION:
// When calculating excess business losses, Form 461 was incorrectly using unlimited personal 
// capital gains/losses instead of the limited amounts from Schedule D. This caused incorrect 
// NOL calculations when personal capital losses exceeded the annual limitation ($3,000 for 
// single filers, $1,500 for married filing separately).
//
// THE FIX:
// 1. Updated schedule1() to pass the LIMITED f1040_line7 amount to form461()
// 2. Updated form461() to accept f1040_line7 parameter and use it for calculations
// 3. Maintained backward compatibility for direct form461() calls
//
// EXAMPLE SCENARIO:
// - W2 income: $0
// - Personal capital loss: -$50,000 (limited to -$3,000 by Schedule D)
// - Business income: -$300,000
// - Form 461 threshold: $250,000
//
// BEFORE (incorrect): Form 461 used -$50,000, resulting in wrong excess business loss calculation
// AFTER (correct): Form 461 uses -$3,000 (limited amount), correctly calculating excess business loss

import { form1040 } from './form1040'
import { form461 } from './form461'
import { scheduleD } from './scheduleD'

describe('Excess Business Loss Bug - Personal Capital Loss Limitation', () => {
  it('should correctly handle personal capital loss limitation in Form 461', () => {
    // Scenario: W2=0, personalCapGain=-50k, businessCapGain=0, businessIncome=-300k
    // The -50k personal capital loss should be limited to -3k by Schedule D
    // Form 461 should use the limited -3k amount, not the unlimited -50k
    
    const result = form1040({
      wages: 0,
      interest: 0,
      dividends: 0,
      iraDistributions: 0,
      pensions: 0,
      socialSecurity: 0,
      nonBusinessCapGains: -50000, // Personal capital loss
      businessIncome: -300000,
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

    // Schedule D should limit the -50k personal capital loss to -3k
    expect(result.scheduleD.schD_line16).toBe(-50000) // Unlimited total
    expect(result.scheduleD.schD_line21).toBe(-3000) // Limited for Form 1040 line 7
    expect(result.f1040_line7).toBe(-3000) // Form 1040 line 7 should show limited amount

    // Form 461 should use the LIMITED capital gains amount (-3k), not unlimited (-50k)
    const form461Data = result.schedule1.form461output!
    
    // These should be the CORRECT values:
    expect(form461Data.f461_line2).toBe(-300000) // Business income
    expect(form461Data.f461_line3).toBe(-3000) // Should be Form 1040 line 7 (LIMITED amount)
    expect(form461Data.f461_line9).toBe(-303000) // Total business income/loss
    expect(form461Data.f461_line10).toBe(-3000) // Should be LIMITED personal cap gains
    expect(form461Data.f461_line11).toBe(0) // Non-business deductions
    expect(form461Data.f461_line12).toBe(-3000) // Line 10 - Line 11
    expect(form461Data.f461_line13).toBe(3000) // Flip sign of line 12
    expect(form461Data.f461_line14).toBe(-300000) // Line 9 + Line 13
    expect(form461Data.f461_line15).toBe(250000) // Threshold
    expect(form461Data.f461_line16).toBe(50000) // Excess business loss disallowed

    // The AGI calculation should be correct:
    // Line 9 (total income) = 0 (wages) + 0 + 0 + 0 + 0 + 0 + (-3000) (cap gains) + (-250000) (schedule 1) = -253000
    // Line 11 (AGI) = Line 9 - Line 10 (adjustments to income) = -253000 - 0 = -253000
    expect(result.f1040_line11).toBe(-253000) // AGI
  })

  it('should separately track capital loss carryforward vs NOL carryforward', () => {
    // The capital loss carryforward is separate from NOL
    // -50k personal capital loss becomes:
    // - 3k deductible this year (on Schedule D line 21)
    // - 47k capital loss carryforward (separate from NOL)
    
    const scheduleDResult = scheduleD({
      line1a_gain_loss: -50000,
      isSingle: true,
    })
    
    expect(scheduleDResult.schD_line16).toBe(-50000) // Total capital loss
    expect(scheduleDResult.schD_line21).toBe(-3000) // Limited for current year
    
    // The remaining 47k would be a capital loss carryforward for future years
    // This is handled separately from NOL calculations
    const capitalLossCarryforward = scheduleDResult.schD_line16 - scheduleDResult.schD_line21
    expect(capitalLossCarryforward).toBe(-47000)
  })

  it('should verify Form 461 works correctly when called through the proper Form 1040 flow', () => {
    // This test shows that the fix works when Form 461 is called correctly with f1040_line7
    const form461Result = form461({
      taxYear: 2024,
      isSingle: true,
      schedule1_line3: -300000, // Business income
      f1040_line7: -3000, // LIMITED capital gains from Schedule D 
      businessCapGains: 0,
      nonBusinessCapGains: -50000, // This should be ignored when f1040_line7 is provided
      schedule1_line4: 0,
      schedule1_line5: 0,
      schedule1_line6: 0,
      f461_line8: 0,
      f461_line11: 0,
      override_f461_line15: 250000,
    })

    // When f1040_line7 is provided, Form 461 should use the LIMITED amounts:
    expect(form461Result.f461_line3).toBe(-3000) // Uses f1040_line7 (LIMITED)
    expect(form461Result.f461_line10).toBe(-3000) // Uses limited amount for non-business calculation
    expect(form461Result.f461_line12).toBe(-3000) // 
    expect(form461Result.f461_line13).toBe(3000) // 
    expect(form461Result.f461_line14).toBe(-300000) // Line 9 + Line 13 = -303000 + 3000
    expect(form461Result.f461_line16).toBe(50000) // Excess business loss
  })
})
