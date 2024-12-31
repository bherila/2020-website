import 'server-only'
import db from '@/server_lib/db'
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
    const rows: any[] = await db.query(
      `
          SELECT
              id,
              user_id,
              test_name,
              collection_datetime,
              result_datetime,
              result_status,
              ordering_provider,
              resulting_lab,
              analyte,
              value,
              unit,
              range_min,
              range_max,
              range_unit,
              normal_value,
              message_from_provider,
              result_comment,
              lab_director
          FROM phr_lab_results
          WHERE user_id = ?
          ORDER BY result_datetime DESC`,
      [userId],
    )
    return rows.map((row) =>
      PhrLabResultSchema.parse({
        id: row.id,
        userId: row.user_id,
        testName: row.test_name,
        collectionDatetime: row.collection_datetime,
        resultDatetime: row.result_datetime,
        resultStatus: row.result_status,
        orderingProvider: row.ordering_provider,
        resultingLab: row.resulting_lab,
        analyte: row.analyte,
        value: row.value,
        unit: row.unit,
        rangeMin: row.range_min,
        rangeMax: row.range_max,
        rangeUnit: row.range_unit,
        normalValue: row.normal_value,
        messageFromProvider: row.message_from_provider,
        resultComment: row.result_comment,
        labDirector: row.lab_director,
      }),
    )
  } catch (err) {
    console.error(err)
    return []
  }
}
