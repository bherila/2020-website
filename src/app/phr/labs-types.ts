export interface LabResult {
  test_name: string | null
  collection_datetime: Date | null
  result_datetime: Date | null
  result_status: string | null
  ordering_provider: string | null
  resulting_lab: string | null
  analyte: string | null
  value: number | null
  unit: string | null
  range_min: number | null
  range_max: number | null
  range_unit: string | null
  normal_value: string | null
}
