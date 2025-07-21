import { calculateExcessBusinessLoss } from './ExcessBusinessLossCalculation'

describe('Debug NOL Year 3', () => {
  it('should debug NOL calculation for year 3', () => {
    const rows = [
      {
        year: 2024,
        w2: 100000,
        capGain: 50000,
        businessNetIncome: -400000,
        override_f461_line15: 250000,
      },
      {
        year: 2025,
        w2: 120000,
        capGain: 30000,
        businessNetIncome: -100000,
        override_f461_line15: 250000,
      },
      {
        year: 2026,
        w2: 90000,
        capGain: 10000,
        businessNetIncome: 50000,
        override_f461_line15: 250000,
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    console.log('Year 3 result:', result[2])
    console.log('Year 3 Form 461:', result[2].f1040.schedule1.form461output)
    
    // Log all the values we care about
    console.log('startingNOL:', result[2].startingNOL)
    console.log('nolUsed:', result[2].nolUsed)
    console.log('allowedLoss:', result[2].allowedLoss)
    console.log('AGI before NOL:', result[2].f1040.f1040_line9) // total income
    console.log('AGI after NOL:', result[2].f1040.f1040_line11)
  })
})
