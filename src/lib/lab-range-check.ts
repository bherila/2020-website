import { LabResult } from '@/app/phr/labs-types'

export interface RangeCheck {
  isInRange: boolean
  message?: string
}

export function checkLabRange(result: Pick<LabResult, 'value' | 'normal_value' | 'range_min' | 'range_max'>): RangeCheck {
  if (!result.value) {
    return { isInRange: true }
  }

  if (['NEG', 'ND', 'Not Detected'].includes(result.value)) {
    return { isInRange: true }
  }

  if (result.normal_value !== null) {
    return {
      isInRange: result.value.toString() === result.normal_value,
      message: `Expected: ${result.normal_value}`,
    }
  }

  const min = result.range_min ?? -Infinity
  const max = result.range_max ?? Infinity

  const effectiveMin = min < -999999 ? -Infinity : min
  const effectiveMax = max > 999999 ? Infinity : max

  const isInRange = Number(result.value) >= effectiveMin && Number(result.value) <= effectiveMax

  return {
    isInRange,
    message: isInRange ? undefined : `Expected between ${effectiveMin} and ${effectiveMax}`,
  }
}

export function getLatestRangeInfo(
  results: LabResult[],
): Pick<LabResult, 'range_min' | 'range_max' | 'range_unit' | 'normal_value'> | null {
  if (!results.length) return null

  const sorted = [...results].sort((a, b) => {
    if (!a.result_datetime || !b.result_datetime) return 0
    return b.result_datetime.getTime() - a.result_datetime.getTime()
  })

  return {
    range_min: sorted[0].range_min,
    range_max: sorted[0].range_max,
    range_unit: sorted[0].range_unit,
    normal_value: sorted[0].normal_value,
  }
}
