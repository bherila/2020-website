// ExcessBusinessLossLimitation.test.ts
import { ExcessBusinessLossLimitation } from './ExcessBusinessLossLimitation'

describe('ExcessBusinessLossLimitation', () => {
  const KNOWN_LIMITS = [
    { tax_year: 2018, single_filers: 250000, married_filing_jointly: 500000, adjustment_percentage: 1.0 },
    { tax_year: 2019, single_filers: 255000, married_filing_jointly: 510000, adjustment_percentage: 1.02 },
    { tax_year: 2020, single_filers: 259000, married_filing_jointly: 518000, adjustment_percentage: 1.036 },
    { tax_year: 2021, single_filers: 262000, married_filing_jointly: 524000, adjustment_percentage: 1.048 },
    { tax_year: 2022, single_filers: 270000, married_filing_jointly: 540000, adjustment_percentage: 1.08 },
    { tax_year: 2023, single_filers: 289000, married_filing_jointly: 578000, adjustment_percentage: 1.156 },
    { tax_year: 2024, single_filers: 305000, married_filing_jointly: 610000, adjustment_percentage: 1.22 },
    { tax_year: 2025, single_filers: 317000, married_filing_jointly: 634000, adjustment_percentage: 1.268 },
  ]

  KNOWN_LIMITS.forEach((row) => {
    it(`returns correct value for single filer for ${row.tax_year}`, () => {
      expect(ExcessBusinessLossLimitation({ taxYear: row.tax_year, isSingle: true })).toBe(row.single_filers)
    })
    it(`returns correct value for married filing jointly for ${row.tax_year}`, () => {
      expect(ExcessBusinessLossLimitation({ taxYear: row.tax_year, isSingle: false })).toBe(row.married_filing_jointly)
    })
  })

  it('KNOWN_LIMITS 2019-2024 match adjustment_percentage from 2018 base', () => {
    const baseSingle = 250000
    const baseMarried = 500000
    KNOWN_LIMITS.forEach((row) => {
      if (row.tax_year >= 2019 && row.tax_year <= 2024) {
        const expectedSingle = Math.round((baseSingle * row.adjustment_percentage) / 1000) * 1000
        const expectedMarried = Math.round((baseMarried * row.adjustment_percentage) / 1000) * 1000
        expect(row.single_filers).toBe(expectedSingle)
        expect(row.married_filing_jointly).toBe(expectedMarried)
      }
    })
  })

  it('applies cost-of-living adjustment for future years', () => {
    // For 2026, using base 2025 and default 1.03 adjustment
    const expectedSingle = Math.round((317000 * 1.03) / 1000) * 1000
    const expectedMarried = Math.round((634000 * 1.03) / 1000) * 1000
    expect(ExcessBusinessLossLimitation({ taxYear: 2026, isSingle: true })).toBe(expectedSingle)
    expect(ExcessBusinessLossLimitation({ taxYear: 2026, isSingle: false })).toBe(expectedMarried)
  })

  it('returns 2018 value for years before 2018', () => {
    expect(ExcessBusinessLossLimitation({ taxYear: 2017, isSingle: true })).toBe(250000)
    expect(ExcessBusinessLossLimitation({ taxYear: 2017, isSingle: false })).toBe(500000)
  })

  it('handles edge case years around P.L. 119-21 effective dates', () => {
    // Test 2026 (first year after P.L. 119-21 changes for inflation adjustment)
    const expectedSingle2026 = Math.round((317000 * 1.03) / 1000) * 1000
    const expectedMarried2026 = Math.round((634000 * 1.03) / 1000) * 1000
    expect(ExcessBusinessLossLimitation({ taxYear: 2026, isSingle: true })).toBe(expectedSingle2026)
    expect(ExcessBusinessLossLimitation({ taxYear: 2026, isSingle: false })).toBe(expectedMarried2026)

    // Test 2027 (first year after P.L. 119-21 limitation period extension)
    const expectedSingle2027 = Math.round((317000 * Math.pow(1.03, 2)) / 1000) * 1000
    const expectedMarried2027 = Math.round((634000 * Math.pow(1.03, 2)) / 1000) * 1000
    expect(ExcessBusinessLossLimitation({ taxYear: 2027, isSingle: true })).toBe(expectedSingle2027)
    expect(ExcessBusinessLossLimitation({ taxYear: 2027, isSingle: false })).toBe(expectedMarried2027)
  })

  it('always returns positive values regardless of input parameters', () => {
    // Test edge cases that might produce negative or zero values
    expect(ExcessBusinessLossLimitation({ taxYear: 2025, isSingle: true, costOfLivingAdjustment: 0 })).toBeGreaterThan(0)
    expect(ExcessBusinessLossLimitation({ taxYear: 2025, isSingle: false, costOfLivingAdjustment: 0 })).toBeGreaterThan(0)
    expect(ExcessBusinessLossLimitation({ taxYear: 2030, isSingle: true, costOfLivingAdjustment: 0.1 })).toBeGreaterThan(0)
    expect(ExcessBusinessLossLimitation({ taxYear: 2030, isSingle: false, costOfLivingAdjustment: 0.1 })).toBeGreaterThan(0)
  })

  it('handles very large cost of living adjustments', () => {
    // Test with high inflation scenario
    const highInflation = 1.1 // 10% annual inflation
    const result2030Single = ExcessBusinessLossLimitation({
      taxYear: 2030,
      isSingle: true,
      costOfLivingAdjustment: highInflation,
    })
    const result2030Married = ExcessBusinessLossLimitation({
      taxYear: 2030,
      isSingle: false,
      costOfLivingAdjustment: highInflation,
    })

    expect(result2030Single).toBeGreaterThan(317000)
    expect(result2030Married).toBeGreaterThan(634000)
    expect(result2030Single % 1000).toBe(0) // Should be rounded to nearest $1,000
    expect(result2030Married % 1000).toBe(0) // Should be rounded to nearest $1,000
  })
})
