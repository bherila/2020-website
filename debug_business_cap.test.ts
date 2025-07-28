import { calculateExcessBusinessLoss } from './src/app/irsf461/ExcessBusinessLossCalculation'

describe('Debug EBL Business Cap Gains', () => {
  test('Debug high income test', () => {
    const rows = [
      {
        year: 2024,
        w2: 500000, // High W-2 income
        personalCapGain: 0,
        capGain: 200000, // Large capital gains
        businessNetIncome: -600000, // Large business loss
        override_f461_line15: 250000,
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    console.log('High Income Debug:', {
      w2: 500000,
      personalCapGain: 0,
      businessCapGain: 200000,
      businessNetIncome: -600000,
      'Schedule D line 5': result[0].f1040.scheduleD.schD_line5,
      'Schedule D line 21': result[0].f1040.scheduleD.schD_line21,
      'Form 1040 line 7': result[0].f1040.f1040_line7,
      'Form 1040 line 8': result[0].f1040.f1040_line8,
      'Form 1040 line 9': result[0].f1040.f1040_line9,
      'Form 1040 line 11 (AGI)': result[0].f1040.f1040_line11,
      'Form 461 line 9': result[0].f1040.schedule1.form461output?.f461_line9,
      'Form 461 line 15': result[0].f1040.schedule1.form461output?.f461_line15,
      'Form 461 line 16': result[0].f1040.schedule1.form461output?.f461_line16,
      disallowedLoss: result[0].disallowedLoss,
      allowedLoss: result[0].allowedLoss,
    })
  })
})
