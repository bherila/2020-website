import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export default class ViewerType {
  constructor(uid: string) {
    this.uid = uid
  }

  @Field(() => ID, { name: 'uid', nullable: false })
  uid?: string
}
