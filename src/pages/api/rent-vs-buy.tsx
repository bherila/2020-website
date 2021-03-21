import React, { useState } from 'react'

export default function RentVsBuy() {
  const [data, setData] = useState({
    purchPrice: 500000,
    years: 5,
    mortgage: 0.0325,
    downPayment: 0.2,
    mortgageLength: 30,
    homePriceGrowthRate: 1.03,
    rentGrowthRate: 1.025,
    investmentReturnRate: 1.04,
    inflationRate: 1.02,
    propertyTaxRate: 0.0125,
    marginalTaxRate: 0.2,
  })
}
