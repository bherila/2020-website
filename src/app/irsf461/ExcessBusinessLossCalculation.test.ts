import { calculateExcessBusinessLoss } from "@/app/irsf461/ExcessBusinessLossCalculation"

describe('ExcessBusinessLossCalculation', () => {
  // Mock ExcessBusinessLossLimitation to always return 289000
  jest.mock('@/lib/tax/ExcessBusinessLossLimitation', () => ({
    ExcessBusinessLossLimitation: () => 289000,
  }))

  it('should correctly calculate NOL carryforward for W-2 income less than business loss', () => {
    /*
Example: W-2 Income Less Than Business Loss

Suppose:

    W-2 Income: $100,000
    Business Loss: $400,000 (Schedule C)
    Single filer, 2024 Form 461 threshold: $289,000

Step 1: Report Income and Loss

    Form 1040, line 1a: $100,000 (W-2)
    Schedule 1, line 3: ($400,000) (business loss)

Step 2: Apply Form 461 Business Loss Limitation

Form 461 limits business loss that can offset nonbusiness income (W-2) to $289,000.

    Allowed loss: $289,000 (maximum that can offset W-2 and other nonbusiness income)
    Excess business loss: $400,000 - $289,000 = $111,000 (disallowed in current year, becomes NOL carryforward)

Step 3: Calculate AGI and Taxable Income
Form 1040 Calculation:

    Total income: $100,000 (W-2)

    Allowed business loss: -$289,000

    AGI: $100,000 - $289,000 = -$189,000

    Standard deduction (2024 single): $14,600

    Taxable income: AGI - standard deduction = -$189,000 - $14,600 = -$203,600
        Taxable income can’t be less than zero, so it’s reported as $0.

Step 4: NOL Calculation (Form 172)

    The excess business loss ($111,000) is tracked on Form 172 and carried forward to next year.
    Additionally, because your AGI is negative, the portion of the allowed loss that could not be used to offset taxable income also becomes part of the NOL.

NOL Calculation:

    Total business loss: $400,000

    W-2 income used up: $100,000 (can only offset $100,000 of income)

    Unused loss: $400,000 - $100,000 = $300,000

    But Form 461 only allows $289,000 to be deducted in the current year.

    So, $289,000 allowed loss minus $100,000 W-2 income = $189,000 “unused” loss, which also becomes NOL (subject to specific IRS worksheet calculations).

    Plus, $111,000 excess loss (disallowed by Form 461) is also NOL.

Total NOL Carryforward:

    $189,000 (unused deductible loss)
    +$111,000 (disallowed by Form 461)
    = $300,000 NOL carryforward

Step 5: Reporting on Forms

    Form 461: Shows $289,000 allowed business loss and $111,000 excess business loss.
    Form 1040: Reports $100,000 W-2, deducts $289,000 allowed loss (but only $100,000 can be used to offset income; the rest is unused).
    Form 172: Combines the $189,000 unused allowed loss and $111,000 excess business loss for a $300,000 NOL carryforward.

Year 2: How NOL Carryforward Is Used

Suppose next year you have:

    W-2 income: $150,000
    No business loss

You can deduct the NOL carryforward ($300,000):

    Form 1040, Schedule 1, line 8a: NOL deduction, up to $150,000 (to bring taxable income to zero).
    Any unused NOL ($150,000) can be carried forward again.
*/

    const rows = [
      {
        year: 2024,
        w2: 100000,
        capGain: 0,
        businessNetIncome: -400000, // $400,000 business loss
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({rows, isSingle})
    const r = result[0]

    // Step 2: Apply Form 461 Business Loss Limitation
    // Form 461 limits business loss that can offset nonbusiness income (W-2) to $289,000.
    // Allowed loss: $289,000 (maximum that can offset W-2 and other nonbusiness income)
    // Excess business loss: $400,000 - $289,000 = $111,000 (disallowed in current year, becomes NOL carryforward)
    expect(r.limit).toBe(289000) // Form 461 threshold for single filer 2024
    expect(r.disallowedLoss).toBe(111000) // $400,000 - $289,000
    expect(r.allowedLoss).toBe(-289000) // The allowed portion of the business loss

    // Step 3: Calculate AGI and Taxable Income
    // Form 1040 Calculation:
    // Total income: $100,000 (W-2)
    // Allowed business loss: -$289,000
    // AGI: $100,000 - $289,000 = -$189,000
    // Standard deduction (2024 single): $14,600
    // Taxable income: AGI - standard deduction = -$189,000 - $14,600 = -$203,600
    // Taxable income can’t be less than zero, so it’s reported as $0.
    expect(r.f1040.f1040_line11).toBe(-189000) // AGI
    expect(r.f1040.f1040_line15).toBe(0) // Taxable Income

    // Step 4: NOL Calculation (Form 172)
    // Total NOL Carryforward:
    // $189,000 (unused deductible loss)
    // +$111,000 (disallowed by Form 461)
    // = $300,000 NOL carryforward
    expect(r.startingNOL).toBe(0) // First year, no starting NOL
    expect(r.nolUsed).toBe(0) // No NOL used in the first year
    expect(result[0].f1040.form172output?.part2[0].p2_line10).toBe(300000) // NOL carryforward
  })
})
