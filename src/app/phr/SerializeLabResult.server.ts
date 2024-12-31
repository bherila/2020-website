import 'server-only'
import SerializedLabResult from './SerializedLabResult.type'
import { PhrLabResult } from './PhrLabResult.types'

export default function SerializeLabResult(labResult: PhrLabResult): SerializedLabResult {
  return {
    ...labResult,
    resultDatetime: labResult.resultDatetime?.getTime() ?? null,
    collectionDatetime: labResult.collectionDatetime?.getTime() ?? null,
    rangeMin: labResult.rangeMin ?? null,
    rangeMax: labResult.rangeMax ?? null,
    value: labResult.value?.toString() ?? null,
  }
}
