import { calculateExcessBusinessLoss } from '@/app/irsf461/ExcessBusinessLossCalculation'

describe('Debug AGI Issue', () => {
  it('should debug the AGI calculation issue', () => {
    const rows = [
      {
        year: 2024,
        w2: 100000,
        capGain: 50000, // Business capital gains
        businessNetIncome: -400000,
        override_f461_line15: 250000,
      },
    ]
    const isSingle = true

    const result = calculateExcessBusinessLoss({ rows, isSingle })

    console.log('=== AGI Debug ===')
    console.log('W-2 (line 1z):', result[0].f1040.f1040_line1z)
    console.log('Capital gains (line 7):', result[0].f1040.f1040_line7)
    console.log('Schedule 1 (line 8):', result[0].f1040.f1040_line8)
    console.log('Total income (line 9):', result[0].f1040.f1040_line9)
    console.log('Adjustments (line 10):', result[0].f1040.f1040_line10)
    console.log('AGI (line 11):', result[0].f1040.f1040_line11)
    
    console.log('=== Form 461 Details ===')
    console.log('Form 461 line 9 (business income):', result[0].f1040.schedule1.form461output?.f461_line9)
    console.log('Form 461 line 14 (after adjustments):', result[0].f1040.schedule1.form461output?.f461_line14)
    console.log('Form 461 line 16 (disallowed):', result[0].f1040.schedule1.form461output?.f461_line16)
    console.log('Schedule 1 line 10 (additional income):', result[0].f1040.schedule1.sch1_line10)
    
    expect(true).toBe(true)
  })
})
