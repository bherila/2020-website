import LabResultSerializable from '@/app/phr/SerializedLabResult.type'
import type { PhrLabResult } from '@prisma/client'

export interface RangeCheck {
  isInRange: boolean
  message?: string
}

const neutral = ['NEG', 'ND', 'Not Detected']

export default function printRange(input: {
  value: string | null
  rangeMin: number | null
  rangeMax: number | null
  rangeUnit: string | null
  normalValue: string | null
}) {
  let { rangeMin, rangeMax, rangeUnit, normalValue } = input
  if (rangeMin != null && rangeMin < -999999) rangeMin = null
  if (rangeMax != null && rangeMax > 999999) rangeMax = null
  const neutralValue = neutral.find((n) => n === input.value)
  if ((rangeMin ?? rangeMax ?? normalValue) == null && neutralValue) {
    return neutralValue
  }
  return normalValue ? `=${normalValue}` : `${rangeMin ?? '-∞'} to ${rangeMax ?? '∞'} ${rangeUnit || ''}`
}

export function checkLabRange(result: {
  value: string | null
  rangeMin: number | null
  rangeMax: number | null
  normalValue: string | null
}): RangeCheck {
  if (!result.value) {
    return { isInRange: true }
  }

  if (neutral.includes(result.value)) {
    return { isInRange: true }
  }

  if (result.normalValue !== null) {
    return {
      isInRange: result.value.toString() === result.normalValue,
      message: `Expected: ${result.normalValue}`,
    }
  }

  const min = result.rangeMin ?? -Infinity
  const max = result.rangeMax ?? Infinity

  const effectiveMin = min < -999999 ? -Infinity : min
  const effectiveMax = max > 999999 ? Infinity : max

  const isInRange = parseFloat(result.value) >= effectiveMin && parseFloat(result.value) <= effectiveMax

  return {
    isInRange,
    message: isInRange ? undefined : `Expected between ${effectiveMin} and ${effectiveMax}`,
  }
}

export function getLatestRangeInfo(results: LabResultSerializable[]): {
  rangeMin: number | null
  rangeMax: number | null
  rangeUnit: string | null
  normalValue: string | null
  value: string | null
} | null {
  if (!results.length) return null

  const sorted = [...results].sort((a, b) => {
    if (!a.resultDatetime || !b.resultDatetime) return 0
    return b.resultDatetime - a.resultDatetime
  })

  return {
    rangeMin: sorted[0].rangeMin,
    rangeMax: sorted[0].rangeMax,
    rangeUnit: sorted[0].rangeUnit,
    normalValue: sorted[0].normalValue,
    value: sorted[0].value,
  }
}
