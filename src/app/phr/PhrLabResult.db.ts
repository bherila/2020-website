import 'server-only'
import { db } from '@/server_lib/db'
import { PhrLabResult, PhrLabResultSchema } from './PhrLabResult.types'
import { getSession } from '@/server_lib/session'

export async function genLabResultsForLoggedInUser(): Promise<PhrLabResult[]> {
  const session = await getSession()
  const userId = session?.uid
  if (userId == null) {
    return []
  }
  return genLabResults(userId.toString())
}

export async function genLabResults(userId: string): Promise<PhrLabResult[]> {
  try {
    const rows = await db
      .selectFrom('phr_lab_results')
      .select([
        'id',
        'user_id as userId',
        'test_name as testName',
        'collection_datetime as collectionDatetime',
        'result_datetime as resultDatetime',
        'result_status as resultStatus',
        'ordering_provider as orderingProvider',
        'resulting_lab as resultingLab',
        'analyte',
        'value',
        'unit',
        'range_min as rangeMin',
        'range_max as rangeMax',
        'range_unit as rangeUnit',
        'normal_value as normalValue',
        'message_from_provider as messageFromProvider',
        'result_comment as resultComment',
        'lab_director as labDirector',
      ])
      .where('user_id', '=', parseInt(userId))
      .orderBy('result_datetime', 'desc')
      .execute()

    return rows.map((row) => PhrLabResultSchema.parse(row))
  } catch (err) {
    console.error(err)
    return []
  }
}
