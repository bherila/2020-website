import { form1040 } from '@/lib/tax/form1040'
import { form461 } from '@/lib/tax/form461'

export function calculateExcessBusinessLoss({
  rows,
  isSingle,
}: {
  isSingle: boolean
  rows: {
    year: number
    w2: number
    capGain: number
    businessNetIncome: number
  }[]
}) {
  let carryforward = 0
  return rows.map((row, idx) => {
    const startingNOL = carryforward

    // Compute form1040 for this year
    const f1040 = form1040({
      wages: row.w2,
      interest: 0,
      dividends: 0,
      iraDistributions: 0,
      pensions: 0,
      socialSecurity: 0,
      capGain: row.capGain,
      businessIncome: row.businessNetIncome,
      otherGains: 0,
      rentalIncome: 0,
      farmIncome: 0,
      nolDeductionFromOtherYears: startingNOL,
      selfEmploymentTax: 0,
      sepSimpleQualifiedPlans: 0,
      selfEmployedHealthInsurance: 0,
      earlyWithdrawalPenalty: 0,
      isSingle,
      taxYear: Number(row.year),
    })

    const f461 = f1040.schedule1.form461output ?? undefined
    const disallowedBusinessLoss = f461?.f461_line16 ?? 0
    const allowedBusinessLoss = row.businessNetIncome + disallowedBusinessLoss
    const grossIncome = row.w2 + row.capGain + allowedBusinessLoss

    const disallowedLoss = f1040.schedule1.sch1_line8p ?? 0
    const allowedLoss = row.businessNetIncome + disallowedLoss

    // NOL used is the amount of carryforward NOL actually used to offset income
    // It's limited by the current year's taxable income before NOL deduction.
    // NOL used is the amount of carryforward NOL actually used to offset income.
    // It's limited by the current year's taxable income before NOL deduction.
    // NOL used is the amount of carryforward NOL actually used to offset income.
    // It's limited by the current year's taxable income before NOL deduction.
    const taxableIncomeBeforeNOL = f1040.f1040_line11
    const nolUsed = Math.min(startingNOL, Math.max(0, taxableIncomeBeforeNOL))

    // Calculate the portion of the *allowed* loss that could not be used to offset taxable income.
    // This happens when the AGI (f1040.f1040_line11) is negative after applying the allowed business loss.
    // The allowedLoss is a negative number, so we take the max of 0 and (allowedLoss + taxableIncomeBeforeNOL)
    // to get the portion that *couldn't* be used to reduce positive income.
    const unusedAllowedLoss = Math.max(0, allowedLoss + taxableIncomeBeforeNOL)

    // Taxable income from form1040
    const taxableIncome = f1040.f1040_line15

    // Update carryforward for next year:
    // It's the previous NOL not used + current year's disallowed loss (from Form 461)
    // + any portion of the *allowed* loss that couldn't be used to reduce taxable income.
    carryforward = startingNOL - nolUsed + disallowedLoss + unusedAllowedLoss

    return {
      ...row,
      limit: f1040.schedule1.form461output?.f461_line15 ?? 0,
      startingNOL,
      allowedLoss,
      disallowedLoss,
      nolUsed,
      taxableIncome,
      f1040,
      sch1: f1040.schedule1,
    }
  })
}
