export default interface SerializedLabResult {
  id: number
  userId: number | null
  testName: string | null
  collectionDatetime: number | null
  resultDatetime: number | null
  resultStatus: string | null
  orderingProvider: string | null
  resultingLab: string | null
  analyte: string | null
  value: string | null
  unit: string | null
  rangeMin: number | null
  rangeMax: number | null
  rangeUnit: string | null
  normalValue: string | null
  messageFromProvider: string | null
  resultComment: string | null
  labDirector: string | null
}
