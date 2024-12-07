import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class LicenseKeyType {
  @Field(() => ID, { name: 'id', nullable: false })
  id?: string

  @Field(() => ID, { name: 'uid', nullable: true })
  uid?: string

  @Field({ name: 'product_id', nullable: true })
  product_id?: string

  @Field({ name: 'product_key', nullable: true })
  product_key?: string

  @Field({ name: 'product_name', nullable: true })
  product_name?: string

  @Field({ name: 'computer_name', nullable: true })
  computer_name?: string

  @Field({ name: 'comment', nullable: true })
  comment?: string

  @Field({ name: 'used_on', nullable: true })
  used_on?: Date

  @Field({ name: 'claimed_date', nullable: true })
  claimed_date?: Date

  @Field({ name: 'key_type', nullable: true })
  key_type?: string

  @Field({ name: 'key_retrieval_note', nullable: true })
  key_retrieval_note?: string
}
