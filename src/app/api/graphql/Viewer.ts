import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class UserGraphType {
  constructor(uid: string) {
    this.uid = uid
  }

  @Field(() => ID, { name: 'uid', nullable: false })
  uid?: string
}
