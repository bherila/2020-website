import 'server-only'
import { PhrLabResult } from '@prisma/client'
import SerializedLabResult from './SerializedLabResult.type'

export default function SerializeLabResult(labResult: PhrLabResult): SerializedLabResult {
  return {
    ...labResult,
    resultDatetime: labResult.resultDatetime?.getTime() ?? null,
    collectionDatetime: labResult.collectionDatetime?.getTime() ?? null,
    rangeMin: labResult.rangeMin?.toNumber() ?? null,
    rangeMax: labResult.rangeMax?.toNumber() ?? null,
    value: labResult.value?.toString() ?? null,
  }
}
