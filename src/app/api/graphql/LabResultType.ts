import { Field, ID, ObjectType, Float } from 'type-graphql'

@ObjectType()
export class LabResultType {
  @Field(() => ID, { name: 'id', nullable: false })
  id?: number

  @Field({ name: 'test_name', nullable: true })
  testName?: string

  @Field(() => Date, { name: 'collection_datetime', nullable: true })
  collectionDatetime?: Date | null

  @Field(() => Date, { name: 'result_datetime', nullable: true })
  resultDatetime?: Date | null

  @Field({ name: 'result_status', nullable: true })
  resultStatus?: string

  @Field({ name: 'ordering_provider', nullable: true })
  orderingProvider?: string

  @Field({ name: 'resulting_lab', nullable: true })
  resultingLab?: string

  @Field({ name: 'analyte', nullable: true })
  analyte?: string

  @Field({ name: 'value', nullable: true })
  value?: string

  @Field({ name: 'unit', nullable: true })
  unit?: string

  @Field(() => Float, { name: 'range_min', nullable: true, description: 'Minimum value in the reference range' })
  rangeMin?: number | null

  @Field(() => Float, { name: 'range_max', nullable: true, description: 'Maximum value in the reference range' })
  rangeMax?: number | null

  @Field({ name: 'range_unit', nullable: true, description: 'Unit of range_min and range_max' })
  rangeUnit?: string

  @Field({ name: 'normal_value', nullable: true, description: 'Value is normal if it equals this e.g. "Not Detected"' })
  normalValue?: string

  @Field({ name: 'message_from_provider', nullable: true })
  messageFromProvider?: string

  @Field({ name: 'result_comment', nullable: true })
  resultComment?: string

  @Field({ name: 'lab_director', nullable: true })
  labDirector?: string
}
