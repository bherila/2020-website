import {
  Ctx,
  Field,
  FieldResolver,
  ID,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import type { ViewerContext } from '@/app/api/graphql/ViewerContext'
import db from '@/lib/db'

@ObjectType()
export class UserGraphType {
  constructor(uid: string) {
    this.uid = uid
  }

  @Field(() => ID, { name: 'uid', nullable: false })
  uid?: string
}

@Resolver(UserGraphType)
export class ViewerRootResolver {
  @Query((returns) => UserGraphType, {
    name: 'viewer',
  })
  resolveViewerRoot(@Ctx() vc: ViewerContext): UserGraphType {
    return new UserGraphType(vc.uid.toString())
  }

  @FieldResolver(() => String, { name: 'email', nullable: true })
  async email(@Root() ofUser: UserGraphType) {
    try {
      const res: any = await db.query('select email from users where uid = ?', [
        ofUser.uid,
      ])
      if (res?.length == 1) {
        return res[0].email
      } else {
        return null
      }
    } finally {
      await db.end()
    }
  }
}
