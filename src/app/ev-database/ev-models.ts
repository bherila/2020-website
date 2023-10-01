export interface EV {
  'Date Unveiled'?: string
  'Expected Release'?: string
  'Release Date'?: string
  Discontinued?: string
  YoM?: string
  Planned?: string
  Released?: string
  'Model Year'?: string
  Brand: string
  'Model Name'?: string
  Trim?: string
  'Vehicle Name'?: string
  Powertrain?: string
  Motors?: string
  Class?: string
  Style?: string
  'EV Type'?: string
  Seating?: string
  'US MSRP'?: string
  'Global MSRP'?: string
  '$/mi EVR'?: string
  '$/kwh'?: string
  'wh/mi'?: string
  'mi/kWh'?: string
  'kWh/100mi'?: string
  'Batt kWh'?: string
  'EVR (mi)'?: string
  'Comb. Range'?: string
  'ICER (mi)'?: string
  'EVR (km)'?: string
  'L2 MCR'?: string
  'Max DCFC'?: string
  'Motor (kW)'?: string
  'Mfr Country'?: string
  'Market Availability'?: string
  Source?: string
  Comments?: string
}

export interface EVDerived extends EV {
  ExpectedReleaseYear: string
  US_MSRP_JSNum: number | null
}

function cleanNumber(str?: string): number | null {
  if (str == null) {
    return null
  }
  return parseFloat(str.replace(/[^\d.]/g, ''))
}

export function enhanceEV(ev: EV): EVDerived {
  return {
    ...ev,
    'Model Year': ev['Model Year']?.toString(),
    US_MSRP_JSNum: cleanNumber(ev['US MSRP']),
    ExpectedReleaseYear: (ev['Expected Release'] ?? '????').slice(0, 4),
  }
}
