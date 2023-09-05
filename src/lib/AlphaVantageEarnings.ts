export default interface AlphaVantageEarnings {
  quarterlyEarnings?: {
    surprise: string
    surprisePercentage: string
    reportedDate: string
    estimatedEPS: string
    fiscalDateEnding: string
    reportedEPS: string
  }[]
  annualEarnings?: { fiscalDateEnding: string; reportedEPS: string }[]
}
