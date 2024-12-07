import { Arg, Ctx, FieldResolver, ID, InputType, Mutation, Query, Resolver, Root } from 'type-graphql'
import { Field, ObjectType } from 'type-graphql'
import type ViewerContext from '@/app/api/graphql/ViewerContext'
import { UserGraphType } from '@/app/api/graphql/Viewer'

@ObjectType()
export class TimeseriesDocumentType {
  @Field(() => ID, { name: 'doc_id', nullable: false })
  doc_id?: string

  @Field(() => ID, { name: 'uid', nullable: false })
  uid?: string

  @Field({ name: 'doc_name', nullable: false })
  doc_name?: string

  @Field(() => [TimeseriesSeries], { name: 'series', nullable: false })
  series: TimeseriesSeries[] = []
}

@ObjectType()
export class TimeseriesSeries {
  @Field(() => ID, { name: 'series_id', nullable: false })
  series_id?: string

  @Field({ name: 'series_name', nullable: false })
  series_name: string = ''

  @Field(() => [TimeseriesDatapoint], { name: 'datapoints', nullable: false })
  datapoints: TimeseriesDatapoint[] = []
}

@ObjectType()
export class TimeseriesDatapoint {
  @Field(() => ID, { name: 'dp_id', nullable: false })
  dp_id?: string

  @Field(() => String, { name: 'dp_value', nullable: false })
  dp_value?: string

  @Field(() => String, { name: 'dp_comment', nullable: true })
  dp_comment?: string
}

// This lets us get the viewer's timeseries documents
@Resolver(UserGraphType)
export class TimeseriesUserResolver {
  @FieldResolver(() => [TimeseriesDocumentType], {
    name: 'timeseries_documents',
    nullable: true,
  })
  getTimeseriesDocumentsForUser(@Root() viewer: UserGraphType, @Ctx() vc: ViewerContext) {
    return [{ doc_id: '223' }]
  }
}

// Mutation root field to allow upsert of timeseries document
@Resolver(TimeseriesDocumentType)
export class TimeseriesDocumentResolver {
  @Mutation((returns) => TimeseriesDocumentType, {
    name: 'timeseries_document_upsert',
  })
  upsertDocument(newDocument: TimeseriesDocumentType, @Ctx() vc: ViewerContext): TimeseriesDocumentType {
    return newDocument
  }
}
