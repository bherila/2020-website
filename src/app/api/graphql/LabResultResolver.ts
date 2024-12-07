import { Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { LabResultType } from './LabResultType'
import db from '@/server_lib/db'
import ViewerType from './Viewer'
import type ViewerContext from './ViewerContext'

async function getLabResults(uid: string): Promise<LabResultType[]> {
  try {
    const rows = (await db.query('SELECT * FROM phr_lab_results where user_id = ?', [uid.toString()])) as any[]
    return rows.map((row: any) => ({
      id: row.id,
      testName: row.test_name,
      collectionDatetime: row.collection_datetime ? new Date(row.collection_datetime) : null,
      resultDatetime: row.result_datetime ? new Date(row.result_datetime) : null,
      resultStatus: row.result_status,
      orderingProvider: row.ordering_provider,
      resultingLab: row.resulting_lab,
      analyte: row.analyte,
      value: row.value,
      unit: row.unit,
      rangeMin: row.range_min ? parseFloat(row.range_min) : null,
      rangeMax: row.range_max ? parseFloat(row.range_max) : null,
      rangeUnit: row.range_unit,
      normalValue: row.normal_value,
      messageFromProvider: row.message_from_provider,
      resultComment: row.result_comment,
      labDirector: row.lab_director,
    }))
  } finally {
    await db.end()
  }
}

// This lets us get the viewer's timeseries documents
@Resolver(ViewerType)
export class ViewerLabResultResolver {
  @FieldResolver(() => [LabResultType], {
    name: 'lab_results',
    nullable: true,
  })
  getLabResultsForUser(@Root() viewer: ViewerType, @Ctx() vc: ViewerContext) {
    return getLabResults(viewer.uid!)
  }
}

@Resolver(LabResultType)
export class RootLabResultResolver {
  @Mutation((returns) => LabResultType, { name: 'lab_result_create' })
  addLabResult(newLabResult: LabResultType, @Ctx() vc: ViewerContext): LabResultType {
    return newLabResult
  }
}
