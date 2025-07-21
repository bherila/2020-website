import { calculateExcessBusinessLoss } from './ExcessBusinessLossCalculation'

describe('Debug NOL Year 2', () => {
  it('should debug NOL calculation for year 2', () => {
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
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    console.log('Year 2 result:', result[1])
    console.log('Year 2 Form 1040:', result[1].f1040)
    console.log('Year 2 Form 461:', result[1].f1040.schedule1.form461output)
    
    // Log all the values we care about
    console.log('startingNOL:', result[1].startingNOL)
    console.log('nolUsed:', result[1].nolUsed)
    console.log('allowedLoss:', result[1].allowedLoss)
    console.log('disallowedLoss:', result[1].disallowedLoss)
    console.log('f1040_line11 (AGI):', result[1].f1040.f1040_line11)
  })
})
