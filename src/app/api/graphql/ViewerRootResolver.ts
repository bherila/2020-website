import db from '@/server_lib/db'
import { Resolver, Query, Ctx, FieldResolver, Root } from 'type-graphql'
import { Memoize } from 'typescript-memoize'
import { UserGraphType } from './Viewer'
import type ViewerContext from './ViewerContext'

@Resolver(UserGraphType)
export default class ViewerRootResolver {
  @Query((returns) => UserGraphType, {
    name: 'viewer',
  })
  resolveViewerRoot(@Ctx() vc: ViewerContext): UserGraphType {
    return new UserGraphType(vc.uid.toString())
  }

  @FieldResolver(() => String, { name: 'email', nullable: true })
  @Memoize((h) => h.uid)
  async email(@Root() ofUser: UserGraphType) {
    try {
      const res: any = await db.query('select email from users where uid = ?', [ofUser.uid])
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
